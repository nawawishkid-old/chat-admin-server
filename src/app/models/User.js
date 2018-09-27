const mongoose = require("mongoose");
const { updateDate } = require("../database/utils");
const passwordHash = require("password-hash");
const { Schema } = mongoose;
/**
 * Required input validation e.g. email, name
 */
const schema = new Schema({
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

module.exports = mongoose.model("User", schema);
