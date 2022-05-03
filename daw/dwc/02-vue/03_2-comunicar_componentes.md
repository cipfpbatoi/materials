# Comunicación entre componentes
- [Comunicación entre componentes](#comunicación-entre-componentes)
  - [Introducción](#introducción)
  - [Props (de padre a hijo)](#props-de-padre-a-hijo)
    - [Nunca cambiar el valor de una prop](#nunca-cambiar-el-valor-de-una-prop)
    - [Validación de props](#validación-de-props)
    - [Pasar atributos de padre a hijo](#pasar-atributos-de-padre-a-hijo)
  - [Emitir eventos (de hijo a padre)](#emitir-eventos-de-hijo-a-padre)
    - [Capturar el evento en el padre](#capturar-el-evento-en-el-padre)
    - [Definir y validar eventos](#definir-y-validar-eventos)
  - [Compartir datos](#compartir-datos)
    - [$root y $parent](#root-y-parent)
    - [Store pattern](#store-pattern)
  - [Pinia](#pinia)
  - [Slots](#slots)
    - [Slots con nombre](#slots-con-nombre)
- [Aplicación de ejemplo](#aplicación-de-ejemplo)
  - [Solución con _Store pattern_](#solución-con-store-pattern)

## Introducción
Cada componente tiene sus propios datos que son **datos de nivel de componente**, pero hay ocasiones en que varios componentes necesitan acceder a los mismos datos. Es lo que nos sucede en nuestra aplicación de ejemplo donde varios componentes necesitan acceder a la lista de tareas (_todos_) para mostrarla (_todo-list_), añadir items (_todo-add_) o borrarla (_todo-del-all_).

Estos datos se consideran **datos de nivel de aplicación** y hay varias formas de tratarlos.

Ya hemos visto que podemos pasar información a un componente hijo mediante _props_. Esto permite la comunicación de padres a hijos, pero queda por resolver cómo comunicarse los hijos con sus padres para informarles de cambios o eventos producidos y cómo comunicarse otros componentes entre sí.

Nos podemos encontrar las siguientes situaciones:
* Comunicación de padres a hijos: _props_
* Comunicación de hijos a padres: emitir eventos
* Comunicación entre otros componentes: usar el patrón _store pattern_
* Comunicación más compleja: Pinia

## Props (de padre a hijo)
Ya hemos visto que podemos pasar parámetros del padre al componente hijo. Si el valor del parámetro cambia en el padre automáticamente se reflejan esos cambios en el hijo.

NOTA: Cualquier parámetro que pasemos sin _v-bind_ se considera texto. Si queremos pasar un número, booleano, array u objeto hemos de pasarlo con _v-bind_ igual que hacemos con las variables para que no se considere texto:
```html
<ul>
  <todo-item todo="Aprender Vue" :done="false" ></todo-item>
</ul>
```

Si queremos pasar varios parámetros a un componente hijo podemos pasarle un objeto en un atributo _v-bind_ sin nombre y lo que recibirá el componente hijo son sus propiedades:
```vue
<template>
  <ul>
    <todo-item v-bind="propsObject" ></todo-item>
  </ul>
</template>

<script>
  ...
  data() {
    return {
      propsObject: { 
        todo: 'Aprender Vue', 
        done: false
      }
    }
  }
  ...
```
y en el componente se reciben sus parámetros separadamente:
```javascript
app.component('todo-item, {
  props: ['todo', 'done'],
  ...
```

También es posible que el nombre de un parámetro que queramos pasar sea una variable:
```vue
<child-component :[paramName]="valorAPasar" ></child-component>
```

| Haz el ejercicio del tutorial de [Vue.js](https://vuejs.org/tutorial/#step-12)

### Nunca cambiar el valor de una prop
Al pasar un parámetro mediante una _prop_ su valor se mantendrá actualizado en el hijo si su valor cambiara en el padre, pero no al revés por lo que no debemos cambiar su valor en el componente hijo (de hecho VUe3 no nos lo permite).

Si tenemos que cambiar su valor porque lo que nos pasan es sólo un valor inicial podemos asignar el parámetro a otra variable:
```javascript
props: ['initialValue'],
data(): {
  return {
    myValue: this.initialValue
  }
}
```

Igualmente si debemos darle determinado formato podemos hacerlo sobre la otra variable (en este caso mejor una _computed_), que es con la que trabajaremos:
```javascript
props: ['cadenaSinFormato'],
computed(): {
  cadenaFormateada() {
    return this.cadenaSinFormato.trim().toLowerCase();
  }
}
```

**OJO**: Si el parámetro es un objeto o un array éste se pasa por referencia por lo que si lo cambiamos en el componente hijo  **sí** se cambiará en el padre, cosa que debemos evitar.

### Validación de props
Al recibir los parámetros podemos usar _sintaxis de objeto_ en lugar de _sintaxis de array_ y en ese caso podemos indicar algunas cosas como:
* **type**: su tipo (String, Number, Boolean, Array, Object, Date, Function, Symbol o una clase propia). Puede ser un array con varios tipos: `type: [Boolean, Number]`
* **default**: su valor por defecto si no se pasa ese parámetro
* **required**: si es o no obligatorio
* **validator**: una función que recibe como parámetro el valor del parámetro y devolverá true o false en función de si el valor es o no válido

Ejemplos:
```javascript
props: {
  nombre: String,
  apellidos: {
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
Además de los parámetros, que se reciben en _props_, el componente padre puede poner cualquier otro atributo en la etiqueta del hijo, quien lo recibirá y se aplicará a su elemento raíz. A esos atributos se puede acceder a través de `$attr`. Por ejemplo:
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
  this.$emit('nombre-evento', parametro);
```

El padre debe capturar el evento como cualquier otro. En su HTML hará:
```html
<my-component @nombre-evento="fnManejadora"
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
      this.$emit('del-item');
    },
  }
``` 
y en _todo-list_ lo escuchamos y llamamos al método que borre el item:

`todo-list.vue`
```vue
<template>
    <div>
      <h2>{{ title }}</h2>
      <ul>
       <todo-item 
         v-for="(item, index) in todos" 
         :key="item.id"
         :todo="item"
         @del-item="delTodo(index)">
       </todo-item>
      </ul>
      <add-item></add-item>
      <br>
      <del-all></del-all>
    </div>
</template>

<script>
  ...
  methods: {
    delTodo(index){
      this.todos.splice(index,1);
    },
  ...
``` 

**NOTA**: En componentes y _props_ se hace la conversión automáticamente entre los nombres en Javascript escritos en camelCase y los usados en HTML en kebab-case pero esto no sucede con los eventos, por lo que en el código deberemos nombrarlos también en kebab-case.

| Haz el ejercicio del tutorial de [Vue.js](https://vuejs.org/tutorial/#step-13)

### Capturar el evento en el padre
En ocasiones (como en este caso) el componente hijo no hace nada más que informar al padre de que se ha producido un evento sobre él. En estos casos podemos hacer que el evento se capture directamente en el padre en lugar de en el hijo:
`todo-list.vue`
```vue
<template>
    <div>
      <h2>{{ title }}</h2>
      <ul>
       <todo-item 
         v-for="(item, index) in todos" 
         :key="item.id"
         :todo="item"
         @dblclick="delTodo(index)">
        </todo-item>
    ...
</template>
``` 

Le estamos indicando a Vue que el evento _dblclick_ se capture en _todo-list_ directamente por lo que el componente _todo-item_ no tiene que capturarlo ni hacer nada:

`todo-item.vue`
```vue
<template>
    <li>
      <label>
    ...
``` 

### Definir y validar eventos
Los eventos que emite un componente pueden (y se recomienda por claridad) definirse en la opción _emits_:
```javascript
app.component('todo-item', {
  emits: ['toogle-done', 'dblclick'],
  props: ['todo'],
  ...
``` 

Es recomendable definir los argumentos que emite usando sintaxis de objeto en vez de array, similar a como hacemos con las _props_. Para ello el evento se asigna a una función que recibe como parámetro los parámetros del evento y devuelve _true_ si es válido o _false_ si no lo es:
`custom-form.vue`
```vue
<script>
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

En este ejemplo el componente emite _click_ que no se valida y _submit_ donde se valida que reciba 2 parámetros.

## Compartir datos
Una forma más sencilla de modificar datos de un componente desde otros es compartiendo los datos entre ellos. Definimos en un fichero _.js_ aparte un objeto que contendrá todos los datos a compartir entre componentes, lo importamos y lo registramos en el _data_ de cada componente que tenga que acceder a él. Ejemplo:

`/src/datos.js`
```javascript
import { reactive } from 'vue';

export const store = reactive({
  message: '',
  newData: { },
  ...
})
```

NOTA: En Vue3 para que la variable store sea reactiva (que la vista reaccione a los cambios que se produzcan en ella) hay que declararla con `reactive`.

`comp-a.vue`
```vue
import { store } from '/src/datos.js'
<script>
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

`comp-b.vue`
```vue
import { store } from '/src/datos.js'
<script>
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

Fijaos que se declara el objeto _store_ como una constante porque NO puedo cambiar su valor para que pueda ser usado por todos los componentes, pero sí el de sus propiedades.

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

De esta manera podríamos acceder directamente a datos del padre o usar la instancia de Vue como almacén (evitando crear el objeto **store** para compartir datos). Sin embargo, aunque esto puede ser útil en aplicaciones pequeñas, es difícil de mantener cuando nuestra aplicación crece por lo que se recomienda usar un **_Store pattern_** como veremos a continuación o **Pinia** si nuestra aplicación va a ser grande.

### Store pattern
Es una mejora sobre lo que hemos visto de compartir datos. Para evitar que cualquier componente pueda modificar los datos compartidos en el almacén, las acciones que modifican dichos datos están incluidas dentro del propio almacén, lo que facilita su seguimiento:

`/src/datos.js`
```javascript
import { reactive } from 'vue';

export const store={
  debug: true,
  state: reactive({
    message: '',
    ...
  }),
  setMessageAction (newValue) {
    if (this.debug) console.log('setMessageAction triggered with', newValue)
    this.state.message = newValue
  },
  clearMessageAction () {
    if (this.debug) console.log('clearMessageAction triggered')
    this.state.message = ''
  }
}
```

`comp-a.vue`
```vue
import { store } from '/src/datos.js'
<script>
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

`comp-b.vue`
```vue
import { store } from '/src/datos.js'
<script>
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

**IMPORTANTE**: no podemos machacar ninguna variable del _state_ si es un objeto o un array, por ejemplo para borrar los datos de un array no podemos hacer
```javascript
// Esto está MAL
clearProductsAction () {
 this.state.products = [];
}
```

porque entonces el array _products_ dejaría de ser reactivo (lo estamos machacando con otro). Debemos usar métodos como _push_, _splice_, ...
```javascript
// Esto está BIEN
clearProductsAction () {
 this.state.products.splice(0, this.state.products.length);
}
```

## Pinia
Es un patrón y una librería para gestionar los estados en una aplicación Vue. Ofrece un almacenamiento centralizado para todos los componentes con unas reglas para asegurar que un estado sólo cambia de determinada manera. Es el método a utilizar en aplicaciones medias y grandes y le dedicaremos todo un tema más adelante. En Vue2 y anteriores la librería que se usaba es _Vuex_.

En realidad es un _store pattern_ que ya tiene muchas cosas hechas así como herramientas de _debug_.

Lo veremos en detalla en el tema dedicado a esta librería.

## Slots
Otra forma en que un componente hijo puede mostrar información del padre es usando _slots_. Un _slot_ es una ranura en un componente que, al renderizarse, se rellena con lo que le pasa el padre en el innerHTML de la etiqueta del componente. El _slot_ tiene acceso al contexto del componente padre, no al del componente donde se renderiza. Los _slots_ son una herramienta muy potente. Podemos obtener toda la información en la [documentación de Vue](https://v3.vuejs.org/guide/component-slots.html#slot-content). 

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

| Haz el ejercicio del tutorial de [Vue.js](https://vuejs.org/tutorial/#step-14)

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

El atributo _slot_ podemos ponérselo a cualquier etiqueta (no tiene que ser \<template>):
```html
<base-layout>
  <h1 slot="header">Here might be a page title</h1>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <p slot="footer">Here's some contact info</p>
</base-layout>
```

# Aplicación de ejemplo
Vamos a hacer que funcione la aplicación que tenemos hecha en **vue-cli**.

## Solución con _Store pattern_
Creamos el _store_ para el array de cosas a hacer que debe ser accesible desde varios componentes. En él incluimos métodos para añadir un nuevo _todo_, para borrar uno, para cambiar el estado de un _todo_ y para borrarlos todos.

En el componente _todo_list_ debemos incluir el array _todos_ lo que haremos en su data. El resto de componentes no necesitan acceder al array, por lo que no lo incluimos en su data, pero sí llamarán a los métodos para cambiarlo.

Respecto al _todo-item_ debe cambiar los datos tanto al hacer doble click (se borra la tarea) como al marcar/desmarcar el checkbox (se cambia el estado de la tarea).

<iframe src="https://codesandbox.io/embed/todo-app-with-vue-cli-it-works-fnen9g?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="ToDo App with vue-cli (it works!!!)"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>