import { Link } from "react-router-dom";
import {FaArrowRightLong} from "react-icons/fa6"
function Item({ id, name, image, old_price, new_price }) {
  return (
    <div key={id} className="overflow-hidden p-16 rounded-3xl bg-white ring-slate-900/5 my-8 mx-6 xl:w-max-full flex flex-col justify-center items-center object-center">
      <div className="overflow-hidden relative flex justify-center transition-all duration-500">
        <img src={image} className="object-cover block w-full transition-all duration-1000" />
      </div>
      <div className="pt-3 px-12 xl:text-[14px] xl:w-[290px]">
        <h1 className="line-clamp-1 font-bold">{name}</h1>
        <p className="my-2 xl:max-w-fit">
          Enim deserunt dolor velit amet pariatur do sit irure mollit
          adipisicing.
        </p>
        <div className="flex justify-between" >
          <div className="xl:flex gap-4">
            <div>${new_price}.00</div>
            <div>${old_price}.00</div>
          </div>
          <Link to={`/product/${id}`} onClick={window.scrollTo(0,0)} className="bg-orange-500 p-4 rounded-full flex items-center"><FaArrowRightLong/></Link>
        </div>
      </div>
    </div>
  );
}

export default Item;
