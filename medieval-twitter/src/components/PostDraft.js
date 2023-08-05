import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Import your Firebase configuration file

function PostDraft() {

    return (
    <div>
        <div>
            <h1>Profile Photo</h1>
        </div>
        <div>
            <textarea>

            </textarea>
        </div>
        <div>
            <button>Submit</button>
        </div>
    </div>
    );   
}

export default PostDraft;