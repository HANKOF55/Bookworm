import Book from "../models/book.model.js";
import Review from "../models/review.model.js";

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

export const getReviewById = async(req, res) => {
    res.send("get all reviews.");
}

export const patchReview = async(req, res) => {
    res.send("Update review.");
}

export const getAllReviews = async(req, res) => {
    res.send("Get all reviews.");
}


// Admin Controller
export const deleteReview = async(rewq, res) => {
    res.send("delete review.");
}