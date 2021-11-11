# Comunicación entre componentes
- [Comunicación entre componentes](#comunicación-entre-componentes)
  - [Introducción](#introducción)
  - [Props (de padre a hijo)](#props-de-padre-a-hijo)
    - [No cambiar el valor de una prop](#no-cambiar-el-valor-de-una-prop)
    - [Validación de props](#validación-de-props)
    - [Pasar atributos de padre a hijo](#pasar-atributos-de-padre-a-hijo)
  - [Emitir eventos (de hijo a padre)](#emitir-eventos-de-hijo-a-padre)
    - [Capturar el evento en el padre: .native](#capturar-el-evento-en-el-padre-native)
    - [sync](#sync)
    - [Definir y validar eventos](#definir-y-validar-eventos)
  - [Bus de eventos](#bus-de-eventos)
  - [Compartir datos](#compartir-datos)
    - [$root y $parent](#root-y-parent)
    - [Store pattern](#store-pattern)
  - [Vuex](#vuex)
  - [Slots](#slots)
    - [Slots con nombre](#slots-con-nombre)
- [Aplicación de ejemplo](#aplicación-de-ejemplo)
  - [Solución con _Store pattern_](#solución-con-store-pattern)
  - [Solución con _Event Bus_ (Vue2)](#solución-con-event-bus-vue2)

## Introducción
Ya hemos visto que podemos pasar parámetros a un componente hijo mediante _props_. Esto permite la comunicación de padres a hijos, pero queda por resolver cómo comunicarse los hijos con sus padres para informarles de cambios o eventos producidos y cómo comunicarse otros componentes entre sí.

Nos podemos encontrar las siguientes situaciones:
* Comunicación de padres a hijos: _props_
* Comunicación de hijos a padres: emitir eventos
* Comunicación entre otros componentes: crear un componente que haga de _bus_ de comunicaciones (sólo Vue2) o usar el patrón _store pattern_
* Comunicación más compleja: Vuex

## Props (de padre a hijo)
Ya hemos visto que permiten pasar parámetros del padre al componente hijo. Si el valor del parámetro cambia en el padre automáticamente se reflejan esos cambios en el hijo.

Cualquier parámetro que pasemos sin _v-bind_ se considera texto. Si queremos pasar un número, booleano, array u objeto hemos de pasarlo con _v-bind_ igual que hacemos con las variables para que no se considere texto:
```html
<ul>
  <todo-item todo="Aprender Vue" :done="false" ></todo-item>
</ul>
```

Si pasamos un objeto en un atributo _v-bind_ sin nombre lo que estamos pasando son sus propiedades:
```html
<ul>
  <todo-item v-bind="{ todo: 'Aprender Vue', done: false }" ></todo-item>
</ul>
```
y en el componente se reciben sus propiedades separadamente:
```javascript
app.component('todo-item, {
  props: ['todo', 'done'],
  ...
```

### No cambiar el valor de una prop
Al pasar un parámetro mediante una _prop_ su valor se mantendrá actualizado en el hijo si su valor cambiara en el padre, pero no al revés por lo que no debemos cambiar su valor en el componente hijo.

Si tenemos que cambiar su valor porque lo que nos pasan es sólo un valor inicial asignaremos el parámetro a otra variable:
```javascript
props: ['initialValue'],
data(): {
  return {
    myValue: this.initialValue
  }
}
```

Igualmente si debemos darle determinado formato también lo haremos sobre la otra variable (en este caso mejor una _computed_), que es con la que trabajaremos:
```javascript
props: ['cadenaSinFormato'],
computed(): {
  cadenaFormateada() {
    return this.cadenaSinFormato.trim().toLowerCase();
  }
}
```

**OJO**: Si el parámetro es un objeto o un array éste se pasa por referencia por lo que si lo cambiamos en el componente hijo  **sí** se cambiará en el padre, lo que debemos evitar.

### Validación de props
Al recibir los parámetros podemos usar _sintaxis de objeto_ en lugar de _sintaxis de array_ y en ese caso podemos indicar algunas cosas como:
* **type**: su tipo (String, Number, Boolean, Array, Object, Date, Function, Symbol o una clase propia). Puede ser un array con varios tipos: `type: [Boolean, Number]`
* **default**: su valor por defecto si no se pasa ese parámetro
* **required**: si es o no obligatorio
* **validator**: una función que recibe como parámetro el valor del parámetro y devolverá true o false en función de si el valor es o no válido

Ejemplos:
```javascript
props: {
  nombre: {
    type: String,
    required: true
  },
  idPropietario: {
    type: [Boolean, Number],
    default: false
  },
  products: {
    type: Object,
    default(): { 
      return {id:0, units: 0} 
    }  // Si es un objeto o array _default_ debe ser una función que devuelva el valor
  },
  nifGestor: {
    type: String,
    required: true,
    validator(value): {
      return /^[0-9]{8}[A-Z]$/.test(value)   // Si devuelve *true* será válido
    }
  }
```

### Pasar atributos de padre a hijo
Además de los parámetros, que se reciben en _props_, el componente padre puede poner cualquier otro atributo en la etiqueta del hijo, quien lo recibirá se aplicará a su elemento raíz. A esos otros atributos puede acceder a través de `$attr`. Por ejemplo:
```html
<!-- componente padre -->
<date-picker id="now" data-status="activated" class="fecha"></date-picker>
```

```javascript
// Componente hijo
app.component('date-picker', {
  template: `
    <div class="date-picker">
      <input type="datetime" />
    </div>
  `,
  methods: {
    showAttributes() {
      console.log('Id: ' + this.$attrs.id + ', Data: ' + this.$attrs['data-status'])
    }
  }
})
```

El subcomponente se renderizará como:
```html
<div class="fecha date-picker" id="now" data-status="activated">
  <input type="datetime" />
</div>
```

y al ejecutar el método _showAttributes_ mostrará en la consola `Id: now, Data: activated`.

A veces no queremos que esos atributos se apliquen al elemento raíz del subcomponente sino a alguno interno (habitual si le pasamos escuchadores de eventos). En ese caso podemos deshabilitar la herencia de parámetros definiendo el atributo del componente `inheritAttrs` a _false_ y aplicándolos nosotros manualmente:
```html
<!-- componente padre -->
<date-picker id="now" data-status="activated" @input="dataChanged"></date-picker>
```

```javascript
// Componente hijo
app.component('date-picker', {
  inheritAttrs: false,
  template: `
    <div class="date-picker">
      <input type="datetime" v-bind="$attrs" />
    </div>
  `,
})
```

En este caso se renderizará como:
```html
<div class="date-picker">
  <input type="datetime" class="fecha" id="now" data-status="activated" @input="dataChanged" />
</div>
```

El componente padre está escuchando el evento _input_ sobre el \<INPUT> del componente hijo.

En Vue3, si el componente hijo tiene varios elementos raíz deberemos _bindear_ los _attrs_ a uno de ellos como acabamos de ver.

## Emitir eventos (de hijo a padre)
Si un componente hijo debe pasarle un dato a su padre o informarle de algo puede emitir un evento que el padre capturará y tratará convenientemente. Para emitir el evento el hijo hace:
```javascript
  this.$emit('nombreevento', parametro);
```

El padre debe capturar el evento como cualquier otro. En su HTML hará:
```html
<my-component @nombreevento="fnManejadora"
...
```

y en su JS tendrá la función para manejar ese evento:
```javascript
  ...
  methods: {
    fnManejadora(param) {
      ...
    },
  }
  ...
``` 

El componente hijo puede emitir cualquiera de los eventos estándar de JS ('click', 'change', ...) o un evento personalizado ('cambiado', ...).

**Ejemplo**: continuando con la aplicación de tareas que dividimos en componentes, en el componente **todo-item** en lugar de hacer un alert emitiremos un evento al padre:
```javascript
    delTodo() {
      this.$emit('delItem');
    },
  }
``` 
donde lo escuchamos y llamamos al método que borre el item:
```javascript
app.component('todo-list', {
  template: 
    `<div>
      <h2>{{ title }}</h2>
      <ul>
       <todo-item 
         v-for="(item, index) in todos" 
         :key="item.id"
         :todo="item"
         @delItem="delTodo(index)">
       </todo-item>
      </ul>
      <add-item></add-item>
      <br>
      <del-all></del-all>
  </div>`,
  methods: {
    delTodo(index){
      this.todos.splice(index,1);
    },
    ...
``` 

**NOTA**: En componentes y _props_ se hace la conversión automáticamente entre los nombres en Javascript escritos en camelCase y los usados en HTML en kebab-case pero esto no sucede con los eventos, por lo que en el código deberemos nombrarlos también en kebab-case.

### Capturar el evento en el padre: .native
En ocasiones (como en este caso) el componente hijo no hace nada más que informar al padre de que se ha producido un evento sobre él. En estos casos podemos hacer que el evento se capture directamente en el padre en lugar de en el hijo con el modificador **[.native](https://vuejs.org/v2/guide/components-custom-events.html#Binding-Native-Events-to-Components)** que permite que un evento se escuche en el elemento que llama al componente y no en el componente:
```javascript
app.component('todo-list', {
  template: 
    `<div>
      <h2>{{ title }}</h2>
      <ul>
       <todo-item 
         v-for="(item, index) in todos" 
         :key="item.id"
         :todo="item"
         @dblclick.native="delTodo(index)">
        </todo-item>
    ...`
``` 

Le estamos indicando a Vue que el evento _click_ se capture en _todo-list_ directamente por lo que el componente _todo-item_ no tiene que capturarlo ni hacer nada:
```javascript
app.component('todo-item', {
  props: ['todo'],
  template: 
    `<li>
      <label>
    ...`
``` 

### sync
Una alternativa a emitir eventos es "sincronizar" un parámetro pasado por el padre para que se actualice si se modifica en el hijo, lo que se hace con el modificador _.sync_, pero no es muy recomendable porque hace el código más difícil de mantener:
```html
<ul>
  <todo-item todo="Aprender Vue" :done.sync="false" ></todo-item>
</ul>
```
Si cambia el valor de _done_ en el hijo también cambiará en el padre.

### Definir y validar eventos
Los eventos que emite un componente pueden (y se recomienda por claridad) definirse en la opción _emits_:
```javascript
app.component('todo-item', {
  emits: ['toogle-done', 'dblclick'],
  props: ['todo'],
  ...
``` 

También podemos validar los argumentos que emite usando sintaxis de objeto en vez de array, similar a como hacemos con las _props_. Para ello el evento se asigna a una función que recibe como parámetro los aprámetros del evento y devuelve _true_ si es válido o _false_ si no lo es:
```javascript
app.component('custom-form', {
  emits: {
    // No validation
    click: null,

    // Validate submit event
    submit: ({ email, password }) => {
      if (email && password) {
        return true
      } else {
        console.warn('Invalid submit event payload!')
        return false
      }
    }
  },
```

En este ejemplo el componente emite _click_ que no se valida y _submit_ donde se valida que debe recibir 2 parámetros.

## Bus de eventos
**NOTA**: Esta funcionalidad ha sido eliminada de Vue3.

Si queremos pasar información entre varios componentes que no tienen por qué ser padres/hijos podemos crear un componente que haga de canal de comunicación y que incluiremos en cada componente que queramos comunicar:

En primer lugar creamos de forma global (fuera de cualquier componente) el objeto que gestione la comunicación entre componentes:
```javascript
var EventBus = new Vue;
```
En cada componente que queramos que escuche eventos de ese canal importamos el bus y creamos un escuchador en el hook _created_ o _mounted_:
```javascript
created() {
    EventBus.$on('nombreevento', this.fnManejadora)
    ...
},
methods: {
    fnManejadora(param) {
        ...
    })
```
Cada componente que queramos que emita al bus deberá también tener importado el _EventBus_. Para emitir, en el método del componente que queramos lanzamos el evento con:
```javascript
EventBus.$emit('nombreevento', param)
```

**NOTA IMPORTANTE**: esta implementación sólo funciona en Vue2. Para usar este método en Vue3 debemos instalar alguna librería externa como mitt o tiny-emiter tal y como se indica en la [Guía de migración a Vue3](https://v3.vuejs.org/guide/migration/events-api.html#_2-x-syntax). Podéis encontrar información de cómo hacerlo en Internet, por ejemplo en [stackoverflow](https://stackoverflow.com/questions/63471824/vue-js-3-event-bus).

## Compartir datos
Una forma más sencilla de modificar datos de un componente desde otros es compartiendo los datos entre ellos. Definimos (fuera de la instancia Vue y de cualquier componente) un objeto que contendrá todos los datos a compartir entre componentes y lo registramos en el _data_ de cada componente que tenga que acceder a él. Ejemplo:

```javascript
const store={
  message: '',
  newData: { },
  ...
}

app.component('comp-a', {
  ...
  data() {
    return {
      store,
      // y a continuación el resto de data del componente
      ...
    }
  },
  methods: {
    changeMessage(newMessage) {
      this.store.message=newMessage;
    }
  },
  ...
})

app.component('comp-b', {
  ...
  data() {
    return {
      store,
      // y a continuación el resto de data del componente
      ...
    }
  },
  methods: {
    delMessage() {
      this.store.message='';
    }
  },
  ...
})
```

Tanto desde _comp-a_ como desde _comp-b_ podemos modificar el contenido de **store** y esos cambios se reflejarán automáticamente tanto en la vista de _comp-a_ como en la de _comp-b_. 

Fijaos que declaro el objeto como una constante porque NO puedo cambiar su valor para que pueda ser usado por todos los componentes, pero sí el de sus propiedades.

Esta forma de trabajar tiene un grave inconveniente: el valor de cualquier dato puede ser modificado desde cualquier parte de la aplicación, lo que es una pesadilla a la hora de depurar el código y encontrar errores.

Para evitarlo podemos usar un patrón de almacén (_store pattern_) que veremos en el siguiente apartado.

### $root y $parent
Todos los componentes tienen acceso a los datos y métodos definidos en la instancia de Vue (donde hacemos el `new Vue`). Por ejemplo:

```javascript
new Vue({
  el: '#app',
  data: {
    message: 'Hola',
  },
  methods: {
    getInfo() {
  ...
}
```

Desde cualquier componente podemos hacer cosas como:
```javascript
console.log(this.$root.message);
this.$root.message='Adios';
this.$root.getInfo();
```

También es posible acceder a los datos y métodos del componente padre del actual usando `$parent` en lugar de `$root`.

De esta manera podríamos acceder directamente a datos del padre o usar la instancia de Vue como almacén (evitando crear el objeto **store** para compartir datos). Sin embargo, aunque esto puede ser útil en aplicaciones pequeñas, es difícil de mantener cuando nuestra aplicación crece por lo que se recomienda usar un **_Store pattern_** como veremos a continuación o **Vuex** si nuestra aplicación va a ser grande.

### Store pattern
Es una mejora sobre lo que hemos visto de compartir datos donde las acciones que modifican los datos del almacén están incluidas dentro del propio almacén, lo que facilita su seguimiento:

```javascript
const store={
  debug: true,
  state: {
    message: '',
    ...
  },
  setMessageAction (newValue) {
    if (this.debug) console.log('setMessageAction triggered with', newValue)
    this.state.message = newValue
  },
  clearMessageAction () {
    if (this.debug) console.log('clearMessageAction triggered')
    this.state.message = ''
  }
}

app.component('comp-a', {
  ...
  data() {
    return {
      sharedData: store.state,
      // o aún mejor declaramos sólo las variables que necesitemos, ej
      // message: store.state.message,
      ...
    }
  },
  methods: {
    changeMessage(newMessage) {
      store.setMessageAction(newMessage);
    }
  },
  ...
})

appcomponent('comp-b', {
  ...
  data() {
    return {
      sharedData: store.state,
      // y a continuación el resto de data del componente
      ...
    }
  },
  methods: {
    delMessage() {
      store.clearMessageAction();
    }
  },
  ...
})
```

**IMPORTANTE**: no podemos machacar ninguna variable del _state_ si es un objeto o un array, por ejemplo para cargar los datos de un array de productos:
```javascript
// Esto está MAL
loadProductsAction (products) {
 this.state.products = products;
}
```

ni para borrarlos todos podemos hacer
```javascript
// Esto está MAL
clearProductsAction () {
 this.state.products = [];
}
```

porque entonces el array _products_ dejaría de ser reactivo (lo estamos machacando con otro). Debemos usar métodos como _push_, _splice_, ...
```javascript
// Esto está BIEN
loadProductsAction (products) {
 products.forEach(product => this.state.products.push(product));
},
clearProductsAction () {
 this.state.products.splice(0, this.state.products.length);
}
```

## Vuex
Es un patrón y una librería para gestionar los estados en una aplicación Vue. Ofrece un almacenamiento centralizado para todos los componentes con unas reglas para asegurar que un estado sólo cambia de determinada manera. Es el método a utilizar en aplicaciones medias y grandes y le dedicaremos todo un tema más adelante.

En realidad es un _store pattern_ que ya tiene muchas cosas hechas así como herramientas de _debug_.

## Slots
Otra forma en que un componente hijo puede mostrar información del padre es usando _slots_. Un _slot_ es una ranura en un componente que, al renderizarse, se rellena con lo que le pasa el padre en el innerHTML de la etiqueta del componente. El _slot_ tienen acceso al contexto del componente padre, no al del componente donde se renderiza. Los _slots_ son una herramienta muy potente. Podemos obtener toda la información en la [documentación de Vue](https://v3.vuejs.org/guide/component-slots.html#slot-content). 

Ejemplo:
Tenemos un componente llamado _my-component_ con un slot:
```javascript
app.component('my-component', {
  template:
    `<div>
      <h3>Componente con un slot</h3>
      <slot><p>Esto se verá si no se pasa nada al slot</p></slot>
    </div>`
})
```

Si llamamos al componente con:
```html
<my-component>
  <p>Texto del slot</p>
</my-component>
```
se renderizará como:
```html
<div>
  <h3>Componente con un slot</h3>
  <p>Texto del slot</p>
</div>
```

Pero si lo llamamos con:
```html
<my-component>
</my-component>
```
se renderizará como:
```html
<div>
  <h3>Componente con un slot</h3>
  <p>Esto se verá si no se pasa nada al slot</p>
</div>
```

### Slots con nombre
A veces nos interesa tener más de 1 slot en un componente. Para saber qué contenido debe ir a cada slot se les da un nombre. 

Vamos a ver un ejemplo de un componente llamado _base-layout_ con 3 _slots_, uno para la cabecera, otro para el pie y otro principal:
```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

A la hora de llamar al componente hacemos:
```html
<base-layout>
  <template slot="header">
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template slot="footer">
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

Lo que está dentro de un _template_ con atributo _slot_ irá al_slot_ del componente con ese nombre. El resto del innerHTML irá al _slot_ por defecto (el que no tiene nombre).

El atributo _slot_ podemos ponérselo a cualquier etiqueta (no tiene que ser \<template>;
```html
<base-layout>
  <h1 slot="header">Here might be a page title</h1>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <p slot="footer">Here's some contact info</p>
</base-layout>
```

# Aplicación de ejemplo
Vamos a hacer que funcione la aplicación que separamos en componentes.

## Solución con _Store pattern_
Creamos el _store_ para el array de cosas a hacer que debe ser accesible desde varios componentes. En él incluimos métodos para añadir y borrar un nuevo _todo_, para cambiar el estado de un _todo_ y para borrarlos todos.

En el componente _todo_list_ debemos incluir el array _todos_ lo que haremos en su data. El resto de componentes no necesitan acceder al array, por lo que no lo incluimos e su data, pero sí llamarán a los métodos para cambiarlo.

**Solución con Vue3**:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="gOxKaEL" data-user="juanseguravasco" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/juanseguravasco/pen/gOxKaEL">
  to-do app components working</a> by Juan Segura (<a href="https://codepen.io/juanseguravasco">@juanseguravasco</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Fijaos que para que `todo-list` se entere de los cambios que se producen en `todos` se ha definido el array como `reactive`. Esto es nuevo de Vue3 (en Vue2 no es necesario)

**Solución con Vue2**:

<script async src="//jsfiddle.net/juansegura/o0951fzr/embed/"></script>

## Solución con _Event Bus_ (Vue2)
En primer lugar vamos a darle funcionalidad al botón de borrar toda la lista. En la función manejadora del componente sustituimos el _alert_ por
```javascript
this.$emit('delAll');
```
Ahora en el _template_ del componente padre capturaremos el evento _delAll_ (podríamos haber emitido también un 'click') y llamamos a la función que borrará toda la lista.

Con el botón de añadir haremos lo mismo pero en este caso al emitir el evento le pasaremos el texto a añadir:
```javascript
this.$emit('addTodo', this.newTodo);
```
Y la función manejadora lo recibe como parámetro (pero no se pone en el HTML):
```javascript
addTodo(title) {
    let maxId=this.todos.reduce((max,item)=>(item.id>max)?item.id:max, 0);
    this.todos.push({
      id: maxId+1,
      title: newTitle,
      done: newDone
    })
},
```

Lo mismo hacemos con el _dblclick_ sobre cada elemento de la lista para borrarlos.

Por último vemos que en el checkbox del componente _todo-item_ estamos modificando el valor de un parámetro (cambiamos el _done_ de la tarea). Esto funciona porque lo que nos están pasando es un objeto (que se pasa por referencia) y no las propiedades independientemente (que se pasarían por copia) pero no debemos hacerlo así.

Para evitarlo cambiamos el _v-model_ que es bidireccional (al modificar el checkbox se modifica la propiedad _done_) por un _v-bind_ es es unidireccional más una función que avisará al componente padre al cambiar el valor del checkbox para que cambie el valor de la tarea.

**Solución**:

<script async src="//jsfiddle.net/juansegura/suj34rpy/embed/"></script>

