# La consola CMD
- [La consola CMD](#la-consola-cmd)
  - [Obtener ayuda](#obtener-ayuda)
  - [Sintaxis de los comandos de la consola](#sintaxis-de-los-comandos-de-la-consola)
  - [Comandos para trabajar con Directorios y Ficheros](#comandos-para-trabajar-con-directorios-y-ficheros)
    - [Cambiar de directorio](#cambiar-de-directorio)
    - [Ver el contenido de un directorio](#ver-el-contenido-de-un-directorio)
    - [tree](#tree)
    - [Crear un directorio](#crear-un-directorio)
    - [Borrar un directorio](#borrar-un-directorio)
    - [Borrar un fichero](#borrar-un-fichero)
    - [Copiar directorios y ficheros](#copiar-directorios-y-ficheros)
    - [Mover directorios y archivos](#mover-directorios-y-archivos)
    - [Renombrar directorios y ficheros](#renombrar-directorios-y-ficheros)
    - [Ver y cambiar los atributos de un directorio o fichero](#ver-y-cambiar-los-atributos-de-un-directorio-o-fichero)
  - [Comandos para trabajar con el contenido de un fichero](#comandos-para-trabajar-con-el-contenido-de-un-fichero)
    - [Mostrar el contenido del fichero](#mostrar-el-contenido-del-fichero)
    - [Filtrar las líneas de un fichero](#filtrar-las-líneas-de-un-fichero)
    - [Ordenar un fichero](#ordenar-un-fichero)
    - [Comparar ficheros](#comparar-ficheros)

## Obtener ayuda
Podemos obtener la lista de comandos y una breve explicación de lo que hacen con el comando `help`.

Si le pasamos como parámetro el nombre de un comando muestra la ayuda de ese comando:
```cmd
help copy
```

Lo mismo podemos obtener tecleando el nombre del comando seguido del modificador /?, por ejemplo miedo obtener ayuda sobre copy teclearemos:
```cmd
copy /?

help copy
```

## Sintaxis de los comandos de la consola
Normalmente para ejecutar un comando ponemos uno o más parámetros para que el comando haga exactamente lo que queremos. Esto hace que en ocasiones sea compleja la forma de utilizar un comando y muchas veces tenemos que ir a la ayuda para hacer lo que queremos.

![Help COPY](./media/helpCopy.png)

La información que nos proporciona la ayuda es la siguiente:
- Descripción del comando: explica qué hace ese comando (en el caso de `COPY` copia archivos en otra ubicación)
- Sintaxis: cómo tenemos que utilizarlo. Normalmente los comandos pueden tener parámetros que modifican su comportamiento. Además algunos tienen parámetros que es obligatorio poner para que el comando sepa qué tiene que hacer. Aquí podemos encontrar:
  - parámetros sin corchetes: significa que son obligatorios, es decir que tenemos que escribir algo allí. Por ejemplo `origen` es obligatorio porque tenemos que indicar qué archivo es el que queremos copiar. Si no lo hacemos tendremos un error al intentar ejecutar el comando
  - parámetros entre corchetes: significa que son opcionales, es decir que podemos ponerlos o no. Por ejemplo podemos poner  `/V` (los corchetes no se escriben) y en ese caso después de copiar el archivo verificará que se ha escrito correctamente. Si no lo ponemos no lo verificará
  - parámetros separados por una barra, dentro de corchetes o llaves: significa que tenemos que elegir un de ellos, por ejemplo `[/A | /B]` que indican si el fichero es de texto (ASCII) o ejecutable (binario) pero no puede ser las dos cosas a la vez. Si está entre corchetes (cómo en este caso) el parámetro es opcional y no hace falta que pongamos ninguna de las opciones Si está entre llaves (por ejemplo si pusiera `{/A | /B}`) seria obligatorio poner una de las opciones
- Explicación de cada parámetro: nos dice qué es lo que hace cada uno de los parámetros que podemos poner. Por ejemplo nos dice que `origen` es el nombre del fichero a copiar y que `/V` hace una verificación de que el archivo se ha copiado correctamente a su destino
- Explicaciones adicionales: más explicaciones o ejemplos referentes al comando en cuestión. Por ejemplo en `COPY` nos dice que podemos juntar más de un archivo en uno solo (pondríamos `COPY archivo1.txt+archivo2.txt+archivo3.txt archivo_destino.txt` o `COPY archivo?.txt archivo_destino.txt`).

Cómo podemos ver, los parámetros que modifican el comportamiento de un comando en la consola de Windows son una letra precedida del carácter **`/`**. Podemos poner tantos parámetros como necesitemos para un comando.

El **Powershell** en lugar del carácter / los parámetros van precedidos de **-** como en Linux.

## Comandos para trabajar con Directorios y Ficheros
Los siguientes comandos se utilizan para trabajar con carpetas y ficheros.


### Cambiar de directorio
**`cd`** (o `chdir`)

Cambia el directorio actual por el que le pasamos como parámetro. El comando `cd` sin parámetros muestra la ruta del directorio actual. 

Ejemplos:
- `cd C:\Usuarios`: Cambia al directorio C:\Usuarios que pasa a ser el directorio actual
- `cd ..`: Cambia al directorio paro del actual
- `cd`: Muestra la ruta absoluta del directorio actual

### Ver el contenido de un directorio
**`dir`**

Lista el contenido del directorio pasado como parámetro. Si no le pasamos ningún parámetro muestra el contenido del directorio actual. 

Principales parámetros de _dir_:
- _PATH_: de qué directorio queremos ver su contenido. Si no ponemos nada muestra el contenido del directorio actual
- **/s**: muestra también el contenido de todos los subdirectorios
- **/q**: muestra el propietario de cada fichero
- **/w**: muestra sólo el nombre de ficheros y directorios y en varias columnas
- **/a:atributo**: muestra sólo los ficheros con el atributo indicado (los atributos son A, H, R y S como [veremos más adelante](#ver-y-cambiar-los-atributos-de-un-directorio-o-fichero))
- **/o:criterio**: muestra la lista ordenada según el criterio indicado. Los posibles criterios son:
  - **n**: por nombre (decir /o:n, en orden alfabético; decir /o:-n, en orden alfabético inverso)
  - **e**: por extensión
  - **s**: por medida
  - **d**: por fecha

Ejemplos:
- `dir`: Muestra el contenido del directorio actual
- `dir /p C:\Usuarios`: Muestra el contenido del directorio C:\Usuarios pantalla a pantalla
- `dir ..`: Muestra el contenido del directorio padre del actual
- `dir /o:-s *.txt`: Muestra todos los ficheros del directorio actual con extensión .txt ordenados por su medida de mayor a menor

### tree
Muestra la estructura de directorios de la ruta indicada. Modificadores:
- **`/F`**: Muestra también los ficheros de cada directorio

Ejemplos:
- `tree`: Muestra la estructura de directorios desde el directorio actual
- `tree C:\`: Muestra toda la estructura de directorios de la unidad C:
- `tree C:\  /F`: Muestra toda la estructura de directorios de la unidad C: y los ficheros de cada directorio

### Crear un directorio
**`mkdir`** (o `md`)

Crea un nuevo directorio que le pasamos como parámetro. Ejemplos:
- `mkdir clientes`: Crea un directorio llamado clientes dentro del directorio actual
- `mkdir ..\clientes`: Crea un directorio llamado clientes en el directorio paro del actual
- `mkdir C:\Usuarios\Juan\Documentos\clientes`: Crea el directorio clientes en C:\Usuarios\Juan\Documentos
- `mkdir clientes proveidors facturas`: Crea dentro del directorio actual los directorios clientes, proveidors y facturas

### Borrar un directorio
**`rmdir`** (o `rd`)

Para borrar directorios usamos cmd `rmdir` que elimina el directorio que le pasamos como parámetro. Si el directorio no está vacío _rmdir_ devolverá un error (a menos que se le añada el modificador **/s**).

Ejemplos:
- `rd clientes`: Elimina el directorio clientes que hay dentro del directorio actual (tiene que estar vacío)
- `rd C:\Usuarios\Juan\Documentos\clientes`: Elimina el directorio clientes de la ubicación indicada (tiene que estar vacío)
- `rd /s clientes`: Elimina el directorio clientes que hay dentro del directorio actual y todo su contenido

### Borrar un fichero
**`del`** (o `erase`)

El comando `del` borra los ficheros pasados como parámetro. Ejemplos:
- `del lligme.txt`: Borra el fichero lligme.txt del directorio actual
- `del C:\Usuarios\juan\*.odt`: Borra todos los ficheros con extensión odt del directorio indicado

### Copiar directorios y ficheros
**`copy`** y **`xcopy`**

El comando **`copy`** copia lo indicado como primer parámetro (uno o varios ficheros o directorios) en el directorio especificado como segundo parámetro. El comando copy NO copia directorios. Ejemplos:
- `copy leeme.txt ..`: Copia el fichero leeme.txt del directorio actual a su directorio padre
- `copy C:\Windows\* F:\`: Copia todos los ficheros del directorio C:\Windows al directorio raíz de la unidad F: (pero no copiará los subdirectorios)

EL comando **`xcopy`** es igual que copy pero permite copiar árboles de directorios y ficheros enteros. Principales modificadores:
- **/S**: Copia también los subdirectorios, excepto los vacíos
- **/E**: Copia también los subdirectorios, incluyendo los vacíos
- **/H**: Copia también los ficheros ocultos y del sistema
- **/D:m-d-y**: Copia sólo los modificados a partir de la fecha indicada

Ejemplos:
- `xcopy * F:\`: Copia todos los ficheros del directorio actual al directorio raíz de la unidad F: (pero no copiará los subdirectorios)
- `xcopy /E * F:\`: Copia todos los ficheros y subdirectorios del directorio actual al directorio raíz de la unidad F:

### Mover directorios y archivos
**`move`**

Funciona como los comandos de copiar pero en vez de hacer una copia se mueven los ficheros o directorios de ubicación. Después copiar tendremos el fichero 2 veces: donde estaba y donde lo hemos copiado. Si lo movemos se borra de donde estaba y se sitúa donde lo copiamos.

Funciona también con directorios sn necesidad de poner modificador (sin _/S_ o _/E_.

### Renombrar directorios y ficheros 
**`ren`** (o `rename`)

Permite cambiar el nombre del fichero o directorio pasado como primer parámetro por el que le pasamos como segundo parámetro. Ejemplo:
- `ren C:\Windows\leeme.txt readme.txt`: Cambia el nombre del fichero leeme.txt del directorio C:\Windows por readme.txt

No se puede cambiar el directorio donde se encuentra el fichero con este comando. Para ello hay que usar _move_ que permiten moverlo de lugar y además cambiar su nombre (si se lo especificamos en la ruta de destino)

### Ver y cambiar los atributos de un directorio o fichero
**`attrib`**

Permite ver y cambiar los atributos de los ficheros. Los atributos que pueden tener los ficheros son:
- **A**: modificado. Se usa para hacer copias de seguridad incrementales: cada vez que se modifica un fichero Windows le pone este atributo y cuando se hace una copia de seguridad se le quita y así se puede saber cuáles se han modificado desde la última copia
- **H**: Hidden, oculto
- **R**: Read, sólo lectura
- **S**: System, fichero del sistema operativo

Ejemplos:
- `attrib`: Muestra los atributos de todos los ficheros del directorio actual
- `attrib +H lligme.txt`: Pone el atributo H al fichero lligme.txt del directorio actual (ahora ese fichero está oculto y no aparece al hacer un DIR o un Get-ChildItem)
- `attrib -R C:\boot.ini`: Quita el atributo R al fichero boot.ini del directorio raíz de C: por lo cual ahora se puede modificar ese fichero

## Comandos para trabajar con el contenido de un fichero

### Mostrar el contenido del fichero
**`type`** o **`more`**

`type` muestra por pantalla el contenido del fichero o ficheros pasados como parámetro.

`more` hace lo mismo pero si el contenido del fichero ocupa más de una pantalla lo muestra pantalla a pantalla, esperando a que el usuario pulse una tecla para mostrar la siguiente pantalla. Este comando se usa mucho para paginar cualquier cosa pasándosela en un pipe al more:
```cmd
dir C:\Windows | more
```

### Filtrar las líneas de un fichero
**`find`***

Busca el texto pasado entre comillas como primer parámetro en el fichero pasado como segundo parámetro y muestra por pantalla las líneas que lo contengan. Ejemplo:
- `find "Muro" fijo.txt`: Muestra las líneas del fichero fijo.txt que contengan el texto Muro

### Ordenar un fichero
**`sort`**

Ordena el contenido de un fichero de texto. La ordenación la hace por líneas. Modificadores:
- **/+n** (n = número): A partir de qué carácter de cada línea se ordena. Si no indicamos nada ordena por el primer carácter de cada línea
- **/R**: Hace la ordenación al revés, de mayor a menor

Ejemplos:
- `sort alumnos.txt`: Muestra el contenido del fichero alumnos.txt ordenado
- `sort /+10 alumnos.txt`: Muestra el contenido del fichero alumnos.txt ordenado a partir de la posición 10 de cada línea (ignora las anteriores para hacer la ordenación)
- `sort /R alumnos.txt`: Muestra el contenido del fichero alumnos.txt ordenado de mayor a menor

A los comandos _more_, _find_ y _sort_ se les denomina filtros porque reciben una entrada, la filtran o modifican y devuelven una salida que es esa entrada modificada.

### Comparar ficheros
**`fc`**

Compara el contenido de los ficheros pasado como parámetro y muestra por pantalla las líneas que tengan alguna diferencia. Ejemplo:
- `fc fichero1.txt fichero2.txt`: Muestra por pantalla las líneas que sean diferentes entre los ficheros fichero1.txt y fichero2.txt del directorio actual

## Comandos para gestionar la red
### CMD
- **`ipconfig`**: Muestra información de la configuración de red del equipo (dirección ip, puerta de enlace, etc). Modificadores:
  - **/all**: Muestra toda la información
  - **/renew**: Vuelve a pedir IP al servidor DHCP
- **`ping`**: Envía un ping al ordenador especificado como parámetro. Podemos indicar el ordenador por su nombre o por su IP. Nos permite comprobar la conectividad de la red y su velocidad.
- **`tracert`**: Igual que ping pero no sólo muestra el tiempo que ha tardado la respuesta sino todos los equipos por los cuales ha pasado el ping antes de llegar a su destino.
- **`netstat`**: Muestra estadísticas de las conexiones actualmente establecidas.
- **`nslookup`**: Resuelve el nombre de dominio indicado, mostrando cuál es su IP

## Comandos para gestionar discos
- **`diskpart`**: Se trata de un programa en modo texto que permite gestionar las particiones de nuestros discos
- **`chkdsk`**: Permite comprobar un sistema de archivos FAT o NTFS. Ejemplo: `chkdsk E:`
- **`defrag`**: Desfragmenta el sistema de archivos que le indicamos. Ejemplo: `defrag E:`
- **`format`**: Formatea una partición con sistema de archivos FAT o NTFS. Ejemplo: `format E:`
- **`convert`**: Convierte una partición FAT a NTFS sin perder los datos

