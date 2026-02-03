// core modules
import express from "express";
import dotenv from "dotenv";

// Local modules
import connectDB from "./config/connection.db.js";
import { jwtAuthMiddleware } from "./middlewares/jwt.middleware.js";
import bookRouter from "./routes/books.route.js";
import authRouter from "./routes/auth.route.js";
import userRotuer from "./routes/user.route.js";
import adminRouter from "./routes/admin.route.js";

// configuration
dotenv.config();
const app = express();

// middlewares
app.use(express.json());
app.use("/api/v1/books/", bookRouter)
app.use("/api/v1/users/", jwtAuthMiddleware, authRouter);
app.use("/api/v1/user/", userRotuer);
app.use("/api/v1/user/", adminRouter);


connectDB();
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`App is running on :http://localhost:${PORT}/`)
});