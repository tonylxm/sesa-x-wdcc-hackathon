import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Picture, NameUsername, Post } from './Post';
import { PiThumbsUp, PiThumbsDown, PiThumbsUpFill, PiThumbsDownFill } from 'react-icons/pi';
import { BsImage, BsImageFill} from 'react-icons/bs';
import { BiCommentDetail, BiSolidCommentDots } from 'react-icons/bi';
import { db, auth } from '../firebase'; // Import your Firebase configuration file


/*const TextArea = () => {

    const [postContent, setPostContent] = useState('');

    const handleTextAreaChange = (event) => {
      setPostContent(event.target.value);
    };


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
      <textarea
        placeholder="Start your post here..."
        className="w-full text-black-500 border rounded"
        value={postContent}
        onChange={handleTextAreaChange}
      />
    </div>
  );
};
*/

/*const Submit = ({ postContent }) => {
    const handlePostSubmission = () => {
  
      if (postContent) {
        // Assuming you have a collection named "posts" in your Firebase firestore
        db.collection('posts')
          .add({
            text: postContent,
            timestamp: new Date(),
          })
          .then(() => {
            console.log('Post submitted successfully!');
          })
          .catch((error) => {
            console.error('Error submitting post:', error);
          });
      }
    };
  
    return (
      <button
        className="float-right text-black-500 border border-black-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={handlePostSubmission}
      >
        Submit
      </button>
    );
  };
  */

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
  const [postContent, setPostContent] = useState('');
  const navigate = useNavigate();

  const handleTextAreaChange = (event) => {
    setPostContent(event.target.value);
  };

  const handlePostSubmission = () => {
    if (postContent) {
      db.collection('posts')
        .add({
          text: postContent,
          userID: auth.currentUser.uid,
          likes: 0,
          dislikes: 0,
          timestamp: new Date(),
        })
        .then((docRef) => {
          console.log('Post submitted successfully with ID:', docRef.id);
  
          // Now, add a 'comments' collection to the document with a sample comment
          db.collection('posts')
            .doc(docRef.id) // Reference to the newly added post document
            .collection('comments') // Add 'comments' collection to the post document
            .add({
              text: 'Sample comment',
              userID: auth.currentUser.uid,
              timestamp: new Date(),
            })
            .then(() => {
              console.log('Comment added successfully to the post!');
            }).then (() => {
                navigate('/home');
            })
            .catch((error) => {
              console.error('Error adding comment to the post:', error);
            });
        })
        .catch((error) => {
          console.error('Error submitting post:', error);
        });
    }
  };

  return (
    <div className="m-auto p-10 shadow-md w-1/2 h-1/4">
      <div className="flex">
        <div className="mb-5">
          <Picture />
        </div>
        <NameUsername />
      </div>
      <div>
        <textarea
          placeholder="Start your post here..."
          className="w-full text-black-500 border rounded"
          value={postContent}
          onChange={handleTextAreaChange}
        />
      </div>
      <ExternalFiles />
      <div>
        <button
          className="float-right text-black-500 border border-black-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={handlePostSubmission}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PostDraft;
