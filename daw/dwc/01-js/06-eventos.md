# Eventos
- [Eventos](#eventos)
  - [Introducción](#introducción)
  - [Cómo escuchar un evento](#cómo-escuchar-un-evento)
    - [Event listeners](#event-listeners)
    - [Opciones de addEventListener](#opciones-de-addeventlistener)
    - [¿Cuándo poner los escuchadores?](#cuándo-poner-los-escuchadores)
  - [Tipos de eventos](#tipos-de-eventos)
    - [Eventos de página](#eventos-de-página)
    - [Eventos de ratón](#eventos-de-ratón)
    - [Eventos de puntero y de toque](#eventos-de-puntero-y-de-toque)
    - [Eventos de teclado](#eventos-de-teclado)
    - [Eventos de formulario](#eventos-de-formulario)
  - [El objeto _event_](#el-objeto-event)
    - [_target_ y _currentTarget_](#target-y-currenttarget)
    - [Propiedades y métodos comunes](#propiedades-y-métodos-comunes)
    - [Propiedades de los eventos de ratón](#propiedades-de-los-eventos-de-ratón)
    - [Propiedades de los eventos de teclado](#propiedades-de-los-eventos-de-teclado)
  - [El objeto _this_ en los manejadores](#el-objeto-this-en-los-manejadores)
    - [_Bindeo_ del objeto _this_](#bindeo-del-objeto-this)
  - [Propagación de eventos](#propagación-de-eventos)
  - [innerHTML y escuchadores de eventos](#innerhtml-y-escuchadores-de-eventos)
  - [Delegación de eventos](#delegación-de-eventos)
  - [Eventos personalizados](#eventos-personalizados)

## Introducción
Nos permiten detectar acciones que realiza el usuario o cambios que suceden en la página y reaccionar en respuesta a ellas. Existen muchos eventos diferentes (podéis ver la lista completa en la [referencia de eventos de MDN](https://developer.mozilla.org/es/docs/Web/Events)) aunque nosotros nos centraremos en los más comunes.

Javascript nos permite ejecutar código cuando se produce un evento (por ejemplo el evento _click_ del ratón) asociando al mismo una función. Hay varias formas de hacerlo.

## Cómo escuchar un evento
La manera tradicional de asociar código a un evento era añadiendo un atributo con el nombre del evento a escuchar (con 'on' delante) en el elemento HTML. Por ejemplo, para ejecutar código al producirse el evento '_click_' sobre un botón se escribía:
```html
<input type="button" id="boton1" onclick="alert('Se ha pulsado');" />
```

Una mejora era llamar a una función que contenía el código:
```html
<input type="button" id="boton1" onclick="clicked()" />
```

```javascript
function clicked() {
  alert('Se ha pulsado');
}
```

Esta forma mezcla HTML y Javascript y no debemos usarla, pero la seguiréis encontrando en código antiguo (y en código generado por IA). Una alternativa es asignar la función a la propiedad `on...` del elemento desde Javascript:

```javascript
document.getElementById('boton1').onclick = () => {
  alert('Se ha pulsado');
}
```

El problema de esta forma es que un elemento sólo puede tener **una** función en cada propiedad: si otra parte del código hace `boton1.onclick = ...` sobrescribe la nuestra sin avisar. Además no todos los eventos tienen propiedad `on...` (por ejemplo `document.onDOMContentLoaded` no existe: si lo asignamos no da error pero la función nunca se ejecuta).

### Event listeners
La forma recomendada de poner escuchadores es mediante el método `addEventListener`, que recibe como primer parámetro el nombre del evento a escuchar (sin '_on_' y **en minúsculas**) y como segundo parámetro la función a ejecutar cuando se produzca (OJO, **sin paréntesis**: le pasamos la función, no el resultado de ejecutarla):
```javascript
document.getElementById('boton1').addEventListener('click', pulsado);
...
function pulsado() {
  alert('Se ha pulsado');
}
```

> OJO: si escribimos `addEventListener('click', pulsado())` la función se ejecuta en ese momento (una sola vez) y lo que se pone como escuchador es lo que devuelve (normalmente `undefined`). Tampoco da error si escribimos mal el nombre del evento (`'Click'`, `'keyDown'`): simplemente nunca se dispara.

Habitualmente se usan funciones anónimas ya que no necesitan ser llamadas desde fuera del escuchador:
```javascript
document.getElementById('boton1').addEventListener('click', () => {
  alert('Se ha pulsado');
});
```

Si queremos pasarle algún parámetro a la función manejadora la forma más sencilla es usar una función anónima que la llame con los parámetros que queramos (también se puede hacer con _bind_, que veremos más adelante):

```html
<button id="boton1">Botón 1</button>
<button id="boton2">Botón 2</button>
<p id="mensaje">Pulsa un botón</p>
```

```javascript
document.getElementById('boton1').addEventListener('click', (event) => saluda('Juan', event));
document.getElementById('boton2').addEventListener('click', (event) => saluda('Ana', event));

function saluda(nombre, event) {
  document.getElementById('mensaje').textContent =
    `Hola ${nombre}, has pulsado ${event.currentTarget.id}`;
}
```

<iframe src="./demos/eventos-parametros.html" title="Eventos: pasar parámetros a la función manejadora"
        style="width:100%; height:140px; border:1px solid #ddd; border-radius:8px;" loading="lazy"></iframe>

[Abre el ejemplo en una pestaña nueva](./demos/eventos-parametros.html).

Una ventaja de esta forma de poner escuchadores es que podemos poner varios escuchadores para el mismo evento y se ejecutarán todos ellos (en el orden en que se añadieron). Para eliminar un escuchador se usa el método `removeEventListener`, al que hay que pasarle **la misma función** que le pasamos a `addEventListener`:
```javascript
document.getElementById('boton1').removeEventListener('click', pulsado);
```

NOTA: con `removeEventListener` no se puede quitar un escuchador si hemos usado una función anónima (o una función creada con _bind_), porque cada vez que se evalúa `() => {...}` o `funcion.bind(...)` se crea una función **nueva**, distinta de la que se registró. Para quitarlo con `removeEventListener` debemos guardar la función en una variable o usar una función con nombre. Otra forma, que sí funciona con funciones anónimas, es usar la opción `signal` que vemos a continuación.

### Opciones de addEventListener
El método admite un tercer parámetro, que puede ser un booleano (lo veremos en [Propagación de eventos](#propagación-de-eventos)) o un objeto con las siguientes opciones:
- **once**: si es `true` el escuchador se ejecuta una sola vez y se elimina automáticamente
- **signal**: un `AbortSignal`; cuando se llame a `abort()` sobre su controlador se eliminan todos los escuchadores asociados a esa señal, aunque sean funciones anónimas
- **passive**: si es `true` indicamos que el manejador no va a llamar a `preventDefault()`, lo que permite al navegador hacer el _scroll_ sin esperar (útil en `touchmove`, `wheel`, ...)
- **capture**: equivalente al booleano del tercer parámetro

```javascript
const boton = document.getElementById('boton1');

// Sólo se ejecuta la primera vez que se pulsa
boton.addEventListener('click', () => alert('Primera vez'), { once: true });

// Varios escuchadores anónimos que quitamos de golpe
const controller = new AbortController();
boton.addEventListener('click', () => console.log('click'), { signal: controller.signal });
boton.addEventListener('mouseenter', () => console.log('entra'), { signal: controller.signal });
...
controller.abort();   // elimina los dos escuchadores
```

### ¿Cuándo poner los escuchadores?
**IMPORTANTE**: si intentamos poner un escuchador a un elemento que aún no existe (porque aún no lo ha procesado el navegador) `document.getElementById` devuelve `null` y se produce un error (_Cannot read properties of null_). Esto pasa cuando el `<script>` está en el `<head>` y se ejecuta antes de que se haya creado el árbol DOM del `<body>`.

Para evitarlo hay varias opciones:
- cargar el script como **módulo** (`<script type="module" src="...">`) o con el atributo **`defer`**. En ambos casos el script se descarga en paralelo pero no se ejecuta hasta que se ha creado todo el árbol DOM. **Es lo que hace Vite** en nuestros proyectos (su `index.html` carga `main.js` con `type="module"`), por lo que allí no necesitamos hacer nada más
- poner el `<script>` al final del `<body>`
- poner el código dentro de un escuchador de alguno de estos eventos:
  - _DOMContentLoaded_ del documento: se produce cuando se ha creado el árbol DOM, sin esperar a que se carguen imágenes, hojas de estilo ni _iframes_. Es el adecuado para trabajar con el DOM
  - _load_ de la ventana: se produce cuando se ha cargado todo (incluyendo imágenes, hojas de estilo, etc). Sólo lo necesitamos si nuestro código depende, por ejemplo, del tamaño real de las imágenes

```javascript
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('boton1').addEventListener('click', () => {
    alert('Se ha pulsado');
  });
});
```

Lo mismo habría que hacer con cualquier código que modifique el árbol DOM.

## Tipos de eventos
Según qué o dónde se produce un evento estos se clasifican en:

### Eventos de página
Se producen en el documento o la ventana:
* **DOMContentLoaded** (de _document_): se ha creado el árbol DOM, sin esperar a imágenes, hojas de estilo ni _iframes_
* **load** (de _window_): se ha terminado de cargar la página con todos sus recursos
* **beforeunload**: antes de abandonar la página. Permite pedir confirmación al usuario (por ejemplo si tiene un formulario a medio rellenar) llamando a `event.preventDefault()`; el navegador muestra su propio mensaje, no uno nuestro
* **pagehide** / **visibilitychange**: al abandonar la página o cuando ésta pasa a estar oculta (cambiar de pestaña, minimizar, ...). Son los que debemos usar para guardar datos al salir. El antiguo evento **unload** está obsoleto y los navegadores lo están eliminando
* **resize**: si cambia el tamaño de la ventana
* **scroll**: al desplazarse por el documento o por un elemento con _scroll_

### Eventos de ratón
Los produce el usuario con el ratón:
* **click** / **dblclick**: cuando se hace click/doble click sobre un elemento (_click_ también se produce al activar un botón o enlace con el teclado, con Enter o Espacio)
* **mousedown** / **mouseup**: al pulsar/soltar cualquier botón del ratón
* **mouseover** / **mouseout**: cuando el puntero del ratón entra/sale del elemento o de cualquiera de sus hijos (burbujean)
* **mouseenter** / **mouseleave**: cuando el puntero entra/sale del elemento. A diferencia de los anteriores no se vuelven a producir al pasar sobre sus hijos ni burbujean, por lo que normalmente son los que queremos para efectos _hover_
* **mousemove**: se produce continuamente mientras el puntero se mueva dentro del elemento
* **contextmenu**: al pulsar el botón derecho (antes de mostrar el menú contextual)
* **wheel**: al mover la rueda del ratón

NOTA: si hacemos doble click sobre un elemento la secuencia de eventos que se produciría es: _mousedown_ -> _mouseup_ -> _click_ -> _mousedown_ -> _mouseup_ -> _click_ -> _dblclick_

> EJERCICIO: Pon un escuchador desde la consola al botón 1 de la [página de ejemplo de DOM](./ejercicios/ejemplos/ejemploDOM.html) para que al hacer click se muestre un alert con 'Click sobre botón 1'. Ponle otro para que al pasar el ratón sobre él se muestre 'Entrando en botón 1'.

### Eventos de puntero y de toque
Hoy en día un usuario puede interactuar con el ratón, con el dedo o con un lápiz. Los **eventos de puntero** unifican todos estos dispositivos y son los recomendados si queremos que nuestra página funcione igual en ordenador y en móvil:
* **pointerdown** / **pointerup**: al pulsar/soltar (botón del ratón, dedo o lápiz)
* **pointermove**: al moverse el puntero
* **pointerenter** / **pointerleave**, **pointerover** / **pointerout**: equivalentes a los de ratón
* **pointercancel**: cuando el navegador interrumpe la interacción (por ejemplo porque empieza un _scroll_)

El objeto _event_ de estos eventos tiene, además de las propiedades de los de ratón, la propiedad **.pointerType** (`'mouse'`, `'touch'` o `'pen'`).

También existen los eventos específicos de pantallas táctiles: **touchstart**, **touchend**, **touchmove** y **touchcancel**, que podéis encontrar en código más antiguo.

### Eventos de teclado
Los produce el usuario al usar el teclado. Se producen sobre el elemento que tiene el foco (o sobre el _body_ si no lo tiene ninguno):
* **keydown**: se produce al presionar una tecla y se repite continuamente si la tecla se mantiene pulsada
* **keyup**: cuando se deja de presionar la tecla

NOTA: el orden de la secuencia de eventos es: _keydown_ -> _keyup_ (con varios _keydown_ seguidos si mantenemos la tecla pulsada).

NOTA: existe también el evento **keypress** pero está **obsoleto** y no debemos usarlo. Para detectar qué carácter se ha escrito se usa _keydown_ (con la propiedad _key_) y para reaccionar a lo que el usuario escribe en un campo de un formulario es mejor el evento _input_.

### Eventos de formulario
Se producen en los formularios:
* **focus** / **blur**: al obtener/perder el foco el elemento. **No burbujean** (ver [Propagación de eventos](#propagación-de-eventos)), por lo que si queremos escucharlos en un elemento padre debemos usar **focusin** / **focusout**, que sí lo hacen
* **input**: cada vez que cambia el valor de un \<input>, \<textarea> o \<select> (en un campo de texto, con cada letra que escribimos)
* **change**: cuando el usuario termina de cambiar el valor: en un \<input> o \<textarea> de texto al perder el foco si ha cambiado su contenido, y en un \<select>, un _checkbox_ o un _radio_ en el momento en que cambia su valor
* **select**: al seleccionar texto dentro de un \<input> o \<textarea> (OJO: no tiene nada que ver con el elemento \<select>)
* **submit**: al enviar el formulario
* **reset**: al restablecer el formulario a sus valores iniciales (con un botón `type="reset"`)

NOTA: para hacer algo al enviar un formulario debemos escuchar el evento **submit del formulario**, no el _click_ del botón de enviar. El formulario también se envía pulsando Enter en un campo de texto y en ese caso el _click_ del botón no se produce, pero el _submit_ sí. Además en ese escuchador normalmente llamaremos a `event.preventDefault()` para que el navegador no envíe el formulario y recargue la página.

```javascript
document.getElementById('form-libro').addEventListener('submit', (event) => {
  event.preventDefault();
  // aquí validamos y procesamos los datos
});
```

## El objeto _event_
Cuando se produce un evento la función manejadora recibe como parámetro un objeto **event** (podemos llamarlo como queramos, es habitual llamarlo `event`, `evt` o `e`). Tiene propiedades y métodos que nos dan información sobre el evento.

### _target_ y _currentTarget_
Son las dos propiedades más importantes y es fácil confundirlas:
* **.target**: el elemento exacto donde se originó el evento — el que el usuario realmente tocó, sobre el que hizo click, etc.
* **.currentTarget**: el elemento que tiene el escuchador que se está ejecutando, es decir, quién está escuchando ese evento.

Sólo coinciden si el evento se produce directamente sobre el elemento con el escuchador y no sobre alguno de sus hijos:

```html
<p id="parrafo">
  Haz clic <strong>aquí</strong> o en el texto.
</p>
```

```javascript
const p = document.getElementById('parrafo');

p.addEventListener('click', (event) => {
  console.log('event.target:', event.target);               // <strong> si pulsamos sobre 'aquí', <p> si pulsamos en el resto
  console.log('event.currentTarget:', event.currentTarget); // siempre <p>, el elemento con el escuchador
});
```

Por tanto, si queremos el elemento al que le hemos puesto el escuchador debemos usar **currentTarget**. Usaremos **target** cuando nos interese saber sobre qué hijo concreto se ha producido el evento (lo veremos en [Delegación de eventos](#delegación-de-eventos)).

### Propiedades y métodos comunes
* **.type**: qué evento se ha producido (`'click'`, `'submit'`, `'keydown'`, ...)
* **.target** / **.currentTarget**: explicados en el apartado anterior
* **.relatedTarget**: en un evento _mouseover_ **event.target** es el elemento donde ha entrado el puntero del ratón y **event.relatedTarget** el elemento del que ha salido. En un evento _mouseout_ sería al revés
* **.preventDefault()**: muchos eventos tienen una acción por defecto que el navegador realiza después de ejecutar los escuchadores (por ejemplo, tras el _click_ en un hiperenlace el navegador salta a la página indicada en su _href_, y tras el _submit_ de un formulario lo envía). Este método cancela esa acción por defecto: el formulario no se enviará o no se irá a la página del enlace
* **.cancelable**: si el evento tiene una acción por defecto que se pueda cancelar con _preventDefault()_
* **.stopPropagation()**: detiene la propagación del evento a los elementos padre (ver [Propagación de eventos](#propagación-de-eventos))

### Propiedades de los eventos de ratón
* **.button**: qué botón del ratón se ha pulsado (0: izq, 1: rueda, 2: dcho)
* **.clientX** / **.clientY**: las coordenadas del ratón respecto a la ventana (la parte visible del documento)
* **.pageX** / **.pageY**: las coordenadas del ratón respecto al documento (si se ha hecho _scroll_ será el clientX/Y más el _scroll_)
* **.offsetX** / **.offsetY**: las coordenadas del ratón respecto al elemento sobre el que se produce el evento (_target_)
* **.screenX** / **.screenY**: las coordenadas del ratón respecto a la pantalla
* **.detail**: en un _click_ indica si ha sido un click simple, doble o triple (1, 2, 3)
* **.shiftKey** / **.ctrlKey** / **.altKey** / **.metaKey**: si estaba pulsada la tecla SHIFT / CTRL / ALT / META (Windows o Cmd) al producirse el evento

### Propiedades de los eventos de teclado
En la información del teclado hay que distinguir entre el **carácter** que se obtiene (pulsando la misma tecla podemos obtener 'e', 'E' o '€') y la **tecla física** que se ha pulsado (la misma en los 3 casos). Por eso tenemos 2 propiedades:
* **.key**: el valor lógico de la tecla: el carácter escrito (`'e'`, `'E'`, `'€'`, `'1'`, ...) o el nombre de la tecla especial (`'Enter'`, `'Tab'`, `'Escape'`, `'ArrowUp'`, `'Shift'`, `'Delete'`, ...). Es la que usaremos casi siempre
* **.code**: la tecla física pulsada, independientemente de la distribución del teclado y de si se pulsa Shift (`'KeyE'`, `'Digit1'`, `'Enter'`, `'ShiftLeft'`, ...). Útil en juegos, donde nos importa la posición de la tecla y no el carácter
* **.shiftKey** / **.ctrlKey** / **.altKey** / **.metaKey**: si está o no pulsada la tecla SHIFT / CTRL / ALT / META
* **.repeat**: `true` si el _keydown_ se está repitiendo por mantener la tecla pulsada

```javascript
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    cierraModal();
  }
  if (event.ctrlKey && event.key === 's') {
    event.preventDefault();   // evitamos que el navegador abra 'Guardar como'
    guardaDatos();
  }
});
```

> NOTA: en código antiguo (y en código generado por IA) encontraréis las propiedades **.keyCode**, **.charCode** y **.which**, que devuelven códigos numéricos (por ejemplo 13 para Enter). Están **obsoletas** y su valor cambia según el evento y el navegador, por lo que no debemos usarlas: en su lugar usaremos _key_ o _code_.

> NOTA: captura sólo lo que sea necesario, se producen muchos eventos de teclado.

Para familiarizarse con los diferentes eventos podéis probar a poner escuchadores desde la consola a cualquier página o usar la página [keycode.info](https://www.toptal.com/developers/keycode) para ver las propiedades de cada tecla.

> EJERCICIO: Pon desde la consola un escuchador al _document_ de la página de ejemplo para que al mover el ratón en cualquier punto de la ventana del navegador, se muestre en algún sitio (añade un DIV o un P al HTML) la posición del puntero respecto de la ventana y respecto de la página. Haz _scroll_ y comprueba la diferencia.

> EJERCICIO: Pon desde la consola un escuchador al _document_ de la página de ejemplo para que al pulsar cualquier tecla nos muestre en la consola el _key_ y el _code_ de la tecla pulsada. Pruébalo con diferentes teclas (letras con y sin Shift, números del teclado principal y del numérico, Enter, flechas, ...).

## El objeto _this_ en los manejadores
Dentro de una función manejadora el valor de _this_ depende de cómo esté definida la función:
* si es una función normal (`function`) _this_ es el elemento que tiene el escuchador, es decir, lo mismo que **event.currentTarget**
* si es una **función flecha** las funciones flecha no tienen su propio _this_ sino que usan el del código en que se han definido. Por tanto _this_ **no** es el elemento

```javascript
const boton = document.getElementById('boton1');

boton.addEventListener('click', function (event) {
  console.log(this === event.currentTarget);   // true: this es el botón
});

boton.addEventListener('click', (event) => {
  console.log(this === event.currentTarget);   // false: this es el del código exterior
});
```

Como habitualmente usaremos funciones flecha, para referirnos al elemento que tiene el escuchador **usaremos siempre `event.currentTarget`** en lugar de _this_.

### _Bindeo_ del objeto _this_
El comportamiento de _this_ en las funciones normales causa problemas cuando ponemos un escuchador dentro de una **clase**. Por ejemplo:

```javascript
class ... {
  ...
  escucha() {
    document.getElementById('boton1').addEventListener('click', function () {
      this.checkData();   // ERROR: TypeError: this.checkData is not a function
    });
  }

  checkData() {
    ...
  }
}
```

Dentro de `escucha()` _this_ es la instancia de la clase, pero dentro de la función manejadora, al ser una función normal, _this_ pasa a ser el botón, que no tiene ningún método _checkData_.

La solución es usar una función flecha, que no tiene su propio _this_ sino que usa el del código que la contiene (el método _escucha_, donde _this_ es la instancia):

```javascript
document.getElementById('boton1').addEventListener('click', () => this.checkData());
```

El mismo problema aparece si pasamos un método como función manejadora (sin paréntesis, porque le pasamos la función, no la ejecutamos). Es lo que hacíamos en la práctica de DOM, donde el _controlador_ le pasa a la _vista_ los métodos que deben ejecutarse en el _submit_ y el _click_ del formulario:

```javascript
this.view.setBookSubmitHandler(this.handleSubmitBook);   // ERROR: dentro de handleSubmitBook this no será el controlador
```

Al ejecutarse, _handleSubmitBook_ pierde la referencia a la instancia del _controlador_ y no puede acceder a sus propiedades y métodos. Hay 2 formas de solucionarlo:

- envolverlo en una función flecha, como antes:
  ```javascript
  this.view.setBookSubmitHandler((payload) => this.handleSubmitBook(payload));
  ```
- usar el método _.bind()_, que crea una copia de la función en la que _this_ tiene el valor que le pasemos:
  ```javascript
  this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this));
  ```

Con _bind_ también podemos pasarle a la función más parámetros. El primer parámetro de _bind_ será el valor de _this_ y los demás serán parámetros que recibirá la función antes del parámetro _event_, que será el último. Por ejemplo:

```javascript
document.getElementById('acepto').addEventListener('click', aceptado.bind(var1, var2));
...
function aceptado(param1, event) {
  // Aquí dentro tendremos los valores
  // this = var1
  // param1 = var2
  // event es el objeto con la información del evento producido (click)
}
```

> OJO: como _bind_ crea una función nueva cada vez que se llama, un escuchador puesto con `boton.addEventListener('click', this.pulsado.bind(this))` no se puede quitar con `boton.removeEventListener('click', this.pulsado.bind(this))`, ya que esa es otra función distinta de la que se registró. Si necesitamos quitarlo hay que guardar la función bindeada en una variable o usar la opción _signal_.

## Propagación de eventos
Normalmente en una página web los elementos HTML están unos dentro de otros, por ejemplo, un \<span> está en un \<p> que está en un \<div> que está en el \<body>. Un evento que se produce sobre el \<span> se produce también sobre todos sus antecesores, por lo que si ponemos un escuchador del evento _click_ a todos ellos se ejecutarán todos, pero ¿en qué orden?

El W3C estableció un modelo en el que el evento recorre el árbol DOM en 3 fases:
1. **fase de captura**: el evento baja desde _window_ y _document_ pasando por todos los antecesores (\<html>, \<body>, \<div>, \<p>) hasta llegar al elemento donde se ha producido
2. **fase de destino (_target_)**: el evento llega al elemento donde se ha producido (el \<span>)
3. **fase de burbujeo (_bubbling_)**: el evento vuelve a subir desde el elemento hasta _window_ pasando de nuevo por todos sus antecesores, como si fuera una burbuja que sale afuera desde el interior

Cuando ponemos un escuchador con `addEventListener` el tercer parámetro (o la opción _capture_) indica en qué fase debe dispararse:
- **true**: en fase de captura
- **false** (valor por defecto): en fase de burbujeo

Por tanto, por defecto se disparará primero el escuchador más interno (el del \<span>) y continuará el resto hasta el más externo (\<div>).

Podéis comprobarlo con este código:

```html
<div id="div">DIV
  <p id="parrafo">P
    <span id="span">SPAN</span>
  </p>
</div>
```

```javascript
for (const id of ['div', 'parrafo', 'span']) {
  document.getElementById(id).addEventListener('click', (event) => {
    console.log(`Escuchador de ${event.currentTarget.id} (target: ${event.target.id})`);
  });
}
// Al pulsar sobre SPAN se muestra:
// Escuchador de span (target: span)
// Escuchador de parrafo (target: span)
// Escuchador de div (target: span)
```

Sin embargo si al método `.addEventListener` le pasamos como tercer parámetro el valor _true_ el escuchador se ejecutará en la fase de _captura_ y el orden será el contrario: el primero en ejecutarse será el del \<div> y el último el del \<span>.

En cualquier momento podemos evitar que el evento se siga propagando a los demás elementos ejecutando el método `event.stopPropagation()` en cualquiera de los escuchadores. Si además queremos que no se ejecuten otros escuchadores del mismo elemento usaremos `event.stopImmediatePropagation()`.

En la siguiente demo cada elemento tiene un escuchador en cada fase. Haz click en SPAN, P o DIV y observa en qué orden se ejecutan. Marca la casilla para ver también la fase de captura y elige en qué elemento se llama a `stopPropagation()` para ver dónde se corta el recorrido:

<iframe src="./demos/eventos-propagacion.html" title="Eventos: propagación (captura y burbujeo)"
        style="width:100%; height:380px; border:1px solid #ddd; border-radius:8px;" loading="lazy"></iframe>

[Abre el ejemplo en una pestaña nueva](./demos/eventos-propagacion.html).

> OJO: no debemos abusar de `stopPropagation()`. Los escuchadores que otras partes de la aplicación (o librerías) tengan en elementos superiores dejarán de recibir el evento, lo que rompe por ejemplo la [delegación de eventos](#delegación-de-eventos) y produce errores difíciles de encontrar. Además no tiene nada que ver con `preventDefault()`: uno detiene la propagación y el otro cancela la acción por defecto del navegador.

NOTA: no todos los eventos burbujean. Por ejemplo _focus_, _blur_, _mouseenter_, _mouseleave_ o _load_ no lo hacen. Podemos saberlo con la propiedad `event.bubbles`.

Podéis ver las distintas fases de un evento en la página [domevents.dev](https://domevents.dev/).

## innerHTML y escuchadores de eventos
Como los escuchadores de eventos se asocian a un elemento, si lo borramos desaparecerá el escuchador y aunque luego volvamos a pintar un elemento igual no tendrá escuchador a menos que se lo pongamos de nuevo.

Por ejemplo, si cambiamos el contenido de la propiedad _innerHTML_ de un elemento todos los escuchadores de eventos de sus elementos hijos desaparecen, ya que es como eliminar su contenido y volver a crearlo.

Eso pasaría en este ejemplo en que tenemos una tabla de datos donde al hacer doble click en cada fila se muestra su id. La función que añade una nueva fila podría ser:
```javascript
function renderNewRow(data) {
  const miTabla = document.getElementById('tabla-datos');
  const nuevaFila = `<tr id="${data.id}"><td>${data.dato1}</td><td>${data.dato2}</td></tr>`;
  miTabla.innerHTML += nuevaFila;
  document.getElementById(data.id).addEventListener('dblclick', (event) => alert('Id: ' + event.currentTarget.id));
}
```

Sin embargo así sólo la última fila añadida tendría escuchador, ya que la línea `miTabla.innerHTML += nuevaFila` borra todo el contenido de _miTabla_ y lo vuelve a crear a partir del texto HTML, y los nuevos elementos ya no tienen escuchadores, excepto el de _nuevaFila_ que lo ponemos después.

La forma correcta de hacerlo sería crear el elemento y añadirlo al DOM:
```javascript
function renderNewRow(data) {
  const miTabla = document.getElementById('tabla-datos');
  const nuevaFila = document.createElement('tr');
  nuevaFila.id = data.id;

  const celda1 = document.createElement('td');
  celda1.textContent = data.dato1;
  const celda2 = document.createElement('td');
  celda2.textContent = data.dato2;
  nuevaFila.append(celda1, celda2);

  nuevaFila.addEventListener('dblclick', (event) => alert('Id: ' + event.currentTarget.id));
  miTabla.appendChild(nuevaFila);
}
```

Fijaos en que en el escuchador usamos `event.currentTarget` (la fila, que es quien tiene el escuchador) y no `event.target`, que sería la celda \<td> sobre la que se ha hecho doble click, que no tiene id.

De esta forma además mejoramos el rendimiento ya que el navegador sólo tiene que crear el nodo correspondiente a la nueva fila y no todas las filas de la tabla como pasaba con el primer código.

> **IMPORTANTE - seguridad**: si construimos HTML con _innerHTML_ (o _insertAdjacentHTML_) a partir de datos que no controlamos (lo que escribe el usuario, lo que devuelve una API, ...) estamos expuestos a ataques **XSS**: si `data.dato1` vale `<img src=x onerror="alert('hackeado')">` ese código se ejecutará en nuestra página. Por eso en el ejemplo anterior creamos las celdas y les asignamos su contenido con `textContent`, que lo trata siempre como texto y nunca como HTML. Si usamos _innerHTML_ debe ser con contenido fijo o con datos que hayamos escapado previamente.

## Delegación de eventos
Es un patrón de diseño que nos permite no tener que poner un escuchador a cada elemento sino uno en un elemento contenedor que haga el trabajo de todos. Funciona gracias al burbujeo: el evento producido en un hijo llega también al contenedor.

Por ejemplo si queremos escuchar cuándo hacemos _click_ en cada celda de una tabla, en lugar de poner un escuchador en cada una (que podría tener cientos) ponemos sólo uno en la tabla y mediante la propiedad `event.target` podemos saber sobre qué celda en concreto se ha hecho _click_. Esto además seguirá funcionando si dinámicamente añadimos nuevas celdas a la tabla, ya que no son ellas las que tienen el escuchador sino la propia tabla.

Hay que tener en cuenta que a veces el evento se produce en alguna etiqueta interna al elemento que buscamos, por lo que `event.target` no sería ese elemento sino un descendiente suyo. Por ejemplo si hay una imagen en la celda el `event.target` podría ser la \<img> y no la \<td>. Para asegurarnos de llegar al elemento deseado usaremos el método `closest()` que vimos en el DOM, que devuelve el propio elemento o su antecesor más cercano que cumpla el selector (o `null` si no hay ninguno):

```javascript
const tabla = document.getElementById('tabla-datos');

tabla.addEventListener('click', (event) => {
  const celda = event.target.closest('td');
  if (!celda || !tabla.contains(celda)) {
    return;   // el click no ha sido en una celda de esta tabla (por ejemplo en un <th>)
  }
  celda.classList.toggle('seleccionada');
  console.log(`Fila ${celda.parentElement.id}: ${celda.textContent}`);
});
```

Es habitual combinarlo con atributos _data-_ para saber qué acción realizar, por ejemplo en una lista de libros con botones de borrar y editar en cada uno:

```html
<ul id="lista-libros">
  <li data-id="1"><strong>El Quijote</strong>
    <button data-action="edit">Editar</button>
    <button data-action="delete">Borrar</button>
  </li>
  ...
</ul>
```

```javascript
document.getElementById('lista-libros').addEventListener('click', (event) => {
  const boton = event.target.closest('button[data-action]');
  if (!boton) return;   // el click no ha sido en un botón

  const id = Number(boton.closest('li').dataset.id);
  if (boton.dataset.action === 'delete') {
    borraLibro(id);
  } else if (boton.dataset.action === 'edit') {
    editaLibro(id);
  }
});
```

En la siguiente demo sólo hay ese escuchador en la lista. Pulsa los botones y los títulos y observa el _target_ de cada click. Después añade un libro nuevo: sus botones funcionan aunque no les hemos puesto ningún escuchador:

<iframe src="./demos/eventos-delegacion.html" title="Eventos: delegación de eventos"
        style="width:100%; height:300px; border:1px solid #ddd; border-radius:8px;" loading="lazy"></iframe>

[Abre el ejemplo en una pestaña nueva](./demos/eventos-delegacion.html).

NOTA: la delegación sólo funciona con eventos que burbujean. Por ejemplo para delegar el foco de los campos de un formulario hay que usar _focusin_ / _focusout_ en lugar de _focus_ / _blur_.

Podéis ver más ejemplos de delegación de eventos en [El Tutorial de JavaScript Moderno](https://es.javascript.info/event-delegation).

## Eventos personalizados
También podemos lanzar desde nuestro código cualquier evento sobre un elemento con el método `dispatchEvent()` e incluso crear eventos personalizados con el nombre que queramos:
```javascript
const evento = new Event('libroBorrado');

// Ponemos el escuchador del evento
elem.addEventListener('libroBorrado', (event) => { /* ... */ });

// Lanzamos el evento
elem.dispatchEvent(evento);
```

Si queremos enviar datos junto con el evento lo crearemos con `new CustomEvent()` y le pasaremos los datos en la propiedad **detail** de sus opciones. El escuchador los recibirá en `event.detail`:

```javascript
const evento = new CustomEvent('libroBorrado', {
  detail: { id: 7, titulo: 'El Quijote' },
  bubbles: true,
});

document.getElementById('lista-libros').addEventListener('libroBorrado', (event) => {
  console.log(`Se ha borrado el libro ${event.detail.titulo}`);
});

document.querySelector('li[data-id="7"]').dispatchEvent(evento);
```

> OJO: los eventos que creamos **no burbujean por defecto**. Si lanzamos el evento sobre un elemento y lo escuchamos en uno de sus padres (como en el ejemplo anterior) tenemos que crearlo con la opción `bubbles: true` o el escuchador no se ejecutará nunca.

Podéis obtener más información en la [página de MDN](https://developer.mozilla.org/es/docs/Web/Events/Creating_and_triggering_events).
