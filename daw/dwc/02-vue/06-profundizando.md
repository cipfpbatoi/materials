# Profundizando en Vue
Tabla de contenidos
- [Computed](#computed)
- [Watchers](#watchers)
- [Clases](#clases)
- [Ciclo de vida del componente](#ciclo-de-vida-del-componente)
- [Componentes asíncronos](#componentes-asíncronos)
- [Custom Directives](#custom-directives)
- [Filtros](#filtros)
- [Transiciones](#transiciones)
- [Entornos](#entornos)
- [Guards del router](#guards-del-router)


## Computed
Cuando se crea un componente de Vue (o el componente raíz) se le pasa como parámetro un objeto con las opciones con que se creará. Entre ellas tenemos _props_, _ data_, _methods_, y también otras como _computed_ y _watch_.

Hemos visto que en una interpolación o directiva podemos poner una expresión javascript. Pero si la expresión es demasiado compleja hace que nuestro HTML sea más difícil de leer. La solución es crear una expresión calculada que nos permite tener "limpio" el HTML. Por ejemplo:

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

La solución a esas expresiones sería crear propiedades calculadas:

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
```

En lugar de definir _computed_ podríamos haber obtenido el mismo resultado usando métodos, pero la ventaja de las propiedades calculadas es que se cachean por lo que si se vuelven a tener que renderizar en el DOM no vuelven a evaluarse, a menos que cambie el valor de alguna de las variables reactivas que use.

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

## Clases
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
Un componente pasa por distintos estados a lo largo de su cilo de vida y podemos poner _hooks_ para ejecutar una función cuando alcanza ese estado. Los principales _hooks_ son:
- **beforeCreate**: aún no se ha creado el componente (sí la instancia de Vue) por lo que no tenemos acceso a sus variables, etc
- **created**: se usa por ejemplo para realizar peticiones a servicios externos lo antes posible
- **beforeMount**: ya se ha generado el componente y compilado su _template_
- **mounted**: ahora ya tenemos acceso a todas las propiedades del componete. Es el sitio donde hacer una patición externa si el valor devuelto queremos asignarlo a una variable del componente
- **beforeUpdate**: se ha modificado el componente pero aún no se han renderizado los cambios
- **updated**: los cambios ya se han renderizado en la página
- **beforeUnmount**: antes de que se destruya el componente (en versiones anteriores a Vue3 **beforeDestroy**)
- **unmounted**: ya se ha destruido el componente (en versiones anteriores a Vue3 **destroyed**)

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
```

## Custom Directives
Podemos crear nuestras propias directivas para usar en los elementos que queramos. Se definen en un fichero .js con `Vue.directive` y le pasamos su nombre y un objeto con los estados en que queremos que reaccione. Por ejemplo vamos a hacer una directiva para que se le asigne el foco al elemento al que se la pongamos, que será de tipo _input_:
```javascript
import Vue from 'vue'

Vue.directive('focus', {
  inserted(el) {
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
```

Si queremos utilizarla en muchos componentes podemos importarla en el _main.js_ y así estará disponible para todos los componentes.

Los estados de la directiva en los que podemos actuar son:
- **inserted** (en Vue3 **mounted**): cuando se inserte la directiva
- **componentUpdated** (en Vue3 **updated**): cuando se actualice el componente que contiene la directiva
- **bind** (en Vue3 **beforeMount**): cuando se enlaza la directiva al componente por primera vez, antes de montar el componente
- ...


## Filtros
Son similares a las directivas pero permiten modificar en el _template_ los datos que le llegan, por ejemplo podemos poner texto en mayúsculas, números en formato moneda o ...

Se aplican mediante un _pipe_ y podemos concatenar todos los que queramos. Para definirlos se ponen en la propiedad _filter_ del componente:
```vue
<template>
  ...
  <p>Precio: { { precio | currency }}</p>
  ...
</template>

<script>
  export default {
    data: () => ({
      precio: '',
    }).
    filter: {
      currency(value) {
        if (!value) return '';
        return value.toFixed(2)+' €';
      },
    },
  }
</script>	
```

## Imágenes
Lo habitual es guardar las imágenes en la carpeta `assets`. Para que se carguen correctamente usaremos en su atributo `src` la función `require` con la URL de la imagen. Ejemplo:
```html
<td>  
  <img :src="require('../assets/elPatitoFeo.jpeg')" height="100px" alt="El Patito Feo">
</td>
```

## Transiciones
Vue permite controlar transiciones en nuestra aplicación poniendo el código CSS correspondiente y añadiéndole al elemento el atributo _transition_. Podemos encontrar más información en la [documentación oficial de Vue](https://vuejs.org/v2/guide/transitions.html).

## Entornos
En Vue tenemos normalmente 3 entornos o _modos_, el de **development**, el de **test** y el de **production**. Las variables de entorno las guardaremos en uno de los siguientes ficheros:
- **.env**: se cargan en todos los modos
- **.env.local**: se cargan en todos los modos pero son ignordas por git
- **.env.[modo]**: se cargan sólo en todos el modo indicado 
- **.env.[modo].local**: ídem pero son ignordas por git

En contenido de estos ficheros son variables en forma `clave=valor`:
```javascript
// fichero .env
TITULO=Mi proyecto
VUE_APP_API=https://localhost/api
```

Si el nombre de la variable comienza por `VUE_APP_` será accesible desde el código con `process.env.nombreVariable`:
```javascript
// <script> de componente
console.log(process.env.VUE_APP_API);
```

Podemos saber en qué entorno se está ejecutando la aplicación consultando el valor de la variable `process.env.NODE_ENV`.

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
        console.log('Vengo de '+from+' y voy a '+to);
        next();
      },
...
})

router.beforeEach(to, from, next) {
  console.log('Vengo de '+from+' y voy a '+to);
  next();
}

export default router
```

En un componente también puedo definir los _hooks_:
- **beforeRouteEnter(to, from, next)**
- **beforeRouteUpdate(to, from, next)**
- **beforeRouteLeave(to, from, next)**

