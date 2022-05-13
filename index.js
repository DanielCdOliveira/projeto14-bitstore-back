import express, {json} from "express";
import cors from "cors";
// import dayjs from 'dayjs';
import dotenv from "dotenv";


import db from "./db/db.js";
import authRouter from "./routes/authRouter.js";
import productsRouter from "./routes/productsRouter.js"
import cartRouter from "./routes/cartRouter.js";
const app = express();
app.use(cors());
app.use(json());
dotenv.config();

app.use(authRouter);
app.use(productsRouter)
app.use(cartRouter)

app.post("/admin"), async (req, res) => {

}

//servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Servidor iniciado na porta ${PORT}`));