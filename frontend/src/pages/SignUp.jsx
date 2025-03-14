import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [selectedFeature, setSelectedFeature] = useState("");
  const navigate = useNavigate(); 

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // Handle sign-up logic here
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100  ">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96 border">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
              required
            />
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
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
          </div>
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="feature"
              className="block text-sm font-medium text-gray-700"
            >
              Select Features
            </label>
            <select
              id="feature"
              value={selectedFeature}
              onChange={(e) => setSelectedFeature(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
              required
            >
              <option value="">Choose a feature...</option>
              <option value="feature1">Feature 1</option>
              <option value="feature2">Feature 2</option>
              <option value="feature3">Feature 3</option>
              <option value="feature4">Feature 4</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-yellow-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-600">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <button className="w-full shadow-lg border flex text-center justify-center items-center font-semibold py-2 rounded-md hover:bg-red-700 transition duration-200">
          <img
            src="https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_256px.png"
            alt=""
            className="size-3 mr-4"
          />
          Sign Up with Google
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?
          <a href="#" className="text-blue-500 hover:underline">
            {" "}
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
