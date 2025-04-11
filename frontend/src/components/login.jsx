import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    // captcha: false,
    remember: false
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [id]: "" }); // Clear error for the field
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    // if (!formData.email) {
    //   newErrors.email = "Email is required.";
    // } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    //   newErrors.email = "Please enter a valid email.";
    // }
    if (!formData.email) {
      newErrors.email = "Username is Required.";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 5) {
      newErrors.password = "Password must be at least 5 characters long.";
    }

    // Captcha validation
    // if (!formData.captcha) {
    //   newErrors.captcha = "Please confirm you are not a robot.";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Form is valid if no errors
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Make the login API call
        const loginResponse = await fetch('/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.email,
            password: formData.password,
          }),
        });
  
        const loginData = await loginResponse.json();
  
        if (loginData.success) {
          // Login successful
          onLogin();
  
          // Check user details
          const detailsResponse = await fetch("/api/user/checkDetails");
          const detailsData = await detailsResponse.json();
  
          if (detailsData.details) {
            navigate("/FoodDashboard"); // Redirect to FoodDashboard
          } else {
            navigate("/welcome"); // Redirect to welcome
          }
        } else {
          // Login failed
          console.error('Login failed');
          setErrors({ ...errors, login: "There was an error logging you in! Please Try Again" });
        }
      } catch (error) {
        console.error('Error:', error);
        setErrors({ ...errors, login: "An unexpected error occurred. Please try again later." });
      }
    }
  };
  

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-12 w-5/12 m-5">
        <h1 className="text-2xl font-bold text-center mb-3">Login</h1>
        <p className="text-center">Username: admin Pass: admin</p>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full border ${errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 block w-full border ${errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2`}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 top-6 flex items-center pr-3"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
              ) : (
                <AiOutlineEye
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="mr-2 shadow-xl"
                onChange={handleChange}
                checked={formData.captcha} />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember Me
              </label>
            </div>
            <button
              onClick={() => { alert("The Feature is currently under Development!") }}
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
          {/* <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="captcha"
              checked={formData.captchaChecked}
              onChange={handleChange}
              className="mr-2 shadow-2xl"
            />
            <label htmlFor="captcha" className="text-sm text-gray-600">
              I am not a robot
            </label>
          </div> */}
          {errors.captchaChecked && (
            <p className="text-red-500 text-sm mt-1">{errors.captchaChecked}</p>
          )}
          {errors.login && (
            <p className="text-red-500 text-base font-bold text-center mb-3 mt-1">{errors.login}</p>
          )}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-yellow-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-600">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <button
          className="w-full shadow-lg border flex text-center justify-center items-center font-semibold py-2 rounded-md hover:bg-slate-300 transition duration-200"
          onClick={() => {
            alert("The Feature is currently under development!");
          }}
        >
          <img
            src="https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_256px.png"
            alt=""
            className="size-3 mr-4"
          />
          Continue with Google
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?
          <a href="/signup" className="text-blue-500 hover:underline">
            {" "}
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
