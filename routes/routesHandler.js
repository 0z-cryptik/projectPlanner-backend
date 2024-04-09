"use strict";

const router = require("express").Router();
const userRoutes = require("./userRoutes");
const taskRoutes = require("./taskRoutes");
const subTaskRoutes = require("./subTaskRoutes");

router.use("/user", userRoutes);
router.use("/task", taskRoutes);
router.use("/subTask", subTaskRoutes);

module.exports = router;
