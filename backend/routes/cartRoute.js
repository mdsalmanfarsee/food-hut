import express from 'express'
import { addToCart, removeCart, getCart } from '../controllers/cartController.js'
import authMiddleware from '../middlewire/auth.js';

const cartRouter = express.Router();

cartRouter.post('/add', authMiddleware, addToCart);
cartRouter.post('/remove', authMiddleware, removeCart);
cartRouter.post('/get', authMiddleware, getCart);


export default cartRouter;