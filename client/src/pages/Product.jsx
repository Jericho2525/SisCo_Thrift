import { useParams } from "react-router-dom";
import POPULAR from "../assets/popular"; // Adjust the import path if necessary
import React from "react";

const Product = () => {
  const { id } = useParams();
  const product = POPULAR.find(item => item.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>Old Price: ${product.old_price}</p>
      <p>New Price: ${product.new_price}</p>
    </div>
  );
};

export default Product;
