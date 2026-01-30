// core modules
import express from "express";

// local modules
import { getBooks, postBook, getBookById, deleteBook, updateBook } from "../controllers/books.controller.js"; 

// router instance
const bookRouter = express.Router();

// routes
bookRouter.get("/", getBooks);
bookRouter.get("/:id", getBookById);
bookRouter.post("/", postBook);
bookRouter.patch("/:id", updateBook);
bookRouter.delete("/:id", deleteBook);

export default bookRouter;