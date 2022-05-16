import {Router} from "express";

import {addToCart, getCart, editCart} from "../controllers/cartController.js";

const cartRouter = Router();

cartRouter.post("/cart", addToCart);
cartRouter.put("/cart", editCart)
cartRouter.get("/cart", getCart);

export default cartRouter