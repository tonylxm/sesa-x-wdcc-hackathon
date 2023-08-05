import React from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import FriendSystem from './components/Friends';
import Hierarchy from './components/Hierarchy';
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
        <Route path="/hierarchy" element={<Hierarchy />} />
        
        
      </Routes>
    </Router>
  );
}

export default App;