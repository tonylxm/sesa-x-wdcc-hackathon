import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase'; // Import your Firebase configuration file

function Navbar() {
  const [currentUser, setCurrentUser] = useState(null); // Use state to store the current user

  useEffect(() => {
    // Add an event listener to listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user); // Update the currentUser state with the user object (null if not logged in)
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);
  
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user using Firebase's signOut method
      
      console.log('user signed out');
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-lg">Logo</div>
          {currentUser ? ( // Show the unordered list only if the user is signed in
            <ul className="flex space-x-4">
              <li>
                <Link to="/friends" className="text-white hover:text-gray-300"> Friends </Link>
              </li>
              <li>
                <Link to="/" className="text-white hover:text-gray-300"> Home </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-white hover:text-gray-300"> Leaderboard </Link>
              </li>
              <li>
                <Link to="/postdraft" className="text-white hover:text-gray-300"> Post Draft</Link>
              </li>
              <li>
                <Link to="/post" className="text-white hover:text-gray-300"> Post </Link>
              </li>
              <li>
                <Link
                    to="/login"
                    onClick={handleLogout}
                    className="text-white hover:text-gray-300 focus:outline-none"
                  >
                    Logout
                  </Link>
              </li>
            </ul>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;