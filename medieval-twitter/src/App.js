import React from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import FriendSystem from './components/Friends';
import Leaderboard from './components/Leaderboard';
<<<<<<< HEAD
import Post from './components/Post';
=======
import PostDraft from './components/PostDraft';
>>>>>>> PostDraft
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/friends" element={<FriendSystem />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/postdraft" element={<PostDraft />} />
        
        <Route path="/post" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;