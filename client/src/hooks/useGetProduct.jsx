import axios from "axios";
import { useEffect, useState } from "react";

export const useGetProduct = () => {
  const [products, setProducts] = useState([]);
  const [productsWomen , setProductsWomen] = useState([]) 
  const [kid , setKid] = useState([]) 
  const fetchProducts = async () => {
    try {
      const [menResponse, womenResponse] = await Promise.all([
        axios.get("http://localhost:5000/getProductMen"),
        axios.get("http://localhost:5000/getProductWomen"),
      ]);

      const combinedProducts = [...menResponse.data, ...womenResponse.data];
      setProducts(combinedProducts);
      console.log("Fetched Products:", combinedProducts); 
      localStorage.setItem("products", JSON.stringify(combinedProducts));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      fetchProducts();
    }
  }, []);



  
  const fetchProductsWomen = async () => {
    try {
      const res = await axios.get("http://localhost:5000/getProductWomen");
      setProductsWomen(res.data);
      localStorage.setItem("womenProducts", JSON.stringify(res.data));
    } catch (err) {
      console.error("Error fetching women's products:", err);
    }
  };

  useEffect(() => {
    const storedWomenProducts = localStorage.getItem("womenProducts");
    if (storedWomenProducts) {
      setProductsWomen(JSON.parse(storedWomenProducts));
    } else {
      fetchProductsWomen();
    }
  }, []);

  const fetchProductsKid = async () => {
    try {
      const res = await axios.get("http://localhost:5000/getProductKid");
      setKid(res.data);
      localStorage.setItem("kidProducts", JSON.stringify(res.data));
    } catch (err) {
      console.error("Error fetching kid products:", err);
    }
  };

  useEffect(() => {
    const storedKidProducts = localStorage.getItem("kidProducts");
    if (storedKidProducts) {
      setKid(JSON.parse(storedKidProducts));
    } else {
      fetchProductsKid();
    }
  }, []);


  return { products, productsWomen, kid };
};
