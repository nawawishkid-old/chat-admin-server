import mongoose from "mongoose";
import { updateDate } from "~/src/app/database/utils";

mongoose.set("debug", true);

const templateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  symbol: String, // enum
  inputs: Array, // Array of inputs object
  created_at: Date,
  updated_at: Date
});

templateSchema.pre("save", updateDate);

const Template = mongoose.model("Template", templateSchema);

export default Template;
