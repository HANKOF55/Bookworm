import { Card, CardBody, CardFooter, Image, Button } from "@heroui/react";
import books from "./book.js"

const ProductSection = () => {


  return (
    <>
      <section className="container mx-auto max-w-[1080px] my-10 flex justify-center">

        <div >

          <div className="gap-2 flex flex-wrap md:justify-start justify-center">
            {books.map((item, index) => (
              /* eslint-disable no-console */
              <div className="p-2"
                key={index}>

                <Card
                  className="p-2 pb-4 max-w-[240px]"
                  shadow="lg"
                  onPress={() => console.log("item pressed")}
                >



                  <CardBody className="overflow-visible p-0">
                    <Image
                      alt={item.title}
                      className="w-full object-cover h-[280px] shadow-2xl"
                      radius="lg"
                      shadow="sm"
                      src={item.coverImage}
                      width="100%"
                    />
                  </CardBody>

                  <div className="flex flex-wrap justify-start items-center font-semibold text-sm gap-2 mt-4">
                    {
                      item.genre.map((gen, index) => (
                        <div key={index} className="bg-slate-700 text-white rounded-full px-4">
                          {gen}
                        </div>
                      ))
                    }
                  </div>

                  <CardFooter className="text-small justify-between items-start flex flex-col">
                    <b className="text-md text-gray-900">{item.title}</b>
                    <p className="text-md text-gray-800 font-semibold m-1">{item.author}</p>
                    <p className="text-md text-gray-600 font-semibold text-left mt-2">{item.description}</p>
                  </CardFooter>

                  <div className="w-full mt-3 px-3 flex items-center justify-between ">
                    <p className="bg-slate-800 text-white font-semibold rounded-md px-3 ">${item.price}</p>
                    <Button className="font-semibold h-8 px-4 shadow-2xs" color="primary" radius="full" variant="solid">Add to Cart</Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>

        </div>

      </section>
    </>
  );
};

export default ProductSection;
