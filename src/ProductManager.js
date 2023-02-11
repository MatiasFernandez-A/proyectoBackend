const fs = require('fs'); 
const dirName = "./";
const fileName = dirName + "productos.json";


class ProductManager {
    constructor () {
        this.products = []; 
        this.path = fileName;
    }
    addProducts = async (title, descripcion, price, thumbnail, code, stock ) => {
        let newProduct = {
            title, descripcion, price, thumbnail, code, stock 
        }
        for (const property in newProduct) {
            if ( !newProduct[property] ) {
                console.log(`error en ${property}`);
            }
        }
        newProduct.id = this.products.length +1;
        this.products.push(newProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(this.products))
        
    }
    getProducts = async () => {
        let productos = await fs.promises.readFile(this.path, "utf-8")
        return(JSON.parse(productos));
    }
    getProductById = async (id) => {
        let newArray = await fs.promises.readFile(this.path, "utf-8")
        let newArrayParsed = JSON.parse(newArray)
        for (let product in newArrayParsed) {
            if (newArrayParsed[product].id === id) {
                return console.log(newArrayParsed[product]);
            }
        }
        console.log("no se encuentra el producto")
    }
    updateProduct = async (id, newProd) => {
        let newArrayReparsed = await fs.promises.readFile(this.path, "utf-8")
        let arrayReparse = JSON.parse(newArrayReparsed)

        const updateProduct = arrayReparse.map((prod)=> {
            if (prod.id === id) {
                return {...prod, ...newProd}
            } else {
                return prod;
            }
        })
        arrayReparse = updateProduct;
        await fs.promises.writeFile(this.path, JSON.stringify(arrayReparse))
    }
    deleteProduct = async (id) => {
        let newArray = await fs.promises.readFile(this.path, "utf-8")
        let newArrayParsed = JSON.parse(newArray)
        const newArrayFiltered = newArrayParsed.filter(function(element){
            return element.id !== id;
        });
        await fs.promises.writeFile(this.path, JSON.stringify(newArrayFiltered))
    }
}

module.exports = ProductManager; 
