//Primer Desafio

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

            return this.products[count - 1].id + 1
        } else {
            return 1
        }
    }

    addProduct = (title, description, price, stock, code ) => {
        const yaExisteCode = this.products.find((product) => product.code === code);
        if(yaExisteCode){
            console.log(`Error: se repite el campo CODE valor ${code}:`, title);
            return;
        }
        const agregar = {
            id: this.getNextID(),
            title,
            description,
            price: price + (price * this.#precioBaseDeGanancia),
            stock: stock || 50, 
            code,
            thumbnail: 'sin imagen'
        }
        if (!title || !description || !price || !code || !stock) {
            console.log(`Error: Faltan campos que son obligatorios en el ${title}`);
        } else {
            this.products.push(agregar)
        }
    }
    getProductById = (id) => {
        const product = this.products.find(p => p.code === id);
        return product || null;
    }

}

const manager = new ProductManager()
manager.addProduct('Libro Alma Mia', 'Novelas y Suspenso', 100, 1,20, '')
manager.addProduct('Libro IT', 'Terror', 240, 80, 15, '')
manager.addProduct('Libro Argentina', 'Documental', 500, 10, 15, '')
manager.addProduct('Libro Pasion y Alma', '', 500, 10, 30, '')
manager.addProduct('Libro En la oscuridad', 'Suspenso', 800, 10, 50, '')
console.log(manager.getProducts())


const productId = 8;
const product = manager.getProductById(productId);
if (product) {
    console.log(`Producto con ID ${productId}:`, product);
} else {
    console.log(`No se encontró producto ${productId}.`);
}




