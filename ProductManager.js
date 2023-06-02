//Primer Pre entrega

class ProductManager {

    #precioBaseDeGanancia
    constructor() {
        this.products = []
        this.#precioBaseDeGanancia = 0.15
    }

    getProducts = () => { return this.products }

    getNextID = () => {
        const count = this.products.length

        if (count > 0) {

            return this.products[count - 1].code + 1
        } else {
            return 1
        }
    }

    addProduct = (title, description, price, stock) => {
        const product = {
            code: this.getNextID(),
            title,
            description,
            price: price + (price * this.#precioBaseDeGanancia),
            stock: stock || 50, 
            thumbnail: 'sin imagen'
        }

        this.products.push(product)
    }
    getProductById = (id) => {
        const product = this.products.find(p => p.code === id);
        return product || null;
    }

}

const manager = new ProductManager()
manager.addProduct('Libro Alma Mia', 'Novelas y Suspenso', 100, 0, '')
manager.addProduct('Libro IT', 'Terror', 240, 80, '')
manager.addProduct('Libro Argentina', 'Documental', 500, 10, '')
console.log(manager.getProducts())


const productId = 3;
const product = manager.getProductById(productId);
if (product) {
    console.log(`Producto con ID ${productId}:`, product);
} else {
    console.log(`No se encontró producto ${productId}.`);
}


