# Vue-cli
- [Vue-cli](#vue-cli)
  - [Introducción](#introducción)
  - [Instalación](#instalación)
  - [Creación de un nuevo proyecto](#creación-de-un-nuevo-proyecto)
    - [Ejemplo proyecto por defecto](#ejemplo-proyecto-por-defecto)
    - [_Build and Deploy_ de nuestra aplicación](#build-and-deploy-de-nuestra-aplicación)
    - [_Scaffolding_ creado](#scaffolding-creado)
      - [package.json](#packagejson)
      - [Estructura de nuestra aplicación](#estructura-de-nuestra-aplicación)
  - [SFC (_Single File Component_)](#sfc-single-file-component)
    - [Secciones de un Single File Component](#secciones-de-un-single-file-component)
      - [\<template>](#template)
      - [\<script>](#script)
      - [\<style>](#style)
      - [Custom blocks](#custom-blocks)
  - [Añadir nuevos paquetes y plugins](#añadir-nuevos-paquetes-y-plugins)
    - [Bootstrap](#bootstrap)
  - [Crear un nuevo componente](#crear-un-nuevo-componente)
  - [Depurar el código en la consola](#depurar-el-código-en-la-consola)
- [Aplicación de ejemplo](#aplicación-de-ejemplo)

## Introducción
Aunque puede usarse _Vue_ como hemos visto, enlazándolo directamente en el _index.html_ lo más habitual es utilizar la herramienta **vue-cli** que nos facilita enormemente la creación de proyectos _Vue_. Esta herramienta:
* Crea automáticamente el _scaffolding_ básico de nuestro proyecto basándose en una serie de plantillas predefinidas
* Facilita el trabajo con componentes, permitiendo que cada uno de ellos esté en su propio fichero (**SFC**, _Single File Components_)
* Incluye utilidades y herramientas como Webpack, Babel, Uglify, ... que permiten
  * gestionar las dependencias de nuestro código
  * empaquetar todos los ficheros _.vue_ y librerías en un único fichero JS y CSS
  * traspilar el código ES2015/2016, SCSS, etc a ES5 y CSS3 estándar
  * minimizar el código generado
* Incluye herramientas que facilitan el desarrollo

La versión actual es la 4 que ha cambiado de una arquitectura basada en plantillas a una basada en plugins lo que mejora enormemente su rendimiento. Podemos encontrar toda la documentación en [Vue CLI](https://cli.vuejs.org/).

## Instalación
Para usar **vue-cli** necesitamos tener instalado **npm** (el gestor de paquetes de Node.js). Si no lo tenemos instalaremos **node.js**. 

Podemos instalarlo desde los repositorios como cualquier otro programa (`apt install nodejs`), pero no es lo recomendado porque nos instalará una versión poco actualizada por lo que es mejor [instalarlo desde NodeSource](https://nodejs.org/es/download/package-manager/#distribuciones-de-linux-basadas-en-debian-y-ubuntu)_ siguiendo las instrucciones que se indican y que básicamente son:
```bash
curl -sL https://deb.nodesource.com/setup_X.y | sudo -E bash -
sudo apt-get install -y nodejs
```

(cambiaremos _X.y_ por la versión que queramos, vue-cli recomienda al menos la 10.x).

También podemos [descargarlo desde NodeJS.org](https://nodejs.org/es/download/), descomprimir el paquete e instalarlo (`dpkg -i _nombrepaquete_`).

Una vez instalado **npm** Vue-cli se instala con
```bash
npm install -g @vue/cli
```

La opción -g es para que lo instale globalmente en el sistema y no tengamos que instalar una copia para cada proyecto.

## Creación de un nuevo proyecto
Para crear un nuevo proyecto haremos:
```bash
vue create _<directorio_proyecto>_
```
Vue nos ofrece la opción de crear el nuevo proyecto para Vue2 o Vue3 por defecto con los plugins para _Babel_ y _esLint_ (mäs adelante podremos añadir más si los necesitamos) o bien la opción **manual** donde escogemos que plugins instalar para el proyecto de entre los siguientes:

![Nuevo Proyecto Manual](https://cli.vuejs.org/cli-select-features.png)

También podemos crear y gestionar nuestros proyectos desde el entorno gráfico ejecutando el comando:
```bash
vue ui
```
Este comando arranca un servidor web en el puerto 8000 y abre el navegador para gestionar nuestros proyectos.

### Ejemplo proyecto por defecto
Una vez creado entramos a la carpeta y ejecutamos en la terminal
```bash
npm run serve
```

Este script compila el código, muestra si hay errores, lanza un servidor web en el puerto 8080 y carga el proyecto en el navegador (http://localhost:8080). Si cambiamos cualquier fichero JS de _src_ recompila y recarga la página automáticamente. La página generada es:

![Proyecto de plantilla simple](./img/vue-webpack-simple-app.png)

### _Build and Deploy_ de nuestra aplicación
Normalmente trabajaremos con algún gestor de versiones como _git_. Para subir nuestro proyecto al repositorio lo creamos (el _GitHub_, _GitLab_ o donde queramos) y ejecutamos desde la carpeta del proyecto:
```bash
git init
git add .
git remote add origin https://github.com/mi-usuario/mi-proyecto
git commit -m "Primer commit"
git push -u origin main
```

Cuando nuestra aplicación esté lista para subir a producción ejecutaremos el script:
```bash
npm run build
```

Este comando genera los JS y CSS para subir a producción dentro de la carpeta _dist_. El contenido de esta carpeta es lo que debemos subir a nuestro servidor de producción.

También podemos ejecutar el comando `npm run lint` para ejecutar esta herramienta y comprobar nuestro código.

### _Scaffolding_ creado
Se ha creado la carpeta con el nombre del proyecto y dentro el scaffolding para nuestro proyecto:

![Directorios del proyecto de plantilla simple](./img/vue-webpack-simple-folders.png)

Los principales ficheros y directorios creados son:
* `package.json`: configuración del proyecto (nombre, autor, ...) y dependencias
* `babel.config.js`: configuración de Babel
* `public/index.html`: html con un div donde se cargará la app
* `node_modules`: librerías de las dependencias
* `src`: todo nuestro código
    * `assets/`: nuestros CSS, imágenes, etc
    * `main.js`: JS principal que carga componentes y crea la instancia de Vue que carga el componente principal llamado _App.vue_ y lo renderiza en _#app_
    * `App.vue`: es el componente principal y constituye nuestra página de inicio del proyecto. Aquí cargaremos la cabecera, el menú,... y los diferentes componentes
    * `components/`: carpeta que contendrá los ficheros .vue de los diferentes componentes
        * `HelloWorld.vue`: componente de ejemplo llamado por App.vue

#### package.json
Aquí se configura nuestra aplicación:
* **name, version, author, license**, ...: configuración general de la aplicación
* **scripts**: ejecutan entornos de configuración para webpack. Por defecto tenemos 3:
  * **serve**: lanza el servidor web de webpack y configura webpack y vue para el entorno de desarrollo
  * **build**: crea los ficheros JS y CSS dentro de **/dist** con todo el código de la aplicación
  * **lint**: lanza el linter
* **dependences**: se incluyen las librerías y plugins que utiliza nuestra aplicación en producción. Todas las dependencias se instalan dentro de **/node-modules**. Posteriormente veremos como añadir nuevas dependencias
* **devDependencies**: igual pero son paquetes que sólo se usan en desarrollo (babel, webpack, etc). También se instalan dentro de node-modules pero no estarán cuando se genere el código para producción. Para instalar una nueva dependencia de desarrollo ejecutaremos `npm install nombre-del-paquete -D` (la opción -D la añade a package.json pero como dependencia de desarrollo).

#### Estructura de nuestra aplicación
**Fichero index.html:**
Simplemente tiene el \<div> _app_ que es el que contendrá la aplicación.

**Fichero main.js:**
```javascript
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

```
Es el fichero JS principal. Importa la utilidad _createApp_ de la librería _Vue_ y el componente _App.vue_. Crea la instancia de Vue con el componente definido en _App.vue_ y lo renderiza en el elemento _#app_.

**Fichero App.vue:**
Es el componente principal de la aplicación, el que contiene el _layout_ de la página. Se trata de un _SFC (Single File Component)_ y lo que contiene dentro de la etiqueta _\<template>_ es lo que se renderizará en el div _app_ que hay en _index.html_. Si contiene algún otro componente se indica aquí dónde renderizarlo (en este caso <HelloWorld>).

En el siguiente apartado explicaremos qué es un _SFC_ y qué partes lo forman. De momento veamos qué contiene cada sección:

_template_
```html
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>
```
Muestra la imagen del logo (las imágenes y otros ficheros como ficheros .css se guardan dentro de **/src/assets/**) y el subcomponente _HelloWorld_.

_script_
```javascript
<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>
```
Importa y registra el componente _HelloWorld_ que se muestra en el template.

_style_
Aquí se definen los estilos de este componente. Como la etiqueta NO tiene el atributo _scoped_ (`<style scoped>`) significa que los estilos aquí definidos se aplicarán a TODOS los componentes.

**Fichero components/HelloWorld.vue:**
Es el componente que muestra el texto que aparece bajo la imagen. Recibe como parámetro el título a mostrar. Veamos qué contiene cada sección:

_template_
```html
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
       ...
  </div>
</template>
```
Muestra el _msg_ recibido como parámetro y varios apartados con listas.

_script_
```javascript
<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>
```
Recibe el parámetro _msg_ que es de tipo String.

_style_
Aquí la etiqueta SÍ tiene el atributo _scoped_ (`<style scoped>`) por lo que los estilos aquí definidos se aplicarán sólo a este componente.

## SFC (_Single File Component_)
Declarar los componentes con `app.component()` en el fichero JS de la instancia como hicimos en el tema anterior genera varios problemas:
* Los componentes así declarados son globales a la aplicación por lo que sus nombres deben ser únicos
* El HTML del template está en ese fichero en medio del JS lo que lo hace menos legible y el editor no lo resalta adecuadamente (ya que espera encontrar código JS no HTML)
* El HTML y el JS del componente están juntos pero no su CSS
* No podemos usar fácilmente herramientas para convertir SCSS a CSS, ES2015 a ES5, etc
* Nuestro fichero crece rápidamente y nos encontramos con código _spaguetti_

Por tanto eso puede ser adecuado para proyectos muy pequeños pero no lo es cuando estos empiezan a crecer.

La solución es guardar cada componente en un único fichero (SFC), que tendrá extensión **.vue** y contendrá 3 secciones:
* \<template>: contiene todo el HTML del componente
* \<script>: con el JS del mismo
* \<style>: donde pondremos el CSS del componente
  
Aunque esto va contra la norma de tener el HTML, JS y CSS en ficheros separados en realidad están separados en diferentes secciones y tenemos la ventaja de tener en un único fichero todo lo que necesita el componente.

La mayoría de editores soportan estos ficheros instalándoles algún plugin, (como _Volar_ para Visual Studio Code) por lo que el resaltado de las diferentes partes es correcto. Además **vue-cli** integra _Webpack_ de forma que podemos usar ES2015 y los preprocesadores más comunes (SASS, Pug/Jade, Stylus, ...) y ya se se traducirá automáticamente el código a ES5, HTML5 y CSS3.

### Secciones de un Single File Component
Veamos en detalle cada una de las secciones del SFC.

#### \<template>
Aquí incluiremos el HTML que sustituirá a la etiqueta del componente. Recuerda que en las versiones anteriores a Vue3 dentro sólo puede haber un único elemento HTML (si queremos poner más de uno los incluiremos en otro que los englobe).

Si el código HTML a incluir en el template es muy largo podemos ponerlo en un fichero externo y vincularlo en el template, así nuestro SFC queda más pequeño y legible:
```vue
<template src="./myComp.html">
</template>
```

Respecto al lenguaje, podemos usar HTML (la opción por defecto) o [PUG](https://pugjs.org/api/getting-started.html) que es una forma sencilla de escribir HTML. Lo indicamos como atributo de \<template>:
```vue
<template lang="pug">
...
```


#### \<script>
Aquí definimos el componente. Será un objeto que exportaremos con sus diferentes propiedades. Si utiliza subcomponentes hay que importarlos antes de definir el objeto y registrarlos dentro de este.

Entre las propiedades que puede tener el objeto están:
- **name**: el nombre del componente. Es recomendable ponerlo, aunque sólo es obligatorio en caso de componentes recursivos
- **components**: aquí registramos componentes hijos que queramos usar en el _template_ de este componente (debemos haber importado previamente el fichero _.vue_ que lo contiene a cada uno). En el _template_ usaremos como etiqueta el nombre con que lo registramos aquí
- **props**: donde registramos los parámetros que nos pasa el componente padre como atributos de la etiqueta que muestra este componente
- **data**: función que devuelve un objeto con todas las variables locales del componente
- **methods**: objeto con los métodos del componente
- **computed**: aquí pondremos las propiedades calculadas del componente
- **created()**, **mounted()**, ...: funciones _hook_ que se ejecutarán al crearse el componente, al montarse, ...
- **watch**: si queremos observar manualmente cambios en alguna variable y ejecutar código como respuesta a ellos (recuerda que Vue ya se encarga de actualizar la vista al cambiar las variables y viceversa).
- ...

#### \<style>
Aquí pondremos estilos CSS que se aplicarán al componente. Podemos usar CSS, SASS o [PostCSS](https://postcss.org/). Si queremos importar ficheros de estilo con `@import` deberíamos guardarlos dentro de la carpeta _assets_ de nuestra aplicación.

Si la etiqueta incluye el atributo _scoped_ estos estilos se aplicarán únicamente a este componente (y sus descendientes) y no a todos los componentes de nuestra aplicación. Si tenemos estilos que queremos que se apliquen a toda la aplicación y otros que son sólo para el componente y sus descendientes pondremos 2 etiquetas \<style>, una sin el atributo _scoped_ y otra con él.

La forma más común de asignar estilos a elementos es usando clases. Para conseguir que su estilo cambie fácilmente podemos asignar al elemento clases dinámicas que hagan referencia a variables del componente. Ej.:
```vue
<template>
  <p :class="[decoration, {weight: isBold}]">Hi!</p>
</template>

<script>
export default {
  data() {
    return {
      decoration: 'underline',
      isBold: true
    }
  }
}
</script>

<style lang="css">
  .underline { text-decoration: underline; }
  .weight { font-weight: bold; }
</style>
```

El párrafo tendrá la clase indicada en la variable `decoration` (en este caso _underline_) y además como el valor de `isBold` es verdadero tendrá la clase _weight_. Hacer que cambien las clases del elemento es tan sencillo como cambiar el valor de las variables.

Podemos ver las diferentes maneras de asignar clases a los elementos HTML en la [documentación de Vue](https://vuejs.org/guide/essentials/class-and-style.html).

Igual que vimos en la etiqueta \<template>, si el código de los estilos es demasiado largo podemos ponerlo en un fichero externo que vinculamos a la etiqueta con el atributo _src_.

#### Custom blocks
Además de estos 3 bloques un SFC puede tener otros bloques definidos por el programador para, por ejemplo, incluir la documentación del componente o sus test unitarios:
```vue
<custom1 src="./unit-test.js">
    Aquí podríamos incluir la documentación del proyecto
</custom1>
```

## Añadir nuevos paquetes y plugins
Si queremos usar un nuevo paquete en nuestra aplicación lo instalaremos con _npm_:
```bash
npm install nombre-paquete
```

Este comando sólo instala el paquete en _node-modules_. Para que lo añada a las dependencias del _package.json_  le pondremos la opción **`--save`** o **`-S`** (si se trata de una dependencia de producción) o bien **`--dev`** o **`-D`** (si es una dependencia de desarrollo). Ej.:
```bash
npm install -S axios
```

Para usarlo en nuestros componentes debemos importarlo y registrarlo tal y como se indique en su documentación. Lo normal es hacerlo en el **_main.js_** (o en algún fichero JS que importemos en _main.js_ como en el caso de los plugins) si queremos poderlo usar en todos los componentes.

Si el paquete que queremos instalar se encuentra como plugin el proceso es más sencillo ya que sólo es necesario usar `vue add` (antes conviene haber hecho un _commit_) desde la carpeta del proyecto, por ejemplo para añadir el plugin _vuetify_ ejecutamos:
```bash
vue add vuetify
```

Esto automáticamente:
* instala el plugin dentro de _node-modules_
* añade el paquete al fichero _package.json_
* crea un fichero JS dentro de la carpeta **_plugins_** que importa y registra esa librería
* importa dicho fichero al **_main.js_**

NOTA: actualmente Vuetify sólo soporta Vue3 en su versión Beta, por lo que esto sólo funcionará en Vue2

### Bootstrap
Podemos utilizar _Bootstrap 5_ directamente en Vue ya que esta versión no necesita de la librería _jQuery_.

Para usarlo simplemente lo instalaremos como una dependencia de producción y después lo añadimos al fichero `src/main.js`:
```javascript
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
```

Para usar los iconos de _Bootstrap 5_ debemos importar el css y ya podemos incluir los iconos en etiquetas _\<i>_ como se explica en la [documentación de Bootstrap](https://icons.getbootstrap.com/#install). Por ejemplo, incluimos en el _\<style>_ del componente **App.vue**:
```javascript
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css");
```

y donde queramos incluir el icono de la papelera, por ejemplo, incluimos:
```html
<i class="bi bi-trash"></i>
```

Respecto a los componentes de _Bootstrap_, para que funcionen sólo tenemos que usar los atributos `data-bs-`, por ejemplo para hacer un botón colapsable haremos:
```html
<button 
  class="btn btn-primary" 
  data-bs-target="#collapseTarget" 
  data-bs-toggle="collapse">
  Bootstrap collapse
</button>
<div class="collapse py-2" id="collapseTarget">
  This is the toggle-able content!
</div>
```

En lugar de usar atributos _data-bs-_ podemos _envolver_ los componentes bootstrap en componentes Vue como se explica en muchas páginas, como [Using Bootstrap 5 with Vue 3](https://stackoverflow.com/questions/65547199/using-bootstrap-5-with-vue-3).

## Crear un nuevo componente
Creamos un nuevo fichero en **/src/components** (o en alguna subcarpeta dentro) con extensión _.vue_. Donde queramos usar ese componente debemos importarlo y registrarlo como hemos visto con _HelloWorld_ (y como se explica en el artículo de los _Single File Components_). 
```javascript
import CompName from './CompName.vue'

export default {
  ...
  components: {
    'comp-name': CompName
  }
  ...
}
```
Y ya podemos incluir el componente en el HTML:
```html
<comp-name ...> ... </comp-name>
```

## Depurar el código en la consola
Podemos seguir depurando nuestro código, poniendo puntos de interrupción y usando todas las herramientas que nos proporciona la consola mientras estamos en modo de depuración (si hemos abierto la aplicación con `npm run serve`).

Para localizar nuestros fichero varemos que en nuestras fuentes de software aparece **webpack** y dentro nuestras carpetas con el código (**src**, ...):

![Depurar en la consola](./img/console-webpack.png)

Recordad que si hemos instalado las **Vue DevTools** tenemos una nueva pestaña en la consola desde la que podemos ver todos nuestros componentes con sus propiedades y datos:

![Vue DevTools](./img/console-vue_devtools.png)

# Aplicación de ejemplo
Recordemos que la aplicación que estamos desarrollando tiene los componentes:
- todo-list: lista de tareas a hacer. Cada item de la lista es un componente _todo-item_
- todo-item: cada elemento de la lista de tareas a hacer
- todo-add: formulario para añadir una nueva tarea
- todo-del-all: botón para eliminar todas las tareas

Para transformar esto en SFC simplemente crearemos un fichero para cada uno de estos componentes. Nuestro anterior _index.html_ será el \<template> del componente principal **App.vue**, que en un sección \<script> deberá importar y registrar cada uno de los componentes usados en el _template_ (_todo-list_, _todo-add_ y _todo-del-all_).


