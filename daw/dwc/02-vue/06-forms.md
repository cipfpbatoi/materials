
# Formularios en Vue
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
Tabla de contenidos

- [Introducción](#introducción)
  - [Enlazar diferentes inputs](#enlazar-diferentes-inputs)
    - [input normal](#input-normal)
    - [radio button](#radio-button)
    - [checkbox](#checkbox)
    - [checkbox múltiple](#checkbox-m%C3%BAltiple)
      - [Generar los checkbox automáticamente](#generar-los-checkbox-autom%C3%A1ticamente)
    - [select](#select)
    - [Ejemplo](#ejemplo)
- [Validar formularios](#validar-formularios)
  - [Validar con VeeValidate](#validar-con-veevalidate)
    - [Instalación](#instalaci%C3%B3n)
    - [Uso básico de VeeValidate](#uso-b%C3%A1sico-de-veevalidate)
    - [Personalizar el mensaje del validador](#personalizar-el-mensaje-del-validador)
    - [Crear nuevas reglas de validación](#crear-nuevas-reglas-de-validaci%C3%B3n)
    - [Parámetros de las reglas](#parámetros-de-las-reglas)
    - [Estados de validación](#estados-de-validación)
    - [Validar al enviar el formulario](#validar-al-enviar-el-formulario)
- [Inputs en subcomponentes](#inputs-en-subcomponentes)
  - [v-model en subcomponente input](#v-model-en-subcomponente-input)
    - [Ejemplo](#ejemplo-1)
    - [Validación con Vee Validate](#validaci%C3%B3n-con-vee-validate)
  - [Slots](#slots)
    - [Ejemplo](#ejemplo-2)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Introducción
Para poder tener sincronizado el formulario con nuestros datos utilizamos la directiva **v-model** en cada campo. Algunos modificadores útiles de _v-model_ son:
* **.lazy**: hace que _v-model_ sincronice al producirse el evento _change_ en vez del _input_, es decir, que no sincroniza con cada tecla que pulsemos sino cuando acabamos de escribir y salimos del input.
* **.number**: convierte automáticamente el valor introducido (que se considera siempre String) a Number
* **.trim**: realiza un trim() sobre el texto introducido

Vamos a ver cómo usar los diferentes tipos de campos con Vue.

## Enlazar diferentes inputs
### input normal
En este caso simplemente añadimos la directiva **v-model** al input:
```html
<label>Nombre:</label>
<input type="text" v-model="user.nombre">
```

### radio button
Ponemos en todos los radiobuttons el **v-model** y a cada uno el **value** que se guardará al escoger dicha opción:
```html
<label>Sexo:</label>
<input type="radio" value="H" name="sexo" v-model="user.sexo">Hombre
<input type="radio" value="M" name="sexo" v-model="user.sexo">Mujer
```

### checkbox
Igual que cualquier input, le ponemos el **v-model**. Si no ponemos un _value_ los valores que se guardarán serán _true_ si está marcado y _false_ si no lo está:
```html
<input type="checkbox" v-model="user.acepto">Acepto las condiciones
```

### checkbox múltiple
Se trata de varios checkbox pero cuyos valores se guardan en el mismo campo, que debe ser un array. Le ponemos el **v-model** y el **value** que queramos que se guarde. La variable (en este ejemplo _user.ciclos_ será un array y guardará el value de cada checkbox marcado:
```html
<input type="checkbox" v-model="user.ciclosImparte" value="smx">Sistemas Microinformáticos y Redes<br>
<input type="checkbox" v-model="user.ciclosImparte" value="asix">Administración de Sistemas Informáticos y Redes<br>
<input type="checkbox" v-model="user.ciclosImparte" value="dam">Desarrollo de Aplicaciones Multiplataforma<br>
<input type="checkbox" v-model="user.ciclosImparte" value="daw">Desarrollo de Aplicaciones Web<br>
```
Si tenemos marcadas las casillas 1 y 3 el valor de _user.ciclos_ será \['smx', 'dam'].

#### Generar los checkbox automáticamente
Muchas veces las opciones a mostrar las tendremos en algún objeto (una tabla de la BBDD, ...). En ese caso podemos generar automáticamente un checkbox para cada elemento:
```javascript
ciclos: [
  {cod: 'smx', desc: 'Sistemas Microinformáticos y Redes'},
  {cod: 'asix', desc: 'Administración de Sistemas Informáticos y Redes'},
  {cod: 'dam', desc: 'Desarrollo de Aplicaciones Multiplataforma'},
  {cod: 'daw', desc: 'Desarrollo de Aplicaciones Web'},
]
```

```html
<div v-for="ciclo in ciclos" :key="ciclo.cod">
  <input type="checkbox" v-model="user.ciclosImparte" :value="ciclo.cod">{{ ciclo.desc }}<br>
</div>
```
### select
Lo único que hay que hacer es poner al select la directiva **v-model**:
```html
<select v-model="user.tutor">
  <option value=''>No es tutor</option>
  <option value="smx">Sistemas Microinformáticos y Redes</option>
  <option value="asix">Administración de Sistemas Informáticos y Redes</option>
  <option value="dam">Desarrollo de Aplicaciones Multiplataforma</option>
  <option value="daw">Desarrollo de Aplicaciones Web</option>
</select>
```
También podemos generar las opciones automáticamente:
```html
<select v-model="user.tutor">
  <option value=''>No es tutor</option>
  <option  v-for="ciclo in ciclos" :key="ciclo.cod" :value="ciclo.cod">
    {{ ciclo.desc }}
  </option>
</select>
```
Si queremos que sea un select múltiple sólo tenemos que ponerle el atributo _multiple_ a la etiqueta _\<select>_ y hacer que la variable _user.tutor_ sea un array, que se comportará como en los checkbox múltiples.
  
### Ejemplo

<script async src="//jsfiddle.net/juansegura/09f59xqe/embed/"></script>

# Validar formularios
Podemos validar el formulario "a mano" como hemos visto en JS:

<script async src="//jsfiddle.net/juansegura/qmg5btx2/embed/"></script>

Además deberíamos poner clase de error a los inputs con errores para destacarlos, poner el cursor en el primer input erróneo, etc.

Todo esto es incómodo y poco productivo. Para mejorarlo podemos usar una de las muchísimas librerías para validación de formularios como:
* [VeeValidate](https://logaretm.github.io/vee-validate/)
* [vuelidate](https://vuelidate.js.org/)
* [VueFormGenerator](https://github.com/vue-generators/vue-form-generator)
* ...

## Validar con VeeValidate
VeeValidate es una librería que permite validar formularios simplemente añadiendo a los inputs la directiva **v-validate**. 

Para validar el formulario ejecutaremos `this.$validator.validateAll()` que ejecuta el form y, si existen errores, los muestra. Genera el objeto **Errors** donde se almacenan las validaciones que hemos definido y que tiene métodos como:
* errors.any(): si queda alguna validación pendiente
* errors.has('name'): si el input 'name' tiene validaciones fallidas
* errors.first('name'): primer mensaje de error asociado al input 'name'
* ...

### Instalación
Como esta librería vamos a usarla en producción la instalaremos como dependencia del proyecto:
```[bash]
npm install vee-validate -S
```

Para usarla en el componente que contenga un formulario debemos importar el objeto _ValidationProvider_ y registrarlo:
```javascript
import { ValidationProvider } from 'vee-validate';

export default {
  components: {
    ValidationProvider
  },
  ...
```

o bien lo importaremos en el fichero principal de nuestra aplicación, _main.js_ para usarlo en cualquier componente:
```javascript
import { ValidationProvider } from 'vee-validate';

Vue.component('ValidationProvider', ValidationProvider);
```

También es posible usarlo directamente desde un CDN:
```html
<script src="https://unpkg.com/vee-validate@latest"></script>
<script>
  Vue.component('validation-provider', VeeValidate.ValidationProvider);
</script>
```

### Uso básico de VeeValidate
Cada input a validar los envolveremos en una etiqueta `<validation-provider>`:
```javascript
<ValidationProvider v-slot="{ errors }">
  <input v-model="value" type="text">
  <span>{{ errors[0] }}</span>
</ValidationProvider>
```

Este componente no incluye ninguna regla por defecto sino que debemos añadirlas usando la API _extend_:
```javascript
import { ValidationProvider } from 'vee-validate';
import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

extend('required', required);
extend('email', email);
```

y en el _ValidationProvider_ indicamos las reglas a aplicar a este validador:
```html
<validation-provider v-slot="{ errors }" rules="required|email" name="mail">
    <label>e-mail: </label>
    <input type="text" v-model="mail">
    <span> {{ errors[0] }}</span>
</validation-provider>
```

La validación se efectúa tras cada modificación del campo (es decir, tras pulsar cada tecla). Si queremos que no se haga hasta salir del campo le añadiremos al _ValidationProvider_ el atributo `mode="lazy"`.

NOTA: para que se apliquen las reglas los inputs deben tener **v-model**.

Podemos ver todas las [reglas disponibles](https://logaretm.github.io/vee-validate/guide/rules.html#rules) en la documentación de Vee Validate. Algunas de las más comunes son:
* _required_: no puede estar vacío ni valer _undefined_ o _null_
* tipos de datos: _alpha_ (sólo caracteres alfanuméricos), _alpha_num_ (alfanuméricos o números), _numeric_, _integer_,  _email_, ...
* _min_:4 (longitud mínima 4), _max_:50
* _min_value_:18 (debe ser un nº >= 18), _max_value_:65
* _between_:18:65, _date\_detween_, _in_:1,2,3, _not\_in:1,2,3, ...
* _regex_: debe concordar con la expresión regular pasada
* _is_ compara un campo con otro:
* ficheros: _mimes_, _image_, _size_

### Personalizar el mensaje del validador
Para personalizar el mensaje simplemente lo indicamos en el _extend_, por ejemplo para personalizar el mensaje de la regla _required_ haremos:
```javascript
// Override the default message.
extend('required', {
  ...required,
  message: 'This field is required'
});
```

En el mensaje podemos usar 3 variables:
- \_field\_: el nombre del campo (definido por el atributo _name_ del ValidationProvider)
- \_value\_: el valor actual del campo
- \_rule\_: el nombre de la regla de validación que se está aplicando

Por ejemplo el mensaje del required podría ser:
```javascript
  message: 'El campo {_field_} es obligatorio según especifica la regla {_rule_}'
```

### Crear nuevas reglas de validación
Para crear una nueva regla de validación personalizada simplemente le damos un nombre y definimos la función que devolverá _true_ si el valor es válido o _false_ si no lo es, por ejemplo:
```javascript
extend('positive', value => {
  return value >= 0;
});
```

Si queremos personalizar el mensaje de error (si no mostrará un mensaje genérico que no ayuda al usuario) haremos:
```javascript
extend('positive', {
    validate: value => {
      return value >= 0;
    },
    message: 'El campo {_field_} debe ser positivo y el valor {_value_} no lo es'
});
```

### Parámetros de las reglas
Algunas reglas de validación reciben parámetros, como _min_ que valida que el valor introducido tenga una longitud mínima. Por ejemplo si queremos que el nombre de usuario sea obligatorio y de al menos 8 caracteres haremos:
```html
<validation-provider v-slot="{ errors }" rules="required|min:8" name="username">
    <label>Nombre de usuario: </label>
    <input type="text" v-model="username">
    <span> {{ errors[0] }}</span>
</validation-provider>
```

Para personalizar el mensaje indicando la longitud mínima obtenemos los argumentos de la función declarándolos en _params_:
```javascript
extend('min', {
  ...min,
  params: ['longitud'],
  message: 'El campo {_field_} debe tener al menos {longitud} caracteres'
});
```

Podríamos crear una regla personalizada a la que tengamos que pasarle parámetros, por ejemplo haremos un _entre_ a la que le pasamos la longitud mínima y máxima de un campo (`rules="entre:4:12"`):
```javascript
extend('entre', {
  validate(value, { min, max} ) {
      return value.length >= min && value.length <= max;
  },
  params: ['min', 'max'],
  message: 'El campo {_field_} debe tener como mínimo {min} caracteres y como máximo {max}'
});
```

### Estados de validación
Cada _ValidationProvider_ tiene una serie de _flags_ que definen [en qué estado se encuentra](https://logaretm.github.io/vee-validate/guide/state.html#flags) la validación del campo. Algunos de los más comunes son:
- **valid** / **invalid**: indica que el campo es válido/inválido
- **touched** / **untouched**: indica si el campo ha tenido o no el foco (si se ha entrado en él)
- **pristine** / **dirty**: indica que el valor del campo no/sí se ha cambiado

Podemos hacer que se le pongan autimáticamente al input cuertas clases en función de su estado:
```javascript
import { configure } from 'vee-validate';

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
    dirty: ['is-dirty', 'is-dirty'], // multiple classes per flag!
    // ...
  }
})
```


### Validar al enviar el formulario
El componente _ValidationProvider_ se encarga de validar cada input individualmente. El componente _ValidationObserver_
controla el estado de todos los _ValidationProvider_ que se encuentren dentro de él.

Nunca debemos enviar un formulario inválido y para evitarlo podemos deshabilitar el botón de 'Enviar' hasta que el formulario sea válido o forzar la validación del mismo al eviarlo.

Encontramos la información de [cómo hacer ambas cosas](https://logaretm.github.io/vee-validate/guide/forms.html) en la documentación de Vee Validate.

# Inputs en subcomponentes
La forma enlazar cada input con su variable correspondiente es mediante la directiva _v-model_ que hace un enlace bidireccional: al cambiar la variable Vue cambia el valor del input y si el usuario cambia el input Vue actualiza la variable automáticamente.

El problema lo tenemos si hacemos que los inputs estén en subcomponentes. Si ponemos allí el _v-model_ al escribir en el _input_ se modifica el valor de la variable en el subcomponente (que es donde está el _v-model_) pero no en el padre. 

Para solucionar este problema tenemos 2 opciones: imitar nosotros en el subcomponente lo que hace _v-model_ o utilizar _slots_.

## v-model en subcomponente input
Como los cambios en el subcomponente no se transmiten al componente padre hay que emitir un evento desde el subcomponente que escuche el padre y que proceda a hacer el cambio en la variable.

La solución es imitar lo que hace un _v-model_ que en realidad está formado por:
* un _v-bind_ para mostrar el vlor inicial en el input
* un _v-on:input que se encarga de avisar para que se modifique la variable al cambiar el valor del _input_

Así que lo que haremos es:
* en el componente del formulario ponemos un _v-model_ que se encargue de actualizar la variable

```html
<form-input v-model=”campo”></form-input> 
```
* en el subcomponente del inpit ponemos 
  * un _v-bind_ que muestre el valor inicial
  * un _v-on:input_ que emita un evento _input_ al padre pasándole el valor actual 

```html
<template>
  <div class="control-group">
    <!-- id -->
    <label class="control-label" :for="nombre">{{ titulo }}</label>
    <div class="controls">
      <input :value="value" @input="$emit('input', $event.target.value)" type="text" :id="nombre" :name="nombre" placeholder="Escribe el nombre" class="form-control">
    </div>
  </div>	
</template>
```

```javascript
props: ['value'],
```

### Ejemplo
**Componente padre: formulario**
```html
    <form class="form-horizontal">
	<form-input v-model="user.id" titulo="Id" nombre="id"></form-input>
	<form-input v-model="user.name" titulo="Nombre" nombre="name"></form-input>
 	<form-input v-model="user.username" titulo="Username" nombre="username"></form-input>
 	<form-input v-model="user.email" titulo="E-mail" nombre="email"></form-input>
 	<form-input v-model="user.phone" titulo="Teléfono" nombre="phone"></form-input>
 	<form-input v-model="user.website" titulo="URL" nombre="website"></form-input>
 	<form-input v-model="user.companyName" titulo="Nombre de la empresa" nombre="nomEmpresa"></form-input>
    </form>
```

**Subcomponente: form-input**
```vue
<template>
  <div class="control-group">
    <label class="control-label" :for="nombre">{ { titulo }}</label>
    <div class="controls">
      <input :value="value" @input="updateValue($event.target.value)" type="text" :id="nombre" :name="nombre" placeholder="" class="form-control">
    </div>
  </div>	
</template>

<script>
export default {
  name: 'user-form-input',
  props: ['value', 'titulo', 'nombre'],
  methods: {
    updateValue(value) {
	this.$emit('input', value)
    }
  }
}
</script>
```

### Validación con Vee Validate
Si queremos utilizar Vee Validate en un formulario con los \<input> en componentes hijos la cosa se complica un poco porque la validación se hace en el componente padre mientras que los valores a validar y los errores se muestran en los hijos.

Podéis consultar [este ejemplo](https://codesandbox.io/s/2wyrp5z000?from-embed) para ver cómo hacerlo o leer [este articulo](https://medium.com/@logaretm/authoring-validatable-custom-vue-input-components-1583fcc68314) donde se explica detaladamente qué hacer.

## Slots
Ya vimos al hablar de la [comunicación entre componentes](./03_1-comunicar_componentes.html#slots) que un _slot_ es una ranura en un subcomponente que, al renderizarse, se rellena con lo que le pasa el padre.

Esto podemos usarlo en los formularios de forma que el \<input> con el v-model lo pongamos en un _slot_ de forma que está enlazado correctamente en el padre.

### Ejemplo
**Componente padre: formulario**
```html
    <form class="form-horizontal">
	<form-input titulo="Id">
            <input v-model="user.id" type="text" id="id" name="id" class="form-control" disabled>
	</form-input>
	<form-input titulo="Nombre">
	    <input v-model="user.name" type="text" id="name" name="name" class="form-control">
	</form-input>
 	<form-input titulo="Username">
	    <input v-model="user.username" type="text" id="username" name="username" class="form-control">
	</form-input>
 	<form-input titulo="E-mail">
            <input v-model="user.email" type="email" id="email" name="email" class="form-control">
	</form-input>
 	<form-input titulo="Teléfono">
            <input v-model="user.phone" type="text" id="phone" name="phone" class="form-control">
	</form-input>
 	<form-input titulo="URL">
	    <input v-model="user.website" type="text" id="website" name="website" class="form-control">
	</form-input>
 	<form-input titulo="Nombre de la empresa">
	    <input v-model="user.companyName" type="text" id="nomEmpresa" name="nomEmpresa" class="form-control">
	</form-input>
    </form>
```

**Subcomponente: form-input**
```vue
<template>
    <div class="control-group">
    <label class="control-label">{{ titulo }}</label>
        <div class="controls">
	    <slot>Aquí va un INPUT</slot>
        </div>
    </div>	
</template>

<script>
export default {
  name: 'user-form-input',
  props: ['value', 'titulo', 'nombre'],
  methods: {
    updateValue(value) {
      this.$emit('input', value)
    }
  }
}
</script>
```


