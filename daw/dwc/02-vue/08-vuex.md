# Vuex
Tabla de contenidos
- [Introducción](#introducción)
- [Instalar Vuex](#instalar-vuex)
- [Usar Vuex](#usar-vuex)
  - [Acceder al State desde un componente](#acceder-al-state-desde-un-componente)
  - [Getters](#getters)
  - [Mutations](#mutations)
  - [Actions](#actions)
- [state en formularios](#state-en-formularios)
- [Saber más](#saber-más)


## Introducción
Es un '_State Management Pattern_' basado en el patrón **Flux** que sirve para controlar el flujo de datos en una aplicación. 

En Vue la comunicación entre componentes se hace hacia abajo mediante _props_ y hacia arriba emitiendo eventos. Ya vimos que cuando distintos componentes que no son padre-hijo tenían que compartir un mismo estado (acceder a los mismos datos) surgían problemas e intentamos solucionarlos con _event Bus_ y _state management pattern_. Estas soluciones pueden servir para pequeñas aplicaciones pero cuando crecen se hace difícil seguir los cambios con estos patrones. Para esos casos debemos usar _Vuex_, que proporciona un almacén de datos centralizado para todos los componentes de la aplicación y asegura que los datos sólo puedan cambiarse de forma controlada.

El uso de Vuex implica mayor complejidad en nuestra aplicación por lo que es recomendable su uso en aplicaciones de tamaño medio o grande (para aplicacioes pequeñas basta con un _eventBus_ o un _store  pattern_ hecho por nosotros). Como dijo _Dan Abramov_, el creador de _Redux_ 

> Las librerías _Flux_ son como las gafas: lo sabrás cuando las necesites

Vuex se integra con las _DevTools_ por lo que es muy sencillo depurar los datos del almacén y los cambios que se producen en ellos. Sin embargo no debemos almacenar todos los datos en Vuex, sólo los que necesitan varios componentes (los datos privados de un componente deben permanecer en él).

El flujo de datos de una aplicación podemos verlo (de manera muy simplificada) en el siguiente esquema:

![one-way data flow](https://vuex.vuejs.org/flow.png)

- El **estado** es el conjunto de datos de nuestra aplicación
- La **vista** representa el estado al usuario
- Las **acciones** son las formas en que podemos cambiar el estado, normalmente en respuesta a entradas del usuario desde la vista

El **estado** de los datos se representa en la **vista**, donde el usuario tiene herramientas que provocan **acciones** que modifican el **estado**. Este esquema funciona perfectamente cuando cada componente tiene su propio estado, pero empieza a dar problemas cuando el estado debe compartirse entre varios componentes. Para ese caso ya vimos soluciones como el _Event Bus_ o el _state management pattern_ pero son soluciones difícilmente mantenibles cuando nuestra aplicación crece. En aplicaciones medias o grandes es conveniente usar _Vuex_.

Vuex centraliza la forma en que nuestros componentes se comunican entre ellos. Con Vuex el flujo de datos podemos verlo de la siguiente manera:

![Vuex data flow](https://vuex.vuejs.org/vuex.png)

Los componentes de Vue peden renderizar datos de Vuex y es reactivo frente a ellos (si se modifican se volverá arenderizar el componente). Si el componente quiere modificar estos datos debe emitir (**dispatch**) acciones que ejecutan un proceso (que puede ser asíncrono, por ejemplo una petición a una API). Cuando se resuelve la acción emite una confirmación (**commit**) que **muta** el _Estado_ de la aplicación (aquí podemos depurar con las _DevTools_) por lo que se renderiza de nuevo el componente para mostrar el nuevo estado. En el estado almacenaremos tanto datos (accesibles desde cualquier componente) como métodos que se utilicen en más de un componente.

## Instalar Vuex
Para usar Vuex debemos instalarlo como cualquier otro paquete:
```bash
npm install -S vuex
```

## Usar Vuex
El corazón de Vuex es el **_store_** que es un objeto donde almacenar **_states_** (datos globales) de la aplicación pero se diferencia de un objeto normal en que:
- es reactivo
- sólo se puede modificar haciendo _commits_ de mutaciones

Un buen sitio para crearlo es el fichero **src/store/index.js**.

Al crear el almacén especificaremos en _state_ nuestras variables globales y en _mutations_ los métodos que se pueden usar para cambiarlas, ej.:
```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    },
    decrement (state) {
      state.count--
    },
  }
})
export default store
```

Cada mutación recibe como parámetro el _state_ del almacén para que pueda modificarlo.

Acabamos de crear un almacén que tiene un dato (_count_) y dos mutaciones para cambiar su valor (_increment_ y _decrement_).

Lo usaremos en un componente que muestra ese contador:
```html
<p>Valor del contador: {{ contador }}</p>
<button @click="incrementa">Incrementar</button>
<button @click="decrementa">Decrementar</button>
```

Podemos importar el store en cad componente que lo vaya a usar:
```javascript
import store from '@/store'

export default {
  computed: {
    return store.state.count
  },
  methods: {
    incrementa() {
      store.commit('increment')
    },
    decrementa() {
      store.commit('decrement')
    },
  }
}
```

O, si lo van a usar muchos componentes que es lo más normal, podemos importarlo y registrarlo en el _main.js_:
```javascript
import store from '@/store'

new Vue({
  router,
  store,
  ...
```

Y entondes en el componente no hay que importar nada y se llamaría con `this.$store.state.count` o `this.$store.commit('increment')`

### Acceder al State desde un componente
La mejor forma de acceder a propiedades del almacén es creando métodos _computed_ que cambiarán al cambiar el estado del mismo:
```javascript
  computed: {
    count () {
      return this.$store.state.count
  },
```

Si queremos usar varias propedades del _store_ en un componente en vez de hacer un método _computed_ para cada una podemos usar el _helper_ **mapState**:
```javascript
import { mapState } from 'vuex'

  computed: mapState([
    'count'	    // map this.count to store.state.count
  ])
```

### Getters
Podemos crear métodos que devuelvan información sobre nuestros datos. Estos métodos son en realidad _computed_ (sólo se ejecutan de nuevo si cambian los datos de que dependen) y se declaran dentro de _getters_:
```javascript
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    }
  }
})
```

Cada _getter_ recibe como primer parámetro el _state_ del almacén.

Dentro de los componentes se usan como cualquier variable:
```javascript
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

Y también podemos usar varios con el _helper_ **mapGetters**:
```javascript
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

Si queremos podemos hacer getters también para los states y así no necesitamos mapState sino que accedemos a todo con mapGetters.

Los getters pueden recibir parámetros, por ejemplo, para hacer búsquedas:
```javascript
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
```
Y lo llamaremos con `store.getters.getTodoById(2)`.

### Mutations
RECUERDA: el código de las mutaciones **NO puede ser asíncrono**.

La única manera de cambiar los datos del almacén es llamando a las mutaciones que hayamos definido, pero no se llaman como si fueran métodos sino que se lanzan (como si fueran eventos) con **commit**: `store.commit('increment')`.

Las mutaciones reciben como primer parámetro el _store_ pero pueden recibir otro parámetro adicional, llamado **_payload_**:
```javascript
mutations: {
  incrementBy (state, n) {
    state.count += n
  }
}
```

Al llamar a la mutación le pasamos el valor esperado: `store.commit('incrementBy', 10)`. 

Si queremos pasar varios parámetros el _payload_ será un objeto: `store.commit('incrementBy',{amount: 10})`. En ese caso podemos pasar el nombre de la mutación como propiedad _type_ del objeto:
```javascript
store.commit({
  type: 'incrementBy',
  amount: 10
})
```

Podemos llamar a las mutaciones desde un componente, aunque lo habitual es llamar a acciones que ejecuten esas mutaciones. Para llamar a la mutación hacemos:
```javascript
`this.$store.commit('increment')`:
```

Al igual con con el estado o los _getters_ podemos _mapear_ las mutaciones a métodos locales para poder hacer `this.increment` en lugar de `this.$store.commit('increment')` con el _helper_ _mapMutatios_:
```javascript
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // map `this.increment()` to `this.$store.commit('increment')`
      'incrementBy' // map `this.incrementBy(amount)` to `this.$store.commit('incrementBy', amount)`
    ]),
    // Y podemos hacer 'alias' de las mutaciones
    ...mapMutations({
      add: 'increment' // map `this.add()` to `this.$store.commit('increment')`
    })
  }
}
```

### Actions
Son métodos del almacén como las mutaciones pero en lugar de cambiar los datos lanzan mutaciones (_commit_). Además pueden incluir llamadas asíncronas. Las acciones reciben como parámetro un objeto _context_ con las mismas propiedades y métodos que el almacén, lo que permite:
- lanzar una mutación con `context.commit('`
- acceder a los datos con `context.state.`
- acceder a los getters con `context.getters.`
- llamar a otras acciones con `context.dispatch.`

```javascript
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```

Para llamarla desde un componente hacemos:
```javascript
`this.$store.dispatch('increment')`:
```

Al igual que a las mutaciones les podemos pasar un _payload_.

También podemos usar la desestructuración de objetos de ES2015 para obtener sólo la parte del contexto que nos interesa:
```javascript
  actions: {
    increment ({ commit }) {
      commit('increment')
    }
  }
```

Igual que antes podemos usar el _helper_ _mapActions_ para mapear acciones y no tener que llamarlas en el componente con `this.$store.dispatch('...')`:
```javascript
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // map `this.increment()` to `this.$store.dispatch('increment')`
      'incrementBy' // map `this.incrementBy(amount)` to `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // map `this.add()` to `this.$store.dispatch('increment')`
    })
  }
}
```

Si las acciones realizan una llamada asíncrona deben devolver una promesa:
```javascript
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```
(recuerda que una llamada a _axios_ es una promesa)

Y la llamamos desde el componente con:
```javascript
store.dispatch('actionA')
.then(...)	// se ejecutará si la acción ha hecho un resolve()
.catch(...)	// se ejecutará si la acción ha hecho un reject()
```

Si es una llamada a _axios_ hacemos el _commit_ cuando se haya resuelto:
```javascript
const URL = 'https://jsonplaceholder.typicode.com/posts';

const store = new Vuex.Store({
  state: {
    posts: [],
    loading: true,
  },
  actions: {
    loadData({commit}) {
      return new Promise((resolve, reject) => {
        axios.get(URL)
       .then((response) => {
         commit('updatePosts', response.data);
         commit('changeLoadingState', false);
         resolve(response.data);
       })
       .catch(err => reject(err))
    })
    }
  },
  mutations: {
    updatePosts(state, posts) {
      state.posts = posts
    },
    changeLoadingState(state, loading) {
      state.loading = loading
    },
  }
})
```

**NOTA**: _loadData()_ no tiene que devolver una promesa si quien la llama no necesita saber el resultado de la acción (simplemente haría el `axios.get...`). Debe devolverla, por ejemplo, en un formulario donde, si todo ha ido bien, nos lleve a otra página. En ese caso la llamada sería:
```javascript
addData() {
  this.$store.dispatch('addItem', this.newItem).
  .then(()=>this.$router.push('/items'))
  .catch(err=>alert('Error: '+err.message || err))
}
```

Podemos ver el ejemplo completo en el _fiddle_ siguiente:
<script async src="//jsfiddle.net/awolf2904/n8d44bh3/embed/js,html,result/"></script>

## state en formularios
Si queremos usar un formulario para modificar un state del pattern lo asociamos al input con la directiva **v-model** pero eso plantea un problema: cuando el usuario cambie el valor del input estamos escribiendo directamente sobre un state, lo que no puede hacerse más que por medio de una mutación.

Tenemos 2 soluciones al problema:
- podemos no usar el v-model sino descomponerlo en un _:value_ y un _@input_ como vimos al hablar de poner un input en un subcomponente
- podemos ponerle a computed de ese state un setter y un getter como vimos en el capítulo de [Profundizando en Vue](./06-profundizando.md)

Más información en la [documentación oficial](https://vuex.vuejs.org/guide/forms.html) de Vuex.

## Saber más
* [Vuex](https://vuex.vuejs.org/)
* [Cómo Construir Aplicaciones Complejas y a Gran Escala Vue.js con Vuex](https://code.tutsplus.com/es/tutorials/how-to-build-complex-large-scale-vuejs-applications-with-vuex--cms-30952)
* [Vuex for Everyone](https://vueschool.io/courses/vuex-for-everyone)
* [VueJS: Introducción a vuex](https://elabismodenull.wordpress.com/2017/05/29/vuejs-introduccion-a-vuex/)
* [Managing State in Vue.js](https://medium.com/fullstackio/managing-state-in-vue-js-23a0352b1c87)
