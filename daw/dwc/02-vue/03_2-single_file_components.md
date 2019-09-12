<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
Tabla de contenidos

- [Single File Components](#single-file-components)
  - [Secciones de un Single File Component](#secciones-de-un-single-file-component)
    - [\<template>](#%5Ctemplate)
    - [\<script>](#%5Cscript)
    - [\<style>](#%5Cstyle)
  - [TodoList con Single File Components](#todolist-con-single-file-components)
    - [\<template>](#%5Ctemplate-1)
    - [\<script>](#%5Cscript-1)
    - [\<style>](#%5Cstyle-1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Single File Components
Declarar los componentes como hemos visto con `Vue.component()` en el fichero JS de la instancia genera varios problemas:
* Los componentes así declarados son globales a la aplicación por lo que sus nombres deben ser únicos
* El HTML del template está en ese fichero en medio del JS lo que lo hace menos legible y el editor no lo resalta adecuadamente (ya que espera encontrar códgo JS no HTML)
* El HTML y el JS del componente están juntos pero no su CSS
* No podemos usar fácilmente herramientas para convertir SCSS a CSS, ES2015 a ES5, etc
* Nuestro fichero crece rápidamente y nos encontramos con código spaguetti

Por tanto eso puede ser adecuado para proyectos muy pequeños pero no lo es cuando estos enpiezan a crecer.

La solución es guardar cada componente en un único fichero con extensión **.vue** que contendrá 3 secciones:
* \<template>: contiene todo el HTML del componente
* \<script>: con el JS del mismo
* \<style>: donde pondremos el CSS del componente
  
Aunque esto va contra la norma de tener el HTML, JS y CSS en ficheros separados en realidad están separados en diferentes secciones y todo junto en un único fichero con todo lo que necesita el componente.

La mayoría de editores soportan estos ficheros (directamente o instalándoles algún plugin, como _Vetur_ para Visual Studio Code) por lo que el resaltado de las diferentes partes es correcto. Además con **vue-cli** podemos integrar fácilmente _Webpack_ de forma que podemos usar ES2015 y los preprocesadores más comunes (SASS, Pug/Jade, Stylus, ...) ya se se traducirá automáticamente a ES5, HTML5 y CSS3.

## Secciones de un Single File Component
Veamos en detalle cada una de las secciones del SFC.

### \<template>
Aquí incluiremos el HTML que sustituirá a la etiqueta del componente. Recuerda que dentro sólo puede haber un único elemento HTML (si queremos poner más de uno los incluiremos en otro que los englobe).

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
Aquí pondremos estilos CSS que se aplicarán al componente. Si la etiqueta incluye el atributo _scoped_ estos estilos se aplicarán únicamente a este componente.

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

<style>
  .underline { text-decoration: underline; }
  .weight { font-weight: bold; }
</style>
```
El párrafo tendrá la clase indicada en la variable `decoration` (en este caso _underline_) y además si el valor de `isBold` es verdadero tendrá la clase _weight_. Hacer que cambien las clases del elemento es tan sencillo como cambiar el valor de las variables.

En la [página de Vue](https://vuejs.org/v2/guide/class-and-style.html) podemos ver las diferentes maneras de asignar clases a los elementos HTML.

## TodoList con Single File Components
Vamos a ver cómo sería el fichero **TodoList.vue** con el componente _todo-list_ de la aplicación anterior.
### \<template>
```html
  <div>
    <h2>{{ title }}</h2>
    <ul>
        <todo-item 
          v-for="(item,index) in todos" 
          :key="item.id"
          :todo="item"
          @delItem="delTodo(index)"
          @doneChanged="changeTodo(index)">
        </todo-item>
    </ul>
    <add-item @newItem="addTodo"></add-item>
    <br>
    <del-all @delAll="delTodos"></del-all>
  </div>
```
El componente renderiza una lista de subcomponentes _todo-item_ a los que se pasa como _prop_ cada item de la lista en una variable llamada _todo_ y escucha los eventos _delItem_ y _doneChanged_ que emite dicho subcomponente. Después renderiza otros 2 subcomponentes más (y en cada uno de los cuales escucha un evento emitido por el subcomponente).

### \<script>
```javascript
import TodoItem from './TodoItem.vue'
import AddItem from './AddItem.vue'
import DelAll from './DelAll.vue'

export default {
  name: 'todo-list',
  components: {
    'todo-item': TodoItem,
    'add-item': AddItem,
    'del-al': DelAll
  },
  props: ['title'],
  data() {
    return {
      todos: []
    }
  },		
  methods: {
    ...
  },
}
```
Se importan los subcomponentes que usa este componente y se define el componente:
* name: el nombre que damos al componente, _todo-list_
* components: aquí registramos los 3 subcomponentes hijos que queremos usar. En el HTML usaremos como etiqueta el nombre con que lo registramos aquí. ES6 nos permite registralos sin indicar la etiqueta si es la misma que el nombre (aunque en kebab-case en vez de en TitleCase), por lo que podríamos haber puesto simplemente:
```javascript
  components: {
    TodoItem,
    AddItem,
    DelAll
  },
```
* props: registramos el parámetro que nos pasa el componente padre, en este caso _title_. Haremos referencia a esta variable igual que a cualquiera de las definidas en _data_ pero no debemos cambiar su valor porque el cambio no se comunicará al componente padre
* data: variables locales del componente, en nuestro caso el array _todos_ que en principio está vacío
* methods: aquí pondremos los métodos del componente (los que se ejecutan como respuesta a eventos -_delTodo, addTodo, delTodos_- y el resto de métodos del componente)

### \<style>
```css
body {
  background: #20262E;
  padding: 20px;
  font-family: Helvetica;
}

#app {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  transition: all 0.2s;
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
