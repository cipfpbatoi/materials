NO USAR. Incluído en el capítulo 6 [Profundizando en Vue](./06-profundizando.html)

# Computed y watchers
Cuando se crea un componente de Vue (o el componente raíz) se le pasa como parámetro un objeto con las opciones con que se creará. Las principales, como ya vimos, son:
- data: aquí definimos cada variable que usará el componente y que puede ser mostrada en el DOM. Estas variables son _reactivas_ lo que significa que Vue las está observando continuamente y si cambia su valor automáticamente modifica el DOM para reflejar dicho cambio
- methods: aquí definimos los métodos de nuestro componente. Los métodos reciben en la variable _this_ el contexto del componente por lo que tienen acceso a variables, _props_ y otros métodos como propiedades de _this_, por ejemplo:

```javascript
Vue.component('user-item', {
  template: `<p>Contador: {{ counter }}</p>
      <button @click="incrCounter">Incrementar</button>
  `,
  data() {
    return {
      counter: 3,
    }
  },
  methods: {
      incrCounter() {
          this.counter++;
      },
  }
})
```

Pero vimos que hay otras opciones que podemos definir. 

## Computed
Hemos visto que en una interpolación o directiva podemos poner una expresión javascript. Pero si la expresión es demasiado compleja hace que nuestro HTML sea más difícil de leer. La solución es crear una expresión calculada que nos permite tener "limpio" el HTML. Por ejemplo:

```javascript
Vue.component('author-item', {
  template: `<p>Autor: {{ author.name + ' ' + author.surname }}</p>
      <p>Ha publicado libros: {{ author.books.length > 0 ? 'Sí' : 'No' }}</p>
  `,
  data() {
    return {
      author: {
        name: 'John',
        surname: 'Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  }
})
```

La solución a esas expresiones sería crear propiedades calculadas:

```javascript
Vue.component('author-item', {
  template: `<p>Autor: {{ fullName }}</p>
      <p>Ha publicado libros: {{ hasPublished }}</p>
  `,
  data() {
    return {
      author: {
        name: 'John',
        surname: 'Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  },
  computed: {
    fullName() {
      return this.name + ' ' + this.surname;
    },
    hasPublished() {
      // `this` points to the vm instance
      return this.author.books.length > 0 ? 'Sí' : 'No'
    }
  }
})
```

En lugar de definir _computed_ podríamos haber obtenido el mismo resultado usando métodos, pero la ventaja de las propiedades calculadas es que se cachean por lo que si se vuelven a tener que renderizar en el DOM no vuelven a evaluarse, a menos que cambie el valor de alguna de las variables reactivas que use.

Por defecto las propiedades _computed_ sólo hacen un _getter_, por lo que no se puede cambiar su valor. Pero podemos si queremos hacerlo definir métodos _getter_ y _setter_:

```javascript
  computed: {
    fullName:
      // getter
      get() {
        return this.name + ' ' + this.surname;
      },
      // setter
      set(newValue) {
        const names = newValue.split(' ');
        this.name = names[0];
        this.surname = names[names.length - 1];
      }
    },
  },
})
```

Si hacemos `this.fullName = 'John Doe'` estaremos asignando los valores adecuados a las variables _name_ y _surname_.

## Watchers
Vue proporciona una forma genérica de controlar cuándo cambia el valor de una variable reactiva para poder ejecutar código en ese momento poniéndole un _watch_:

```javascript
  data() {
    return {
      name: 'John',
      surname: 'Doe',
      fullName: 'John Doe',
    }
  },
  watch: {
    name(newValue, oldValue) {
      this.fullName = newValue + ' ' + this.surname;
    },
    surname(newValue, oldValue) {
      this.fullName = this.name + ' ' + newValue;
    },
  },
})
```

En este caso no tiene mucho sentido y es más fácil (y más eficiente) usar una propiedad _computed_ como hemos visto antes, pero hay ocasiones en que necesitamos ejecutar código al cambiar una variable y es así donde se usan. Veremos su utilidad cuando trabajemos con _vue-router_.
