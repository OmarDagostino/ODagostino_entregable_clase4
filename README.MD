Entregable de la clase 4 de Programación back-end

DESCRIPCION DEL PROYECTO

Se codifico la clase ProductManager con las siguientes funcionalidades  

  La clase ProductManager se inicializa con un parámetro filePath, que representa la ruta del archivo donde se guardarán los datos de los productos. Al crear una instancia de ProductManager, se carga automáticamente la lista de productos desde el archivo especificado utilizando el método loadProducts.

 El Método loadProducts verifica si el archivo de productos existe en la ruta proporcionada (this.path) en cuyo caso, lee su contenido y lo carga en la propiedad this.products, que es una lista que contiene los datos de los productos. Si el archivo no existe, se crea un nuevo archivo vacío utilizando el método saveProducts.

 El Método addProduct permite agregar un nuevo producto a la lista de productos. Verifica que todos los campos necesarios (title, description, price, thumbnail, code y stock) estén presentes. Luego, comprueba si el código del producto es único y no está duplicado en otros productos. Si todo es válido, agrega el nuevo producto a la lista, incrementa this.nextProductId, y luego llama al método saveProducts para guardar los cambios en el archivo.

El Método getProducts devuelve la lista actual de productos (this.products) y la muestra por consola.

EL Método getProductById recibe un ID como parámetro y busca un producto en la lista de productos con el mismo ID. Si encuentra el producto, lo muestra por consola y lo devuelve. Si no encuentra el producto, muestra un mensaje de error y devuelve undefined.

El Método updateProduct permite actualizar un producto existente en la lista. Busca un producto en la lista con el ID proporcionado y luego actualiza solo los campos que se han recibido con datos no nulos. Después de la actualización, llama al método saveProducts para guardar los cambios en el archivo.

El Método saveProducts guarda la lista de productos (this.products) en el archivo especificado por this.path utilizando el método fs.writeFileSync.

El Método deleteProduct permite eliminar un producto de la lista de productos utilizando su ID. Busca un producto en la lista con el ID proporcionado y, si lo encuentra, lo elimina de la lista utilizando el método splice. Luego, llama al método saveProducts para guardar los cambios en el archivo.

A continuación se realizaron las pruebas de la clase ProductManager, generando la instancia productManager con el path ./productos.json (archivo que se crea y almacena los datos de la prueba), con los criterios del testing de entregable de la clase 4,  y mostrando por consola el desarrollo del mismo.

AUTOR 

Omar D'Agostino
Comisión 55565  de CoderHouse