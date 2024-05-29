"use strict";

const Section = require("../models/sectionSchema");
const Project = require("../models/projectSchema");
const User = require("../models/userSchema");

module.exports = {
  create: async (req, res) => {
    const { parentProject, title } = req.body;
    const { _id } = res.locals.currentUser;

    try {
      const newSection = await Section.create({ title });

      await Project.findByIdAndUpdate(parentProject, {
        $push: { sections: newSection }
      });

      const user = await User.findById(_id).populate({
        path: "projects",
        populate: [
          { path: "tasks" },
          {
            path: "sections",
            populate: { path: "tasks" }
          }
        ]
      });

      res.status(200).json({ success: true, user });
    } catch (err) {
      res.status(500).json({ success: false });
      console.error(err);
    }
  },
  delete: async (req, res) => {
    const { sectionId } = req.body;
    const { _id } = res.locals.currentUser;

    try {
      await Section.findByIdAndDelete(sectionId);

      const user = await User.findById(_id).populate({
        path: "projects",
        populate: [
          { path: "tasks" },
          {
            path: "sections",
            populate: { path: "tasks" }
          }
        ]
      });

      res.status(200).json({ success: true, user });
    } catch (err) {
      res.status(500).json({ success: false });
      console.error(err);
    }
  },
  update: async (req, res) => {
    const { sectionId, title } = req.body;
    const { _id } = res.locals.currentUser;

    try {
      await Section.findByIdAndUpdate(sectionId, { $set: { title } });

      const user = await User.findById(_id).populate({
        path: "projects",
        populate: [
          { path: "tasks" },
          {
            path: "sections",
            populate: { path: "tasks" }
          }
        ]
      });

      res.status(200).json({ success: true, user });
    } catch (err) {
      res.status(500).json({ success: false });
      console.error(err);
    }
  }
};
