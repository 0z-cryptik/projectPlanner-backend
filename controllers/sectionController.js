"use strict";

const Section = require("../models/sectionSchema");
const Project = require("../models/projectSchema");
const userController = require("./userController");

module.exports = {
  create: async (req, res) => {
    const { parentProject, title } = req.body;
    const userID = req.user.id;

    try {
      const newSection = await Section.create({ title });

      await Project.findByIdAndUpdate(parentProject, {
        $push: { sections: newSection }
      });

      const user = await userController.fetchUser(userID);

      res.status(200).json({ success: true, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false });
    }
  },

  delete: async (req, res) => {
    const { sectionId } = req.body;
    const userID = req.user.id;

    try {
      await Section.findByIdAndDelete(sectionId);
      const user = await userController.fetchUser(userID);
      res.status(200).json({ success: true, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false });
    }
  },

  update: async (req, res) => {
    const { sectionId, title } = req.body;
    const userID = req.user.id;

    try {
      await Section.findByIdAndUpdate(sectionId, { $set: { title } });
      const user = await userController.fetchUser(userID);
      res.status(200).json({ success: true, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false });
    }
  }
};