import mongoose from "mongoose";
import { updateDate } from "~/src/app/database/utils";
import passwordHash from "password-hash";

/**
 * Required input validation e.g. email, name
 */
export const schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  // Always store username in lower case
  name: { type: String, required: true, lowercase: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,

    select: false,
    set: value => passwordHash.generate(value)
  },
  created_at: Date,
  updated_at: Date
});

schema.pre("save", updateDate);

const Model = mongoose.model("User", schema);

export default Model;
