import { ObjectId } from "bson";
import db from "../db/db.js";

export async function getProducts(req, res) {
  try {
    let products = await db.collection("products").find().toArray();
    res.send(products);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function getProduct(req, res) {
  const id = req.params.id;
  try {
    let product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id)});
    res.send(product);
  } catch (error) {
    res.sendStatus(500);
  }
}
