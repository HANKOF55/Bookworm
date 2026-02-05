// core modules
import express from "express";

// local moduels
import { registerUser, loginUser, logOutUser, getUserProfile, patchUser, getAllUsers, getUserById, deleteUserById} from "../controllers/user.controller.js";

import { jwtAuthMiddleware } from "../utils/jwt.utils.js";
import { upload } from "../services/fileUpload.service.js";

// rotuer instance
const userRouter = express.Router();

// user routes
userRouter.post("/register", upload.single("avatar"), registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logOutUser);

// proteced user routes
userRouter.get("/profile", jwtAuthMiddleware, getUserProfile);
userRouter.get("/updateUser", jwtAuthMiddleware, upload.single("avatar"), patchUser);

// Admin routes
userRouter.get("/", jwtAuthMiddleware, getAllUsers);
userRouter.get("/:id", jwtAuthMiddleware, getUserById);
userRouter.delete("/:id", jwtAuthMiddleware, deleteUserById);

export default userRouter;