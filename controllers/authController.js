import bcrypt from 'bcryptjs';
import db from './../db/db.js';
import { v4 as uuid } from 'uuid';
import { usersSchema, loginSchema } from '../schemas/authSchemas.js';


export async function signUp(req, res) {
    const { name, cpf, email, password } = req.body;
    const { error } = usersSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(422).send(error.details[0].message);
    }
    try {
        const user = await db.collection("users").find({ cpf }).toArray();
        if (user.length > 0) {
            return res.status(422).send("Usuario ja existe");
        }
        const SALT = 10;
        const hashPassword = bcrypt.hashSync(password, SALT);

        await db.collection("users").insertOne({ name, cpf, email, password: hashPassword });
        return res.status(201).send(`User ${name} created`);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Error creating user");
    }
}

export async function login(req, res) {
    const { email, password } = req.body;
    const { error } = loginSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(422).send(error.details[0].message);
    }

    try {
        const user = await db.collection('users').findOne({ email });
        if (!user) {
            res.status(401).send('User or password incorrect');
        }
        if (user.email && bcrypt.compareSync(password, user.password)) {
            const token = uuid();
            await db.collection('tokens').insertOne({
                token,
                userId: user._id
            });
            return res.status(201).send({ token, name: user.name });
        }
        res.status(401).send('User or password incorrect');

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}