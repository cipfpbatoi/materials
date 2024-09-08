# BLOQUE 1 - El lenguaje Javascript
En este primer bloque vamos a conocer el lenguaje Javascript. El bloque se divide en:
* [Introducción a Javascript](#introducci%C3%B3n-a-javascript)
* [1-Sintaxis](./01-sintaxis.md): Variables. Funciones. Estructuras y bucles. Tipos de datos. Buenas prácticas
  * [Introducción a los test en Javascript](./tests.md)
* [2.1-Objetos](./02.1-objetos.md): Introducción a los objetos en Javascript
* [2.2-Arrays](./02.2-arrays.md): Métodos. _Functional Programming_. Referencia vs copia. Rest y Spread. Desestructuración de arrays. Map. Set
  * [Vite](./03.1-vite.md): Cómo usar vite
  * [Webpack](./03.1-webpack.md): Cómo usar webpack
* [3-Programación Orientada a Objetos](./03-oop.md): Introducción. Clases. POO en JS5
* [5-Ajax. Promesas. SPA](./09-ajax.md)
* [4-Document Object Model - DOM](./04-DOM.md): Acceso a nodos. Acceso desde otros nodos. Manipular el árbol DOM. Atributos de los nodos
  * [4.1-MVC](./04.1-MVC.md): Cómo usaremos el patrón MVC para crear la UI de nuestra aplicación
location, history, otros objetos)
* [6-Eventos](./06-eventos.md): Escuchadores. Tipos de eventos. Los objetos _this_ y _event_. Propagación de eventos (_bubbling_)
* [7-Objetos nativos](./07-globales.md): Funciones globales. Objetos nativos del lenguaje: Math, Date, RegExp, ...
* [8-Validación de formularios](./08-forms.md): Validación de formularios. La API de validación de formularios. Expresiones regulares
* [9-Browser Object Model - BOM](./05-BOM.md): Timers. Objetos del BOM (window, 
* [10-APIs HTML5](./10-apis.md): Drag and drop. API Storage. Geolocalización. API de Google Maps
* [11-Más cosas a aprender...](./11-mas.md): WebComponents. WebSockets. WebWorkers. Typescript.
* [12-Tests](./12-tests.md): Testear JS con Jest

# Introducción a Javascript
- [BLOQUE 1 - El lenguaje Javascript](#bloque-1---el-lenguaje-javascript)
- [Introducción a Javascript](#introducción-a-javascript)
  - [Introducción](#introducción)
    - [Un poco de historia](#un-poco-de-historia)
    - [Soporte en los navegadores](#soporte-en-los-navegadores)
  - [Herramientas](#herramientas)
    - [La consola del navegador](#la-consola-del-navegador)
    - [Editores](#editores)
    - [Editores on-line](#editores-on-line)
  - [Incluir javascript en una página web](#incluir-javascript-en-una-página-web)
  - [Mostrar información](#mostrar-información)
- [Bibliografía](#bibliografía)


## Introducción
En las páginas web el elemento fundamental es el fichero HTML con la información a mostrar en el navegador. Posteriormente surgió la posibilidad de "decorar" esa información para mejorar su apariencia, lo que dio lugar al CSS. Y también se pensó en dar dinamismo a las páginas y apareció el lenguaje Javascript.

En un primer momento las 3 cosas estaban mezcladas en el fichero HTML pero eso complicaba bastante el poder leer esa página a la hora de mantenerla por lo que se pensó en separar los 3 elementos básicos:
- HTML: se encarga de estructurar la página y proporciona su información, pero es una información estática
- CSS: es lo que da forma a dicha información, permite mejorar su apariencia, permite que se adapte a distintos dispositivos, ...
- Javascript: es el que da vida a un sitio web y le permite reaccionar a las acciones del usuario

Por tanto nuestras aplicaciones tendrán estos 3 elementos y lo recomendable es que estén separados en distintos ficheros:
- El HTML lo tendremos habitualmente en un fichero index.html, normalmente en una carpeta llamada _public_
- El CSS lo tendremos en uno o más ficheros con extensión _.css_ dentro de una carpeta llamada _styles_
- EL JS estará en ficheros con extensión _.js_ en un directorio llamado _scripts_

Las características principales de Javascript son:
- es un lenguaje interpretado, no compilado
- se ejecuta en el lado cliente (en un navegador web), aunque hay implementaciones como NodeJS para el lado servidor
- es un lenguaje orientado a objetos (podemos crear e isntanciar objetos y usar objetos predefinidos del lenguaje) pero basado en prototipos (por debajo un objeto es un prototipo y nosotros podemos crear objetos sin instanciarlos, haciendo copias del prototipo)
- se trata de un lenguaje débilmente tipado, con tipificación dinámica (no se indica el tipo de datos de una variable al declararla e incluso puede cambiarse)

Lo usaremos para:
* Cambiar el contenido de la página
* Cambiar los atributos de un elemento
* Cambiar la apariencia de algo
* Validar datos de formularios
* ...

Sin embargo, por razones de seguridad, Javascript no nos permite hacer cosas como:
* Acceder al sistema de ficheros del cliente
* Capturar datos de un servidor (puede pedirlo y el servidor se los servirá, o no)
* Modificar las preferencias del navegador
* Enviar e-mails de forma invisible o crear ventanas sin que el usuario lo vea
* ...

### Un poco de historia
Javascript es una implementación del lenguaje **ECMAScript** (el estándar que define sus características). El lenguaje surgió en 1997 y todos los navegadores a partir de 2012 soportan al menos la versión **ES5.1** completamente. En 2015 se lanzó la 6ª versión, inicialmente llamada **ES6** y posteriormente renombrada como **ES2015**, que introdujo importantes mejoras en el lenguaje y que es la versión mínima que usaremos nosotros. Desde entonces van saliendo nuevas versiones cada año que introducen cambios pequeños. La última es la **ES2024**.

Las principales mejoras que introdujo ES2015 son: clases de objetos, let, for..of, Map, Set, Arrow functions, Promesas, spread, destructuring, ...

### Soporte en los navegadores
Los navegadores no se adaptan inmediatamente a las nuevas versiones de Javascript por lo que puede ser un problema usar una versión muy moderna ya que puede haber partes de los programas que no funcionen en los navegadores de muchos usuarios. En la página de [_Kangax_](https://kangax.github.io/compat-table/es6/) podemos ver la compatibilidad de los diferentes navegadores con las distintas versiones de Javascript. También podemos usar [_CanIUse_](https://caniuse.com/) para buscar la compatibilidad de un elemento concreto de Javascript así como de HTML5 o CSS3. 

Si queremos asegurar la máxima compatibilidad debemos usar la versión ES5 (pero nos perdemos muchas mejoras del lenguaje) o mejor, usar la ES6 (o posterior) y después _transpilar_ nuestro código a la version ES5. De esto se ocupan los _transpiladores_ (**Babel** es el más conocido) por lo que no suponen un esfuerzo extra para el programador.

## Herramientas
### La consola del navegador
Es la herramienta que más nos va a ayudar a la hora de depurar nuestro código. Abrimos las herramientas para el desarrollador (en Chrome y Firefox pulsando la tecla _F12_) y vamos a la pestaña _Consola_:

![Consola](./img/Consola.png)

Allí vemos mensajes del navegador como errores y advertencias que genera el código y todos los mensajes que pongamos en el código para ayudarnos a depurarlo (usando los comandos **console.log** y **console.error**).

Además en ella podemos escribir instrucciones Javascript que se ejecutarán mostrando su resultado. También la usaremos para mostrar el valor de nuestras variables y para probar código que, una vez que funcione correctamente, lo copiaremos a nuestro programa.

Podemos obtener ayuda sobre el funcionamiento de la consola en la web de [Mozilla](https://firefox-source-docs.mozilla.org/devtools-user/web_console/index.html).

> EJERCICIO: abre la consola y prueba las funciones _alert_, _confirm_ y _prompt_.

Siempre depuraremos los programas desde aquí (ponemos puntos de interrupción, vemos el valor de las variables, ...).

![Consola - depurar](./img/Consola-depurar.png)

Es fundamental dedicar tiempo a saber utilizar la consola porque nos facilitará enormemente la tarea de depurar nuestro código. Podéis encontrar infinidad de páginas en internet donde nos explican en profundidad el uso de la consola, como [Debugging en el navegador](https://es.javascript.info/debugging-chrome).

### Editores
Podemos usar el que más nos guste, desde editores tan simples como NotePad++ hasta complejos IDEs. La mayoría soportan las últimas versiones de la sintaxis de Javascript (Netbeans, Eclipse, Visual Studio, Sublime, Atom, Kate, Notepad++, ...). Yo voy a utilizar [**Visual Studio Code**](https://code.visualstudio.com/) o [**Sublime text**](https://www.sublimetext.com/) por su sencillez y por los plugins que incorpora para hacer más cómodo mi trabajo. En _Visual Studio Code_ instalaré algún _plugin_ como:
- SonarLint: es más que un _linter_ y me informa de todo tipo de errores pero también del código que no cumple las recomendaciones (incluye gran número de reglas). Marca el código mientras lo escribimos y además podemos ver todas las advertencias en el panel de Problemas (Ctrl+
- Vetur: lo instalaremos en el segundo bloque. Necesario para trabajar con los ficheros de _Vue_

### Editores on-line
Son muy útiles porque permiten ver el código y el resultado a la vez. Normalmente tienen varias pestañas o secciones de la página donde poner el código HTML, CSS yJavascript y ver su resultado. 

Algunos de los más conocidos son [Codesandbox](https://codesandbox.io/), [Fiddle](https://jsfiddle.net), [Plunker](https://plnkr.co), [CodePen](https://codepen.io/pen/), ...aunque hay muchos más.

> Ejemplo de 'Hello World' en Fiddle:

<script async src="//jsfiddle.net/afabbro/vrVAP/embed/"></script>

> Ejemplo de 'Hello World' en CodePen:

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="js,result" data-user="kscatcensus" data-slug-hash="XedLvZ" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Hello World Codepen">
  <span>See the Pen <a href="https://codepen.io/kscatcensus/pen/XedLvZ/">
  Hello World Codepen</a> by Kevin Schweickhardt (<a href="https://codepen.io/kscatcensus">@kscatcensus</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Incluir javascript en una página web
El código Javascript va entre etiquetas _\<script>_. Puede ponerse en el _\<head>_ o en el _\<body>_. Funciona como cualquier otra etiqueta y el navegador la interpreta cuando llega a ella (va leyendo y ejecutando el fichero línea a línea). Podéis ver en [este vídeo](https://www.youtube.com/watch?v=AQn22gjtSWQ&list=PLI7nHlOIIPOJtTDs1HVJABswW-xJcA7_o&index=2) un ejemplo muy simple de cómo se ejecuta el código en el HEAD y en el BODY.

Lo mejor en cuanto a rendimiento es ponerla al final del _\<body>_ para que no se detenga el renderizado de la página mientras se descarga y se ejecuta el código. También podemos ponerlo en el \<head> pero usando los atributos **async** y/o **defer** (en Internet encontraréis mucha información sobre esta cuestión, por ejemplo [aquí](https://somostechies.com/async-vs-defer/)).

Como se ve en el primer vídeo, es posible poner el código directamente entre la etiqueta _\<script>_  y su etiqueta de finalización pero lo correcto es que esté en un fichero externo (con extensión **.js**) que cargamos mediante el atributo _src_ de la etiqueta. Así conseguimos que la página HTML cargue más rápido (si lo ponemos al final del BODY o usamos _async_) y además no mezclar HTML y JS en el mismo fichero, lo mejora la legibilidad del código y facilita su mantenimento:
```html
<script src="./scripts/main.js"></script>
```

## Mostrar información
Javascript permite mostrar al usuario ventanas modales para pedirle o mostrarle información. Las funciones que lo hacen son:
* `window.alert(mensaje)`: Muesta en una ventana modal _mensaje_ con un botón de _Aceptar_ para cerra la ventana.
* `window.confirm(mensaje)`: Muesta en una ventana modal _mensaje_ con botones de _Aceptar_ y _Cancelar_. La función devuelve **true** o **false** en función del botón pulsado por el usuario.
* `window.prompt(mensaje [, valor predeterminado])`: Muesta en una ventana modal _mensaje_ y debajo tiene un campo donde el usuario puede escribir, junto con botones de _Aceptar_ y _Cancelar_. La función devuelve el valor introducido por el usuario como texto (es decir que si introduce 54 lo que se obtiene es "54") o **false** si el usuario pulsa _Cancelar_.

También se pueden escribir las funciones sin _window._ (es decir `alert('Hola')` en vez de `window.alert('Hola')`) ya que en Javascript todos los métodos y propiedades de los que no se indica de qué objeto son se ejecutan en el objeto _window_.

Si queremos mostrar una información para depurar nuestro código no utilizaremos _alert(mensaje)_ sino `console.log(mensaje)` o `console.error(mensaje)`. Estas funciones muestran la información pero en la consola del navegador. La diferencia es que _console.error_ la muestra como si fuera un error de Javascript.

# Bibliografía
* Curso "Programación con JavaScript". CEFIRE Xest. Arturo Bernal Mayordomo
* [Curso de JavaScript y TypeScript](https://www.youtube.com/playlist?list=PLiZCpIzKtvqvt4tcQV4SAvaJn7QMdwUbd) de Arturo Bernal en Youtube
* [MDN Web Docs](https://developer.mozilla.org/es/docs/Web/JavaScript). Moz://a. https://developer.mozilla.org/es/docs/Web/JavaScript
* [Introducción a JavaScript](http://librosweb.es/libro/javascript/). Librosweb. http://librosweb.es/libro/javascript/
* [Curso de Javascript (Desarrollo web en entorno cliente)](https://www.youtube.com/playlist?list=PLI7nHlOIIPOJtTDs1HVJABswW-xJcA7_o). Ada Lovecode - Didacticode (90 vídeos) de Laura Folgado
* [Apuntes Desarrollo Web en Entorno Cliente (DWEC)](https://github.com/sergarb1/ApuntesDWEC). Sergi García Barea
