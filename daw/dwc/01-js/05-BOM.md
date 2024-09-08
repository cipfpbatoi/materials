# Browser Object Model (BOM)
- [Browser Object Model (BOM)](#browser-object-model-bom)
  - [Introducción](#introducción)
  - [Timers](#timers)
  - [Objetos del BOM](#objetos-del-bom)
    - [Objeto window](#objeto-window)
      - [Diálogos](#diálogos)
    - [Objeto location](#objeto-location)
    - [Objeto history](#objeto-history)
    - [Objeto navigator](#objeto-navigator)
    - [Otros objetos](#otros-objetos)

## Introducción
Si en el tema anterior vimos cómo interactuar con el documento mostrado en la página (_DOM_) en este veremos cómo acceder a objetos que nos permitan interactuar con el navegador (_Browser Object Model, BOM_).

Usando los objetos BOM podemos:
* Abrir, cambiar y cerrar ventanas
* Ejecutar código en cierto tiempo (_timers_)
* Obtener información del navegador
* Ver y modificar propiedades de la pantalla
* Gestionar cookies, ...

## Timers
Permiten ejecutar código en el futuro (cuando transcurran los milisegundos indicados). Hay 2 tipos:
* `setTimeout(función, milisegundos)`: ejecuta la función pasada como parámetro una sóla vez, cuando transcurran los milisegundos indicados
* `setInterval(función, milisegundos)`: ejecuta la función cada vez que transcurran los milisegundos indicados, hasta que sea cancelado el _timer_. A ambas se le pueden pasar más parámetros tras los milisegundos y serán los parámetros que recibirá la función a ejecutar.

Ambas funciones devuelven un identificador que nos permitirá cancelar la ejecución del código usando:
* `clearTiemout(identificador)`
* `clearInterval(identificador)`

Ejemplo:
```javascript
const idTimeout = setTimeout(() => alert('Timeout que se ejecuta al cabo de 1 seg.'), 1000);

let i = 1;
const idInterval = setInterval(() => {
	alert('Interval cada 3 seg. Ejecución nº: '+ i++);
  if (i === 5) {
    clearInterval(idInterval);
    alert('Fin de la ejecución del Interval');
	}
}, 3000);
```

> EJERCICIO: Ejecuta en la consola cada una de esas funciones

En lugar de definir la función a ejecutar podemos llamar a una función que ya exista:
```javascript
function showMessage() {
  alert('Timeout que se ejecuta al cabo de 1 seg.')
}

const idTimeout=setTimeout(showMessage, 1000);
```

Pero en ese caso hay que poner sólo el nombre de la función, sin `()` ya que si los ponemos se ejecutaría la función en ese momento y no transcurrido el tiempo indicado.

Si necesitamos pasarle algún parámetro a la función lo añadiremos como parámetros de `setTimeout` o `setInterval` después del intervalo:
```javascript
function showMessage(msg) {
  alert(msg)
}

const idTimeout = setTimeout(showMessage, 1000, 'Timeout que se ejecuta al cabo de 1 seg.');
```

## Objetos del BOM
Al contrario que para el DOM, no existe un estándar de BOM pero es bastante parecido en los diferentes navegadores. 

### Objeto [window](http://www.w3schools.com/jsref/obj_window.asp)
Representa la ventana del navegador y es el objeto principal. De hecho puede omitirse al llamar a sus propiedades y métodos, por ejemplo, el método `setTimeout()` es en realidad `window.setTimeout()`.

Sus principales propiedades y métodos son:
* `.name`: nombre de la ventana actual
* `.status`: valor de la barra de estado
* `.screenX`/`.screenY`: distancia de la ventana a la esquina izquierda/superior de la pantalla
* `.outerWidth`/`.outerHeight`: ancho/alto total de la ventana, incluyendo la toolbar y la scrollbar
* `.innerWidth`/`.innerHeight`: ancho/alto útil del documento, sin la toolbar y la scrollbar
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
* `.opener`: referencia a la ventana desde la que se abrió esta ventana (para ventanas abiertas con _open_)
* `.close()`: la cierra (pide confirmación, a menos que la hayamos abierto con open)
* `.moveTo(x,y)`: la mueve a las coord indicadas
* `.moveBy(x,y)`: la desplaza los px indicados
* `.resizeTo(x,y)`: la da el ancho y alto indicados
* `.resizeBy(x,y)`: le añade ese ancho/alto
* `.pageXoffset / pageYoffset`: scroll actual de la ventana horizontal / vertical
* Otros métodos: `.back()`, `.forward()`, `.home()`, `.stop()`, `.focus()`, `.blur()`, `.find()`, `.print()`, …
NOTA: por seguridad no se puede mover una ventana fuera de la pantalla ni darle un tamaño menor de 100x100 px ni tampoco se puede mover una ventana no abierta con .open() o si tiene varias pestañas

> EJERCICIO: Ejecuta desde la consola:
> - abre una nueva ventana de dimensiones 500x200px en la posición (100,200)
> - escribe en ella (con document.write) un título h1 que diga 'Hola'
> - muévela 300 px hacia abajo y 100 a la izquierda
> - ciérrala

Puedes ver un ejemplo de cómo abrir ventanas en [este vídeo](https://www.youtube.com/watch?v=jkTt6bs2tPo&list=PLI7nHlOIIPOJtTDs1HVJABswW-xJcA7_o&index=40).

> EJERCICIO: Haz que a los 2 segundos de abrir la página se abra un _popup_ con un mensaje de bienvenida. Esta ventana tendrá en su interior un botón Cerrar que permitirá que el usuario la cierre haciendo clic en él. Tendrá el tamaño justo para visualizar el mensaje y no tendrá barras de scroll, ni de herramientas, ni de dirección... únicamente el mensaje.

#### Diálogos
Hay 3 métodos del objeto _window_ que ya conocemos y que nos permiten abrir ventanas de diálogo con el usuario:
* `window.alert(mensaje)`: muestra un diálogo con el mensaje indicado y un botón de 'Aceptar'
* `window.confirm(mensaje)`: muestra un diálogo con el mensaje indicado y botones de 'Aceptar' y 'Cancelar'. Devuelve _true_ si se ha pulsado el botón de aceptar del diálogo y _false_ si no.
* `window.prompt(mensaje [, valor predeterminado])`: muestra un diálogo con el mensaje indicado, un cuadro de texto (vacío o co el valor predeterminado indicado) y botones de 'Aceptar' y 'Cancelar'. Si se pulsa 'Aceptar' devolverá un _string_ con el valor que haya en el cuadro de texto y si se pulsa 'Cancelar' o se cierra devolverá _null_.

### Objeto [location](http://www.w3schools.com/jsref/obj_location.asp)
Contiene información sobre la URL actual del navegador y podemos modificarla. Sus principales propiedades y métodos son:
* `.href`: devuelve la URL actual completa
* `.protocol`, `.hostname`, `.port`: devuelve el protocolo, host y puerto respectivamente de la URL actual
* `.pathname`, `hash`, `search`: devuelve la ruta al recurso actual, el gragmento (`#...`) y la cadena de búsqueda (`?...`) respectivamente
* `.reload()`: recarga la página actual
* `.assign(url)`: carga la página pasada como parámetro
* `.replace(url)`: ídem pero sin guardar la actual en el historial

> EJERCICIO: Ejecuta en la consola
> - muestra la ruta completa de la página actual
> - muestra el servidor de esta página
> - carga la página de Google usando el objeto _location_

### Objeto [history](http://www.w3schools.com/jsref/obj_history.asp)
Permite acceder al historial de páginas visitadas y navegar por él:
* `.length`: muestra el número de páginas almacenadas en el historial
* `.back()`: vuelve a la página anterior
* `.forward()`: va a la siguiente página
* `.go(num)`: se mueve _num_ páginas hacia adelante o hacia atrás (si _num_ es negativo) en el historial

> EJERCICIO: desde la consola vuelve a la página anterior

### Objeto navigator
Nos da información sobre el navegador y el sistema en que se ejecuta:
  * `.userAgent`: muestra información sobre el navegador que usamos
  * `.language`: muestra el idioma del navegador
  * `.languages`: muestra los idiomas instalados en el navegador
  * `.appVersion`: versión del navegador
  * `.appName`: nombre del navegador
  * `.appCodeName`: nombre en código del navegador
  * `.product`: producto del navegador
  * `.platform`: sistema en el que se ejecuta el navegador
  * ...

También incluye objetos con sus propias API para poder interactuar con el sistema:
  * `.geolocation`: devuelve un objeto con la localización del dispositivo (sólo funciona en https)
  * `.storage`: permite acceder a los datos almacenados en el navegador (los veremos en detalle más adelante)
  * `.clipboard`: permite copiar texto al portapapeles del usuario con `.writeText()` (sólo funciona en https)
  * `.mediaDevices`: permite acceder a los dispositivos multimedia del usuario
  * `.serviceWorker`: permite trabajar con _service workers_
  * ...

> EJERCICIO: desde la consola muestra la información del navegador, su lenguaje y del sistema en que se ejecuta

### Otros objetos
Otros objetos que incluye BOM son:
* [screen](http://www.w3schools.com/jsref/obj_screen.asp): nos da información sobre la pantalla
    * `.width`/`.height`: ancho/alto total de la pantalla (resolución)
    * `.availWidth`/`.availHeight`: igual pero excluyendo la barra del S.O.
    * ...

> EJERCICIO: obtén desde la consola todas las propiedades width/height y availWidth/availHeight del objeto _scrren_. Compáralas con las propiedades innerWidth/innerHeight y outerWidth/outerHeight de _window_.
