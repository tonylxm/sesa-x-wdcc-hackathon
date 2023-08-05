import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase'; // Import your Firebase configuration file

function FriendItem({ id, name, email, activeTab, status, letters }) {
  const [buttonLabel, setButtonLabel] = useState('Add');
  const [isRequested, setIsRequested] = useState(false); // Track whether friend has been requested
  const [isFriend, setIsFriend] = useState(false); // Track whether friend has been requested

  useEffect(() => {
    if (activeTab === 'Requests') {
      setButtonLabel('Accept Request');
    } else if (activeTab === 'Pending') {
      setButtonLabel('Withdraw Request');
    } else if (activeTab === 'Add Friends') {
      setButtonLabel('Add Friend');
    } else {
      setButtonLabel(null);
    }


    // Function to check if friend has been requested or is already a friend
    const checkFriendRequest = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const currentUserId = currentUser.uid;

        const requestSnapshot = await db
          .collection('users')
          .doc(id)
          .collection('requests')
          .doc(currentUserId)
          .get();

        const friendSnapshot = await db
          .collection('users')
          .doc(currentUserId)
          .collection('friends')
          .doc(id)
          .get();
        
        setIsFriend(friendSnapshot.exists);
        setIsRequested(requestSnapshot.exists);
      } catch (error) {
        console.log('Error checking friend request:', error);
      }
    };

    checkFriendRequest();
  }, [activeTab, buttonLabel, id]);

  const handleRequest = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const currentUserId = currentUser.uid;

      if (activeTab === 'Requests' && buttonLabel === 'Accept Request') {
        // Handle the request acceptance logic
        await db.collection('users').doc(currentUserId).collection('requests').doc(id).delete();
        await db.collection('users').doc(currentUserId).collection('friends').doc(id).set({});
        await db.collection('users').doc(id).collection('friends').doc(currentUserId).set({});
        
        setIsFriend(true);
        console.log(id + ' accepted');


      } else if (activeTab === 'Pending' && buttonLabel === 'Withdraw Request') {
        // Handle the request withdrawal logic
        await db.collection('users').doc(currentUserId).collection('pending').doc(id).delete();
        await db.collection('users').doc(id).collection('requests').doc(currentUserId).delete();
        console.log(id + ' request withdrawn');

      } else if (activeTab === 'Add Friends') {
        await db.collection('users').doc(id).collection('requests').doc(currentUserId).set({});
        await db.collection('users').doc(currentUserId).collection('pending').doc(id).set({});
        setIsRequested(true); // Set the friend as requested
        console.log(id + ' requested');
      }
    } catch (error) {
      console.log('Error handling request:', error);
    }
  };


  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white hover:bg-gray-100">
      <div>
        <p className="text-lg font-medium text-gray-800">{name} ({status})</p>
        <p className="text-sm text-gray-500">letters: {letters}</p>
        
      </div>
      {activeTab === 'Add Friends' && (
        <button
          className={`px-3 py-1 bg-blue-500 text-white rounded-full ${
            (isRequested || isFriend) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
          onClick={handleRequest}
          disabled={isRequested || isFriend}
        >
          {buttonLabel}
        </button>
      )}
      {activeTab === 'Requests' || activeTab === 'Pending' && ( // Conditionally render the button under 'Requests' tab
        <button
          className={`px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600'
          }`}
          onClick={handleRequest}
        >
          {buttonLabel}
        </button>
      )}

    </div>
  );
}


function FriendList({ friends, activeTab }) {
  const [friendInfo, setFriendInfo] = useState([]);


  useEffect(() => {
    const fetchFriendInfo = async () => {
      const friendInfoPromises = friends.map((friendId) => getUserInfo(friendId));

      // Subscribe to real-time updates using Firestore's onSnapshot
      const unsubscribe = db.collection('users').onSnapshot((snapshot) => {
        const friendInfoData = friendInfoPromises.map((promise, index) => {
          const snapshotData = snapshot.docs.find((doc) => doc.id === friends[index]);
          return snapshotData ? { id: snapshotData.id, ...snapshotData.data() } : null;
        });
        setFriendInfo(friendInfoData);
      });

      return () => unsubscribe(); // Unsubscribe when the component unmounts
    };

    fetchFriendInfo();
  }, [friends]);

  const determinePlaceholder = activeTab => {
    switch (activeTab) {
      case "Friends":
        return "You have no friends!";
      case "Requests":
        return "You have received no friend requests!";
      case "Pending":
        return "You have no pending friend requests!";
      default:
        return;
    }
  }

  return (
    <div className="flex flex-col space-y-2">
      { friendInfo.length === 0 ? <p className="text-center py-3">{determinePlaceholder(activeTab)}</p> :
      friendInfo.map((friend) => (
        <FriendItem key={friend.id} id={friend.id} name={friend.name} email={friend.email} status={friend.status} letters={friend.letters} activeTab={activeTab}/>
      ))}
    </div>
  );
}

async function getUserInfo(userId) {
  try {
    const userRef = db.collection('users').doc(userId);
    const userSnapshot = await userRef.get();

    if (userSnapshot.exists) {
      const userData = userSnapshot.data();
      const { name, email, status, letters } = userData;

      return { id: userId, name, email, status, letters };
    } else {
      // Handle the case where the user document does not exist
      return null;
    }
  } catch (error) {
    console.log('Error fetching user info:', error);
    return null;
  }
}


function FriendSystem() {
    const [searchTerm, setSearchTerm] = useState('');

    const [allUsers, setUsers] = useState([]);
    const [friends, setFriends] = useState([]);
    const [pending, setPendingRequests] = useState([]);
    const [requests, setOutgoingRequests] = useState([]);


    const [activeTab, setActiveTab] = useState('Friends');

    useEffect(() => {

      // Declare the unsubscribe functions outside of useEffect
      let unsubscribeFriends;
      let unsubscribePending;
      let unsubscribeRequests;

      /*// Function to unsubscribe from all real-time updates
      const unsubscribeAll = () => {
        if (unsubscribeFriends) unsubscribeFriends();
        if (unsubscribePending) unsubscribePending();
        if (unsubscribeRequests) unsubscribeRequests();
      };

      */



      // Function to fetch the current user's friends from Firestore
      const fetchCurrentUserFriends = async () => {
        try {
          // Get the current user's ID from Firebase Auth
          const currentUser = auth.currentUser;
          if (currentUser) {
            const currentUserId = currentUser.uid;
  
            // Fetch the current user's friends from Firestore
            const friendsSnapshot = await db.collection('users').doc(currentUserId).collection('friends').get();
            const friendsData = friendsSnapshot.docs.map((doc) => doc.id);
            setFriends(friendsData);
          }
        } catch (error) {
          console.log('Error fetching current user friends:', error);
        }

        unsubscribeFriends = subscribeToFriends();
        unsubscribePending = subscribeToPending();
        unsubscribeRequests = subscribeToRequests();
      };
  
      // Function to fetch the current user's pending requests from Firestore
      const fetchCurrentUserPending = async () => {
        try {
          // Get the current user's ID from Firebase Auth
          const currentUser = auth.currentUser;
          if (currentUser) {
            const currentUserId = currentUser.uid;
  
            // Fetch the current user's pending requests from Firestore
            const pendingSnapshot = await db.collection('users').doc(currentUserId).collection('pending').get();
            const pendingData = pendingSnapshot.docs.map((doc) => doc.id);
            setPendingRequests(pendingData);
          }
        } catch (error) {
          console.log('Error fetching current user pending requests:', error);
        }
      };

      // Function to fetch the current user's requests collection from Firestore
      const fetchCurrentUserRequests = async () => {
        try {
          // Get the current user's ID from Firebase Auth
          const currentUser = auth.currentUser;
          if (currentUser) {
            const currentUserId = currentUser.uid;
  
            // Fetch the current user's pending requests from Firestore
            const requestsSnapshot = await db.collection('users').doc(currentUserId).collection('requests').get();
            const requestsData = requestsSnapshot.docs.map((doc) => doc.id);
            setOutgoingRequests(requestsData);

          }
        } catch (error) {
          console.log('Error fetching current user requests requests:', error);
        }
      };

      // Function to subscribe to real-time updates for friends
      const subscribeToFriends = async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const currentUserId = currentUser.uid;
          const friendsRef = db.collection('users').doc(currentUserId).collection('friends');
          
          // Subscribe to real-time updates for friends
          const unsubscribe = friendsRef.onSnapshot((snapshot) => {
            const friendsData = snapshot.docs.map((doc) => doc.id);
            setFriends(friendsData);
          });

          return () => unsubscribe(); // Unsubscribe when the component unmounts
        }
      };

    // Function to subscribe to real-time updates for pending requests
    const subscribeToPending = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const currentUserId = currentUser.uid;
        const friendsRef = db.collection('users').doc(currentUserId).collection('pending');
        
        // Subscribe to real-time updates for friends
        const unsubscribe = friendsRef.onSnapshot((snapshot) => {
          const friendsData = snapshot.docs.map((doc) => doc.id);
          setPendingRequests(friendsData);
        });

        return () => unsubscribe(); // Unsubscribe when the component unmounts
      }
    };

    // Function to subscribe to real-time updates for pending requests
    const subscribeToRequests = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const currentUserId = currentUser.uid;
        const friendsRef = db.collection('users').doc(currentUserId).collection('requests');
        
        // Subscribe to real-time updates for friends
        const unsubscribe = friendsRef.onSnapshot((snapshot) => {
          const friendsData = snapshot.docs.map((doc) => doc.id);
          setOutgoingRequests(friendsData);
        });

        return () => unsubscribe(); // Unsubscribe when the component unmounts
      }
    };

      const fetchAllUsers = async () => {
        try {
          let usersRef = db.collection('users');
      
          // Apply the search term if it exists
          if (searchTerm) {
            usersRef = usersRef.where('name', '>=', searchTerm).where('name', '<=', searchTerm + '\uf8ff');
          }
      
          // Fetch all users from Firestore
          const usersSnapshot = await usersRef.get();
          const usersData = usersSnapshot.docs.map((doc) => doc.id);
          setUsers(usersData);
        } catch (error) {
          console.log('Error fetching users:', error);
        }
      };

      // Fetch data and subscribe to real-time updates
      fetchCurrentUserFriends();
      fetchCurrentUserPending();
      fetchCurrentUserRequests();
      fetchAllUsers();
      // Unsubscribe when the component unmounts
      //return unsubscribeAll;
    }, []);
  
  
    const filterFriendsByTab = () => {
      // Filter friends based on the active tab
      switch (activeTab) {
        case 'Friends':
          return friends;
        case 'Pending':
          return pending;
        case 'Requests':
          return requests;
        case 'Add Friends':
          return allUsers;
        default:
          return friends;
      }
    };
  
    const filteredFriends = filterFriendsByTab();
  

    return (
      <div className="p-4 h-screen bg-gray-100 background-light">
        <div className="bg-white rounded-md shadow-md">  
          {/* Tabs */}
          <div className="flex bg-gray-200">
            <button
              className={`px-4 py-2 flex-1 text-center btn-style ${
                activeTab === 'Friends' && 'active'
              }`}
              onClick={() => setActiveTab('Friends')}
            >
              All Friends
            </button>
            <button
              className={`px-4 py-2 flex-1 text-center btn-style ${
                activeTab === 'Pending' && 'active'
              }`}
              onClick={() => setActiveTab('Pending')}
            >
              Pending
            </button>
            <button
              className={`px-4 py-2 flex-1 text-center btn-style ${
                activeTab === 'Requests' && 'active'
              }`}
              onClick={() => setActiveTab('Requests')}
            >
              Requests
            </button>
            <button
              className={`px-4 py-2 flex-1 text-center btn-style ${
                activeTab === 'Add Friends' && 'active'
              }`}
              onClick={() => setActiveTab('Add Friends')}
            >
              Add Friends
            </button>
          </div>
          <div className="flex items-center justify-between p-4">
            {/* Search bar only displayed when activeTab is 'All' or 'Add Friends' */}
            {(activeTab === 'Add Friends') && (
              <>
                <input
                  type="text"
                  placeholder="Search friends..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-lg">Search</button>
              </>
            )}
          </div>
  
          <FriendList friends={filteredFriends} activeTab={activeTab}/>
        </div>
      </div>
    );
  }
  
  export default FriendSystem;