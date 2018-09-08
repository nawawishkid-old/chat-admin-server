import mongoose from "mongoose";
import { updateDate } from "~/src/app/database/utils";
import passwordHash from "password-hash";

export const schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
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
