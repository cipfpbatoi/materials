# Testear nuestros componentes
La librería que incluye Vue para testear las aplicaciones el **vue-test_utils** que proporciona herramientas para montar e interactuar con componentes. Para los tests unitarios usaremos [_Jest_](https://jestjs.io/).

Tras instalar la librería con npm (será una dependencia de desarrollo) indicaremos al _linter_ que vamos a usar jest para que no genere advertencias al usar sus comandos para lo que modificaremos el fichero _.eslintrc.js_ y añadiremos al apartado _env_ una línea indicando que vamos a usar jest. Dicho apartado quedará:
```json
  env: {
    node: true,
    jest: true,
  },
```

Si usamos librerías como Vue-Material o Vuetify y debemos importar ficheros .css de las mismas en nuestros componentes es posible que falle Jest a la hora de pasar los test y nos dará un error de que no puede procesar el fichero porque no es Javascript. Podemos solucionarlo instalando para desarrollo el paquete _identuty-obj-proxy_ y añadiendo una entrada para _moduleNameMapper_ al fichero de configuración de Jest **jest.config.js** que quedará:
```javascript
module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
}
```
(fuente: https://stackoverflow.com/questions/46177148/how-to-exclude-css-module-files-from-jest-test-suites)

## Tests unitarios
A la hora de crear el proyecto no escogeremos _preset_ sino que seleccionaremos manualmente las características a instalar y marcaremos la de tests unitarios con _Jest_ que es la librería que usamos en el bloque de Javascript.

Para ejecutar los tests ejecutaremos en la terminal
```bash
npm run test:unit
```

El projecto está configurado para ejecutar los ficheros de pruebas cuyo nombre acabe por **.spec.js**. Por defecto se guardan en la carpeta **/tests**.

### Primer test: HelloWorld.vue
En primer lugar vamos a analizar el test que hay hecho en **@/tests/exemple.spec.js** para testear el componente HelloWorld.vue:
```javascript
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
```

Lo primero que hay que hacer es importar el plugin de tests de vue y el componente a testear. Dentro de la prueba se monta el componente (`shallowMount`) y se le pasan las props que necesite (msg). A esta función se le pasa un componente y devuelve la instancia de Vue creada para él y su nodo del DOM. 

Como segundo parámetro se le puede pasar un objeto con opciones a montar en el componente (por ejemplo un _data_ que sustituirá al del componente) o, como en el ejemplo anterior, los parámetros que se le pasan al componente (en _propsData_). 

Además de `shallowMount` podemos usar (si lo importamos) el método `mount` que hace lo mismo pero también renderiza los subcomponentes que tenga el componente.

Por último se comprueba que el texto renderizado por el _template_ del componente incluye el mensaje pasado. La variable _wrapper_ es el nodo DOM raíz del componente y podemos obtener su _textContent_ (`.text()`), su _innerHTML_ (`.html()`), sus atributos (`.attributes()`, y para acceder a uno, por ejemplo la id haríamos `.attributes().id` ), sus clases (`.classes()`), etc.Podemos ver todos sus métodos en la [documentación oficial de Vue test utils](https://vue-test-utils.vuejs.org/).

También podríamos haber hecho la siguiente comprobación:
```javascript
    expect(wrapper.html()).toMatch('<h1>'+msg+'</h1>')
```

o bien comprobar directamente el valor de _prop_:
```javascript
    expect(wrapper.props().msg).toBe(msg)
```


### Comprobar atributos, clases y estilos en línea
El componente que vamos a probar es:
```vue
<template>
  <div>
    <h1>Testing dom attributes</h1>
    <a href="https://google.com" class="link" style="color:green">Google</a>  </div>
</template>

<script>
export default {};
</script>
```

Y el test es:
```javascript
import App from '../src/App.vue'
import { shallowMount } from '@vue/test-utils';

describe('Testing dom attributes', () => {
    it('checks href to google ', () => {
        const wrapper = shallowMount(App);
        const a = wrapper.find('a'); //finds an `a` element
        expect(a.attributes().href).toBe('https://google.com')
    })
})
```

Si lo que queremos comprobar son las clases, estas tienen su propio método:
```javascript
describe('Testing class', () => {
    it('checks the class to be link', () => {
        const wrapper = shallowMount(App);
        const a = wrapper.find('a'); //finds an `a` element
        expect(a.classes()).toContain('link')
    })
})
```

Y lo mismo ocurre para comprobar un estilo:
```javascript
describe('Testing style', () => {
    it('checks the inline style color to be green', () => {
        const wrapper = shallowMount(App);
        const a = wrapper.find('a'); //finds an `a` element
        expect(a.style.color).toBe('green')
    })
})
```

### Comprobar un método de un componente
El componente que vamos a probar es:
```vue
<template>
  <div>
    <h1>{{title}}</h1>    <button @click="changeTitle">Change title</button>  </div>
</template>

<script>
export default {
  data: function() {
    return {
      title: "Hello"    };
  },
  methods: {
    changeTitle() {
      this.title = "Hi";    }
  }
};
</script>
```

Y el test es:
```javascript
import { shallowMount } from '@vue/test-utils';
import Post from '../src/components/Welcome.vue'
describe('Testing Component Methods', () => {
    const wrapper = shallowMount(Post);

    it('correctly updates the title when changeTitle is called', () => {
        expect(wrapper.vm.title).toBe('Hello'); //initial title Hello
        wrapper.vm.changeTitle();  // calling component method
        expect(wrapper.vm.title).toBe('Hi'); // title updates to Hi
    })
})
```

### Comprobar que un método es llamado al producirse un evento
El componente que vamos a probar es:
```vue
<template>
  <div>
    <h1>{{count}}</h1>
    <button @click="increment">Increment</button>  </div>
</template>

<script>
export default {
  data: function() {
    return {
      count:0
    };
  },
  methods: {
    increment() {
      this.count++;
    }
  }
};
</script>
```

Y el test es:
```javascript
import { shallowMount } from '@vue/test-utils';
import Post from '../src/components/Counter.vue'

describe('Testing native dom events', () => {
    const wrapper = shallowMount(Post);

    it('calls increment method when button is clicked', () => {
        const increment = jest.fn(); // mock function
        // updating method with mock function
        wrapper.setMethods({ increment });
        //find the button and trigger click event
        wrapper.find('button').trigger('click');
        expect(increment).toBeCalled();
    })

})
```
Fuente: [Testing Dom events in Vue.js using Jest and vue-test-utils. Sai gowtham](https://reactgo.com/vue-test-dom-events/)

### Comprobar que el DOM reacciona a cambios en una variable reactiva
Dado que Vue realiza las actualizaciones de DOM de forma asíncrona, las comprobaciones sobre las actualizaciones de DOM resultantes del cambio de estado, deberán realizarse en un callback `Vue.nextTick`.
```javascript
it('button click should increment the count text', async () => {
  expect(wrapper.text()).toContain('0')
  const button = wrapper.find('button')
  button.trigger('click')
  await Vue.nextTick()
  expect(wrapper.text()).toContain('1')
})
```

### Comprobar peticiones asíncronas a servicios ajenos a Vue
En muchos casos hacemos peticiones asíncronas, como peticiones a una API. Podéis obtener información en:
- [Doc Vue test utils](https://vue-test-utils.vuejs.org/guides/testing-async-components.html)
- [Jest: Mock Functions](https://jestjs.io/docs/es-ES/mock-functions)
- ...

### Nuestro primer test: TodoItem.vue
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

### Testear Vuex
Normalmente nuestros componentes usaran Vuex para:
- hacer un _commit_ a una _mutation_
- hacer un _dispatch_ a una _action_
- acceder a los datos mediante _state_ o _getters_

#### Testear mutations
Es sencillo porque sólo son llamadas Javascript. Ejemplo:
```javascript
// store.js
...
mutations: {
      addPost(state, post) {
        state.posts.push(post);
      },
}
...
```

```javascript
// store.spec.js
import { mutations } from "@/store/index.js"

describe("addPost", () => {
  it("adds a post to the state", () => {
    const post = { id: 1, title: "Primer post" }
    const state = {
      posts: [],
    }

    mutations.addPost(state, post)

    expect(state).toEqual({
      posts: [ { id: 1, title: 'Primer post' } ]
    })
  })
})

```

#### Testear actions

```javascript
```




### Ejemplo
Podéis encontrar un completo ejemplo de cómo testear una aplicación _ToDo_ en [Adictos al trabajo - Testing en componentes de Vue.js](https://www.adictosaltrabajo.com/2018/10/25/testing-en-componentes-de-vue-js/).

Podéis encontrar ejemplos más completos en muchas páginas, como:
- [Testing Vue]
- [Vue Testing Handbook](https://lmiller1990.github.io/vue-testing-handbook/): completo tutorial de cómo testear todo en nuestros componentes Vue (props, computed, Vuex, router, ...)
- [Testing Vuex](https://lmiller1990.github.io/vue-testing-handbook/testing-vuex.html#testing-vuex)
- [Testing Vue.js Applications](https://livebook.manning.com/book/testing-vue-js-applications/about-this-book/)
- []

Fuentes:
- [Vue test utils](https://vue-test-utils.vuejs.org/)
- [Documentación oficial de Vue](https://es.vuejs.org/v2/guide/unit-testing.html)
- [ReactGo: Vue tutorials](https://reactgo.com/vue-test-dom-events/)
- [Pruebas unitarias en Vue.js: Setup y primeros pasos. Carlos Solis](https://carlossolis.mobi/pruebas-unitarias-en-vue-js-setup-y-primeros-pasos-7255788f3e3b)
- 

## Test e2e
No comprueban un componente sino un _workflow_ completo, por ejemplo, que el usuario introduce algo como nombre de nueva tarea, pulsa enviar y se añade la tarea a la lista.

Al pasar los tests arranca un servidor de tests (_selenium_) y un navegador donde hace las pruebas y luego los cierra.
