
# Formularios en Vue
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
Tabla de contenidos

- [Introducción](#introducción)
  - [Validar diferentes tipos de inputs](#validar-diferentes-tipos-de-inputs)
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
    - [Idioma de los mensajes](#idioma-de-los-mensajes)
    - [Crear nuevas reglas de validación](#crear-nuevas-reglas-de-validaci%C3%B3n)
    - [Parámetros de las reglas](#parámetros-de-las-reglas)
    - [Estados de validación](#estados-de-validación)
    - [Validar al enviar el formulario](#validar-al-enviar-el-formulario)
    - [Validación del lado del servidor](#validaci%C3%B3n-del-lado-del-servidor)
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

## Validar diferentes tipos de inputs
Podemos probar el resultado en la [documentación de Vue](https://v3.vuejs.org/guide/forms.html).

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
  <input type="checkbox" v-model="user.ciclosImparte" :value="ciclo.cod">{ { ciclo.desc }}<br>
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
    { { ciclo.desc }}
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
_VeeValidate_ es una librería que permite validar formularios de una manera más sencilla. Para ello incluye 2 componentes:
- **ValidationProvider**: para validar cada \<INPUT> lo pondremos dentro de este componente, así como el elemento en el que se mostrarán los mensajes del validador
- **ValidationObserver**: este componente valida un formulario completo y dentro de él es donde pondremos el elemento \<FORM> a validar

Por tanto cada INPUT estará dentro de su _ValidationProvider_ y el formulario entero dentro de un _ValidationObserver_.

### Instalación
Vamos a ver cómo usar este librería en Vue2. En Vue3 es incluso más sencillo (tenéis todo explicado en la [documentación de VeeValidate](https://vee-validate.logaretm.com/v4/)).

Como esta librería vamos a usarla en producción la instalaremos como dependencia del proyecto:
```[bash]
npm install vee-validate -S
```

Para usarla en el componente que contenga un formulario debemos importar los componentes que vayamos a usar (_ValidationProvider_ y, si es necesario, _ValidationObserver_) y registrarlo. Además deberemos importar y configurar cada regla que queramos aplicar a nuestros INPUT:
```javascript
import { ValidationProvider } from 'vee-validate';
// Ahora importamos las reglas que queramos usar, en este caso 'required'
import { extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

// Registramos las reglas a usar:
extend('required', required);
// o podemos 'personalizarlas (en este ejemplo estamos personalizando el mensaje de error)
extend('max', {
  ...max,
  message: 'Has superado el máximo de caracteres permitidos para este campo'
});

export default {
  components: {
    ValidationProvider
  },
  ...
```

Otra opción es importarlo en el fichero principal de nuestra aplicación, _main.js_ para poder usarlo en cualquier componente:
```javascript
import { ValidationProvider } from 'vee-validate';

Vue.component('ValidationProvider', ValidationProvider);
```

y también es posible usarlo directamente desde un CDN:
```html
<script src="https://unpkg.com/vee-validate@latest"></script>
<script>
  Vue.component('validation-provider', VeeValidate.ValidationProvider);
</script>
```

### Uso básico de VeeValidate
Cada input a validar los envolveremos en una etiqueta `<validation-provider>` a la que aplicamos las reglas que deba cumplir:
```javascript
<validation-provider rules="required" v-slot="{ errors }" name="myinput">
  <input v-model="value" type="text">
  <span>{ { errors[0] }}</span>
</validation-provider>

<validation-provider v-slot="{ errors }" rules="required|email" name="mail">
    <label>e-mail: </label>
    <input type="text" v-model="mail">
    <span> { { errors[0] }}</span>
</validation-provider>
```

**OJO**: Si ponemos varias reglas como en el ejemplo irán separadas por el carácter **\|** pero SIN ESPACIOS entre ellas.

La validación se efectúa tras cada modificación del campo (es decir, tras pulsar cada tecla). Si queremos que no se haga hasta salir del campo le añadiremos al _ValidationProvider_ el atributo `mode="lazy"`.

**NOTA**: para que se apliquen las reglas los inputs deben tener **v-model**.

Podemos ver todas las [reglas disponibles](https://logaretm.github.io/vee-validate/guide/rules.html#rules) en la documentación de Vee Validate. Algunas de las más comunes son:
* _required_: no puede estar vacío ni valer _undefined_ o _null_
* tipos de datos: _alpha_ (sólo caracteres alfanuméricos), _alpha_num_ (alfanuméricos o números), _numeric_, _integer_,  _email_, ...
* _min_:4 (longitud mínima 4), _max_:50
* _min_value_:18 (debe ser un nº >= 18), _max_value_:65
* _between_:18:65, _date\_detween_, _in_:1,2,3, _not\_in:1,2,3, ...
* _regex_: debe concordar con la expresión regular pasada
* _is_ compara un campo con otro:
* ficheros: _mimes_, _image_, _size_

Las más comunes de estas reglas (required, min, max, email, ...) pueden ser registradas por Vee directamente desde los atributos del INPUT (required, minlength, ...) sin necesidad de definir un atributo `rules` en el ValidatorProvider.

### Personalizar el mensaje del validador
Para personalizar el mensaje simplemente lo indicamos en el _extend_, por ejemplo para personalizar el mensaje de la regla _required_ haremos:
```javascript
// Override the default message.
extend('required', {
  ...required,
  message: 'Este campo es obligatorio'
});
```

En el mensaje podemos usar 3 variables:
- \_field\_: el nombre del campo (definido por el atributo _name_ del ValidationProvider o, si no lo tiene, por el atributo _name_ o _id_ del input que contiene)
- \_value\_: el valor actual del campo
- \_rule\_: el nombre de la regla de validación que se está aplicando

Por ejemplo el mensaje del required podría ser:
```javascript
  message: 'El campo {_field_} es obligatorio según especifica la regla {_rule_}'
```

### Idioma de los mensajes
Por defecto los mensajes aparecen en inglés pero podemos usar otro de los más de 40 idiomas que incluye Vee o crear nuestros propios mensajes. Para incluir otro fichero de idioma haremos:
```javascript
import { localize } from 'vee-validate';
import es from 'vee-validate/dist/locale/es.json';

localize('es', es);
```

Podemos usar varios ficheros importando cada uno y declarándolos con `localize({es, en});`.

Y si queremos podemos personalizar fácilmente esos mensajes:
```javascript
import { localize } from 'vee-validate';

localize({
  es: {
    messages: {
      required: 'Debes introducir algo en este campo',
      min: 'El mínimo de caracteres de este campo es de {length}',
    }
  }
});
```

Tenéis toda la información en la [documentación de VeeValidate](https://logaretm.github.io/vee-validate/guide/localization.html).

### Crear nuevas reglas de validación
Para crear una nueva regla de validación personalizada simplemente le damos un nombre y definimos la función validadora, que devolverá _true_ si el valor es válido o _false_ si no lo es, por ejemplo:
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
  params: ['length'],
  message: 'El campo {_field_} debe tener al menos {length} caracteres'
});
```

Podríamos crear una regla personalizada a la que tengamos que pasarle parámetros, por ejemplo haremos un _entre_ a la que le pasamos la longitud mínima y máxima de un campo (`rules="entre:4:12"`):
```javascript
extend('entre', {
  validate: (value, { min, max}) => {
      return value.length >= min && value.length <= max;
  },
  params: ['min', 'max'],
  message: 'El campo {_field_} debe tener como mínimo {min} caracteres y como máximo {max}'
});
```

### Estados de validación
Cada _ValidationProvider_ tiene una serie de _flags_ que definen [en qué estado se encuentra](https://vee-validate.logaretm.com/v3/guide/state.html) la validación del campo. Algunos de los más comunes son:
- **valid** / **invalid**: indica que el campo es válido/inválido
- **touched** / **untouched**: indica si el campo ha tenido o no el foco (si se ha entrado en él)
- **pristine** / **dirty**: indica que el valor del campo no/sí se ha cambiado

Podemos hacer que se le pongan automáticamente al input ciertas clases en función de su estado:
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
El componente _ValidationProvider_ se encarga de validar cada input individualmente. El componente _ValidationObserver_ controla el estado de todos los _ValidationProvider_ que se encuentren dentro de él.

Nunca debemos enviar un formulario inválido y para evitarlo podemos deshabilitar el botón de 'Enviar' hasta que el formulario sea válido y/o forzar la validación del mismo al eviarlo.

Para deshabilitar el botón de enviar obtendremos del componente _ValidationObserver_ información sobre la validez del formulario:
```html
<template>
  <ValidationObserver v-slot="{ invalid }">
    <form @submit.prevent="onSubmit">
      <ValidationProvider name="E-mail" rules="required|email" v-slot="{ errors }">
        <input v-model="email" type="email">
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      <ValidationProvider name="First Name" rules="required|alpha" v-slot="{ errors }">
        <input v-model="firstName" type="text">
        <span>{{ errors[0] }}</span>
      </ValidationProvider>

      <button type="submit" :disabled="invalid">Submit</button>
    </form>
  </ValidationObserver>
</template>
```

Si lo que queremos es que no se ejecute la función del _submit_ si el formulario no es válido haremos:
```html
<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(onSubmit)">
      <ValidationProvider name="E-mail" rules="required|email" v-slot="{ errors }">
        <input v-model="email" type="email">
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      <ValidationProvider name="First Name" rules="required|alpha" v-slot="{ errors }">
        <input v-model="firstName" type="text">
        <span>{{ errors[0] }}</span>
      </ValidationProvider>

      <button type="submit">Submit</button>
    </form>
  </ValidationObserver>
</template>
```

Encontramos más información de cómo hacer validar formularios en la [documentación de vee-validate](https://vee-validate.logaretm.com/v3/guide/forms.html) en la documentación de Vee Validate.

### Validación del lado del servidor
En ocasiones hay validaciones que obligatoriamente debe hacer el servidor, como comprobar si un nombre de usuario ya existe. Podemos integrar fácilmente los errores devueltos por el servidor en _VeeValidate_. Para ello sólo necesitamos que el servidor devuelva los errores deontro de un objeto cuyas propiedades deben coincidir con el _name_ o el _vid_ de los campos del formulario ya que _VeeValidate_ proporciona el método _setErrors_ que automáticamente asigna cada error del objeto devuelto por el servidor al campo correspondiente. Ejemplo:

```html
<template>
  <ValidationObserver ref="form" v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(onSubmit)">
      <ValidationProvider vid="email" name="E-mail" rules="required|email" v-slot="{ errors }">
        <input v-model="email" type="email">
        <span>{{ errors[0] }}</span>
      </ValidationProvider>

      <ValidationProvider vid="password" name="Password" rules="required" v-slot="{ errors }">
        <input v-model="password" type="password">
        <span>{{ errors[0] }}</span>
      </ValidationProvider>

      <button type="submit">Sign up</button>
    </form>
  </ValidationObserver>
</template>
```

```javascript
<script>
export default {
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    onSubmit () {
      axios.post('http://localhost:3000/users', { email, password }
      .then(response => {
        if (response.errors) {
	  this.$refs.form.setErrors(response.errors);
	} else {
	  // todo ha ido bien
	}
      })
    }
  }
};
</script>
```

NOTA: `this.$refs.form` hace referencia al ValidationObserver, para lo que se le ha añadido `ref=form`

Podéis encontrar toda la información y ejemplos en ela [documentación de _VeeValidate_](https://vee-validate.logaretm.com/v3/advanced/server-side-validation.html).

# Inputs en subcomponentes
La forma enlazar cada input con su variable correspondiente es mediante la directiva _v-model_ que hace un enlace bidireccional: al cambiar la variable Vue cambia el valor del input y si el usuario cambia el input Vue actualiza la variable automáticamente.

El problema lo tenemos si hacemos que los inputs estén en subcomponentes. Si ponemos allí el _v-model_ al escribir en el _input_ se modifica el valor de la variable en el subcomponente (que es donde está el _v-model_) pero no en el padre. 

Para solucionar este problema tenemos 2 opciones: imitar nosotros en el subcomponente lo que hace _v-model_ o utilizar _slots_.

## v-model en subcomponente input
Como los cambios en el subcomponente no se transmiten al componente padre hay que emitir un evento desde el subcomponente que escuche el padre y que proceda a hacer el cambio en la variable.

La solución es imitar lo que hace un _v-model_ que en realidad está formado por:
* un _v-bind_ para mostrar el valor inicial en el input
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
Esto mismo podemos hacer si estamos usando _VeeValidate_ para validar nuestro formulario. Tenemos toda la información en la [documentación oficial](https://vee-validate.logaretm.com/v3/advanced/refactoring-forms.html).

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


