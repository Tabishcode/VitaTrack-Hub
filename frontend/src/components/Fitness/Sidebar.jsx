// src/components/Sidebar.jsx
import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/reports">Reports</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;

// src/components/Sidebar.css
