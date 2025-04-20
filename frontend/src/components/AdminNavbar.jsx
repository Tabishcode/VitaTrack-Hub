import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import arrow_logo from "../../public/arrow_top.png";

const AdminNavbar = ({ user, revalidate }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownVisible((prev) => !prev);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible]);

  const handleLogOutClick = async () => {
    await fetch("/api/user/logout", {
      method: "GET",
      credentials: "include",
    });
    revalidate();
    alert("Logged out successfully!");
    setDropdownVisible(false);
  };

  return (
    <nav className="bg-gray-900 text-white p-4 top-0 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <div
          className="flex items-center hover:cursor-pointer"
          onClick={() => navigate("/admin")}
        >
          <img src={arrow_logo} alt="logo" className="object-contain size-10" />
          <h3 className="font-semibold ml-2">Admin Panel</h3>
        </div>

        {/* Admin Links */}
        <div className="flex space-x-10 text-sm font-medium">
          <button
            className="hover:text-blue-400"
            onClick={() => navigate("/admin")}
          >
            Dashboard
          </button>
          <button
            className="hover:text-blue-400"
            onClick={() => alert("Under Development")}
          >
            Users
          </button>
          <button
            className="hover:text-blue-400"
            onClick={() => alert("Under Devlopment")}
          >
            Reports
          </button>
        </div>

        {/* Admin Profile */}
        <div className="relative flex items-center space-x-2">
          <div
            className="flex items-center cursor-pointer"
            onClick={toggleDropdown}
          >
            <img
              src="https://th.bing.com/th/id/R.1c75547f74d8aa7720a495f208c9b1c8?rik=cm6kaKgbGRM6Cg&pid=ImgRaw&r=0"
              alt="profile"
              className="size-8 rounded-full bg-white"
            />
            <p className="text-xs px-2">{user?.username || "Admin"}</p>
            <img
              src={
                dropdownVisible
                  ? "https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-up-01-1024.png"
                  : "https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-down-01-1024.png"
              }
              alt="toggle"
              className="size-4"
            />
          </div>

          {/* Dropdown */}
          {dropdownVisible && (
            <div
              ref={dropdownRef}
              className="absolute right-0 top-10 bg-gray-700 text-white mt-2 w-40 rounded shadow-lg z-10"
            >
              <ul>
                <li
                  className="p-2 hover:bg-gray-600 cursor-pointer"
                  onClick={() => alert("Admin Profile under development")}
                >
                  Profile
                </li>
                <li
                  className="p-2 hover:bg-gray-600 cursor-pointer"
                  onClick={handleLogOutClick}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
