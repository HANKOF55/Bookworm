// core modules
import express from "express";

// local modules
import { postReview, getAllReviews, getReviewById, deleteReview } from "../controllers/review.controller.js" 
import { jwtAuthMiddleware } from "../utils/jwt.utils.js";

// router instance
const reviewRouter = express.Router();

// routes
reviewRouter.post("/books/:id/reivews", jwtAuthMiddleware,  postReview);
reviewRouter.get("/books/:id/reviews", getAllReviews);
reviewRouter.get("/books/:id", getReviewById);
// reviewRouter.patch("/books/:reviewId", patchReview);
reviewRouter.delete("/books/:Id", jwtAuthMiddleware, deleteReview);


export default reviewRouter;