# Objetos en Javascript
- [Objetos en Javascript](#objetos-en-javascript)
  - [Introducción](#introducción)
  - [Propiedades de un objeto](#propiedades-de-un-objeto)
  - [Métodos de un objeto](#métodos-de-un-objeto)
  - [Propagación de propiedades](#propagación-de-propiedades)
  - [Desestructuración de objetos](#desestructuración-de-objetos)
  - [Comparación de objetos](#comparación-de-objetos)
  - [Copia de objetos](#copia-de-objetos)
  - [Bibliografía](#bibliografía)

## Introducción
En Javascript podemos definir cualquier variable como un objeto declarándola con **new** (NO se recomienda) o creando un _literal object_ (usando notación **JSON**). Ejemplo con _new_ (no recomendado):
```javascript
const alumno = new Object()
alumno.nombre = 'Carlos'     // se crea la propiedad 'nombre' y se le asigna un valor
alumno['apellidos'] = 'Pérez Ortiz'    // se crea la propiedad 'apellidos'
alumno.edad = 19
```

Creando un _literal object_ (es la forma **recomendada**) el ejemplo anterior sería:
```javascript
const alumno = {
    nombre: 'Carlos',
    apellidos: 'Pérez Ortiz',
    edad: 19,
};
```

## Propiedades de un objeto
Podemos acceder a las propiedades con `.` (punto) o `[ ]`:
```javascript
console.log(alumno.nombre)       // imprime 'Carlos'
console.log(alumno['nombre'])    // imprime 'Carlos'
let prop = 'nombre'
console.log(alumno[prop])        // imprime 'Carlos'
```

Si intentamos acceder a propiedades que no existen no se produce un error, se devuelve _undefined_:
```javascript
console.log(alumno.ciclo)      // muestra undefined
```

Sin embargo se genera un error si intentamos acceder a propiedades de algo que no es un objeto:
```javascript
console.log(alumno.ciclo)           // muestra undefined
console.log(alumno.ciclo.descrip)      // se genera un ERROR
```

Para evitar ese error antes había que comprobar que existan las propiedades previas:
```javascript
console.log(alumno.ciclo && alumno.ciclo.descrip)
// si alumno.ciclo es un objeto muestra el valor de 
// alumno.ciclo.descrip y si no muestra undefined
```

Con ES2020 (ES11) se ha incluido el operador de encadenamiento opcional **?.** para evitar tener que comprobar esto nosotros:
```javascript
console.log(alumno.ciclo?.descrip)
// si alumno.ciclo es un objeto muestra el valor de 
// alumno.ciclo.descrip y si no muestra undefined
```

Podremos recorrer las propiedades de un objecto con `for..in`:
```javascript
for (let prop in alumno) {
    console.log(prop + ': ' + alumno[prop])
}
```

Si el valor de una propiedad es el valor de una variable que se llama como la propiedad no es necesario ponerlo:
```javascript
let nombre = 'Carlos'

const alumno = {
    nombre,            // es equivalente a nombre: nombre
    apellidos: 'Pérez Ortiz',
    ...
```

## Métodos de un objeto
Una propiedad de un objeto puede ser una función:
```javascript
alumno.getInfo = function() {
    return 'El alumno ' + this.nombre + ' ' + this.apellidos + ' tiene ' + this.edad + ' años'
}
```

NOTA: No podemos ponerlo con sintaxis _arrow function_ porque no se podría acceder a las propiedades del objeto con `this`.

Y para llamarlo se hace como con cualquier otra propiedad:
```javascript
console.log(alumno.getInfo())    // imprime 'El alumno Carlos Pérez Ortíz tiene 19 años'
```

> EJERCICIO: Crea un objeto llamado tvSamsung con las propiedades nombre ("TV Samsung 42"), categoria ("Televisores"), unidades (4), precio (345.95) y con un método llamado importe que devuelve el valor total de las unidades (nº de unidades * precio)

## Propagación de propiedades
El operador de propagación, **`...`** (3 puntos), permite extraer las propiedades de un objeto. Ejemplo:
```javascript
const personaCarlos = {
    nombre: 'Carlos',
    apellidos: 'Pérez Ortiz',
    edad: 19,
};
const alumnoCarlos = {
    ...personaCarlos,
    ciclo: 'DAW',
    curso: 2,
};
```

El objeto _alumnoCarlos_ tendrá las propiedades de _personaCarlos_ y las que se le añadan. Si se repiten las propiedades se sobreescriben:
```javascript
const alumnoCarlos = {
    ...personaCarlos,
    ciclo: 'DAW',
    curso: 2,
    edad: 20,
};
```

## Desestructuración de objetos
Similar al anterior, permite extraer directamente a variables sólo las propiedades que necesitemos de un objeto. Ejemplo:
```javascript
const personaCarlos = {
    nombre: 'Carlos',
    apellidos: 'Pérez Ortiz',
    edad: 19,
};

function muestraNombre({nombre, apellidos}) {
    console.log('El nombre es ' + nombre + ' ' + apellidos)
}

muestraNombre(personaCarlos)
```

Aunque a la función se le pasa un objeto esta toma como parámetros sólo 2 de sus propiedades y las asigna a las variables _nombre_ y _apellidos_.

También podemos asignar valores por defecto:
```javascript
function miProducto({nombre, apellidos = 'Desconocidos'}) {
...
```

## Comparación de objetos   
En Javascript los objetos se comparan por referencia, no por valor. Por lo que dos objetos con los mismos valores no son iguales:
```javascript
const a = {id:2, name: 'object 2'}
const b = {id:2, name: 'object 2'}
console.log(a === b)    // muestra false
```

## Copia de objetos
Cuando copiamos una variable de tipo _boolean_, _string_ o _number_ o se pasa como parámetro a una función se hace una copia de la misma y si se modifica la variable original no es alterada. Ej.:
```javascript
let a = 54
let b = a      // a = 54 b = 54
b = 86         // a = 54 b = 86
```
Sin embargo al copiar objetos (y arrays, que son un tipo de objeto) la nueva variable apunta a la misma posición de memoria que la antigua por lo que los datos de ambas son los mismos:
```javascript
const a = {id:2, name: 'object 2'}
const b = a
b.name = 'object 3'      // a = {id:2, name: 'object 3'} b = {id:2, name: 'object 3'}

const a = [54, 23, 12]
const b = a      // a = [54, 23, 12] b = [54, 23, 12]
b[0] = 3       // a = [3, 23, 12] b = [3, 23, 12]

const fecha1 = new Date('2018-09-23')
const fecha2 = fecha1          // fecha1 = '2018-09-23'   fecha2 = '2018-09-23'
fecha2.setFullYear(1999)   // fecha1 = '1999-09-23'   fecha2 = '1999-09-23'
```

Para obtener una copia independiente de un array o un objeto podemos usar el operador de propagación `...` o el método `Object.assign`. Ejemplo:
```javascript
const a = {id:2, name: 'object 2'}
const b = {...a}      // ahora ambos objetos contienen lo mismo pero son diferentes
b.name = 'object 3'      // a = {id:2, name: 'object 2'} b = {id:2, name: 'object 3'}
```

Con [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) haremos:
```javascript
const a = {id:2, name: 'object 2'}
const b = Object.assign({}, a)       // ahora ambos objetos contienen lo mismo pero son diferentes
```

Sin embargo si el objeto tiene como propiedades otros objetos estos se continúan pasando por referencia. Es ese caso lo más sencillo sería hacer:
```javascript
const a = {id: 2, name: 'object 2', address: {street: 'Rue del Percebe', num: 13} }
const copiaDeA =  JSON.parse(JSON.stringify(a))       // ahora ambos objetos contienen lo mismo pero son diferentes
```

o bien usar la función [`structuredClone`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone):
```javascript
const a = {id: 2, name: 'object 2', address: {street: 'Rue del Percebe', num: 13} }
const b =  structuredClone(a)       // ahora ambos objetos contienen lo mismo pero son diferentes
```

> EJERCICIO: Dado el objeto _a_ del último ejemplo copialo a un nuevo objeto b con `...` y prueba a cambiar las pripiedades _id_ y _street_ de _b_. ¿Qué pasa con sus valores en _a_?.

## Bibliografía
* Curso 'Programación con JavaScript'. CEFIRE Xest. Arturo Bernal Mayordomo
