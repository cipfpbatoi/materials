# La terminal de Windows
- [La terminal de Windows](#la-terminal-de-windows)
  - [Introducción](#introducción)
    - [Introducción a PowerShell](#introducción-a-powershell)
    - [Obtener ayuda](#obtener-ayuda)
    - [Sintaxis de los comandos de la consola](#sintaxis-de-los-comandos-de-la-consola)
  - [Comandos para trabajar con Directorios y Ficheros](#comandos-para-trabajar-con-directorios-y-ficheros)
    - [Cambiar de directorio](#cambiar-de-directorio)
    - [Ver el contenido de un directorio](#ver-el-contenido-de-un-directorio)
    - [tree](#tree)
    - [Crear un directorio o un fichero vacío](#crear-un-directorio-o-un-fichero-vacío)
    - [Borrar un directorio o fichero](#borrar-un-directorio-o-fichero)
    - [Copiar directorios y ficheros](#copiar-directorios-y-ficheros)
      - [copy](#copy)
      - [xcopy](#xcopy)
      - [Copy-Item](#copy-item)
    - [Mover directorios y archivos](#mover-directorios-y-archivos)
    - [Renombrar directorios y ficheros](#renombrar-directorios-y-ficheros)
    - [Ver y cambiar los atributos de un directorio o fichero](#ver-y-cambiar-los-atributos-de-un-directorio-o-fichero)
  - [Comandos _CMD_ para trabajar con el contenido de un fichero](#comandos-cmd-para-trabajar-con-el-contenido-de-un-fichero)
    - [Mostrar el contenido del fichero](#mostrar-el-contenido-del-fichero)
    - [Filtrar las líneas de un fichero](#filtrar-las-líneas-de-un-fichero)
    - [Ordenar un fichero](#ordenar-un-fichero)
    - [Comparar ficheros](#comparar-ficheros)
  - [_CMDLETS_ para trabajar con el contenido de un fichero](#cmdlets-para-trabajar-con-el-contenido-de-un-fichero)
  - [Redireccionamiento de comandos](#redireccionamiento-de-comandos)
    - [Dispositivos](#dispositivos)
    - [Operadores de redireccionamiento](#operadores-de-redireccionamiento)
  - [Comandos para gestionar la red](#comandos-para-gestionar-la-red)
    - [CMD](#cmd)
    - [cmdlets](#cmdlets)
  - [Comandos para gestionar discos](#comandos-para-gestionar-discos)
    - [CMD](#cmd-1)
    - [cmdlets](#cmdlets-1)
  - [Comandos para gestionar procesos](#comandos-para-gestionar-procesos)
    - [Ver los procesos](#ver-los-procesos)
    - [Detener procesos](#detener-procesos)
    - [Iniciar procesos](#iniciar-procesos)

## Introducción
La línea de comandos de Windows es una implementación de la consola de Ms-DOS para la interfaz gráfica del sistema operativo Windows.

Para abrir una terminal de la línea de comandos en Windows se hace desde el menú o también ejecutando el programa **`cmd.exe`**.

Windows 7 y posteriores incluyen también el entorno a ejecución de comandos **PowerShell** que pretende ser una herramienta tan potente como la terminal en Linux. PowerShell combina características de una consola de comandos y del framework .NET de Microsoft, que está orientado a objeto, y permite hacer la mayoría de tareas de configuración del sistema operativo.

PowerShell incluye _alias_ para muchos de sus comandos lo que permite ejecutarlos usando los comandos de la consola de Windows y también en muchos casos los comandos de GNU/Linux. Por ejemplo para obtener el listado de ficheros de la carpeta C:\ podemos usar el comando PS
```powershell
Get-ChildItem -Path C:\
```

o bien uno de sus alias
```powershell
dir C:\
ls C:\
```

Nosotros trabajaremos con la consola PowerShell, aunque para las acciones más básicas también veremos los comandos de cmd.

Windows no diferencia entre mayúsculas y minúsculas por lo cual podemos utilizar los comandos y sus argumentos en mayúsculas o en minúsculas.

Tanto desde la consola clásica como desde la de Powershell está restringida la ejecución de algunos comandos de administración. Para ejecutarlos debemos hacerlo desde una consola de Administrador.

### Introducción a PowerShell
Está basado en objetos por lo que en lugar de procesar texto como la mayoría de intérpretes de comandos procesa objetos. A sus comandos se les llama **cmdlets** y están formados por un verbo (_Get_, _Set_, ...) y un nombre de objeto sobre el que realizar la acción (_Location_, _Item_, _Content_, _Process_, _Service_, ...) separados por un **-**.

Por ejemplo, para cambiar al directorio _Windows_ el comando es `cd C:\Windows` y su _cmdlet_ correspondiente es 

```powershell
Set-Location C:\Windows
```

donde:
- **Set** indica la operación a realizar sobre el objeto
- **Location** es el objeto sobre el que actuamos. _Location_ almacena el directorio actual
- _PATH_ el parámetro es la ubicación del directorio al que queremos ir

Y para saber en qué directorio estamos deberíamos ejecutar `Get-Location`.

La salida de un _cmdlet_ es también un objeto por lo que podemos encadenar varios cmdlets, formatear la salida, aplicar filtros, ... 

Algunos comandos útiles para todo esto son:
- **`Out-GridView`**: formatea la salida en forma de tabla en el entorno gráfico con la que podemos interactuar. Reconoce los nombres de los campos así como su tipo de datos
- **`Where-Object`**: es un poderoso filtro que no da acceso a multitud de funciones
- **`Sort-Object`**: permite ordenar por la propiedad que deseemos
- **`Export-CSV`**: exporta la salida a formato CSV (texto con separador)
- **`Measure-Object`**: cuenta los objetos pasado
- ...

Ejemplo:
```powershell
Get-Process | Where-Object {$_.Id -gt 500 -and $_.Id -lt 1000 } | Sort-Object -Property Id | Format-Table -Property *
```

El operador **`|`** permite encadenar varios comandos de forma que la salida del comando que hay antes del operador constituirá la entrada para el comando que hay tras él. Se utiliza tanto en PS como en la consola clásica y en las diferentes terminales de GNU/Linux. Lo veremos con más detalle en el apartado de [redireccionamiento de comandos](#redireccionamiento-de-comandos).

### Obtener ayuda
Para obtener la ayuda de un comando ejecutaremos el cmdlet
```powershell
Get-Help NombreDelCmdlet
```

Si queremos ver ejemplos de su uso pondremos `Get-Help NombreDelCmdlet -examples`.

La primera vez nos pedirá que actualicemos la ayuda con el cmdlet Update-Help ya que no se instala por defecto (hay que hacerlo desde una consola de Administrador). Este cmdlet tiene como alias _help_ y _man_.

El cmdlet para obtener la lista de comandos es `Get-Command`.

En la consola tradicional podemos obtener la lista de comandos y una breve explicación de lo que hacen con el comando `help`.

Si le pasamos como parámetro el nombre de un comando muestra la ayuda de ese comando:
```cmd
help copy
```

Lo mismo podemos obtener tecleando el nombre del comando seguido del modificador /?, por ejemplo miedo obtener ayuda sobre copy teclearemos:
```cmd
copy /?

help copy
```

### Sintaxis de los comandos de la consola
Normalmente para ejecutar un comando ponemos uno o más parámetros para que el comando haga exactamente el que queremos. Esto hace que en ocasiones sea compleja la forma de utilizar un comando y muchas veces tenemos que ir a la ayuda para hacer el que queremos.

La información que nos proporciona la ayuda es la siguiente:
- Descripción del comando: explica qué hace ese comando (en el caso de COPY copia archivos en otra ubicación)
- Sintaxis: cómo tenemos que utilizarlo. Normalmente los comandos pueden tener parámetros que modifican su comportamiento. Además algunos tienen parámetros que es obligatorio poner para que el comando sepa qué tiene que hacer. Aquí podemos encontrar:
  - parámetros sin corchetes: significa que son obligatorios, es decir que tenemos que escribir algo allí. Por ejemplo 'origen' es obligatorio porque tenemos que indicar qué archivo es el que queremos copiar. Si no lo hacemos tendremos un error al intentar ejecutar el comando
  - parámetros entre corchetes: significa que son opcionales, es decir que podemos ponerlos o no. Por ejemplo podemos poner /V (los corchetes no se escriben) y en ese caso después de copiar el archivo verificará que se ha escrito correctamente. Si no lo ponemos no lo verificará
  - parámetros separados por una barra, dentro de corchetes o claves: significa que tenemos que elegir un de ellos, por ejemplo /A o /B que indican si el fichero es de texto (ASCII) o ejecutable (binario) pero no puede ser las dos cosas a la vez. Si está entre corchetes (cómo en este caso) el parámetro es opcional y no hace falta que pongamos ninguna de las opciones y si está entre llaves (por ejemplo {/A | /B}) seria obligatorio poner una de las opciones
- Explicación de cada parámetro: nos dice qué se el que hace cada uno de los parámetros que podemos poner. Por ejemplo nos dice que origen es el nombre del fichero a copiar y que /V hace una verificación de que el archivo se ha copiado correctamente a su destino
- Explicaciones adicionales: más explicaciones o ejemplos referentes al comando en cuestión. Por ejemplo en COPY nos dice que podemos juntar más de un archivo en uno solo (pondríamos COPY archivo1.txt+archivo2.txt+archivo3.txt archivo_destino.txt o COPY archivo?.txt archivo_destino.txt).

Cómo podemos ver, los parámetros que modifican el comportamiento de un comando en la consola de Windows son una letra precedida del carácter **/**. Podemos poner tantos parámetros como necesitemos para un comando.

El **Powershell** en lugar del carácter / los parámetros van precedidos de **-** como en Linux.

## [Comandos para trabajar con Directorios y Ficheros](https://docs.microsoft.com/es-es/powershell/scripting/samples/working-with-files-and-folders?view=powershell-7.1)
Los siguientes comandos se utilizan para trabajar con carpetas y ficheros.

Los _cmdlets_ normalmente tienen alias tanto para poder seguir usando los comandos clásicos como para no escribir tanto. Por ejemplo `Get-ChildItem` tiene como alias `dir`, `ls` y `gci`. Podemos ver todos los alias de un comando con `Get-Alias`. Ejemplo:
```powershell
Get-Alias -Definition Get-ChildItem
```

### Cambiar de directorio
- cmdlet: **`Set-Location`**
- cmd: **`cd`** (o `chdir`)

Cambia el directorio actual por el que le pasamos como parámetro. El cmd `cd` sin parámetros muestra la ruta del directorio actual (el _cmdlet_ para mostrar el directorio actual es **`Get-Location`**). 

Ejemplos:
- `cd C:\Usuarios`: Cambia al directorio C:\Usuarios que pasa a ser el directorio actual
- `cd ..`: Cambia al directorio paro del actual
- `cd`: Muestra la ruta absoluta del directorio actual
- `Set-Location -Path C:\Usuarios`: Cambia al directorio C:\Usuarios que pasa a ser el directorio actual. En este _cmdlet_ y en muchos otros podemos omitir el parámetro _-Path_ y poner directamente la ruta: `Set-Location C:\Usuarios`
- `Set-Location -Path ..`: Cambia al directorio padre del actual
- `Get-Location`: Muestra la ruta absoluta del directorio actual
- `Set-Location -Path .. -Passthru`: Cambia al directorio padre del actual y muestra por consola dónde se encuentra (es como hacer tras el _Set-Location_ un _Get-Location_)


### Ver el contenido de un directorio
- cmdlet: **`Get-ChildItem`**
- cmd: **`dir`**

Lista el contenido del directorio pasado como parámetro. Si no le pasamos ningún parámetro muestra el contenido del directorio actual. 

Principales parámetros de _dir_:
- _PATH_: de qué directorio queremos ver su contenido. Si no ponemos nada muestra el contenido del directorio actual
- **/s**: muestra también el contenido de todos los subdirectorios
- **/p**: si la lista es muy larga muestra pantalla por pantalla
- **/q**: muestra el propietario de cada fichero
- **/w**: muestra sólo los nombres de ficheros y directorios y en varias columnas
- **/a:atributo**: muestra sólo los ficheros con el atributo indicado (recordáis que los atributos son A, H, R y S)
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

Principales parámetros de _Get-ChildItem_:
- **`-Path PATH`**: de qué directorio queremos ver su contenido (podemos omitir el _-Path_)
- **`-Recurse`**: muestra también el contenido de los subdirectorios
- **`-Force`**: muestra también los archivos ocultos y del sistema (los que tienen los atributos **H** -_hidden_- o **S** -_system_-)
- **`-Filter`**, **`-Include`**, **`-Exclude`**: permite filtrar los resultados por el nombre. También se puede usar para filtrar el cmdlet **`Where-Object`** que es mucho más potente y el cmdlet **`Sort-Object`** para ordenar el resultado

Ejemplos:
- `Get-ChildItem`: Muestra el contenido del directorio actual
- `Get-ChildItem ..`: Muestra el contenido del directorio padre del actual
- `Get-ChildItem C:\Usuarios -Force`: Muestra el contenido del directorio C:\Usuarios, incluyendo ficheros ocultos y del sistema
- `Get-ChildItem -Include *.txt`: Muestra todos los ficheros del directorio actual con extensión .txt
- `Get-ChildItem -Include *.txt | Where-Object -FilterScript {($_.LastWriteTime -gt '2005-10-01') -and ($_.Length -ge 1mb) -and ($_.Length -le 10mb)}`: Muestra todos los ficheros del directorio actual con extensión .txt que se modificaron por última vez después del 1 de octubre de 2005, cuyo tamaño no es inferior a 1 megabyte ni superior a 10 megabytes
- `Get-ChildItem -Include *.txt | Where-Object -FilterScript {($_.LastWriteTime -gt '2015-10-01') -and ($_.Length -ge 1mb) -and ($_.Length -le 10mb)} | Sort-Object -Property Length`: Muestra todos los ficheros del directorio actual con extensión .txt que se modificaron por última vez después del 1 de octubre de 2015, cuyo tamaño es mayor o igual a 1 megabyte y menor o igual a 10 megabytes ordenados por tamaño

### tree
Muestra la estructura de directorios de la ruta indicada. Modificadores:
- **`/F`**: Muestra también los ficheros de cada directorio

Ejemplos:
- `tree`: Muestra la estructura de directorios desde el directorio actual
- `tree C:\`: Muestra toda la estructura de directorios de la unidad C:
- `tree C:\  /F`: Muestra toda la estructura de directorios de la unidad C: y los ficheros de cada directorio

### Crear un directorio o un fichero vacío
- cmdlet: **`New-Item`**
- cmd (directorios): **`mkdir`** (o `md`)

Crea un nuevo directorio que le pasamos como parámetro. Ejemplos:
- `mkdir clientes`: Crea un directorio llamado clientes dentro del directorio actual
- `mkdir ..\clientes`: Crea un directorio llamado clientes en el directorio paro del actual
- `mkdir C:\Usuarios\Juan\Documentos\clientes`: Crea el directorio clientes en C:\Usuarios\Juan\Documentos
- `mkdir clientes proveidors facturas`: Crea dentro del directorio actual los directorios clientes, proveidors y facturas
- `New-Item -Path 'clientes' -ItemType Directory`: Crea un directorio llamado clientes dentro del directorio actual
- `New-Item -Path '..\clientes' -ItemType Directory`: Crea un directorio llamado clientes en el directorio paro del actual
- `New-Item -Path 'C:\Usuarios\Juan\Documentos\clientes' -ItemType Directory`: Crea el directorio clientes en C:\Usuarios\Juan\Documentos

No hay ningún cmd para crear un fichero pero podemos hacerlo con el cmdlet `New-Item`:
- `New-Item -Path 'clientes.txt' -ItemType File`: Crea un fichero llamado clientes.txt dentro del directorio actual
- `New-Item -Path 'C:\Usuarios\Juan\Documentos\clientes.txt' -ItemType File`: Crea el fichero clientes.txt en C:\Usuarios\Juan\Documentos

### Borrar un directorio o fichero
- cmdlet: **`Remove-Item`**
- cmd:
  - directorios: **`rmdir`** (o `rd`)
  - ficheros: **`del`** (o `erase`)

Para borrar directorios usamos cmd `rmdir` que elimina el directorio que le pasamos como parámetro. Si el directorio no está vacío _rmdir_ devolverá un error (a menos que se le añada el modificador **/s**) mientras que _Remove-Item_ pedirá confirmación (a menos que se le añada el modificador **-Recurse**).

Ejemplos:
- `rd clientes`: Elimina el directorio clientes que hay dentro del directorio actual (tiene que estar vacío)
- `rd C:\Usuarios\Juan\Documentos\clientes`: Elimina el directorio clientes de la ubicación indicada (tiene que estar vacío)
- `rd /s clientes`: Elimina el directorio clientes que hay dentro del directorio actual y todo su contenido
- `Remove-Item -Path clientes`: Elimina el directorio clientes que hay dentro del directorio actual (si no está vacío pedirá confirmación)
- `Remove-Item -Path  C:\Usuarios\Juan\Documentos\clientes`: Elimina el directorio clientes de la ubicación indicada (si no está vacío pedirá confirmación)
- `Remove-Item -Path clientes -Recurse`: Elimina el directorio clientes que hay dentro del directorio actual y todo su contenido sin pedir confirmación

Para borrar ficheros el cmd es `del`. El cmdlet funciona como hemos visto. Ejemplos:
- `del lligme.txt`: Borra el fichero lligme.txt del directorio actual
- `del C:\Usuarios\juan\*.odt`: Borra todos los ficheros con extensión odt del directorio indicado
- `Remove-Item -Path lligme.txt`: Borra el fichero lligme.txt del directorio actual
- `Remove-Item -Path C:\Usuarios\juan\*.odt`: Borra todos los ficheros con extensión odt del directorio indicado

### Copiar directorios y ficheros
- cmdlet: **`Copy-Item`**
- cmd: **`copy`** y **`xcopy`**

#### copy
Copia lo indicado como primer parámetro (uno o varios ficheros o directorios) en el directorio especificado como segundo parámetro. El comando copy NO copia directorios. Ejemplos:
- `copy leeme.txt ..`: Copia el fichero leeme.txt del directorio actual a su directorio padre
- `copy C:\Windows\* F:\`: Copia todos los ficheros del directorio C:\Windows al directorio raíz de la unidad F: (pero no copiará los subdirectorios)

#### xcopy
Es igual que el comando copy pero permite copiar árboles de directorios y ficheros enteros. Principales modificadores:
- **/S**: Copia también los subdirectorios, excepto los vacíos
- **/E**: Copia también los subdirectorios, incluyendo los vacíos
- **/H**: Copia también los ficheros ocultos y del sistema
- **/D:m-d-y**: Copia sólo los modificados a partir de la fecha indicada

Ejemplos:
- `xcopy * F:\`: Copia todos los ficheros del directorio actual al directorio raíz de la unidad F: (pero no copiará los subdirectorios)
- `xcopy /E * F:\`: Copia todos los ficheros y subdirectorios del directorio actual al directorio raíz de la unidad F:

#### Copy-Item
Funciona como _xcopy_. Si ya existe el fichero en el destino se produce un error. Principales parámetros y modificadores:
- **-Path**: Indica la ruta de los objetos a copiar
- **-Destination**: Indica el directorio de destino
- **-Recurse**: Copia también los subdirectorios
- **-Force**: Si existe el fichero en el destino lo sobreescribe
- **-Filter**, **-Include**, **-Exclude**: Permite filtrar los objetos a copiar

Ejemplos:
- `Copy-Item -Path leeme.txt -Destination F:\`: Copia todos el fichero leeme.txt del directorio actual al directorio raíz de la unidad F:. También se puede poner `Copy-Item leeme.txt F:\`
- `Copy-Item -Path * -Destination F:\`: Copia todos los ficheros del directorio actual al directorio raíz de la unidad F: (pero no copiará los subdirectorios)
- `Copy-Item -Path * -Destination F:\ -Recurse`: Copia todos los ficheros y subdirectorios del directorio actual al directorio raíz de la unidad F:

### Mover directorios y archivos
- cmdlet: **`Move-Item`**
- cmd: **`move`**

Funcionan como los comandos de copiar pero en vez de hacer una copia se mueven los ficheros o directorios de ubicación. Después copiar tendremos el fichero 2 veces: donde estaba y donde lo hemos copiado. Si lo movemos se borra de donde estaba y se sitúa donde lo copiamos.

Funciona también con directorios sn necesidad de poner modificador (sin _-Recurse_ el cmdlet y sin _/S_ o _/E_ el cmd).

### Renombrar directorios y ficheros 
- cmdlet: **`Rename-Item`**
- cmd: **`ren`** (o `rename`)

Permite cambiar el nombre del fichero o directorio pasado como primer parámetro por el que le pasamos como segundo parámetro. Ejemplo:
- `ren C:\Windows\leeme.txt readme.txt`: Cambia el nombre del fichero leeme.txt del directorio C:\Windows por readme.txt
- `Rename-Item -Path C:\Windows\leeme.txt -NewName readme.txt`: Cambia el nombre del fichero leeme.txt del directorio C:\Windows por readme.txt

También podemos cambiar el nombre a muchos ficheros a la vez:
- `Get-ChildItem *.txt | Rename-Item -NewName { $_.Name -replace '.txt','.log' }`: Cambia la extensión de todos los ficheros .txt del directorio actual por .log

No se puede cambiar el directorio donde se encuentra el fichero con este comando. Para ello hay que usar _Move-Item_ / _move_ que permiten moverlo de lugar y además cambiar su nombre (si se lo especificamos en la ruta de destino)

### Ver y cambiar los atributos de un directorio o fichero
- **`attrib`**

Permite ver y cambiar los atributos de los ficheros. Los atributos que pueden tener los ficheros son:
- **A**: modificado. Se usa para hacer copias de seguridad incrementales: cada vez que se modifica un fichero Windows le pone este atributo y cuando se hace una copia de seguridad se le quita y así se puede saber cuáles se han modificado desde la última copia
- **H**: Hidden, oculto
- **R**: Read, sólo lectura
- **S**: System, fichero del sistema operativo

Ejemplos:
- `attrib`: Muestra los atributos de todos los ficheros del directorio actual
- `attrib +H lligme.txt`: Pone el atributo H al fichero lligme.txt del directorio actual (ahora ese fichero está oculto y no aparece al hacer un DIR o un Get-ChildItem)
- `attrib -R C:\boot.ini`: Quita el atributo R al fichero boot.ini del directorio raíz de C: por lo cual ahora se puede modificar ese fichero

## Comandos _CMD_ para trabajar con el contenido de un fichero

### Mostrar el contenido del fichero
- cmd: **`type`**
- cmd: **`more`**

`type` muestra por pantalla el contenido del fichero o ficheros pasados como parámetro.

`more` hace lo mismo pero si el contenido del fichero ocupa más de una pantalla lo muestra pantalla a pantalla, esperando a que el usuario pulse una tecla para mostrar la siguiente pantalla. Este comando se usa mucho para paginar cualquier cosa pasándosela en un pipe al more:
```cmd
dir C:\Windows | more
```

### Filtrar las líneas de un fichero
- cmd: **`find`***

Busca el texto pasado entre comillas como primer parámetro en el fichero pasado como segundo parámetro y muestra por pantalla las líneas que lo contengan. 

Ejemplo:
- `find "Muro" fijo.txt`: Muestra las líneas del fichero fijo.txt que contengan el texto Muro

### Ordenar un fichero
- cmd: **`sort`**

Ordena el contenido de un fichero de texto. La ordenación la hace por líneas. Modificadores:
- **/+n** (n = número): A partir de qué carácter de cada línea se ordena. Si no indicamos nada ordena por el primer carácter de cada línea
- **/R**: Hace la ordenación al revés, de mayor a menor

Ejemplos:
- `sort alumnos.txt`: Muestra el contenido del fichero alumnos.txt ordenado
- `sort /+10 alumnos.txt`: Muestra el contenido del fichero alumnos.txt ordenado a partir de la posición 10 de cada línea (ignora las anteriores para hacer la ordenación)
- `sort /R alumnos.txt`: Muestra el contenido del fichero alumnos.txt ordenado de mayor a menor

A los comandos _more_, _find_ y _sort_ se los denomina filtros porque reciben una entrada, la filtran o modifican y devuelven una salida que es esa entrada modificada.

### Comparar ficheros
- cmd: **`fc`**

Compara el contenido de los ficheros pasado como parámetro y muestra por pantalla las líneas que tengan alguna diferencia. Ejemplo:
- `fc fichero1.txt fichero2.txt`: Muestra por pantalla las líneas que sean diferentes entre los ficheros fichero1.txt y fichero2.txt del directorio actual

## _CMDLETS_ para trabajar con el contenido de un fichero
Existen muchas formas en Powershell de mostrar, filtrar y ordenar el contenido de un fichero. La más sencilla es usar el _cmdlet_ **`Get-Content`** para mostrarlo y luego usar **`Where-Object`**, **`Sort-Object`**, etc. para filtrarlo, ordenarlo, etc ya que estos comandos (como todos) trabajan sobre objetos y funcionan tanto sobre ficheros como sobre las líneas de un fichero.

Ejemplo:
- `Get-Content fijo.txt | Where-Object {$_ -match "Muro"}`: Muestra las líneas del fichero fijo.txt que contengan el texto Muro. Fíjate que buscamos en toda la línea ($_) y no en un campo concreto ($_.Localitat) porque todo el contenido es texto, no hay definidos campos. Si queremos todas las líneas que NO contengan un texto en lugar de `-match` usaremos **`-notmatch`**.
- `Get-Content fijo.txt | Where-Object {$_ -match "Muro"} | Sort-Object`: Muestra las líneas del fichero fijo.txt que contengan el texto Muro ordenadas alfabéticamente

Si se trata de un fichero de texto delimitado por un carácter (CSV) podemos convertirlo en un objeto con sus campos con **`Import-Csv`** y con él podemos filtrar por campo, ordenar por campo, mostrar sólo algunos campos y cualquier otra cosa que se nos ocurra.

Ejemplos:
- `Import-Csv delimitado.txt -Delimiter ";"`: Convierte el fichero CSV en un objeto y nos muestra cada item con sus propiedades
- `Import-Csv delimitado.txt -Delimiter ";" | Format-Table`: Convierte el fichero CSV en un objeto y nos muestra cada item con sus propiedades en formato tabla (por defecto aparece en formato lista `Format-List`)
- `Import-Csv delimitado.txt -Delimiter ";" | Out-GridView `: Convierte el fichero CSV en un objeto y lo muestra en una tabla grid en una ventana
- `Import-Csv delimitado.txt -Delimiter ";" | Where-Object {$_.Localitat -match "Muro"}`: Muestra las líneas del fichero fijo.txt que contengan el texto "Muro" en el campo "Localitat". Fíjate que ahora sólo filtra por dicho campo por lo que si hay un alumno cuyo apellido sea "Muro" no aparecerá (en el ejemplo de texto fijo sí que aparecería)
- `Import-Csv delimitado.txt -Delimiter ";" | Sort-Object -Property 1rCognom, 2nCognom`: Convierte el fichero CSV en un objeto y lo ordena por los campos 1rCognom y, los que lo tengan igual, 2nCognom
- `Import-Csv delimitado.txt -Delimiter ";" | Where-Object {$_.Localitat -match "Muro"} | Select-Object 1rCognom, 2nCognom, Nom`: De las líneas del fichero fijo.txt que contengan el texto "Muro" en el campo "Localitat" muestra sólo los campos 1rCognom, 2nCognom y Nom
- 
## Redireccionamiento de comandos
### Dispositivos
La comunicación de la terminal con el exterior se hace, por defecto, mediante 3 dispositivos:
- dispositivo estándar de **entrada**, que es el **teclado**. Es el dispositivo por el que se introduce la información
dispositivo estándar de **salida**, que es el **monitor**. Es por donde el sistema muestra la información al usuario
dispositivo estándar de **error**, que también es el **monitor**. Es por donde el sistema muestra los mensajes de error al usuario

A los dispositivos estándar de entrada y salida se los conoce como **consola** (o abreviado **CON**). Los dispositivos que se utilizaban en la consola tradicional CMD son:
- **CON**: consola. Es el dispositivo que se utiliza por defecto y está formado por el teclado y el monitor
- **NUL**: es un dispositivo ficticio que hace desaparecer todo el que le se envía. Por ejemplo si no queremos que los errores aparezcan en el monitor redireccionamos la salida de error al dispositivo NUL.
- Otros dispositivos: _LPTn_ que hace referencia a los puertos paralelos del ordenador (hasta 3, LPT1, LPT2 y LPT3). Antiguamente la impresora estaba conectada al puerto LPT1 que también se denomina _PRN_. _COMn_ que identifica los puertos serie y pueden haber 4 (COM1, COM2, COM3 y COM4)...

Podemos utilizar estos dispositivos en los comandos. Por ejemplo:
- `copy prueba.txt PRN`: Copia el fichero prueba.txt del directorio actual en el dispositivo PRN, o sea, lo envía a la impresora conectada en el primer puerto paralelo. Es otra forma de imprimir un fichero (seria equivalente al comando PRINT prueba.txt)
- `copy prueba.txt .. 2> NUL`: Copia el fichero prueba.txt del directorio actual en el directorio padre del actual y si se produce algún error en vez de mostrarlo por el monitor lo envía a NUL (es decir desaparece)

### Operadores de redireccionamiento
Cómo hemos comentado, la entrada y salida por defecto es CON (el teclado y el monitor), por ejemplo si ejecutamos el comando DATE muestra la fecha actual por el monitor y espera que introducimos una nueva fecha por el teclado.

Pero es posible redireccionar la entrada y la salida para que se utilizo otro dispositivo, un fichero o, incluso, otro comando. Los operadores que lo hacen posible son:
- **<**: redirecciona la entrada al fichero o dispositivo indicado (poco usual)
- **>**: redirecciona la salida al fichero o dispositivo indicado. Si se un fichero lo creará (y si ya existe lo truncará, es decir, eliminará su contenido)
- **>>**: redirecciona la salida a un fichero y, si ya existe, lo añade al final
- **2>**: redirecciona la salida de error a un fichero o dispositivo
- **|**: redirecciona la salida del comando a su izquierda a la entrada del comando a su derecha. Se utiliza habitualmente con los filtros (more, find, sort).

Ejemplos:
- `dir C:\Usuarios\juan > ficheros_de_juan`: La lista de ficheros del directorio indicado la guarda en un fichero llamado ficheros_de_juan. Si el fichero existe lo truncará
- `dir C:\Usuarios\juan >> ficheros_de_juan`: La lista de ficheros del directorio indicado la añade al fichero llamado ficheros_de_juan. Si ya existe el fichero añadirá la lista al final
- `sort alumnos.txt > alumnos_ordenado.txt`: Copia el contenido del fichero alumnos.txt ordenado al fichero alumnos_ordenado.txt
- `dir | more`: Muestra el contenido del directorio actual pantalla a pantalla
- `find “Alcoi” alumnos.txt | sort >> alumnos_ordenado.txt`: Filtra en el fichero alumnos.txt las líneas que contengan la palabra Alcoi, envía esas líneas al comando suerte que las ordena y el resultado (los alumnos que son de Alcoi, ordenados) se añade al fichero alumnos_ordenado.txt

En Powershell podemos utilizar igual los operadores de redirección **>**, **2>** y **|** (no _<_ que no está implementado) pero además podemos redireccionar la salida con el comando **`Out-File`** que guarda la salida en el fichero que le indiquemos. Ejemplos:
- `Get-ChildItem C:\Usuarios\juan | Out-File ficheros_de_juan`: La lista de ficheros del directorio indicado la guarda en un fichero llamado ficheros_de_juan. Si el fichero existe lo truncará
- `Get-ChildItem C:\Usuarios\juan | Out-File -Append ficheros_de_juan`: La lista de ficheros del directorio indicado la añade al fichero llamado ficheros_de_juan. Si ya existe el fichero añadirá la lista al final

Además podemos enviar la salida **a un fichero y al monitor** con el _cmdlet_ **`Tee-Object`**. Ejemplos:
- `Get-ChildItem C:\Usuarios\juan | Tee-Object ficheros_de_juan`: La lista de ficheros del directorio indicado la muestra en el monitor y además la guarda en un fichero llamado ficheros_de_juan. Si el fichero existe lo truncará
- `Get-ChildItem C:\Usuarios\juan | Tee-Object -Append ficheros_de_juan`: La lista de ficheros del directorio indicado la muestra en el monitor y además la añade al fichero llamado ficheros_de_juan. Si ya existe el fichero añadirá la lista al final

## Comandos para gestionar la red
### CMD
- **`ipconfig`**: Muestra información de la configuración de red del equipo (dirección ip, puerta de enlace, etc). Modificadores:
  - **/all**: Muestra toda la información
  - **/renew**: Vuelve a pedir IP al servidor DHCP
- **`ping`**: Envía un ping al ordenador especificado como parámetro. Podemos indicar el ordenador por su nombre o por su IP. Nos permite comprobar la conectividad de la red y su velocidad.
- **`tracert`**: Igual que ping pero no sólo muestra el tiempo que ha tardado la respuesta sino todos los equipos por los cuales ha pasado el ping antes de llegar a su destino.
- **`netstat`**: Muestra estadísticas de las conexiones actualmente establecidas.
- **`nslookup`**: Resuelve el nombre de dominio indicado, mostrando cuál es su IP

### cmdlets
- **`Get-NetAdapter`**: Muestra las propiedades básicas del adaptador de red
- **`Get-NetIpAddress`**: Muestra la configuración de la dirección IP, tanto IPv4 como IPv6 y las interfaces de red respectivas
- **`Get-NetIPConfiguration`**: Muestra información de la configuración de red, interfaces utilizables, direcciones IP y direcciones DNS del sistema.
- **`Get-NetRoute`**: Muestra toda la tabla de rutas
- **`Enable-NetAdapter -Name "Ethernet"`**: Activa la interfaz llamada Ethernet
- **`Disable-NetAdapter -Name "Ethernet"`**: Desactiva la interfaz llamada Ethernet
- **`Enable-NetAdapter -Name "Ethernet"`**
- **`Rename-Adapter -Name "Ethernet" - NewName "Externa"`**: Renombra un adaptador de red
- **`Get-NetAdapter -Name "Ethernet" | Remove-NetIPAddress`**: Elimina la IP de adaptador "Ethernet"
- **`New-NetIPAddress -InterfaceAlias "Ethernet" -IPv4Address 192.168.1.25 -PrefixLength "24"`**: Se asigna a la interfaz "Ethernet" la IP 192.168.1.25/24
- **`Test-NetConnection -ComputerName 8.8.8.8`**: Realiza un ping a 8.8.8.8
- **`Test-NetConnection 8.8.8.8 –TraceRoute`**: Ejecuta un tracert a 8.8.8.8
- **`Resolve-DnsName google.com`**: Ejecuta un Nslookup a google.com
- **`Get-NetTCPConnection`**: Muestra el estado actual de la red, los puertos y su propietario (como netstat)
- **`Get-NetTCPConnection –State Established`**: igual que la anterior pero muestra sólo las conexiones establecidas

## Comandos para gestionar discos
### CMD
- **`diskpart`**: Se trata de un programa en modo texto que permite gestionar las particiones de nuestros discos
- **`chkdsk`**: Permite comprobar un sistema de archivos FAT o NTFS. Ejemplo: `chkdsk E:`
- **`defrag`**: Desfragmenta el sistema de archivos que le indicamos. Ejemplo: `defrag E:`
- **`format`**: Formatea una partición con sistema de archivos FAT o NTFS. Ejemplo: `format E:`
- **`convert`**: Convierte una partición FAT a NTFS sin perder los datos

### cmdlets
- **`Get-Disk`**: muestra los discos de ordenador
- **`Get-Partition`**: muestra las particiones
- **`Get-StoragePool`**: muestra los pools de almacenamiento del servidor
- **`Initialize-Disk`**: inicializa un nuevo disco añadido al equipo (luego habrá que hacer particiones y formatearlas). Ejemplo: `Initialize-Disk -Number 1 -PartitionStyle GPT`
- **`New-Partition -DiskNumber 1 -Size 150GB -AssignDriveLetter`**: crea una partición de 150GB en el disco 1 y hace que se le asigne una letra automáticamente (por ejemplo la E:)
- **`Get-Volume -DriveLetter E:`**: Muestra información de la partición E: (si no está formateada el espacio disponible será 0)
- **`Format-Volume -DriveLetter E -FileSystem NTFS`**: formatea la partición E: a NTFS
- **`Optimize-Volume -DriveLetter E -Defrag -Verbose`**: inicia la desfragmentación del disco E: mostrando todos los detalles de la operación
- **`Optimize-Volume -DriveLetter E -ReTrim -Verbose`**: optimiza un disco SSD que admite TRIM
- **`Remove-Particion -DriveLetter E`**: Elimina la partición E:

## [Comandos para gestionar procesos](https://docs.microsoft.com/es-es/powershell/scripting/samples/managing-processes-with-process-cmdlets?view=powershell-7.1)
### Ver los procesos
Para ver los procesos del sistema usamos el _cmdlet_ **`Get-Process`**. Ejemplos:
- **`Get-Process`**: Muestra todos los procesos
- **`Get-Process -Id 2398`**: Muestra el proceso 2398
- **`Get-Process -Name firefox*`**: Muestra todos los procesos cuyo nombre comience por firefox

### Detener procesos
El _cmdlet_ que se usa es **`Stop-Process`**. Ejemplos:
- **`Stop-Process -Id 2398`**: Mata el proceso 2398
- **`Stop-Process -Name firefox*`**: Mata todos los procesos cuyo nombre comience por firefox
- **`Stop-Process -Name firefox* Confirm`**: Mata todos los procesos cuyo nombre comience por firefox pero antes pide confirmación para cada uno
- **`Get-Process | Where-Object -FilterScript {$_.Responding -eq $false} | Stop-Process`**: Mata todos los procesos que no estén respondiendo

### Iniciar procesos
El _cmdlet_ que se usa es **`Start-Process`**. Ejemplo:
- **`Stop-Process notepad.exe`**: Inicia un bloc de notas
