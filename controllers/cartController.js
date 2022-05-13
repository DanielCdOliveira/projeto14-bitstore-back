import db from "../db/db.js";

export async function addToCart(req, res) {
  console.log("entrou");
  const product = req.body;
  let plus = product.plus
  delete product.plus
  console.log(product);
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  console.log(token);
  if (!token) return res.sendStatus(401);
  // trocar para {userId}
  const session = await db.collection("tokens").findOne({ token });
  if (!session) return res.sendStatus(401);
  try {
    let cartUser = await db
      .collection("carts")
      .findOne({ userId: session.userId });
    console.log(cartUser);
    if (!cartUser) {
      let data = { userId: session.userId, cart: [{ ...product, qty: 1 }] };
      db.collection("carts").insertOne(data);
      console.log(data);
    } else {
      let cartArray = cartUser.cart;
      cartArray.forEach((element) => {
        if (element._id === product._id) {
          if (plus) {
            element.qty++;
          } else if (element.qty > 1) {
            element.qty--;
          }
        } else {
          let data = { ...product, qty: 1 };
          cartArray.push(data);
        }
      });
      await db
        .collection("carts")
        .updateOne({ userId: session.userId }, { $set: { cart: cartArray } });
    }
    res.sendStatus(201);
  } catch (error) {}
}

export async function getCart(req, res){
    console.log("entrou");
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    console.log(token);
    if (!token) return res.sendStatus(401);
    // trocar para {userId}
    const {userId} = await db.collection("tokens").findOne({ token });
    if (!userId) return res.sendStatus(401);
    console.log(userId);
    let cartUser = await db
      .collection("carts")
      .findOne({ userId});
    // if(!cartUser)
    console.log(cartUser.cart);
    res.send(cartUser.cart)
}


// let cart = {_id:"dasdsaasdd",
//  userID:"sadsadsaddsa",
//  cart:[{productID: "3241564141",qty:2},
//     {productID: "564516515",qty:4}]
// }
