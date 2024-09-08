# Bloc 1: Javascript. UT 1: Sintaxis
## Práctica 1.2 - Frase
El objetivo de este ejercicio es practicar con los distintos métodos de los objetos predefinidos de javascript, epecialmente de String. Para ello haremos una aplicación que pida al usuario que introduzca una frase y a continuación muestre en la consola:
- el número de caracteres (incluyendo espacios) y de palabras que tiene la frase introducida
- la frase en mayúsculas
- la frase con la primera letra de cada palabra en mayúsculas
- la frase escrita con las letras al revés
- la frase escrita con las palabras al revés
- si es o no un palíndromo (si se lee igual al revés) pero omitiendo espacios en blanco y sin diferenciar mayúsculas y minúsculas.

Para organizar mejor nuestro programa y poder pasar los test crearemos 2 carpetas:
- src: allí crearemos los 2 ficheros javascript que contendrán nuestro código y que deberemos incluir en el fichero HTML (usando 2 etiquetas SCRIPT, en primer lugar el de las funciones ya que lo llama el _index.js_):
  - _functions.js_: este fichero sólo incluye las funciones indicadas más abajo
  - _index.js_: es el programa principal que contiene el código que pide la frase al usuario y, si ha introducido algo, la muestra y llama a las distintas funciones y muotrando por consola la información devuelta por las mismas
- test: dentro copiaremos el fichero de tests (_functions.test.js_) de Aules para pasar los tests de nuestro código

Las funciones que contendrá el fichero _functions.js_ (deben llamarse **EXACTAMENTE** como os digo) son:
-	letters: devuelve el número de caracteres (incluyendo espacios) de la cadena pasada como parámetro (sólo un número)
-	words: devuelve el número de palabras de la cadena pasada como parámetro (sólo un número)
-	upper: devuelve la cadena pasada como parámetro convertida a mayúsculas
-	title: devuelve la cadena pasada como parámetro con la primera letra de cada pañabra convertida a mayúsculas
-	reverseLetters: devuelve la cadena pasada como parámetro al revés
-	reverseWords: devuelve la cadena pasada como parámetro con sus palabras al revés
-	palindrome: devuelve true si la cadena pasada como parámetro es un palíndromo y false si no lo es. Para ello no se tendrán en cuenta espacios en blanco ni la capitalización de las letras

Por ejemplo, si el usuario introduce la frase 
> La ruta nos aporto otro paso natural

el programa de _index.js_ mostraría en la consola lo siguiente:
```
Frase: "La ruta nos aporto otro paso natural"
36 letras y 7 palabras
LA RUTA NOS APORTO OTRO PASO NATURAL 
La Ruta Nos Aporto Otro Paso Natural 
larutan osap orto otropa son atur aL 
natural paso otro aporto nos ruta La 
Sí es un palíndromo
```

Intenta usar en cada caso el bucle más adecuado. Las funciones `split` de _String_ y `join` de _Array_ (lo opuesto a _split_) nos pueden ayudar a algunas cosas.

**RECUERDA**:
- el código deberá estar en un fichero externo y se incluirá al final del body
- tanto el código JS como el HTML deben estar correctamente indentados
- ten en cuenta los datos que pueden “estropearnos” el programa: que el usuario introduzca un dato de un tipo que no te esperas, que omita algún parámetro, …
- usa las recomendaciones indicadas: ‘use strict’, …
- el código debe ser lo más limpio y claro posible, sin variables o código innecesario
- siempre es bueno refactorizar el código: cuando nuestro programa ya funciona bien le damos un “repaso” para mejorar su claridad (y lo volvemos a probar)

### Pasar los test
Por último debes comprobar tu código antes de entregarlo para asegurarte que apruebas esta práctica. Para hacer accesibles las funciones al test debes añadir al final de tu fichero _functions.js_ la instrucción:
```javascript
module.exports = {
	letters,
	words,
	upper,
	title,
	reverseLetters,
	reverseWords,
	palindrome
}
```

NOTA: A partir de ahora cuando abramos la aplicación en el navegador mostrará en la consola el error de Javascript 'ReferenceError: module is not defined' pero continuará funcionando correctamente.

Para pasar los test escribimos en la terminal:
```bash
npx vitest
```

Esta terminal pasa los test y se queda esperando cualquier cambio en los ficheros para volverlos a pasar automáticamente. Para salir pulsamos la letra **q** (_quit_).

