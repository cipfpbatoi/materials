# Pinia
Tabla de contenidos
- [Pinia](#pinia)
  - [Introducción](#introducción)
  - [Instalar y configurar Pinia](#instalar-y-configurar-pinia)
  - [Crear un store](#crear-un-store)
  - [Usar Pinia](#usar-pinia)
    - [Getters](#getters)
    - [Actions](#actions)
  - [state en formularios](#state-en-formularios)


## Introducción
Es un '_State Management Pattern_' basado en el patrón **Flux** que sirve para controlar el flujo de datos en una aplicación. Sustituye a la anterior librería usada en _Vue 2_ llamada _Vuex_.

Según la filosofía de _Vue_ cada componente es una unidad funcional que contiene 3 partes:
- **estado**: los datos o _source of truth_ que maneja en componente
- **vista**: la representación del _estado_ que se ve en la aplicación
- **acciones**: la forma en que el _estado_ puede cambiar para reaccionar a entradas del usuario en  la _vista_

Por ejemplo, el componente _contador_ sería:

```vue
<script>
export default {
  // state
  data() {
    return {
      count: 0
    }
  },
  // actions
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>

<!-- view -->
<template>
  {{ count }}
  <button @click="increment">Increment</button>
</template>
```

Esto es lo que se llama **_one-way data flow_**:

![one-way data flow](https://vuejs.org/assets/state-flow.a8bc738e.png)

El problema lo tenemos cuando un componente necesita acceder a datos (_state_) de otro componente. 

En Vue la comunicación entre componentes padre-hijo se hace hacia abajo mediante `props` y hacia arriba emitiendo eventos. Y vimos que si distintos componentes que no son padre-hijo tenían que compartir un mismo estado (acceder a los mismos datos) surgían problemas e intentamos solucionarlos con el patrón _store pattern_. Esto puede servir para pequeñas aplicaciones pero cuando crecen se hace difícil seguir los cambios. Para esos casos debemos usar _Pinia_, que proporciona un almacén de datos centralizado para todos los componentes de la aplicación y asegura que los datos sólo puedan cambiarse de forma controlada.

El uso de _Pinia_ es imprescindible en aplicaciones de tamaño medio o grande pero incluso para aplicaciones pequeñas nos ofrece ventajas frente a un _store pattern_ hecho por nosotros como soporte para las _DevTools_ y para _Server Side Rendering_ o uso de Typescript. 

Como ya dijimos, no debemos almacenar todos los datos en el _store centralizado_ sino sólo los que necesitan varios componentes (los datos privados de un componente deben permanecer en él).

## Instalar y configurar Pinia
La forma más sencilla de utilizar _Pinia_ es incluirla a la hora de crear nuestro proyecto cuando nos pregunta si queremos usarla. Esto hace que la instalación y configuración de la herramienta se haga automáticamente. 

Al entrar en nuestro nuevo proyecto vemos que dentro de `/src` se ha creado una carpeta llamada `stores/` donde crearemos los distintos almacenes de datos (podemos tener sólo uno o varios).

Para poder usar _Pinia_ en los distintos componentes vemos que en el fichero `main.js` se importa la función `createPinia()` y se indica que se use en la instancia de Vue:
```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia' // <---
import App from './App.vue'
import router from './router'

createApp(App).use(createPinia()).use(router).mount('#app')
```

Si queremos usar _Pinia_ en un proyecto existente donde no la seleccionamos al crear el proyecto deberemos instalar la librería como dependencia de producción y modificar el fichero `main.js` para que pueda usarse, como hemos visto arriba. Luego crearemos la carpeta `/src/stores/` y en ella los almacenes que queramos usar. 

## Crear un store
Ahora hay que crear el fichero del store. Podemos tener todos los datos en un único fichero o, si son muchos, hacer ficheros diferentes. Por ejemplo para la aplicación de 'ToDo' podemos crear su store en **/src/stores/toDo.js**. 

Al crear un almacén pondremos en él todas las variables que vaya a usar más de un componente (dentro de **`state`**) y los métodos para acceder a ellas y modificarlas (dentro de **`actions`**), por ejemplo, para compartir un contador haríamos:

```javascript
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state() {
    return {
      count: 0
    }
  },
  // o usando arrow functions
  // state: () => ({
  //  count: 0
  // }),

  actions: {
    increment () {
      this.count++
    },
    decrement () {
      this.count--
    },
  }
})
```

En este ejemplo hemos creado un almacén que tiene un dato (_count_) y dos métodos para cambiar su valor (_increment_ y _decrement_). El primer parámetro de `defineStore` es el nombre con el que veremos el almacén desde las _DevTools_ (por si tenemos varios).

Desde la consola del navegador podemos usar las _DevTools_ para ver nuestro almacén. Para ello vamos a la pestaña de Vue y desde el _Inspector_ buscamos _Pinia_:

![DevTools - Pinia](./img/DevTools-Pinia.png)

Si al crear el proyecto hemos incorporado _Pinia_ nos ha creado un almacén de ejemplo como el anterior, pero escrito con la sintaxis de _Compositon API_ que sería:

```javascript
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }
  function increment() {
    count.value--
  }

  return { count, increment, decrement }
})
```

## Usar Pinia
En cada componente que lo necesitemos podemos usar el almacén de datos. Para ello lo importamos y luego definimos en _computed_ las variables del _state_ a que queramos acceder y en _methods_ las _actions_ que deseemos. Para ello debemos usar los _helpers_ `mapState` y `mapActions` en los que indicaremos las variables y métodos del _store_ que queremos usar en este componente:

```javascript
//MyComponent.vue
import { useCounterStore } from '../stores/conterStore';
import { mapState, mapActions } from 'pinia';

export default {
  ...
  computed: {
    ...mapState(useCounterStore, {
      count: 'count',
    })
  },
  methods: {
    ...mapActions(useCounterStore, ['increment', 'decrement'])
  }
}
```

Con esto se _mapean_ las variables, _getters_ y _actions_ a variables y métodos locales a los que podemos acceder desde **`this.`** (por ejemplo `this.count` o `this.increment()`).

### Getters
En ocasiones no necesitamos una variable del _state_ sino cierta información sobre ella (por ejemplo no todas las tareas del array _todos_ sino sólo las tareas pendientes). En ese caso podemos filtrarlas en cada componente que las necesite o podemos hacer un método en el almacén (dentro de **`getters`**) que nos devuelva directamente las tareas filtradas. Estos _getters_ funcionan como las variables  _computed_ (sólo se ejecutan de nuevo si cambian los datos de que dependen):

```javascript
import { defineStore } from 'pinia'

export const useToDoStore = defineStore('todo', {
  state: () => ({
      /** @type { { title: string, id: number, done: boolean }[]} */
      todos: [
        { id: 1, title: '...', done: true },
        { id: 2, title: '...', done: false }
      ],
      nextId: 3,
  }),
  getters: {
    // reciben como primer parámetro el 'state'
    finishedTodos: (state) => state.todos.filter((todo) => todo.done),
    unfinishedTodos: (state) => state.todos.filter((todo) => !todo.done),
    /**
     * @returns { { title: string, id: number, done: boolean }[]}
     */
  },
  actions: {
    // any amount of arguments, return a promise or not
    addTodo(title) {
        this.todos.push({
          title,
          id: this.nextId,
          done: false
        })
        this.nextId++
    },
  },
})
```

Cada _getter_ recibe como primer parámetro el _state_ del almacén.

Dentro de los componentes se usan como cualquier variable del _state_:
```javascript
export default {
  ...
  computed: {
    ...mapState(useToDoStore, {
      todos: 'todos',
      finishedTodos: 'finishedTodos',
    })
  },
```

Los getters pueden recibir parámetros, por ejemplo, para hacer búsquedas:
```javascript
getters: {
  getTodoById: (state) => (id) => state.todos.find((todo) => todo.id === id)
}
```

Desde el componente lo llamaremos con `this.getTodoById(2)`.

### Actions
La manera de cambiar los datos del almacén es llamando a las acciones que hayamos definido, y que hemos _mapeado_ al componente como métodos locales. Estas acciones pueden recibir tantos parámetros como se desee.

Cada vez que se llama a una acción se registra en las _DevTools_ y podemos ver la acción llamada y los datos que se le han pasado:

![DevTools - Actions](./img/DevTools-Pinia-actions.png)


Las acciones pueden hacer llamadas asíncronas. Lo normal es llamar a la BBDD y cuando el servidor responda modificaremos los datos del _store_. 
```javascript
import { defineStore } from 'pinia'
import TodoService from '../services/TodoService.js'

export const useToDoStore = defineStore('todo', {
  state: () => {
    return {
      todos: [],
      nextId: 0,
    }
  },
  actions: {
    async addTodo(title) {
      try {
        const newToDo = await TodoService.addTodo({ 
          title, 
          id: this.nextId + 1, 
          isFinished: false 
        });
        this.nextId++
        this.todos.push(newToDo)
      } catch(error) {
        throw error;
      }
    },
  },
})
```

Si la acción realiza una llamada asíncrona y el componente que la llama tiene que enterarse de cuándo finaliza debe devolver una promesa (debe declararse con `async` o _envolverse_ en un `return new Promise(...)`). En el componente podemos usar `await` o `then / catch` para saber cuándo ha acabado la acción:
```javascript
try {
  await this.addTodo(this.newTodo)
  alert('Añadida la tarea ' + this.newTodo.title)
  this.$router.push('/todos')
} catch(error) {
  alert(error)
}
```

**NOTA**: si quien llama a una acción no necesita saber cuándo termina la acción ni su resultado no es necesario llamarla con `await`.

## state en formularios
Aunque no es lo habitual, si queremos usar un formulario para modificar un _state_ del _store_ no podemos asociarlo al input con la directiva **v-model** porque cuando el usuario cambie el valor del input estaría escribiendo directamente sobre un _state_, lo que debe hacerse por medio de una acción.

Tenemos 2 soluciones al problema:
- podemos no usar el v-model sino descomponerlo en un _:value_ y un _@input_ como vimos al hablar de poner un input en un subcomponente
- podemos ponerle al computed de ese state un setter y un getter como vimos en el capítulo de [Profundizando en Vue](./06-profundizando.md)

Más información en la [documentación oficial de Pinia](https://pinia.vuejs.org/).
