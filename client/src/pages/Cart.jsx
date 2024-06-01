import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const Cart = ({ _id, name, imageURL, description, price, stockQuantity }) => {
 

  const truncateString = (str, num) => {
    if (typeof str !== 'string') {
      return '';
    }
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

  const { addToCart, decreaseFromTheCart, getCartItemCount, removeFromCart } = useContext(ShopContext);
  const cartItemCount = getCartItemCount(_id);

  return (
    <div
      key={_id}
      className="mx-4 text-center flex flex-col place-items-center items-center mt-12 justify-center border-2 rounded-md border-orange-400 py-6"
    >
      <h1>{name}</h1>
      <div className="w-full h-48 flex justify-center items-center">
        <img src={imageURL} alt={name} className="object-contain h-full" />
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="text-black p-4 h-full">
          {truncateString(description, 200)}
        </p>
      </div>
      <p className="text-black p-4">₱{price}</p>
      <p className="text-black">
        Stock Quantity:{" "}
        {stockQuantity === 0 ? (
          <span className="text-red-500">OUT OF STOCK</span>
        ) : (
          stockQuantity
        )}
      </p>
      <div className="flex items-center">
        <button className="mx-4 bg-orange-400 p-2 rounded-full mt-2" onClick={() => decreaseFromTheCart(_id)}>-</button>
        <p className="mx-4">{cartItemCount > 0 && <> ({cartItemCount})</>}</p>
        <button
          className="bg-orange-400 p-2 rounded-full mt-2 mx-4"
          onClick={() => addToCart(_id)}
        >
         +
        </button>
        <button onClick={() => removeFromCart(_id)}>Remove</button>
      </div>
      <p>Subtotal:{}</p>
    </div>
  );
};

export default Cart;
