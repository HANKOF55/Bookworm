import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from "@heroui/react";
import { NavLink } from "react-router-dom";
import bookwormLogo from "../assets/images/BookwormLogo.png";
import Modal from "./modal";
import { User, ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

export default function AppNavbar() {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const navItems = ["home", "shop", "contact", "about"];

  return (
    <Navbar className="w-full bg-gray-100 shadow-xl flex justify-center">

      {/* Logo */}
      <NavbarBrand className="hover:cursor-pointer" justify="start">
        <img className="h-[36px]" src={bookwormLogo} alt="" />
        <p className="font-bold text-gray-700">
          Book<span className="text-orange-700">worm</span>
        </p>
      </NavbarBrand>

      {/* Center links */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
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

      {/* Right side */}
      <NavbarContent justify="end">

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
    </Navbar>
  );
}
