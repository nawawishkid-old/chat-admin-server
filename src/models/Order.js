import mongoose from "mongoose";
import Customer from "./Customer";
import Product from "./Product";
import updateDate from "~/src/database/mongoose/utils/updateDate";

const orderSchema = new mongoose.Schema({
  owner: { type: Customer, required: true },
  quantity: { type: Number, required: true },
  products: { type: [Product], required: true },
  is_ordered: { type: Boolean, default: false },
  created_at: Date,
  updated_at: Date
});

orderSchema.pre("save", updateDate);

const Order = mongoose.model("Order", orderSchema);

export default Order;
