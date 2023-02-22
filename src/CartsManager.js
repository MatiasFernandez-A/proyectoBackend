import { ADDRGETNETWORKPARAMS } from "dns";
import fs from "fs"
const dirName = "./"
const fileName = dirName + "carrito.json"




class CartManager {
    constructor (){
        this.path = fileName;
    }   
    addCarrito = async() =>{
        let cart = await fs.promises.readFile(this.path, "utf-8")
        let cartParsed = JSON.parse(cart);
        const cartId = cartParsed.length+1;
        let newCarrito = {
            id: cartId,
            products: []
        }
        cartParsed.push(newCarrito)
        await fs.promises.writeFile(this.path, JSON.stringify(cartParsed))
    }
}

export default CartManager;
