import React from 'react';
import {useState, useEffect} from 'react';
import { PiThumbsUp, PiThumbsDown, PiThumbsUpFill, PiThumbsDownFill } from 'react-icons/pi';
import { BiCommentDetail, BiSolidCommentDots } from 'react-icons/bi';
import { db, auth } from '../firebase';

export const Picture = () => {
    return (
        <>
        <div className="overflow-hidden rounded-lg w-16">
            <img src={require("../images/profile-picture.jpg")} alt={"Your profile pic"} className="rounded-full w-full h-16 object-cover"  />
        </div>
        </>
    );
}

export const NameUsername = () => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const fetchUserData = async () => {
        const currentUser = auth.currentUser;
        const userId = currentUser.uid;
  
        try {
          const userSnapshot = await db.collection('users').doc(userId).get();
          if (userSnapshot.exists) {
            const userData = userSnapshot.data();
            setUser(userData);
          }
        } catch (error) {
          console.log('Error fetching user data:', error);
        }
      };
  
      fetchUserData();
    }, []);
  
    return (
      <div>
        {user ? (
          <>
            <h1 className="font-bold w-full ml-5">{user.name}</h1>
            <h3 className="block ml-5">@{user.userName}</h3>  
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    );
  };

export const TextBody = () => {
    return (
        <p>This is some placeholder text. May the King live for a long time and have lots of good things. Our Father in Heaven, Hallowed be thy name. thy
            Kingdom come, thy will be done in Earth as it is in Heaven. Give us today our daily bread.
        </p>
    )
}

export const ReactionBar = () => {
    const [thumbsUp, setThumbsUp] = useState(false)
    const [thumbsDown, setThumbsDown] = useState(false)
    const [comment, setComment] = useState(false)

    return (
        <div className=" flex">
            <button className="m-3 mt-7 ml-0" onClick={()=>setThumbsUp(!thumbsUp)}>{thumbsUp ? <PiThumbsUpFill size="20"/> : <PiThumbsUp size="20"/>}</button>
            <button className="m-3 mt-7 ml-0" onClick={()=>setThumbsDown(!thumbsDown)}>{thumbsDown ? <PiThumbsDownFill size="20"/> : <PiThumbsDown size="20"/>}</button>
            <button className="m-3 mt-7 ml-0" onClick={()=>setComment(!comment)}>{comment ? <BiSolidCommentDots size="20"/> : <BiCommentDetail size="20"/>}</button>
        </div>
        
    )
}

export const Post = () => {
    return (
        <div className="m-auto p-10 shadow-md w-1/2 h-1/4">
            <div className="flex ">
                <div className="mb-5">
                <Picture />
                </div>
                <NameUsername />
            </div>
        
        <TextBody />
        <ReactionBar />
        </div>

    );
}
