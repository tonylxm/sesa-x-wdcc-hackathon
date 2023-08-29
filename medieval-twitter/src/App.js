import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import FriendSystem from './components/Friends';
import PostDraft from './components/PostDraft';
import Hierarchy from './components/Hierarchy';
import { Post } from './components/Post';
import Feed from './components/Feed';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/sesa-x-wdcc-hackathon" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/friends" element={<FriendSystem />} />
        <Route path="/postdraft" element={<PostDraft />} />
        <Route path="/hierarchy" element={<Hierarchy />} />
        <Route path="/post" element={<Post />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </Router>
  );
}

export default App;
