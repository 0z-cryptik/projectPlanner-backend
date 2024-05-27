"use strict";

const User = require("../models/userSchema");

module.exports = {
  verifyRequest: async (req, res, next) => {
    const { apiToken } = req.query;
    const currentUserToken = res.locals.currentUser.apiToken;

    if (apiToken === currentUserToken) {
      next();
    } else {
      res
        .status(401)
        .json({ success: false, reason: "wrong token", apiToken });
    }
  }
};
