// core modules
import express from "express";

// local moduels
import { registerUser, loginUser, logOutUser} from "../controllers/user.controller.js";

// rotuer instance
const userRouter = express.Router();

// routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logOutUser);

export default userRouter;