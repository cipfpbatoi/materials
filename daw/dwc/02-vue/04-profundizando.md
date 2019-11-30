Sin publicar aún

# Profundizando en Vue
## Computed y watchers
Las variables disponibles las tengo en:
- props
- data
- computed

En computed puedo poner _setter_ y _getter_. Ej:
```javascript
data: ()=>({
  nombre: 'Juan',
  apellido: 'Segura', 
}),
computed: {
  nombreCompleto() {
      get() {
        return this.nombre+' '+this.apellido;
      },
      set(value) {
        [this.nombre, this.apellido] = value.split('-');
      },
  }
}
```

Esto me permitiría hacer cosas como:
- `console.log(this.nombreCompleto)     // imprimiría 'Juan Segura'
- this.nombreCompleto='Pere-Martí Pascual'   // ahora nombre valdría 'Pere' y apellido 'Martí Pascual'

Si queremos hacer algo si cambia el valor de una variable definida en _data_ o _computed_ definiremos un **watcher** para ella:
```javascript
data: ()=>({
  nombre: 'Juan',
  apellido: 'Segura', 
}),
watch: {
    nombre(newValue) {
        console.log('Nombre cambiado. Nuevo valor: '+newValue);
    },
}
```

Cada vez que cambie de valor esa variable se ejecutará la función asociada. 

NOTA: los _watcher_ son costosos por lo que no debemos abusar de ellos

## Ciclo de vida del componente
Un componente pasa por distintos estados a lo largo de su cilo de vida y podemos poner _hooks_ para ejecutar una función cuando alcanza ese estado. Los principales _hooks_ son:
- **beforeCreate**: aún no se ha creado el componente (sí la instancia de Vue) por lo que no tenemos acceso a sus variables, etc
- **created**: se usa por ejemplo para realizar peticiones a servicios externos lo antes posible
- **beforeMount**: ya se ha generado el componente y compilado su _template_
- **mounted**: ahora ya tenemos acceso a todas las propiedades del componete. Es el sitio donde hacer una patición externa si el valor devuelto queremos asignarlo a una variable del componente
- **beforeUpdate**: se ha modificado el componente pero aún no se han renderizado los cambios
- **updated**: los cambios ya se han renderizado en la página
- **beforeDestroy**: antes de que se destruya el componente
- **destroyed**: ya se ha destruido el componente

## Componentes asíncronos
En proyectos grandes con centenares de componentes podemos hacer que en cada momento se carguen sólo los componentes necesarios de manera que se ahorra mucho tiempo de carga de la página.

Para que un componente se cargue asíncronamente al registrarlo se hace como un objeto que será una función que importe el componente. Un componente normal (síncrono) se registraría así:
```vue
<script>
import ProductItem from './ProductItem.vue'

export default {
    name: 'products-table',
    components: {
        ProductItem,
    },
```

Si queremos que se cargue asíncronamente no lo importamos hasta se registra:
```vue
<script>
export default {
    name: 'products-table',
    components: {
        ProductItem: () => import('./ProductItem.vue'),
    },
...
```

También podemos decirle que espere un tiempo a cargar el componente (delay) e incluso qué componente queremos cargar mientras está cargando el componente o cuál cargar si hay un error al cargarlo:
```vue
<script>
export default {
    name: 'products-table',
    components: {
        ProductItem: () => ({
            component: import('./ProductItem.vue'),
            delay: 500,       // en milisegundos
            timeout: 6000,
            loading: compLoading,   // componente que cargará mientras se está cargando
            error: compError,       // componente que cargará si hay un error,
        })
    },
...
```

## Filtros
