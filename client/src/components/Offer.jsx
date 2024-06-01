import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

function Offer() {
  return (
    <section className="max-w-screen mx-auto px-4 mb-16 mt-12 p-14">
      <div className=" max-w-screen bg-bannerOffer xl:py-48 bg-center bg-cover rounded-3xl px-10 py-16">
        <h1 className="text-white font-semibold flex xl:text-[80px] md:text-[40px] sm:text-[44px]">
          Summer Sale 50%
        </h1>
        <h3 className="text-white font-semibold text-[40px] md:text-[50px] sm:text-[20px]">
          Women's
          <span className="font-extrabold text-orange-400 ">Budget Beauty</span>
        </h3>
        <Link
          to={"/"}
          className="bg-white rounded-full flex justify-between sm:pl-6 pl-6 p-2 mt-2 items-center gap-x-2 mx-4 w-52 sm:text-[20px]"
        >
          Go to Shop
          <FaArrowRightLong className="flex justify-between mx-4 text-xl  bg-orange-400 duration-500 border-dashed border border-white h-10 w-12 rounded-full " />
        </Link>
      </div>
    </section>
  );
}

export default Offer;
