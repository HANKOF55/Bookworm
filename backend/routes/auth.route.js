// core module
import express from "express";

// local moduels
import { getUserProfile, patchUser } from "../controllers/user.controller.js";

// router instance
const authRouter = express.Router();

// routes
authRouter.get("/profile", getUserProfile);
authRouter.get("/updateUser", patchUser)

export default authRouter;