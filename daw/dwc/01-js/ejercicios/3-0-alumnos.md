# Bloc 1: Javascript. Ejercicio 3.0 - Objetos JSON
En este ejercicio vamos a trabajar con objetos JSON, sin crear clases para ellos. Tendremos 2 tipos de datos: grupos y alumnos. Para gestionarlos crearemos un array de cada uno y funciones para poder añadir, eliminar o modificar elementos.

## Grupos
Cada grupo será un objeto con las siguientes propiedades:
- id: identificador del grupo (autonumérico)
- cod: una cadena con el código del grupo
- nombre: cadena con el nombre del grupo
- grado: sólo admite 2 valores, 'M' si es de grado medio y 'S' si es de grado superior
- familia: cadena con la familia profesional a que pertenece el grupo

Para gestionarlos creademos las funciones:
- addGroup: recibe cod, nombre, grado y familia y crea un nuevo grupo con esos datos y lo añade al array de grupos. Debe comprobar que ningún campo esté vacío, que el grado sea 'M' o 'S' y que no exista ya un grupo con ese 'cod'. Si sucede algo de esto generará un error y si no devolverá el objeto añadido al array. Para calcular la id deberemos hacer una función que mire en el array de grupos el grupo con la id mayor y devuelva ese número más 1
- changeGroup: recibe id, cod, nombre, grado y familia y busca en el array el grupo con esa id y le pone los datos pasados. Debe comprobar que ningún campo esté vacío, que el grado sea 'M' o 'S' y que exista un grupo con esa 'id'. Si sucede algo de esto generará un error y si no devolverá el objeto cambiado en el array
- delGroup: recibe una id y borra el grupos con esa id del array de grupos. Antes debe pedir confirmación mostrando el nombre del grupo. Devuelve el grupo eliminado y si no existe genera un error

## Alumnos
Cada alumno será un objeto con las siguientes propiedades:
- id: identificador del grupo (autonumérico)
- nombre: cadena con el nombre y apellidos del alumno
- email: email del alumno. Debe contener el carácter @
- fecnac: fecha de nacimiento en formato AAAAMMDD
- foto: cadena con la ruta de la foto
- grupo: ide del grupo al que pertenece el alumno

Para gestionarlos creademos las funciones:
- addPupil: recibe nombre, email, fecnac, foto y grupo y crea un nuevo alumno con esos datos y lo añade al array de alumnos. Debe comprobar que ni el nombre ni el email estén vacíos y que el grupo exista en el array de grupos. Si falla algo de esto generará un error y si no devolverá el objeto añadido al array. Para calcular la id deberemos hacer una función que mire en el array de alumnos el alumno con la id mayor y devuelva ese número más 1
- changePupil: recibe id, nombre, email, fecnac, foto y grupo y busca en el array el alumno con esa id y le pone los datos pasados. Debe comprobar que nombre e email no estén vacíos, que el grupo exista y que exista un alumno con esa 'id'. Si sucede algo de esto generará un error y si no devolverá el objeto cambiado en el array
- delPupil: recibe una id y borra el alumno con esa id del array de grupos. Antes debe pedir confirmación mostrando el nombre del alumno y del grupo al que pertenece. Devuelve el alumno eliminado y si no existe genera un error

Para comprobar que funcionan añadiremos a nuestro fichero código para:
- crear el grupo: 'DAW', 'Diseño de Aplicaciones Web', 'S', 'Informática'
- crear el grupo: 'SMX', 'Sistemas Microinformáticos y Redes', 'X', 'Informática' (debe fallar)
- añadir al grupo 1 el alumno: 'Juan Segura', 'js@gmail.com', '', '', 1
- añadir al grupo 1 el alumno: 'Carmelo Cotón', 'cc@gmail.com', '20001212', '', 1
- añadir al grupo 3 el alumno: 'Helen Chufe', 'hc@gmail.com', '', '', 3 (debe fallar)
- mostrar el mensaje 'Programa finalizado'

Recuerda que si llamamos a una función que puede generar un error debemos llamarla dentro de una sentencia `try...catch`. Si se produce un error lo mostraremos con la instrucción `console.error`. Al cargar la página con este código deben aparecer 2 mensajes de error en la consola (uno porque el grado del grupo no es 'M' o 'S' y otro por intentar añadir un alumno a un grupo que no existe). Además si ponemos un punto de interrupoción antes de mostrar el mensaje de programa finalizado y miramos en la consola el contenido de los 2 arrays debe mostrar un grupo y 2 alumnos.

Entrega el fichero de código y una captura de la consola donde se vean los errores mostrados y el contenido de los 2 arrays. 
