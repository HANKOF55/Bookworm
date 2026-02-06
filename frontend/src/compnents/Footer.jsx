import bookwormLogo from "../assets/images/BookwormLogo.png";
import { Instagram, Twitter, Linkedin, Github} from "lucide-react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-blue-200 w-full p-15 px-25">
        <div className="container mx-auto flex flex-col md:flex-row justify-between gap-15 xl:items-center">

          <div className="flex flex-col items-start gap-10 max-w-[300px] md:max-w-2/5">
            <div className="logo rounded-2xl h-full flex items-center">
                <img className="w-[100px] md:w-[150px]" src={bookwormLogo} alt="Logo" />
                <h1 className="text-3xl md:text-4xl font-semibold text-gray-700">Book
                </h1>
                <p className="text-orange-600 text-3xl md:text-4xl font-semibold">worm</p>
            </div>

            <p className="our-mission text-md font-semibold w-full">
            At Bookworm, our mission is to make discovering and buying books simple, joyful, and accessible for every reader—one great story at a time.
            </p>

            <div className="social flex gap-3 items-center">
                <div className="bg-gray-900 inline-block text-white p-2 rounded-full hover:cursor-pointer hover:bg-gray-800">
                    <Instagram />
                </div>
                <div className="bg-gray-900 inline-block text-white p-2 rounded-full hover:cursor-pointer hover:bg-gray-800">
                    <Linkedin/>
                </div>
                <div className="bg-gray-900 inline-block text-white p-2 rounded-full hover:cursor-pointer hover:bg-gray-800">
                    <Twitter />
                </div>
                <div className="bg-gray-900 inline-block text-white p-2 rounded-full hover:cursor-pointer hover:bg-gray-800">
                    <Github />
                </div>
            </div>

          </div>

          <div>
            <h2 className="font-semibold text-xl underline">Extra Links</h2>
            <ul className="flex flex-col gap-1 mt-4">
                <li>
                    <NavLink className="text-xl hover:text-gray-600" to="/home">Home</NavLink>
                </li>
                <li>
                    <NavLink className="text-xl hover:text-gray-600" to="/shop">Shop</NavLink>
                </li>
                <li>
                    <NavLink className="text-xl hover:text-gray-600" to="/about">about</NavLink>
                </li>
                <li>
                    <NavLink className="text-xl hover:text-gray-600" to="/contact">contact</NavLink>
                </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-xl underline">Contact</h2>
            <div className="mt-4">
            <p>835222 Bazpur Road, Hajichowk
            </p>
            <p >Ranchi, Jharkhand</p>
            <p className="mt-2">harishkr0055@gmail.com</p>
            <p className="mt-2">91+ 5555555555</p>
                
            </div>
            
          </div>
        
        </div>
      </footer>
    </>
  );
};

export default Footer;
