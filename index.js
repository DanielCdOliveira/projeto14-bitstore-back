import express, {json} from "express";
import cors from "cors";
// import dayjs from 'dayjs';
import dotenv from "dotenv";
// import addressSchema  from "./schemas/addressSchema";


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

//get address from database
app.get("/address", async (req, res) => {
    const { token } = req.headers.authorization;
    try {
        const user = await db.collection('users').findOne({ token });
        if(user){
            const address = await db.collection('addresses').findOne({cpf: user.cpf});
            return res.status(200).send(address);
        }
        else{
            return res.status(401).send('Usuario não autorizado');
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}
);



//servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Servidor iniciado na porta ${PORT}`));