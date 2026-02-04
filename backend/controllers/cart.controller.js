// local modules
import Cart from "../models/cart.model.js";
import Book from "../models/book.model.js";
import mongoose from "mongoose";


export const getMyCart = async(req, res) => {
    try{

        const payload = req.payloadData; 
        const userId = payload.id;

        const cart = await Cart.findOne({ user: userId })
        
        const populatedCart = await Cart.populate(cart, {path: "items.book", select: "title author price coverImage"});

        if(!cart){
            return res.status(200).json({
                success: true,
                data: [], 
                totalAmount: 0,
                message: "Your Cart is empty."
            })
        }
        

        return res.status(200).json({
            success: true,
            data: cart
        })

    } catch(err){
        return res.status(500).json({
            success: false, 
            error: {
                message: "Internal server error.",
                code: "INTERNAL_SERVER_ERROR"
            }
        })
    }
}

export const postCartItem = async(req, res) => {
    try{
        const payload = req.payloadData;
        const userId = payload.id;
        const { bookId, quantity = 1 } = req.body;

        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({
              success: false,
              error: {
                message: "Invalid book ID",
                code: "INVALID_ID"
              }
            });
          }

          if (quantity < 1) {
            return res.status(400).json({
              success: false,
              error: {
                message: "Quantity must be at least 1",
                code: "INVALID_QUANTITY"
              }
            });
          }

          const book = await Book.findById(bookId);

        if (!book) {
        return res.status(404).json({
            success: false,
            error: {
                message: "Book not found",
                code: "BOOK_NOT_FOUND"
            }
        });
        }

        let cart = await Cart.findOne({ user: userId });


        if (!cart) {
            cart = await Cart.create({
              user: userId,
              items: [
                {
                  book: bookId,
                  quantity,
                  price: book.price
                }
              ],
              totalAmount: book.price * quantity
            });

            return res.status(201).json({
                success: true,
                data: cart
              });
            }

            // check if book already exist in the cart

            const existingBook = cart.items.find(
                item => item.book.toString() === bookId.toString()
            );

            if(existingBook){
                existingBook.quantity += quantity;
            } else {
                cart.items.push({
                    book: bookId,
                    quantity, 
                    price: book.price
                });
            }

            // recalculate total amount
            cart.totalAmount = cart.items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );

            await cart.save();

            return res.status(200).json({
                success: true, 
                data: cart
            })


    } catch(err){
        return res.status(500).json({
            success: false,
            error: {
                message: "Internal server error",
                code: "INTERNAL_SERVER_ERROR"
            }
        })
    }
}

// export const patchCartItem = async(req, res) => {
//     res.send("update your cart here .");
// }

export const removeCartItem = async(req, res) => {
    try{

        const { bookId } = req.body;
        const payload = req.payloadData;
        const userId = payload.id

        if(!mongoose.Types.ObjectId.isValid(bookId)){
            return res.status(400).json({
                success: false,
                error: {
                    message: "Invalid book Id", 
                    code: "INVALID_BOOK_ID"
                }
            })
        }

        const userCart = await Cart.findOne({user: userId});

        if(!userCart) {
            return res.status(404).json({
                success: false,
                error: {
                    message: "Cart not found.", 
                    code: "CART_NOT_FOUND"
                }
            })
        }

        const itemIndex = userCart.items.findIndex(
            item => item.book.toString() === bookId.toString()
        );

        if(itemIndex === -1) {
            return res.status(404).json({
                success: false, 
                error: {
                    message: "Item not found in cart.", 
                    code: "ITEM_NOT_FOUND"
                }
            })
        }

        userCart.items.splice(itemIndex, 1);

        userCart.totalAmount = userCart.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        )

        await userCart.save();

        return res.status(200).json({
            success: true, 
            data: userCart  
        })


    } catch(err) {
        return res.status(500).json({
            success: false, 
            error: {
                message: "Internal server error.",
                code: "INTERNAL_SERVER_ERROR"
            }
        })
    }
}

export const clearCart = async(req, res) => {
    try{

        const payload = req.payloadData;
        const userId = payload.id;

        const userCart = await Cart.findOne({user: userId});

        if(!userCart){
            return res.status(404).json({
                success: false, 
                error: {
                    message: "Cart not found.", 
                    code: "CART_NOT_FOUND"
                }
            })
        }

        userCart.items = [];
        userCart.totalAmount = 0;

        await userCart.save();

        return res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
            data: userCart
        })


    } catch(err) {
        return res.status(500).json({
            success: false, 
            error: {
                message: "Internal server error.", 
                code: "INTERNAL_SERVER_ERROR"
            }
        })
    }
}