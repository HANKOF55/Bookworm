import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from "@heroui/react";
import { NavLink } from "react-router-dom";
import bookwormLogo from "../assets/images/BookwormLogo.png";
import Modal from "./modal";
import { User, ShoppingCart, Menu } from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function AppNavbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const navItems = ["home", "shop"];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Navbar className="w-full bg-gray-100 shadow-xl flex justify-center items-center px-4 py-2 relative">
      <div className="flex items-center w-full max-w-5xl mx-auto justify-between relative">
        {/* Logo */}
        <NavbarBrand className="hover:cursor-pointer flex items-center gap-2" justify="start">
          <img className="h-[36px]" src={bookwormLogo} alt="" />
          <p className="font-bold text-gray-700">
            Book<span className="text-orange-700">worm</span>
          </p>
        </NavbarBrand>

        {/* Center links for desktop */}
        <NavbarContent className="hidden sm:flex gap-8 flex-1 justify-center" justify="center">
          {navItems.map((item) => (
            <NavbarItem key={item}>
              <NavLink
                to={`/${item}`}
                className={({ isActive }) =>
                  `capitalize ${isActive
                    ? "text-orange-600"
                    : "text-md font-semibold"
                  }`
                }
              >
                {item}
              </NavLink>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* Right side desktop */}
        <NavbarContent className="hidden sm:flex" justify="end">
          {/* NOT logged in */}
          {!isAuthenticated && (
            <NavbarItem>
              <Modal modalName="Sign Up" />
            </NavbarItem>
          )}

          {/* Logged in */}
          {isAuthenticated && (
            <NavbarItem className="flex items-center gap-5">
              <NavLink
                to="/userDashboard"
                className="rounded-full p-2 bg-blue-100"
              >
                <User />
              </NavLink>

              <NavLink
                to="/shoppingCart"
                className="rounded-full p-2 bg-blue-100"
              >
                <ShoppingCart />
              </NavLink>
            </NavbarItem>
          )}
        </NavbarContent>

        {/* Hamburger for mobile */}
        <div className="sm:hidden flex items-center ml-auto">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none p-2"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-gray-100 shadow-md flex flex-col sm:hidden z-50 animate-fadeIn">
            <div className="flex flex-col gap-2 px-6 py-4">
              {navItems.map((item) => (
                <NavLink
                  key={item}
                  to={`/${item}`}
                  className={({ isActive }) =>
                    `capitalize py-1 ${isActive
                      ? "text-orange-600 font-bold"
                      : "font-semibold text-gray-700"
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </NavLink>
              ))}
              <hr className="my-3" />
              {!isAuthenticated && (
                <Modal modalName="Sign Up" />
              )}
              {isAuthenticated && (
                <div className="flex items-center gap-4 mt-2">
                  <NavLink
                    to="/userDashboard"
                    className="rounded-full p-2 bg-blue-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    <User />
                  </NavLink>
                  <NavLink
                    to="/shoppingCart"
                    className="rounded-full p-2 bg-blue-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    <ShoppingCart />
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Navbar>
  );
}
