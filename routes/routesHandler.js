"use strict";

const router = require("express").Router();
const userRoutes = require("./userRoutes");
const projectRoutes = require("./projectRoutes");
const taskRoutes = require("./taskRoutes");
const sectionRoutes = require("./sectionRoutes");

router.use("/user", userRoutes);
router.use("/project", projectRoutes);
router.use("/task", taskRoutes);
router.use("/section", sectionRoutes);

module.exports = router;
