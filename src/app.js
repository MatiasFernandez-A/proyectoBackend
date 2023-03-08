import express from "express"
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js"
import __dirname from "./utils.js";
import handlebars from 'express-handlebars';
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
app.use('/realtimeproducts', viewsRouter)

//Plantillas
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname+'/views');
app.set("view engine", "handlebars");


app.use(express.static(__dirname+'/public'))

const SERVER_PORT = 8080;

const httpServer = app.listen(SERVER_PORT, ()=>{});

const socketServer = new Server(httpServer);

socketServer.on("connection", socket=>{
    socket.on("mensaje", data=>{
        socketServer.emit("log", data)
    })
})











