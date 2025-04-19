const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

let User = require('./models/user.js');
let Password = require('./models/password.js');
let Food = require('./models/food.js');
const articleRouter = require('./routes/articles.js');
const userRouter = require('./routes/user.js');
const exercisesRouter = require('./routes/exercises.js');
const passwordsRouter = require('./routes/passwords.js');
const expensesRouter = require('./routes/expenses.js');

const foodRoutes = require("./routes/foodTableRoutes.js");
const MONGO_URL = process.env.MONGO_URL;
const port = process.env.PORT || 5000;

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

// Middleware
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

// app.get('/users', async (req, res) => {
//     let users = await User.find({}).select('username email hash salt');;
//     res.json(users);
// });

const ExerciseLog = require('./models/exerciseLog.js');

app.use('/api/articles', articleRouter);
app.use('/api/user', userRouter);
app.use('/api/exercise', exercisesRouter);
app.use('/api/password', passwordsRouter);
app.use('/api/expenses', expensesRouter);

app.get("/app", (req, res) => {
  res.redirect("http://localhost:5173");
});

app.get('*', (req, res) => {
  res.send("404 Page Not Found");
});
// Routes
app.use('/api', foodRoutes);
app.get("/passwords", async (req, res) => {
  let u = mongoose.model("user", new mongoose.Schema({}));
  let d = await u.find();
  let passwords = await Password.find();
  res.json(d);
});

app.get("/", (req, res) => {
  console.log("A Request Received at the port!");
  res.send("The Route is Working!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
