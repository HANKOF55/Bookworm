import { useState, useEffect } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import { Book } from "lucide-react";

const DELIVERY_FEE = 50;

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCartItems();
    // eslint-disable-next-line
  }, []);

  const fetchCartItems = async () => {
    setError(null);
    setLoading(true);
    try {
      // Using api instance from axios.js for all API calls
      const response = await api.get("/cart");
      // Backend returns: { success: true, data: { items: [...], totalAmount: ... } }
      const result = response.data;

      if (result.success && result.data) {
        const items = result.data.items || [];
        console.log(items);
        const mappedItems = items.map((item) => ({
          id: item.book._id,
          bookId: item.book._id,
          title: item.book.title,
          author: item.book.author,
          price: item.price,
          quantity: item.quantity,
          image: item.book.coverImage,
        }));
        setCartItems(mappedItems);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      setError(
        (err.response?.data?.message || err.message) || "Failed to load cart."
      );
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (bookId, newQuantity) => {
    if (newQuantity < 1) {
      deleteItem(bookId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.bookId === bookId ? { ...item, quantity: newQuantity } : item
      )
    );

    try {
      // Remove old item
      await api.delete("/cart/remove", {
        data: { bookId },
      });

      // Add it back with new quantity
      await api.post("/cart/add", { bookId, quantity: newQuantity });

      fetchCartItems();
    } catch (err) {
      setError("Update failed, refreshing cart.");
      fetchCartItems();
    }
  };

  const deleteItem = async (bookId) => {
    setCartItems((prev) => prev.filter((item) => item.bookId !== bookId));

    try {
      const response = await api.delete("/cart/remove", {
        data: { bookId },
      });

      const result = response.data;
      if (!result.success) {
        throw new Error("Failed to delete item");
      }
    } catch (err) {
      setError("Delete failed, refreshing cart.");
      fetchCartItems();
    }
  };

  const clearCart = async () => {
    if (!window.confirm("Are you sure you want to clear your cart?")) {
      return;
    }

    setCartItems([]);

    try {
      const response = await api.delete("/cart/");
      const result = response.data;
      if (!result.success) {
        throw new Error("Failed to clear cart.");
      }
    } catch (err) {
      setError("Clear cart failed, refreshing cart.");
      fetchCartItems();
    }
  };

  const handleCheckout = async () => {
    try {
      if (cartItems.length === 0) {
        setError("Your cart is empty.");
        return;
      }

      // Compose products array for payment
      const products = cartItems.map((item) => ({
        name: item.title,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      }));

      const res = await api.post("/payment", {
        products, // send all products in the cart
        deliveryFee: DELIVERY_FEE,
        subtotal,
        total,
      });

      if (res.data?.success && res.data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = res.data.url;
      } else {
        throw new Error("Invalid checkout response");
      }

    } catch (err) {
      setError(
        "Checkout failed: " +
        (err.response?.data?.error?.message || err.message)
      );
    }
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );
  const total = subtotal + DELIVERY_FEE;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your cart...</p>
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
            onClick={fetchCartItems}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
            <Link
              to="/shop"
              className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Table - 2/3 width */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Book Details
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Quantity
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Total
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {cartItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          {/* Book Details */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-20 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-gray-300">
                                    <span className="text-gray-500 text-xs">
                                      No Image
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900 mb-1">
                                  {item.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {item.author || "Unknown Author"}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Quantity */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item.bookId, item.quantity - 1)
                                }
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={item.quantity <= 1}
                              >
                                <span className="text-gray-600">−</span>
                              </button>
                              <span className="w-12 text-center font-medium text-gray-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.bookId, item.quantity + 1)
                                }
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                              >
                                <span className="text-gray-600">+</span>
                              </button>
                            </div>
                          </td>

                          {/* Total */}
                          <td className="px-6 py-4">
                            <span className="font-semibold text-gray-900">
                              ₹
                              {(
                                (Number(item.price) || 0) *
                                (item.quantity || 1)
                              ).toFixed(2)}
                            </span>
                          </td>

                          {/* Action */}
                          <td className="px-6 py-4">
                            <button
                              onClick={() => deleteItem(item.bookId)}
                              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Clear Cart Button */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <button
                    onClick={clearCart}
                    className="px-6 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary - 1/3 width */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 text-left">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Sub Total</span>
                    <span className="font-semibold text-gray-900">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-semibold text-gray-900">
                      ₹{DELIVERY_FEE.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-4"></div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    ₹{total.toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full px-6 py-3 hover:cursor-pointer bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                  disabled={cartItems.length === 0}
                  title={cartItems.length === 0 ? "Cart is empty" : ""}
                >
                  Checkout Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;