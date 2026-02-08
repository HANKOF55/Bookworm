import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

const genreLabelFromKey = (key) => {

    const { bookId } = useParams();

  const mapping = {
    fiction: "Fiction",
    non_fiction: "Non-Fiction",
    fantasy: "Fantasy",
    science_fiction: "Science Fiction",
    mystery: "Mystery",
    thriller: "Thriller",
    romance: "Romance",
    horror: "Horror",
    biography: "Biography",
    history: "History",
    self_help: "Self Help",
    business: "Business",
    technology: "Technology",
    philosophy: "Philosophy",
    psychology: "Psychology",
    poetry: "Poetry",
    comics: "Comics & Graphic Novels",
  };
  return mapping[key] || key;
};

const languageLabelFromKey = (key) => {
  const mapping = {
    english: "English",
    hindi: "Hindi",
    tamil: "Tamil",
    telugu: "Telugu",
    kannada: "Kannada",
    malayalam: "Malayalam",
    marathi: "Marathi",
    bengali: "Bengali",
    punjabi: "Punjabi",
    urdu: "Urdu",
    gujarati: "Gujarati",
    odia: "Odia",
    assamese: "Assamese",
    sanskrit: "Sanskrit",
    french: "French",
    spanish: "Spanish",
    german: "German",
    italian: "Italian",
    portuguese: "Portuguese",
    japanese: "Japanese",
    chinese: "Chinese",
    korean: "Korean",
  };
  return mapping[key] || key;
};

const ViewBook = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const res = await api.get(`/books/${bookId}`);
        if (res.data?.success) {
          const bookData = res.data?.data || {};
          setBook(bookData);
          setCreatedAt(bookData.createdAt ? new Date(bookData.createdAt).toLocaleString() : "");
          setUpdatedAt(bookData.updatedAt ? new Date(bookData.updatedAt).toLocaleString() : "");
            console.log(res.data);
        }

      } catch (err) {
        setError(
          err?.response?.data?.error?.message || "Failed to fetch book details."
        );
      } finally {
        setIsLoading(false);
      }
    };
    if (bookId) fetchBook();
  }, [bookId]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-6">
      <div className="w-full max-w-md md:max-w-2xl bg-white rounded-xl shadow-sm p-5">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-black"
          >
            ←
          </button>
          <h2 className="text-lg font-semibold">Book Details</h2>
        </div>

        {error && (
          <div className="mb-4 text-red-600 bg-red-50 border border-red-300 px-4 py-2 rounded">
            {error}
          </div>
        )}

        {isLoading || !book ? (
          <div className="w-full flex justify-center items-center py-8">
            <span className="text-gray-400">Loading...</span>
          </div>
        ) : (
          <>
            {/* Cover Image */}
            <div className="flex flex-col items-center mb-6">
              <img
                src={book.coverImage || "https://via.placeholder.com/120x160"}
                alt="cover"
                className="w-28 h-40 object-cover rounded border mb-3"
              />
              {/* <p className="w-full h-[50px] overflow-auto px-3 py-2 border rounded-lg text-sm bg-gray-100 break-all text-gray-400">{book.coverImage || "No Image URL"}</p> */}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Title</label>
                <h3 className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-700 font-semibold">
                  {book.title}
                </h3>
              </div>
              <div>
                <label className="text-sm text-gray-600">Author</label>
                <p className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-500">
                  {book.author}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Price</label>
                <p className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-500">
                  {book.price !== undefined && book.price !== null ? book.price : "N/A"}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Pages</label>
                <p className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-500">
                  {book.pages !== undefined && book.pages !== null ? book.pages : "N/A"}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Published Year</label>
                <p className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-500">
                  {book.publishedYear !== undefined && book.publishedYear !== null ? book.publishedYear : "N/A"}
                </p>
              </div>
              {/* Genre */}
              <div>
                <label className="text-sm text-gray-600">Genre</label>
                <div className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-700 min-h-[2.5rem] flex flex-wrap gap-x-2 gap-y-1">
                  {Array.isArray(book.genre) && book.genre.length > 0
                    ? book.genre.map((g, idx) => (
                        <span key={g + idx} className="inline-block bg-blue-100 text-blue-800 rounded px-2 py-0.5 text-xs mr-1 mb-1">
                          {genreLabelFromKey(g)}
                          {idx !== book.genre.length - 1 && ","}
                        </span>
                      ))
                    : <span className="text-gray-400">No genres</span>}
                </div>
              </div>
              {/* Language */}
              <div>
                <label className="text-sm text-gray-600">Language</label>
                <p className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-700">
                  {languageLabelFromKey(book.language)}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-4">
              <label className="text-sm text-gray-600">Description</label>
              <div className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-500">
                {book.description ? (
                  <p style={{ whiteSpace: "pre-line" }}>{book.description}</p>
                ) : (
                  <span className="text-gray-400">No description</span>
                )}
              </div>
            </div>

            {/* Read-only dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-sm text-gray-600">Created At</label>
                <p className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-500">
                  {createdAt || "N/A"}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Updated At</label>
                <p className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-500">
                  {updatedAt || "N/A"}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewBook;
