"use strict";

const router = require("express").Router();
const projectController = require("../controllers/projectController");
const middleware = require("../controllers/middleware");

router.post("/create", middleware.verifyRequest, projectController.create);
router.delete(
  "/delete",
  middleware.verifyRequest,
  projectController.delete
);
router.put("/update", middleware.verifyRequest, projectController.update);

module.exports = router;
