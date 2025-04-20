const express = require("express");
const router = express.Router();
const FoodTimetable = require("../models/FoodTimetable");

// Add or update a single day's data
router.post("/updateDay", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated" });
  }

  const userId = req.user._id;
  const { day, data } = req.body;

  const validDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  if (!validDays.includes(day)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid day provided" });
  }

  try {
    let timetable = await FoodTimetable.findOne({ userId });

    if (!timetable) {
      // Initialize the full week with empty meals for all days
      timetable = new FoodTimetable({
        userId,
        week: {
          monday: {},
          tuesday: {},
          wednesday: {},
          thursday: {},
          friday: {},
          saturday: {},
          sunday: {},
          [day]: data, // Set initial data for provided day
        },
      });
    } else {
      const existingDayData = timetable.week[day] || {};

      // Merge new data into existing day data
      for (const key in data) {
        if (Array.isArray(data[key])) {
          // For meals like breakfast, lunch, etc.
          existingDayData[key] = [
            ...(existingDayData[key] || []),
            ...data[key],
          ];
        } else {
          // For scalar fields like waterIntake
          existingDayData[key] = data[key];
        }
      }


      timetable.week[day] = existingDayData;
    }

    await timetable.save();

    res.json({
      success: true,
      message: `${day} updated successfully`,
      week: timetable.week,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update day",
      error: err.message,
    });
  }
});


// ✅ Remove food entry by name, day and mealType
router.delete("/removeFood", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ success: false, message: "Not authenticated" });
  }

  const { day, mealType, foodName } = req.body;
  const userId = req.user._id;

  if (!day || !mealType || !foodName) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const timetable = await FoodTimetable.findOne({ userId });

    if (!timetable || !timetable.week[day]) {
      return res.status(404).json({ success: false, message: "Day not found in timetable" });
    }

    const meals = timetable.week[day][mealType] || [];

    // Filter out the food item by name
    const filteredMeals = meals.filter(
      (item) => item.name.toLowerCase() !== foodName.toLowerCase()
    );

    timetable.week[day][mealType] = filteredMeals;

    await timetable.save();

    res.json({ success: true, message: "Food item removed successfully" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to remove food item",
      error: err.message,
    });
  }
});

// Get full timetable for logged-in user
router.get("/getTimetable", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated" });
  }

  try {
    const timetable = await FoodTimetable.findOne({ userId: req.user._id });
    if (!timetable) {
      return res.json({
        success: true,
        message: "No timetable found",
        week: {},
      });
    }
    res.json({ success: true, week: timetable.week });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch timetable",
        error: err.message,
      });
  }
});

module.exports = router;
