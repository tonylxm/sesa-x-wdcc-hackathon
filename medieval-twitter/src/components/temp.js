import React, { useState, useEffect } from 'react';
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
    const TextArea = () => {
        const [text, setText] = useState('');

        // word count
        const [wordCount, setWordCount] = useState(0);

        // character count
        const [charCount, setCharCount] = useState(0);

        // word limit
        const limit = 10;

        const changeHandler = (event) => {
            setText(event.target.value);
        };

        useEffect(() => {
            // array of words
            const words = text.split(' ');

            // update word count
            let wordCount = 0;
            words.forEach((word) => {
                if (word.trim() !== '') {
                    wordCount++;
                }
            });
            setWordCount(wordCount);

            // update char count (including whitespaces)
            setCharCount(text.length);
        }, [text]);

        return (
            <div>
                <textarea 
                value={text} 
                onChange={changeHandler} 
                id="text-area" 
                placeholder='Start your post here...' 
                className="w-full text-black-500 border rounded">
                    
                </textarea>
                <p id='word-count'>Character allowance: {wordCount}/{limit}</p>
            </div>
        )
    }

    const Submit = () => {
        return (
            <button className="float-right text-black-500 border border-black-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Submit</button>
        );
    }

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