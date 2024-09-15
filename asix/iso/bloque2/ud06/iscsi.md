# iSCSI
- [iSCSI](#iscsi)
  - [Introducción](#introducción)
  - [Proporcionar discos iSCSI: _target_](#proporcionar-discos-iscsi-target)
  - [Utilizar discos iSCSI: _initiator_](#utilizar-discos-iscsi-initiator)

## Introducción
iSCSI (Abreviatura de _internet SCSI_) es un estándar que permite el uso del protocolo SCSI sobre redes TCP/IP. iSCSI es un protocolo de la capa de transporte definido en las especificaciones SCSI-3.

La adopción del iSCSI en entornos de producción corporativos se ha acelerado gracias al aumento del Gigabit Ethernet ya que es menos costosa y está resultando una alternativa efectiva a las soluciones SAN basadas en Canal de fibra. (Fuente [Wikipedia](https://en.wikipedia.org/wiki/ISCSI)).

Windows Server permite utilizar como almacenamiento una cabina de discos SAN y también puede emular una para proporcionar su almacenamiento a otros equipos.

Si usamos iSCSI tendremos 2 máquinas involucradas:
- **iSCSI Initiator**: es el componente de Windows Server que se encarga de inicializar y gestionar las conexiones iSCSI. Se trata de una característica que instalaremos en el servidor que va a hacer uso de un disco iSCSI
- **iSCSI Target**: es el dispositivo que comparte su almacenamiento a través de iSCSI. Puede ser un servidor dedicado o un disositivo de almacenamiento específico (como una cabina de discos)

## Proporcionar discos iSCSI: _target_
El dispositivo que proporciona los discos a compartir suele ser una cabina de discos, pero un equipo con Windows Server también puede proporcionar discos iSCSI a otros equipos de nuestra red. Para ello se debe instalar el rol de `Servidor de destino iSCSI` (se encuentra dentro de _Servicios de almacenamiento_).

Una vez instalado crearemos en este servidor uno o más **LUNs** (_Logical Unit Numbers_) que representan los discos o volúmenes que ofrece para compartir.

Para ello desde la "_Consola de administración iSCSI_" (`Administrador del servidor -> Servicios de archivo y almacenamiento -> iSCSI` o ejecutando `iscsicpl`) vamos a la pestaña `Objetivos iSCSI` y seleccionamos `Crear objetivo iSCSI`.

Allí indicamos su tamaño, los servidores que podrán conectarse a él (_iniciadores iSCSI_) y los discos que le asignaremos. Además podemos configurar la seguridad de la conexión iSCSI.

Una vez creado el objetivo iSCSI lo seleccionamos y desde el panel derecho pinchamos en `Configurar LUN` para indicar los volúmenes o discos a compartir. Podemos configurar los _accesos ISCSI_ para indicar que sistemas podrán conectarse al objetivo iSCSI.

Con esto ya tenemos el servidor configurado como un _iSCSI Target_. El servicio _iSCSI Target_ debe estar iniciado y configurado para iniciarse automáticamente.

Podéis encontrar muchas páginas de internet donde explican el proceso, como [¿Cómo configurar y conectar un disco iSCSI en Windows Server?](https://informaticamadridmayor.es/tips/como-configurar-y-conectar-un-disco-iscsi-en-windows-server/).

## Utilizar discos iSCSI: _initiator_
En el servidor en que queramos utilizar discos iSCSI debemos tener iniciado el servicio **_Iniciador iSCSI_** (podemos hacerlo desde el entorno gráfico en _Servicios_ o con Powershell `Set-Service -Name MSiSCSI -StartupType Automatic`).

A continuación iniciamos el programa _iniciador iSCSI_ (`iscsicpl.exe`) y en la pestaña _Descubrir_ buscamos el servidor de almacenamiento configurado en nuestra red y conectamos el disco, configurando la interfaz de red por la que se conectará al mismo.

Con esto ya tenemos un nuevo espacio de almacenamiento en nuestra máquina que deberemos configurar desde el _Administrador de discos_, activándolo y creando en el mismo las particiones y sistemas de archivo que deseemos.

Recordad que para obtener un buen rendimiento la red con la que nos conectamos a los discos iSCSI debe ser una red independiente de la LAN de nuestra empresa.
