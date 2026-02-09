// core modules
import express from "express";

// local modules
import { jwtAuthMiddleware } from "../utils/jwt.utils.js"
import { getBooks, postBook, getBookById, deleteBook, updateBook } from "../controllers/books.controller.js";

// router instance
const bookRouter = express.Router();

// routes
bookRouter.get("/", getBooks);
bookRouter.get("/:id", getBookById);
bookRouter.post("/", jwtAuthMiddleware, postBook);
bookRouter.patch("/:id", jwtAuthMiddleware, updateBook);
bookRouter.delete("/:id", jwtAuthMiddleware, deleteBook);

export default bookRouter;