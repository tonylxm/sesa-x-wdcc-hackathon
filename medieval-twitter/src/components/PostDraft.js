import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Import your Firebase configuration file

const Picture = () => {
    return (
        <>
            <div className="overflow-hidden rounded-lg w-20">
                <img src={require("../images/profile-picture.jpg")} alt={"Your profile pic"} className="rounded-full w-full h-20  object-cover" />
            </div>
        </>
    );
}

const NameUsername = () => {
    return (
        <>
            <h1>Lord Faarquard</h1>
            <h3>@lordoftheland</h3>
        </>
    );
}

const Text = () => {
    return (
        <textarea placeholder='Start your post here...'></textarea>
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