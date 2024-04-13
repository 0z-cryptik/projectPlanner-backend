"use strict";

const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    dueDate: Date
  },
  { timestamps: true }
);

module.exports = model("Task", taskSchema);
