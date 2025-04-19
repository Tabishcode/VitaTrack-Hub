const express = require('express');
const router = express.Router();
const FoodAttendance = require('../models/FoodAttendance');
const dayjs = require('dayjs'); // for date formatting

// Middleware to check if logged in
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ success: false, message: "Unauthorized" });
};

// POST /api/attendance/mark
router.post('/mark', isLoggedIn, async (req, res) => {
  try {
    const { meals, waterIntake } = req.body;

    // Today's date and day
    const todayDate = dayjs().format('YYYY-MM-DD');
    const day = dayjs().format('dddd').toLowerCase();

    if (!Array.isArray(meals)) {
      return res.status(400).json({ success: false, message: "Meals must be an array" });
    }

    const validTimes = ['breakfast', 'lunch', 'dinner', 'snacks'];

    for (let meal of meals) {
      if (!validTimes.includes(meal.time)) {
        return res.status(400).json({ success: false, message: `Invalid meal time: ${meal.time}` });
      }

      for (let item of meal.foodItems) {
        if (!item.name || typeof item.calories !== 'number') {
          return res.status(400).json({ success: false, message: "Each food item must have name and numeric calories" });
        }
      }
    }

    const updated = await FoodAttendance.findOneAndUpdate(
      { userId: req.user._id, date: todayDate },
      { userId: req.user._id, date: todayDate, day, meals, waterIntake },
      { upsert: true, new: true, runValidators: true }
    );

    return res.json({ success: true, message: "Attendance recorded", attendance: updated });

  } catch (err) {
    console.error("Mark Attendance Error:", err);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

module.exports = router;
