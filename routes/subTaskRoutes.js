"use strict";

const router = require("express").Router();
const subTaskController = require("../controllers/subTaskController");

router.post("/create", subTaskController.create);
router.delete("/delete", subTaskController.delete);
router.put('/update', subTaskController.update)

module.exports = router
