# Conceptos básicos
- [Conceptos básicos](#conceptos-básicos)
  - [Introducción](#introducción)
  - [Usar Vue](#usar-vue)
  - [Estructura de una aplicación Vue](#estructura-de-una-aplicación-vue)
    - [HTML](#html)
    - [Javascript](#javascript)
  - [Estilos de _API_](#estilos-de-api)
  - [_Binding_ de variables](#binding-de-variables)
    - [Enlace unidireccional: interpolación {{...}}](#enlace-unidireccional-interpolación-)
    - [Enlazar a un atributo: v-bind](#enlazar-a-un-atributo-v-bind)
    - [Enlace bidireccional: v-model](#enlace-bidireccional-v-model)
  - [\[Vue devtools\]](#vue-devtools)
  - [Extensiones para el editor de código](#extensiones-para-el-editor-de-código)
  - [Otras utilidades](#otras-utilidades)
  - [Cursos de Vue](#cursos-de-vue)

## Introducción
El uso de un framework nos facilita enormemente el trabajo a la hora de crear una aplicación. Vue es un framework progresivo para la construcción de interfaces de usuario y aplicaciones desde el lado del cliente. Lo de framework "progresivo" significa que su núcleo es pequeño pero está diseñado para crecer: su núcleo está enfocado sólo en la capa de visualización pero es fácil añadirle otras bibliotecas o proyectos existentes (algunos desarrollados por el mismo equipo de Vue) que nos permitan crear complejas SPA.

Su código es _opensource_ y fue creado por el desarrollador independiente [Evan You](https://evanyou.me/), lo que lo diferencia de los otros 2 frameworks más utilizados: __Angular__ desarrollado por _Google_ y __React__ desarrollado por _Facebook_.

Vue tiene una curva de aprendizaje menor que otros frameworks y es extremadamente rápido y ligero.

Este material está basado en la [guía oficial de Vue](https://vuejs.org/guide/introduction.html) y veremos además los servicios de vue-router, axios y pinia (sustituto de vuex en Vue3) entre otros.

**¿Qué framework es mejor?**
Depende de la aplicación a desarrollar y de los gustos del programador. Tenéis algunos enlaces al respecto:
* [Comparativa VueJs](https://vuejs.org/v2/guide/comparison.html)
* [Openwebminars: Vue vs React vs Angular](https://openwebinars.net/blog/vuejs-vs-react/)
* [Carlos Azaustre: Vue vs Angular (vídeo)](https://www.youtube.com/watch?v=jTtab_rnvic)
* [Angular vs React vs Vue: Which Framework to Choose in 2021](https://www.codeinwp.com/blog/angular-vs-vue-vs-react/)
* ...

Las razones de que veamos Vue en vez de Angular o React son, en resumen:
* **Sencillez**: aunque Angular es el framework más demandado hoy en el mercado su curva de aprendizaje es muy pronunciada. Vue es mucho más sencillo de aprender pero su forma de trabajar es muy similar a Angular por lo que el paso desde Vue a Angular es relativamente sencillo
* **Uso del framework**: React es también muy sencillo ya que es simplemente Javascript en el que podemos codificar la vista con JSX, pero la forma de trabajar de Vue es más parecida a otros frameworks, especialmente a Angular por lo que lo aprendido nos será de gran ayuda si queremos pasar a ese framework
* **Rendimiento**: Vue hace uso del concepto de _Virtual DOM_ igual que React por lo que también ofrece muy buen rendimiento

## Usar Vue
Para utilizar Vue sólo necesitamos enlazarlo en nuestra página desde cualquier CDN como:
```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

Esta no es la forma más recomendable de trabajar. Lo normal es crear un proyecto con **_npm_** que genere un completo _scaffolding_. Esto nos permitirá trabajar con componentes (_Single File Components_ o _SFC_) lo que nos facilitará enormemente la creación de nuestras aplicaciones.

Un _SFC_ es un componente reutilizable que se guarda en un fichero con extensión _.vue_. Para que _VSCode_ reconozca correctamente los ficheros _.vue_ debemos instalar la _extensión_ **Volar**.

## Estructura de una aplicación Vue
Vamos a crear la aplicación con Vue que mostrará un contador y un botón para actualizarlo:

```javascript
Vue.createApp({
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}).mount('#app')
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Vue</title>
    <!-- Import Vue.js -->
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  </head>
  <body>

    <div id="app">
      <button @click="increment">
        Count is: {\{ count }}
      </button>
    </div>

    <!-- Import Js -->
    <script src="./main.js"></script>
  </body>
</html>
```

Podéis ver su funcionamiento en la [documentación oficial de Vue](https://vuejs.org/guide/introduction.html#what-is-vue) o en [CodePen](https://codepen.io/juanseguravasco/pen/abYweqQ).

En este ejemplo podemos ver las 2 principales características de Vue:
- __Renderizado declarativo__: Vue amplía HTML con una sintaxis que nos permite declarar en HTML una salida basada en un dato Javascript
- __Reactividad__: Vue hace un seguimiento de las variables Javascript y modifica el DOM cuando alguna cambia

Para probar el funcionamiento de código tenemos el **_Palyground_** de Vue al que accedemos desde su documentación en [https://vuejs.org/guide/quick-start.html#try-vue-online].

### HTML
En el HTML debemos vincular los scripts de la librería de Vue y de nuestro código. 

Vue se ejecutará dentro de un elemento de nuestra página (al que se le suele poner como id _app_) que en este caso es un `<div>`.

Dentro de ese elemento es donde podemos usar expresiones de Vue (fuera del mismo se ignorarán). En este ejemplo se usa
- el _moustache_ **{\{ ... }}** que muestra en la página la variable o expresión Javascript que contiene
- la directiva **@click** que pone al elemento un escuchador del evento _click_ que ejecuta la función indicada en el mismo

### Javascript
En el fichero JS debemos crear la aplicación con el método _createApp_ (al que se le pasa un objeto con una serie de opciones) y montarla en el elemento del HTML donde se ejecutará dicha aplicación. En nuestro caso la única opción que se le pasa es **data** pero hay muchas más:
- **`data`**: aquí es donde se define el _estado_ de la aplicación, es decir, los datos de la misma. Es una **función** que _devuelve un objeto_ donde cada dato será una propiedad del mismo. Lo que definimos aquí sería el equivalente a las propiedades definidas en una clase que almacenan el estado de la misma. Estos datos son reactivos y accesibles desde el HTML

```javascript
Vue.createApp({
  data() {
    return {
      count: 0,
      msg: 'Hola',
      ...
    }
  },
```

- **`methods`**: es un objeto donde cada propiedad es un método de la aplicación que puede ser llamado desde el HTML. Son el equivalente a los métodos de una clase

Fijaos que para hacer referencia desde Javascript a una variable (o a un método) hay que anteponerle **_this_**.

Además de las opciones _data_ y _methods_ podemos definir otras como:
* **computed**: es un objeto con funciones que devuelven una variable cuyo valor hay que calcularlo. Por ejemplo:
  
```javascript
data() {
  return {
    nombre: 'Juan',
    apellido: 'Segura', 
  }
},
computed: {
  nombreCompleto() {
    return this.nombre + ' ' + this.apellido;
  }
}
```

* **_hooks_** (eventos del ciclo de vida de la instancia): para ejecutar código en determinados momentos: **'created'**, **'mounted'**, **'updated'**, **'destroyed'**. Ej.:

```javascript
created() {
    console.log('instancia creada'); 
}
```

## Estilos de _API_
La forma en que hemos programado estos ejemplos no es la más recomendable por lo que más adelante usaremos `npm` para crear un completo _scaffolding_ que nos facilitará enormemente la creación de nuestras aplicaciones. Con ella dividiremos nuestra aplicación en componentes llamados _Single File Components_ que incluirán en un único fichero tanto la lógica del componente (Javascript) como su presentación (HTML) y su apariencia (CSS).

Vue3 proporciona 2 formas diferentes de programar:
- **_Options API_**: la lógica de un componente se establece en las distintas propiedades de un objeto, a las que se accede mediante _this_ que apunta a la instancia del componente. Es la que veremos ahora ya que es la más similar a la OOP que conocemos.

```vue
<script>
export default {
  // Properties returned from data() become reactive state
  // and will be exposed on `this`.
  data() {
    return {
      count: 0
    }
  },

  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event listeners in templates.
  methods: {
    increment() {
      this.count++
    }
  },

  // Lifecycle hooks are called at different stages
  // of a component's lifecycle.
  // This function will be called when the component is mounted.
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

- **_Composition API_**_: es algo más compleja pero mejora la reutilización de código y su organización por funcionalidades. Indicada para aplicaciones grandes la veremos al final del bloque

```vue
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

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

## _Binding_ de variables
En la [Guía de la documentación oficial de Vue](https://vuejs.org/tutorial/#step-1) tenemos un tutorial guiado donde podemos probar cada una de las funcionalidades de Vue. En la parte superior izquierda nos pregunta por nuestras preferencias: de momento escogeremos **Options** y **HTML**, aunque enseguida cambiaremos a  **Options** y **SFC**.

| Haz el ejercicio del tutorial de [Vue.js](https://vuejs.org/tutorial/#step-2)

### Enlace unidireccional: interpolación {\{...}}
Donde queramos mostrar en la vista el valor de una variable simplemente la ponemos entre dobles llaves:
```html
<p>Contador: {\{ counter }}</p>
```

Y en el código Javascript sólo tenemos que declarar esa variable dentro del objeto devuelto por _data()_:

```javascript
  data() {
    return {
      counter: 0
    }
  }
```

Podemos ver esa variable y manipularla desde la consola, y si cambiamos su valor vemos que cambia lo que muestra nuestra página. Esto es porque Vue (al igual que Angular o React) enlazan el DOM y los datos de forma que cualquier cambio en uno se refleja automáticamente en el otro.

### Enlazar a un atributo: v-bind
Para mostrar un dato en el DOM usamos la interpolación **{\{  }}** pero si queremos nostrarlo como atributo de una etiqueta debemos usar `v-bind`:
```html
  <p v-bind:title="message">
    Hover your mouse over me for a few seconds
    to see my dynamically bound title!
  </p>
```

Vue incorpora estos '_atributos_' que podemos usar en las etiquetas HTML y que se llaman **directivas**. Todas las directivas comienzan por **`v-`** (en Angular es igual pero el prefijo es _ng-_). Como la directiva `v-bind` se utiliza mucho se puede abreviar símplemente como `:` (el carácter 'dos puntos'). El siguiente código es equivalente al de antes:
```html
  <p :title="message">
```

| Haz el ejercicio del tutorial de [Vue.js](https://vuejs.org/tutorial/#step-3)

### Enlace bidireccional: v-model
Tanto **{\{ }}** como `v-bind` son un enlace unidireccional: muestran en el DOM el valor de un dato y reaccionan ante cualquier cambio en dicho valor. 

Pero además está la directiva `v-model` que es un enlace bidireccional que enlaza un dato a un campo de formulario y permite cambiar el valor del campo al cambiar el dato pero también cambia el dato si se modifica lo introducido en el input. 
```html
  <input v-model="message">
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="GRvdrqp" data-user="juanseguravasco" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/juanseguravasco/pen/GRvdrqp">
  v-model</a> by Juan Segura (<a href="https://codepen.io/juanseguravasco">@juanseguravasco</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Vemos que al escribir en el _input_ automáticamente cambia lo mostrado en el primer párrafo. Esta característica nos permite ahorrar innumerables líneas de código para hacer que el DOM refleje los cambios que se producen en los datos.

NOTA: toda la aplicación se monta en el elemento _app_ por lo que las directivas o interpolaciones que pongamos fuera del mismo no se interpretarán.

| Haz el ejercicio del tutorial de [Vue.js](https://vuejs.org/tutorial/#step-5)

## [Vue devtools]
Es una extensión para Chrome y Firefox que nos permite inspeccionar nuestro objeto Vue y acceder a todos los datos de nuestra aplicación. Es necesario instalarlo porque nos ayudará mucho a depurar nuestra aplicación, especialmente cuando comencemos a usar componentes.

Podemos buscar la extensión en nuestro navegador o acceder al enlace desde la [documentación de Vue](https://vuejs.org/guide/scaling-up/tooling.html#browser-devtools).

Si tenemos las DevTools instaladas en la herramienta de desarrollador aparece una nueva opción, _Vue_, con 4 botones:
* Componentes: es la vista por defecto y nos permite inspeccionar todos los componentes Vue creados (ahora tenemos sólo 1, el principal, pero más adelante haremos componentes hijos)
* Pinia/Vuex: es la herramienta de gestión de estado para aplicaciones medias/grandes
* Eventos: permite ver todos los eventos emitidos
* Refrescar: refresca la herramienta

![DevTools](./img/DevTools.png)

Junto al componente que estamos inspeccionando aparece **= $vm0** que indica que DevTools ha creado una variable con ese nombre que contiene el componente por si queremos inspeccionarlo desde la consola.

Cuando inspeccionamos nuestros componentes, bajo la barra de botones aparece otra barra con 3 herramientas:
* Buscar: permite buscar el componente con el nombre introducido aquí
* Seleccionar componente en la página: al pulsarlo (se dibuja un punto en su interior) hace que al pulsar sobre un componente en nuestra página se seleccione en la herramienta de inspeccionar componentes
* Formatear nombre de componentes: muestra los nombres de componentes en el modo _camelCase_ o _kebab-case_

NOTA: Si por algún motivo queremos trabajar sin servidor web (desde file://...) hay que habilitar el acceso a ficheros en la extensión.

![DevTools](./img/DevTolols-AllowFiles.png)

## Extensiones para el editor de código
Cuando empecemos a trabajar con componentes usaremos ficheros con extensión **.vue** que integran el HTML, el JS y el CSS de cada componente. Para que nuestro editor los detecte correctamente es conveniente instalar la extensión para Vue.

En el caso de **_Visual Studio Code_** esta extensión se llama **Volar** (sustituye en _Vue 3_ a la extensión _Vetur_ que se usa con _Vue 2_). En **_Sublime Text_** tenemos el plugin **Vue Syntax Highlight**.

## Otras utilidades
_Vue 3_ permite utilizar directamente _Typescript_ en nuestros componentes simplemente indicándolo al definir el SFC (lo veremos al llegar allí).

Respecto a los _tests_ se recomienda usar _Vitest_ para los test unitarios y _Cypress_ para los E2E, como se indica en la [documentación oficial](https://vuejs.org/guide/scaling-up/testing.html) aunque también puede usarse _Jest_ u otras herramientas.

## Cursos de Vue
Podemos encontrar muchos cursos en internet, algunos de ellos gratuitos. Por ejemplo los creadores de Vue tienen la web [Vue Mastery](https://www.vuemastery.com) donde podemos encontrar desde cursos de iniciación (gratuitos) hasta los mas avanzados.
