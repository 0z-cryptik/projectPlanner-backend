"use strict";

const User = require("../models/userSchema");
const Project = require("../models/projectSchema");
const Task = require("../models/taskSchema");
const Section = require("../models/sectionSchema");

module.exports = {
  create: async (req, res) => {
    const { title, parentProject, dueDate, parentSection } = req.body;
    const { userID } = req.session;

    try {
      const newTask = await Task.create({ title, dueDate });

      if (parentProject && !parentSection) {
        await Project.findByIdAndUpdate(parentProject, {
          $push: { tasks: newTask }
        });
      } else if (parentSection && !parentProject) {
        await Section.findByIdAndUpdate(parentSection, {
          $push: { tasks: newTask }
        });
      }

      const user = await User.findById(userID).populate({
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
      console.error(err);
      res.status(500).json({ success: false });
    }
  },
  update: async (req, res) => {
    const { title, Id, dueDate } = req.body;
    const userID = req.session;

    try {
      await Task.findByIdAndUpdate(Id, { $set: { title, dueDate } });

      const user = await User.findById(userID).populate({
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
      console.error(err);
      res.status(500).json({ success: false });
    }
  },
  delete: async (req, res) => {
    const { taskId } = req.body;
    const userID = req.session;

    try {
      await Task.findByIdAndDelete(taskId);

      const user = await User.findById(userID).populate({
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
