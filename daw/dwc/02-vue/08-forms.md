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
  - [Validar con VeeValidate](#validar-con-veevalidate)
    - [Validar otros inputs](#validar-otros-inputs)
    - [Usar un _schema_](#usar-un-schema)
    - [Validar con vee-validate y yup](#validar-con-vee-validate-y-yup)
    - [Personalizar los mensajes de yup](#personalizar-los-mensajes-de-yup)
    - [Validación personalizada con yup](#validación-personalizada-con-yup)
- [Inputs en subcomponentes](#inputs-en-subcomponentes)
  - [v-model en subcomponente input](#v-model-en-subcomponente-input)
    - [Ejemplo](#ejemplo-1)
    - [Validación con Vee Validate](#validación-con-vee-validate)
  - [Slots](#slots)
    - [Ejemplo](#ejemplo-2)

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
* [VeeValidate](https://logaretm.github.io/vee-validate/)
* [vuelidate](https://vuelidate.js.org/)
* [VueFormGenerator](https://github.com/vue-generators/vue-form-generator)
* ...

## Validar con VeeValidate
Tenéis toda la información así como un tutorial de cómo usar este librería en la [documentación de VeeValidate](https://vee-validate.logaretm.com/v4/)).

La forma de instalarla es
```[bash]
npm install vee-validate -S
```

Y para usarla simplemente cambiaremos la etiqueta `<input>` por el componente `<Field>` y la etiqueta `<form>` por el componente `<Form>` pero quitándole el modificador `.prevent` del escuchador `@submit` y haciendo que la función manejadora reciba un parámetro llamado _values_ que es un objeto con los valores de los _inputs_ del formulario.

Cada componente _Field_ necesitará un atributo `name` que es el nombre del campo con el valor de ese _input_ dentro del objeto _values_. Si el formulario es sólo para recoger datos, no para modificar datos existentes no necesitamos la directiva `v-model` porque sus valores se guardarán en el objeto _values_ que recibe la función manejadora del `@submit`. Sin embargo si debe mostrar datos que pueden cambiar tras la carga del componente mantendremos el atributo `v-model` (como en la práctica que estamos haciendo, que si nos pasan una _id_ cargamos el libro con dicha id y lo mostramos en el formlario para editarlo). 

Para validar un campo se le añade al componente un atributo `:rules` con la función a ejecutar, que devolverá el mensaje a mostrar en caso de error o _true_ si es correcto. El mensaje se mostrará en un componente llamado `ErrorMessage` (que deberemos importar y registrar) cuyo atributo `name` debe ser igual al del campo a validar. Si alguna de las funciones de validación no devuelve _true_ no se ejecuta la función manejadora del _submit_.

Habrá que importar los componentes de`'vee-validate'` que se usen (_Form_, _Field_, _ErrorMessage_) y registrarlos.

Si no usamos `v-model` podemos darle un valor por defecto a los inputs (por ejemplo, si estamos editando un objeto que ya tiene valores) pasándole el objeto con los valores al componente `<Form>` en un atributo llamado `initial-values`. Pero si cambien esos valores tras cargar el componente no se reflejarán los cambios (para ello debemos usar `v-model`).

Por ejemplo si estamos editando el objeto
```javascript
product = {
  name: 'Ratón óptico',
  price: '8.95'
}
```

el formulario sería:
```html
  <Form :initial-values="product" @submit="onSubmit">
    <Field name="name" type="text" />
    <ErrorMessage name="name" />

    <Field name="price" type="text" />
    <ErrorMessage name="price" />
    
    <button type="submit">Guardar</button>
  </Form>
```

Si el objeto _product_ está vacío el formulario aparecerá en blanco pero si contiene datos se mostrarán en el formulario. Sin embargo si modificamos los datos de _product_ esos cambios no se reflejan en el formlario a menos que usemos `v-model`.

A continuación tenéis un ejemplo completo de un formulario para validar un email y una contraseña (Fuente [https://codesandbox.io/s/vee-validate-basic-example-nc7eh?from-embed=&file=/src/App.vue](https://codesandbox.io/s/vee-validate-basic-example-nc7eh?from-embed=&file=/src/App.vue)):
```vue
<template>
  <div id="app">
    <Form @submit="onSubmit">
      <Field name="email" type="email" :rules="validateEmail" />
      <ErrorMessage name="email" />

      <Field name="password" type="password" :rules="validatePassword" />
      <ErrorMessage name="password" />

      <button>Sign up</button>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  methods: {
    onSubmit(values) {
      console.log(values);
    },
    validateEmail(value) {
      // if the field is empty
      if (!value) {
        return "This field is required";
      }

      // if the field is not a valid email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return "This field must be a valid email";
      }

      // All is good
      return true;
    },
    validatePassword(value) {
      // if the field is empty
      if (!value) {
        return "This field is required";
      }

      // if the length is less than 8 characters
      if (value.length < 8) {
        return "The length of this field must be at least 8 characters";
      }

      // All is good
      return true;
    }
  },
};
</script>
```

Podemos encontrar más información sobre vee-validate en su [documentación oficial](https://vee-validate.logaretm.com/v4/).

### Validar otros inputs
Para validar un `<select>` simplemente lo cambiamos por un `<Field as="select">`. Ejemplo:
```html
<Field as="select" name="autor" class="form-control" required>
  <option value="">--- Selecciona autor ---</option>
  <option v-for="autor in autores" :key="autor.id"
  :value="autor.id">
    {{ autor.nombre + ' ' + autor.apellidos }}
  </option>
</Field>
<ErrorMessage name="autor" />
```

Para un _textarea_ pondremos un `<Field as="textarea">`.

En el caso de un _checkbox_ o un _radiobutton_ simplemente añadimos al `Field` un atributo `type` indicando su tipo:
```html
<Field name="drink" type="radio" value="Water" /> Water
<Field name="drink" type="radio" value="Tea" /> Tea
<Field name="drink" type="radio" value="Coffee" /> Coffee
```

Si se trata de varios _checkbox_ con el mismo atributo _name_ en _values_ se recibirá un array con los _values_ de los elementos marcados.

### Usar un _schema_
El problema de validar los datos así es que tenemos varias funciones independientes que validan los distintos _inputs_ lo que dispersa el código de la vaidación.

Podemos ponerlas todas como propiedades de un objeto que le pasamos como atributo al `Form`, evitando además tener que poner los atributos `rules` en cada `Field` a validar.

El ejemplo anterior quedaría:
```vue
<template>
  <div id="app">
    <Form :validation-schema="mySchema" @submit="onSubmit">
      <Field name="email" type="email" />
      <ErrorMessage name="email" />

      <Field name="password" type="password" />
      <ErrorMessage name="password" />

      <button>Sign up</button>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      mySchema = {
        email: (value) => {
          if (!value) return "This field is required";
          const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
          if (!regex.test(value)) return "This field must be a valid email";
          return true;
        },
        password: (value) => {
          if (!value) return "This field is required";
          if (value.length < 8) return "The length of this field must be at least 8 characters";
          return true;
        }
      }
    }
  },
  methods: {
    onSubmit(values) {
      console.log(values);
    },
  },
};
</script>
```

### Validar con vee-validate y yup
Vee-validate 4 también permite usar librerías como [**yup**](https://www.npmjs.com/package/yup). En este caso la validación es casi automática como se muestra en la documentación de [vee-validate](https://vee-validate.logaretm.com/v4/guide/components/validation#validating-fields-with-yup). El ejemplo anterior quedaría:
```vue
<template>
  <div id="app">
    <Form @submit="onSubmit" :validation-schema="mySchema">
      <Field name="email" type="email" />
      <ErrorMessage name="email" />

      <Field name="password" type="password" />
      <ErrorMessage name="password" />

      <button>Sign up</button>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from 'yup';

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const mySchema = yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    })
    return {
      mySchema
    }
  },
  methods: {
    onSubmit(values) {
      console.log(values);
    },
  },
};
</script>
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
