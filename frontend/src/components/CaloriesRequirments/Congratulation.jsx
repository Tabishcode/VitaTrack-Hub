import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

const Congratulation = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/user/profile");
        if (res.data.success) {
          const user = res.data.user;

          const dob = dayjs(user.dob);
          const today = dayjs();
          const age = today.diff(dob, "year");

          // Add missing values for compatibility
          const data = {
            ...user,
            age,
            weightUnit: "kg",
            heightUnit: "ft", // or cm if you want to convert
            activityLevel: "moderatelyActive", // You can replace this based on real data if available
          };

          setUserData(data);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const calculateResults = () => {
    if (!userData) return null;

    let { weight, height, age, activityLevel, goal, weightUnit, heightUnit } =
      userData;

    // Convert height to cm if needed
    if (heightUnit === "in") height *= 2.54;
    if (heightUnit === "ft") height *= 30.48;

    // Convert weight to kg if needed
    if (weightUnit === "lbs") weight *= 0.453592;

    // BMR calculation
    let bmr = 10 * weight + 6.25 * height - 5 * age + 5;

    const activityMultipliers = {
      sedentary: 1.2,
      lightlyActive: 1.375,
      moderatelyActive: 1.55,
      veryActive: 1.725,
      extremelyActive: 1.9,
    };

    bmr *= activityMultipliers[activityLevel] || 1;

    if (goal === "lose weight") bmr *= 0.9;
    else if (goal === "gain weight") bmr *= 1.1;

    const fats = (0.3 * bmr) / 9;
    const carbs = (0.5 * bmr) / 4;
    const protein = (0.2 * bmr) / 4;
    const waterIntake = weight * 35;

    return {
      bmr: Math.round(bmr),
      fats: Math.round(fats),
      carbs: Math.round(carbs),
      protein: Math.round(protein),
      waterIntake: Math.round(waterIntake),
    };
  };

  const results = calculateResults();

  if (!userData || !results) return <div>Loading...</div>;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg z-50 overflow-hidden">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-[90%] max-w-4xl">
        <h1 className="text-4xl font-bold text-green-600 text-center mb-6">
          🎉 Congratulations! 🎉
        </h1>
        <p className="text-md text-gray-600 text-center mb-8">
          Your form has been successfully submitted. Here are your personalized
          details and results:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Your Details Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h2 className="text-lg font-semibold text-blue-500 mb-4">
              Your Details:
            </h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <strong>Activity Level:</strong> {userData.activityLevel}
              </li>
              <li>
                <strong>Age:</strong> {userData.age}
              </li>
              <li>
                <strong>Weight:</strong> {userData.weight} {userData.weightUnit}
              </li>
              <li>
                <strong>Height:</strong> {userData.height} {userData.heightUnit}
              </li>
              <li>
                <strong>Goal:</strong> {userData.goal}
              </li>
            </ul>
          </div>

          {/* Your Results Section */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
            <h2 className="text-lg font-semibold text-green-500 mb-4">
              Your Results:
            </h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <strong>Daily Calories:</strong> {results.bmr} kcal
              </li>
              <li>
                <strong>Water Intake:</strong> {results.waterIntake} mL
              </li>
            </ul>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex justify-center space-x-6 mt-10">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
            onClick={() => navigate(0)}
          >
            Go Back
          </button>
          <button
            className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
            onClick={() => navigate("/FoodDashboard")}
          >
            Start Tracking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Congratulation;
