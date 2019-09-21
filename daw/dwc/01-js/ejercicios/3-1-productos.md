# Bloc 1: Javascript. Práctica 3.1 - POO
En este ejercicio vamos a trabajar con los productos de un almacén, para lo que crearemos las clases:
- **Product**: la guardaremos en el fichero _product.class.js_. Tendrá las siguientes **propiedades**:
  - id
  - name
  - price
  - units: las unidades que tenemos de ese producto. Si no le pasamos unidades al constructor su número por defecto será 0.
  
  Esta clase tendrá los siguientes **métodos**:
  - changeUnits: recibe la cantidad  de unidades a sumar (positiva o negativa) e incrementa (o decrementa) las unidades en la cantidad recibida y devuelve true. Si se intentan restar más unidades de las que hay no hace nada y devuelve false
  - productImport: devuelve el importe total del producto (su precio multiplicado por el nº de unidades)
  - además si se intenta imprimir el producto se mostrará su descripción, sus unidades entre paréntesis, su precio y el importe total, como en el siguiente ejemplo:
```
        5 uds. x TV Samsung MP45 (235,95 €/u) = 1179.75 €
```
- **Store**: es el almacén de productos (podríamos tener más de uno) que guardaremos en _store.class.js_. Tendrá las **propiedades**:
  -  id: código numérico que nos pasan al crear el almacén
  -  products: array de productos. No se le pasa al constructor ya que al crear un almacén el array estará vacío.
  
  La clase tendrá los **métodos**:
  - findProduct: recibe un código de producto y devuelve el producto que tiene dicho código o undefined si ese código no existe en el almacén
  - addProduct: recibe un código, un nombre y un precio, crea el producto y lo añade al almacén, devolviendo true. Si ya existe un producto con ese código no hace nada y devuelve false
  - delProduct: recibe como parámetro el código de un producto y lo elimina del almacén si no tiene unidades devolviendo true. Si sus unidades no están a 0 no hace nada y devuelve false
  - changeProductUnits: recibe el código de un producto y la cantidad de unidades a cambiar (positiva o negativa) e incrementa (o decrementa) las unidades en la cantidad recibida y devuelve true. Si se intentan restar más unidades de las que hay no hace nada y devuelve false, lo mismo que si no existe el producto
  - totalImport: devuelve el valor total de los productos del almacén (su precio por sus uds)
  - underStock: recibe un nº de unidades y devuelve los productos que tengan menos de dichas unidades
  - orderByUnits: devuelve el array de productos ordenado por unidades de forma descendente
  - orderByName: devuelve el array de productos ordenado por el nombre del producto

Para poder pasar los tests añade al final cada fichero de clase un **module.exports** con la clase:
```javascript
module.exports = Product;
```

NOTA: en _store.class.js_ hay al principio una línea comentada:
```javascript
//const Product = require('./product.class');
```
Esta línea debe estar comentada para que funcione en el navegador y descomentada para pasar los tests.

Para probar que funciona en el navegador incluiremos en nuestro fichero main.js código para:
- crear un almacén
- añadirle 4 productos:
  - 1, 'TV Samsung MP45', 345.95
  - 2, 'Ábaco de madera', 245.95
  - 3, 'impresora Epson LX-455', 45.95
  - 4, 'USB Kingston 16GB', 5.95
- añadir unidades a 2 productos y quitar unidades de 1 de ellos:
  - prod 2: + 12 uds
  - prod 4: + 40 uds
  - prod 2: - 9 uds
- elimina los productos 4 (no debería dejarte) y 3
- muestra por consola:
  - listado alfabético del almacén
  - listado por unidades del almacén
  - listado de productos con menos de 10 uds.

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
