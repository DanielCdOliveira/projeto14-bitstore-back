import express, {json} from "express";
import cors from "cors";
// import dayjs from 'dayjs';
import dotenv from "dotenv";
// import addressSchema  from "./schemas/addressSchema";


import db from "./db/db.js";
import authRouter from "./routes/authRouter.js";
import productsRouter from "./routes/productsRouter.js";
import addressRouter from "./routes/addressRouter.js";
const app = express();
app.use(cors());
app.use(json());
dotenv.config();
 
app.use(authRouter);
app.use(productsRouter)

app.use(addressRouter);

app.get('/signin', async (req, res) => {
    console.log("req.headers =");
    console.log(req.headers.authorization);
    const token = req.headers.authorization;
    console.log(token);
    try {
        //pegar o user id do token
        const user = await db.collection('tokens').findOne({token});
        const userCadastro = await db.collection("users").findOne({_id: user.userId});

        console.log("user =");
        console.log(user);
        return res.status(200).send(userCadastro); //retorno 
    } 
    catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
})

// app.post('/address', async (req, res) => {
//     const {cep, endereco, numero, complemento, bairro, cidade, estado} = req.body;
//     const token = req.headers.authorization;
//     console.log("encontrou token do post address?");
//     console.log(token); 
// //validacao
//     // const {error} = addressSchema.validate(req.body, {abortEarly: false});
//     // if (error) {
//     //     return res.status(422).send(error.details[0].message);
//     // }
// try{
//     //insert address in database
//     const user = await db.collection('tokens').findOne({ token });
//     const userCadastro = await db.collection("users").findOne({_id: user.userId});
//     if(userCadastro){
//         const address = await db.collection('addresses').insertOne({
//             cep,
//             endereco,
//             numero,
//             complemento,
//             bairro,
//             cidade,
//             estado,
//             userId: userCadastro._id
//         });
//         return res.status(200).send(address);   
//     }
//     else{
//         return res.status(401).send('Usuario não autorizado');
//     }
// }

// catch(err){
//     console.log(err);
//     return res.status(500).send("Erro ao criar endereço");
// }});

// //get address from database
// app.get("/address", async (req, res) => {
//     const token  = req.headers.authorization;
//     console.log("token enviado pelo front =");
//     console.log(token)
    
//     try {
//         const user = await db.collection('tokens').findOne({ token:token });
//         console.log("procurando o usuario do token")
//         console.log(user.userId);
//         if(user){
//             const address = await db.collection('addresses').findOne({userId: user.userId});
//             console.log("address =");
//             console.log(address);
//             return res.status(200).send(address);
//         }
//         else{
//             return res.status(401).send('Usuario não autorizado');
//         }
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).send('Server error');
//     }
// }
// );



//servidor

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Servidor iniciado na porta ${PORT}`));