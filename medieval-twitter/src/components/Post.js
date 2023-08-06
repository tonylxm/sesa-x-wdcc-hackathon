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

const NameUsernameTime = ({name="testingname", userName="testusername", time}) => {
    return (
      <div>
          <>
            <h1 className="font-bold w-full ml-5">{name}</h1>
            <h3 className="block ml-5">@{userName}</h3>  
          </>
      </div>

    );
}

export const TextBody = ({text="This is some placeholder text. May the King live for a long time and have lots of good things. Our Father in Heaven, Hallowed be thy name. thy \
Kingdom come, thy will be done in Earth as it is in Heaven. Give us today our daily bread."}) => {
    return (
        <p>{text}
        </p>
    )
}

export const ReactionBar = ({dislikes=100, likes=273, comments=7}) => {
    const [thumbsUp, setThumbsUp] = useState(false)
    const [numLikes, setLikes] = useState(likes)
    const [thumbsDown, setThumbsDown] = useState(false)
    const [numDislikes, setDislikes] = useState (dislikes)
    const [comment, setComment] = useState(false) // to do : add a count that adds to the number of likes each time you press the button
    const [numComments, setNumComments] = useState(comments)

    const handleThumbsUp = () => {
      if (thumbsUp && !thumbsDown) {
        setThumbsUp(!thumbsUp)
        setLikes(numLikes - 1)
      } else if (!thumbsUp && !thumbsDown){
        setThumbsUp(!thumbsUp)
        setLikes(numLikes + 1)
      } else if (!thumbsUp && thumbsDown) {
        setThumbsDown(false)
        setDislikes(numDislikes - 1)
        setThumbsUp(true)
        setLikes(numLikes + 1)
      }
    }

    const handleThumbsDown = () => {
      if (thumbsDown && !thumbsUp) {
        setThumbsDown(false)
        setDislikes(numDislikes - 1)
      } else if (!thumbsDown && !thumbsUp) {
        setThumbsDown(true)
        setDislikes(numDislikes + 1)
      } else if (!thumbsDown && thumbsUp) {
        setThumbsUp(false)
        setLikes(numLikes - 1)
        setThumbsDown(true)
        setDislikes(numDislikes + 1)
      }
    }

    return (
        <div className=" flex">
            <button className="m-3 mt-8 ml-0 flex" onClick={handleThumbsUp}>{thumbsUp ? <PiThumbsUpFill size="20"/> : <PiThumbsUp size="20"/>}<p className="ml-3 mr-3 mt-0">{romanize(numLikes)}</p></button>
            <button className="m-3 mt-8 ml-0 flex" onClick={handleThumbsDown}>{thumbsDown ? <PiThumbsDownFill size="20"/> : <PiThumbsDown size="20"/>}<p className="ml-3 mr-3 mt-0">{romanize(numDislikes)}</p></button>
            <button className="m-3 mt-8 ml-0 flex" onClick={()=>setComment(!comment)}>{comment ? <BiSolidCommentDots size="20"/> : <BiCommentDetail size="20"/>}<p className="ml-3 mr-3 mt-0">{romanize(numComments)}</p></button>
        </div>
        
    )
}

export const Post = ({name, userName, dislikes, comments, status, likes, text, time}) => {
    // Add props to Picture later when pfp is added
    return (
        // <div style={{ backgroundImage: `url(${parchment})` }} className='m-auto p-10 w-1/2 h-1/4 bg-cover' >
        <div style={{
        backgroundImage: `url(${parchment})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
      }}  className='m-auto p-10 w-1/2 h-1/4 bg-cover' >
            <div className="flex ">
                <div className="mb-5 ">
                <Picture />
                </div>
                <NameUsernameTime name={name} userName = {userName} time = {time} />
            </div>
        
        <TextBody text={text}/>
        <ReactionBar likes={likes} dislikes={dislikes} comments={5} />
        </div>

    );
}
