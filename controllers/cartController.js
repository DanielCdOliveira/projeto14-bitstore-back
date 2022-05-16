import db from "../db/db.js";

export async function addToCart(req, res) {
  const product = req.body;
  console.log("produtoooooooooooo", product);
  let plus = product.plus;
  delete product.plus;
  delete product.description;
  // console.log(product);
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  // console.log(token);
  if (!token) return res.sendStatus(401);
  // trocar para {userId}
  const { userId } = await db.collection("tokens").findOne({ token });
  if (!userId) return res.sendStatus(401);
  try {
    let cartUser = await db.collection("carts").findOne({ userId });
    // console.log(cartUser);
    if (!cartUser) {
      console.log("entrou no !cartuser");
      let data = { userId, cart: [{ ...product, qty: 1 }] };
      db.collection("carts").insertOne(data);
      // console.log(data);
    } else {
      console.log("entrou no cartuser");
      let cartArray = cartUser.cart;
      let doesExist = false;
      cartArray.forEach((element) => {
        if (element._id === product._id) {
          console.log("entrou no if id");
          if (plus) {
            console.log("entrou no plus");

            element.qty++;
          } else if (product.newQty >= 1) {
            console.log("entrou no newqty");
            console.log(product);
            console.log(element.qty);
            element.qty = product.newQty;
            console.log(element.qty);
          }
          doesExist = true;
          return;
        }
      });
      if (!doesExist) {
        let data = { ...product, qty: 1 };
        cartArray.push(data);
      }
      console.log("array", cartArray);
      await db
        .collection("carts")
        .updateOne({ userId }, { $set: { cart: cartArray } });
    }
    res.sendStatus(201);
  } catch (error) {}
}

export async function delectProduct(req, res) {

  const id = req.body.id;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  console.log(token);
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
      }else{
        return true
      }});
      console.log("antes",cartArray);
      console.log("agora",newArray);
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

// let cart = {_id:"dasdsaasdd",
//  userID:"sadsadsaddsa",
//  cart:[{productID: "3241564141",qty:2},
//     {productID: "564516515",qty:4}]
// }
