// core modules
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
  
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },
  
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
  
      comment: {
        type: String,
        trim: true,
        maxlength: 1000,
      },
  
      isApproved: {
        type: Boolean,
        default: true, // set false if you want moderation later
      },
},{
    timestamps: true,
  })


const Review = new mongoose.model("Model", reviewSchema);
export default Review;