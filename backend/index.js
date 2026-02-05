// core modules
import express from "express";
import dotenv from "dotenv";

// Local modules
import connectDB from "./config/connection.db.js";
import { jwtAuthMiddleware } from "./utils/jwt.utils.js";
import bookRouter from "./routes/books.route.js";
import userRotuer from "./routes/user.route.js";
import reviewRouter from "./routes/review.route.js";
import cartRouter from "./routes/cart.route.js";

// configuration
dotenv.config();
const app = express();


// middlewares
app.use(express.json());
app.use("/api/v1/books/", bookRouter);
app.use("/api/v1/user/", userRotuer);
app.use("/api/v1/", reviewRouter);
app.use("/api/v1/cart/", jwtAuthMiddleware, cartRouter);

connectDB();
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`App is running on :http://localhost:${PORT}/`)
});