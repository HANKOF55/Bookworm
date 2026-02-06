// core modules
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title:{ 
        type: String, 
        required: true,
        trim: true
    },
    author: {
        type: String,
        trim: true
    },         
    description: {
        type: String,
 
    },    
    coverImagePublicId: {   
        type: String,
        required: true
      },
    coverImage: {
        type: String,
        required: true
    },
    genre: [String],        
    language: {
        type: String,
        required: true
    },   
    price: {
        type: Number,
        required: true,
        min: 0
    },
    pages: {
        type: Number
    },       
    publishedYear: {
        type: Number
    }
},{timestamps: true})


const Book = mongoose.model("Book", bookSchema);
export default Book;