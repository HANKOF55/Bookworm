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
    coverImage: {
        type: String,
    },
    genre: [String],        
    language: {
        type: String,
        required: true
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