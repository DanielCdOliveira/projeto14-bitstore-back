import db from "../db/db.js";

export async function addToCart(req, res) {
  const product = req.body;
  let plus = product.plus;
  delete product.plus;
  delete product.description;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) return res.sendStatus(401);
  const { userId } = await db.collection("tokens").findOne({ token });
  if (!userId) return res.sendStatus(401);
  try {
    let cartUser = await db.collection("carts").findOne({ userId });
    if (!cartUser) {
      let data = { userId, cart: [{ ...product, qty: 1 }] };
      db.collection("carts").insertOne(data);
    } else {
      let cartArray = cartUser.cart;
      let doesExist = false;
      cartArray.forEach((element) => {
        if (element._id === product._id) {
          if (plus) {
            element.qty++;
          } else if (product.newQty >= 1) {
            element.qty = product.newQty;
          }
          doesExist = true;
          return;
        }
      });
      if (!doesExist) {
        let data = { ...product, qty: 1 };
        cartArray.push(data);
      }
      await db
        .collection("carts")
        .updateOne({ userId }, { $set: { cart: cartArray } });
    }
    res.sendStatus(201);
  } catch (error) { }
}

export async function delectProduct(req, res) {

  const id = req.body.id;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) return res.sendStatus(401);
  const { userId } = await db.collection("tokens").findOne({ token });
  if (!userId) return res.sendStatus(401);
  try {
    let cartUser = await db.collection("carts").findOne({ userId });
    if (!cartUser) {
      res.sendStatus(404)
    } else {
      let cartArray = cartUser.cart;
      let newArray = cartArray.filter((element) => {
        if (element._id === id) {
          return false
        } else {
          return true
        }
      });
      await db
        .collection("carts")
        .updateOne({ userId }, { $set: { cart: newArray } });
    }
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
  }
}

export async function getCart(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) return res.sendStatus(401);
  const { userId } = await db.collection("tokens").findOne({ token });
  if (!userId) return res.sendStatus(401);
  let cartUser = await db.collection("carts").findOne({ userId });
  if (!cartUser) {
    res.send([]);
    return;
  }
  res.send(cartUser.cart);
}
