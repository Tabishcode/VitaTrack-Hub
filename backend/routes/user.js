
const express = require('express');
const router = express.Router();
let User = require('../models/user');
const mongoose = require("mongoose");
let passport = require('passport');

router.use(express.urlencoded({ extended: true }));

const validateLogin = (req, res, next) => {
    const { username, password } = req.body;
    // console.log(username, password);
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required' });
    }
    next();
};

router.post("/signup", async (req, res, next) => {
    try {
        let { username, password, email } = req.body;
        let newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        // Log the user in after successful registration
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            // req.flash("success", "User is Registered Successfully");
            // Send a success response
            // console.log(`${registeredUser.username} is registered and logged in successfully`);
            return res.json({ success: true, message: "User registered successfully", user: registeredUser });
        });
    }
    catch (e) {
        console.log('error', e.message);
        return res.status(400).json({ success: false, message: e.message });
    }
});

router.post('/login',
    validateLogin,
    (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Server error' });
            }
            if (!user) {
                return res.status(401).json({ success: false, message: info.message || 'Invalid credentials' });
            }
            req.logIn(user, (err) => {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Could not log in user' });
                }
                console.log(`${user.username} is logged in successfully`);
                res.json({ success: true, message: 'Logged in successfully', user });
            });
        })(req, res, next)
    }
);

// Logout route 
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ success: false, message: 'Logout failed' });
        res.clearCookie('connect.sid'); // Clear session cookie (if applicable)
        return res.json({ success: true, message: 'Logged out successfully' });
    });
});

// Check if the details are filled
router.get('/checkDetails', async (req, res) => {
    if (req.isAuthenticated()) {
        let id = req.user._id;
        // console.log(id);
        let details = await Detail.findOne({ userId: id });
        // console.log(details);
        return res.json({ success: true, message: "User is authenticated", id , details});
    }
    res.json({
        "success": false,
        "id" : null,
        "message": "User is not authenticated",
        "details": null
    });
});

// Check if the user is authenticated
router.get("/isAuthenticated", (req, res) => {
    if (req.isAuthenticated()) {
        return res.json({ loggedIn: true, user: req.user }); // send user data if logged in
    }
    return res.json({ loggedIn: false }); // user not logged in
});


// Update user profile
router.post('/updateByFormData', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    const { dob, height, weight, gender, goal, calories } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { dob, height, weight, gender, goal, calories },
            { new: true }
        );

        return res.json({
            success: true,
            message: "User details updated successfully",
            user: updatedUser
        });
    } catch (err) {
        console.error("Error updating user details:", err.message);
        return res.status(500).json({ success: false, message: "Failed to update details" });
    }
});

router.get("/profile", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res
      .status(401)
      .json({ success: false, message: "User not authenticated" });
  }

  try {
    const user = await User.findById(req.user._id).select("-hash -salt"); // hide sensitive fields if any

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, user });
  } catch (err) {
    console.error("Error fetching user profile:", err.message);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching user details" });
  }
});


module.exports = router;