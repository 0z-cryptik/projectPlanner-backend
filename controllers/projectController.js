"use strict";

const Project = require("../models/projectSchema");
const User = require("../models/userSchema");

module.exports = {
  create: async (req, res) => {
    const { title } = req.body;
    const { _id } = res.locals.currentUser;

    try {
      const newProject = await Project.create({ title });
      const user = await User.findByIdAndUpdate(
        _id,
        { $push: { projects: newProject } },
        { new: true }
      ).populate({
        path: "projects",
        populate: { path: "tasks" }
      });
      res.status(200).json({ success: true, data: user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false });
    }
  },
  delete: async (req, res, next) => {
    const { taskId } = req.body;
    const { _id } = res.locals.currentUser;

    try {
      await Project.findByIdAndDelete(taskId);

      const user = await User.findById(_id).populate({
        path: "projects",
        populate: { path: "tasks" }
      });

      res.status(200).json({ success: true, user });
    } catch (err) {
      res.status(500).json({ success: false });
      console.error(err);
    }
  },
  update: async (req, res) => {
    const { projectId, title, dueDate } = req.body;
    const userId = res.locals.currentUser._id;

    try {
      await Project.findByIdAndUpdate(projectId, {
        $set: { title }
      });

      const user = await User.findById(userId).populate({
        path: "projects",
        populate: { path: "tasks" }
      });

      res.status(200).json({ success: true, user });
    } catch (err) {
      res.status(500).json({ success: false });
      console.error(err);
    }
  }
};
