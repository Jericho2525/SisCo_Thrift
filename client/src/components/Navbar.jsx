import PropTypes from "prop-types";
import NAV_LINKS from "../assets/NAV_LINKS";
import { NavLink } from "react-router-dom";

const Navbar = ({ containerStyles }) => {
  return (
    <nav className={`${containerStyles}`}>
      {NAV_LINKS.map((link) => (
        <NavLink
          key={link.title}
          to={link.path}
          className={({ isActive }) =>
            isActive ? "active-Link" : "px-3 py-2 rounded-full"
          }
        >
          <div className=" flex justify-center gap-x-1">{link.title}</div>
        </NavLink>
      ))}
    </nav>
  );
};

Navbar.propTypes = {
  containerStyles: PropTypes.string,
};

export default Navbar;
