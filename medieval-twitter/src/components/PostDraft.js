import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Picture, NameUsername, Post } from './Post';
import { BsImage, BsImageFill } from 'react-icons/bs';
import { RiFileGifLine, RiFileGifFill } from 'react-icons/ri';
import { db } from '../firebase'; // Import your Firebase configuration file




export const ExternalFiles = () => {
    const [image, selectImage] = useState(false)
    const [gif, selectGif] = useState(false)

    return (
        <div className=" flex">
            <button className="m-3 mt-7 ml-0" onClick={() => selectImage(!image)}>{image ? <BsImageFill size="20" /> : <BsImage size="20" />}</button>
            <button className="m-3 mt-7 ml-0" onClick={() => selectGif(!gif)}>{gif ? <RiFileGifFill size="20" /> : <RiFileGifLine size="20" />}</button>
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
