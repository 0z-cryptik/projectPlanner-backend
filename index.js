"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 3002;
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("./models/userSchema");
const methodOverride = require("method-override");
const router = require("./routes/routesHandler");

const database =
  process.env.MONGODB_URI || "mongodb://localhost:27017/projectPlanner";

// Handle method overrides for POST/GET overrides
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: ["X-Custom-Header", "Authorization", "Content-Type"]
  })
);

mongoose.connect(database);

const db = mongoose.connection;
db.once("open", () => {
  console.log("successfully connected to database");
});

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(passport.initialize());
passport.use(User.createStrategy());

app.use("/api", router);

app.get("/periodicFetch", (req, res) => {
  console.log("periodically fetched");
  res.sendStatus(200);
});

// fallback
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});