// core modules
import express from "express";

// local moduels
import { registerUser, loginUser, logOutUser, getUserProfile, patchUser, getAllUsers, getUserById, deleteUserById} from "../controllers/user.controller.js";

import { jwtAuthMiddleware } from "../utils/jwt.utils.js";

// rotuer instance
const userRouter = express.Router();

// user routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logOutUser);
userRouter.get("/profile", jwtAuthMiddleware, getUserProfile);
userRouter.get("/updateUser", jwtAuthMiddleware, patchUser)

// Admin routes
userRouter.get("/", jwtAuthMiddleware, getAllUsers);
userRouter.get("/:id", jwtAuthMiddleware, getUserById)
userRouter.delete("/:id", jwtAuthMiddleware, deleteUserById);

export default userRouter;