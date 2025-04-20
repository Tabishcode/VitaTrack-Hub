import { useNavigate } from "react-router-dom";
import useCheckUserFormStatus from "../hooks/useCheckUserFormStatus";

const WelcomeFoodFitness = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const loading = useCheckUserFormStatus();
  // 🔒 Block UI while checking auth
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-lg text-gray-600">Checking your profile...</p>
      </div>
    );
  }
  const images = [
    {
      src: "https://www.myfitnesspal.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvalue-prop-1.51bb606c.png&w=1200&q=75", // Replace with your image URL
      caption: "Ready for some wins? Start tracking, it’s easy!",
    },
    {
      src: "https://www.myfitnesspal.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvalue-prop-2.66444795.png&w=1200&q=75", // Replace with your image URL
      caption: "Discover the impact of your food and fitness",
    },
    {
      src: "https://www.myfitnesspal.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvalue-prop-3.258be271.png&w=1200&q=75", // Replace with your image URL
      caption: "And make mindful eating a habit for life",
    },
  ];

  const handleContinue = async () => {
    try {
      let response = await fetch("/api/user/isAuthen");
      let data = await response.json();
      if (data.success) {
        navigate("/FoodDashboard"); // Redirect to /FoodDashboard when the button is clicked
      } else {
        navigate("/FoodForm"); // Redirect to /FoodForm when the button is clicked
      }
    } catch (error) {
      console.error("Error:", error);
    }
    navigate("/FoodForm"); // Redirect to /FoodForm when the button is clicked
  };

  return (
    <div className="mt-[3%] text-center mb-4">
      <div className="text-slate-700 text-[30px]">Welcome to</div>
      <div className="text-blue-800 text-[35px] font-bold">
        Fitness and Food Tracker
      </div>
      <div className="flex flex-col items-center">
        <div className="flex space-x-4 mt-4 px-[7%]">
          {images.map((image, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={image.src}
                alt={image.caption}
                className="object-cover rounded-lg shadow-md"
              />
              <p className="mt-2 text-xl mb-[10%] px-[6%] text-center text-gray-700">
                {image.caption}
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={handleContinue} // Add onClick handler
          className="bottom-3 px-28 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-200"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default WelcomeFoodFitness;
