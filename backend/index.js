// core modules
import express from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
import cors from "cors";


// Local modules
import connectDB from "./config/connection.db.js";
import { jwtAuthMiddleware } from "./utils/jwt.utils.js";
import bookRouter from "./routes/books.route.js";
import userRotuer from "./routes/user.route.js";
import reviewRouter from "./routes/review.route.js";
import cartRouter from "./routes/cart.route.js";
import paymentRouter from "./routes/payment.route.js";

// configuration
dotenv.config();
const app = express();


export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(
    cors({
        origin: `${process.env.CLIENT_URL}`, // frontend URL
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/books/", bookRouter);
app.use("/api/v1/user/", userRotuer);
app.use("/api/v1/", reviewRouter);
app.use("/api/v1/cart/", jwtAuthMiddleware, cartRouter);
app.use("/api/v1/payment/", paymentRouter);

connectDB();
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`App is running on :http://localhost:${PORT}/`)
});