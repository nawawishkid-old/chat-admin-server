import mongoose, { Schema } from "mongoose";
import { updateDate } from "~/src/app/database/utils";

/*
{
  name: String,
  label: String,
  options: Object, // Ant design field decorator
  componentScheme: Object, // Data for creating React.Component
  
}
*/
export const schema = new Schema({
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
  created_at: Date,
  updated_at: Date
});

schema.pre("save", updateDate);

export const Model = mongoose.model("TemplateInput", schema);

export default Model;
