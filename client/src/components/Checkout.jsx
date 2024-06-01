import React, { useContext } from "react";
import { useGetProduct } from "../hooks/useGetProduct";
import { ShopContext } from "../context/ShopContext";
import Cart from "../pages/Cart";

function Checkout() {
    const { getCartItemCount, getTotalCartAmount, checkout } = useContext(ShopContext);
    const { products, productsWomen , kid} = useGetProduct();
    
    // Combine both product arrays
    const allProducts = [...products, ...productsWomen,...kid];
    
    const cartIsEmpty = allProducts.every(product => getCartItemCount(product._id) === 0);

    if (cartIsEmpty) {
        return (
            <div>
                <p>Your cart is empty. Go to the shop and add items.</p>
            </div>
        );
    }

    const userID = localStorage.getItem("userID");
    if (!userID) {
        return (
            <div>
                <p>You must be logged in to proceed with the checkout.</p>
            </div>
        );
    }

    const renderCartItems = (products) => {
        return products.map((product) => {
            const itemCount = getCartItemCount(product._id);
            if (itemCount !== 0) {
                return (
                    <Cart
                        key={product._id}
                        _id={product._id}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        imageURL={product.imageURL}
                        stockQuantity={product.stockQuantity}
                    />
                );
            }
            return null;
        });
    };

    return (
        <div className="flex items-center flex-col">
            {renderCartItems(allProducts)}
            <div className="mt-10 bg-orange-400 p-16 rounded-full">
                <p className="mt-6">Subtotal: {getTotalCartAmount()}</p>
                <button onClick={() => checkout(userID)} className="mt-6 bg-green-500 p-4 rounded-md">Checkout</button>
            </div>
        </div>
    );
}

export default Checkout;
