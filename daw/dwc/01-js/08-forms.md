# Validación de formularios
Índice:
- [Introducción](#introducción)
- [Validación incorporada en HTML5](#validación-incorporada-en-html5)
- [Validación mediante Javascript](#validación-mediante-javascript)
- [Ejemplo](#ejemplo)

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

### Validación incorporada en HTML5
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

### Validación mediante Javascript
Mediante Javscript tenemos acceso a todos los campos del formulario por lo que podemos hacer la validación como queramos, pero es una tarea pesada, repetitiva y que provoca código spaguetti difícil de leer y mantener más adelante.

Para hacerla más simple podemos usar la [API de validación de formularios](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation) de HTML5 que nos da la ventaja de:
- los requisitos de validación de cada campo están como atributos HTML de dicho campo por lo que son fáciles de ver
- no tenemos que comprobar nosotros si el contenido del campo cumple o no esos requisitos sino que lo comprueba el navegador y nosotros mediante la API sólo preguntamos si se cumplen o no
- automáticamente pone a los campos las clases _:valid_ o _:invalid_ por lo que no tenemos que añadirles clases para desacarlos

Esta API nos proporciona estas propiedades y métodos:
- **validationMessage**: contiene el texto del error de validación proporcionado por el navegador. Si el campo es válido contiene una cadena vacía
- **[validity](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)**: es un objeto que incluye propiedades booleanas para comprobar los distintos fallos de validación
  - **valid**: indica si es campo es válido
  - **valueMissing**: indica si no se cumple la restricción _required_
  - **typeMismatch**: indica si el contenido del campo no cumple con su atributo _type_
  - **patternMismatch**: indica si no se cumple con el _pattern_ indicado
  - **tooShort** / **tooLong**: indica si no se cumple el atributo _minlength_/_maxlength_
  - **rangeUnderflow** / **rangeOverflow**: indica si no se cumple el atributo _min_ / _max_
  - ...
- **checkValidity()**: indica si el campo al que se aplica es o no válido. Si no lo es lanza además un evento **invalid** sobre el campo
- **setCustomValidity(mensaje)**: añade un error personalizado al campo (que ahora ya NO será válido) con el mensaje pasado como parámetro. Nos va a permitir sustituir el mensaje del navegador por uno personalizado

Para validar un formulario nosotros pero usando esta API debemos añadir al FORM el atributo **novalidate** que hace que no se encargue el navegador de mostrar los mensajes de error ni de decidir si se envía o no el formulario (aunque sí valida los campos) sino que lo haremos nosotros.

### Ejemplo
Un ejemplo sencillo de validación de un formulario podría ser:
- index.html

```html
<form novalidate>
  <p>
    <label for="nombre">
      <span>Por favor, introduzca su nombre (entre 5 y 50 caracteres): </span>
      <input type="text" id="nombre" name="nombre" required minlength="5" maxlength="50">
      <span class="error"></span>
    </label>
    <label for="mail">
      <span>Por favor, introduzca una dirección de correo electrónico: </span>
      <input type="email" id="mail" name="mail" required minlength="8">
      <span class="error"></span>
    </label>
  </p>
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
  nombreError.textContent = nombre.validationMessege;
  if(!nombre.validity.valid) {
    event.preventDefault();
  }

  emailError.textContent = email.validationMessege;
  if(!email.validity.valid) {
    event.preventDefault();
  }
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
