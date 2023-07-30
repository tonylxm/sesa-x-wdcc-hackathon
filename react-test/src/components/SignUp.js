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
        const userRef = db.collection('users').doc(user.uid); // Assuming 'users' is the collection name
        await userRef.set({
            email: user.email,
            name: name,
        });
        db.collection("users").doc(user.uid).collection("pending").add({});
        db.collection("users").doc(user.uid).collection("requests").add({});
        db.collection("users").doc(user.uid).collection("friends").add({});

        //navigate to next page
        navigate('/home');
        } catch (error) {
        console.log('Sign-up error:', error);
        // Handle sign-up error
        }
    };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="max-w-sm">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            className="border border-gray-400 p-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
                type="text"
                id="name"
                className="border border-gray-400 p-2 w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            className="border border-gray-400 p-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>

        <p>Already have an account? </p>
        <Link to="/login"> Login Here </Link>
      </form>
    </div>
  );
}

export default SignUp;
