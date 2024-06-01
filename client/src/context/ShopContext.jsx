// ShopContext.js
import React, { createContext, useState, useEffect} from "react";
import { useGetProduct } from "../hooks/useGetProduct";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import { useGetToken } from "../hooks/UseGetTokens"
import { number } from "prop-types";


const defaultValue = {
  addToCart: () => null,
  removeFromCart: () => null,
  decreaseFromTheCart: () => null,
  updateCartItemCount: () => null,
  getCartItemCount: () => 0,
  availableMoney:number,
  
};



export const ShopContext = createContext(defaultValue);

export const ShopContextProvider = (props) => {  
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([]); 
  const [availableMoney , setAvailableMoney] = useState(0)
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);
  const {headers} = useGetToken()

const {products} = useGetProduct()
  useEffect(() => {

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const getCartItemCount = (itemId) => {
    
    localStorage.setItem("cartItemCount", JSON.stringify(cartItems));
    if (itemId in cartItems) {
      return cartItems[itemId];
    }
    return 0;
  };




  const checkout = async () => {
       const body = { customerID: localStorage.getItem("userID"), cartItems };
  
    try {
       await axios.post(
        "http://localhost:5000/user/checkout",
        body,
        { headers }
      );
      alert("Your older has been checked out!")
      navigate("/")
      fetchAvailableMoney()
    } catch (error) {
      console.error("Error during checkout:", error);
    
    }
  };
  


  const getTotalCartAmount = () => {
    if (products.length === 0) return 0;
  
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product._id === item);
  
        if (itemInfo) {
          totalAmount += cartItems[item] * itemInfo.price;
        } else {
          console.warn(`Product with ID ${item} not found`);
        }
      }
    }
    return Number(totalAmount.toFixed(2));
  };
  
  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
      console.log(cartItems)
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }
  };


  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCartItems = { ...prev };
      delete newCartItems[itemId]; // Remove the item from the cart
      return newCartItems;
    });
  };
  const decreaseFromTheCart = (itemId) => {
    setCartItems((prev) => {
      const newCartItems = { ...prev };
      if (newCartItems[itemId] > 1) {
        newCartItems[itemId] -= 1;
      }
      return newCartItems;
    });
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => {
      const newCartItems = { ...prev };
      if (newAmount > 0) {
        newCartItems[itemId] = newAmount;
      } else {
        delete newCartItems[itemId];
      }
      return newCartItems;
    });
  };


  const fetchAvailableMoney = async () => {
    const userID = localStorage.getItem("userID");
    

    try {
      const res = await axios.get(`http://localhost:5000/availMoney/${userID}`);
     
      setAvailableMoney(res.data.availableMoney);
    } catch (err) {
      console.error(`Error fetching available money for user ID: ${userID}`, err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableMoney();
  }, []);

  

  const contextValue = {
    addToCart,
    removeFromCart,
    decreaseFromTheCart,
    updateCartItemCount,
    getCartItemCount,
    getTotalCartAmount,
    checkout,
    availableMoney,
    loading,
    error,
  
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
