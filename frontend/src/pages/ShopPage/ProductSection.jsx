import { Card, CardBody, CardFooter, Image, Button } from "@heroui/react";
import { useState, useEffect } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
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
          console.log(res.data?.data);
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

<div className="flex flex-wrap gap-6 justify-center xl:justify-start">
  {books.length === 0 ? (
    <div className="text-gray-600 text-xl font-semibold py-10 flex justify-center w-full">
      {isLoading ? "Loading books..." : "No books found."}
    </div>
  ) : (
    books.map((book) => (
      <div
        key={book._id}
        className="max-w-xs w-full flex flex-col rounded-xl shadow-lg bg-white"
      >
        <div className="flex flex-col items-center p-4">
          <img
            alt={book.title}
            src={book.coverImage || "https://via.placeholder.com/140x200?text=No+Image"}
            className="w-[140px] h-[200px] object-cover rounded-lg shadow-md mb-3"
          />

          <div className="flex flex-wrap gap-1 justify-center mb-2 mt-4 font-semibold text-sm">
            {Array.isArray(book.genre) && book.genre.length > 0 ? (
              book.genre.map((gen, index) => (
                <span
                  key={index}
                  className="bg-slate-700 text-white text-xs px-2 py-0.5 rounded-full"
                >
                  {gen}
                </span>
              ))
            ) : (
              <span className="bg-slate-300 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                No Genre
              </span>
            )}
          </div>

        </div>
        <div className="px-4 pb-4 pt-0 flex flex-col gap-1 flex-auto">
          <b className="text-base text-gray-900 mb-1 line-clamp-1" title={book.title}>{book.title || "Untitled"}</b>
          <div className="flex items-center justify-between w-full mb-1">
            <span className="text-sm text-gray-700 font-semibold">
              {book.author || "Unknown Author"}
            </span>
            <span className="text-sm font-bold bg-slate-800 text-white px-3 py-1 rounded-md ml-2">
            ₹{typeof book.price === "number" ? book.price.toFixed(2) : "N/A"}
            </span>
          </div>
          <p className="text-xs text-gray-600 line-clamp-3 mb-2">
            {book.description && book.description.trim()
              ? book.description
              : <span className="italic text-gray-400">No description available.</span>
            }
          </p>

          <div className="flex items-center  mx-auto justify-end gap-10 mt-auto">
            <Link
              to={`/shop/${book._id}`}
              className="font-semibold h-8 px-4 py-1 bg-primary-600 text-white rounded-full hover:bg-primary-700 hover:cursor-pointer transition-colors"
              title="Shop"
              type="button"
            >
              Shop
            </Link>
            <button
              className="font-semibold h-8 px-4 bg-green-500 text-white rounded-full hover:bg-green-700 hover:cursor-pointer transition-colors"
              title="Add to cart"
              type="button"
            >
              Add to Cart
            </button>
          </div>
        
        </div>
      </div>
    ))
  )}
</div>

        </div>

      </section>
    </>
  );
};

export default ProductSection;
