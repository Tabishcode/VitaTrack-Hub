
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className='header-list'>
        <li>Home</li>
        <li>Calories</li>
        <li>Diary</li>
        <li>Set Goals</li>
        <li>Articles</li>
        <li>Suggestions</li>
      </ul>
    </nav>
  );
};

export default Navbar;
