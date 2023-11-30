# Directivas en Vue
- [Directivas en Vue](#directivas-en-vue)
  - [Directivas básicas](#directivas-básicas)
  - [Condicionales: v-if](#condicionales-v-if)
  - [Bucles: v-for](#bucles-v-for)
  - [Eventos: v-on](#eventos-v-on)
    - [Modificadores de eventos](#modificadores-de-eventos)
  - [Ejemplo de aplicación](#ejemplo-de-aplicación)
    - [Solución de la aplicación](#solución-de-la-aplicación)


## Directivas básicas
Las directivas son atributos especiales que se ponen en las etiquetas HTML y que les dan cierta funcionalidad. Todas comienzan por **v-**. 

Las más comunes son:
* `v-text`: es equivalente a hacer una interpolación (**{\{ ... }}**). Muestra el valor en la etiqueta
* `v-once`: igual pero una vez renderizado no cambia lo mostrado en la vista aunque cambie el valor de la variable
* `v-html`: permite que el texto que se muestra contenga caracteres HTML que interpretará el navegador (al usar la interpolación las etiquetas HTML son escapadas). Internamente hace un `.innerHTML` del elemento mientras que `v-text` (y `{\{...}}`) hacen un `.textContent`
* `v-bind`: para asignar el valor de una variable a un atributo de una etiqueta HTML (no entre la etiqueta y su cierre como hace la interpolación). Por ejemplo si tenemos la variable _estado_ cuyo valor es _error_ y queremos que un _span_ tenga como clase ese valor haremos:
```html
<span v-bind:class="estado">...
```
El resultado será: `<span class="error">`. La directiva _v-bind:_ se puede abreviar simplemente como __`:`__ (`<span :class="estado">`)
* `v-model`: permite enlazar un input a una variable (la hemos visto en el capítulo anterior). Tiene 3 modificadores útiles.
  * `.lazy`: em lugar de actualizar el valor al pulsar cada tecla (_onInput_) lo hace al perder el foco (_onChange_)
  * `.number`: convierte el contenido a Number
  * `.trim`: elimina los espacios al principio y al final del texto
* `v-if`: renderiza o no el elemento que la contiene en función de una condición
* `v-show`: similar al _v-if_ pero siempre renderiza el elemento (está en el DOM) y lo que hace es mostrarlo u ocultarlo (`display: none`) en función de la condición. Es mejor si el elemento va a mostrarse y ocultarse a menudo porque no tiene que volver a renderizarlo cada vez
* `v-for`: repite el elemento HTML que contiene esta etiqueta para cada elemento de un array
* `v-on`: le pone al elemento HTML un escuchador de eventos (ej `<button v-on:click="pulsado">Pulsa</button>`. La directiva `v-on:` se puede abreviar como `@`, por ejemplo `<button @click="pulsado">Pulsa</button>`.

Lo que enlazamos en una directiva o una interpolación puede ser una variable o una expresión javascript. Ej.:
```html
<p>{ { name }}</p>
<p>{ { 'Cómo estás ' + name }}</p>
<p>{ { name=='root'?'Hola Administrador':'Hola ' + name }}</p>
```

## Condicionales: v-if
Esta directiva permite renderizar o no un elemento HTML en función de una variable o expresión.

<script async src="//jsfiddle.net/juansegura/84jq5jbg/4/embed/js,html,result/"></script>

El checkbox está enlazado a la variable _marcado_ (a la que al inicio le hemos dado el valor true, por eso aparece marcado por defecto) y los párrafos se muestran o no en función del valor de dicha variable.

La directiva `v-else` es opcional (puede haber sólo un `v-if`) pero si la ponemos el elemento con el `v-else` debe ser el inmediatamente siguiente al del `v-if`.

NOTA: Los ejemplos de esta página son todos de Vue2. Recordad que en Vue3 es todo igual excepto la forma de crear la instancia Vue que sería:
```javascript
const app = Vue.createApp({
  data() {
    return {
      marcado: true,
    }
  }
}).mount('#app');
```

También se pueden enlazar varios con `v-else-if`:
```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

| Haz el ejercicio del tutorial de [Vue.js](https://vuejs.org/tutorial/#step-6)

## Bucles: v-for
Esta directiva repite el elemento HTML en que se encuentra una vez por cada elemento del array al que se enlaza.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="ExvLZOz" data-user="juanseguravasco" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/juanseguravasco/pen/ExvLZOz">
  v-for</a> by Juan Segura (<a href="https://codepen.io/juanseguravasco">@juanseguravasco</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

La directiva v-for recorre el array _todos_ y para cada elemento del array crea una etiqueta \<li> y carga dicho elemento en la variable _elem_ a la que podemos acceder dentro del \<li>. 

Además del elemento nos puede devolver su índice en el array: `v-for="(elem,index) in todos" ...`.

Vue es más eficiente a la hora de renderizar si cada elemento que crea *v-for* tiene su propia clave, lo que se consigue con el atributo *key*. Podemos indicar como clave algún campo único del elemento o el índice:
```html
<... v-for="(elem,index) in todos" :key="index" ...>
```

Pasar una _key_ en cada _v-for_ es recomendable ahora pero será obligatorio al usarlo en componentes así que conviene usarlo siempre.

También podemos usar `v-for` para que se ejecute sobre un rango (como el típico `for (i=0;i<10;i++)`):
```html
<span v-for="n in 10" :key="n">{{ n }}</span>
```

NOTA: No se recomienda usar `v-for` y `v-if` sobre el mismo elemento. Si se hace siempre se ejecuta primero el `v-if`.

| Haz el ejercicio del tutorial de [Vue.js](https://vuejs.org/tutorial/#step-7)

## Eventos: v-on
Esta directiva captura un evento y ejecuta un método como respuesta al mismo.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="ExvLZGB" data-user="juanseguravasco" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/juanseguravasco/pen/ExvLZGB">
  v-for</a> by Juan Segura (<a href="https://codepen.io/juanseguravasco">@juanseguravasco</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

El evento que queremos capturar se pone tras el carácter `:` y se indica el método que se ejecutará.

Fijaos en el método _delTodos()_ que para hacer referencia desde el objeto Vue a alguna variable o método se le antepone **_this._**

Se puede pasar un parámetro a la función escuchadora:
```vue
<button v-on:click="pulsado('prueba')">Pulsa</button>
```
```javascript
  pulsado(valor) {
    alert(valor);
  }
```

Esta directiva se usa mucho así que se puede abreviar con **`@`**. El código equivalente sería:
```html
<button @click="pulsado('prueba')">Pulsa</button>
```

| Haz el ejercicio del tutorial de [Vue.js](https://vuejs.org/tutorial/#step-4)

### Modificadores de eventos
A un evento gestionado por una directiva _v-on_ podemos añadirle (separado por .) un modificador. Alguno de los más usados son:
* **_.prevent_**: equivale a hacer un preventDefault()
* **_.stop_**: como stopPropagation()
* **_.self_**: sólo se lanza si el evento se produce en este elemento y no en alguno de sus hijos
* **_.once_**: sólo se lanza la primera vez que se produce el evento (sería como hacer un _addEventListener_ y tras ejecutarse la primera vez hacer un _removeEventListener_)

Ejemplo:
```html
<form @submit.prevent="enviaForm">
```

## Ejemplo de aplicación
Vamos a hacer una aplicación para gestionar una lista de cosas a hacer. Cada cosa a hacer tiene un título y puede estar hecha o no.

Debe aparecer la lista de cosas a hacer con:
* un checkbox para cada cosa que nos indica si está o no hecha (y que podemos marcar/desmarcar para cambiar su estado)
* el título de la cosa a hacer, que aparecerá tachado si su estado es que ya está hecha

Además queremos que:
* al hacer doble click en una tarea a hacer debe borrarse de la lista
* bajo la lista aparecerá un input con un botón para añadir nuevas cosas a la lista. Sólo se añade si hemos introducido texto y su estado al añadirla será de NO hecha
* debajo tendremos un botón que borrará toda la lista de cosas a hacer tras pedir confirmación al usuario

### Solución de la aplicación
Puedes ver una solución al problema planteado en:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="zYdjNgg" data-user="juanseguravasco" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/juanseguravasco/pen/zYdjNgg">
  Untitled</a> by Juan Segura (<a href="https://codepen.io/juanseguravasco">@juanseguravasco</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Cosas a comentar:
* *HTML* 
  * linea 3: el \<ul> sólo se mostrará si hay elementos en la lista (todos.length)
  * línea 4: la directiva v-for además de crear una variable con el elemento crea otra con su posición dentro del array que usaremos para borrarla
  * línea 4: al método que llamamos al producirse el evento _dblclick_ le pasamos el índice de dicho elemento en el array de cosas a hacer
  * línea 6: enlazamos cada checkbox con la propiedad _done_ del elemento de forma que al marcar al checkbox la propiedad valdrá *true* y al desmarcarlo valdrá *false*
  * líneas 7 a 12: para mostrar un elemento no hecho usamos un **_span_** y para mostrar uno hecho un **_del_** para que aparezca tachado
  * línea 16: si no se muestra el \<ul> se mostrará un párrafo diciendo que no hay elementos en la lista
  * línea 17: el input lo enlazamos a una nueva variable, _newTodo_, donde guardaremos lo que se escriba
* *Javascript* 
  * línea 4: creamos la nueva variable _newTodo_ para guardar el título de la nueva cosa a añadir. Lo inicializamos a una cadena vacía y así el input estará vacío de entrada
  * línea 27: delTodo recibe como parámetro el índice del elemento a borrar así que sólo tiene que hacer un splice al array
  * línea 30: addTodo añade al array un nuevo elemento con el texto que hay en el input y después vacía dicho texto
