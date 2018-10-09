import mongoose from "mongoose";
import updateDate from "~/src/database/mongoose/utils/updateDate";

const customerSchema = new mongoose.Schema({
  full_name: String,
  email: String,
  password: String,
  full_address: String,
  province: String,
  postcode: Number,
  phone_number: String,
  created_at: Date,
  updated_at: Date
});

customerSchema.pre("save", updateDate);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
