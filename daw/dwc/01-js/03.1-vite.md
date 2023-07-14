# Vite
- [Vite](#vite)
  - [Introducción](#introducción)
  - [Crear un nuevo proyecto](#crear-un-nuevo-proyecto)
    - [Desarrollar nuestro proyecto](#desarrollar-nuestro-proyecto)
    - [Paso a producción](#paso-a-producción)
    - [Testear el proyecto](#testear-el-proyecto)
  - [Trabajar con distintos ficheros de código](#trabajar-con-distintos-ficheros-de-código)
    - [Exportamos el código](#exportamos-el-código)
    - [Lo importamos donde queramos usarlo](#lo-importamos-donde-queramos-usarlo)


## Introducción
Cuando trabajamos con clases la mejor forma de organizar el código es poniendo cada clase un su propio fichero javascript. Esto reduce el acoplamiento de nuestro código y nos permite reutilizar una clase en cualquier proyecto en que la necesitemos.

Sin embargo tener muchos ficheros hace que tengamos que importarlos todos, y en el orden adecuado, en nuestro _index.html_ (mediante etiquetas `<script src="...">`) lo que empieza a ser engorroso.

Para evitar este problema se utilizan las herramientas de construcción de proyectos o _module bundlers_ que unen todo el código de los distintos ficheros javascript en un único fichero que es el que se importa en el _index.html_ y hacen los mismo con los ficheros CSS.

Además proporcionan otras ventajas:
- **transpilan** el código, de forma que podemos usar sentencias javascript que aún no soportan muchos navegadores ya que se convertirán a sentencias que hacen lo mismo pero con código _legacy_
- **minimizan** y **optimizan** el código para que ocupe menos y su carga sea más rápida
- **ofuscan** el código al minimizarlo lo que dificulta que el usuario pueda ver en la consola lo que hace el programa y manipularlo

Nosotros usaremos el _bundler_ **Vite** que, junto con **webpack**, son los más usados en entorno _frontend_. Junto a _npm_ tendremos una forma fácil y práctica de empaquetar el código.

Además _Vite_ incorpora un servidor de desarrollo para hacer más cómoda la creación y prueba de nuestros proyectos.

Para poder usar _Vite_ debemos instalarlo. Como lo usaremos en muchos proyectos lo podemos instalarlo global con
```bash
npm install -g vite
```

## Crear un nuevo proyecto
Vite necesita _Node.js_ versión 16 o superior aunque lo mejor es tenerlo actualizado para poder utilitzar todas sus plantillas. Para crear un nuevo proyecto haremos:
```bash
npm create vite@latest
```

(si no tenemos instalado el paquete _create-vite_ nos preguntará si lo instala)

Al crear el proyecto nos pregunta qué framework vamos a utilizar (le diremos que _Vanilla_, es decir, Javascript sin framework) y si como lenguaje usaremos Javascript o Typescript.

Esto crea el _scaffolding_ de nuestro proyecto que consiste en una carpeta con el mismo nombre que el proyecto y una serie de ficheros en su interior:
Nos preguntará el nombre del proyecto, la plantilla (_Vanilla_ para Javascript sin framework) y el lenguaje que queremos usar (_Javascript/Typescript_) y se crea una carpeta con el nombre de nuestro proyecto que contiene:
- `index.html`: html con un div con _id_ **app** que es donde se cargará la app y una etiqueta **script** que carga un módulo llamado `main.js`
- `main.js`: es el punto de entrada a la aplicación .Importa los ficheros CSS, imágenes y ficheros JS con funciones o clases y establece el contenido de la página principal
- `counter.js`: módulo JS que exporta una función como ejemplo que es usada en el _main.js_
- `style.css`: fichero donde poner nuestros estilos, con CSS de ejemplo
- `public/`: carpeta donde dejar elementos estáticos que no pasarán por _vite_ (como imágenes, ficheros CSS, ...)
- `node_modules`: librerías de las dependencias (si usamos alguna)
- `package.json`: fichero de configuración del proyecto. Además del nombre y la versión incluye apartados importantes:
  - `devDependences`: dependencias que se usan en desarrollo pero que no se incorporarán al código final
  - `dependences`: dependencias que sí se incluirán en el código final (librerías que estemos usando)
  - `scripts`: para ejecutar el servidor de desarrollo (`npm run dev`), generar el código final (`npm run build`), etc.

### Desarrollar nuestro proyecto
Para empezar a trabajar ejecutamos desde la terminal el script
```bash
npm run dev
```

Esto hace que _Vite_ lance un servidor web en el puerto 5173 donde podemos ver la ejecución de nuestro proyecto.

### Paso a producción
Cuando lo hayamos acabado y queramos subirlo a producción ejecutaremos
```bash
npm run build
```

que crea la carpeta `/dist` con los ficheros que debemos subir al servidor web de producción:
- `index.html`
- cualquier fichero que tengamos en _/public_
- carpeta `assets` con
  - fichero JS con todo el código que necesita el proyecto
  - fichero CSS con todos los estilos del proyecto
  - otros ficheros importados en el JS como imágenes, ...

### Testear el proyecto
Si queremos testear el proyecto deberemos usar una herramienta de testing y crear los tests adecuados. Si queremos usar **_Jest_** debemos importarlo como dependencia de producción
```bash
npm install --save-dev jest
```

y añadir un nuevo script en el `package.json` que le indique a vite que queremos usarlo para testear:
```json
  "scripts": {
		...
    "test": "jest"
  },
```

Crearemos los tests en una carpeta en la raíz de nuestro proyecto llamada `/test` y en ella crearemos los diferentes fichero cuya extensión será `.spec.js` o `.test.js`. Cada vez que queramos pasar los tests ejecutaremos
```bash
npm run test
```

Podéis obtener más información en infinidad de páginas de internet y en la [web oficial de vite](https://es.vitejs.dev/guide/).

## Trabajar con distintos ficheros de código
Para que un fichero pueda tener acceso a código de otro fichero hay que hacer 2 cosas:
1. El fichero al que queremos acceder debe **exportar** el código que desea que sea accesible desde otros ficheros. Se hace con la sentencia `export`
2. El fichero que quiere acceder a ese código debe **importarlo** a una variable. Lo haremos con `import`

Esto es lo que hacíamos en el ejercicio de la frase para poder pasar los tests y lo que haremos con los ficheros donde declaramos clases.

### Exportamos el código
En el caso de un fichero con una única función a exportar la exportamos directamente, por ejemplo:
```javascript
// Fichero cuadrado.js
const cuadrado = (value) => value * value
export default cuadrado
```

En el caso de querer exportar muchas funciones lo más sencillo es exportarlas juntas en un objeto como en el fichero _functions.js_:
```javascript
// Fichero functions.js
function letras () {
  ...
}
function palabras () {
  ...
}
...
export default {
	letras,
	palabras,
	maysc,
	titulo,
	letrasReves,
	palabrasReves,
	palindromo
}
```

Aquí estamos exportando un objeto que contiene una serie de funciones 

Si es un fichero que define una clase la exportamos tal cual:
```javascript
// Fichero product.class.js
class Product {
    constructor() {

    }
    ...
}
export Product
```

### Lo importamos donde queramos usarlo
En el fichero donde vayamos a usar dicho código lo importamos. Si se trata de una única función:
```javascript
import cuadrado from './cuadrado.js'
console.log('El cuadrado de 2 es ' + cuadrado(2))
```

Si es un fichero con muchas funciones exportadas a un objeto podemos importar sólo las que queramos o todas:
```javascript
import functions from './functions.js'
console.log('Las letras de "Hola" son ' + functions.letras("Hola") + ' y al revés es ' + functions.letrasReves('Hola'))
```

o bien

```javascript
import { letras, letrasReves } from './functions.js'
console.log('Las letras de "Hola" son ' + letras("Hola") + ' y al revés es ' + letrasReves('Hola'))
```

Para usar una clase la importamos:
```javascript
import Product from './product.class'
const myProd = new Product()
```
