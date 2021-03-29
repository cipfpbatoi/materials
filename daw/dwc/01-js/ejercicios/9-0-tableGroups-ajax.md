# Bloc 1: Javascript. Práctica 9.0 - Ajax (grupos)

No tiene sentido que cada vez que cargo mi página no tenga datos y cada vez que la cierro se pierdan todos. Deberíamos almacenarlos en una base de datos y crear una aplicación del lado servidor para acceder a dichos datos (un API-REST).

Pero como eso pertenece al módulo de DWES vamos a utilizar un API-REST ya hecho que utiliza ficheros JSON para almacenar los datos. Se trata del servicio **json-server**.

## Preparar el entorno
Lo instalaremos con npm usando la opción -g para tenerlo disponible para todos nuestros proyectos:
```bash
npm install -g json-server
```

A continuación crearemos un fichero de texto con los datos, al que podemos llamar **groups.json**, que contendrá:
```json
{
  "groups": [
    {
      "id": 1,
      "cod": "DAW",
      "nombre": "Diseño de Aplicaciones Web",
      "grado": "S",
      "familia": "Informática"
    }, {
      "id": 2,
      "cod": "SMX",
      "nombre": "Sistemas Microinformáticos y Redes",
      "grado": "M",
      "familia": "Informática"
    }
  ]
}
```

Ahora para ejecutar el servidor y que sirva los datos del fichero ejecutamos desde la terminal:
```bash
json-server group.json
```

La URL para acceder a la API del json-server es http://localhost:3000/groups.

Para familiarizarnos con esta API (o con cualquier otra) nos convendría instalar una extensión en nuestro navegador que nos permita enviar peticiones API-REST y ver qué se recibe del servidor. Hay muchas diferentes como Advanced REST client para Chrome o RESTClient para Firefox.

Una vez hecho probaremos a hacer peticiones a nuestro servidor JSON para añadir, modificar o borrar datos del mismo y familiarizarnos así con la API.

## Práctica 9.0
Al cargar la página (dentro del `window.addEventListener('load', () => {...`) pediremos al servidor todos los grupos y los pintaremos en la tabla.

Cuando añadamos un nuevo grupo nos aseguramos de que se añade a la BBDD antes de pintarlo en la tabla. Y lo mismo al modificar un grupo o al eliminarlo.

IMPORTANTE: Utilizaremos **promesas** para realizar las peticiones Ajax (o si alguien lo prefiere puede utilizar `fetch` o `async/await`.
