Herramientas básicas
=====================

![logo](./imgs/tar-gz-bz2.png)


**tar­ gzip ­bzip2 ­rsync**


- [Herramientas básicas](#herramientas-básicas)
    - [dump restore](#dump-restore)
    - [tar](#tar)
    - [gzip/bzip2](#gzipbzip2)
    - [tar/gzip/bzp2](#targzipbzp2)
    - [rsync](#rsync)

Herramientas básicas para realizar copias de seguridad. 

### dump restore

Como todo sistema UNIX, Linux provee herramientas estándar para realizar las copias de seguridad de los discos.
**dump** y **restore**

Las herramientas **dump** y **restore** fueron puestas bajo Linux por Remy Card. Una vez que las fuentes han sido instaladas, la utilización de **dump**  y **restore** es relativamente simple. Para realizar la copia de seguridad de una partición /dev/sda1 sobre /dev/rmt0, es suficiente hacer:

    dump 0sfu  3600  /dev/rmt0  /dev/sda1
    dump 0sfu mis02:/dev/rmt0  /dev/sda1

La segunda orden permite copia de seguridad de un disco sobre un dispositivo remoto (por ejemplo situado sobre la máquina "mis02"). Las opciones de **dump** pueden parecer complejas. A continuación damos una corta descripción:
- 0 a 9 : nivel de copia de seguridad. 0 corresponde a una copia de seguridad completa, mientras que los otros niveles n corresponden a la copia de seguridad de archivos que fueron modificados desde la enésima copia de seguridad;
- s : tamaño de la cinta en pies;
- f : archivo. Puede estar compuesto de máquina:archivo;
- u : escritura de la fecha y del nivel de copia de seguridad en el archivo /etc/dumpdates.

Existen otras opciones. Para mayor información, consultar las páginas del manual.

Existen dos maneras de efectuar una restauración: en línea de ordenes o en modo llamado "interactivo". El segundo modo es más simple para las restauraciones parciales. El primero es sobre todo utilizado para las restauraciones completas.

Para restaurar completamente una cinta:

    restore rf /dev/rmt0

### tar

A diferencia de dump o restore, **tar** permite copia de seguridad de los archivos deseados, excluir ciertos repertorios, etc. Es necesario notar que el tar utilizado bajo Linux es el tar GNU. Este posee ciertas opciones particulares.

Para conocer todas las opciones posibles, es aconsejable hacer **tar ­help**. Una utilización simple de tar puede ilustrarse con la copia de seguridad de una partición de usuarios:

    tar ­cvf /dev/rmt0 /users | mail backup­user

Más ejemplos, creando un fichero **tar** a partir de un directorio y en el siguiente ejemplo desempaquetando un fichero **tar**

    tar ­cvf foo.tar foo/  # Archiva el dir. foo en foot.tar
    tar ­xvf foo.tar       # Desarchiva el fichero foo.tar

Marcar que tar no es un compresor, simplemente archiva ciertos ficheros, directorios en un sólo fichero. Para comprimir se utiliza **gzip**.

### gzip/bzip2

**Gzip** proviene de GNU ZIP, se trata de un software basado en el algoritmo Deflate para comprimir ficheros, pero solo comprime un sólo fichero y no archiva. 

**Bzip2** es un software que comprime y descomprime ficheros. El porcentaje de compresión depende del fichero a comprimir, pero es bastante mejor al de los compresores basados en otros algoritmos de compresión (gzip, WinZip,...). Como inconveniente, **bzip2** emplea más memoria y más tiempo en su ejecución.

Uso básico de **gzip**, **bzip2**:

    gzip ­c fichero > fichero.gz    # Comprime fichero
    gzip fichero                    # Comprime fichero
    gzip ­d fichero.gz              # Descomprime el fichero
    bzip2 ­z fichero.otp            # Comprime el fichero
    bzip2 fichero.otp               # Comprime el fichero
    bzip2 ­d fichero.otp.bz2        # Descomprime el fichero

### tar/gzip/bzp2

Como hemos comentado, tar no es un compresor y bzip y gzip no archivan. Con las opciones *z*  para  gzip  y  *j*  para bzip2 el tar archiva y comprime. Para los ficheros comprimidos con gzip se suele utilizar la extensión tgz en vez de tar.gz.

    # file archivados y comprimidos en files.tar.gz 
    tar ­zcvf files.tar.gz file1 file2 file3

    # Descomprimimos y desarchivamos el fichero files.tar.gz
    tar ­zxvf files.tar.gz

    # Dir. files archivado y comprimido en files.tar.bz2
    tar ­jcvf files.tar.bz2 files/
    
    # Descomprimir y desarchivar el fichero file.tar.bz2
    tar ­jxvf file.tar.bz2

### rsync

rsync es una aplicación libre para sistemas de tipo Unix/Linux y Microsoft Windows que ofrece transmisión eficiente de datos incrementales, también opera con datos comprimidos y cifrados. Mediante una técnica de delta encoding, permite sincronizar archivos y directorios entre dos máquinas de una red o entre dos ubicaciones en una misma máquina, minimizando el volumen de datos transferidos. Una característica importante de rsync no encontrada en la mayoría de programas o protocolos es que la copia toma lugar con sólo una transmisión en cada dirección. 

**rsync** puede copiar o mostrar directorios contenidos y copia de archivos, opcionalmente usando compresión y recursión.
    
    rsync options source destination

Para sincronizar dos directorios de una misma máquina:

    rsync ­zvr /var/opt/installation/inventory/ /root/temp

Opciones:

- ­*z* compresión
- ­*v* verbose
- *r* recursivo

Para sincronizar y preservar características como(timesamp, permisos, propietarios y grupos). Con la opción **­a** indicamos que realizaremos en modo *archive* y esto implica las siguientes opciones:

- Modo recursivo.
- Preservamos los enlaces simbólicos.
- Preservamos los permisos.
- Presevamos timestamp.
- Preservamos el propietarios y el grupo

        rsync ­azv /var/opt/installation/inventory/ /root/temp/

Si queremos copiar solamente un fichero deberemos especificarlo:

    rsync ­v /var/lib/rpm/Pubkeys /root/temp/

**rsync** permite sincronizar entre un equipo local y otro remoto. Para ello deberemos  especificar el usuario, y el nombre del equipo o en su la dirección IP y la ubicación. 

El formato del destino seria de la siguiente forma username@machinename:path
    
    rsync ­avz /root/ jomuoru@192.168.200.10:/home/jomuoru/
    rsync ­avz jomuoru@192.168.200.10:/var/lib/rpm /root/temp

Algunas otras opciones interesantes: 
- **­­--progress** Muestra el detalle de las transferencia
- **--delete** Elimina los ficheros en el destino si en el origen ya no están 
- **--include 'P*'** 
- ­**--exclude '*'**