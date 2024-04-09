"use strict";

const router = require("express").Router();
const taskController = require("../controllers/taskController");

router.post("/create", taskController.createTask);
router.delete("/delete", taskController.deleteTask);

module.exports = router;
