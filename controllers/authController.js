import joi from 'joi';
import bcrypt from 'bcryptjs';
import db from './../db/db.js';
import { v4 as uuid } from 'uuid';
import { usersSchema, loginSchema } from '../schemas/authSchemas.js';


//cadastro
export async function signUp(req, res) {
const {name, cpf, email, password, confirmPassword} = req.body;
//joi validation
const {error} = usersSchema.validate(req.body, {abortEarly: false});
if (error) {
    return res.status(422).send(error.details[0].message);
}
try{
//check if user already exists in database
const user = await db.collection("users").find({cpf}).toArray();
if (user.length > 0) {
    return res.status(422).send("Usuario ja existe");
}
//hash password
const SALT = 10;
const hashPassword = bcrypt.hashSync(password, SALT);
//insert user in database

await db.collection("users").insertOne({name, cpf, email, password: hashPassword});
return res.status(201).send(`User ${name} created`);
}
catch(err){
    console.log(err);
    return res.status(500).send("Error creating user");
}}


//login
export async function login(req, res) {
    const { email, password } = req.body;
    console.log(req.body);
    //joi validation
    const {error} = loginSchema.validate(req.body, {abortEarly: false});
    if (error) {
        return res.status(422).send(error.details[0].message);
    }


    try{
        //check if user already exists in database
        const user = await db.collection('users').findOne({ email });
        console.log("user: ", user);
        if (!user) {
            console.log('User not found');
            res.status(401).send('User or password incorrect');
        }
        //check if password is correct
        if (user.email && bcrypt.compareSync(password, user.password)) {
            const token = uuid();
            await db.collection('tokens').insertOne({
                token,
                userId: user._id
            });
            return res.status(201).send({ token, name: user.name });
        }
        //if password is incorrect
        console.log('User or password incorrect');
        res.status(401).send('User or password incorrect');
        
            
    
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}