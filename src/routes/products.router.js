import { Router } from "express";
import ProductManager from "../ProductManager.js"
const router = Router();

const productManager = new ProductManager();


router.get("/",async(req,res)=>{
    let products = await productManager.getProducts();
    res.send({products});
});


/* router.get("/", async(req, res)=>{
    let products = await productManager.getProducts();
    let consultas = req.query;
    let {limit} = req.query;
    let cantidadLimite = products.filter(prod => prod.id <= consultas.limit);
    res.send(cantidadLimite);
}); */

router.get("/:pid", async(req, res)=>{
    let products = await productManager.getProducts();
    const prodId =  products.filter(prod => prod.id == req.params.pid )
    if(req.params.pid > 5){
        res.send("NO EXISTE ESTE PRODUCTO");
    } else {
        res.send(prodId)
    }
});

router.post('/', async(req, res)=>{
    let prod = req.body;
    prod.id = Math.floor(Math.random()*20+1);
    /*     if(!prod.title || !prod.description){
        console.error("Producto no valido");
        console.error(prod);
        res.status(400).send({status:"Error", message:"Producto invalido, verifique los datos de entrada"});
    } else {

    } */
    await productManager.addProducts(prod)
    res.send({status:"Succes", message:`Producto agregado con exito, con id ${prod.id}`})

    /* Tuve que cambiar el parametro de la funcion addProducts del productManager para que me tomara el producto. si me toma un producto objeto la funcion le agrega el ID pero si le paso por post un json no le agrega a ningun objeto=producto un id. 
    Pienso que cuando el json pasa por el post tendria que hacerle un for o algo asi para que recorra todo el json y le agregue un id random a cada prod. 
    Reveer el video de la entrega porque creo que hablaba de como se tenia que codear esta parte  
    */



})

















export default router;