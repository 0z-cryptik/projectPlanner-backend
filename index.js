"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 3002;
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const FileStore = require("session-file-store")(session);
const passport = require("passport");
const User = require("./models/userSchema");
const methodOverride = require("method-override");
const router = require("./routes/routesHandler");
const database =
  process.env.DATABASE || "mongodb://localhost:27017/projectPlanner";

app.use(methodOverride("_method", { methods: ["POST", "GET"] }));
app.use(cors());

mongoose.connect(database);

const db = mongoose.connection;

db.once("open", () => {
  console.log("successfully connected to database");
});

app.use(cookieParser(process.env.SESSION_SECRET));

app.use(
  session({
    store: new FileStore({}),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.loggedIn = req.isAuthenticated();
  next();
});

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

app.use("/api", router);

/*mongoUrl: database,
      ttl: 1000 * 60 * 60 * 24 * 5 // 5 days */
