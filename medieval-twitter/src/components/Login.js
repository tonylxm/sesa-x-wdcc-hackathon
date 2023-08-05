import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Check if email and password are provided
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all the fields.');
      return;
    }

    // Handle form submission logic here
    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log('User logged in');
      // Additional logic after successful login
      navigate('/feed');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.log('Login error:', error);
      // Handle login error
    }
  };

  return (
    <div className="background-lightdark min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
      <main className="max-w-sm mx-auto bg-white p-8 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-6 pt-3 rounded bg-gray-200">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 ml-3">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6 pt-3 rounded bg-gray-200">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 ml-3">
              Password
            </label>
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
            className="btn-style font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
          >
            Log In
          </button>

          <p className="mt-4 mx-auto">Don't have an account yet?</p>
          <Link to="/signup" className="mx-auto link-style font-bold">
            Sign Up Here
          </Link>
        </form>
      </main>
    </div>
  );
}

export default Login;
