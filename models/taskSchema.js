"use strict";

const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    dueDate: Date,
    subTasks: [{ type: Schema.Types.ObjectId, ref: "SubTask" }]
  },
  { timestamps: true }
);

module.exports = model("Task", taskSchema);
