
# Axios
- [Axios](#axios)
  - [Introducción](#introducción)
  - [Instalación](#instalación)
  - [Usar _axios_](#usar-axios)
  - [Aplicación de ejemplo](#aplicación-de-ejemplo)
    - [Fichero **_api.js_**](#fichero-apijs)
    - [store/index.js](#storeindexjs)
    - [TodoList.vue](#todolistvue)
    - [TodoItem.vue](#todoitemvue)
    - [AddTodo.vue](#addtodovue)
  - [Uso avanzado de axios](#uso-avanzado-de-axios)
    - [Api con varias tablas](#api-con-varias-tablas)
    - [Api como clase](#api-como-clase)
    - [El fichero _.env_](#el-fichero-env)
  - [Axios interceptors](#axios-interceptors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introducción
El framework _Vue_ sólo se ocupa de la capa de vista de la aplicación pero su "ecosistema" como sus creadores le llaman, incluye multitud de herramientas para todo lo que podamos necesitar a la hora de realizar grandes proyectos.

Una de las librerías más utilizadas es la que permite realizar de forma sencilla peticiones Ajax a un servidor. Existen múltiples librerías para ello y la más utilizada es [**axios**](https://github.com/axios/axios).

Aunque podríamos hacer las peticiones Ajax como vimos en Javascript (con _fetch_ y _async/await_) es más sencillo con _axios_. Axios ya devuelve los datos transformados a JSON en una propiedad llamada _data_.

## Instalación
Como esta librería vamos a usarla en producción la instalaremos como dependencia del proyecto:
```[bash]
npm install axios -S
```

## Usar _axios_
En el componente en que vayamos a usarla la importaremos:
```vue
import axios from 'axios'
```
Como es una dependencia incluida en el _package.json_ no se indica su ruta (se buscará en **node-modules**).

Ya podemos hacer peticiones Ajax en el componente. Para ello axios incluye los métodos:
* **.get(url)**: realiza una petición GET a la url pasada como parámetro que supondrá una consulta SELECT a la base de datos
* **.post(url, objeto)**: realiza una petición POST a la url pasada como parámetro que posiblemente realizará un INSERT del objeto pasado como segundo parámetro
* **.put(url, objeto)**: realiza una petición PUT a la url pasada como parámetro que posiblemente realizará un UPDATE sobre el registro indicado en la url que será actualizado con los datos del objeto pasado como segundo parámetro
* **.delete(url)**: realiza una petición DELETE a la url pasada como parámetro que supondrá una consulta DELETE a la base de datos para borrar el registro indicado en la url

Estos métodos devuelven una promesa por lo que al hacer la petición deberemos anteponerle el **`await`** o bien indicaremos con **`.then`** y **`.catch`** la función que se ejecutará cuando responda el servidor si la petición se resuelve correctamente y la que se ejecutará si ocurre algún error respectivamente.

Lo que devuelve es un objeto que tiene, entre otras, las propiedades:
* **`data`**: aquí tendremos los datos devueltos por el servidor ya procesados
* `status`: obtendremos el código de la respuesta del servidor (200, 404, ...)
* `statusText`: el texto de la respuesta del servidor ('Ok', 'Not found', ...)
* `message`: mensaje del servidor en caso de producirse un error
* `headers`: las cabeceras HTTP de la respuesta
* ...

La sintaxis de una petición GET a axios usando _async/await_ sería algo como:
```javascript
try {
  const response = await axios.get(url)
  console.log(response.data)
} catch (response) {
  console.error(response.message) 
}
```

y usando promesas sería algo como:
```javascript
axios.get(url)
  .then(response => console.log(response.data))
  .catch(response => console.error(response.message))
```

## Aplicación de ejemplo
Vamos a seguir con la aplicación de la lista de tareas pero ahora los datos no serán un array estático sino que estarán en un servidor. Usaremos como servidor para probar la aplicación [**json-server**](#json-server) por lo que las peticiones serán a la URL 'localhost:3000' que es el servidor web de json-server.

Los cambios que debemos hacer en nuestra aplicación son:
1. Eliminamos el componente _DelAll.vue_ ya que no tiene sentido borrar todos los datos de un servidor y _json-server_ no tiene esa funcionalidad
2. Crearemos un servicio _api.js_ que se encargue de hacer las peticiones al servidor. En este servicio eliminaremos el método _clearTodos_ que ya no tiene sentido y añadimos 2 nuevos:
   1. `fetchTodos()`: que hará una petición GET para obtener todos los datos, ya que al pricipio el array de tareas estará vacío
   2. `toggleDone(id, done)`: que hará una petición PATCH para modificar el campo _done_ de una tarea concreta ya que ahora debe modificarse en el servidor
3. El componente principal (TodoList) pide al _store_ que cargue los datos del servidor al montarse (en el _hook_ **onMounted()**)
4. Al borrar un elemento haremos una petición al servidor para que lo borre de allí y cuando sepamos que se ha borrado lo borramos del array (o recargamos los datos)
5. Lo mismo al insertar un nuevo elemento
6. Al marcar/desmarcar un elemento lo modificaremos en la base de datos y el _store_ actualizará el array local

Puedes descargar el código del [repositorio de GitHub](https://github.com/juanseguravasco/vue-todo-list/tree/5-ajax).

### Fichero **_api.js_**
```javascript
import axios from 'axios';
const SERVER_URL = 'http://localhost:3000';

const fetchTodos = async () => {
      const response = await axios.get(`${SERVER_URL}/todos`);
      return response.data;
};

const addTodo = async (todo) => {
  const response = await axios.post(`${SERVER_URL}/todos`, todo);
  return response.data;
};

const removeTodo = async (todoId) => {
  await axios.delete(`${SERVER_URL}/todos/${todoId}`);
};

const toggleTodoDone = async (todoId, done) => {
  const response = await axios.patch(`${SERVER_URL}/todos/${todoId}`, { done });
  return response.data;
}

export { fetchTodos, addTodo, removeTodo, toggleTodoDone };
```

### store/index.js
```javascript
import { reactive } from "vue";
import * as api from "../services/api";

export const store = {
  debug: true,
  state: reactive({
    todos: [],
  }),
  async fetchTodosAction() {
    if (this.debug) console.log("fetchTodosAction triggered");
    this.state.todos = await api.fetchTodos();
  },
  async addTodoAction(newTodo) {
    if (this.debug) console.log("addTodoAction triggered with ", newTodo);
    const addedTodo = await api.addTodo(newTodo);
    this.state.todos.push(addedTodo);
  },
  async removeTodoAction(todoIdToRemove) {
    if (this.debug)
      console.log("removeTodoAction triggered with id ", todoIdToRemove);
    await api.removeTodo(todoIdToRemove);
    this.state.todos = this.state.todos.filter((todo) => todo.id !== todoIdToRemove);
  },
  async toggleDoneAction(todoId, done) {
    if (this.debug)
      console.log("toggleDoneAction triggered with id ", todoId, " done: ", done);
    const updatedTodo =  await api.toggleTodoDone(todoId, done);
    const index = this.state.todos.findIndex((todo) => todo.id === todoId);
    if (index !== -1) {
      this.state.todos[index] = updatedTodo;
    }
  }
};
```

### TodoList.vue
```vue
<script setup>
import { computed, onMounted } from "vue";
import { store } from "../store/index.js";
import TodoItem from "./TodoItem.vue";

onMounted(async () => {
  try {
    await store.fetchTodosAction();
  } catch (error) {
    alert("Error fetching todos: " + error.message);
  }
});
const todos = computed(() => store.state.todos);
</script>

<template>
  <ul v-if="todos.length">
    <todo-item v-for="todo in todos" :key="todo.id" :item="todo" />
  </ul>
  <p v-else>No hay tareas que mostrar</p>
</template>

```

El _hook_ **onMounted()** se ejecuta al montarse el componente. En sistaxis de _Options API_ sería el _hook_ **mounted()**:

```javascript
export default {
  mounted() {
    try {
      await store.fetchTodosAction();
    } catch (error) {
      alert("Error fetching todos: " + error.message);
    }
  },
...
}
```

### TodoItem.vue
```vue
<script setup>
import { defineProps } from "vue";
import { store } from "../store";

const props = defineProps({
  item: Object,
});

const delTodo = () => {
  store.removeTodoAction(props.item.id);
};
const toggleDone = () => {
  store.toggleDoneAction(props.item.id, !props.item.done);
};
</script>
<template>
  <li>
    <label>
      <del v-if="item.done">
        { { item.title }}
      </del>
      <span v-else>
        { { item.title }}
      </span>
    </label>
    <button @click="toggleDone()">
      { { item.done ? "No Hecha" : "Hecha" }}
    </button>
    <button @click="delTodo()">Borrar</button>
  </li>
</template>
```

El método _toggleDone_ ya no cambia nada sino que llama a la acción del _store_ que se encargará de hacer la petición al servidor y actualizar el array local. No es necesario poner el _await_ porque no necesitamos esperar a que termine la petición (luego no se hace nada) y cuando cambien los datos en el _store_ Vue se encargará de actualizar la vista.

### AddTodo.vue
Lo único que cambia es el método _addTodo_ es que ahora conviene poner un _await_ en la llamada del _store_ para que no borre el _newTodo_ si falla la petición.

Además tanto esta petición como las de borrar y cambiar el _done_ del _TodoItem.vue_ deberían estar dentro de un bloque `try/catch` para capturar posibles errores en la petición y mostrarlos al usuario.

## Uso avanzado de axios
En lugar de usar _axios_ directamente podemos crear un _axios personalizado_ donde definamos las opciones que necesitemos para todas las peticiones. De esta forma no tendremos que repetirlas en cada petición y si tenemos que cambiar algo (la ruta del servidor, añadir un token de autenticación, etc) lo haremos en un único sitio.

Algunas de las opciones que podemos definir son:
* **baseURL**: la parte inicial de la URL de todas las peticiones
* **headers**: las cabeceras HTTP que enviaremos en cada petición (por ejemplo el tipo de datos que enviamos y el que esperamos recibir o algún _token_ de autenticación)
* **timeout**: tiempo máximo de espera para la respuesta del servidor
* **withCredentials**: indica si se deben enviar las cookies junto a la petición (útil para autenticación basada en cookies)

```javascript
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.token
  }
})
```

Y usaremos esta instancia para hacer las peticiones: `apiClient.get('/todos')`, `apiClient.post('/todos', newTodo)`, etc.

### Api con varias tablas
Si trabajamos con varias tablas podemos hacer un fichero de repositorio para cada una de ellas o bien podemos escribir lo mismo de antes pero de forma más concisa:
```javascript
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

const todos = {
    getAll: () => apiClient.get(`/todos`),
    getOne: (id) => apiClient.get(`/todos/${id}`),
    create: (item) => apiClient.post(`/todos`, item),
    modify: (item) => apiClient.put(`/todos/${item.id}`, item),
    delete: (id) => apiClient.delete(`/todos/${id}`),
    toogleDone: (item) => apiClient.patch(`/todos/${item.id}`, { done: !item.done }),
}

const categories = {
    getAll: () => apiClient.get(`/categories`),
    getOne: (id) => apiClient.get(`/categories/${id}`),
    create: (item) => apiClient.post(`/categories`, item),
    modify: (item) => apiClient.put(`/categories/${item.id}`, item),
    delete: (id) => apiClient.delete(`/categories/${id}`),
}


export default {
    todos,
    categories,
}
```

Y en los componentes donde queramos usarlo importamos el fichero y llamamos a las funciones que necesitemos, por ejemplo `api.todos.getAll()`.

### Api como clase
También podemos usar programación orientada a objetos para hacer nuestra Api y construir una clase que se ocupe de las peticiones a la API:

```javascript
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default class APIService{
  constructor(){
  }
  getTodos() {
    return apiClient.get('/todos')
  }
  delTodo(id){
    return apiClient.delete('/todos/'+id)
  },
  ...
}
```

Y en los componentes donde queramos usarlo importamos la clase y creamos una instancia de la misma:
```javascript
import APIService from '../APIService'

const apiService = new APIService()

const todos = async () => {
  await apiService.getTodos()
}
```

### El fichero _.env_
Se trata de un fichero donde guardar las configuraciones de la aplicación y la ruta del servidor es una constante que estaría mejor en este fichero que en el código como hemos hecho nosotros. 

Vue por medio de _Vite_ puede acceder a todas las variables de _.env_ que comiencen por VITE_ por medio del objeto `import.meta.env` por lo que en nuestro código en vez de darle el valor a _baseURL_ podríamos haber puesto:
```javascript
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_RUTA_API,
  ...
})
```

Y en el fichero **_.env_** ponemos
```bash
VITE_RUTA_API=http://localhost:3000
```

Si usamos Vue con _webpack_ las variables de _.env_ deben comenzar por VUE_APP_ y accedemos a ellas por medio del objeto `process.env` por lo que en el fichero `.env` definiríamos la variable `VUE_APP_RUTA_API=http://localhost:3000` y en nuestro código pondría:
```javascript
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_RUTA_API,
  ...
})
```

El fichero _.env_ por defecto se sube al repositorio por lo que no debemos poner información sensible (como usuarios o contraseñas). Para ello tenemos un fichero **_.env.local_** que no se sube, o bien debemos añadir al _.gitignore_ dicho fichero. En cualquier caso, si el fichero con la configuración no lo subimos al repositorio es conveniente tener un fichero _.env.exemple_, que sí se sube, con valores predeterminados para las distintas variables que deberán cambiarse por los valores adecuados en producción. Además del _.env_ y el _.env.local_ también hay distintos ficheros que son usados en desarrollo (_.env.development_) y en producción (_.env.production_) y que pueden tener distintos datos según el entorno en que nos encontramos. Por ejemplo en el de desarrollo el valor de VUE_APP_RUTA_API podría ser "http://localhost:3000" si usamos _json-server_ mientras que en el de producción tendríamos la ruta del servidor de producción de la API.

## Axios interceptors
Podemos hacer que se ejecute código antes de cualquier petición a axios o tras recibir la respuesta del servidor usando los _interceptores_ de axios. Es otra forma de enviar un token que nos autentifique ante una API sin tener que ponerlo en el código de cada petición, pero también nos permite hacer cualquier cosa que necesitemos.

Y podemos interceptar las respuestas para, por ejemplo, redireccionar a la página de login si el servidor nos devuelve un error 401 (no autorizado).

Para interceptar las peticiones que hacemos usaremos `axios.interceptors.request.use( (config) => fnAEjecutar, (error) => fnAEjecutar)` y para interceptar las respuestas del servidor `axios.interceptors.response.use( (response) => fnAEjecutar, (error) => fnAEjecutar)`. Se les pasa como parámetro la función a ejecutar si todo es correcto y la que se ejecutará si ha habido algún error. El interceptor de peticiones recibe como parámetro un objeto con toda la configuración de la petición (incluyendo sus cabeceras) y el interceptor de respuestas recibe la respuesta del servidor.

Veamos un ejemplo en que queremos enviar en las cabeceras de cada petición el token que tenemos almacenado en el _LocalStorage_ y queremos mostrar un alert siempre que el servidor devuelva en su respuesta un error que no sea de tipo 400. Además mostraremos por consola las peticiones y las respuestas si activamos el modo DEBUG:

```javascript
import axios from 'axios'
const baseURL = 'http://localhost:3000'
const DEBUG = true

axios.interceptors.request.use((config) => {
    if (DEBUG) {
        console.info('Request: ', config)
    }

    const token = localStorage.token
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + localStorage.token
    }
    return config
}, (error) => {
    if (DEBUG) {
        console.error('Request error: ', error)
    }
    return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
    if (DEBUG) {
        console.info('Response: ', response)
    }
    return response
}, (error) => {
    if (error.response && error.response.status !== 400) {
        alert('Response error ' + error.response.status + '(' + error.response.statusText + ')')
    }
    if (DEBUG) {
        console.info('Response error: ', error)
    }
    return Promise.reject(error)
})

const categories = {
    getAll: () => axios.get(`${baseURL}/categories`),
    getOne: (id) => axios.get(`${baseURL}/categories/${id}`),
    create: (item) => axios.post(`${baseURL}/categories`, item),
    modify: (item) => axios.put(`${baseURL}/categories/${item.id}`, item),
    delete: (id) => axios.delete(`${baseURL}/categories/${id}`),
}

export default {
    categories,
}
```
