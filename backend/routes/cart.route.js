// core modules
import express from "express";

// local modules
import { getMyCart, postCartItem, removeCartItem, clearCart} from "../controllers/cart.controller.js";

// router instance
const cartRouter = express.Router();

// routes
cartRouter.get("/", getMyCart);
cartRouter.post("/add", postCartItem);
// cartRouter.patch("/update", patchCartItem);
cartRouter.delete("/:id", removeCartItem);
cartRouter.delete("/", clearCart);

export default cartRouter;