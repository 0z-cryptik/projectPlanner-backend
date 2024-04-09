"use strict";

const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/check", (req, res) => {
  try {
    res.status(200).json({ success: true, locals: res.locals });
  } catch (err) {
    console.error(err);
  }
});

router.post("/login", userController.authenticate);

router.get("/loggedIn", userController.loggedIn);
router.get("/failedLogin", userController.failed);
router.get(
  "/logout",
  userController.logout,
  userController.logoutResponse
);
router.post("/signup", userController.signUpPassport);
router.post("/signup/submitName", userController.nameHandler);

module.exports = router;
