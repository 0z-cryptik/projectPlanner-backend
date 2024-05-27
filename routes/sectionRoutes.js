"use strict";

const router = require("express").Router();
const sectionController = require("../controllers/sectionController");
const middleware = require("../controllers/middleware");

router.post("/create",middleware.verifyRequest, sectionController.create);
router.put("/update",middleware.verifyRequest, sectionController.update);
router.delete("/delete",middleware.verifyRequest, sectionController.delete);

module.exports = router;
