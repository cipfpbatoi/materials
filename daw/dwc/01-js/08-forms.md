# Validación de formularios
Índice:
- [Validación de formularios](#validación-de-formularios)
  - [Introducción](#introducción)
    - [Validación del navegador incorporada en HTML5](#validación-del-navegador-incorporada-en-html5)
    - [Validación mediante la API de validación de formularios](#validación-mediante-la-api-de-validación-de-formularios)
      - [Ejemplo](#ejemplo)
      - [Mensajes personalizados](#mensajes-personalizados)
      - [Validaciones que no se pueden hacer con atributos](#validaciones-que-no-se-pueden-hacer-con-atributos)
      - [Validaciones asíncronas](#validaciones-asíncronas)
    - [¿Quién valida qué?](#quién-valida-qué)
    - [Errores típicos](#errores-típicos)
    - [Ficheros en formularios](#ficheros-en-formularios)
    - [Librerías de validación](#librerías-de-validación)
  - [Expresiones regulares](#expresiones-regulares)
    - [Patrones](#patrones)
    - [Métodos](#métodos)


## Introducción
En este tema vamos a ver cómo realizar una de las acciones principales de Javascript que es la validación de formularios en el lado cliente.

Se trata de una verificación útil porque evita enviar datos al servidor que sabemos que no son válidos pero NUNCA puede sustituir a la validación en el lado servidor ya que en el lado cliente se puede manipular el código desde la consola (o hacer la petición directamente con _curl_ o _Postman_) para que se salte las validaciones que le pongamos.

Podéis encontrar una guía muy completa de validación de formularios en el lado cliente en la página de [MDN web docs](https://developer.mozilla.org/es/docs/Learn_web_development/Extensions/Forms/Form_validation) que ha servido como base para estos apuntes.

Además, al final de este tema, veremos una pequeña introducción a las expresiones regulares en Javascript.

Básicamente tenemos 2 maneras de validar un formulario en el lado cliente:
- usar la validación incorporada en HTML5 y dejar que sea el navegador quien se encargue de todo
- realizar nosotros la validación mediante Javascript

La ventaja de la primera opción es que no tenemos que escribir código sino simplemente poner unos atributos a los INPUT que indiquen qué se ha de validar. La principal desventaja es que no tenemos ningún control sobre el proceso, lo que provocará cosas como:
- el navegador valida campo a campo: cuando encuentra un error en un campo lo muestra y hasta que no se soluciona no valida el siguiente lo que hace que el proceso sea molesto para el usuario que no ve todo lo que hay mal de una vez
- los mensajes son los predeterminados del navegador y en ocasiones pueden no ser muy claros para el usuario
- los mensajes se muestran en el idioma en que está configurado el navegador, no en el de nuestra página

Lo que vamos a hacer es un punto intermedio: dejar que el navegador compruebe los campos (para eso ya sabe hacerlo) pero decidir nosotros qué se muestra y cuándo.

### Validación del navegador incorporada en HTML5
Funciona añadiendo atributos a los campos del formulario que queremos validar. Los más usados son:
- **required**: indica que el campo es obligatorio. La validación fallará si no hay nada escrito en el input. En el caso de un grupo de _radiobuttons_ se pone sobre cualquiera de ellos (o sobre todos) y obliga a que haya seleccionada una opción cualquiera del grupo. En un _select_ falla si la opción elegida tiene `value=""` (por eso la primera opción suele ser `<option value="">-- Selecciona --</option>`)
- **pattern**: obliga a que el contenido del campo cumpla la expresión regular indicada. Por ejemplo para un código postal sería `pattern="[0-9]{5}"`
- **minlength** / **maxlength**: indica la longitud mínima/máxima del contenido del campo
- **min** / **max**: indica el valor mínimo/máximo del contenido de un campo numérico
- **step**: en un campo numérico indica de cuánto en cuánto pueden ir los valores, contando desde _min_ (o desde 0 si no hay _min_)

También producen errores de validación si el contenido de un campo no se adapta al _type_ indicado (email, number, url, ...) o si el valor de un campo numérico no cumple con el _step_ indicado.

Hay algunos detalles que conviene saber porque son fuente de errores:
- **un campo vacío sólo es inválido si es _required_**. Un `<input minlength="5">` vacío es válido. Si un campo tiene que tener algo y además cumplir otras condiciones necesita _required_ y las otras condiciones
- en un `type="number"` **el _step_ por defecto es 1**, así que si no ponemos nada sólo admite números enteros. Para admitir céntimos pondremos `step="0.01"` y para admitir cualquier decimal `step="any"`
- el atributo **pattern** se compara con todo el contenido del campo (es como si llevara `^` al principio y `$` al final) así que no hace falta ponerlos. Además el navegador lo interpreta con el modificador `v` de las expresiones regulares, que es más estricto: por ejemplo `pattern="[a-z-]+"` es una expresión no válida con ese modificador (el guion debe escaparse: `[a-z\-]+`) y **si la expresión no es válida el navegador ignora el atributo sin avisar** y el campo siempre será válido. Así que hay que probar siempre que un _pattern_ rechaza lo que tiene que rechazar
- los campos **readonly** y **disabled** no se validan nunca (aunque tengan _required_)

Cuando el contenido de un campo es valido dicho campo obtiene automáticamente la pseudoclase **:valid** y si no lo es tendrá la pseudoclase **:invalid** lo que nos permite poner reglas en nuestro CSS para destacar dichos campos, por ejemplo:
```css
input:invalid {
  border: 2px dashed red;
}
```

El problema de `:invalid` es que se aplica desde que se carga la página, así que el usuario verá todos los campos obligatorios en rojo antes de haber escrito nada. Para evitarlo tenemos las pseudoclases **:user-invalid** y **:user-valid**, que sólo se aplican cuando el usuario ya ha interactuado con el campo (o ha intentado enviar el formulario):
```css
input:user-invalid {
  border: 2px dashed red;
}
```

Además de las anteriores tenemos las pseudoclases **:required**, **:optional**, que nos permiten poner reglas de estilo a los campos obligatorios o no, y **:focus** para el campo con el foco.

La validación del navegador se realiza al enviar el formulario. Si encuentra un error lo muestra, se detiene la validación del resto de campos y no se envía el formulario.

### Validación mediante la API de validación de formularios
Mediante Javascript tenemos acceso a todos los campos del formulario por lo que podemos hacer la validación como queramos, pero es una tarea pesada, repetitiva y que provoca código espagueti difícil de leer y mantener más adelante.

Para hacerla más simple podemos usar la [API de validación de formularios](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation) de HTML5 que permite que sea el navegador quien se encargue de comprobar la validez de cada campo pero las acciones (mostrar mensajes de error, no enviar el formulario, ...) las realizamos desde Javascript.

Esto nos da la ventaja de:
- los requisitos de validación de cada campo están como atributos HTML de dicho campo por lo que son fáciles de ver
- nos evitamos la mayor parte del código dedicada a comprobar si el contenido del campo es válido. Nosotros mediante la API sólo preguntamos si se cumplen o no y tomamos las medidas adecuadas
- aprovechamos las pseudo-clases _:valid_ / _:invalid_ (o _:user-valid_ / _:user-invalid_) que el navegador pone automáticamente a los campos por lo que no tenemos que añadirles clases para destacarlos

Las principales propiedades y métodos que nos proporciona esta API son:
- **checkValidity()**: método booleano que nos dice si el campo al que se aplica es o no válido. También se puede aplicar al formulario para saber si es válido o no. Además, por cada campo no válido, lanza sobre él un evento `invalid`
- **reportValidity()**: igual que el anterior pero además muestra los mensajes del navegador como si se hubiera enviado el formulario
- **validationMessage**: en caso de que un campo no sea válido esta propiedad contiene el texto del error de validación proporcionado por el navegador (en el idioma del navegador). Si es válido esta propiedad es una cadena vacía
- **setCustomValidity(mensaje)**: añade un error personalizado al campo (que ahora ya NO será válido para el navegador) con el mensaje pasado como parámetro. Por ejemplo podemos usarlo para indicar que el nick elegido no es válido porque ya está en uso por otro usuario. Para quitar este error se hace `setCustomValidity('')`. **El error se queda puesto hasta que lo quitemos nosotros**: aunque el usuario cambie el contenido del campo el navegador no lo quita
- **willValidate**: indica si el campo se va a validar (es _false_, por ejemplo, en los campos _readonly_ o _disabled_)
- **[validity](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)**: es un objeto que tiene propiedades booleanas para saber qué requisito del campo es el que falla:
  - **valueMissing**: indica si no se cumple el atributo **_required_** (es decir, valdrá _true_ si el campo tiene el atributo _required_ pero no se ha introducido nada en él)
  - **typeMismatch**: indica si el contenido del campo no cumple con su atributo **_type_** (ej. type="email")
  - **badInput**: el navegador no puede convertir lo que ha escrito el usuario. Por ejemplo si escribe letras en un `type="number"`: en ese caso `value` vale `''` (aunque el usuario vea texto en el campo)
  - **patternMismatch**: indica si no se cumple con el **_pattern_** indicado en su atributo
  - **tooShort** / **tooLong**: indican si no se cumple el atributo **_minlength_** o **_maxlength_** respectivamente. OJO: sólo se comprueban si el valor lo ha escrito el usuario; si lo ponemos por código (`input.value = 'ab'`) el campo se considera válido
  - **rangeUnderflow** / **rangeOverflow**: indica si no se cumple el atributo **_min_** / **_max_**
  - **stepMismatch**: indica si no se cumple el atributo **_step_** del campo
  - **customError**: indica si al campo se le ha puesto un error personalizado con **_setCustomValidity_**
  - **valid**: indica si el campo es válido (no falla ninguno de los anteriores)

Por ejemplo, para un campo `<input id="nombre" required minlength="5" maxlength="50">` estos serían los valores según lo que escriba el usuario:

| El usuario escribe | `checkValidity()` | `validity` que es _true_ | `validationMessage` |
|---|---|---|---|
| nada | false | valueMissing | el mensaje del navegador de campo obligatorio |
| `Ana` | false | tooShort | el mensaje del navegador de longitud mínima |
| `Juan Segura` | true | valid | `''` |
| `Juan Segura` pero hemos hecho `setCustomValidity('Ya existe')` | false | customError | `'Ya existe'` |

Probadlo en la consola del navegador: seleccionad el campo y mirad su `validity` mientras escribís cosas distintas.

En los campos numéricos tenemos además la propiedad **valueAsNumber** que nos da el valor ya convertido a número (o _NaN_ si está vacío), así no tenemos que convertirlo nosotros.

Para validar un formulario nosotros pero usando esta API debemos añadir a la etiqueta _\<form>_ el atributo **`novalidate`** que hace que no se encargue el navegador de mostrar los mensajes de error ni de decidir si se envía o no el formulario (aunque sí valida los campos) sino que lo haremos nosotros. Ojo: con _novalidate_ el evento `submit` se produce **siempre**, aunque haya campos no válidos, así que somos nosotros los que tenemos que comprobarlo.

#### Ejemplo
Un ejemplo sencillo de validación de un formulario podría ser:
- index.html

```html
<form novalidate>
  <label for="nombre">Por favor, introduzca su nombre (entre 5 y 50 caracteres): </label>
  <input type="text" id="nombre" name="nombre" required minlength="5" maxlength="50">
  <span class="error"></span>
  <br>
  <label for="mail">Por favor, introduzca una dirección de correo electrónico: </label>
  <input type="email" id="mail" name="mail" required minlength="8">
  <span class="error"></span>
  <button type="submit">Enviar</button>
</form>
```

- main.js

```javascript
const form = document.querySelector('form')

const nombre = document.getElementById('nombre')
const nombreError = document.querySelector('#nombre + span.error')
const email = document.getElementById('mail')
const emailError = document.querySelector('#mail + span.error')

form.addEventListener('submit', (event) => {
  event.preventDefault()   // los datos los enviaremos nosotros con fetch
  nombreError.textContent = nombre.validationMessage
  emailError.textContent = email.validationMessage
  if (!form.checkValidity()) {
    return    // hay errores: no hacemos nada más
  }
  // aquí procesamos los datos (enviarlos al servidor, ...)
})
```

- style.css

```css
.error {
  color: red;
}

input:user-invalid {
  border: 2px dashed red;
}
```

Estamos usando 
- `validationMessage` para mostrar el posible error de cada campo, o quitar el error cuando el campo sea válido
- `checkValidity()` para no enviar/procesar el formulario si contiene errores

Fijaos que mostramos los mensajes de **todos** los campos antes de comprobar si el formulario es válido, así el usuario ve de una vez todo lo que está mal.

Con este código los mensajes sólo se actualizan al enviar, así que si el usuario corrige un campo el mensaje de error sigue ahí hasta que vuelve a enviar. Podemos mejorarlo actualizando el mensaje del campo que cambia. En vez de poner un escuchador a cada campo podemos ponerlo al formulario (el evento `input` sube desde el campo hasta el formulario):

```javascript
form.addEventListener('input', (event) => {
  const campo = event.target
  const error = form.querySelector(`#${campo.id} + span.error`)
  if (error) {
    error.textContent = campo.validationMessage
  }
})
```

#### Mensajes personalizados
Si no nos gusta el mensaje del navegador (o queremos que salga en el idioma de nuestra página) podemos hacer una función que reciba un \<input> y usando su propiedad `validity` devuelva un mensaje en función del error detectado:
```javascript
function customErrorValidationMessage(input) {
  if (input.checkValidity()) {
    return ''
  }
  if (input.validity.customError) {
    return input.validationMessage    // el que hemos puesto con setCustomValidity
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

Fijaos que esta función no comprueba si el campo es correcto (eso lo sigue haciendo el navegador con los atributos): sólo traduce el error a un mensaje. Si en una función así veis cosas como `if (input.value.length < 5)` o `if (Number(input.value) < 0)` se está repitiendo a mano una validación que ya hace el navegador, y además tendremos el requisito en 2 sitios distintos (en el HTML y en el JS) que tarde o temprano dejarán de coincidir.

#### Validaciones que no se pueden hacer con atributos
Si tenemos que validar algo que no puede hacerse mediante atributos HTML (por ejemplo si el nombre de usuario ya está en uso, o si la fecha de fin es posterior a la de inicio) deberemos hacer la validación "a mano" y en caso de no ser válido ponerle un error con `.setCustomValidity()`, pero debemos recordar quitar el error si todo es correcto o el campo será inválido para siempre (aunque el usuario lo corrija). Modificando el ejemplo:
```javascript
const nombre = document.getElementById('nombre')
const nombreError = document.querySelector('#nombre + span.error')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  if (nombreEnUso(nombre.value)) {
    nombre.setCustomValidity('Ese nombre de usuario ya está en uso')
  } else {
    nombre.setCustomValidity('')  // Se quita el error personalizado
  }
  nombreError.textContent = nombre.validationMessage
  ...
  if (!form.checkValidity()) {
    return
  }
  ...
})
```

Hay que tener en cuenta que mientras un campo tiene un error personalizado `validity.customError` es _true_ y `validationMessage` es nuestro mensaje, aunque además le falte algo obligatorio. Si queremos que primero se vean los errores "normales" del campo, quitaremos el error personalizado, comprobaremos si el campo es válido con sus atributos y sólo en ese caso haremos nuestra comprobación.

#### Validaciones asíncronas
En el ejemplo anterior hemos supuesto que `nombreEnUso()` responde inmediatamente, pero en la realidad para saberlo hay que preguntar al servidor, es decir, hacer una petición con _fetch_ y esperar su respuesta. Esto introduce problemas que no teníamos:
- **¿cuándo preguntamos?** Si lo hacemos al enviar el usuario espera la respuesta del servidor antes de ver ningún error. Si lo hacemos al cambiar el campo podemos avisarle antes, pero haremos más peticiones
- **mientras llega la respuesta el usuario sigue haciendo cosas**: puede enviar el formulario antes de que sepamos si el nombre está en uso, o cambiar otra vez el campo. Si hace 2 cambios seguidos se hacen 2 peticiones y no tienen por qué responder en el mismo orden: si la respuesta de la primera llega la última pondremos (o quitaremos) el error de un valor que ya no es el que hay en el campo
- **¿qué hacemos si la petición falla?** (servidor caído, sin conexión, ...). No podemos dejar el campo marcado como válido sin haberlo comprobado, pero tampoco como inválido por un error que no es del usuario
- **la comprobación del cliente no garantiza nada**: entre que comprobamos que el nombre está libre y que enviamos el formulario otro usuario puede haberlo cogido. Esta validación sirve para avisar pronto al usuario, pero quien debe impedir realmente que se repita es el servidor

Antes de dar por buena una validación asíncrona (la hagamos nosotros o nos la dé hecha una IA) hay que pensar qué pasa en cada una de estas situaciones.

### ¿Quién valida qué?
Si nuestra aplicación sigue el patrón MVC hay que pensar qué parte tiene la información necesaria para cada validación:
- **la vista** conoce el formulario: qué campos hay, qué atributos tienen y dónde se muestran los errores. Las validaciones que dependen sólo de lo que hay en el formulario (obligatorio, numérico, longitud, formato, ...) son cosa suya, y el controlador sólo debería recibir los datos cuando ya son válidos
- **el controlador** es el que tiene acceso al modelo, así que las validaciones que dependen de otros datos (si ya existe algo, si el usuario tiene permiso, ...) tendrá que hacerlas él. Pero el controlador no debe tocar el formulario: le pedirá a la vista que marque el campo como no válido
- **el servidor** es el único que puede garantizar que los datos son correctos, así que debe volver a validarlo todo

### Errores típicos
Cosas a comprobar al revisar código de validación (propio o generado por una IA):
- se olvida el `novalidate` y salen a la vez los mensajes del navegador y los nuestros
- con `novalidate` no se comprueba `checkValidity()` antes de procesar los datos, así que se envían aunque haya errores
- se valida "a mano" (`value.length`, `isNaN`, expresiones regulares en el JS...) lo que ya dicen los atributos del HTML, con lo que hay 2 sitios donde cambiar cada requisito
- se pone un `setCustomValidity` y nunca se quita, con lo que el campo se queda inválido para siempre
- se muestra sólo el primer error en vez de los de todos los campos
- se usa `alert()` para mostrar los errores
- un `pattern` mal escrito que el navegador ignora sin avisar, y nadie ha probado que rechace algo
- en `type="number"` sin `step` no se pueden poner decimales (o con `step="any"` se pueden poner cuando no se debería)
- se convierte el valor con `parseInt` / `parseFloat`, que aceptan `'12abc'` como 12, en vez de usar `valueAsNumber` o `Number()` sobre un campo ya validado

### Ficheros en formularios
Hay infinidad de páginas donde poder consultar cómo validar ficheros e imágenes en un formulario. Os recomiendo:
- [Curso DWEC de José Castillo](https://xxjcaxx.github.io/libro_dwec/dom.html#ficheros-en-formularios)
- [w3schools](https://www.w3schools.com/js/js_validation_file.asp)
- [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation#validating_files).

### Librerías de validación
Existen múltiples librerías que facilitan enormemente el tedioso trabajo de validar un formulario. Un ejemplo es [yup](https://www.npmjs.com/package/yup), que usaremos en el bloque de Vue (ver [Formularios en Vue](../02-vue/08-forms.md)). En este bloque haremos la validación sin librerías para entender qué hacen por nosotros.

## Expresiones regulares
Las expresiones regulares permiten buscar un patrón dado en una cadena de texto. Se usan mucho a la hora de validar formularios o para buscar y reemplazar texto. En Javascript se crean poniéndolas entre caracteres `/` (o instanciándolas de la clase _RegExp_, aunque es mejor de la otra forma):
```javascript
let cadena = 'Hola mundo'
let expr = /mundo/
expr.test(cadena)      // devuelve true porque en la cadena se encuentra la expresión 'mundo'
```

Fijaos que, a diferencia del atributo _pattern_, en Javascript la expresión se busca **en cualquier parte** de la cadena: `/[0-9]{5}/.test('123456')` devuelve _true_ porque dentro de '123456' hay 5 dígitos seguidos. Si queremos que toda la cadena cumpla la expresión hay que poner `^` y `$`: `/^[0-9]{5}$/`.

### Patrones
La potencia de las expresiones regulares es que podemos usar patrones para construir la expresión. Los más comunes son:
* **\[..]** (corchetes): dentro se ponen varios caracteres o un rango y permiten comprobar si el carácter de esa posición de la cadena coincide con alguno de ellos. Ejemplos:
  * `[abc]`: cualquier carácter de los indicados ('a' o 'b' o 'c')
  * `[^abc]`: cualquiera excepto los indicados
  * `[a-z]`: cualquier minúscula (el carácter '-' indica el rango entre 'a' y 'z', incluidas). OJO: no incluye la 'ñ' ni las vocales con tilde
  * `[a-zA-Z]`: cualquier letra (de nuevo sin 'ñ' ni tildes)
* `( | )` (_pipe_): debe coincidir con una de las opciones indicadas:
  * `(x|y)`: la letra x o la y (sería equivalente a `[xy]`)
  * `(http|https)`: cualquiera de las 2 palabras
* **Metacaracteres**:
  * `.` (punto): un único carácter, sea el que sea
  * `\d`: un dígito (`\D`: cualquier cosa menos dígito)
  * `\s`: espacio en blanco (`\S`: lo opuesto)
  * `\w`: un carácter alfanumérico o el guion bajo, es decir `[a-zA-Z0-9_]` (`\W` lo contrario). Por tanto `/^\w+$/` NO acepta 'Peñalver' ni 'José'
  * `\b`: delimitador de palabra (espacio, ppio, fin)
  * `\n`: nueva línea
* **Cuantificadores**:
  * `+`: al menos 1 vez (ej. `[0-9]+` al menos un dígito)
  * `*`: 0 o más veces
  * `?`: 0 o 1 vez
  * `{n}`: n caracteres (ej. `[0-9]{5}` = 5 dígitos)
  * `{n,}`: n o más caracteres
  * `{n,m}`: entre n y m caracteres
* **Anclas**:
  * `^`: al ppio de la cadena (ej.: `^[a-zA-Z]` = empieza por letra)
  * `$`: al final de la cadena (ej.: `[0-9]$` = que acabe en dígito)
* **Modificadores**:
  * `/i`: que no distinga entre mayúsculas y minúsculas (Ej. `/html/i` = buscará html, Html, HTML, ...)
  * `/g`: búsqueda global, busca todas las coincidencias y no sólo la primera
  * `/m`: busca en más de 1 línea (para cadenas con saltos de línea)
  * `/u`: tiene en cuenta los caracteres Unicode. Con él podemos usar `\p{L}` para "cualquier letra de cualquier idioma" (incluidas 'ñ' y tildes): `/^\p{L}+$/u.test('Peñalver')` devuelve _true_

> EJERCICIO: construye una expresión regular para lo que se pide a continuación y pruébala con distintas cadenas, tanto que deban cumplirla como que no:
> - un código postal
> - un NIF formado por 8 números, un guion y una letra mayúscula o minúscula
> - un número de teléfono y aceptamos 2 formatos: XXX XX XX XX o XXX XXX XXX. El primer número debe ser un 6, un 7, un 8 o un 9
>
> Después pon cada una como _pattern_ de un input y comprueba que el navegador la usa (es decir, que rechaza lo que debe rechazar).

### Métodos
Los usaremos para saber si la cadena coincide con determinada expresión o para buscar y reemplazar texto:
* `expr.test(cadena)`: devuelve **true** si la cadena coincide con la expresión. Con el modificador _/g_ hará que cada vez que se llama busque desde la posición de la última coincidencia (la guarda en la propiedad `lastIndex` de la expresión). Ejemplo:

```javascript
let str = "I am amazed in America"
let reg = /am/g
console.log(reg.test(str)) // Imprime true
console.log(reg.test(str)) // Imprime true
console.log(reg.test(str)) // Imprime false, hay solo dos coincidencias

let reg2 = /am/gi           // ahora no distinguirá mayúsculas y minúsculas
console.log(reg2.test(str)) // Imprime true
console.log(reg2.test(str)) // Imprime true
console.log(reg2.test(str)) // Imprime true. Ahora tenemos 3 coincidencias con este nuevo patrón
```

Esto puede dar errores difíciles de encontrar: si validamos varias cadenas con la misma expresión con _/g_ el resultado de cada una depende de las anteriores. Para validar no uséis _/g_.

* `expr.exec(cadena)`: igual pero en vez de _true_ o _false_ devuelve un objeto con la coincidencia encontrada, su posición y la cadena completa:

```javascript
let str = "I am amazed in America"
let reg = /am/gi
console.log(reg.exec(str)) // Imprime ["am", index: 2, input: "I am amazed in America"]
console.log(reg.exec(str)) // Imprime ["am", index: 5, input: "I am amazed in America"]
console.log(reg.exec(str)) // Imprime ["Am", index: 15, input: "I am amazed in America"]
console.log(reg.exec(str)) // Imprime null
```

* `cadena.match(expr)`: igual que _exec_ pero se aplica a la cadena y se le pasa la expresión. Si ésta tiene el modificador _/g_ devolverá un array con todas las coincidencias:

```javascript
let str = "I am amazed in America"
let reg = /am/gi
console.log(str.match(reg)) // Imprime ["am", "am", "Am"]
```

* `cadena.search(expr)`: devuelve la posición donde se encuentra la coincidencia buscada o -1 si no aparece
* `cadena.replace(expr, cadena2)`: devuelve una nueva cadena con las coincidencias de la cadena reemplazadas por la cadena pasada como 2º parámetro:

```javascript
let str = "I am amazed in America"
console.log(str.replace(/am/gi, "xx")) // Imprime "I xx xxazed in xxerica"

console.log(str.replace(/am/gi, function(match) {
  return "-" + match.toUpperCase() + "-"
})) // Imprime "I -AM- -AM-azed in -AM-erica"
```

No vamos a profundizar más sobre las expresiones regulares. Es muy fácil encontrar por internet (o pedirle a una IA) la que necesitemos en cada caso (para validar un e-mail, un NIF, un CP, ...), pero **siempre hay que probarla** con casos que deban cumplirla y con casos que no. Podemos aprender más en:
* [w3schools](http://www.w3schools.com/jsref/jsref_obj_regexp.asp)
* [regular-expressions.info](http://www.regular-expressions.info/)
* [html5pattern](http://html5pattern.com/) atributo
* y muchas otras páginas

También, hay páginas que nos permiten probar expresiones regulares con cualquier texto, como [regexr](http://regexr.com/).
