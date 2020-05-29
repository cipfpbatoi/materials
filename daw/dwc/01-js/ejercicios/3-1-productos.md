# Bloc 1: Javascript. Práctica 3.1 - POO
En este ejercicio vamos a trabajar con los productos de un almacén, para lo que crearemos las clases **Product** y **Store**.

## Clase Product
La guardaremos en el fichero _product.class.js_. Tendrá las siguientes **propiedades**:
  - id
  - name
  - price
  - units: argumento opcional (si no le pasamos unidades al constructor su número por defecto será 0).
  
Esta clase tendrá los siguientes **métodos**:
  - changeUnits: recibe el número de unidades a añadir al objeto (debe ser un enterio positivo, o negativo para restar unidades). Devolerá el producto modificado. Si se intentan restar más unidades de las que hay no hará nada y generará un error.
  - productImport: devuelve el importe total del producto (su precio multiplicado por el nº de unidades)
  - además si se intenta imprimir el producto se mostrará su descripción, sus unidades entre paréntesis, su precio y el importe total (los € siempre con 2 decimales), como en el siguiente ejemplo:
```
        TV Samsung MP45: 5 uds. x 235,95 €/u = 1179.75 €
```

## Clase Store
Es el almacén de productos (podríamos tener más de uno) que guardaremos en _store.class.js_. Tendrá las **propiedades**:
  -  id: código numérico que nos pasan al crear el almacén
  -  products: array de productos. No se le pasa al constructor ya que al crear un almacén el array estará vacío.
  
La clase tendrá los **métodos**:
  - findProduct: recibe una id de producto y devuelve el producto que tiene dicha id. Si ese código no existe en el almacén generará un error
  - addProduct: recibe un objeto con los datos del producto a añadir (name, price y, opcionalmente, units; no tendrá id), crea el producto y lo añade al almacén. Si no se le pasa _units_ lo creará con 0 unidades. Devolverá el producto añadido al almacén. Generará un error si
    - no se le pasa _name_
    - no se le pasa _price_ o el precio no es un número positivo
    - se le pasa _units_ pero no es n número entero positivo
  - delProduct: recibe como parámetro la id de un producto y lo elimina del almacén si no tiene unidades devolviendo el producto eliminado. Si no existe el producto o sus unidades no están a 0 no hace nada y generará un error.
  - changeProductUnits: recibe un objeto con la id de un producto y el número de unidades a increamentar (o disminuir si el número es negativo). Devuelve el producto modificado si ha podido hacerse o generará un error en caso contrario
  - changeProduct: recibe un objeto con la id de un producto y los campos a modificar (los que no estén permanecerán sin cambios). Devuelve el objeto modificado si ha podido hacerse o genera un error en caso contrario
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
Lo correcto es no tener todo el código en un único fichero javascript sino cada cosa en su fichero correspondiente. Así que dentro de la carpeta **src/** crearemos los ficheros:
- **product.class.js**: la clase _Product_ con sus propiedades y métodos
- **store.class.js**: la clase _Store_ con sus propiedades y métodos
- **index.js**: el programa principal que crea el almacém, lo modifica (añade, elimina y modifica productos) y muestra por consola su contenido

En el _index.html_ habría que enlazar los 3 ficheros en el orden correcto (productos, almacén y index) para que desde _index.js_ se pueda llamar a métodos de _Store_ y desde _store.js_ a métodos de _Product_. Como esto ya empieza a ser incómodo vamos a hacer uso de _webpack_ para que se empaqueten todos nuestros ficheros en un único fichero que se llamará _./dist/main.js_ y sera el que enlazaremos en el _index.html_. Puedes consultar [cómo usar webpack](../12-tests.html) para hacerlo. 

En este ejercicio ya lo tienes todo configurado y lo único que tienes que hacer es instalar las dependencias (`npm install`):
- para pasar los test: `npm run test`
- para probarlo en el navegador: `npx webpack --mode=development`

Fijaos que para que la clase _Store_ pueda usar los métodos de _Product_ debemos hacer:
- añadir al final de _product.class.js_ el código `module.exports = Product;`
- añadir al principio de _store.class.js el código `const Product = require('./product.class');`

Lo mismo habrá que hacer para que _index.js_ pueda llamar a métodos de _Store_.

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
  - 'USB Kingston 16GB', 5.95 €, 45 uds.
- cambiar productos:
  - a la TV le cambiamos el precio por 325.90 y sus unidades pasarán a ser 8
  - al ábaco le sumamos 15 uds
  - a la impresora le cambiamos el precio por 55.90 y le ponemos -2 uds
  - a la TV le restamos 10 unidades
  - al ábaco le cambiamos el nombre por 'Ábaco de madera (nuevo modelo)'
- mostramos por consola el almacén
- mostramos por consola 'LISTADO DEL ALMACÉN alfabético'
- mostramos por consola el almacén ordenado alfabéticamente
- eliminamos la TV
- eliminamos la impresora
- mostramos por consola 'LISTADO DEL ALMACÉN por existencias'
- mostramos por consola el almacén ordenado por existencias
- mostramos por consola 'LISTADO DE PRODUCTOS CON POCAS EXISTENCIAS'
- mostramos por consola los productos del almacén con menos de 10 unidades

Al abrir la página en el navegador la consola deberá mostrar:
```
Almacén 1 => 4 productos: 6564.20 €
- TV Samsung MP45: 8 uds. x 325.90 €/u = 2607.20 €
- Ábaco de madera (nuevo modelo): 15 uds. x 245.95 €/u = 3689.25 €
- impresora Epson LX-455: 0 uds. x 45.95 €/u = 0.00 €
- USB Kingston 16GB: 45 uds. x 5.95 €/u = 267.75 €
LISTADO DEL ALMACÉN alfabético
- Ábaco de madera (nuevo modelo): 15 uds. x 245.95 €/u = 3689.25 €
- impresora Epson LX-455: 0 uds. x 45.95 €/u = 0.00 €
- TV Samsung MP45: 8 uds. x 325.90 €/u = 2607.20 €
- USB Kingston 16GB: 45 uds. x 5.95 €/u = 267.75 €
LISTADO DEL ALMACÉN por existencias
- USB Kingston 16GB: 45 uds. x 5.95 €/u = 267.75 €
- Ábaco de madera (nuevo modelo): 15 uds. x 245.95 €/u = 3689.25 €
- TV Samsung MP45: 8 uds. x 325.90 €/u = 2607.20 €
LISTADO DE PRODUCTOS CON POCAS EXISTENCIAS
- TV Samsung MP45: 8 uds. x 325.90 €/u = 2607.20 €
```

además de 3 mensajes de error:
- se pasan unidades negativas (-2) a _changeProduct_
- se intentan restar más unidades (10) de las que quedan (8)
- se intanta borrar el producto 1 y le quedan 8 unidades

Recuerda que siempre que vayamos a ejecutar código que pueda generar un error debemos hacerlo dentro de un `try...catch`.
