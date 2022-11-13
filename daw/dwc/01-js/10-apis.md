# APIs HTML5: Drag And Drop. Local Storage. Geolocalización. API de Google Maps
- [APIs HTML5: Drag And Drop. Local Storage. Geolocalización. API de Google Maps](#apis-html5-drag-and-drop-local-storage-geolocalización-api-de-google-maps)
  - [Introducción](#introducción)
  - [HTML Drag And Drop API](#html-drag-and-drop-api)
  - [Almacenamiento en el cliente: API Storage](#almacenamiento-en-el-cliente-api-storage)
    - [A tener en cuenta](#a-tener-en-cuenta)
    - [Storage vs cookies](#storage-vs-cookies)
    - [Cookies](#cookies)
  - [Geolocation API](#geolocation-api)
  - [Google Maps API](#google-maps-api)

## Introducción
En este tema varemos diferentes APIs incluidas en HTML5 (como la de Local Storage) y otras que se han hecho muy populares como la de Google Maps.

HTML5 incluye un buen número de APIs que facilitan el trabajo con cosas complejas, como
* APIs para manejo de audio y vídeo
* APIs para manejo de formularios
* API de dibujo canvas (en el módulo de DIW)

Aquí comentaremos Storage, Drag&Drop, Geolocation, File Access, Communication, Web Workers, History y Offline

## HTML Drag And Drop API
Con HTML5 es muy sencillo arrastrar y soltar elementos en una página web. Podemos arrastrar y soltar cualquier nodo DOM (una imagen, un archivo, enlaces, texto seleccionado, ...). Para ello sólo es necesario que ese elemento tenga el atributo `dragable="true"`. Si le ponemos `false` no se podrá arrastrar y si no definimos el atributo podrá o no arrastrarse según el valor predeterminado del navegador (en la mayoría son _dragables_ las imágenes, los links y las selecciones de texto).

Al arrastrar y soltar intervienen 2 elementos diferentes:
* el elemento que estamos arrastrando
* el elemento sobre el cual lo soltamos

Para poder realizar la operación _event_ tiene una propiedad llamada **dataTransfer** que es un objeto en el que almacenamos qué elemento estamos arrastrando (o cualquier otra cosa que queramos) y así cuando se suelte sobre el elemento destino éste último pueda saber quién se le ha soltado.

Los pasos para arrastrar y soltar un elemento son:
1. El elemento debe ser **_draggable_**
2. Capturamos el evento [**dragstart**](https://developer.mozilla.org/en-US/docs/Web/Events/dragstart). Este evento se produce sobre un elemento cuando comenzamos a arrastrarlo. Deberemos almacenar en el _dataTransfer_ quién está siendo arrastrado (si no guardamos nada se guarda automáticamente su `src` si es una imagen o su `href` si es un enlace). Indicaremos el tipo del dato que estamos almacenando (texto plano, HTML, fichero, etc) y su valor. Ej.:
```html
<img id="imgGoogle" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google.png/320px-Google.png">
<div id="zonaDrop1" class="drop">
  <p>Puedes soltar aquí la imagen</p>
</div>
<div id="zonaDrop2" class="drop">
  <p>Y también aquí</p>
</div>
```

```javascript
document.getElementById('imgGoogle').addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', event.target.id);  // Estamos guardando el texto 'imgGoogle'
})
```

3. Capturamos el evento [**dragover**](https://developer.mozilla.org/en-US/docs/Web/Events/dragover). Este evento se produce cada pocas décimas de segundo sobre elemento sobre el que se está arrastrando algo. Por defecto no se puede soltar un elemento en ningún sitio así que capturamos este evento para evitar que el navegador haga la acción por defecto e impida que se suelte lo que estamos arrastrando. Ej.: 
```javascript
document.getElementById('zonaDrop1').addEventListener('dragover', (event) => {
    event.preventDefault();
})
document.getElementById('zonaDrop2').addEventListener('dragover', (event) => {
    event.preventDefault();
})
```

4. Capturamos el evento [**drop**](https://developer.mozilla.org/en-US/docs/Web/Events/drop). Este evento se produce sobre elemento sobre el que se suelta lo que estábamos arrastrando. Lo que haremos es evitar el comportamiento por defecto del navegador (que en caso de imágenes o enlaces es cargarlos en la página), obtener quién se ha soltado a partir del objeto _dataTransfer_ y realizar lo que queramos, que normalmente será añadir el objeto arrastrado como hijo del objeto sobre el que se ha hecho el _drop_. Ej.: 
```javascript
document.getElementById('zonaDrop1').addEventListener('drop', (event) => {
    event.preventDefault();
    const data=event.dataTransfer.getData("text/plain");      // Obtenemos ìmgGoogle'
    event.target.appendChild(document.getElementById(data));
})
document.getElementById('zonaDrop2').addEventListener('drop', (event) => {
    event.preventDefault();
    const data=event.dataTransfer.getData("text/plain");      // Obtenemos ìmgGoogle'
    event.target.appendChild(document.getElementById(data));
})
```

Podéis ver el funcionamiento de este ejemplo:

<script async src="//jsfiddle.net/juansegura/bn495ygj/embed/"></script>

NOTA: si hacemos _draggable_ un elemento, por ejemplo un párrafo, ya no se puede seleccionar con el ratón ya que al pinchar y arrastrar se mueve, no se selecciona. Para poder seleccionarlo debemos pinchar y arrastrar el ratón con las teclas _Ctrl+Alt_ pulsadas o hacerlo con el teclado. Ejemplo:

<script async src="//jsfiddle.net/juansegura/dgyvLtho/embed/"></script>

Podemos obtener más información de esta API [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API).

> EJERCICIO: mira y modifica el ejemplo de [w3schools](https://www.w3schools.com/html/html5_draganddrop.asp) para entender bien el funcionamiento del Drag&Drop (ten en cuenta que en vez de .addEventListener() las llamadas a los escuchadores están puestas como atributos del HTML pero el funcionamiento es el mismo).

## Almacenamiento en el cliente: API Storage
Antes de HTML5 la única manera que tenían los programadores de guardar algo en el navegador del cliente (como sus preferencias, su idioma predeterminado para nuestra web, etc) era utilizando _cookies_. Las cookies tienen muchas limitaciones y es engorroso trabajar con ellas. 

HTML5 incorpora la [API de Storage](https://developer.mozilla.org/es/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API) para subsanar esto. Además existen otros métodos de almacenamiento en el cliente más avanzados como [IndexedDB](https://developer.mozilla.org/es/docs/Web/API/IndexedDB_API) (es un estándar del W3C pero aún con poco soporte entre los navegadores).

El funcionamiento de la API Storage es muy sencillo: dentro del objeto _window_ tendremos los objetos **localStorage** y **sessionStorage** donde podremos almacenar información en el espacio de almacenamiento local (5 o 10 MB por sitio web según el navegador, que es mucho más de lo que teníamos con las cookies). La principal diferencia entre ellos es que la información almacenada en _localStorage_ nunca expira, permanece allí hasta que la borremos (nosotros o el usuario) mientras que la almacenada en _sessionStorage_ se elimina automáticamente al cerrar la sesión el usuario.

Sólo los navegadores muy antiguos (Internet Explorer 7 y anteriores) no soportan esta característica. Puedo saber si el navegador soporta o no esta API simplemente mirando su `typeof`:
```javascript
if (typeof(Storage) === 'undefined')    // NO está soportado
```

Tanto _localStorage_ como _sessionStorage_ son como un objeto global al que tengo acceso desde el código. Lo que puedo hacer con ellos es:
* **Guardar** un dato: `localStorage.setItem('dato', 'valor')` o también `localStorage.dato = 'valor'`
* **Recuperar** un dato: `let miDato=localStorage.getItem('dato')` o también `let miDato = localStorage.dato`
* **Borrar** datos: `localStorage.removeItem('dato')` para borrar 'dato'. Si quiero borrar TODO lo que tengo `localStorage.clear()`
* Saber **cuántos** datos tenemos: `localStorage.length`

Sólo podemos guardar objetos primitivos (cadenas, números, ...) por lo que si queremos guardar un objeto o un array hay que convertirlo a una cadena JSON con `localStorage.setItem('dato', JSON.stringify('objeto'))`. Para recuperar el objeto haremos `let miObjeto = JSON.parse(localStorage.getItem('dato'))`.
 
Cada vez que cambia la información que tenemos en nuestro localStorage se produce un evento **storage**. Si, por ejemplo, queremos que una ventana actualice su información si otra cambia algún dato del storage haremos:
```javascript
window.addEventListener("storage", actualizaDatos);
```

y la función 'actualizaDatos' podrá leer de nuevo lo que hay y actuar en consecuencia.

> EJERCICIO: comprueba qué tienes almacenado en el localStorage y el sessionStorage de tu navegador. Guarda y recupera algunas variables. Luego cierra el navegador y vuelve a abrir la página. ¿Están las variables guardadas en localStorage? ¿Y las de sessionStorage?

Puedes ver un ejemplo [en este vídeo](https://www.youtube.com/watch?v=ASQQUSFtr8g&list=PLI7nHlOIIPOJtTDs1HVJABswW-xJcA7_o&index=65) de cómo almacenar en el _Storage_ datos del usuario.

### A tener en cuenta
_localStorage_, _sessionStorage_ y _cookies_ almacenan información en un navegador específico del cliente, y por tanto:
* No podemos asegurar que permanece ahí
* Puede ser borrada/manipulada
* Puede ser leída, por lo que NO es adecuada para almacenar información sensible pero sí para preferencias del usuario, marcadores de juegos, etc

Podríamos usar _localStorage_ para almacenar localmente los datos con los que trabaja una aplicación web. Así conseguiríamos minimizan los accesos al servidor y que la velocidad de la aplicación sea mucho mayor al trabajar con datos locales. Pero periódicamente debemos sincronizar la información con el servidor.

### Storage vs cookies
Ventajas de localStorage:
* 5 o 10 MB de almacenamiento frente a 4 KB de las cookies
* Todas las cookies del dominio se envían al servidor con cada petición al mismo lo que aumenta el tráfico innecesariamente

Ventajas de las cookies:
* Soportadas por navegadores muy antiguos
* Las cookies ofrecen algo de protección frente a _XSS_ (_Cross-Site Scripting_) y _Script injection_

### Cookies
Son pequeños ficheros de texto y tienen las siguientes limitaciones:
* Máximo 300 cookies, si hay más se borran las antiguas
* Máximo 4 KB por cookie, si nos pasamos se truncará
* Máximo 20 cookies por dominio

Cada cookie almacena los siguientes datos:
* Nombre de la cookie (obligatorio)
* Valor de la misma
* _expires_: timestamp en que se borrará (si no pone nada se borra al salir del dominio)
* _max-age_: en lugar de _expires_ podemos indicar aquí los segundos que durará la cookie antes de expirar
* _path_: ruta desde dónde es accesible (/: todo el dominio, /xxx: esa carpeta y subcarpetas). Si no se pone nada sólo lo será desde la carpeta actual
* _domain_: dominio desde el que es accesible. Si no ponemos nada lo será desde este dominio y sus subdominios
* _secure_: si aparece indica que sólo se enviará esta cookie con https

Un ejemplo de cookie sería:

```javascript
username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC;
```

Se puede acceder a las cookies desde **document.cookie** que es una cadena con las cookies de nuestras páginas. Para trabajar con ellas conviene que creemos funciones para guardar, leer o borrar cookies, por ejemplo:

* Crear una nueva cookie

```javascript
function setCookie(cname, cvalue, cexpires, cpath, cdomain, csecure) {
  document.cookie = cname + '=' + cvalue + 
    (cexpires?';expires='+cexpires.toUTCString():'') + 
    (cpath?';path='+cpath:'') + 
    (cdomain?';domain='+cdomain:'') + 
    (csecure?';secure':'')
}
```

* Leer una cookie

```javascript
function getCookie(cname) {
    if(document.cookie.length > 0){
        start = document.cookie.indexOf(cname + '=')
        if (start != -1) {   // Existe la cookie, busquemos dónde acaba su valor
            //El inicio de la cookie, el nombre de la cookie mas les simbolo '='
            start = start + nombre.length + 1
            //Buscamos el final de la cookie (es el simbolo ';')
            end = document.cookie.indexOf(';', start + cname.length + 1)
            if (end === -1) {   // si no encuentra el ; es que es la última cookie
                end = document.cookie.length;
            }
            return document.cookie.substring(start + cname.length + 1, end)
        }
    }
    return ''   // Si estamos aquí es que no hemos encontrado la cookie
}
```

* Borrar una cookie

```javascript
function delCookie(cname) {
    return document.cookie = cname + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}
```

Podéis ver en [este vídeo](https://www.youtube.com/watch?v=k7pteU48rpc&list=PLI7nHlOIIPOJtTDs1HVJABswW-xJcA7_o&index=62) un ejemplo de cómo trabajar con cookies, aunque como ya hemos dicho lo recomendable es trabajar con _Storage_.

## Geolocation API
Esta API permite a la aplicación web acceder a la localización del usuario si éste da su permiso. Muchos navegadores sólo permiten usarlo en páginas seguras (https).

Podemos acceder a esta API mediante el objeto **geolocation** de _navigator_. Para saber si nuestro navegador soporta o no la API podemos hacer:

```javascript
if (geolocation in navigator)   // devuelve true si está soportado
```

Para obtener la posición este objeto proporciona el método **navigator.geolocation.getCurrentPosition()** que hace una petición **asíncrona**. Cuando se reciba la posición se ejecutará la función _callback_ que pasemos como parámetro y que recibirá las coordenadas de la localización. Podemos pasar otra como segundo parámetro que se ejecutará si se produce algú error y que recibirá un objeto con la propiedad _code_ que indica el error producido. Ej.:

```javascript
navigator.geolocation.getCurrentPosition(
  (position) => {
    pinta_posicion(position.coords.latitude, position.coords.longitude)
  },
  (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED: // El usuario no autoriza al navegador a acceder a la localización
        msg = 'El usuario ha denegado la petición de geolocalización'
        break
      case error.POSITION_UNAVAILABLE: // No se puede obtener la localización
        msg = 'La información de localización no está disponible.'
        break
      case error.TIMEOUT: // Ha expirado el tiempo para obtener la localización
        msg = 'Ha expirado el tiempo para obtener la localización'
        break
      case error.UNKNOWN_ERROR:
        msg = 'Se ha producido un error desconocido.'
        break
    }
    muestra_error(msg)
  }
)
```

Si queremos ir obteniendo continuamente la posición podemos usar el método  **.watchPosition()** que tiene los mismos parámetros y funciona igual pero se ejecuta repetidamente. Este método devuelve un identificador para que lo podemos detener cuando queremos con **.clearWatch(ident)**. Ej.:

```javascript
const watchIdent = navigator.geolocation.watchPosition(
  (position) => pinta_posicion(position.coords.latitude, position.coords.longitude),
  (error) => muestra_error(error)
)
...
// Cuando queremos dejar de obtener la posición haremos
navigator.geolocation.clearWatch(watchIdent)
```

Las principales propiedades del objeto de localización (algunas sólo estarán disponible cuando usemos un GPS) son:
- coords.latitude: latitud
- coords.longitude: longitud
- coords.accuracy: precisión (en metros)
- coords.altitude: altitud (en metros, sobre el nivel del mar)
- coords.altitudeAccuracy: precisión de la altitud
- coords.heading: orientación (en grados)
- coords.speed: velocidad (en metros/segundo)
- timestamp: tiempo de respuesta UNIX

Podemos pasarle como tercer parámetro al método getCurrentPosition un objeto JSON con una o más de estas propiedades:
- enableHighAccuracy: true/false que indica si el dispositivo debe usar todo lo posible para obtener la posición con mayor precisión (por defecto false porque consume más batería y tiempo)
- timeout: milisegundos a esperar para obtener la posición antes de lanzar un error (por defecto es 0, espera indefinidamente)
- maximumAge: milisegundos que guarda la última posición en caché. Si se solicita una nueva posición antes de expirar el
tiempo, el navegador devuelve directamente el dato almacenado

Podemos obtener más información de esta API en [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) y ver y modificar ejemplos en [w3schools](http://www.w3schools.com/html/html5_geolocation.asp) y muchas otras páginas. i

## Google Maps API
Para poder utilizar la API en primer lugar debemos [obtener una API KEY](https://developers.google.com/maps/documentation/javascript/get-api-key) de Google.

Una vez hecho para incluir un mapa en nuestra web debemos cargar la librería para lo que incluiremos en nuestro código el  script:

```javascript
<script async defer
  src="https://maps.googleapis.com/maps/api/js?key=ESCRIBE_AQUI_TU_API_KEY&callback=initMap">
</script>
```
(el parámetro _callback_ será el encargado de llamar a la función _initMap()_ que inicie el mapa)

Ahora incluir un mapa es tán sencillo como crear un nuevo objeto de tipo _Map_ que recibe el elemento DOM donde se pintará (un div normalmente) y un objeto con los parámetros del mapa (como mínimo su centro y el zoom):

```javascript
let map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 38.6909085, lng: -0.4963000000000193 },
    zoom: 12
  })
}
```

Por su parte añadir un marcador es igual de simple. Creamos una instancia de la clase _Marker_ a la que le pasamos al menos la posición, el mapa en que se creará y un título para el marcador:

```javascript
let marker = new google.maps.Marker({
  position: { lat: 38.6909085, lng: -0.4963000000000193 },
  map: map,
  title: 'CIP FP Batoi'
})
```

Aquí tenéis el ejemplo anterior:

<script async src="//jsfiddle.net/juansegura/pqzhd2vm/embed/"></script>

Podemos obtener más información de esta API en [Google Maps Plataform](https://developers.google.com/maps/documentation/javascript/tutorial), en el tutorial de [w3schools](https://www.w3schools.com/graphics/google_maps_intro.asp) y en muchas otras páginas.
