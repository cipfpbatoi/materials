# Bloc 1: Javascript. Práctica 1.1 - Frase
Vamos a pedir al usuario que introduzca una frase y a continuación mostraremos en la consola:
- el número de letras y de palabras que tiene
- la frase en mayúsculas
- la frase con la primera letra de cada palabra en mayúsculas
- la frase escrita con las letras al revés
- la frase escrita con las palabras al revés
- si es o no un palíndromo (si se lee igual al revés) pero omitiendo espacios en blanco y sin diferenciar mayúsculas y minúsculas.

Para ello crearemos las siguientes funciones en el fichero _main.js_ (deben llamarse **EXACTAMENTE** como os digo):
-	letras: devuelve el número de letras de la cadena pasada como parámetro (sólo un número)
-	palabras: devuelve el número de palabras de la cadena pasada como parámetro (sólo un número)
-	maysc: devuelve la cadena pasada como parámetro convertida a mayúsculas
-	titulo: devuelve la cadena pasada como parámetro con la primera letra de cada pañabra convertida a mayúsculas
-	letrasReves: devuelve la cadena pasada como parámetro al revés
-	palabrasReves: devuelve la cadena pasada como parámetro con sus palabras al revés
-	palindromo: devuelve true si la cadena pasada como parámetro es un palíndromo y false si no lo es. Para ello no se tendrán en cuenta espacios en blanco ni la capitalización de las letras

Luego escribiremos el programa que pedirá al usuario que introduzca una cadena y, si ha introducido algo, llamará a esas funciones y mostrará en la consola lo que se pide.

Por ejemplo, si el usuario introduce la frase 
| La ruta nos aporto otro paso natural

se mostraría lo siguiente:
| 36 letras y 7 palabras
| LA RUTA NOS APORTO OTRO PASO NATURAL 
| La Ruta Nos Aporto Otro Paso Natural 
| larutan osap orto otropa son atur aL 
| natural paso otro aporto nos ruta La 
| Sí es un palíndromo

Intenta usar en cada caso el bucle más adecuado. Las funciones `split` y `join` (lo opuesto) de _String_ y _Array_ nos pueden ayudar a algunas cosas.

RECUERDA:
- el código deberá estar en un fichero externo y se incluirá al final del body
- debes comentarlo para tener claro qué hace
- tanto el código JS como el HTML deben estar correctamente indentados
- ten en cuenta los datos que pueden “estropearnos” el programa: que el usuario introduzca un dato de un tipo que no te esperas, que omita algún parámetro, …
- usa las recomendaciones indicadas: ‘use strict’, …
- el código debe ser lo más limpio y claro posible, sin variables o código innecesario
- siempre es bueno refactorizar el código: cuando nuestro programa ya funciona bien le damos un “repaso” para mejorar su claridad (y lo volvemos a probar)

Por último debes comprobar tu código antes de entregarlo para asegurarte que apruebas esta práctica. Para ello añade al final de tu fichero:
```javascript
module.exports = {
	letras,
	palabras,
	maysc,
	titulo,
	letrasReves,
	palabrasReves,
	palindromo
}
```
Tras inicializar el proyecto npm pueden pasar los tests escribiendo en la terminal:
```bash
npm run tets
```

NOTA: dará un error en la línea que ejecutas el prompt para pedir la frase. Coméntala para pasar los test inicializando tu cadena directamente en el código
