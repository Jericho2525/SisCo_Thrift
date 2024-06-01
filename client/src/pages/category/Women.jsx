import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useGetToken } from "../../hooks/UseGetTokens";
import WomensCard from "../Card/MensCard";
import { useGetProduct } from "../../hooks/useGetProduct";


function Women() {
  const { headers } = useGetToken();
  const {productsWomen} = useGetProduct()
  const [products, setProducts] = useState([]);
  const fetchedProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getProductWomen", {
        headers: headers,
      });
      setProducts(response.data);
     
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchedProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 p-10 ">
      {products.map((product) => (
        <div key={product._id} className="flex justify-center">
          <WomensCard
            _id={product._id}
            name={product.productName}
            description={product.description}
            price={product.price}
            imageURL={product.imageURL}
            stockQuantity={product.stockQuantity}
          />
        
        </div>
      ))}
    </div>
  );
}

export default Women;
