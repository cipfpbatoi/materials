# La terminal de Windows
- [La terminal de Windows](#la-terminal-de-windows)
  - [Introducción](#introducción)
  - [Redireccionamiento de comandos](#redireccionamiento-de-comandos)
    - [Dispositivos](#dispositivos)
    - [Operadores de redireccionamiento](#operadores-de-redireccionamiento)
  - [La consola CMD](#la-consola-cmd)
  - [PowerShell](#powershell)

## Introducción
La línea de comandos de Windows es una implementación de la consola de Ms-DOS para la interfaz gráfica del sistema operativo Windows.

Para abrir una terminal de la línea de comandos en Windows se hace desde el menú o también ejecutando el programa **`cmd.exe`**.

Windows 7 y posteriores incluyen también el entorno a ejecución de comandos **`PowerShell`** que pretende ser una herramienta tan potente como la terminal en Linux. PowerShell combina características de una consola de comandos y del framework .NET de Microsoft, que está orientado a objeto, y permite hacer la mayoría de tareas de configuración del sistema operativo. A los comandos de Powershell se les llama _cmdlets_.

PowerShell incluye _alias_ para muchos de sus _cmdlets_ lo que permite ejecutarlos usando los comandos de la consola de Windows y también en muchos casos los comandos de GNU/Linux. Por ejemplo para obtener el listado de ficheros de la carpeta C:\ podemos usar el _cmdlets_
```powershell
Get-ChildItem -Path C:\
```

o bien uno de sus alias
```powershell
dir C:\
ls C:\
```

Windows **no diferencia entre mayúsculas y minúsculas** por lo cual podemos utilizar los comandos y sus argumentos en mayúsculas o en minúsculas.

Tanto desde la consola clásica como desde la de Powershell está restringida la ejecución de algunos comandos de administración. Para ejecutarlos debemos hacerlo desde una consola de Administrador. En Powershell se selecciona en el menú de inicio y en CMD se busca y a continuación con el botón derecho del ratón elegimos '_Abrir como Administrador_'.

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
- **`<`**: redirecciona la entrada al fichero o dispositivo indicado (poco usual)
- **`>`**: redirecciona la salida al fichero o dispositivo indicado. Si se un fichero lo creará (y si ya existe lo truncará, es decir, eliminará su contenido)
- **`>>`**: redirecciona la salida a un fichero y, si ya existe, lo añade al final
- **`2>`**: redirecciona la salida de error a un fichero o dispositivo
- **`|`**: redirecciona la salida del comando a su izquierda a la entrada del comando a su derecha. Se utiliza habitualmente con los filtros (more, find, sort).

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

## [La consola CMD](ConsolaCMD.md)

## [PowerShell](./PowerShell.md)

