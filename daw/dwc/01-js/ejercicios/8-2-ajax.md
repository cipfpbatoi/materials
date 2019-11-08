# Bloc 1: Javascript. Almacén con Ajax
No tiene sentido que cada vez que cargo mi página no tenga datos y cada vez que la cierro se pierdan todos. Deberíamos almacenarlos en una base de datos y crear una aplicación del lado servidor para acceder a dichos datos (un API-REST).

## Preparación del entorno
Como eso no pertenece a este módulo (sino al de DWS) vamos a utilizar un API-REST ya hecho que utiliza ficheros JSON para almacenar los datos. Se trata del servicio **json-server**.

Lo instalaremos con **npm** usando la copción _-g_ para tenerlo disponible para todos nuestros proyectos:
```bash
npm install -g json-server
```
Ahora para ejecutar el servidor y que sirva los datos de un fichero (por ejemplo de datos.json) ejecutamos desde la terminal:
```bash
json-server datos.json
```

La URL para acceder a la API del json-server es http://localhost:3000.

Si queremos que una tabla de **json-server** tenga un campo autonumérico (ideal para que sea la clave de la tabla) debe llamarse obligatoriamente **id**. Así que al guardar los datos de los productos al código le llamaremos id en la base de datos y debe ser de tipo numérico (si es texto también lo generará automáticamente pero será una seria de caracteres).

Hay innumerables páginas donde obtener más información sobre como crear nuestra API con json-server, como [desarrolloweb.com](https://desarrolloweb.com/articulos/crear-api-rest-json-server.html).

Para familiarizarnos con esta API (o con cualquier otra) vamos a instalar una extensión en nuestro navegador que nos permita enviar peticiones API-REST y ver qué se recibe del servidor. Hay muchas diferentes como [Advanced REST client](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo) para Chrome o [RESTClient](https://addons.mozilla.org/es/firefox/addon/restclient/) para Firefox.

Una vez hecho probaremos a hacer peticiones a nuestro servidor JSON para añadir, modificar o borrar datos del mismo y familiarizarnos así con la API.

## Ejercicio 8.2
Ahora vamos a hacer que los productos del almacén se guarden de forma persistente. Al cargar la página cargaremos todos los productos del almacén y cada vez que añadamos un nuevo producto éste se guardará en el servidor (de momento no vamos a implementar ni modificaciones ni eliminaciones).

Como no queremos hacer grandes cambios en nuestra aplicación conservaremos el modelo que tenemos (tendremos un 'Store' en memoria con los datos) pero además:
* Al cargar la página haremos una petición al servidor pidiendo los productos a la API, los añadiremos al 'Store' que tenemos y los pintaremos
* Al añadir un nuevo producto haremos una petición a la API para que lo añada y, si todo va bien, lo añadiremos a nuestro 'Store' y lo mostraremos.

## Pràctica 8.3
En el ejercicio anterior hemos visto el problema que plantea que Ajax sea asíncrono: cuando el usuario quiere añadir un nuevo producto se hace la petición Ajax pero hasta que el servidor no contesta no puede añadirse a los datos locales ni pintarse en la página. Por tanto tenemos que llamar al código que pinta el producto dentro de la función de la API o bien crear una función a la que llamar desde allí que lo haga.

La solución es implementar la API con promesas y así nuestro código vuelve a quedar bien estructurado.

En esta práctica debes hacer las modificaciones necesarias para que nuestros datos se guarden en el servidor cada vez que los modifiquemos (al añadir, eliminar, modificar o cambiar unidades) utilizando promesas.

## Ejercicio OPCIONAL 8.4
Reescribe el código utilizando la utilidad _fetch_. Si no te gusta mucho cómo queda el código en el controlador puedes reescrubirlo usando _async/await_ junto con _fetch_ y quedará mucho mejor.