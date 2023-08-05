import React from 'react';

import { useState, useEffect } from 'react';
import { PiThumbsUp, PiThumbsDown, PiThumbsUpFill, PiThumbsDownFill } from 'react-icons/pi';
import { BiCommentDetail, BiSolidCommentDots } from 'react-icons/bi';
import pfp from '../images/profile-picture.jpg';
import parchment from '../images/parchmentpost.png';
import { db, auth } from '../firebase';


function romanize (num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

export const Picture = ({img = pfp}) => {
    return (
        <>
        <div className="overflow-hidden rounded-lg w-16">
            <img src={img} alt={"Your profile pic"} className="rounded-full w-full h-16 object-cover shadow-md"  />
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

export const TextBody = ({text="This is some placeholder text. May the King live for a long time and have lots of good things. Our Father in Heaven, Hallowed be thy name. thy \
Kingdom come, thy will be done in Earth as it is in Heaven. Give us today our daily bread."}) => {
    return (
        <p>{text}
        </p>
    )
}

export const ReactionBar = ({dislikes=100, likes=273, comments=7}) => {
    const [thumbsUp, setThumbsUp] = useState(false)
    const [thumbsDown, setThumbsDown] = useState(false)
    const [comment, setComment] = useState(false) // to do : add a count that adds to the number of likes each time you press the button

    return (
        <div className=" flex">
            <button className="m-3 mt-8 ml-0 flex" onClick={()=>setThumbsUp(!thumbsUp)}>{thumbsUp ? <PiThumbsUpFill size="20"/> : <PiThumbsUp size="20"/>}<p className="ml-3 mr-3 mt-0">{romanize(likes)}</p></button>
            <button className="m-3 mt-8 ml-0 flex" onClick={()=>setThumbsDown(!thumbsDown)}>{thumbsDown ? <PiThumbsDownFill size="20"/> : <PiThumbsDown size="20"/>}<p className="ml-3 mr-3 mt-0">{romanize(dislikes)}</p></button>
            <button className="m-3 mt-8 ml-0 flex" onClick={()=>setComment(!comment)}>{comment ? <BiSolidCommentDots size="20"/> : <BiCommentDetail size="20"/>}<p className="ml-3 mr-3 mt-0">{romanize(comments)}</p></button>
        </div>
        
    )
}

export const Post = ({name, username, dislikes, comments, likes, text}) => {
    // Add props to Picture later when pfp is added
    return (
        <div style={{ backgroundImage: `url(${parchment})` }} className='m-auto p-10 w-1/2 h-1/4 bg-cover bg-center' >
            <div className="flex ">
                <div className="mb-5 ">
                <Picture />
                </div>
                <NameUsername name={name} username = {username}/>
            </div>
        
        <TextBody text={text}/>
        <ReactionBar likes={likes} dislikes={dislikes} comments={5} />
        </div>

    );
}
