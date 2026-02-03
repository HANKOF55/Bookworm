import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";
import { NavLink } from "react-router-dom";
import bookwormLogo from "../assets/BookwormLogo.png";

export default function App() {
  const navItems = ["home", "shop", "contact", "about"];

  return (
    <Navbar className="w-full bg-gray-100 shadow-xl flex justify-center">
      <NavbarBrand className="hover:cursor-pointer" justify="start">
        <img className="h-[36px]" src={bookwormLogo} alt="" />
        <p className="font-bold text-gray-700">Book<span className="text-orange-700">
            worm
            </span>
            </p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navItems.map((item, index) => (
          <NavbarItem key={index}>
            <NavLink
              className={({ isActive }) =>
                `capitalize ${
                  isActive ? "text-orange-600" : "text-md font-semibold"
                }`
              }
              color="foreground"
              to={`/${item}`}
            >
              {item}
            </NavLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
