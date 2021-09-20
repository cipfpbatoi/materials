# Bloc 1: Javascript. UT 2: Arrays
## Práctica 2.1 - Notas
Vamos a hacer un programa para trabajar con las notas de los alumnos que tendremos almacenadas en un array de objetos llamado `notasAlumnos`. El contenido de cada elemento del array es un objeto como el siguiente:

```json
{
	id: 7,
	nia: 123456,
	alumno: {
		nombre: 'Juan',
		apellido: 'Segura'
	},
	notas: {
		dwec: 5.2,
		dwes: 6.8,
		diw: 4.5,
		daw: 7.3,
		eie: 8,
		ing: 5.1
	}
}
```

El programa hará lo siguiente:
- pide al usuario que introduzca el nombre del módulo o el NIA del alumno del que mostrar la información
- si el usuario introduce un valor numérico supondremos que es un NIA y si no supondremos que es un nombre de módulo
- si introduce un módulo muestra por consola los alumnos aprobados, los suspendidos y la nota media del módulo
- si introduce un alumno muestra por consola los módulos aprobados, los suspendidos y la nota media del alumno

Para poder pasar los tests a nuestro programa y comprobar si funciona repartiremos el código en 2 ficheros JS distintos:
- **index.js**: es el programa principal que pregunta al usuario los datos (el módulo o el alumno) y, si ha introducido algo, llama a las distintas funciones y muestra por consola la información necesaria
- **functions.js**: este fichero sólo incluye las funciones
  - alumnosAprobadosDelModulo: recibe el array de notas y el nombre de un módulo y devuelve un array con el nombre y apellidos de los alumnos aprobados (cada elemento será una cadena, ej. ['Juan Segura', 'Marta Rodríguez'])
  - alumnosSuspendidosDelModulo: recibe el array de notas y el nombre de un módulo y devuelve un array con el nombre y apellidos de los alumnos suspendidos
  - buscaAlumno: recibe el array de notas y el NIA de un alumno y devuelve el objeto entero de dicho alumno (ej. {id: 7, nia: 123456, alumno: {...}, notas: {...}})
  - modulosAprobadosDelAlumno: recibe un objeto con las notas de un alumno (ej. {dwec: 5.2, dwes: 3.8, diw: 4.5, daw: 7.3}) y devuelve un array con el nombre de los módulos aprobados por el alumno (ej. ['dwes', 'daw'])
  - modulosSuspendidosDelAlumno: recibe un objeto con las notas de un alumno y devuelve un array con el nombre de los módulos suspendidos por el alumno
  - media: recibe un array de números y devuelve la media de los mismos

En el fichero _functions.js_ utilizaremos **métodos de arrays** en lugar de bucles `for`. Recuerda que para poder testear el código como en el ejercicio anterior al final del fichero debemos añadir la instrucción:

```javascript
module.exports = {
	alumnosAprobadosDelModulo,
	alumnosSuspendidosDelModulo,
	modulosAprobadosDelAlumno,
	modulosSuspendidosDelAlumno,
	media
}
```

En el fichero _index.html_ deberemos enlazar los 2 scripts: primero el _functions.js_ y luego el _index.js_.

**IMPORTANTE**: no usaremos ningún for para recorrer los arrays. Siempre que sea posible usaremos _Functional Programming_.

**RECUERDA**: seguir haciendo todas las buenas prácticas que se indicaban en el ejercicio anterior.

**MUY IMPORTANTE**: pasa los tests como se explicó en el ejercicio de la frase para asegurarte aprobar este ejercicio.
