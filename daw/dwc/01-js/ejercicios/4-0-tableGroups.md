# Bloc 1: Javascript. Práctica 4.0 - DOM (grupos)
Siguiendo con la práctica de 'Alumnos y grupos' vamos a crear una página donde mostrar en una tabla los grupos de nuestro ejercicio anterior. Cada fila corresponderá a un grupo y se mostrarán todos sus datos. En el fichero index.html tenéis el esqueleto de nuestra vista, que usa **_bootstrap_** para mejorar la presentación. La página está dividida en 3 zonas:
- Una tabla vacía con id _grupos_ donde pintaremos esos grupos. Debajo de la misma mostraremos el número total de grupos de la tabla.
- Un div para modificarlos, que contiene 3 formularios:
    - **new-group**: formulario para añadir nuevos grupos. Debéis modificarlo para que tenga un input para introducir el código (obligatorio, entre 3 y 5 caracteres), el nombre (obligatorio, al menos 3 caracteres), el grado (radiobuttons, también obligatorio) y la familia (obligatorio) además de los botones de 'Enviar' y 'Reset'
    - **del-group**: formulario para borrar un producto. Tendrá un input para introducir su id (obligatorio, debe ser un número entero positivo)
    - **edit-group**: igual que _new-group_ pero tendrá el primer lugar un input para mostrar la id pero que debe estar deshabilitado

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

Debemos crear los inputs necesarios en los formularios así como los botones de enviar el formulario (tipo 'submit') y borrarlo (tipo 'reset'). Recordad añadir los atributos necesarios para que se validen por HTML. También es conveniente ponerle una _id_ a cada campo para que sea más sencillo acceder a ellos desde el código.

En el index.js tienes ya creadas las funciones manejadoras de eventos que se ejecutarán automáticamente cuando se envíe cada formulario pero debes completar su código. Dichas funciones deben ocuparse de recoger los datos del formulario y ejecutar la acción necesaria. Reciben como parámetro un objeto _event_ con información sobre el evento producido y su primera línea será `event.preventDefault()` para que no se recargue la página al enviar el formulario (en el tema de _Eventos_ veremos el por qué de todo esto). 

En resumen cada función tienen que coger los datos del formulario y mostrar en la página los cambios necesarios

Tenéis que tener en cuenta que:
- no podéis volver a renderizar toda la tabla, sólo hay que cambiar lo que nos dicen porque el renderizado es lo que más consumo de recursos hace y no queremos prejudicar el rendimiento de nuestra aplicación (imaginad una tabla con muchos grupos...). Por tanto en ningún momento podemos cambiar el innerHTML de la tabla ni de su BODY. Sólo podemos añadir o elimnar TR
- recordad que bajo la tabla hay un TOTAL que siempre debe estar actualizado

Además deberás crear tendrá un método llamado **renderErrorMessage** al que se le pasa un texto y añade dentro del DIV con _id_ **messages** un nuevo DIV con el mensaje a mostrar al usuario para evitar los console.error, cuyo HTML será
```html
<div class="col-sm-12 alert alert-danger">
    <span>Aquí pondremos el texto que queramos mostrar</span>
    <button type="button" class="close" aria-label="Close" onclick="this.parentElement.remove()">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
```

Fijaos que el botón tien un atributo _onclick_ cuyo valor es el código Javascript que borra este DIV. No es lo más correcto pero de momento lo haremos así.
