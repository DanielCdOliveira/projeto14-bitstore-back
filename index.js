import express, {json} from "express";
import cors from "cors";
// import dayjs from 'dayjs';
import dotenv from "dotenv";
import {MongoClient} from "mongodb";
import joi from "joi";
import {v4 as uuid} from "uuid";
import bcrypt from "bcryptjs";

import db from "./db/db.js";
import authRouter from "./routes/authRouter.js";

const app = express();
app.use(cors());
app.use(json());
dotenv.config();

app.use(authRouter);

// //cadastro
// app.post("/signup", async (req, res) => {
    
//     //joi validation
//     const schemaUsers = joi.object({
//         name: joi.string().required(),
//         cpf: joi.string().required(),
//         username: joi.string().required(),
//         email: joi.string().email().required(),
//         password: joi.string().required(),
//         confirmPassword: joi.ref("password")
// })
//     const {error} = schemaUsers.validate(req.body, {abortEarly: false});
//     if (error) {
//         return res.status(422).send(error.details[0].message);
//     }
// try{
//     //check if user already exists in database
//     const user = await db.collection("users").find({cpf}).toArray();
//     if (user.length > 0) {
//         return res.status(422).send("User already exists");
//     }
//     //hash password
//     const SALT = 10;
//     const hashPassword = bcrypt.hashSync(password, SALT);
//     //insert user in database
//     const {name, cpf, username, email, password, confirmPassword} = req.body;
//     await db.collection("users").insertOne({name, cpf, username, email, password: hashPassword});
//     return res.status(201).send(`User ${name} created`);
//     }
//     catch(err){
//         console.log(err);
//         return res.status(500).send("Error creating user");
//     }
// })

// //login
// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     console.log(req.body);

//     try{
//         const user = await db.collection('users').findOne({ username });
//         console.log("user: ", user);
//         if (!user) {
//             console.log('User not found');
//             res.status(401).send('User or password incorrect');
//         }
//         if (user.username && bcrypt.compareSync(password, user.password)) {
//             const token = uuid();
//             await db.collection('tokens').insertOne({
//                 token,
//                 userId: user._id
//             });
//             return res.status(201).send({ token, username: username });
//         }
        
//         console.log('User or password incorrect');
//         res.status(401).send('User or password incorrect');
        
            
    
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Server error');
//     }
// })

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