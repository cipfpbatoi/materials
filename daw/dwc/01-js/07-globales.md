<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Objetos y Funciones globales. Expresiones regulares. Validación de formularios](#objetos-y-funciones-globales-expresiones-regulares-validaci%C3%B3n-de-formularios)
  - [Introducción](#introducci%C3%B3n)
  - [Funciones globales](#funciones-globales)
  - [Objetos del lenguaje](#objetos-del-lenguaje)
  - [Objeto Math](#objeto-math)
  - [Objeto Date](#objeto-date)
  - [RegExp](#regexp)
    - [Patrones](#patrones)
    - [Métodos](#m%C3%A9todos)
  - [Validación de formularios](#validaci%C3%B3n-de-formularios)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Objetos y Funciones globales. Expresiones regulares. Validación de formularios

## Introducción
En este tema vamos a ver 3 cosas fiferentes:
* las funciones globales de Javascript, muchas de las cuales ya hemos visto como _Number()_ o _String()_
* objetos globales que incorpora Javascript y que nos facilitarán mucho el trabajo (especialmente a la hora de trabajar con fechas)
* expresiones regulares, que son iguales que en otros lenguajes, y que nos serán de gran ayuda, sobre todo a la hora de validar formularios

## Funciones globales
* `parseInt(valor)`: devuelve el valor pasado como parámetro convertido a entero o _NaN_ si no es posible la conversión. Este método es mucho más permisivo que _Number_ y convierte cualquier cosa que comience por un número (si encuentra un carácter no numérico detiene la conversión y devuelve lo convertido hasta el momento). Ejemplos:
```javascript
console.log( parseInt(3.84) );            // imprime 3 (ignora los decimales)
console.log( parseInt('3.84') );          // imprime 3
console.log( parseInt('28manzanas') );    // imprime 28
console.log( parseInt('manzanas28') );    // imprime NaN
```
* `parseFloat(valor)`: igual pero devuelve un número decimal. Ejemplos: 
```javascript
console.log( parseFloat(3.84) );            // imprime 3.84
console.log( parseFloat('3.84') );          // imprime 3.84
console.log( parseFloat('3,84') );          // imprime 3 (la coma no es un carácter numérico)
console.log( parseFloat('28manzanas') );    // imprime 28
console.log( parseFloat('manzanas28') );    // imprime NaN
```
* `Number(valor)`: convierte el valor a un número. Es como _parseFloat_ pero más estricto y si no puede convertir todo el valor devuelve _NaN_. Ejemplos:
```javascript
console.log( Number(3.84) );            // imprime 3.84
console.log( Number('3.84') );          // imprime 3.84
console.log( Number('3,84') );          // imprime NaN (la coma no es un carácter numérico)
console.log( Number('28manzanas') );    // imprime NaN
console.log( Number('manzanas28') );    // imprime NaN
```
* `String(valor)`: convierte el valor pasado a una cadena de texto. Si le pasamos un objeto llama al método _.toString()_ del objeto. Ejemplos:
```javascript
console.log( String(3.84) );                  // imprime '3.84'
console.log( String([24, 3. 12]) );           // imprime '24,3,12'
console.log( {nombre: 'Marta', edad: 26} );   // imprime "[object Object]"
```
* `isNaN(valor)`: devuelve _true_ si lo pasado NO es un número o no puede convertirse en un número. Ejemplos:
```javascript
console.log( isNaN(3.84) );            // imprime false
console.log( isNaN('3.84') );          // imprime false
console.log( isNaN('3,84') );          // imprime true (la coma no es un carácter numérico)
console.log( isNaN('28manzanas') );    // imprime true
console.log( isNaN('manzanas28') );    // imprime true
```
* `isFinite(valor)`: devuelve _false_ si es número pasado es infinito (o demasiado grande)
```javascript
console.log( isFinite(3.84) );            // imprime true
console.log( isFinite(3.84 / 0) );            // imprime false
```
* `encodeURI(string)` / `decodeURI(string)`: transforma la cadena pasada a una URL codificada válida transformando los caracteres especiales que contenga, excepto , / ? : @ & = + $ #. Debemos usarla siempre que vayamos a pasar una URL. Ejemplo:
  * Decoded: “http://domain.com?val=1 2 3&val2=r+y%6"
  * Encoded: “http://domain.com?val=1%202%203&val2=r+y%256”
* `encodeURIComponent(string)` / `decodeURIComponent(string)`: transforma también os caracteres que no transforma la anterior. Debemos usarla para codificar parámetros pero no una URL entera. Ejemplo:
  * Decoded: “http://domain.com?val=1 2 3&val2=r+y%6"
  * Encoded: “http%3A%2F%2Fdomain.com%3Fval%3D1%202%203%26val2%3Dr%2By%256”
  
## Objetos del lenguaje
Además de los tipos primitivos de número, cadena, etc (que también se consideran objetos) JS tiene objetos Number, String, Array, Math, Date y RegExp. Ya hemos visto las principales propiedades y métodos de [_Number_](./01-sintaxis.html#number), [_String_](./01-sintaxis.html#string) y [_Array_](./02-arrays.html) y aquí vamos a ver las del resto.

## Objeto Math
Proporciona constantes y métodos para trabajar con valores numéricos:
* constantes: `.PI` (número pi), `.E` (número de Euler), `.LN2` (algoritmo natural en base 2), `.LN10` (logaritmo natural en base 10), `.LOG2E` (logaritmo de E en base 2), `.LOG10E` (logaritmo de E en base 10), `.SQRT2` (raíz cuadrada de 2), `.SQRT1_2` (raíz cuadrada de 1⁄2). Ejemplos:
```javascript
console.log( Math.PI );            // imprime 3.141592653589793
console.log( Math.SQRT2 );         // imprime 1.4142135623730951
```
* `Math.round(x)`: redondea x al entero más cercano
* `Math.floor(x)`: redondea x hacia abajo (5.99 → 5. Quita la parte decimal)
* `Math.ceil(x)`: redondea x hacia arriba (5.01 → 6)
* `Math.min(x1,x2,...)`: devuelve el número más bajo de los argumentos que se le pasan.
* `Math.max(x1,x2,...)`: devuelve el número más alto de los argumentos que se le pasan.
* `Math.pow(x, y)`: devuelve x y (x elevado a y).
* `Math.abs(x)`: devuelve el valor absoluto de x.
* `Math.random()`: devuelve un número decimal aleatorio entre 0 (incluido) y 1 (no incluido). Si queremos un número entre otros rangos haremos `Math.random() * (max - min) + min` o si lo queremos sin decimales `Math.round(Math.random() * (max - min) + min)`
* `Math.cos(x)`: devuelve el coseno de x (en radianes).
* `Math.sin(x)`: devuelve el seno de x.
* `Math.tan(x)`: devuelve la tangente de x.
* `Math.sqrt(x)`: devuelve la raíz cuadrada de x

Ejemplos:
```javascript
console.log( Math.round(3.14) );     // imprime 3
console.log( Math.round(3.84) );     // imprime 4
console.log( Math.floor(3.84) );     // imprime 3
console.log( Math.ceil(3.14) );      // imprime 4
console.log( Math.sqrt(2) );         // imprime 1.4142135623730951
```

## Objeto Date
Es la clase que usremos siempre que vayamos a trabajar con fechas. Al crear una instancia de la clase le pasamos la fecha que queremos crear o lo dejamos en blanco para que nos cree la fecha actual:
```javascript
let date1=new Date();    // Mon Jul 30 2018 12:44:07 GMT+0200 (CEST) (es cuando he ejecutado la instrucción)
let date2=new Date('2018-07-30');    // Mon Jul 30 2018 02:00:00 GMT+0200 (CEST) (la fecha pasada a las 0h. GMT)
let date3=new Date('2018-07-30 05:30');  // Mon Jul 30 2018 05:30:00 GMT+0200 (CEST) (la fecha pasada a las 05:300h. local)
let date4=new Date(2018,7,30);    // Thu Ago 30 2018 00:00:00 GMT+0200 (CEST) (OJO: 0->Ene,1->Feb... y a las 0h. local)
let date5=new Date(2018,7,30,5,30);    // Thu Ago 30 2018 05:30:00 GMT+0200 (CEST) (OJO: 0->Ene,1->Feb,...)
let date6=new Date('07-30-2018');    // Mon Jul 30 2018 00:00:00 GMT+0200 (CEST) (OJO: formato MM-DD-AAAA)
let date7=new Date('30-Jul-2018');    // Mon Jul 30 2018 00:00:00 GMT+0200 (CEST) (tb. podemos poner 'Julio')
let date7=new Date(1532908800000);    // Mon Jul 30 2018 00:00:00 GMT+0200 (CEST) (miliseg. desde 1/1/1070)
```
Cuando ponemos la fecha como texto, como separador de las fechas podemos usar `-`, `/` o ` ` (espacio). Como separador de las horas debemos usar `:`. Cuando ponemos la fecha cono parámetros numéricos (separados por `,`) podemos poner valores fuera de rango que se sumarán al valor anterior. Por ejemplo:
```javascript
let date=new Date(2018,7,41);    // Mon Sep 10 2018 00:00:00 GMT+0200 (CEST) -> 41=31Ago+10Sep
let date=new Date(2018,7,0);     // Tue Jul 31 2018 00:00:00 GMT+0200 (CEST) -> 0=0Ago=31Jul (el anterior)
let date=new Date(2018,7,-1);    // Mon Jul 30 2018 00:00:00 GMT+0200 (CEST) -> -1=0Ago-1=31Jul-1=30Jul
```
OJO con el rango de los meses que empieza en 0->Ene, 1->Feb,...,11->Dic

Tenemos métodos **_getter_** y **_setter_** para obtener o cambiar los valores de una fecha: 
* **fullYear**: permite ver (_get_) y cambiar (_set_) el año de la fecha:
```javascript
let fecha=new Date('2018-07-30');    // Mon Jul 30 2018 02:00:00 GMT+0200 (CEST)
console.log( fecha.getFullYear() );  // imprime 2018
fecha.setFullYear(2019);             // Tue Jul 30 2019 02:00:00 GMT+0200 (CEST)
```
* **month**: devuelve/cambia el número de mes, pero recuerda que 0->Ene,...,11->Dic
```javascript
let fecha=new Date('2018-07-30');    // Mon Jul 30 2018 02:00:00 GMT+0200 (CEST)
console.log( fecha.getMonth() );     // imprime 6
fecha.setMonth(8);                   // Mon Sep 30 2019 02:00:00 GMT+0200 (CEST)
```
* **date**: devuelve/cambia el número de día:
```javascript
let fecha=new Date('2018-07-30');    // Mon Jul 30 2018 02:00:00 GMT+0200 (CEST)
console.log( fecha.getDate() );      // imprime 30
fecha.setDate(-2);                   // Thu Jun 28 2018 02:00:00 GMT+0200 (CEST)
```
* **day**: devuelve el número de día de la semana (0->Dom, 1->Lun, ..., 6->Sáb). Este método NO tiene _setter_:
```javascript
let fecha=new Date('2018-07-30');    // Mon Jul 30 2018 02:00:00 GMT+0200 (CEST)
console.log( fecha.getDay() );       // imprime 1
```
* **hours**, **minutes**, **seconds**, **milliseconds**, : devuelve/cambia el número de la hora, minuto, segundo o milisegundo, respectivamente.
* **time**: devuelve/cambia el número de milisegundos desde Epoch(1/1/1970 00:00:00 GMT):
```javascript
let fecha=new Date('2018-07-30');    // Mon Jul 30 2018 02:00:00 GMT+0200 (CEST)
console.log( fecha.getTime() );      // imprime 1532908800000
fecha.setTime(1000*60*60*24*25);     // Fri Jan 02 1970 01:00:00 GMT+0100 (CET) (le hemos añadido 25 días a Epoch)
```

Para mostrar la fecha tenemos varios métodos diferentes:
* **.toString()**: "Mon Jul 30 2018 02:00:00 GMT+0200 (CEST)"
* **.toUTCString()**: "Mon, 30 Jul 2018 00:00:00 GMT"
* **.toDateString()**: "Mon, 30 Jul 2018"
* **.toTimeString()**: "02:00:00 GMT+0200 (hora de verano de Europa central)"
* **.toISOString()**: "2018-07-30T00:00:00.000Z"
* **.toLocaleString()**: "30/7/2018 2:00:00"
* **.toLocaleDateString()**: "30/7/2018"
* **.toLocaleTimeString()**: "2:00:00"

**NOTA**: recuerda que las fchas son objetos y que se copian y se pasan como parámetro por refrencia:
```javascript
let fecha=new Date('2018-07-30');    // Mon Jul 30 2018 02:00:00 GMT+0200 (CEST)
let otraFecha=fecha;
otraFecha.setDate(28);               // Thu Jun 28 2018 02:00:00 GMT+0200 (CEST)
console.log( fecha.getDate() );      // imprime 28 porque fecha y otraFecha son el mismo objeto
```
Una forma sencilla de copiar una fecha es crear una nueva pasándole el tiempo Epoch de la que queremos copiar:
```javascript
let fecha=new Date('2018-07-30');    // Mon Jul 30 2018 02:00:00 GMT+0200 (CEST)
let otraFecha=nre Date(fecha.getTime());
otraFecha.setDate(28);               // Thu Jun 28 2018 02:00:00 GMT+0200 (CEST)
console.log( fecha.getDate() );      // imprime 30
```
**NOTA**: la comparación entre fechas funciona correctamente con los operadores `>`, `>=`, `<` y `<=` pero NO con `==`, `===`, `!==` y `!===` ya que compara los objetos y ve que son objetos diferentes. Si queremos saber si 2 fechas son iguales (siendo diferentes objetos) el código que pondremos NO es `fecha1==fecha2` sino `fecha1.getTime()==fecha2.getTime()`.

Podemos probar los distintos métodos de las fechas en la página de [w3schools](http://www.w3schools.com/jsref/jsref_obj_date.asp).

## RegExp
Las expresiones regulres permiten buscar un patrón dado en una cadena de texto. Se usan mucho a la hora de validar formularios o para buscar y reemplazar texto. En Javascript se crean ponién solas entre `/` o instanciándolas de la clase _RegExp_:
```javascript
let cadena='Hola mundo';
let expr=/mundo/;
expr.test(cadena);      // devuelve true porque en la cadena se encuentra la expresión 'mundo'
```

### Patrones
La potencia de las expresiones regulares es que podemos usar patrones para construir la expresión. Los más comunes son:
* **\[..]** (corchetes): dentro se ponen varios caracteres o un rango y permiten comprobar si el carácter de esa posición de la cadena coincide con alguno de ellos. Ejemplos:
  * `[abc]`: cualquier carácter de los indicados ('a' o 'b' o 'c')
  * `[^abc]`: cualquiera excepto los indicados
  * `[a-z]`: cualquier minúscula (el carácter '-' indica el rango entre 'a' y 'z', incluidas)
  * `[a-zA-Z]`: cualquier letra
* **( | )** (_pipe_): debe coincidir con una de las opciones indocadas:
  * `(x|y)`: la letra x o la y (sería equivalente a `[xy]`
  * `(http|https)`: cualquiera de las 2 palabras
* **Metacaracteres**:
  * `.` (punto): un único carácter, sea el que sea
  * `\d`: un dígito (`\D`: cualquier cosa menos dígito)
  * `\s`: espacio en blanco (`\S`: lo opuesto)
  * `\w`: una palabra o carácter alfanumérico (`\W` lo contrario)
  * `\b`: delimitador de palabra (espacio, ppio, fin)
  * `\n`: nueva línea
* **Cuantificadores**:
  * `+`: al menos 1 vez (ej. `[0-9]+` al menos un dígito)
  * `*`: 0 o más veces
  * `?`: 0 o 1 vez
  * `{n}`: n caracteres (ej. `[0-9]{5}` = 5 dígitos)
  * `{n,}`: n o más caracteres
  * `{n,m}`: entre n y m caracteres
  * `^`: al ppio de la cadena (ej.: `^[a-zA-Z]` = empieza por letra)
  * `$`: al final de la cadena (ej.: `[0-9]$` = que acabe en dígito)
* **Modificadores**:
  * `/i`: que no distinga entre Maysc y minsc (Ej. `/html/i` = buscará html, Html, HTML, ...)
  * `/g`: búsqueda global, busca todas las coincidencias y no sólo la primera
  * `/m`: busca en más de 1 línea (para cadenas con saltos de línea)
  
### Métodos
Los usaremos para saber si la cadena coincide con determinada expresión o para buscar y reemplazar texto:
* `expr.test(cadena)`: devuelve **true** si la cadena coincide con la expresión. Con el modificador _/g_ hará que cada vez que se llama busque desde la posición de la última coincidencia. Ejemplo:

```javascript
let str = "I am amazed in America";
let reg = /am/g;
console.log(reg.test(str)); // Imprime true
console.log(reg.test(str)); // Imprime true
console.log(reg.test(str)); // Imprime false, hay solo dos coincidencias

let reg2 = /am/gi;          // ahora no distinguirá mayúsculas y minúsculas
console.log(reg.test(str)); // Imprime true
console.log(reg.test(str)); // Imprime true
console.log(reg.test(str)); // Imprime true. Ahora tenemos 3 coincidencias con este nuevo patrón
```

* `expr.exec(cadena)`: igual pero en vez de _true_ o _false_ devuelve un objeto con la coincidencia encontrada, su posición y la cadena completa:

```javascript
let str = "I am amazed in America";
let reg = /am/gi;
console.log(reg.exec(str)); // Imprime ["am", index: 2, input: "I am amazed in America"]
console.log(reg.exec(str)); // Imprime ["am", index: 5, input: "I am amazed in America"]
console.log(reg.exec(str)); // Imprime ["Am", index: 15, input: "I am amazed in America"]
console.log(reg.exec(str)); // Imprime null
```

* `cadena.match(expr)`: igual que _exec_ pero se aplica a la cadena y se le pasa la expresión. Si ésta tiene el modificador _/g_ devolverá un array con todas las coincidencis:

```javascript
let str = "I am amazed in America";
let reg = /am/gi;
console.log(str.match(reg)); // Imprime ["am", "am", "Am"}
```

* `cadena.search(expr)`: devuelve la posición donde se encuentra la coincidencia buscada o -1 si no aparece
* `cadena.replace(expr, cadena2)`: devuelve una nueva cadena xon las coincidncias de la cadena reemplazadas por la cedena pasada como 2º parámetro:

```javascript
let str = "I am amazed in America";
console.log(str.replace(/am/gi, "xx")); // Imprime "I xx xxazed in xxerica"

console.log(str.replace(/am/gi, function(match) {
  return "-" + match.toUpperCase() + "-";
})); // Imprime "I -AM- -AM-azed in -AM-erica"
```

No vamos a profundizar más sobre las expresiones regulares. Es muy fácil encontrar por internet la que necesitemos (para validar un e-mail, un NIF, un CP, ...). Podemos aprender más en:
* [w3schools](http://www.w3schools.com/jsref/jsref_obj_regexp.asp)
* [regular-expressions.info](http://www.regular-expressions.info/)
* [html5pattern](http://html5pattern.com/) atributo
* y muchas otras páginas

También, hay páginas que nos permiten probar expresiones regulares con cualquier texto, como [regexr](http://regexr.com/).

## Validación de formularios
Es una de las principales tareas para las que usaremos expresiones regulares. Los datos introducidos por los usuarios en un formulario SIEMPRE deben ser validados en el servidor pero una validación previa en el cliente es muy útil por:
* el usuario obtiene inmediatamente la información sobre el error producido, sin tener que esperar la respuesta del servidor
* no cargamos de trabajo al servidor haciéndole procesar un formulario no válido

Sin embargo la validación en el cliente NO puede sustituir a la del servidor ya que en el navegador podemos manipular los datos que enviamos o deshabilitar javascript.

HTML5 incorpora la posibilidad de validar los formularios añadiendo a los elementos los atributos:
* **required**: indica que el campo es obligatorio y no se puede dejar vacío
* **pattern**: nos permite poner una expresión regular con la que debe concordar lo introducid en ese campo. Este atribito sólo puede aplicarse a \<input>, no a \<textarea>. Los \<input> de tipo _mail_ o _url_ ya tienen incorporado internamente el pattern correspondiente por lo que no es necesario indicarlo
* **maxlength**: permite indicar el número máximo de caracteres de un elemento. Normalmente el navegador no permite seguir escribiendo al llegar al máximo indicado
* **min**, **max**: permiten especificar un rango dentro del cual tiene que estar el valor proporcionado en el elemento

Si un elemento no es válido recibe automáticamente la pseudoclase CSS **:invalid** y si es válido la pseudoclase CSS **:valid**.

Una opción para validar formularios es dejar que sea el navegador quien se encargue de ello, pero no tenemos apenas control sobre cuándo se informa de los errores y qué mensaje se muestra.

Otra opción es no validar nada con HTML5 y hacerlo todo mediante Javascript, en cuyo caso tenemos el control absoluto de lo que se haga, pero es un trabajo laborioso.

Y una tercera opción es aprovechar la **API de validación de formularios** del navegador pero encargándonos desde Javascript de controlar qué mensajes se dan y cuándo se muestran. El problema de esta solución (igual que la de que lo valide el navegador) es que esta API aún no está soportada totalmente por todos los navegadores (podemos consultar el soporte en [caniuse](https://caniuse.com/#feat=constraint-validation)). Para usar esta forma de validar los formularios debemos en el HTML poner los atributos que queramos controlar (required, type, maxlength, min, pattern, ...) pero deshabilitar la validación por parte del navegador (poniendo en la etiqueta\<form> el atribito **novalidate**). 

Podéis ver los distintos [métodos que incluye esta API](https://html.spec.whatwg.org/dev/form-control-infrastructure.html#the-constraint-validation-api) y un [completo ejemplo](https://css-tricks.com/form-validation-part-2-constraint-validation-api-javascript/) de cómo usarla para validar formularios. ALgunos de los métodos más útiles que incluye la API son:
* `_form_.checkValidity()`: devuelve **true** si todos los valores del formulario son válidos y **false** si alguno no lo es
* `_element_.checkValidity()`: devuelve **true** si el valor del elemento es válido y **false** si no lo es
* `_element_.validationMessage`: devuelve una cadena con el texto del error de validación del elemento
* `_element_.validaty.valueMissing`: devuelve **true** si el elemento no tiene valor pero tiene el atributo **required**
* `_element_.validaty.typeMismatch`: devuelve **true** si el valor del elemento no es del tipo correcto (el especificado en **type**)
* `_element_.validaty.patternMismatch`: devuelve **true** si el valor del elemento no cumple con lo indicado en su **pattern**
* `_element_.validaty.tooLong / tooShort`: devuelve **true** si la longitud del valor del elemento es mayor de lo especificado en **maxlength** / es menor de lo especificado en **minlength** 
* `_element_.validaty.rangeOverflow / rangeUnderflow`: devuelve **true** si el valor del elemento es mayor de lo especificado en **max** / es menor de lo especificado en **min** 
* `_element_.validaty.stepMismatch`: devuelve **true** si el valor del elemento no cumple con lo indicado en su **step**
* `_element_.validaty.customError`: devuelve **true** si al elemento le hemos puesto mediante código un error personalizado
* `_element_.setCustomValidity(msg)`: le pone al elemento un error personalizado y su propiedad _validationMessage_ será el mensaje pasado como parámetro. Este elemento ya no será válido hasta que le quitemos el error personalizado llamando a esta función con un mensaje vacío: `_element_.setCustomValidity('')`

En cualquier caso, debemos ser conscientes que los formularios son normalmente una carga que soportan los usuarios por lo que debemos ayudarles lo máximo posible a introducir los datos que les pedimos de forma fácil y clara. Para validar el formulario deberemos preguntarnos:
* Qué hacer si el formulario no es válído: normalmente no querré que se envíe al servidor. Además deberé decidir si quiero resaltar esos campos, mostrar mensajes de error (y en ese caso dónde: junto al alemento, al final del formulario, ...)
* Cómo ayudar al usuario a introducir los datos correctamente: si hay un error debemos mostrar un mensaje claro de qué ha hecho mal e incluso sugerencias o ejemplos de cómo debería hacerlo
* Usar validación remota cuando sea conveniente:en un formulario de registro no es agradable para el usuario rellenar todos los campos para que tras enviarse al servidor le conteste que el usuario escogido ya existe o algo similar. En este caso es conveniente hacer una petición Ajax (ya las veremos más adelante) para que el servidor nos diga si el usuario escogido está dsponible mientras se están rellenando los campos

Podéis ver ejemplos de cómo validar un formulario en [MDN](https://developer.mozilla.org/es/docs/Learn/HTML/Forms/Validacion_formulario_datos)
