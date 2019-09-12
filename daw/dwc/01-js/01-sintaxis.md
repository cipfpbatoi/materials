# Sintaxis

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
Tabla de contenidos

- [Variables](#variables)
- [Funciones](#funciones)
  - [Parámetros](#par%C3%A1metros)
  - [Funciones anónimas](#funciones-an%C3%B3nimas)
  - [Arrow functions (funciones _labda_)](#arrow-functions-funciones-_labda_)
- [Estructuras y bucles](#estructuras-y-bucles)
  - [Estructura condicional: if](#estructura-condicional-if)
  - [Estructura condicional: switch](#estructura-condicional-switch)
  - [Bucle _while_](#bucle-_while_)
  - [Bucle: for](#bucle-for)
  - [Bucle: for con contador](#bucle-for-con-contador)
    - [Bucle: for...in](#bucle-forin)
    - [Bucle: for...of](#bucle-forof)
- [Tipos de datos básicos](#tipos-de-datos-b%C3%A1sicos)
  - [Number](#number)
  - [String](#string)
    - [Template literals](#template-literals)
  - [Boolean](#boolean)
- [Buenas prácticas](#buenas-pr%C3%A1cticas)
  - ['use strict'](#use-strict)
  - [Variables](#variables-1)
  - [Otras](#otras)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Variables
Javascript es un lenguaje débilmente tipado. Esto significa que no se indica de qué tipo es una variable al declararla e incluso puede cambiar su tipo a lo largo de la ejecución del programa. Ejemplo:
```javascript
let miVariable;         // declaro miVariable y como no se asigno un valor valdrá undefined
miVariable='Hola';      // ahora su valor es 'Hola', por tanto contiene una cadena de texto
miVariable=34;          // pero ahora contiene un número
miVariable=[3, 45, 2];  // y ahora un array
miVariable=undefined;   // para volver a valer el valor especial undefined
```

Ni siquiera estamos obligados a declarar una variable antes de usarla, aunque es recomendable para evitar errores que nos costará depurar. Para que se produzca un error si no declaramos una variable debemos incluir al principio de nuestro código la instrucción
```javascript
'use strict'
```

Las variables de declaran con **let** (lo recomendado desde ES2015), aunque también pueden declararse con **var**. La diferencia es que con _let_ la variable sólo existe en el bloque en que se declara mientras que con _var_ la variable existe en toda la función en que se declara. Cualquier variable que no se declara dentro de una función (o si se usa sin declarar) es _global_.

Se recomenda que Los nombres de las variables sigan la sintaxis _camelCase_ (ej.: _miPrimeraVariable_).

Desde ES2015 también podemos declarar constantes con **const**. Se les debe dar un valor al declararlas y si intentamos modificarlo posteriorment se produce un error. Se aconseja que el nombre de las constantes globales sea en mayúsculas.

## Funciones
Se declaran con **function** y se les pasan los parámetros entre paréntesis. La función puede devolver un valor usando **return** (si no tiene _return_ es como si devolviera _undefined_). 

Puede usarse una función antes de haberla declarado por el _hoisting_ de Javascript (el navegador primero carga todas las funciones y mueve las declaraciones de las variables al principio y luego ejecuta el código).

### Parámetros
Si se llama una función con menos parámetros de los declarados el valor de los parámetros no pasados será _undefined_:
```javascript
potencia(4);

function potencia(base, exponente) {
    console.log(base);            // muestra 4
    console.log(exponente);       // muestra undefined
    let valor=1;
    for (let i=1; i<=exponente; i++) {
      valor=valor*base;
    }
    return valor;
}
```

Podemos dar un **valor por defecto** a los parámetros por si no los pasan asignándoles el valor al definirlos:
```javascript
potencia(4);

function potencia(base, exponente=2) {
    console.log(base);            // muestra 4
    console.log(exponente);       // muestra 2
    let valor=1;
    for (let i=1; i<=exponente; i++) {
      valor=valor*base;
    }
    return valor;
}

console.log(potencia(4));         // mostrará 16 (4^2)
console.log(potencia(4,3));         // mostrará 64 (4^3)
```

> NOTA: En ES5 para hacer esto se hacía
> ```javascript
> function potencia(base, exponente) {
>     exponente = exponente || 2;       // si exponente vale undefined se la asigna el valor 2
> ...
> ```

También es posible acceder a los parámetros desde el array **arguments[]** si no sabemos cuántos recibiremos:
```javascript
function suma () {
    var result = 0;
    for (var i=0; i<arguments.length; i++)
        result += arguments[i];
    return result;
}

console.log(suma(4, 2));                    // mostrará 6
console.log(suma(4, 2, 5, 3, 2, 1, 3));     // mostrará 20
```

### Funciones anónimas
Podemos definir una función sin darle un nombre. Dicha función puede asignarse a una variable, autoejecutarse o asignasrse a un manejador de eventos. Ejemplo:
```javascript
let holaMundo = function() {
    alert('Hola mundo!');
}

holaMundo();        // se ejecuta la función
```

### Arrow functions (funciones _labda_)
ES2015 permite declarar una función anónima de forma más corta. Ejemplo sin _arrow function_:
```javascript
let potencia = function(base, exponente) {
    let valor=1;
    for (let i=1; i<=exponente; i++) {
      valor=valor*base;
    }
    return valor;
}
```

Lo que hacemos es:
* Eliminamos la palabra _function_
* Si sólo tiene 1 parámetro podemos eliminar los paréntesis de los parámetros
* Ponemos el símbolo _=>_
* Si la función sólo tiene 1 línea eliminamos las { } y la palabra _return_

El ejemplo con _arrow function_:
```javascript
let potencia = (base, exponente) => {
    let valor=1;
    for (let i=1; i<=exponente; i++) {
      valor=valor*base;
    }
    return valor;
}
```
Otro ejemplo, sin _arrow function_:
```javascript
let cuadrado = function(base) {
    return base * base;
}
```
conn _arrow function_:
```javascript
let cuadrado = base => base * base;
```

## Estructuras y bucles
### Estructura condicional: if
El **if** es como en la mayoría de lenguajes. Puede tener asociado un **else** y pueden anidarse varios con **else if**.
```javascript
if (condicion) {
    ...
} else if (condicion2) {
    ...
} else if (condicion3) {
    ...
} else {
    ...
}
```
Ejemplo:
```javascript
if (edad < 18) {
    console.log('Es menor de edad');
} else if (edad > 65) {
    console.log('Está jubilado');
} else {
    console.log('Edad correcta');
}
```

Se puede usar el operador **? :** que es como un _if_ que devuelve un valor:
```javascript
let esMayor = (edad>18)?true:false;
```

### Estructura condicional: switch
El **switch** también es como en la mayoría de lenguajes. Hay que poner _break_ al final de cada bloque para que no continúe evaluando:
```javascript
switch(color) {
    case 'blanco':
    case 'amarillo':    // Ambos colores entran aquí
        colorFondo='azul';
        break;
    case 'azul':
        colorFondo='amarillo';
        break;
    default:            // Para cualquier otro valor
        colorFondo='negro';
}
```
Javascript permite que el _switch_ en vez de evaluar valores pueda evaluar expresiones. EN este caso se pone como condición _true_:
```javascript
switch(true) {
    case age < 18:
        console.log("Eres muy joven para entrar");
        break;
    case age < 65:
        console.log("Puedes entrar");
        break;
    default:
        console.log("Eres muy mayor para entrar");
}
```
### Bucle _while_
Podemos usar el bucle _while...do_
```javascript
while (condicion) {
    // sentencias
}
```
que se ejecutará 0 o más veces. Ejemplo:
```javascript
let nota=prompt('Introduce una nota (o cancela para finalizar)');
while (nota) {
    console.log('La nota introducida es: '+nota);
    nota=prompt('Introduce una nota (o cancela para finalizar)');
}
```
O el bucle _do...while_:
```javascript
do {
    // sentencias
} while (condicion)
```
que al menos se ejecutará 1 vez. Ejemplo:
```javascript
let nota;
do {
    nota=prompt('Introduce una nota (o cancela para finalizar)');
    console.log('La nota introducida es: '+nota);
} while (nota)
```


### Bucle: for
Tenemos muchos _for_ que podemos usar.

### Bucle: for con contador
Creamos una variable contador que controla las veces que seejecuta el for:
```javascript
let datos=[5, 23, 12, 85]
let sumaDatos=0;

for (let i=0; i<datos.length; i++) {
    sumaDatos += datos[i];
}  
// El valor de sumaDatos será 125
```
#### Bucle: for...in
El bucle se ejecuta una vez para cada elemento del array (o propiedad del objeto) y se crea una variable contador que toma como valores la posición del elemento en el array:
```javascript
let datos=[5, 23, 12, 85]
let sumaDatos=0;

for (let indice in datos) {
    sumaDatos += datos[indice];     // los valores que toma indice son 0, 1, 2, 3
}  
// El valor de sumaDatos será 125
```
También sirve para recorrer las propiedades de un objeto:
```javascript
let profe={
    nom:”Juan”, 
    ape1=”Pla”, 
    ape2=”Pla”
}
let nombre='';

for (var campo in profe) {
   nombre += profe.campo + ' '; // o profe[campo];
}  
// El valor de nombre será “Juan Pla Pla ”
```
#### Bucle: for...of
Es similar al _for...in_ pero la variable contador en vez de tomar como valor cada índice toma cada elemento. Es nuevo en ES2015:
```javascript
let datos=[5, 23, 12, 85]
let sumaDatos=0;

for (let valor of datos) {
    sumaDatos += valor;       // los valores que toma valor son 5, 23, 12, 85
}  
// El valor de sumaDatos será 125
```
También sirve para recorrer los caracteres de una cadena de texto:
```javascript
let cadena='Hola';

for (let letra of cadena) {
    console.log(letra);     // los valores de letra son 'H', 'o', 'l', 'a'
}  
```

## Tipos de datos básicos
Para saber de qué tipo es el valor de una variable tenemos el operador **typeof**. Ej.:
* `typeof 3` devuelve _number_
* `typeof 'Hola'` devuelve _string_

En Javascript hay 2 valores especiales:
* **undefined**: es lo que vale una variable a la que no se ha asignado ningún valor
* **null**: es un tipo de valor especial que podemos asignar a una variable. Es como un objeto vacío (`typeof null` devuelve _object_)

Como hemos dicho las variables pueden contener cualquier tipo de valor y, en las operaciones, Javascript realiza automáticamente la conversión necesaria para, si es posible, realizar la operación y no devolver **NaN** (_Not a Number_, el valor devuelto es erróneo). Por ejemplo:
* `"4" / 2` devuelve 2 (convierte "4" en 4 y realiza la operación)
* `"23" - null` devuelve 0 (hace 23 - 0)
* `"23" - undefined` devuelve _NaN_ (no puede convertir undefined a nada así que no puede hacer la operación)
* `"23" * true` devuelve 23 (23 * 1)
* `"23" * "Hello"` devuelve _NaN_ (no puede convertir "Hello")
* `23 + "Hello"` devuelve "23Hello" (+ es el operador de concatenación así que convierte 23 a "23" y los concatena)
* `23 + "23"` devuelve 2323 (OJO, convierte 23 a "23", no al revés)

Además comentar que en Javascript todo son ojetos por lo que todo tiene métodos y propiedades. Veamos brevemente los tipos de datos básicos.

### Number
Sólo hay 1 tipo de números, no existen enteros y decimales. El tipo de dato para cualquier número es **number**. EL carácter para la coma decimal es el **.** (como en inglés, así que 23,12 debemos escribirlo como 23.12).

Tenemos los operadores aritméticos **+**, **-**, **\***, **/** y **%** y los unarios **++** y **--** y existen los valores especiales **Infinity** y **-Infinity** (`23 / 0` no produce un error sino que devuelve _Infinity_). La función **isFinite()** devuelve _true_ si el núemero es finito (no es _Infinity_ ni _-Infinity_). También esmuy útil la función **isNaN(valor)** que nos dice si el valor pasado es un número (false) o no (true).

Podemos usar los operadores artmáticos junto al operador de asignación **=** (+=, -=, *=, /= y %=).

Podemos forzar la conversión a número con la función **Number(valor)**. Ejemplo `Number("23.12")`devuelve 23.12

También es muy útil el método **.toFixed(num)** que redondea un número a los decimales indicados. Ej.: `23.2376.toFixed(2)` devuelve 23.24

### String
Las cadenas de texto van entre comillas simples o dobles, es indiferente. Podemos escapar un caràcter con \ (ej. `"Hola \"Mundo\""` devuelve _Hola "Mundo"_).

Para forzar la conversión a cadena e usa la función **String(valor)** (ej. `String(23)` devuelve '23')

El operador de concatenación de cadenas es **+**. Ojo porque si pedimos un dato con _prompt_ siempre devuelve una cadena así que si le pedimos la edad al usuario (por ejemplo 20) y se sumamos 10 tendremos 2010 ('20'+10).

Algunos métodos y propiedades de las cadenas son:
* **.length**: devuelve la longitud de una cadena. Ej.: `'Hola mundo'.length` devuelve 10
* **.charAt(posición)**: `'Hola mundo'.charAt(0)` devuelve "H"
* **.indexOf(carácter)**: `'Hola mundo'.indexOf('o')` devuelve 1. Si no se encuentra devuelve -1
* **.lastIndexOf(carácter)**: `'Hola mundo'.lastIndexOf('o')` devuelve 9
* **.substring(desde, hasta)**: `'Hola mundo'.substring(2,4)` devuelve "la"
* **.substr(desde, num caracteres)**: `'Hola mundo'.substr(2,4)` devuelve "la m"
* **.replace(busco, reemplaza)**: `'Hola mundo'.replace('Hola', 'Adiós')` devuelve "Adiós mundo"
* **.toLocaleLowerCase()**: `'Hola mundo'.toLocaleLowerCase()` devuelve "hola mundo" (.toLowerCase no funciona con ñ, á, ç, ...)
* **.toLocaleUpperCase()**: `'Hola mundo'.toLocaleUpperCase()` devuelve "HOLA MUNDO"
* **.trim(cadena)**: `'   Hola mundo   '.trim()` devuelve "Hola mundo"
* **.startsWith(cadena)**: `'Hola mundo'.startsWith('Hol')` devuelve _true_
* **.endsWith(cadena)**: `'Hola mundo'.endsWith('Hol')` devuelve _false_
* **.includes(cadena)**: `'Hola mundo'.includes('mun')` devuelve _true_
* **.repeat(veces)**: `'Hola mundo'.repeat(3)` devuelve "Hola mundoHola mundoHola mundo"
* **.split(sepadaror)**: `'Hola mundo'.split(' ')` devuelve el array \['Hola', 'mundo']. `'Hola mundo'.split('')` devuelve el array \['H','o',l','a',' ','m','u','n','d','o']

Podemos probar los diferentes métodos en la página de [w3schools](https://www.w3schools.com/jsref/jsref_obj_string.asp).

#### Template literals
Desde ES2015 también podemos poner una cadena entre \` (acento grave) y en ese caso podemos poner dentro variables y expresiones que serán evaluadas al ponerlas dentro de **${}**. También se respetan los saltos de línea, tabuladores, etc que haya dentro. Ejemplo:
```javascript
let edad=25;

console.log(\`El usuario tiene:
${edad} años\`) 
```
Mostrará en la consola:
> El usuario tiene:

> 25 años

### Boolean
Los valores booleanos son **true** y **false**. Para convertir algo a booleano se usar **Boolean(valor)** aunque también puede hacerse con la doble negación (**!!**). Cualquier valor se evaluará a _true_ excepto 0, NaN, null, undefined o una cadena vacía ('') que se evaluarán a _false_.

Los operadores lógicos son ! (negación), && (and), || (or).

Para comparar valores tenemos **==** y **===**. La triple igualdad devuelve _true_ si son igual valor y del mismo tipo. Como Javascript hace conversiones de tipos automáticas conviene usar la **===** para evitar cosas como:
* `'3'==3` true
* `0==false` true
* `''==false` true
* `null==false` false
* `undefined==false` false
* `undefined==null` true

También tenemos 2 operadores de _diferente_: **!=** y **!==** que se comportan como hemos dicho antes.

Los operadores relacionales son >, >=, <, <=. Cuando se compara un número y una cadena ésta se convierte a número y no al revés (`23>'5'` devuelve _true_, aunque `'23'>'5'` devuelve _false_)  

## Buenas prácticas
Javascript nos permite hacer muchas cosas que otros lenguajes no nos dejan por lo que debemos ser cuidadosos para no cometer errores de los que no se nos va a avisar.

### 'use strict'
Si ponemos siempre esta sentencia al principio de nuestro código el intérprete nos avisará si usamos una variale sin declarar (muchas vecees por equivocarnos al escrbir su nombre). En concreto fuerza al navegador a no permitir:
* Usar una variable sin declarar
* Definir más de 1 vez una propiedad de un objeto
* Duplicar un parámetro en una función
* Usar números en octal
* Modificar una propiedad de sólo lectura

### Variables
Algunas de las prácticas que deberíamos seguir respecto a las variables son:
* Evitar en lo posible variables globales
* Declarar todas las variables al principio
* Inicializar las variables al declararlas
* Evitar conversiones de tipo automáticas
* Usar para nombrarlas la notación _camelCase_
* Poner los nombres de las constantes en mayúsculas

También es conveniente, por motivos de eficiencia no usar objetos Number, String o Boolean sino los tipos primitivos (no usar `let numero=new Number(5)` sino `let numero=5`) y lo mismo al crear arrays, objetos o expresiones regulares (no usar `let miArray=new Array()` sino `let miArray=[]`).

### Otras
Algunas reglas más que deberíamos seguir son:
* Debemos ser coherentes a la hora de escribir código: por ejemplo podemos poner o no espacios antes y después del `=` en una asignación pero debemos hacerlo siempre igual. Existen muchas guías de estilo y muy buenas: [Airbnb](https://github.com/airbnb/javascript), [Google](https://google.github.io/styleguide/javascriptguide.xml), [Idiomatic](https://github.com/rwaldron/idiomatic.js), etc. Para obligarnos a seguir las reglas podemos usar alguna herramienta [_linter_](https://www.codereadability.com/what-are-javascript-linters/).
* También es conveniente para mejorar la legibilidad de nuestro código separar las líneas de más de 80 caracteres.
* Usar `===` en las comparaciones
* Si un parámetro puede faltar al llamar a una función darle un valor por defecto
* Y para acabar: **comentar el código**

**OJO**: al sumar floats podemos tener problemas:
```javascript
console.log(0.1 + 0.2)    // imprime 0.30000000000000004
```
Para evitarlo redondead los resultados (o `(0.1*10 + 0.2*10) / 10`).
