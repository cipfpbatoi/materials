# Validación de formularios
Índice:
- [Validación de formularios](#validación-de-formularios)
  - [Introducción](#introducción)
    - [Validación del navegador incorporada en HTML5](#validación-del-navegador-incorporada-en-html5)
    - [Validación mediante la API de validación de formularios](#validación-mediante-la-api-de-validación-de-formularios)
      - [Ejemplo](#ejemplo)
    - [yup](#yup)
  - [Expresiones regulares](#expresiones-regulares)
    - [Patrones](#patrones)
    - [Métodos](#métodos)


## Introducción
En este tema vamos a ver cómo realizar una de las acciones principales de Javascript que es la validación de formularios en el lado cliente.

Se trata de una verificación útil porque evita enviar datos al servidor que sabemos que no son válidos pero NUNCA puede sustituir a la validación en el lado servidor ya que en el lado cliente se puede manipular el código desde la consola para que se salte las validaciones que le pongamos.

Podéis encontrar una guía muy completa de validación de formularios en el lado cliente el la página de [MDN web docs](https://developer.mozilla.org/es/docs/Learn/HTML/Forms/Validacion_formulario_datos) que ha servido como base para estos apuntes.

Básicamente tenemos 2 maneras de validar un formulario en el lado cliente:
- usar la validación incorporada en HTML5 y dejar que sea el navegador quien se encargue de todo
- realizar nosotros la validación mediante Javascript

La ventaja de la primera opción es que no tenemos que escribir código sino simplemente poner unos atributos a los INPUT que indiquen qué se ha de validar. La principal desventaja es que no tenemos ningún control sobre el proceso, lo que provocará cosas como:
- el navegador valida campo a campo: cuando encuentra un error en un campo lo muestra y hasta que no se soluciona no valida el siguiente lo que hace que el proceso sea molesto apra el usuario que no ve todo lo que hay mal de una vez
- los mensajes son los predeterminados del navegador y en ocasiones pueden no ser muy claros para el usuario
- los mensajes se muestran en el idioma en que está configurado el navegador, no en el de nuestra página

Además, al final de este tema, veremos una pequeña introducción a las expresiones regulares en Javascript.

### Validación del navegador incorporada en HTML5
Funciona añadiendo atributos a los campos del formulario que queremos validar. Los más usados son:
- **required**: indica que el campo es obligatorio. La valdación fallará si no hay nada escrito en el input. En el caso de un grupo de _radiobuttons_ se pone sobre cualquiera de ellos (o sobre todos) y obliga a que haya seleccionada una opción cualquiera del grupo
- **pattern**: obliga a que el contenido del campo cumpla la expresión regular indicada. Por ejemplo para un código postal sería `pattern="^[0-9]{5}$"`
- **minlength** / **maxlength**: indica la longitud mínima/máxima del contenido del campo
- **min** / **max**: indica el valor mínimo/máximo del contenido de un campo numérico

También producen errores de validación si el contenido de un campo no se adapta al _type_ indicado (email, number, ...) o si el valor de un campo numérico no cumple con el _step_ indicado.

Cuando el contenido de un campo es valido dicho campo obtiene automáticamente la pseudoclase **:valid** y si no lo es tendrá la pseudoclase **:invalid** lo que nos permite poner reglas en nuestro CSS para destacar dichos campos, por ejemplo:
```css
input:invalid {
  border: 2px dashed red;
}
```

La validación se realiza al enviar el formulario y al encontrar un error se muestra, se detiene la validación del resto de campos y no se envía el formulario.

### Validación mediante la API de validación de formularios
Mediante Javscript tenemos acceso a todos los campos del formulario por lo que podemos hacer la validación como queramos, pero es una tarea pesada, repetitiva y que provoca código spaguetti difícil de leer y mantener más adelante.

Para hacerla más simple podemos usar la [API de validación de formularios](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation) de HTML5 que permite que sea el navegador quien se encargue de comprobar la validez de cada campo pero las acciones (mostrar mensajes de error, no enviar el formulario, ...) las realizamos desde Javascript.

Esto nos da la ventaja de:
- los requisitos de validación de cada campo están como atributos HTML de dicho campo por lo que son fáciles de ver
- nos evitamos la mayor parte del código dedicada a comprobar si el contenido del campo es válido. Nosotros mediante la API sólo preguntamos si se cumplen o no y tomamos las medidas adecuadas
- aprovechamos las pseudo-clases _:valid_ o _:invalid_ que el navegador pone automáticamente a los campos por lo que no tenemos que añadirles clases para desacarlos

Las principales propiedades y métodos que nos proporciona esta API son:
- **checkValidity()**: método que nos dice si el campo al que se aplica es o no válido. También se puede aplicar al formulario para saber si es válido o no
- **validationMessage**: en caso de que un campo no sea válido esta propiedad contiene el texto del error de validación proporcionado por el navegador. Si es válido esta propiedad es una cadena vacía
- **[validity](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)**: es un objeto que tiene propiedades booleanas para saber qué requisito del campo es el que falla:
  - **valueMissing**: indica si no se cumple el atributo **_required_** (es decir, valdrá _true_ si el campo tiene el atributo _required_ pero no se ha introducido nada en él)
  - **typeMismatch**: indica si el contenido del campo no cumple con su atributo **_type_** (ej. type="email")
  - **patternMismatch**: indica si no se cumple con el **_pattern_** indicado en su atributo
  - **tooShort** / **tooLong**: indican si no se cumple el atributo **_minlength_** o **_maxlength_** respectivamente
  - **rangeUnderflow** / **rangeOverflow**: indica si no se cumple el atributo **_min_** / **_max_**
  - **stepMismatch**: indica si no se cumple el atributo **_step_** del campo
  - **customError**: indica al campo se le ha puesto un error personalizado con **_setCustomValidity_**
  - **valid**: indica si es campo es válido
  -   - ...
- **setCustomValidity(mensaje)**: añade un error personalizado al campo (que ahora ya NO será válido) con el mensaje pasado como parámetro. Para quitar este error se hace `setCustomValidity('')`

En la página de [W3Schools](https://www.w3schools.com/js/js_validation_api.asp) podéis ver algún ejemplo básico de esto. También a continuación tenéis un ejemplo simple del valor de las diferentes propiedades involucradas en la validación de un campo de texto que es obligatorio y cuyo tamaño debe estar entre 5 y 50 caracteres:

<script async src="//jsfiddle.net/juansegura/vbdrxjsz/embed/"></script>

Para validar un formulario nosotros pero usando esta API debemos añadir al \<FORM> el atributo **novalidate** que hace que no se encargue el navegador de mostrar los mensajes de error ni de decidir si se envía o no el formulario (aunque sí valida los campos) sino que lo haremos nosotros.

#### Ejemplo
Un ejemplo sencillo de validación de un formulario podría ser:
- index.html

```html
<form novalidate>
  <label for="nombre">Por favor, introduzca su nombre (entre 5 y 50 caracteres): </span>
  <input type="text" id="nombre" name="nombre" required minlength="5" maxlength="50">
  <span class="error"></label>
  <br />
  <label for="mail">Por favor, introduzca una dirección de correo electrónico: </label>
  <input type="email" id="mail" name="mail" required minlength="8">
  <span class="error"></span>
  <button type="submit">Enviar</button>
</form>
```

- main.js

```javascript
const form  = document.getElementsByTagName('form')[0];

const nombre = document.getElementById('nombre');
const nombreError = document.querySelector('#nombre + span.error');
const email = document.getElementById('mail');
const emailError = document.querySelector('#mail + span.error');

form.addEventListener('submit', (event) => {
  if(!form.checkValidity()) {
    event.preventDefault();
  }
  nombreError.textContent = nombre.validationMessage;
  emailError.textContent = email.validationMessage;
});
```

- style.css

```css
.error {
  color: red;
}

input:invalid {
  border: 2px dashed red;
}
```

Estamos usando 
- `validationMessage` para mostrar el posible error de cada campo, o quitar el error cuando el campo sea válido
- `checkValidity()` para no enviar/procesar el formulario si contiene errores

Si no nos gusta el mensaje del navegador y queremos personalizarlo podemos hacer una función que reciba un \<input> y usando su propiedad `validity` devuelva un mensaje en función del error detectado:
```javascript
function customErrorValidationMessage(input) {
  if (input.checkValidity()) {
    return ''
  }
  if (input.validity.valueMissing) {
    return 'Este campo es obligatorio'
  }
  if (input.validity.tooShort) {
    return `Debe tener al menos ${input.minLength} caracteres` 
  }
  // Y seguiremos comprobando cada atributo que hayamos usado en el HTML
  return 'Error en el campo'   // por si se nos ha olvidado comprobar algo
}
```

Y ahora en vez de `nombreError.textContent = nombre.validationMessage` haremos `nombreError.textContent = customErrorValidationMessage(nombre)`.

Si tenemos que validar algo que no puede hacerse mediante atributos HTML (por ejemplo si el nombre de usuario ya está en uso) deberemos hacer la validación "a mano" y en caso de no ser válido ponerle un error con `.setCustomValidation()`, pero debemos recordar quitar el error si todo es correcto o el formulario siempre será inválido. Modificando el ejemplo:
```javascript
const nombre = document.getElementById('nombre');
const nombreError = document.querySelector('#nombre + span.error');

if (nombreEnUso(nombre)) {
  nombre.setCustomValidation('Ese nombre de usuario ya está en uso')
} else {
  nombre.setCustomValidation('')  // Se quita el error personalizado
}
form.addEventListener('submit', (event) => {
  if(!form.checkValidity()) {
    ...
  }
})
```

### yup
Existen múltiples librerías que facilitan enormenmente el tedioso trabajo de validar un formulario. Un ejemplo es [yup](https://www.npmjs.com/package/yup).

## Expresiones regulares
Las expresiones regulares permiten buscar un patrón dado en una cadena de texto. Se usan mucho a la hora de validar formularios o para buscar y reemplazar texto. En Javascript se crean poniéndolas entre caracteres `/` (o instanciándolas de la clase _RegExp_, aunque es mejor de la otra forma):
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
* `( | )` (_pipe_): debe coincidir con una de las opciones indocadas:
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

> EJERCICIO: contruye una expresión regular para lo que se pide a continuación y pruébala con distintas cadenas:
> - un código postal
> - un NIF formado por 8 números, un guión y una letra mayúscula o minúscula
> - un número de teléfono y aceptamos 2 formatos: XXX XX XX XX o XXX XXX XXX. EL primer número debe ser un 6, un 7, un 8 o un 9

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

No vamos a profundizar más sobre las expresiones regulares. Es muy fácil encontrar por internet la que necesitemos en cada caso (para validar un e-mail, un NIF, un CP, ...). Podemos aprender más en:
* [w3schools](http://www.w3schools.com/jsref/jsref_obj_regexp.asp)
* [regular-expressions.info](http://www.regular-expressions.info/)
* [html5pattern](http://html5pattern.com/) atributo
* y muchas otras páginas

También, hay páginas que nos permiten probar expresiones regulares con cualquier texto, como [regexr](http://regexr.com/).

