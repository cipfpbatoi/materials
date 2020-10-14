# Bloc 1: Javascript. Práctica 6.1 - Eventos

Siguiendo con la práctica del almacén vamos a mejorar nuestra aplicación.

Por un lado vamos a gestionar correctamente todos los eventos de la aplicación usando el método **_.addEventListener_**.

También eliminaremos los formularios de eliminar producto y cambiar unidades ya que eso lo haremos desde la celda de acciones de la tabla añadiendo iconos. Nosotros vamos a usar los [iconos de Material Design](https://google.github.io/material-design-icons/) de Google para lo que debemos enlazar la librería añadiendo a nuestro _index.html_ la línea:
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

Una vez hecho donde queramos añadir un icono sólo es necesario añadir una etiqueta \<span> con el nombre del icono. Por ejemplo para añadir el icono de una cara (se llama _face_) pondremos:
```html
<span class="material-icons">face</span>
```

En la página de Material Design podemos ver cómo cambiar el estilo o el tamaño de los iconos. 

Nosotros los incluiremos dentro de botones de bootstrap, por lo que su HTML será:
```html
<button class="btn btn-dark">
  <span class="material-icons">face</span>
</button>
```

Añadiremos iconos para aumentar en 1 las unidades (_arrow_drop_up_ o similar), para disminuirlas en 1 (_arrow_drop_down_), para editar el producto (_edit_) y para eliminarlo (_delete_). Si las unidades están a 0 deshabilitaremos el botón de restar unidades (para que un botón aparezca deshabilitado le añadiremos el atributo _disabled_).

Para editar un producto utilizaremos el mismo formlario de añadir productos pero le añadiremos un input para la id (que estará deshabilitado para que no se pueda cambiar) y otro para las unidades si es que no lo tenía. También cambiaremos el título del botón de 'Añadir' a 'Cambiar'. Al pulsar el botón de editar en la fila de un producto el formulario se rellenará automáticamente con los datos del producto sobre el que hemos pinchado. Al pulsar en 'Cambiar', si todo es correcto borramos el formulario y lo dejamos de nuevo preparado para añadir productos. Al pulsar en 'Reset' volvermos a cargar el formulario con los datos del producto en la tabla.

## Mejoras de nuestra aplicación
* Podríamos hacer que al cargar la página no se vea el formulario de 'Añadir productos' sino que sólo se vea la tabla de productos con un botón debajo para añadir nuevos productos. Al pulsarlo se oculta la tabla y se muestra el formulario.

* Podríamos crear un menú para nuestra aplicación con las entradas para mostrar los productos (la tabla) y añadir uno nuevo (mirad cómo crear un menú en bootstrap para que la apariencia sea similar al resto de nuestra aplicación).
