# Objetos en Javascript
- [Objetos en Javascript](#objetos-en-javascript)
  - [Introducción](#introducción)
  - [Propiedades de un objeto](#propiedades-de-un-objeto)
  - [Programación orientada a Objetos en Javascript](#programación-orientada-a-objetos-en-javascript)
    - [Ojo con _this_](#ojo-con-this)
    - [Herencia](#herencia)
    - [Métodos estáticos](#métodos-estáticos)
    - [toString() y valueOf()](#tostring-y-valueof)
  - [POO en ES5](#poo-en-es5)
  - [Bibliografía](#bibliografía)

## Introducción
En Javascript podemos definir cualquier variable como un objeto declarándola con **new** (NO se recomienda) o creando un _literal object_ (usando notación **JSON**). Ejemplo con _new_:
```javascript
let alumno = new Object()
alumno.nombre = 'Carlos'     // se crea la propiedad 'nombre' y se le asigna un valor
alumno['apellidos'] = 'Pérez Ortiz'    // se crea la propiedad 'apellidos'
alumno.edad = 19
```

Creando un _literal object_ (es la forma recomendada) el ejemplo anterior sería:
```javascript
let alumno = {
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
console.log(alumno.getInfo())    // imprime 'El alumno Carlos Pérez Ortíz tiene 19 años'
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

Con ES2020 (ES11) se ha incluido el operador **?.** para evitar tener que comprobar esto nosotros:
```javascript
console.log(alumno.ciclo?.descrip)
// si alumno.ciclo es un objeto muestra el valor de 
// alumno.ciclo.descrip y si no muestra undefined
```

Este nuevo operador también puede aplicarse a **arrays**:
```javascript
console.log(alumnos?.[0])
// si alumnos es un array muestra el valor de su primer
// elemento y si no muestra undefined
```

Podremos recorrer las propiedades de un objecto con `for..in`:
```javascript
for (let prop in alumno) {
    console.log(prop + ': ' + alumno[prop])
}
```

Una propiedad de un objeto puede ser una función:
```javascript
alumno.getInfo = function() {
    return 'El alumno ' + this.nombre + ' ' + this.apellidos + ' tiene ' + this.edad + 'años'
}
```

También podemos ponerlo con sintaxis _arrow function_:
```javascript
alumno.getInfo = () => 'El alumno ' + this.nombre + ' ' + this.apellidos + ' tiene ' + this.edad + 'años'
```

Si el valor de una propiedad es el valor de una variable que se llama como ella, desde ES2015 no es necesario ponerlo:
```javascript
let nombre = 'Carlos'

let alumno = {
    nombre,            // es equivalente a nombre: nombre
    apellidos: 'Pérez Ortiz',
    ...
```

> EJERCICIO: Crea un objeto llamado tvSamsung con las propiedades nombre (TV Samsung 42"), categoria (Televisores), unidades (4), precio (345.95) y con un método llamado importe que devuelve el valor total de las unidades (nº de unidades * precio)

## Programación orientada a Objetos en Javascript
Desde ES2015 la POO en Javascript es similar a como se hace en otros lenguajes: clases, herencia, ...:
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

let cpo = new Alumno('Carlos', 'Pérez Ortiz', 19)
console.log(cpo.getInfo())     // imprime 'El alumno Carlos Pérez Ortíz tiene 19 años'
```

> EJERCICIO: Crea una clase Productos con las propiedades y métodos del ejercicio anterior. Además tendrá un método getInfo que devolverá: 'Nombre (categoría): unidades uds x precio € = importe €'. Crea 3 productos diferentes.

### Ojo con _this_
Dentro de una función se crea un nuevo contexto y la variable _this_ pasa a hacer referencia a dicho contexto. Si en el ejemplo anterior hiciéramos algo como esto:
```javascript
class Alumno {
    ...
    getInfo() {
        return 'El alumno ' + nomAlum() + ' tiene ' + this.edad + ' años'
        function nomAlum() {
            return this.nombre + ' ' + this.apellidos      // Aquí this no es el objeto Alumno
        }
    }
}
```

Este código fallaría porque dentro de _nomAlum_ la variable _this_ ya no hace referencia al objeto Alumno sino al contexto de la función. Este ejemplo no tiene mucho sentido pero a veces nos pasará en manejadores de eventos. 

Si debemos llamar a una función dentro de un método (o de un manejador de eventos) tenemos varias formas de pasarle el valor de _this_:
3. Usando una _arrow function_ que no crea un nuevo contexto por lo que _this_ conserva su valor
```javascript
    getInfo() {
        return 'El alumno ' + nomAlum() + ' tiene ' + this.edad + ' años'
        let nomAlum = () => this.nombre + ' ' + this.apellidos
    }
```

1. Pasándole _this_ como parámetro a la función
```javascript
    getInfo() {
        return 'El alumno ' + nomAlum(this) +' tiene ' + this.edad + ' años'
        function nomAlum(alumno) {
            return alumno.nombre + ' ' + alumno.apellidos
        }
    }
```

2. Guardando el valor en otra variable (como _that_)
```javascript
    getInfo() {
        let that = this;
        return 'El alumno ' + nomAlum() +' tiene ' + this.edad + ' años'
        function nomAlum() {
            return that.nombre + ' ' + that.apellidos      // Aquí this no es el objeto Alumno
        }
    }
```

4. Haciendo un _bind_ de _this_ (lo varemos al hablar de eventos)

### Herencia
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

### Métodos estáticos
Desde ES2015 podemos declarar métodos estáticos, pero no propiedades estáticas. Estos métodos se llaman directamente utilizando el nombre de la clase y no tienen acceso al objeto _this_ (ya que no hay objeto instanciado).
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

### toString()
Al convertir un objeto a string (por ejemplo al concatenarlo con un String) se llama al método **_.toString()_** del mismo, que por defecto devuelve la cadena `[object Object]`. Podemos sobrecargar este método para que devuelva lo que queramos:
```javascript
class Alumno {
    ...
    toString() {
        return this.apellidos + ', ' + this.nombre
    }
}

let cpo = new Alumno('Carlos', 'Pérez Ortiz', 19);
console.log('Alumno:' + cpo)     // imprime 'Alumno: Pérez Ortíz, Carlos'
                                // en vez de 'Alumno: [object Object]'
```

Este método también es el que se usará si queremos ordenar una array de objetos (recordad que _.sort()_ ordena alfabéticamente para lo que llama al método _.toString()_ del objeto a ordenar). Por ejemplo, tenemos el array de alumnos _misAlumnos_ que queremos ordenar alfabéticamente. Si la clase _Alumno_ no tiene un método _toString_ habría que hacer como vimos en el tema de [Arrays](./02-arrays.md):
```javascript
misAlumnos.sort(function(alum1, alum2) {
    if (alum1.apellidos > alum2.apellidos)
      return -1
    if (alum1.apellidos < alum2.apellidos)
      return 1
    return alum1.nombre < alum2.nombre
});   
```

**NOTA**: si las cadenas a comparar pueden tener acentos u otros caracteres propios del idioma ese código no funcionará bien. La forma correcta de comparar cadenas es usando el
método `.localeCompare()`. El código anterior debería ser:
```javascript
misAlumnos.sort(function(alum1, alum2) {
    return alum1.apellidos.localeCompare(alum2.apellidos)
});   
```

que con _arrow function_ quedaría:
```javascript
misAlumnos.sort((alum1, alum2) => alum1.apellidos.localeCompare(alum2.apellidos) )
```

o si queremos comparar por 2 campos ('apellidos' y 'nombre')
```javascript
misAlumnos.sort((alum1, alum2) => (alum1.apellidos+alum1.nombre).localeCompare(alum2.apellidos+alum2.nombre) )
```

Pero con el método _toString_ que hemos definido antes podemos hacer directamente:
```javascript
misAlumnos.sort() 
```

**NOTA**: si queremos ordenar un array de objetos por un campo numérico lo mas sencillo es restar dicho campo:
```javascript
misAlumnos.sort((alum1, alum2) => alum1.edad - alum2.edad)
```

> EJERCICIO: modifica las clases Productos y Televisores para que el método que muestra los datos del producto se llame de una manera más adecuada

> EJERCICIO: Crea 5 productos y guárdalos en un array. Crea las siguientes funciones (todas reciben ese array como parámetro):
> - prodsSortByName: devuelve un array con los productos ordenados alfabéticamente
> - prodsSortByPrice: devuelve un array con los productos ordenados por importe
> - prodsTotalPrice: devuelve el importe total del los productos del array, con 2 decimales
> - prodsWithLowUnits: además del array recibe como segundo parámetro un nº y devuelve un array con todos los productos de los que quedan menos de los unidades indicadas
> - prodsList: devuelve una cadena que dice 'Listado de productos:' y en cada línea un guión y la información de un producto del array

### valueOf()
Al comparar objetos (con >, <, ...) se usa el valor devuelto por el método _.toString()_ pero si definimos un método **_.valueOf()_** será este el que se usará en comparaciones:
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

## POO en JS5
Las versiones de Javascript anteriores a ES2015 no soportan clases ni herencia. Este apartado está sólo para que comprendamos este código si lo vemos en algún programa pero nosotros programaremos como hemos visto antes.

En Javascript un objeto se crea a partir de otro (al que se llama _prototipo_). Así se crea una cadena de prototipos, el primero de los cuales es el objeto _null_.

Si queremos emular en JS5 el comportamiento de las clases, para crear el constructor se crea una función con el nombre del objeto y para crear los métodos se aconseja hacerlo en el _prototipo_ del objeto para que no se cree una copia del mismo por cada instancia que creemos:
```javascript
function Alumno(nombre, apellidos, edad) {
    this.nombre = nombre
    this.apellidos = apellidos
    this.edad = edad
}
Alumno.prototype.getInfo = function() {
        return 'El alumno ' + this.nombre + ' ' + this.apellidos + ' tiene ' + this.edad + ' años'
    }
}

let cpo = new Alumno('Carlos', 'Pérez Ortiz', 19)
console.log(cpo.getInfo())     // imprime 'El alumno Carlos Pérez Ortíz tiene 19 años'
```

Cada objeto tiene un prototipo del que hereda sus propiedades y métodos (es el equivalente a su clase, pero en realidad es un objeto que está instanciado). Si añadimos una propiedad o método al prototipo se añade a todos los objetos creados a partir de él lo que ahorra mucha memoria.

## Bibliografía
* Curso 'Programación con JavaScript'. CEFIRE Xest. Arturo Bernal Mayordomo
