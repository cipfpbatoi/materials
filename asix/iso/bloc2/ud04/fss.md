# iSCSI, DFS y otros servicios de archivo
- [iSCSI, DFS y otros servicios de archivo](#iscsi-dfs-y-otros-servicios-de-archivo)
  - [Introducción](#introducción)
  - [iSCSI](#iscsi)
    - [Proporcionar discos iSCSI: _target_](#proporcionar-discos-iscsi-target)
    - [Utilizar discos iSCSI: _initiator_](#utilizar-discos-iscsi-initiator)
  - [_Distributed File System (DFS)_](#distributed-file-system-dfs)
    - [Espacios de nombres DFS](#espacios-de-nombres-dfs)
    - [Replicación DFS](#replicación-dfs)
  - [Carpetas de trabajo](#carpetas-de-trabajo)

## Introducción
En este apartado comentaremos varias opciones que nos proporciona Windows como acceso a discos de SAN (iSCSI), sistema de ficheros distribuido (DFS), etc.

Simplemente comentaremos qué son ya que en el tema 6 se ofrece más información de los mismos.

## iSCSI
iSCSI (Abreviatura de Internet SCSI) es un estándar que permite el uso del protocolo SCSI sobre redes TCP/IP.

Windows Server permite utilizar como almacenamiento una cabina de discos SAN y también puede emular una para proporcionar su almacenamiento a otros equipos.

Si usamos iSCSI tendremos 2 máquinas involucradas:
- **iSCSI Initiator**: es el componente de Windows Server que se encarga de inicializar y gestionar las conexiones iSCSI. Se trata de una característica que instalaremos en el servidor que va a hacer uso de un disco iSCSI
- **iSCSI Target**: es el dispositivo que comparte su almacenamiento a través de iSCSI. Puede ser un servidor dedicado o un disositivo de almacenamiento específico (como una cabina de discos).

Podéis ampliar esta información en el[Tema 6 - iSCSI](../ud06/iscsi.md).

## _Distributed File System (DFS)_

### Espacios de nombres DFS 
Es un rol de Windows Server que permite mostrar carpetas compartidas ubicadas en diferentes servidores como una única estructura jerárquica de carpetas, de forma que el usuario ve en una vista única carpetas compartidas en diferentes servidores. Esto permite referenciar todos los recursos compartidos de una manera uniforme, sin importarn dónde estén físicamente.

Además proporciona redundancia y tolerancia a fallos ya que permite la creación de múltiples réplicas de los datos en diferentes servidores. Si un servidor está fuera de servicio, los usuarios pueden acceder a la información desde otra réplica.

Podéis ampliar esta información en el[Tema 6 - DFS](../ud06/dfs.md).

## Carpetas de trabajo
Permiten tener sincronizados los archivos de un usuario entre sus distintos dispositivos. Sería una especie de **_OneDrive_** pero gestionado por nosotros.

Podemos encontrar información de cómo implementarlas en la web de [Microsoft](https://docs.microsoft.com/es-es/windows-server/storage/work-folders/deploy-work-folders).
