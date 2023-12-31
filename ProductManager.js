// llamada al sistema de archivos

const fs = require('fs');

/****************************************************************************************
 * creacion de la clase Product Manager                                                 *
 * **************************************************************************************/

class ProductManager {
    constructor(filePath) {
        this.products = []; 
        this.path = filePath; // direccion del archivo de productos
        this.loadProducts(); // llama al método para cargar los productos al inicio
        this.nextProductId = this.getNextProductId(); // obtencion del próximo ID a generar
        
    }

// Método para cargar los productos desde el archivo al inicio

    loadProducts() {
        if (fs.existsSync(this.path)) {
            this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        } else {
            console.log('El archivo no existe. Se creará uno nuevo.');
            this.saveProducts(); // Crea el archivo si no existe
        }
    }

// Método para obtener el próximo ID

    getNextProductId() {
        if (!fs.existsSync(this.path)) {
            return 1; // Establecer el ID inicial si es la primera ejecucion y el archivo no existe
        }

        let highestId = 0;
        for (const product of this.products) {
            if (product.id > highestId) {
                highestId = product.id;
            }
        }
        return highestId + 1;
    }


// Creación del método addProduct 

    addProduct(
        title,
        description,
        price,
        thumbnail,
        code,
        stock
        ) 
        {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos los campos son obligatorios.");
            return;
        }

        const isCodeRepeated = this.products.some(product => product.code === code);

        if (isCodeRepeated) {
            console.error(`El código "${code}" ya existe en otro producto.`);
            return;
        }

        const newProduct = {
            id: this.nextProductId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        this.products.push(newProduct);
        this.saveProducts(); // Llama al método para guardar los productos en el archivo
        this.nextProductId++;
        console.log("Producto agregado correctamente:", newProduct);
    }

// creación del Método getProducts

    getProducts() {
        console.log(this.products);
        return this.products;
    }

// creación del Método getProductsById 


    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            console.log(product, "Se encontró mediante búsqueda por id");
            return product;
        } else {
            console.error(`La ID "${id}" no pudo ser encontrada`);
            return;
        }
    }

// creación del Método updateProduct


    updateProduct(id, titulo, descripcion, precio, imagen, codigo, existencia) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.error(`La ID "${id}" no pudo ser encontrada`);
            return;
        }

        // Actualiza solo los campos que se han recibido con datos
/*      if (titulo != null) {
            product.title = titulo;
        }
        if (descripcion != null) {
            product.description = descripcion;
        }
        if (precio != null) {
            product.price = precio;
        }
        if (imagen != null) {
            product.thumbnail = imagen;
        }
        if (codigo != null) {
            product.code = codigo;
        }
        if (existencia != null) {
            product.stock = existencia;
        }
*/
// product = this.products[id];

    product.title = titulo || product.title;
    product.description = descripcion || product.description;
    product.price = precio || product.price;
    product.thumbnail = imagen || product.thumbnail;
    product.code = codigo || product.code;
    product.stock = existencia || product.stock;

        this.saveProducts(); // Llama al método para guardar los productos en el archivo
        console.log(product, `Se actualizó en la id ${id}`);
        return product;
    }


// creación del Método para guardar los productos en el archivo

    saveProducts() {
        const myJSON = JSON.stringify(this.products,null,'\t');
        fs.writeFileSync(this.path, myJSON);
    }

// creación del Método deleteProduct

    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            console.error(`La ID "${id}" no pudo ser encontrada`);
            return;
        }

        this.products.splice(productIndex, 1);
        this.saveProducts(); // Llama al método para guardar los productos en el archivo
        console.log(`Producto con ID "${id}" eliminado correctamente`);
    }
}

/****************************************************************************************
 * Final de la clase Product Manager                                                    *
 * **************************************************************************************/

// creación de la instancia productManager de la clase ProductManager
  
  const productManager = new ProductManager('./productos.json');

// llamar al metodo “getProducts” y debe devolver un arreglo vacío 
  
  productManager.getProducts();
  console.log (productManager.products);
  
// agregado del producto de prueba 
  
  productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "sin imagen", "abc123", 25);
  productManager.getProducts();
  console.log (productManager.products);

// intento de agregar el mismo producto por segunda vez
  
  productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "sin imagen", "abc123", 25);
  
  
// pruebas del metodo getProductById 
  
  let productIdToFind = 1;
  let productById = productManager.getProductById(productIdToFind); 
  
  
  productIdToFind = 2; 
  productById = productManager.getProductById(productIdToFind);

// agregado de mas productos de prueba

productManager.addProduct("producto prueba 2", "Este es un producto prueba 2", 300, "sin imagen", "efd456", 50);
productManager.addProduct("producto prueba 3", "Este es un producto prueba 3", 400, "sin imagen", "jkl789", 70);
productManager.addProduct("producto prueba 4", "Este es un producto prueba 4", 500, "sin imagen", "mno147", 90);

console.table (productManager.products);

// prueba del método updateProduct

productManager.updateProduct(2,'nuevotitulo','nueva descripcion', 1000, "todavia no hay imagenes",null,500);
console.table (productManager.products);  

// prueba del método deleteProduct

productManager.deleteProduct (3); // producto debe existir
productManager.deleteProduct (7); // producto inexistente

console.table (productManager.products); 
