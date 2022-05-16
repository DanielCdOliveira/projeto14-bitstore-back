import {Router} from "express";

import {addToCart, getCart, delectProduct} from "../controllers/cartController.js";

const cartRouter = Router();

cartRouter.post("/cart", addToCart);
cartRouter.put("/cart", delectProduct)
cartRouter.get("/cart", getCart);

export default cartRouter