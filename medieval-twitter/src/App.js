import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import FriendSystem from './components/Friends';
// import Leaderboard from './components/Leaderboard'; 
import { Post } from './components/Post';
import Feed from './components/Feed';
import Hierarchy from './components/Hierarchy';

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
        {/* <Route path="/leaderboard" element={<Leaderboard />} />  */}
        
        <Route path="/post" element={<Post />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/hierarchy" element={<Hierarchy />} />
      </Routes>
    </Router>
  );
}

export default App;
