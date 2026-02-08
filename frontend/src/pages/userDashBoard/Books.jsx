import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { useState, useEffect, useCallback } from "react";
import { Alert } from "@heroui/alert";
import api from "../../api/axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [deleteLoading, setIsDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // Track which book is deleting
  const [isDeleted, setIsDeleted] = useState(false);
  const [errorDeleting, setErrorDeleting] = useState(null);
  const [successMessage, setSuccessMessage] = useState();

  const fetchBooks = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleDeleteBookById = async (bookId) => {
    setIsDeleteLoading(true);
    setDeleteId(bookId);
    setErrorDeleting(null);
    setIsDeleted(false);
    setSuccessMessage("");

    try {
      const res = await api.delete(`/books/${bookId}`);

      if (res.data?.success) {
        setSuccessMessage(res.data?.message || "Book deleted successfully.");
        setIsDeleted(true);
        // Immediate UI update: remove book from state without refetch
        setBooks((prevBooks) => prevBooks.filter(b => b._id !== bookId));
      }
    } catch (err) {
      setErrorDeleting(
        err.response?.data?.error?.message ||
        "Error deleting book. Please try again."
      );
    } finally {
      setIsDeleteLoading(false);
      setDeleteId(null);
    }
  };

  // Removed unused handleDeleteUserById and related code for focusing on Books

  return (
    <>
      {success && (
        <section className="mx-auto p-2 z-0">
          <Table className="shadow-md" removeWrapper aria-label="Books list table">
            <TableHeader className="overflow-hidden rounded-xl border border-gray-500">
              <TableColumn className="font-semibold border border-gray-500">
                COVER
              </TableColumn>
              <TableColumn className="font-semibold border border-gray-500">
                TITLE
              </TableColumn>
              <TableColumn className="font-semibold border border-gray-500">
                AUTHOR
              </TableColumn>
              <TableColumn className="font-semibold border border-gray-500">
                ACTION
              </TableColumn>
            </TableHeader>

            <TableBody>
              {books.map((book) => (
                <TableRow
                  className="border-1 border-gray-400 rounded-xl"
                  key={book._id}
                >
                  {/* Cover Image */}
                  <TableCell>
                    <img
                      src={book.coverImage || "https://via.placeholder.com/40x60"}
                      alt={book.title}
                      className="w-10 h-14 object-cover rounded"
                    />
                  </TableCell>

                  {/* Title */}
                  <TableCell>{book.title}</TableCell>

                  {/* Author */}
                  <TableCell>{book.author}</TableCell>

                  {/* Actions */}
                  <TableCell>
                    <Link
                      to={`/userDashBoard/books/${book._id}`}
                      className="mr-2 px-3 py-[0.3rem] bg-blue-500 text-white border-none rounded-[0.4rem] cursor-pointer hover:bg-blue-600 inline-block"
                      style={{ textDecoration: "none" }}
                    >
                      View
                    </Link>

                    <button
                      className="px-3 py-[0.3rem] bg-red-500 text-white border-none rounded-[0.4rem] cursor-pointer hover:bg-red-600"
                      onClick={() => handleDeleteBookById(book._id)}
                      disabled={deleteLoading && deleteId === book._id}
                    >
                      {deleteLoading && deleteId === book._id ? "Deleting..." : "Delete"}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}

      {error && (
        <section className="w-full h-full flex justify-center items-center">
          <Alert color="danger" title={error} />
        </section>
      )}

      {isDeleted && <Alert color="success" title={successMessage} />}

      {errorDeleting && <Alert color="danger" title={errorDeleting} />}
    </>
  );
};

export default Books;
