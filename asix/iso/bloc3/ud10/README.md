Módulo: Implantación de Sistemas Operativos
============================================

UD 10 - Instalación de un servidor con software libre
-----------------------------------------------------

- [Módulo: Implantación de Sistemas Operativos](#módulo-implantación-de-sistemas-operativos)
  - [UD 10 - Instalación de un servidor con software libre](#ud-10---instalación-de-un-servidor-con-software-libre)
- [Introducción](#introducción)
  - [Objetivos](#objetivos)
  - [Conceptos clave](#conceptos-clave)
  - [Conocimiento previo](#conocimiento-previo)
- [Planificación de la instalación](#planificación-de-la-instalación)
- [Sistemas de archivo y particionamiento](#sistemas-de-archivo-y-particionamiento)
- [Instalación](#instalación)
- [Finalización de la instalación](#finalización-de-la-instalación)
- [Configuración básica del servidor](#configuración-básica-del-servidor)
    - [Nombre del equipo](#nombre-del-equipo)
    - [Gestión usuarios y grupos](#gestión-usuarios-y-grupos)
  - [***/etc/passwd***](#etcpasswd)
  - [***/etc/group***](#etcgroup)
  - [***/etc/shadow***](#etcshadow)
- [Utilidades](#utilidades)
- [Servicios](#servicios)
- [Red](#red)
- [Repositorios](#repositorios)
- [Instalación de software](#instalación-de-software)
    - [Paquetes rpm](#paquetes-rpm)
- [Discos y particiones](#discos-y-particiones)
- [RAID](#raid)
- [LVM](#lvm)
- [Programar tareas](#programar-tareas)
- [Acceso remoto](#acceso-remoto)

Introducción
============

Objetivos 
---------

Los objetivos a alcanzar en esta unidad de trabajo son los siguientes:

-   Realizar instalaciones de diferentes sistemas operativos.
-   Aplicar técnicas de actualización y recuperación del sistema.
-   Solucionar incidencias del sistema y del proceso de inicio.
-   Elaborar documentación de soporte relativa a las instalaciones efectuadas y a las incidencias detectadas.
-   Instalar, configurar y verificar protocolos de red
-   Administrar cuentas de usuario y cuentas de equipo.
-   Utilizar máquinas virtuales para administrar dominios y verificar su funcionamiento.
-   Comparar diversos sistemas de archivos y analizado sus diferencias y ventajas de implementación.
-   Describir la estructura de directorios del sistema operativo.
-   Identificar los directorios contenedores de los archivos de configuración del sistema (binarios, órdenes y librerías).
-   Utilizar herramientas de administración de discos para crear particiones, unidades lógicas, volúmenes simples y volúmenes distribuidos.

Conceptos clave
---------------

Los conceptos más importantes de esta unidad son:

-   La red informática
-   Arquitectura cliente/servidor
-   Principales sistemas operativos de servidor

Conocimiento previo
-------------------

Antes de comenzar esta unidad de trabajo el alumno debería saber:

-   cuáles son los sistemas operativos de servidor más utilizados en la arquitectura PC
-   cómo utilizar software de virtualización para crear máquinas virtuales
-   gestionar unidades de almacenamiento y sus particiones
-   cuáles son los sistemas de archivo utilizados por los sistemas GNU/Linux
-   cómo montar particiones en sistemas GNU/Linux
-   cómo utilizar la terminal para realizar tareas básicas en una máquina

Planificación de la instalación
===============================

Al igual que vimos al hablar de los servidores en Windows, el primer paso es realizar un análisis del sistema para determinar si necesitamos montar una red de tipo cliente/servidor.

En caso afirmativo habremos de decidir qué servidor es el que mejor se adapta a nuestras necesidades, teniendo en cuenta nuestros recursos tanto económicos como humanos. De todo esto no vamos a explicar nada porque todo lo visto en la parte de Windows es también aplicable aquí (planificación, requisitos, ...).

Si nuestra elección es un servidor de software libre tenemos muchas opciones diferentes y habremos de elegir la más adecuada a nuestras circunstancias. Entre las más utilizadas se encuentran:

-   **Debian**: es uno de los sistemas más utilizados por ser de los más eficientes en la gestión de los recursos del sistema. En caso de decantarnos por esta distribución deberemos escoger qué versión instalar. Para un servidor la opción recomendada es la versión estable (en la actualidad la versión 11 llamada **Bullseye**) aunque, en función de nuestras necesidades,  también podríamos decantarnos por la versión testing (actualmente la 12 llamada **Bookworm**). 
  
  ![Bullseye](imgs/bullseye.jpg)
  
-   **Ubuntu Server**: también es muy utilizada y se trata de una distribución específica para servidores (o sea, que en la imagen de la misma se incluyen paquetes que suelen usarse en servidores en vez de paquetes de clientes). En este caso es más que recomendable instalar la última versión **LTS** que tiene soporte para 5 años ya que en caso de instalar una versión "normal" deberemos estar actualizando la versión de nuestro servidor cada 6 meses. En la actualidad la versión LTS és la 20.04 de nombre (**Focal Fossa**).
-   **Cent OS**: es un fork de RHEL y desde 2014 cuenta con el apoyo de Red Hat. Se trata de una distribución muy utilizada al estar basada en la Red Hat Enterprise Linux que es muy robusta. La versión actual es la 8
-   Alguna distribución de pago, como **RHEL** o **SuSE Linux Enterprise Server**: en este caso contamos con el plus del soporte ofrecido por la empresa que mantiene el sistema. El precio de las licencias suele ser sensiblemente inferior al de Windows Server.

Una vez elegido el sistema a instalar deberemos comprobar que el equipo sobre el que vamos a instalarlo cumple holgadamente con sus requisitos técnicos. En el caso del software libre estos requisitos dependerán de muchas cosas, especialmente del entorno gráfico que instalaremos ya que los requerimientos cambian mucho de un entorno de escritorio a otro. En caso de no instalar entorno gráfico (que es lo que nosotros haremos) los requisitos del sistema serán muy inferiores.

Sistemas de archivo y particionamiento
======================================

Una de las tareas más importantes a la hora de planificar la instalación del servidor es decidir las particiones que haremos y qué sistema de archivos usaremos en cada una.

En GNU/Linux siempre usaremos una partición para swap pero, además de ella, podemos usar una única partición para datos y sistema o usar varias particiones. En este caso algunos de los directorios que podríamos montar en particiones diferentes son:

-   **/home**: es donde se crean las carpetas personales de los usuarios. Siempre es recomendable montarlo en una partición diferente.
-   **/srv** o similar: es donde se recomienda que se guarden los datos compartidos en el servidor. También debería estar en su propia partición
-   **/var**: en este directorio se guarda información que puede crecer rápidamente como los logs del sistema, los paquetes que se descargan, etc.
-   **/usr**: aquí es donde se instala la mayoría del software
-   **/tmp**: es donde se guardan los ficheros temporales. Aquí se crean y eliminan ficheros con mucha frecuencia

La ventaja de separar muchos directorios en su propia partición es que limitamos los problemas que pudieran haber a esa partición (si /var está en su propia partición y se llena el sistema no se colapsa) pero es difícil calcular el espacio que cada una necesitará en el futuro por lo que podríamos encontrarnos con varias particiones con mucho espacio de sobra mientras alguna se llena. Este inconveniente se puede solucionar usando particiones LVM.

Lo que sí es importante es separar los datos de la partición del sistema.

Una vez decididas las particiones que haremos hay que decidir el sistema de archivos que tendrá cada una. Podemos elegir un sistema como ReiserFS que es muy eficiente aunque lo más habitual es usar un ext, en concreto la última versión que es **ext4**. Si hay alguna partición a la que tenga que acceder un sistema Windows instalado en esta máquina el sistema de ficheros deberá ser NTFS (pero esto no es nada normal en un servidor).

Por último decidiremos si vamos a usar algún nivel de **RAID** y si usaremos o no **LVM** que es un administrador de volúmenes virtuales (similar a los discos dinámicos de Windows). Podemos encontrar más información sobre LVM en:

-   RAID: [https://es.wikipedia.org/wiki/RAID](https://es.wikipedia.org/wiki/RAID) 
-   [Software RAID](https://cipfpbatoi.github.io/materials/altres/software-raid/)
-   LVM: [http://es.wikipedia.org/wiki/Logical\_Volume\_Manager](http://es.wikipedia.org/wiki/Logical_Volume_Manager)
-   [LMV2](https://cipfpbatoi.github.io/materials/altres/lvm/)


Instalación
===========

[Instalación](./instalacion.md) de diferentes distribuciones GNU/Linux. 

Finalización de la instalación
==============================

Una vez realizada la instalación, y antes de configurar el sistema, es conveniente hacer una serie de comprobaciones:

-   Estado de los dispositivos: comprobar que todos los dispositivos que tenemos se han detectado y funcionan correctamente.
-   Configuración de la red: es fundamental que sea correcta. Podemos comprobarlo con órdenes como **ip**, **ping** o **nslookup**.
-   Registros de eventos: mediante los logs del sistema, podemos comprobar que no haya errores o advertencias que indican que algo no funciona correctamente. Podemos ejecutar también un **dmesg** para visualizar la información de arranque de nuestro sistema. También podemos entrar al directorio de logs (***/var/log***) y comprobar los diferentes registros de nuestro sistema.
-   Particiones: también es conveniente comprobar que el sistema detecta correctamente todos los discos y las particiones hechas. Para ver todos los discos de los sistema tenemos la orden **fdisk -l** y para ver las particiones montadas el comando **df**. También podemos obtener estas informaciones con **lsblk**. Para montar una partición se hace con mount y al arrancar se montan todas las particiones indicadas en el fichero */etc/fstab*.

Una vez comprobado todo esto es conveniente reiniciar el equipo para comprobar que lo hace correctamente. A continuación deberíamos actualizar el sistema para asegurarnos de tener las últimas versiones de los paquetes y todos los parches de seguridad. Podemos hacerlo con el comando **apt-get upgrade** (nosotros no lo haremos para no sobrecargar la red).

Después convendría hacer una imagen del servidor limpio, y guardarla para poder restaurarlo en caso de problemas. También sería interesante hacer una cuando instalemos el software adicional y realizamos todas las configuraciones, pero antes de ponerlo en explotación y permitir la conexión de los clientes de nuestra red.

Configuración básica del servidor
=================================

Todas las configuraciones indicadas aquí son para equipos basados en *Debian* (como el propio Debian o Ubuntu). En otras distribuciones como *CentOS* estas pueden variar significativamente (por ejemplo CentOS y también Fedora, RedHat o Suse utilizan el sistema de paquetes .rpm en vez del .deb y cambia todo lo referido a los repositorios, instalación de software, etc).

Además haremos un repaso de los principales comandos que usaremos en la configuración de un sistema GNU/Linux, ya que hemos hecho la instalación sin entorno gráfico.

### Nombre del equipo

El comando para ver y cambiar el nombre del equipo es hostname. Este cambio sólo será efectivo hasta que reiniciamos el equipo puesto que al iniciar GNU/Linux el sistema lee el nombre del equipo del fichero ***/etc/hostname*** que es donde tenemos que cambiar el nombre del equipo para que el cambio sea permanente.

En Ubuntu 18.04 y posteriores, si existe el fichero **/etc/cloud/cloud.cfg** (si no no hay que hacer esto), tenemos que cambiar la línea *preserve\_hostname* de **false** a **true** para que se conserve el nombre puesto en **/etc/hostname** después de reiniciar:

    preserve_hostname: true

En vez de cambiar el contenido del fichero **/etc/hostname** podemos cambiarlo con el comando **hostnamectl**:

    hostnamectl set-hostname nuevo-nombre

Además, si tenemos el nombre antiguo en el fichero **/etc/hosts** lo tendríamos que cambiar por el nuevo (normalmente tendremos solo localhost así que no habrá que hacer nada).

### Gestión usuarios y grupos

Algunos comandos para la gestión de usuarios y grupos:
- **adduser** o **useradd**: permite la creación de nuevos usuarios.
- **usermod**, **chfn**, **chsh** y **chage**: usados para la modificación de un usuario.
- **deluser** o **userdel**: comando para la eliminación de usuarios.
- **passwd**: para cambiar la contraseña de un usuario y modificar otras características. 
- **addgroup** o **groupadd**: usado para añadir un grupo.
- **groupmod**: permite modificar un grupo.
- **groupdel** o **delgroup**: se utiliza para eliminar un grupo.
- **gpasswd**: comando diseñado para cambiar la contraseña de un grupo.
- **whoami**: para saber qué usuario somos.
- **groups**: para obtener información de los grupos a los que pertenecemos.
- **id**: nos muestra tanto el usuario como los grupos.
- **su**: comando para cambiar de usuario.
- **who** o **w**: sirve para saber cuáles usuarios están conectados en la máquina en un determinado momento.

Los comandos para crear usuarios **useradd** y **adduser**. La diferencia es que **adduser** nos preguntará la información que necesita y a **useradd** se la tenemos que proporcionar como parámetros del comando.

Algunos de estos comandos utilizan utilizan algunos valores establecidos por defecto de los siguientes ficheros: **/etc/login.defs**, **/etc/useradd**, **/etc/default/useradd**.

La gestión de usuarios, grupos, etc se basa en unos ficheros de texto. Los más importantes son:

 ***/etc/passwd***  
------------------
![passwd](imgs/passwd.png)

***/etc/group***
----------------
![group](imgs/group.png)

***/etc/shadow***
-----------------
![shadow](imgs/shadow.png)

Para ver los datos de un usuario: id usuario

![id](imgs/id.png "id")

Para ver sólo los grupos a que pertenece un usuario: **groups usuario**

Utilidades
==========

Documento sobre diferente [utilidades](./utilidades.md) para realizar copias de seguridad.

Servicios
=========

Con el sistema de inicio **SysV** el comando para iniciar o parar servicios era **service**:

    service networking restart

Aunque también se podían parar, arrancar, reiniciar, ... los servicios utilizando los scripts que hay en **/etc/init.d/**:

    /etc/init.d/networking restart

Ahora, con el sistema de inicio **systemd**, el comando es **systemctl** y su funcionamiento es bastante similar.. Las principales acciones son:

-   **status**: muestra la información del servicio indicado (entre otros si está o no activo)
-   **stop**: para el servicio
-   **start**: inicia el servicio
-   **restart**: para el servicio y vuelve a iniciarlo
-   **reload**: vuelve a cargar la configuración del servicio (si hemos hecho cambios)
-   **enable**: para que el servicio arranco automáticamente al iniciar el sistema
-   **disable**: para que no arranco automáticamente (si volamos lo tendremos que arrancar manualmente)
-   **mask**: enmascara un servicio de forma que no se pueda iniciar ni siquiera manualmente. Para poder mascarar un servicio tiene que estar parado
-   **unmask**: desenmarcara un servicio para que se pueda iniciar manualmente (con start) o automàticamente (con enable)

Ejemplos: para que el bluetooth se inicie al arrancar el sistema:

    systemctl enable bluetooth.service

para reiniciarlo:

    systemctl restart bluetooth.service

si queremos pararlo:

    systemctl stop bluetooth.service

si queremos que no se pueda iniciar ni manualmente:

    systemctl mask bluetooth.service

Otras opciones útiles son:

-   systemctl list-unidos --type service --ajo

lista todos los servicios del sistema (si solo queremos ver los activos no pondremos la opción **--all**).

-   systemctl list-unido-filas --state=failed

lista todos los servicios que han fallado al iniciar el sistema.

Red
===

Puedes encontrar la información actualizada de cómo configurar la red en:

- [Configuración de red](https://cipfpbatoi.github.io/materials/asix/iso/bloc3/ud10/red)
- Configuración de red en Debian [https://www.debian.org/doc/manuals/debian-reference/ch05.es.html](https://www.debian.org/doc/manuals/debian-reference/ch05.en.html)
- SystemdNetworkd: [https://wiki.debian.org/SystemdNetworkd](https://wiki.debian.org/SystemdNetworkd)
- SystemdNetworkd: [https://wiki.archlinux.org/title/Systemd-networkd_(Espa%C3%B1ol)](https://wiki.archlinux.org/title/Systemd-networkd_(Espa%C3%B1ol))

Repositorios
============

Un repositorio es una ubicación de un servidor de Internet desde donde el sistema descarga e instala actualizaciones y nuevos paquetes. Podemos tener tantos repositorios como deseemos. Los **estándar** contienen paquetes que han sido probados y construidos para nuestra versión del sistema operativo. Además puedo añadir otros para paquetes no incluidos en los repositorios estándar.

La lista de repositorios se configura en ***/etc/apt/sources.list*** aunque las últimas distribuciones las configuran en ficheros dentro de ***/etc/apt/sources.list.d/***.

Cada línea del fichero configura un repositorio. Su sintaxis es:

{deb \| deb-src} URL_del_repositorio versión tipo_de_paquetes

-   en primer lugar indicamos si queremos bajar paquetes ya compilados (deb) o el código fuente para compilarlo (deb-src)
-   URL del repositorio
-   versión de la cual queremos los paquetes (tiene que ser la que tengamos instalada). Para descargar actualizaciones ponemos version-updates en Ubuntu o version/updates en Debian y para parches de seguridad version-security (o version/security)
-   tipo de software que queremos (main, restricted, universe, multiverse en Ubuntu o main, contrib, non-free en Debian). Podemos poner más de un tipo separados por espacio

Ejemplo de fichero:

![sources.list](imgs/sourceslist.png)

Después de hacer cambios en un fichero tenemos que recargar la lista de paquetes de los repositorios con el comando

    apt-get update

También es conveniente recargar la lista antes de instalar algún paquete para asegurarnos de instalar la versión más reciente.

Para añadir un nuevo repositorio al sistema usamos el comando:

    add-apt-repository nuevo-repositorio

Instalación de software
=======================

Antes de descargar software es conveniente actualizar la lista de paquetes para asegurarnos de instalar las últimas versiones de los paquetes (**apt-get update**).

Tenemos muchas formas de instalar software en nuestro sistema.

Para instalar nuevas funcionalidades enteras podemos utilizar diferentes herramienta.

[https://wiki.debian.org/es/PackageManagement/PkgTools](https://wiki.debian.org/es/PackageManagement/PkgTools)

![Instalar software](imgs/tasksel.png "Instalar software")

Nos muestra diferentes usos que podemos darle al sistema y al marcar un se encarga de instalar todos los paquetes necesarios.

La forma más habitual para instalar un paquete es el comando **apt-get**. Ejemplo:

    apt-get install cowsay

Esta herramienta descarga el paquete del repositorio y lo instala en el equipo. Si el paquete tiene dependencias también las instalará. Si no conocemos el nombre del paquete podemos buscar en el repositorio con apt-cache search nombre_del_paquete. Ejemplo:

    apt-cache search sl

Para desinstalar un paquete se hace con apt-get remove nombre\_del\_paquete. Ejemplo:

    apt-get remove sl

Otra posibilidad es descargar nosotros directamente el paquete desde Internet (por ejemplo con el comando wget). Una vez descargado lo instalamos con el comando *dpkg -i nombre_del_paquete.deb*

Este comando no instala las dependencias. Si no se completa la instalación del paquete porque faltan dependencias ejecutaremos **apt-get install -f** para que se instalen automáticamente.

Resumen de comandos relacionados con el software:

-   Para instalar un paquete: **apt-get install nombre_del_paquete**
-   Para reinstalar un paquete: **apt-get --reinstall install nombre_del_paquete**
-   Para reconfigurar un paquete (sin volverlo a instalar): **dpkg-reconfigure nombre\_del\_paquete**
-   Para descargar el código fuente de un paquete: **apt-get source nombre_del_paquete**
-   Para desinstalar un paquete: **apt-get [--purge] remove nombre_del_paquete**
    Con la opción --purge eliminamos también todos los ficheros de configuración del paquete
-   Para actualizar todos los paquetes: **apt-get upgrade**
-   Para actualizar la versión instalada: **apt-get dist-upgrade**
-   Para buscar paquetes relacionados con algo: **apt-cache search que_busco**
-   Para obtener más información sobre un paquete: **apt-cache show nombre_del_paquete**
-   Para instalar un paquete .deb que hemos descargado nosotros previamente: **dpkg -y nombre_del_paquete.deb**
    Si tiene dependencias no resueltas fallará la instalación. Para que se instalan las dependencias no resueltas y se vuelva a intentar la instalación de un paquete que ha fallado: **apt-get -f install**

### Paquetes rpm

Todo lo que hemos explicado sobre la gestión de software se refiere a las distribuciones basadas en Debian (como Ubuntu, Mint, etc) que utilizan el empaquetado .deb para los paquetes de software.

Pero RedHat y las distribuciones derivadas de él como Fedora, CentOS, ... y otros como SuSE o Mandriva utilizan paquetes .rpm (RedHat Package Management). Los paquetes de software tienen extensión .rpm y, al igual que en Debian, el sistema de gestión hace el seguimiento de las dependencias de cada paquete para instalar todo el necesario.

En este caso la herramienta básica es el comando rpm (equivalente al dpkg de Debian) pero habitualmente utilizaremos la herramienta más sencilla yum (equivale a apt-get) y up2date para resolver dependencias. Desde la interfaz GUI disponemos de programas como yumex o gpk-apllication.

Desde el entorno gráfico la gestión de paquetes es muy parecida a la de Debian. Desde la línea de comandos las órdenes más comunes a utilizar son:

-   Para conocer el nombre de un paquete: yum search palabra\_que\_buscamos
-   Para instalar un paquete: yum install nombre\_del\_paquete
    Nuestro equipo contactará con el repositorio donde se encuentra el paquete, lo descargará y lo instalará automáticamente. Si este paquete necesitara tener otros instalados (tiene dependencias sin satisfacer) también se descargarán e instalarán.
-   Para actualizar un paquete: yum update nombre\_del\_paquete
-   Para desinstalar un paquete: yum remove nombre\_del\_paquete
-   Para más información podemos utilizar la ayuda de yum con: man yum

Discos y particiones
====================

En GNU/Linux todos los dispositivos se tratan como ficheros, la mayoría de los cuales se encuentran en el directorio ***/dev***. Los discos se denominan ***sdX*** (el primer disco sda, el segundo sdb, etc) y las particiones dentro de cada disco se denominan con un número del 1 al 4 para particiones primarias (y extendida) y a partir del 5 para particiones lógicas(discos **MBR**). 

Para ver los discos que tenemos en el sistema podemos ejecutar el comando:

    lsblk

Para poder utilizar una partición debe estar montada. Por defecto en el sistema tenemos montadas únicamente las particiones indicadas al hacer la instalación, ya que se añadieron al fichero ***/etc/fstab***. Este fichero contiene una línea por cada partición que queremos montar y cada vez que reiniciamos el equipo se lee y se montan todas las particiones incluidas en el mismo.

Para ver las particiones o carpetas montadas utilizamos el comando df o mount.

![df](imgs/df.png "df")

Para particionar un disco duro desde la terminal (por ejemplo /dev/sdb):

    fdisk /dev/sdb

Ahora utilizamos los comandos de fdisk (m para obtener ayuda):

-   p: mostrar las particiones
-   o: crear una nueva tabla de particiones MSDOS
-   n: crear una nueva partición (tendremos que especificar si primaria o lógica, su nº y dónde empieza y dónde acaba).
-   w: para escribir los cambios al disco

Una vez hecha la partición se formatea con mkfs (por ejemplo /dev/sdb1 con FS ext4):

    mkfs.ext4 /dev/sdb1

Para comprobar una partición: 
    
    fsck /dev/sdb1

Para montar una partición mount [-t tipo\_de\_FS] partición punto\_de\_montaje. Ejemplo: 

    mount /dev/sdb1 /datos

Para montar automáticamente una partición añadiremos una línea al fichero */etc/fstab*:

    nombre_particion_o_uuid_o_dispositivo punto_de_montaje fs opciones dump pass

![fstab](imgs/fstab.png "fstab")

NOTA: *dump* no se usa y se pone un 0, *pass* es para decir si queremos que la partición se compruebe o no al iniciar el sistema y el orden.

Después de modificar el fichero para montar su contenido ejecutamos:

    mount -a

Cómo hemos visto para montar una partición podemos utilizar su nombre (/dev/sd...) o su **UUID** que es un identficador de la partición.

Para conocer el UUID de una partición: **blkid**

![blkid](imgs/blkid.png "blkid")

Para desmontar una partición utilzamos el comando umount punto_de_montaje. Ejemplo: 

    umount /datos

RAID
====

Documentación para la gestión de [RAIDs](../../../../altres/sistemes-operatius/software-raid/README.md) por software. 

LVM
===

Documentación para la gestión de [Volúmenes](../../../../altres/sistemes-operatius/lvm/README.md) en GNU/Linux.


Programar tareas
================

Para programar tareas tenemos los comandos crontab y at.

El comando at permite ejecutar una orden en un determinado momento:

    at cuando_queremos_que_se_ejecute

A continuación (dentro de la terminal de at) escribimos los comandos a ejecutar como si estuvimos haciendo un script. Para acabar pulsamos Ctrl+D y volvemos a la consola.

Para indicar cuando queremos que se ejecute podemos poner una hora determinada o una hora de un día. También podemos indicar un intervalo a partir de ahora.

Respecto a las tareas programadas tenemos un servicio llamado ***crond*** que cada minuto ejecuta las tareas programadas para ese minuto.

Las tareas se guardan en un fichero de texto llamado ***crontab*** con información de la tarea a ejecutar y de cuando a de ejecutarse. Cada usuario crea y edita su propio fichero con el comando:

    crontab -e

En cada línea ponemos una tarea a ejecutar con el siguiente formato:

    minuto hora día_del_mes mes día_semana comando

-   minuto: valor entre 0 y 59
-   hora: valor entre 0 y 23
-   día_del_mes: valor entre 1 y 31
-   mes: valor entre 1 y 12
-   día_semana: valor entre 0 y 6 (0 = domingo)

También podemos indicar rangos de valores (con -) o listas (con ,). Ejemplos:

-   1 0 * * * shutdown -h now: apaga el ordenador todos los días a las 00:01 h.
-   1 0 * * 5 shutdown -h now: apaga el ordenador todos los viernes a las 00:01 h.
-   0,15,30,45 * * * * shutdown -h now: apaga el ordenador todas las horas de todos los días cada 15 minutos
-   /15 * * * * shutdown -h now: apaga el ordenador todas las horas de todos los días cada 15 minutos
-   0 12 * * 1-5 shutdown -h now: apaga el ordenador a las 12:00 h. de lunes a viernes

Los principales parámetros del comando crontab son:

-   -e: para editar el fichero y añadir o eliminar tareas
-   -l: para ver las tareas programadas
-   -r: para eliminar el fichero

Cada usuario tiene su propio fichero y las tareas programadas en él se ejecutan con los permisos de ese usuario. En ***/etc/crontab*** tenemos el fichero de root que contiene un campo más: antes del comando tenemos que indicar el usuario que ejecutará ese comando (podemos poner root o cualquier otro). Todas las tareas que necesitan permisos de root para ejecutarse las tendremos que programar en este fichero. Ejemplo:

1 0 * * 5 root nice -19 tar -czf /copias/homes.tar.gz /home

El usuario root ejecuta a las 00:01 de cada viernes el comando tar para hacer una copia de seguridad de todo el contenido de la carpeta /home con prioridad 19 (es decir con la menor posible)

NOTA: tened en cuenta que las tareas no se ejecutan en una terminal “normal” por lo cual no mostrarán nada por pantalla. Si queremos ver algo tenemos que redireccionar la salida de los comandos a un fichero y posteriormente ver su contenido.

Acceso remoto
=============

A a menudo los servidores no se encuentran accesibles físicamente (porque están en otro lugar, p.e. en un proveedor de housing o en nuestro CPD sin monitor ni teclado) y tenemos que acceder a ellos remotamente.

El método más sencillo es mediante ssh. Normalmente al instalar el sistema ya se instala un cliente ssh para conectarnos en otros equipos pero el que ahora necesitamos es el servidor ssh. El paquete que instalaremos es ***openssh-server***.

Una vez instalado se configura en el fichero ***/etc/ssh/sshd\_config***. Las principales opciones a configurar son:

-   ListenAddress: aquí podemos indicar la IP de nuestro equipo que aceptará conexiones por ssh. Si no ponemos nada (o 0.0.0.0) se aceptarán por todas nuestras interfaces de red
-   PermitRootLogin: si permitimos (yes) o no (no) que se conecte el usuario root. Por razones de seguridad es mejor no permitir conectarse a root sino a otro usuario que después se convertirá en root en el sistema
-   AllowUsers: aquí ponemos los nombres de los usuarios que se pueden conectar por ssh. Si no ponemos esta opción se podrán conectar todos los usuarios del sistema

Después de hacer modificaciones en el fichero tenemos que reiniciar (o recargar) el servicio ***ssh***.


Obra publicada con [Licencia Creative Commons Reconocimiento No comercial Compartir igual 4.0](http://creativecommons.org/licenses/by-nc-sa/4.0/)