/* const express = require("express");

const app = express();
 */
/* Configuracion para que el servidor pueda interpretar mejor los datos de la url y mapearlos correctamente en el req.query */

/* app.use(express.urlencoded({extended:true})); 
 */
const ProductManager = require("./ProductManager")

let productManager = new ProductManager();


const pedirProductos = () => {
    productManager.addProducts("PRnjfksajdfjaskldfjl", "La guitarra de JHON MAYER", 10000000, "jasflad", 73737, 1)
    let productos = productManager.getProducts(); 
    console.log(productos);
}
pedirProductos()













/* 
app.get("/products", (req,res)=>{
    res.send(usuarios)
})



app.get("/", (req, res)=>{
    let genero = req.query.genero;

    if(!genero || (genero !== "M"&& genero !== "F")) return res.send({usuarios})
    let usuariosFiltrados = usuarios.filter(usuarios=> usuarios.genero === genero)
    res.send({usuarios:usuariosFiltrados})
})





app.listen(8080, ()=>console.log("Servidor arriba en el puerto 8080")) */