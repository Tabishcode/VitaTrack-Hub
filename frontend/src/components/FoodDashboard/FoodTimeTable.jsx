import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FoodTimeTable = () => {
  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const [selectedDay, setSelectedDay] = useState("monday");
  const getEmptyWeekData = () => {
    const initial = {};
    daysOfWeek.forEach((day) => {
      initial[day] = {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: [],
        waterIntake: "",
      };
    });
    return initial;
  };
  const [foodData, setFoodData] = useState(getEmptyWeekData);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [currentMealType, setCurrentMealType] = useState("");
  const [currentFood, setCurrentFood] = useState(null);
  const [formData, setFormData] = useState({ name: "", calories: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchFoodData();
  }, []);

  const fetchFoodData = async () => {
    try {
      const res = await axios.get("/api/timetable/getTimetable");
      if (res.data.success && res.data.week) {
        const weekData = res.data.week;

        const formattedData = {};
        for (const [day, meals] of Object.entries(weekData)) {
          formattedData[day] = {
            breakfast: [],
            lunch: [],
            dinner: [],
            snacks: [],
            waterIntake: meals?.waterIntake || 0,
          };

          for (const mealType of ["breakfast", "lunch", "dinner", "snacks"]) {
            formattedData[day][mealType] = (meals[mealType] || []).map(
              (item) => ({
                id: item._id,
                name: item.name,
                calories: item.calories,
              })
            );
          }
        }
        setFoodData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching updated timetable", error);
    }
  };

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  const handlePopupOpen = (type, mealType, food = null) => {
    setPopupType(type);
    setCurrentMealType(mealType);
    setCurrentFood(food);
    setFormData(food ? { ...food } : { name: "", calories: "" });
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => setIsPopupOpen(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemoveFood = async (day, mealType, foodName) => {
    try {
      await axios.delete("/api/timetable/removeFood", {
        data: {
          day,
          mealType,
          foodName,
        },
      });

      await fetchFoodData();
    } catch (error) {
      console.error("Error removing food item", error);
    }
  };

  const handleFormSubmit = async () => {
    if (popupType === "add") {
      await addFood();
    } else if (popupType === "update") {
      await updateFood();
    }
    handlePopupClose();
  };

  const addFood = async () => {
    try {
      const payload = {
        day: selectedDay,
        data: {
          [currentMealType]: [
            {
              name: formData.name,
              calories: parseInt(formData.calories, 10),
            },
          ],
        },
      };

      await axios.post("/api/timetable/updateDay", payload);
      await fetchFoodData();
    } catch (error) {
      console.error("Error adding food to timetable", error);
    }
  };

  const updateFood = async () => {
    console.log("Update logic goes here");
  };

  const renderMealSection = (mealType, mealName) => (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
      <h4 className="text-lg font-semibold text-gray-700 mb-2">{mealName}</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg">
          <thead className="bg-blue-100">
            <tr>
              <th className="border px-3 py-2 text-sm font-medium text-gray-600 text-left">
                Food
              </th>
              <th className="border px-3 py-2 text-sm font-medium text-gray-600 text-left">
                Calories
              </th>
              <th className="border px-3 py-2 text-sm font-medium text-gray-600 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {foodData[selectedDay] &&
            foodData[selectedDay][mealType] &&
            foodData[selectedDay][mealType].length > 0 ? (
              foodData[selectedDay][mealType].map((food) => (
                <tr key={food.id} className="border-b hover:bg-blue-50">
                  <td className="border px-3 py-2 text-gray-700">
                    {food.name}
                  </td>
                  <td className="border px-3 py-2 text-gray-600">
                    {food.calories}
                  </td>
                  <td className="border px-3 py-2">
                    <button
                      onClick={() =>
                        handleRemoveFood(selectedDay, mealType, food.name)
                      }
                      className="text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="border px-3 py-2 text-center text-gray-500 text-sm"
                >
                  No food items for this meal.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button
          onClick={() => handlePopupOpen("add", mealType)}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Food
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md p-6 rounded-lg mb-6">
        <div className="flex gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/FoodDashboard")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-2xl shadow-lg transition-colors duration-300"
          >
            <FaArrowLeft />
            Go Back
          </motion.button>
          <h1 className="text-2xl font-bold text-gray-800 text-center  mb-4">
            Weekly Food TimeTable
          </h1>
        </div>
        <div className="flex justify-center space-x-2 mb-4 mt-4">
          {daysOfWeek.map((day) => (
            <button
              key={day}
              onClick={() => handleDayChange(day)}
              className={`py-4 px-8 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedDay === day
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </button>
          ))}
        </div>

        {["breakfast", "lunch", "dinner", "snacks"].map((meal) =>
          renderMealSection(meal, meal.charAt(0).toUpperCase() + meal.slice(1))
        )}

        <div className="mt-6 bg-white p-4 rounded-lg shadow-md max-w-md mx-auto">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            Water Intake Goal (Glasses)
          </h4>
          <div className="flex items-center gap-4">
            <input
              type="number"
              min="0"
              placeholder="Enter number of glasses"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={foodData[selectedDay]?.waterIntake ?? ""}
              onChange={(e) =>
                setFoodData((prev) => ({
                  ...prev,
                  [selectedDay]: {
                    ...prev[selectedDay],
                    waterIntake: Number(e.target.value),
                  },
                }))
              }
            />
            <button
              onClick={async () => {
                try {
                  const payload = {
                    day: selectedDay,
                    data: {
                      waterIntake: foodData[selectedDay].waterIntake,
                    },
                  };
                  const res = await axios.post(
                    "/api/timetable/updateDay",
                    payload
                  );
                  await fetchFoodData();
                } catch (err) {
                  console.error("Error updating water intake", err);
                }
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
            <span className="text-gray-500 text-sm">
              Current: {foodData[selectedDay]?.waterIntake ?? 0} glasses
            </span>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">
              {popupType === "add" ? "Add Food" : "Update Food"}
            </h2>
            <form>
              {["name", "calories"].map((field) => (
                <div key={field} className="mb-3">
                  <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">
                    {field}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              ))}
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={handlePopupClose}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleFormSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodTimeTable;
