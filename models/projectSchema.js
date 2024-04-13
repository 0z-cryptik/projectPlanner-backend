"use strict";

const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    sections: [{ type: Schema.Types.ObjectId, ref: "Section" }]
  },
  { timestamps: true }
);

module.exports = model("Project", projectSchema);
