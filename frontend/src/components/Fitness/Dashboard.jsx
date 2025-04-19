// src/components/Dashboard.jsx
import React from 'react';
import './Dashboard.css';
import Chart from './Chart';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>
      <div className="dashboard-content">
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;