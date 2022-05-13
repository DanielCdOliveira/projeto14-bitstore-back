import {Router} from "express";

import {addToCart, getCart} from "../controllers/cartController.js";

const cartRouter = Router();

cartRouter.post("/cart", addToCart);
cartRouter.get("/cart", getCart);

export default cartRouter