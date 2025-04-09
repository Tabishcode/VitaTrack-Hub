import { useState } from "react";
// import FoodAttendance from "../components/FoodDashboard/FoodAttendence"; // Make sure to import the new component
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Dashboard = () => {
    const navigate = useNavigate(); // Initialize the useNavigate hook

    // Static values to be changed by your conditions
    const calorieGoal = 2000;
    const initialCaloriesConsumed = 1200; // This will be updated based on attendance
    const [caloriesConsumed, setCaloriesConsumed] = useState(
        initialCaloriesConsumed
    );

    const fatsConsumed = 40; // in grams
    const carbsConsumed = 150; // in grams
    const sugarsConsumed = 50; // in grams
    const waterIntake = 6; // in glasses
    const exerciseCaloriesBurned = 300; // in calories

    // Calculating remaining calories
    const remainingCalories =
        calorieGoal - caloriesConsumed + exerciseCaloriesBurned;

    const handleFoodTimetableClick = () => {
        navigate("/FoodTimeTable"); // Redirect to /fooddiary when the button is clicked
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
                {/* Today's Total Calorie Goal */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-700">
                        Today's Total Calorie Goal
                    </h2>
                    <p className="text-4xl font-semibold text-blue-600 mt-2">
                        {calorieGoal} kcal
                    </p>
                </div>

                {/* Remaining Calories */}
                <div className="bg-blue-100 rounded-lg p-6 text-center mb-8">
                    <h3 className="text-xl font-semibold text-blue-700">
                        Remaining Calories
                    </h3>
                    <p className="text-3xl font-bold text-blue-700 mt-2">
                        {remainingCalories} kcal
                    </p>
                </div>

                {/* Nutrient Breakdown */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {/* Fats */}
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <h4 className="text-lg font-semibold text-gray-700">
                            Fats Consumed
                        </h4>
                        <p className="text-2xl font-bold text-gray-800">{fatsConsumed}g</p>
                        <p className="text-sm text-gray-500">Recommended: 70g</p>
                    </div>

                    {/* Carbs */}
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <h4 className="text-lg font-semibold text-gray-700">
                            Carbs Consumed
                        </h4>
                        <p className="text-2xl font-bold text-gray-800">{carbsConsumed}g</p>
                        <p className="text-sm text-gray-500">Recommended: 250g</p>
                    </div>

                    {/* Sugars */}
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <h4 className="text-lg font-semibold text-gray-700">
                            Sugars Consumed
                        </h4>
                        <p className="text-2xl font-bold text-gray-800">
                            {sugarsConsumed}g
                        </p>
                        <p className="text-sm text-gray-500">Recommended: 50g</p>
                    </div>

                    {/* Water Intake */}
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <h4 className="text-lg font-semibold text-gray-700">
                            Water Intake
                        </h4>
                        <p className="text-2xl font-bold text-gray-800">
                            {waterIntake} glasses
                        </p>
                        <p className="text-sm text-gray-500">Goal: 8 glasses</p>
                    </div>
                </div>

                {/* Exercise Calories Burned */}
                <div className="bg-green-100 rounded-lg p-6 text-center mb-8">
                    <h3 className="text-xl font-semibold text-green-700">
                        Exercise Calories Burned
                    </h3>
                    <p className="text-3xl font-bold text-green-700 mt-2">
                        {exerciseCaloriesBurned} kcal
                    </p>
                </div>

                {/* My Food Timetable Button */}
                <div className="text-center mb-8">
                    <button
                        onClick={handleFoodTimetableClick} // Add onClick handler
                        className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
                    >
                        My Food Timetable
                    </button>
                </div>

                {/* Food Attendance Section */}
                {/* <FoodAttendance setCaloriesConsumed={setCaloriesConsumed} /> */}
            </div>
        </div>
    );
};

export default Dashboard;
