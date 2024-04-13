"use strict";

const router = require("express").Router();
const userRoutes = require("./userRoutes");
const projectRoutes = require("./projectRoutes");
const taskRoutes = require("./taskRoutes");

router.use("/user", userRoutes);
router.use("/project", projectRoutes);
router.use("/task", taskRoutes);

module.exports = router;
