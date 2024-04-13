"use strict";

const { Schema, model } = require("mongoose");

const sectionSchema = new Schema(
  {
    title: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }]
  },
  { timestamps: true }
);

module.exports = model("Section", sectionSchema);
