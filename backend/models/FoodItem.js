const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({
  day: { type: String, required: true },
  mealType: { type: String, required: true }, // Breakfast, Lunch, etc.
  name: { type: [String], default: [] }, // Array of food names
  calories: { type: [Number], default: [] }, // Array of calorie values
  fats: { type: [Number], default: [] }, // Array of fat values
  protein: { type: [Number], default: [] }, // Array of protein values
  sugars: { type: [Number], default: [] }, // Array of sugar values
});

const FoodItem = mongoose.model("FoodItem", foodItemSchema);

module.exports = FoodItem;
