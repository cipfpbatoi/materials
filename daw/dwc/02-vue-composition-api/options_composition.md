# _Options API_ vs _Composition API_. Reactividad
- [_Options API_ vs _Composition API_. Reactividad](#options-api-vs-composition-api-reactividad)
  - [Introducción](#introducción)
  - [Reactividad en Vue](#reactividad-en-vue)
  - [_Options API_](#options-api)
  - [_Composition API_](#composition-api)
    - [Reactividad con objetos y arrays](#reactividad-con-objetos-y-arrays)
    - [reactive()](#reactive)
  - [Comunicación entre componentes y reactividad](#comunicación-entre-componentes-y-reactividad)
  - [Variables calculadas y observadores](#variables-calculadas-y-observadores)

## Introducción
En los apartados anteriores hemos visto cómo crear aplicaciones Vue usando la _Options API_. Esta forma de programar es muy sencilla y adecuada para aplicaciones pequeñas y medianas. Sin embargo, a medida que las aplicaciones crecen en tamaño y complejidad, la _Options API_ puede volverse difícil de manejar debido a la dispersión de la lógica relacionada en diferentes opciones del componente (como `data`, `methods`, `computed`, etc.).

Para abordar estos desafíos, Vue 3 introdujo la _Composition API_, que permite organizar y reutilizar la lógica de una manera más flexible y modular. En este apartado vamos a ver las diferencias entre ambas formas de programar en Vue, centrándonos en la reactividad.

## Reactividad en Vue
Vue usa un sistema de reactividad que hace que cuando una variable que está enlazada a la vista cambia su valor automáticamente se actualice la vista para reflejar el nuevo valor.

Esto se logra mediante un sistema de **observadores** que detectan cambios en los datos y actualizan la vista en consecuencia. Cuando se modifica una propiedad reactiva, Vue se encarga de realizar un seguimiento de las dependencias y vuelve a renderizar los componentes afectados.

Este sistema de reactividad es una de las características más potentes de Vue, ya que permite crear interfaces de usuario dinámicas y reactivas de manera sencilla y eficiente.

## _Options API_
En la _Options API_ cada componente exporta un objeto con diferentes opciones como `data`, `methods`, `computed`, `watch`, etc. Cada una de estas opciones tiene una función específica:
- `data`: define el estado reactivo del componente. Todas las variables definidas aquí son reactivas
- `methods`: define los métodos del componente. Aquí se definen las funciones que pueden modificar el estado o realizar acciones
- `computed`: define propiedades computadas que dependen de otras propiedades reactivas. Se definen como funciones y su valor se recalcula automáticamente cuando cambian sus dependencias
- `props`: define las propiedades que el componente puede recibir de su padre
- `mounted`, `created`, etc.: son _hooks_ del ciclo de vida del componente que permiten ejecutar código en momentos específicos del ciclo de vida del componente.
- `watch`: define observadores que reaccionan a cambios en propiedades reactivas. Se usan para ejecutar código en respuesta a cambios específicos en el estado.
- Y otras opciones más avanzadas.

Todas las variables que definamos en `data`, así como las propiedades recibidas en `props` y las declaradas en `computed`, son reactivas, lo que significa que Vue actualiza automáticamente el DOM para reflejar cualquier cambio en su estado.

Son directamente accesibles en el _template_ pero para acceder a ellas en el _script_ debemos hacerlo a través de `this.`. Por ejemplo, si tenemos una variable `count` en `data`, para acceder a ella en un método debemos usar `this.count`.

Ejemplo:

```vue
<script>
export default {
  data: () => ({
    count: 0,
  }),
  computed: {
    binaryCount() {
      return this.count.toString(2);
    },
  },
  methods: {
    increment() {
      this.count++;
    },
  },
};
</script>
<template>
  <div>
    <p>Count: { { count }}</p>
    <p>Binary Count: { { binaryCount }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
```

En este ejemplo, `count` es una variable reactiva declarada en `data`. La función `increment` modifica su valor y `binaryCount` es una propiedad calculada que devuelve el valor de `count` en binario. Todas estas variables y funciones están disponibles en el _template_.

## _Composition API_
En la _Composition API_, en lugar de definir un objeto con diferentes opciones, usamos una función llamada `setup()` que se ejecuta cuando se crea el componente. Dentro de esta función podemos definir variables, funciones y lógica de negocio de manera más libre y modular. 

Para que una variable definida allí sea reactiva debemos inicializarla usando la función `ref()`. Esto _envuelve_ la variable en un objeto reactivo. Para acceder o modificar su valor debemos usar la propiedad `.value` (aunque desde el _template_ accedemos a ella directamente).

Ejemplo:

```vue
<script>
import { ref, computed } from "vue";

export default {
  setup() {
    const count = ref(0);

    const increment = () => {
      count.value++;
    };

    const binaryCount = computed(() => count.value.toString(2));

    return {
      count,
      increment,
      binaryCount,
    };
  },
};
</script>
<template>
  <div>
    <p>Count: { { count }}</p>
    <p>Binary Count: { { binaryCount }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
```

En este ejemplo, `count` es una variable reactiva por haber sido inicializada con `ref(0)`. La función `increment` modifica su valor y `binaryCount` es una propiedad calculada definida con `computed`. Todas estas variables y funciones se devuelven desde `setup()` para que estén disponibles en el _template_.

Existe una sintaxis alternativa llamada _script setup_ que simplifica aún más el uso de la _Composition API_. En este caso no es necesario exportar un objeto ni definir la función `setup()`. Simplemente se escribe el código directamente en el bloque `<script setup>` y todas las variables y funciones definidas allí están disponibles en el _template_:

```vue
<script setup>
import { ref, computed } from "vue";

const count = ref(0);

const increment = () => {
  count.value++;
};

const binaryCount = computed(() => count.value.toString(2));
</script>

<template>
  <div>
    <p>Count: { { count }}</p>
    <p>Binary Count: { { binaryCount }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
```

Esta es la sintaxis que usaremos.

### Reactividad con objetos y arrays
Vue también proporciona reactividad para arrays y objetos. Cuando se modifican los elementos de un array o las propiedades de un objeto reactivo, Vue detecta estos cambios y actualiza la vista en consecuencia.

Por ejemplo, si tenemos un array reactivo y añadimos un nuevo elemento, la vista se actualizará automáticamente:

```vue
<script setup>
import { ref } from 'vue';

const items = ref(['Elemento 1', 'Elemento 2']);
const addItem = () => {
  items.value.push(`Elemento ${items.value.length + 1}`);
};
</script>
<template>
  <ul>
    <li v-for="item in items" :key="item">{ { item }}</li>
  </ul>
  <button @click="addItem">Añadir Elemento</button>
</template>
```

En este ejemplo, `items` es un array reactivo. Al llamar a `addItem`, se añade un nuevo elemento al array, y la vista se actualiza automáticamente para mostrar el nuevo elemento.

De manera similar, si tenemos un objeto reactivo y modificamos una de sus propiedades, Vue también detectará el cambio y actualizará la vista:
```vue
<script setup>
import { reactive } from 'vue';
const persona = ref({
  nombre: 'Juan',
  edad: 30
});
const cambiarNombre = (nuevoNombre) => {
  persona.value.nombre = nuevoNombre;
};
</script>
```

En este caso, `persona` es un objeto reactivo. Al llamar a `cambiarNombre`, se modifica la propiedad `nombre`, y la vista se actualiza automáticamente para reflejar el nuevo nombre.
Es importante tener en cuenta que, para que Vue pueda detectar los cambios en arrays y objetos, se deben utilizar los métodos proporcionados por Vue (como `push`, `splice`, etc. para arrays) o modificar las propiedades directamente en el caso de objetos reactivos.

### reactive()
Si la variable que queremos que sea reactiva es un objeto o un array podemos usar `reactive()` en lugar de `ref()` para declararla y en ese caso no es necesario usar `.value` para acceder a sus propiedades o elementos, ya que Vue hace un _unwrap_ automático de los mismos:

```vue
<script setup>
import { ref } from "vue";

const user = reactive({
  name: "John",
  age: 30,
});

const updateName = (newName) => {
  user.name = newName;
};
</script>
<template>
  <div>
    <p>Name: { { user.name }}</p>
    <p>Age: { { user.age }}</p>
    <button @click="updateName('Jane')">Change Name</button>
  </div>
</template>
```

Sin embargo `reactive()` tiene algunas limitaciones que podemos ver en la [documentación oficial de Vue](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#limitations-of-reactive) por lo que se recomienda usar `ref()` incluso para objetos y arrays.

## Comunicación entre componentes y reactividad
Como veremos en el siguiente tema, cuando se trabaja con componentes en Vue la reactividad también se extiende a la comunicación entre componentes. Los componentes pueden pasar datos entre sí utilizando props y eventos, y Vue garantiza que cualquier cambio en los datos reactivos se refleje en todos los componentes afectados.

Por ejemplo, si un componente padre pasa un objeto reactivo como prop a un componente hijo, cualquier cambio en ese objeto dentro del componente hijo se reflejará automáticamente en el componente padre y viceversa.

Además, Vue proporciona un sistema de gestión de estado, como Pinia, que permite compartir datos reactivos entre múltiples componentes de manera más estructurada y escalable.

En resumen, la reactividad en Vue es una característica fundamental que facilita la creación de interfaces de usuario dinámicas y reactivas, tanto a nivel de variables individuales como en la comunicación entre componentes.

## Variables calculadas y observadores
Como hemos visto con `computed` podemos declarar variables calculadas que dependen de otras variables reactivas. En realidad es como una función que devuelve un valor calculado en función de otras variables. 

Pero la ventaja de definirlas como `computed` y no como una función normal es que Vue cachea su valor por lo que no vuelven a calcularse cada vez que son llamadas. Sólo las recalcula cuando cambia alguna de las variables de las que dependen, lo que mejora el rendimiento de la aplicación.

A la hora de llamarlas se llaman como si fueran variables normales y no como funciones (se llaman sin `()`).

El valor devuelto por una propiedad computada es un estado derivado por lo que su valor debe tratarse como de solo lectura y nunca debe modificarse; en su lugar, actualiza el estado de origen del que depende para activar nuevos cálculos.

**IMPORTANTE**: las funciones computadas solo deben realizar cálculos puros y estar libres de efectos secundarios: no deben modificar otros estados, realizar solicitudes asíncronas ni modificar el DOM. Su única responsabilidad debe ser calcular y devolver un valor en función de otros. Más adelante en esta guía, hablaremos sobre cómo realizar efectos secundarios en respuesta a cambios de estado con _watchers_ (observadores).

