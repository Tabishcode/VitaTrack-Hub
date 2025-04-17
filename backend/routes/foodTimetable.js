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
      timetable = new FoodTimetable({ userId, week: { [day]: data } });
    } else {
      timetable.week[day] = data;
    }

    await timetable.save();
    res.json({
      success: true,
      message: `${day} updated successfully`,
      week: timetable.week,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to update day",
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
