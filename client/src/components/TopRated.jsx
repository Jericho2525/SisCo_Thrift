import React from "react";
import { Link } from "react-router-dom";
import ctgBanner from "../assets/ctg-banner.jpg";
import men from "../assets/men.png";
import women from "../assets/women.png";
import kid from "../assets/kid.png";

function TopRated() {
  return (
    <section className="max-w-screen mx-auto px-8 py-6">
      <div className="grid grid-cols-1 gap-10 xs:grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
        {/* First grid item */}

        <div className="ring-1 ring-slate-900/5 rounded-lg overflow-hidden shadow-sm">
          <img src={ctgBanner} alt="Category Banner" className="xl:h-[490px] xl:w-[590px] md:h-[500px] items-center justify-center" />
        </div>
        <div className="">
          <div className="bg-blue-400 rounded-[100px]">
            <img src={men} alt="Men Collection" />
          </div>

          <div className="bg-gray-200 rounded-lg p-4 mt-4">
            <h4 className="text-lg font-semibold">Top Rated Men Collection</h4>
            <p className="text-gray-500 mt-2">
              LoremLabore nulla magna sit elit quis Aliquip qui adipisicing
              ullamco culpa officia eu.
            </p>

            <Link
              to={"/mens"}
              className="text-orange-400 font-semibold text-[18px] mt-4 block"
            >
              View More
            </Link>
          </div>
        </div>

        {/* Second grid item */}
        <div className="">
          <div className="bg-green-400 rounded-[100px] ">
            <img src={kid} alt="Kid Collection" />
          </div>

          <div className="bg-gray-200 rounded-lg p-4 mt-4">
            <h4 className="text-lg font-semibold">Top Rated Kid Collection</h4>
            <p className="text-gray-500 mt-2">
              LoremLabore nulla magna sit elit quis Aliquip qui adipisicing
              ullamco culpa officia eu.
            </p>

            <Link
              to={"/kids"}
              className="text-orange-400 font-semibold text-[18px] mt-4 block"
            >
              View More
            </Link>
          </div>
        </div>

        {/* Third grid item */}
        <div className="">
          <div className="bg-red-500 rounded-[100px]">
            <img src={women} alt="Women Collection" />
          </div>

          <div className="bg-gray-200 rounded-lg p-4 mt-4">
            <h4 className="text-lg font-semibold">
              Top Rated Women Collection
            </h4>
            <p className="text-gray-500 mt-2">
              LoremLabore nulla magna sit elit quis Aliquip qui adipisicing
              ullamco culpa officia eu.
            </p>

            <Link
              to={"/women"}
              className="text-orange-400 font-semibold text-[18px] mt-4 block"
            >
              View More
            </Link>
          </div>
        </div>

        {/* Repeat the structure for other grid items */}
      </div>
    </section>
  );
}

export default TopRated;
