const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * User need to create template's input before create a template.
 */
const schema = new Schema({
  name: { type: String, required: true, index: true },
  content: { type: String, required: true },
  openTag: { type: String, default: "" }, // it's optional, that means user could just stores data, not necessary to parse it
  closingTag: { type: String, default: "" },
  inputs: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "TemplateInput"
      }
    ],
    default: []
  },
  creatorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const autoPopulateInputs = function(next) {
	this.populate('inputs');

	next();
}

schema.pre('find', autoPopulateInputs);
schema.pre('findOne', autoPopulateInputs);

module.exports = mongoose.model("Template", schema);
