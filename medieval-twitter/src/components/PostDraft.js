import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Import your Firebase configuration file

const Picture = () => {
    return (
        <>
        <div className="overflow-hidden rounded-lg w-16">
            <img src={require("../images/profile-picture.jpg")} alt={"Your profile pic"} className="rounded-full w-full h-16 object-cover"  />
        </div>
        </>
    );
}

const NameUsername = () => {
    return (
        <div >
        <h1 className="font-bold w-full ml-5">Lord Faarquard</h1>
        <h3 className="block ml-5">@lordoftheland</h3>
        </div>
    );
}

const Text = () => {
    return (
        <div className=''>
            <textarea placeholder='Start your post here...'></textarea>
        </div>
        
    )
}

const PostDraft = () => {

    return (
        <div className="m-auto p-20 shadow-md w-3/4 h-1/4">
            <Picture />
            <NameUsername />
            <Text />
        </div>
    );
}

export default PostDraft;