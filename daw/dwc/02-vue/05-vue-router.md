<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
Tabla de contenidos

- [Vue-router](#vue-router)
  - [Instalación](#instalaci%C3%B3n)
  - [Crear las rutas](#crear-las-rutas)
  - [Crear un menú](#crear-un-men%C3%BA)
  - [Saltar a una ruta](#saltar-a-una-ruta)
  - [Paso de parámetros](#paso-de-par%C3%A1metros)
  - [El objeto $route](#el-objeto-route)
  - [Redireccionamiento. Not found](#redireccionamiento-not-found)
  - [Cambio de parámetros en una ruta](#cambio-de-par%C3%A1metros-en-una-ruta)
  - [Vistas  con nombre y Subvistas](#vistas--con-nombre-y-subvistas)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Vue-router
Como comentamos al pricipio Vue nos va a permitir crear SPA (_Single Page Applications_) lo que significa que sólo se cargará una pagina: _index.html_. Sin embargo nuestra aplicación estará dividida en diferentes vistas que el usuario percibirá como si fueran páginas diferentes y el encargado de gestionar la navegación entre estas vistas/páginas es **Vue-router** que es otra de las librerías del "ecosistema" de Vue (en este caso realizada por los desarrolladores de Vue).

En resumen, en nuestra aplicación (normalmente en el _App.vue_) tendremos una etiqueta `<router-view>` y lo que hará _vue-router_ es cargar en esa etiqueta el componente que corresponda en función de la ruta que haya en la barra de direcciones del navegador. Por ejemplo si la URL es **/products** cargará un componente llamado _ProductsTable_ (que mostrará una tabla con todos los productos de la aplicación) y si la URL es **/newprod** cargará un componente llamado _ProductForm_ con un formulario para añadir un nuevo producto.

Lo que hacemos para configurar _vue-router_ es definir rutas que _mapean_ componentes de nuestra aplicación a rutas URL de forma que cuando se pone determinada ruta en el navegador se carga en nuestra página el componente indicado. También permite tener subrutas que mapeen subcomponentes dentro de otros.

## Instalación
Si al crear nuestro proyecto _Vue_ vamos a la opción _manual_ y seleccionamos el **Router** no es necesario hacer nada porque se configura todo automáticamente. En ese caso lo que hace _vue-cli_ es:
- se instala el paquete **vue-router**. Si hubiéramos marcado _router_ al crear el proyecto deberíamos instalarlo nosotros manualmente con:
```bash
npm install -S vue-router
```

- se crea el fichero de rutas en **/src/router/index.js**. Es nuestro almacén donde se guardan todas las variables que vaya a usar más de un componente y los métodos para acceder a ellas y modificarlas. Su contenido es

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
```

- se importa dicho fichero en el **main.js** para que el almacén esté disponible para todos los componentes en la variable `this.$router`:

```javascript
...
import router from './router'

new Vue({
  router,	
  render: h => h(App)
}).$mount('#app')
```

- en el _scaffolding_ del proyecto se crea una nueva carpeta _views_ que es donde se recomienda guardar las distintas vistas de nuestra aplicación, que son componentes que renderizan una "_página_" de la aplicación

Si queremos es añadir _vue-router_ a un proyecto ya existente que no lo tiene debemos añadir manualmente el paquete y configurarlo haciendo los pasos indicados arriba. Si queremos instalarlo en un proyecto  _Vue3_ ejecutamos:
```bash
npm install vue-router@next -S
```

EL fichero _main.js_ en _Vue3_ quedaría:
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // <---

createApp(App).use(router).mount('#app')
```

## Crear las rutas
Las rutas de nuestra aplicación las definiremos en en fichero **_router/index.js_**. Allí importamos _Vue-router_, lo declaramos (`Vue.use`), creamos una instancia para nuestras rutas (`new Router`, que es el objeto que exportamos) y la configuramos. También debemos importar todos los componentes que definamos en el router:
```javascript
// En Vue 2:
import Vue from 'vue'
import VueRouter from 'vue-router'
// En Vue 3:
// import { createWebHistory, createRouter } from 'vue-router'

// Importamos los componentes que se carguen en alguna ruta
import AppHome from './components/AppHome.vue'
import AppAbout from './components/AppAbout.vue'
import UsersTable from './components/UsersTable.vue'
import UserNew from './components/UserNew.vue'
import UserEdit from './components/UserEdit.vue'

Vue.use(VueRouter)

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

const router = new VueRouter({
  mode: 'history',	// en Vue3 cambiaremos esta línea por 	history: createWebHistory(),
  routes,
});

export default router
```

El modo _'history'_ de nuestro router indica que use rutas "amigables" y que no incluyan la # (ya que en realidad no se están cargando diferentes páginas sino partes de una única página -es una SPA-). Esta es la opción que escogeremos siempre en las aplicaciones SPA.

_VueRouter_ permite rutas dinámicas como la indicada para el componente _UserEdit_: la ruta `/edit/` seguida de algo más hará que se cargue el componente _UserEdit_ y que dicho componente reciba en un parámetro llamado `id` la parte final de la ruta (por ejemplo **/edit/5** hace que el componente reciba en sus _props_ una variable llamada _id_ con valor 5).

Para cada ruta que queramos mapear hay que definir:
* **path**: la url que hará que se cargue el componente
* **component**: el componente que se cargará donde se encuentre la etiqueta **\<router-view>** en el HTML

Además de esas propiedades podemos indicar:
* **name**: le damos a la ruta un nombre que luego podemos usar para referirnos a ella
* **props**: se usa en rutas dinámicas e indica que el componente recibirá el parámetro de la ruta en sus _props_. Si no se pone el componente tendrá que acceder al parámetro _id_ desde `this.$route.params.id` 

Cada vez que pongamos una nueva URL en el navegador no cambiará todo el layout sino que sólo se cargará en componente indicado para esa ruta. En el fichero _Aapp.vue_, en la parte del HTML en que queramos que se carguen los diferentes componentes de nuestra SPA incluiremos la etiqueta:
```html
<router-view></router-view>
```

Y es donde al cambiar la URL se cargará el componente indicado para la ruta actual.

## Crear un menú
Seguramente querremos un menú en nuestra SPA que nos permita ir a las diferentes rutas (que provocarán que se carguen los componentes). Para ello usaremos la etiqueta **\<router-link>**. Ejemplo:
```html
<router-link to="/">Home</router-link>
<router-link to="/about">Acerca de...</router-link>
```

Cuando accedemos a una ruta su elemento \<router-link> adquiere la clase _.router-link-active_.

Si le hemos puesto la propiedad _name_ a una ruta podemos hacer un enlace a ella con
```html
<router-link to="{name: 'nombre_de_la_ruta'}">Home</router-link>
```

Se puede hacer (aunque no es lo normal) una opción de menú a una ruta dinámica y pasarle el parámetro deseado. Por ejemplo para editar el usuario 5 haremos:
```html
<router-link to="{name: 'edit', params: {id: 5}}">Editar usuario 5</router-link>
```
En este caso es necesario que la ruta dinámica tenga un _name_.

## Saltar a una ruta
Al hacer `Vue.use` en el fichero del router hacemos que esté disponible para todos los componentes desde `this.$router`. Esto nos permite acceder al router desde un componente para, por ejemplo, cambiar a una ruta.

Podemos cargar la ruta que queramos desde JS con
```javascrip
this.$router.push(ruta)
```
Tenemos varios métodos para navegar por código:
* **.push(newUrl)**: salta a la ruta _newUrl_ y la añade al historial
* **.replace(newURL)**: salta a la nueva ruta pero reemplaza en el historial la ruta actual por esta
* **.go(num)**: permite saltar el num. de páginas indicadas adelante (ej. _this.$route(go1)_) o atrás (_.go(-1)_) por el historial

Estos métodos son equivalentes a los métodos _history.push()_, _history.replace()_ y _history.go()_ de JS.

Además podemos pasar a push() y replace() funciones _callback_ que se ejecutarán al cambiar la ruta si todo va bien o si hay algún error.
```javascrip
this.$router.push(location, onComplete?, onAbort?)
```

También podemos obtener toda la ruta con `this.$route.fullPath`.

## Paso de parámetros
Se pueden pasar parámetros a la ruta:

```javascript
this.$router.push({ name: 'users', params: { id: 123 }})
```

salta a la ruta con _name_ users y le pasa como parámetro una _id_ de valor 123 (si la ruta definida en _users_ fuera _/usuarios_ la URL cargada será `/usuarios/123`). En el componente que se cargue en dicha ruta obtendremos el parámetro pasado con `this.$route.params.nombreparam` (en el ejemplo en `this.$route.params.id` obtenemos el valor `123`). Podemos pasar cualquier objeto como parámetro.

También se puede pasar una _query_ a la ruta:
```javascript
this.$router.push({ path: '/register', query: { plan: 'private' }})
```

salta a la URL `/register?plan=private`. En el componente que se carga obtenemos la query pasada con `this.$route.query` (obtenemos el objeto, en el ejemplo `{ plan: 'private' }`).

## El objeto $route
Es un objeto que contiene información de la ruta actual (no confundir con _$router_). Algunas de sus propiedades son:
* **params**: el objeto con los parámetros pasados a la ruta (puede haber más de uno)
* **query**: si huberia alguna consulta en la ruta (tras '?') se obtiene aquí un objeto con ellas
* **path**: la ruta pasada (sin servidor ni querys, por ejemplo de `http://localhost:3000/users?company=5` devolvería '/users')
* **fullPath**: la ruta pasada (con las querys, por ejemplo de `http://localhost:3000/users?company=5` devolvería '/users?company=5')

## Redireccionamiento. Not found
En una ruta podemos poner una redirección a otroa en lugar de un componente. Es lo que haremos para que si se carga una ruta inexistente nos cargue un componente que le indique al usuario que la ruta no existe.

En primer lugar haremos una ruta para el componente CompNoFound y luego una ruta genérica (\*) que redirija a la anterior:
```javascript
  routes: [
    ...
    {
      path: '/not-found',
      name: '404',
      component: CompNotFound,
    },
    {
      path: '*',
      redirect: {
        name: '404',
      },
    }
  ]
```

La ruta genérica siempre debe ser la última.

Podemos consultar toda la información referente al router de Vue en [https://router.vuejs.org/](https://router.vuejs.org/).

## Cambio de parámetros en una ruta
Si cambiamos a la misma ruta pero con distintos parámetros Vue reutiliza la instancia del componente y no vuelve a lanzar sus _hooks_ (created, mounted, ...). Esto hará que no se ejecute el código que tengamos allí. Por ejemplo supongamos que en una ruta '/edit/5' al cargar el componente se pide el registro 5 y se muestra en la página. Si a continuación cargamos la ruta '/edit/8' seguiremos viendo los datos del registro 5).

La forma de solucionar esto es usar el elemento 'beforeRouteUpdate' y realizar allí la carga de los datos:
```javascrip
beforeRouteUpdate (to, from, next) {
    // Código que responde al cambio. En 'to' tenemos la ruta anterior y en 'from' la nueva
    // antes de acabar hay que llamar a next()
    // Aquí cargamos los nuevos datos
    next();
} 
```

También podríamos usar un _watcher_ para detectar el cambio en la ruta:
```javascrip
watch: {
    '$route' (to, from) {
        // Aquí cargamos los nuevos datos
    }
} 
```

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
