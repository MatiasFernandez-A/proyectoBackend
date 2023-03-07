import { Router } from "express";
import CartManager from "../CartsManager.js";

const router = Router();
const cartManager = new CartManager()

router.post('/', async(req, res)=>{
    await cartManager.createCart()
})

router.get('/:cid', async(req, res)=>{
    const cartId = parseInt(req.params.cid)
    const cartFound = await cartManager.findCart(cartId)
    res.send(cartFound)
})

router.post('/:cid/product/:pid', async(req, res)=>{
    const cartId = parseInt(req.params.cid); 
    const prodId = parseInt(req.params.pid);
    await cartManager.addProductToCart(cartId, prodId);
})

export default router; 