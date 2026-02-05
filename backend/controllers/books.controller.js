// core modules
import mongoose from "mongoose";
import Book from "../models/book.model.js"

// local modules
import { deleteFile } from "../services/fileUpload.service.js";
import cloudinary from "../config/cloudinary.config.js";

// Admin Controllers
export const postBook = async(req, res) => {
    try{
        const {title, author, description, genre, language, pages, publishedYear} = req.body;

        if(!title || !author || !description || !language || !pages || !publishedYear){
            return res.status(400).json({success: false, message: "Required Fields are missing."});
        }

        if(!req.file){
            return res.status(400).json({
                success: false,
                errror: {
                    message: "Book thumbnail is required.",
                    code: "BAD_REQUEST"
                }
            })
        }

        // Extract cloudinary data
        const coverImage = req.file.path;        // URL
        const coverImagePublicId = req.file.filename; // public_id

        const existingBook = await Book.findOne({
            title,
            author,
            language,
            publishedYear
          });

        if(existingBook){
            return res.status(409).json({message: "Book Already Exist."});
        }

        const newBook = await Book.create({title, author, description, coverImage : coverImage , language, pages, publishedYear, genre, coverImagePublicId});

        return res.status(201).json({
            success: true,
            data: newBook,
        })
        
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    }
}

export const updateBook = async (req, res) => {
    try{
        const { id } = req.params;

        // Validate ID
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success: false, 
                message: "Invalid Id"
            })
        }

        // prevent empty updates
        if(Object.keys(req.body).length === 0 && !req.file ){
            return res.status(400).json({
                success: false,
                message: "No fields provided for update."
            })
        }

        // check if book already exist
        const existingBook = await Book.findById(id);

        if(!existingBook){
            return res.status(404).json({
                success:false,
                message: "Resource Not Found."
            })
        }

        // allowed fileds for updation
        const allowedUpdate = [
            "title",
            "author", 
            "description",
            "genre",
            "language", 
            "pages", 
            "publishedYear"
        ]

        // update all fields
        const updates = {};
        for (const key of allowedUpdate){
            if(req.body[key] !== undefined){
                updates[key] = req.body[key];
            }
        }

        if (req.file) {
            // delete old image ONLY if new one uploaded
            if (existingBook.coverImagePublicId) {
              await deleteFile(existingBook.coverImagePublicId);
            }

            updates.coverImage = req.file.path;
            updates.coverImagePublicId = req.file.filename;
        }

        // Update Books
        const updatedBook = await Book.findByIdAndUpdate(
            id, 
            updates, 
            { new: true }
        );

        return res.status(200).json({
            success: true, 
            data: updatedBook
        })

    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    }

}

export const deleteBook = async (req, res) => {
    try{

        const { id }  = req.params;

        // validate id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success: false,
                message: "Invalid Id"
            })
        }

        // check if book exists
        const existingBook = await Book.findById(id);
        if (!existingBook) {
            return res.status(404).json({
                success: false,
                message: "Resource does not exist."
            });
        }

        // delete book image on cloudinary
        const targetBook = await Book.findById(id);

        if(targetBook.coverImagePublicId) {
            await deleteFile(targetBook.coverImagePublicId);
        }

        // delete Book
        await Book.findByIdAndDelete(id);

        // 204 No Content should not have a message, so we just end response here.
        return res.status(204).end();


    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    }
}

// User Controllers

export const getBooks = async(req, res) => {
    
    try{
        const page = Number(req.query.page) || 1;
        // how many pages to return: GET /api/books?page=1&limit=10
        const limit = Number(req.query.limit) || 10;
        // if skip = 10 means skip frist 10 pages
        const skip = (page - 1) * limit;
    
        const books = await Book.find()
          .skip(skip)
          .limit(limit);

        
        if(books.length === 0){
            return res.status({
                success: true,
                message: "No books are registered yet.",
                data: []
            })
        }
    
        return res.status(200).json({
          success: true,
          count: books.length,
          page,  //returning page to let frontend know the current page
          data: books,
        });

    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."});
    }
}       

export const getBookById = async(req, res) => {
    try{
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success: false, 
                message: "Invalid ID"
            })
        }

        const book = await Book.findById(id);

        if(!book) {
            return res.status(404).json({
                success: false,
                message: "Book Not Found."
            });
        }

        return res.status(200).json({
            success:true,
            data: book
        })

    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        })
    }
}

