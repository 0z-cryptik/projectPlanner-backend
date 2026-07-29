"use strict";

const router = require("express").Router();
const userController = require("../controllers/userController");
const { verifyRequest } = require("../controllers/middleware"); // path to your middleware

// Protected route to restore state on app load
router.get("/check", verifyRequest, userController.check);

// Login
router.post("/login", userController.authenticate, userController.loggedIn);

// Signup
router.post("/signup", userController.signUpPassport);

module.exports = router;