import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";


import db from "./db/db.js";
import authRouter from "./routes/authRouter.js";
import productsRouter from "./routes/productsRouter.js"
import cartRouter from "./routes/cartRouter.js";
import addressRouter from "./routes/addressRouter.js";
const app = express();
app.use(cors());
app.use(json());
dotenv.config();
 
app.use(authRouter);
app.use(productsRouter)
app.use(cartRouter)
app.use(addressRouter);

app.get('/signin', async (req, res) => {
    console.log("req.headers =");
    console.log(req.headers.authorization);
    const token = req.headers.authorization;
    console.log(token);
    try {
        const user = await db.collection('tokens').findOne({token});
        const userCadastro = await db.collection("users").findOne({_id: user.userId});

        console.log("user =");
        console.log(user);
        return res.status(200).send(userCadastro);
    } 
    catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Servidor iniciado na porta ${PORT}`))