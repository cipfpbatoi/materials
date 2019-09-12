<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
Tabla de contenidos

- [Formularios en Vue](#formularios-en-vue)
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
    - [Validación al enviar](#validaci%C3%B3n-al-enviar)
    - [Reglas de validación](#reglas-de-validaci%C3%B3n)
    - [Personalizar los mensajes](#personalizar-los-mensajes)
    - [Validadores personalizados](#validadores-personalizados)
- [Inputs en subcomponentes](#inputs-en-subcomponentes)
  - [v-model en subcomponente input](#v-model-en-subcomponente-input)
    - [Ejemplo](#ejemplo-1)
    - [Validación con Vee Validate](#validaci%C3%B3n-con-vee-validate)
  - [Slots](#slots)
    - [Ejemplo](#ejemplo-2)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Formularios en Vue
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
* [VeeValidate](http://vee-validate.logaretm.com/)
* [vuelidate](https://github.com/monterail/vuelidate)
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
La importaremos en el fichero principal de nuestra aplicación, _main.js_ y la declaramos:
```javascript
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate)
```
Esto nos permitirá usarla en cualquier componente.

También es posible usarla directamente desde un CDN:
```html
<script src="https://unpkg.com/vee-validate@latest"></script>
<script>
  Vue.use(VeeValidate);
</script>
```

### Uso básico de VeeValidate
Simplemente añadimos a cada input la directiva **v-validate** donde indicamos el tipo de validación a hacer. Podemos mostrar los mensajes de error junto al input (el input debe tener un atributo __name__ que es la clave por la que buscamos los errores):

```html
<input v-validate="'required|email'" name="email" type="text" :class="{'has-errors': errors.has('email')}">
<span>{ { errors.first('email') }}</span>
```
Estamos indicando que debe cumplir las validaciones _required_ (no puede estar vacío) y _email_ (debe parecer un e-mail). También puede ponerse en formato de objeto:

```html
<input v-validate="{required: true, email: true}" name="email" type="text">
```

Código: 

<script async src="//jsfiddle.net/juansegura/bsn5Lkzq/4/embed/"></script>

### Validación al enviar
Antes de enviar el formulario conviene validar todos los campos y no enviarlo si hay errores (otra posibilidad sería activar el botón de _Enviar_ sólo cuando no hubieran errores). Para ello:
* establecemos la función que se encargará del _submit_ del formulario pero sin que se envíe (_.prevent_)

```html
<form @submit.prevent="checkForm">
```

* la función le dice a la librería que valide todo llamando al método **validateAll()**. Este método devuelve una promesa (asíncrona, como una petición Ajax) cuyo resultado será _true_ si el formulario és válido o _false_ si no lo es:
```javascript
checkForm() {
  this.$validator.validateAll()
    .then(result=>{
      if (result) {
        // Todo correcto.Procedo al envío
	alert('From Submitted!');
        return;
      } else {
        // Hay errores
      }
    })
    .catch(result=>console.error(result))
},
```

### Reglas de validación
En la documentación de la librería podemos consultar las diferentes [reglas de validación](https://baianat.github.io/vee-validate/guide/rules.html) (hay más de 30). Algunas de las más comunes son:
* _required_: no puede estar vacío ni valer _undefined_ o _null_
* tipos de datos: _alpha_ (sólo caracteres alfanuméricos), _alpha_num_ (alfanuméricos o números), _numeric_, _integer_, _decimal_ (se especifica cuántos decimales), _email_, _url_, _date\_format_ (se especifica el formato), _ip_, ...
* _min_:4 (longitud mínima 4), _max_:50
* _min_value_:18 (debe ser un nº >= 18), _max_value_:65
* _between_:18:65, _date\_detween_, _in_:1,2,3, _not\_in:1,2,3, ...
* _regex_: debe concordar con la expresión regular pasada
* _is_ compara un campo con otro:
```html
<input v-validate="{ is: confirmation }" type="text" name="password">
<input v-model="confirmation" type="text" name="password_confirmation">
```
* ficheros: _mimes_, _image_, _size_

**Ejemplo**
Vamos a ver cómo se validaría el formulario anterior con esta librería:
* nombre: `<input v-validate="'required|min:5|max:50'" name="nombre" ...`
* e-mail: `<input v-validate="'required|email'" name="email" ...`
* sexo: `<input type="radio" v-validate="'required|in:H,M'" value="H" name="sexo" ...`
* acepto: `<input v-validate="'required'" name="acepto" type="checkbox" ...`

<script async src="//jsfiddle.net/juansegura/bsn5Lkzq/embed/"></script>

### Personalizar los mensajes
Por defecto el idioma de los mensajes de Vee Validate es el inglés pero podemos cambiarlo. Además la validación se produce con el evento 'input' (cada vez que pulsamos una tecla) pero muchas veces preferimos validar al salir del campo (evento 'blur'). Para cambiar esto haremos:
```javascript
import VeeValidate, {Validator} from 'vee-validate'
import es from 'vee-validate/dist/locale/es'

const Veeconfig = {
  locale: 'es_ES',
  events: 'blur'
};

  Validator.localize({ es_ES: es});

  Vue.use(VeeValidate, Veeconfig)
```

Lo que hemos hecho es:
* al importar VeeValidate lo hacemos también como el objeto _Validator_ para poder invocar su método _localize_
* importamos la librería con los mensajes del idioma que queremos
* creamos un objeto para configurar el idioma y el evento que lanzará el validador
* asignamos al idioma seleccionado la librería importada
* al decir a Vue que use VeeValidate le pasamos el objeto con la configuración a usar

También podemos personalizar los mensajes del validador, para lo que construiremos un diccionario personalizado con los mensajes que queramos personalizar (podemos ponerlos en varios idiomas) y lo añadiremos al diccionario de la librería:
```javascript
const dictionary = {
  es: {
    messages:{
      required: (field, args) => 'El campo '+field+' es obligatorio'
      min: (field, args) => 'El campo '+field+' debe contener al menos '+args[0]+' caracteres',
    }
  },
  ca: {
    messages: {
      required: (field, args) => 'El camp '+field+' és obligatori'
      min: (field, args) => 'El camp '+field+' ha de tindre al menys '+args[0]+' caracteres',
    }
  }
};

Validator.localize({ es_ES: es});
Validator.localize(dictionary)  // añadimos nuestro diccionario

Vue.use(VeeValidate, Veeconfig)
```

### Validadores personalizados
Para acabar el ejemplo del formulario anterior nos falta validar que deba seleccionar entre 1 y 3 ciclos. 

Para validar los ciclos vamos a construir nuestro propio validador personalizado al que llamaremos **arraylength**:
```html
      <div v-for="ciclo in ciclos" :key="ciclo.cod">
        <input v-validate="'arraylenght:1-3'" name="ciclos" type="checkbox" v-model="user.ciclos" :value="ciclo.cod">{{ ciclo.desc }}<br>
      </div>
```
Al validador le va a llegar como parámetro lo que se escriba tras el carácter '**:**', en este caso _1-3_.

Ahora construimos nuestro validador personalizado:
```javascript
import { Validator } from 'vee-validate';

Validator.extend('arraylenght', {
  getMessage(field, args) {
    // will be added to default locale messages.
    // Returns a message.
    let limits=args[0].split('-');
    return('Debes marcar entre '+limits[0]+' y '+limits[1]+' '+field);
  },
  validate(value, args) {
    // Returns a Boolean or a Promise that resolves to a boolean.
    let limits=args[0].split('-');
    return (value.length>=limits[0] && value.length<=limits[1]);
  }
});
```

El validador debe tener un nombre (_arraylenght_) y 2 métodos:
* _getMessage_: recibe el nombre del campo (_field_) y una cadena con el parámetro pasado (_args_) y devuelve una cadena que será lo que se añadirá a los errores si el campo no es válido
* _validate_: recibe el valor del campo (el valor de la variable vinculada a él en el _v-model_) y la cadena con el parámetro pasado (_args_). Esta función determina si el campo es o no válido devolviendo _true_ si el campo es válido o _false_ si no lo es.

Código:

<script async src="//jsfiddle.net/juansegura/bsn5Lkzq/6/embed/"></script>

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
    <label class="control-label" :for="nombre">{{ titulo }}</label>
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


