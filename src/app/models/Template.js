import mongoose, { Schema } from "mongoose";
import { updateDate } from "~/src/app/database/utils";

/**
 * User need to create template's input before create a template.
 */
export const schema = new Schema({
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
  created_at: Date,
  updated_at: Date
});

schema.pre("save", updateDate);

export const Model = mongoose.model("Template", schema);

export default Model;
