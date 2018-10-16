const mongoose = require("mongoose");
const Template = require("./Template");
const { Schema } = mongoose;

const objValidator = value =>
  typeof value === "object" && !Array.isArray(value);

const componentScheme = new Schema({
  type: {
    type: String,
    enum: ["text", "number", "select"],
    required: true
  },
  props: {
    type: Schema.Types.Mixed,
    validate: {
      validator: objValidator,
      message: "'componentScheme.props' must be an object"
    },
    default: {}
  },
  options: [{ label: String, value: String, isDefault: Boolean }]
});

/**
 * TemplateInput is meant to be data for creating user interface,
 * we can parse Template without TemplateInput
 */
const schema = new Schema({
  name: { type: String, required: true, unique: true },
  label: { type: String, required: true },
  options: {
    type: Schema.Types.Mixed,
    validate: {
      validator: objValidator,
      message: "'options' must be an object"
    },
    default: {}
  },
  componentScheme: { type: componentScheme, required: true },
  creatorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  __v: { type: Number, select: false } // hide mongoose's built-in prop
});

/**
 * Remove deleted template input from template
 *
 * @see https://stackoverflow.com/questions/14348516/cascade-style-delete-in-mongoose
 * @see https://mongoosejs.com/docs/middleware.html
 * @see https://docs.mongodb.com/manual/reference/operator/update/pull/
 */
schema.pre("findOneAndRemove", function(next) {
  const inputId = this._conditions._id;
  const query = Template.update(
    { inputs: { $in: [inputId] } },
    { $pull: { inputs: inputId } },
    { multi: true }
  );

  query.exec((...params) => {
    // console.log("params: ", params);
  });

  next();
});

module.exports = mongoose.model("TemplateInput", schema);
