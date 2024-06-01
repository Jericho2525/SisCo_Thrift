import { Link, NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import logo from "../assets/cl.jpg";
import { useContext, useState } from "react";
import logout from "../assets/logout.svg";
import login from '../assets/user.svg'
import user from "../assets/user.svg";
import { MdMenu, MdClose } from "react-icons/md";
import { FaOpencart } from "react-icons/fa";
import { ShopContext } from "../context/ShopContext";


function Header() {
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => setMenuOpened(!menuOpened);
  const {availableMoney  ,loading , error} = useContext(ShopContext)
  


 
  return (
    <header className="mx-auto max-w-[1440px] px-6 lg:px-14 3xl:px-0 w-full z-50 justify-items-stretch ">
      <div className="flex justify-between py-3 items-center">
      <div className="sm:hidden md:hidden xl:flex flex-1 z-1000">
      <Navbar containerStyles={"flex gap-x-6 gap-x-10 medium-15"} />
    </div>
        {/* Navbar mobile */}
        <div className="xl:hidden">
        {menuOpened ? (
          <Navbar
            containerStyles={
              "flex items-start flex-col gap-y-8 fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 z-50"
            }
          />
        ) : null}
      </div>

        {/* Logo */}
        <div className="flex flex-1 ">
          <div className="hover:bg-orange-400 rounded-lg flex h-24 w-24 px-2 absolute top-0 xl:left-[640px] items-center p-8 transition-all duration-300">
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                className="h-[90px] w-[140px] rounded-lg "
              />
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center sm:gap-x-2 bold-16">
          {!menuOpened ? (
            <MdMenu
              className="xl:hidden cursor-pointer ring-1 hover:text-orange-400 mr-2 p-2 h-10 w-10 rounded-full"
              onClick={toggleMenu}
            />
          ) : (
            <MdClose
              className="xl:hidden cursor-pointer ring-1 hover:text-orange-400 mr-2 p-2 h-10 w-10 rounded-full"
              onClick={toggleMenu}
            />
          )}

          <div className="flex justify-between sm:gap-x-6 items-center mx-4">
           
            <h1>${availableMoney}</h1>
            
            <NavLink to="/checkout" className="bg-orange-500 rounded-full p-2 flex items-center"><img src={logout} alt="logoutIcon" className="mr-2 h-6 w-6 font-semibold text-white"/>Checkout</NavLink>
           
            
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
