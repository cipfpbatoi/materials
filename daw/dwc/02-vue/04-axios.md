<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
Tabla de contenidos

- [Axios](#axios)
  - [Instalación](#instalaci%C3%B3n)
  - [Usar _axios_](#usar-_axios_)
- [Aplicación de ejemplo](#aplicaci%C3%B3n-de-ejemplo)
  - [Solución](#soluci%C3%B3n)
    - [Pedir los datos al cargarse](#pedir-los-datos-al-cargarse)
    - [Borrar un todo](#borrar-un-todo)
    - [Añadir un todo](#a%C3%B1adir-un-todo)
    - [Actualizar el campo _done_](#actualizar-el-campo-_done_)
    - [Borrar todas las tareas](#borrar-todas-las-tareas)
  - [Solución mejor organizada](#soluci%C3%B3n-mejor-organizada)
  - [json-server](#json-server)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Axios
El framework _Vue_ sólo se ocupa de la capa de vista de la aplcación pero su "ecosistema" como sus creadores le llaman, incluye multitud de herramientas para todo lo que podamos necesitar a la hora de realizar grandes proyectos.

Una de las librerías más utilizadas es la que permite realizar de forma sencilla peticiones Ajax a un servidor. Existen múltiples librerías para ello y la más utilizada es [**axios**](https://github.com/axios/axios).

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
* **.put(url, objeto)**: realiza una petición PUT a la url pasada como parámetro que posiblemente realizará un UPDATE sobre el registro indicado en la url que será actualizao con los datos del objeto pasado como segundo parámetro
* **.delete(url)**: realiza una petición DELETE a la url pasada como parámetro que supondrá una consulta DELETE a la base de datos para borrar el registro indicado en la url

Estos métodos devuelven una promesa por lo queal hacer la petición indicaremos con el método **.then** la función que se ejecutará cuando responda el servidor si la petición se resuelve correctamente y con el método **.catch** la función que se ejecutará cuando responda el servidor si ocurre algún error.

La respuesta del servidor tiene, entre otras, las propiedades:
* **data**: aquí tendremos los datos devueltos por el servidor
* status: obtendremos el código de la respuesta del servidor (200, 404, ...)
* statusText: el texto de la respuesta del servidor ('Ok', 'Not found', ...)
* message: mensaje del servidor en caso de producirse un error
* headers: las cabeceras HTTP de la respuesta
* ...

La sintaxis de una petición GET a axios sería algo como:
```javascript
axios.get(url)
  .then(response => ...realiza lo que sea con response.data ...)
  .catch(response => ... trata el error ...)
```

# Aplicación de ejemplo
Vamos a seguir con la aplicación de la lista de tareas pero ahora los datos no serán un array estático sino que estarán en un servidor. Usaremos como servidor para probar la aplicación [**json-server**](#json-server) por lo que las peticiones serán a la URL 'localhost:3000' que es el servidor web de json-server.

Los cambios que debemos hacer en nuestra aplicación son:
1. El componente principal (TodoList) pide todos los datos al cargarse
1. Al borrar un elemento haremos una petición al servidor para que lo borre de allí y cuando sepamos que se ha borrado lo borramos del array (o recargamos los datos)
1. Lo mismo al insertar un nuevo elemento
1. Al marcar/desmarcar un elemento lo modificaremos en la base de datos
1. Para borrarlos todos haremos peticiones DELETE al servidor

## Solución
Vamos a modificar los diferentes componentes para implementar os cambios requeridos:

### Pedir los datos al cargarse
Modificamos el fichero **Todo-List.vue** para añadir en su sección _script_:
* antes del objeto vue:
```javascript
import axios from 'axios'

const url='http://localhost:3000'
```

Dentro del objeto añadimos el _hook_ **monted** para hacer la petición Ajax al montar el componente:
```javascript
...
  mounted() {
    axios.get(url+'/todos')
      .then(response => this.todos=response.data)
      .catch(response => {
        if (!response.status) {// Si el servidor no responde 'response' no es un objeto sino texto
          alert('Error: el servidor no responde');
          console.log(response);
        } else {
          alert('Error '+response.status+': '+response.message);          
        }
        this.todos=[];
      })
  },
...
```

### Borrar un todo
Modificamos el método _delTodo_ del fichero **Todo-List.vue**:
```javascript
    delTodo(index){
      var id=this.todos[index].id;
      axios.delete(url+'/todos/'+id)
        .then(response => this.todos.splice(index,1) )
        .catch(response => alert('Error: no se ha borrado el registro. '+response.message))
    },
```

### Añadir un todo
Modificamos el método _addTodo_ del fichero **Todo-List.vue**:
```javascript
    addTodo(title) {
      axios.post(url+'/todos', {title: title, done: false})
        .then(response => this.todos.push({
            id: response.data.id,
            title: title, 
            done: false
          })
        )
        .catch(response => alert('Error: no se ha añadido el registro. '+response.message))
    },
```
Al servidor hay que pasarle como parámetro el objeto a añadir. E el caso del json-server devolverá en el **response.data** el nuevo objeto añadido al completo. Otros servidores devuelven sólo la _id_ del nuevo registro o pueden no devolver nada. 

### Actualizar el campo _done_
Ahora ya no nos es útil el índice de la tarea a actualizar sino que necesitamos su id, su título y su estado así que modificamos el _teamplate_ del fichero **Todo-List.vue** para pasar el elemento entero a la función:
```html
      <todo-item 
        v-for="(item,index) in todos" 
        :key="item.id"
        :todo="item"
        @delItem="delTodo(index)"
        @doneChanged="changeTodo(item)">
       </todo-item>
```

A continuación modificamos el método _changeTodo_ del fichero **Todo-List.vue**:
```javascript
    changeTodo(todo) {
      axios.put(url+'/todos/'+todo.id, {
          id: todo.id, 
          title: todo.title, 
          done: !todo.done
        })
        .then(response => todo.done=response.data.done)
        .catch(response => alert('Error: no se ha modificado el registro. '+response.message))
    },
```
Lo que hay que pasar en el objeto y qué se devuelve en la respuesta depende del servidor API-REST usado. EN el caso de json-server los campos que no le pasemos en el objeto los eliminará por lo que debemos pasar también al campo _title_ (otros servidores dejan como están los campos no inlcuidos en el objeto por lo que no haría falta pasárselo). Y lo que devuelve en **response.data** es el registro completo modificado.

### Borrar todas las tareas
Modificamos el método _delTodos_ del fichero **Todo-List.vue**. Como el servidor no tiene una llamada para borrar todos los datos podemos recorrer el array _todos_ y borrar cada tarea usando el método **delTodo** que ya tenemos hecho:
```javascript
    delTodos() {
      this.todos.forEach((todo, index) => this.delTodo(index));
    }
```
Si lo probáis con muchos registros es posible que no se borren todos correctamente (en realidad sí se borran de la base de datos pero no del array). ¿Sabes por qué?. ¿Cómo lo podemos arreglar? (PISTA: el índice cambia según los elementos que haya y las peticiones asíncronas pueden no ejecutarse en el orden que esperamos).

## Solución mejor organizada
Vamos a crear un fichero que será donde estén las peticiones a axios de forma que nuestro código quede más limpio en los componentes. Podemos llamar al fichero APIService.js y allí creamos una clase que se ocupe de todo:
```javascript
import axios from 'axios';
const API_URL = 'http://localhost:3000';

export class APIService{
  constructor(){
  }
  getTodos() {
    return axios.get(url+'/todos')
  }
  delTodo(id){
    return axios.delete(url+'/todos/'+id)
  },
  addTodo(newTodo) {
    return axios.post(url+'/todos', newTodo)
  },
  changeTodo(todo) {
    return axios.put(url+'/todos/'+todo.id, {
      id: todo.id, 
      title: todo.title, 
      done: !todo.done
    })
  },
}
```
Y en los componentes donde queramos usarlo importamos ela clase y creamos una instacia de la misma:
```javascript
import { APIService } from '../APIService';

const apiService=new APIService();

export default {
  ...
  methods: {
    getTodos() {
      apiService.getTodos()
      .then(response=>response.data.forEach(todo=>this.todos.push(todo)))
      .catch(error=>console.error('Error: '+(error.statusText || error.message || error))
    },
    ...
  },
  mounted() {
    this.getTodos();
  },
```

## json-server
Es un servidor API-REST que funciona bajo node.js y que utiliza un fichero JSON como contenedor de los datos en lugar de una base de datos.

Para instalarlo en nuestra máquina ejecutamos:
```[bash]
npm install json-server -g
```

Para que sirva un fichero datos.json:
```[bash]
json-server --watch datos.json 
```
La opción _--watch_ es opcional y le indica que actualice los datos si se modifica el fichero _.json_ externamente (si lo editamos).

Los datos los sirve por el puerto 3000 y servirá los diferentes objetos definidos en el fichero _.json_. Por ejemplo:
* https://localhost:3000/users: devuelve todos los elementos del array _users_ del fichero _.json_
* https://localhost:3000/users/5: devuelve el elementos del array _users_ del fichero _.json_ cuya propiedad _id_ valga 5

Para más información: [https://github.com/typicode/json-server](https://github.com/typicode/json-server)
