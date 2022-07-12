
Comandos en Windows
===================

- [Comandos en Windows](#comandos-en-windows)
    - [Obtener ayuda](#obtener-ayuda)
    - [Sintaxis de los comandos](#sintaxis-de-los-comandos)
- [para trabajar con Directorios](#para-trabajar-con-directorios)
  - [dir](#dir)
  - [cd (o chdir)](#cd-o-chdir)
  - [md (o mkdir)](#md-o-mkdir)
  - [rd (o rmdir)](#rd-o-rmdir)
  - [tree](#tree)
- [para trabajar con Ficheros](#para-trabajar-con-ficheros)
  - [copy](#copy)
  - [xcopy](#xcopy)
  - [move](#move)
  - [ren (o rename)](#ren-o-rename)
  - [del (o erase)](#del-o-erase)
  - [attrib](#attrib)
  - [print](#print)
- [para trabajar con el contenido de un fichero](#para-trabajar-con-el-contenido-de-un-fichero)
  - [type](#type)
  - [more](#more)
  - [find](#find)
  - [sort](#sort)
  - [fc](#fc)
- [para gestionar la red](#para-gestionar-la-red)
  - [ipconfig](#ipconfig)
  - [ping](#ping)
  - [tracert](#tracert)
  - [netstat](#netstat)
  - [nslookup](#nslookup)
- [para gestionar discos](#para-gestionar-discos)
  - [chkdsk / scandisk](#chkdsk--scandisk)
  - [defrag](#defrag)
  - [format](#format)
  - [convert](#convert)
  - [diskpart](#diskpart)
- [otros comandos](#otros-comandos)
  - [X](#x)
  - [date](#date)
  - [time](#time)
  - [echo](#echo)
  - [shutdown](#shutdown)
  - [cls](#cls)
  - [exit](#exit)
  - [logoff](#logoff)
- [Redireccionamiento de comandos](#redireccionamiento-de-comandos)
  - [Dispositivos](#dispositivos)
    - [Operadores de redireccionamiento](#operadores-de-redireccionamiento)
- [Ficheros de proceso por lotes](#ficheros-de-proceso-por-lotes)

La línea de comandos de Windows es una implementación de la consola de Ms-DOS para la interfaz gráfica del sistema operativo Windows.

Para abrir una terminal de la línea de comandos en Windows se hace desde el **menú Inicio -\> Todos los programas -\> Accesorios -\> Símbolo del sistema**, o también ejecutando el programa **cmd.exe**.

Windows 7 y posteriores incluyen también el entorno a ejecución de comandos **PowerShell** que pretende ser una herramienta tan potente como la terminal en Linux. **PowerShell** combina características de una consola de comandos y del framework .NET de Microsoft, que está orientado a objeto, y permite hacer la mayoría de tareas de configuración del sistema operativo.

Windows no diferencia entre mayúsculas y minúsculas por lo cual podemos utilizar los comandos y sus argumentos en mayúsculas o en minúsculas.

### Obtener ayuda

Podemos obtener la lista de comandos y una breve explicación del que hacen con el comando help:

help

Si le pasamos como parámetro el nombre de un comando muestra la ayuda de ese comando:

help copy


El mismo podemos obtener tecleando el nombre del comando seguido del modificador /?, por ejemplo miedo obtener ayuda sobre copy teclearemos:

copy /?

### Sintaxis de los comandos

Normalmente para ejecutar un comando ponemos uno o más parámetros para que el comando haga exactamente el que queremos. Esto hace que en ocasiones sea compleja la forma de utilizar un comando y muchas veces tenemos que ir a la ayuda para hacer el que queremos.

La información que nos proporciona la ayuda es la siguiente:

- Descripción del comando: explica qué hace ese comando (en el caso de COPY copia archivos en otra ubicación)
- Sintaxis: cómo tenemos que utilizarlo. Normalmente los comandos pueden tener parámetros que modifican su comportamiento. Además algunos tienen parámetros que es obligatorio poner para que el comando sepa qué tiene que hacer. Aquí podemos encontrar:
  - parámetros sin corchetes: significa que son obligatorios, es decir que tenemos que escribir algo allí. Por ejemplo 'origen' es obligatorio porque tenemos que indicar qué archivo es el que queremos copiar. Si no lo hacemos tendremos un error al intentar ejecutar el comando
  - parámetros entre corchetes: significa que son opcionales, es decir que podemos ponerlos o no. Por ejemplo podemos poner /V (los corchetes no se escriben) y en ese caso después de copiar el archivo verificará que se ha escrito correctamente. Si no lo ponemos no lo verificará
  - parámetros separados por una barra, dentro de corchetes o claves: significa que tenemos que elegir un de ellos, por ejemplo /A o /B que indican si el fichero es de texto (ASCII) o ejecutable (binario) pero no puede ser las dos cosas a la vez. Si está entre corchetes (cómo en este caso) el parámetro es opcional y no hace falta que pongamos ninguna de las opciones y si está entre llaves (por ejemplo {/A | /B}) seria obligatorio poner una de las opciones
- Explicación de cada parámetro: nos dice qué se el que hace cada uno de los parámetros que podemos poner. Por ejemplo nos dice que origen es el nombre del fichero a copiar y que /V hace una verificación de que el archivo se ha copiado correctamente a su destino
- Explicaciones adicionales: más explicaciones o ejemplos referentes al comando en cuestión. Por ejemplo en COPY nos dice que podemos juntar más de un archivo en uno solo (pondríamos COPY archivo1.txt+archivo2.txt+archivo3.txt archivo\_destino.txt o COPY archivo?.txt archivo\_destino.txt).

Cómo podemos ver, los parámetros que modifican el comportamiento de un comando en Windows son una letra precedida del carácter /. Podemos poner tantos parámetros como necesitemos para un comando.

para trabajar con Directorios
=============================

## dir

Lista el contenido del directorio pasado como parámetro. Si no le pasamos ningún parámetro muestra el contenido del directorio actual. Principales parámetros:

- **ruta**: de qué directorio queremos ver su contenido. Si no ponemos nada muestra el contenido del directorio actual
- **/s**: muestra también el contenido de todos los subdirectorios
- **/p**: si la lista es muy larga muestra pantalla por pantalla
- **/q**: muestra el propietario de cada fichero
- **/w**: muestra sólo los nombres de ficheros y directorios y en varias columnas
- **/a:atributo**: muestra sólo los ficheros con el atributo indicado
    (recordáis que los atributos son A, H, R y S)
- **/o:criterio**: muestra la lista ordenada según el criterio indicado. Los posibles criterios son:
  - **n**: por nombre (decir /o:n, en orden alfabético; decir /o:-n, en orden alfabético inverso)
  - **e**: por extensión
  - **s**: por medida
  - **d**: por fecha

Ejemplos:

dir - Muestra el contenido del directorio actual
dir /p C:\\Usuarios - Muestra el contenido del directorio C:\\Usuarios pantalla a pantalla
dir .. - Muestra el contenido del directorio paro del actual
dir /o:-s \*.txt - Muestra todos los ficheros del directorio actual con extensión .txt ordenados por su medida de mayor a menor

## cd (o chdir)

Cambia el directorio actual por el que le pasamos como parámetro. Sin parámetros muestra la ruta del directorio actual. Ejemplos:

cd C:\\Usuarios - Cambia al directorio C:\\Usuarios que pasa a ser el directorio actual

cd .. - Cambia al directorio paro del actual

cd - Muestra la ruta absoluta del directorio actual

## md (o mkdir)

Crea un nuevo directorio que le pasamos como parámetro. Ejemplos:

 mkdir clientes - Crea un directorio llamado clientes dentro del directorio actual
 mkdir ..\\clientes - Crea un directorio llamado clientes en el directorio paro del actual
 mkdir C:\\Usuarios\\Juan\\Documentos\\clientes - Crea el directorio clientes en C:\\Usuarios\\Juan\\Documentos
 mkdir clientes proveidors facturas - Crea dentro del directorio actual los directorios clientes, proveidors y facturas

## rd (o rmdir)

Elimina el directorio que le pasamos como parámetro, que tiene que estar vacío. Principales modificadores:

- **/s** elimina el directorio aunque no esté vacío (eliminará todo su contenido)

Ejemplos:

rd clientes - Elimina el directorio clientes que hay dentro del directorio actual

rd C:\\Usuarios\\Juan\\Documentos\\clientes - Elimina el directorio clientes de la ubicación indicada

rd /s clientes - Elimina el directorio clientes que hay dentro del directorio actual y todo su contenido

## tree

Muestra la estructura de directorios de la ruta indicada. Modificadores:

- **/F** Muestra también los ficheros de cada directorio

Ejemplos:

tree - Muestra la estructura de directorios desde el directorio actual

tree C:\\ - Muestra toda la estructura de directorios de la unidad C:

para trabajar con Ficheros
==========================

## copy

Copia el fichero o ficheros especificados como primer parámetro en el directorio especificado como segundo parámetro. El comando copy NO copia directorios. Ejemplos:

copy leeme.txt .. - Copia el fichero leeme.txt del directorio actual a su directorio padre

copy C:\\Windows\\\*.txt F:\\ - Copia todos los ficheros con extensión txt del directorio C:\\Windows al directorio raíz de la unidad F:

## xcopy

Es igual que el comando copy pero permite copiar árboles de directorios y ficheros enteros. Principales modificadores:

- **/S** Copia también los subdirectorios, excepto los vacíos
- **/E** Copia también los subdirectorios, incluyendo los vacíos
- **/H** Copia también los ficheros ocultos y del sistema
- **/D:m-d-y** Copia sólo los modificados a partir de la fecha indicada

Ejemplos:

xcopy \*.\* F:\\ - Copia todos los ficheros del directorio actual al directorio raíz de la unidad F:

xcopy /E \*.\* F:\\ - Copia todos los ficheros y subdirectorios del directorio actual al directorio raíz de la unidad F:

## move

Funciona como el comando xcopy pero en cuenta de hacer una copia mueve los ficheros de ubicación. Después hacer un copy tendremos el fichero 2 veces: donde estaba y donde lo hemos copiado. Si hacemos un move se borra de donde estaba y se sitúa donde lo copiamos.

## ren (o rename)

Permite cambiar el nombre del fichero o directorio pasado como primer parámetro por el que le pasamos cono a segundo parámetro. Ejemplo:

ren leeme.txt readme.txt - Cambia el nombre del fichero leeme.txt del directorio actual por readme.txt

## del (o erase)

Elimina el fichero o ficheros pasados como parámetro. Ejemplos:

del lligme.txt - Borra el fichero lligme.txt del directorio actual

del C:\\Usuarios\\juan\\\*.odt - Borra todos los ficheros con extensión odt del directorio indicado

## attrib

Permite ver y cambiar los atributos de los ficheros. Los atributos que pueden tener los ficheros son:

- **A**: modificado
- **H**: Hidden, oculto
- **R**: Read, sólo lectura
- **S**: System, fichero del sistema operativo

Ejemplos:

attrib - Muestra los atributos de todos los ficheros del directorio actual

attrib +H lligme.txt - Pone el atributo H al fichero lligme.txt del directorio actual (ahora ese fichero está oculto y no aparece al hacer un DIR)

attrib -R C:\\boot.ini - Quita el atributo R al fichero boot.ini del directorio raíz de C: por lo cual ahora se puede modificar ese fichero

## print

Imprime por la impresora predeterminada el fichero o ficheros pasados como parámetro.

para trabajar con el contenido de un fichero
============================================

## type

Muestra por pantalla el contenido del fichero o ficheros pasados como parámetro.

## more

Igual que el anterior pero si el contenido del fichero ocupa más de una pantalla lo muestra pantalla a pantalla, esperando a que el usuario pulse una tecla para mostrar la siguiente pantalla.

## find

Busca el texto pasado como primer parámetro en el fichero pasado como segundo parámetro y muestra por pantalla las líneas que lo contengan. Ejemplo:

find “juan” alumnos.txt - Muestra las líneas del fichero alumnos.txt que contengan el texto juan

## sort

Ordena el contenido de un fichero de texto. La ordenación la hace por líneas. Modificadores:

- **/+n** (n = número) A partir de qué carácter de cada línea se ordena. SI no indicamos nada ordena por el primer carácter de cada línea
- **/R** Hace la ordenación al reas, de mayor a menor

Ejemplos:

sort alumnos.txt - Muestra el contenido del fichero alumnos.txt ordenado

sort /+10 alumnos.txt - Muestra el contenido del fichero alumnos.txt ordenado a partir de la posición 10 de cada línea (ignora las anteriores para hacer la ordenación)

sort /R alumnos.txt - Muestra el contenido del fichero alumnos.txt ordenado de mayor a menor

A los comandos more, find y suerte se los denomina filtros porque reciben una entrada, la filtran o modifican y vuelven una salida que es esa entrada modificada.

## fc

Compara el contenido de los ficheros pasado como parámetro y muestra por pantalla las líneas que tengan alguna diferencia. Ejemplo:

fc fichero1.txt fichero2.txt - Muestra por pantalla las líneas que sean diferentes entre los ficheros fichero1.txt y fichero2.txt del directorio actual

para gestionar la red
=====================

## ipconfig

Muestra información de la configuración de red del equipo (dirección ip, puerta de enlace, etc). Modificadores:

- **/all** Muestra toda la información
- **/renew** Vuelve a pedir IP al servidor DHCP

## ping

Envía un ping al ordenador especificado como parámetro. Podemos indicar el ordenador por su nombre o por su IP. Nos permite comprobar la conectividad de la red y su velocidad.

## tracert

Igual que ping pero no sólo muestra el tiempo que ha tardado la respuesta sino todos los equipos por los cuales ha pasado el ping antes de llegar a su destino.

## netstat

Muestra estadísticas de las conexiones actualmente establecidas.

## nslookup

Resuelve el nombre de dominio indicado, mostrando qué es la suya IP

para gestionar discos
=====================

## chkdsk / scandisk

Permite comprobar un sistema de archivos FAT o NTFS.

Ejemplo: chkdsk E:

## defrag

Desfragmenta el sistema de archivos que le indicamos.

Ejemplo: defrag E:

## format

Formatea una partición con sistema de archivos FAT o NTFS.

Ejemplo: format E:

## convert

Convierte una partición FAT a NTFS sin perder los datos

## diskpart

Se trata de un programa en modo texto que permite gestionar las particiones de nuestros discos.

\<img de la help dentro de diskpart\>

otros comandos
==============

## X

Cambia la unidad actual por la letra indicada, por ejemplo, para ir al disquete tecleamos A: y para volver al disco C tecleamos C:

## date

Muestra la fecha actual del ordenador y nos permite cambiarla. Si no queremos que pide nueva fecha ponemos el parámetro /T. Ejemplos:

- date - Muestra la fecha actual y nos permite indicar una nueva fecha
- date 24/3/2012 - Cambia la fecha del ordenador a 24 de marzo de 2012
- date /T - Muestra la fecha actual

## time

Igual que dato pero para ver y cambiar la hora del sistema

## echo

Muestra en la terminal el mensaje pasado como parámetro

## shutdown

Permite apagar el ordenador. Modificadores:

- **/s** Apaga el equipo
- **/r** Reinicia el equipo
- **/h** Hiberna el equipo
- **/l** Cierra la sesión
- **/t** Permite especificar un tiempo (en según) de espera antes apagar
- **/a** Anula el apagado del equipo, si estamos todavía en el tiempo de espera
- **/c** Comentario de la causa de la apagado
- **/m** Permite apagar otro equipo de la red

Ejemplos:

shutdown /s - Apaga el equipo

shutdown /s /t 300 - Apaga el equipo dentro de 5 minutos (300 según)

shutdown /s /t 300 /c  “El ordenador se va a apagar en 5 minutos” - Apaga el equipo dentro de 5 minutos y muestra el mensaje indicado

shutdown /s /t 300 /m \\\\pc-23 - Apaga dentro de 5 minutos el equipo de la red denominado “pc-23”

## cls

Borra la pantalla.

## exit

Cierra la terminal

## logoff

Cierra la sesión de Windows. Vuelve a aparecer la ventana para loguear el usuario

Redireccionamiento de comandos
==============================

## Dispositivos

La comunicación del sistema con el exterior se hace, por defecto, mediante 3 dispositivos:

- dispositivo estándar de **entrada**, que es el teclado. Es el dispositivo por el que se introduce la información
- dispositivo estándar de **salida**, que es el monitor. Es por donde el sistema muestra la información al usuario
- dispositivo estándar de **error**, que también es el monitor. Es por donde el sistema muestra los mensajes de error al usuario

A los dispositivos estándar de entrada y salida se los conoce como consola (o abreviado CON). Los dispositivos más comunes son:

- CON: consola. Es el dispositivo que se utiliza por defecto y está formado por el teclado y el monitor
- NUL: es un dispositivo ficticio que hace desaparecer todo el que le se envía. Por ejemplo si no queremos que los errores aparezcan en el monitor redireccionamos la salida de error al dispositivo NUL.
- LPTn: hace referencia a los puertos paralelos del ordenador. Puede haber hasta 3 (LPT1, LPT2 y LPT3). Tradicionalmente la impresora estaba conectada al puerto LPT1 que también se denomina PRN.
- COMn: identifica los puertos serie y pueden haber 4 (COM1, COM2, COM3 y COM4).

Podemos utilizar estos dispositivos en los comandos. Por ejemplo:

copy prueba.txt PRN - Copia el fichero prueba.txt del directorio actual en el dispositivo PRN, o sea, lo envía a la impresora conectada en el primer puerto paralelo. Es otra forma de imprimir un fichero (seria equivalente al comando PRINT prueba.txt)

### Operadores de redireccionamiento

Cómo hemos comentado la entrada y salida por defecto es CON (el teclado y el monitor), por ejemplo si ejecutamos el comando DATE muestra la fecha actual por el monitor y espera que introducimos una nueva fecha por el teclado.

Pero es posible redireccionar la entrada y la salida para que se utilizo otro dispositivo, un fichero o, incluso, otro comando. Los operadores que lo hacen posible son:

- **\<**: redirecciona la entrada al fichero o dispositivo indicado
- **\>**: redirecciona la salida al fichero o dispositivo indicado. Si se un fichero lo creará (y si ya existe lo truncará, es decir, eliminará su contenido)
- **\>\>**: redirecciona la salida a un fichero y, si ya existe, lo añade al final
- **2\>**: redirecciona la salida de error a un fichero o dispositivo
- **|**: redirecciona la salida del comando a su izquierda a la entrada del comando a su derecha. Se utiliza habitualmente con los filtros (more, find y suerte).

Ejemplos:

copy prueba.txt PRN - Copia el fichero prueba.txt al dispositivo PRN, o sea, lo imprime

dir C:\\Usuarios\\juan \> ficheros\_de\_juan - La lista de ficheros del directorio indicado la guarda en un fichero llamado ficheros\_de\_juan. Si el fichero existe lo truncará

dir C:\\Usuarios\\juan \>\> ficheros\_de\_juan - La lista de ficheros del directorio indicado la añade al fichero llamado ficheros\_de\_juan. Si ya existe el fichero añadirá la lista al final

sort alumnos.txt \> alumnos\_ordenado.txt - Copia el contenido del fichero alumnos.txt ordenado al fichero alumnos\_ordenado.txt

dir | more - Muestra el contenido del directorio actual pantalla a pantalla

find “Alcoi” alumnos.txt | sort \>\> alumnos\_ordenado.txt - Filtra en el fichero alumnos.txt las líneas que contengan la palabra Alcoi, envía esas líneas al comando suerte que las ordena y el resultado (los alumnos que son de Alcoi, ordenados) se añade al fichero alumnos\_ordenado.txt

Ficheros de proceso por lotes
=============================

En ocasiones para hacer una tarea tenemos que ejecutar una serie de comandos y a veces esa tarea tiene que ejecutarse día detrás día.

Para automatizar ese tipo de tareas se crearon los ficheros de proceso por lotes, que son un fichero de texto que en cada línea tiene un comando. Cuando ejecutamos un fichero de proceso por lotes el que pasa es que se ejecuta un por uno los comandos que contiene.

En Windows este tipo de fichero tienen extensión .BAT y se ejecutan tecleando su nombre en el prompt del sistema.

**Ejemplo 1** - Haz un fichero de proceso por lotes que limpio la ventana y a continuación muestro la hora y fecha actuales y el contenido del directorio raíz del disco C: en este momento.

El fichero se denominará info\_raíz.bat y su contenido será:


@ECHO OFF\
 CLS\
 ECHO La hora actual es\
 TIME /t\
 ECHO El día actual es\
 DATE /t\
 ECHO El contenido del directorio raíz del disco C es\
 DIR C:\\

La primera línea del ejemplo es para que no se muestro en la ventana cada comando. Para ejecutar el fichero en la línea de comandos escribiremos info\_raíz.bat.

Podemos pasarle parámetros a un fichero BAT igual que hacemos con los comandos normales. Para acceder desde el fichero BAT a cada parámetro utilizamos %1 para el primer parámetro, %2 para el segundo, etc.

**Ejemplo 2** - Haz un fichero de proceso por lotes que limpio la ventana y a continuación muestro la hora y fecha actuales y el contenido del directorio pasado como parámetro.

El fichero se denominará info\_dir.bat y su contenido será:

@ECHO OFF\
 CLS\
 ECHO La hora actual es\
 TIME /t\
 ECHO El día actual es\
 DATE /t\
 ECHO El contenido del directorio %1 es\
 DIR %1

Para ejecutar el fichero en la línea de comandos escribiremos el nombre del fichero seguido del nombre de un directorio, por ejemplo info\_dir.bat C:\\Windows. Al ejecutarse el fichero la última línea se convertirá a DIR C:\\Windows y se mostrará el contenido de ese directorio.

Obra publicada con [Licencia Creative Commons Reconocimiento No comercial Compartir igual 4.0](<http://creativecommons.org> licenses/by-nc-sa/4.0/)
