# Autenticación en Vue 3
- [Autenticación en Vue 3](#autenticación-en-vue-3)
  - [1. Introducción](#1-introducción)
  - [2. Arquitectura recomendada](#2-arquitectura-recomendada)
  - [3. Store de autenticación](#3-store-de-autenticación)
  - [4. Servicio API con Axios e interceptores](#4-servicio-api-con-axios-e-interceptores)
    - [4.1 Interceptor de Request](#41-interceptor-de-request)
    - [4.2 Interceptor de Response](#42-interceptor-de-response)
  - [5. Protección de rutas con Router](#5-protección-de-rutas-con-router)
  - [6. Vista Login](#6-vista-login)
  - [7. Expiración del Token (JWT)](#7-expiración-del-token-jwt)
    - [Opción recomendada (simple)](#opción-recomendada-simple)
    - [Opción avanzada: comprobar expiración manualmente](#opción-avanzada-comprobar-expiración-manualmente)
  - [8. Refresh Token](#8-refresh-token)
    - [¿Qué es un Refresh Token?](#qué-es-un-refresh-token)
    - [Flujo completo](#flujo-completo)
    - [Ejemplo básico de refresh en interceptor](#ejemplo-básico-de-refresh-en-interceptor)
  - [9. Resumen Final](#9-resumen-final)
  - [10. Conclusión](#10-conclusión)


## 1. Introducción

La autenticación basada en tokens funciona de la siguiente manera:

1. El usuario envía sus credenciales (email y password).
2. El servidor responde con un **JWT (JSON Web Token)**.
3. El frontend:
   - Guarda el token en el **store (Pinia)**.
   - Lo guarda en **localStorage** para mantener sesión tras recargar.
4. En cada petición HTTP se envía el token en la cabecera:

```
Authorization: Bearer <token>
```

Si el servidor responde `401 Unauthorized`, significa que el token no es válido o ha expirado y el usuario debe autenticarse de nuevo.

---

## 2. Arquitectura recomendada

```
src/
 ├── stores/
 │     └── auth.js
 ├── services/
 │     └── api.js
 ├── router/
 │     └── index.js
 └── views/
       └── Login.vue
```

Separar responsabilidades evita código desordenado y difícil de mantener.

---

## 3. Store de autenticación

📄 `stores/auth.js`

```js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {

  const token = ref(localStorage.getItem('token') || null)

  const isAuthenticated = computed(() => !!token.value)

  async function login(credentials) {
    const response = await api.users.login(credentials)

    token.value = response.data.token
    localStorage.setItem('token', token.value)
  }

  function logout() {
    token.value = null
    localStorage.removeItem('token')
  }

  return {
    token,
    isAuthenticated,
    login,
    logout
  }
})
```

Aquí se centraliza el estado de la autenticación. En muchas ocasiones no nos interesará sólo el token sino un objeto _user_ con la información del usuario autenticado que nos devolverá el _backend_ tras autenticarse, per exemple:

```js
const user = ref({
  name: null, 
  token: localStorage.getItem('token'), 
  role: null,
})
```

La inicialización del token se hace leyendo el valor de `localStorage` para mantener la sesión tras recargar la página.

El _computed_ que creamos permite siempre saber si el usuario está autenticado o no y al estar cacheado sólo se ejecutará de nuevo cuando el token cambie.

---

## 4. Servicio API con Axios e interceptores

📄 `services/api.js`

```js
import axios from 'axios'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})
```

### 4.1 Interceptor de Request

Añade automáticamente el token a todas las peticiones.

```js
api.interceptors.request.use((config) => {

  const authStore = useAuthStore()
  const token = authStore.token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
```

### 4.2 Interceptor de Response

Detecta errores 401 y redirige al login.

```js
api.interceptors.response.use(
  response => response,
  error => {

    if (error.response?.status === 401) {

      const authStore = useAuthStore()
      authStore.logout()

      router.replace({
        path: '/login',
        query: { redirect: router.currentRoute.value.fullPath }
      })
    }

    return Promise.reject(error)
  }
)
```

Si el backend devuelve `401`:
- Se elimina el token.
- Se redirige al login.
- Se guarda la ruta que el usuario intentaba visitar.

---

## 5. Protección de rutas con Router

📄 `router/index.js`

```js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Login from '@/views/Login.vue'
import DatosView from '@/views/DatosView.vue'

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/datos',
    component: DatosView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {

  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {

    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })

  } else {
    next()
  }

})

export default router
```

Además de simplemente proteger una ruta podemos indicar para qué roles se permite el acceso:

```js
...
{ path: '/datos', component: DatosView, meta: { requiresAuth: true, roles: ['admin','vendor'] } },
...

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else if (to.meta.roles?.length) {
    const role = auth.role
    if (!role || !to.meta.roles.includes(role)) next('/forbidden')
  } else {
    next()
  }
})
```

---

## 6. Vista Login

📄 `Login.vue`

```vue
<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const error = ref(null)

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

async function handleLogin() {
  try {
    await authStore.login({
      email: email.value,
      password: password.value
    })

    const redirectPath = route.query.redirect || '/'
    router.push(redirectPath)

  } catch (err) {
    error.value = 'Credenciales incorrectas'
  }
}
</script>

<template>
  <form @submit.prevent="handleLogin">
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button>Login</button>
    <p v-if="error">{{ error }}</p>
  </form>
</template>
```

---

## 7. Expiración del Token (JWT)

Un JWT incluye un campo `exp` que indica la fecha de expiración.

### Opción recomendada (simple)

No comprobar nada manualmente.

- El backend controla la expiración.
- Si el token expira → devuelve 401.
- El interceptor gestiona el logout automáticamente.


### Opción avanzada: comprobar expiración manualmente

```js
import jwt_decode from 'jwt-decode'

function isTokenExpired(token) {
  const decoded = jwt_decode(token)
  return decoded.exp * 1000 < Date.now()
}
```

Si está expirado:

```js
logout()
```

---

## 8. Refresh Token

### ¿Qué es un Refresh Token?

En vez de obligar al usuario a loguearse cuando el token expira:

- **Access token** → corta duración (5-15 minutos)
- **Refresh token** → larga duración (días o semanas)

Cuando el access token expira:
1. Se envía el refresh token al servidor.
2. El servidor devuelve un nuevo access token.
3. La petición original se repite automáticamente.
4. El usuario no nota nada.

---

### Flujo completo

```
Login → accessToken + refreshToken
Peticiones → accessToken
Si 401 → intentar refresh
Si refresh OK → repetir petición
Si refresh falla → logout
```

---

### Ejemplo básico de refresh en interceptor

```js
let isRefreshing = false

api.interceptors.response.use(
  response => response,
  async error => {

    const authStore = useAuthStore()

    if (error.response?.status === 401 && !isRefreshing) {

      isRefreshing = true

      try {
        const response = await axios.post('/auth/refresh', {
          refreshToken: localStorage.getItem('refreshToken')
        })

        authStore.token = response.data.token
        localStorage.setItem('token', response.data.token)

        error.config.headers.Authorization = `Bearer ${response.data.token}`

        return api(error.config)

      } catch (err) {
        authStore.logout()
        router.push('/login')
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)
```

---

## 9. Resumen Final

| Elemento | Función |
|----------|----------|
| Pinia | Estado global de autenticación |
| localStorage | Persistencia tras recarga |
| Axios request interceptor | Añade token automáticamente |
| Axios response interceptor | Detecta 401 |
| Router guard | Protege rutas |
| Refresh token | Renovación automática |

---

## 10. Conclusión

Una autenticación bien diseñada:

- Centraliza la lógica en el store.
- Usa interceptores para evitar repetición.
- Protege rutas desde el router.
- Gestiona correctamente la expiración.
- Permite escalar mediante refresh tokens.

Estructura limpia, profesional y mantenible.
