"use strict";

const router = require("express").Router();
const sectionController = require("../controllers/sectionController");

router.post("/create", sectionController.create);
router.put("/update", sectionController.update);
router.delete("/delete", sectionController.delete);

module.exports = router;
