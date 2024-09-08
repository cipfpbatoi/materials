# Arquitecturas y Tecnologías de programación en clientes web
- [Arquitecturas y Tecnologías de programación en clientes web](#arquitecturas-y-tecnologías-de-programación-en-clientes-web)
  - [Introducción](#introducción)
  - [Componentes de la WWW](#componentes-de-la-www)
    - [Protocolo HTTP](#protocolo-http)
    - [URL](#url)
  - [Arquitectura cliente-servidor en la web](#arquitectura-cliente-servidor-en-la-web)
    - [Server-side](#server-side)
    - [Client-side](#client-side)
  - [Javascript](#javascript)
    - [Limitaciones de JavaScript](#limitaciones-de-javascript)
    - [Frameworks y librerías de JavaScript](#frameworks-y-librerías-de-javascript)
  - [Evolución de las aplicaciones web](#evolución-de-las-aplicaciones-web)

## Introducción
La _World Wide Web_ (WWW) es un sistema de distribución de documentos de hipertexto o hipermedia interconectados y accesibles a través de Internet. Con un navegador web, un usuario visualiza sitios web compuestos de páginas web que pueden contener texto, imágenes, vídeos u otros contenidos multimedia, y navega a través de esas páginas usando hiperenlaces. Fue inventada por Tim Berners-Lee en 1989 mientras trabajaba en el CERN.

El _World Wide Web Consortium_ (W3C) es la organización que se encarga de desarrollar estándares para la web. El W3C se dedica a desarrollar tecnologías web, como HTML, CSS y JavaScript, para garantizar la interoperabilidad y la evolución de la web.

## Componentes de la WWW
La WWW se basa para su funcionamiento en:
- **hipertexto**: texto que contiene enlaces a otros textos. Se trata del lenguaje de marcado que se utiliza para crear documentos en la web
- **HTTP** (_HyperText Transfer Protocol_): protocolo de transferencia de hipertexto, que permite la transferencia de datos (texto, gráficos, sonido, vídeo y otros archivos) a través de la web
- **Servidores web**: servidores que alojan los sitios web y que responden a las peticiones de los clientes (navegadores web) proporcionándoles los recursos web solicitados
- **DNS** (_Domain Name System_): sistema de nombres de dominio, que permite a los clientes localizar los servidores traduciendo los nombres de dominio a direcciones IP
- **Recursos web**: documentos, imágenes, vídeos, etc. que se encuentran en servidores web y que se pueden acceder a través de la web
- **Navegadores web**: aplicaciones que permiten a los clientes web visualizar y navegar por los sitios web. Cada recurso está identificado por una **URL** (_Uniform Resource Locator_)

### Protocolo HTTP
El protocolo HTTP es un protocolo de comunicación que se utiliza para la transferencia de información en la web. Se basa en el modelo cliente-servidor, en el que un cliente (navegador web) envía una petición a un servidor web y este responde con la información solicitada. En cada pertición se envía al servidor:
- **URL**: dirección del recurso solicitado
- **Método**: GET, POST, PUT, DELETE, etc.
- **Cabeceras**: información adicional sobre la petición. Son pares clave:valor
- **Cuerpo**: datos adicionales que se envían con la petición (por ejemplo, en una petición POST). No todas las peticiones lo tienen

La respuesta del servidor incluye:
- **Código de estado**: indica si la petición fue exitosa o no. Algunos códigos comunes son 200 Ok, 403 Forbidden, 404 Not found, 500 Server error, etc
- **Cabeceras**: información adicional sobre la respuesta
- **Cuerpo**: datos que se envían como respuesta a la petición. Puede ser HTML, JSON, XML, etc.

El protocolo HTTP es un protocolo sin estado, lo que significa que cada petición es independiente de las anteriores. Para poder mantener el estado de una sesión se utilizan cookies o tokens de autenticación.

### URL
Una URL (_Uniform Resource Locator_) es una cadena de caracteres que se utiliza para identificar un recurso en la web. Ejemplos de URL podrían ser `http://cipfpbatoi.github.io/materials/daw/dwc/entorno.html#tests` o `https://www.google.com/search?q=dwec&client=firefox-b-lm`. Una URL tiene la siguiente estructura:
- **Protocolo**: http, https, ftp, etc. Se separa del nombre de dominio por `://`. En el primer ejemplo sería `http://` y en el segundo `https://`
- **Nombre de dominio**: dirección IP o nombre de dominio del servidor que aloja el recurso (`cipfpbatoi.github.io` o `www.google.com` en los ejemplos anteriores)
- **Puerto**: número de puerto en el que escucha el servidor, antecedido por `:` (por defecto 80 para HTTP y 443 para HTTPS). En los ejemplos no se incluye puerto por lo que se usa el puerto por defecto `http://cipfpbatoi.github.io/materials/daw/dwc/entorno.html#tests` es equivalente a `http://cipfpbatoi.github.io:80/materials/daw/dwc/entorno.html#tests` y el de google a `https://www.google.com:443/search?q=dwec&client=firefox-b-lm`
- **Ruta**: ruta del recurso en el servidor (`/materials/daw/dwc/entorno.html` en el primer ejemplo y `/search` en el segundo)
- **Fragmento**: identificador de una parte específica del recurso, comienza por `#` (`#tests` en el primer ejemplo, en el segundo no hay fragmento)
- **Query string**: parámetros adicionales que se envían al servidor. Son pares clave=valor y comienza por `?`. Si hay varios pares se separan por `&` (`?q=dwec&client=firefox-b-lm` en el segundo ejemplo, en el primer ejemplo no hay query string)

## Arquitectura cliente-servidor en la web
Es la arquitectura de red en la que un cliente (navegador web) solicita recursos a un servidor web y este responde con la información solicitada. El cliente y el servidor se comunican a través del protocolo HTTP. El cliente envía una petición al servidor y este responde con la información solicitada. La arquitectura cliente-servidor se basa en el modelo de comunicación petición-respuesta.

En el lado servidor (_server side_) se ejecutan las aplicaciones que generan las páginas web dinámicas. En el lado cliente (_client side_) se ejecutan aplicaciones que se ejecutan en el navegador web y que interactúan con el usuario. 

Muchas aplicaciones web modernas son aplicaciones de una sola página (_Single Page Applications_ o SPAs) que se ejecutan en el lado cliente y que se comunican con el servidor a través de una API (_Application Programming Interface_). En estas aplicacopnes el usuario está siempre en la misma página lo que minimiza la información intercambiada en el servidor y reduce el impass del cambio de página. Para obtener los datos del servidor se utiliza la tecnología AJAX (_Asynchronous JavaScript and XML_) que permite a javascript enviar y recibir datos del servidor asíncronamente sin tener que recargar la página.

### Server-side
La lógica de la aplicación se ejecuta en el servidor. El servidor genera las páginas web dinámicas y las envía al cliente. El cliente recibe la página y no tiene que hacer nada más que mostrarla. 
Los elementos que encontramos en el lado cliente son el hardware (servidores y elementos de red), el software (servicios web como Apache, Nginx, etc) y lenguajes del lado servidor (PHP, Perl, C, Python, Javascript con NodeJS, etc).

Tareas comunes en el lado servidor:
- **Acceder y guardar los datos**: se realiza en el servidor, normalmente en una **base de datos**
- **Enviar correos electrónicos**: se realiza en el servidor
- **Procesar archivos**: se realiza en el servidor
- **Generar páginas web dinámicas**: se generan en el servidor y se envían al cliente, aunque podría hacerse en el cliente
- **Validación de formularios**: validar los datos de un formulario debe hacerse siempre en el lado servidor, aunque se haga también en el cliete
- **Autenticación y autorización**: como el anterior se realiza en el servidor, aunque se puede hacer parte en el cliente
- **Procesar datos y realizar cálculos**: puede hacerse tanto en el servidor como en el cliente

### Client-side
La lógica de la aplicación se ejecuta en el navegador web del cliente. El servidor envía al cliente los recursos necesarios para ejecutar la aplicación y el cliente se encarga de mostrar la interfaz de usuario y de interactuar con el usuario. Ejemplos de tecnologías client-side son HTML, CSS y JavaScript.

Los elementos que encontramos en el lado cliente son el navegador web (Firefox, Chrome, Safari, Edge, Opera, ...), lenguajes de marcas (HTML, CSS) y lenguajes de preogramación, sobre todo JavaScript.

Tareas comunes en el lado cliente:
- **Interacción con el usuario**: mostrar la interfaz de usuario y permitir al usuario interactuar con la aplicación mejora la experiencia del usuario si se hace en el cliente
- **Validación de formularios**: validar los datos de un formulario puede hacerse en el cliente aunque siempre se deberá volver a hacer en el servidor
- **Autenticación y autorización**: parte de la autenticación y autorización se puede hacer en el cliente
- **Procesar datos y realizar cálculos**: puede hacerse tanto en el servidor como en el cliente

## Javascript
JavaScript es un lenguaje de programación que se utiliza para crear aplicaciones web interactivas. Es un lenguaje de programación interpretado y débilmente tipado. JavaScript se utiliza para añadir interactividad a las páginas web.

### Limitaciones de JavaScript
JavaScript tiene algunas limitaciones que es importante tener en cuenta al desarrollar aplicaciones web:
- No puede leer ni escribir archivos en el disco duro del cliente
- No puede lanzar aplicaciones ni modificar las preferencias del navegador
- No puede enviar emails, transmitir en streaming, etc
- No puede acceder a la información de otros dominios (política del mismo origen)
- No puede manipular ventanas que no haya abierto
- Se ejecuta en el navegador del cliente, por lo que puede ser modificado por el usuario. Esto puede ser un problema de seguridad si no se toman las medidas adecuadas.
- Es un lenguaje interpretado, por lo que puede ser más lento que otros lenguajes de programación. Sin embargo, los navegadores modernos han mejorado mucho el rendimiento de JavaScript.
- JavaScript no es compatible con todos los navegadores. Es importante tener en cuenta la compatibilidad con los navegadores al desarrollar aplicaciones web.
- Depende del navegador del cliente, por lo que puede haber diferencias en la forma en que se ejecuta en diferentes navegadores. Es importante probar la aplicación en diferentes navegadores para asegurarse de que funciona correctamente en todos ellos.


### Frameworks y librerías de JavaScript
Según sea el proyecto a desarrollar utilizaremos sólo JavaScript o nos ayudaremos de alguna librería o framework. Algunas de las opciones que tenemos son:
- Javascript "Vanilla": se refiere a JavaScript puro, sin utilizar ningún framework o librería
- Bibliotecas: son colecciones de funciones y métodos que se pueden utilizar para realizar tareas comunes en JavaScript. Algunas bibliotecas populares son jQuery (facilita Ajax y la manipulación de DOM, se usa cada vez menos), Bootstrap (para mejorar el diseño), Lodash, Moment.js, etc.
- Frameworks: son conjuntos de herramientas y librerías que se utilizan para desarrollar aplicaciones web. Algunos de los frameworks más populares son Angular, React, Vue.js, Ember.js, etc.

## Evolución de las aplicaciones web
- Páginas web estáticas: páginas web que no cambian, cuyo contenido es siempre el mismo
- Páginas web dinámicas: páginas web cuyo contenido cambia en función de la interacción del usuario o de otros factores. Dichos cambios suelen hacerse en el _server-side_ (acceso a datos, etc) o en el _client-side_
- Aplicaciones web: aplicaciones que se ejecutan en el navegador web y que permiten al usuario interactuar con ellas. La mayor parte de la programación se ejecuta en el _server-side_. Un ejemplo será la intranet de nuestro centro. 
- Aplicaciones de una sola página (SPAs): aplicaciones web que se cargan una sola vez y que permiten al usuario interactuar con la aplicación sin tener que recargar la página. Ejemplos de aplicaciones SPA son Gmail, Google Maps, Facebook, Twitter, etc.
- Aplicaciones web progresivas (PWAs): aplicaciones web que se comportan parecido a las aplicaciones nativas en los móviles y que permiten al usuario interactuar con la aplicación sin conexión a Internet. Ejemplos de PWAs son Twitter Lite, Flipkart, Starbucks, etc.
- Aplicaciones web híbridas: aplicaciones que se ejecutan en el navegador web y que pueden también comportarse como aplicaciones nativas Android o iOS, aunque su rendimiento es menor. Para ello se utilizan herramientas como Ionic, PhoneGap, Cordova, etc.

Si tenemos tantas opciones, ¿cuál es la mejor? Dependerá de las necesidades de la aplicación. Si se trata de un sitio web o una aplicación pequeña o que se va a usar esporádicamente es mejor usar páginas web dinámicas y generadas en el lado servidor lo que mejorará el SEO y al ser pequeñas no sobrecargará de trabajo al servidor. Si se trata de una aplicación grande o que se va a usar mucho es mejor usar una SPA que mejorará la experiencia del usuario. Si se trata de una aplicación que se va a usar en dispositivos móviles es mejor usar una aplicación web progresiva o una aplicación web híbrida. En todos los casos la aplicación tendrá que ser _responsive_ para que se adapte a cualquier dispositivo (escritorio, móvil, tablet, ...).

En general, las aplicaciones web progresivas y las aplicaciones web híbridas son las más recomendadas, ya que ofrecen una experiencia de usuario similar a la de las aplicaciones nativas y son más fáciles de desarrollar y mantener que las aplicaciones nativas.

Respecto al despliegue de las aplicaciones, antes se subía al servidor de producción el fichero index.html y el resto de ficheros (html, js, css, ...) que formaban la aplicación. Ahora lo normal es utilizar herramientas llamadas "bundlers" que:
- unifican en uno todos los ficheros js y css
- minimizan el código js resultante lo que reduce el tamaño del fichero y mejora la velocidad de carga
- transpilan el código js a una versión que todos los navegadores entiendan
- eliminan código duplicado o innecesario de las librerías que se usan
Una vez hecho esto se sube el resultado al servidor de producción.