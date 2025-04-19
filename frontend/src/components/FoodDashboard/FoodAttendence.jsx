import React, { useState } from "react";

// Mock food data
const foodItems = {
  Breakfast: [
    { id: 1, name: "Oatmeal", calories: 150 },
    { id: 2, name: "Eggs", calories: 200 },
    { id: 3, name: "Fruit Smoothie", calories: 250 },
  ],
  Lunch: [
    { id: 4, name: "Chicken Breast", calories: 300 },
    { id: 5, name: "Rice", calories: 250 },
    { id: 6, name: "Broccoli", calories: 50 },
  ],
  Dinner: [
    { id: 7, name: "Salmon", calories: 350 },
    { id: 8, name: "Quinoa", calories: 222 },
    { id: 9, name: "Steamed Vegetables", calories: 100 },
  ],
  Snacks: [
    { id: 10, name: "Apple", calories: 95 },
    { id: 11, name: "Protein Bar", calories: 200 },
    { id: 12, name: "Yogurt", calories: 150 },
  ],
};

const FoodAttendance = ({ setCaloriesConsumed }) => {
  const [selectedFoods, setSelectedFoods] = useState([]);

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

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 mb-8 max-w-7xl mx-auto">
      {/* Title Section */}
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-gray-800">Track Your Meals</h3>
        <p className="text-gray-600 mt-1">
          Select meals to track your daily calorie intake
        </p>
      </div>

      {/* Grid with food categories */}
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
            </ul>
          </div>
        ))}
      </div>

      {/* Calories Counter Section */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-inner text-center">
        <p className="text-xl font-semibold text-gray-800 mb-2">
          Total Calories Consumed:
        </p>
        <span className="text-3xl font-bold text-blue-600">
          {selectedFoods.reduce((total, id) => {
            const food = Object.values(foodItems)
              .flat()
              .find((item) => item.id === id);
            return total + (food ? food.calories : 0);
          }, 0)}{" "}
          kcal
        </span>
      </div>
    </div>
  );
};

export default FoodAttendance;
