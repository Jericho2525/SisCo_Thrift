import {Schema,mongoose} from "mongoose";


const userSchema = new Schema({

  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  availableMoney: {
    type: Number,
    default: 5000
  },
  purchasedItems: [
    { type: Schema.Types.ObjectId, ref: "Product", default: [] }
  ]
});

export const UserModel = mongoose.model("User", userSchema);
