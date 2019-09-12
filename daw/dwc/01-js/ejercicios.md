<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Ejercicios de Javascript](#ejercicios-de-javascript)
  - [1.- Sintaxis](#1--sintaxis)
    - [1.1 Frase](#11-frase)
  - [2.- Arrays](#2--arrays)
  - [3.- POO](#3--poo)
    - [3.1.- Productos de un almacén](#31--productos-de-un-almac%C3%A9n)
    - [3.2.- Carro de compra](#32--carro-de-compra)
  - [4.- DOM](#4--dom)
  - [5.- BOM](#5--bom)
  - [6.- Eventos](#6--eventos)
  - [7.- Objetos globales](#7--objetos-globales)
  - [8.- Ajax](#8--ajax)
  - [9.- APIs](#9--apis)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Ejercicios de Javascript

## 1.- Sintaxis
### 1.1 Frase
Vamos a pedir al usuario que introduzca una frase y a continuación mostraremos en la consola:
* el número de letras y de palabras que tiene
* la frase en mayúsculas
* la frase con la primera letra de cada palabra en mayúsculas
* la frase escrita con las letras al revés
* la frase escrita con las palabras al revés
* si es o no un palíndromo (si se lee igual al revés) pero omitiendo espacios en blanco y sin diferenciar mayúsculas y minúsculas. 

Ej.: con la frase introducida “_La ruta nos aporto otro paso natural_” se mostraría
> 36 letras y 7 palabras
> LA RUTA NOS APORTO OTRO PASO NATURAL
> La Ruta Nos Aporto Otro Paso Natural
> larutan osap orto otropa son atur aL
> natural paso otro aporto nos ruta La
> Sí es un palíndromo

Intenta usar en cada caso el bucle más adecuado. Las funciones `split` y `join` (lo opuesto) de String y Array nos pueden ayudar a algunas cosas.

**RECUERDA**:
* el código deberá estar en un fichero externo y se incluirá al final del body
* debes comentarlo para tener claro qué hace
* tanto el código JS como el HTML deben estar correctamente indentados
* ten en cuenta los datos que pueden “estropearnos” el programa: introducir un dato de un tipo que no te esperas, omitir algún parámetro, ...
* usa las recomendaciones indicadas: 'use strict', ...
* el código debe ser lo más limpio y claro posible, sin variables o código innecesario
* siempre es bueno refactorizar el código: cuando nuestro programa ya funciona bien le damos un “repaso” para mejorar su claridad (y lo volvemos a probar)

## 2.- Arrays
Vamos a hacer un programa que va pidiendo al usuario que introduzca las notas de un examen y las va guardando en un array. El usuario puede introducir una sóla nota o varias separadas por un guión (ej. 4,5 - 6 - 8,75) y se continuará pidiendo notas al usuario hasta que éste pulse 'Cancelar'. Recuerda que en Javascript el símbolo decimal es el punto pero el usuario puede introducir decimales con la coma.

Cada nota introducida se almacenará en un array y una vez que estén todas se mostrará por la consola:
* el array con los datos suministrados por el usuario
* el array "limpiado": quitaremos del mismo todo lo que no sean números o no estén entre 0 y 10
* el nº total de aprobados y sus notas
* el nº total de suspensos y sus notas
* la nota del 1º suspenso y su posición en el array
* la nota media del examen

Siempre que sea posible utilizaremos métodos de arrays en lugar de bucles.

## 3.- POO
### 3.1.- Productos de un almacén
En este ejercicio vamos a trabajar con los productos de un almacén, para lo que crearemos las clases:
* **_Product_**: cada producto será un objeto con las propiedades _cod_, _name_, _price_ y _units_ (las unidades que tenemos de ese producto). Si no le pasamos unidades al constructor su número por defecto será 1. Esta clase tendrá los siguientes métodos:
  *  **_changeUnits_**: recibe la cantidad a aumentar (positiva o negativa) e incrementa (o decrementa) las unidades en la cantidad recibida. Si se intentan restar más unidades de las que hay no hace nada y devuelve _false_ y en otro caso cambia las unidades y devuelve _true_
  * **_productImport_**: devuelve el importe total del producto (su precio multiplicado por el nº de unidades)
  * además si se intenta imprimir el producto se mostrará su descripción, sus unidades entre paréntesis, su precio y el importe total, como en el siguiente ejemplo: `TV Samsung MP45 (5): 235,95 €/u => 1179,75 €`
* **_Store_**: es el almacén de productos y tendrá las propiedades _id_ (código numérico que nos pasan al crear el almacén) y _products_ (array de productos que al crearlo estará vacío) y los métodos:
  * **_findProduct_**: recibe un código de producto y devuelve el producto que tiene dicho código o _null_ si ese código no existe en el almacén
  * **_addProduct_**: recibe como parámetro el código y unidades a añadir y, opcionalmente, el nombre y precio (si se trata de un producto nuevo) y lo añade al almacén. Si ya existe el código suma al producto las unidades indicadas y si no existe crea un nuevo producto en el array. Devuelve _true_
  * **_delProduct_**: recibe como parámetro el código y las unidades a quitar de un producto y lo resta del almacén. Devuelve _true_ a menos que haya menos unidades de las que quieren restarse, en cuyo caso no hace nada y devuelve _false_
  * **_totalImport_**: devuelve el valor total de los productos del almacén
  * **_orderByDescrip_**: devuelve el array de productos ordenado por el nombre
  * **_orderByUnits_**: devuelve el array de productos ordenado por unidades descendente

Para probar que funciona correctamente ejecutaremos en nuestro fichero main.js:
```javascript
let almacen=new Store(1);
almacen.addProduct(1, 4, 'TV Samsung MP45', 345.95);
almacen.addProduct(2, 8, 'Portátil Acer Travelmate 200', 245.95);
almacen.addProduct(3, 15, 'Impresora Epson LX-455', 45.95);
almacen.addProduct(4, 25, 'USB Kingston 16GB', 5.95);

console.log('LISTADO DEL ALMACÉN');
almacen.products.forEach(prod=>console.log(prod.toString()));

almacen.addProduct(5, 15, 'USB Kingston 64GB', 15.95);
almacen.delProduct(3, 11);
almacen.delProduct(3, 7);
almacen.addProduct(1, 9);

console.log('LISTADO DEL ALMACÉN');
almacen.products.forEach(prod=>console.log(prod.toString()));
```
Además en nuestro main.js haremos que se muestren por consola todos los productos de los que tenemos menos de 5 unidades en stock o cuyo importe es inferior a 150 €.

### 3.2.- Carro de compra
Vamos a permitir que los usuarios hagan compras on-line para lo que crearemos una clase para los carritos de la compra:
* **_Cart_**: esta clase la usaremos para crear carritos de compra con los productos a comprar. Es como la clase _Store_ pero tiene además la propiedad _user_ con el identificador del usuario que hace la compra y que nos lo pasarán al crear el carrito. Respecto a sus métodos son igual que los de la clase _Store_ pero:
    * el método _delProduct_ eliminará el producto del array de productos si sus unidades son 0
    * tendrá dos nuevos métodos **_addToCart_** y **_removeFromCart_** que nos permitan añadir y quitar productos del carro y que recibirán como parámetros el código del producto y las unidades a añadir o quitar.
    
NOTA: la variable del almacén será una variable global en el fichero main.js

## 4.- DOM
Vamos a mostrar en una tabla los products de nuestro almacén. Cada fila corresponderá a un producto y se mostrará su código, nombre, unidades, precio por unidad e importe. Debajo de la tabla mostraremos el importe total del almacén. En el fichero _index.html_ crearemos la tabla vacía y el párrafo para poner el importe total.

Para simplificar nuestro código a la clase _Product_ le añadiremos el método **_toTR_** que devolverá el código HTML para mostrar una fila con los datos del producto y a la clase _Store_ le añadiremos el método **_toHTML_** que devolverá el código HTML que insertaremos dentro de la tabla del almacén. 

Además cada vez que creemos un carrito se mostrará en la página una nueva UL con su código y su usuario. Cada artículo del carro será una LI de la UL y al final habrá una LI con el importe total del carro. Ej.:
> Carro 2 - juan
> * 1 x TV Samsung MP45 (345.95 €) = 345.95 €
> * 3 x USB Kingston 16GB (5.95 €) = 17.85 €
> * Importe total: 353.80 €

NOTA: podemos hacer algo para que sea más fácil crear los elementos del DOM tal y como hems hecho para crear la tabla???.

OPCIONAL: mejorar la presentación usando bootstrap. Pondremos la tabla del almacén y debajo los carritos, 2 por fila.

## 5.- BOM

## 6.- Eventos
Botones y enlaces para el ejercicio del almacén

## 7.- Objetos globales
Fechas, ...

## 8.- Ajax
Leer y guardar el almacén (y los carritos?)

## 9.- APIs

