import { ADDRGETNETWORKPARAMS } from "dns";
import fs from "fs"
const dirName = "./"
const fileName = dirName + "carrito.json"




class CartManager {
    constructor() {
        this.path = fileName;
    }
    createCart = async () => {
        let cart = await fs.promises.readFile(this.path, "utf-8")
        let cartParsed = JSON.parse(cart);
        const cartId = cartParsed.length + 1;
        let newCarrito = {
            id: cartId,
            products: []
        }
        cartParsed.push(newCarrito)
        await fs.promises.writeFile(this.path, JSON.stringify(cartParsed))
    }
    findCart = async (cid) => {
        let cart = await fs.promises.readFile(this.path, "utf-8");
        let cartParsed = JSON.parse(cart);
        const cartFound = cartParsed.find(cart => cart.id === cid)
        return cartFound.products;
    }
    addProductToCart = async (cid, pid) => {
        let cart = await fs.promises.readFile(this.path, "utf-8");
        let cartParsed = JSON.parse(cart);
        let newProd = {
            product: pid,
            quantity: 1
        }

        /*         
        cartParsed.forEach(e => {
            if (e.id === cid && e.products == []) {
                e.products.push(newProd)
                } else if (e.id === cid && e.products !== []) {
                e.products[0].quantity++
                }
                }); */

        const index = cartParsed.findIndex(cart => cart.id === cid)

        /*         if (!cartParsed[index].products) {
                    cartParsed[index].products.push(newProd)
                } else {
                    cartParsed[index].products[0].quantity++
                }
         */

        const productAlready = cartParsed[index].products.find(product => product.product === pid);

        if (productAlready) {
            const prodIndex = cartParsed[index].products.findIndex(product => product.product === pid);
            cartParsed[index].products[prodIndex].quantity += 1;
        } else {
            cartParsed[index].products.push(newProd)
            console.log(cartParsed[index].products);
            const prodIndex = cartParsed[index].products.findIndex(product => product.product === pid);
            cartParsed[index].products[prodIndex].quantity = 1;
        }









        await fs.promises.writeFile(this.path, JSON.stringify(cartParsed))
    }

}

export default CartManager;
