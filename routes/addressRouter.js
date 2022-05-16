import { Router } from 'express';
import { postAddress, getAddress } from '../controllers/addressController.js';

const addressRouter = Router();

addressRouter.post('/address', postAddress)

addressRouter.get("/address", getAddress)

export default addressRouter;