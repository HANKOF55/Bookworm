// core modules
import express from "express";

// local modules
import { postReview, getAllReviews, getReviewById, patchReview, deleteReview } from "../controllers/review.controller.js" 
import { jwtAuthMiddleware } from "../utils/jwt.utils.js";

// router instance
const reviewRouter = express.Router();

// routes
reviewRouter.post("/books/:bookId/reivews", jwtAuthMiddleware,  postReview);
reviewRouter.get("/books/:bookId/reviews", getAllReviews);
reviewRouter.get("/books/:Id", getReviewById);
reviewRouter.patch("/books/:reviewId", patchReview);
reviewRouter.delete("/books/:Id", jwtAuthMiddleware, deleteReview);


export default reviewRouter;