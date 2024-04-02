"use strict";

const User = require('../models/userSchema')

module.exports = {
  loggedIn: (req, res) => {
    try {
      res.status(200).json({ success: true, locals: res.locals });
    } catch (err) {
      console.error(err);
    }
  },
  failed: (req, res) => {
    try {
      res.status(404).json({ success: false, locals: res.locals });
    } catch (err) {
      console.error(err);
    }
  },
  logout: (req, res, next) => {
    req.logOut((err) => {
      if (err) {
        return next(err);
      }
    });
    next();
  },
  signUpPassport: async (req, res) => {
    const { email, password } = req.body;
    const matchingEmails = await User.find({ email });
    
    if (!email || !password) {
      res.json({ success: false, reason: "no username or password" });
      console.log("incomplete data submitted");
    } else if (matchingEmails.length === 0) {
      User.register({ email, password }, password, (error, user) => {
        if (user) {
          res
            .status(200)
            .json({ success: true, data: user, locals: res.locals });
        } else {
          res.json({ success: false, data: null, locals: res.locals });
        }
      });
    } else if (matchingEmails.length > 0) {
      res.json({
        success: false,
        reason: "username already taken",
        locals: res.locals
      });
    }
  }
};
