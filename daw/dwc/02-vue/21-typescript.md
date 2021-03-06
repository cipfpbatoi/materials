# Typescript
Es un lengiaje basado el Javascript al que le ha añadido definiciones de tipos estáticas. 

El hecho de que Javascript permite cambiar dinámicamente el tipo de datos de una variable da lugar a veces a resultados inesperados y dificulta la localización de errores derivados de un uso no adecuado de esto.

Typescript obliga a definir el tipo de datos de una variable e impide cambiarlo (como sucede en la mayoría de lenguajes de programación) lo que nos obliga a escribir un código más consistente. Esto es especialmente importante en proyectos grandes o en los que colaboran muchos programadores.

## Typescript en Vue
El soporte de Typescript en Vue 3.x es total ya que este framework ha sido totalmente reescrito en este lenguaje. Cuuando creamos un nuevo proyecto una de las opciones que podemos marcar el Typescript con lo que ya tendremos todo preparado para utilizar este lenguaje en nuestro proyecto. Si queremos añadir Typescript a un proyecto ya existente lo añadiremos como _pluggin_:
```bash
vue add typescript
```

Para usar TS en un componente tenemos que indicarlo en la etiqueta \<script> e importar _defineComponent_ para transformar el objeto que exportamos. Con Javascript definimos un SFC con:
```vue
<script>
export default {
  name: ...,
  ...
}
```

Esto con Typescript se haría:
```vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: ...,
  ...
})
```

## Tipos de datos
Los tipos de datos que podemos encontrar en Javascript son:
- String
- Number
- Boolean
- Array
- Function
- Object

El Typescript además tenemos:
- any: permite asignar cualquier tipo de datos a una variable. Sería como deshabilitar el chequeo de tipo
- tuple: permite indicar en un array los tipos de datos permitidos para la variable
- enum: permite crear conjuntos de valores numéricos permitidos

## Definir variables
El tipo de datos de una variable lo indicamos al definirla:
```typescript
let title: string = 'Aprende Typescript'
let numPages: number = 100
let isFree: boolean = true
```

En los arrays debemos indicar el tipo de datos de los elementos del array:
```typescript
let lenguajes: string[] = ['Typescript', 'Javascript', 'PHP']
let notes: number[] = [3, 4.5, 7, 4, 9]
```

Respecto a las funcioes debemos indicar el tipo de datos de sus parámetros y de la propia función:
```typescript
let getFullName = (firstName: string, lastName: string): string => {
  return firstName + ' ' + lastName
}
```

Respecto a los objetos hay que definir el tipo de cada propiedad y a continuación asignarles su valor
```typescript
let pupil: {
  name: string;
  age: number;
  modules: string[];
} = {
  name: 'Peter Parker',
  age: 20,
  modules: ['DWEC', 'DWES', 'DAW']
}
```

### Crear custom types
Podemos definir nuestros propios tipos de datos. Por ejemplo crearemos un tipo para los valores permitidos para la clase de un botón:
```typescript
type buttonType = 'primary' | 'secondary' | 'success' | 'danger'

let myBtnStyle: buttonType = 'danger'
```
Si le asigno un valor que no es uno de los definidos en su tipo se producirá un error.
 
### interfaces
Una interface es la definición de los tipos de datos de un objeto, para evitar definirlo como hemos visto antes que es demasiado _verbose_.
```typescript
type Modules = 'DWEC' | 'DWES' |'DIW' |'DAW' | 'EIE' | 'Inglés'

interface Pupil: {
  name: string;
  age: number;
  modules: Modules[];
}
```

A veces definimos un objeto vacío pero que cuando tenga datos será de cierto tipo. En ese caso lo haremos con:
```typescript
let futurePupil = {} as Pupil
```

Esto nos permitirá ahcer cosas como `futurePupil.name = 'Peter Parker'` sin que se produzcan errores de tipo. A esto se llama _type assertions_.

Si se quiere aplicar un tipo propio a una variable pasada por _props_ debemos importar _PropType_:
```typescript
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    pupil: {
      type: Object as PropType<Pupi>,
      required: true
    }
  },
})
```

Para centralizar la definición de tipos se suelen incluir todos los tipos e interfaces en un fichero que llamaremos `src/types.ts`. Deberemos exportar los tipos y/o interfaces.

Visual Studio Code incluye la extensión **VueDX** que nos informa al escribir código si un objeto tiene o no la propiedad que estamos escribiendo.

## Tipos genéricos
A veces nos gustaría que una función pudiera trabajar con distintos tipos de datos. Por ejemplo, una función para añadir un item a una lista podría ser:
```typescript
function addItemToNumberList(item: number, list: number[]): number[] {
    list.push(item)
  
    return list
}

const numberList = addItemToNumberList(123, [])
```

Si queremos  algo similar para listas de cadenas habría que crear otra función pero de tipo _string_. En lugar de eso podemos decir que el tipo de los parámetros y de la función sea genérico:
```typescript
function addItemToList<T>(item: T, list: T[]): T[] {
    list.push(item)
  
    return list
}

const numberList = addItemList<number>(123, [])
const stringList = addItemList<string>('manzanas', [])
```

