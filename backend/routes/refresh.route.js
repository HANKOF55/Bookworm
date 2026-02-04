// core modules
import express from "express";

// local modules
import { refreshAccessToken } from "../controllers/refresh.controller.js";

// router instance
const refreshRouter = express.Router();

// routes
refreshRouter.post("/refresh", refreshAccessToken);


export default refreshRouter; 
