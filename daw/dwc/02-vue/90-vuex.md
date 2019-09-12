# Vuex
Es un patrón de gestión de estado más una libreria para controlar el estado de nuestra aplicación. Proporciona un almacén de datos centralizado para todos los componentes de la aplicación y asegura que los datos sólo puedan cambiarse de forma controlada. Además se integra con las _DevTools_.

El flujo de datos de una aplicación podemos verlo (de manera muy simplificada) en el siguiente esquema:

![one-way data flow](https://vuex.vuejs.org/flow.png)

- El **estado** es el conjunto de datos de nuestra aplicación
- La **vista** representa el estado al usuario
- Las **acciones** son las formas en que podemos cambiar el estado, normalmente en respuesta a entradas del usuario desde la vista

El **estado** de los datos se representa en la **vista**, donde el usuario tiene herramientas que provocan **acciones** que modifican el **estado**. Este esquema funciona perfectamente cuando cada componente tiene su propio estado, pero empieza a dar problemas cuando el estado debe compartirse entre varios componentes. Para ese caso ya vimos soluciones como el _Event Bus_ o el _state management pattern_ pero son soluciones difícilmente mantenibles cuando nuestra aplicación crece. En aplicaciones medias o grandes es conveniente usar _Vuex_.

Vuex centraliza la forma en que nuestros componentes se comunican entre ellos. Con Vuex el flujo de datos podemos verlo de la siguiente manera:

![Vuex data flow](https://vuex.vuejs.org/vuex.png)

Los componentes de Vue peden emitir (**dispatch**) acciones que ejecutan un proceso (que puede ser asíncrono, por ejemplo una petición a una API). Cuando se resuelve la acción emite una confirmación (**commit**) que **muta** el _Estado_ de la aplicación (aquí podemos depurar con las _DevTools_) por lo que se renderiza el componente para mostrar el nuevo estado. En el estado almacenaremos tanto datos (accesibles desde cualquier componente) como métodos que se utilicen en más de un componente.

El uso de Vuex implica mayor complejidad en nuestra aplicación por lo que es recomendable su uso en aplicaciones de tamaño medio o grande. Para aplicacioes pequeñas normalmente es suficiente con soluciones más simples como el _eventBus_ o un _store  pattern_ hecho por nosotros. Como dijo _Dan Abramov_, el creador de _Redux_ 
> Las librerías _Flux_ son como las gafas: lo sabrás cuando las necesites

## Instalar Vuex
Para usar Vuex debemos instalarlo como cualquier otro paquete:
```bash
npm install -S vuex
```

Además en el fichero principal de nuestra aplicación hay que registrarlo con
```javascript
import Vuex from 'vuex'

Vue.use(Vuex)
```

## Usar Vuex
El corazón de Vuex es el **_store_** que es un contenedor donde almacenar el estado de la aplicación pero se diferencia de un objeto normal en que:
- es reactivo
- sólo se puede modificar haciendo _commits_ de mutaciones

Al crear el almacén especificaremos en _state_ nuestras variables y en _mutations_ los métodos que se pueden usar para cambiarlas, ej.:
```javascript
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
```

Ya podemos llamar a las mutaciones y acceder al estado desde los componentes. La mejor forma de acceder a propiedades del almacén es creando métodos _computed_ que cambiarán al cambiar el estado del mismo:
```javascript
  computed: {
    count () {
      return store.state.count
  },
```

Para evitar tener que importar en _store_ en cada componente podemos hacerlo activando la propiedad _store_ de la instancia de Vue, tal y como se hace con el _router_:
```javascript
const app = new Vue({
  el: '#app',
  store,
  ...
```

En ese caso en la propiedad _computed_ en lugar de `return store.state.count` deberemos poner `return $store.state.count`.

Si queremos usar varias propedades del _store_ en vez de hacer un método _computed_ para cada una podemos usar el _helper_ **mapState**:
```javascript
import { mapState } from 'vuex'

  computed: mapState([
    // map this.count to store.state.count
    'count'
  ])
```

### Getters
En el almacén podemos crear métodos que devuelvan información sobre nuestros datos. Estos métodos son en realidad _computed_ (sólo se ejecutan de nuevo si cambian los datos de que dependen) y se declaran dentro de _getters_:
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

Cada _getter_ recibe como primer parámetro el almacén.

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
RECUERDA: el código de las mutaciones debe ser síncrono.

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
Son métodos del almacén como las mutaciones pero el lugar de cambiar los datos lanzan mutaciones (_commit_). Además pueden incluir llamadas asíncronas. Las acciones reciben como parámetro un objeto _context_ con las mismas propiedades y métodos que el almacén, lo que permite:
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

También podemos usar la desestructuración de objetos de ES2015 para obtener sólo la parte del contexto que nos interesa:
```javascript
  actions: {
    increment ({ commit }) {
      commit('increment')
    }
  }
```

Igual que antes podemos usar el _helper_ _mapActions_ para mapear acciones y no tener que llamarlas en el componente con `this.$store.dispatc h('...')`:
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

Y la llamamos desde el componente con:
```javascript
store.dispatch('actionA')
.then(//...)
.catch(//...)
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
    	axios.get(URL).then((response) => {
        commit('updatePosts', response.data)
        commit('changeLoadingState', false)
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

Podemos ver el ejemplo completo en el _fiddle_ siguiente:
<script async src="//jsfiddle.net/awolf2904/n8d44bh3/embed/js,html,result/"></script>


### Saber más
* [Vuex](https://vuex.vuejs.org/)
* [Cómo Construir Aplicaciones Complejas y a Gran Escala Vue.js con Vuex](https://code.tutsplus.com/es/tutorials/how-to-build-complex-large-scale-vuejs-applications-with-vuex--cms-30952)
* [Vuex for Everyone](https://vueschool.io/courses/vuex-for-everyone)
* [VueJS: Introducción a vuex](https://elabismodenull.wordpress.com/2017/05/29/vuejs-introduccion-a-vuex/)
* [Managing State in Vue.js](https://medium.com/fullstackio/managing-state-in-vue-js-23a0352b1c87)
