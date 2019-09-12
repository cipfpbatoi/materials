# Desarrollo guiado por pruebas (TDD)
Es una forma de programar que consiste en escribir primero las pruebas que deba pasar el código (Test Dirve Development) y después refactorizarlo ([Refactoring](https://es.wikipedia.org/wiki/Refactorizaci%C3%B3n)). Para escribir las pruebas generalmente se utilizan las [pruebas unitarias](https://es.wikipedia.org/wiki/Prueba_unitaria) (unit test en inglés). 

El ciclo de programación usando TDD tiene tres fases:
1. Fase _roja_: escribimos el test que cumpla los requerimientos y lo pasamos. Fallará ya que nuestro código no pasa el est (de hecho la primera vez no tenemos ni código)
1. Fase _verde_: conseguimos que nuestro código pase el test. Ya funciona aunque seguramente no estará muy bien escrito
1. _Refactorización_: mejoramos nuestro código


En primer lugar, se escribe una prueba y se verifica que las pruebas fallan. A continuación, se implementa el código que hace que la prueba pase satisfactoriamente y seguidamente se refactoriza el código escrito. El propósito del desarrollo guiado por pruebas es lograr un código limpio que funcione. La idea es que los requisitos sean traducidos a pruebas, de este modo, cuando las pruebas pasen se garantizará que el software cumple con los requisitos que se han establecido.

Para ello debemos en primer lugar se debe definir una lista de requisitos y después se ejecuta el siguiente ciclo:
1. Elegir un requisito: Se elige de una lista el requisito que se cree que nos dará mayor conocimiento del problema y que a la vez sea fácilmente implementable.
1. Escribir una prueba: Se comienza escribiendo una prueba para el requisito. Para ello el programador debe entender claramente las especificaciones y los requisitos de la funcionalidad que está por implementar. Este paso fuerza al programador a tomar la perspectiva de un cliente considerando el código a través de sus interfaces.
1. Verificar que la prueba falla: Si la prueba no falla es porque el requisito ya estaba implementado o porque la prueba es errónea.
1. Escribir la implementación: Escribir el código más sencillo que haga que la prueba funcione. Se usa la expresión "Déjelo simple" ("Keep It Simple, Stupid!"), conocida como principio KISS.
1. Ejecutar las pruebas automatizadas: Verificar si todo el conjunto de pruebas funciona correctamente.
1. Eliminación de duplicación: El paso final es la refactorización, que se utilizará principalmente para eliminar código duplicado. Se hace un pequeño cambio cada vez y luego se corren las pruebas hasta que funcionen.
1. Actualización de la lista de requisitos: Se actualiza la lista de requisitos tachando el requisito implementado. Asimismo se agregan requisitos que se hayan visto como necesarios durante este ciclo y se agregan requisitos de diseño (P. ej que una funcionalidad esté desacoplada de otra).

Tener un único repositorio universal de pruebas facilita complementar TDD con otra práctica recomendada por los procesos ágiles de desarrollo, la "Integración Continua". Integrar continuamente nuestro trabajo con el del resto del equipo de desarrollo permite ejecutar toda batería de pruebas y así descubrir si nuestra última versión es compatible con el resto del sistema. Es recomendable y menos costoso corregir pequeños problemas cada pocas horas que enfrentarse a problemas enormes cerca de la fecha de entrega fijada.

(Fuente [Wikipedia](https://es.wikipedia.org/wiki/Desarrollo_guiado_por_pruebas)).

## Usar TDD en Javascript
Lo más sencillo es usar alguna librería como **Mocha**. Se trata de un gramework que se ejecuta sobre _Node.js_ y permite crear tests tanto síncronos como asíncronos. Para usarlo necesitaremos tener **npm** instalado. Luego creamos una carpeta para nuestro proyecto y dentro ejecutamos:

```bash
npm install -g mocha    # lo instalamos globalmente para que esté disponible para todos los proyectos
npm init                # crea en el directorio el package.json
npm install chai     # en vez de chai podríamos usar assert, should, etc
```

La librería _Chai_ permite 3 tipos de sentencias:
- asserts
- expects
- should

Nosotros vamos a usar _asserts_ por lo que es lo que deberemos importar en los ficheros de tests.

Dentro de nuestro proyecto crearemos una carpeta donde guardaremos los ficheros JS de los tests (podemos llamarla '_tests_') y en cada fichero importaremos _chai_ y los ficheros necesarios. Ej.:

> Fichero _tests/store.specs.js_
```javascript
const assert = require('chai').assert;
const Store = require('../store.class.js');

describe('Store', () => {

	it('should had an integer id', function() {
		let foo = new Store();
		assert.typeOf(foo.id, 'integer', 'La id no es un entero')
	});

	it('should had an empty array of products', function() {
		let foo = new Store();
		assert.typeOf(foo.products, 'array', 'Products no es un array')
		assert.lengthOf(foo.products, 0, 'Products no es un array vacío')
	});
})
```

Para poder importar un módulo con _require_ debemos haberlo exprtado previamente:

> Fichero _store.js_
```javascript
class Store {
    constructor (id) {
        this.id=id;
        this.products=[];
    }
    ...
}
 module.exports = Store;
```

Para ejecutar todos los tests de nuestro proyecto ejecutaremos desde la terminal:
```bash
mocha tests
```

Si sólo queremos pasar uno lo indicamos en el comando: `mocha tests/store.specs.js`.

Podemos hacer que _mocha_ escuche en segundo plano y se ejecute automáticamente cada vez que hacemos algún cambio en un fichero con:
```bash
mocha tests --watch
```

## El fichero de tests
Debemos importar le librería _Chai_ y el fichero con el código a testear como hemov visto antes. El fichero con el código que debe exportar la clase o función que contiene con `module.exports`. Si queremos exportar varias funciones exportaremos un objeto con todas ellas:
```bash
module.exports = {
    addItem,
    removeItem
}
```

Tras importar los ficheros pondremos el _describe_ y los bloques _it_ que queramos y dentro de cada uno los _aasert_ necesarios:
```bash
const assert = require('chai').assert;
const index = require('../index.js');

describe('manage items', () => {
	it('add a new item', function() {
		let myItem = ...;
		assert.typeOf(item, 'object', 'No crea un objeto sino '+typeof(item) );
		assert.equal(item.units, 0);
	});
	
	if ('change an item () => {
	...
	});
})
```

## Algunas sentecias _assert_
Estas
Aquí tenéis un pequeño resumen de algunas de las sentencias que podemos usar. Recordad que todas pueden tener un último parámetro opcional que es un mensaje a mostrar en caso de que falle esta comprobación:
- .equal(actual, esperado): comprueba que sea el mismo valor, pero sin comprobar los tupos (usa ==, no ===)
- .notEqual(actual, esperado)
- .strictEqual, .notStrictEqual: igual pero hace la compribaciónestricta (===)
- .deepEqual, notDeepEqual: hace una comprobación de cada propiedad del objeto pasado
- .match(valor, regexp), .notMatch: comprueba si el valor cumple o no la expresión regular pasada
- .isAbove(actual, esperado): comprueba que actual > esperado
- .isAtLeast(actual, esperado): comprueba que actual >= esperado
- .isBelow, .isAtMost: comprueba que sea < o <= respectivamente
- .isTrue, .isNotTrue, .isFalse, .isNotFalse, .isNull, .isNotNull, .isUndefined, .isDefined, .isNaN, .isNotNaN, .isFunction, .isNotFunction, .isObject, .isNotObject, .isArray, .isNotArray, .isString, .isNotString, .isNumber, .isNotNumber, .isBoolean, .isNotBoolean, .isFinite
- .exists(valor), .notExists: comprueba que valor no sea (o sea) _null_ o _undefined_
- .typeOf(valor, tipo), .notTypeOf: indica si valor es o no del tipo indicado, que puede ser 'string', 'number', boolean', 'array', 'object', 'null', 'undefined', 'regexp', ...
- .instanceOf(objeto, Clase), .notInstanceOf: indica si un objeto es o no una instancia de la clase indicada
- .include(string/array/objeto, substring/elemento/propiedad:valor): comprueba si la subcadena existe en el string o el elemento se encuentra en el array (usa ===) o si existe la propiedad o propiedades pasadas y su valor es estrictamente (===) igual al indicado.
- .notInclude
- .property(objeto, propiedad), .notProperty: comprueba si el objeto posee o no la propiedad pasada
- .lengthOf(string/array, num): comprueba que la longitud de la cadena o el array sea la indicada
- .isEmpty(string/array/object), .isNotEmpty: comprueba que la cadena sea '', el array [] o el objeto {}, o no.
- .throws(funcion, [errorLike/string], [string]): para comprobar que la función lanza un error del tipo indicado (TypeError, RangeError, ...) e incluso con el mensaje indicado

Más información en la [página de _Chai_])https://www.chaijs.com/api/assert/).

## Tests de funciones asíncronas con promesas
Si hacemos llamadas asíncronas Mocha permite testearlas tras el .then o el .catch:
```javascript
describe('API de artículos', () => {
	it('should return the article 3', function() {
		return getArticulo(3)
			.then(art => {
				assert.instanceOf(art, Articulos);
				assert.equal(art.id, 3);
			})
	});
	it('should return an error', function() {
		return getArticulo(undefined)
			.catch(err => {
				...
			})
	});
})
```

## _Hooks_ de Mocha
Nos permiten ejecutar código en momentos puntuales. Reciben como parámetro la función a ejecutar. Son:
- before(): el código se ejecutará una vez antes del primer test del bloque _describe_
- beforeEach(): se ejecutará antes de cada test
- after(), afterEach(): lo mismo pero tras ejecutar los tests

## Tests para la UI
Necesitaremos alguna librería que nos permita contruir escenarios de navegación como _CasperJS_ y otra que imite al navegador como _PhantomJS_ (para WebKit) o _SlimerJS_ (para Gecko).

Hay muchas páginas que nos enseñan a usar Mocha para testear la UI como:
- [Web UI Testing in NodeJS](https://dev.to/ykyuen/web-ui-testing-in-nodejs--kda)
- [UI Test Automation with Node.js, TypeScript, Mocha and Selenium](https://blogs.msdn.microsoft.com/nilayshah/2018/01/21/ui-test-automation-with-node-js-typescript-mocha-and-selenium/)
- [Automated UI Testing with Selenium and JavaScript](https://itnext.io/automated-ui-testing-with-selenium-and-javascript-90bbe7ca13a3)
- [Automated UI/UX Testing with Puppeteer Mocha and Chai](https://medium.com/@tariqul.islam.rony/automated-ui-ux-testing-with-puppeteer-mocha-and-chai-800cfb028ab9)
- 
