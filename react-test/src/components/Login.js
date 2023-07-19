import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log('User logged in');
      // Additional logic after successful login
      navigate('/home');
    } catch (error) {
      console.log('Login error:', error);
      // Handle login error
    }

  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
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
          Log In
        </button>

        
        <p> Don't have an account yet? </p>
        <Link to="/signup"> Sign Up Here </Link>
      </form>
    </div>
  );
}

export default Login;
