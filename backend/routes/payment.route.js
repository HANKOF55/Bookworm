// core module
import express from "express";

// local module
import { checkoutPayment } from "../controllers/payment.controller.js";

// rotuer instance
const paymentRouter = express();

// routes
paymentRouter.post("/", checkoutPayment);

export default paymentRouter;