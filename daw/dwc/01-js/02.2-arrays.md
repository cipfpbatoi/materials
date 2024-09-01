# Arrays
- [Arrays](#arrays)
  - [Introducción](#introducción)
    - [Arrays de objetos](#arrays-de-objetos)
  - [Operaciones con Arrays](#operaciones-con-arrays)
    - [length](#length)
    - [Añadir elementos](#añadir-elementos)
    - [Eliminar elementos](#eliminar-elementos)
    - [splice](#splice)
    - [slice](#slice)
    - [Arrays y Strings](#arrays-y-strings)
    - [sort](#sort)
    - [Otros métodos comunes](#otros-métodos-comunes)
  - [Functional Programming](#functional-programming)
    - [filter](#filter)
    - [find](#find)
    - [findIndex](#findindex)
    - [every / some](#every--some)
    - [map](#map)
    - [reduce](#reduce)
    - [forEach](#foreach)
    - [includes](#includes)
    - [Array.from](#arrayfrom)
  - [Rest y Spread](#rest-y-spread)
  - [Desestructuración de arrays](#desestructuración-de-arrays)
  - [Copia de arrays](#copia-de-arrays)
  - [Map](#map-1)
  - [Set](#set)

## Introducción
Son un tipo de objeto y no tienen tamaño fijo sino que podemos añadirle elementos en cualquier momento. 

Se recomienda crearlos usando notación JSON:
```javascript
const a = []
const b = [2,4,6]
```

aunque también podemos crearlos como instancias del objeto Array (NO recomendado):
```javascript
const a = new Array()        // a = []
const b = new Array(2,4,6)   // b = [2, 4, 6]
```

Sus elementos pueden ser de cualquier tipo, incluso podemos tener elementos de tipos distintos en un mismo array. Si no está definido un elemento su valor será _undefined_. Ej.:
```javascript
const a = ['Lunes', 'Martes', 2, 4, 6]
console.log(a[0])  // imprime 'Lunes'
console.log(a[4])  // imprime 6
a[7] = 'Juan'        // ahora a = ['Lunes', 'Martes', 2, 4, 6, , , 'Juan']
console.log(a[7])  // imprime 'Juan'
console.log(a[6])  // imprime undefined
console.log(a[10])  // imprime undefined
```

Acceder a un elemento de un array que no existe no provoca un error (devuelve _undefined_) pero sí lo provoca acceder a un elemento de algo que no es un array. Con ES2020 (ES11) se ha incluido el operador **?.** para evitar tener que comprobar nosotros que sea un array:
```javascript
console.log(alumnos?.[0])
// si alumnos es un array muestra el valor de su primer
// elemento y si no muestra undefined pero no lanza un error
```

### Arrays de objetos
Es habitual almacenar datos en arrays en forma de objetos, por ejemplo:
```javascript
const alumnos = [
  {
    id: 1,
    name: 'Marc Peris',
    course: '2nDAW',
    age: 21
  },
  {
    id: 2,
    name: 'Júlia Tortosa',
    course: '2nDAW',
    age: 23
  },
]
```

## Operaciones con Arrays
Vamos a ver los principales métodos y propiedades de los arrays.

### length
Esta propiedad devuelve la longitud de un array: 
```javascript
const a = ['Lunes', 'Martes', 2, 4, 6]
console.log(a.length)  // imprime 5
```
Podemos reducir el tamaño de un array cambiando esta propiedad, aunque es una forma poco clara de hacerlo:
```javascript
a.length = 3  // ahora a = ['Lunes', 'Martes', 2]
```

### Añadir elementos
Podemos añadir elementos al final de un array con `push` o al principio con `unshift`:
```javascript
const a = ['Lunes', 'Martes', 2, 4, 6]
a.push('Juan')   // ahora a = ['Lunes', 'Martes', 2, 4, 6, 'Juan']
a.unshift(7)     // ahora a = [7, 'Lunes', 'Martes', 2, 4, 6, 'Juan']
```

### Eliminar elementos
Podemos borrar el elemento del final de un array con `pop` o el del principio con `shift`. Ambos métodos devuelven el elemento que hemos borrado:
```javascript
const a = ['Lunes', 'Martes', 2, 4, 6]
const ultimo = a.pop()         // ahora a = ['Lunes', 'Martes', 2, 4] y ultimo = 6
const primero = a.shift()      // ahora a = ['Martes', 2, 4] y primero = 'Lunes'
```

### [splice](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/splice)
Permite eliminar elementos de cualquier posición del array y/o insertar otros en su lugar. Devuelve un array con los elementos eliminados. Sintaxis:
```javascript
Array.splice(posicion, num. de elementos a eliminar, 1º elemento a insertar, 2º elemento a insertar, 3º...)
```
Ejemplo:
```javascript
let a = ['Lunes', 'Martes', 2, 4, 6]
let borrado = a.splice(1, 3)       // ahora a = ['Lunes', 6] y borrado = ['Martes', 2, 4]
a = ['Lunes', 'Martes', 2, 4, 6]
borrado = a.splice(1, 0, 45, 56)   // ahora a = ['Lunes', 45, 56, 'Martes', 2, 4, 6] y borrado = []
a = ['Lunes', 'Martes', 2, 4, 6]
borrado = a.splice(1, 3, 45, 56)   // ahora a = ['Lunes', 45, 56, 6] y borrado = ['Martes', 2, 4]
```

> EJERCICIO: Guarda en un array la lista de la compra con Peras, Manzanas, Kiwis, Plátanos y Mandarinas. Haz los siguiente con splice:
> - Elimina las manzanas (debe quedar Peras, Kiwis, Plátanos y Mandarinas)
> - Añade detrás de los Plátanos Naranjas y Sandía (debe quedar Peras, Kiwis, Plátanos, Naranjas, Sandía y Mandarinas)
> - Quita los Kiwis y pon en su lugar Cerezas y Nísperos (debe quedar Peras, Cerezas, Nísperos, Plátanos, Naranjas, Sandía y Mandarinas)

### slice
Devuelve un subarray con los elementos indicados pero sin modificar el array original (sería como hacer un `substr` pero de un array en vez de una cadena). Sintaxis:
```javascript
Array.slice(posicion, num. de elementos a devolver)
```

Ejemplo:
```javascript
const a = ['Lunes', 'Martes', 2, 4, 6]
const subArray = a.slice(1, 3)       // ahora a = ['Lunes', 'Martes', 2, 4, 6] y subArray = ['Martes', 2, 4]
```

Es muy útil para hacer una copia de un array:
```javascript
const a = [2, 4, 6]
const copiaDeA = a.slice()       // ahora ambos arrays contienen lo mismo pero son diferentes arrays
```

### Arrays y Strings
Cada objeto (y los arrays son un tipo de objeto) tienen definido el método `.toString()` que lo convierte en una cadena. Este método es llamado automáticamente cuando, por ejemplo, queremos mostrar un array por la consola. En realidad `console.log(a)` ejecuta `console.log(a.toString())`. En el caso de los arrays esta función devuelve una cadena con los elementos del array dentro de corchetes y separados por coma.

Además podemos convertir los elementos de un array a una cadena con `.join()` especificando el carácter separador de los elementos. Ej.:
```javascript
const a = ['Lunes', 'Martes', 2, 4, 6]
const cadena = a.join('-')       // cadena = 'Lunes-Martes-2-4-6'
```

Este método es el contrario del m `.split()` que convierte una cadena en un array. Ej.:
```javascript
const notas = '5-3.9-6-9.75-7.5-3'
const arrayNotas = notas.split('-')        // arrayNotas = [5, 3.9, 6, 9.75, 7.5, 3]
const cadena = 'Que tal estás'
const arrayPalabras = cadena.split(' ')    // arrayPalabras = ['Que`, 'tal', 'estás']
const arrayLetras = cadena.split('')       // arrayLetras = ['Q','u','e`,' ','t',a',l',' ','e',s',t',á',s']
```

### sort
Ordena **alfabéticamente** los elementos del array. Cambia el array además de devolverlo. Ejemplo:
```javascript
let a = ['hola','adios','Bien','Mal',2,5,13,45]
let b = a.sort()       // b = [13, 2, 45, 5, "Bien", "Mal", "adios", "hola"], pero a también queda ordenado
```
También podemos pasarle una función que le indique cómo ordenar, que devolverá un valor negativo si el primer elemento es mayor, positivo si es mayor el segundo o 0 si son iguales. Ejemplo: ordenar un array de cadenas sin tener en cuenta si son mayúsculas o minúsculas:
```javascript
let a = ['hola','adios','Bien','Mal']
let b = a.sort(function(elem1, elem2) {
  if (elem1.toLocaleLowerCase > elem2.toLocaleLowerCase)
    return -1
  if (elem1.toLocaleLowerCase < elem2.toLocaleLowerCase)
    return 1
  return 0
})       // b = ["adios", "Bien", "hola", "Mal"]
```

Como más se utiliza esta función es para ordenar arrays de objetos. Por ejemplo si tenemos un objeto _alumno_ con los campos _name_ y _age_, para ordenar un array de objetos _alumno_ por su edad haremos:
```javascript
let alumnosOrdenado = alumnos.sort(function(alumno1, alumno2) {
  return alumno1.age - alumno2.age
})
```

Usando _arrow functions_ quedaría más sencillo:
```javascript
let alumnosOrdenado = alumnos.sort((alumno1, alumno2)  => alumno1.age - alumno2.age)
```

Si que queremos ordenar por un campo de texto en vez de numérico debemos usar la función _toLocaleCompare_:
```javascript
let alumnosOrdenado = alumnos.sort((alumno1, alumno2)  => alumno1.name.localeCompare(alumno2.name))
```

> EJERCICIO: Haz una función que ordene las notas de un array pasado como parámetro. Si le pasamos [4,8,3,10,5] debe devolver [3,4,5,8,10]. Pruébalo en la consola

### Otros métodos comunes
Otros métodos que se usan a menudo con arrays son:
* `.concat()`: concatena arrays
```javascript
let a = [2, 4, 6]
let b = ['a', 'b', 'c']
let c = a.concat(b)       // c = [2, 4, 6, 'a', 'b', 'c']
```
* `.reverse()`: invierte el orden de los elementos del array
```javascript
let a = [2, 4, 6]
let b = a.reverse()       // b = [6, 4, 2]
```
* `.indexOf()`: devuelve la primera posición del elemento pasado como parámetro o -1 si no se encuentra en el array
* `.lastIndexOf()`: devuelve la última posición del elemento pasado como parámetro o -1 si no se encuentra en el array

## Functional Programming
Se trata de un paradigma de programación (una forma de programar) donde se intenta que el código se centre más en qué debe hacer una función que en cómo debe hacerlo. El ejemplo más claro es que intenta evitar los bucles _for_ y _while_ sobre arrays o  listas de elementos. Normalmente cuando hacemos un bucle es para recorrer la lista y realizar alguna acción con cada uno de sus elementos. Lo que hace _functional programing_ es que a la función que debe hacer eso se le pasa como parámetro la función que debe aplicarse a cada elemento de la lista.

Desde la versión 5.1 javascript incorpora métodos de _functional programing_ en el lenguaje, especialmente para trabajar con arrays:

### filter
Devuelve un nuevo array con los elementos que cumplen determinada condición del array al que se aplica. Su parámetro es una función, habitualmente anónima, que va interactuando con los elementos del array. Esta función recibe como primer parámetro el elemento actual del array (sobre el que debe actuar). Opcionalmente puede tener como segundo parámetro su índice y como tercer parámetro el array completo. La función debe devolver **true** para los elementos que se incluirán en el array a devolver como resultado y **false** para el resto.

Ejemplo: dado un array con notas devolver un array con las notas de los aprobados. Esto usando programación _imperativa_ (la que se centra en _cómo se deben hacer las cosas_) sería algo como:
```javascript
const arrayNotas = [5.2, 3.9, 6, 9.75, 7.5, 3]
const aprobados = []
for (let i = 0 i++ i < arrayNotas.length) {
  let nota = arrayNotas[i]
  if (nota > =  5) {
    aprobados.push(nota)
  } 
}       // aprobados = [5.2, 6, 9.75, 7.5]
```

Usando _functional programming_ (la que se centra en _qué resultado queremos obtener_) sería:
```javascript
const arrayNotas = [5.2, 3.9, 6, 9.75, 7.5, 3]
const aprobados = arrayNotas.filter(function(nota) {
  if (nota > =  5) {
    return true
  } else {
    return false
  } 
})       // aprobados = [5.2, 6, 9.75, 7.5]
```

Podemos refactorizar esta función para que sea más compacta:
```javascript
const arrayNotas = [5.2, 3.9, 6, 9.75, 7.5, 3]
const aprobados = arrayNotas.filter(function(nota) {
  return nota > =  5     // nota > =  5 se evalúa a 'true' si es cierto o 'false' si no lo es
})
```

Y usando funciones lambda la sintaxis queda mucho más simple:
```javascript
const arrayNotas = [5.2, 3.9, 6, 9.75, 7.5, 3]
const aprobados = arrayNotas.filter(nota  => nota > =  5)
```

Las 7 líneas del código usando programación _imperativa_ quedan reducidas a sólo una.

> EJERCICIO: Dado un array con los días de la semana obtén todos los días que empiezan por 'M'

### find
Como _filter_ pero NO devuelve un **array** sino el primer **elemento** que cumpla la condición (o _undefined_ si no la cumple nadie). Ejemplo:
```javascript
const arrayNotas = [5.2, 3.9, 6, 9.75, 7.5, 3]
const primerAprobado = arrayNotas.find(nota  => nota > =  5)    // primerAprobado = 5.2
```

Este método tiene más sentido con objetos. Por ejemplo, si queremos encontrar la persona con DNI '21345678Z' dentro de un array llamado personas cuyos elementos son objetos con un campo 'dni' haremos:
```javascript
const personaBuscada = personas.find(persona  => persona.dni = = = '21345678Z')    // devolverá el objeto completo
```

> EJERCICIO: Dado un array con los días de la semana obtén el primer día que empieza por 'M'

### findIndex
Como _find_ pero en vez de devolver el elemento devuelve su posición (o -1 si nadie cumple la condición). En el ejemplo anterior el valor devuelto sería 0 (ya que el primer elemento cumple la condición). Al igual que el anterior tiene más sentido con arrays de objetos.

> EJERCICIO: Dado un array con los días de la semana obtén la posición en el array del primer día que empieza por 'M'

### every / some
La primera devuelve **true** si **TODOS** los elementos del array cumplen la condición y **false** en caso contrario. La segunda devuelve **true** si **ALGÚN** elemento del array cumple la condición. Ejemplo:
```javascript
const arrayNotas = [5.2, 3.9, 6, 9.75, 7.5, 3]
const todosAprobados = arrayNotas.every(nota  => nota > =  5)   // false
const algunAprobado = arrayNotas.some(nota  => nota > =  5)     // true
```

> EJERCICIO: Dado un array con los días de la semana indica si algún día empieza por 'S'. Dado un array con los días de la semana indica si todos los días acaban por 's'

### map
Permite modificar cada elemento de un array y devuelve un nuevo array con los elementos del original modificados. Ejemplo: queremos subir un 10% cada nota:
```javascript
const arrayNotas = [5.2, 3.9, 6, 9.75, 7.5, 3]
const arrayNotasSubidas = arrayNotas.map(nota  => nota + nota * 10%)
```

> EJERCICIO: Dado un array con los días de la semana devuelve otro array con los días en mayúsculas

### reduce
Devuelve un valor calculado a partir de los elementos del array. En este caso la función recibe como primer parámetro el valor calculado hasta ahora y el método tiene como 1º parámetro la función y como 2º parámetro al valor calculado inicial (si no se indica será el primer elemento del array).

Ejemplo: queremos obtener la suma de las notas:
```javascript
const arrayNotas = [5.2, 3.9, 6, 9.75, 7.5, 3]
const sumaNotas = arrayNotas.reduce((total,nota)  => total + =  nota, 0)    // total = 35.35
// podríamos haber omitido el valor inicial 0 para total
const sumaNotas = arrayNotas.reduce((total,nota)  => total + =  nota)    // total = 35.35
```

Ejemplo: queremos obtener la nota más alta:
```javascript
const arrayNotas = [5.2, 3.9, 6, 9.75, 7.5, 3]
const maxNota = arrayNotas.reduce((max,nota)  => nota > max ? nota : max)    // max = 9.75
```

En el siguiente ejemplo gráfico tenemos un "array" de verduras al que le aplicamos una función _map_ para que las corte y al resultado le aplicamos un _reduce_ para que obtenga un valor (el sandwich) con todas ellas:

![Functional Programming Sandwich](https://miro.medium.com/max/1268/1*re1sGlEEm1C95_Luq3cJbw.png)

> EJERCICIO: Dado el array de notas anterior devuelve la nota media

### forEach
Es el método más general de los que hemos visto. No devuelve nada sino que permite realizar algo con cada elemento del array.
```javascript
const arrayNotas = [5.2, 3.9, 6, 9.75, 7.5, 3]
arrayNotas.forEach((nota, indice)  => {
  console.log('El elemento de la posición ' + indice + ' es: ' + nota)
})
```

### includes
Devuelve **true** si el array incluye el elemento pasado como parámetro. Ejemplo:
```javascript
const arrayNotas = [5.2, 3.9, 6, 9.75, 7.5, 3]
arrayNotas.includes(7.5)     // true
```

> EJERCICIO: Dado un array con los días de la semana indica si algún día es el 'Martes'

### Array.from
Devuelve un array a partir de otro al que se puede aplicar una función de transformación (es similar a _map_). Ejemplo: queremos subir un 10% cada nota:
```javascript
const arrayNotas = [5.2, 3.9, 6, 9.75, 7.5, 3]
const arrayNotasSubidas = Array.from(arrayNotas, nota  => nota + nota * 10%)
```

Puede usarse para hacer una copia de un array, igual que _slice_:
```javascript
const arrayA = [5.2, 3.9, 6, 9.75, 7.5, 3]
const arrayB = Array.from(arrayA)
```

También se utiliza mucho para convertir colecciones en arrays y así poder usar los métodos de arrays que hemos visto. Por ejemplo si queremos mostrar por consola cada párrafo de la página que comience por la palabra 'If' en primer lugar obtenemos todos los párrafos con:
```javascript
const parrafos = document.getElementsByTagName('p')
```

Esto nos devuelve una colección con todos los párrafos de la página (lo veremos más adelante al ver DOM). Podríamos hacer un **for** para recorrer la colección y mirar los que empiecen por lo indicado pero no podemos aplicarle los métodos vistos aquí porque son sólo para arrays así que hacemos:
```javascript
const arrayParrafos = Array.from(parrafos)
// y ya podemos usar los métodos que queramos:
arrayParrafos.filter(parrafo  => parrafo.textContent.startsWith('If'))
.forEach(parrafo  => alert(parrafo.textContent))
```

> **IMPORTANTE**: desde este momento se han acabado los bucles _for_ en nuestro código para trabajar con arrays. Usaremos siempre estas funciones!!!

## Rest y Spread
Permiten extraer a parámetros los elementos de un array o string (_spread_) o convertir en un array un grupo de parámetros (_rest_). El operador de ambos es **...** (3 puntos).

Para usar _rest_ como parámetro de una función debe ser siempre el último parámetro. 

Ejemplo: queremos hacer una función que calcule la media de las notas que se le pasen como parámetro y que no sabemos cuántas són. Para llamar a la función haremos:

```javascript
console.log(notaMedia(3.6, 6.8)) 
console.log(notaMedia(5.2, 3.9, 6, 9.75, 7.5, 3)) 
```

La función convertirá los parámetros recibidos en un array usando _rest_:
```javascript
function notaMedia(...notas) {
  let total = notas.reduce((total,nota)  => total + =  nota)
  return total/notas.length
}
```

Si lo que queremos es convertir un array en un grupo de elementos haremos _spread_. Por ejemplo el objeto _Math_ proporciona métodos para trabajar con números como _.max_ que devuelve el máximo de los números pasados como parámetro. Para saber la nota máxima en vez de _.reduce_ como hicimos en el ejemplo anterior podemos hacer:
```javascript
const arrayNotas = [5.2, 3.9, 6, 9.75, 7.5, 3]

let maxNota = Math.max(...arrayNotas)    // maxNota = 9.75
// si hacemos Math.max(arrayNotas) devuelve NaN porque arrayNotas es un array y no un número
```

## Desestructuración de arrays
Igual que vimos con las propiedades de los objetos podemos extraer los elementos del array directamente a variables y viceversa. Ejemplo:
```javascript
const arrayNotas = [5.2, 3.9, 6, 9.75, 7.5, 3]
const [primera, segunda, tercera] = arrayNotas   // primera = 5.2, segunda = 3.9, tercera = 6
const [primera, , , cuarta] = arrayNotas         // primera = 5.2, cuarta = 9.75
const [primera, ...resto] = arrayNotas           // primera = 5.2, resto = [3.9, 6, 9.75, 3]
```

También se pueden asignar valores por defecto:
```javascript
const preferencias = ['Javascript', 'NodeJS']
const [lenguaje, backend = 'Laravel', frontend = 'VueJS'] = preferencias  // lenguaje = 'Javascript', backend = 'NodeJS', frontend = 'VueJS'
```

## Copia de arrays
Como vimos al hablar de objetos (y un array es un tipo particular de objeto) por defecto al asignarlos o pasarlos como parámetro a una función se pasan por referencia, NO se copian por lo que los datos de ambas son los mismos:
```javascript
const a = [54, 23, 12]
const b = a      // a = [54, 23, 12] b = [54, 23, 12]
b[0] = 3       // a = [3, 23, 12] b = [3, 23, 12]
```

Si queremos obtener una copia de un array que sea independiente del original podemos usar `...`o `Object.assign` como vimos con los objetos, pero también podemos obtener una copia con `slice` o con `Array.from`:
```javascript
const a = [2, 4, 6]
const copiaDeA = [...a]       
const copiaDeA = a.slice()
const otraCopiaDeA = Array.fom(a)
```
 En todos los casos los arrays contienen lo mismo pero son diferentes y al modificar uno no afectará al resto.

> EJERCICIO: Dado el array arr1 con los días de la semana haz un array arr2 que sea igual al arr1. Elimina de arr2 el último día y comprueba quá ha pasado con arr1. Repita la operación con un array llamado arr3 pero que crearás haciendo una copia de arr1.


## Map
Es una colección de parejas de \[clave,valor]. Un objeto en Javascript es un tipo particular de _Map_ en que las claves sólo pueden ser texto o números. Se puede acceder a una propiedad con **.** o **\[propiedad]**. Ejemplo:
```javascript
const persona = {
  nombre: 'John',
  apellido: 'Doe',
  edad: 39
}
console.log(persona.nombre)      // John
console.log(persona['nombre'])   // John
```

Un _Map_ permite que la clave sea cualquier cosa (array, objeto, ...). No vamos a ver en profundidad estos objetos pero podéis saber más en [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) o cualquier otra página. 

## Set
Es como un _Map_ pero que no almacena los valores sino sólo la clave. Podemos verlo como una colección que no permite duplicados. Tiene la propiedad **size** que devuelve su tamaño y los métodos **.add** (añade un elemento), **.delete** (lo elimina) o **.has** (indica si el elemento pasado se encuentra o no en la colección) y también podemos recorrerlo con **.forEach**.

Una forma sencilla de eliminar los duplicados de un array es crear con él un _Set_:
```javascript
const ganadores = ['Márquez', 'Rossi', 'Márquez', 'Lorenzo', 'Rossi', 'Márquez', 'Márquez']
const ganadoresNoDuplicados = new Set(ganadores)    // {'Márquez, 'Rossi', 'Lorenzo'}
// o si lo queremos en un array:
const ganadoresNoDuplicados = Array.from(new Set(ganadores))    // ['Márquez, 'Rossi', 'Lorenzo']
```
