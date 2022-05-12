import express, {json} from "express";
import cors from "cors";
// import dayjs from 'dayjs';
import dotenv from "dotenv";
// import addressSchema  from "./schemas/addressSchema";


import db from "./db/db.js";
import authRouter from "./routes/authRouter.js";

const app = express();
app.use(cors());
app.use(json());
dotenv.config();
 
app.use(authRouter);

app.get('/signin', async (req, res) => {
    console.log("req.headers =");
    console.log(req.headers.authorization);
    const token = req.headers.authorization;
    console.log(token);
    try {
        //pegar o user id do token
        const user = await db.collection('tokens').findOne({token});
        const userId = await db.collection("users").findOne({_id: user.userId});

        console.log("user =");
        console.log(user);
        return res.status(200).send(userId); //retorno 
    } 
    catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
})

app.post('/address', async (req, res) => {
    const {cep, endereco, numero, complemento, bairro, cidade, estado} = req.body;
    const { token } = req.headers.authorization;
//validacao
    // const {error} = addressSchema.validate(req.body, {abortEarly: false});
    // if (error) {
    //     return res.status(422).send(error.details[0].message);
    // }
try{
    //insert address in database
    const user = await db.collection('users').findOne({ token });
    if(user){
        const address = await db.collection('addresses').insertOne({
            cep,
            endereco,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            cpf: user.cpf
        });
        return res.status(200).send(address);   
    }
    else{
        return res.status(401).send('Usuario não autorizado');
    }
}

catch(err){
    console.log(err);
    return res.status(500).send("Erro ao criar endereço");
}});


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