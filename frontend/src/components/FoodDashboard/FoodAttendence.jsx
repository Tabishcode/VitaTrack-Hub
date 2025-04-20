import { useState, useEffect } from "react";
import { FaTint } from "react-icons/fa";
import axios from "axios";

const FoodAttendance = ({ setCaloriesConsumed }) => {
  const [foodItems, setFoodItems] = useState({
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snacks: [],
  });
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [waterIntake, setWaterIntake] = useState(0);
  const waterGoal = 8;
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const [showModal, setShowModal] = useState(false);
  const [newFood, setNewFood] = useState({ name: "", calories: "", meal: "" });

  const getCurrentDay = () =>
    new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const res = await axios.get("/api/timetable/getTimetable");
        if (res.data.success) {
          const today = getCurrentDay();
          const todayData = res.data.week[today];
          if (todayData) {
            setFoodItems({
              Breakfast: todayData.breakfast.map((item) => ({
                id: item._id,
                name: item.name,
                calories: item.calories,
              })),
              Lunch: todayData.lunch.map((item) => ({
                id: item._id,
                name: item.name,
                calories: item.calories,
              })),
              Dinner: todayData.dinner.map((item) => ({
                id: item._id,
                name: item.name,
                calories: item.calories,
              })),
              Snacks: todayData.snacks.map((item) => ({
                id: item._id,
                name: item.name,
                calories: item.calories,
              })),
            });
            setWaterIntake(todayData.waterIntake || 0);
          }
        }
      } catch (error) {
        console.error("Error fetching timetable:", error);
      }
    };

    fetchTimetable();
  }, []);

  const handleFoodChange = (food) => {
    const updatedSelectedFoods = selectedFoods.includes(food.id)
      ? selectedFoods.filter((id) => id !== food.id)
      : [...selectedFoods, food.id];

    setSelectedFoods(updatedSelectedFoods);

    const totalCalories = updatedSelectedFoods.reduce((total, id) => {
      const foodItem = Object.values(foodItems)
        .flat()
        .find((item) => item.id === id);
      return total + (foodItem ? foodItem.calories : 0);
    }, 0);

    setCaloriesConsumed(totalCalories);
  };

  const handleWaterChange = (change) => {
    setWaterIntake((prev) => Math.max(0, prev + change));
  };

  const handleSave = async () => {
    const meals = Object.entries(foodItems)
      .map(([mealTime, foods]) => {
        const selected = foods.filter((food) =>
          selectedFoods.includes(food.id)
        );
        if (selected.length === 0) return null;
        return {
          time: mealTime.toLowerCase(),
          foodItems: selected.map(({ name, calories }) => ({ name, calories })),
        };
      })
      .filter(Boolean);

    const dataToSend = {
      meals,
      waterIntake: waterIntake,
      dateTime: currentDateTime.toISOString(),
    };

    try {
      const response = await axios.post("/api/attandance/mark", dataToSend);
      console.log("Attendance data sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending attendance data:", error);
    }
  };

  const openAddFoodModal = (meal) => {
    setNewFood({ name: "", calories: "", meal });
    setShowModal(true);
  };

  const handleAddFood = () => {
    if (!newFood.name || isNaN(newFood.calories)) return;

    const newFoodItem = {
      id: Date.now().toString(),
      name: newFood.name,
      calories: parseInt(newFood.calories),
    };

    setFoodItems((prev) => ({
      ...prev,
      [newFood.meal]: [...prev[newFood.meal], newFoodItem],
    }));

    setShowModal(false);
  };

  const dayName = currentDateTime.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const formattedDateTime = `${dayName}, ${currentDateTime.toLocaleString()}`;

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-7xl mx-auto">
      {/* Current DateTime */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-700">
          Today's Date and Time
        </h2>
        <p className="text-lg text-gray-500">{formattedDateTime}</p>
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(foodItems).map(([meal, foods]) => (
          <div
            key={meal}
            className="bg-blue-50 border border-blue-200 shadow-md rounded-lg transform hover:scale-105 transition-transform duration-200"
          >
            <div className="p-4 border-b bg-blue-100 text-lg font-semibold text-gray-700 text-center">
              {meal}
            </div>
            <ul className="p-3 space-y-3">
              {foods.map((food) => (
                <div
                  key={food.id}
                  className="flex items-center justify-between bg-white shadow-sm p-2 mb-2 rounded-md hover:bg-blue-50 cursor-pointer transition duration-200"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedFoods.includes(food.id)}
                      onChange={() => handleFoodChange(food)}
                      className="h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">{food.name}</span>
                  </div>
                  <span className="text-gray-600 font-semibold">
                    {food.calories} kcal
                  </span>
                </div>
              ))}
              <div className="text-center pt-2">
                <button
                  onClick={() => openAddFoodModal(meal)}
                  className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full hover:bg-blue-600"
                >
                  + Add Food
                </button>
              </div>
            </ul>
          </div>
        ))}
      </div>

      {/* Water Tracker */}
      <div className="mt-8 flex items-center justify-center gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-md max-w-sm text-center">
          <div className="flex justify-center items-center gap-2 mb-3">
            <FaTint className="text-blue-500 text-xl" />
            <h2 className="text-lg font-semibold text-blue-700">
              Today's Water Intake
            </h2>
          </div>
          <div className="flex items-center justify-center gap-6 mb-2">
            <button
              onClick={() => handleWaterChange(-1)}
              className="bg-blue-500 text-white px-4 py-2 rounded-full text-xl"
            >
              -
            </button>
            <p className="text-3xl font-bold text-blue-800">
              {waterIntake} / {waterGoal}
            </p>
            <button
              onClick={() => handleWaterChange(1)}
              className="bg-blue-500 text-white px-4 py-2 rounded-full text-xl"
            >
              +
            </button>
          </div>
          <p className="text-sm text-blue-600">Glasses of water</p>
        </div>

        {/* Save Button */}
        <div className="text-center">
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow"
          >
            Save Attendance
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h2 className="text-lg font-bold mb-4">
              Add Food to {newFood.meal}
            </h2>
            <input
              type="text"
              placeholder="Food Name"
              value={newFood.name}
              onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
              className="w-full mb-3 px-3 py-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Calories"
              value={newFood.calories}
              onChange={(e) =>
                setNewFood({ ...newFood, calories: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded-md"
            />
            <div className="flex justify-between">
              <button
                onClick={handleAddFood}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Add
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodAttendance;
