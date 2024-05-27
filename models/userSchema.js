"use strict";

const { Schema, model } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const randToken = require("rand-token");

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: String,
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    avatar: String,
    apiToken: String
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

userSchema.pre("save", function (next) {
  let user = this;

  if (!user.apiToken) {
    user.apiToken = randToken.generate(16);
  }

  next();
});

module.exports = model("User", userSchema);
