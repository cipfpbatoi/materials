<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
Tabla de contenidos

- [Comunicación entre componentes](#comunicaci%C3%B3n-entre-componentes)
  - [Props (de padre a hijo)](#props-de-padre-a-hijo)
    - [No cambiar el valor de una prop](#no-cambiar-el-valor-de-una-prop)
    - [Validación de props](#validaci%C3%B3n-de-props)
  - [Emitir eventos (de hijo a padre)](#emitir-eventos-de-hijo-a-padre)
    - [Capturar el evento en el padre: .native](#capturar-el-evento-en-el-padre-native)
    - [sync](#sync)
  - [Bus de comunicaciones](#bus-de-comunicaciones)
  - [Compartir datos](#compartir-datos)
    - [$root y $parent](#root-y-parent)
    - [Store pattern](#store-pattern)
  - [Vuex](#vuex)
  - [Slots](#slots)
    - [Slots con nombre](#slots-con-nombre)
- [Aplicación de ejemplo](#aplicaci%C3%B3n-de-ejemplo)
  - [Solución emitiendo eventos](#soluci%C3%B3n-emitiendo-eventos)
  - [Solución con _Store pattern_](#soluci%C3%B3n-con-_store-pattern_)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Comunicación entre componentes
Ya hemos visto que podemos pasar parámetros a un componente mediante _props_. Esto permite la comunicación de padres a hijos, pero queda por resolver cómo comunicarse los hijos con sus padres para informarles de cambios o eventos producidos y cómo comunicarse otros componentes entre sí.

Nos podemos encontrar las siguientes situaciones:
* Comunicación de padres a hijos: _props_
* Comunicación de hijos a padres: emitir eventos
* Comunicación entre otros componentes: crear un componente que haga de _bus_ de comunicaciones
* Comunicación más compleja: Vuex

## Props (de padre a hijo)
Ya hemos visto que permiten pasar parámetros del padre al componente hijo. Si el valor del parámetro cambia en el padre automáticamente se reflejan esos cambos en el hijo.

Cualquier parámetro que pasemos sin _v-bind_ se considera texto. Si queremos pasar un número, booleano, array u objeto hemos de pasarlo con _v-bind_ igual que hacemos con las variables para que no se considere texto:
```html
<ul>
  <todo-item todo="Aprender Vue" :done="false" ></todo-item>
</ul>
```

Podemos pasar varios parámetros en un atributo _v-bind_ sin nombre:
```html
<ul>
  <todo-item v-bind="{ todo: 'Aprender Vue', done: false }" ></todo-item>
</ul>
```
y en e componente se reciben sus propiedades separadamente:
```javascript
Vue.component('todo-item, {
  props: ['todo', 'done'],
  ...
```

### No cambiar el valor de una prop
Al pasar un parámetro mediante una _prop_ su valor se mantendrá actualizado en el hijo si su valor cambiara en el padre, pero no al revés por lo que no debemos cambiar su valor en el componente hijo.

Si debemos cambiar su valor porque lo que nos pasan es sólo un valor inicial asignaremos el parámetro a otra variable:
```javascript
props: ['initialValue'],
data(): {
  return {
    myValue: this.initialValue
  }
}
```

Si debemos darle determinado formato también lo haremos sobre otra variable que es con la que trabajaremos:
```javascript
props: ['cadenaSinFormato'],
computed(): {
  cadenaFormateada() {
    return this.cadenaSinFormato.trim().toLowerCase();
  }
}
```

**OJO**: Si el parámetro es un objeto o un array éste se pasa por referencia por lo que si lo cambiamos en el componente hijo  SÍ se cambiará en el padre, lo que debemos evitar.

### Validación de props
Al pasar un parámetro podemos indicar algunas cosas como:
* **type**: su tipo (String, Boolean, Number, Object, ...). Puede ser un array con varios tipos: `type: [Boolean, Number]`
* **default**: su valor por defecto si no se pasa ese parámetro
* **required**: si es o no obligatorio
* e incluso una función para validaciones más complejas

Ejemplos:
```javascript
props: {
  prop1: {
    type: String,
    required: true
  },
  prop2: {
    type: [Boolean, Number],
    default: false
  },
  prop3: {
    type: Object,
    default(): { return {message: 'Hola'} }   # Si es un objeto o array _default_ debe devolver el valor
  },
  prop4: {
    validator(value) {
      return ...                # Si devuelve *true* será válido
    }
  }
```

Saber más sobre validación de props: [Validar Props con Vuejs 2. Uno de Piera](https://www.uno-de-piera.com/validar-props-vuejs-2/)

## Emitir eventos (de hijo a padre)
Si un componente hijo debe pasarle un dato a su padre o informarle de algo puede emitir un evento que el padre capturará y tratará convenientemente. Para emitir el evento el hijo hace:
```javascript
  this.$emit('nombreevento', parametro);
```

El padre debe capturar el evento como cualquier otro. En su HTML hará:
```html
<my-component @nombreevento="fnManejadora"
...
```

y en su JS tendrá la función para manejar ese evento:
```javascript
  ...
  methods: {
    fnManejadora(param) {
      ...
    },
  }
  ...
``` 

El componente hijo puede emitir cualquiera de los eventos estàndar de JS ('click', 'change', ...) o un evento personalizado ('cambiado', ...).

**Ejemplo**: continuando con la aplicación de tareas que dividimos en componentes, en el componente **todo-item** en lugar de hacer un alert emitiremos un evento al padre:
```javascript
    delTodo() {
      this.$emit('delItem');
    },
  }
``` 
donde lo escuchamos y llamamos al método que borre el item:
```javascript
Vue.component('todo-list', {
  template: '<div>'+
'      <h2>{{ title }}</h2>'+
'     <ul>'+
'       <todo-item '+
'         v-for="item in todos" '+
'         :key="item.id"'+
'         :todo="item"'+
'         @delItem="delTodo(index)">'+
'        </todo-item>'+
'      </ul>'+
'      <add-item></add-item>'+
'     <br>'+
'      <del-all></del-all>'+
'  </div>',
  methods: {
    delTodo(index){
      this.todos.splice(index,1);
    },
    ...
``` 

### Capturar el evento en el padre: .native
En ocasiones (como en este caso) el componente hijo no hace nada más que informar al padre de que se ha producido un evento sobre él. En estos casos podemos hacer que el evento se capture directamente en el padre en lugar de en el hijo con el modificador **[.native](https://vuejs.org/v2/guide/components-custom-events.html#Binding-Native-Events-to-Components)** que permite que un evento se escuche en el elemento que llama al componente y no en el componente:
```javascript
Vue.component('todo-list', {
  template: '<div>'+
'      <h2>{{ title }}</h2>'+
'     <ul>'+
'       <todo-item '+
'         v-for="item in todos" '+
'         :key="item.id"'+
'         :todo="item"'+
'         @dblclick.native="delTodo(index)">'+
'        </todo-item>'+
    ...
``` 

Le estamos indicando a Vue que el evento _click_ se capture en _todo-list_ directamente por lo que el componente _todo-item_ no tiene que capturarlo ni hacer nada:
```javascript
Vue.component('todo-item', {
  props: ['todo'],
  template: '    <li>'+
'      <label>'+
    ...
``` 


### sync
Una alternativa a emitir eventos es "sincronizar" un parámetro pasado por el padre para que se actualice si se modifica en el hijo, lo que se hace con el modificador _.sync_, pero no es muy recomendable porque hace el código más difícil de mantener:
```html
<ul>
  <todo-item todo="Aprender Vue" :done.sync="false" ></todo-item>
</ul>
```
Si cambia el valor de _done_ en el hijo también cambiará en el padre.

## Bus de comunicaciones
Si queremos pasar información entre varios componentes que no tienen por qué ser padres/hijos podemos crear un componente que haga de bus y que lo incluiremos en cada componente que queramos comunicar:

Para crear el objeto que gestione la comunicación entre componentes haremos:
```javascript
var EventBus = new Vue;
```
En cada componente que queramos que escuche eventos de ese bus importamos el componente y creamos un escuchador en el hook _created_ o _mounted_:
```javascript
created() {
    EventBus.$on('nombreevento', this.fnManejadora);
    ...
},
methods: {
    fnManejadora(param) {
        ...
    })
```
Cada componente que queramos que emita al bus deberá también tener importado el _EventBus_. Para emitir, en el método del componente que queramos lanzamos el evento con:
```javascript
EventBus.$emit('nombreevento', param)
```

## Compartir datos
Una forma más sencilla de modificar datos de un componente desde otros es compartendo los datos. Definimos fuera de la instancia Vue y de cualquier componente un objeto que contendrá todos los datos a compartir entre componentes y lo registramos en el _data_ de cada componente que tenga que acceder a él. Ejemplo:

```javascript
const store={
  message: '',
  newData: { },
  ...
}

Vue.component('comp-a', {
  ...
  data() {
    return {
      store,
      // y a continuación el resto de data del componente
      ...
    }
  },
  methods: {
    changeMessage(newMessage) {
      this.store.message=newMessage;
    }
  },
  ...
})

Vue.component('comp-b', {
  ...
  data() {
    return {
      store,
      // y a continuación el resto de data del componente
      ...
    }
  },
  methods: {
    delMessage() {
      this.store.message='';
    }
  },
  ...
})
```

Tanto desde _comp-a_ como desde _comp-b_ podemos modificar el contenido de **store** y esos cambios se reflejarán automáticamente tanto en la vista de _comp-a_ como en la de _comp-b_. Fijaos que declaro el objeto como una constante porque NO puedo cambiar su valor para que pueda ser usado por todos los componentes, pero sí el de sus propiedades.

Esto tiene un grave inconveniente y es que el valor de cualquier dato puede ser modificado desde cualquier parte de la aplicación, lo que es una pesadilla a la hora de depurarel código y encontrar errores.

Para evitar esto podemos usar un patrón de almacén (store pattern) que veremos en el siguiente apartado.

### $root y $parent
Además todos los componentes tienen acceso a los datos y métodos definidos en la instancia de Vue (donde hacemos el `new Vue`). Por ejemplo:

```javascript
new Vue({
  el: '#app',
  data: {
    message: 'Hola',
  },
  methods: {
    getInfo() {
  ...
}
```

Desde cualquier componente podemos hacer cosas como:
```javascript
console.log(this.$root.message);
this.$root.message='Adios';
this.$root.getInfo();
```

También es posible acceder a los datos y métodos del componente padre del actual usando `$parent` en lugar de `$root`.

De esta manera podríamos acceder directamente a datos del padre o usar la instancia de Vue como almacén (evitando crear el objeto **store** para compartir datos) pero, aunque esto puede ser útil en aplicaciones pequeñas, es difícil de mantener cuando nuestra aplicación crece por lo que se recomienda usar el **EventBus** que hemos visto antes, el **Store pattern**  que veremos a continuación o **Vuex** si nuestra aplicación va a ser grande.

### Store pattern
Es el mismo caso de antes pero las acciones que modifiquen los datos del almacén están incluidas dentro del propio almacén, lo que facilita su seguimiento:

```javascript
const store={
  debug: true,
  state: {
    message: '',
    ...
  },
  setMessageAction (newValue) {
    if (this.debug) console.log('setMessageAction triggered with', newValue)
    this.state.message = newValue
  },
  clearMessageAction () {
    if (this.debug) console.log('clearMessageAction triggered')
    this.state.message = ''
  }
}

Vue.component('comp-a', {
  ...
  data() {
    return {
      sharedData: store.state,
      // o aún mejor declaramos sólo las variables que necesitemos, ej
      // message: store.state.message,
      ...
    }
  },
  methods: {
    changeMessage(newMessage) {
      store.setMessageAction(newMessage);
    }
  },
  ...
})

Vue.component('comp-b', {
  ...
  data() {
    return {
      sharedData: store.state,
      // y a continuación el resto de data del componente
      ...
    }
  },
  methods: {
    delMessage() {
      store.clearMessageAction();
    }
  },
  ...
})
```


## Vuex
Es un patrón y una librería para gestionar los estados en una aplicación Vue. Ofrece un almacenamiento centralizado para todos los componentes con unas reglas para asegurar que un estado sólo cambia de determinada manera.

Es el método a utilizar en aplicaciones medias y grandes y lo veremos con más detalle más adelante.

## Slots
Un _slot_ es una ranura en un componente que, al renderizarse, se rellena con lo que le pasa el padre en el innerHTML de la etiqueta del componente. Los _slots_ son una herramienta muy potente. Podemos obtener toda la información en la [documentación de Vue](https://vuejs.org/v2/guide/components-slots.html). 

Ejemplo:
Componente _my-component_ con un slot:
```html
<div>
  <h3>Componente con un slot</h3>
  <slot>Esto se verá si no se pasa nada al slot</slot>
</div>
```

Si llamamos al componente con:
```html
<my-component>
  <p>Texto del slot</p>
</my-component>
```
se renderizará como:
```html
<div>
  <h3>Componente con un slot</h3>
  <slot>Esto se verá si no se pasa nada al slot</slot>
</div>
```

Pero si lo llamamos con:
```html
<my-component>
</my-component>
```
se renderizará como:
```html
<div>
  <h3>Componente con un slot</h3>
  Esto se verá si no se pasa nada al slot
</div>
```

### Slots con nombre
A veces nos interesa tener más de 1 slot en un componente. Para saber qué contenido debe ir a cada slot se les da un nombre. 

Vamos a ver un ejemplo de un componente llamado _base-layout_ con 3 _slots_, uno para la cabecera, otro para el pie y otro principal:
```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

A la hora de llamar al componente hacemos:
```html
<base-layout>
  <template slot="header">
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template slot="footer">
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

Lo que está dentro de un _template_ con atributo _slot_ irá al_slot_ del componente con ese nombre. El resto del innerHTML irá al _slot_ por defecto (el que no tiene nombre).

El stributo _slot_ podemos ponérselo a cualquier etiqueta (no tiene que ser \<template>;
```html
<base-layout>
  <h1 slot="header">Here might be a page title</h1>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <p slot="footer">Here's some contact info</p>
</base-layout>
```

# Aplicación de ejemplo
Vamos a hacer que funcione la aplicación que separamos en componentes.

## Solución emitiendo eventos
En primer lugar vamos a darle funcionalidad al botón de borrar toda la lista. En la función manejadora del componente sustituimos el _alert_ por
```javascript
this.$emit('delAll');
```
Ahora en el _template_ del componente padre capturaremos el evento _delAll_ (podríamos haber emitido también un 'click') y llamamos a la función que borrará toda la lista.

Con el botón de añadir haremos lo mismo pero en este caso al emitir el evento le pasaremos el texto a añadir:
```javascript
this.$emit('newl', this.newTodo);
```
Y la función manejadora lo recibe como parámetro (pero no se pone en el HTML):
```javascript
addTodo(title) {
  this.todos.push({title: title, done: false});
},
```

Lo mismo hacemos con el _dblclick_ sobre cada elemento de la lista para borrarlos.

Por último vemos que en el checkbos del componente _todo-item_ estamos modificando el valor de un parámetro (cambiamos el _done_ de la tarea). Esto funciona porque lo que nos están pasando es un objeto (que se pasa por referencia) y no las propiedades independientemente (que se pasarían por copia) pero no debemos hacerlo así.

Para evitarlo cambiamos el _v-model_ que es bidireccional (al modificar el checkbox se modifica la propiedad _done_) por un _v-bind_ es es unidireccional más una función que avisará al componente padre al cambiar el valor del checkbox para que cambie el valor de la tarea.

**Solución**:
<script async src="//jsfiddle.net/juansegura/u2joasts/embed/"></script>

## Solución con _Store pattern_
Creamos el _store_ para el array de cosas a hacer que debe ser accesible desde varios componentes. En él incluimos métodos para añadir y borrar un nuevo _todo_, para cambiar el estado de un _todo_ y para borrarlos todos.

En el componente _todo_list_ debemos incluir el array _todos_ lo que haremos en su data. El resto de componentes no necesitan acceder al array, por lo que no lo incluimos e su data, pero sí llamarán a los métodos para cambiarlo.

**Solución**:
<script async src="//jsfiddle.net/juansegura/o0951fzr/embed/"></script>
