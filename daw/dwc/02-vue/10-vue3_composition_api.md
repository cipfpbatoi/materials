# La _Composition API_ de Vue3
- [La _Composition API_ de Vue3](#la-composition-api-de-vue3)
  - [Introducción](#introducción)
  - [Ejemplo básico](#ejemplo-básico)
  - [setup](#setup)
  - [Reactividad en Vue3](#reactividad-en-vue3)
  - [Función _computed_](#función-computed)
  - [watchEffect y watch](#watcheffect-y-watch)
  - [Pinia](#pinia)

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

Cuándo es imprescindible usarla:
- si queremos soporte total de Typescript
- si nuestro componente es demasiado largo y queremos organizarlo por características (_features_)
- para mejorar la reutilización de código entre componentes

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

## setup
Lo primero que hace un componente que usa esta API es ejecutar su método _setup_, antes de evaluar ninguna otra característica (_data_, _computed_, _hooks_, ...). Por tanto este método no tiene acceso a _this_ como el resto. Para que pueda acceder a datos que pueda necesitar recibe 2 parámetros:
- __props__: aquí recibe los parámetros pasados al componente. Todos ellos son reactivos y se pueden observar con un _watch_
- __context__: es un objeto con las propiedades _attrs_, _slots_, _parent_ y _emit_.

El _hook_ **`setup()`** se encarga de:
- tareas de inicialización del componente: todo lo que antes se hacía en _created()_ o _mounted()_
- tareas de definición: aquí se definen las variables (que antes estaban en _data_), variables calculadas (antes _computed_), funciones (antes _methods_) o los _watchers_.
- devolver los elementos que se puedan usar en el _\<template>_ (variables y funciones)

Además de la sintaxis que hemos visto arriba existe una forma 'reducida' de escribir la parte de \<script> que es:
```vue
<script setup>
import { ref, defineProps, onMounted } from "vue";

const props = defineProps(['title'])
const count = ref(0)

function increment() {
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

Esta es la sintaxis recomendada cuando usamos SFC por simplicidad y rendimiento tal y como se indica en la [documentación de Vue3](https://vuejs.org/api/sfc-script-setup.html).

## Reactividad en Vue3
En la _composition API_ de Vue3 sólo las variables recogidas en _props_ son reactivas. Cualquier otra declarada en el _setup_ que queramos que lo sea debemos declararla con `ref` si es un tipo primitivo o `reactive` si es un objeto.

La función `ref` envuelve la variable en un objeto reactivo (es lo mismo que hace el método `data()` en la _options API_). El valor de la variable estará en su propiedad `.value`, aunque desde el template podemos usarla directamente como hemos visto en el código anterior.

En el caso de variables de tipos no primitivos (objetos, arrays, ...) se declaran con _reactive_ pero en este caso no es necesario usar la propiedad `.value`:
```vue
<script setup>
import { reactive, defineProps, onMounted } from "vue";

const props = defineProps(['title'])
const counter = reactive({ count: 0})

function increment() {
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

Tenemos funciones para ver si una variable es reactiva:
- `isRef(variable)`
- `isReactive(variable)`

## Función _computed_
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

const offerPrice: computed(() => productPrice.value * 50%)
const originalPrice: computed(() => productPrice.value)
...
```

Todas las variables definidas como _computed_ son automáticamente reactivas.

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

## Pinia
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
        <p>Counter: {{ count }}</p>
        <p>Last: {{ lastOperation }}</p>
        <button @click="increment()">Add</button>
        <button @click="decrement()">Subtract</button>
    </div>
</template>
```
