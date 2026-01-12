# Componsable functions
- [Componsable functions](#componsable-functions)
  - [Introducción](#introducción)
  - [Usar _composables_](#usar-composables)
  - [Ejemplo: Posición del ratón](#ejemplo-posición-del-ratón)
  - [Ejemplo: Llamadas a una API](#ejemplo-llamadas-a-una-api)
  - [Ejemplo: Temporizador](#ejemplo-temporizador)
  - [Singleton Componsables](#singleton-componsables)

## Introducción
Una función _componsable_ es una función que permite encapsular y reutilizar la lógica con estado, es decir, reactiva.

Al crear aplicaciones frontend, a menudo necesitamos reutilizar la lógica para tareas comunes. Por ejemplo, podríamos necesitar formatear fechas en varios lugares, por lo que extraemos una función reutilizable para ello. Esta función de formateo encapsula la lógica sin estado: toma una entrada y devuelve inmediatamente la salida esperada. Existen muchas bibliotecas para reutilizar la lógica sin estado, como _lodash_ y _date-fns_.

Por el contrario, la lógica con estado implica gestionar estados que cambian con el tiempo. Un ejemplo sencillo sería rastrear la posición actual del ratón en una página o el estado de la conexión a una base de datos.

Frente a un componente que renderiza una interfaz de usuario, una función componsable no devuelve nodos HTML sino datos reactivos y funciones que encapsulan la lógica con estado.

Su utilidad es tener funciones reutilizables, que puedan utilizarse por diferentes componentes. Pero también son útiles para hacer más pequeño un componente que haya crecido demasiado sacando parte de su funcionalidad a otros ficheros.

## Usar _composables_
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

## Ejemplo: Llamadas a una API
Otro ejemplo común de una función componsable es la gestión de llamadas a una API. Aquí hay un ejemplo sencillo de una función componsable que realiza una llamada a una API para obtener datos y maneja el estado de carga y error:
```javascript
// Fichero: src/composables/useFetch.js
import { ref } from 'vue

export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const fetchData = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(url);
      if (response.ok) {
        data.value = await response.json();
      } else {
        error.value = `Error ${response.status} en la llamada a la API`;
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return { data, error, loading, fetchData };
}
```
En este ejemplo, `useFetch` es una función componsable que realiza una llamada a una API y maneja el estado de carga y error. Proporciona variables reactivas `data`, `error` y `loading`, así como una función `fetchData` para iniciar la llamada a la API.
Para usar esta función componsable en un componente Vue, simplemente la importamos y la llamamos para acceder a sus variables y funciones:
```javascript
<script setup>
import { useFetch } from '@/composables/useFetch';
import { ref } from 'vue';

const postId = ref(1);
const { data, error, loading, fetchData } = useFetch(`https://jsonplaceholder.typicode.com/posts/${postId.value}`);
</script>

<template>
  <div>
    <div>
      <label>Post a cargar:</label>
      <input v-model="`postId`" placeholder="ID del post" />
      <button @click="fetchData">Cargar datos</button>
    </div>
    <div v-if="loading">Cargando...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>
```

## Ejemplo: Temporizador
Vamos a ver un temporizador que nos permite saber los segundos transcurridos desde que se activa:
```javascript
// Fichero: src/composables/useTimer.js
import { ref, onMounted, onUnmounted } from 'vue';
export function useTimer() {
  const time = ref(0);
  let intervalId = null;

  const start = () => {
    if (intervalId) return; // Evitar múltiples activaciones
    intervalId = setInterval(() => {
      time.value++;
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalId);
    intervalId = null;
  };

  const reset = () => {
    time.value = 0;
  };

  onUnmounted(() => {
    clearInterval(intervalId);
  });

  return { time, start, stop, reset };
}
```
En este ejemplo, `useTimer` es una función componsable que proporciona un temporizador con funciones para iniciar, detener y reiniciar el conteo. Utiliza una variable reactiva `time` para rastrear el tiempo transcurrido en segundos.
Para usar esta función componsable en un componente Vue, simplemente la importamos y la llamamos para acceder a sus variables y funciones:
```javascript
<script setup>
import { useTimer } from '@/composables/useTimer';
const { time, start, stop, reset } = useTimer();
</script>
<template>
  <div>
    <p>Tiempo transcurrido: { { time }} segundos</p>
    <button @click="start">Iniciar</button>
    <button @click="stop">Detener</button>
    <button @click="reset">Reiniciar</button>
  </div>
</template>
```

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
