# Bloc 1: Javascript. Práctica 6.0 - Events (grupos)
Siguiendo con la práctica '4.0 Alumnos y grupos' vamos a poner botones en la página para editar y eliminar cada grupo de la tabla.

Nosotros vamos a usar los [iconos de Material Design](https://google.github.io/material-design-icons/) de Google para lo que debemos enlazar la librería añadiendo a nuestro _index.html_ la línea:
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

Una vez hecho donde queramos añadir un icono sólo es necesario añadir una etiqueta \<span> con el nombre del icono. Por ejemplo para añadir el icono de una cara (se llama _face_) pondremos:
```html
<span class="material-icons">face</span>
```

En la página de Material Design podemos ver cómo cambiar el estilo o el tamaño de los iconos. 

En nuestra página incluiremos los iconos dentro de botones de bootstrap, por lo que su HTML será:
```html
<button class="btn btn-dark">
  <span class="material-icons">face</span>
</button>
```

Añadiremos iconos para editar el grupo (icono _edit_) y para eliminarlo (_delete_).

Para editar un producto utilizaremos el mismo formlario de añadir productos pero le añadiremos un input para la id (que estará deshabilitado para que no se pueda cambiar). También cambiaremos el título del botón de 'Añadir' a 'Cambiar'. Al pulsar el botón de editar en la fila de un grupo el formulario se rellenará automáticamente con los datos del grupo sobre el que hemos pinchado. Al pulsar en 'Cambiar', si todo es correcto borramos el formulario y lo dejamos de nuevo preparado para añadir productos. Al pulsar en 'Reset' volvermos a cargar el formulario con los datos del producto en la tabla.

Además cambiaremos los mensajes que mostramos al usuario de forma que se borren automáticamente pasados 5 segundos.

## Mejoras de nuestra aplicación
* Podríamos hacer que al cargar la página no se vea el formulario de 'Añadir grupos' sino que sólo se vea la tabla con un botón debajo para añadir nuevos grupos. Al pulsarlo se oculta la tabla y se muestra el formulario.

* Podríamos crear un menú para nuestra aplicación con las entradas para mostrar los grupos (la tabla) y añadir uno nuevo, algo similar a:
```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <a class="nav-link active" href="#">Grupos</a>
                <a class="nav-link" href="#">Nuevo grupo</a>
            </div>
        </div>
    </div>
</nav>
```

Asegúrate que el elemento del menú activo en cada momento tenga la clase bootstrap _active_ (al cargar la página será la tabla de grupos).
