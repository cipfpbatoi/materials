# Siguientes cosas a aprender en Vue
Algunas cosas interesantes que nos pueden ser útiles en nuestros proyectos son:
- [Siguientes cosas a aprender en Vue](#siguientes-cosas-a-aprender-en-vue)
  - [Autenticación](#autenticación)
    - [Store](#store)
    - [API](#api)
    - [Login.vue](#loginvue)
    - [Router](#router)
  - [Paso a producción](#paso-a-producción)
  - [Vuetify](#vuetify)
    - [Instalación](#instalación)
    - [Crear el layout](#crear-el-layout)
    - [Saber más](#saber-más)
  - [Typescript](#typescript)
  - [SSR (Server Side Rendering)](#ssr-server-side-rendering)
  - [Crear aplicaciones móviles con Vue](#crear-aplicaciones-móviles-con-vue)
    - [Quasar](#quasar)
    - [Vue Native](#vue-native)
    - [Ionic Vue](#ionic-vue)
  - [Nuxt](#nuxt)
  - [Conclusión](#conclusión)
  - [Angular](#angular)
  - [Vue con Laravel](#vue-con-laravel)
    - [Creación del proyecto](#creación-del-proyecto)
    - [Configuramos el proyecto en Vue](#configuramos-el-proyecto-en-vue)
    - [Configuramos Laravel](#configuramos-laravel)
    - [Compilamos Vue](#compilamos-vue)
    - [Creamos la API](#creamos-la-api)
    - [Saber más](#saber-más-1)

## Autenticación
Una parte importante de cualquier aplicación es la autenticación de usuarios. Una de las formas más usadas y sencillas de autenticarnos frente a una API es el uso de _tokens_: cuando nos logueamos la API nos pasa un token y en cada petición que le hagamos debemos adjuntar dicho token en las cabeceras de la petición, tal y como vimos al final del tema de [_axios_](https://cipfpbatoi.github.io/materials/daw/dwc/02-vue/04-axios.html#a%C3%B1adir-cabeceras-a-la-petici%C3%B3n).

Aparte de eso, que es lo básico, hay muchas más cosas que podemos incluir en nuestras aplicaciones. Por ejemplo vamos a hacer una aplicación que:
- al loguearnos la API nos pasa un token que guardaremos en el _store_ y también en el _localStorage_ para poder continuar logueados si se recarga la página (recuerda que al recargar se borran todas las variables de nuestro código)
- interceptaremos todas las peticiones a la API para incluir en las cabeceras el token, si tenemos
- interceptaremos todas las respuestas a la API y si en alguna el servidor responde con un error 401 (Unauthenticated) reenviaremos al usuario a la página de login para que se loguee pero pasándole como parámetro la página a la que quería ir para que una vez logueado vaya automáticamente a dicha página
- el login hará varias cosas
  - si hay token en el _localStorage_ es que ya está logueado (posiblemente se haya recargado la página y al interceptar la respuesta era un 401 porque iba sin token y se ha redireccionado aquí). En este caso simplemente se guarda el token en el _store_ y se vuelve a la página de donde venía la petición. OJO: si el token caduca (que es lo más normal) deberemos mirar si ya ha expirado y en ese caso no se guarda en el _store_ sino que se elimina del _localStorage_ y se hace un login normal
  - si no hay token es que debemos loguearnos así que se muestra el formulario para que el usuario introduzca sus credenciales y se le envían al servidor. Este contestará con un token que deberemos guardar en el _store_ y en el _localStorage_ antes de redireccionar a la página de la que venía la petición o a la página de inicio
- en el _router_ indicaremos para qué rutas hay que estar autentificado y antes de cargar cualquiera de ellas (usaremos el _hook_ _beforeEach_) comprobamos si estamos autenticados y en caso de no estarlo redireccionamos al login, pero pasándole como parámetro la ruta a la que queríamos ir para que se cargue tras loguearse

Veamos el código para hacer todo esto:

### Store
```javascript
// Fichero '@/store/index.js'
...
mutations: {
    loginUser(state, token) {
        state.token = token
        localStorage.token = token
    },
    logoutUser(state) {
        state.token = null
        localStorage.removeItem('token')
    },
},
actions: {
    login(context, user) {
        return new Promise ((resolve, reject) => {
            API.users.login(user)
            .then((response) => {
                context.commit('login', response.data)
                resolve(response.data)
            })
            .catch((err) => reject(err))
        })
    },
    ...
},
```

La acción que envía las credenciales del usuario al servidor es una promesa porque el componente _Login.vue_ tiene que saber cuándo se obtiene el token para redireccionar a la página correspondiente.

Las _mutaciones_ almacenan el _token_ en el _store_ y también en el _localStorage_.

### API
```javascript
// Fichero '@/services/API.js'
import axios from 'axios'
import store from '@/store'
import router from '@/router'

const API_URL = process.env.VUE_APP_API

const users = {
    login: (item) => axios.post(`${API_URL}/auth/login`, item),
    register: (user) => axios.post(`${API_URL}/auth/signup`, user),
}
...

axios.interceptors.request.use((config) => {
    const token = store.state.user.access_token
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
    }
    return config;
}, (error) => {
    return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                store.commit('logout')
                if (router.currentRoute.path !== 'login') {
                    router.replace({
                        path: 'login',
                        query: { redirect: router.currentRoute.path },
                    })
                }
        }
    }
    return Promise.reject(error)
})

export default {
    users,
    ...
};
```

Interceptamos las peticiones para incluir el _token_ si lo tenemos.Y también las respuestas porque si es un error 401 hay que loguearse por lo que se cambia el router al _login_ pero se le pasa la dirección de la página en la que se estaba para que tras loguearse se cargue esa página y no la de inicio.


### Login.vue
```vue
// script de la vista 'Login.vue'
...
  mounted() {
    if (localStorage.token) {
      // Si el token caduca debemos comprobar que no haya expirado
      this.$store.commit("login", localStorage.token)
      this.loadPage()
    }
  },
  methods: {
    submit() {
      this.$store.dispatch("login", this.user)
        .then(() => this.loadPage())
        .catch((err) => alert(err))
    },
    loadPage() {
      const redirect = decodeURIComponent(this.$route.query.redirect || '/')
      this.$router.push({ path: redirect })
    }
  },
...
```

### Router
```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import Datos from '../views/Datos.vue'
...

Vue.use(VueRouter)

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.token) {
      next();
    }
    else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  }
  else {
    next();
  }
})

const routes = [
  {
    path: '/datos',
    name: 'Datos',
    component: Datos,
    meta: {
      requireAuth: true,
    },
  },
  ...
]

export default router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
```

Para ver algunos ejemplos de cómo gestionar la autenticación en nuestros proyectos Vue podemos consultar cualquiera de estos enlaces:
* [Authentication Best Practices for Vue](https://blog.sqreen.io/authentication-best-practices-vue/)
* [Vue Authentication And Route Handling Using Vue-router](https://scotch.io/tutorials/vue-authentication-and-route-handling-using-vue-router)

## Paso a producción
Una vez acabada nuestra aplicación debemos general el _build_ que pasaremos a producción. El _build_ es el conjunto de ficheros compilados, minificados, etc que subiremos al servidor de producción. Para ello tenemos un script en el _package.json_ que se encarga de todo:
```bash
npm run build
```

Crea un directorio **_dist_** con lo qie hay que subir a producción:
- **index.html**: HTML 
- **ficheros que hay en `/public`**: imágenes, CSS y cualquier otro fichero estático que hubiera en la carpeta `/public`, como _favicon.ico_
- **assets**: todo lo que ha compilado _Vite_ optimizado y minimizado:
  - **index-xxxx.js**: fichero con todo nuestro código Javascript más el de las librerías usadas
  - **index-xxxx-css**:  fichero con todo nuestro CSS
  - imágenes y otros archivos que hubiera en _assets_


## Vuetify
Son varias las librerías para Vue que nos facilitan enormemente la creación de nuestros componentes ya que nos dan un código para los mismos (tanto el _template_ como el Javascript) de manera que simplemente personalizando ese código con nuestros datos ya tenemos un componente totalmente funcional. Entre ellas están [Material Design](https://material.io/design), [ElementUI](https://element.eleme.io/#/es), [Vuetify](https://vuetifyjs.com) y muchas otras.

Podemos ver la utilidad de estas librerías consultando, por ejemplo, como crear una [_Datatable_](https://vuetifyjs.com/en/components/data-tables/) con Vuetify. Vuetify sigue el diseño de _Material Design_. 

Podemos obtener toda la información sobre esta librería en [su página web](https://vuetifyjs.com/en/).

### Instalación
Vue se instala como cualquier otro plugin:
```bash
vue add vuetify
```

### Crear el layout
En **App.vue** borramos todo su contenido y lo sustituimos por el código de [layout](https://vuetifyjs.com/en/getting-started/wireframes/) que deseemos de Vuetify. Para ver el código pinchamos en la imagen del layout deseada y lo copiamos.

A continuación ponemos el `<router-view>` donde corresponda.

Cada elemento del menú es una etiqueta `<v-list-tile>` dentro del `<v-navigation-drawer>`. Para modificar el menú vamos a _Vuetify -> UI components -> Navigation drawers_.

Para cada elemento que queramos añadir:
* Su icono está dentro de `<v-icon>` y para elegirlo vamos a [Material Design](https://material.io/tools/icons/?style=baseline) y elegimos el que queramos. Para modificar su aspecto vamos a _Vuetify -> UI components -> Icons_ y copiamos el código que queramos
* Para que enlace a la ruta que queramos añadimos a la etiqueta `<v-list-tile-title>` una etiqueta `<router-link :to="{ name: nombre_de_la_ruta }>`, ejemplo:

```html
<v-list-tile-title>
  <routerlink :to="{ name: 'perfil' }">Perfil</router-link>
</v-list-tile-title>
```

Si no nos gusta Material Dessign tenemos alternativas como _**Buefy**_ (que proporciona componentes Vue basados en _Bulma_) y muchas otras.

### Saber más
* [VuetifyJS.com](https://vuetifyjs.com/es-MX/getting-started/quick-start)
* [Vuetify Material Framework in 60 minutes](https://www.youtube.com/watch?v=GeUhmMJUFZQ)
* [Intro and Overview of Vuetify.js (Build a CRUD client with Vue.js)](https://www.youtube.com/watch?v=5GfpGaHKfyo)

## Typescript
Es Javascript al que se le ha incorporado tipado de datos y otras utilidades. En los [apuntes](./21-typescript.html) puedes ver una introducción a cómo usarlo en Vue y en Internet tienes infinidad de recursos para aprender más.

## SSR (Server Side Rendering)
Esta tecnología permite que al obtener la página un robot (haciendo `curl miURL`) no devuelva sólo la \<app> sino el HTML para que los robots la puedan indexar correctamente. 

El problema que tiene una SPA es que las rutas no existen realmente sino sólo en el front y se generan asíncronamente, lo que dificulta a los robots obtener las páginas de las distintas rutas.

SSR hace que la primera vez que un usuario accede a la web se sirve entera desde el servidor y el resto de veces ya se sirve desde el front. Eso permite que a un robot se le sirva toda desde el servidor y la puede indexar. Esto no es algo que nos interese en todos los proyectos, sólo en aquellos en que sea importante que estén bien posicionados en los buscadores.

Más info: [Server-Side Rendering](https://vuejs.org/v2/guide/ssr.html).

Explicación de qué es y cómo funciona en Angular: [Angular & SEO](http://app.getresponse.com/click.html?x=a62b&lc=BmvXkb&mc=CL&s=mh7Vjl&u=B71jy&y=T&)

## Crear aplicaciones móviles con Vue
Diferentes librerías nos permiten que nuestras aplicaciones puedan ejecutarse en móviles tanto Android como iOS. La mayoría utilizan la librería **_Cordova_** de Apache2 para tener acceso a los elementos del móvil como notificaciones, cámara, geolocalización, ...

Existen muchos pero las más utilizadas hoy en día son _Quasar_, _Vue native_ e _Ionic_.

### Quasar
[Quasar](https://quasar.dev/) es un framework basado en VueJS que te permite generar la aplicación de escritorio y la aplicación móvil tanto para Android como para iOS.

Tiene licencia MIT y su UI sigue las guías de Material. Su ventaja sobre los otros es que está creado en Vue y pensado para este framework.

### Vue Native
[Vue native](https://vue-native.io/) es otro framework que permite generar aplicaciones móviles nativas usando Vue. En realidad es una capa sobre **_React Native_** que permite a Vue usar su API.

Con ella podemos acceder a los diferentes [dispositivos](https://vue-native.io/docs/device-apis.html) del móvil como la cámara, la geolocalización, el acelerómetro, ... Podemos encontrar en Internet muchos ejemplos de cómo hacer nuestra App con este framework, como [este](https://scotch.io/tutorials/how-to-setup-build-and-deploy-native-apps-with-vue) de scotch.io.

### Ionic Vue
[Ionic](https://ionicframework.com/) es posiblemente el Framework más utilizado para crear aplicaciones móviles nativas a partir de nuestra aplicación web. Está basado en Angular pero desde diciembre de 2020 puede usarse directamente en Vue, y es compatible con Vue3 y su _Composition API_.

## Nuxt
[Nuxt](https://nuxtjs.org/) es un framework basado en Vue que crea un _scaffolding_ de Vue con todo lo necesario para una aplicación media-grande (incluye rutas, _Vuex_,...) lo que nos facilita el desarrollo de nuestros proyectos.

También hay otras librerías que nos pueden ser de utilidad como:
- _[Framework7](https://framework7.io/)_ para crear una aplicación web que use 
- _[Weex](https://weex.apache.org/)_ para crear aplicaciones nativas para iOS y Android

## Conclusión
Como vés existen infinidad de librerías alrededor de Vue para ofrecernos nuevas funcionalidades. Son tantas que el equipo de Vue ha creado [AwesomeVue](https://github.com/vuejs/awesome-vue) donde se registran parte de estas librerías y a donde podemos acceder en busca de cualquier cosa que necesitemos.

## Angular
Aunque el crecimiento de Vue es muy importante, Angular sigue siendo aún el framework Javascript más demandado por las empresas. Si quieres aprender aquí tienes algunos enlaces de utilidad:
- [Documentación oficial de Angular](https://angular.io/)
- [Ejemplo de CRUD con Angular](https://www.djamware.com/post/5e435e84a8d0ef4300ffc5f6/angular-9-tutorial-learn-to-build-a-crud-angular-app-quickly)
- ...

## Vue con Laravel
Es sencillo crear una SPA completa usando Vue en el Front-end y Laravel para crear el Back-end que sirva la API. Podemos hacerlo como dos proyectos independientes o integrando Vue en Laravel.

Como proyectos independientes es la forma más sencilla. Simplemente nuestro proyecto Vue hará peticiones a la API desarrollada en Laravel.

Si queremos integrar Vue dentro del proyecto Laravel el funcionamiento es el siguiente:
* La primera petición le llega al router de Laravel que renderiza el diseño de la SPA
* Las demás peticiones usan la API _history.pushState_ para navegar sin recargar la página y las gestiona el enrutador Vue

Vamos a ver en detalle cómo gestionarlo.

### Creación del proyecto
Creamos el proyecto Laravel. Dentro del mismo instalamos los paquetes que necesitemos para Vue:
```bash
laravel new laravue
cd laravue
npm install
npm i -S vue-router
```

### Configuramos el proyecto en Vue
Configuramos el router de Vue en un nuevo fichero JS (por ejemplo **/resources/js/router.js**) y lo importamos en el fichero principal, **/resources/js/app.js** (el equivalente al **main.js** de un proyecto con _vue-cli_):
```javascript
// Fichero app.js
...
import App from './views/App'
import router from './router'

const app = new Vue({
    el: '#app',
    components: {
        App
    },
    router,
});
```

Creamos el fichero **/resources/js/App.vue** que será el equivalente al **App.vue** de los proyectos _vue-cli_:
```HTML
<template>
    <div>
        <h1>Vue Router Demo App</h1>

        <p>
            <router-link to="/">Home</router-link>
            ...
            <router-link to="/about">Sobre nosotros...</router-link>
        </p>

        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>
```

### Configuramos Laravel
Creamos la vista principal en **/resources/views/spa.blade.php**:
```HTML
<!DOCTYPE html>
<html lang="{{ str_replace('_','-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Vue SPA Demo</title>
</head>
<body>
    <div id="app">
        <app></app>
    </div>

    <script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
```
NOTA: la línea del _\<meta CSRF-TOKEN>_ es para evitar los errores de la consola por no pasar el token csrf.

Configuramos **/routes/web.php** para que sirva siempre esa página:
```php
Route::get('/{any}', 'SpaController@index')->where('any', '.*');
```

para lo que creamos el controlador:
```bash
php artisan make:controller SpaController
https://vuex.vuejs.org/guide/forms.html```
y lo editamos:
```php
<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;

class SpaController extends Controller
{
    public function index()
    {
        return view('spa');
    }
}
```

### Compilamos Vue
Ahora simplemente ejecutamos en la terminal
```bash
npm run dev
```
y ya tenemos la aplicación en marcha. Si aparece un error de _"The Mix manifest does not exist"_ ejecutaremos `npm run prod`  que crea el fichero _mix-manifest.json_.

Para que se compilen automáticamente los cambios que vayamos haciendo en Vue mientras desarrollamos el proyecto ejecutamos `npm run watch-poll` en una terminal. 

### Creamos la API
Para obtener datos de una API debemos en primer lugar crear la ruta en **/routes/api.php**:
```php
Route::namespace('Api')->group(function () {
    Route::get('/alumnos', 'AlumnosController@index');
});
```

Esto nos crea sólo la ruta para el verbo GET. Una opción mejor es crear todas las rutas del recurso con:
```php
Route::resource('alumnos',’AlumnosController’,['only'=>['index','store','show','update','destroy' ]]);
```
La opción _only_ es opcional y permite restringir las rutas que se crearán para que no se muestren las que no utilizaremos (podemos comprobarlo con un `php artisan route:list`).

Otra opción es usar `apiResources` que crea sólo funciones para los métodos API:
```php
Route::apiResource('alumnos',’AlumnosController’);
```

También podemos crear las rutas para varios controladores a la vez con `resources` en vez de `resource`:
```php
Route::resources(
  [
    'alumnos' => 'Api\AlumnosController',
    'profes' => 'Api\ProfesoresController',
  ],
  ['only'=>['index','store','show','update','destroy' ]]
);
```


Luego creamos el controlador y el recurso:
```php
php artisan make:controller Api/AlumnosController --api
```
La opción `--resource` (o `-r`) crea automáticamente los puntos de entrada para los métodos indicados. La opción `--api` es igual pero no crea funciones para los métodos _create_ ni _edit_.

y el recurso:
```php
php artisan make:resource AlumnoResource
```
Un recurso es un modelo que se debe transformar a un objeto JSON (lo que necesitamos en una API).

y editamos el controlador:
```php
<?php

namespace App\Http\Controllers\Api;

use App\Alumno;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\AlumnoResource;

class AlumnosController extends Controller {
    public function index()  {
        return AlumnoResource::collection(Alumno::paginate(10));
        // Esto devuelve, además del data información para paginar la salida

        // lo anterior equivaldría, sin usar el recurso, a
        $alumnos=Alumno::all()->toArray();
        return response()->json($alumnos);        
    }

    public function show($id)  {
       return new AlumnoResource(Alumno::find($id));
    }
    
    public function store(Request $request)  {
    
        $alumno = Alumno::create([
            'alumno_id' => $request->alumno()->id,
            'nombre' => $request->nombre,
            'apellidos' => $request->apellidos,
            ...
        ]);

      return new AlumnoResource($alumno);
    }
}
```

### Saber más
* [Building a Vue SPA with Laravel](https://laravel-news.com/using-vue-router-laravel)
* [Laravel 5.7 + Vue + Vue Router = SPA](https://medium.com/@weehong/laravel-5-7-vue-vue-router-spa-5e07fd591981). Igual pero usando la librería Vuetify
