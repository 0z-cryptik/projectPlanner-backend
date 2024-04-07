"use strict";

const { Schema, model } = require("mongoose");

const subtaskSchema = new Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    dueDate: Date
  },
  { timestamps: true }
);

module.exports = model("SubTask", subtaskSchema);
