<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Programación Orientada a Objetos en Javascript](#programaci%C3%B3n-orientada-a-objetos-en-javascript)
  - [Introducción](#introducci%C3%B3n)
  - [Clases](#clases)
    - [Herencia](#herencia)
    - [Métodos estáticos](#m%C3%A9todos-est%C3%A1ticos)
    - [toString() y valueOf()](#tostring-y-valueof)
  - [POO en ES5](#poo-en-es5)
  - [Bibliografía](#bibliograf%C3%ADa)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Programación Orientada a Objetos en Javascript

## Introducción
Desde ES2015 la POO en Javascript es similar a como se hace en otros lenguajes: clases, herencia, ... 

Se crean con **new** o usando notación **JSON**:console.log(alumno[prop]);        // imprime 'Carlos'
console.log(alumno[prop]);        // imprime 'Carlos'

```javascript
let .getInfo()=new Object();
alumno.nombre='Carlos';     // se crea la propiedad 'nombre' y se le asigna un valor
alumno['apellidos']='Pérez Ortiz';    // se crea la propiedad 'apellidos'
alumno.edad=19;
alumno.getInfo=function() {
    return 'El alumno '+this.nombre+' '+this.apellidos+' tiene '+this.edad+'años';
}
```

Usando **JSON** (recomendado) el ejemplo anteropr sería:
```javascript
let alumno={
    nombre: 'Carlos',
    apellidos: 'Pérez Ortiz',
    edad: 19,
    getInfo: function() {
        return 'El alumno '+this.nombre+' '+this.apellidos+' tiene '+this.edad+'años';
    }
};
```

Podemos acceder a las propiedades con `.` (punto) o `[ ]`:
```javascript
console.log(alumno.nombre);       // imprime 'Carlos'
console.log(alumno['nombre']);    // imprime 'Carlos'
let prop='nombre';
console.log(alumno[prop]);        // imprime 'Carlos'
console.log(alumno.getInfo());    // imprime 'El alumno Carlos Pérez Ortíz tiene 19 años'
```

Podremos recorrer las propiedades de un objecto con `for..in`:
```javascript
for (let prop in alumno) {
    console.log(prop+': '+alumno[prop]);
}
```

## Clases
Desde ES2015 funcionan como en la mayoría de lengiajes:
```javascript
class Alumno {
    constructor(nombre, apellidos, edad) {
        this.nombre=nombre;
        this.apellidos=apellidos;
        this.edad=edad;
    }
    getInfo() {
        return 'El alumno '+this.nombre+' '+this.apellidos+' tiene '+this.edad+' años';
    }
}

let cpo=new Alumno('Carlos', 'Pérez Ortiz', 19);
console.log(cpo.getInfo());     // imprime 'El alumno Carlos Pérez Ortíz tiene 19 años'
```

### Herencia
Una clase puede heredar de otra utilizando la palabra reservada **extends** y heredará todas sus propiedades y métodos. Podemos sobrescribirlos en la clase hija (seguimos pudiendo llamar a los métodos de la clase padre utilizando la palabra reservada **super** -es lo que haremos si creamos un constructor en la clase hija-).
```javascript
class AlumnInf extends Alumno{
    constructor(nombre, apellidos, edad, ciclo) {
        super(nombre, apellidos, edad);
        this.ciclo=ciclo;
    }
    getInfo() {
        return super.getInfo()+' y estudia el Grado '+(this.getGradoMedio?'Medio':'Superior')+' de '+this.ciclo;
    }
    getGradoMedio() {
        if (this.ciclo.toUpperCase==='SMX')
            return true;
        return false;
    }
}

let cpo=new AlumnInf('Carlos', 'Pérez Ortiz', 19, 'DAW');
console.log(cpo.getInfo());     // imprime 'El alumno Carlos Pérez Ortíz tiene 19 años y estudia el Grado Superior de DAW'
```

### Métodos estáticos
En ES2015 podemos declarar métodos estáticos, pero no propiedades estáticas. Estos métodos se llaman directamente utilizando el nombre de la clase y no tienen acceso al objeto _this_ (ya que no hay objeto instanciado).
```javascript
class User {
    ...
    static getRoles() {
        return ["user", "guest", "admin"];
    }
}

console.log(User.getRoles()); // ["user", "guest", "admin"]
let user = new User("john");
console.log(user.getRoles()); // Uncaught TypeError: user.getRoles is not a function
```

### toString() y valueOf()
Al convertir un objeto a string (por ejemplo al hacer un `console.log` o al concatenarlo) se llama al método **_.toString()_** del mismo que devuelve `[object Object]`. Podemos sobrecargar este método para que devuelva lo que queramos:
```javascript
class Alumno {
    ...
    toString() {
        return this.apellidos+', '+this.nombre;
    }
}

let cpo=new Alumno('Carlos', 'Pérez Ortiz', 19);
console.log(cpo);     // imprime 'Pérez Ortíz, Carlos'
```

Este método también es el que se usará si queremos ordenar una array de objetos (recordad que _.sort()_ ordena alfabéticamente para lo que llama al método _.toString()_ del objeto a ordenar. Por ejemplo, tenemos el array de alumnos _misAlumnos_ que queremos ordenar alfabéticamente. Ya no es necesario hacer:
```javascript
misAlumnos.sort(function(alum1, alum2) {
    if (alum1.apellidos > alum2.apellidos)
      return -1
    if (alum1.apellidos < alum2.apellidos)
      return 1
    return alum1.nombre < alum2.nombre
});   
```
como vimos en el tema de [Arrays](./02-arrays.md) sino que podemos hacer directamente:
```javascript
misAlumnos.sort();   
```
Al comparar objetos (con >, <, ...) se usa el valor devuelto por el método _.toString()_ pero si sobrecargamos el método **_.valueOf()_** será este el que se usará en comparaciones:
```javascript
class Alumno {
    ...
    valueOf() {
        return this.edad;
    }
}

let cpo=new Alumno('Carlos', 'Pérez Ortiz', 19);
let cpo2=new Alumno('Ana', 'Abad Tudela', 23);
console.log(cpo<cpo2);     // imprime true ya que 19<23
```

## POO en ES5
Las versiones de Javascript anteriores a ES2015 no soportan clases ni herencia por lo que había que emularlas. Este apartado está sólo para que comprendamos este código si lo vemos en algún programa pero nosotros programaremos como hemos visto antes.

Para crear el constructor se creaba una función con el nombre del objeto y para crear los métodos se aconsejaba hacerlo en el _prototipo_ del objeto para que no se creara una copia del mismo por cada instancia que creemos:
```javascript
function Alumno(nombre, apellidos, edad) {
    this.nombre=nombre;
    this.apellidos=apellidos;
    this.edad=edad;
}
Alumno.prototype.getInfo=function() {
        return 'El alumno '+this.nombre+' '+this.apellidos+' tiene '+this.edad+' años';
    }
}

let cpo=new Alumno('Carlos', 'Pérez Ortiz', 19);
console.log(cpo.getInfo());     // imprime 'El alumno Carlos Pérez Ortíz tiene 19 años'
```

Cada objeto tiene un prototipo del que hereda sus propiedades y métodos (es el equivalente a su clase). Si añadimos una propiedad o método al prototipo se añade a todos los objetos creados a partir de él.

## Bibliografía
* Curso 'Programación con JavaScript'. CEFIRE Xest. Arturo Bernal Mayordomo
