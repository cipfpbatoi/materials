# Nuxt

## Introducción
Es un "automatizador" de Vue, que nos permite crear aplicaciones de Vue de forma más rápida y sencilla. _Nuxt 3_ es la última versión de este framework, y está basado en _Vue 3_ (que utiliza _Vite_) por lo que su soporte para _Typescript_ es completo. Además se ha modularizado para que podamos utilizar solo las partes que necesitemos. Y para usar un módulo solo tenemos que instalarlo y registrarlo, sin necesidad de configurar nada más.

Incluye gran cantidad de automatizaciones, como auto-importación de componentes, auto-routing, etc. Además es un framework _Full Stack_, por lo que incluye un servidor de desarrollo, un servidor de producción, y un servidor de _Static Site Generation_.

Es especialmente útil para crear aplicaciones _Server Side Rendering_ (SSR) y _Static Site Generation_ (SSG) que queremos que las indexen los navegadores, aunque podemos usarlo para cualquier tipo de aplicación.

Podemos consultar la [documentación oficial](https://v3.nuxtjs.org/) para más información.

## Crear un proyecto con Nuxt
Para crear un nuevo proyecto _Nuxt_ debemos ejecutar el siguiente comando:
```bash
npx nuxi@latest init <nombre-proyecto>
```

