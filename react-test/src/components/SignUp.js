import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      console.log('User registered:', user);
      console.log(user.email);
      console.log(name);
      // Additional logic after successful sign-up
    
      //add user to firebase
        const userRef = db.collection('users').doc(user.uid);
        await userRef.set({
            email: user.email,
            name: name,
        });

        //add user to leaderboard
        db.collection('leaderboard').doc(user.uid).set({
          points: 0,
        });

        /*
        db.collection("users").doc(user.uid).collection("pending").add({});
        db.collection("users").doc(user.uid).collection("requests").add({});
        db.collection("users").doc(user.uid).collection("friends").add({});
        */

        //navigate to next page
        navigate('/home');
        } catch (error) {
        console.log('Sign-up error:', error);
        // Handle sign-up error
        }
    };

    return (
      <div className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
        <main className="max-w-sm mx-auto bg-white p-8 rounded-lg shadow-2xl">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 ml-3">Email</label>
              <input
                type="email"
                id="email"
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 ml-3">Name</label>
              <input
                type="text"
                id="name"
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 ml-3">Password</label>
              <input
                type="password"
                id="password"
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600"
            >
              Sign Up
            </button>
  
            <p className="mt-4 mx-auto">Already have an account?</p>
            <Link to="/login" className="text-blue-500 mx-auto hover:text-blue-600 font-bold">
              Login Here
            </Link>
          </form>
        </main>
      </div>
    );
  };

export default SignUp;
