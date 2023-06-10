const fs = require('fs');

class ProductManager {

    constructor(path) {
        this.path = path;
        this.format = 'utf-8';
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        const productos = { title, description, price, thumbnail, code, stock }
        const list = await this.getProducts();

        let idSuperior = 0;
        for (const productos of list) {
            if (productos.id > idSuperior) {
                idSuperior = productos.id
            }
        }
        const nuevaId = idSuperior+ 1;
        productos.id = nuevaId;

        list.push(productos);

        await fs.promises.writeFile(this.path, JSON.stringify(list));
    }

    getProducts = async () => {
        try {
            const data = await fs.promises.readFile(this.path, this.format)
            const dataObj = JSON.parse(data)
            return dataObj
        }
        catch (error) {
            console.log('el archivo no existe, se devuelve vacío');
            return []
        }
    }

    getProductbyId = async (id) => {
        const buscar = await this.getProducts();
        const buscarObj = buscar.find(item => item.id === id);
        console.log((buscarObj) ? (`producto encontrado ${JSON.stringify(buscarObj)}`) : ('no se encontró ese id'));
    }

    write = async list => {
        fs.promises.writeFile(this.path, JSON.stringify(list));
    }

    async updateProduct (id, update) {
        const list = await this.getProducts();
        const idx = list.findIndex((e) => e.id == id);
    
        if (idx < 0) return "not found";
    
        Object.assign (list[idx], update)
    
        await this.write(list);
        return list[idx];
    }

    updateProductObj = async (id, obj) => {
        obj.id = id;
        const list = await this.read();

        const idx = list.findIndex((e) => e.id == id);
        if (idx < 0) return;
        list[idx] = obj;
        await this.write(list);
    }

    deleteProduct = async (id) => {
        const list = await this.getProducts();
        const idx = list.findIndex((e) => e.id == id);
        if (idx < 0) return;
        list.splice(idx, 1);
        await this.write(list);
        return list;
    }
}

async function run() {
    const nuevoProducto = new ProductManager('archivo.json');
    await nuevoProducto.addProduct('Libro Alma Mia', 'Novelas y Suspenso', 100, 'thumbnail2', 1,20)
    await nuevoProducto.addProduct('Libro IT', 'Terror', 240, 'thumbnail2', 80, 15)
    await nuevoProducto.addProduct('Libro Argentina', 'Documental', 500, 'thumbnail2', 15, 30)

    const products = await nuevoProducto.getProducts();
    console.log(products);

    console.log("\n---------------------------------------------------------------------------\n");
    console.log("\n Trato de agregar los mismos productos \n");

    await nuevoProducto.addProduct('Libro Pasion y Alma',500, 'thumbnail2', 458, 45)
    await nuevoProducto.addProduct('Libro En la oscuridad', 'Suspenso', 800, 'thumbnail2',88, 50)

    console.log("\n---------------------------------------------------------------------------\n");
    console.log(await nuevoProducto.getProducts());

    console.log("\n---------------------------------------------------------------------------\n");
    console.log("\n elimino producto: \n");

    await nuevoProducto.deleteProduct(1);

    console.log("\n---------------------------------------------------------------------------\n");
    console.log("\n actualizo producto \n");

    await nuevoProducto.updateProduct(2, { title: "La mano de dios", description: "deporte", price: 2500,thumbnail: 'thumbnail1',code: 564, stock: 3 });
    console.log(await nuevoProducto.getProductbyId(2));

    console.log("\n---------------------------------------------------------------------------\n");

    console.log(await nuevoProducto.getProductbyId(3));

    console.log("\n---------------------------------------------------------------------------\n");

    console.log(await nuevoProducto.getProducts());

    console.log("FIN");

}

run();
