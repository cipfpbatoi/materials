# Profundizando en Vue
Tabla de contenidos
- [Profundizando en Vue](#profundizando-en-vue)
  - [Computed](#computed)
  - [Watchers](#watchers)
  - [Acceder al DOM: 'ref'](#acceder-al-dom-ref)
    - [nextTick](#nexttick)
  - [Clases HTML](#clases-html)
    - [Sintaxis de objeto](#sintaxis-de-objeto)
    - [Sintaxis de array](#sintaxis-de-array)
    - [Asignar clases a un componente](#asignar-clases-a-un-componente)
    - [Asignar estilos directamente](#asignar-estilos-directamente)
  - [Ciclo de vida del componente](#ciclo-de-vida-del-componente)
    - [El ciclo de vida de un componente](#el-ciclo-de-vida-de-un-componente)
  - [Componentes asíncronos](#componentes-asíncronos)
  - [Custom Directives](#custom-directives)
  - [Imágenes](#imágenes)
  - [Transiciones](#transiciones)
  - [Entornos](#entornos)
  - [Guards del router](#guards-del-router)


## Computed
Cuando se crea un componente de Vue (o el componente raíz) se le pasa como parámetro un objeto con las opciones con que se creará. Entre ellas tenemos _props_, _ data_, _methods_, y también otras como _computed_ y _watch_.

Hemos visto que en una interpolación o directiva podemos poner una expresión javascript. Pero si la expresión es demasiado compleja hace que nuestro HTML sea más difícil de leer. La solución es crear una expresión calculada que nos permite tener "limpio" el HTML. Por ejemplo un código con expresiones complejas como:

```vue
<template>
  <p>Autor: { { author.name + ' ' + author.surname }}</p>
  <p>Ha publicado libros: { { author.books.length > 0 ? 'Sí' : 'No' }}</p>
</template>

<script>
export default {
  name: 'author-item',
  data() {
    return {
      author: {
        name: 'John',
        surname: 'Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  }
}
</script>
```

se puede simplificar creando propiedades calculadas:

```vue
<template>
  <p>Autor: { { fullName }}</p>
  <p>Ha publicado libros: { { hasPublished }}</p>
</template>

<script>
export default {
  name: 'author-item',
  data() {
    return {
      author: {
        name: 'John',
        surname: 'Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  },
  computed: {
    fullName() {
      return this.name + ' ' + this.surname;
    },
    hasPublished() {
      return this.author.books.length > 0 ? 'Sí' : 'No'
    }
  }
})
</script>
```

En lugar de definir _computed_ podríamos haber obtenido el mismo resultado usando métodos, pero la ventaja de las propiedades calculadas es que se cachean por lo que si se vuelven a tener que renderizar en el DOM no vuelven a evaluarse, a menos que cambie el valor de alguna de las variables reactivas que use.

| Haz el ejercicio del tutorial de [Vue.js](https://vuejs.org/tutorial/#step-4)

Por defecto las propiedades _computed_ sólo hacen un _getter_, por lo que no se puede cambiar su valor. Pero podemos si queremos hacerlo definir métodos _getter_ y _setter_:

```javascript
  computed: {
    fullName:
      // getter
      get() {
        return this.name + ' ' + this.surname;
      },
      // setter
      set(newValue) {
        const names = newValue.split(' ');
        this.name = names[0];
        this.surname = names[names.length - 1];
      }
    },
  },
})
```

Si hacemos `this.fullName = 'John Doe'` estaremos asignando los valores adecuados a las variables _name_ y _surname_.

## Watchers
Vue proporciona una forma genérica de controlar cuándo cambia el valor de una variable reactiva para poder ejecutar código en ese momento poniéndole un _watch_:

```javascript
  data() {
    return {
      name: 'John',
      surname: 'Doe',
      fullName: 'John Doe',
    }
  },
  watch: {
    name(newValue, oldValue) {
      this.fullName = newValue + ' ' + this.surname;
    },
    surname(newValue, oldValue) {
      this.fullName = this.name + ' ' + newValue;
    },
  },
})
```

En este caso no tiene mucho sentido y es más fácil (y más eficiente) usar una propiedad _computed_ como hemos visto antes, pero hay ocasiones en que necesitamos ejecutar código al cambiar una variable y es así donde se usan. Veremos su utilidad cuando trabajemos con _vue-router_.

NOTA: los _watcher_ son costosos por lo que no debemos abusar de ellos

| Haz el ejercicio del tutorial de [Vue.js](https://vuejs.org/tutorial/#step-10)

## Acceder al DOM: 'ref'
Aunque Vue se encarga de la vista por nosotros en alguna ocasión podemos tener que acceder a un elemento del DOM. En ese caso no haremos un `document.getElement...` sino que le ponemos una referencia al elemento con el atributo `ref` para poder acceder al mismo desde nuestro script:
```vue
<template>
  <form ref="myForm">
    ...
  </form>
</template>

<script>
export default {
  mounted() {
    this.$refs.myForm.setAttribute('novalidate', true)
  }
}
</script>
```

Desde el código tenemos acceso a todas las referencias desde `this.$refs`. Hay que tener en cuenta que sólo se puede acceder a un elemento después de montarse el componente (en el _hook_ **mounted()** o después).

| Haz el ejercicio del tutorial de [Vue.js](https://vuejs.org/tutorial/#step-9)

### nextTick
Si modificamos una variable reactiva el cambio se refleja automáticamente en el DOM, pero no inmediatamente sino que se espera hasta el evento _nextTick_ en el ciclo de modificación para asegurarse de no cambiar algo que quizá va a volverse a cambiar en este ciclo.

Si accedemos al DOM antes de que se produzca este evento el valor aún será el antiguo. Para obtener el nuevo valor hemos de esperar al _nextTick_:
```vue
<template>
  <p>Contador: <span ref="contador">{ { count }}</span></p>
  <button @click="increment">Incrementa</button>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      count.value++
      console.log('Contador en el DOM: ' + this.$refs.contador.textContent)
      // Devolverá el valor sin actualizar aún
      nextTick(() => {
        console.log('Contador en el DOM tras nextTick: ' + this.$refs.contador.textContent)
        // Devolverá el valor actualizado
      })
    }
  }
}
</script>
```

Realmente es algo que seguramente nunca necesitemos pero así conocemos un poco más cómo funciona Vue internamente.

## Clases HTML
Ya hemos visto que en Javascript usamos las clases con mucha frecuencia, normalmente para asignar a elementos estilos definidos en el CSS, pero también para identificar elementos sin usar una _id_ (como hacíamos poniendo a los botones de acciones de los productos las clases _subir_, _bajar_, _editar_ o _borrar_).

En Vue tenemos diferentes formas de asignar clases. La más simple sería _bindear_ el atributo _class_ y gestionarlas directamente en el código, pero no es lo más cómodo:
```html
<div :class="clasesDelDiv"></div>
```

En este caso tendríamos que asignar a la variables _clasesDelDiv_ las diferentes clases separadas por espacio, lo que es engorroso de mantener.

### Sintaxis de objeto
Una forma más sencilla es _bindear_ un objeto donde cada propiedad es el nombre de una posible clase y su valor es un booleano que indica si tendrá o no dicha clase, por ejemplo:
```html
<div 
    class="static"
    :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

En este caso el \<DIV> tendrá las clases:
- static: siemrpe tendrá esta clase. Como véis puede coexistir la directiva _:class_ con el atributo _class_ y se suman ambos
- active: tendrá esta clase si el valor de la variable _isActive_ es _true_
- text-danger: ídem para la variable _hasError_. Si el nombre de una clase tiene más de una palabra hay que entrecomillarla

Para mejorar la legibilidad del HTML podemos poner el objeto de las clases en el Javascript
```html
<div 
    class="static"
    :class="classObject"
></div>
```

```javascript
data() {
  return {
    classObject: {
      active: true,
      'text-danger': false
    }
  }
}
```

### Sintaxis de array
Podemos indicar las clases en forma de array de variables que contienen la clase a asignar:
```html
<div :class="[activeClass, errorClass]"></div>
```

```javascript
data() {
  return {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
}
```

En este caso el \<DIV> tendrá las clases `active` y `text-danger`. 

Y es posible incluir sintaxis de objeto dentro de la sintaxis de array:
```html
<div :class="[{ active: isActive}, errorClass]"></div>
```

### Asignar clases a un componente
En la etiqueta de un componente podemos ponerle un atributo _class_ que le asignará las clases incluidas y que se sumaran a las que se le asignen dentro del propio componente. Por ejemplo, si el \<DIV> del ejemplo anterior es el _template_ de un componente llamado MyComponent puedo poner:
```html
<my-component class="main highligth"></my-component>
```

En este caso el \<DIV> tendrá las clases `main`, `highligth`, `active` si la variable _isActive_ vale _true_ y `text-danger`. 

En Vue3 el _template_ de un componente puede tener varios elementos raíz. En ese caso para indicar a cuál se aplicarán las clases definidas en el padre se usa la propiedad `$attr.class`:
```html
<template>
    <p :class="$attrs.class">Hi!</p>
    <span>This is a child component</span>
</template>
```

### Asignar estilos directamente
Aunque no es lo recomendable, podemos asignar directamente estilos CSS igual que asignamos clases y también podemos usar la sintaxis de objeto o la de array.
```html
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

```javascript
data() {
  return {
    activeColor: 'red',
    fontSize: 30'
  }
}
```

## Ciclo de vida del componente
### El ciclo de vida de un componente
Al crearse la instancia de Vue o un componente la aplicación debe realizar unas tareas como configurar la observación de variables, compilar su plantilla (_template_), montarla en el DOM o reaccionar ante cambios en las variables volviendo a renderizar las partes del DOM que han cambiado. Además ejecuta funciones definidas por el usuario cuando sucede alguno de estos eventos, llamadas _hooks_ del ciclo de vida.

En la siguiente imagen podéis ver el ciclo de vida de la instancia Vue (y de cualquier componente) y los eventos que se generan y que podemos interceptar:

![Ciclo de vida de Vue](https://vuejs.org/assets/lifecycle.16e4c08e.png)

**NOTA**: En **Vue2**: los métodos **_beforeDestroyed_** y **_destroyed_** se usan en lugar de _**beforeUnmounted**_ y _**unmounted**_.

**IMPORTANTE**: no debemos definir estas funciones como _arrow functions_ porque en estas funciones se enlaza en la variable _this_ el componente donde se definen y si hacemos una _arrow function_ no tendríamos _this_:
```javascript
// MAL, NO HACER ASÍ
created: () => {
    console.log('instancia creada'); 
}
```

```javascript
// BIEN, HACER ASÍ
created() {
    console.log('instancia creada'); 
}
```

Los principales _hooks_ son:
- **beforeCreate**: aún no se ha creado el componente (sí la instancia de Vue) por lo que no tenemos acceso a sus variables, etc
- **created**: se usa por ejemplo para realizar peticiones a servicios externos lo antes posible
- **beforeMount**: ya se ha generado el componente y compilado su _template_
- **mounted**: ahora ya tenemos acceso a todas las propiedades del componete. Es el sitio donde hacer una patición externa si el valor devuelto queremos asignarlo a una variable del componente
- **beforeUpdate**: se ha modificado el componente pero aún no se han renderizado los cambios
- **updated**: los cambios ya se han renderizado en la página
- **beforeUnmount**: antes de que se destruya el componente (en versiones anteriores a Vue3 **beforeDestroy**)
- **unmounted**: ya se ha destruido el componente (en versiones anteriores a Vue3 **destroyed**)

| Haz el ejercicio del tutorial de [Vue.js](https://vuejs.org/tutorial/#step-9)

## Componentes asíncronos
En proyectos grandes con centenares de componentes podemos hacer que en cada momento se carguen sólo los componentes necesarios de manera que se ahorra mucho tiempo de carga de la página.

Para que un componente se cargue asíncronamente al registrarlo se hace como un objeto que será una función que importe el componente. Un componente normal (síncrono) se registraría así:
```vue
<script>
import ProductItem from './ProductItem.vue'

export default {
    name: 'products-table',
    components: {
        ProductItem,
    },
...
}
</script>
```

Si queremos que se cargue asíncronamente no lo importamos hasta se registra:
```vue
<script>
export default {
    name: 'products-table',
    components: {
        ProductItem: () => import('./ProductItem.vue'),
    },
...
}
</script>
```

También podemos decirle que espere un tiempo a cargar el componente (delay) e incluso qué componente queremos cargar mientras está cargando el componente o cuál cargar si hay un error al cargarlo:
```vue
<script>
export default {
    name: 'products-table',
    components: {
        ProductItem: () => ({
            component: import('./ProductItem.vue'),
            delay: 500,       // en milisegundos
            timeout: 6000,
            loading: compLoading,   // componente que cargará mientras se está cargando
            error: compError,       // componente que cargará si hay un error,
        })
    },
...
}
</script>
```

## Custom Directives
Podemos crear nuestras propias directivas para usar en los elementos que queramos. Se definen en un fichero .js con `Vue.directive` y le pasamos su nombre y un objeto con los estados en que queremos que reaccione. Por ejemplo vamos a hacer una directiva para que se le asigne el foco al elemento al que se la pongamos, que será de tipo _input_:
```javascript
import Vue from 'vue'

Vue.directive('focus', {
  mounted(el) {
    el.focus();
  }
})
```

Para usarla en un componente la importamos y ya podemos usarla en el _template_:
```vue
<template>
  ...
  <input v-focus type="text" name="nombre">
  ...
</template>

<script>
import focus from './focus.js'
...
}
</script>
```

Si queremos utilizarla en muchos componentes podemos importarla en el _main.js_ y así estará disponible para todos los componentes.

Los estados de la directiva en los que podemos actuar son:
- **mounted** (en Vue2 **inserted**): cuando se inserte la directiva
- **updated** (en Vue2 **componentUpdated**): cuando se actualice el componente que contiene la directiva
- **beforeMount** (en Vue2 **bind**): cuando se enlaza la directiva al componente por primera vez, antes de montar el componente
- ...

## Imágenes
Si se trata de imágenes estáticas lo más sencillo es ponerlas dentro de la carpeta `public` y hacer referencia a ellas usando **ruta absoluta**. Todo lo que está en _public_ se referencia como si estuviera en la raíz de nuestra aplicación:
```html
  <img src="/img/elPatitoFeo.jpeg" height="100px" alt="El Patito Feo">
```

También podemos poner las imágenes en la carpeta `assets`, pero antes de usarlas deberemos imnportarlas. Ejemplo:
```html
<script>
  import imgUrl from './assets/img/elPatitoFeo.jpeg'
  ...
</script>

<template>
  ...
  <img :src="imgUrl" height="100px" alt="El Patito Feo">
  ...
</template>
```

NOTA: Si usamos _webpack_ en lugar de _Vite_, en lugar de importarlas usaremos en su atributo `src` la función `require` con la URL de la imagen:
```html
  <img :src="require('../assets/img/elPatitoFeo.jpeg')" height="100px" alt="El Patito Feo">
```

Con _Vite_ también podemos importarlas usando `import.meta.url` (más información en la [documentación de Vite](https://vitejs.dev/guide/assets.html#new-url-url-import-meta-url)):
```html
<script>
export default {
  data() {
    return {
      imgUrl = new URL('./assets/elPatitoFeo.png', import.meta.url).href
    }
  },
  ...
}
</script>

<template>
  ...
  <img :src="imgUrl" height="100px" alt="El Patito Feo">
  ...
</template>
```

Esto nos permite también importar las imágenes dinámicamente:
```html
<script>
export default {
  methods: {
    function getImageUrl(name) {
      return new URL(`./dir/${name}`, import.meta.url).href
    }
  }
  ...
}
</script>

<template>
  ...
  <img :src="getImageUrl(imgName)" height="100px">
  ...
</template>
```

Esto permitiría mostrar también imágenes obtenidas de una API.

## Transiciones
Vue permite controlar transiciones en nuestra aplicación poniendo el código CSS correspondiente y añadiéndole al elemento el atributo _transition_. Podemos encontrar más información en la [documentación oficial de Vue](https://vuejs.org/v2/guide/transitions.html).

## Entornos
En Vue tenemos normalmente 3 entornos o _modos_, el de **development**, el de **test** y el de **production**. Las variables de entorno las guardaremos en uno de los siguientes ficheros:
- **.env**: se cargan en todos los modos
- **.env.local**: se cargan en todos los modos pero son ignoradas por git
- **.env.[modo]**: se cargan sólo en el modo indicado 
- **.env.[modo].local**: ídem pero son ignordas por git

En contenido de estos ficheros son variables en forma `clave=valor`:
```javascript
// fichero .env
TITULO=Mi proyecto
VITE_API=https://localhost/api
```

Si el nombre de la variable comienza por `VITE_` será accesible desde el código a través de `import.meta.env.nombreVariable`:
```javascript
// <script> de componente
console.log(process.env.VITE_API);
```

Podemos saber en qué entorno se está ejecutando la aplicación consultando el valor de la variable `import.meta.env.MODE`.

Si no estamos usando _Vite_ sino _webpack_ el nombre de las variables debe comenzar por `VUE_APP_` y será accesible desde el código con `process.env.nombreVariable`:
```javascript
// <script> de componente
console.log(process.env.VUE_APP_API);
```

## Guards del router
Son _hooks_ que podemos controlar en distintos momentos, algunos desde el componente y otros desde el _router_. Podemos ponerlos para todas las rutas, para una ruta en concreto o en el componente.

La mayoría reciben 3 parámetros:
- **to**: ruta a la que se va a saltar
- **from**: ruta de la que se viene
- **next**: función para que continue la carga del router. Siempre tras ejecutar el código que deseemos pondremos `netx()`.

En el router tenemos estos _guards_:
- **router.beforeEach(to, from, next)**: se ejecuta antes de que vaya a cambiarse la ruta
- **router.afterEach(to, from)**: se ejecuta una vez cambiada la ruta (por eso no tiene next, porque ya ha acabado)
- **ruta.beforeEnter(to, from, next)**: se pone como propiedad de una ruta y se ejecuta antes de entrar a ella

Para aplicarlos en nuestro router lo asignamos a una variable que exportamos:
```javascript
let router = new Router({
  routes: [
    {
      path: '/',
      component: 'MyComponent',
      beforeEnter(to, from, next) {
        console.log('Vengo de ' + from + ' y voy a ' + to);
        next();
      },
...
})

router.beforeEach(to, from, next) {
  console.log('Vengo de ' + from + ' y voy a ' + to);
  next();
}

export default router
```

En un componente también puedo definir los _hooks_:
- **beforeRouteEnter(to, from, next)**
- **beforeRouteUpdate(to, from, next)**
- **beforeRouteLeave(to, from, next)**
