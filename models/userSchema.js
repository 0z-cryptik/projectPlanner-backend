"use strict";

const { Schema, model } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: String,
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    avatar: String
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = model("User", userSchema);
