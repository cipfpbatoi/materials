<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
Tabla de contenidos

- [Componentes](#componentes)
  - [Registrar un componente](#registrar-un-componente)
  - [Parámetros: _props_](#par%C3%A1metros-_props_)
  - [A tener en cuenta](#a-tener-en-cuenta)
    - [_template_ debe contener un único elemento](#_template_-debe-contener-un-%C3%BAnico-elemento)
    - [_data_ debe ser una función](#_data_-debe-ser-una-funci%C3%B3n)
    - [Registrar un componente localmente](#registrar-un-componente-localmente)
  - [Ejemplo de aplicación](#ejemplo-de-aplicaci%C3%B3n)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Componentes
El sistema de componentes es un concepto importante en Vue y en cualquier framework moderno. En lugar de separar nuestra aplicación en ficheros según el tipo de información que contienen (ficheros html, css o js) es más lógico separarla según su funcionalidad. Una página web muestra una UI donde se pueden distinguir diferentes partes. En el siguiente ejemplo tenemos:

![Ejemplo de págna web](../img/borsa.png)

- un menú que es una lista de elementos del menú, cada uno formado por un logo y un texto
- un título
- una tabla con la información a mostrar, formada por
  - un elemento para filtrar la información formado por un input y un botón de buscar
  - un botón para añadir nuevos elementos a la tabla
  - una cabecera con los nombres de cada campo
  - una fila para mostrar cada elemento de información, con botones para realizar acciones
  - un pie de tabla con información sobre los datos mostrados
- un pie de página

Pues estos elementos podrían constituir diferentes componentes: nuestras aplicaciones estarán compuestas de pequeños componentes independiantes y reusables en diferentes partes de nuestra aplicación o en otras aplicaciones (podemos usar el elemento de buscar para otras páginas de nuestra web o incluso para otras aplicaciones). También es habitual que un componente contenga otros subcomponentes, estableciéndose relaciones padre-hijo (por ejemplo en componente fila contendrá un subcomponente por cada botón que queramos poner en ella).

Para sabér qué debe ser un componente y que no podemos considerar un componente como un elemento que tiene entidad propia, tanto a nivel funcional como visual, es decir, que puede ponerse en el lugar que queramos de la aplicación y se verá y funcionará correctamente. Además es algo que es muy posible que pueda aparecer en más de un lugar de la aplicación. En definitiva un componente:
- es una parte de la UI
- debe poder reutilizarse y combinarse con otros componentes para formar componentes mayores
- son objetos JS

El componete tendrá una parte de HTML donde definimos su estructura y una parte JS que le da su funcionalidad. Puede además tener o no CSS para establecer su apariencia.

Separar nuestra aplicación en componentes nos va a ofrecer muchas ventajas:
* encapsulamos el código de la aplicación en elementos más sencillos
* facilita la reutilización de código
* evita tener código repetido

El primer paso a la hora de hacer una aplicación debe ser analizar qué componentes tendrá

En definitiva nuestra aplicación será como un árbol de componentes con la instancia principal de Vue como raíz.
![Árbol de componentes](https://vuejs.org/images/components.png)

## Registrar un componente
Para registrarlo debemos darle un nombre y definir el objeto con sus _data_, _methods_, _template_ (el código HTML que se insertará donde pongamos el componente), etc. Lo hacemos en nuestro fichero JS:
```javascript
Vue.component('todo-item', {
  template: '<li>Cosa a hacer</li>'
})
```
El nombre de un componente puede estar el kebab-case (my-component-name) o en PascalCase (MyComponentName). Se recomienda que el nombre de un componente tenga al menos 2 palabras para evitar que pueda llamarse como alguna futura etiqueta HTML.

Ahora ya podemos usar el componente en nuestro HTML:
```html
<ul>
  <todo-item></todo-item>
</ul>
```
>**Resultado:**
><ul>
>  <li>Cosa a hacer</li>
></ul>

Podemos utilizar la etiqueta tal cual (_<todo-item>_) o ponerla como valor del atributo _is_:
```html
<ul>
  <li is="todo-item"></li>
</ul>
```
De esta forma evitamos errores de validación de HTML ya que algunos elementos sólo pueden tener determinados elementos hijos (por ejemplo los hijos de un \<ul> deben ser \<li> o los de un \<tr> deben ser \<td>).

## Parámetros: _props_
Podemos pasar parámetros a un componente anñadiendo atributos a su etiqueta:
```html
<ul>
  <todo-item todo="Aprender Vue"></todo-item>
</ul>
```
El parámetro lo recibimos en el componente en _props_:
```javascript
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{ { todo.title }}</li>'
})
```
NOTA: si un parámetro tiene más de 1 palabra en el HTML lo pondremos en forma kebeb-case (ej.: `<todo-item :todo-elem=...>`) pero en el Javascript irá en camelCase (`Vue.component('todo-item',{ props: ['todoElem'],...})`).

>**Resultado:**
><ul>
>  <li>Aprender Vue</li>
></ul>

Lo que pasamos como parámetro a un componente se considera como _String_. Para pasar una variable o expresión JS debemos hacerlo con la directiva _v-bind_:
```html
<ul>
  <todo-item :todo="todos[0]"></todo-item>
</ul>
```

En nuestro caso queremos un componente _todo-item_ para cada elemento del array _todos_:
```html
<ul>
  <todo-item v-for="item in todos" :key="item.id" :todo="item"></todo-item>
</ul>
```
>**Resultado:**
><ul>
  >  <li>Learn JavaScript</li>
  >  <li> Learn Vue</li>
  >  <li>Play around in JSFiddle</li>
  >  <li>Build something awesome>Cosa a hacer</li>
></ul>

NOTA: al usar _v-for_ con un componente debemos indicarle en la propiedad _key_ la clave de cada elemento.

## A tener en cuenta
A la hora de definir componentes hay un par de cosa que debemos tener en cuenta

### _template_ debe contener un único elemento
El template de un componente debe tener un único elemento raíz por lo que, si queremos tener más de uno hay que englobarlos en un elemento (normalmente un <div>):

```javascript
// MAL
Vue.component('my-comp', {
  template: `<input id="query">
             <button id="search">Buscar</button>`,
})

// BIEN
Vue.component('my-comp', {
  template: `<div>
               <input id="query">
               <button id="search">Buscar</button>
             </div>`,
})
```

### _data_ debe ser una función
Un componente puede tener sus propios métodos y datos pero estos últimos no pueden devolverse directamente sino que _data_ debe ser una función:

```javascript
// MAL
Vue.component('my-comp', {
  data: {
    message: 'Hello',
    counter: 0
  }
})
```

```javascript
// BIEN
Vue.component('my-comp', {
  data(): {
    return {
      message: 'Hello',
      counter: 0
    }
  }
})
```

### Registrar un componente localmente
Un componente registrado como hemos visto es _global_ y puede usarse en cualquier instancia raíz de Vue creada posteriormente (con _new Vue()_ ) y también dentro de subcomponentes de dicha instancia.

Pero a veces queremos registrar un componente _localmente_ de forma que sólo se pueda usar localmente dentro de la instancia Vue o del subcomponente en que se registra.

En ese caso el componente a registrar se guarda en un objeto
```javascript
var ComponentA={ /* .... */ }
```
y se registra en cada instancia o subcomponente en que quiera usarse:
```javascript
// Para usarlo en la instancia raíz
new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA,
  }
})

// Para usarlo en un subcomponente
var ComponentB={ 
  ...,
  components: {
    'component-a': ComponentA,
  }
}
```
Si estamos usando ES2015 (que es lo normal) loque se hace es guardar cada componente en un fichero con extensión _.vue_ e importarlo donde vaya a usarse:
```javascript
// fichero ComponentB.vue
import ComponentA from './ComponentA.vue'

export default { 
  ...,
  components: {
    ComponentA,
  }
}
```

## Ejemplo de aplicación
Para empezar a ver el uso de componentes vamos a seguir con la aplicación de la lista de cosas que hacer pero dividiéndola en componentes.

La decisión de qué componentes crear es subjetiva pero en principio cuanto más descomponamos más posibilidades tendremos de reutilizar componentes. Nosotros haremos los siguientes componentes:
* todo-list: engloba toda la aplicación. Dentro tendrá:
  * todo-item: cada una de las tareas a hacer
  * add-item: incluye el input para introducir una nueva tarea y el botón de añadirla
  * del-all: el botón para borrar toda la lista
  
**Solución**:
<script async src="//jsfiddle.net/juansegura/3yoLvmnt/embed/"></script>

**Pasos que he hecho**:
1. Creo el componente más básico, _todo-item_. 
    1. recibirá un objeto con la tarea a mostrar
    1. su template será el <li> que tenía en el HTML pero quitando el _v-for_ porque él sólo se encarga de mostrar 1 item
    1. el método para borrarlo al hacer doble click ya no puede funcionar porque el componente no tiene acceso al array de tareas. De momento sólo ponemos un _alert_ que nos diga que lo queremos borrar
1. Creo el componente _add-item_.
    1. su _template_ será el \<input> y el \<button> que teníamos en el HTML, pero como sólo puede haber un elemento en el template los incluimos dentro de un <div>
    1. no recibe ningún parámetro pero sí tiene una variable propia, _newTodo_, que quitamos del componente principal para añadirla a este componente
    1. el método addTodo ya no funciona porque no tengo acceso al array de tareas así que de momento muestro un _alert_ con lo que querría añadir
1. Creo el componente _del-all_
    1. su _template_ es el botón
    1. ni recibe parámetros ni tiene variables propias
    1. con el método pasa lo mismo que en los otros casos así que simplemente muestro un _alert_
1. Creo el componente principal _todo-list_ que incluirá los otros. Este componente no tiene mucho sentido porque incluye toda la aplicación pero así lo podré reutilizar en otras aplicaciones donde quiera también incluir una lista.
    1. Su _template_ es un div que incluya el título (que podría ser variable para poderlo reutilizar) la lista con los componentes todo-item y los componentes de añadir y borrar todo
    1. como parámetro recibirá el título de la lista como hemos indicado antes
    1. su dato será el array de tareas
    1. Los métodos los dejamos tal cual aunque ahora no funcionan porque nadie los llama. Ya lo arreglaremos
  
