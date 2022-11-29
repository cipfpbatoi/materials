# Webpack
Cuando trabajamos con clases la mejor forma de organizar el código es poniendo cada clase un su propio fichero javascript. Esto reduce el acoplamiento de nuestro código y nos permite reutilizar una clase en cualquier proyecto en que la necesitemos.

Sin embargo tener muchos ficheros hace que tengamos que importarlos todos, y en el orden adecuado, en nuestro _index.html_ (mediante etiquetas `<script src="...">`) lo que empieza a ser engorroso.

Para evitar este problema se utilizan los _module bundlers_ o empaquetadores de código que unen todo el código de los distintos ficheros javascript en un único fichero que es el que se importa en el _index.html_.

Además proporciona otras ventajas:
- **transpila** el código, de forma que podemos usar sentencias javascript que aún no soportan muchos navegadores ya que se convertirán a sentencias que hacen lo mismo pero con código _legacy_
- **minimiza** y **optimiza** el código para que ocupe menos y su carga sea más rápida
- **ofusca** el código al minimizarlo lo que dificulta que el usuario pueda ver en la consola lo que hace el programa y manipularlo

Nosotros usaremos el _bundler_ **webpack* que es el más usado en entorno _frontend_. Junto a _npm_ tendremos una forma fácil y práctica de empaquetar el código.

## Trabajar con distintos ficheros
Para que un fichero pueda tener acceso a código de otro fichero hay que hacer 2 cosas:
1. El fichero al que queremos acceder debe **exportar** el código que desea que sea accesible desde otros ficheros
2. El fichero que quiere acceder a ese código debe **importarlo** a una variable

Esto es lo que hacíamos en el ejercicio de la frase para poder pasar los tests y lo que haremos con los ficheros donde declaramos clases.

### Exportamos el código
En el caso de un fichero con una función a exportar será lo que exportaremos. Por ejemplo:
```javascript
// Fichero cuadrado.js
const cuadrado = (value) => value * value
module.exports = cuadrado
```

En el caso de querer exportar muchas funciones lo más sencillo es exportarlas juntas en un objeto como en el fichero _functions.js_:
```javascript
module.exports = {
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
class Product {
    constructor() {

    }
    ...
}
module.exports = Product
```

### Lo importamos donde queramos usarlo
En el fichero donde vayamos a usar dicho código lo importamos a una variable. Si se trata de una única función:
```javascript
const cuadrado = require('./cuadrado.js')
console.log('El cuadrado de 2 es ' + cuadrado(2))
```

Si es un fichero con muchas funciones exportadas a un objeto podemos importar sólo las que queramos o todas:
```javascript
const functions = require('./functions.js')
console.log('Las letras de "Hola" son ' + functions.letras("Hola") + ' y al revés es ' + functions.letrasReves('Hola'))
```

o bien

```javascript
const { letras, letrasReves } = require('./functions.js')
console.log('Las letras de "Hola" son ' + letras("Hola") + ' y al revés es ' + letrasReves('Hola'))
```

Para usar una clase la importamos:
```javascript
const Product = require('./product.class')
const myProd = new Product()
```

## Usar _webpack_
Una vez que tenemos nuestro código correctamente exportado e importado vamos a usar _webpack_ para empaquetarlo.

Lo primero que habría que hacer es crear nuestro proyecto si no lo hemos hecho ya mediante `npm init`. Esto inicializa el proyecto y crea el fichero **_package.json_**. Recuerda escribir _jest_ cuando nos pregunte por los tests.

Para usar _webpack_ simplemente lo incluímos mediante _npm_:
```bash
npm i -D webpack webpack-cli
```

La opción `-D` instala webpack como dependencia de desarrollo, lo que significa que en la versión de producción del código no se incluirá.

Para instalar todas nuestras dependencias y que se cree la carpeta _node_modules_ ejecutamos `npm install`.

Ahora ya estamos listos para usar _webpack_. Como hemos dicho es un _module bundler_, es decir, un empaquetador de código. Toma el fichero que le indiquemos como fichero principal (por defecto el **_./src/index.js_**), lo junta con todas sus dependencias (sus _require_ y los de sus dependencias) y los transpila a un único fichero (por defecto **_./dist/main.js_**) que es el que se enlaza en el _index.html_. Además minimiza y optimiza dicho código al generarlo.

Para generar el código empaquetado ejecutamos 
```bash
npx webpack --mode=development
```

Este código hay que ejecutarlo cada vez que se hagan cambios en el código. Si no quieres tener que ejecutarlo cada vez se puede lanzar con la opción `--watch` que deja la consola abierta y ejecuta el comando automáticamente cuando guardamos cualquiera de los ficheros del proyecto:
```bash
npx webpack --mode=development --watch
```

Si nuestro fichero principal no es `src/index.js` lo indicaremos con la opción `--entry`:
```bash
npx webpack --entry=scripts/main.js --mode=development
```

Cuando usamos webpack le tenemos que indicar que tipo de código de salida queremos:

- **development**: _webpack_ permite "seguir" la ejecución del código desde la consola ya que "mapea" el código generado al original de forma que en la consola vemos como si se ejecutara nuestro código (los distintos ficheros) en vez del código generado por _webpack_ que es el que realmente se está ejecutando
- **production**: minimiza y optimiza el código para producción y ya no es posible desde la consola acceder al código original. Es lo que haremos para generar el código que subiremos al servidor de producción (NUNCA subimos el código de desarrollo).

Podéis obtener más información en infinidad de páginas de internet y en la [web oficial de webpack](https://webpack.js.org/). Las diferentes opciones que podemos pasarle a este comando las podemos consultar en la página del [CLI de webpack](https://webpack.js.org/api/cli/#flags).