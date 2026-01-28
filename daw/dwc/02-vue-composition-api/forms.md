# Formularios en Vue
- [Formularios en Vue](#formularios-en-vue)
- [Introducción](#introducción)
  - [Utilizar diferentes tipos de inputs](#utilizar-diferentes-tipos-de-inputs)
    - [input normal](#input-normal)
    - [radio button](#radio-button)
    - [checkbox](#checkbox)
    - [checkbox múltiple](#checkbox-múltiple)
      - [Generar los checkbox automáticamente](#generar-los-checkbox-automáticamente)
    - [select](#select)
    - [Ejemplo](#ejemplo)
- [Validar formularios](#validar-formularios)
  - [Validar con VeeValidate y Yup](#validar-con-veevalidate-y-yup)
    - [Uso de _yup_](#uso-de-yup)
    - [Funciones útiles de vee-validate](#funciones-útiles-de-vee-validate)
    - [Cargar datos iniciales de una API](#cargar-datos-iniciales-de-una-api)
  - [Ejemplo](#ejemplo-1)
    - [Personalizar los mensajes de yup](#personalizar-los-mensajes-de-yup)
    - [Validación personalizada con yup](#validación-personalizada-con-yup)
- [Inputs en subcomponentes](#inputs-en-subcomponentes)
  - [v-model en subcomponente input](#v-model-en-subcomponente-input)
    - [Ejemplo](#ejemplo-2)
    - [Validación con Vee Validate](#validación-con-vee-validate)
  - [Slots](#slots)
    - [Ejemplo](#ejemplo-3)

# Introducción
Para poder tener sincronizado el formulario con nuestros datos utilizamos la directiva **v-model** en cada campo. Algunos modificadores útiles de _v-model_ son:
* **.lazy**: hace que _v-model_ sincronice al producirse el evento _change_ en vez del _input_, es decir, que no sincroniza con cada tecla que pulsemos sino cuando acabamos de escribir y salimos del input.
* **.number**: convierte automáticamente el valor introducido (que se considera siempre String) a Number
* **.trim**: realiza un trim() sobre el texto introducido

Vamos a ver cómo usar los diferentes tipos de campos con Vue.

## Utilizar diferentes tipos de inputs
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
Se trata de varios checkbox pero cuyos valores se guardan en el mismo campo, que debe ser un **array**. Le ponemos el **v-model** y el **value** que queramos que se guarde. La variable (en este ejemplo _user.ciclos_ será un array y guardará el value de cada checkbox marcado:
```html
<input type="checkbox" v-model="user.ciclos" value="smx">Sistemas Microinformáticos y Redes<br>
<input type="checkbox" v-model="user.ciclos" value="asix">Administración de Sistemas Informáticos y Redes<br>
<input type="checkbox" v-model="user.ciclos" value="dam">Desarrollo de Aplicaciones Multiplataforma<br>
<input type="checkbox" v-model="user.ciclos" value="daw">Desarrollo de Aplicaciones Web<br>
```
Si tenemos marcadas las casillas 1 y 3 el valor de _user.ciclos_ será \['smx', 'dam'].

#### Generar los checkbox automáticamente
Muchas veces las opciones a mostrar las tendremos en algún objeto (una tabla de la BBDD, ...). En ese caso podemos generar automáticamente un checkbox para cada elemento:
```javascript
ciclos: [
  {cod: 'smx', desc: 'Sist. Microinformáticos y Redes'},
  {cod: 'asix', desc: 'Adm. de Sistemas Informáticos y Redes'},
  {cod: 'dam', desc: 'Desar. de Aplicaciones Multiplataforma'},
  {cod: 'daw', desc: 'Desar. de Aplicaciones Web'},
]
```

```html
<div v-for="ciclo in ciclos" :key="ciclo.cod">
  <input type="checkbox" v-model="user.ciclos" :value="ciclo.cod">{ { ciclo.desc }}<br>
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
* [VeeValidate](https://vee-validate.logaretm.com/v4/guide/composition-api/getting-started/)
* [vuelidate](https://vuelidate.js.org/)
* [VueFormGenerator](https://github.com/vue-generators/vue-form-generator)
* ...

## Validar con VeeValidate y Yup
Una de las librerías más usadas para validar formularios en Vue es [VeeValidate](https://vee-validate.logaretm.com/v4/), donde podéis encontrar mucha información sobre su uso. Es una librería muy completa y permite hacer validaciones tanto síncronas como asíncronas. Para definir las reglas de validación podemos usar funciones propias o librerías como [yup](https://www.npmjs.com/package/yup), [zod](https://github.com/colinhacks/zod), [valibot](https://github.com/valibot/valibot), etc. que nos facilitan enormemente la tarea (también pueden usarse en Javascript Vanilla). Nosotros usaremos _yup_ que es una librería para crear esquemas de validación declarativos.

La forma de instalarla es
```[bash]
npm install -S vee-validate
npm install -S @vee-validate/yup
```

Yup permite definir un esquema de validación para los campos del formulario. Por ejemplo, para validar un email y una contraseña:
```javascript
import * as yup from 'yup';
const schema = yup.object({
  email: yup.string().required('El email es obligatorio').email('El email no es válido'),
  password: yup.string().required('La contraseña es obligatoria').min(8, 'La contraseña debe tener al menos 8 caracteres'),
});
```

Respcto a _vee-validate_ es quien se encarga de realizar la validación. Para usarlo en _Composition API_ debemos importar las funciones **_useForm_** y **_useField_** de `'vee-validate'`. La primera se encarga de configurar el formulario:
- recolecta los valores de los inputs en _values_
- valida los datos y crea los mensajes de error en _errors_
- gestiona los estados _validity_, _touched_ y _dirty_ de los campos del formulario
- gestiona tanto el envío (_handlesubmit_) como el reseteo (_resetForm_) del formulario
- asigna los valores iniciales a los campos del formulario (_initialValues_)

```javascript
const { handleSubmit, resetForm, errors, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    email: '',
    password: ''
  }
});
```

La segunda se encarga de definir cada campo del formulario, gestionando su estado y validación:
```javascript
const { value: email, errorMessage: emailError, handleBlur: emailBlur } = useField('email');
const { value: password, errorMessage: passwordError, handleBlur: passwordBlur } = useField('password');
```

Para gestionar el envío del formulario usaremos la función _handleSubmit_ que envuelve la función manejadora del evento `@submit` del formulario. Esta función recibe como parámetro un objeto _values_ con los valores de los inputs del formulario.

```javascript
const onSubmit = handleSubmit((values) => {
  console.log('Formulario válido:', values);
  // Aquí va tu lógica (API call, etc)
});
```

El _template_ del formulario quedaría así:
```html
  <form @submit="onSubmit">
    <div>
      <input v-model="email" type="text" placeholder="Email" />
      <span class="error">{{ errors.email }}</span>
    </div>
    
    <div>
      <input v-model="password" type="password" placeholder="Password" />
      <span class="error">{{ errors.password }}</span>
    </div>
    
    <button type="submit">Enviar</button>
    <button type="button" @click="resetForm">Limpiar</button>
  </form>
```

### Uso de _yup_
Ya hemos visto lo sencillo que es definir un esquema de validación con _yup_: para cada campo se indica el tipo de dato y las reglas de validación que debe cumplir. Como parámetro de cada regla podemos pasarle un mensaje de validación personalizado o dejar el que viene por defecto. Por ejemplo:
```javascript
import * as yup from 'yup';
const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required('La contraseña es obligatoria').min(8).max(20, 'La contraseña no puede tener más de 20 caracteres'),
});
```

Algunos ejemplos típicos de campos a validar serían:
```javascript
const schema = yup.object({
  // String
  nombre: yup.string()
    .required('Campo obligatorio')
    .min(2, 'Mínimo 2 caracteres')
    .max(50, 'Máximo 50 caracteres'),
  
  // Email
  email: yup.string()
    .required('Email obligatorio')
    .email('Email no válido'),
  
  // Number
  edad: yup.number()
    .required('Edad obligatoria')
    .min(18, 'Debes ser mayor de 18')
    .max(100, 'Edad no válida')
    .integer('Debe ser un número entero')
    .typeError('Debe ser un número'),
  
  // Boolean
  terminos: yup.boolean()
    .required('Debes aceptar los términos')
    .oneOf([true], 'Debes aceptar los términos'),
  
  // Select (oneOf)
  pais: yup.string()
    .required('País obligatorio')
    .oneOf(['ES', 'FR', 'IT'], 'País no válido'),
  
  // URL
  web: yup.string()
    .url('URL no válida')
    .nullable(),
  
  // Fecha
  fechaNacimiento: yup.date()
    .required('Fecha obligatoria')
    .max(new Date(), 'No puede ser futura'),
  
  // Pattern (regex)
  telefono: yup.string()
    .matches(/^[0-9]{9}$/, 'Debe tener 9 dígitos'),
  
  // Opcional
  comentarios: yup.string()
    .notRequired()
    .max(500, 'Máximo 500 caracteres')
});
```

También podemos hacer validaciones condicionales o dependientes de otros campos:
```javascript
const schema = yup.object({
  tieneEmpresa: yup.boolean(),
  
  // Campo requerido solo si tieneEmpresa es true
  nombreEmpresa: yup.string().when('tieneEmpresa', {
    is: true,
    then: (schema) => schema.required('Nombre de empresa obligatorio'),
    otherwise: (schema) => schema.notRequired()
  }),
  
  // Validación dependiente de otro campo
  password: yup.string().required().min(6),
  confirmPassword: yup.string()
    .required('Confirma tu password')
    .oneOf([yup.ref('password')], 'Las passwords no coinciden')
});
```

También podemos personalizar la validación a hacer, e incluso usar funciones asíncronas:
```javascript
const schema = yup.object({
  username: yup.string()
    .required('Username obligatorio')
    .test('username-disponible', 'Username no disponible', async (value) => {
      if (!value) return true;
      // Llamada a API para verificar
      const response = await fetch(`/api/check-username/${value}`);
      const data = await response.json();
      return data.available;
    })
});
```

### Funciones útiles de vee-validate
`useForm` proporciona varias funciones útiles para gestionar el formulario:
- `handleSubmit`: Función de envío del formulario, manejando la validación
- `resetForm`: Resetea el formulario a sus valores iniciales
- `values`: Objeto con los valores actuales de los campos del formulario
- `setValues`: Permite establecer los valores de los campos del formulario programáticamente
- `setFieldValue`: Permite establecer el valor de un campo específico
- `resetField`: Resetea un campo específico a su valor inicial
- `errors`: Objeto con los mensajes de error actuales de los campos del formulario
- `setErrors`: Permite establecer errores personalizados en los campos del formulario
- `setFieldError`: Permite establecer un error personalizado en un campo específico
- `validate`: Valida todos los campos del formulario manualmente
- `validateField`: Valida un campo específico manualmente
- `touched`, `dirty`: Objeto que indica qué campos han sido tocados, han sido modificados
- `meta`: Metadata del formulario (touched, dirty, valid)
- `setFieldTouched`, `setFieldDirty`: Marca un campo como "tocado" (interactuado), "sucio" (modificado)
- `submitCount`: Número de veces que se ha intentado enviar el formulario
- `isSubmitting`: Indica si el formulario se está enviando actualmente
- `isValid`: Indica si el formulario es válido actualmente

Respecto a `useField` tenemos entre otras las siguientes funciones y propiedades:
- `value`: Valor actual del campo
- `errorMessage`: Mensaje de error actual del campo
- `meta`: Metadata del campo (touched, dirty, valid)
- `handleBlur`, `handleChange`: Función para manejar el evento blur del campo, el evento change del campo
- `setValue`: Permite establecer el valor del campo
- `setError`: Permite establecer un error personalizado en el campo
- `resetField`: Resetea el campo a su valor inicial
- `validate`: Valida el campo manualmente
- `initialValue`: Valor inicial del campo
- `dirty`: Indica si el campo ha sido modificado
- `touched`: Indica si el campo ha sido interactuado
- `setTouched`, `setDirty`: Marca el campo como "tocado" (interactuado), "sucio" (modificado)
- `valid`: Indica si el campo es válido actualmente
- `validated`: Indica si el campo ha sido validado al menos una vez
- `resetMeta`: Resetea la metadata del campo (touched, dirty, valid)
- `setInitialValue`: Permite establecer el valor inicial del campo programáticamente
- `setMeta`: Permite establecer la metadata del campo programáticamente
- `validateOnMount`: Indica si el campo debe validarse al montarse
- `validateOnValueUpdate`: Indica si el campo debe validarse al actualizar su valor
- `validateOnBlur`: Indica si el campo debe validarse al perder el foco
- `validateOnChange`: Indica si el campo debe validarse al cambiar su valor
- `validateOnInput`: Indica si el campo debe validarse al recibir entrada del usuario
- `bails`: Indica si la validación debe detenerse en el primer error encontrado
- `lazy`: Indica si la validación debe ser perezosa (no automática)
- `debounce`: Tiempo en milisegundos para debilitar la validación automática
- `name`: Nombre del campo
- `type`: Tipo del campo (text, checkbox, radio, etc.)
- `rules`: Reglas de validación del campo
- `as`: Elemento HTML o componente Vue que representa el campo (input, select, textarea, etc.)
- `label`: Etiqueta del campo, usada en mensajes de error
- `schema`: Esquema de validación del campo

### Cargar datos iniciales de una API
Si queremos cargar datos iniciales en el formulario desde una API podemos usar la función `setValues` proporcionada por `useForm`. Por ejemplo, si queremos cargar los datos de un usuario al montar el componente:

```javascript
import { onMounted } from 'vue';

const { setValues } = useForm({ validationSchema: schema });

onMounted(async () => {
  // Cargar datos de una API
  const response = await fetch('/api/user/123');
  const userData = await response.json();
  
  // Establecer valores en el formulario
  setValues({
    nombre: userData.nombre,
    email: userData.email,
    edad: userData.edad,
    genero: userData.genero
  });
});
```

## Ejemplo
Vamos a ver una ejemplo completo de un formulario con validación usando _VeeValidate_ y _yup_. Se trata de un formulario de registro con los campos: nombre, email, edad, género y aceptar términos.

```vue
<script setup>
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

// Schema de validación
const schema = yup.object({
  nombre: yup.string().required('El nombre es obligatorio').min(2, 'Mínimo 2 caracteres'),
  email: yup.string().required('El email es obligatorio').email('Email inválido'),
  edad: yup.number()
    .required('La edad es obligatoria')
    .min(18, 'Debes ser mayor de 18')
    .typeError('Debe ser un número'),
  genero: yup.string().required('El género es obligatorio'),
  terminos: yup.boolean().oneOf([true], 'Debes aceptar los términos')
});

// Configurar formulario
const { handleSubmit, resetForm, errors, meta } = useForm({
  validationSchema: schema
});

// Campos
const { value: nombre } = useField('nombre');
const { value: email } = useField('email');
const { value: edad } = useField('edad');
const { value: genero } = useField('genero');
const { value: terminos } = useField('terminos');

// Submit
const onSubmit = handleSubmit(async (values) => {
  console.log('Enviando datos:', values);
  try {
    // await api.register(values);
    alert('Registro exitoso!');
    resetForm();
  } catch (error) {
    console.error('Error:', error);
  }
});
</script>

<template>
  <div class="form-container">
    <form @submit="onSubmit">
      <h2>Registro de usuario</h2>

      <!-- Nombre -->
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input 
          id="nombre" 
          v-model="nombre" 
          type="text" 
          :class="{ 'input-error': errors.nombre }"
        />
        <span v-if="errors.nombre" class="error">{{ errors.nombre }}</span>
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="email">Email:</label>
        <input 
          id="email" 
          v-model="email" 
          type="email" 
          :class="{ 'input-error': errors.email }"
        />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
      </div>

      <!-- Edad -->
      <div class="form-group">
        <label for="edad">Edad:</label>
        <input 
          id="edad" 
          v-model="edad" 
          type="number" 
          :class="{ 'input-error': errors.edad }"
        />
        <span v-if="errors.edad" class="error">{{ errors.edad }}</span>
      </div>

      <!-- Género (Radio buttons) -->
      <div class="form-group">
        <label>Género:</label>
        <div class="radio-group">
          <label>
            <input type="radio" v-model="genero" value="masculino" />
            Masculino
          </label>
          <label>
            <input type="radio" v-model="genero" value="femenino" />
            Femenino
          </label>
          <label>
            <input type="radio" v-model="genero" value="otro" />
            Otro
          </label>
        </div>
        <span v-if="errors.genero" class="error">{{ errors.genero }}</span>
      </div>

      <!-- Términos (Checkbox) -->
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="terminos" />
          Acepto los términos y condiciones
        </label>
        <span v-if="errors.terminos" class="error">{{ errors.terminos }}</span>
      </div>

      <!-- Botones -->
      <div class="form-actions">
        <button type="submit" :disabled="!meta.valid">Registrar</button>
        <button type="button" @click="resetForm">Limpiar</button>
      </div>

      <!-- Estado del formulario (solo para debug) -->
      <div class="debug" v-if="false">
        <p>Valid: {{ meta.valid }}</p>
        <p>Dirty: {{ meta.dirty }}</p>
        <p>Touched: {{ meta.touched }}</p>
      </div>
    </form>
  </div>
</template>
```

### Personalizar los mensajes de yup
Para personalizar un mensaje de error de un campo sólo tenemos que indicar el mensaje al definir la regla del campo:
```javascript
const mySchema = yup.object({
  email: yup.string().required('El email es obligatorio').email(),
  password: yup.string().required().min(8, 'La contraseña debe tener al menos 8 caracteres'),
})
```

En este caso hemos personalizado el mensaje del _email_ si no contiene nada y del _password_ si no cumple el _min_.

Si queremos personalizar todos los mensajes de error debemos definir un objeto con los nuevos mensajes. Las validaciones no incluidas mantendrán el mensaje original. Ejemplo:
```javascript
import * as yup from 'yup';
import { setLocale } from 'yup';
setLocale({
  mixed: {
    default: 'Campo no válido',
    required: 'El campo ${path} no puede estar vacío'
  },
  string: { // sólo las reglas 'min' de campos 'string'
    min: 'El campo ${path} debe tener al menos ${max} caracteres'
  },
  number: { // sólo las reglas 'min' de campos 'number'
    min: 'El valor del campo debe ser mayor que ${min}',
  },
});
```

### Validación personalizada con yup
Si lo que queremos validar no lo hace ningún validador de _yup_ podemos crear nuestra propia regla usando el validador `test()` que como 1º parámetro recibe el nombre de la regla, como 2º el mensaje de error a mostrar y como 3º una función que recibe el valor del campo y devolverá _true/false_ indicando si es válido o no. Por ejemplo el campo _seed_ debe ser múltiplo de 7:

```javascipt
const mySchema = yup.object({
  seed: yup.number().required().test('seven-multiplo', 'El valor debe ser múltiplo de 7', (value) => {
    return !(value % 7)
  },
  ...
})
```

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
<form-input v-model="campo"></form-input> 
```
* en el subcomponente del inpit ponemos 
  * un _v-bind_ que muestre el valor inicial
  * un _v-on:input_ que emita un evento _input_ al padre pasándole el valor actual 

```html
<template>
  <div class="control-group">
    <!-- id -->
    <label class="control-label" :for="nombre">{ { titulo }}</label>
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
    <label class="control-label">{ { titulo }}</label>
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
