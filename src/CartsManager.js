import { ADDRGETNETWORKPARAMS } from "dns";
import fs from "fs"
const dirName = "./"
const fileName = dirName + "carrito.json"




class CartManager {
    constructor (){
        this.path = fileName;
    }   
    createCart = async() =>{
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
    findCart = async(cid) => {
        let cart = await fs.promises.readFile(this.path, "utf-8"); 
        let cartParsed = JSON.parse(cart);
        const cartFound = cartParsed.find(cart => cart.id === cid)
        return cartFound.products;
    }
    addProductToCart = async(cid, pid) => {
        let cart = await fs.promises.readFile(this.path, "utf-8"); 
        let cartParsed = JSON.parse(cart);
        let cartFound = cartParsed.find(cart => cart.id === cid)
        let newProd = {
            product: pid,
            quantity: 1
        }
        cartFound.products.push(newProd);// hasta aca pushea el objeto
        await fs.promises.writeFile(this.path, JSON.stringify(cartFound))
    }

}

export default CartManager;
