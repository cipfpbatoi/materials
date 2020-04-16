# Programación Orientada a Objetos en Javascript

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

## Introducción
Desde ES2015 la POO en Javascript es similar a como se hace en otros lenguajes: clases, herencia, ... 

Se pueden crear con **new** o creando un _literal object_ (usando notación **JSON**). Con _new_:
```javascript
let alumno=new Object();
alumno.nombre='Carlos';     // se crea la propiedad 'nombre' y se le asigna un valor
alumno['apellidos']='Pérez Ortiz';    // se crea la propiedad 'apellidos'
alumno.edad=19;
alumno.getInfo=function() {
    return 'El alumno '+this.nombre+' '+this.apellidos+' tiene '+this.edad+'años';
}
```

Creando un _literal object_ (es la forma recomendada) el ejemplo anterior sería:
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

Aunque tanto en un caso como en otro lo que se está haciendo realmente (también se pueden crear así) es:
```javascript
let alumno=Objectcreate({});
...
```

## Propiedades de un objeto
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

En ES6 si el valor de una propiedad es una función podemos ponerlo como:
```javascript
    ...
    getInfo() {
        return 'El alumno '+this.nombre+' '+this.apellidos+' tiene '+this.edad+'años';
    }
    ...
```

o en forma de _arrow function_:
```javascript
    ...
    getInfo: () => 'El alumno '+this.nombre+' '+this.apellidos+' tiene '+this.edad+'años';
    ...
```

Además si queremos que el valor de una propiedad sea el de una variable que se llama como ella no es necesario ponerlo:
```javascript
let nombre='Carlos';

let alumno={
    nombre,                           // es equivalente a nombre: nombre
    apellidos: 'Pérez Ortiz',
    ...
```

> EJERCICIO: Crea un objeto llamado tvSamsung con las propiedades nombre (TV Samsung 42"), categoria (Televisores), unidades (4), precio (345.95) y con un método llamado importe que devuelve el valor total de las unidades (nº de unidades * precio)

## Clases
Desde ES2015 funcionan como en la mayoría de lenguajes:
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

> EJERCICIO: Crea una clase Productos con las propiedades y métodos del ejercicio anterior. Además tendrá un método getInfo que devolverá: 'Nombre (categoría): unidades uds x precio € = importe €'. Crea 3 productos diferentes.

### Ojo con _this_
Dentro de una función se crea un nuevo contexto y la variable _this_ pasa a hacer referencia a dicho contexto. Si en el ejemplo anterior hiciéramos algo como esto:
```javascript
class Alumno {
    ...
    getInfo() {
        return 'El alumno ' + nomAlum() +' tiene ' + this.edad + ' años';
        function nomAlum() {
            return this.nombre + ' ' + this.apellidos;      // Aquí this no es el objeto Alumno
        }
    }
}
```

Este código fallaría porque dentro de _nomAlum_ la variable _this_ ya no hace referencia al objeto Alumno sino al contexto de la función. Este ejemplo no tiene mucho sentido pero a veces nos pasará en manejadores de eventos. Si debemos llamar a una función dentro de un método (o de un manejador de eventos) tenemos varias formas de pasarle el valor de _this_:
1. Pasárselo como parámetro
```javascript
    getInfo() {
        return 'El alumno ' + nomAlum(this) +' tiene ' + this.edad + ' años';
        function nomAlum(alumno) {
            return alumno.nombre + ' ' + alumno.apellidos; 
        }
    }
```

2. Guardando el valor en otra variable (como _that_)
```javascript
    getInfo() {
        let that = this;
        return 'El alumno ' + nomAlum() +' tiene ' + this.edad + ' años';
        function nomAlum() {
            return that.nombre + ' ' + that.apellidos;      // Aquí this no es el objeto Alumno
        }
    }
```

3. Usando una _arrow function_ que no crea un nuevo contexto por lo que _this_ conserva su valor
```javascript
    getInfo() {
        return 'El alumno ' + nomAlum() +' tiene ' + this.edad + ' años';
        let nomAlum = () => this.nombre + ' ' + this.apellidos; 
    }
```

4. Haciendo un _bind_ de _this_ (lo varemos al hablar de eventos)

Esto nos puede ocurrir en las funciones manejadoras de eventos que veremos en próximos temas.

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

> EJERCICIO: crea una clase Televisores que hereda de Productos y que tiene una nueva propiedad llamada tamaño. El método getInfo mostrará el tamaño junto al nombre

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
Al convertir un objeto a string (por ejemplo al hacer un `console.log` o al concatenarlo) se llama al método **_.toString()_** del mismo, que devuelve `[object Object]`. Podemos sobrecargar este método para que devuelva lo que queramos:
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

Este método también es el que se usará si queremos ordenar una array de objetos (recordad que _.sort()_ ordena alfabéticamente para lo que llama al método _.toString()_ del objeto a ordenar). Por ejemplo, tenemos el array de alumnos _misAlumnos_ que queremos ordenar alfabéticamente. Ya no es necesario hacer:
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

> EJERCICIO: modifica las clases Productos y Televisores para que el método que muestra los datos del producto se llame de una manera más adecuada
es
> EJERCICIO: Crea 5 productos y guárdalos en un array. Crea las siguientes funciones (todas reciben ese array como parámetro):
> - prodsSortByName: devuelve un array con los productos ordenados alfabéticamente
> - prodsSortByPrice: devuelve un array con los productos ordenados por importe
> - prodsTotalPrice: devuelve el importe total del los productos del array, con 2 decimales
> - prodsWithLowUnits: además del array recibe como segundo parámetro un nº y devuelve un array con todos los productos de los que quedan menos de los unidades indicadas
> - prodsList: devuelve una cadena que dice 'Listado de productos:' y en cada línea un guión y la información de un producto del array

## POO en ES5
Las versiones de Javascript anteriores a ES2015 no soportan clases ni herencia. Este apartado está sólo para que comprendamos este código si lo vemos en algún programa pero nosotros programaremos como hemos visto antes.

En Javascript un objeto se crea a partir de otro (al que se llama _prototipo_). Así se crea una cadena de prototipos, el último de los cuales es el objeto _null_.

Si queremos emular el comportamiento de las clases, para crear el constructor se crea una función con el nombre del objeto y para crear los métodos se aconseja hacerlo en el _prototipo_ del objeto para que no se cree una copia del mismo por cada instancia que creemos:
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

Cada objeto tiene un prototipo del que hereda sus propiedades y métodos (es el equivalente a su clase, pero en realidad es un objeto que está instanciado). Si añadimos una propiedad o método al prototipo se añade a todos los objetos creados a partir de él lo que ahorra mucha memoria.

## Bibliografía
* Curso 'Programación con JavaScript'. CEFIRE Xest. Arturo Bernal Mayordomo
