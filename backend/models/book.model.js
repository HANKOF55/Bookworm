// core modules
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: String,          
    author: String,         
    description: String,    
    coverImage: String,
    genre: [String],        
    language: String,       
    pages: Number,          
    publishedYear: Number
},{timestamps: true})


const Book = mongoose.model("Book", bookSchema);
export default Book;