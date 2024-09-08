# Introducción a los test en Javascript
- [Introducción a los test en Javascript](#introducción-a-los-test-en-javascript)
  - [Introducción](#introducción)
  - [Crear un fichero de test](#crear-un-fichero-de-test)
  - [Marcadores comunes](#marcadores-comunes)
  - [Promesas](#promesas)
  - [Mocks](#mocks)
    - [Mocking de funciones](#mocking-de-funciones)
    - [Mocking de la red](#mocking-de-la-red)
    - [Mocking del navegador](#mocking-del-navegador)
  - [Cobertura de código](#cobertura-de-código)
  - [Desarrollo guiado por test (_TDD, Test Driven Development_)](#desarrollo-guiado-por-test-tdd-test-driven-development)


## Introducción
Existen muchas herramientas para crear tests unitarios en JS. Nosotros usaremos [_Vitest_](https://vitest.dev/) que es una adaptación para _Vite_ de la librería [Jest](https://jestjs.io/es-ES/). 

Podemos instalarlo con npm en el proyecto donde lo vayamos a usar:
```bash
npm install -D vitest
```

o podemos instalarlo globalmente para usarlo en cualquier proyecto (`npm i -g vitest`). Si lo hacemos así deberemos crear un fichero _package.json_ en nuestro directorio de trabajo con el código:
```javascript
{
  "scripts": {
    "test": "vitest"
  }
}
```

## Crear un fichero de test
Hemos implementado una función de suma en el fichero _sum.js_:
```javascript
function sum(a, b) {
  return a + b;
}
export sum;
```

NOTA: si no estamos usando _Vite__ podemos exportar la función con `module.exports = sum;`

Para probarla crearemos el fichero _sum.test.js_ con el siguiente contenido:
```javascript
import { sum } from './sum.js';

describe('sum', () => {
  test('sumar 1 + 2 es igual a 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
  test('sumar 1 + -2 es igual a -1', () => {
    expect(sum(1, -2)).toBe(-1);
  });
})
```

NOTA: En lugar de `test` podemos usar `it` que es equivalente.

Para pasar el test ejecutaremos en la terminal:
```bash
npm run test
```

La estructura de un fichero de test es:
1. Importar las funciones a testear
2. Agrupar los tests relacionados con `describe`
3. Incluir uno o más tests con `test`. Cada test debe ser independiente de los demás y no depender de su orden de ejecución.

Podemos ver más opciones en la [documentación oficial](https://vitest.dev/).

## Marcadores comunes
Cada test utiliza la función `expect` que recibe un valor y utiliza un _matcher_ para compararlo con lo esperado. La sintaxis básica es como hemos visto en el ejemplo:
```javascript
expects(data).toBe(value);
```

NOTA: En lugar de `expects` podemos usar `assert` que es equivalente.

Algunos marcadores que podemos usar son:
- .toBe(value): el resultado debe ser igual al valor indicado
- .toEqual(value): igual pero para comparar objetos
- .toBeNull: igual a null
- .toBeUndefined: igual a undefined
- .toBeDefined: distinto de undefined
- .toBeTruthy: igual a true
- .toBeFalsy: igual a false

A todos ellos se les puede anteponer _.not._ para negarlos (ej. `expect(sum(2, 2)).not.toBe(3)`)

Para comparar números:
- .toBetoBeGreaterThan(value)
- .toBetoBeGreaterThanOrEqual(value)
- .toBetoBeLessThan(value)
- .toBetoBeLessThanOrEqual(value)
- .toBeCloseTo(value): para comparaciones de números con coma flotante para no depender del redondeo

Y podemos ver si un string cumple una expresión regular:
- .toMatch(/ER/)

También podemos comprobar si un array contiene un elemento
- .toContain(elem)

o si una variable es instancia de un tipo concreto
- .toBeInstanceOf(tipo)

## Promesas
Podemos testear una función que devuelva una promesa u otras funciones asíncronas. Si tenemos la función _fetchData_ que devuelve una promesa que al resolverse devuelve el texto _'peanut butter'_ la testearemos con el código:
```javascript
describe('fetchData', () => {
  test('fecthData must return a promise', () => {
    let data = fetchData()
    expect(data).toBeInstanceOf(Promise);
    });
  test('the data is peanut butter', async () => {
    let data = await fetchData()
    expect(data).toBe('peanut butter');
  });
});
```

## Mocks
Podemos simular el comportamiento variables, funciones o el prpio navegador con _mocks_ y así no alterar los valores reales de nuestros datos.

### Mocking de funciones
Para simular funciones _vitest_ incorpora la utilidad _**vi**_. Esta utilidad tiene 2 métodos que son `fn()` y `spyOn()` que nos permiten hacer _mocks_ de funciones:

```javascript
import { vi } from 'vitest';

const myFunctionMock = vi.fn(() => 'mocked value');
myFunctionMock();
expect(myFunctionMock).toHaveBeenCalled();
myFunctionMock.mockReturnValue('mocked value');

const myFunctionSpy = vi.spyOn(myFunction);
myFunctionSpy.mockImplementation(() => 'mocked value');
```

### Mocking de la red
Para simular la red _vitest_ recomienda usar _**msw**_ que es una librería que nos permite simular peticiones a la red. Para instalarla:
```bash
npm install -D msw
```

y para usarla:
```javascript
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer(
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.json({ greeting: 'hello there' }));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());

test('fetches greeting', async () => {
  const response = await fetch('/greeting');
  const data = await response.json();
  expect(data.greeting).toBe('hello there');
});
```

### Mocking del navegador
Para simular el navegador _vitest_ recomienda usar _**jsdom**_ que es una librería que nos permite simular el navegador. Para instalarla:
```bash
npm install -D jsdom
```

Y agregamos el siguiente comentario al principio del archivo de pruebas:
```javascript
/**
 * @vitest-environment jsdom
 */
```

Para usarla:
```javascript
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>');
cont myParagraph = dom.window.document.querySelector('p')
console.log(myParagraph.textContent); // "Hello world"
test('the paragraph contains "Hello world"', () => {
  expect(myParagraph.textContent).toBe('Hello world');
});
```

## Cobertura de código
Podemos ver la cobertura de nuestro código con el comando:
```bash
npm run test -- --coverage
```

Esto nos mostrará un resumen de la cobertura de nuestro código y nos creará una carpeta _coverage_ con un informe detallado.

## Desarrollo guiado por test (_TDD, Test Driven Development_)
El desarrollo guiado por test es una técnica de programación que consiste en escribir primero los tests y después el código que los pasa. De esta forma nos aseguramos de que el código que escribimos es el mínimo necesario para pasar los tests y no más.

Esta técnica se basa en el ciclo _Red-Green-Refactor_ que consiste en:
1. escribir un test que fallarà porque aún no hemos escrito el código
2. escribir el código necesario para que pase el test
3. refactorizar el código para mejorarlo, si es necesario

Por ejemplo, si queremos escribir una función que devuelva el mayor de 2 números escribiremos un test que falle:
```javascript
test('max(1, 2) should return 2', () => {
  expect(max(1, 2)).toBe(2);
});
```

y después escribiremos el código necesario para que pase:
```javascript
function max(a, b) {
  return a > b ? a : b;
}
```
