// core modules
import express from "express";

// local modules
import { postReview, getAllReviews, getReviewById, patchReview, deleteReview } from "../controllers/review.controller.js" 

// router instance
const reviewRouter = express.Router();


// routes
reviewRouter.post("/books/:bookId/reivews", postReview);
reviewRouter.get("/books/:bookId/reviews", getAllReviews);
reviewRouter.get("/books/:reviewId", getReviewById);
reviewRouter.patch("/books/:reviewId", patchReview);
reviewRouter.delete("/books/:reviewId", deleteReview);


export default reviewRouter;