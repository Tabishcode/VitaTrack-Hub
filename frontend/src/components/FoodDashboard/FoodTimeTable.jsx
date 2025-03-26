import { useState, useEffect } from "react";
import axios from "axios";

const initialFoodData = {};

const FoodTimeTable = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [foodData, setFoodData] = useState(initialFoodData);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState(""); // "add" or "update"
  const [currentMealType, setCurrentMealType] = useState("");
  const [currentFood, setCurrentFood] = useState(null);
  
  const n = () => {
    window.location.reload(); // Refreshes the current page
  };

  const [formData, setFormData] = useState({
    name: "",
    calories: "",
    fats: "",
    protein: "",
    sugars: "",
  });

  useEffect(() => {
    fetchFoodData();
  }, []);

  const fetchFoodData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/get-food");
      const groupedData = response.data.reduce((acc, item) => {
        const day = item.day;
        if (!acc[day]) acc[day] = {};
        if (!acc[day][item.mealType]) acc[day][item.mealType] = [];
        acc[day][item.mealType].push({
          id: item._id,
          name: item.name[0],
          calories: item.calories,
          fats: item.fats,
          protein: item.protein,
          sugars: item.sugars,
        });
        return acc;
      }, {});
      setFoodData(groupedData);
    } catch (error) {
      console.error("Error fetching food data from server", error);
    }
  };

  const handleDayChange = (day) => setSelectedDay(day);

  const handlePopupOpen = (type, mealType, food = null) => {
    setPopupType(type);
    setCurrentMealType(mealType);
    setCurrentFood(food);
    setFormData(
      food
        ? { ...food }
        : { name: "", calories: "", fats: "", protein: "", sugars: "" }
    );
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => setIsPopupOpen(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      const newFood = {
        day: selectedDay,
        mealType: currentMealType,
        name: [formData.name],
        calories: parseInt(formData.calories, 10),
        fats: parseInt(formData.fats, 10),
        protein: parseInt(formData.protein, 10),
        sugars: parseInt(formData.sugars, 10),
      };
      await axios.post("http://localhost:5000/api/add-food", newFood);
      fetchFoodData();
    } catch (error) {
      console.error("Error adding food", error);
    }
  };

  const updateFood = async () => {
    try {
      const updatedFood = {
        name: [formData.name],
        calories: parseInt(formData.calories, 10),
        fats: parseInt(formData.fats, 10),
        protein: parseInt(formData.protein, 10),
        sugars: parseInt(formData.sugars, 10),
      };
      await axios.put(
        `http://localhost:5000/api/update-food/${currentFood.id}`,
        updatedFood
      );
      fetchFoodData();
    } catch (error) {
      console.error("Error updating food", error);
    }
  };



  const removeFood = async (mealType, id) => {
    try {
      await axios.delete(`http://localhost:5000/api/remove-food/${id}`);
      setFoodData((prevData) => ({
        ...prevData,
        [selectedDay]: {
          ...prevData[selectedDay],
          [mealType]: prevData[selectedDay][mealType].filter(
            (item) => item.id !== id
          ),
        },
      }));
    } catch (error) {
      console.error("Error deleting food item", error);
    }
  };

  // const removeFood = async (foodId) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/api/delete-food/${foodId}`);
  //     fetchFoodData();
  //   } catch (error) {
  //     console.error("Error removing food", error);
  //   }
  // };

  const renderMealSection = (mealType, mealName) => (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
      <h4 className="text-lg font-semibold text-gray-700 mb-2">{mealName}</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg">
          <thead className="bg-blue-100">
            <tr>
              {["Food", "Calories", "Fats", "Protein", "Sugars", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="border px-3 py-2 text-sm font-medium text-gray-600 text-left"
                  >
                    {header}
                  </th>
                )
              )}
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
                  <td className="border px-3 py-2 text-gray-600">
                    {food.fats}
                  </td>
                  <td className="border px-3 py-2 text-gray-600">
                    {food.protein}
                  </td>
                  <td className="border px-3 py-2 text-gray-600">
                    {food.sugars}
                  </td>
                  <td className="border px-3 py-2">
                    <button
                      onClick={() => handlePopupOpen("update", mealType, food)}
                      className="text-blue-600 hover:underline mr-3"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => removeFood(food.id)}
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
                  colSpan="6"
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
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Weekly Food TimeTable
        </h1>
        <button className="p-3 bg-blue-400 text-white rounded-lg shadow-md" onClick={n}>
        Refresh
      </button>

        <div className="flex justify-center space-x-2 mb-4">
          {Object.keys(foodData).map((day) => (
            <button
              key={day}
              onClick={() => handleDayChange(day)}
              className={`py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedDay === day
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {["lunch", "dinner", "snacks", "breakfast"].map((meal) =>
          renderMealSection(meal, meal.charAt(0).toUpperCase() + meal.slice(1))
        )}
      </div>

      {/* Pop-up */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">
              {popupType === "add" ? "Add Food" : "Update Food"}
            </h2>
            <form>
              {["name", "calories", "fats", "protein", "sugars"].map(
                (field) => (
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
                )
              )}
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
