import { Router } from 'express';
import { signUp, login } from '../controllers/authController.js';

const authRouter = Router();

//cadastro
authRouter.post("/signup", signUp)

//login
authRouter.post('/login', login)

export default authRouter;