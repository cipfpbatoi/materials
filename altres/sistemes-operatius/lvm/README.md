LVM (Logical Volume Manager)
============================

LVM es una implementación de un administrador de volúmenes lógicos para el kernel Linux (el equivalente a los discos dinámicos de Windows) e incluye la mayoría de características que se esperan de un administrador de volúmenes, permitiendo:

-   Redimensionado de grupos lógicos
-   Redimensionado de volúmenes lógicos
-   Instantáneas de sólo lectura (LVM2 ofrece lectura y escritura)
-   RAID0 de volúmenes lógicos.

En la imagen podemos observar como trabaja LVM:

![](https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/LVM-esquema_basico.PNG/420px-LVM-esquema_basico.PNG)

En primer lugar escogemos los volúmenes físicos (PV, *Phisical Volums*) que utilizaremos para LVM. Podemos escoger particiones o discos enteros. A continuación los asignamos a grupos de volúmenes (VG) que serían el equivalente a discos virtuales en los que creamos volúmenes lógicos (LV) que son los que finalmente usaremos como si fueran una partición.

En la imagen hay 7 PV procedentes de 2 discos diferentes con los que se crean 2 VG: uno formado por los PV hda1, hda2, hdb1 y hdb2, y el otro formado por los PV hda3, hda4 y hdb3. En el primer VG se crea un único LV que posteriormente se monta en la carpeta /home y del segundo VG se crea también un LV que se montará en /usr.

En cualquier momento podemos añadir más volúmenes físicos a uno o más grupos de volúmenes lo que nos permitirá crear en ellos nuevos volúmenes lógicos o ampliar la medida de cualquiera de los ya existentes, todo de forma transparente para el usuario.

Algunas de las ventajas que proporciona LVM son:

-   Cuando instalamos el sistema y hacemos las particiones siempre es difícil estimar cuánto espacio será necesario para el sistema o para datos y es bastante común que nos quedemos sin espacio en alguna partición aunque sobre espacio en otra. Con LVM podemos reducir las particiones a las que les sobre espacio y añadírselo a la que lo necesite. También podemos dejar cierta cantidad de espacio de disco sin asignar para expandir un volumen cuando se necesite.
-   Los grupos de usuarios (por ejemplo administración, ventas, etc.) pueden tener sus propios volúmenes lógicos que pueden crecer lo que sea necesario.
-   Cuando un nuevo disco se añade al sistema, no es necesario mover al nuevo disco los datos de los usuarios. Simplemente se añade el nuevo disco al grupo lógico correspondiente y se expanden los volúmenes lógicos todo lo que se considere adecuado. También se pueden migrar los datos de discos antiguos a otros nuevos, de forma totalmente transparente al usuario.

Como hemos dicho antes un LVM se compone de tres partes:

- **Volúmenes físicos** (PV, _phisical volume_): Son los discos o las particiones del disco duro con sistema de archivos LVM.
- **Volúmenes lógicos** (LV, _logical volume_): es el equivalente a una partición en un sistema tradicional. El LV es visible como un dispositivo estándar de bloques, por lo cual puede contener un sistema de archivos
- **Grupos de volúmenes** (VG, _volume group_): es como el disco duro virtual del cual creamos nuestros volúmenes lógicos (LV).

Hay muchas herramientas gráficas para gestionar LVM como **_system-config-lvm_** pero nosotros utilizaremos la consola de comandos o el propio Webmin que ya tenemos instalado.

Ejemplo de uso
-------

![lvm](lvm.png)

En primer lugar para utilizar lvm tenemos que instalar el paquete ***lvm2*** si todavía no lo tenemos instalado (sólo en distribuciones antiguas).

A continuación crearemos y configuraremos nuestros volúmenes. Primeramente crearemos los volúmenes físicos de las particiones en que vamos a utilizar LVM. Por ejemplo para utilizar la partición sda3 haremos:
```bash
    pvcreate /dev/sda3
```
Esto lo tenemos que repetir para cada partición a utilizar (por ejemplo sda4 y sda5). También podríamos usar un disco completo (por ejemplo sdb) con:
```bash
    pvcreate /dev/sdb
```
Ahora creamos el grupo de volúmenes que contendrá nuestros volúmenes lógicos finales:
```bash
    vgcreate volgroup_01 /dev/sda3 /dev/sda4 /dev/sda5
```
Con el comando **`vgscan`** podemos ver los grupos creados y con pvscan los volúmenes físicos.

Por último sólo queda crear los volúmenes lógicos que utilizaremos. Por ejemplo crearemos un llamado volumen\_01 de 2 GB:

```bash
    lvcreate -L2G -n volumen_01 volgroup_01
```

Con **`lvscan`** podemos ver los volúmenes lógicos creados.

Ahora ya podemos darle formato y montarlo como cualquier otra partición:

```bash
    mkfs.ext4 /dev/volgroup_01/volumen_01
    mount /dev/volgroup_01/volumen_01 /datos
```
### Como añadir una nueva partición al volumen

En primer lugar creamos un nuevo volumen físico en la partición:

```bash
    pvcreate /dev/sdb1
```
A continuación lo añadimos a nuestro grupo:

```bash
    vgextend volgroup_01 /dev/sdb1
```

Como por ejemplo tenemos más espacio en el grupo podemos aumentar los volúmenes lógicos. Por ejemplo vamos a darle otros 3 GB al volumen_01:

```bash
    lvextend -L +3G /dev/volgroup_01/volumen\_01
```

Por último tenemos que ampliar nuestro sistema de ficheros ext4 del volumen. Tenemos que ir con cuidado porque esta operación es peligrosa y podríamos perder los datos:

```bash
    resize2fs /dev/volgroup_01/volumen_01 5G
```
Ya tendríamos 5 GB en nuestro volumen en lugar de las 2 iniciales.

Por ejemplo, queremos ampliar en 5 GB la partición del sistema operativo (llamada _ubuntu-lv_ que está en el volumen _ubuntu-vg_). Supondremos que tennemos espacio suficiente sin usar en el volumen. Los comandos a ejecutar serían:
```bash
lvextend -L +5G /dev/ubuntu-vg/ubuntu-lv
resize2fs /dev/ubuntu-vg/ubuntu-lv
```
