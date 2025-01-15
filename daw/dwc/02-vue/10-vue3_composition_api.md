# La _Composition API_ de Vue3
- [La _Composition API_ de Vue3](#la-composition-api-de-vue3)
  - [Introducción](#introducción)
  - [Ejemplo básico](#ejemplo-básico)
  - [setup](#setup)
    - [\<script setup\>](#script-setup)
  - [Reactividad en Vue3](#reactividad-en-vue3)
  - [Configuraciones básicas](#configuraciones-básicas)
    - [_Props_](#props)
    - [_Components_](#components)
    - [_Computed_](#computed)
    - [hooks](#hooks)
    - [router](#router)
    - [watchEffect y watch](#watcheffect-y-watch)
    - [Pinia](#pinia)
  - [Reusabilidad: _composables_](#reusabilidad-composables)
    - [Valores devueltos](#valores-devueltos)
    - [Paso de parámetros](#paso-de-parámetros)
    - [Organizar el código con _composables_](#organizar-el-código-con-composables)

## Introducción
Vue3 incluye una importante novedad, la _Composition API_, aunque podemos seguir usando la _Options API_ clásica de Vue2 donde cada elemento (data, computed, methods, ...) es una opción del componente.

La forma de trabajar hasta Vue 2 es mediante la _Options API_ donde definíamos un componente mediante una serie de opciones:
```javascript
export default {
  name: "ComponentName",
  props: { ... },
  data() { return {...} },
  computed: { ... },
  methods: { ... },
  mounted() { ... },
  ...
}
```

Esto es ideal para pequeñas aplicaciones porque mantiene el código ordenado según su funcionalidad: variables en _data_, funciones en _methods_, .... Pero en grandes aplicaciones donde un componente necesita hacer varias cosas (como mostrar datos en una tabla pero que esté paginada y con posibilidad de filtrar, ...) el código crece y esta forma de organizarlo se vuelve algo confusa.

Vue3 permite seguir trabajando así pero incorpora una nueva forma de trabajar con nuestros componentes, la _Composition API_. En ella se define un _hook_ llamado `setup()` donde escribimos el código que inicializa el componente y devuelve un objeto con las variables y métodos que podrá usar el resto del componente (por ejemplo el _template_).
```vue
<script>
import { defineProps } from "vue";

export default {
  name: "ComponentName",
  props: defineProps({ ... }),     // Props
  setup(props, context) {
    // Init logic, lifecycle hooks, etc...

    return {
      // Data, methods, computed, etc...
    }
  }
}
</script>
```

La _composition API_ es especialmente útil en aplicaciones grandes ya que va a permitir que nuestros componentes sean mucho más reutilizables. Además nos va a permitir organizar el código por funcionalidades y no por _opciones_. Por ejemplo si un componente muestra una serie de datos y tiene filtrado de datos y paginación de los mismos en el `data()` definiré variables para los datos, variables para el filtrado y variables para la paginación. En `computed` puede que también tenga métodos para las 3 cosas y el `methods` tendré varios métodos para cada una de las 3 funcionalidades. La _composition API_ me va a permitir que todo el código (_data_, _computed_, _methods_, ...) referente a la funcionalidad de mostrar los datos esté junto y lo mismo para las funcionalidades de filtrar y de paginar:

![composition api vs options api](https://vuejs.org/assets/composition-api-after.e3f2c350.png)

Cuándo es recomendable usarla:
- si nuestro componente es demasiado largo y queremos organizarlo por características (_features_)
- para mejorar la reutilización de código entre componentes, lo que es importante en aplicaciones grandes

## Ejemplo básico
Por ejemplo, un componente que muestra un contador y un botón para incrementarlo, con la _Options API_ sería:
```vue
<template>
  <div>
    <h1>{ { title }}</h1>
    <p>El valor del contador es: { { count }}<p>
    <button @click="increment">Incrementar</button>
</template>

<script>
export default {
  // Properties returned from data() becomes reactive state
  // and will be exposed on `this`.
  props: ['title'],
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>
```

Este ejemplo con la _Composition API_ quedaría:
```vue
<script>
import { ref, onMounted } from "vue";

export default {
  name: "ComponentName",
  props: ['title'],
  
  setup(props, context) {
    const count = ref(0)

    function increment() {
      count.value++
    }

    onMounted(() => {
      console.log(`${props.title}: the initial count is ${count.value}.`)
    })

    return {
      count,
      increment,
    }
  }
}
</script>

<template>
  <div>
    <h1>{ { title }}</h1>
    <p>El valor del contador es: { { count }}<p>
    <button @click="increment">Incrementar</button>
</template>
```

Fijaos que para hacer reactiva una variable hemos de declararla con `ref` y su valor lo obtenemos dentro de la propiedad `.value`, aunque en el _\<template>_ no es necesario poner el _.value_. En el caso de objetos (incluidos arrays) se hacen reactivos con `reactive` como veremos al hablar de la [reactividad](#reactividad-en-vue3).

Las funciones podemos ponerlas como _arrow functions_:
```javascript
    const increment = () => {
      count.value++
    }
```

## setup
Lo primero que hace un componente que usa esta API es ejecutar su método _setup_, antes de evaluar ninguna otra característica (_data_, _computed_, _hooks_, ...). Por tanto este método no tiene acceso a _this_ como el resto. Para que pueda acceder a datos que pueda necesitar recibe 2 parámetros:
- __props__: aquí recibe los parámetros pasados al componente. Todos ellos son reactivos y se pueden observar con un _watch_
- __context__: es un objeto con las propiedades _attrs_, _slots_, _parent_ y _emit_. Nos permite acceder a lo que antes accedíamos desde _this_.

El _hook_ **`setup()`** se encarga de:
- tareas de inicialización del componente: todo lo que antes se hacía en _created()_ o _mounted()_
- tareas de definición: aquí se definen las variables (que antes estaban en _data_), variables calculadas (antes _computed_), funciones (antes _methods_) o los _watchers_.
- devolver los elementos que se puedan usar en el _\<template>_ (variables y funciones)

### \<script setup>
Además de la sintaxis que hemos visto arriba existe una forma 'reducida' de escribir la parte de \<script> que es:
```vue
<script setup>
import { ref, defineProps, onMounted } from "vue";

const props = defineProps(['title'])
const count = ref(0)

const increment = () => {
  count.value++
}

onMounted(() => {
  console.log(`${props.title}: the initial count is ${count.value}.`)
})
</script>

<template>
  <div>
    <h1>{ { title }}</h1>
    <p>El valor del contador es: { { count }}<p>
    <button @click="increment">Incrementar</button>
</template>
```

En este caso no es necesario exportar nada (por defecto se exportan las variables y funciones definidas).

Esta es la **sintaxis recomendada** cuando usamos SFC por simplicidad y rendimiento tal y como se indica en la [documentación de Vue3](https://vuejs.org/api/sfc-script-setup.html).

## Reactividad en Vue3
En la _composition API_ de Vue3 sólo las variables recogidas en _props_ son reactivas. Cualquier otra declarada en el _setup_ que queramos que lo sea debemos declararla con `ref` si es un tipo primitivo o `reactive` si es un objeto.

La función `ref` envuelve la variable en un Proxy reactivo. El valor de la variable estará en su propiedad `.value`, aunque desde el template podemos usarla directamente como hemos visto en el código anterior.

En el caso de variables de tipos no primitivos (objetos, arrays, ...) se declaran con _reactive_ pero en este caso no es necesario usar la propiedad `.value` (es lo mismo que hace el método `data()` en la _options API_):
```vue
<script setup>
import { reactive, defineProps, onMounted } from "vue";

const props = defineProps(['title'])
const counter = reactive({ count: 0})

const increment = () => {
  counter.count++
}

onMounted(() => {
  console.log(`${props.title}: the initial count is ${counter.count}.`)
})
</script>

<template>
  <div>
    <h1>{ { title }}</h1>
    <p>El valor del contador es: { { counter.count }}<p>
    <button @click="increment">Incrementar</button>
</template>
```

Sin embargo si cambiamos la referencia del objeto (por ejemplo si lo desestructuramos) pierde su reactividad.
```javascript
import { reactive } from "vue";

const counter = reactive({ count: 0})
let { count } = counter   // count no es reactivo
count++   // no afecta a counter.count
```

Para hacerlo reactivo deberíamos usar el método `toRef()` o `toRefs()`:
```javascript
import { reactive } from "vue";

const counter = reactive({ count: 0})
let { count } = toRefs(counter)   // count SÍ es reactivo
```

O bien, si queremos trabajar con las propiedades de un objeto podemos declararlas con `ref`:
```javascript
import { ref } from "vue";

const counter = { count: ref(0) }
let { count } = counter   // count SÍ es reactivo
```

También hay métodos para ver si una variable es reactiva:
- `isRef(variable)`
- `isReactive(variable)`

Podéis ver esto con más detalle en:
- [Escuela VUE](https://escuelavue.es/tips/ref-vs-reactive-vue-3/?utm_source=newsletter&utm_medium=email&utm_campaign=cuando_usar_ref_vs_reactive_en_vue_3&utm_term=2022-05-29).
- [Documentación de Vue](https://vuejs.org/api/reactivity-core.html)

## Configuraciones básicas

### _Props_
Para tener acceso a las _props_ hay que hacerlas accesibles con `defineProps`:
```vue
<script setup>
import { defineProps } from "vue";

defineProps(['title'])
</script>

<template>
  <div>
    <h1>{ { title }}</h1>
  </div>
</template>
```

Si necesitamos acceder a ellas desde el código las asignamos a una variable:
```vue
<script setup>
import { onMounted, defineProps } from "vue";

const props = defineProps(['title'])

onMounted(() => {
  console.log(`El parámetro pasado en 'title' es ${props.title}`)
})
</script>

<template>
  <div>
    <h1>{ { title }}</h1>
  </div>
</template>
```
### _Components_
No necesitamos registrarlos, basta con importarlos y ya se pueden usar:
```vue
<script setup>
import ErrorMessages from "./components/ErrorMessages.vue";
import AppNav from "./components/AppNav.vue";
</script>

<template>
  <div>
    <app-nav></app-nav>
    <div class="container">
      <error-messages></error-messages>
    </div>
  </div>
</template>
```

### _Computed_
El uso de _computed_ cambia ya que ahora es una función en lugar de un objeto.
```javascript
# Options API
data(): {
  return {
    productPrice: 100
  }
},
computed: {
  offerPrice() {
    return this.productPrice * 50%
  },
  originalPrice() {
    return this.productPrice
  },
}
```

```javascript
// Composition API
import { ref, computed } from "vue";

const productPrice = ref(100)

const offerPrice = computed(() => productPrice.value * 50%)
const originalPrice = computed(() => productPrice.value)
...
```

**NOTA**: Todas las variables definidas como _computed_ son automáticamente reactivas.

### hooks
Se les antepone _on_ (ej, `onMounted`). Ya no son necesarios ni _beforeCreated_ ni _created_ que son sustituidas por el `setup`.

Podéis ver esto con más detalle en la [documentación de Vue](https://vuejs.org/api/composition-api-lifecycle.html).

### router
Para acceder al _router_ y a la variable _route_ en _composition API_ tenemos que importarlas de _vue-router_ e instanciarlas, ya que no tenemos acceso a _this_:
```javascript
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
```

### watchEffect y watch
_watch_ funciona como en _Vue2_:
```javascript
# Vue 3
import { ref, watch } from "vue";
setup(props) {
  const productPrice = ref(props.price);
  watch(productPrice, (current, prev) => {
    console.log('productPrice current: ' + current + ', prev: ' + prev)
  })
  ...
```

_watchEffect_ es una función que se ejecuta inmediatamente y cada vez que cambie alguna de sus dependencias reactivas:
```javascript
import { ref, watchEffect } from "vue";
setup(props) {
  const productPrice = ref(props.price);
  watchEffect(() => {
    console.log('productPrice current: ' + productPrice.value)
  })
  ...
```

Podemos obtener más información sobre cuándo usar un u otro método en [Escuela VUE](https://escuelavue.es/tips/vue-3-watch-vs-watcheffect/).

### Pinia
Los ficheros de _store_ no cambian pero sí la forma de usarlos en el componente. Allí se importa el _store_ y cada variable, _getter_ o _action_ que queramos usar en el componente:
```vue
<script setup>
import { useCounterStore } from '../stores/counterStore';
import { computed } from 'vue';

   // store
   const counterStore = useCounterStore();

   //state & getters
   const count = computed(() => counterStore.count);  // state
   const lastOperation = computed(() => counterStore.lastOperation);  // getter

   //actions
   const increment = () => counterStore.increment();
   const decrement = () => counterStore.decrement();
</script>

<template>
    <div>
        <p>Counter: { { count }}</p>
        <p>Last: { { lastOperation }}</p>
        <button @click="increment()">Add</button>
        <button @click="decrement()">Subtract</button>
    </div>
</template>
```

## Reusabilidad: _composables_
La principal razón de ser de la _composition API_ es que permite usar funciones **_composables_**, que son funciones donde podemos poner código _con estado_ (es decir, que usa variables reactivas). El nombre de las funciones _composables_ por convenio comienza por _use_ y se usan para encapsular código que podrá usar cualquier componente.

Por ejemplo podemos hacer una _composable_ que nos proporcione la posición actual del ratón:
```javascript
// mouse.js

import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}
```

La función _useMouse_ proporciona a quien la importe 2 variables reactivas (_x_ e _y_) donde se encuentra la posición actual del ratón, actualizada por la función _update_.

En cualquier componente donde necesitemos conocer la posición del ratón sólo necesitamos importar esta función:
```vue
<script setup>
  import { useMouse } from './useMouse';
  const { x, y } = useMouse();
</script>

<template>
  X: { { x }} Y: { { y }}
</template>
```

Siempre que pongamos un escuchador en una _composable_ (como hemos hecho en el `onMounted`) debemos quitarlo cuando ya no se utilice (en el `onUnmounted`).

### Valores devueltos
Como se ve la _composable_ devuelve un objeto formado por variables reactivas (_refs_) en lugar de un objeto reactivo. Se hace así por convención, lo que permite desestructurar las variables en el componente que las vaya a usar sin perder su reactividad (al desestructurar un _reactive_ deja de serlo).

Si lo hubiéramos hecho con un _reactive_ NO funcionaría:
```javascript
// mouse.js MAL

import { reactive, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = 0
  const y = 0

  ...
  return reactive({ x, y })
}
```
porque entonces al hacer en el componente
```javascript
  const { x, y } = useMouse();
```

las variables _x_ e _y_ dejarían de ser reactivas.

Podría hacerse no desestructurando el objeto, pero se prefiere así por claridad, para tener claras qué variables nos proporciona la función:
```vue
<script setup>
  import { useMouse } from './useMouse';
  const position = useMouse();
</script>

<template>
  X: { { position.x }} Y: { { position.y }}
</template>
```

Esto sí funcionaría pero se recomienda la otra forma: una _composable_ devuelve un array de variables reactivas que se importan (desestructurando el objeto) en el componente que las vaya a usar.

### Paso de parámetros
Podemos pasar parámetros a las funciones _composables_ en el momento de usarlas y dichos parámetros los recibirá directamente la _composable_ como cualquier otra función.

Por ejemplo podemos crear _useFetch_ a la que le pasamos una _url_ y hace un _fetch_ para hacer la llamada a esa url y devolver los datos o el error devueltos por el servidor. 
El componente que quiera usarla haría:
```vue
<script setup>
  import { useFetch } from './useFetch';
  const { data, error } = useFetch('https://jsonplaceholder.typicode.com/users/3')
</script>

<template>
  <div v-if="error">{{ error }}</div>
  <div v-else>
    // Aquí mostramos los datos recibidos en la variable 'data'
  </div>
</template>
```

Y nuestra función haría:
```javascript
// useFetch.js
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  fetch(url)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))

  return { data, error }
}
```

Si el parámetro recibido es reactivo podemos hacer que la función se ejecute cada vez que cambie observándolo con _watch_ o _watchEffect_:
```javascript
// fetch.js
import { ref, watch } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  function doFetch() {
    fetch(url.value)
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  }

  watch(url, () => doFetch())
  
  return { data, error }
}
```

Si nuestras _composables_ pueden recibir parámetros reactivos siempre es una buena práctica que puedan recibir también parámetros primitivos (en el caso anterior daría un error al hacer `fetch(url.value)` porque url es un _string_). La forma más correcta de hacerlo sería:
```javascript
// fetch.js
import { ref, isRef, unref, watchEffect } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  function doFetch() {
    // reset state before fetching..
    data.value = null
    error.value = null
    // unref() unwraps potential refs
    fetch(unref(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  }

  if (isRef(url)) {
    // setup reactive re-fetch if input URL is a ref
    watchEffect(doFetch)
  } else {
    // otherwise, just fetch once
    // and avoid the overhead of a watcher
    doFetch()
  }

  return { data, error }
}
```

En este caso se ha hecho una función que va a funcionar tanto si se le pasa un url estática como si se le pasa una reactiva. Lo que ha cambiado es:
- `isRef`: nos dice si el parámetro pasado es o no reactivo. Si no lo es llama directamente a la función. Si lo es hace
- `watchEffect`: cada vez que cambie el valor de _url_ llamará a la función
- `unref`: devuelve el `.value` de una variable si es reactiva o la variable si no lo es. Si _url_ es reactiva devuelve `url.value` y si no devuelve `url`.

### Organizar el código con _composables_
Además de para que el código sea fácilmente reutilizable, las _composables_ se usan para sacar código de un componente cuando este es demasiado grande o se encarga de varias funcionalidades. Una vez creadas las funciones se usan en el componente:
```javascript
<script setup>
import { useFeatureA } from './featureA.js'
import { useFeatureB } from './featureB.js'
import { useFeatureC } from './featureC.js'

const { foo, bar } = useFeatureA()
const { baz } = useFeatureB(foo)
const { qux } = useFeatureC(baz)
</script>
```

Si tenemos que usar una función _composable_ en un componente escrito en modo _Options API_ simplemente añadimos el _hook_ `setup` y allí la llamamos:
```javascript
import { useMouse } from './mouse.js'
import { useFetch } from './fetch.js'

export default {
  setup() {
    const { x, y } = useMouse()
    const { data, error } = useFetch('...')
    return { x, y, data, error }
  },
  mounted() {
    // setup() exposed properties can be accessed on `this`
    console.log(this.x)
  }
  // ...other options
}
```


Algunos enlaces útiles:
- [How to Create Reusable Components with the Vue 3 Composition API](https://www.sitepoint.com/vue-composition-api-reusable-components/)
- [Why I Love Vue 3's Composition API](https://mokkapps.de/blog/why-i-love-vue-3-s-composition-api/)

Podemos encontrar infinidad de _composables_ que podemos usar en nuestro código en la página [VueUse](https://vueuse.org/).
