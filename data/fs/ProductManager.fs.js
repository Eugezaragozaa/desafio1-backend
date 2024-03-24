const fs = require ("fs")
const crypto = require ("crypto")

class ProductManager{
    constructor () {
        this.path = process.cwd () + "/data/fs/files/products.json";
        this.init ()
    }
    init() {
        const exists = fs.existsSync(this.path)
        if (!exists) {
            const stringData = JSON.stringify([], null, 2)
            fs.writeFileSync(this.path, stringData)
            console.log ("Archivo creado")
        } else {
            console.log ("Archivo existente")
        }
    }

    async create (data) {
        try {
        const product = {
            id: crypto.randomBytes(12).toString("hex"),
            title: data.title,
            photo: data.photo || "https://ar.pinterest.com/pin/5699937020365988/",
            category: data.category,
            price: data.price,
            stock: data.stock,
        };

        if (!data.title || !data.photo || !data.category || !data.price || !data.stock) {
            throw new Error ("El producto no se ha creado, complete todos los campos obligatorios.");
        }
            let products = await fs.promises.readFile(this.path, "utf-8");
            products = JSON.parse(products);

            if (!Array.isArray(products)){
                products = [];
            }
            
            products.push(product);
            console.log ("Producto creado correctamente");
            //users = JSON.stringify(users, null, 2);
            await fs.promises.writeFile (this.path, JSON.stringify(products, null, 2));
        }catch (error) {
            console.log("Error al intentar crear el producto", error.message);
        }
    }

    async read() {
        try {
            let products = await fs.promises.readFile(this.path, "utf-8");
            products = JSON.parse(products);
        return products; 
        } catch (error){
            console.log("error al intentar leer el producto", error.message)
            return [];
        }
    }


    async readOne(id) {
        try {
            let products = await fs.promises.readFile(this.path, "utf-8");
            products = JSON.parse(products);
            const product = products.find(each => each.id === id);
            if (!product) {
                throw new Error("Producto no encontrado");
            }
            return product;
        } catch (error) {
            console.log("Error al leer el producto:", error.message);
            return null;
        }
    }
    async destroy(id) {
        try {
            let products = await fs.promises.readFile(this.path, "utf-8");
            products = JSON.parse(products);
            const filtered = products.filter(each => each.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(filtered, null, 2));
            console.log(id + "eliminado");
        } catch (error) {
            console.log("Error al eliminar el producto:", error.message);
        }
    }
}

async function test (){
    const productsManager = new ProductManager ();
    await productsManager.create ({
        title: "remera",
        photo: "remera.jpg",
        category: "indumentary",
        price: 7000,
        stock: 100
    });
    await productsManager.create ({
        title: "remera",
        photo: "remera.jpg",
        category: "indumentary",
        price: 7000,
        stock: 100
    });
    await productsManager.create ({
        title: "buzo",
        photo: "buzo.jpg",
        category: "indumentary",
        price: 15000,
        stock: 100
    });
    await productsManager.create ({
        title: "buzo",
        photo: "buzo.jpg",
        category: "indumentary",
        price: 15000,
        stock: 100
    });
    await productsManager.create ({
        title: "sweater",
        photo: "sweater.jpg",
        category: "indumentary",
        price: 20000,
        stock: 100
    });
    await productsManager.create ({
        title: "sweater",
        photo: "sweater.jpg",
        category: "indumentary",
        price: 20000,
        stock: 100
    });
    await productsManager.create ({
        title: "campera",
        photo: "campera.jpg",
        category: "indumentary",
        price: 15000,
        stock: 100
    });
    await productsManager.create ({
        title: "campera",
        photo: "campera.jpg",
        category: "indumentary",
        price: 15000,
        stock: 100
    });
    await productsManager.create ({
        title: "pantalon",
        photo: "pantalon.jpg",
        category: "indumentary",
        price: 25000,
        stock: 100
    });
    await productsManager.create ({
        title: "pantalon",
        photo: "pantalon.jpg",
        category: "indumentary",
        price: 25000,
        stock: 100
    });
    //console.log (await productsManager.read())
    console.log (await productsManager.readOne("ab9e574f4a7cde830dfef9b"))
}

test () 










/*const products = new ProductManager ();
products.create({
        title: "remera",
        photo: "remera.jpg",
        category: "indumentary",
        price: 7000,
        stock: 100
})
products.create({
    title: "pantalon",
    photo: "pantalon.jpg",
    category: "indumentary",
    price: 20000,
    stock: 100
});
products.create({
    title: "campera",
    photo: "campera.jpg",
    category: "indumentary",
    price: 80000,
    stock: 100
});
products.create({
    title: "sweater",
    photo: "sweater.jpg",
    category: "indumentary",
    price: 40000,
    stock: 100
});
products.create({
    title: "cinturon",
    photo: "cinturon.jpg",
    category: "indumentary",
    price: 10000,
    stock: 100
})

console.log (products.read()) */
