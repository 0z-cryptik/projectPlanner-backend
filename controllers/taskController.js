"use strict";

const User = require("../models/userSchema");
const Project = require("../models/projectSchema");
const Task = require("../models/taskSchema");
const { findAndReturnUser } = require("./userController");

module.exports = {
  create: async (req, res) => {
    const { title, parentProject, dueDate } = req.body;
    const { _id } = res.locals.currentUser;

    try {
      const newTask = await Task.create({ title, dueDate });

      await Project.findByIdAndUpdate(parentProject, {
        $push: { tasks: newTask }
      });

      const user = await User.findById(_id).populate({
        path: "projects",
        populate: { path: "tasks" }
      });

      res.status(200).json({ success: true, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false });
    }
  },
  update: async (req, res) => {
    const { title, Id, dueDate } = req.body;
    const userId = res.locals.currentUser._id;

    try {
      await Task.findByIdAndUpdate(Id, { $set: { title, dueDate } });

      const user = await User.findById(userId).populate({
        path: "projects",
        populate: { path: "tasks" }
      });

      res.status(200).json({ success: true, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false });
    }
  },
  delete: async (req, res) => {
    const { taskId } = req.body;
    const { _id } = res.locals.currentUser;

    try {
      await Task.findByIdAndDelete(taskId);

      const user = await User.findById(_id).populate({
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
