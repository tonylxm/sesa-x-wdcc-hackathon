import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Picture, NameUsername, Post } from './Post';
import { BsImage, BsImageFill } from 'react-icons/bs';
import { RiFileGifLine, RiFileGifFill } from 'react-icons/ri';
import { db, auth, storage } from '../firebase'; // Import your Firebase configuration file

import GphApiClient from 'giphy-js-sdk-core';

const apiKey = '0daeIg73TT6IvweTfhK6aM54rZLCbOLD';
const giphyClient = GphApiClient(apiKey);


//search for gif
export const GiphySearch = ({ onGifSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [gifs, setGifs] = useState([]);

  const handleSearch = () => {
    giphyClient.search('gifs', { q: searchQuery, limit: 10 })
      .then((response) => {
        setGifs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching GIFs:', error);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for GIFs"
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {gifs.map((gif) => (
          <img
            key={gif.id}
            src={gif.images.fixed_height.url}
            alt="GIF"
            onClick={() => onGifSelect(gif.images.fixed_height.url)}
          />
        ))}
      </div>
    </div>
  );
};
// export const ExternalFiles = () => {
//   const [image, selectImage] = useState(false);
//   const [gif, selectGif] = useState(false);
//   const [file, selectFile] = useState(null);
//   const [imageURL, setImageURL] = useState('');
//   const [gifURL, setGifURL] = useState('');


//   const fileSelectorHandler = (event) => {
//     console.log(event.target.files[0]);
//     selectFile(event.target.files[0]);

//     // Show the selected image immediately after the user selects it
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImageURL(reader.result);
//       selectImage(true);
//     };
//     if (event.target.files[0]) {
//       reader.readAsDataURL(event.target.files[0]);
//     }
//   };

//   const handleGifSelect = (gifUrl) => {
//     setGifURL(gifUrl);
//     selectGif(true);
//   };

//   const uploadFileHandler = () => {
//     if (!file) {
//       console.log('No file selected.');
//       return;
//     }
  
//     const storageRef = storage.ref();
//     const imageRef = storageRef.child(auth.currentUser.uid + '/' + new Date() + '/' + file.name);
  
//     // Upload the file to Firebase Storage
//     imageRef
//       .put(file)
//       .then((snapshot) => {
//         console.log('File uploaded successfully!', snapshot);
//         return snapshot.ref.getDownloadURL();
//       })
//       .catch((error) => {
//         console.error('Error uploading file:', error);
//       });
//   };
  
//   return (
//     <div className=" flex">
//       <input type='file' onChange={fileSelectorHandler} />
//       <button
//         className="m-3 mt-7 ml-0"
//         onClick={() => {
//           uploadFileHandler();
//           selectImage(!image);
//         }}
//       >
//         {image ? <BsImageFill size="20" /> : <BsImage size="20" />}
//       </button>
//       <GiphySearch onGifSelect={handleGifSelect} />
//       <button className="m-3 mt-7 ml-0" onClick={() => selectGif(!gif)}>
//         {gif ? <RiFileGifFill size="20" /> : <RiFileGifLine size="20" />}
//       </button>

//       {imageURL && <img src={imageURL} alt="Uploaded" />}
//     </div>
//   );
// };


const PostDraft = () => {

  const [postContent, setPostContent] = useState('');
  const navigate = useNavigate();

  // character count
  const [charCount, setCharCount] = useState(0);

  const [user, setUser] = useState('');

  // word limit
  let limit = 20;

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      const userId = currentUser.uid;

      console.log(userId);

      try {
        const userSnapshot = await db.collection('users').doc(userId).get();
        if (userSnapshot.exists) {
          const userData = userSnapshot.data();
          setUser(userData);
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (user.status === 'royal') {
    limit = 100;
  }
  else if (user.status === 'noble') {
    limit = 50;
  }
  else if (user.status === 'king') {
    limit = 999999999999999999;
  }
  else {
    limit = 10;
  }

  //gif handling
  const [searchQuery, setSearchQuery] = useState('');
  const [gifs, setGifs] = useState([]);

  const handleSearch = () => {
    giphyClient.search('gifs', { q: searchQuery, limit: 10 })
      .then((response) => {
        setGifs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching GIFs:', error);
      });
  };

  //image handling
  const [image, selectImage] = useState(false);
  const [gif, selectGif] = useState(false);
  const [file, selectFile] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [gifURL, setGifURL] = useState('');

  const fileSelectorHandler = (event) => {
    console.log(event.target.files[0]);
    selectFile(event.target.files[0]);

    // Show the selected image immediately after the user selects it
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageURL(reader.result);
      selectImage(true);
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleGifSelect = (gifUrl) => {
    setGifURL(gifUrl);
    selectGif(true);
  };

  const uploadFileHandler = () => {
    if (!file) {
      console.log('No file selected.');
      return;
    }
  
    const storageRef = storage.ref();
    const imageRef = storageRef.child(auth.currentUser.uid + '/' + new Date() + '/' + file.name);
  
    // Upload the file to Firebase Storage
    imageRef
      .put(file)
      .then((snapshot) => {
        console.log('File uploaded successfully!', snapshot);
        return snapshot.ref.getDownloadURL();
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  };

  // flag to track if the limit has been exceeded
  const [limitExceeded, setLimitExceeded] = useState(false);

  const handleTextAreaChange = (event) => {
    const newContent = event.target.value;
    if (newContent.length <= limit) {
      setPostContent(newContent);
      setCharCount(newContent.length);
      if (limitExceeded) {
        setLimitExceeded(false);
      }
    } else {
      setLimitExceeded(true);
    }
  };

  useEffect(() => {
    if (limitExceeded) {
      console.log("Character Allowance Reached!!!");
      alert("Character Allowance Reached!!!");
    }
  }, [limitExceeded]);

  const handlePostSubmission = () => {
    if (postContent) {
      const storageRef = storage.ref();
      let imageUrl = null;
      setPostContent('');

      // If an image is selected, upload it to Firebase Storage first
      if (file) {
        const imageRef = storageRef.child(
          auth.currentUser.uid + '/' + new Date() + '/' + file.name
        );

        imageRef
          .put(file)
          .then((snapshot) => {
            console.log('File uploaded successfully!', snapshot);
            return snapshot.ref.getDownloadURL();
          })
          .then((downloadURL) => {
            console.log('Image URL:', downloadURL);
            imageUrl = downloadURL; // Store the image URL to be added in the post data
            submitPostWithImage(imageUrl); // Call the function to submit the post with the image URL
          })
          .catch((error) => {
            console.error('Error uploading file:', error);
            submitPostWithImage(imageUrl); // Even if there's an error, submit the post without the image URL
          });
      } else {
        // If no image is selected, submit the post without the image URL
        submitPostWithImage(imageUrl);
      }
    }
  };
  const submitPostWithImage = (imageUrl) => {
    db.collection('posts')
      .add({
        text: postContent,
        image: imageUrl, // Add the image URL to the post data
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
          })
          .then(() => {
            navigate('/feed');
          })
          .catch((error) => {
            console.error('Error adding comment to the post:', error);
          });
      })
      .catch((error) => {
        console.error('Error submitting post:', error);
      });
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
      <p id='word-count'>Character allowance: {charCount}/{limit}</p>

      <div className=" flex">
        <input type='file' onChange={fileSelectorHandler} />
        {/* <button
          className="m-3 mt-7 ml-0"
          onClick={() => {
            uploadFileHandler();
            selectImage(!image);
          }}
        >
          {image ? <BsImageFill size="20" /> : <BsImage size="20" />}
        </button> */}
        {/* <div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for GIFs"
          />
          <button onClick={handleSearch}>Search</button>

          <div>
            {gifs.map((gif) => (
              <img
                key={gif.id}
                src={gif.images.fixed_height.url}
                alt="GIF"
                onClick={() => handleGifSelect(gif.images.fixed_height.url)}
              />
            ))}
          </div>
        </div> */}
        {/* <button className="m-3 mt-7 ml-0" onClick={() => selectGif(!gif)}>
          {gif ? <RiFileGifFill size="20" /> : <RiFileGifLine size="20" />}
        </button> */}

        {imageURL && <img src={imageURL} alt="Uploaded" />}
      </div>

      <div>
        <button
          className="float-right btn-style nt-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="submit"
          onClick={handlePostSubmission}
        > Submit
        </button>
      </div>
    </div>
  );
};

export default PostDraft;
