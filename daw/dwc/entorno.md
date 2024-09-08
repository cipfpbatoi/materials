# Configurar el entorno de trabajo
- [Configurar el entorno de trabajo](#configurar-el-entorno-de-trabajo)
  - [Herramientas que usaremos](#herramientas-que-usaremos)
    - [Navegadores web](#navegadores-web)
      - [Extensiones para los navegadores](#extensiones-para-los-navegadores)
    - [Editor](#editor)
      - [Extensiones para el editor](#extensiones-para-el-editor)
    - [npm / yarn](#npm--yarn)
    - [git](#git)
    - [Vite](#vite)
    - [Tests](#tests)
  - [Instalar npm](#instalar-npm)
    - [Instalar librerías con _npm_](#instalar-librerías-con-npm)
    - [El archivo package.json](#el-archivo-packagejson)


## Herramientas que usaremos
Necesitamos configurar nuestro equipo con todas las herramientas que utilizaremos en este módulo. En todos los casos hay versiones tanto para GNU/Linux como para Windows y Mac OS X.

### Navegadores web
Al menos debemos tener _Chrome_ y _Firefox_ que son los más utilizados y también es muy recomendable probar las páginas en _Safari_ (en este caso tenemos un problema si no usamos Mac) y otros navegadores como _Opera_ y _Ms Edge_.

#### Extensiones para los navegadores
Trabajaremos principalmente con la consola del navegador (suele abrirse con F12) pero cuando veamos Ajax necesitaremos un cliente REST (yo usaré _RESTClient_ pero hay muchos) y en el bloque de Vue necesitaremos las _Vue DevTools_ para depurar nuestro código.

### Editor
Yo usaré _Visual Studio Code_ pero cada uno puede usar el que más le guste, como _Sublime Text_, _Atom_, _Notepad++_ o incluso grandes entornos como _Eclipse_ o _Netbeans_ aunque no utiilizaremos la mayoría de herramientas que incluyen por lo que es matar moscas a cañonazos.

_Visual Studio Code_ puede descargarse desde [https://code.visualstudio.com/](https://code.visualstudio.com/).

####  Extensiones para el editor
Para programar Javascript no necesitamos ninguna extensión adicional aunque es recomendable usar algún linter como _EsLint_ o _SonarLint_ para acostumbrarnos a escribir buen código. 

También es recomendable instalar _Prettier_ para formatear correctamente los ficheros y _Live Server_ para probar la web en un servidor local. 

Cuando veamos **Vue** habrá que instalar la extensión que nos permita trabajar de forma cómoda. En VSC se llama _Volar_.

### npm / yarn
Tanto para Vue como para ejecutar los tests de nuestros programas necesitaremos _npm_, el gestor de paquetes de **_NodeJS_**. 

En los apuntes tenéis [cómo instalarlo](#instalar-npm).

### git
Utilizaremos _git_ para el control de versiones por lo que deberemos instalarlo. Para instalarlo simplemente habrá que instalar el paquete git (`apt-get install git`).

Quien no quiera usar la consola y prefiera hacerlo desde el editor deberá instalar la extensión correspondiente

### Vite
Es un _module bundler_ (como _Webpack_). Su función es unir todo el código de los distintos ficheros javascript en un único fichero que es el que se importa en el _index.html_ y lo mismo con los ficheros CSS.

Además proporcionan otras ventajas:
- transpilan el código, de forma que podemos usar sentencias javascript que aún no soportan muchos navegadores ya que se convertirán a sentencias que hacen lo mismo pero con código legacy
- minimizan y optimizan el código para que ocupe menos y su carga sea más rápida
- ofuscan el código al minimizarlo lo que dificulta que el usuario pueda ver en la consola lo que hace el programa y manipularlo

Además _Vite_ incorpora un servidor de desarrollo para hacer más cómoda la creación y prueba de nuestros proyectos.

### Tests
Para testear nuestros programas utilizaremos [_Vitest_](https://vitest.dev/) que es una adaptación para _Vite_ de la librería para test [_Jest_](https://jestjs.io/es-ES/). Lo instalaremos con npm de manera global para poderlo usar en distintos proyectos. Podéis ver un breve resumen de cómo usar test en los [apuntes](./tests.md).

## Instalar npm
**npm** es el gestor de paquetes del framework Javascript **Node.js** y es fundamental en programación frontend especialmente como gestor de dependencias y módulos de la aplicación. Esto significa que será la herramienta que se encargará de descargar y poner a disposición de nuestra aplicación todas las librerías Javascript que vayamos a utilizar.

Para instalar _npm_ tenemos que instalar _NodeJS_. Podemos instalarlo desde los repositorios como cualquier otro programa (`apt install nodejs`), pero **no se recomienda** hacerlo así porque nos instalará una versión poco actualizada. 

Es mejor instalarlo desde **NodeSource** siguiendo las [instrucciones](https://nodejs.org/es/download/package-manager) que allí se indican, que en el caso de la mayoría de distribuciones GNU/Linux consisten en añadir el repositorio de _NodeSource_.

Con eso ya tendremos npm en nuestro equipo. Podemos comprobar la versión que tenemos con:

```bash
npm -v
```

También podemos descargarlo directamente desde [NodeJS.org](https://nodejs.org/es/download/), descomprimir el paquete e instalarlo (`dpkg -i nombre_del_paquete`).

### Instalar librerías con _npm_
Una vez instalado podemos crear un nuevo proyecto con el comando `npm init`. Esto crea una carpeta para el nuevo proyecto y dentro de ella el fichero `package.json`.

los comandos básicos de npm son `install` para instalar una librería y `remove` o `uninstall` para eliminarla. Para actualizar un paquete usamos el comando `update`. 

Al instalar paquetes en algunos casos usaremos 2 opciones:
- `-g`: instala la librería de forma global para que esté disponible en todos nuestros proyectos no sólo en el proyecto actual
- `-D`: indica que la librería a instalar es una dependencia de desarrollo y, por tanto, no se incluirá en el código generado para producción.

Vamos a instalar ahora globalmente la librería que usaremos en la mayoría de nuestros proyectos, el _bundler_ **_Vite_**:

```bash
npm install -g vite
```

### El archivo package.json
Es el corazón de cualquier proyecto _npm_. Declara las dependencias instaladas y sus versiones, así como scripts que se pueden ejecutar desde la terminal con el comando `npm run <nombre del script>`.

Ejemplo de package.json:
```json
{
 "name": "nuevoproyecto",
 "version": "1.0.0",
 "description": "Nuevo proyecto npm",
 "main": "index.js",
 "scripts": {
   "test": "vitest"
 },
"dependencies": {
   "axios": "^1.6.2",
 },
"devDependencies": {
   "vite": "^4.4.5",
   "vitest": "^0.34.5"
 },
 "author": "",
 "license": "ISC"
}
```
