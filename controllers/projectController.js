"use strict";

const Project = require("../models/projectSchema");
const User = require("../models/userSchema");

module.exports = {
  create: async (req, res) => {
    const { title } = req.body;
    const email = req.session.passport.user;

    if(email){
      console.log(email)
    }

    try {
      const newProject = await Project.create({ title });
      const user = await User.findOneAndUpdate(
        email,
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
    const email = req.session.passport.user;;

    try {
      await Project.findByIdAndDelete(projectId);

      const user = await User.findOne(email).populate({
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
    const { projectId, title } = req.body;
    const email = req.session.passport.user;

    try {
      await Project.findByIdAndUpdate(projectId, {
        $set: { title }
      });

      const user = await User.findOne(email).populate({
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
