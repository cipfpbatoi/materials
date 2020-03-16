# Bloc 1: Javascript. UT 7: Objetos globales
## Práctica 7.1 - Notas
Vamos a hacer un programa que va pidiendo al usuario que introduzca las notas de un examen y las va guardando en un array. El usuario cada vez puede introducir una sóla nota o varias separadas por coma (ej. 4.5, 6, 8.75) y se le continuará pidiendo notas hasta que pulse ‘Cancelar’. Recuerda que en Javascript el símbolo decimal es el punto y no la coma.

Cada nota introducida se almacenará en un array y una vez que estén todas se mostrará por la consola:
- el array con los datos suministrados por el usuario
- el array “limpiado”: quitaremos del array todos los elementos que no sean números o no estén entre 0 y 10
- la nota del 1º suspenso
- el nº total de aprobados y sus notas
- la nota media del examen, redondeada a 2 decimales
- las notas finales: serán cada nota aumentada un 10% por buena actitud y redondeada a un entero

Organizaremos el código en 2 ficheros:
1. _main.js_: tendrá el código para mostrar los mensajes anteriormente indicados. Sólo contendrá el código para pedir las notas al usuario, sentencias `console.log` y llamadas a funciones del fichero functions.js
1. _functions.js_: sólo contendrá las funciones llamadas por main.js (deben llamarse **EXACTAMENTE** como os digo). Son:
-	addItem(notas,item): se le pasa el array actual de notas y un nuevo valor y devuelve el nuevo array con todas las notas, sin modificar
-	clearItems(notas): devuelve el array "limpio" y con sus elementos convertidos a números
-	primerSuspenso(notas): devuelve el primer elemento que está suspendido
-	aprobados(notas): devuelve un array con sólo los aprobados
-	notaMedia(notas): devuelve la media de las notas redondeada a 2 decimales
-	cambiaNotas(notas, incremento): devuelve un nuevo array con cada nota incrementada en el porcentaje indicado y redondeada a 2 decimales

En el fichero _functions.js_ utilizaremos **métodos de arrays** en lugar de bucles. Para poder testear el código como en el ejercicio anterior al final añadiremos la instrucción:
```javascript
module.exports = {
	addItem,
	clearItems,
	primerSuspenso,
	aprobados,
	notaMedia,
	cambiaNotas
}
```

En el fichero _index.html_ deberemos enlazar los 2 scripts: primero el _functions.js_ y luego el _main.js_.

**RECUERDA**: seguir haciendo todas las buenas prácticas que se indicaban en el ejercicio anterior
