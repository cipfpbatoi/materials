# Espacio de nombres DFS y Replicación DFS
- [Espacio de nombres DFS y Replicación DFS](#espacio-de-nombres-dfs-y-replicación-dfs)
  - [Introducción](#introducción)
  - [Replicación DFS](#replicación-dfs)

## Introducción
El rol **Espacios de nombres DFS** (_Distributed File System)_ de Windows Server permite mostrar carpetas compartidas ubicadas en diferentes servidores como una única estructura jerárquica de carpetas, de forma que el usuario ve en una vista única carpetas compartidas en diferentes servidores. Esto permite referenciar todos los recursos compartidos de una manera uniforme, sin importar dónde estén físicamente.

Además proporciona redundancia y tolerancia a fallos ya que permite la creación de múltiples réplicas de los datos en diferentes servidores. Si un servidor está fuera de servicio, los usuarios pueden acceder a la información desde otra réplica.

![Espacio de nombres DFS](https://learn.microsoft.com/es-es/windows-server/storage/dfs-namespaces/media/dfs-overview.png)

En el servidor (puede ser un DC o un servidor miembro) debemos instalar el rol `Espacios de nombres DFS` que se encuentra dentro de `Servicios de archivo y almacenamiento -> Servicios de iSCSI y archivos`.

Para instalarlo con Powershell ejecutamos:
```powershell
Install-WindowsFeature "FS-DFS-Namespace", "RSAT-DFS-Mgmt-Con"
```

(el segundo paquete son las características del rol)

Una vez instalado se gestiona desde la herramienta `Administración de DFS`. El primer paso es crear un nuevo espacio de nombres a partir del cual enlazaremos las distintas carpetas. Puede ser:
- un espacio de nombres independiente (_standalone_) si no estamos usando _Active Directory_
- un espacio de Nombres de Dominio (_Domain-Based_) vinculado a Active Directory, que permite una administración centralizada y la replicación de configuraciones entre servidores

Una vez creado creamos en el mismo las distintas carpetas a compartir. Si la carpeta ya existe y está compartida la seleccionamos. Si no existe al poner su ruta nos pregunta si queremos que la cree.

Ahora ya podemos hacer referencia a cuaquier recurso compartido, por ejemplo, si en el dominio _Acme.lan_ hemos creado el espacio de nombres _Public_ que contiene la carpeta compartida _AdminDominio_ su ruta sería `\\Acme.lan\Public\AdminDominio`.

Podéis ampliar la información sobre DFS en la [web de Microsoft](https://learn.microsoft.com/es-es/windows-server/storage/dfs-namespaces/dfs-overview) así como los [_cmdlets_ de Powershell](https://learn.microsoft.com/es-es/powershell/module/dfsn/?view=windowsserver2022-ps) para trabajar con _DFS_.

## Replicación DFS
Es un servicio que permite replicar carpetas en varios servidores y sitios. Es lo que utiliza por ejemplo _Servicios de dominio de Active Directory (AD DS)_ para replicar la carpeta SYSVOL en los distintos DC del dominio.

Si hemos instalado _Espacios de nombres DFS_ se administra igual que ese servicio desde el _Admnistrador de DFS_. Si no debemos instalar el rol `Replicación DFS` que se encuentra dentro de `Servicios de archivo y almacenamiento -> Servicios de iSCSI y archivos`.

Veremos que ya hay creado un grupo de replicación llamado _Domain System Volume_ que es el encargado de replicar la carpeta SYSVOL. Crearemos un nuevo grupo de replicación y en el asistente indicaremos qué servidores forman parte del mismo y qué carpetas queremos replicar.

Podemos ampliar la información en la [web de Microsoft](https://learn.microsoft.com/es-es/windows-server/storage/dfs-replication/dfsr-overview).

Una alternativa es usar _Azure File Sync_ que permitiría tener los archivos en la nube y cada servidor local tendrá sólo una caché de los últimos consultados.
