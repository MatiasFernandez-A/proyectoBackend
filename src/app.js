const express = require("express");

const app = express();

app.use(express.urlencoded({extended:true})); //Configuracion para que el servidor pueda interpretar mejor los datos de la url y mapearlos correctamente en el req.query

const ProductManager = require("./ProductManager")
let productManager = new ProductManager();


app.get("/products",async(req,res)=>{
    let products = await productManager.getProducts();
    res.send({products}); 
})
app.get("", async(req, res)=>{
    let products = await productManager.getProducts()
    let consultas = req.query
    let {limit} = req.query
    let cantidadLimite = products.filter(prod => prod.id <= consultas.limit)
    res.send(cantidadLimite)
})

app.listen(8080, ()=>{})












