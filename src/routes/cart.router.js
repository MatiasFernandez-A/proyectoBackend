import { Router } from "express";
import CartManager from "../CartsManager.js";

const router = Router();
const cartManager = new CartManager()

router.post('/', async(req, res)=>{
    await cartManager.addCarrito()
})

/* router.get('/:cid', (req, res)=>{

})

router.post('/:cid/product/:pid', (req, res)=>{
    
})

router.post('/', (req, res)=>{
    
})
 */


export default router; 