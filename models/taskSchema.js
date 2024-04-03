"use strict";

const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  subtask: [{ type: Schema.Types.ObjectId, ref: "SubTask" }],
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = model("Task", taskSchema);
