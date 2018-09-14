import mongoose, { Schema } from "mongoose";
import { updateDate } from "~/src/app/database/utils";

mongoose.set("debug", true);

/*
{
  name: String,
  label: String,
  options: Object, // Ant design field decorator
  componentScheme: Object, // Data for creating React.Component
  
}
*/
export const schema = new mongoose.Schema({
  // type: { type: String, enum: ["text", "number", "select"], required: true },
  name: { type: String, required: true, unique: true },
  label: { type: String, required: true },
  options: mongoose.Schema.Types.Mixed,
  componentScheme: {
    type: {
      _type: {
        type: String,
        enum: ["text", "number", "select"],
        required: true
      },
      props: mongoose.Schema.Types.Mixed
    },
    required: true
  },
  created_at: Date,
  updated_at: Date
});

schema.pre("save", updateDate);

export const Model = mongoose.model("TemplateInput", schema);

export default Model;
