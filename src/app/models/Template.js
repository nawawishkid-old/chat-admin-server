import mongoose from "mongoose";
import { schema as templateInputSchema } from "./TemplateInput";
import { updateDate } from "~/src/app/database/utils";

// mongoose.set("debug", true);

export const schema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  symbol: { type: String, enum: ["{{", "[[", "%%", "__", "//"] }, // enum
  inputs: [templateInputSchema], // Array of inputs object
  created_at: Date,
  updated_at: Date
});

schema.pre("save", updateDate);

export const Model = mongoose.model("Template", schema);

export default Model;
