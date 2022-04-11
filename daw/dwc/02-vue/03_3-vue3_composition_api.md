# La _Composition API_ de Vue3
- [La _Composition API_ de Vue3](#la-composition-api-de-vue3)
  - [Introducción](#introducción)
  - [setup](#setup)
  - [Reactividad en Vue3](#reactividad-en-vue3)
  - [Función _computed_](#función-computed)
  - [watchEffect y watch](#watcheffect-y-watch)

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

Vue3 permite seguir trabajando así pero incorpora una nueva forma de trabajar con nuestros componentes, la _Composition API_. En ella se define un _hook_ llamado `setup()` donde escribimos el código que inicializa el componente y devuelve un objeto con las variables y métodos que podrá usar el resto del componente (por ejemplo el _template_).
```javascript
export default {
  name: "ComponentName",
  props: { ... },     // Props
  setup(props, context) {
    // Init logic, lifecycle hooks, etc...
    return {
      // Data, methods, computed, etc...
    }
  }
}
```

Esto es especialmente útil en aplicaciones grandes ya que va a permitir que nuestros componentes sean mucho más reutilizables. Además nos va a permitir organizar el código por funcionalidades y no por _opciones_. Por ejemplo si un componente muestra una serie de datos y tiene filtrado de datos y paginación de los mismos en el `data()` definiré variables para los datos, variables para el filtrado y variables para la paginación. En `computed` puede que también tenga métodos para las 3 cosas y el `methods` tendré varios métodos para cada una de las 3 funcionalidades. La _composition API_ me va a permitir que todo el código (_data_, _computed_, _methods_, ...) referente a la funcionalidad de mostrar los datos esté junto y lo mismo para las funcionalidades de filtrar y de paginar:

![composition api vs options api](https://vuejs.org/assets/composition-api-after.e3f2c350.png)

Cuándo es imprescindible usarla:
- si queremos soporte total de Typescript
- si nuestro componente es demasiado largo y queremos organizarlo por características (_features_)
- para mejorar la reutilización de código entre componentes

El ejemplo del contador quedaría:
```vue
<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// reactive state
const count = ref(0)

// functions that mutate state and trigger updates
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>
```

Fijaos que para hacer reactiva una variable hemos de declararla con `ref`. Su valor lo obtenemos dentro de la propiedad `.value`, aunque en el _\<template>_ no es necesario poner el _.value_.

En el caso de objetos (incluidos arrays) se hacen reactivos con `reactive`:
```vue
<template>
  <button @click="increment">Count is: {{ counter.count }}</button>
</template>

<script setup>
import { reactive, onMounted } from 'vue'

const counter = reactive({
    count: 0
})

function increment() {
  counter.count++
}
</script>
```

## setup
Lo primero que hace un componente que usa esta API es ejecutar su método _setup_, antes de evaluar ninguna otra característica (_data_, _computed_, _hooks_, ...). Por tanto este método no tiene acceso a _this_ como el resto. Para que pueda acceder a datos que pueda necesitar recibe 2 parámetros:
- __props__: aquí recibe los parámetros pasados al componente. Todos ellos son reactivos y se pueden observar con un _watch_
- __context__: es un objeto con las propiedades _attrs_, _slots_, _parent_ y _emit_.

El _hook_ **`setup()`** se encarga de:
- tareas de inicialización del componente: todo lo que antes se hacía en _created()_ o _mounted()_
- tareas de definición: aquí se definen las variables (que antes estaban en _data_), variables calculadas (antes _computed_), funciones (antes _methods_) o los _watchers_.
- devolver los elementos que se puedan usar en el _\<template>_ (variables y funciones)

## Reactividad en Vue3
En Vue3 sólo las variables pasadas en _props_ son automáticamente reactivas. Cualquier otra declarada en el _setup_ que queramos que lo sea debemos declararla con `reactive` si es un objeto o `ref` si es un tipo primitivo. En el caso de _ref_ se envuelve la variable en un objeto reactivo y para acceder a su valor usamos su propiedad `.value`:
```javascript
import { reactive, ref } from 'vue'

export default {
  // `setup` is a special hook dedicated for composition API.
  setup() {
    const state = reactive({ count: 0 })
    const age = ref(18)

    // expose the state and age to the template
    return {
      state,
      age
    }
  }
}
```

La función `ref` envuelve la variable en un objeto reactivo, que es lo mismo que hace el método `data()` en la _options API_.

Tenemos funciones para ver si una variable es reactiva:
- `isRef(variable)`
- `isReactive(variable)`

## Función _computed_
El uso de _computed_ cambia ya que ahora es una función en compte d'un objecte.
```javascript
# Vue 2
computed: {
  offerPrice() {
    return this.productPrice * 50%
  }
}
```

```javascript
# Vue 3
import { ref, computed } from "vue";
setup(props) {
  const productPrice = ref(props.price);
  const offerPrice: computed(() => this.price.value * 50%)
  ...
```

## watchEffect y watch
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

[muy interesante](https://lenguajejs.com/vuejs/componentes/composition-api/)