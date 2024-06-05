"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 3002;
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
//const FileStore = require("session-file-store")(session);
const passport = require("passport");
const User = require("./models/userSchema");
const methodOverride = require("method-override");
const router = require("./routes/routesHandler");
const database =
  process.env.DATABASE || "mongodb://localhost:27017/projectPlanner";

app.use(methodOverride("_method", { methods: ["POST", "GET"] }));
app.use(
  cors({
    origin: "https://project-planner-frontend-psi.vercel.app",
    credentials: true
  })
);

mongoose.connect(database);

const db = mongoose.connection;

db.once("open", () => {
  console.log("successfully connected to database");
});

app.use(cookieParser(process.env.SESSION_SECRET));

/*app.use(
  cookieSession({
    secret: process.env.SESSION_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 5, // 5 days
    sameSite: "lax",
  })
);

app.use(function(request, response, next) {
  if (request.session && !request.session.regenerate) {
      request.session.regenerate = (cb) => {
          cb()
      }
  }
  if (request.session && !request.session.save) {
      request.session.save = (cb) => {
          cb()
      }
  }
  next()
})*/
app.set("trust proxy", true);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    name: "userSession",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: database,
      dbName: "sessionStore",
      ttl: 1000 * 60 * 60 * 24 * 5 // 5 days
    }),
    proxy: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 5, // 5 days
      httpOnly: true,
      secure: true,
      sameSite: "none"
    }
    //rolling: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

app.use("/api", router);
