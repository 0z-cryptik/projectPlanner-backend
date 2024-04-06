"use strict";

const { Schema, model } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: String,
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }]
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = model("User", userSchema);
