# Programación orientada a Objetos en Javascript
- [Programación orientada a Objetos en Javascript](#programación-orientada-a-objetos-en-javascript)
  - [Introducción](#introducción)
  - [Herencia](#herencia)
  - [Métodos y propiedades estáticas](#métodos-y-propiedades-estáticas)
  - [Propiedades y métodos privados y protegidos](#propiedades-y-métodos-privados-y-protegidos)
  - [Método _toString()_](#método-tostring)
  - [Método _valueOf()_](#método-valueof)
  - [Organizar el código](#organizar-el-código)
  - [El contexto de _this_](#el-contexto-de-this)
  - [Mixins](#mixins)
  - [Programación orientada a objetos en JS5](#programación-orientada-a-objetos-en-js5)
  - [Bibliografía](#bibliografía)

## Introducción
Desde ES2015 la POO en Javascript es similar a como se hace en otros lenguajes, con clases, herencia, ...:
```javascript
class Alumno {
    constructor(nombre, apellidos, edad) {
        this.nombre = nombre
        this.apellidos = apellidos
        this.edad = edad
    }
    getInfo() {
        return 'El alumno ' + this.nombre + ' ' + this.apellidos + ' tiene ' + this.edad + ' años'
    }
}

let alumno1 = new Alumno('Carlos', 'Pérez Ortiz', 19)
console.log(alumno1.getInfo())     // imprime 'El alumno Carlos Pérez Ortíz tiene 19 años'
```

**NOTA**: en las clases no es necesario poner `'use strict'` porque por defecto todas las clases ya lo tienen.

> EJERCICIO: Crea una clase Productos con las propiedades _name_, _category_, _units_ y _price_ y los métodos _total_ que devuelve el importe del producto y _getInfo_ que devolverá: '_Name_ (_category_): _units_ uds x _price_ € = _total_ €'. Crea 3 productos diferentes.

## Herencia
Una clase puede heredar de otra utilizando la palabra reservada **extends** y heredará todas sus propiedades y métodos. Podemos sobrescribirlos en la clase hija (seguimos pudiendo llamar a los métodos de la clase padre utilizando la palabra reservada **super** -es lo que haremos si creamos un constructor en la clase hija-).
```javascript
class AlumnInf extends Alumno{
  constructor(nombre, apellidos, edad, ciclo) {
    super(nombre, apellidos, edad)
    this.ciclo = ciclo
  }
  getInfo() {
    return super.getInfo() + ' y estudia el Grado ' + (this.getGradoMedio ? 'Medio' : 'Superior') + ' de ' + this.ciclo
  }
  getGradoMedio() {
    if (this.ciclo.toUpperCase === 'SMX')
      return true
    return false
  }
}

let cpo = new AlumnInf('Carlos', 'Pérez Ortiz', 19, 'DAW')
console.log(cpo.getInfo())     // imprime 'El alumno Carlos Pérez Ortíz tiene 19 años y estudia el Grado Superior de DAW'
```

> EJERCICIO: crea una clase Televisores que hereda de Productos y que tiene una nueva propiedad llamada tamaño. El método getInfo mostrará el tamaño junto al nombre

## Métodos y propiedades estáticas
Desde ES2015 podemos declarar métodos estáticos. Estos métodos se llaman directamente utilizando el nombre de la clase y no tienen acceso al objeto _this_ (ya que no hay objeto instanciado).
```javascript
class User {
    ...
    static getRoles() {
        return ["user", "guest", "admin"]
    }
}

console.log(User.getRoles()) // ["user", "guest", "admin"]
let user = new User("john")
console.log(user.getRoles()) // Uncaught TypeError: user.getRoles is not a function
```

Suelen usarse para crear funciones de la aplicación.

Recientemente se han introducido también propiedades estáticas, que funcionan directamente desde la clase no desde un objeto, igual que los métodos estáticos. Al ser una adición reciente pueden no funcionar en algunos navegadores.

## Propiedades y métodos privados y protegidos
A la hora de encapsular el código de las clases es importante el uso de este tipo de elementos pero Javascript sólo los incluye desde ES2019 donde introdujo la sintaxis **`#`** para declaralos:
```javascript
class Position {
    #x = 0;
    #y = 0;

    constructor(x, y) {
        this.#x = x
        this.#y = y
    }
    getPosition() {
        return { x: this.#x, y: this.#y };
    }
    increaseX() {
        this.#x++;
    }
    increaseY() {
        this.#y++;
    }
}

const myPosition = new Position(20, 10);
console.log(Position.getPosition()); // { x: 20, y: 10 }
console.log(Position.x); // undefined
console.log(Position.y); // undefined
```

Anteriormente existía una convención de que cualquier propiedad o método que comience por el carácter `_` se trata de una propiedad o método **protegido** y no debería accederse al mismo desde el exterior (aunque en realidad el lenguaje permite hacerlo).

Estas propiedades y métodos protegidos se heredan como cualquier otro.

## Método _toString()_
Al convertir un objeto a string (por ejemplo al concatenarlo con un String) se llama al método **_.toString()_** del mismo, que por defecto devuelve la cadena `[object Object]`. Podemos sobrecargar este método para que devuelva lo que queramos:
```javascript
class Alumno {
    ...
    toString() {
        return this.apellidos + ', ' + this.nombre
    }
}

let carPerOrt = new Alumno('Carlos', 'Pérez Ortiz', 19);
console.log('Alumno:' + carPerOrt)     // imprime 'Alumno: Pérez Ortíz, Carlos'
                                // en vez de 'Alumno: [object Object]'
```

Este método también es el que se usará si queremos ordenar una array de objetos (recordad que _.sort()_ ordena alfabéticamente para lo que llama al método _.toString()_ del objeto a ordenar). Por ejemplo, tenemos el array de alumnos _misAlumnos_ que queremos ordenar alfabéticamente. Si la clase _Alumno_ no tiene un método _toString_ habría que hacer como vimos en el tema de [Arrays](./02.2-arrays.md):
```javascript
misAlumnos.sort((alum1, alum2) => (alum1.apellidos+alum1.nombre).localeCompare(alum2.apellidos+alum2.nombre));   
```

Pero con el método _toString_ que hemos definido antes podemos hacer directamente:
```javascript
misAlumnos.sort() 
```

> EJERCICIO: modifica las clases Productos y Televisores para que el método que muestra los datos del producto se llame de la manera más adecuada

> EJERCICIO: Crea 5 productos y guárdalos en un array. Crea las siguientes funciones (todas reciben ese array como parámetro):
> - prodsSortByName: devuelve un array con los productos ordenados alfabéticamente
> - prodsSortByPrice: devuelve un array con los productos ordenados por importe
> - prodsTotalPrice: devuelve el importe total del los productos del array, con 2 decimales
> - prodsWithLowUnits: además del array recibe como segundo parámetro un nº y devuelve un array con todos los productos de los que quedan menos de los unidades indicadas
> - prodsList: devuelve una cadena que dice 'Listado de productos:' y en cada línea un guión y la información de un producto del array

## Método _valueOf()_
Al comparar objetos (con >, <, ...) se usa el valor devuelto por el método **_.valueOf()_** para realizar la comparación:
```javascript
class Alumno {
    ...
    valueOf() {
        return this.edad
    }
}

let cpo = new Alumno('Carlos', 'Pérez Ortiz', 19)
let aat = new Alumno('Ana', 'Abad Tudela', 23)
console.log(cpo < aat)     // imprime true ya que 19<23
```

Si este método no existiera será _.toString()_ el que se usaría.

## Organizar el código
Lo más conveniente es guardar cada clase en su propio fichero, que llamaremos como la clase con la extensión `.class.js`. Por ejemplo el fichero de la clase _Users_ seria `users.class.js`.

En dicho fichero exportamos la clase (con `export` o mejor `export default` porque sólo hay una) y donde queramos usarla la importamos (`import { Users } from 'users.class'` o `import Users from 'users.class'`, según cómo la hayamos exportado).

## El contexto de _this_
El valor de la variable _this_ depende del contexto e que se ejecuta el código. Al crear una instancia de una calse con `new` _this_ hace referencia a la instancia creada. Pero dentro de una función se crea un nuevo contexto y la variable _this_ pasa a hacer referencia a dicho contexto. Si en el ejemplo anterior hiciéramos algo como esto:
```javascript
class Alumno {
    ...
    getInfo() {
        function nomAlum() {
            return this.nombre + ' ' + this.apellidos      // Aquí this no es la instancia del objeto Alumno
        }

        return 'El alumno ' + nomAlum() + ' tiene ' + this.edad + ' años'
    }
}
```

Este código fallaría porque dentro de la función _nomAlum_ la variable _this_ ya no hace referencia a a instancia del objeto _Alumno_ sino al contexto de la función. Este ejemplo no tiene mucho sentido pero a veces nos pasará en manejadores de eventos. 

Si debemos llamar a una función dentro de un método (o de un manejador de eventos) tenemos varias formas de pasarle el valor de _this_:
1. Usando una _arrow function_ que no crea un nuevo contexto por lo que _this_ conserva su valor
```javascript
    getInfo() {
        const nomAlum = () => this.nombre + ' ' + this.apellidos

        return 'El alumno ' + nomAlum() + ' tiene ' + this.edad + ' años'
    }
```

2. Pasándole _this_ como parámetro a la función
```javascript
    getInfo() {
        function nomAlum(alumno) {
            return alumno.nombre + ' ' + alumno.apellidos
        }

        return 'El alumno ' + nomAlum(this) +' tiene ' + this.edad + ' años'
    }
```

3. Guardando el valor en otra variable (como _that_)
```javascript
    getInfo() {
        function nomAlum() {
            return that.nombre + ' ' + that.apellidos      // Aquí this no es el objeto Alumno
        }

        let that = this;
        return 'El alumno ' + nomAlum() +' tiene ' + this.edad + ' años'
    }
```

4. Haciendo un _bind_ de _this_ (lo veremos de nuevo al hablar de eventos)
```javascript
class Alumno {
    ...
    getInfo() {
        function nomAlum() {
            return this.nombre + ' ' + this.apellidos      // Aquí this no es el objeto Alumno
        }

        return 'El alumno ' + nomAlum.bind(this) + ' tiene ' + this.edad + ' años'
    }
}
```

Al llamar a la función `nomAlumn` le _enlazamos_ (`.bind`) el valor que queremos que tenga _this_ dentro de ella, en nuestro caso el _this_ de donde hacemos la llamada.

## Mixins
Wikipedia define un mixin como una clase que contiene métodos que pueden ser utilizados por otras clases sin necesidad de heredar de ella.

En Javascript se trata de un objeto que contiene métodos que podemos aplicar a una clase para datarla de ciertos comportamientos. Por ejemplo:
```javascript
// mixin
let saludaMixin = {
  saluda() {
    alert(`Hola, soy ${this.nombre}`)
  }
}

class Alumno {
  constructor(nombre, apellidos, edad) {
    ...
  }
  ...
}

// asignamos el mixin a la clase
Object.assign(Alumno.prototype, saludaMixin);

// Ahora el Alumno puede decir hola
const alumno = new User('Carlos', 'Pérez', 25)
alumno.saluda(); // Hola, soy Carlos
```

## Programación orientada a objetos en JS5
> **NOTA**: este apartado está sólo para que comprendamos este código si lo vemos en algún programa pero nosotros programaremos como hemos visto antes.

En Javascript un objeto se crea a partir de otro (al que se llama _prototipo_). Así se crea una cadena de prototipos, el primero de los cuales es el objeto _null_.

Las versiones de Javascript anteriores a ES2015 no soportan clases ni herencia. Si queremos emular en ellas el comportamiento de las clases lo que se hace es:
- para crear el constructor se crea una función con el nombre del objeto
- para crear los métodos se aconseja hacerlo en el _prototipo_ del objeto para que no se cree una copia del mismo por cada instancia que creemos:

```javascript
function Alumno(nombre, apellidos, edad) {
    this.nombre = nombre
    this.apellidos = apellidos
    this.edad = edad
}
Alumno.prototype.getInfo = function() {
    return `El alumno ${this.nombre} ${this.apellidos} tiene ${this.edad} años`
}

let cpo = new Alumno('Carlos', 'Pérez Ortiz', 19)
console.log(cpo.getInfo())     // imprime 'El alumno Carlos Pérez Ortíz tiene 19 años'
```

Cada objeto tiene un prototipo del que hereda sus propiedades y métodos (es el equivalente a su clase, pero en realidad es un objeto que está instanciado). Si añadimos una propiedad o método al prototipo se añade a todos los objetos creados a partir de él lo que ahorra mucha memoria.

## Bibliografía
* Curso 'Programación con JavaScript'. CEFIRE Xest. Arturo Bernal Mayordomo
