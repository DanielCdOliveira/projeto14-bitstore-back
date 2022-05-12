import express, {json} from "express";
import cors from "cors";
// import dayjs from 'dayjs';
import dotenv from "dotenv";


import db from "./db/db.js";
import authRouter from "./routes/authRouter.js";

const app = express();
app.use(cors());
app.use(json());
dotenv.config();

app.use(authRouter);

app.get('/home', async (req, res) => {
    const { token } = req.headers;
    console.log(token);
    try {
        const user = await db.collection('users').findOne({
            _id: db.collection('tokens').findOne({ token }).userId
        });
        console.log(user);
        return res.status(200).send(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
})

app.post("/admin"), async (req, res) => {

}

//servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Servidor iniciado na porta ${PORT}`));