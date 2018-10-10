const mongoose = require("mongoose");
const Template = require("./Template");
const { Schema } = mongoose;

/*
{
  name: String,
  label: String,
  options: Object, // Ant design field decorator
  componentScheme: Object, // Data for creating React.Component
  
}
*/
const schema = new Schema({
  name: { type: String, required: true, unique: true },
  label: { type: String, required: true },
  options: Schema.Types.Mixed,
  componentScheme: {
    type: {
      type: String,
      enum: ["text", "number", "select"],
      required: true
    },
    props: Schema.Types.Mixed,
    options: [{ label: String, value: String, isDefault: Boolean }]
  },
  creatorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
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
    console.log("params: ", params);
  });

  next();
});

module.exports = mongoose.model("TemplateInput", schema);
