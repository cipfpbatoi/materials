# Servicios de archivo y almacenamiento
- [Servicios de archivo y almacenamiento](#servicios-de-archivo-y-almacenamiento)
  - [Introducción](#introducción)
  - [Crear un recurso compartido](#crear-un-recurso-compartido)
    - [Publicar una carpeta compartida](#publicar-una-carpeta-compartida)
  - [Administrador de recursos del servidor de archivos (FSRM)](#administrador-de-recursos-del-servidor-de-archivos-fsrm)
    - [Cuotas de disco](#cuotas-de-disco)
    - [Filtrado de archivos](#filtrado-de-archivos)
    - [FSRM con Powershell](#fsrm-con-powershell)
  - [iSCSI](#iscsi)
  - [Carpetas de trabajo](#carpetas-de-trabajo)

## Introducción
Se trata de una herramienta desde la que gestionar todo el almacenamiento del servidor. Accedemos a ella desde una opción del menú de la izquierda del _Administrador del servidor_. Tiene varias opciones:
- Servidores: para ver todos los servidores que estamos gestionando
- Volúmenes: aparecen todos los volúmenes que hay creados en el servidor. También podemos filtrarlos por _Discos_ o por _Grupos de almacenamiento_. Para el volumen seleccionado muestra información de su disco y los recursos compartidos y discos virtuales iSCSI creados en él:

![Servicios de archivo y almacenamiento - Volúmenes](media/servarch-vol.png)

- Recursos compartidos: aquí podemos ver los recursos compartidos en cualquier volumen e información sobre ellos:

![Servicios de archivo y almacenamiento - Recursos](media/servarch-recursos.png)

- iSCSI: aquí nos muestra los discos iSCSI
- Carpetas de trabajo: se utilizan para poder tener sincronizados los datos que se utilizan en dispositivos que a veces necesitan acceso a ellos sin estar conectados a la red de la empresa

## Crear un recurso compartido
Desde las _Tareas_ podemos gestionar los volúmenes (extender o eliminar un volumen, formatearlo, comprobar el sistema de archivos, ...) y crear un nuevo recurso compartido.

Podemos compartir recursos usando el protocolo SMB/CIFS (el nativo de Windows) o NFS (usado en GNU/Linux). Además desde la opción _Avanzado_ podemos establecer **cuotas de disco** y otras características.

Si compartimos un recurso desde a opción _Básico_ nos pregunta dónde crear la carpeta, su nombre y los permisos NTFS que tendrá. Por defecto en SMB asigna el permiso _Control total_ a _Todos_. Podemos _personalizar_ tanto los permisos NTFS como los SMB desde el asistente o después de crear el recurso, desde el `botón derecho -> Propiedades`.

Si instalamos el **_Administrador de recursos del servidor de archivos_** podemos crear un nuevo recurso compartido usando la opción _Avanzado_ que además de las opciones del _Básico_ nos permite indicar:
- el uso de esa carpeta (si es para archivos de un usuario -como su carpeta particular-, de un grupo -ficheros que usa un grupo de usuarios-, archivos de copia de seguridad o archivos de programa)
- si queremos establecer cuotas en la carpeta (lo veremos más adelante).

### Publicar una carpeta compartida
Si queremos podemos publicar la carpeta compartida desde _Usuarios y equipos de Active Directory_ para que los usuarios la puedan encontrar más fácilmente (la pueden buscar con la herramienta de _Buscar en Active Directory_).

Para ello vamos a la OU donde queramos publicarla y escogemos `Nuevo -> Carpeta compartida`. Indicamos el nombre de la carpeta compartida y su ruta y podemos añadir palabras clave que ayuden al usuario a encontrarla. 

NOTA: este proceso no crea la carpeta compartida. La debemos haber creado y compartido previamente

## Administrador de recursos del servidor de archivos (FSRM)
Se trata de un rol que nos permite configurar más cosas en los recursos, como cuotas de disco. Este rol se encuentra dentro de `Servicios de archivo y almacenamiento -> Servicios de iSCSI y archivo`.

Tras instalarlo podemos abrirlo desde las _Herramientas_ del _Administrador del servidor_:

![Administrador de recursos del servidor de archivos](media/admrecservarch.png)

**NOTA**: Para acceder al _Administrador_ desde fuera del servidor debemos:
- instalar la característica **_RSAT: Herramientas de servicios de archivo_**
- al abrir la herramienta, desde el menú `Acción -> Conectarse a otro equipo` debemos indicar el equipo remoto al que conectarnos
- debemos configurar el firewall del servidor para que permita el tráfico de FSRM: `Get-NetFirewallRule -Name "FSRM*" | Set-NetFIrewallRule -Enabled True`

Lo que podemos gestionar desde aquí es:
- Cuotas de disco
- Filtrado de archivos
- Informes de almacenamiento: podemos ver los informes generados automáticamente al configurar cuotas o filtrados
- Clasificaciones
- Tareas de administración de archivos

### Cuotas de disco
Permiten limitar la cantidad de espacio que un usuario puede utilizar en una carpeta compartida. Si se establecen el espacio disponible que a aparecerá al usuario no será el espacio real disponible en la carpeta sino el que él puede usar según establece su cuota.

Hay varias plantillas creadas que podemos usar o podemos crear nuestras propias plantillas de cuota. En ellas se establece:
- el espacio máximo disponible para el usuario
- si no pueden superarlo (cuota máxima) o sí pueden pero les aparecerá una advertencia (cuota de advertencia)
- umbrales a partir de los cuales se le informará al usuario de que está cerca de llegar a su cuota. Para cada umbral indicaremos:
  - el % del espacio ocupado que activará el umbral
  - si se enviará un email a los administradores
  - si se enviará un email al usuario que ha superado el umbral
  - si se generará un evento
  - si se ejecutará un comando o script
  - si se generará un informe de almacenamiento

### Filtrado de archivos
Permite impedir que se almacenen en la carpeta compartida determinados tipos de archivo (vídeo, imágenes, ejecutables, ...).

Como con las cuotas hay creadas unas plantillas que podemos usar o podemos crear nuestras propias plantillas y configuraremos:
- el tipo de archivos a filtrar (hay creados varios tipos y podemos crear otros)
- si no podrán guardar el archivo que no pasa el filtro (filtrado activo) o sí pueden (filtrado pasivo)
- si se enviará un email a los administradores cuando un usuario intenta guardar un archivo que no pasa el filtro
- si se enviará un email al usuario
- si se generará un evento
- si se ejecutará un comando o script
- si se generará un informe de almacenamiento

### FSRM con Powershell
Una vez hemos instalado el rol de _Administración de recursos del servidor de archivos_ (FSRM, _File Server Resource Manager_) Se añaden a PowerShell unos comandos que tienen el prefijo fsrm. Algunos de los más útiles son:
- `Get-fsrmSetting`: devuelve o muestra la configuración de nuestro servidor de archivos
- `New-fsrmQuotaTemplate`: nos va a permitir crear una nueva plantilla de cuotas
- `New-fsrmAction`: nos permite definir una acción que utilizaremos una vez un usuario sobrepase el límite de umbral establecido
- `New-fsrmQuotaThreshold`: nos va a permitir establecer un umbral a partir del cual generaremos una acción (enviar un correo,  notificar un evento, etc.)
- `New-FsrmFileGroup`: nos permite definir un grupo de archivos para filtrar
- `New-FsrmFileScreenTemplate`: nos va a permitir crear una plantilla con los grupos que nosotros elijamos

Nos será de utilidad, definirnos variables para utilizarlas en los distintos comandos.

**Ejemplo creación de cuota**
Vamos a definir una cuota para el recurso compartido _E:\Shares\Diseny_ que cuando el usuario supere el umbral del 85% registre un evento de warning informando de lo ocurrido.

Primero vamos a definirnos la variable _Action_ en la cual definiremos la acción a realizar cuando superemos el umbral, que va a ser registrarlo en el visor de eventos.
```powershell
$Action = New-FsrmAction -Type Event -EventType Warning -Body "El usuario [Source Io Owner] ha superado el 85% de la cuota de 10MB"
```

Después definimos el limite a partir del cual se generará la acción.
```powershell
$Limite = New-FsrmQuotaThreshold -Percentage 85 -Action $Action
```

Finalmente creamos la nueva plantilla asignándole el umbral que hemos establecido en la variable anterior.
```powershell
New-FsrmQuotaTemplate -Name "Limite para Diseño" -Size 50GB -Threshold $Limite
```

Una vez creada la plantilla, solo necesitamos asignarla.
```powershell
New-FsrmQuota -Path E:\Shares\Diseny -Template "Limite para Diseño"
```

**Ejemplo creación de filtro de archivos**
Vamos a definir un grupo de archivos que usaremos para crear una plantilla que posteriormente asignaremos a un recurso compartido. Junto con todos los ejecutables, vamos a bloquear los archivos: *.pdf.

Lo primero que hacemos es crear el grupo de archivos para incluir los pdf, jpg y html.
```powershell
New-FsrmFileGroup -Name "Grupo de archivos pdf" -IncludePattern "*.pdf"
```

A continuación creamos la plantilla con los grupos que queremos bloquear. Como necesitamos incluir más de un grupo a nuestra plantilla (un array de grupos) se deben añadir separados por comas utilizando el parámetro @("grupo1", "grupo2",...,"grupoN"). Esto sirve igual si queremos añadir a un grupo mas de un tipo de archivos. 
```powershell
New-FsrmFileScreenTemplate -Name "Bloquear los ejecutables y los archivos .pdf" -IncludeGroup @("Grupo de archivos pdf, jpg y html", "Bloquear archivos ejecutables")
```

Finalmente solo quedaría añadir esta plantilla al recurso compartido que queramos.

En la página de Microsoft podemos ver los distintos [cmdlets FSMR](https://docs.microsoft.com/es-es/previous-versions/windows/powershell-scripting/jj900651(v%3dwps.620)).

## iSCSI
iSCSI (Abreviatura de Internet SCSI) es un estándar que permite el uso del protocolo SCSI sobre redes TCP/IP. iSCSI es un protocolo de la capa de transporte definido en las especificaciones SCSI-3.

La adopción del iSCSI en entornos de producción corporativos se ha acelerado gracias al aumento del Gigabit Ethernet ya que es menos costosa y está resultando una alternativa a las soluciones SAN basadas en Canal de fibra. (Fuente [Wikipedia](https://es.wikipedia.org/wiki/ISCSI#:~:text=iSCSI%20(Abreviatura%20de%20Internet%20SCSI,SCSI%20sobre%20redes%20TCP%2FIP.&text=La%20fabricaci%C3%B3n%20de%20almacenamientos%20basados,basadas%20en%20Canal%20de%20fibra.))

El `Servidor de destino iSCSI` es un rol de servidor que permite que una máquina de Windows Server funcione como un dispositivo de almacenamiento. Una vez instalado crearemos en este servidor uno o más discos virtuales (desde `Administrador del servidor -> Servicios de archivo y almacenamiento -> iSCSI`) y configuraremos los servidores que podrán conectarse a él (_iniciadores iSCSI_).

Una vez configurado, en los servidores que vayan a usar ese disco arrancamos el servicio **_Iniciador iSCSI_** (`Set-Service -Name MSiSCSI -StartupType Automatic`).

A continuación iniciamos el _iniciador iSCSI_ (_iscsicpl.exe_) y en la pestaña _Descubrir_ buscamos el servidor de almacenamiento configurado antes y conectamos el disco, configurando la interfaz de red por la que se conectará al mismo.

Podéis encontrar muchas páginas de internet donde explican el proceso, como [¿Cómo configurar y conectar un disco iSCSI en Windows Server?](https://informaticamadridmayor.es/tips/como-configurar-y-conectar-un-disco-iscsi-en-windows-server/).

## Carpetas de trabajo
Permiten tener sincronizados los archivos de un usuario entre sus distintos dispositivos. Sería una especie de **_OneDrive_** pero gestionado por nosotros.

Podemos encontrar información de cómo implementarlas en la web de [Microsoft](https://docs.microsoft.com/es-es/windows-server/storage/work-folders/deploy-work-folders).