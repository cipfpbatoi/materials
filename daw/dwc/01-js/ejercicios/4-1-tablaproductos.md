# Bloc 1: Javascript. Práctica 4.1 - DOM
Siguiendo con la práctica de 'Productos de un almacén' vamos a crear una página donde mostrar en una tabla los productos de nuestro almacén. Cada fila corresponderá a un producto y se mostrará su id, nombre, unidades, precio por unidad e importe. En el fichero index.html tenéis el esqueleto de nuestra vista, que usa **_bootstrap_** para mejorar la presentación. La página está dividida en 3 zonas:
- Una tabla vacía con id _almacen_ donde pintaremos ese almacén. Debajo de la misma mostraremos el importe total del almacén.
- Un div para modificar el almacén, que contiene 3 formularios:
    - **new-prod**: formulario para añadir nuevos productos al almacén. Debéis modificarlo para que tenga un input para introducir el nombre (obligatorio, al menos 3 caracteres) y otro para el precio (número mayor o igual que 0 y con 2 decimales) además de los botones de 'Enviar' y 'Reset'
    - **del-prod**: formulario para borrar un producto. Tendrá un inpit para introducir su id (obligatorio, debe ser un número entero positivo)
    - **stock-prod**: formulario para modificar el stock de un producto (cuando se da de alta será de 0 uds.). Tendrá un input para introducir su id (obligatorio, número entero positivo) y otro para el nº de uds. a añadir o eliminar (obligatorio, número entero)
- un div para mostrar listados del almacén. De momento NO haremos la funcionalidad de esta parte. Contiene 2 formularios más (ya los tenemos hechos):
    - **list-prod**: para mostrar el listado de productos del almacen. Hay que indicar si lo queremos por unidades o alfabético y pulsar el botón
    - **low-prod**: para mostrar el listado de productos con menos uds. de las indicadas en este formulario. En ambos es obligatorio rellenar os datos que se piden

Para esta aplicación seguiremos el patrón **MVC**. Ya tenemos creadas las clases _Product_ y _Store_ con sus funcionalidades por lo que la lógica de negocio de nuestra aplicación (el modelo) la tenemos ya hecha. Ahora nos falta crear funciones con las que interactuará el usuario y que se encargarán de modificar los datos usando las clases ya creadas y reflejar los cambios hechos en la página para que los vea el usuario. 

El usuario interactúará con la aplicación usando los formularios que hay bajo la tabla. Para mejorar su presentación hemos usado _bootstrap_ por lo que cada input del formulario tiene la siguiente estructura básica:
```html
<div class="form-group">
    <label for="newprod-name">Nombre: </label>
    <input type="text" class="form-control" id="newprod-name">
</div>
```

Respecto a los botones de cada formulario tienen el siguiente aspecto:
```html
<button type="submit" class="btn btn-default btn-primary">Añadir</button>
<button type="reset" class="btn btn-secondary">Reset</button>
```

![Almacén](./img/ejer4-1.png)

Tenemos que añadir a los inputs de los formularios existentes los atrobutos para validarlos por HTML.

## Organización del código
Dentro de la carpeta **src/** tenemos los ficheros:
- **index.js**: es el fichero principal de nuestra aplicación que importa la clase _Controller_ e instancia un nuevo controlador. Además contiene las funcioes manejadoras de eventos de los formularios
- **controller/controller.class.js**: la clase _Controller_ con sus propiedades y métodos
- **view/view.class.js**: la clase _View_ con sus métodos
- **model/**: carpeta donde pondremos las clases Store y Product que tenemos en los ficheros **store.class.js** y **product.class.js** que ya tenemos hechas

En el _index.html_ habría que enlazar los 5 ficheros en el orden correcto (product, store, view, controller y index) para que desde _Controller_ se pueda llamar a métodos de _Store_ y desde _store.js_ a métodos de _Product_, etc. Como esto ya empieza a ser incómodo vamos a hacer uso de _webpack_ para que se empaqueten todos nuestros ficheros en un único fichero que se llamará _./dist/main.js_ y sera el que enlazaremos en el _index.html_. Puedes consultar [cómo usar webpack](../12-tests.html) para hacerlo. 

## Tareas a realizar
### Crear el proyecto
Esta vez no os proporciono el fichero _package.json_ por lo que deberéis crearlo vosotros. Una vez que nos hayamos descargado en nuestra máquina el repositorio de trabajo entraremos en su carpeta y haremos:

1. Crear el proyecto (cuando te pregunte la librería para test le debes decir **jest**)
```bash
npm init
```

2. Instalar las dependencias (todas son de desarrollo). Si tienes _jest_ instalado global no hace falta que lo añadas como dependencia
```bash
npm i -D webpack webpack-cli jest
```

3. Cada vez que modifiques tu código, si quieres ver esos cambios en el navegador, debes ejecutar _webpack_ para que vuelva a generarse el fichero **dist/main.js** que es el que tenemos enlazado en _index.html_
```bash
npx webpack --mode=development
```

4. Y para pasar los tests
```bash
npm run test
```

### Completar los formularios
Debemos crear los inputs necesarios en los formularios así como los botones de enviar el formulario (tipo 'submit') y borrarlo (tipo 'reset'). Recordad añadir los atributos necesarios para que se validen por HTML. También es conveniente ponerle una _id_ a cada campo para que sea más sencillo acceder a ellos desde el código.

### Hacer el fichero principal _index.js_
Aquí importaremos la clase del controlador (`require`) e instanciaremos el controlador de nuestra aplicación.

Además deberemos crear funciones manejadoras de eventos que se ejecutarán automáticamente cuando se envíe cada formulario. Dichas funciones se ocupan de recoger los datos del formulario y enviarlos a la función correspondiente del controlador. Reciben como parámetro un objeto _event_ con información sobre el evento producido y su primera línea será `event.preventDefault()` para que no se recargue la página al enviar el formulario (en el tema de _Eventos_ veremos el por qué de todo esto). 

Tenéis hecha la función para el formulario _form-prod_. Debéis completarla (que coja los datos y llame a la función del controlador pasándoselos) y hacer otras para los otros 2 formularios siguiendo ese ejemplo.

### Hacer el controlador _controller.class.js_
Como se explica en la teoría,la clase controller tendrá 2 propiedades:
- **store**: será un almacén (una instancia de la clase _Store_) donde guardar los datos. En uestro caso crearemos un almacén con id 1.
- **view**: será una instancia de la clase _View_ a la que llamar para renderizarlos

Además tendrá métodos para responder a las distintas acciones del usuario. Lo que debe hacer cada método es:
- validar los datos que se le pasan (en nuestro caso ya los valida el modelo así que no hace falta validarlos aquí también)
- si son correctos, llamar al modelo (la clase Store) para modificar los datos en respuesta a la acción del usuario
- si ha cambiado el modelo llamar a la vista para que modifique la tabla de productos en función de los cambios hechos
- si ha habido algún problema debe llamar a la vista para mostrar el error al usuario

Sus métodos serán:
- **addProductToStore**: recibe de la función manejadora del formulario _new-prod_ un objeto con los datos del producto a añadir (_name_, _price_ y _units_) y hace que se añada al almacén y se muestre en la tabla
- **deleteProductFromStore**: recibe de la función manejadora del formulario _del-prod_ la id del producto a eliminar y hace que se borre del almacén y de la tabla. Deberá pedir **confirmación** (le mostraremos al usuario la id del producto a eliminar y su nombre). Si el producto tiene unidades en stock, pedirá una **segunda confirmación** donde le indicaremos las unidades que aún tiene y le diremos que desaparecerán
- **changeProductStock**: recibe de la función manejadora del formulario _stock-prod_  la id del producto a modificar y las unidades a sumarle (número entero positivo o negativo) y se encarga de que se cambien en el almacén y se muestren los cambios en la tabla
- **changeProductInStore**: recibe un objeto con la id del producto a modificar y las propiedades del mismo que deseamos modificar (las no incluidas permanecerán inalteradas). Se encarga de modificar el producto en el almacén y que se muestren en la tabla esos cambios

### Hacer la vista _view.class.js_
Esta clase se encarga de mostrar en la página la información que recibe para lo que tendrá métodos para mostrar los productos así como un método para mostrar mensajes al usuario sin tener que usar alerts.

Los métodos que contendrá son:
- **renderNewProduct**: recibe un objeto Product y lo añade al final de la tabla
- **renderDelProduct**: recibe una id de un producto y borra de la tabla la fila de dicho producto
- **renderChangeStock**: recibe un objeto Product y cambia las unidades en la tabla poniendo las que tiene ahora
- **renderEditProduct**: recibe un objeto Product que ya está pintado y modifica en la tabla su fila para mostrar los nuevos datos
- **renderStoreImport**: recibe un número y lo muestra como importe total de la tabla

Tenéis que tener en cuenta que:
- no podéis volver a renderizar toda la tabla, sólo hay que cambiar lo que nos dicen porque el renderizado es lo que más consumo de recursos hace y no queremos prejudicar el rendimiento de nuestra aplicación (imaginad una tabla con muchos productos...)
- por tanto en ningún momento podemos cambiar el innerHTML de la tabla ni de su BODY. Sólo podemos añadir o elimnar TR o mdificar TD en el caso de renderStockChange
- recordad que bajo la tabla hay un TOTAL del importe del almacén que siempre debe estar actualizado

Además de os anteriores tendrá un método llamado **renderErrorMessage** al que se le pasa un texto y añade dentro del DIV con _id_ **messages** un nuevo DIV con el mensaje a mostrar al usuario, cuyo HTML será
```html
<div class="col-sm-12 alert alert-danger">
    <span>Aquí pondremos el texto que queramos mostrar</span>
    <button type="button" class="close" aria-label="Close" onclick="this.parentElement.remove()">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
```

Como valor del atributo _onclick_ tenemos el código JS que borra este DIV. No es muy correcto pero de momento lo haremos así.
