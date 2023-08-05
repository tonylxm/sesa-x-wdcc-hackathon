import React from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import FriendSystem from './components/Friends';
<<<<<<< HEAD
import Leaderboard from './components/Leaderboard';
import Post from './components/Post';
import PostDraft from './components/PostDraft';
=======
import Hierarchy from './components/Hierarchy';
>>>>>>> ada495d8b0b8c82a72d10af9b3c60b3ca8579a36
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/friends" element={<FriendSystem />} />
<<<<<<< HEAD
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/postdraft" element={<PostDraft />} />
=======
        <Route path="/hierarchy" element={<Hierarchy />} />
>>>>>>> ada495d8b0b8c82a72d10af9b3c60b3ca8579a36
        
        <Route path="/post" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;