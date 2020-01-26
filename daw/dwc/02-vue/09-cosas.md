<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Siguientes cosas a aprender en Vue](#siguientes-cosas-a-aprender-en-vue)
  - [Vuetify](#vuetify)
    - [Instalación](#instalaci%C3%B3n)
    - [Crear el layout](#crear-el-layout)
    - [Saber más](#saber-m%C3%A1s)
  - [Paso a producción](#paso-a-producci%C3%B3n)
  - [Vue con Laravel](#vue-con-laravel)
    - [Creación del proyecto](#creaci%C3%B3n-del-proyecto)
    - [Configuramos el proyecto en Vue](#configuramos-el-proyecto-en-vue)
    - [Configuramos Laravel](#configuramos-laravel)
    - [Compilamos Vue](#compilamos-vue)
    - [Creamos la API](#creamos-la-api)
    - [Saber más](#saber-m%C3%A1s-2)
  - [Autenticación](#autenticaci%C3%B3n)
  - [SSR (Server Side Rendering)](#ssr-server-side-rendering)
  - [Nuxt](#nuxt)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Siguientes cosas a aprender en Vue
Algunas cosas interesantes que nos pueden ser útiles en nuestros proyectos son:
* [Vuetify](#Vuetify)
* [Vuex](#vuex)
* [Vue con Laravel / con Lumen](#vue-con-laravel)
* [Autenticación](#autenticaci%C3%B3n)
* [ServerSide Rendering](#ssr-server-side-rendering)
* [Nuxt](#nuxt)

## Vuetify
Es un plugin que nos permite utilizar en Vue los elementos de Material Design. Podemos obtener toda la información sobre esta librería en [su página web](https://vuetifyjs.com/es-MX/getting-started/quick-start).

### Instalación
Vue se instala como cualquier otro plugin:
```bash
vue add vuetify
```

### Crear el layout
En **App.vue** borramos todo su contenido y lo sustituimos por el código de [layout](https://vuetifyjs.com/en/layout/pre-defined) que deseemos de Vuetify. Para ver el código pinchamos en la imagen del layout deseada y lo copiamos.

A continuación ponemos el `<router-view>` donde corresponda (en el caso del layout _Baseline_ en sustitución de la etiqueta `<v-flex>` que contiene los botones para ver el código en GitHub o Codepen.

Cada elemento del menú es una etiqueta `<v-list-tile>` dentro del `<v-navigation-drawer>`. Para modificar el menú vamos a _Vuetify -> UI components -> Navigation drawers_.

Para cada elemento que queramos añadir:
* Su icono está dentro de `<v-icon>` y para elegirlo vamos a [Material Design](https://material.io/tools/icons/?style=baseline) y elegimos el que queramos. Para modificar su aspecto vamos a _Vuetify -> UI components -> Icons_ y copiamos el código que queramos
* Para que enlace a la ruta que queramos añadimos a la etiqueta `<v-list-tile-title>` una etiqueta `<router-link :to="{ name: nombre_de_la_ruta }>`, ejemplo:

```html
<v-list-tile-title>
  <routerlink :to="{ name: 'perfil' }">Perfil</router-link>
</v-list-tile-title>
```

Si no nos gusta Material Dessign tenemos alternativas como _**Buefy**_ que proporciona componentes Vue basados en _Bulma_.

### Saber más
* [VuetifyJS.com](https://vuetifyjs.com/es-MX/getting-started/quick-start)
* [Vuetify Material Framework in 60 minutes](https://www.youtube.com/watch?v=GeUhmMJUFZQ)
* [Intro and Overview of Vuetify.js (Build a CRUD client with Vue.js)](https://www.youtube.com/watch?v=5GfpGaHKfyo)

## Paso a producción
Una vez acabada nuestra aplicación debemos general el _build_ que pasaremos a producción. El _build_ es el conjunto de ficheros compilados, minificados, etc que subiremos al servidor de producción. Para ello tenemos un script en el _package.json_ que se encarga de todo:
```bash
npm run build
```

Crea un directorio **_dist_** con lo qie hay que subir a producción:
- **index.html**: HTML minimizado
- **ficheros .css** y el _source.map_
- **imágenes**: las que hay en _static_ y en _assets_ (estas últimas procesadas,  minimizadas y optimizadas)
- **favicon.ico**
- **ficheros.js**: nuestro código (_app.js_), _manifest.js_ (para _Progssive Web App) y las librerías (_vendor.js_) con sus correspondientes _source.map_

Los _source.map_ son útiles para compilar pero no hay que subirlos a producción.


## Vue con Laravel
Es sencillo crear una SPA completa usando Vue en el Front-end y Laravel para crear el Back-end que sirva la API.

El funcionamiento es el siguiente:
* La primera petición le llega al router de Laravel que renderiza el diseño de la SPA
* Las demás peticiones usan la API _history.pushState_ para navegar sin recargar la página y las gestiona el enrutador Vue

### Creación del proyecto
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

## Autenticación
Una parte importante de cualquier aplicación es la autenticación de usuarios. Para ver cómo gestionarla podemos consultar cualquiera de estos enlaces:
* [Authentication Best Practices for Vue](https://blog.sqreen.io/authentication-best-practices-vue/)
* [Vue Authentication And Route Handling Using Vue-router](https://scotch.io/tutorials/vue-authentication-and-route-handling-using-vue-router)

## SSR (Server Side Rendering)
Esta tecnología permite que al obtener la página un robot (haciendo `curl miURL`) no devuelva sólo la \<app> sino el HTML para que los robots la puedan indexar correctamente. 

El problema que tiene una SPA es que las rutas no existen realmente sino sólo en el front y se generan aíncronamente, lo que dificulta a los robots obtener las páginas de las distintas rutas.

SSR hace que la primera vez que un usuario accede a la web se sirve entera desde el servidor y el resto de veces ya se sirve desde el front. Eso permite que a un robot se le sirva toda desde el servidor y la puede indexar. Esto no es algo que nos interese en todos los proyectos, sólo en aquellos en que sea importante que estén en los buscadores.

Más info: [Server-Side Rendering](https://vuejs.org/v2/guide/ssr.html).

Explicación de qué es y cómo funciona en Angular: [Angular & SEO](http://app.getresponse.com/click.html?x=a62b&lc=BmvXkb&mc=CL&s=mh7Vjl&u=B71jy&y=T&)

## Vue Native
[Vue native](https://vue-native.io/) es un framework que permite generar aplicaciones móviles nativas usando Vue. En realidad es una capa sobre **_React Native_** que permite a Vue usar su API.

Con ella podemos acceder a los diferentes [dispositivos](https://vue-native.io/docs/device-apis.html) del móvil como la cámara, la geolocalización, el acelerómetro, ... Podem trobar molts exemples, com [aquest](https://scotch.io/tutorials/how-to-setup-build-and-deploy-native-apps-with-vue) de scotch.io.

## Nuxt
[Nuxt](https://nuxtjs.org/) es un framework basado en Vue que crea un _scaffolding_ de Vue con todo lo necesario para una aplicación media-grande (incluye rutas, _Vuex_,...) lo que nos facilita el desarrollo de nuestros proyectos.

También hay otras librerías que nos pueden ser de utilidad como:
- _[Framework7](https://framework7.io/)_ para crear una aplicación web que use 
- _[Weex](https://weex.apache.org/)_ para crear aplicaciones nativas para iOS y Android

## Conclusión
Como vés existen infinidad de librerías alrededor de Vue para ofercernos nuevas fucionalidades. Son tantas que el equipo de Vue ha creado [AwesomeVue](https://github.com/vuejs/awesome-vue) donde se registran parte de estas librerías y a donde podemos acceder en busca de cualquier cosa que necesitemos.
