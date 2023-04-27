import fs from 'fs'

export default class ProductManager{
    constructor(){
        this.path = "./productos.txt"
        this.products = [];
    }

    static id = 0;

    addProduct = async (title, description, price, img, code, stock) => {

        ProductManager.id++;    

        let newProduct = {
            title,
            description,
            price,
            img,
            code,
            stock,
            id:ProductManager.id
        };
    
        this.products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));

    };

    readProducts = async () => {
        let resp = await fs.promises.readFile(this.path, "utf-8")
        return JSON.parse(resp)
    }
    
    getProducts = async () => {
        let resp2 = await this.readProducts();
        return console.log(resp2)
    }

   getProductsById = async (id) => {
        let resp3 = await this.readProducts();
        if(!resp3.find(prod => prod.id === id)){
            console.log("Producto no encontrado")
        }else{
            console.log(resp3.find(prod => prod.id === id))
        }
    } 

    deleteProductsById = async (id) => {
        let resp3 = await this.readProducts();
        let prodFilter = resp3.filter(prod => prod.id != id)
        console.log(prodFilter)
        await fs.promises.writeFile(this.path, JSON.stringify(prodFilter));
    }

    updateProducts = async({id, ...prod}) => {
        await this.deleteProductsById(id);
        let oldProd = await this.readProducts();
        let actualProd = [{...prod, id}, ...oldProd];
        await fs.promises.writeFile(this.path, JSON.stringify(actualProd));
    };  
}


//VALIDACIONES

//const productos = new ProductManager 

//Añadir productos

/* productos.addProduct("title1", "des1", 500, "img1", "mbY1", 10)
productos.addProduct("title2", "des2", 1000, "img2", "mbY2", 6)
productos.addProduct("title3", "des3", 250, "img3", "mbY3", 7)
productos.addProduct("title4", "des4", 150, "img4", "mbY4", 8) 
productos.addProduct("title5", "des5", 1500, "img5", "mbY5", 9) 
productos.addProduct("title6", "des6", 2000, "img6", "mbY6", 8)
productos.addProduct("title7", "des7", 365, "img7", "mbY7", 4) 
productos.addProduct("title8", "des8", 450, "img8", "mbY8", 1) 
productos.addProduct("title9", "des9", 1050, "img9", "mbY9", 15)
productos.addProduct("title10", "des10", 2300, "img10", "mbY10", 20) */

//Consultar productos

//productos.getProducts();

//Consultar productos por su ID

//El producto existe

//productos.getProductsById(1)

//El producto no existe

//productos.getProductsById(4)

//Eliminar producto por su ID

//productos.deleteProductsById(2)

//Actualizar un producto

/* productos.updateProducts({
    title:"title1",
    description:"des1",
    price: 900,
    img:"img1",
    code: "mbY1",
    stock:9,
    id:1
});
  */

