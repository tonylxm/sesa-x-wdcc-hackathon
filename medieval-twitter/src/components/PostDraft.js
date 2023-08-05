import React, { useState, useEffect } from 'react';
import { Picture, NameUsername, Post } from './Post';
import { PiThumbsUp, PiThumbsDown, PiThumbsUpFill, PiThumbsDownFill } from 'react-icons/pi';
import { BsImage, BsImageFill} from 'react-icons/bs';
import { BiCommentDetail, BiSolidCommentDots } from 'react-icons/bi';
import { db } from '../firebase'; // Import your Firebase configuration file


const TextArea = () => {
    var wordLen = 255; // Maximum word length
    // function checkWordLen(obj) {
    //     var len = obj.value.split(/[\s]+/);
    //     if (len.length > wordLen) {
    //         alert("You cannot put more than " + wordLen + " words in this text area.");
    //         obj.oldValue = obj.value != obj.oldValue ? obj.value : obj.oldValue;
    //         obj.value = obj.oldValue ? obj.oldValue : "";
    //         return false;
    //     }
    //     return true;
    // }
    // onKeyDown={checkWordLen(this)}

    

    return (
        <div>
            <textarea placeholder='Start your post here...' className="w-full text-black-500 border rounded"></textarea>
        </div>
    )
}

const Submit = () => {
    return (
        <button className="float-right text-black-500 border border-black-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Submit</button>
    );
}

export const ExternalFiles = () => {
    const [image, selectImage] = useState(false)
    const [thumbsDown, setThumbsDown] = useState(false)
    const [comment, setComment] = useState(false)

    return (
        <div className=" flex">
            <button className="m-3 mt-7 ml-0" onClick={() => selectImage(!image)}>{image ? <BsImageFill size="20" /> : <BsImage size="20" />}</button>
            <button className="m-3 mt-7 ml-0" onClick={() => setThumbsDown(!thumbsDown)}>{thumbsDown ? <PiThumbsDownFill size="20" /> : <PiThumbsDown size="20" />}</button>
            <button className="m-3 mt-7 ml-0" onClick={() => setComment(!comment)}>{comment ? <BiSolidCommentDots size="20" /> : <BiCommentDetail size="20" />}</button>
        </div>

    )
}

const PostDraft = () => {
    return (
        <div className="m-auto p-10 shadow-md w-1/2 h-1/4">
            <div className="flex ">
                <div className="mb-5">
                    <Picture />
                </div>
                <NameUsername />
            </div>
            <TextArea />
            <ExternalFiles />
            <div>
                <Submit />
            </div>
        </div>

    );
}

export default PostDraft;