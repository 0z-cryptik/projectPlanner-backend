"use strict";

const router = require("express").Router();
const subTaskController = require("../controllers/subTaskController");

router.post("/create", subTaskController.createSubTask);
router.delete("/delete", subTaskController.deleteSubTask);

module.exports = router
