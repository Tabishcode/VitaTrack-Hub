
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

module.exports = router;