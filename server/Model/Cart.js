import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: 'User', 
    required: true
  },
  products: [{
    product: {
      type: String,
      ref: 'Product', 
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const CartModel = mongoose.model('Cart', cartSchema);
