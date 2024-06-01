import React, { useEffect, useState } from 'react'
import { useGetToken } from '../../hooks/UseGetTokens';
import axios from 'axios';
import KidsCard from '../Card/KidsCard';

function Kid() {
  const { headers } = useGetToken();
  const [products, setProducts] = useState([]);
  const [imageURL, setImageURL] = useState();

  const fetchedProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getProductKid", {
        headers: headers,
      });
      setProducts(response.data);
      setImageURL(response.data[0].imageURL);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchedProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 p-10">
      {products.map((product) => (
        <div key={product._id} className="flex justify-center">
          <KidsCard
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

export default Kid
