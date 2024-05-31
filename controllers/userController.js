"use strict";

const User = require("../models/userSchema");
const passport = require("passport");

module.exports = {
  authenticate: passport.authenticate("local", {
    successRedirect: "/api/user/loggedIn",
    failureRedirect: "/api/user/failedLogin",
    keepSessionInfo: true,
    session: false
  }),
  loggedIn: async (req, res) => {
    try {
      console.log(res.locals);
      const { loggedIn } = res.locals;
      //const { _id } = res.locals.currentUser;
      console.log(req.session);
      const email = req.session.passport.user;

      const activeUser = await User.find({ email }).populate({
        path: "projects",
        populate: [
          { path: "tasks" },
          {
            path: "sections",
            populate: { path: "tasks" }
          }
        ]
      });
      res
        .status(200)
        .json({ success: true, user: activeUser[0], loggedIn });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false });
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
  signUpPassport: async (req, res) => {
    const { email, password, name, avatar } = req.body;
    const matchingEmails = await User.find({ email });

    if (matchingEmails.length === 0) {
      User.register(
        { email, password, name, avatar },
        password,
        (error, user) => {
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
        }
      );
    } else if (matchingEmails.length > 0) {
      res.json({
        success: false,
        reason: "this email has already been used",
        locals: res.locals
      });
    }
  },
  check: async (req, res) => {
    try {
      const id = res.locals.currentUser._id;
      const user = await User.findById(id).populate({
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
      res.status(404).json({ success: false });
    }
  }
};
