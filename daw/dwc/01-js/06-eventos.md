<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Eventos](#eventos)
  - [Introducción](#introducci%C3%B3n)
  - [Escuchadores de eventos](#escuchadores-de-eventos)
    - [Forma clásica](#forma-cl%C3%A1sica)
    - [Event listeners](#event-listeners)
  - [Tipos de eventos](#tipos-de-eventos)
    - [Eventos de página](#eventos-de-p%C3%A1gina)
    - [Eventos de ratón](#eventos-de-rat%C3%B3n)
    - [Eventos de teclado](#eventos-de-teclado)
    - [Eventos de toque](#eventos-de-toque)
    - [Eventos de formulario](#eventos-de-formulario)
  - [Los objetos _this_ y _event_](#los-objetos-_this_-y-_event_)
  - [Propagación de eventos (bubbling)](#propagaci%C3%B3n-de-eventos-bubbling)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Eventos

## Introducción
Nos permiten detectar acciones que realiza el usuario o cambios que suceden en la página y reaccionar en respuesta a ellas. Existen muchos eventos diferentes (podéis ver la lista en [w3schools](https://www.w3schools.com/jsref/dom_obj_event.asp)) aunque nosotros nos centraremos en los más comunes.

## Escuchadores de eventos
Podemos ejecutar código cuando se produce un evento (por ejemplo el evento _click_ del ratón) asociando al mismo una función. Hay varias formas de hacerlo.

### Forma clásica
La forma tradicional (no recomendada) es añadir el elemento HTML un atributo que se llama como el evento precedido de _on_ al que le indicamos el código a ejecutar:
```html
<button id="acepto" onclick="alert('Se ha aceptado')">Aceptar</button>
```

Una mejora es sacar el código Javascript del HTML:

<script async src="//jsfiddle.net/juansegura/x9gmrckq/embed/js,html,result/"></script>

NOTA: hay que tener cuidado porque si se ejecuta el código antes de que se haya creado el botón estaremos asociando la función al evento _click_ de un elemento que aún no existe así que no hará nada. Para evitarlo siempre es conveniente poner el código que atiende a los eventos dentro de una función que se ejecute al producirse el evento _load_. Este evento se produce cuando se han cargado todos los elementos HTML de la página y se ha creado el árbol DOM. Lo mismo habría que hacer con cualquier código que modifique el árbol DOM. El código correcto sería:
```javascript
window.onload=function() {
  document.getElementById('acepto').onclick=function() {
    alert('Se ha aceptado');
  }
}
```

### Event listeners
La forma recomendada de hacerlo es usando escuchadores de eventos. El método `addEventListener` recibe como primer parámetro el nombre del evento a escuchar y como segundo parámetro la función a ejecutar (OJO, sin paréntesis) cuando se produzca:
```javascript
document.getElementById('acepto').addEventListener('click', aceptado);
...
function aceptado() {
  alert('Se ha aceptado');
})
```

Si queremos pasarle algún parámetro a la función escuchadora (cosa bastante poco usual) debemos usar funciones anónimas como escuchadores de eventos. Es bastante habitual usar este tipo de funciones ya que lo normal es que sólo se vayan a llamar al producirse el evento:

<script async src="//jsfiddle.net/juansegura/L5pkg93w/1/embed/js,html,result/"></script>

NOTA: igual que antes debemos estar seguros de que se ha creado el árbol DOM antes de poner un escuchador por lo que se recomienda ponerlos siempre dentro de la función asociada al evento `window.onload` (o mejor `window.addEventListener('load', ...)` como en el ejemplo anterior).

Una ventaja de este método es que podemos poner varios escuchadores para el mismo evento y se ejecutarán todos ellos. Para eliminar un escuchador se usa el método `removeEventListener`.
```javascript
document.getElementById('acepto').removeEventListener('click', aceptado);
```

NOTA: no se puede quitar un escuchador si hemos usado una función anónima, para quitarlo debemos usar como escuchador una función con nombre.

## Tipos de eventos
Según qué o dónde se produce un evento estos se clasifican en:

### Eventos de página
Se producen en el documento HTML, normalmente en el BODY:
* **load**: se produce cuando termina de cargarse la página (cuando ya está construido el árbol DOM). Es útil para hacer acciones que requieran que el DOM esté cargado como modificar la página o poner escuchadores de eventos
* **unload**: al destruirse el documento (ej. cerrar)
* **beforeUnload**: antes de destruirse (podríamos mostrar un mensaje de confirmación)
* **resize**: si cambia el tamaño del documento (porque se redimensiona la ventana)

### Eventos de ratón
Los produce el usuario con el ratón:
* **click** / **dblclick**: cuando se hace click/doble click sobre un elemento
* **mousedown** / **mouseup**: al pulsar/soltar cualquier botón del ratón
* **mouseenter** / **mouseleave**: cuando el puntero del ratón entra/sale del elemento (tb. podemos usar mouseover/mouseout)
* **mousemove**: se produce continuamente mientras el puntero se mueva dentro del elemento

NOTA: si hacemos doble click sobre un elemento la secuencia de eventos que se produciría es: _mousedown_ -> _mouseup_ -> _click_ -> _mousedown_ -> _mouseup_ -> _click_ -> _dblclick_

### Eventos de teclado
Los produce el usuario al usar el teclado:
* **keydown**: se produce al presionar una tecla y se repite continuamente si la tecla se mantiene pulsada
* **keyup**: cuando se deja de presionar la tecla
* **keypress**: acción de pulsar y soltar (sólo se produce en las teclas alfanuméricas)

NOTA: el orden de secuencia de los eventos es:
_keyDown_ -> _keyPress_ -> _keyUp_

### Eventos de toque
Se producen al usar una pantalla táctil:
* **touchstart**: se produce cuando se detecta un toque en la pantalla táctil
* **touchend**: cuando se deja de pulsar la pantalla táctil
* **touchmove**: cuando un dedo es desplazado a través de la pantalla
* **touchcancel**: cuando se interrumpe un evento táctil.

### Eventos de formulario
Se producen en los formularios:
* **focus** / **blur**: al obtener/perder el foco el elemento
* **change**: al perder el foco un \<input> o \<textarea> si ha cambiado su contenido o al cambiar de valor un \<select> o un \<checkbox>
* **input**: al cambiar el valor de un \<imput> o \<textarea> (se produce cada vez que escribimos una letra es estos elementos)
* **select**: al cambiar el valor de un \<select> o al seleccionar texto de un \<imput> o \<textarea>
* **submit** / **reset**: al enviar/recargar un formulario

## Los objetos _this_ y _event_
Al producirse un evento se generan automáticamente en su función manejadora 2 objetos:
* **this**: siempre hace referencia al elemento que contiene el código en donde se encuentra la variable _this_. En el caso de una función escuchadora será el elemento que tiene el escuchador que ha recibido el evento
* **event**: es un objeto y la función escuchadora lo recibe como parámetro. Tiene propiedades y métodos que nos dan información sobre el evento, como:
  * **.type**: qué evento se ha producido (click, submit, keyDown, ...)
  * **.target**: el elemento donde se produjo el evento (puede ser un descendiente de _this_ como en el ejemplo siguiente) 
  * **.currentTarget**: el elemento que contiene el escuchador del evento lanzado (normalmente el mismo que _this_). Por ejemplo si tenemos un _<p>_ al que le ponemos un escuchador de 'click' que dentro tiene un elemento _<span>_, si hacemos _click_ sobre el _<span>_ **event.target** será el _<span>_ que es donde hemos hecho click (está dentro de _<p>_) pero tanto _<this>_ como _event.currentTarget_ será _<p>_ (que es quien tiene el escuchador que se está ejecutando).
  * **.relatedTarget**: en un evento 'mouseover' **event.target** es el elemento donde ha entrado el puntero del ratón y **event.relatedTarget** el elemento del que ha salido. En un evento 'mouseout' sería al revés.
  * **cancelable**: si el evento puede cancelarse. En caso afirmativo se puede llamar a **event.preventDefault()** para cancelarlo
  * **.preventDefault()**: si un evento tiene un escuchador asociado se ejecuta el código de dicho escuchador y después el navegador realiza la acción que correspondería por defecto al evento si no tuviera escuchador (por ejemplo un escuchador del evento _click_ sobre un hiperenlace hará que se ejecute su código y después saltará a la página indicada en el _href_ del hiperenlace). Este método cancela la acción por defecto del navegador para el evento. Por ejemplo si el evento era el _submit_ de un formulario éste no se enviará o si era un _click_ sobre un hiperenlace no se irá a la página indicada en él.
  * **.stopPropagation**: un evento se produce sobre un elemento y todos su padres. Por ejemplo si hacemos click en un \<span> que está en un \<p> que está en un \<div> que está en el BODY el evento se va propagando por todos estos elementos y saltarían los escuchadores asociados a todos ellos (si los hubiera). Si alguno llama a este método el evento no se propagará a los demás elementos padre.
  * dependiento del tipo de evento tendrá más propiedades:
    * eventos de ratón:
      * **.button**: qué botón del ratón se ha pulsado (0: izq, 1: rueda; 2: dcho).
      * **.screenX** / **.screenY**: las corrdenadas del ratón respecto a la pantalla
      * **.clientX** / **.clientY**: las coordenadas del ratón respecto a la ventana cuando se produjo el evento
      * **.pageX** / **.pageY**: las coordenadas del ratón respecto al documento (si se ha hecho un scroll será el clientX/Y más el scroll)
      * **.offsetX** / **.offsetY**: las coordenadas del ratón respecto al elemento sobre el que se produce el evento
      * **.detail**: si se ha hecho click, doble click o triple click
    * eventos de teclado: son los más incompatibles entre diferentes navegadores. En el teclado hay teclas normales y especiales (Alt, Ctrl, Shift, Enter, Tab, flechas, Supr, ...). En la información del teclado hay que distinguir entre el código del carácter pulsado (e=101, E=69, €=8364) y el código de la tecla pulsada (para los 3 caracteres es el 69 ya que se pulsa la misma tecla). Las principales propiedades de _event_ son:
      * **.key**: devuelve el nombre de la tecla pulsada
      * **.which**: devuelve el código de la tecla pulsada
      * **.keyCode** / **.charCode**: código de la tecla pulsada y del carácter pulsado (según navegadores)
      * **.shiftKey** / **.ctrlKey** / **.altKey** / **.metaKey**: si está o no pulsada la tecla SHIFT / CTRL / ALT / META. Esta propiedad también la tienen los eventos de ratón
      > NOTA: a la hora de saber qué tecla ha pulsado el usuario es conveniente tener en cuenta:
      > * para saber qué carácter se ha pulsado lo mejor usar la propiedad _key_ o _charCode_ de _keyPress_, pero varía entre navegadores
      > * para saber la tecla especial pulsada mejor usar el _key_ o el _keyCode_ de _keyUp_
      > * captura sólo lo que sea necesario, se producen muchos eventos de teclado
      > * para obtener el carácter a partir del código: `String fromCharCode(codigo);`
      
Lo mejor para familiarizarse con los diferentes eventos es consultar los [ejemplos de w3schools](https://www.w3schools.com/js/js_events_examples.asp).

## Propagación de eventos (bubbling)
Normalmente en una página web los elementos HTML se solapan unos con otros, por ejemplo, un \<span> está en un \<p> que está en un \<div> que está en el \<body>. Si ponemos un escuchador del evento _click_ a todos ellos se ejecutarán todos ellos, pero ¿en qué orden?.

Pues el W3C establecíó un modelo en el que primero se disparan los eventos de fuera hacia dentro (primero el \<body>) y al llegar al más interno (el \<spab>) se vuelven a disparar de nuevo pero de dentro hacia afuera. La primera fase se conoce como **fase de captura** y la segunda como **fase de burbujeo**. Cuando ponemos un escuchador con `addEventListener` el tercer parámetro indica en qué fase debe dispararse:
- **true**: en fase de captura
- **false** (valor por defecto): en fase de burbujeo

Podéis ver un ejemplo en:

<script async src="//jsfiddle.net/juansegura/n3b6fph0/embed/js,html,result/"></script>

Sin embargo si al método `.addEventListener` le pasamos un tercer parámetro con el valor _true_ el comportamiento será el contrario, lo que se conoce como _captura_ y el primer escuchador que se ejecutará es el del \<body> y el último el del \<span> (podéis probarlo añadiendo ese parámetro a los escuchadores del ejemplo anterior).

En cualquier momento podemos evitar que se siga propagando el evento ejecutando el método `.stopPropagation()` en el código de cualquiera de los escuchadores.
