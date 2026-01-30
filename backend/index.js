// core modules
import express from "express";
import dotenv from "dotenv";

// Local modules
import bookRouter from "./routes/books.route.js";
import connectDB from "./config/connection.db.js";

// configuration
dotenv.config();
const app = express();

// middlewares
app.use(express.json());
app.use("/api/v1/books/", bookRouter)



connectDB();
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`App is running on :http://localhost:${PORT}/`)
});