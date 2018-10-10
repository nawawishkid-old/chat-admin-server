const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * User need to create template's input before create a template.
 */
const schema = new Schema({
  name: { type: String, required: true, index: true },
  content: { type: String, required: true },
  openTag: { type: String, required: true },
  closingTag: { type: String, required: true },
  /**
   * ***ATTENTION***
   * Required: true is not working
   */
  inputs: [
    {
      type: Schema.Types.ObjectId,
      ref: "TemplateInput"
    }
  ],
  creatorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Template", schema);
