import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-lg">Logo</div>
          <ul className="flex space-x-4">
            <li>
                <Link to="/friends" className="text-white hover:text-gray-300"> Friends </Link>
            </li>
            <li>
                <Link to="/" className="text-white hover:text-gray-300"> Home </Link>
            </li>
            <li>
                <Link to="/" className="text-white hover:text-gray-300"> Home </Link>
            </li>
            <li>
                <Link to="/" className="text-white hover:text-gray-300"> Home </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
