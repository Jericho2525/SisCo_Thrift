import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
   
    imageURL: { type: String, required: true }
  });
  
  export const ProductsModel = mongoose.model("Products", productSchema);