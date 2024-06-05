"use strict";

const User = require("../models/userSchema");

module.exports = {
  verifyRequest: async (req, res, next) => {
    const { apiToken } = req.query;
    console.log(req.session);
    const currentUserToken = req.session.userToken;

    if (apiToken === currentUserToken) {
      next();
    } else {
      console.log(`wrong token ${apiToken} ${currentUserToken}`);
      res
        .status(401)
        .json({ success: false, reason: "wrong token", apiToken });
    }
  }
};
