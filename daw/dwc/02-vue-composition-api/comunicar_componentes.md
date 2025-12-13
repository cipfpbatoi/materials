# Comunicación entre componentes
- [Comunicación entre componentes](#comunicación-entre-componentes)
  - [Introducción](#introducción)
  - [Props (de padre a hijo)](#props-de-padre-a-hijo)
    - [Validación de props](#validación-de-props)
    - [Pasar varios parámetros](#pasar-varios-parámetros)
    - [Nunca cambiar el valor de una prop](#nunca-cambiar-el-valor-de-una-prop)
    - [Pasar otros atributos de padre a hijo](#pasar-otros-atributos-de-padre-a-hijo)
    - [Provide / Inject](#provide--inject)
  - [Emitir eventos (de hijo a padre)](#emitir-eventos-de-hijo-a-padre)
    - [Definir y validar eventos](#definir-y-validar-eventos)
    - [Capturar el evento en el padre](#capturar-el-evento-en-el-padre)
  - [Compartir datos](#compartir-datos)
    - [Store pattern](#store-pattern)
  - [Aplicación de ejemplo](#aplicación-de-ejemplo)
  - [Pinia](#pinia)
  - [Slots](#slots)
    - [Slots con nombre](#slots-con-nombre)
    - [Acceder a datos del hijo desde el padre con _slot_](#acceder-a-datos-del-hijo-desde-el-padre-con-slot)

## Introducción
Cada componente tiene sus propios datos que son **datos de nivel de componente**, pero hay ocasiones en que varios componentes necesitan acceder a los mismos datos. Es lo que nos sucede en nuestra aplicación de ejemplo donde varios componentes necesitan acceder a la lista de tareas (variable _todos_) para mostrarla (_todo-list_), añadir items (_todo-add_) o borrarla (_todo-del-all_).

Estos datos se consideran **datos de nivel de aplicación** y hay varias formas de tratarlos.

Ya hemos visto que podemos pasar información a un componente hijo mediante _props_. Esto permite la comunicación de padres a hijos, pero queda por resolver cómo comunicarse los hijos con sus padres para informarles de cambios o eventos producidos y cómo comunicarse otros componentes entre sí.

Nos podemos encontrar las siguientes situaciones:
* Comunicación de padres a hijos: paso de parámetros (**_props_**)
* Comunicación de hijos a padres: emitir eventos (**_$emit_**)
* Comunicación entre otros componentes: usar el patrón **_store pattern_**
  * Comunicación _store pattern_ más compleja: usar librerías como **_Pinia_** que se encarguenarán de gestionar el almacén de datos de la aplicación

## Props (de padre a hijo)
Ya hemos visto que podemos pasar parámetros del padre al componente hijo. Si el valor del parámetro cambia en el padre automáticamente se reflejan esos cambios en el hijo.

Los parámetros se pasan como variables definidas en la etiqueta del componente hijo:
```html
<ul>
  <todo-item title="Aprender Vue" done="false" ></todo-item>
</ul>
```


En _Options API_ debemos declarar en el componente hijo los parámetros que vamos a recibir en la opción `props`:
```javascript
export default {
  props: ['title', 'done'],
};
```

Una vez declarados podemos acceder a ellos en el _template_ como `title` y `done` y en el _script_ `this.title` y `this.done`.

En _Composition API_ se hace de forma similar pero usando `defineProps`:
```vue
<script setup>
import { defineProps } from 'vue';

defineProps(['title', 'done']);
</script>
```

Y en el _template_ se accede igual que en _Options API_ como `title` y `done`. Si necesitamos acceder a ellos en el _script_ los asignamos a una variable:
```vue
<script setup>
import { defineProps } from 'vue';
const props = defineProps(['title', 'done']);
</script>
```

y en el _script_ se accede como `props.title` y `props.done`.

**NOTA**: Cualquier parámetro que pasemos sin _v-bind_ se considera texto. Si queremos pasar un número, booleano, array u objeto hemos de pasarlo con _v-bind_ igual que hacemos con las variables para que no se considere texto:
```html
<ul>
  <todo-item title="Aprender Vue" :done="false" ></todo-item>
</ul>
```

### Validación de props
Al recibir los parámetros podemos usar _sintaxis de objeto_ en lugar de _sintaxis de array_ y en ese caso podemos indicar algunas cosas como:
* **type**: su tipo (String, Number, Boolean, Array, Object, Date, Function, Symbol o una clase propia). Puede ser un array con varios tipos: `type: [Boolean, Number]`
* **default**: su valor por defecto si no se pasa ese parámetro
* **required**: si es o no obligatorio
* **validator**: una función que recibe como parámetro el valor del parámetro y devolverá true o false en función de si el valor es o no válido

Ejemplos:

```javascript
defineProps({
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
});
```

### Pasar varios parámetros
Si queremos pasar varios parámetros a un componente hijo podemos pasarle cada uno como en el ejemplo anterior:
```html
<ul>
  <todo-item title="Aprender Vue" :done="false" ></todo-item>
</ul>
```

o bien un único objeto en un atributo _v-bind_ sin nombre y lo que recibirá el componente hijo son sus propiedades:
```vue
<template>
  <ul>
    <todo-item v-bind="propsObject" ></todo-item>
  </ul>
</template>

<script setup>
  ...
  const propsObject = ref({ 
    title: 'Aprender Vue', 
    done: false
  })
  ...
</script>
```

y en el componente se reciben sus parámetros separadamente:
```javascript
// todo-item.vue
  ...
  defineProps({
    title: String,
    done: Boolean
  })
  ...
```

También es posible que el nombre de un parámetro que queramos pasar sea una variable:
```vue
<child-component :[paramName]="valorAPasar" ></child-component>
```

| Haz el ejercicio del tutorial de [Vue.js](https://vuejs.org/tutorial/#step-12)

### Nunca cambiar el valor de una prop
Al pasar un parámetro mediante una _prop_ su valor se mantendrá actualizado en el hijo si su valor cambiara en el padre, pero no al revés por lo que no debemos cambiar su valor en el componente hijo (de hecho _Vue3_ no nos lo permite).

Si tenemos que cambiar su valor porque lo que nos pasan es sólo un valor inicial podemos crear una variable local a la que le asignamos como valor inicial el parámetro pasado:

```javascript
const props = defineProps(['initialValue']);
const myValue = ref(props.initialValue);
```

Y en el componente usaremos la nueva variable _myValue_.

Si no necesitamos cambiarla sino sólo darle determinado formato a la variable pasada lo haremos creando una nueva variable (en este caso mejor una _computed_), que es con la que trabajaremos:

```javascript
const props = defineProps(['cadenaSinFormato']);
const cadenaFormateada = computed(() => {
  return props.cadenaSinFormato.trim().toLowerCase()
});
```

**OJO**: Si el parámetro es un objeto o un array éste se pasa por referencia por lo que si lo cambiamos en el componente hijo **sí** se cambiará en el padre, cosa que debemos evitar.

### Pasar otros atributos de padre a hijo
Además de los parámetros, que se reciben en _props_, el componente padre puede poner cualquier otro atributo en la etiqueta del hijo, quien lo recibirá y se aplicará a su elemento raíz. A esos atributos se puede acceder a través de `$attr`. Por ejemplo:
```html
<!-- componente padre -->
<date-picker id="now" data-status="activated" class="fecha"></date-picker>
```

```vue
// Componente hijo date-picker.vue
<template>
  <div class="date-picker">
    <input type="datetime" />
  </div>
</template>

<script setup>
  ...
  const showAttributes = () => {
    console.log('Id: ' + $attrs.id + ', Data: ' + $attrs['data-status'])
  }
  ...
</script>
```

El subcomponente se renderizará como:
```html
<div class="fecha date-picker" id="now" data-status="activated">
  <input type="datetime" />
</div>
```

y al ejecutar el método _showAttributes_ mostrará en la consola `Id: now, Data: activated`.

También podemos hacer que esos atributos no se apliquen al elemento raíz del subcomponente sino a alguno interno (habitual si le pasamos escuchadores de eventos). En ese caso podemos deshabilitar la herencia de parámetros definiendo el atributo del componente `inheritAttrs` a _false_ y aplicándolos nosotros manualmente:
```html
<!-- componente padre -->
<date-picker id="now" data-status="activated" @input="dataChanged"></date-picker>
```

```javascript
// Componente hijo date-picker.vue
<template>
    <div class="date-picker">
      <input type="datetime" v-bind="$attrs" />
    </div>
</template>

<script>
  ...
  inheritAttrs: false,
  ...
</script>
```

En este caso se renderizará como:
```html
<div class="date-picker">
  <input type="datetime" class="fecha" id="now" data-status="activated" @input="dataChanged" />
</div>
```

El componente padre está escuchando el evento _input_ sobre el \<INPUT> del componente hijo.

Y si el componente hijo tiene varios elementos raíz también deberemos _bindear_ los _attrs_ a uno de ellos como acabamos de ver.

### Provide / Inject
En ocasiones necesitamos pasar datos desde un componente padre a un componente que no es su hijo directo sino descendiente del mismo. En estos casos podemos usar _provide/inject_.

Podemos ampliar la información en la [documentación oficial de Vue](https://vuejs.org/guide/components/provide-inject.html).

## Emitir eventos (de hijo a padre)
Si un componente hijo debe pasarle un dato a su padre o informarle de algo puede emitir un evento que el padre capturará y tratará convenientemente. El componente hijo puede emitir un evento desde el su _template_ o desde su _script_. Para emitir el evento desde el _template_ el hijo hace:
```html
<button @click="$emit('nombreEvento', parametro)">Haz algo</button>
```

Para hacerlo desde el _script_, en sintaxis _Options API_:
```javascript
this.$emit('nombreEvento', parametro)
```

y en sintaxis _Composition API_:
```javascript
const emit = defineEmits(['nombreEvento'])

emit('nombreEvento', parametro)
```

El padre debe capturar el evento como cualquier otro. En su HTML hará:
```html
<my-component @nombre-evento="fnManejadora" ... />
```

y en su _script_ tendrá la función para manejar ese evento. En _Options API_:
```javascript
  methods: {
    fnManejadora(param) {
      ...
    },
  }
  ...
``` 

o en _Composition API_:
```javascript
  const fnManejadora = (param) => {
    ...
  }
  ...
```

El componente hijo puede emitir cualquiera de los eventos estándar de JS ('click', 'change', ...) o un evento personalizado ('cambiado', ...).

Igual que un componente declara las _props_ que recibe, también puede declarar los eventos que emite. En _Composition API_ se hace como hemos visto con `defineEmits`:
```vue
<script setup>
defineEmits(['nombreEvento']);
</script>
```


En _Options API_ es opcional pero **muy recomendable** ya que proporciona mayor claridad al código:
```javascript
// TodoItem.vue
...
props: {
  todo: Object
},
emits: ['nombreEvento'],
...
```

**Ejemplo**: continuando con la aplicación de tareas que dividimos en componentes, en el componente **_todo-item_** en lugar de hacer un alert emitiremos un evento al padre:
```javascript
delTodo() {
  emit('delItem')
},
``` 

y en el componente **_todo-list_** lo escuchamos y llamamos al método que borre el item:
```vue
<script setup>
const todos = ref([...])  // array de tareas

const delTodo = (index) => {
  todos.value.splice(index, 1)
}
</script>

<template>
    <div>
      <ul>
       <todo-item 
         v-for="(item, index) in todos" 
         :key="item.id"
         :todo="item"
         @del-item="delTodo(index)">
       </todo-item>
      </ul>
    </div>
</template>
``` 

| Haz el ejercicio del tutorial de [Vue.js](https://vuejs.org/tutorial/#step-13)

### Definir y validar eventos
Como hemos dicho, los eventos que emite un componente pueden (y se recomienda) definirse con _defineEmits_. Y al igual que con las _props_ es posible definirlos usando sintaxis de objeto para validar los parámetros que se emiten. Para ello el evento se asigna a una función que recibe como parámetro los parámetros del evento y devuelve _true_ si es válido o _false_ si no lo es:
```vue
<script setup>
const emits = defineEmits({
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
});

const submitForm = (email, password) => {
  emit('submit', { email, password })
}
</script>
```

En este ejemplo el componente emite _click_ que no se valida y _submit_ donde se valida que reciba 2 parámetros.

### Capturar el evento en el padre
En ocasiones el componente hijo no hace nada más que informar al padre de que se ha producido un evento sobre él. En estos casos podemos hacer que el evento se capture directamente en el padre en lugar de en el hijo.

Por ejemplo, en nuestra aplicación de tareas, si en vez de usar el botón de 'Borrar' para eliminar una tarea queremos que se borre cuando hacemos doble click sobre ella, en lugar de capturar el evento _dblclick_ en el componente _todo-item_ y emitir un evento al padre para que lo borre, podemos hacer que el padre capture directamente el evento _dblclick_ sobre el hijo y llame a su método para borrar la tarea:

Componente **_todo-list.vue_**
```vue
<template>
  ...
  <todo-item 
    v-for="(item, index) in todos" :key="item.id"
    :todo="item"
    @dblclick="delTodo(index)">
  </todo-item>
  ...
</template>
``` 

Le estamos indicando a Vue que el evento _dblclick_ se capture en _todo-list_ directamente por lo que el componente _todo-item_ no tiene que capturarlo ni hacer nada.

## Compartir datos
Una forma sencilla de acceder a los mismos datos desde distintos componentes que no son padre-hijo es compartiendolos datos entre ellos. Para ello creamos en un fichero _.js_ (no _.vue_) un objeto que contendrá todos los datos a compartir entre componentes y en cada componente que queramos usarlo lo importamos y lo registramos. Ejemplo:

Fichero `/src/store/index.js`
```javascript
import { reactive } from 'vue'

export const store = reactive({
  message: '',
  myData: [],
  ...
})
```

**NOTA**: Recordad que para que la variable store sea reactiva (que la vista reaccione a los cambios que se produzcan en ella) hay que declararla con `reactive`, si es un objeto o array, o con `ref` si es un tipo primitivo (_string_, _number_, ...).

Fijaos que se declara el objeto _store_ como una constante porque NO puedo cambiar su valor para que pueda ser usado por todos los componentes, pero sí el de sus propiedades.

En cada componente que necesite acceder a datos del _store_ lo importamos y definimos dentro de _computed_ las variables a las que queramos acceder. No lo hacemos en _data_ porque allí declaro las variables locales del componente y estas está en el _store_.:
```vue
<script setup>
import { store } from '../store/'

const message = computed(() => store.message)
</script>

<template>
  <p>Mensaje: { { message }} </p>
</template>
```

Y en cualquier método del componente puedo cambiar el valor de las variables del _store_ directamente:
```javascript
const updateMessage = (newValue) => {
    store.message = newValue
}
```

Esta forma de trabajar tiene un grave inconveniente: como el valor de cualquier dato puede ser modificado desde cualquier parte de la aplicación es difícilmente mantenible y se convierte en una pesadilla depurar el código y encontrar errores.

Para evitarlo usaremos un patrón de programación llamado _Store pattern_ que veremos en el siguiente apartado.

### Store pattern
Es una mejora sobre lo que hemos visto de compartir datos. Para evitar que todos los componentes puedan modificar los datos compartidos en el almacén, las acciones que modifican dichos datos están incluidas dentro del propio almacén, lo que facilita su seguimiento:

Fichero `/src/store/index.js`
```javascript
import { reactive } from 'vue'

export const store = {
  debug: true,
  state: reactive({
    message: '',
    ...
  }),
  setMessageAction (newValue) {
    if (this.debug) console.log('setMessageAction triggered with ', newValue)
    this.state.message = newValue
  },
  clearMessageAction () {
    if (this.debug) console.log('clearMessageAction triggered')
    this.state.message = ''
  }
}
```

Para acceder a los datos del _store_ desde un componente accedemos a las variables dentro de `store.state`:

```javascript
import { store } from '../store/'
import { computed } from 'vue'

const message = computed(() => store.state.message)
...
```

Fijaos que lo declaramos como `computed` porque es una variable calculada: una variable que está en otro sitio.

Y en sintaxis de _Options API_:

```javascript
import { store } from '../store/'

export default {
  computed: {
    message() {
      return store.state.message,
    }
  },
  ...
}
```

Y para modificar los datos del _store_ desde un componente usaremos los métodos definidos en el propio _store_:
```javascript
import { store } from '../store/'
  ...
  const delMessage = () => {
    store.clearMessageAction()
  }
  ...
```

Y en sintaxis de _Options API_:
```javascript
import { store } from '/src/datos.js'
  ...
  methods: {
    delMessage() {
      store.clearMessageAction()
    }
  },
  ...
```

**NOTA**: no debemos guardar todos los datos en el _store_ sólo los datos de aplicación (aquellos que utiliza más de un componente). Los datos privados de cada componente seguiremos declarándolos en su `data`.

## Aplicación de ejemplo
Vamos a hacer que funcione la aplicación que tenemos hecha con _SFC_ y _Store pattern_. Para ello vamos a crear un _store_ que contendrá el array de tareas y los métodos para añadir, borrar y cambiar el estado de las tareas, así como para borrarlas todas.

Con lo que sabíamos hasta ahora podríamos hacer funcionar la aplicación declarando el array de tareas en el _App.vue_ y pasando los datos entre componentes mediante _props_ y eventos, pero sería un engorro y el código sería difícil de mantener.

Usando un _store pattern_ centralizamos los datos de aplicación y las acciones que los modifican en un único sitio:

```javascript
// /src/store/index.js
import { reactive } from "vue";

export const store = {
  debug: true,
  state: reactive({
    todos: [
      { id: 1, title: "Learn JavaScript", done: false },
      { id: 2, title: "Learn Vue", done: false },
      { id: 3, title: "Play around in JSFiddle", done: true },
      { id: 4, title: "Build something awesome", done: true },
    ],
  }),
  addTodoAction(newTodo) {
    if (this.debug) console.log("addTodoAction triggered with ", newTodo);
    this.state.todos.push(newTodo);
  },
  removeTodoAction(todoToRemove) {
    if (this.debug)
      console.log("removeTodoAction triggered with ", todoToRemove);
    this.state.todos = this.state.todos.filter((todo) => todo !== todoToRemove);
  },
  clearTodosAction() {
    if (this.debug) console.log("clearTodosAction triggered");
    this.state.todos = [];
  },
};
```

En el componente _todo_list_ debemos incluir el array _todos_ lo que haremos en su _computed_. El resto de componentes no necesitan acceder al array, pero sí llamarán a los métodos para cambiarlo:
```vue
// /src/components/TodoList.vue
<script setup>
import { computed, ref } from "vue";
import { store } from "../store/index.js";
import TodoItem from "./TodoItem.vue";

const todos = computed(() => store.state.todos);
</script>

<template>
  <ul v-if="todos.length">
    <todo-item v-for="todo in todos" :key="todo.id" :item="todo" />
  </ul>
  <p v-else>No hay tareas que mostrar</p>
</template>
```

Respecto al _todo-item_ debe cambiar los datos tanto para borrar una tarea como para marcarla como 'Hecha'/'No hecha' (se cambia el estado de la tarea).

Los componentes _add-todo_ y _del-all_ no necesitan las tareas, sólo tienen que acceder a los métodos del _store_ para cambiarlas:
```vue
// /src/components/DelAll.vue
<script setup>
import { store } from '../store';

const delTodos = () => {
  store.clearTodosAction();
};
</script>

<template>
  <button @click="delTodos">Borrar toda la lista</button>
</template>
```

Tenéis el código en el [repositorio](https://github.com/juanseguravasco/vue-todo-list/tree/4-comunicacion).

Podemos ver la aplicación con sintaxis _Composition API_ funcionando en la [Vue Playground](https://play.vuejs.org/#eNqNVc1u2zgQfhWuLrUBW0J/Tl7Fu0nbxbYo2mBT7KXqgRHHNhOKVEnKSWD4ofoMfbHOUKIs24mRIAdq5hvOx5lvxpvkvK7TdQPJLMldaWXtmQPf1PNCy6o21rOvRphP0nm2sKZiL9IsGijsxZ897lyIDx6qHtZ9H6DegTpXqge1nxFT6DxrSWB6/MDwWnEP+MVYLuQ6HPC4ejV/axx3jLMVL8EycB4Y//XTzPIMnR3MI9OpIu5ZNHEhppJokqWzCVBTjqRaUJ61ifKsT59MEu9Koxdymd44o7FYG4IWSWmqWiqwX2ovjXZFMmPBQz680tx9DDZvG5hEe7mC8vYR+427J1uRXFpwYNdQJL3Pc7sE37rfX32Gezz3zsqIRiH6hPM/cEY1xLGFXTRaIO0BLrD9EJok9fKre3/vQbv4KCJKyG3AFwk27O2Jp+/ovk7fhLhCb7GKA008LbgNs7Bg204jvTSw/thIDXekP3ZGoFGRFMl44MXudt7RmJ3NW0JywUZdWLrmqoHUW1mNxuPIl2TiOlfduNVow7z0CmYx217YhAmj0bfgygHbUnq6ZA+KBIhacNHT8TBQ9tO6lrpuPFtPsWmgzoqku7RIGOJLWBklwKId60gJGSkZnb26rxvvjWZ/l0qWt4jr6lEkc4zIs9Z9QuW7cXykPW2JkRhd6fZrPCghOr59xwcfPPro2Ydc48VI9sJYyy1dypnCf5xgPmA/4FxoZD1cSM+UVVBwaNBgy+3WV5G0ay6KNSBjBcJbOwF+o6dsmBQz9nISVVMkn4BbzT7yNb8KXHDO9lTTzVEb+Ooo8H/KeCLi9SDiUvEHxq3BgWYSc179IwWO9i6eRnc//M0g/KKRSjBnKvArnHvG73BTVI+Gfyepn+poo1C6coG9bOWgQC/9Cvs5XMdh+a6nC0M6JguxDngU8uwWHjpzKgUZCN5ZeqHnWaPaQ403AZZn/tngD8EDw70D+KvwAylXxnkUUZ6RBB5TzHMWkYCF1HBpTe2OlRP1UAf32RA8ahcPZpixL9c3UHqsX1gVB2P05BSlrsa5gJHUAu4n7CXF0kRFCZqlgnfYoP0LApWU8qbUPXT+cWA6HsyDJioZ26X4NbR1jr+Ssb39bX1v6W+D6iJH0Bbb4t7rIjMM3d3jaq5j254TTPhIKRtyOtogu6qMxgNm8epQkb+wgSiWf6FccdIXfsZzTLq3J59eVCFHu6kONmso4b7ktr8Bnscdbg==) o con sintaxis _Options API_ en el siguiente _codesandbox_:

<iframe src="https://codesandbox.io/embed/todo-app-with-vue-cli-it-works-fnen9g?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="ToDo App with vue-cli (it works!!!)"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## Pinia
Hemos visto que con un _store pattern_ se simplifica mucho la gestión de los datos de aplicación y al centralizar los métodos que modifican los datos tengo control sobre los cambios producidos. Sin embargo en un componente puedo seguir escribiendo código que manipule los datos del almacén directamente, sin usar los métodos del almacén. _Pinia_ básicamente es un _store pattern_ donde parte del trabajo de definirlo ya está hecho y que me obliga a usarlo para mainular los datos de aplicación (con él no puedo cambiarlos directamente desde un componente). Además se integra perfectamente con las _DevTools_ por lo que es muy sencillo seguir los cambios producidos.

Se trata de una librería para gestionar los estados en una aplicación Vue. Ofrece un almacenamiento centralizado para todos los componentes con unas reglas para asegurar que un estado sólo cambia de determinada manera. Es el método a utilizar en aplicaciones medias y grandes y le dedicaremos todo un tema más adelante. En Vue2 y anteriores la librería que se usaba es _Vuex_.

Lo veremos en detalle en la [unidad dedicada a esta librería](https://cipfpbatoi.github.io/materials/daw/dwc/02-vue/07-pinia.html).

## Slots
Otra forma en que un componente hijo puede mostrar información del padre es usando _slots_. Un _slot_ es un hueco en un componente que, al renderizarse, se rellena con lo que le pasa el padre en el innerHTML de la etiqueta del componente. El _slot_ tiene acceso al contexto del componente padre, no al del componente donde se renderiza. Los _slots_ son una herramienta muy potente. Podemos obtener toda la información en la [documentación de Vue](https://v3.vuejs.org/guide/component-slots.html#slot-content). 

Ejemplo:
Tenemos un componente llamado _my-component_ con un slot:
```javascript
<template>
  <div>
    <h3>Componente con un slot</h3>
    <slot><p>Esto se verá si no se pasa nada al slot</p></slot>
  </div>
</template>
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

Un ejemplo más util de _slot_ es el siguiente: queremos hacer un componente que renderice una fila de una tabla donde mostrar los datos de un usuario. Tendremos una última columna donde poner unos botones para realizar acciones sobre ese usuario pero esos botones variarán en función de la página donde se muestre la tabla. Para ello usaremos _slots_: 
```html
<template>
  <tr>
    <td>{ { user.name }}</td>
    <td>{ { user.email }}</td>
    <td>{ { user.age }}</td>
    <td>
      <slot></slot>
    </td>
  </tr>
</template>
```

Donde queremos mostrar un usuario con botones para editar y borrar haremos:
```html
<user-row :user="user">
    <button @click="editUser">Editar</button>
    <button @click="deleteUser">Borrar</button>
</user-row>
```

y donde queremos mostrarlo sólo con un botón para ver más detalles haremos:
```html
<user-row :user="user">
    <button @click="showDetails">Detalles</button>
</user-row>
```

### Slots con nombre
A veces nos interesa tener más de un slot en un componente. Para saber qué contenido debe ir a cada slot se les da un nombre. 

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
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

La directiva `v-slot` tiene una abreviatura que es `#` de forma que podríamos haber puesto `<template #header>`.

Podría no ponerse el _template #default_ y funcionaría igual: lo que está dentro de un _template_ con _v-slot_ irá al _slot_ del componente con ese nombre. El resto del innerHTML irá al _slot_ por defecto (el que no tiene nombre).

La directiva _v-slot_ podemos ponérsela a cualquier etiqueta (no tiene que ser \<template>):
```html
<base-layout>
  <h1 v-slot="header">Here might be a page title</h1>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <p slot="footer">Here's some contact info</p>
</base-layout>
```

### Acceder a datos del hijo desde el padre con _slot_
El componente hijo puede hacer accesibles sus variables al padre declarándolas en su etiqueta `<slot>`:

```html
<!-- ChildComponent -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
```

```html
<!-- ParentComponent -->
<child-component v-slot={ text, count }>
   { { text }}: { { count }}
</child-component>
```

Esto es particularmente útil en componentes hijos que muestran un array de datos (con un `v-for`) si queremos acceder con el padre a cada dato.

Podéis profundizar en el uso de _slots_ en la [documentación oficial de Vue](https://vuejs.org/guide/components/slots.html).
