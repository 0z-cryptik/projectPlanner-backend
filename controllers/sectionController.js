"use strict";

const Section = require("../models/sectionSchema");
const Project = require("../models/projectSchema");
const userController = require("./userController");
const { ObjectId } = require("mongodb");

module.exports = {
  create: async (req, res) => {
    const { parentProject, title } = req.body;
    const userID = new ObjectId(req.session.userID);

    try {
      const newSection = await Section.create({ title });

      await Project.findByIdAndUpdate(parentProject, {
        $push: { sections: newSection }
      });

      const user = await userController.fetchUser(userID);

      res.status(200).json({ success: true, user });
    } catch (err) {
      res.status(500).json({ success: false });
      console.error(err);
    }
  },
  delete: async (req, res) => {
    const { sectionId } = req.body;
    const userID = new ObjectId(req.session.userID);

    try {
      await Section.findByIdAndDelete(sectionId);
      const user = await userController.fetchUser(userID);
      res.status(200).json({ success: true, user });
    } catch (err) {
      res.status(500).json({ success: false });
      console.error(err);
    }
  },
  update: async (req, res) => {
    const { sectionId, title } = req.body;
    const userID = new ObjectId(req.session.userID);

    try {
      await Section.findByIdAndUpdate(sectionId, { $set: { title } });
      const user = await userController.fetchUser(userID);
      res.status(200).json({ success: true, user });
    } catch (err) {
      res.status(500).json({ success: false });
      console.error(err);
    }
  }
};
