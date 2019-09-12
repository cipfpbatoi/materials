<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Browser Object Model (BOM)](#browser-object-model-bom)
  - [Introducción](#introducci%C3%B3n)
  - [Timers](#timers)
  - [Objetos del BOM](#objetos-del-bom)
    - [Objeto window](#objeto-window)
      - [Diálogos](#di%C3%A1logos)
    - [Objeto location](#objeto-location)
    - [Objeto history](#objeto-history)
    - [Otros objetos](#otros-objetos)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Browser Object Model (BOM)

## Introducción
Si en el tema anterior vimos cómo interactuar con la página (DOM) en este veremos cómo acceder a objetos que nos permitan interactuar con el navegador ( y Browser Object Model, BOM).

Usando los objetos BOM podemos:
* Abrir, cambiar y cerrar ventanas
* Ejecutar código en cierto tiempo (_timers_)
* Obtener información del navegador
* Ver y modificar propiedades de la pantalla
* Gestionar cookies, ...

## Timers
Permiten ejecutar código en el futuro (cuando transcurran los milisegundos indicados). Hay 2 tipos:
* `setTimeout(función, milisegundos)`: ejecuta la función indicada una sóla vez, cuando transcurran los milisegundos
* `setInterval(función, milisegundos)`: ejecuta la función indicada cada vez que transcurran los milisegundos, hasta que sea cancelado el _timer_. A ambas se le pueden pasar más parámetros tras los milisegundos y serán los parámetros que recibirá la función a ejecutar.

Ambas funciones devuelven un identificador que nos permitirá cancelar la ejecución del código, con:
* `clearTiemout(identificador)`
* `clearInterval(identificador)`

Ejemplo:
```javascript
let idTimeout=setTimeout(function() {
	alert('Timeout que se ejecuta al cabo de 1 seg.')
}, 1000);

let i=1;
let idInterval=setInterval(function() {
	alert('Interval cada 3 seg. Ejecución nº: '+ i++);
   if (i==5) {
      clearInterval(idInterval);
      alert('Fin de la ejecución del Interval');
	}
}, 3000);
```

## Objetos del BOM
Al contrario que para el DOM, no existe un estándar de BOM pero es bastante parecido en los diferentes navegadores. 

### Objeto [window](http://www.w3schools.com/jsref/obj_window.asp)
Representa la ventana del navegador y es el objeto principal. De hecho puede omitirse al llamar a sus propiedades y métodos, por ejemplo, el método `setTimeout()` es en realidad `window.setTimeout()`.

Sus principales propiedades y métodos son:
* `.name`: nombre de la ventana actual
* `.status`: valor de la barra de estado
* `.screenX`/`.screenY`: distancia del elemento a la esquina izquierda/superior pantalla
* `.outerWidth`/`.outerHeight`: ancho/alto total de la pantalla, sin contar la barra superior del navegador
* `.innerWidth`/`.innerHeight`: ancho/alto visible del documento
* `.open(url, nombre, opciones)`: abre una nueva ventana. Devuelve el nuevo objeto ventana. Las principales opciones son:
    * `.toolbar`: si tendrá barra de herramientas
    * `.location`: si tendrá barra de dirección
    * `.directories`: si tendrá botones Adelante/Atrás
    * `.status`: si tendrá barra de estado
    * `.menubar`: si tendrá barra de menú
    * `.scrollbar`: si tendrá barras de desplazamiento
    * `.resizable`: si se puede cambiar su tamaño 
    * `.width=px`/`.height=px`: ancho/alto
    * `.left=px`/`.top=px`: posición izq/sup de la ventana
* `.opener`: ventana desde a que se abrió
* `.close()`: la cierra (pide confirmación, a menos que la hayamos abierto con open)
* `.moveTo(x,y)`: la mueve a las coord indicadas
* `.moveBy(x,y)`: la desplaza los px indicados
* `.resizeTo(x,y)`: la da el ancho y alto indicados
* `.resizeBy(x,y)`: le añade ese ancho/alto
* Otros métodos: `.back()`, `.forward()`, `.home()`, `.stop()`, `.focus()`, `.blur()`, `.find()`, `.print()`, …
NOTA: por seguridad no se puede mover una ventana fuera de la pantalla ni darle un tamaño menor de 100x100 px ni tampoco se puede mover una ventana no abierta con .open() o si tiene varias pestañas

#### Diálogos
Hay 3 métodos del objeto _window_ que ya conocemos y que nos permiten abrir ventanas de diálogo con el usuario:
* `window.alert(mensaje)`: muestra un diálogo con el mensaje indicado y un botón de 'Aceptar'
* `window.confirm(mensaje)`: muestra un diálogo con el mensaje indicado y botones de 'Aceptar' y 'Cancelar'. Devuelve _true_ si se ha pulsado el botón de aceptar del diálogo y _false_ si no.
* `window.prompt(mensaje [, valor predeterminado])`: muestra un diálogo con el mensaje indicado, un cuadro de texto (vacío o co el valor predeterminado indicado) y botones de 'Aceptar' y 'Cancelar'. Si se pulsa 'Aceptar' devolverá un _string_ con el valor que haya en el cuadro de texto y si se pulsa 'Cancelar' o se cierra devolverá _null_.

### Objeto [location](http://www.w3schools.com/jsref/obj_location.asp)
Contiene información sobre la URL actual del navegador y podemos modificarla. Sus principales propiedades y métodos son:
* `.href`: devuelve la URL actual completa
* `.protocol`, `.host`, `.port`: devuelve el protocolo, host y puerto respectivamente de la URL actual
* `.pathname`: devuelve la ruta al recurso actual
* `.reload()`: recarga la página actual
* `.assign(url)`: carga la página pasada como parámetro
* `.replace(url)`: ídem pero sin guardar la actual en el historial

### Objeto [history](http://www.w3schools.com/jsref/obj_history.asp)
Permite acceder al historial de páginas visitadas y navegar por él:
* `.length`: muestra el número de páginas almacenadas en el historial
* `.back()`: vuelve a la página anterior
* `.forward()`: va a la siguiente página
* `.go(num)`: se mueve _num_ páginas hacia adelante o hacia atrás (si _num_ es negativo) en el historial

### Otros objetos
Los otros objetos que incluye BOM son:
* [document](http://www.w3schools.com/jsref/dom_obj_document.asp): el objeto _document_ que hemos visto en el DOM
* [navigator](http://www.w3schools.com/jsref/obj_navigator.asp): nos informa sobre el navegador y el sistema en que se ejecuta
    * `.userAgent`: muestra información sobre el navegador que usamos
    * `.plataform`: muestra información sobre la plataforma sobre la que se ejecuta
    * ...
* [screen](http://www.w3schools.com/jsref/obj_screen.asp): nos da información sobre la pantalla
    * `.width`/`.height`: ancho/alto total de la pantalla (resolución)
    * `.availWidth`/`.availHeight`: igual pero excluyendo la barra del S.O.
    * ...

