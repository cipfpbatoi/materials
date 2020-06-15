# Bloc 1: Javascript. Práctica 4.1 - DOM
Siguiendo con la práctica de 'Productos de un almacén' vamos a crear una página donde mostrar en una tabla los productos de nuestro almacén. Cada fila corresponderá a un producto y se mostrará su id, nombre, unidades, precio por unidad e importe. En el fichero index.html tenéis una tabla vacía con id _almacen_ donde pintaremos ese almacén. Dicha tabla usa **_bootstrap_** para mejorar la presentación. Debajo de la misma mostraremos el importe total del almacén.

Ya tenemos creadas las clases por lo que la lógica de negocio de nuestra aplicación (el modelo) la tenemos ya hecha. Ahora nos falta crear funciones con las que interactuará el usuario y que se encargarán de modificar los datos usando las clases ya creadas y reflejar los cambios hechos en la página para que los vea el usuario. Necesitaremos funciones para:
* Añadir productos al almacén: deberemos pasarle el nombre del nuevo producto, su precio por unidad y, opcionalmente, sus unidades (si no recibe unidades estas serán 0)
* Eliminar productos del almacén: debemos pasarle la id del producto a eliminar. Deberá pedir confirmación (mostraremos al usuario la id del producto a eliminar y su nombre). Si el producto tiene unidades en stock, volverá a pedir una confirmación indicando las unidades que aún tenemos del mismo y diciendo que desaparecerán.
* Cambiar stock: recibe una id de producto y el nº de unidades (positivo o negativo) a modificar y sumará esta cantidad al stock exitente del producto
* Cambiar producto: recibe un objeto con la id del producto a modificar y las propiedades que deseamos modificar (las no incluidas permanecerán inalteradas)

Para introducir estos datos tenemos unos formularios sobre la tabla que deberemos completar (sólo tienen el título). Para mejorar su presentación usaremos también _bootstrap_ por lo que cada input del formulario tendrá la siguiente estructura básica (añadiremos estas 4 líneas de código al _index.html_ para cada input que queramos poner:
```html
<div class="form-group">
  <label for="prod-name">
    <span>Nombre: </span>
    <input type="text" class="form-control" id="prod-name">
  </label>
</div>
```

Respecto a los botones de cada formulario tendrán el siguiente aspecto:
```html
<button type="submit" class="btn btn-default btn-primary">Añadir</button>
<button type="reset" class="btn btn-secondary">Reset</button>
```

![Almacén](./img/ejer4-1.png)

Podéis modificar lo que necesitéis del _index.html_. De hecho como mínimo tenemos que añadir los inputs de los formularios existentes y seguramente convendrá ponerle _id_ a algunos elementos.

## MVC
Es importante no mezclar la lógica del negocio (el modelo) con la presentación (la vista). Las clases que tenemos creadas deben ocuparse de los datos pero NO de cómo los vamos a presentar en la pantalla. De eso se ocuparan otras funciones de manera que si decidimos que la información se vea de otra forma eso no debe afectar al modelo. 

Por ello vamos a usar el patrón MVC (con o sin clases para el controlador y la vista, como prefiráis). La estructura que deberemos crear es:
- controlador, cuyas funciones tienen que:
  - validar los datos que se le pasan
  - si son correctos, llamar al modelo (la clase Store) para modificar los datos en respuesta a la acción del cliente
  - si todo ha ido bien llamar a la vista para que modifique la tabla de productos en función de los cambios hechos
  - si ha habido algún problema se debe llamar a la vista para mostrar el error al usuario
- vista: tendrá funciones para pintar los nuevos productos y las modificaciones que hagamos en ellos. También habrá una función que muestre un mensaje al usuario, para evitar usar alerts.

Además en el fichero principal de la aplicación deberemos crear funciones manejadoras de eventos que se ejecutarán automáticamente cuando se envía cada formulario. Dichas funciones se ocupan de enviar los datos del formulario a la función correspondiente del controlador. Recibirán como parámetro un objeto _event_ con información sobre el evento producido. La primera línea de cada función será `event.preventDefault()` para que no se recargue la página al enviar el formulario (en el tema de _Eventos_ veremos el por qué de todo esto). Tenéis hecho en el fichero **index.js** un ejemplo para el formulario _form-prod_. Debéis completar esa función (que llame a la función _addProductToStore_ del controlador pasándole los datos del formulario) y hacer otras para los otros 2 formularios.

### Controller
La clase controller tendrá como propiedades un almacén (una instancia de la clase _Store_) donde guardar los datos y una instancia de la clase _View_ a la que llamar para renderizarlos. Sus métodos serán:
- **addProductToStore**: recibe de la función manejadora del formulario _form-prod_ un objeto con los datos del producto a añadir (_name_, _price_ y _units_) y, tras comprobar que son correctos, hace que se añada al almacén y se muestre en la tabla
- **deleteProductFromStore**: recibe de la función manejadora del formulario _form-del-prod_ la id del producto a eliminar y hace que se borre del almacén y de la tabla
- **changeProductStock**: recibe de la función manejadora del formulario _form-stock-prod_  la id del producto y las unidades a sumarle (número entero positivo o negativo) y se encarga de que se cambien en el almacén y se muestre en la tabla

### View
La clase _View_ se encarga de mostrar en la página la información que recibe. Los métodos que contendrá son:
- **renderProduct**: recibe un objeto Product y lo añadirá al final de la tabla
- **renderDelProduct**: recibe una id de un producto y borra de la tabla la fila de dicho producto
- **renderChangeStock**: recibe un objeto Product y cambia las unidades en la tabla poniendo las que tiene ahora
- **renderStoreImport**: recibe un número y lo muestra como importe total de la tabla

Tenéis que tener en cuenta:
- no podéis volver a renderizar toda la tabla, sólo hay que cambiar lo que nos dicen porque el renderizado es lo que más consumo de recursos hace y no queremos prejudicar el rendimiento de nuestra aplicación (imaginad una tabla con muchos productos...)
- por tanto en ningún momento podemos cambiar el innerHTML de la tabla ni de su BODY. Sólo podemos añadir o elimnr TR o mdificar TD en el caso de renderStockChange
- recordad que bajo la tabla hay un TOTAL del importe que siempre debe estar actualizado, para lo que hemos creado la función _renderStoreImport_

Además tendrá un método llamado **renderErrorMessage** al que se le pasa un texto y añade dentro del DIV con _id_ **messages** un nuevo DIV con el mensaje a mostrar al usuario, cuyo HTML será
```html
<div class="col-sm-12 alert alert-danger">
    <span>Aquí pondremos el texto que queramos mostrar</span>
    <button type="button" class="close" aria-label="Close" onclick="this.parentElement.remove()">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
```

Como valor del atributo _onclick_ tenemos el código JS que borra este DIV. No es muy correcto pero de momento lo haremos así.

## Organizar el código
Dentro de la carpeta **src/** tendremos los ficheros:
- **index.js**: es el fichero principal de nuestra aplicación que importa la clase _Controller_ e instancia un nuevo controlador. Además contiene las funcioes manejadoras de eventos de los formularios
- **controller/controller.class.js**: la clase _Controller_ con sus propiedades y métodos
- **view/view.class.js**: la clase _View_ con sus métodos
- **model/**: carpeta donde pondremos las clases Store y Product que tenemos en los ficheros **store.class.js** y **product.class.js** que ya tenemos hechas

En el _index.html_ habría que enlazar los 5 ficheros en el orden correcto (product, store, view, controller y index) para que desde _Controller_ se pueda llamar a métodos de _Store_ y desde _store.js_ a métodos de _Product_, etc. Como esto ya empieza a ser incómodo vamos a hacer uso de _webpack_ para que se empaqueten todos nuestros ficheros en un único fichero que se llamará _./dist/main.js_ y sera el que enlazaremos en el _index.html_. Puedes consultar [cómo usar webpack](../12-tests.html) para hacerlo. 

Lo que tienes que hacer es:
1. Crear el proyecto (cuando te pregunte la librería para test le debes decir **jest**)
```bash
npm init
```

2. Instalar las dependencias (todas son de desarrollo)
```bash
npm i -D webpack webpack-cli jest
```

3. Cada vez que modifiques tu código, si quieres ver esos cambios en el navegador, debes ejecutar _webpack_ para que vuelva a generarse el fichero **dist/main.js** que es el que tenemos enlazado en _index.html_
```bash
npx webpack --mode=development
```

4. Y para pasar los tests de nuestro código ejecutamos
```bash
npm run test
```

