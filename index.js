"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 3002;
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("cookie-session");
const passport = require("passport");
const User = require("./models/userSchema");
const methodOverride = require("method-override");
const router = require("./routes/routesHandler");

app.use(methodOverride("_method", { methods: ["POST", "GET"] }));
app.use(cors());

mongoose.connect(
  process.env.DATABASE || "mongodb://localhost:27017/projectPlanner"
);

const db = mongoose.connection;

db.once("open", () => {
  console.log("successfully connected to database");
});

app.use(
  session({
    keys: [process.env.SESSION_SECRET],
    resave: false,
    saveUninitialized: false,
    maxAge: 1000 * 60 * 60 * 24 * 5, // 5 days
    rolling: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  console.log(req.session)
  res.locals.currentUser = req.user;
  res.locals.loggedIn = req.isAuthenticated();
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

app.use("/api", router);
