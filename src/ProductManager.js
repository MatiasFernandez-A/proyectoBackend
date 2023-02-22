import fs from "fs"
const dirName = "./";
const fileName = dirName + "productos.json";


class ProductManager {
    constructor () {
        this.products = []; 
        this.path = fileName;
    }
    addProducts = async (prod) => {
        let productos = await fs.promises.readFile(this.path, "utf-8");
        let productParsed = JSON.parse(productos);
        let newProduct = {...prod, id: productParsed.length+1};
        productParsed.push(newProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(productParsed))
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
        const index = newArrayParsed.findIndex(e => e.id === id)
        newArrayParsed.splice(index, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(newArrayParsed))
    }
}

export default ProductManager;
