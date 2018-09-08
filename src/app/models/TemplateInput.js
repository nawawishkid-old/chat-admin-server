import mongoose, { Schema } from "mongoose";
import { updateDate } from "~/src/app/database/utils";

mongoose.set("debug", true);

export const schema = new mongoose.Schema({
  type: { type: String, enum: ["text", "number", "select"], required: true },
  name: { type: String, required: true, unique: true },
  defaultValue: String,
  props: {
    type: [
      {
        name: String,
        value: Schema.Types.Mixed
      }
    ],
    set: value => {
      console.log("value: ", value);
      console.log("typeof value: ", typeof value);

      const newValue = JSON.parse(value);

      console.log("newValue: ", newValue);
      console.log("typeof newValue: ", typeof newValue);

      return newValue;
    }
  },
  created_at: Date,
  updated_at: Date
});

schema.pre("save", updateDate);

export const Model = mongoose.model("TemplateInput", schema);

export default Model;
