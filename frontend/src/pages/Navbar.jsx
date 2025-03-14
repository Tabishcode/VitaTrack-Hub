import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaPlus, FaList, FaChartPie, FaCog } from "react-icons/fa";

const Navbar = ({ setActiveComponent }) => {
  const handleNavigation = (componentName) => {
    setActiveComponent(componentName);
  };
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const closeNavbar = (name) => {
    if (name) {
      setActiveComponent(name);
    }
    setIsCollapsed(true);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <NavLink className="navbar-brand" onClick={() => closeNavbar(null)}>
          Expense Manager
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`navbar-collapse ${!isCollapsed ? 'show slideInLeft' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link flex justify-center items-center" exact onClick={() => closeNavbar("Dashboard")}>
                <FaHome className="icon me-2" /> Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link caret-slate-500 flex justify-center items-center" onClick={() => closeNavbar("Add Expense")}>
                <FaPlus className="icon me-2" /> Add Expense
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink className="nav-link flex justify-center items-center" onClick={() => closeNavbar("Expense List")}>
                <FaList className="icon me-2" /> Expense List
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink className="nav-link flex justify-center items-center" onClick={() => closeNavbar("Analytics")}>
                <FaChartPie className="icon me-2" /> Analytics
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link flex justify-center items-center" onClick={() => closeNavbar("Settings")}>
                <FaCog className="icon me-2" /> Budget Limits
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <style jsx>{`
        .navbar {
          padding: 1rem;
        }
        .navbar-brand {
          font-size: 1.5rem;
        }
        .navbar-nav .nav-item {
          margin-left: 1rem;
        }
        .icon {
          font-size: 1.2rem;
          color: white;
        }
        @media (max-width: 768px) {
          .navbar-collapse {
            flex-direction: column;
            animation: slideInRight 0.3s ease-in-out;
          }
          .navbar-nav {
            margin-left: 1rem;
          }
          .nav-item {
            margin: 0;
          }
          .navbar-toggler {
            display: block;
          }
          .navbar-collapse.show {
            display: block;
          }
          .navbar-toggler-icon {
            background-color: white;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
