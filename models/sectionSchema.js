"use strict";

const { Schema, model } = require("mongoose");

const sectionSchema = new Schema(
  {
    title: { type: String, required: true },
    subTasks: [{type: Schema.Types.ObjectId, ref: 'SubTask'}]
  },
  { timestamps: true }
);

module.exports = model("Section", sectionSchema);
