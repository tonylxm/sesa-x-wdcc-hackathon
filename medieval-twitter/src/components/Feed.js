import { useState, useEffect } from 'react';
import { Post } from './Post';
import PostDraft from './PostDraft';
import { db } from '../firebase';

const Feed = () => {
    const [postData, setPostData] = useState([]);

    async function getUserInfo(userId) {
        try {
            const userRef = db.collection('users').doc(userId);
            const userSnapshot = await userRef.get();
    
            if (userSnapshot.exists) {
            const userData = userSnapshot.data();
            const { name, status, userName } = userData;
    
            return { id: userId, name, status, userName };
            } else {
            // Handle the case where the user document does not exist
            return null;
            }
        } catch (error) {
            console.log('Error fetching user info:', error);
            return null;
        }
    }
    async function getPostInfo(postId) {
        try {
            const postRef = db.collection('posts').doc(postId);
            const postSnapshot = await postRef.get();
    
            if (postSnapshot.exists) {
            const postData = postSnapshot.data();
            const { dislikes, likes, text, timestamp, userID } = postData; 
    
            return { id: postId, dislikes, likes, text, timestamp, userID };
            } else {
            // Handle the case where the user document does not exist
            return null;
            }
        } catch (error) {
            console.log('Error fetching post info:', error);
            return null;
        }
    }
    useEffect(() => {
        const fetchPostData = async () => {
          try {
            const postSnapshot = await db.collection('posts').orderBy('timestamp', 'desc').get();
            const postData = await Promise.all(
                postSnapshot.docs.map(async (doc) => {
                    const postId = doc.id;
                    const postData = doc.data();
                    const {  userID } = postData; 
                    const userData = await getUserInfo(userID);
                    return { id: postId, ...postData, ...userData };
                })
            );
            setPostData(postData);
          } catch (error) {
            console.log('Error fetching post data:', error);
          }
        };
    
        fetchPostData();
        console.log(postData)
      }, [postData]);

    // useEffect(() => {
    //     const fetchPostData = async () => {
    //       try {
    //         const postSnapshot = db.collection('posts').get();
    //         const postDataNew = await Promise.all(
    //             postSnapshot.docs.map(async (doc) => {
    //             const postId = doc.id;
    //             const dislikes = doc.data().dislikes;
    //             const likes = doc.data().likes;
    //             const text = doc.data().text;
    //             const userID = doc.data().userID;
    //             const comments = doc.data().comments
    //             const userData = await getUserInfo(userID);
    //             return { id: postId, dislikes, likes, text, userID, ...userData };
    //           })
    //         );


    //         console.log(postId);
    //         setPostData(postData.add(postDataNew));
    //       } catch (error) {
    //         console.log('Error fetching leaderboard data:', error);
    //       }
    //     };
    
    //     fetchPostData();
    //   }, []);
    
    return (
        <>
        <div className="bg-[url('./backgroundfeed.jpg')] bg-cover bg-center">
            <PostDraft />
            {postData.map((post) => (
                <Post key={post.timestamp} name={post.name} userName={post.userName} dislikes={post.dislikes} comments={post.comments} likes={post.likes} text={post.text} status={post.status} image={post.image} time ={"6 August 2023"}/>
            ))}
        </div>
        </>
    );
}

export default Feed;