# La terminal de Windows

## Introducción
La línea de comandos de Windows es una implementación de la consola de Ms-DOS para la interfaz gráfica del sistema operativo Windows.

Para abrir una terminal de la línea de comandos en Windows se hace desde el menú o también ejecutando el programa **`cmd.exe`**.

Windows 7 y posteriores incluyen también el entorno a ejecución de comandos **PowerShell** que pretende ser una herramienta tan potente como la terminal en Linux. PowerShell combina características de una consola de comandos y del framework .NET de Microsoft, que está orientado a objeto, y permite hacer la mayoría de tareas de configuración del sistema operativo.

PowerShell incluye _alias_ para muchos de sus comandos lo que permite ejecutarlos usando los comandos de la consola de Windows y también en muchos casos los comandos de GNU/Linux. Por ejemplo para obtener el listado de ficheros de la carpeta C:\ podemos usar el comando PS
```powershell
Get-Children -Path C:\
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
Está basado en objetos por lo que en lugar de procesar texto como la mayoría de intérpretes de comandos procesa objetos. A sus comandos se les llama **cmdlets** y están formados por un verbo (_Get_, _Set_, ...) y un nombre de objeto sobre el que realizar la acción (_Locatiom_, _Iten_, _Content_, _Process_, _Service_, ...) separados por un **-**.

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

### Obtener ayuda
Para obtener la ayuda de un comando ejecutaremos el cmdlet
```powershell
Get-Help NombreDelCmdlet
```

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
