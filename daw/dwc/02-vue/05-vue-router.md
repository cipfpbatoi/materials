# Vue-router
- [Vue-router](#vue-router)
  - [Introducción](#introducción)
  - [Instalación](#instalación)
    - [Añadir vue-router a un proyecto Vue3 ya creado](#añadir-vue-router-a-un-proyecto-vue3-ya-creado)
  - [Crear las rutas](#crear-las-rutas)
    - [Rutas dinámicas](#rutas-dinámicas)
    - [Opciones de cada ruta](#opciones-de-cada-ruta)
  - [Crear un menú](#crear-un-menú)
  - [Saltar a una ruta](#saltar-a-una-ruta)
  - [Paso de parámetros](#paso-de-parámetros)
  - [El objeto $route](#el-objeto-route)
  - [Ruta no encontrada: 404 Not found](#ruta-no-encontrada-404-not-found)
  - [Redireccionamiento](#redireccionamiento)
  - [Cambio de parámetros en una ruta](#cambio-de-parámetros-en-una-ruta)
  - [Vistas  con nombre y Subvistas](#vistas--con-nombre-y-subvistas)

## Introducción
Como comentamos al principio Vue nos va a permitir crear SPA (_Single Page Applications_) lo que significa que sólo se cargará una pagina: _index.html_. Sin embargo nuestra aplicación estará dividida en diferentes vistas que el usuario percibirá como si fueran páginas diferentes y el encargado de gestionar la navegación entre estas vistas/páginas es **vue-router** que es otra de las librerías del "ecosistema" de Vue (en este caso realizada por los desarrolladores de Vue).

En resumen, en nuestra aplicación (normalmente en el _App.vue_) tendremos una etiqueta `<router-view>` y lo que hará _vue-router_ es cargar en esa etiqueta el componente que corresponda en función de la ruta que haya en la barra de direcciones del navegador. Por ejemplo si la URL es **/products** cargará un componente llamado _ProductsTable_ (que mostrará una tabla con todos los productos de la aplicación) y si la URL es **/newprod** cargará un componente llamado _ProductForm_ con un formulario para añadir un nuevo producto.

Lo que hacemos para configurar _vue-router_ es definir rutas que _mapean_ componentes de nuestra aplicación a rutas URL de forma que cuando se pone determinada ruta en el navegador se carga en nuestra página el componente indicado. También permite tener subrutas que mapeen subcomponentes dentro de otros.

## Instalación
La forma más sencilla es escoger la opción de _Vue-router_ al crear nuestro proyecto _Vue_. En este caso no es necesario hacer nada porque se instala y configura todo automáticamente. 

### Añadir vue-router a un proyecto Vue3 ya creado
Si queremos añadirlo a un proyecto ya creado previamente tendremos que instalarlo y configurarlo manualmente nosotros. 

Los paso son:

1. se instala el paquete **vue-router** como dependencia de producción:
```bash
npm install -S vue-router
```

2. se crea el fichero de rutas, por ejemplo en **/src/router/index.js**. Aquí se define para cada ruta de nuestra aplicación el componente que debe cargarse. Su contenido es

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
```

- se importa dicho fichero en el **main.js** para que el almacén esté disponible para todos los componentes en la variable `this.$router`:

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // <---

createApp(App).use(router).mount('#app')
```

- en el _scaffolding_ del proyecto es recomendable crear una nueva carpeta _views_ donde guardar las distintas vistas de nuestra aplicación, que son componentes que renderizan una "_página_" de la aplicación (es decir, nuestros componentes ahora se dividen en 2 tipos: los que renderizan una "página", que irán a _Views_ y los que son parte de una página, que irán a _Components_).

## Crear las rutas
Las rutas de nuestra aplicación las definiremos en un fichero Javascript (por defecto **_/src/router/index.js_**). Allí creamos la instancia para nuestras rutas (el objeto que exportamos) y la configuramos. También debemos importar todos los componentes que definamos en el router:
```javascript
import { createWebHistory, createRouter } from 'vue-router'

// Importamos los componentes que se carguen en alguna ruta
import AppHome from './components/AppHome.vue'
import AppAbout from './components/AppAbout.vue'
import UsersTable from './components/UsersTable.vue'
import UserNew from './components/UserNew.vue'
import UserEdit from './components/UserEdit.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: AppHome
  },{
    path: '/about',
    name: about,
    component: AppAbout
  },{
    path: '/users',
    component: UsersTable
  },{
    path: '/new',
    component: UserNew
  },{
    path: '/edit/:id',
    component: UserEdit
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
```

Cada vez que cambie la URL en el navegador no cambiará todo el layout sino que sólo se cargará en la etiqueta 

```html
<router-view></router-view>
```

el componente indicado para esa ruta. Dicha etiqueta estará normalmente en el fichero _App.vue_.

El modo _'history'_ de nuestro router indica que use rutas "amigables" y que no incluyan la # (piensa que en realidad no se están cargando diferentes páginas sino partes de una única página ya que es una SPA). Esta es la opción que escogeremos siempre en las aplicaciones SPA, aunque si nuestro servidor web usa ASP.NET o JSP habrá que decirle que ignore las URLs porque ya se ocupa de ellas Vue. La alternativa sería usar `createWebHashHistory()` pero en ese caso las rutas en vez de ser algo como `http://localhost:8080/products` serían  `http://localhost:8080/#products`.

### Rutas dinámicas
_VueRouter_ permite rutas dinámicas como la indicada para el componente _UserEdit_:
```javascript
{
  path: '/edit/:id',
  component: UserEdit
}
```

Esa ruta coincidirá con cualquier URL que comience por _/edit/_ y tenga algo más. Lo que haya tras la última _/_ lo asignará el _router_ a una variable llamada _id_ (el nombre que pongamos tras el carácter `:`) y dicha variable la recibirá el componente _UserEdit_ en un parámetro accesible desde `this.$route.params.id`. Si añadimos a la ruta la opción `props: true` haremos que el componente además reciba el parámetro en sus _props_ (en este caso recibirá una variable llamada _id_ que será accesible desde `this.id` directamente).

### Opciones de cada ruta
Para cada ruta que queramos mapear hay que definir:
* **path**: la url que hará que se cargue el componente
* **component**: el componente que se cargará donde se encuentre la etiqueta **\<router-view>** en el HTML

Además de esas propiedades podemos indicar:
* **name**: le damos a la ruta un nombre que luego podemos usar para referirnos a ella
* **props**: se usa en rutas dinámicas e indica que el componente recibirá el parámetro de la ruta en sus _props_. Si no se incluye esta opción el componente tendrá que acceder al parámetro _id_ desde `this.$route.params.id` 


## Crear un menú
Seguramente querremos un menú en nuestra SPA que nos permita ir a las diferentes rutas (que provocarán que se carguen los componentes). Para ello usaremos la etiqueta **\<router-link>**. Ejemplo:
```html
<router-link to="/">Home</router-link>
<router-link to="/about">Acerca de...</router-link>
```

Cuando accedemos a una ruta su elemento \<router-link> adquiere la clase _.router-link-active_.

Si le hemos puesto la propiedad _name_ a una ruta podemos hacer un enlace a ella con
```html
<router-link :to="{name: 'nombre_de_la_ruta'}">Home</router-link>
```

Fijaos que hemos de _bindear_ el traibuto `to` porque ya no le pasamos el texto sino una variable.

Se podría hacer (aunque no es normal) una opción de menú a una ruta dinámica y pasarle el parámetro deseado. Por ejemplo para editar el usuario 5 haríamos:
```html
<router-link :to="{name: 'edit', params: {id: 5}}">Editar usuario 5</router-link>
```
En este caso es necesario que la ruta dinámica tenga un _name_.

## Saltar a una ruta
Al hacer `.use(router)` en el fichero _main.js_ estamos declarando esa variable (_router_) en la instancia principal de la aplicación por lo que estará disponible para todos los componentes desde `this.$router`. Esto nos permite acceder al router desde un componente para, por ejemplo, cambiar a una ruta.

El código para cambiar la ruta desde Javascript es
```javascript
this.$router.push(ruta)
```

Tenemos varios métodos para navegar por código:
* **`.push(newUrl)`**: salta a la ruta _newUrl_ y la añade al historial
* **`.replace(newURL)`**: salta a la nueva ruta pero reemplaza en el historial la ruta actual por esta
* **`.go(num)`**: permite saltar el num. de páginas indicadas adelante (ej. _this.$router.go(1)_) o atrás (_.go(-1)_) por el historial

Estos métodos son equivalentes a los métodos _history.push()_, _history.replace()_ y _history.go()_ de Javascript.

Además podemos pasar a `push()` y `replace()` funciones _callback_ que se ejecutarán al cambiar la ruta si todo va bien o si hay algún error.
```javascrip
this.$router.push(location, onComplete?, onAbort?)
```

También podemos obtener toda la ruta con `this.$route.fullPath`.

## Paso de parámetros
La forma de pasar parámetros a la ruta es:

```javascript
this.$router.push({ name: 'users', params: { id: 123 }})
```

esto hace que se salte a la ruta con _name_ users y le pasa como parámetro una _id_ de valor 123. En el componente que se cargue en dicha ruta obtendremos el parámetro pasado con `this.$route.params.nombreparam` (en el ejemplo en `this.$route.params.id` obtenemos el valor `123`). 

Se puede pasar más de un parámetro pero para que los pueda recibir el componente hay que ponerlos todos en el _router_. Por ejemplo para hacer un `this.$router.push({ name: 'books', params: { autor: 12, tema: 4 }})`

la ruta en el _router_ debería contener ambas variables:
```javascript
path: '/books/author/:autor/topic/:tema'
```

Podemos pasar también un objeto como parámetro pero antes debemos convertirlo a texto con `JSON.stringify()`. Sin embargo no es muy conveniente porque la URL quedaría demasiado larga y "sucia".

También se puede pasar una _query_ a la ruta:
```javascript
this.$router.push({ path: '/register', query: { plan: 'private' }})
```

salta a la URL `/register?plan=private`. En el componente que se carga obtenemos la query pasada con `this.$route.query` (obtenemos un objeto, en el ejemplo `{ plan: 'private' }`).

**IMPORTANTE**: Tened en cuenta que lo que se pasa como parámetro o consulta aparecerá en la URL por lo que no debemos enviar información sensible y no se recomienda enviar algo muy largo (como un objeto o array) para evitar que la URL quede "sucia".

## El objeto $route
Es un objeto que contiene información de la ruta actual (no confundir con _$router_). Algunas de sus propiedades son:
* **params**: el objeto con los parámetros pasados a la ruta (puede haber más de uno)
* **query**: si hubiera alguna consulta en la ruta (tras '?') se obtiene aquí un objeto con ellas
* **path**: la ruta pasada (sin servidor ni querys, por ejemplo de `http://localhost:3000/users?company=5` devolvería '/users')
* **fullPath**: la ruta pasada (con las querys, por ejemplo de `http://localhost:3000/users?company=5` devolvería '/users?company=5')

## Ruta no encontrada: 404 Not found
Si en nuestra aplicación cargamos una ruta que no coincide con ninguna de las definidas en el _router_ no se cargará ningún componente en el _RouterView_.

Una mejora de esto es crear una vista con lo que queramos mostrar ('404 - La página no existe' o algo similar) y hacer una ruta que cargue dicho componente.

Si llamamos a esa vista `PathNotFound.vue` la ruta a crear sería:
```javascript
{ 
  path: '/:pathMatch(.*)*', 
  component: PathNotFound 
},
```

Esta ruta hay que ponerla la última ya que coincidirá con cualquier URL (usa una expresión regular y la dice que la ruta coincida con '*').

## Redireccionamiento
En el _router_ puedo también poner una ruta que haga una redirección a otra en lugar de cargar un componente.
```javascript
{ 
  path: '/a', 
  redirect: '/b' 
},
```

Lo que hace es que si se pone una URL `/a` la cambia automáticamente a `/b` y se buscará una ruta que coincida con esa.

También podemos poner _alias_ a una ruta de forma que se cargue un componente tanto si la URL es una como otra (en este caso no se cambiaría la URL):
```javascript
{ 
  path: '/a', 
  component: A,
  alias: '/b' 
},
```

Podés obtener más información en la [documentación de Vue-router](https://v3.router.vuejs.org/guide/essentials/redirect-and-alias.html#redirect).


## Cambio de parámetros en una ruta
Si cambiamos a la misma ruta pero con distintos parámetros Vue reutiliza la instancia del componente y no vuelve a lanzar sus _hooks_ (created, mounted, ...). Esto hará que no se ejecute el código que tengamos allí. Por ejemplo supongamos que en una ruta '/edit/5' al cargar el componente se pide el registro 5 y se muestra en la página. Si a continuación cargamos la ruta '/edit/8' seguiremos viendo los datos del registro 5).

Podemos solucionar esto desde el _router_ o desde el componente.

Desde el _router_ podemos usar el elemento `beforeRouteUpdate` y realizar allí la carga de los datos:
```javascrip
beforeRouteUpdate (to, from, next) {
    // Código que responde al cambio. En 'to' tenemos la ruta anterior y en 'from' la nueva
    // antes de acabar hay que llamar a next()
    // Aquí cargamos los nuevos datos
    next();
} 
```

Desde el componente podemos usar un _watcher_ para detectar el cambio en la ruta:
```javascrip
watch: {
    '$route' (to, from) {
        // Aquí cargamos los nuevos datos
    }
} 
```

Cada vez que cambie el valor de _$route_ se ejecutará ese código y recibirá en el parámetro _to_ la nueva ruta y en _from_ el valor anterior de la variable. Veremos los _watchers_ más adelante o podéi consultar la [documentación de Vue](https://vuejs.org/guide/essentials/watchers.html).

## Vistas  con nombre y Subvistas
Podemos cargar más de un componente usando varias etiquetas `<router-view>`. Por ejemplo si nestra página constará de 3  componentes (uno en la cabecera, otro el principal y otro en un _aside_ pondremos en el HTML:
```html
<router-view class="cabecera" name="top"></router-view>
<router-view class="main"></router-view>
<router-view class="aside" name="aside"></router-view>```
```

Para que se carguen los 3 componentes lo debemos indicar al definir las rutas:
```javascript
{
    path: '/',  
    components: {
        default: CompMain,		// CompMain se cargará en el <router-view> sin nombre
        top: CompCabecera,
        aside: CompAside
    }
}
```

También un componente puede incluir su propia etiqueta `<router-view>` que cargue dentro de él un subcomponente en función de una subruta. Por [ejemplo](http://jsfiddle.net/yyx990803/L7hscd8h/) tenemos una ruta _/user/:id_ que carga un componente _User_ con el nombre y la imagen del usuario y debajo cargará, en función de la ruta:
*  _/user/:id_: debajo cargará el componente con el home del usuario
*  _/user/:id/profile_: debajo cargará el componente con el perfil del usuario
*  _/user/:id/posts_: debajo cargará el componente con los posts del usuario
Definiremos la ruta del siguiente modo:
```javascript
{
    path: '/',  
    components: {
{
  path: '/user/:id', 
  component: User,
  children: [
    { path: '', component: UserHome },
    { path: 'profile', component: UserProfile },
    { path: 'posts', component: UserPosts }
  ]
}
```

Podemos consultar toda la información referente al router de Vue en [https://router.vuejs.org/](https://router.vuejs.org/).