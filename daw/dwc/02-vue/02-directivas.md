<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
Tabla de contenidos

- [Directivas en Vue](#directivas-en-vue)
  - [Directivas básicas](#directivas-b%C3%A1sicas)
  - [Condicionales: v-if](#condicionales-v-if)
  - [Bucles: v-for](#bucles-v-for)
  - [Eventos: v-on](#eventos-v-on)
    - [Modificadores de eventos](#modificadores-de-eventos)
  - [Ejemplo de aplicación](#ejemplo-de-aplicaci%C3%B3n)
    - [Solución de la aplicación](#soluci%C3%B3n-de-la-aplicaci%C3%B3n)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Directivas en Vue
Las directivas son atributos especiales que se ponen en las etiquetas HTML y que les dan cierta funcionalidad. Todas comienzan por **v-**. 

## Directivas básicas
Las más comunes son:
* `v-text`: es equivalente a hacer una interpolación (` {{...}} `). Muestra el valor en la etiqueta
* `v-once`: igual pero no cambia lo mostrado si cambia el valor de la variable que se muestra
* `v-html`: permite que el texto que se muestra contenga caracteres HTML que interpretará el navegador (al usar la interpolación las etiquetas HTML son escapadas)
* `v-bind`: para asignar el valor de una variable a un atributo de una etiqueta HTML, no entre la etiqueta y su cierre como hace la interpolación. Por ejemplo si tenemos la variable _estado_ cuyo valor es _error_ y queremos que se muestre dentro de un _span_ ese valor pero que también tenga una clase con ese valor haremos:
```html
<span v-bind:class="estado">{ { estado }}</span>
```
El resultado será: `<span class="error">error</span>`. La directiva _v-bind:_ se puede abreviar simplemente como _:_ (`<span :class="estado">{ { estado }}</span>`)
* `v-model`: permite enlazar un input a una variable (la hemos visto en el capítulo anterior)
* `v-if`: renderiza o no el elemento que la contiene en función de una condición
* `v-show`: similar al _v-if_ pero siempre renderiza el elemento (está en el DOM) y lo que hace es mostrarlo u ocultarlo (`display: none`) en función de la condición
* `v-for`: repite el elemento HTML que contiene esta etiqueta para cada elemento de un array
* `v-on`: le pone al elemento HTML un escuchador de eventos (ej `<button v-on:click="pulsado">Pulsa</button>`. La directiva `v-on:` se puede abreviar como `@` (`<button @click="pulsado">Pulsa</button>`).

Lo que enlazamos en una directiva o una interpolación puede ser una variable o una expresión javascript. Ej.:
```html
<p>{ { name }}</p>
<p>{ { 'Cómo estás ' + name }}</p>
<p>{ { name=='root'?'Como jefe puedes cambiar cualquier cosa':'Como usuario '+name+' puedes cambiar tus datos' }}</p>
```

## Condicionales: v-if
Esta directiva permite renderizar o no un elemento HTML en función de una variable o expresión.

<script async src="//jsfiddle.net/juansegura/84jq5jbg/4/embed/js,html,result/"></script>

El checkbox está enlazado a la variable _marcado_ (a la que al inicio le hemos dado el valor true, por eso aparece marcado por defecto) y los párrafos se muestran o no en función del valor de dicha variable.

La directiva v-else es opcional (puede haber sólo un v-if).

## Bucles: v-for
Esta directiva repite el elemento HTML en que se encuentra una vez por cada elemento del array al que se enlaza.

<script async src="//jsfiddle.net/juansegura/o6bj81s3/embed/js,html,result/"></script>

La directiva v-for recorre el array _todos_ y para cada elemento del array crea una etiqueta \<li> y carga dicho elemento en la variable _elem_ a la que podemos acceder dentro del \<li>. 

Además del elemento nos puede devolver su índice en el array: `v-for="(elem,index) in todos" ...`.

Vue es más eficiente a la hora de renderizar si cada elemento que crea *v-for* tiene su propia clave, lo que se consigue con el atributo *key*. Podemos indicar como clave algún campo único del elemento o el índice:
```html
\<... v-for="(elem,index) in todos" :key="index" ...>
```

## Eventos: v-on
Esta directiva captura un evento y ejecuta un método como respuesta al mismo.

<iframe width="100%" height="300" src="//jsfiddle.net/juansegura/255u8f1j/embedded/js,html,result/" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

El evento que queremos capturar se pone tras ':' y se indica el método que se ejecutará.

Fijaos en el método _delTodos()_ que para hacer referencia desde el objeto Vue a alguna variable o método se le antepone *this.*

Se puede pasar un parámetro a la función escuchadora:
```vue
<button v-on:click="pulsado('prueba')">Pulsa</button>
```
```javascript
  pulsado(valor) {
    alert(valor);
  }
```

Esta directiva se usa mucho así que se puede abreviar con '@'. El código equivalente sería:
```html
<button @click="pulsado('prueba')">Pulsa</button>
```

### Modificadores de eventos
A un evento gestionado por una directiva _v-on_ podemos añadirle (separado por .) un modificador. Alguno de los más usados son:
* _.prevent_: equivale a hacer un preventDefault()
* _.stop_: como stopPropagation()
* _.self_: sólo se lanza si el evento se produce en este elemento y no en alguno de sus hijos
* _.once_: sólo se lanza la primera vez que se produce el evento

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
* al hacer doble click en una cosa a hacer debe borrarse de la lista
* bajo la lista aparecerá un input con un botón para añadir nuevas cosas a la lista. Sólo se añade si hemos introducido texto y su estado al añadirla será de NO hecha
* debajo tendremos un botón que borrará toda la lista de cosas a hacer tras pedir confirmación al usuario

### Solución de la aplicación
Puedes ver una solución al problema planteado en:
<script async src="//jsfiddle.net/juansegura/qfbtewhe/embed/js,html,result/"></script>

Cosas a comentar:
* *HTML* 
  * línea 4: la directiva v-for además de crear una variable con el elemento crea otra con su posición dentro del array que usaremos para borrarla
  * línea 4: al método que llamamos al producirse el evento _dblclick_ le pasamos el índice de dicho elemento en el array de cosas a hacer
  * línea 7: enlazamos cada checkbox con la propiedad _done_ del elemento de forma que al marcar al checkbox la propiedad valdrá *true* y al desmarcarlo valdrá *false*
  * líneas 9 a 14: para mostrar un elemento no hecho usamos un span y para mostrar uno hecho un del para que aparezca tachado
  * línea 18: el input lo enlazamos a una nueva variable, _newTodo_, donde guardaremos lo que se escriba
* *Javascript* 
  * línea 4: creamos la nueva variable _newTodo_ para guardar el título de la nueva cosa a añadir. Lo inicializamos a una cadena vacía y así el input estará vacío de entrada
  * línea 26: delTodo recibe como parámetro el índice del elemento a borrar así que sólo tiene que hacer un splice al array
  * línea 29: addTodo añade al array un nuevo elemento con el texto que hay en el input y después vacía dicho texto
