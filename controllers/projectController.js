"use strict";

const Project = require("../models/projectSchema");
const User = require("../models/userSchema");
const { ObjectId } = require("mongodb");
const userController = require("./userController");

module.exports = {
  create: async (req, res) => {
    const { title } = req.body;
    const userID = new ObjectId(req.session.userID)

    try {
      const newProject = await Project.create({ title });
      const user = await User.findByIdAndUpdate(
        userID,
        { $push: { projects: newProject } },
        { new: true }
      ).populate({
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
    const { projectId } = req.body;
    const userID = new ObjectId(req.session.userID)

    try {
      await Project.findByIdAndDelete(projectId);
      const user = await userController.fetchUser(userID)
      res.status(200).json({ success: true, user });
    } catch (err) {
      res.status(500).json({ success: false });
      console.error(err);
    }
  },
  update: async (req, res) => {
    const { projectId, title } = req.body;
    const userID = new ObjectId(req.session.userID)

    try {
      await Project.findByIdAndUpdate(projectId, {
        $set: { title }
      });
      const user = await userController.fetchUser(userID)
      res.status(200).json({ success: true, user });
    } catch (err) {
      res.status(500).json({ success: false });
      console.error(err);
    }
  }
};
