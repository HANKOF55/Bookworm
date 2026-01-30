// core modules
import express from "express";

// local modules
import { getUser, getUserById, deleteUser} from "../controllers/user.controller.js";

// router instacne
const adminRouter = express.Router();

// routes
adminRouter.get("/", getUser);
adminRouter.get("/:id", getUserById)
adminRouter.delete("/:id", deleteUser);

export default adminRouter;