import { Router } from 'express';
import { postAddress, getAddress } from '../controllers/addressController.js';

const addressRouter = Router();

//Post address
addressRouter.post('/address', postAddress)

//Get address
addressRouter.get("/address", getAddress)



export default addressRouter;