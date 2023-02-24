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
        let newProd = {
            product: pid,
            quantity: 1
        }
        cartParsed.forEach(e => {
            if(e.id === cid && e.products == []){/* Si le pongo && no crea al prod
            pero si el product existe solo me lo incrementa cuando cambio la condicion a || */
                e.products.push(newProd)
            } else if (e.id === cid && e.products !== []){
                e.products[0].quantity++
            }
        });

        await fs.promises.writeFile(this.path, JSON.stringify(cartParsed))
    }

}

export default CartManager;
