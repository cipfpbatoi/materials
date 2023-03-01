# iSCSI y otros servicios de archivo
- [iSCSI y otros servicios de archivo](#iscsi-y-otros-servicios-de-archivo)
  - [Introducción](#introducción)
  - [iSCSI](#iscsi)
    - [Utilizar discos iSCSI](#utilizar-discos-iscsi)
    - [Proporcionar discos iSCSI](#proporcionar-discos-iscsi)
  - [_Distributed File System (DFS)_](#distributed-file-system-dfs)
    - [Espacios de nombres DFS](#espacios-de-nombres-dfs)
    - [Replicación DFS](#replicación-dfs)
  - [Carpetas de trabajo](#carpetas-de-trabajo)

## Introducción
En este apartado veremos las opciones que nos proporciona Windows para trabajar con discos iSCSI, así como otros servicios de archivo interesantes como el _espacio de nombres DFS_.

## iSCSI
iSCSI (Abreviatura de Internet SCSI) es un estándar que permite el uso del protocolo SCSI sobre redes TCP/IP. iSCSI es un protocolo de la capa de transporte definido en las especificaciones SCSI-3.

La adopción del iSCSI en entornos de producción corporativos se ha acelerado gracias al aumento del Gigabit Ethernet ya que es menos costosa y está resultando una alternativa efectiva a las soluciones SAN basadas en Canal de fibra. (Fuente [Wikipedia](https://en.wikipedia.org/wiki/ISCSI)).

Windows Server permite utilizar como almacenamiento una cabina de discos SAN y también puede emular una para proporcionar su almacenamiento a otros equipos.

### Utilizar discos iSCSI
Si tenemos un dispositivo que proporciona discos iSCSI (cabina de discos o equipo con el software específico para ello) podemos utilizarlos en cualquier equipo. Para ello arrancamos el servicio **_Iniciador iSCSI_** (`Set-Service -Name MSiSCSI -StartupType Automatic`).

A continuación iniciamos el programa _iniciador iSCSI_ (_iscsicpl.exe_) y en la pestaña _Descubrir_ buscamos el servidor de almacenamiento configurado en nuestra red y conectamos el disco, configurando la interfaz de red por la que se conectará al mismo.

Con esto ya tenemos un nuevo espacio de almacenamiento en nuestra máquina que deberemos configurar desde el _Administrador de discos_, activándolo y creando en el mismo las particiones y sistemas de archivo que deseemos.

Recordad que para obtener un buen rendimiento la red con la que nos conectamos a los discos iSCSI debe ser una red independiente de la LAN de nuestra empresa.

### Proporcionar discos iSCSI
Un equipo con Windows Server puede convertirse en un dispositivo de almacenamiento que proporcione discos iSCSI a otros equipos de nuestra red. Para ello se debe instalar el rol de `Servidor de destino iSCSI` (se encuentra dentro de _Servicios de almacenamiento_).

Una vez instalado crearemos en este servidor uno o más discos virtuales (desde `Administrador del servidor -> Servicios de archivo y almacenamiento -> iSCSI`) y configuraremos los servidores que podrán conectarse a él (_iniciadores iSCSI_).

Podéis encontrar muchas páginas de internet donde explican el proceso, como [¿Cómo configurar y conectar un disco iSCSI en Windows Server?](https://informaticamadridmayor.es/tips/como-configurar-y-conectar-un-disco-iscsi-en-windows-server/).

## _Distributed File System (DFS)_

### Espacios de nombres DFS 
Es un rol de Windows Server que permite mostrar carpetas compartidas ubicadas en diferentes servidores como una única estructura jerárquica de carpetas, de forma que el usuario ve en una vista única carpetas compartidas en diferentes servidores. Esto permite referenciar todos los recursos compartidos de una manera uniforme, sin importarn dónde estén físicamente.

![Espacio de nombres DFS](https://learn.microsoft.com/es-es/windows-server/storage/dfs-namespaces/media/dfs-overview.png)

En el servidor (puede ser un DC o un servidor miembro) debemos instalar el rol `Espacios de nombres DFS` que se encuentra dentro de `Servicios de archivo y almacenamiento -> Servicios de iSCSI y archivos`.

Para instalarlo con Powershell ejecutamos:
```powershell
Install-WindowsFeature "FS-DFS-Namespace", "RSAT-DFS-Mgmt-Con"
```

(el segundo paquete son las características del rol)

Una vez instalado se gestiona desde la herramienta `Administración de DFS`. El primer paso es crear un nuevo espacio de nombres a partir del cual enlazaremos las distintas carpetas. Una vez creado creamos en el mismo las distintas carpetas a compartir. Si la carpeta ya existe y está compartida la seleccionamos. Si no existe al poner su ruta nos pregunta si queremos que la cree.

Ahora ya podemos hacer referencia a cuaquier recurso compartido, por ejemplo, si en el dominio _Acme.lan_ hemos creado el espacio _Public_ que contiene la carpeta compartida _AdminDominio_ su ruta sería `\\Acme.lan\Public\AdminDominio`.

Podéis ampliar la información sobre DFS en la [web de Microsoft](https://learn.microsoft.com/es-es/windows-server/storage/dfs-namespaces/dfs-overview) así como los [_cmdlets_ de Powershell](https://learn.microsoft.com/es-es/powershell/module/dfsn/?view=windowsserver2022-ps) para trabajar con _DFS_.

### Replicación DFS
Es un servicio que permite replicar carpetas en varios servidores y sitios.

_Servicios de dominio de Active Directory (AD DS)_ utiliza replicación DFS para replicar la carpeta SYSVOL en los distintos DC del dominio.

Si hemos instalado _Espacios de nombres DFS_ se administra igual que ese servicio desde el _Admnistrador de DFS_. Si no debemos instalar el rol `Replicación DFS` que se encuentra dentro de `Servicios de archivo y almacenamiento -> Servicios de iSCSI y archivos`.

Veremos que ya hay creado un grupo de replicación llamado _Domain System Volume_ que es el encargado de replicar la carpeta SYSVOL. Crearemos un nuevo grupo de replicación y en el asistente indicaremos qué servidores forman parte del mismo y qué carpetas queremos replicar.

Podemos ampliar la información en la [web de Microsoft](https://learn.microsoft.com/es-es/windows-server/storage/dfs-replication/dfsr-overview).

Una alternativa es usar _Azure File Sync_ que permitiría tener los archivos en la nube y cada servidor local tendrá sólo una caché de los últimos consultados.

## Carpetas de trabajo
Permiten tener sincronizados los archivos de un usuario entre sus distintos dispositivos. Sería una especie de **_OneDrive_** pero gestionado por nosotros.

Podemos encontrar información de cómo implementarlas en la web de [Microsoft](https://docs.microsoft.com/es-es/windows-server/storage/work-folders/deploy-work-folders).
