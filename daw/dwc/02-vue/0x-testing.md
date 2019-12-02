# Testear nuestros componentes
Usaremos [_karma_](https://karma-runner.github.io/latest/index.html). Lo instalaremos para desarrollo:
```bash
npm i -D karma
```

Dentro del directorio _test_ tenemos otros 2: _e2e_ y _unit_.

El _test runner_ para pasar los tests unitarios es [_Jest_](https://jestjs.io/) o _Karma_, que se apoya en [_Mocha_](https://mochajs.org/) y [_Chai_](https://www.chaijs.com/).

## Tests unitarios
Podemos ver cómo hacer un test básico en la [documentación oficial de Vue](https://es.vuejs.org/v2/guide/unit-testing.html) o leer el _cookbook_ de VUe [Unit Testing Vue Components](https://vuejs.org/v2/cookbook/unit-testing-vue-components.html). 

A la hora de crear el proyecto no escogeremos _preset_ sino que seleccionaremos manualmente las características a instalar y marcaremos la de tests unitarios con _Jesst_ que es la librería que usamos en el bloque de Javascript.

Para ejecutar los tests ejecutaremos en la terminal
```bash
npm run test:unit
```

El projecto está configurado para ejecutar los ficheros de pruebas cuyo nombre acabe por **.spec.js**. Por defecto se guardan en la carpeta **/tests**.

### Primer test: TodoItem.vue
En primer lugar vamos a testear que la propiedad 'done' tiene el valor que se le pasa y que cambia al llamar a la función 'toogleDone':
```javascript
import { shallowMount } from '@vue/test-utils'
import Usuario from '@/components/Usuario.vue'

describe('componente Usuario.vue', () => {
 it('debe cambiar el valor a true', () => {
  /// Crea una instancia del componente
  const wrapper = shallowMount(Usuario);

  /// Evalúa que el valor por defecto sea "false"
  expect(wrapper.vm.usuarioActivo).toBe(false);

  /// Ejecuta el metodo que cambia el valor de la variable a "true"
  wrapper.vm.activarUsuario();

  /// Evalúa que el nuevo valor usuarioActivo sea "true"
  expect(wrapper.vm.usuarioActivo).toBe(true);
 })
})
```

En primer lugar importamos Vue y el componente a testear:


Fuentes:
- [Documentación oficial de Vue](https://es.vuejs.org/v2/guide/unit-testing.html)
- [Pruebas unitarias en Vue.js: Setup y primeros pasos. Carlos Solis](https://carlossolis.mobi/pruebas-unitarias-en-vue-js-setup-y-primeros-pasos-7255788f3e3b)
- 
