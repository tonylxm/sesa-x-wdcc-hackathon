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
