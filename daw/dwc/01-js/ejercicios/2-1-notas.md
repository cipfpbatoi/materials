# Bloc 1: Javascript. UT 2: Arrays
## Práctica 2.1 - Notas
Vamos a hacer un programa que va pidiendo al usuario que introduzca las notas de un examen y las va guardando en un array. El usuario cada vez puede introducir:
- una sóla nota
- varias separadas por coma (ej. 4.5, 6, 8.75)

Se le continuará pidiendo notas hasta que pulse ‘Cancelar’.

Las notas introducidas se irán almacenando en un array y una vez que estén todas se mostrará por la consola:
- el array con los datos suministrados por el usuario
- el array “limpiado”: quitaremos del array todos los elementos que no sean números o no estén entre 0 y 10
- la nota del 1º suspenso
- el nº total de aprobados y sus notas
- la nota media del examen, redondeada a 2 decimales
- las notas finales: serán cada nota aumentada un 10% por buena actitud y redondeada a un entero

Por ejemplo, si el usuario va introduciendo las siguientes notas: 9, 4.5, 5 , seis, pi, 23, 7, por consola se mostrará:
```
Notas introducidas: 9, 4.5, 5 , seis, pi, 23, 7
Notas válidas: 9, 4.5, 5, 7
El primer suspenso es 4.5
Hay 3 aprobados: 9, 5, 7
La nota media es 6.38
Las notas finales son 10, 5, 6, 8
```

Organizaremos el código en 2 ficheros:
1. _index.js_: tendrá el código para pedir los datos al usuario y mostrar los mensajes anteriormente indicados. Sólo contendrá el código de pedir las notas, sentencias `console.log` y llamadas a funciones del fichero functions.js
1. _functions.js_: sólo contendrá las funciones llamadas por main.js (deben llamarse **EXACTAMENTE** como os digo). Son:
- addItems(notas,item): se le pasa el array actual de notas y el nuevo valor introducido por el usuario y devuelve un array con todos los elementos que tenía más los nuevos introducidos, sin modificar
- clearItems(notas): devuelve el array "limpio" y con sus elementos convertidos a números
- primerSuspenso(notas): devuelve el primer elemento que está suspendido
- aprobados(notas): devuelve un array con sólo los aprobados
- notaMedia(notas): devuelve la media de las notas redondeada a 2 decimales
- cambiaNotas(notas, incremento): devuelve un nuevo array con cada nota incrementada en el porcentaje indicado y redondeada a 2 decimales

En el fichero _functions.js_ utilizaremos **métodos de arrays** en lugar de bucles. Para poder testear el código como en el ejercicio anterior al final añadiremos la instrucción:
```javascript
module.exports = {
	addItems,
	clearItems,
	primerSuspenso,
	aprobados,
	notaMedia,
	cambiaNotas
}
```

En el fichero _index.html_ deberemos enlazar los 2 scripts: primero el _functions.js_ y luego el _main.js_.

**IMPORTANTE**: no usaremos ningún for para recorrer los arrays. Siempre que sea posible usaremos _Functional Programming_.

**RECUERDA**: seguir haciendo todas las buenas prácticas que se indicaban en el ejercicio anterior.Alacant

Recuerda pasar los tests como se explicó en el ejercicio de la frase para asegurarte el APTO en este ejercicio.
