# Bloc 1: Javascript. Práctica OPCIONAL 7.3 - Validación de formularios

Haz una página para dar de alta productos de un almacén. El formulario tendrá los siguientes campos:
* cod: 3 letras mayúsculas, un guión y 4 números (ej. INF-0013 o VID-1234). Obligatorio
* name: entre 5 y 25 caracteres. Obligatorio
* units: entre 0 y 100, sin decimales
* minstock: entre 0 y 10, sin decimales
* price: entre 0 y 999.99 con un step de 0.01. Obligatorio
* categ: menos de 25 caracteres
* ubicacion: radiobutton de 3 opciones (Alcoi, València, Alacant). Obligatorio
* comprobado: checkbox que debemos marcar. Obligatorio

Todos los campos son obligatorios. Queremos que muestre al usuario los siguientes mensajes de error:
* si falta un campo obligatorio: El campo es obligatorio
* si lo introducido no cuadra con el pattern: El valor introducido no cumple con lo pedido
* si el valor es menor del mínimo: El valor mínimo es X
* si el valor es mayor del máximo: El valor máximo es X
* si lo introducido no tiene los suficientes caracteres: Debes introducir al menos X caracteres
* si lo introducido tiene demasiados caracteres: Debes introducir como máximo X caracteres

Sólo se enviará el formulario si no tiene campos erróneos. Cada campo mal rellenado se destacará en rojo y debajo del mismo se añadirá un \<div> con el texto correspondiente al error en rojo.

Validaremos cada campo al salir de él y siempre antes de enviar el formulario.
