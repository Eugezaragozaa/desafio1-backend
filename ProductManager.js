class ProductManager {
    static #products = [];
    create(data) {
    const product = {
        id:
        ProductManager.#products.length === 0
            ? 1
            : ProductManager.#products[ProductManager.#products.length - 1].id + 1,
        title: data.title,
        photo: data.photo,
        category: data.category,
        price: data.price,
        stock: data.stock
    };
    ProductManager.#products.push(product);
    console.log("product create");
    }
    read(){
        return ProductManager.#products
    }
}

const products = new ProductManager ();
products.create({
        title: "remera",
        photo: "remera.jpg",
        category: "indumentary",
        price: 7000,
        stock: 100
})//crear 4 productos mas  
console.log (products.read())
