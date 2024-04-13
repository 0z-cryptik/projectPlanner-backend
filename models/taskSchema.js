"use strict";

const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    dueDate: Date,
    subTasks: [{ type: Schema.Types.ObjectId, ref: "SubTask" }],
    sections: [{ type: Schema.Types.ObjectId, ref: "Section" }]
  },
  { timestamps: true }
);

module.exports = model("Task", taskSchema);
