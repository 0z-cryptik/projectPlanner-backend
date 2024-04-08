"use strict";

const Task = require("../models/taskSchema");
const User = require("../models/userSchema");

module.exports = {
  createTask: async (req, res) => {
    const { title, dueDate } = req.body;
    const { _id } = res.locals.currentUser;

    try {
      const newTask = await Task.create({ title, dueDate });
      const user = await User.findByIdAndUpdate(
        _id,
        { $push: { tasks: newTask } },
        { new: true }
      ).populate({
        path: "tasks",
        populate: { path: "subTasks" }
      });
      res.status(200).json({ success: true, data: user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false });
    }
  },
  deleteTask: async (req, res, next) => {
    const { taskId } = req.body;
    const { _id } = res.locals.currentUser;

    try {
      await Task.findByIdAndDelete(taskId);

      const user = await User.findById(_id).populate({
        path: "tasks",
        populate: { path: "subTasks" }
      });

      res.status(200).json({ success: true, user });
    } catch (err) {
      res.status(500).json({ success: false });
      console.error(err);
    }
  }
};
