# Programación orientada a Objetos en Javascript
- [Programación orientada a Objetos en Javascript](#programación-orientada-a-objetos-en-javascript)
  - [Introducción](#introducción)
  - [Herencia](#herencia)
  - [Propiedades y métodos privados](#propiedades-y-métodos-privados)
  - [Propiedades y métodos estáticos](#propiedades-y-métodos-estáticos)
  - [Método _valueOf()_](#método-valueof)
  - [Organizar el código](#organizar-el-código)
  - [El contexto de _this_](#el-contexto-de-this)
  - [Mixins](#mixins)
  - [Programación orientada a objetos en JS5](#programación-orientada-a-objetos-en-js5)
  - [Bibliografía](#bibliografía)

## Introducción
Desde ES2015 la programación orientada a objetos en Javascript es similar a como se hace en otros lenguajes, con clases, herencia, ...:
```javascript
class Person {
    constructor(name, surname, age) {
        this.name = name
        this.surname = surname
        this.age = age
    }
    getInfo() {
        return 'El alumno ' + this.name + ' ' + this.surname + ' tiene ' + this.age + ' años'
    }
}

let persona1 = new Person('Carlos', 'Pérez Ortiz', 19)
console.log(persona1.getInfo())     // imprime 'El alumno Carlos Pérez Ortíz tiene 19 años'
```

**NOTA**: en las clases NO es necesario poner `'use strict'` porque por defecto todas las clases ya lo tienen.

> EJERCICIO: Crea una clase Productos con las propiedades _name_, _category_, _units_ y _price_ y los métodos _total_ que devuelve el importe del producto y _getInfo_ que devolverá: '_Name_ (_category_): _units_ uds x _price_ € = _total_ €'. Crea 3 productos diferentes.

## Herencia
Una clase puede heredar de otra utilizando la palabra reservada **extends** y heredará todas sus propiedades y métodos. Podemos sobrescribirlos en la clase hija (seguimos pudiendo llamar a los métodos de la clase padre utilizando la palabra reservada **super** -es lo que haremos si creamos un constructor en la clase hija-).
```javascript
class Student extends Person{
  constructor(name, surname, age, cycle) {
    super(name, surname, age)
    this.cycle = cycle
  }
  isMediumDegree() {
    if (this.cycle.toUpperCase() === 'SMX') return true
    return false
  }
  getInfo() {
    return super.getInfo() + ' y estudia el Grado ' + (this.isMediumDegree ? 'Medio' : 'Superior') + ' de ' + this.cycle
  }
}

let cpo = new Student('Carlos', 'Pérez Ortiz', 19, 'DAW')
console.log(cpo.getInfo())     // imprime 'El alumno Carlos Pérez Ortíz tiene 19 años y estudia el Grado Superior de DAW'
```

> EJERCICIO: crea una clase Televisores que hereda de Productos y que tiene una nueva propiedad llamada tamaño. El método getInfo mostrará el tamaño junto al nombre

## Propiedades y métodos privados
A la hora de encapsular el código de las clases es importante el uso de este tipo de elementos. Javascript los incluyó en ES2019 y van precedidos de la sintaxis **`#`** para declaralos:
```javascript
class Position {
  #x = 0;
  #y = 0;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  #increaseX() {
    this.#x++;
  }

  #increaseY() {
    this.#y++;
  }
  
  getPosition() {
    return { x: this.#x, y: this.#y };
  }

  moveRight() {
    this.#increaseX();
  }

  moveUp() {
    this.#increaseY();
  }
}

const myPosition = new Position(20, 10);

console.log(myPosition.getPosition()); // { x: 20, y: 10 }
myPosition.moveRight();
console.log(myPosition.getPosition()); // { x: 21, y: 10 }
console.log(myPosition.#x); // Error (propiedad privada)
console.log(myPosition.#increaseX); // Error (método privado)

```

Anteriormente existía una convención de que cualquier propiedad o método que comience por el carácter `_` se trata de una propiedad o método **protegido** y no debería accederse al mismo desde el exterior (aunque en realidad el lenguaje permite hacerlo).

Estas propiedades y métodos privados se heredan como cualquier otro.

## Propiedades y métodos estáticos
Podemos declarar métodos y propiedades estáticas. Se llaman directamente utilizando el nombre de la clase ya que no pertenecen a las instancias sino a la clase misma:

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

En estos métodos el objeto _this_ ya no hace referencia a ninguna instancia sino a la clase misma.

Suelen usarse cosas como contadores de instancias, métodos de utilidad, etc. También para usar el patrón _**Singleton**_. Por ejemplo para un contador de instancias de la clase _User_ podríamos hacer algo así:
```javascript
class User {
    static #count = 0;
    constructor(name) {
        this.name = name;
        User.count++;
    }
    static getCount() {
        return User.count;
    }
}

Al declarar la propiedad _count_ como privada no se puede modificar desde fuera de la clase, sólo a través del constructor.

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

Este método también es el que se usará si queremos ordenar una array de objetos (recordad que _.sort()_ ordena alfabéticamente para lo que llama al método _.toString()_ del objeto a ordenar). Por ejemplo, tenemos el array de alumnos _misAlumnos_ que queremos ordenar alfabéticamente por apellidos. Si la clase _Alumno_ no tiene un método _toString_ habría que hacer como vimos en el tema de [Arrays](./02.2-arrays.md):
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
Al comparar objetos (con >, <, ...) o realizar operaciones matemáticas se usa el valor devuelto por el método **_.valueOf()_** para realizar la comparación:
```javascript
class Producto {
    ...
    valueOf() {
        return this.units * this.price
    }
}

let nar = new Producto('Naranjas', 19, 1.5)
let per = new Producto('Peras', 23, 2.0)
console.log(nar < per)     // imprime true ya que 19<23
console.log(nar + per)     // imprime 19*1.5 + 23*2.0 = 19.5 + 46 = 65.5
```

Si este método no existiera será _.toString()_ el que se usaría por lo que no funcionaría correctamente.

## Organizar el código
Lo más conveniente es guardar cada clase en su propio fichero, que llamaremos como la clase con la extensión `.class.js`. Por ejemplo el fichero de la clase _Users_ seria `users.class.js`.

En dicho fichero exportamos la clase (con `export` o mejor `export default` porque sólo hay una) y donde queramos usarla la importamos (`import { Users } from 'users.class'` o `import Users from 'users.class'`, según cómo la hayamos exportado).

## El contexto de _this_
El valor de la variable _this_ depende del contexto e que se ejecuta el código. Al crear una instancia de una clase con `new` _this_ hace referencia a la instancia creada. Dentro de una función declarada con `function` (no si es una _arrow function_) se crea un nuevo contexto y la variable _this_ pasa a hacer referencia a dicho contexto. Si en el ejemplo anterior hiciéramos algo como esto:
```javascript
class Product {
    ...
    getInfo() {
        function totalImport() {
            return this.units * this.price      // Aquí this no es la instancia del objeto Product sino el contexto de la función
        }

        return 'El importe del producto ' + this.nombre + ' es ' + totalImport()
    }
}
```

Este código fallaría porque dentro de la función _totalImport_ la variable _this_ ya no hace referencia a la instancia del objeto _Product_ sino al contexto de la función. Este ejemplo no tiene mucho sentido pero a veces nos pasará en manejadores de eventos. 

Si debemos llamar a una función dentro de un método (o de un manejador de eventos) tenemos varias formas de pasarle el valor de _this_:
1. Usando una _arrow function_ que NO crea un nuevo contexto por lo que _this_ conserva su valor
```javascript
    getInfo() {
        const totalImport = () => this.units * this.price

        return 'El importe del producto ' + this.nombre + ' es ' + totalImport()
    }
```

2. Pasándole _this_ como parámetro a la función
```javascript
   class Product {
  constructor(nombre, units, price) {
    this.nombre = nombre
    this.units = units
    this.price = price
  }

  getInfo() {
    function totalImport(product) {
      return product.units * product.price
    }

    return 'El importe del producto ' + this.nombre + ' es ' + totalImport(this)
  }
}
```

3. Guardando el valor en otra variable (como _that_)
```javascript
    getInfo() {
        let that = this;
        function totalImport() {
            return that.units * that.price
        }

        return 'El importe del producto ' + this.nombre + ' es ' + totalImport(this)
    }
```

4. Haciendo un _bind_ de _this_ (lo veremos de nuevo al hablar de eventos)
```javascript
class Product {
    ...
    getInfo() {
        function totalImport() {
            return this.units * this.price      // Aquí this no es el objeto Product
        }

        return 'El importe del producto ' + this.nombre + ' es ' + totalImport.bind(this)
    }
}
```

Al llamar a la función `totalImport` le _enlazamos_ (`.bind`) el valor que queremos que tenga _this_ dentro de ella, en nuestro caso el _this_ de donde hacemos la llamada.

## Mixins
Un _mixin_ es un patrón de diseño que consiste en una clase o un objeto que contiene una colección de métodos que pueden ser utilizados por otras clases sin necesidad de heredar directamente de él.

Es la solución que tiene JavaScript para resolver la falta de herencia múltiple (ya que en JavaScript una clase solo puede heredar de una única clase base usando `extends`).

Es por tanto un objeto que contiene métodos que podemos aplicar a una clase para datarla de ciertos comportamientos. Por ejemplo:
```javascript
// 1. Definimos el Mixin como una función que recibe una clase y devuelve otra clase que hereda de la primera y añade los métodos del Mixin
const MixinSerializable = (ClaseBase) => class extends ClaseBase {
  serializar() {
    return JSON.stringify(this);
  }

  deserializar(datos) {
    Object.assign(this, JSON.parse(datos));
  }
};

// 2. Definimos clases normales con sus propias herencias
class Persona {
  constructor(nombre) {
    this.nombre = nombre;
  }
}

class Articulo {
  constructor(titulo, precio) {
    this.titulo = titulo;
    this.precio = precio;
  }
}

// 3. Aplicamos el Mixin a las clases para darles el "superpoder"
class PersonaGuardable extends MixinSerializable(Persona) {}
class ArticuloGuardable extends MixinSerializable(Articulo) {}

// --- CÓMO SE USA ---
const usuario = new PersonaGuardable("Alejandro");
console.log(usuario.serializar()); // '{"nombre":"Alejandro"}'

const producto = new ArticuloGuardable("Teclado", 45);
console.log(producto.serializar()); // '{"titulo":"Teclado","precio":45}'
```

Las ventajas de usar Mixins son:
- Reutilización de código: Evitas duplicar los mismos métodos en clases que no tienen nada que ver entre sí (como un Usuario y un Producto).
- Flexibilidad: Puedes encadenar múltiples mixins en una sola clase si necesitas que tenga varias habilidades a la vez (por ejemplo: class MiClase extends MixinA(MixinB(ClaseBase)) {}).
- Modularidad: Mantiene tus clases enfocadas únicamente en su tarea principal y delegas las funciones secundarias a los mixins.

Antiguamente se usaba un patrón más simple que consistía en crear un objeto con los métodos y luego asignarlos al prototipo de la clase:
```javascript
// mixin
const MixinSerializable = {
  serializar() {
    return JSON.stringify(this);
  }

  deserializar(datos) {
    Object.assign(this, JSON.parse(datos));
  }
}

class Persona {
  constructor(nombre) {
    ...
  }
  ...
}

// asignamos el mixin a la clase
Object.assign(Persona.prototype, MixinSerializable);

// Ahora la Persona puede serializarse
const persona = new Persona('Carlos');
console.log(persona.serializar()); // '{"nombre":"Carlos"}'
```

Pero se trata de una sintaxis menos segura que la anterior por lo que no deberíamos usarla (está aquí sólo para que la entendáis si os encontráis este código).

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
