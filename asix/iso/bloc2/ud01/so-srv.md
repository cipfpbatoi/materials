# Principales S.O. de servidor
- [Principales S.O. de servidor](#principales-so-de-servidor)
  - [Sistemas Windows](#sistemas-windows)
  - [Sistemas operativos de red Linux](#sistemas-operativos-de-red-linux)
  - [Redes mixtas](#redes-mixtas)

## Sistemas Windows
Microsoft empezó haciendo sistemas operativos monousuario (Ms-DOS, Windows 95, ...) pero en los 90 creó su primer sistema operativo de red, **Windows NT**, para competir con los sistemas _Unix_ y _Novel Netware_ que entonces dominaban el mercado.

A las diferentes versiones de NT siguió Windows Server 2000, 2003, 2008, 2008 R2, 2012, 2016 y la versión actual, Windows 2019 Server. El funcionamiento de la versión 2019 es muy parecida a las anteriores. De cada versión de sistema operativo hay diferentes _ediciones_, co funcionalidades enfocadas a distintos tipos de empresas. Las de Windows 2019 Server son:
- _Essentials_: enfocado a pequeñas empresas, con menor coste y prestaciones limitadas
- _Standard_: adecuado para entornos poco virtualizados
- _Datacenter_: pensado para centros de datos y _cloud computing_ con alto nivel de virtualización

Windows Server trabaja sobre un modelo llamado dominio, que es un conjunto de equipos (clientes y servidores) que comparten una política de seguridad y una base de datos común (denominada **Active Directory**).

Dentro del dominio puede haber dos tipos de servidores:
- **Controladores de dominio**: al menos hay uno que es el servidor principal y contienen una copia del Directorio Activo con información sobre los usuarios, equipos, recursos, etc
- **Servidores miembro**: pertenecen al dominio pero no se encargan de gestionarlo sino que simplemente ofrecen algún servicio. Normalmente funcionan como servidores de impresión, de ficheros, etc. En muchas ocasiones no hay este tipo de servidores puesto que estos servicios los pueden ofrecer también los controladores de dominio.

## Sistemas operativos de red Linux
GNU/Linux es un sistema operativo multiusuario y la principal alternativa a los sistemas de Microsoft tanto en el cliente como en servidores.

Linux está basado en el sistema operativo Unix que dominó el mundo de los servidores desde el años 70 y ha heredado de él su fiabilidad y eficiencia. Además es un sistema operativo multiplataforma y hay versiones de Linux para PowerPC, Alpha, Sun Sparc, ..., además de para plataforma Intel.

GNU/Linux es un sistema operativo libre, distribuido bajo licencia GPL lo que hace que cualquiera puede copiarlo y cambiarlo. Esto hace que podamos encontrar centenares de versiones de Linux llamadas "distribuciones". Una distribución es una recopilación de los principales programas organizados y preparados para su instalación.

Cualquier versión de Linux puede funcionar tanto como cliente como servidor porque el núcleo es el mismo. Lo que hace que trabaje como una cosa u otra son las aplicaciones que tengamos instaladas. Además Linux puede trabajar sin entorno gráfico puesto que el entorno gráfico es simplemente uno de los programas que se ejecutan en el ordenador y en el caso de los servidores en muchas ocasiones no se instala este entorno por cuestiones de eficiencia y seguridad.

Como hemos comentado cualquier distribución Linux puede funcionar como cliente o servidor aunque algunas como Ubuntu distribuyen versiones diferentes: _Ubuntu Desktop_ para clientes y _Ubuntu Server_. Su estructura y configuración es idéntica y sólo cambia los servicios que se instalan por defecto.

Algunas de las distribuciones GNU/Linux más utilizadas como servidores son **Debian**, **Ubuntu Server**, **Red Hat Entrerprise Linux (RHEL)** y su fork **CentOS**, **SuSE Linux**, ...

## Redes mixtas
Hace años era muy habitual que los clientes de una red tuvieron sistemas operativos Windows (XP, 7, etc) y también los servidores (Windows Server). Por otro lado hay empresas que trabajan con software libre donde todos sus equipos, clientes y servidores, tienen sistema operativo Linux.

Pero en muchas ocasiones no todos los equipos de la red tienen el mismo tipo de sistema operativo (todos Windows o todos Linux) sino que encontramos equipos, tanto clientes como servidores, con un tipo de sistema operativo y otros con otro tipo.

Esto no plantea ningún problema porque Linux está perfectamente adecuado para interoperar con equipos Windows y, desde hace unos años, también Windows está incluyendo herramientas para trabajar con equipos Linux.