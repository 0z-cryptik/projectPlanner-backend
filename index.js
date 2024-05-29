"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 3002;
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const User = require("./models/userSchema");
const methodOverride = require("method-override");
const router = require("./routes/routesHandler");

app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

mongoose.connect("mongodb://localhost:27017/todoApp");

const db = mongoose.connection;

db.once("open", () => {
  console.log("successfully connected to database");
});

app.use(
  session({
    secret: "killerbee",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 5 // 5 days
    },
    rolling: true
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

app.use("/api", router);
