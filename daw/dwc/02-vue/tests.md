# Test en Javascript
Existen muchas herramientas para crear tests unitarios en JS. Nosotros usaremos [Jest](https://jestjs.io/es-ES/). Podemos instalarlo con npm:
```bash
npm install -D jest
```
o podemos instalarlo globalmente para usarlo en varios proyectos (`npm i -g jest`). Si lo hacemos así deberemos crear un fichero _package.json_ en nuestro directorio de trabajo con el código:
```javascript
{
  "scripts": {
    "test": "jest"
  }
}
```

Ahora vamos a implementar una función de suma en el fichero _sum.js_:
```javascript
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

y su correspondiente test que guaremos en el fichero _sum.test.js_:
```javascript
const sum = require('./sum');

test('sumar 1 + 2 es igual a 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

Para pasar el test ejecutaremos en la terminal:
```bash
npm run test
```

## Marcadores comunes
La sintaxis básica es como heos visto en el ejemplo:
```javascript
expects(data).toBe(value);
```

Los marcadores que podemos usar son:
- .toBe(value): el resultado debe ser igual al valor
- .toEqual(value): igual pero para comparar objetos
- .toBeNull: igual a null
- .toBeUndefined: igual a undefined
- .toBeDefined: distinto de undefined
- .toBeTruthy: igual a true
- .toBeFalsy: igual a false

A todos ellos se les puede anteponer _.not._ para negarlos (ej. `expect(sum(2, 2)).toBe(3)`)

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

Podemos consultar todas las opciones en la [documentación oficial](https://jestjs.io/docs/en/expect).

## Promesas
Podemos testear una función que devuelva una promesa. Si tenemos la función _fetchData_ que devuelve una promesa la testearemos con el código:
```javascript
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
```

También podemos testear otras funciones asíncronas como _callback_, _resolve_/reject_, _async/await_, ... en la [documentación](https://jestjs.io/docs/en/asynchronous). 

Podemos ver ejemplos de todo esto en [TecnoPS](http://tecnops.es/testing-en-javascript-con-jest-parte-1-de-2/), en [este vídeo](https://www.youtube.com/watch?v=7r4xVDI2vho) y en muchas otras páginas.
