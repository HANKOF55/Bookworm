import api from "../../api/axios";

const handleAddToCart = async (bookId) => {


  try {
    const res = await api.post(
      "/cart/add",
      {
        bookId,
        quantity: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data?.success) {
      console.log("Added to cart", res.data.data);
    }
  } catch (err) {
    console.error(
      err.response?.data?.error?.message ||
      "Failed to add item to cart"
    );
  }

};

export default handleAddToCart;
