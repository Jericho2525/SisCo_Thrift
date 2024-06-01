import { ShopContext } from "../../context/ShopContext";
import { useContext } from "react";

function WomensCard({_id ,name,imageURL,description,stockQuantity ,price}) {

    const truncateString = (str, num) => {
        if (str.length <= num) {
          return str;
        }
        return str.slice(0, num) + "...";
      };



      const{addToCart,getCartItemCount , decreaseFromTheCart} = useContext(ShopContext)
     
      const cartItemCount = getCartItemCount(_id);
       
      console.log("WomensCard cartItemCount:", cartItemCount);
  

  return (
    <div
    key={_id}
    className="mx-4 text-center flex flex-col place-items-center items-center mt-12 justify-center border-2 rounded-md border-orange-400 py-6"
  >
    <h1>{name}</h1>
    <div className="w-full h-48 flex justify-center items-center">
      <img
        src={imageURL}
        alt={name}
        className="object-contain h-full"
      />
    </div>
    <div className="flex-1 overflow-hidden">
      <p className="text-black p-4 h-full">{truncateString(description, 200)}</p>
    </div>
    <p className="text-black p-4">₱{price}</p>
    <p className="text-black">
    Stock Quantity: {stockQuantity === 0 ? <span className="text-red-500">OUT OF STOCK</span> : stockQuantity}
  </p>
  <div> <button className="bg-orange-400 p-2 rounded-full mt-2" onClick={() => addToCart(_id)}>
      Add to Cart{cartItemCount > 0 && <> ({cartItemCount})</>}
    </button>
  

  </div>

  </div>
  )
}

export default WomensCard
