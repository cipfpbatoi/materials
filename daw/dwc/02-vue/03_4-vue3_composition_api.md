# La _Composition API_ de Vue3
Vue3 incluye una importante novedad, la _Composition API_, aunque podemos seguir usando la _Options API_ clásica de Vue2 donde cada elemento (data, computed, methods, ...) es una opción del componente.

_Options API_:
```javascript
export default {
  name: "ComponentName",
  props: { ... },
  data() { return {...} },
  computed: { ... },ps
  methods: { ... },
  mounted() { ... },
  ...
}
```

_Composition API_:
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

Cuándo es imprescindible usarla:
- si queremos soporte total de Typescript
- si nuestro componente es demasiado largo y queremos organizarlo por características (_features_)
- para mejorar la reutilización de código entre componentes

Lo primero que hace un componente que usa esta API es ejecutar su método _setup_, antes de evaluar ninguna otra característica (data, computed, hooks, ...). Por tanto este método no tiene acceso a _this_ como el resto. Para que pueda acceder a datos que pueda necesitar recibe 2 parámetros:
- _props_: aquí recibe los parámetros pasados al componente. Todos ellos son reactivos y se pueden observar con un _watch_
- _context_: es un objeto con las propiedades _attrs_, _slots_, _parent_ y _emit_.

El _hook_ **`setup()`** se encarga de:
- tareas de inicialización del componente: todo lo que antes se hacía en _created()_ o _mounted()_
- tareas de definición: aquí se definen las variables (que antes estaban en _data_), variables calculadas (antes _computed_), funciones (antes _methods_) o los _watchers_.
- devolver los elementos que se puedan usar en el _\<template>_ (variables y funciones)

[muy interesante](https://lenguajejs.com/vuejs/componentes/composition-api/)