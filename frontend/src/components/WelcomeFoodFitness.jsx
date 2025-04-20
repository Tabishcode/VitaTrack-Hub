import { useNavigate } from "react-router-dom";
import useCheckUserFormStatus from "../hooks/useCheckUserFormStatus";
import useAuth from "../hooks/useAuth"; // 🔹 Import useAuth to get user info

const WelcomeFoodFitness = () => {
  const navigate = useNavigate();
  const loading = useCheckUserFormStatus();
  const { user } = useAuth(); // 🔹 Access user object

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-lg text-gray-600">Checking your profile...</p>
      </div>
    );
  }

  const images = [
    {
      src: "https://img.freepik.com/free-photo/mexican-food-concept-with-clipboard_23-2147812195.jpg?t=st=1745170787~exp=1745174387~hmac=bd514b547456660c4db934baed757e3a0a067ed8b71e5146e65bdf89ef3d095b&w=900",
      caption: "Ready for some wins? Start tracking, it’s easy!",
    },
    {
      src: "https://img.freepik.com/free-vector/healthy-lifestyle-diet-fitness-vector-sign-shape-heart-with-multiple-icons-depicting-various-sports-vegetables-cereals-seafood-meat-fruit-sleep-weight-beverages_1284-44073.jpg?t=st=1745171198~exp=1745174798~hmac=e34a135fee53d29dfd99ce76ab8748d184e1f9ab0ef8a9c9bf8a1eaaece143b0&w=900",
      caption: "Discover the impact of your food and fitness",
    },
    {
      src: "https://img.freepik.com/free-vector/male-teen-thinking-about-eating-healthy-fod_1308-138139.jpg?t=st=1745171086~exp=1745174686~hmac=3a7c58844e911ee9d1d4c66a0997bf681c94b5be5d891e5726008c0c0f6d07c0&w=1060",
      caption: "And make mindful eating a habit for life",
    },
  ];

  const handleContinue = async () => {
    if (user?.isAdmin) {
      alert("Admin users are not allowed to continue.");
      return;
    }

    try {
      const response = await fetch("/api/user/isAuthen", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        navigate("/FoodDashboard");
      } else {
        navigate("/FoodForm");
      }
    } catch (error) {
      console.error("Error:", error);
      navigate("/FoodForm");
    }
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
          onClick={handleContinue}
          disabled={user?.isAdmin} // 🔹 Disable button for admins
          className={`bottom-3 px-28 py-3 text-white rounded-lg text-lg font-semibold transition duration-200
            ${
              user?.isAdmin
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }
          `}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default WelcomeFoodFitness;
