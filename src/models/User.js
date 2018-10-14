const mongoose = require("mongoose");
const passwordHash = require("password-hash");
const { Schema } = mongoose;

const validateEmail = email => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;

  return regex.test(email);
};

/**
 * Required input validation e.g. email, name
 */
const schema = new Schema({
  username: { type: String, required: true, lowercase: true, unique: true },
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    validate: [validateEmail, "Invalid email address pattern"]
  },
  password: {
    type: String,
    required: true,
    select: false,
    set: value => passwordHash.generate(value)
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now, set: () => Date.now() },
  __v: { type: Number, select: false } // hide mongoose's built-in prop
});

module.exports = mongoose.model("User", schema);
