import mongoose from "mongoose";
import Book from "../models/book.model.js";
import Review from "../models/review.model.js";
import User from "../models/user.model.js";

export const postReview = async (req, res) => {
    try{

        const payload = req.payloadData;
        const userId = payload.id;
        const bookId = req.params.id;
        const { rating, comment } = req.body;

        if(!mongoose.Types.ObjectId.isValid(bookId)){
            return res.status(401).json({
                success: false,
                error:{
                    message: "Invalid book id.",
                    code: "INVALID_ID"
                }
            })
        }

        if(!rating || rating < 1 || rating > 5){
            return res.status(400).json({
                success: false, 
                error: {
                    message: "Rating must be between 1 and 5.",
                    code: "INVALID_RATING"
                }
            });
        }

        const targetBook = await Book.findById(bookId);

        if(!targetBook) {
            return res.status(404).json({
                success: false,
                error: {
                    message: "Book not found.", 
                    code: "BOOK_NOT_FOUND"
                }
            });
        }

        const existingReview =  await Review.findOne({
            user: userId,
            book: bookId
        });

        if (existingReview){
            return res.status(409).json({
                success: false, 
                error: {
                    message: "You have already reviewed this book.",
                    code: "REWVIEW_ALREADY_EXIST"
                }
            });
        }

        const review = await Review.create({
            user: userId,
            book: bookId,
            rating, 
            comment, 
        });

        return res.status(201).json({
            success: true, 
            review: review
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

// export const patchReview = async(req, res) => {
//     res.send("Update review.");
// }


export const getReviewById = async(req, res) => {
    try{

        const reviewId = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(reviewId)){
            return res.status(400).json({
                success: false, 
                error: {
                    message: "Invalid review Id", 
                    code: "INVALID_ID"
                }
            })
        }

        const review = await Review.findById(reviewId);
        
        if(!review){
            return res.status(404).json({
                success: false, 
                error: {
                    message: "Review not found.", 
                    code: "REVIEW_NOT_FOUND"
                }
            })
        }

        return res.status(200).json({
            success: true, 
            data: review
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


export const getAllReviews = async(req, res) => {
    try{

        const allReviews = await Review.find();

        if(allReviews.length === 0) {
            return res.status(404).json({
                "success": true,
                "data": [],
                "message": "No reviews for this book yet"
              })
        }

        return res.status(200).json({
            success: true, 
            data: allReviews
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

// Admin Controller
export const deleteReview = async(req, res) => {
    try{

        const targetReview = req.params.id;
        const payload = req.payloadData;
        const userId = payload.id;

        if(!mongoose.Types.ObjectId.isValid(targetReview)){
            return res.status(400).json({
                success: false,
                error: {
                    message: "Invalid id.", 
                    code: "INVALID_ID"
                }
            })
        }

        const deletedReview = await Review.findByIdAndDelete(targetReview);

        if (!deletedReview) {
        return res.status(404).json({
            success: false,
            error: {
            message: "Review not found",
            code: "REVIEW_NOT_FOUND"
            }
        });
        }

        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({
                success: false,
                error: {
                    message: "User no longer exist.",
                    code: "USER_NOT_FOUND"
                }
            })
        }

        if(user.role !== "admin"){
            return res.status(403).json({
                success: false,
                error: {
                    message: "You are not authorized to perform this action.",
                    code: "NOT_AUTHORIZED"
                }
            })
        }

        await Review.findByIdAndDelete(targetReview);

        return res.status(200).json({
            success: true,
            message: "Review deleted successfully."
        });

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