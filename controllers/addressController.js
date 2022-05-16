import db from './../db/db.js';

export async function postAddress(req, res){
    const {cep, endereco, numero, complemento, bairro, cidade, estado} = req.body;
    const token = req.headers.authorization;
try{
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

export async function getAddress(req, res){
    const token  = req.headers.authorization;
    
    try {
        const user = await db.collection('tokens').findOne({ token:token });
        if(user){
            const address = await db.collection('addresses').findOne({userId: user.userId});
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