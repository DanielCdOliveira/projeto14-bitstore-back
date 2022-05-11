import db from "../db/db.js";

const array = [
  { name: "rtx 3080", description: "placa de video", price: 9999.99 },
  { name: "rtx 3080", description: "placa de video", price: 9999.99 },
  { name: "rtx 3080", description: "placa de video", price: 9999.99 },
  { name: "rtx 3080", description: "placa de video", price: 9999.99 },
  { name: "rtx 3080", description: "placa de video", price: 9999.99 },
  { name: "rtx 3080", description: "placa de video", price: 9999.99 },
  { name: "rtx 3080", description: "placa de video", price: 9999.99 },
  { name: "rtx 3080", description: "placa de video", price: 9999.99 },
  { name: "rtx 3080", description: "placa de video", price: 9999.99 },
];

export default async function getProducts(req, res) {
  res.send(array);
}
