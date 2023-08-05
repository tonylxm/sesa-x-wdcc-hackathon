import React from 'react';
import {useState} from 'react';
import { PiThumbsUp, PiThumbsDown, PiThumbsUpFill, PiThumbsDownFill } from 'react-icons/pi';
import { BiCommentDetail, BiSolidCommentDots } from 'react-icons/bi';

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
    return (
        <div >
        <h1 className="font-bold w-full ml-5">Lord Faarquard</h1>
        <h3 className="block ml-5">@lordoftheland</h3>
        </div>
    );
}

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
    const [comment, setComment] = useState(false) // to do : add a count that adds to the number of likes each time you press the button

    return (
        <div className=" flex">
            <button className="m-3 mt-8 ml-0 flex" onClick={()=>setThumbsUp(!thumbsUp)}>{thumbsUp ? <PiThumbsUpFill size="20"/> : <PiThumbsUp size="20"/>}<p className="ml-3 mr-3 mt-0">1.2k</p></button>
            <button className="m-3 mt-8 ml-0 flex" onClick={()=>setThumbsDown(!thumbsDown)}>{thumbsDown ? <PiThumbsDownFill size="20"/> : <PiThumbsDown size="20"/>}<p className="ml-3 mr-3 mt-0">5</p></button>
            <button className="m-3 mt-8 ml-0 flex" onClick={()=>setComment(!comment)}>{comment ? <BiSolidCommentDots size="20"/> : <BiCommentDetail size="20"/>}<p className="ml-3 mr-3 mt-0">32</p></button>
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
