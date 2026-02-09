import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { handleAddToCart } from "../shoppingCartPage/handleAddToCart";
import api from '../../api/axios';

const BookDetails = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get(`/books/${bookId}`);

        if (res.data?.success && res.data?.data) {
          setBook(res.data.data);
        } else if (res.data?.error?.message) {
          setError(res.data.error.message || 'Failed to fetch book details');
        } else {
          setError('Book not found');
        }
      } catch (err) {
        if (err.response?.data?.error?.message) {
          setError(err.response.data.error.message);
        } else if (err.request) {
          setError("No response from server. Please check your connection.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleAddToCart = () => {
    // Implement add to cart logic or dispatch to redux store
    // For demonstration:
    console.log('Adding to cart:', book);
  };

  const handleBuyNow = () => {
    // Implement buy now logic
    // For demonstration:
    console.log('Buying now:', book);
    // You might want to navigate to a checkout page
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Error: {error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Book not found</p>
      </div>
    );
  }

  // Normalize fields from book data with fallback
  const {
    coverImage,
    image, // sometimes backend might return 'image' or 'coverImage'
    title = "Untitled",
    author = "Unknown Author",
    description,
    genre,
    language,
    pages,
    publishedYear,
    isbn,
    price,
  } = book;

  // For genre, support both array and string gracefully
  const renderGenre = () => {
    if (Array.isArray(genre)) {
      if (genre.length === 0) return <span className="italic text-gray-400">No Genre</span>;
      return genre.map((g, i) => (
        <span
          key={i}
          className="inline-block mr-2 mb-1 bg-slate-700 text-white text-xs px-2 py-0.5 rounded-full"
        >
          {g}
        </span>
      ));
    }
    if (typeof genre === "string" && genre.trim()) {
      return <span className="bg-slate-700 text-white text-xs px-2 py-0.5 rounded-full">{genre}</span>;
    }
    return <span className="italic text-gray-400">No Genre</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="font-medium">Back</span>
          </button>
        </div>
      </div>

      {/* Book Details Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8 lg:p-12">
            {/* Left Side - Book Cover */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-full max-w-md">
                <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden shadow-xl">
                  {(coverImage || image) ? (
                    <img
                      src={coverImage || image}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                      <span className="text-gray-600 text-lg">No Image</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side - Book Details */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Title */}
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                  {title}
                </h1>

                {/* Author */}
                <p className="text-xl text-gray-600 mb-6">
                  by <span className="font-semibold">{author}</span>
                </p>

                {/* Description */}
                <div className="mb-6">
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Description
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {description && description.trim()
                      ? description
                      : <span className="italic text-gray-400">No description available.</span>
                    }
                  </p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Genre
                    </p>
                    <div className="text-gray-900">{renderGenre()}</div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Language
                    </p>
                    <p className="text-gray-900">{language || <span className="italic text-gray-400">N/A</span>}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Pages
                    </p>
                    <p className="text-gray-900">{pages || <span className="italic text-gray-400">N/A</span>}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Published Year
                    </p>
                    <p className="text-gray-900">{publishedYear || <span className="italic text-gray-400">N/A</span>}</p>
                  </div>

                  {isbn && (
                    <div className="col-span-2">
                      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        ISBN
                      </p>
                      <p className="text-gray-900">{isbn}</p>
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="mb-8">
                  <p className="text-3xl font-bold text-gray-900">
                    {typeof price === "number" ? `₹${price.toFixed(2)}` : <span className="italic text-gray-400">Not for sale</span>}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-8 py-3 bg-white border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={typeof price !== "number"}
                  title={typeof price === "number" ? "Add to Cart" : "Unavailable"}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleAddToCart(bookId)}
                  className="flex-1 px-8 py-3 bg-gray-900 hover:cursor-pointer active:bg-gray-700 active:text-white text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                  disabled={typeof price !== "number"}
                  title={typeof price === "number" ? "Buy Now" : "Unavailable"}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
