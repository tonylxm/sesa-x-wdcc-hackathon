import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');


  //class selector
  const options = [
    { value: 'royal', label: 'Royal' },
    { value: 'noble', label: 'Noble' },
    { value: 'peasant', label: 'Peasant' },
    // Add more options as needed
  ];
  const [selectedStatus, setselectedStatus] = useState('');

  const handleSelectOption = (event) => {
    setselectedStatus(event.target.value);
  };

  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Add your email validation logic here (e.g., using regex)
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    // Add your password validation logic here (e.g., at least 6 characters)
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      console.log('User registered:', user);
      console.log(user.email);
      console.log(name);
      console.log(selectedStatus);

      let letters = 0; // Initialize letters variable with a default value
      if (selectedStatus === 'royal') {
        letters = 100;
      } else if (selectedStatus === 'noble') {
        letters = 50;
      } else if (selectedStatus === 'peasant') {
        letters = 10;
      }
      

      //add user to firebase
      const userRef = db.collection('users').doc(user.uid);
      await userRef.set({
        email: user.email,
        name: name,
        status: selectedStatus,
        letters: letters,
      });

      //add user to leaderboard
      db.collection('leaderboard').doc(user.uid).set({
        points: letters,
      });

      //navigate to next page
      navigate('/home');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setEmailError('Email is already used');
      } else {
        console.log('Sign-up error:', error);
        // Handle other sign-up errors
      }
    }
  };

  return (
    <div className="background-lightdark min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
      <main className="max-w-sm mx-auto bg-white p-8 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-6 pt-3 rounded bg-gray-200">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 ml-3">Email</label>
            <input
              type="email"
              id="email"
              className={`bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 ${
                emailError ? 'border-red-500' : 'border-gray-300'
              } focus:border-purple-600 transition duration-500 px-3 pb-3`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(''); // Remove error when user starts typing again
              }}
            />
            {emailError && <p className="text-red-500 text-xs mt-1 ml-3">{emailError}</p>}
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
            <label htmlFor="dropdown" className="block text-gray-700 text-sm font-bold mb-2 ml-3">
              Select Class
            </label>
            <select
              id="dropdown"
              value={selectedStatus}
              onChange={handleSelectOption}
              className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-indigo-500 transition duration-500 px-3 py-2 text-base"
            >
              <option value="">Class</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>


          <div className="mb-6 pt-3 rounded bg-gray-200">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 ml-3">Password</label>
            <input
              type="password"
              id="password"
              className={`bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 ${
                passwordError ? 'border-red-500' : 'border-gray-300'
              } focus:border-purple-600 transition duration-500 px-3 pb-3`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(''); // Remove error when user starts typing again
              }}
            />
            {passwordError && <p className="text-red-500 text-xs mt-1 ml-3">{passwordError}</p>}
          </div>
          <button
            type="submit"
            className="btn-style text-white font-bold py-2 rounded"
          >
            Sign Up
          </button>

          <p className="mt-4 mx-auto">Already have an account?</p>
          <Link to="/login" className="link-style mx-auto font-bold">
            Login Here
          </Link>
        </form>
      </main>
    </div>
  );
}

export default SignUp;

