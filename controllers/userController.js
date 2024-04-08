"use strict";

const User = require("../models/userSchema");
const Task = require("../models/taskSchema");

module.exports = {
  loggedIn: async (req, res) => {
    const { loggedIn } = res.locals;
    const { _id } = res.locals.currentUser;
    try {
      const user = await User.findById(_id).populate({
        path: "tasks",
        populate: { path: "subTasks" }
      });
      res.status(200).json({ success: true, user, loggedIn });
    } catch (err) {
      console.error(err);
    }
  },
  failed: (req, res) => {
    try {
      res.status(404).json({ success: false });
    } catch (err) {
      console.error(err);
    }
  },
  logout: (req, res, next) => {
    req.logOut((err) => {
      if (err) {
        res.status(500).json({ success: false });
      }
    });
    next();
  },
  logoutResponse: (req, res) => {
    res.status(500).json({ success: true });
  },
  findAndReturnUser: async (id) => {
    try {
      const user = await User.findById(id).populate({
        path: "tasks",
        populate: { path: "subTasks" }
      });

      res.status(200).json({ success: true, user });
    } catch (err) {
      res.status(500).json({ success: false });
      console.error(err);
    }
  },
  signUpPassport: async (req, res) => {
    const { email, password } = req.body;
    const matchingEmails = await User.find({ email });

    if (!email || !password) {
      res.json({ success: false, reason: "no email or password" });
      console.log("incomplete data submitted");
    } else if (matchingEmails.length === 0) {
      User.register({ email, password }, password, (error, user) => {
        if (user) {
          res
            .status(200)
            .json({ success: true, data: user, locals: res.locals });
        } else {
          res.json({
            success: false,
            locals: res.locals,
            reason:
              "unexpected error, please refresh the page and try again"
          });
        }
      });
    } else if (matchingEmails.length > 0) {
      res.json({
        success: false,
        reason: "this email has already been used",
        locals: res.locals
      });
    }
  },
  nameHandler: async (req, res) => {
    const { name, userID } = req.body;

    const user = await User.findByIdAndUpdate(
      userID,
      { $set: { name } },
      { new: true }
    );

    try {
      res.status(200).json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ success: false, error: err });
      console.error(err);
    }
  }
};
