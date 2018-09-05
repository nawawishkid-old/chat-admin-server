import mongoose from "mongoose";
import { updateDate } from "~/src/app/database/utils";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  created_at: Date,
  updated_at: Date
});

userSchema.pre("save", updateDate);

const User = mongoose.model("User", userSchema);

export default User;
