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

### Ejercicio 1.1.b: intervalo
Crea un programa que pida al usuario:
- la hora de inicio (sólo el número, ej. 15)
- la hora de finalización (sólo el número, ej. 17)
- el intervalo de minutos (sólo el número, ej. 15)

Y muestre por consola todas las horas que van desde la hora de inicio a la de finalización de X en X minutos (ej. 15:00, 15:15, 15:30, 15:45, 16:00, 16:15, 16:30, 16:45, 17:00).

Debes controlar:
- las horas de inicio y fialización deben ser un número entero y deben estar entre 0 y 24
- el intervalo de minutos deben ser un número entero entre 1 y 60
- si un valor introducido no es correcto se muestra al usuario un mensaje informando del error (un alert) y se le vuelve a pedir el valor
- las horas y los minutos se deben mostrar siempre con 2 números (09:03 y no 9:3)