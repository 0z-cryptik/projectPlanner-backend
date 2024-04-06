"use strict";

const User = require("../models/userSchema");
const Task = require("../models/taskSchema");
const SubTask = require("../models/subtaskSchema");

module.exports = {
  createSubTask: async (req, res) => {
    const { title, parentTask } = req.body;
    const { _id } = res.locals.currentUser;

    try {
      const newSubTask = await SubTask.create({ title });

      const updatedTask = await Task.findByIdAndUpdate(
        parentTask,
        { $push: { subTasks: newSubTask } },
        { new: true }
      ).populate("subTasks");

      const user = await User.findById(_id).populate({
        path: "tasks",
        populate: { path: "subTasks" }
      });

      res.status(200).json({ success: true, data: updatedTask, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false });
    }
  }
};
