const crypto = require ("crypto")

class ProductManager {
    static #products = [];
    create (data) {
        const product = {
            id: crypto.randomBytes(12).toString("hex"),
            title: data.title,
            photo: data.photo || "https://ar.pinterest.com/pin/5699937020365988/",
            category: data.category,
            price: data.price,
            stock: data.stock,
        };

        if (!data.title || !data.photo || !data.category || !data.price || !data.stock) {
        console.log ("El producto no se ha creado, complete todos los campos obligatorios.")}
        else { 
            ProductManager.#products.push(product);
        console.log ("Producto creado correctamente");
        }
    }
    read() {
        try {
            if (ProductManager.#products.length === 0) {
                throw new Error("No se encontraron los productos.");
            }
            return ProductManager.#products;
        } catch (error) {
            console.log("Error al leer productos:", error.message);
            return [];
        }
    }

    readOne(id) {
        try {
            const product = ProductManager.#products.find(each => each.id === id);
            if (!product) {
                throw new Error("Usuario no encontrado.");
            }
            return product;
        } catch (error) {
            console.log("Error al leer usuario:", error.message);
            return null;
        }
    }

    destroy(id) {
        try {
            const filtered = ProductManager.#products.filter(each => each.id !== id);
            if (filtered.length === ProductManager.#products.length) {
                throw new Error("Usuario no encontrado.");
            }
            ProductManager.#products = filtered;
            console.log(id + " eliminado");
        } catch (error) {
            console.log("Error al eliminar producto:", error.message);
        }
    }
}

const productsManager = new ProductManager ();
    productsManager.create ({
            title: "remera",
            photo: "remera.jpg",
            category: "indumentary",
            price: 7000,
            stock: 100,
        });
        productsManager.create ({
            title: "remera",
            photo: "remera.jpg",
            category: "indumentary",
            price: 7000,
            stock: 100,
        });
        productsManager.create ({
            title: "buzo",
            photo: "buzo.jpg",
            category: "indumentary",
            price: 15000,
            stock: 100,
        });
        productsManager.create ({
            title: "buzo",
            photo: "buzo.jpg",
            category: "indumentary",
            price: 15000,
            stock: 100,
        });
        productsManager.create ({
            title: "sweater",
            photo: "sweater.jpg",
            category: "indumentary",
            price: 20000,
            stock: 100,
        });
        productsManager.create ({
            title: "sweater",
            photo: "sweater.jpg",
            category: "indumentary",
            price: 20000,
            stock: 100,
        });
        productsManager.create ({
            title: "campera",
            photo: "campera.jpg",
            category: "indumentary",
            price: 15000,
            stock: 100,
        });
        productsManager.create ({
            title: "campera",
            photo: "campera.jpg",
            category: "indumentary",
            price: 15000,
            stock: 100,
        });
        productsManager.create ({
            title: "pantalon",
            photo: "pantalon.jpg",
            category: "indumentary",
            price: 25000,
            stock: 100,
        });
        productsManager.create ({
            title: "pantalon",
            photo: "pantalon.jpg",
            category: "indumentary",
            price: 25000,
            stock: 100,
        });

    console.log(productsManager.read());