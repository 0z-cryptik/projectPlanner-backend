"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 3002;
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const User = require("./models/userSchema");
const userController = require("./controllers/userController");
const taskController = require("./controllers/taskController");
const subTaskController = require("./controllers/subTaskController");

mongoose.connect("mongodb://localhost:27017/todoApp");

const db = mongoose.connection;

db.once("open", () => {
  console.log("successfully connected to database");
});

app.use(
  session({
    secret: "killerbee",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.loggedIn = req.isAuthenticated();
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

app.get("/api/check", (req, res) => {
  try {
    res.status(200).json({ success: true, locals: res.locals });
  } catch (err) {
    console.error(err);
  }
});

app.post(
  "/api/login",
  passport.authenticate("local", {
    successRedirect: "/api/loggedIn",
    failureRedirect: "/api/failedLogin"
  })
);

app.get("/api/loggedIn", userController.loggedIn);
app.get("/api/failedLogin", userController.failed);
app.get("/api/logout", userController.logout);
app.post("/api/signup", userController.signUpPassport);
app.post("/api/signup/submitName", userController.nameHandler);
app.post("/api/createTask", taskController.createTask);
app.post("/api/createSubTask", subTaskController.createSubTask);
