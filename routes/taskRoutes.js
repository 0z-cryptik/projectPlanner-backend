"use strict";

const router = require("express").Router();
const taskController = require("../controllers/taskController");

router.post("/create", taskController.create);
router.delete("/delete", taskController.delete);
router.put("/update", taskController.update);

module.exports = router;
