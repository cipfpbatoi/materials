# Testear nuestros componentes
Usaremos [_karma_](https://karma-runner.github.io/latest/index.html). Lo instalaremos para desarrollo:
```bash
npm i -D karma
```

Dentro del directorio _test_ tenemos otros 2: _e2e_ y _unit_.

El _test runner_ para pasar los tests unitarios es [_Jest_](https://jestjs.io/) o _Karma_, que se apoya en [_Mocha_](https://mochajs.org/) y [_Chai_](https://www.chaijs.com/).

## Tests unitarios
Podemos ver cómo hacer un test básico en la [documentación oficial de Vue](https://es.vuejs.org/v2/guide/unit-testing.html) o leer el _cookbook_ de VUe [Unit Testing Vue Components](https://vuejs.org/v2/cookbook/unit-testing-vue-components.html). 

En el fichero con los tests de un componente importaremos Vue y el componente a testear:
