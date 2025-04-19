const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodItemSchema = new Schema({
  name: String,
  calories: Number,
});

const mealSchema = new Schema({
  time: {
    type: String,
    enum: ["breakfast", "lunch", "dinner", "snacks"],
  },
  foodItems: [foodItemSchema],
});

const foodAttendanceSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  date: {
    type: String, // YYYY-MM-DD
    required: true,
  },
  day: {
    type: String,
    enum: [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ],
    required: true,
  },
  meals: [mealSchema],
  waterIntake: Number,
});

// 🛡️ Prevent duplicate entry for same user and date
foodAttendanceSchema.index({ userId: 1, date: 1 }, { unique: true });

const FoodAttendance = mongoose.model("FoodAttendance", foodAttendanceSchema);

module.exports = FoodAttendance;
