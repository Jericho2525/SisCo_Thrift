import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Kid from "./pages/category/Kid";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Signup from "./pages/Signup";
import Men from "./pages/category/Men";
import Women from "./pages/category/Women";
import { ShopContextProvider } from "./context/ShopContext";
import Checkout from "./components/Checkout";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import WomensCard from "./pages/Card/WomensCard";
import Daman from "./Daman";

export const userContext = createContext();

function App() {



  return (
    <BrowserRouter>
      <ShopContextProvider>
        <Header />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/mens" element={<Men />} />
          <Route path="/womens" element={<Women />} />
          <Route path="/womenscard" element={<WomensCard />} />
          <Route path="/kids" element={<Kid />} />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart-page" element={<Cart />} />    
          <Route path="/daman" element={<Daman />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </ShopContextProvider>
    </BrowserRouter>
  );
}

export default App;
