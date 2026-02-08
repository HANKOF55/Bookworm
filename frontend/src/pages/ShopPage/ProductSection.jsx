import { Card, CardBody, CardFooter, Image, Button } from "@heroui/react";
import { useState, useEffect } from "react";
import api from "../../api/axios";
// import books from "./book.js"


const ProductSection = () => {

  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [deleteLoading, setIsDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // Track which book is deleting
  const [isDeleted, setIsDeleted] = useState(false);
  const [errorDeleting, setErrorDeleting] = useState(null);
  const [successMessage, setSuccessMessage] = useState();


  useEffect(() => {

    const fetchBooks = async () => {
      try {
        setSuccess(false);
        setError(null);
        setIsLoading(true);
  
        const res = await api.get("/books");
  
        if (res.data?.success) {
          setSuccess(res.data?.success);
          setBooks(res.data?.data);
        }
      } catch (err) {
        if (err.response?.status === 404) {
          setError(err.response.data?.error?.message);
        } else if (err.response?.status === 403) {
          setError(err.response.data?.error?.message);
        } else if (err.request) {
          setError("No response from server. Please check your connection.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  
    fetchBooks();

  }, []);



  return (
    <>
      <section className="container mx-auto max-w-[1080px] my-10 flex justify-center">

        <div >

          <div className="gap-2 flex flex-wrap md:justify-start justify-center">
            {books.map((book, index) => (
              
              <div className="p-2"
                key={book._id}>

                <Card
                  className="p-2 pb-4 max-w-[240px]"
                  shadow="lg"
                  onPress={() => console.log("item pressed")}
                >



                  <CardBody className="overflow-visible p-0">
                    <Image
                      alt={book.title}
                      className="w-full object-cover h-[280px] shadow-2xl"
                      radius="lg"
                      shadow="sm"
                      src={book.coverImage}
                      width="100%"
                    />
                  </CardBody>

                  <div className="flex flex-wrap justify-start items-center font-semibold text-sm gap-2 mt-4">
                    {
                      book.genre.map((gen, index) => (
                        <div key={index} className="bg-slate-700 text-white rounded-full px-4">
                          {gen}
                        </div>
                      ))
                    }
                  </div>

                  <CardFooter className="text-small justify-between items-start flex flex-col">
                    <b className="text-md text-gray-900">{book.title}</b>
                    <p className="text-md text-gray-800 font-semibold m-1">{book.author}</p>
                    <p className="text-md text-gray-600 font-semibold text-left mt-2">{book.description}</p>
                  </CardFooter>

                  <div className="w-full mt-3 px-3 flex items-center justify-between ">
                    <p className="bg-slate-800 text-white font-semibold rounded-md px-3 ">${book.price}</p>
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
