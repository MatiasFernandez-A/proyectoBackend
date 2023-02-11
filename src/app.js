const express = require("express");

const app = express();

app.use(express.urlencoded({extended:true})); //Configuracion para que el servidor pueda interpretar mejor los datos de la url y mapearlos correctamente en el req.query

const ProductManager = require("./ProductManager")
let productManager = new ProductManager();


app.get("/productos",async(req,res)=>{
    let prod = await productManager.getProducts();
    res.send(prod); 
})

app.listen(8080, ()=>{
    console.log("preparado");
})













