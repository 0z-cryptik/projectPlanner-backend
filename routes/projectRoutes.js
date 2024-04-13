"use strict";

const router = require("express").Router();
const projectController = require("../controllers/projectController");

router.post("/create", projectController.create);
router.delete("/delete", projectController.delete);
router.put("/update", projectController.update);

module.exports = router;
