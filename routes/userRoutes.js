"use strict";

const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/check", userController.check);
router.post("/login", userController.authenticate, userController.loggedIn);
router.get("/loggedIn", userController.loggedIn);
router.get("/failedLogin", userController.failed);
router.get(
  "/logout",
  userController.logout,
  userController.logoutResponse
);
router.post("/signup", userController.signUpPassport);

module.exports = router;
