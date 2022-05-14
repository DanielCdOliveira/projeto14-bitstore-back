import db from './../db/db.js';



// app.post('/address', async (req, res) => {
export async function postAddress(req, res){
    const {cep, endereco, numero, complemento, bairro, cidade, estado} = req.body;
    const token = req.headers.authorization;
    console.log("encontrou token do post address?");
    console.log(token); 
//validacao
    // const {error} = addressSchema.validate(req.body, {abortEarly: false});
    // if (error) {
    //     return res.status(422).send(error.details[0].message);
    // }
try{
    //insert address in database
    const user = await db.collection('tokens').findOne({ token });
    const userCadastro = await db.collection("users").findOne({_id: user.userId});
    if(userCadastro){
        const address = await db.collection('addresses').insertOne({
            cep,
            endereco,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            userId: userCadastro._id
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
}};

//get address from database
// app.get("/address", async (req, res) => {
export async function getAddress(req, res){
    const token  = req.headers.authorization;
    console.log("token enviado pelo front =");
    console.log(token)
    
    try {
        const user = await db.collection('tokens').findOne({ token:token });
        console.log("procurando o usuario do token")
        console.log(user.userId);
        if(user){
            const address = await db.collection('addresses').findOne({userId: user.userId});
            console.log("address =");
            console.log(address);
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
;