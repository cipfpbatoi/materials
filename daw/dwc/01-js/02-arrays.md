<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Arrays](#arrays)
  - [Introducción](#introducci%C3%B3n)
  - [Operaciones con Arrays](#operaciones-con-arrays)
    - [lenght](#lenght)
    - [Añadir elementos](#a%C3%B1adir-elementos)
    - [Eliminar elementos](#eliminar-elementos)
    - [splice](#splice)
    - [slice](#slice)
    - [Arrays y Strings](#arrays-y-strings)
    - [sort](#sort)
    - [Otros métodos comunes](#otros-m%C3%A9todos-comunes)
    - [Functional Programming](#functional-programming)
      - [filter](#filter)
      - [find](#find)
      - [findIndex](#findindex)
      - [every / some](#every--some)
      - [reduce](#reduce)
      - [map](#map)
      - [forEach](#foreach)
      - [includes](#includes)
      - [Array.from](#arrayfrom)
  - [Referencia vs Copia](#referencia-vs-copia)
  - [Rest y Spread](#rest-y-spread)
  - [Desestructuración de arrays](#desestructuraci%C3%B3n-de-arrays)
  - [Map](#map)
  - [Set](#set)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Arrays

## Introducción
Son un tipo de objeto y no tienen tamaño fijo sino que podemos añadirle elementos en cualquier momento. 

Podemos crearlos como instancias del objeto Array:
```javascript
let a=new Array();        // a = []
let b=new Array(2,4,6);   // b = [2, 4, 6]
```
o mejor aún usando notación JSON (recomendado):
```javascript
let a=[];
let b=[2,4,6);
```

Sus elementos pueden ser de cualquier tipo, incluso podemos tener elementos de tipos distintos en un mismo array. Si no está definido un elemento su valor será _undefined_. Ej.:
```javascript
let a=['Lunes', 'Martes', 2, 4, 6];
console.log(a[0]);  // imprime 'Lunes'
console.log(a[4]);  // imprime 6
a[7]='Juan';        // ahora a=['Lunes', 'Martes', 2, 4, 6, , , 'Juan']
console.log(a[7]);  // imprime 'Juan'
console.log(a[6]);  // imprime undefined
```

## Operaciones con Arrays
Vamos a ver los principales métodos y propiedades de los arrays.

### lenght
Esta propiedad devuelve la longitud de un array: 
```javascript
let a=['Lunes', 'Martes', 2, 4, 6];
console.log(a.length);  // imprime 5
```
Podemos reducir el tamaño de un array cambiando esta propiedad:
```javascript
a.length=3;  // ahora a=['Lunes', 'Martes', 2]
```

### Añadir elementos
Podemos añadir elementos al final de un array con `push` o al principio con `unshift`:
```javascript
let a=['Lunes', 'Martes', 2, 4, 6];
a.push('Juan');   // ahora a=['Lunes', 'Martes', 2, 4, 6, 'Juan']
a.unshift(7);     // ahora a=[7, 'Lunes', 'Martes', 2, 4, 6, 'Juan']
```

### Eliminar elementos
Podemos borrar el elemento del final de un array con `pop` o el del principio con `shift`. Ambos métodos devuelven el elemento que hemos borrado:
```javascript
let a=['Lunes', 'Martes', 2, 4, 6];
let ultimo=a.pop();         // ahora a=['Lunes', 'Martes', 2, 4] y ultimo=6
let primero=a.shift();      // ahora a=['Martes', 2, 4] y primero='Lunes'
```

### [splice](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/splice)
Permite eliminar elementos de cualquier posición del array y/o insertar otros en su lugar. Devuelve un array con los elementps eliminados. Sintaxis:
```javascript
Array.splice(posicion, num. de elementos a eliminar, 1º elemento a insertar, 2º elemento a insertar, 3º...)
```
Ejemplo:
```javascript
let a=['Lunes', 'Martes', 2, 4, 6];
let borrado=a.splice(1, 3);       // ahora a=['Lunes', 6] y borrado=['Martes', 2, 4];
a=['Lunes', 'Martes', 2, 4, 6];
borrado=a.splice(1, 0, 45, 56);   // ahora a=['Lunes', 45, 56, 'Martes', 2, 4, 6] y borrado=[];
a=['Lunes', 'Martes', 2, 4, 6];
borrado=a.splice(1, 3, 45, 56);   // ahora a=['Lunes', 45, 56, 6] y borrado=['Martes', 2, 4];
```

### slice
Devuelve un subarray con los elementos indicados pero sin modificar el array original. Sintaxis:
```javascript
Array.slice(posicion, num. de elementos a devolver)
```
Ejemplo:
```javascript
let a=['Lunes', 'Martes', 2, 4, 6];
let borrado=a.slice(1, 3);       // ahora a=['Lunes', 'Martes', 2, 4, 6] y borrado=['Martes', 2, 4];
```

Es muy útil para hacer una copia de un array:
```javascript
let a=[2, 4, 6];
let copiaDeA=a.slice();       // ahora ambos arrays contienen lo mismo pero son diferentes
```

### Arrays y Strings
Cada objeto (y los arrays son un tipo de objeto) tienen definido el método `.toString()` que lo convierte en una cadena. Este método es llamado automáticamente cuando, por ejemplo, queremos mostrar un array por la consola. En realidad `console.log(a)` ejecuta `console.log(a.toString())`. En el caso de los arrays esta función devuelve una cadena con los elementos del array dentro de corchetes y separados por coma.

Además podemos convertir los elementos de un array a una cadena con `.join()` especificando el carácter separador de los elementos. Ej.:
```javascript
let a=['Lunes', 'Martes', 2, 4, 6];
let cadena=a.join('-');       // cadena='Lunes-Martes-2-4-6'
```

Este método es el contrario del m `.split()` que convierte una cadena en un array. Ej.:
```javascript
let notas='5-3.9-6-9.75-7.5-3';
let arrayNotas=notas.split('-');        // arrayNotas=[5, 3.9, 6, 9.75, 7.5, 3]
let cadena='Que tal estás';
let arrayPalabras=cadena.split(' ');    // arrayPalabras=['Que`, 'tal', 'estás']
let arrayLetras=cadena.split('');       // arrayLetras=['Q','u','e`,' ','t',a',l',' ','e',s',t',á',s']
```

### sort
Ordena **alfabéticamente** los elementos del array
```javascript
let a=['hola','adios','Bien','Mal',2,5,13,45]
let b=a.sort();       // b=[13, 2, 45, 5, "Bien", "Mal", "adios", "hola"]
```
> También podemos pasarle una función que le indique cómo ordenar que devolverá un valor negativo si el primer elemento es mayor, positivo si es mayor el segundo o 0 si son iguales.
> Ejemplo: ordenar un array de cadenas sin tener en cuenta si son mayúsculas o minúsculas:
```javascript
let a=['hola','adios','Bien','Mal']
let b=a.sort(function(elem1, elem2) {
  if (elem1.toLocaleLowerCase > elem2.toLocaleLowerCase)
    return -1
  if (elem1.toLocaleLowerCase < elem2.toLocaleLowerCase)
    return 1
  return 0
});       // b=["adios", "Bien", "hola", "Mal"]
```
> Como más se utiliza esta función es para ordenar arrays de objetos. Por ejemplo si tenemos un objeto _persona_ con los campos _nombre_ y _edad_, para ordenar un array de objetos persona por su edad haremos:
```javascript
let personasOrdenado=personas.sort(function(persona1, persona2) {
  return persona1.edad-persona2.edad;
});
```
> Usando _arrow functions_ quedaría más sencillo:
```javascript
let personasOrdenado=personas.sort((persona1, persona2) => persona1.edad-persona2.edad);
```
> Si lo que queremos es ordenar por n campo de texto podemos usar la función _toLocaleCompare_:
```javascript
let personasOrdenado=personas.sort((persona1, persona2) => persona1.nombre.toLocaleCompare(persona2.nombre));
```

### Otros métodos comunes
Otros métodos que se usan a menudo con arrays son:
* `.concat()`: concatena arrays
```javascript
let a=[2, 4, 6];
let b=['a', 'b', 'c'];
let c=a.concat(b);       // c=[2, 4, 6, 'a', 'b', 'c']
```
* `.reverse()`: invierte el orden de los elementos del array
```javascript
let a=[2, 4, 6];
let b=a.reverse();       // b=[6, 4, 2]
```
* `.indexOf()`: devuelve la primera posición del elemento pasado como parámetro o -1 si no se encuentra en el array
* `.lastIndexOf()`: devuelve la última posición del elemento pasado como parámetro o -1 si no se encuentra en el array

### Functional Programming
Desde la versión 5.1 javascript incorpora métodos de FP en el lenguaje, especialmente para trabajar con arrays:

#### filter
Devuelve un nuevo array con los elementos que cumplen determinada condición del array al que se aplica. Su parámetro es una función, habitualmente anónima, que va interactuando con los elementos del array. Esta función recibe como primer parámetro el elemento actual, como segundo parámetro su índice y como tercer parámetro el array completo y devuelve **true** para los elementos que se incluirán en el array a devolver y **false** para el resto.

Ejemplo: dado un array con todas devolver un array con las notas de los aprobados:
```javascript
let arrayNotas=[5, 3.9, 6, 9.75, 7.5, 3];
let aprobados=arrayNotas.filter(function(nota) {
  return nota>=5;
});       // aprobados=[5, 6, 9.75, 7.5]
```
Usando funciones lambda la sintaxis queda mucho más simple:
```javascript
let arrayNotas=[5, 3.9, 6, 9.75, 7.5, 3];
let aprobados=arrayNotas.filter(nota => nota>=5);
```

#### find
Como _filter_ pero devuelve el primer elemento que cumpla la condición (o _undefined_ si no la cumple nadie). Ejemlplo:
let todosAprobados=arrayNotas.every(nota => nota>=5);   // false
```javascript
let arrayNotas=[5, 3.9, 6, 9.75, 7.5, 3];
let primerAprobado=arrayNotas.find(nota => nota>=5);    // primerAprobado=5
```
#### findIndex
Como _find_ pero en vez de devolver el elemento devuelve su posición (o -1 si nadie cumple la condición). En el ejemplo anterior el valor devuelto sería 0 (ya que el primer elemento cumple la condición).

#### every / some
La primera devuelve **true** si TODOS los elementos del array cumplen la condición y **false** en caso contrario. La segunda
devuelve **true** si ALGÚN elemento del array cumple la condición. Ejemplo:
```javascript
let arrayNotas=[5, 3.9, 6, 9.75, 7.5, 3];
let todosAprobados=arrayNotas.every(nota => nota>=5);   // false
let algunAprobado=arrayNotas.some(nota => nota>=5);     // true
```

#### reduce
Devuelve un valor calculado a partir de los elementos del array. En este caso la función recibe como primer parámetro el valor calculado hasta ahora y el método tiene como 1º parámetro la función y como 2º parámetro al valor calculado inicial (si no se indica será el primer alemento del array).

Ejemplo: queremos obtener la suma de las notas:
```javascript
let arrayNotas=[5, 3.9, 6, 9.75, 7.5, 3];
let total=arrayNotas.reduce((total,nota) => total+=nota, 0);    // total=35.15
// podríamos haber omitido el valor inicial 0 para total
let total=arrayNotas.reduce((total,nota) => total+=nota);    // total=35.15
```
Ejemplo: queremos obtener la nota más alta:
```javascript
let arrayNotas=[5, 3.9, 6, 9.75, 7.5, 3];
let maxNota=arrayNotas.reduce((max,nota) => nota>max?nota:max);    // max=9.75
```

#### map
Permite modificar cada elemento de un array y devuelve un nuevo array con los elementos del original modificados. Ejemplo: queremos subir un 10% cada nota:
```javascript
let arrayNotas=[5, 3.9, 6, 9.75, 7.5, 3];
let arrayNotasSubidas=arrayNotas.map(nota => nota+nota*10%);
```

#### forEach
Es el método más general de los que hemos visto. No devuelve nada sino que permite realizar algo con cada elemento del array.
```javascript
let arrayNotas=[5, 3.9, 6, 9.75, 7.5, 3];
arrayNotas.foreach((nota, indice) => {
  console.log('El elemento de la posición '+indice+' es: '+nota);
});
```

#### includes
Devuelve **true** si el array incluye el elemento pasado como parámetro. Ejemplo:
```javascript
let arrayNotas=[5, 3.9, 6, 9.75, 7.5, 3];
arrayNotas.includes(7.5);     // true
```

#### Array.from
Devuelve un array a partir de otro al que aplica una función de transformación (es similar a _map_). Ejemplo: queremos subir un 10% cada nota:
```javascript
let arrayNotas=[5, 3.9, 6, 9.75, 7.5, 3];
let arrayNotasSubidas=Array.from(arrayNotas, nota => nota+nota*10%);
```
Se utiliza mucho para convertir colecciones en arrays y así poder usar los métodos de arrays que hemos visto. Por ejemplo si queremos mostrar por consola cada párrafo de la página que comience por la palabra 'NOTA:' en primer lugar obtenemos todos los párrafos con:
```javascript
let parrafos=document.getElementsByTagName('p');
```
Esto nos devuelve una colección con todos los párrafos de la página (lo veremos más adelante al ver DOM). Podríamos hacer un **for** para recorrer la colección y mirar los que empiecen por lo indicado pero no podemos aplicarle los métodos vistos aquí porque son sólo para arrays así que hacemos:
```javascript
let arrayParrafos=Array.from(parrafos);
// y ya podemos usar los métodos que queramos:
arrayParrafos.filter(parrafo => parrafo.startsWith('NOTA:').forEach(parrafo => console.log(parrafo));
```

## Referencia vs Copia
Cuando copiamos una variable de tipo _boolean_, _string_ o _number_ o se pasa como parámetro a una función se hace una copia de la misma y si se modifica la variable original no es modificada. Ej.:
```javascript
let a=54;
let b=a;      // a=54; b=54
b=86;         // a=54; b=86
```
Sin embargo al copiar objetos (y los arrays son un tipo de objeto) la nueva variable apunta a la misma posición de memoria que la antigua por lo que los datos de ambas son los mismos:
```javascript
let a=[54, 23, 12];
let b=a;      // a=[54, 23, 12]; b=[54, 23, 12]
b[0]=3;       // a=[3, 23, 12]; b=[3, 23, 12]
let fecha1=new Date('2018-09-23');
let fecha2=fecha1;          // fecha1='2018-09-23';   fecha2='2018-09-23';
fecha2.setFullYear(1999);   // fecha1='1999-09-23';   fecha2='1999-09-23';
```

Si queremos obtener una copia de un array que sea independiente del original podemos obtenerla con `slice`:
```javascript
let a=[2, 4, 6];
let copiaDeA=a.slice();       // ahora ambos arrays contienen lo mismo pero son diferentes
```

En el caso de objetos es algo más complejo. ES6 incluye [`Object assing`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) que hace una copia de un objeto:
```javascript
let a={id:2, name: 'object 2'};
let copiaDeA=Object.assign({}, a);       // ahora ambos objetos contienen lo mismo pero son diferentes
```

Sin embargo si el objeto tiene como propiedades otros objetos estos se continúan pasando por referencia. Es ese caso lo más sencillo sería hacer:
```javascript
let a={id:2, name: 'object 2', address: {street: 'C/ Ajo', num: 3} };
let copiaDeA=JSON.parse(JSON.stringify(a));       // ahora ambos objetos contienen lo mismo pero son diferentes
```

## Rest y Spread
Permiten extraer a parámetros los elementos de un array o string (_spread_) o convertir en un array un grupo de parámetros (_rest_). El operador de ambos es **...** (3 puntos).

Para usar _rest_ como parámetro de una función debe ser siempre el último parámetro:
```javascript
function notaMedia(...notas) {
  let total=notas.reduce((total,nota) => total+=nota);
  return total/notas.length;
}

console.log(notaMedia(5, 3.9, 6, 9.75, 7.5, 3));    // le pasamos un número variable de parámetros
```
Si lo que queremos es convertir un array en un grupo de elementos haremos _spread_. Por ejemplo el objeto _Math_ porporciona métodos para trabajar con números como _.max_ que devuelve el máximo de los números pasados como parámetro. Para saber la nota máxima en vez de _.reduce_ como hicimos en el ejemplo anterior podemos hacer:
```javascript
let arrayNotas=[5, 3.9, 6, 9.75, 7.5, 3];
let maxNota=Math.max(...arrayNotas);    // maxNota=9.75
// hacemos Math.max(arrayNotas) devuelve NaN porque arrayNotas es un array y no un número
```

## Desestructuración de arrays
Similar a _rest_ y _spread_, permiten extraer los elementos del array directamente a variables y viceversa. Ejemplo:
```javascript
let arrayNotas=[5, 3.9, 6, 9.75, 7.5, 3];
let [primera, segunda, tercera]=arrayNotas;   // primera=5, segunda=3.9, tercera=6
let [primera, , , cuarta]=arrayNotas;         // primera=5, cuarta=9.75
let [primera, ...resto]=arrayNotas;           // primera=5, resto=[3.9, 6, 9.75, 3]
```
También se pueden asignar valores por defecto:
```javascript
let preferencias=['Javascript', 'NodeJS'];
let [lenguaje, backend='Laravel', frontend='VueJS'];  // lenguaje='Javascript', backend='NodeJS', frontend='VueJS'
```

## Map
Es una colección de parejas de \[clave,valor]. Un objeto en Javascript es un tipo particular de _Map_ en que las claves sólo pueden ser texto o números. Se puede acceder a una propiedad con **.** o **\[propiedad]**. Ejemplo:
```javascript
let persona={
  nombre='John',
  apellido='Doe',
  edad=39
}
console.log(persona.nombre);      // John
console.log(persona['nombre']);   // John
```
Un _Map_ permite que la clave sea cualquier cosa (array, objeto, ...). No vamos a ver en profundidad estos objetos pero podéis saber más en [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) o cualwuier otra página. 

## Set
Es cono un _Map_ pero que no almacena los vaores sino sólo la clave. Podemos verlo como una colección que no permite duplicados. Tiene la propiedad **size** que devuelve su tamaño y los métodos **.add** (añade un elemento), **.delete** (lo elimina) o **.has** (indica si el elemento pasado se encuentra o no en la colección) y también podemos recorrerlo con **.forEach**.

Una forma sencilla de eliminar los duplicados de un array es crear con él un _Set_:
```javascript
let ganadores=['Márquez', 'Rossi', 'Márquez', 'Lorenzo', 'Rossi', 'Márquez', 'Márquez'];
let ganadoresNoDuplicados=new Set(ganadores);    // {'Márquez, 'Rossi', 'Lorenzo'}
// o si lo queremos en un array:
let ganadoresNoDuplicados=Array.from(new Set(ganadores));    // ['Márquez, 'Rossi', 'Lorenzo']
```
