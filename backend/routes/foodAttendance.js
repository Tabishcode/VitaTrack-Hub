const express = require('express');
const router = express.Router();
const FoodAttendance = require('../models/FoodAttendance');
const dayjs = require('dayjs'); // for date formatting

// Middleware to check if logged in
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ success: false, message: "Unauthorized" });
};

// 📌 POST /api/attendance/mark - Save today's attendance
router.post('/mark', isLoggedIn, async (req, res) => {
  try {
    const { meals, waterIntake } = req.body;

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


// ✅ GET /api/attendance/today - Get today's attendance
router.get('/today', isLoggedIn, async (req, res) => {
  try {
    const todayDate = dayjs().format('YYYY-MM-DD');
    const attendance = await FoodAttendance.findOne({ userId: req.user._id, date: todayDate });

    if (!attendance) {
      return res.status(404).json({ success: false, message: "No attendance found for today" });
    }

    return res.json({ success: true, attendance });
  } catch (err) {
    console.error("Get Today's Attendance Error:", err);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
});


// ✅ GET /api/attendance/range?from=2025-01-15&to=2025-03-20 - Get attendance in a date range
router.get('/range', isLoggedIn, async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ success: false, message: "Both 'from' and 'to' query parameters are required" });
    }

    const startDate = dayjs(from).format('YYYY-MM-DD');
    const endDate = dayjs(to).format('YYYY-MM-DD');

    const attendances = await FoodAttendance.find({
      userId: req.user._id,
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: 1 });

    return res.json({ success: true, attendances });
  } catch (err) {
    console.error("Get Attendance Range Error:", err);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

module.exports = router;
