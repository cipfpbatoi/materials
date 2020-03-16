# Bloc 1: Javascript. UT 1: Sintaxis
## 1.1 Ejercicios cortos
Aquí tenéis varios ejercicios que podéis hacer para practicar la sintaxis y elementos básicos de Javascript.

### Ejercicio 1.1.a: tipo de usuario
Crea un programa que pida al usuario que introduzca una edad y muestre por consola un mensaje en función de la edad introducida:
- menor de 18: Menor de edad
- entre 18 y 65: Trabajando o estudiando
- mayor de 65: Jubilado

También controlaremos los posibles errores con los siguientes mensajes (los mostraremos con console.error:
- número menor que 0: La edad debe ser positiva
- número con decimales: Introduce la edad sin decimales
- no es un número: La edad introducida no es un número

### Ejercicio 1.1.b: intervalo 15
Crea un programa que muestre por consola todas las horas que van desde las 15:00 a las 17:00 de 15 en 15 minutos (ej. 15:00, 15:15, 15:30, 15:45, 16:00, 16:15, 16:30, 16:45, 17:00).

### Ejercicio 1.1.c: intervalo a la carta
Vamos a mejorar el ejercicio anterior creando un programa que pida al usuario:
- la hora de inicio (ej. 15:00)
- la hora de finalización (ej. 17:00)
- el intervalo de minutos (sólo el número, ej. 15)

Y muestre por consola todas las horas que van desde la hora de inicio a la de finalización de X en X minutos (ej. 15:00, 15:15, 15:30, 15:45, 16:00, 16:15, 16:30, 16:45, 17:00).

Debes controlar:
- las horas de inicio y fialización deben ser una hora válida (la hora un número entero entre 0 y 24 y los minutos un número entero entre 0 y 59, ambos separados por el carácter ":")
- el intervalo de minutos deben ser un número entero mayor que 0
- si un valor introducido no es correcto se muestra al usuario un mensaje informando del error (un alert) y se le vuelve a pedir el valor
- en la consola las horas y los minutos se deben mostrar siempre con 2 números (09:03 y no 9:3)

### Ejercicio 1.1.d: contraseña
Crea un programa que pida al usuario que introduzca una contraseña y compruebe si es o no segura. Para ello comprobará:
- que su longitud sea mayor o igual de 8 caracteres
- que contiene alguna mayúscula
- que contiene alguna minúscula
- que contiene algún número
- que contiene alguno de estos caracteres: guión, barra baja, igual, asterisco, mas, dólar, arroba o almohadilla

Si cumple todos los requisitos se informará por consola que la contraseña introducida es segura. Si no cumple 1 o 2 se le dirá que es poco segura y si no cumple más de 2 se le dirá que es una contraseña débil.
