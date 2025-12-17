# Componsable functions
- [Componsable functions](#componsable-functions)
  - [Introducción](#introducción)
  - [Uso](#uso)
  - [Ejemplo: Posición del ratón](#ejemplo-posición-del-ratón)
  - [Singleton Componsables](#singleton-componsables)

## Introducción
Una función _componsable_ es una función que aprovecha la sintaxis de _Composition API_ para encapsular y reutilizar la lógica con estado, es decir, reactiva.

Al crear aplicaciones frontend, a menudo necesitamos reutilizar la lógica para tareas comunes. Por ejemplo, podríamos necesitar formatear fechas en varios lugares, por lo que extraemos una función reutilizable para ello. Esta función de formateo encapsula la lógica sin estado: toma una entrada y devuelve inmediatamente la salida esperada. Existen muchas bibliotecas para reutilizar la lógica sin estado, como _lodash_ y _date-fns_.

Por el contrario, la lógica con estado implica gestionar estados que cambian con el tiempo. Un ejemplo sencillo sería rastrear la posición actual del ratón en una página o el estado de la conexión a una base de datos.

Frente a un componente que renderiza una interfaz de usuario, una función componsable no devuelve nodos HTML sino datos reactivos y funciones que encapsulan la lógica con estado.

Su utilidad es tener funciones reutilizables, que puedan utilizarse por diferentes componentes. Pero también son útiles para hacer más pequeño un componente que haya crecido demasiado sacando parte de su funcionalidad a otros ficheros.

## Uso
Por convención, las funciones componsables se nombran con el prefijo `use`, como `useMouse` o `useDatabaseConnection`. Esto indica que la función proporciona una funcionalidad específica que puede ser reutilizada en diferentes componentes. Normalmente se guardan en archivos javascript o typescript dentro de `src/composables`.

Respecto a lo que devuelven, la convención es que no devuelvan un objeto reactivo con varias propiedades sino un objeto con varias propiedades reactivas, para que no se pierda la reactividad al desestructurarlo. Ejemplo:
```javascript
// MAL
export function useSomething() {
  const data = ref({ x: 0, y: 0});
  return data;
}

// BIEN
export function useSomething() {
  const x = ref(0);
  const y = ref(0);
  return { x, y };
}
```

## Ejemplo: Posición del ratón
Aquí hay un ejemplo sencillo de una función componsable que rastrea la posición del ratón en la ventana del navegador:
```javascript
// Fichero: src/composables/useMousePosition.js
import { ref, onMounted, onUnmounted } from 'vue';

export function useMousePosition() {
  const x = ref(0);
  const y = ref(0);

  const updateMousePosition = (event) => {
    x.value = event.clientX;
    y.value = event.clientY;
  };

  onMounted(() => {
    window.addEventListener('mousemove', updateMousePosition);
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', updateMousePosition);
  });

  return { x, y };
}
``` 

En este ejemplo, `useMousePosition` es una función componsable que utiliza variables reactivas para rastrear las coordenadas `x` e `y` del ratón. Utiliza los hooks del ciclo de vida `onMounted` y `onUnmounted` para agregar y eliminar el escuchador del ratón cuando el componente que usa esta función se monta y desmonta.

Para usar esta función componsable en un componente Vue, simplemente la importamos y la llamamos para acceder a sus variables o funciones:
```javascript
<script setup>
import { useMousePosition } from '@/composables/useMousePosition';

const { x, y } = useMousePosition();
</script>

<template>
  <div>
    <p>Posición del ratón: ({{ x }}, {{ y }})</p>
  </div>
</template>
```

Las coordenadas reactivas `x` e `y` se actualizan automáticamente a medida que el usuario mueve el ratón, y la interfaz de usuario refleja estos cambios en tiempo real.

Con este enfoque, hemos encapsulado la lógica de rastreo del ratón en una función componsable reutilizable que puede ser utilizada en múltiples componentes sin duplicar código.

## Singleton Componsables
A veces, es posible que deseemos que una función componsable mantenga un estado compartido entre múltiples componentes. En este caso, podemos implementar un patrón singleton dentro de la función componsable.

Vamos a hacer como ejemplo una función composable que rastrea el número de veces que se hace click en la ventana del navegador. 

Cada componente que utilice esta función tendrá su propio contador independiente:
```javascript
// Fichero: src/composables/useClickCounter.js
import { ref, onMounted, onUnmounted } from 'vue';
export function useClickCounter() {
  const count = ref(0);

  const increment = () => {
    count.value++;
  };

  onMounted(() => {
    window.addEventListener('click', increment);
  });

  onUnmounted(() => {
    window.removeEventListener('click', increment);
  });

  return { count };
}
```

En cada componente que queramos que tenga un contador de clics, simplemente importamos y llamamos a `useClickCounter`:
```javascript
<script setup>
import { useClickCounter } from '@/composables/useClickCounter';

const { count } = useClickCounter();
</script>

<template>
  <div>
    <p>Contador de clics: {{ count }}</p>
  </div>
</template>
```

Cada componente que llame a `useClickCounter` tendrá su propio contador independiente que comienza en 0 al cargarse ese componente.

Sin embargo, si quisiéramos que todos los componentes que utilicen esta función compartan el mismo contador de clics usaríamos el patrón _singleton_ para compartir una única instancia de la función entre todos los componentes:
```javascript
// Fichero: src/composables/useClickCounter.js
import { ref, onMounted, onUnmounted } from 'vue';

let instance;

export function useClickCounter() {
  if (!instance) {
    instance = createClickCounter();
  }
  return instance;
}

function createClickCounter() {
  const count = ref(0);

  const increment = () => {
    count.value++;
  };

  onMounted(() => {
    window.addEventListener('click', increment);
  });

  onUnmounted(() => {
    window.removeEventListener('click', increment);
  });

  return { count };
}
```
En este ejemplo, `useClickCounter` verifica si ya existe una instancia del contador de clics. Si no existe, crea una nueva instancia utilizando la función `createClickCounter`. De esta manera, todos los componentes que llamen a `useClickCounter` compartirán el mismo estado del contador de clics.

La usamos exactamente igual que antes, pero ahora todos los componentes compartirán el mismo contador:
```javascript
<script setup>
import { useClickCounter } from '@/composables/useClickCounter';

const { count } = useClickCounter();
</script>

<template>
  <div>
    <p>Contador de clics: {{ count }}</p>
  </div>
</template>
```

Cada vez que se haga clic en la ventana del navegador, el contador compartido se incrementará y todos los componentes que utilicen `useClickCounter` reflejarán el mismo valor actualizado del contador.
