# BLOQUE 1 - El lenguaje Javascript
En este primer bloque vamos a conocer el lenguaje Javascript. El bloque se divide en:
* [Introducción a Javascript](#introducci%C3%B3n-a-javascript)
* [1-Sintaxis](./01-sintaxis.md): Variables. Funciones. Estructuras y bucles. Tipos de datos. Buenas prácticas
* [2-Arrays](./02-arrays.md): Métodos. _Functional Programming_. Referencia vs copia. Rest y Spread. Desestructuración de arrays. Map. Set
* [3-Programación orientada a objetos](./03-POO.md): Introducción. Clases. POO en JS5
* [4-Document Object Model - DOM](./04-DOM.md): Acceso a nodos. Acceso desde otros nodos. Manipular el árbol DOM. Atributos de los nodos
  * [4.1-MVC](./04.1-MVC.md): Cómo usaremos el patrón MVC para crear la UI de nuestra aplicación
* [5-Browser Object Model - BOM](./05-BOM.md): Timers. Objetos del BOM (window, location, history, otros objetos)
* [6-Eventos](./06-eventos.md): Escuchadores. Tipos de eventos. Los objetos _this_ y _event_. Propagación de eventos (_bubbling_)
* [7-Objetos y funciones globales... ](./07-globales.md): Funciones globales. Objetos del lenguaje (Math, Date, ...). Expresiones regulares. Validación de formularios
* [8-Ajax. Promesas. SPA](./08-ajax.md)
* [9-APIs HTML5](./09-apis.md): Drag and drop. API Storage. Geolocalización. API de Google Maps
* [10-Más cosas a aprender...](./10-mas.md): WebComponents. WebSockets. WebWorkers. Typescript.
* Herramientas: npm y webpack

# Introducción a Javascript
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
Tabla de contenidos

  - [Introducción](#introducci%C3%B3n)
  - [Herramientas](#herramientas)
    - [La consola del navegador](#la-consola-del-navegador)
    - [Editores](#editores)
    - [Editores on-line](#editores-on-line)
  - [Incluir javascript en una página web](#incluir-javascript-en-una-p%C3%A1gina-web)
  - [Mostrar información](#mostrar-informaci%C3%B3n)
- [Bibliografía](#bibliograf%C3%ADa)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introducción
En el _front-end_ intervienen 3 elementos básicos:
- HTML: es lo que estructura la web y proporciona la información de la web, pero es una información estática
- CSS: es lo que da forma a dicha información, permite mejorar su apariencia, permite que se adapte a distintos dispositivos, ...
- Javascript: es el que da vida a un sitio web y le permite reaccionar a las acciones del usuario

Por tanto nuestras aplicaciones tendrán estos 3 elementos y lo recomendable es que estén separados en distintos ficheros:
- El HTML lo tendremos habitualmente en un fichero index.html, normalmente en una carpeta llamada _public_
- El CSS lo tendremos en uno o más ficheros con extensión _.css_ dentro de una carpeta llamada _styles_
- EL JS estará en ficheros con extensión _.js_ en un directorio llamado _scripts_

Javascript es un lenguaje interpretado, no compilado y nosotros vamos a ejecutarlo en un navegador web (lo más habitual). Lo usaremos para:
* Cambiar el contenido de la página
* Cambiar los atributos de un elemento
* Cambiar la apariencia de algo
* Validar datos
* ...

Javascript es una implementación del lenguaje **ECMAScript** (el estándar que define sus características). El lenguaje surgió en 1997 y todos los navegadores a partir de 2012 soportan al menos la versión **ES5.1** completamente. En 2015 se lanzó la 6ª versión, inicialmente llamada **ES6** y que ahora se llama **ES2015**, que introdujo importantes mejoras en el lenguaje y que es la versión que usaremos nosotros. Desde entonces van saliendo nuevas versiones cada año que introducen cambios pequeños. La última es la **ES2018** aprobada en Junio.

Los navegadores no se adaptan inmediatamente a las nuevas versiones de Javascript por lo que puede ser un problema usar una versión muy moderna ya que puede haber partes de los programas que no funcionen en los navegadores de muchos usuarios. En la página de [_Kangax_](https://kangax.github.io/compat-table/es6/) podemos ver la compatibilidad de los diferentes navegadores con las distintas versiones de Javascript.

Si queremos asegurar la máxima compatibilidad debemos usar la versión ES5 (pero nos perdemos muchas mejoras del lenguaje) o mejor, usar la ES6 (o posterior) y después _transpilar_ nestro código a la version ES5. De esto se ocupan los _transpiladores_ (**Babel** es el más conocido) por lo que no suponen un esfuerzo extra para el programador.

## Herramientas
### La consola del navegador
Es la herramienta que más nos va a ayudar a la hora de depurar nuestro código. Abrimos las herramientas para el desarrollador (normalmente con la tecla _F12_) y vamos a la pestaña _Consola_:

Allí podemos escribir instrucciones Javascript que se ejecutarán y veremos su resultado inmediatamente. También la usaremos para inspeccionar el valor de nuestras variables y para probar código que, una vez que funcione correctamente, lo copiaremos a nuestro programa.

Además en ella vemos los errores y advertencias que genera nuestro código y todos los mensajes que pongamos en el código para ayudarnos a depurarlo (cusando los comandos **console.log** y **console.error**).

Siempre depuraremos los programas desde aquí (ponemos puntos de interrupción, vemos el valor de las variables, ...).

### Editores
Podemos usar el que más nos guste, desde editores tan simples como NotePad++ hasta complejos IDEs. La mayoría soportan las últimas versiones de la sintaxis de Javascript (Netbeans, Eclipse, Visual Studio, Sublime, Atom, Kate, Notepad++, ...). Yo voy a utilizar [[**Visual Studio Code**]](https://code.visualstudio.com/) o [**Sublime text**](https://www.sublimetext.com/) por su sencillez y por los plugins que incorpora para hacer más cómodo mi trabajo.

### Editores on-line
Son muy útiles porque permiten ver el código y el resultado a la vez. Normalmente tienen varias pestañas o secciones de la página donde poner el código HTML, CSS yJavascript y ver su resultado. 

Algunos de los más conocidos son [Fiddle](https://jsfiddle.net), [Plunker](https://plnkr.co), [CodePen](https://codepen.io/pen/), ...aunque hay muchos más.

| Ejemplo de 'Hello World' en Fiddle:
<script async src="//jsfiddle.net/afabbro/vrVAP/embed/"></script>

| Ejemplo de 'Hello World' en CodePen:
<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="js,result" data-user="kscatcensus" data-slug-hash="XedLvZ" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Hello World Codepen">
  <span>See the Pen <a href="https://codepen.io/kscatcensus/pen/XedLvZ/">
  Hello World Codepen</a> by Kevin Schweickhardt (<a href="https://codepen.io/kscatcensus">@kscatcensus</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Incluir javascript en una página web
El código Javascript va entre etiquetas _\<script>_. Puede ponerse en el _\<head>_ (el código no se ejecuta hasta que es llamado) o en el _\<body>_ en cuyo caso se ejecuta la etiqueta en el momento que la renderiza el navegador. Lo mejor en cuanto a rendimiento es ponerla al final del _\<body>_, justo antes de la etiqueta _\</html>_ para que no se detenga el renderizado de la página mientras se ejecuta el código.

Podemos poner el código directamente entre la etiqueta _\<script>_ pero lo correcto es que esté en un fichero externo (con extensión **.js**) que cargamos mediante el atributo _src_ de la etiqueta:
```html
<script src="./scripts/main.js"></script>
```
Así mejoramos la legibilidad del código y facilitamos su mantenimento.

## Mostrar información
Javascript permite mostrar al usuario ventanas modales para pedirle o mostrarle información. Las funciones que lo hacen son:
* `windows.alert(mensaje)`: Muesta en una ventana modal _mensaje_ con un botón de _Aceptar_ para cerra la ventana.
* `windows.confirm(mensaje)`: Muesta en una ventana modal _mensaje_ con botones de _Aceptar_ y _Cancelar_. La función devuelve **true** o **false** en función del botón pulsado por el usuario.
* `windows.prompt(mensaje [, valor predeterminado])`: Muesta en una ventana modal _mensaje_ y debajo tiene un campo donde el usuario puede escribir, junto con botones de _Aceptar_ y _Cancelar_. La función devuelve el valor introducido por el usuario como texto (es decir que si introduce 54 lo que se obtiene es "54") o **false** si el usuario pulsa _Cancelar_.

También se pueden escribir las funciones sin _window._ (es decir `alert('Hola')` en vez de `window.alert('Hola')`) ya que en Javascript todos los métodos y propiedades que no se indica de qué objeto son se supone que son del objeto _window_.

Si queremos mostrar una información para depurar nuestro código no utilizaremos _alert(mensaje)_ sino `console.log(mensaje)` o `console.error(mensaje)`. Estas funciones muestran la información pero en la consola del navegador. La diferencia es que _console.error_ la muestra como si fuera un error de Javascript.

# Bibliografía
* Curso 'Programación con JavaScript'. CEFIRE Xest. Arturo Bernal Mayordomo
* [MDN Web Docs](https://developer.mozilla.org/es/docs/Web/JavaScript). Moz://a. https://developer.mozilla.org/es/docs/Web/JavaScript
* [Introducción a JavaScript](http://librosweb.es/libro/javascript/). Librosweb. http://librosweb.es/libro/javascript/
*
