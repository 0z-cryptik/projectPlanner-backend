"use strict";

const User = require("../models/userSchema");
const Task = require("../models/taskSchema");
const SubTask = require("../models/subtaskSchema");

module.exports = {
  createSubTask: async (req, res) => {
    const { title, parentTask, dueDate } = req.body;
    const { _id } = res.locals.currentUser;

    try {
      const newSubTask = await SubTask.create({ title, dueDate });

      await Task.findByIdAndUpdate(parentTask, {
        $push: { subTasks: newSubTask }
      });

      const user = await User.findById(_id).populate({
        path: "tasks",
        populate: { path: "subTasks" }
      });

      res.status(200).json({ success: true, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false });
    }
  }
};