<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
Tabla de contenidos

- [Single File Components](#single-file-components)
  - [Secciones de un Single File Component](#secciones-de-un-single-file-component)
    - [\<template>](#%5Ctemplate)
    - [\<script>](#%5Cscript)
    - [\<style>](#%5Cstyle)
    - [Custom blocks](#custom-blocks)
  - [TodoList con Single File Components](#todolist-con-single-file-components)
    - [TodoApp.vue](#todoappvue)
    - [TodoList.vue](#todolistvue)
    - [TodoItem.vue](#todoitemvue)
    - [TodoAdd.vue](#todoaddvue)
    - [TodoDelAll.vue](#tododelallvue)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Single File Components
Declarar los componentes como hemos visto con `Vue.component()` en el fichero JS de la instancia genera varios problemas:
* Los componentes así declarados son globales a la aplicación por lo que sus nombres deben ser únicos
* El HTML del template está en ese fichero en medio del JS lo que lo hace menos legible y el editor no lo resalta adecuadamente (ya que espera encontrar códgo JS no HTML)
* El HTML y el JS del componente están juntos pero no su CSS
* No podemos usar fácilmente herramientas para convertir SCSS a CSS, ES2015 a ES5, etc
* Nuestro fichero crece rápidamente y nos encontramos con código spaguetti

Por tanto eso puede ser adecuado para proyectos muy pequeños pero no lo es cuando estos enpiezan a crecer.

La solución es guardar cada componente en un único fichero. Esto me lo permite la herramienta de Webpack **vue-loader**. Un fichero para un SFC tendrá extensión **.vue** y contendrá 3 secciones:
* \<template>: contiene todo el HTML del componente
* \<script>: con el JS del mismo
* \<style>: donde pondremos el CSS del componente
  
Aunque esto va contra la norma de tener el HTML, JS y CSS en ficheros separados en realidad están separados en diferentes secciones y todo junto en un único fichero con todo lo que necesita el componente.

La mayoría de editores soportan estos ficheros (directamente o instalándoles algún plugin, como _Vetur_ para Visual Studio Code) por lo que el resaltado de las diferentes partes es correcto. Además con **vue-cli** podemos integrar fácilmente _Webpack_ de forma que podemos usar ES2015 y los preprocesadores más comunes (SASS, Pug/Jade, Stylus, ...) ya se se traducirá automáticamente a ES5, HTML5 y CSS3.

## Secciones de un Single File Component
Veamos en detalle cada una de las secciones del SFC.

### \<template>
Aquí incluiremos el HTML que sustituirá a la etiqueta del componente. Recuerda que dentro sólo puede haber un único elemento HTML (si queremos poner más de uno los incluiremos en otro que los englobe).

Si el código HTML a incluir en el template es muy largo podemos ponerlo en un fichero externo y vincularlo en el template, así nuestro SFC queda más pequeño y legible:
```vue
<template src="./myComp.html">
</template>
```

Respecto al lenguaje, podemos usar HTML (la opción por defecto) o [PUG](https://pugjs.org/api/getting-started.html) que es una forma sencilla de escribir HTML. Lo indicamos como atributo de \<template>:
```vue
<template lang="pug">
...
```


### \<script>
Aquí definimos el componente. Será un objeto que exportaremos con sus diferentes propiedades. Si utiliza subcomponentes hay que importarlos antes de definir el objeto y registrarlos dentro de este.

Entre las propiedades que podemos incluir están:
* name: el nombre del componente. Sólo es obligatorio en caso de componentes recursivos (si el componente se usará en otro componente al registrarlo allí le daremos el nombre que usaremos como etiqueta para el mismo y este se ignora)
* components: aquí registramos componentes hijos que queramos usar en el _template_ de este componente (debemos haber importado previamente el fichero _.vue_ que lo contiene). Ponemos el nombre que le daremos y el objeto que lo contiene. En el HTML usaremos como etiqueta el nombre con que lo registramos aquí
* props: donde registramos los parámetros que nos pasa el componente padre como atributos de la etiqueta que muestra este componente
* data: función que devuelve un objeto con todas las variables locales del componente
* methods: objeto con los métodos del componente
* computed: aquí pondremos las propiedades calculadas del componente
* created(), mounted(), ...: funciones hook que se ejecutarán al crearse el componente, al montarse, ...
* watch: si queremos observar manualmente cambios en alguna variable y ejecutar código como respuesta a ellos (recuerda que Vue ya se encarga de actualizar la vista al cambiar las variables y viceversa).
* ...

### \<style>
Aquí pondremos estilos CSS que se aplicarán al componente. Podemos usar CSS, SASS o [PostCSS](https://postcss.org/). Si queremos importar ficheros de estilo con `@import` deberíamos guardarlos dentro de la carpeta _assets_.

Si la etiqueta incluye el atributo _scoped_ estos estilos se aplicarán únicamente a este componente (y sus descendientes) y no a todos los componentes de nuestra aplicación. Si tenemos estilos que queremos que se apliquen a toda la aplicación y otros que son sólo para el componente y sus descendientes pondremos 2 etiquetas \<style>, una sin el atributo _scoped_ y otra con él.

La forma más común de asignar estilos a elementos es usando clases. Para conseguir que su estilo cambie fácilmente podemos asignar al elemento clases dinámicas que hagan referencia a variables del componente. Ej.:
```vue
<template>
  <p :class="[decoration, {weight: isBold}]">Hi!</p>
</template>

<script>
export default {
  data() {
    return {
      decoration: 'underline',
      isBold: true
    }
  }
}
</script>

<style lang="css">
  .underline { text-decoration: underline; }
  .weight { font-weight: bold; }
</style>
```
El párrafo tendrá la clase indicada en la variable `decoration` (en este caso _underline_) y además si el valor de `isBold` es verdadero tendrá la clase _weight_. Hacer que cambien las clases del elemento es tan sencillo como cambiar el valor de las variables.

Podemos ver las diferentes maneras de asignar clases a los elementos HTML en la [página de Vue](https://vuejs.org/v2/guide/class-and-style.html) .

Igual que vimos en la etiqueta \<template>, si el código de los estilos es demasiado largo podemos ponerlo en un fichero externo que vinculamos a la etiqueta con el atributo _src_.

### Custom blocks
Además de estos 3 bloques un SFC puede tener otros bloques definidos por el programador para, por ejemplo, incluir la documentación del componente o su test unitarios:
```vue
<custom1 src="./unit-test.js">
    Aquí podríamos incluir la documentación del proyecto
</custom1>
```

## TodoList con Single File Components
Crearemos un fichero _.vue_ para cada uno de los componentes y otro para el componente principal de la aplicacioón que llamaremos **TodoApp.vue** y que incluye los otros componentes. Veamos cada fichero.

### TodoApp.vue

#### \<template>
```html
  <div id="app">
    <todo-list title="Tengo que aprender:"></todo-list>
    <todo-add></todo-add>
    <br>
    <todo-del-all></todo-del-all>
  </div>
```

Este componente renderiza un componente _todo-list_ al que le pasa como parámetro el título a mostrar, un componente _todo_add_ y otro _todo-del-all_.

#### \<script>
```javascript
import TodoList from './components/TodoList.vue'
import TodoAdd from './components/TodoAdd.vue'
import TodoDelAll from './components/TodoDelAll.vue'

export default {
  name: 'todo-app',
  components: {
    TodoList,
    TodoAdd,
    TodoDelAll,
  }
}
```

Simplemente se importan los 3 componentes y se registran.

#### \<style>
```css
#app {
  padding: 20px;
}

li {
  margin: 8px 0;
}

h2 {
  font-weight: bold;
  margin-bottom: 15px;
}

del {
  color: rgba(0, 0, 0, 0.3);
}
```

### TodoList.vue
```vue
<template>
  <div>
    <h2>{{ title }}</h2>
    <ul v-if="todos.length">
      <todo-item 
        v-for="(item,index) in todos" 
        :key="item.id"
        :todo="item"
        @delItem="delTodo(index)"
        @toogleDone="toogleDone(index)">
       </todo-item>
    </ul>
    <p v-else>No hay tareas que mostrar</p>
  </div>  
</template>

<script>
import TodoItem from './TodoItem.vue'
import { EventBus } from '../utils/EventBus'

export default {
  name: 'todo-list',
  components: {
    TodoItem,
  },
  props: ['title'],
  data() {
    return {
      todos: []      
    }
  },
  created() {
      EventBus.$on('delAll', ()=>{
          this.todos = [];
      });
      EventBus.$on('add', this.addTodo);
  },
  methods: {
    toogleDone(index) {
      this.todos[index].done=!this.todos[index].done;
    },
    delTodo(index){
      this.todos.splice(index,1);
    },
    addTodo(title) {
      this.todos.push({title: title, done: false});
    },
  }
}
</script>
```

El _template_ renderiza una lista de subcomponentes _todo-item_ a los que le pasa como parámetro cada item de la lista en una variable llamada _todo_ y escucha los eventos _delItem_ y _toogleDone_ que emite dicho subcomponente. 

En el código se importa el subcomponente que usa este componente y el EventBus que utilizan para cominicarse la tabla, el formulario y el botón. Se define el componente:
* name: el nombre que damos al componente, _todo-list_
* components: aquí registramos el subcomponente hijo que queremos usar. En el HTML usaremos como etiqueta el nombre con que lo registramos aquí. 
* props: registramos el parámetro que nos pasa el componente padre, en este caso _title_. Haremos referencia a esta variable igual que a cualquiera de las definidas en _data_ pero no debemos cambiar su valor porque el cambio no se comunicará al componente padre
* data: variables locales del componente, en nuestro caso el array _todos_ que en principio está vacío
* created: cuando se crea el componente se ponen 2 escuchadores al canal _EventBus_, uno para escuchar el evento 'delAll' que el envía el botón de borrar todos y otro para escuchar el 'add' que envía el formulario
* methods: aquí pondremos los métodos del componente (los que se ejecutan como respuesta a eventos -_delTodo, addTodo, toogleDone_- y el resto de métodos del componente)

### TodoItem.vue
```vue
<template>
  <li @dblclick="delTodo">
    <label>
      <input type="checkbox" :checked="todo.done" @change="toogleDone">
      <del v-if="todo.done">
        {{ todo.title }}  
      </del>
      <span v-else>
        {{ todo.title }}          
      </span>
    </label>
  </li>
</template>

<script>
export default {
  name: 'todo-item',
  props: ['todo'],
  methods: {
    delTodo() {
      this.$emit('delItem');
    },
    toogleDone() {
      this.$emit('toogleDone');
    }
  }
}  
</script>
```

### TodoAdd.vue
```vue
<template>
  <div>
    <input v-model="newTodo">
    <button @click="addTodo">Añadir</button>
  </div>
</template>

<script>
import { EventBus } from '../utils/EventBus';

export default {
  name: 'todo-add',
  data() {
    return {
      newTodo: ''
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo) {
        EventBus.$emit('add', this.newTodo);
        this.newTodo='';      
      }
    }
  }
}
</script>
```

### TodoDelAll.vue
```vue
<template>
  <button @click="delTodos">Borrar toda la lista</button>
</template>

<script>
import { EventBus } from '../utils/EventBus'

export default {
  name: 'todo-del-all',
  methods: {
    delTodos() {
      if (confirm('¿Deseas borrar toda la lista de cosas a hacer?')) {
        EventBus.$emit('delAll');
      }
    }
  }
}  
</script>
```
