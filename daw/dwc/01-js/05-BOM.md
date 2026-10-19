# Browser Object Model (BOM)
- [Browser Object Model (BOM)](#browser-object-model-bom)
  - [Introducción](#introducción)
  - [Timers](#timers)
    - [Los timers no son exactos](#los-timers-no-son-exactos)
    - [Errores habituales con los timers](#errores-habituales-con-los-timers)
  - [Objetos del BOM](#objetos-del-bom)
    - [Objeto window](#objeto-window)
      - [Abrir y cerrar ventanas](#abrir-y-cerrar-ventanas)
      - [Diálogos](#diálogos)
    - [Objeto location](#objeto-location)
      - [Los objetos URL y URLSearchParams](#los-objetos-url-y-urlsearchparams)
    - [Objeto history](#objeto-history)
    - [Objeto navigator](#objeto-navigator)
    - [Objeto screen](#objeto-screen)
  - [Contextos seguros](#contextos-seguros)

## Introducción
En este tema veremos cómo acceder a objetos que nos permitan interactuar con el navegador (_Browser Object Model, BOM_).

Usando los objetos BOM podemos:
* Ejecutar código pasado un tiempo (_timers_)
* Abrir y cerrar ventanas
* Leer y cambiar la URL actual y movernos por el historial
* Obtener información del navegador y de la pantalla
* Acceder a APIs del sistema: portapapeles, geolocalización, almacenamiento, ...

Al contrario que el DOM, el BOM no nació como un estándar sino como un conjunto de objetos que cada navegador fue añadiendo. Hoy en día la mayor parte está recogida en el estándar [HTML](https://html.spec.whatwg.org/) y funciona igual en todos los navegadores, pero arrastra muchas propiedades antiguas que ya no sirven para nada o que devuelven siempre el mismo valor. Las iremos señalando.

## Timers
Permiten ejecutar código en el futuro (cuando transcurran, **como mínimo**, los milisegundos indicados). Hay 2 tipos:
* `setTimeout(función, milisegundos)`: ejecuta la función pasada como parámetro una sola vez, cuando transcurran los milisegundos indicados
* `setInterval(función, milisegundos)`: ejecuta la función cada vez que transcurran los milisegundos indicados, hasta que se cancele el _timer_

A ambas se les pueden pasar más parámetros tras los milisegundos y serán los parámetros que recibirá la función a ejecutar.

Ambas funciones devuelven un identificador que nos permitirá cancelar la ejecución del código usando:
* `clearTimeout(identificador)`
* `clearInterval(identificador)`

Ejemplo:
```javascript
const idTimeout = setTimeout(() => console.log('Timeout que se ejecuta al cabo de 1 seg.'), 1000);

let i = 1;
const idInterval = setInterval(() => {
  console.log('Interval cada 3 seg. Ejecución nº: ' + i++);
  if (i === 5) {
    clearInterval(idInterval);
    console.log('Fin de la ejecución del Interval');
  }
}, 3000);
```

> EJERCICIO: Ejecuta en la consola cada una de esas funciones

En lugar de definir la función a ejecutar podemos pasar una función que ya exista:
```javascript
function showMessage() {
  console.log('Timeout que se ejecuta al cabo de 1 seg.')
}

const idTimeout = setTimeout(showMessage, 1000);
```

Pero en ese caso hay que poner sólo el nombre de la función, sin `()`, ya que si los ponemos se ejecutaría la función en ese momento y a `setTimeout` le llegaría lo que devuelve (normalmente `undefined`).

Si necesitamos pasarle algún parámetro a la función lo añadiremos como parámetros de `setTimeout` o `setInterval` después del intervalo:
```javascript
function showMessage(msg) {
  console.log(msg)
}

const idTimeout = setTimeout(showMessage, 1000, 'Timeout que se ejecuta al cabo de 1 seg.');
```

Aunque es más habitual (y más claro) usar una _arrow function_:
```javascript
const idTimeout = setTimeout(() => showMessage('Timeout que se ejecuta al cabo de 1 seg.'), 1000);
```

### Los timers no son exactos
Javascript en el navegador se ejecuta en **un único hilo**. Cuando se cumple el tiempo de un _timer_ su función no se ejecuta en ese instante sino que se pone en una cola, y se ejecutará cuando el hilo quede libre (cuando termine el código que se esté ejecutando en ese momento). Esto tiene varias consecuencias:

* `setTimeout(fn, 0)` **no** ejecuta la función inmediatamente: la ejecuta en cuanto acabe el código actual
```javascript
setTimeout(() => console.log('B'), 0);
console.log('A');
// Muestra 'A' y luego 'B'
```
* Si el hilo está ocupado, el _timer_ se retrasa todo lo que dure ese código. Y si un `setInterval` se retrasa, las ejecuciones que "se perdieron" **no se acumulan**: simplemente no se hacen
* Los navegadores **ralentizan los _timers_ de las pestañas que no están visibles** para ahorrar batería. En una pestaña en segundo plano un _timer_ se ejecuta como mucho una vez por segundo y Chrome, si la pestaña lleva más de 5 minutos oculta, puede agruparlos para ejecutarlos sólo una vez por minuto
* Si el equipo se suspende, los _timers_ se detienen

Por tanto **un _timer_ sirve para decidir cuándo hacer algo, pero no para medir el tiempo**. Si necesitamos saber cuánto tiempo ha pasado (un cronómetro, una cuenta atrás, ...) no contaremos cuántas veces se ha ejecutado el _interval_ sino que guardaremos el momento de inicio y calcularemos la diferencia con el momento actual:
```javascript
// MAL: cuenta ejecuciones, no tiempo
let seconds = 60;
setInterval(() => seconds--, 1000);

// BIEN: el interval sólo sirve para refrescar; el tiempo se calcula
const end = Date.now() + 60 * 1000;
const id = setInterval(() => {
  const remaining = Math.max(0, Math.round((end - Date.now()) / 1000));
  console.log(remaining);
  if (remaining === 0) clearInterval(id);
}, 1000);
```

> EJERCICIO: ejecuta en la consola el siguiente código, que muestra cada segundo cuántos ms han pasado realmente desde la ejecución anterior. Después, mientras se está ejecutando, ejecuta `const t = Date.now(); while (Date.now() - t < 3000) {}` (bloquea el hilo 3 segundos). ¿Qué observas? ¿Qué pasa si cambias a otra pestaña un rato y vuelves?
```javascript
let last = Date.now();
const id = setInterval(() => {
  const now = Date.now();
  console.log(now - last);
  last = now;
}, 1000);
// para pararlo: clearInterval(id)
```

### Errores habituales con los timers
* **Ejecutar la función en vez de pasarla**: `setTimeout(showMessage(), 1000)` ejecuta `showMessage` ya
* **No guardar el identificador**: si no lo guardamos no podremos cancelar el _timer_
* **Crear un _interval_ sin cancelar el anterior**: si una función que hace `setInterval` se llama 2 veces tendremos 2 _intervals_ a la vez. Antes de crear uno nuevo debemos cancelar el que hubiera:
```javascript
let idInterval;

function start() {
  clearInterval(idInterval);   // si no hay ninguno no pasa nada
  idInterval = setInterval(tick, 1000);
}
```
* **Perder el `this` al pasar un método**: si pasamos un método de un objeto, la función se ejecuta "suelta" y dentro de ella `this` ya no es el objeto:
```javascript
class Counter {
  constructor() {
    this.value = 0;
  }
  increment() {
    this.value++;
    console.log(this.value);
  }
}

const counter = new Counter();
setInterval(counter.increment, 1000);         // MAL: this no es counter -> NaN
setInterval(() => counter.increment(), 1000); // BIEN
```

## Objetos del BOM

### Objeto [window](https://developer.mozilla.org/es/docs/Web/API/Window)
Representa la ventana (o pestaña) del navegador y es el **objeto global**: todo lo que no pertenece a otro objeto pertenece a él. Por eso puede omitirse al llamar a sus propiedades y métodos, por ejemplo, `setTimeout()` es en realidad `window.setTimeout()` y `location` es `window.location`.

NOTA: las variables globales declaradas con `var` y las funciones globales se convierten en propiedades de _window_ (las declaradas con `let` y `const` no). Es otro motivo para no usar `var`. Si estamos en un módulo (por ejemplo con Vite) nada de lo que declaremos es global y, si queremos que algo sea accesible desde la consola, tendremos que hacerlo explícitamente: `window.miFuncion = miFuncion`.

NOTA: en otros entornos (como NodeJS o Vitest) no existe `window`. Si necesitamos referirnos al objeto global sea cual sea el entorno podemos usar `globalThis`.

Sus principales propiedades y métodos son:
* `.innerWidth`/`.innerHeight`: ancho/alto útil del documento (el _viewport_), sin las barras del navegador
* `.outerWidth`/`.outerHeight`: ancho/alto total de la ventana del navegador
* `.screenX`/`.screenY`: distancia de la ventana a la esquina izquierda/superior de la pantalla
* `.scrollX`/`.scrollY`: cuánto se ha desplazado la página horizontal/verticalmente (`.pageXOffset`/`.pageYOffset` son nombres antiguos de lo mismo)
* `.scrollTo(x, y)`/`.scrollBy(x, y)`: desplaza la página a esa posición / esa cantidad de px. También admiten un objeto: `window.scrollTo({ top: 0, behavior: 'smooth' })`
* `.devicePixelRatio`: cuántos píxeles físicos de la pantalla hay por cada píxel CSS (2 o más en pantallas de alta densidad)
* `.open()`, `.close()`, `.opener`: abrir y cerrar ventanas (lo vemos a continuación)
* `.alert()`, `.confirm()`, `.prompt()`: diálogos (los vemos a continuación)
* `.print()`: abre el diálogo de imprimir
* `.focus()`/`.blur()`: da/quita el foco a la ventana
* `.stop()`: detiene la carga de la página

Otras propiedades que encontraréis en documentación antigua no funcionan o no hacen nada: `.status` (los navegadores ya no tienen barra de estado accesible), `.home()`, `.back()`/`.forward()` (se usa `history`), `.find()` (no estándar).

> EJERCICIO: desde la consola obtén el tamaño útil de la ventana. Cambia el tamaño de la ventana del navegador (o abre las herramientas de desarrollador acopladas a un lado) y vuelve a obtenerlo. Haz scroll en una página larga y muestra cuánto te has desplazado. Haz que vuelva arriba suavemente.

#### Abrir y cerrar ventanas
* `window.open(url, nombre, opciones)`: abre una nueva ventana o pestaña y devuelve su objeto _window_ (o `null` si el navegador la bloquea)
  * `nombre`: si ya hay una ventana con ese nombre se carga la url en ella en lugar de abrir otra. `'_blank'` abre siempre una nueva
  * `opciones`: cadena con opciones separadas por comas, como `'width=500,height=200,left=100,top=200'`. Si se indica alguna de tamaño o posición el navegador abre una ventana _popup_ en vez de una pestaña. Las opciones antiguas para quitar barras (`toolbar`, `menubar`, `location`, `status`, `scrollbars`...) **se ignoran** en los navegadores actuales: por seguridad el usuario siempre ve la barra de dirección. Una opción útil es `noopener` (ver más abajo)
* `window.opener`: en la ventana abierta, referencia a la ventana que la abrió
* `window.close()`: cierra la ventana. Sólo funciona en ventanas abiertas con `open` desde script; en las demás el navegador lo ignora y muestra un aviso en la consola
* `.moveTo(x,y)`/`.moveBy(x,y)`/`.resizeTo(w,h)`/`.resizeBy(w,h)`: mueven o redimensionan la ventana. Sólo funcionan en _popups_ abiertos con `open` que tengan una única pestaña, y no se puede sacar la ventana de la pantalla ni hacerla más pequeña de 100x100 px. En móviles no funcionan

Hay que tener en cuenta que:
* **los navegadores bloquean los _popups_** que no se abren como respuesta directa a una acción del usuario (un clic, una tecla). Un `window.open` dentro de un `setTimeout` o al cargar la página será bloqueado en casi todos los navegadores. Desde la consola sí funciona
* si abrimos una página de **otro dominio**, ésta tiene acceso a nuestra ventana mediante `opener` y podría, por ejemplo, redirigirla a una página falsa. Para evitarlo se añade `noopener` a las opciones (en ese caso `open` devuelve `null`). En los enlaces `<a target="_blank">` los navegadores ya lo hacen por defecto
* abrir ventanas nuevas es hoy muy poco habitual: para mostrar información al usuario se usan ventanas modales dentro de la propia página (lo veremos al trabajar con el DOM)

```javascript
const win = window.open('', 'saludo', 'width=500,height=200,left=100,top=200');
win.document.write('<h1>Hola</h1>');
win.moveBy(-100, 300);
win.close();
```

> EJERCICIO: ejecuta desde la consola el código anterior instrucción por instrucción. Después:
> - prueba a abrir esa misma ventana con `setTimeout(() => window.open(...), 2000)` desde un fichero JS cargado en una página. ¿Qué pasa? ¿Y si lo ejecutas desde la consola?
> - abre una ventana con `toolbar=no,location=no`. ¿Desaparece la barra de dirección?
> - prueba `window.close()` en la pestaña actual. ¿Qué pasa? Mira la consola

Puedes ver un ejemplo de cómo abrir ventanas en [este vídeo](https://www.youtube.com/watch?v=jkTt6bs2tPo&list=PLI7nHlOIIPOJtTDs1HVJABswW-xJcA7_o&index=40), aunque ten en cuenta lo anterior: algunas cosas que se ven ya no funcionan en los navegadores actuales.

#### Diálogos
Hay 3 métodos del objeto _window_ que ya conocemos y que nos permiten abrir ventanas de diálogo con el usuario:
* `window.alert(mensaje)`: muestra un diálogo con el mensaje indicado y un botón de 'Aceptar'
* `window.confirm(mensaje)`: muestra un diálogo con el mensaje indicado y botones de 'Aceptar' y 'Cancelar'. Devuelve _true_ si se ha pulsado 'Aceptar' y _false_ si no
* `window.prompt(mensaje [, valor predeterminado])`: muestra un diálogo con el mensaje indicado, un cuadro de texto (vacío o con el valor predeterminado indicado) y botones de 'Aceptar' y 'Cancelar'. Si se pulsa 'Aceptar' devuelve un **_string_** con lo que haya en el cuadro de texto (aunque esté vacío o sea un número) y si se pulsa 'Cancelar' o se cierra devuelve **_null_**

Hay que tener en cuenta que:
* son **bloqueantes**: mientras están abiertos no se ejecuta nada más de nuestro código, tampoco los _timers_
* no se puede cambiar su aspecto ni el texto de los botones
* el navegador puede ofrecer al usuario la opción de impedir que la página muestre más diálogos, y no roban el foco si la pestaña no está activa

Por eso en aplicaciones reales no se usan (salvo quizá un `confirm` rápido antes de borrar algo) y se sustituyen por ventanas modales hechas con HTML. Y **nunca** se usa `alert` para depurar: para eso está `console.log`.

Cuidado al convertir lo que devuelve `prompt` a número:
```javascript
const edad = Number(prompt('¿Cuántos años tienes?'));
// Si escribe 'abc' -> NaN
// Si deja el cuadro vacío -> Number('') es 0
// Si pulsa Cancelar -> Number(null) es 0
```

> EJERCICIO: pide al usuario un número con `prompt` y muestra en la consola su doble. Asegúrate de que tu código distingue entre: el usuario cancela, deja el cuadro vacío, escribe algo que no es un número y escribe un número válido.

### Objeto [location](https://developer.mozilla.org/es/docs/Web/API/Location)
Contiene información sobre la URL actual y nos permite cambiarla. Sus principales propiedades son (para la URL `https://www.ejemplo.com:8080/tienda/productos.html?cat=5&orden=precio#ofertas`):

| Propiedad | Valor |
|---|---|
| `.href` | la URL completa |
| `.origin` | `https://www.ejemplo.com:8080` |
| `.protocol` | `https:` |
| `.host` | `www.ejemplo.com:8080` |
| `.hostname` | `www.ejemplo.com` |
| `.port` | `8080` (vacío si es el puerto por defecto) |
| `.pathname` | `/tienda/productos.html` |
| `.search` | `?cat=5&orden=precio` |
| `.hash` | `#ofertas` |

Y sus métodos:
* `.assign(url)`: carga la página pasada como parámetro. Es lo mismo que hacer `location.href = url`
* `.replace(url)`: ídem pero **sustituye** la página actual en el historial en lugar de añadir una nueva, por lo que el usuario no podrá volver a ella con el botón 'Atrás'. Es lo que debemos usar cuando redirigimos desde una página a la que no tiene sentido volver (una página de "cargando", un paso que ya se ha completado, ...)
* `.reload()`: recarga la página actual

Si cambiamos sólo el `hash` (`location.hash = '#seccion2'`) la página **no** se recarga, sólo se desplaza a ese ancla y se añade una entrada al historial.

> EJERCICIO: Ejecuta en la consola
> - muestra la ruta completa de la página actual
> - muestra el servidor de esta página, con y sin puerto
> - carga otra página usando `location.assign` y vuelve atrás con el botón del navegador. Ahora hazlo con `location.replace`. ¿Qué diferencia hay?

#### Los objetos URL y URLSearchParams
La propiedad `search` nos devuelve la cadena de búsqueda completa (`?cat=5&orden=precio`) pero normalmente lo que queremos es el valor de uno de sus parámetros. **No** debemos extraerlo a mano con `split` o con expresiones regulares porque es fácil equivocarse (¿y si el parámetro no es el primero? ¿y si el valor tiene caracteres codificados como `%20`?). Para eso existe `URLSearchParams`:
```javascript
// location.search vale '?cat=5&orden=precio'
const params = new URLSearchParams(location.search);
params.get('cat');      // '5' (siempre devuelve un string)
params.get('pagina');   // null (no existe)
params.has('orden');    // true
```

Y si necesitamos trabajar con una URL que no es la actual, o construir una, tenemos el objeto `URL`, que tiene las mismas propiedades que `location` y además una propiedad `searchParams`:
```javascript
const url = new URL('https://www.ejemplo.com/buscar');
url.searchParams.set('q', 'libros de javascript');
url.searchParams.set('pagina', 2);
url.href;   // 'https://www.ejemplo.com/buscar?q=libros+de+javascript&pagina=2'
```

Estos objetos los usaremos mucho cuando hagamos peticiones a un servidor.

> EJERCICIO: haz una función `getParam(nombre, porDefecto)` que devuelva el valor del parámetro indicado de la URL actual o el valor por defecto si no existe. Pruébala abriendo tu página con distintos parámetros (`?nombre=Ana&edad=20`, `?edad=20&nombre=Ana`, `?nombre=Ana%20María`, ...)

### Objeto [history](https://developer.mozilla.org/es/docs/Web/API/History)
Permite acceder al historial de páginas visitadas **en esta pestaña** y navegar por él (por privacidad no podemos ver qué páginas son, sólo movernos por él):
* `.length`: número de entradas que hay en el historial de esta pestaña
* `.back()`: vuelve a la página anterior (como el botón 'Atrás')
* `.forward()`: va a la siguiente página
* `.go(num)`: se mueve _num_ páginas hacia adelante o hacia atrás (si _num_ es negativo) en el historial

Además permite **añadir o modificar entradas del historial sin cargar ninguna página**:
* `.pushState(estado, '', url)`: añade una nueva entrada al historial y cambia la URL que se ve en la barra de dirección, pero sin cargar nada. El primer parámetro es cualquier dato que queramos asociar a esa entrada y el segundo no se usa (se pasa `''`)
* `.replaceState(estado, '', url)`: igual pero sustituye la entrada actual en vez de añadir una
* `.state`: el estado asociado a la entrada actual

Cuando el usuario pulsa 'Atrás' o 'Adelante' sobre una entrada creada así, la página no se recarga sino que se produce el evento `popstate`. Esto es la base de las **SPA** (_Single Page Applications_): aplicaciones con una sola página HTML en las que el código cambia el contenido y la URL sin recargar, y en las que los botones del navegador siguen funcionando. Lo veremos en el tema de SPA y lo usaremos (a través del _router_) en Vue.

> EJERCICIO: desde la consola:
> - vuelve a la página anterior y después adelante otra vez
> - ejecuta `history.pushState({ pagina: 2 }, '', '?pagina=2')`. Mira la barra de dirección. ¿Se ha recargado la página? Mira `history.length` y `history.state`. Pulsa 'Atrás'. ¿Qué ha pasado?

### Objeto [navigator](https://developer.mozilla.org/es/docs/Web/API/Navigator)
Nos da información sobre el navegador y el sistema en que se ejecuta:
* `.language`: el idioma preferido del usuario, como etiqueta [BCP 47](https://developer.mozilla.org/es/docs/Glossary/BCP_47_language_tag): `'es-ES'`, `'es-419'` (español de Latinoamérica), `'ca-ES-valencia'`, `'en-US'`, ... **No** es sólo el código del idioma, por lo que `navigator.language === 'es'` normalmente será falso. Para saber si es español usaremos `navigator.language.startsWith('es')`
* `.languages`: array con los idiomas que acepta el usuario, por orden de preferencia
* `.onLine`: _false_ si sabemos seguro que no hay conexión (_true_ no garantiza que la haya)
* `.userAgent`: cadena que identifica al navegador. Por razones históricas todos los navegadores dicen ser "Mozilla" y casi todos dicen ser también "Safari", así que es difícil de interpretar
* `.cookieEnabled`: si están habilitadas las cookies
* `.hardwareConcurrency`: número de núcleos del procesador

Otras propiedades que veréis en documentación antigua están obsoletas y devuelven siempre lo mismo en todos los navegadores para no dar información al usuario: `.appName` (siempre `'Netscape'`), `.appCodeName` (siempre `'Mozilla'`), `.product` (siempre `'Gecko'`), `.appVersion` y `.platform` (obsoleta, aunque aún devuelve algo).

**No debemos usar `navigator` para averiguar qué navegador es** y hacer cosas distintas según el que sea. Si queremos saber si podemos usar una característica, comprobamos directamente si existe (_feature detection_):
```javascript
// MAL
if (navigator.userAgent.includes('Chrome')) { ... }

// BIEN
if ('geolocation' in navigator) { ... }
if (navigator.clipboard) { ... }
```

También incluye objetos con sus propias API para poder interactuar con el sistema:
* `.clipboard`: permite leer y escribir en el portapapeles del usuario, por ejemplo con `.writeText(texto)`
* `.geolocation`: permite obtener la localización del dispositivo (pide permiso al usuario). Lo veremos en el tema de APIs HTML5
* `.mediaDevices`: permite acceder a la cámara y el micrófono (pide permiso al usuario)
* `.storage`: permite saber cuánto espacio de almacenamiento está usando nuestra página y cuánto le queda. No confundir con `localStorage` y `sessionStorage`, que son propiedades de `window` y veremos en el tema de APIs HTML5
* `.serviceWorker`: permite trabajar con _service workers_

Muchas de estas API sólo funcionan en [contextos seguros](#contextos-seguros) y devuelven promesas, que veremos en el tema de Ajax.

> EJERCICIO: desde la consola muestra el idioma preferido del navegador y todos los que acepta. Cambia en la configuración del navegador el orden de los idiomas y vuelve a mirarlos. Haz una función que devuelva `'es'`, `'ca'` o `'en'` según el primero de los idiomas del usuario que esté entre esos tres (y `'en'` si no hay ninguno).

### Objeto [screen](https://developer.mozilla.org/es/docs/Web/API/Screen)
Nos da información sobre la pantalla:
* `.width`/`.height`: ancho/alto total de la pantalla en píxeles CSS (si el sistema tiene escalado al 150% en una pantalla de 1920px, aquí veremos 1280)
* `.availWidth`/`.availHeight`: igual pero excluyendo las barras del sistema operativo
* `.orientation.type`: orientación de la pantalla (`'landscape-primary'`, `'portrait-primary'`, ...)

Para decidir cómo mostrar nuestra página **no usaremos el tamaño de la pantalla** sino el de la ventana (`innerWidth`), y normalmente ni siquiera eso: es trabajo del CSS (_media queries_).

> EJERCICIO: obtén desde la consola las propiedades width/height y availWidth/availHeight del objeto _screen_. Compáralas con las propiedades innerWidth/innerHeight y outerWidth/outerHeight de _window_ y con `devicePixelRatio`. Haz zoom en la página (Ctrl +) y vuelve a mirarlas todas. ¿Cuáles cambian?

## Contextos seguros
Algunas API del navegador sólo están disponibles en **contextos seguros** (_secure contexts_), es decir, en páginas servidas por **https** o desde **localhost**. En el resto esas propiedades no existen (por ejemplo `navigator.clipboard` será `undefined`). Entre ellas están el portapapeles, la geolocalización, la cámara y el micrófono o los _service workers_.

Mientras desarrollamos con Vite estamos en `localhost`, por lo que funcionan, pero si abrimos la página desde la IP del equipo (por ejemplo desde el móvil) o la publicamos en un servidor sin https dejarán de funcionar. Podemos comprobarlo con `window.isSecureContext`.
