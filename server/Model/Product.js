import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  category:{type:String , required:true},
  price: { type: Number, required: true },
  description: { type: String, required: true },
  stockQuantity: { type: Number, required: true },
  imageURL: { type: String, required: true },
});
export const ProductModel = mongoose.model("Product", productSchema);
