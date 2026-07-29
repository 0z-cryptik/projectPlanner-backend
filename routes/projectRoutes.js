"use strict";

const router = require("express").Router();
const projectController = require("../controllers/projectController");
const { verifyRequest } = require("../controllers/middleware"); 

router.post("/create", verifyRequest, projectController.create);
router.delete("/delete", verifyRequest, projectController.delete);
router.put("/update", verifyRequest, projectController.update);

module.exports = router;