import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import useAuth from "../hooks/useAuth";

const NavbarMain = ({ isLoggedIn, user, revalidate }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  // Toggle dropdown visibility
  const toggleDropdown = () => setDropdownVisible((prev) => !prev);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  // Close dropdowns when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target)
    ) {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigation handlers
  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  // User actions
  const handleProfileClick = () => {
    alert("Profile feature is under development!");
    setDropdownVisible(false);
  };

  const handleSettingsClick = () => {
    alert("Settings feature is under development!");
    setDropdownVisible(false);
  };

  const handleLogOutClick = async () => {
    try {
      await fetch("/api/user/logout", {
        method: "GET",
        credentials: "include",
      });
      revalidate();
      navigate("/");
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setDropdownVisible(false);
  };

  // Nav items data
  const navItems = [
    { name: "Food", path: "/welcome" },
    { name: "Fitness", path: "/fitness" },
    { name: "Reports", path: "/reports" },
    { name: "Blogs", path: "/blogs" },
  ];

  return (
    <nav className="bg-gray-800 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => navigate("/")}
          >
            <div className="flex items-center w-[85%] h-20">
              <div className="  w-[100%] h-[100%]  mr-2">
                <img
                  src="/logo_c.png"
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-semibold text-lg">VitaTrack</h3>
            </div>
          </div>

          {/* Center Menu Items */}
          <div className="flex space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                className="hover:text-blue-300 transition-colors font-medium"
                onClick={() => handleNavigation(item.path)}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* User Section */}
          <div className="relative flex items-center space-x-2">
            {!isLoggedIn ? (
              <div className="flex items-center gap-3">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-4 rounded transition-colors"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white py-1.5 px-4 rounded transition-colors"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div
                className="flex items-center cursor-pointer"
                onClick={toggleDropdown}
              >
                <img
                  src={user?.avatar || "https://via.placeholder.com/32"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full bg-gray-200 object-cover"
                />
                <span className="ml-2 text-sm font-medium">
                  {user?.username}
                </span>
                {dropdownVisible ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}

                {/* Dropdown Menu */}
                {dropdownVisible && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 top-10 bg-gray-700 text-white mt-2 w-48 rounded-md shadow-lg py-1 z-50"
                  >
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-600 transition-colors"
                      onClick={handleProfileClick}
                    >
                      Profile
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-600 transition-colors"
                      onClick={handleSettingsClick}
                    >
                      Settings
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-600 transition-colors"
                      onClick={handleLogOutClick}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden flex items-center justify-between h-16">
          {/* Mobile Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="flex items-center w-28 h-12">
              <div className="bg-blue-500 rounded-full p-2 mr-2">
                <FiChevronUp className="text-white text-lg" />
              </div>
              <h3 className="font-semibold">VitalHub</h3>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden bg-gray-700 px-4 py-3 absolute top-16 left-0 right-0 shadow-lg z-40"
          >
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  className="text-left py-2 px-3 hover:bg-gray-600 rounded transition-colors"
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.name}
                </button>
              ))}

              {!isLoggedIn ? (
                <div className="flex flex-col space-y-2 pt-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
                    onClick={() => handleNavigation("/login")}
                  >
                    Login
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors"
                    onClick={() => handleNavigation("/signup")}
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="pt-2 border-t border-gray-600">
                  <div className="flex items-center py-3 px-3">
                    <img
                      src={user?.avatar || "https://via.placeholder.com/32"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full bg-gray-200 object-cover mr-3"
                    />
                    <span className="font-medium">{user?.username}</span>
                  </div>
                  <button
                    className="block w-full text-left py-2 px-3 hover:bg-gray-600 rounded transition-colors"
                    onClick={handleProfileClick}
                  >
                    Profile
                  </button>
                  <button
                    className="block w-full text-left py-2 px-3 hover:bg-gray-600 rounded transition-colors"
                    onClick={handleSettingsClick}
                  >
                    Settings
                  </button>
                  <button
                    className="block w-full text-left py-2 px-3 hover:bg-gray-600 rounded transition-colors text-red-300"
                    onClick={handleLogOutClick}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarMain;
