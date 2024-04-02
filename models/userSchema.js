"use strict";

const { Schema, model } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }]
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

export const User = model("User", userSchema);
