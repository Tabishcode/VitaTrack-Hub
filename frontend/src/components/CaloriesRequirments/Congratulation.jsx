import { useNavigate } from "react-router-dom";

const Congratulation = ({ data }) => {
  const navigate = useNavigate();

  const calculateResults = () => {
    let { weight, height, age, activityLevel, goal, weightUnit, heightUnit } =
      data;

    // Convert height to cm if needed
    if (heightUnit === "in") height *= 2.54;

    // Convert weight to kg if needed
    if (weightUnit === "lbs") weight *= 0.453592;

    // Calculate BMR (Harris-Benedict Equation for Men)
    let bmr = 10 * weight + 6.25 * height - 5 * age + 5;

    const activityMultipliers = {
      sedentary: 1.2,
      lightlyActive: 1.375,
      moderatelyActive: 1.55,
      veryActive: 1.725,
      extremelyActive: 1.9,
    };

    bmr *= activityMultipliers[activityLevel] || 1;

    if (goal === "weightLoss") bmr *= 0.9;
    else if (goal === "weightGain") bmr *= 1.1;

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
                <strong>Activity Level:</strong> {data.activityLevel}
              </li>
              <li>
                <strong>Age:</strong> {data.age}
              </li>
              <li>
                <strong>Weight:</strong> {data.weight} {data.weightUnit}
              </li>
              <li>
                <strong>Height:</strong> {data.height} {data.heightUnit}
              </li>
              <li>
                <strong>Goal:</strong> {data.goal}
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
                <strong>Fats:</strong> {results.fats} g
              </li>
              <li>
                <strong>Carbs:</strong> {results.carbs} g
              </li>
              <li>
                <strong>Protein:</strong> {results.protein} g
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
