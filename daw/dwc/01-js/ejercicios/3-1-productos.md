# Bloc 1: Javascript. Práctica 3.1 - POO
En este ejercicio vamos a trabajar con los productos de un almacén, para lo que crearemos las clases:
- **Product**: la guardaremos en el fichero _product.class.js_. Tendrá las siguientes **propiedades**:
  - id
  - name
  - price
  - units: argumento opcional (si no le pasamos unidades al constructor su número por defecto será 0).
  
  Esta clase tendrá los siguientes **métodos**:
  - changeProduct: recibe un objeto con los datos a cambiar del producto. Las propiedades que no reciba se quedarán con los valores que tiene ahora. Al menos debe recibir la id del producto a cambiar. Devolerá el producto modificado. Si hay algún error en los datos pasados devolerá _false_.
  - productImport: devuelve el importe total del producto (su precio multiplicado por el nº de unidades)
  - además si se intenta imprimir el producto se mostrará su descripción, sus unidades entre paréntesis, su precio y el importe total (los € siempre con 2 decimales), como en el siguiente ejemplo:
```
        TV Samsung MP45: 5 uds. x 235,95 €/u = 1179.75 €
```
- **Store**: es el almacén de productos (podríamos tener más de uno) que guardaremos en _store.class.js_. Tendrá las **propiedades**:
  -  id: código numérico que nos pasan al crear el almacén
  -  products: array de productos. No se le pasa al constructor ya que al crear un almacén el array estará vacío.
  
  La clase tendrá los **métodos**:
  - findProduct: recibe una id de producto y devuelve el producto que tiene dicha id o _undefined_ si ese código no existe en el almacén
  - newProduct: recibe un objeto con los datos del producto a añadir (name, price y, opcionalmente, units; no tendrá id), crea el producto y lo añade al almacén. Devolverá el producto añadido al almacén o _false_ si no ha podido hacerse por algún motivo.   
  - delProduct: recibe como parámetro el código de un producto y lo elimina del almacén si no tiene unidades devolviendo _true_. Si sus unidades no están a 0 no hace nada y devuelve _false_.
  - changeProduct: recibe un objeto con la id de un producto y los campos a modificar (los que no estén permanecerán sin cambios). Devuelve el objeto modificado si ha podido hacerse o _false_ en caso contrario
  - totalImport: devuelve el valor total de los productos del almacén (su precio por sus uds)
  - underStock: recibe un nº de unidades y devuelve los productos que tengan menos de dichas unidades
  - orderByUnits: devuelve el array de productos ordenado por unidades de forma descendente
  - orderByName: devuelve el array de productos ordenado por el nombre del producto
  - además tendrá un método para que si se intenta imprimir el almacén devuelva HTML con la id del almacén, el nº de productos y su importe total con 2 decimales, y debajo una lista con los datos de cada producto, como en el siguiente ejemplo:
```html
<p>Almacén 1 => 2 productos: 2174,75 €</p>
<ul>
  <li>TV Samsung MP45: 5 uds. x 235,95 €/u = 1179.75 €</li>
  <li>USB Kingston 16 GB: 100 uds. x 19,95 €/u = 1995,00 €</li>
</ul>
```

Antes de añadir o modificar productos del almacén deberás asegurarte de que tienen id y nombre y de que las unidades y el precio son números y no son negativos (además las unidades deben ser un número entero).

Para probar las clases crearemos un nuevo almacén, le añadiremos productos y mostraremos por consola su contenido.

## Organizar el código
Lo correcto es no tener todo el código en un único fichero javascript sino cada cosa en su fichero correspondiente:
- **product.class.js**: la clase _Product_ con sus propiedades y métodos
- **store.class.js**: la clase _Store_ con sus propiedades y métodos
- **main.js**: el programa principal que crea el almacém, lo modifica (añade, elimina y modifica productos) y muestra por consola su contenido

En el _index.html_ habría que enlazar los 3 ficheros en el orden correcto (productos, almacén y main) para que desde _main.js_ se pueda llamar a métodos del almacén y desde _store.js_ a métodos de _Product_.

Esto ya empieza a ser incómodo así que vamos a hacer uso de _webpack_ para que se empaqueten todos nuestros ficheros en un único fichero _./dist/main.js_ que sera el que enlazaremos en el _index.html_. Puedes consultar [cómo usar webpack](../90.test.md) para hacerlo.

Para que la clase _Store_ pueda usar los métodos de _Product_ debeos hacer:
- añadir al final de _product.class.js_ el código `module.exports = Product;`
- añadir al principio de _store.class.js el código `const Product = require('./product.class');`

Lo mismo habrá que hacer para que _main.js_ pueda llamar a métodos de _Store_.
Para que la clase _Store_ pueda usar los métodos de la clase _Product_ si se encuentran en diferentes poder pasar los tests añade 

## Probar el código
En lo que te has decargado de _moodle_ tienes los test que debes pasar para comprobar tu código. Recuerda que simplemente debes hacer:
```javascript
npm run test
```

Para probar que funciona en el navegador añade al fichero _index.js_ código para:
- crear un almacén
- añadirle 4 productos:
  - 'TV Samsung MP45', 345.95 €, 3 uds. 
  - 'Ábaco de madera', 245.95 €
  - 'impresora Epson LX-455', 45.95 €
  - 'USB Kingston 16GB', 5.95 €, 50 uds.
- cambiar unidades:
  - Ábaco de madera: + 12 uds
  - TV Samsung MP45: - 5 uds
  - TV Samsung MP45: + 3 uds
- eliminar los productos TV Samsung MP45 (no debería dejarte) y impresora Epson LX-455
- mostrar por consola:
  - el almacén
  - el listado alfabético del almacén
  - el listado por unidades del almacén
  - el listado de productos con menos de 10 uds.

Al abrir la página en el navegador la consola deberá mostrar:
```
LISTADO DEL ALMACÉN alfabético
* Ábaco de madera (3): 245.95 €/u => 737.85 €
* impresora Epson LX-455 (0): 45.95 €/u => 0.00 €
* USB Kingston 16GB (40): 5.95 €/u => 238.00 €
Total: 975.85 €
LISTADO DEL ALMACÉN por existencias
* USB Kingston 16GB (40): 5.95 €/u => 238.00 €
* Ábaco de madera (3): 245.95 €/u => 737.85 €
* impresora Epson LX-455 (0): 45.95 €/u => 0.00 €
Total: 975.85 €
LISTADO DE PRODUCTOS CON POCAS EXISTENCIAS
* Ábaco de madera (3): 245.95 €/u => 737.85 €
* impresora Epson LX-455 (0): 45.95 €/u => 0.00 €
```
