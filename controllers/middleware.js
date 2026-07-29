"use strict";

const jwt = require("jsonwebtoken");

module.exports = {
  verifyRequest: (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, reason: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ success: false, reason: "Invalid or expired token" });
      }

      // Attach decoded payload (contains id, email, apiToken) to req.user
      req.user = decoded;
      next();
    });
  }
};