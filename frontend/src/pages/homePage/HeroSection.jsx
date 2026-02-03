import heroImage from "../../assets/Hero.png";
import {Button} from "@heroui/react";

const HeroSection = () => {
  return (
    <>
      <section className="container mt-15 h-full mb-15 mx-auto xl:mb-0">

        <div className="mx-auto w-full h-full md:h-[80vh] max-h-[720px] flex flex-col-reverse xl:flex-row items-center px-10 md:justify-around">
        
        <div className="md:w-1/2 hero-content">
          <div className="headline flex flex-col items-center xl:items-start xl:ml-20">
         
            <h1 className="text-center xl:text-left text-4xl sm:text-5xl md:text-6xl font-bold text-gray-500">The Ultimate Place</h1>
         
            <h1 className="text-center xl:text-left text-4xl sm:text-5xl md:text-6xl font-bold text-black mt-3 mb-10 md:mb-14">For Book Enthusiasts</h1>

            <p className="text-center xl:text-left text-gray-800 font-semibold text-sm sm:text-md md:w-2/3 font-size mb-4">
              Indulge Your Literary Desires with a Diverse Collection of Books
              Tailored to Satisfy Every Reading Palate.
            </p>
          <Button className="bg-black text-white font-semibold" radius="sm" color="default">Shop Now</Button>
          </div>


        </div>

        <div className="md:w-1/2">
          <img
            className="w-full h-full mb-10 md:mb-0"
            src={heroImage}
            alt="Hero Image"
          />
        </div>

        </div>
        
       

      </section>
    </>
  );
};

export default HeroSection;
