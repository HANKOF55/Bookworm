// core modules
import express from "express";

// local moduels
import { registerUser, loginUser, logOutUser, getUserProfile, patchUser, getAllUsers, getUserById, deleteUserById, getMe } from "../controllers/user.controller.js";

import { jwtAuthMiddleware } from "../utils/jwt.utils.js";

// rotuer instance
const userRouter = express.Router();

// user routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", jwtAuthMiddleware, logOutUser);

// protected user routes
userRouter.get("/profile", jwtAuthMiddleware, getUserProfile);
userRouter.patch("/updateUser", jwtAuthMiddleware, patchUser);
userRouter.get("/me", jwtAuthMiddleware, getMe);

// Admin routes
userRouter.get("/", jwtAuthMiddleware, getAllUsers);
userRouter.get("/:id", jwtAuthMiddleware, getUserById);
userRouter.delete("/:id", jwtAuthMiddleware, deleteUserById);

export default userRouter;