# Ejercicio: hacer un juego de tablero

Se trata de un juego en el que dos personajes tendrán que ir sorteando obstáculos para llegar a una puerta que los transporta al siguiente nivel. Se juega en un tablero de 11x20 casillas. El personaje1 estaŕa en la casilla (1,1) y el personaje2 en la (11,1). La puerta para pasar al seguiente nivel está en la (6,20). 

## Movimiento
Antes de comenzar su turno el personaje lanza un dado para ver cuántas casillas avanzará. Sólo puede avanzar en una dirección, en vertical o en horizontal. Si llega a una pared y le quedan casillas por avanzar "rebota" volviendo por donde venía (por ejemplo si está en (3,16), saca un 6 y se mueve hacia la derecha, al llegar a (3,20) aún le quedan 2 movimientos que hacer así que vuelve atrás quedándose en (3,18)).

Tras tirar el dado se resaltarán las casillas a las que puede moverse (con un borde o como queráis) y para moverlo se pincha y arrastra a una de esas casillas.

Para pasar de vivel debe llegar exactamente a la puerta (si se pasa "rebota").

## Obstáculos
El personaje no ve qué hay en cada casilla entre él y las puerta y puede encontrarse con:
- una piedra (hay 10): cuando se encuentra una piedra a lo largo del recorrido se detiene su movimiento en la casilla anterios hasta el siguiente turno. Una piedra no se puede atravesar por lo que en el siguiente turno deberá cambiar de dirección
- un pozo (hay 6): si se encuentra un pozo cae en él deteniéndose su movimiento y pierde el siguiente turno
- una bomba (hay 4): si encuentra una bomba debe volver a comenzar desde su casilla de inicio
- una rueda (hay 12): si se encuentra una rueda puede avanzar 1, 2 o 3 casillas (las que quiera) en horizontal o en vertical

Se destapan las casillas por las que pasan los jugadores mostrándose lo que hubiera en ella o nada si es una casilla vacía. 

## Dado
Deberemos programar una función que nos devuelva números aleatorios del 1 al 6. Mostraremos en pantalla el último valor del dado. Podemos usar por ejemplo imágenes de Free SVG como https://freesvg.org/dado-1.

## Puntuación
Los personajes consiguen 1 punto por cada nivel que ganan. Se almacenará la puntuación indefinidamente.

## Inicio del juego
Al comenzar cada nivel se distribuirán los 32 objetos aleatoriamente por el tablero y se colocarán los 2 personales y la puerta en su posición. Habrá un botón de reiniciar nivel que volverá a crear un nuevo tablero.

En pantalla estará siempre visible la puntuación de cada personaje y el nivel que estamos jugando (cada vez que comencemos se empieza por el nivel 1 y se va aumentando cada vez que alcance la uerta un jugador)

## Guardar partida
Habrá un botón para guardar la partida actual que permitirá posteriormente volver a ella (habrá también un botón de cargar partida, pero sólo estará activo si hay alguna partida guardada). Sólo puede haber guardada 1 partida.

## Fin del juego
Gana el primer jugador que obtenga 10 puntos. Si se consigue se ponen a 0 las puntuaciones y se elimina la partida guardada, si la hubera.

## Diseño
El objetivo el programar y no diseñar. Basta con asignar un color a cada casilla para indicar qué contiene, por ejemplo:
- marrón las casillas no descubiertas
- blanco las descubiertas que no tienen nada
- gris las piedras
- negros los pozos
- rojas las bombas
- verdes las ruedas
- azul la puerta
- amarillo y naranja los 2 personajes

Quien quiera currárselo más puede usar _tiles_ como https://freesvg.org/grass-tile-pattern-for-computer-game-vector-clip-art.

## Mejora
Queremos implementar la posibildad de jugar contra el ordenador.

## Código
Se valorará que el código sea lo más claro y breve posible. Recordad que para tratar con arrays usamos _functional programming_ (filter, find, forEach, ...) y no _for_. Nunca deben producirse errores Javascript

