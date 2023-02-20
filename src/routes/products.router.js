import { Router } from "express";
import ProductManager from "../ProductManager.js"
const router = Router();

const productManager = new ProductManager();


router.get("/",async(req,res)=>{
    let products = await productManager.getProducts();
    res.send({status:"succes", payload: products})
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
    const prodId =  products.find(prod => prod.id == req.params.pid )
    if (!prodId){
        res.send("No se encuentra ese producto")
    }
    res.send(prodId);
});

router.post('/', async(req, res)=>{
    let prod = req.body;
    prod.id = Math.floor(Math.random()*20+1);
    if(!prod){
        res.status(400).send({status:"Error", message:"Producto invalido, verifique los datos de entrada"});
    }
    await productManager.addProducts(prod)
    res.send({status:"Succes", message:`Producto agregado con exito, con id ${prod.id}`})

    /* Tuve que cambiar el parametro de la funcion addProducts del productManager para que me tomara el producto. si me toma un producto objeto la funcion le agrega el ID pero si le paso por post un json no le agrega a ningun objeto=producto un id. 
    Pienso que cuando el json pasa por el post tendria que hacerle un for o algo asi para que recorra todo el json y le agregue un id random a cada prod. 
    Reveer el video de la entrega porque creo que hablaba de como se tenia que codear esta parte  
    */
})

router.put('/:pid', async(req, res)=> {
    let newProd = req.body; 
    let prodId = req.params.pid; 
    let prodUpdated = await productManager.updateProduct(prodId, newProd);
    console.log(prodUpdated);

});

/*


15{"title":"telecaster","description":"fdajdfjasdñf","code":"fasda","price":12312,"status":true,"stock":3423,"category":"sjfklsd","thumbnails":["fdasdkflsd","fajsdklf"]}


*/















export default router;