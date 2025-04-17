const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

let User = require('./models/user');
let userRouter = require('./routes/user');
let timetableRoutes = require("./routes/foodTimetable");


let passport = require('passport');
const LocalStrategy = require("passport-local");
const session = require("express-session");

const sessionOptions = {
    secret: "supperHiddenCode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 3 * 24 * 3600 * 1000,       // expires after 3 days
        maxAge: 3 * 24 * 3600 * 1000,
        httpOnly: true
    }
}

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.use('/api/user', userRouter);
app.use("/api/timetable", timetableRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});