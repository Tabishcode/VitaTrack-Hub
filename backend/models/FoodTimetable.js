const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  name: String,
  calories: Number,
});

const daySchema = new mongoose.Schema({
  breakfast: [mealSchema],
  lunch: [mealSchema],
  dinner: [mealSchema],
  snacks: [mealSchema],
  waterIntake: Number,
});

const foodTimetableSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true,
  },
  week: {
    monday: daySchema,
    tuesday: daySchema,
    wednesday: daySchema,
    thursday: daySchema,
    friday: daySchema,
    saturday: daySchema,
    sunday: daySchema,
  },
});

module.exports = mongoose.model("FoodTimetable", foodTimetableSchema);
