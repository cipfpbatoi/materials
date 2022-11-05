# Más cosas a aprender en Javascript
- [Más cosas a aprender en Javascript](#más-cosas-a-aprender-en-javascript)
  - [Introducción](#introducción)
  - [WebComponents](#webcomponents)
  - [WebSockets](#websockets)
  - [WebWorkers](#webworkers)
  - [Typescript](#typescript)
  - [jQuery](#jquery)

## Introducción
Hace unos años Javscript era considerado un lenguaje de programación de segunda categoría, que se usaba para hacer molestas páginas web. Hoy en día el navegador es la aplicación más importante de un equipo y con él, además de navegar, se ejecutan todo tipo de aplicaciones. Además HTML5 y JavaScript han pasado de estar solo en nuestro navegador a ser un pilar básico de las plataformas móviles, de aplicaciones de escritorio e incluso JavaScript lo encontramos en servidores (con _Node.js_) o como lenguaje estándar de algunos entornos de escritorio (como _GNOME_ para Linux).

Por ello HTML5 y Javascript siguen su contínuo crecimiento... y su contínua evolución que les permite hacer cada vez más cosas. En esta página vamos a hablar muy brevemente de algunas de las características que están incorporando.

## WebComponents
Son distintas tecnologías que podemos usar (todas o alguna de ellas) para crear componentes reutilizables para nuestras páginas HTML. Las tecnologías que hay tras los Web Components son:
* [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements): permite crear elementos HTML personalizados, es decir, nuevas etiquetas definidas por nosotros con funcionalidad propia. Por ejemplo

```html
<comp-calendar
    mode="month"
    date="2020-02-23"
    on-select="dateSelected()" >
</comp-calendar>
```

* [HTML Templates](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template): la etiqueta `<template>` permite definir fragmentos de código HTML que no serán renderizados y que usaremos más adelante. Pueden incluir **slots** o huecos a los que se pasa un contenido
* [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM): permite asociar un DOM oculto a un elemento. Esto permite que tenga su propio código JS y estilos CSS aislados del resto del DOM
* [ES Modules](https://html.spec.whatwg.org/multipage/webappapis.html#integration-with-the-javascript-module-system): Es el estándar de ECMAScript para importar módulos Javascript.

Un WebComponent es un elemento que creamos y que tiene su propia representación (HTML) y funcionalidad (establecida con Javascript). Este elemento es reusable y compartible y se contruye sin librerías externas, sólo con HTML5, ES6 y CSS3.

Algunos ejemplos de componentes útiles que podríamos usar son:
* componente para loguearnos mediante Google, Facebook, etc
* componente que me muestre el tiempo en una ciudad
* componente para hacer un modal
* ...

Hay infinidad de páginas donde podemos aprender más sobre WebComponents y cómo crear nuestro propio componente, como:
* [Web Components | MDN](https://developer.mozilla.org/es/docs/Web/Web_Components)
* [Introduction - webcomponents.org](https://www.webcomponents.org/introduction)
* [¿Qué son los WebComponents? - Javascript en español](https://lenguajejs.com/webcomponents/introduccion/que-son-webcomponents/)
* [Carlos Azaustre - Cómo crear un WebComponent de forma nativa](https://www.youtube.com/watch?v=8bcfgXePHnk&feature=em-subs_digest)
* ...

En resumen debemos crear un fichero donde definimos la clase de nuestro componente que debe heredar de `HTMLElement`. Es conveniente que su nombre (y por tanto el de la etiqueta que usaremos para mostrarlo) tenga al menos 2 palabras para evitar que pueda entrar en conflicto con posibles futuras etiquetas de HTML (por ejemplo podría ser \<social-login> o \<my-weather>). En esta clase definiremos el HTML y el estilo que tendrá nuestro componente, así como su comportamiento.

Actualmente no todos los navegadores ofrecen soporte para WebComponents. Esto junto al hecho de que frameworks como Vue, Angular o React ofrecen soluciones con sus propios componentes han hecho que el uso de los WebComponents no acabe de despegar. A pesar de ello hay lugares como [WebComponents.org](https://www.webcomponents.org/) donde podemos encontrar un catálogo de componentes hechos y que podemos usar en nuestras páginas.

Por su parte Google ha desarrollado la librería Polymer para ayudarnos a crear nuestros propios componentes basados en WebComponents y los principales frameworks JS como Angular o Vue permiten crear sus propios componentes de forma muy sencilla, com veremos en el bloque de Vue.

## WebSockets
WebSockets es una tecnología basada en el protocolo **ws** que permite establecer una conexión continua _full-duplex_ entre un cliente (puede ser un navegador) y un servidor. La conexión siempre la abre el cliente pero una vez abierta no se cierra por lo que el servidor puede comunicar en cualquier momento con el cliente y enviarle información.

Ejemplo:
```javascript
let exampleSocket=new WebSocket(uri);
exampleWebsocjet.onopen=function(event) {
    console.log('Se ha establecido la conexión');
}
exampleSocket.onclose=function(event) {
    console.log('Se ha cerrado la conexión');
}
exampleSocket.onerror=function(event) {
    console.log('Se ha producido un error en la conexión');
}
exampleSocket.onmessage=function(event) {
    console.log('Se ha recibido el mensaje:' + event.data);
}
```

El _uri_ de la conexión deberá usar el protocolo **ws** (o wss), no http (ej. "ws://miservidor.com/socketserver"). El evento _open_ se produce cuando la propiedad _readyState_ cambia a OPEN y el _close_ cuando cambia su valor a CLOSED. Cada vez que se reciba algo del servidor se produce el evento _message_ y en la propiedad **data** del mismo tendremos lo que se nos ha enviado.

Para enviar algo al servidor usamos el mátodo **.send**. Lo que le enviamos ex texto en formato utf-8 (o un objeto convertido a JSON):
```javascript
exampleSocket.send('Your message');
exampleSocket.send(JSON.stringify(msg));
```

También podemos enviar (y recibir) imágenes (convertidas a ArrayBuffer) o ficheros como un objeto Blob.

Para cerrar la conexión llamamos al método **.close()**:
```javascript
exampleSocket.close();
console.log('Conexión cerrada');
```

Para programar la parte del servidor podemos usar librerías que nos ayudan como [PHP-WebSockets](https://github.com/ghedipunk/PHP-WebSockets), SocketIO, ...

Las aplicaciones de esta tecnología son muchas:
* Juegos multjugador
* Aplicaciones de chat
* Actualización en tiempo real de cotizaciones de bolsa, recursos en uso o cualquier otra información
* ...

Podemos practicar con [www.websocket.org](https://www.websocket.org/echo.html) que tiene un servidor websocket que devuelve lo que le enviamos. En esta web también tenemos ejemplos de aplicaciones.

Saber más:
* [MDN: Escribiendo aplicaciones con WebSockets](https://developer.mozilla.org/es/docs/WebSockets-840092-dup/Writing_WebSocket_client_applications)
* [WebSocket - El Tutorial de JavaScript Moderno](https://es.javascript.info/websocket)
* [Carlos Azaustre: Crear chat con WebSockets](https://www.youtube.com/watch?v=ppiAvvkvAz0)

## WebWorkers
Permite ejecutar scripts en hilos separados que se ejecutan en segundo plano y se comunican con la tarea que los crea mediante el envío de mensajes.

Cuando se está ejecutando un script la página no responde hasta que finaliza su ejecución. Si el script lo ejecuta un web worker la página será funcional (podemos interactuar con ella) ya que le ejecución del script se realiza en segundo plano en otro hilo.

Por ejemplo, crearemos un fichero **worker_count.js** con el código:
```javascript
var i = 0;

function timedCount() {
  i = i + 1;
  postMessage(i);
  setTimeout("timedCount()",500);
}

timedCount();
```

La función _postMessage_ envía un mensaje a la tarea que lo creó.

Para llamarlo en nuestra página y que se ejecute como un WebWorker haremos:
```javascript
var worker;

function startWorker() {
    worker = new Worker("worker_count.js");
    }
    worker.onmessage = function(event) {
      console.log = ('Recibido del worker: '+event.data);
    };
}

function stopWorker() { 
  worker.terminate();
}
```

Al llamar a _startWorker_ se crea el worker y cada vez que éste envíe algo se ostrará en la consola (lo que envía se recibe en _event-data_). Para finalizar un worker llamamos a su método _terminate()_.

Saber más:
* [MDN - Usando WebWorkers](https://developer.mozilla.org/es/docs/Web/Guide/Performance/Usando_web_workers)
* [w3schools - HTML5 Web Workers](https://www.w3schools.com/html/html5_webworkers.asp)

## Typescript
TypeScript es un lenguaje de programación libre y de código abierto desarrollado y mantenido por Microsoft. Es un superconjunto de JavaScript, que esencialmente añade tipado estático y objetos basados en clases. TypeScript extiende la sintaxis de JavaScript, por tanto cualquier código JavaScript existente debería funcionar sin problemas.

Puede que la principal diferencia entre ambos es que Typescript obliga al tipado de las variables (y por supuesto no permite cambios de tipo) lo que evita muchos errores a la hora de programar.

Algunos frameworks y librerías, como Angular, utilizan TS en lugar de JS como lenguaje, que luego es transpilado a JS a la hora de generar la aplicación para producción.

Quizá el inconveniente es que es algo más difícil que JS pero como está basado en él y la sintaxis es prácticamente igual el esfuerzo de aprender TS para un programador JS es muy pequeño.

Saber más:
* [Wikipedia - Typescript](https://en.wikipedia.org/wiki/TypeScript)
* [Typescriptlang](https://www.typescriptlang.org/)

## jQuery
Se trata de una biblioteca que nos facilita enormemente el trabajo con el DOM ya que tiene "atajos" para muchas instrucciones, por ejemplo para poner 'Hola mundo' como contenido de un elemento cuya _id_ es `mensaje`:
```javascript
// Código con Javascript sólo
document.getElementById('mensaje').textContent = 'Hola mundo'

// Código con jQuery
$('#mensaje').text('Hola mundo')
```

Otra ventaja de jQuery es que permite trabajar con conjuntos de elementos sin tener que hacer un `forEach` (lo hace internamente). Por ejemplo para poner un escuchador que muestre un alert 'Párrafo pinchado' al hacer click sobre cualquier párrafo de la clase 'importante' tendríamos que hacer:
```javascript
// Código con Javascript sólo
Array.from(document.querySelectorAll('p.importante'))
.forEach(parrafo => parrafo.addEventListener('click', () => alert('Párrafo pinchado'))

// Código con jQuery
$('p.importante').click(() => alert('Párrafo pinchado'))
```

Como vemos, básicamente nos permite hacer lo mismo pero escribiendo mucho menos código. También incluye funciones para cosas que en Javascript requieren varias líneas de código como animaciones o Ajax. Por ejemplo una pertición para mostrar en una tabla con id _posts_ todos los posts del servidor _jsonplaceholder_ tendremos que hacer:
```javascript
// Código con Javascript sólo
const SERVER = 'https://jsonplaceholder.typicode.com';

function getPosts() {   // Función que pide los datos al servidor
  return new Promise(function(resolve, reject) {
    let peticion = new XMLHttpRequest();
    peticion.open('GET', SERVER + '/posts');
    peticion.send();
    peticion.addEventListener('load', function() {
      if (peticion.status === 200) {
        resolve(JSON.parse(peticion.responseText));
      } else {
        reject("Error " + this.status + " (" + this.statusText + ") en la petición");
      }
    })
    peticion.addEventListener('error', () => reject('Error en la petición HTTP'));
  })
}

function renderPosts() {   // Función que los muestra en la página
  getPosts(idUser)
    .then((posts) => {
      document.querySelector('#posts tbody').innerHTML = ''; // borramos su contenido
      posts.forEach((post) => {
        const newPost = document.createElement('tr');
        newPost.innerHTML = `
          <td>${post.userId}</td>
          <td>${post.id}</td>
          <td>${post.title}</td>
          <td>${post.body}</td>`;
        document.querySelector('#posts tbody').appendChild(newPost);
      })
    })
    .catch((error) => console.error(error))
}
```

Usando jQuery es mucho más sencillo. En primer lugar no hay que hacer la función que hace la petición al servidor porque hay uns función que hace eso: `$.ajax` y sus derivadas `$.get`, `$.post`, ... Además la parte de pintar los datos es también mucho más corta:
```javascript
// Código con jquery
const SERVER = 'https://jsonplaceholder.typicode.com';

function renderPosts() {   // Función que los muestra en la página
  $.get(SERVER + '/posts')
    .done((posts) => {
      $('#posts tbody').text('');    // borramos el contenido de la tabla
      posts.forEach(post => $('#posts tbody').append(
        `<tr>
          <td>${post.userId}</td>
          <td>${post.id}</td>
          <td>${post.title}</td>
          <td>${post.body}</td>
        </tr>`
      ))
    })
    .fail((error) => console.error(error))
}
```

Encontraréis infinidad de tutoriales por Internet donde aprender _jQuery_, por ejemplo unos vídeos de [Didacticode](https://didacticode.com/) que podéis encontrar en [https://didacticode.com/curso/curso-de-jquery/](https://didacticode.com/curso/curso-de-jquery/) (tenéis que registraros para tener acceso a muchos cursos de Javascript y "derivados" pero vale la pena) o directamente en su [canal de Youtube](https://www.youtube.com/channel/UCPbFiM-HA4lwJH12JXdXxDA).
