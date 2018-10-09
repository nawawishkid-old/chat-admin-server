import mongoose from "mongoose";
import updateDate from "~/src/database/mongoose/utils/updateDate";

const productSchema = new mongoose.Schema({
  name: String,
  url: String,
  created_at: Date,
  updated_at: Date
});

productSchema.pre("save", updateDate);

const Product = mongoose.model("Product", productSchema);

export default Product;
