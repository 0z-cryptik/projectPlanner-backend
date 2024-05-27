"use strict";

const router = require("express").Router();
const taskController = require("../controllers/taskController");
const middleware = require("../controllers/middleware");

router.post("/create", middleware.verifyRequest, taskController.create);
router.delete("/delete", middleware.verifyRequest, taskController.delete);
router.put("/update", middleware.verifyRequest, taskController.update);

module.exports = router;
