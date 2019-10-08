# Bloc 1: Javascript. Práctica 6.1 - Eventos

Siguiendo con la práctica del almacén vamos a mejorar nuestra aplicación.

Por un lado vamos a refactorizar nuestro código para que siga el patrón MVC, de manera que tengamos en ficheros separados el código que se encarga del modelo, el que se encarga de cómo se muestran los datos (vista) y el que interactúa con el usuario (controlador). Dentro del controlador es donde incluiremos los manejadores de eventos.

A continuación vamos a gestionar correctamente todos los eventos de la aplicación usando el método **_.addEventListener_**.

También eliminaremos los formularios de eliminar producto y cambiar unidades ya que eso lo haremos desde la celda de acciones de la tabla añadiendo iconos. Nosotros vamos a usar los [iconos de Material Design](https://google.github.io/material-design-icons/) de Google para lo que debemos enlazar la librería añadiendo a nuestro _index.html_ la línea:
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

Una vez hecho donde queramos añadir un icono sólo es necesario añadir una etiqueta \<i> con el nombre del icono. Por ejemplo para añadir el icono de una cara (se llama _face_) pondremos:
```html
<i class="material-icons">face</i>
```

En la página de Material Design podemos ver cómo cambiar el estilo o el tamaño de los iconos. Para que un icono aparezca deshabilitado le añadiremos la clase _md-inactive_).

Añadiremos iconos para aumentar en 1 las unidades, para disminuirlas en 1 y ara eliminar el producto. Si las unidades están a 0 deshabilitaremos el icono de restar unidades.

Por último vamos a ofrecer al usuario la posibilidad de modificar un producto. Podrá cambiar cualquier campo del mismo excepto su _id_. Para ello crearemos un nuevo formulario junto al de añadir productos y un icono en la tabla y cuando se pulse dicho icono se cargarán en el formulario los datos de dicho producto y ya podrá modificarse.

**Posibles mejoras**:
* Podríamos hacer que no se vea todo junto en la página sino que al cargarla sólo se vea la tabla con un botón para crear nuevos productos y otro para mostrar los listados. Al pulsar sobre 'Nuevo producto' o 'Editar' se oculta la tabla y se muestra el formulario correspondiente. Lo mismo al pulsar sobre 'Listados' que se mostrarían los 2 formularios de listados junto a la lista de debajo

* Podríamos usar el mismo formulario para añadir productos y para editarlos porque es casi igual

* Podríamos crear un menú para nuestra aplicación
