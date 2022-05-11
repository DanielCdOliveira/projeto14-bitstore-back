import { ObjectId } from "bson";
import db from "../db/db.js";

export async function getProducts(req, res) {
  try {
    let products = await db.collection("products").find().toArray();
    console.log(products);
    res.send(products);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function getProduct(req, res) {
  const id = req.params.id;
  console.log(id);
  try {
    let product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id)});
    console.log(product);
    res.send(product);
  } catch (error) {
    res.sendStatus(500);
  }
}
