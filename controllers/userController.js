"use strict";

const User = require("../models/userSchema");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Helper function to generate a JWT for a user
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      apiToken: user.apiToken
    },
    process.env.JWT_SECRET,
    { expiresIn: "5d" }
  );
};

module.exports = {
  // 1. Custom Passport Authentication (No session, no redirects)
  authenticate: (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err) {
        return res.status(500).json({ success: false, reason: "Authentication error" });
      }
      if (!user) {
        return res.status(401).json({ success: false, reason: "Invalid credentials" });
      }

      // Attach user to req object so loggedIn middleware can access it
      req.user = user;
      next();
    })(req, res, next);
  },

  // 2. Respond to Login with User Data + Token
  loggedIn: async (req, res) => {
    try {
      // Find and populate user data
      const activeUser = await User.findById(req.user._id).populate({
        path: "projects",
        populate: [
          { path: "tasks" },
          {
            path: "sections",
            populate: { path: "tasks" }
          }
        ]
      });

      if (!activeUser) {
        return res.status(404).json({ success: false, reason: "User not found" });
      }

      // Issue token
      const token = generateToken(activeUser);

      res.status(200).json({ 
        success: true, 
        token, 
        user: activeUser 
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false });
    }
  },

  // 3. Signup Handler
  signUpPassport: async (req, res) => {
    try {
      const { email, password, name, avatar } = req.body;
      const matchingEmails = await User.find({ email });

      if (matchingEmails.length > 0) {
        return res.json({
          success: false,
          reason: "this email has already been used"
        });
      }

      User.register(
        { email, name, avatar }, // Note: passport-local-mongoose hashes password automatically
        password,
        async (error, registeredUser) => {
          if (error || !registeredUser) {
            return res.json({
              success: false,
              reason: "unexpected error, please refresh the page and try again"
            });
          }

          // Generate token immediately on signup so user is auto-logged in
          const token = generateToken(registeredUser);

          res.status(200).json({ 
            success: true, 
            token, 
            user: registeredUser 
          });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false });
    }
  },

  // 4. Check Authentication State on App Reload
  // Replaces reading req.session.passport with the verified token payload in req.user
  check: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).populate({
        path: "projects",
        populate: [
          { path: "tasks" },
          {
            path: "sections",
            populate: { path: "tasks" }
          }
        ]
      });

      if (!user) {
        return res.status(404).json({ success: false });
      }

      // Optionally generate a fresh token
      const token = generateToken(user);

      res.status(200).json({ success: true, token, user });
    } catch (err) {
      res.status(404).json({ success: false });
    }
  },

  fetchUser: async (userID) => {
    const user = await User.findById(userID).populate({
      path: "projects",
      populate: [
        { path: "tasks" },
        {
          path: "sections",
          populate: { path: "tasks" }
        }
      ]
    });
    return user;
  }
};