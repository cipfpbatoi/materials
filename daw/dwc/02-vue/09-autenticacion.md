# Autenticación y Despliegue

## Autenticación
Una parte importante de cualquier aplicación es la autenticación de usuarios. Una de las formas más usadas y sencillas de autenticarnos frente a una API es el uso de _tokens_: cuando nos logueamos la API nos pasa un token y en cada petición que le hagamos debemos adjuntar dicho token en las cabeceras de la petición.

Aparte de eso, que es lo básico para poder acceder a la API, hay muchas más cosas que podemos incluir en nuestras aplicaciones. Vamos a hacer una aplicación de ejemplo con las siguientes características:
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
