import React, { useState, useEffect } from 'react';
import { Picture, NameUsername, Post } from './Post';
import { db } from '../firebase'; // Import your Firebase configuration file


const TextArea = () => {
    return (
        <div className=''>
            <textarea placeholder='Start your post here...'></textarea>
        </div>

    )
}

const Submit = () => {
    return (
        <button>Submit</button>
    );
}

export const PostDraft = () => {
    return (
        <div className="m-auto p-10 shadow-md w-1/2 h-1/4">
            <div className="flex ">
                <div className="mb-5">
                    <Picture />
                </div>
                <NameUsername />
            </div>
            <TextArea />
            <div>
            <Submit />
            </div>
        </div>

    );
}

export default PostDraft;