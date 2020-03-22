# Bloc 1: Javascript. Práctica 6.1 - Eventos

Siguiendo con la práctica del almacén vamos a mejorar nuestra aplicación.

Por un lado vamos a gestionar correctamente todos los eventos de la aplicación usando el método **_.addEventListener_**.

También eliminaremos los formularios de eliminar producto y cambiar unidades ya que eso lo haremos desde la celda de acciones de la tabla añadiendo iconos. Nosotros vamos a usar los [iconos de Material Design](https://google.github.io/material-design-icons/) de Google para lo que debemos enlazar la librería añadiendo a nuestro _index.html_ la línea:
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

Una vez hecho donde queramos añadir un icono sólo es necesario añadir una etiqueta \<i> con el nombre del icono. Por ejemplo para añadir el icono de una cara (se llama _face_) pondremos:
```html
<i class="material-icons">face</i>
```

En la página de Material Design podemos ver cómo cambiar el estilo o el tamaño de los iconos. Para que un icono aparezca deshabilitado le añadiremos la clase _md-inactive_).

Añadiremos iconos para aumentar en 1 las unidades, para disminuirlas en 1 y para eliminar el producto. Si las unidades están a 0 deshabilitaremos el icono de restar unidades.

Por último vamos a ocultar el formlario de modificar un producto y añadiremos otro icono en la celda de acciones para modificar. Al pulsarlo se mostrará el formulario y se rellenará automáticamente con los datos del producto sobre el que hemos pinchado. La id no se debe poder modificar (la deshabilitaremos). Al pulsar en 'Cambiar', si todo es correcto borramos el formulario y lo ocultamos. AL pulsar en 'Reset' volvermos a cargar el formulario con los datos del producto en la tabla..

## Mejoras de nuestra aplicación
* Podríamos hacer que al cargar la página no se vea tampoco el formulario de 'Añadir productos' sino que sólo se vea la tabla de productos con un botón para añadir nuevos productos. Al pulsarlo se oculta la tabla y se muestra el formulario. También debemos ocultar la tabla al mostrar el formulario de 'MCambiar productos'

* Podríamos usar el mismo formulario para añadir productos y para cambiaros porque es casi igual

* Podríamos crear un menú para nuestra aplicación con las entradas para mostrar los productos (la tabla) y añadir uno nuevo
