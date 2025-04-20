import { useState, useEffect } from "react";
import FoodAttendance from "../components/FoodDashboard/FoodAttendence";
import { useNavigate } from "react-router-dom";
import { FaFireAlt, FaRunning, FaTint } from "react-icons/fa";
import axios from "axios";

const Dashboard = ({ attendance = true }) => {
  const navigate = useNavigate();

  // States to store fetched data
  const [calorieGoal, setCalorieGoal] = useState(0);
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [waterIntake, setWaterIntake] = useState(0);
  const [waterGoal, setWaterGoal] = useState(8); // Assuming a default water goal of 8 glasses

  useEffect(() => {
    // Fetch user profile to get calorie goal
    const fetchUserProfile = async () => {
      try {
        const profileResponse = await axios.get(
          "/api/user/profile"
        );
        const { calories, waterIntake: userWaterIntake } =
          profileResponse.data.user;
        setCalorieGoal(calories);
        setWaterIntake(userWaterIntake);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    // Fetch today's food attendance to calculate calories consumed
    const fetchAttendance = async () => {
      try {
        const attendanceResponse = await axios.get(
          "/api/attandance/today"
        );
        const meals = attendanceResponse.data.attendance.meals;
        const totalCalories = meals.reduce((total, meal) => {
          return (
            total +
            meal.foodItems.reduce(
              (mealTotal, foodItem) => mealTotal + foodItem.calories,
              0
            )
          );
        }, 0);
        setCaloriesConsumed(totalCalories);
      } catch (error) {
        console.error("Error fetching today's attendance:", error);
      }
    };

    // Call both fetch functions
    fetchUserProfile();
    fetchAttendance();
  }, []);

  const exerciseCaloriesBurned = 300; // Example exercise calories burned (this can be dynamic too)
  const remainingCalories =
    calorieGoal - caloriesConsumed + exerciseCaloriesBurned;
  const remainingWater = Math.max(waterGoal - waterIntake, 0);

  const [selectedMeals, setSelectedMeals] = useState({}); // Food grouped by meal

  const handleFoodTimetableClick = () => navigate("/FoodTimeTable");
  const handleRetakeInput = () => navigate("/FoodForm");
  const handleAdjustTimetable = () => navigate("/FoodTimeTable");

  const handleWaterChange = (change) => {
    setWaterIntake((prev) => Math.max(0, prev + change));
  };

  const handleSave = async () => {
    const meals = Object.entries(selectedMeals).map(([time, foodItems]) => ({
      time: time.toLowerCase(),
      foodItems: foodItems.map(({ name, calories }) => ({ name, calories })),
    }));

    const payload = {
      meals,
      waterIntake: waterIntake,
    };

    try {
      const response = await axios.post("/api/track", payload); // change URL as needed
      alert("Record saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save record.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-4">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 mb-4">
          <button
            onClick={handleAdjustTimetable}
            className="bg-purple-600 text-white px-8 py-4 rounded hover:bg-purple-700"
          >
            Adjust Timetable
          </button>

          <div className="text-center flex-1">
            <h2 className=" font-semibold text-gray-700">Track Your Meals</h2>
            <p className=" text-gray-500">
              Select meals to track your daily calorie intake
            </p>
          </div>

          <button
            onClick={handleRetakeInput}
            className="bg-yellow-500 text-white px-8 py-4 rounded hover:bg-yellow-600"
          >
            Retake Input
          </button>
        </div>

        {/* Food Selection */}
        {attendance && (
          <FoodAttendance
            setCaloriesConsumed={setCaloriesConsumed}
            setSelectedMeals={setSelectedMeals}
          />
        )}

        {/* Calorie & Water Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* Calorie Goal */}
          <div className="bg-blue-100 rounded-2xl p-5 shadow-md">
            <div className="flex items-center gap-2 mb-1">
              <FaFireAlt className="text-blue-600 text-xl" />
              <h2 className="text-sm font-semibold text-blue-800 uppercase">
                Calorie Goal
              </h2>
            </div>
            <p className="text-3xl font-extrabold text-blue-700">
              {calorieGoal} kcal
            </p>
            <p className="text-xs text-blue-500 mt-1">Your daily target</p>
          </div>

          {/* Remaining Calories */}
          <div className="bg-green-100 rounded-2xl p-5 shadow-md">
            <div className="flex items-center gap-2 mb-1">
              <FaRunning className="text-green-600 text-xl" />
              <h2 className="text-sm font-semibold text-green-800 uppercase">
                Remaining
              </h2>
            </div>
            <p className="text-3xl font-extrabold text-green-700">
              {remainingCalories} kcal
            </p>
            <p className="text-xs text-green-500 mt-1">Available after burn</p>
          </div>

          {/* Water Intake */}
          <div className="bg-gradient-to-br from-cyan-100 to-blue-50 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300">
            <div className="flex items-center gap-2 mb-1">
              <FaTint className="text-cyan-600 text-xl" />
              <h2 className="text-sm font-semibold text-cyan-800 uppercase tracking-wide">
                Water Intake
              </h2>
            </div>
            <p className="text-3xl font-extrabold text-cyan-700">
              {waterIntake} / {waterGoal} glasses
            </p>
            <p className="text-xs text-cyan-500 mt-1">
              {remainingWater} glasses remaining
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
