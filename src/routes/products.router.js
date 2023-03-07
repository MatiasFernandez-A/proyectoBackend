import { Router } from "express";
import ProductManager from "../ProductManager.js"
const router = Router();

const productManager = new ProductManager();


router.get("/",async(req,res)=>{
    let products = await productManager.getProducts();
    /* res.send({status:"succes", payload: products}) */
    res.render("home", {products})
});
router.get("/", async(req, res)=>{
    let products = await productManager.getProducts();
    let consultas = req.query;
    let {limit} = req.query;
    let cantidadLimite = products.filter(prod => prod.id <= consultas.limit);
    res.send(cantidadLimite);
});
router.get("/:pid", async(req, res)=>{
    let products = await productManager.getProducts();
    const prodId =  products.some(prod => prod.id == req.params.pid )
    if (!prodId){
        res.send("No se encuentra ese producto")
    }
    res.send(prodId);
});
router.post('/', async(req, res)=>{
    let prod = req.body;
    if(!prod){
        res.status(400).send({status:"Error", message:"Producto invalido, verifique los datos de entrada"});
    }
    await productManager.addProducts(prod)
    res.send({status:"Succes", message:`Producto agregado con exito, con id ${prod.id}`})
})
router.put('/:pid', async(req, res)=> {
    try{
        let newProd = req.body; 
        let prodId = parseInt(req.params.pid); 
        await productManager.updateProduct(prodId, newProd);
        res.send(`Producto actualizado. Corroborar con id ${prodId}`)
    }catch(error){
        console.error(error);
    }
});
router.delete('/:pid', async(req, res)=>{
    try{
        let prodId = parseInt(req.params.pid);
        await productManager.deleteProduct(prodId);
    }catch(error){
        console.log(error);
    }
});





export default router;