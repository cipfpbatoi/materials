# 💽 Gestión de RAID por software

Instalamos el gestor de RAIDs por software **mdadm**

```bash
apt install mdadm
```

Creamos el nuevo **RAID**

```bash
mdadm --create /dev/md0 --level=raid1 --raid-devices=2 /dev/sdb1 /dev/sdc1
```

Añadimos el **RAID** creado al fichero de configuración

```bash
mdadm --detail --scan >> /etc/mdadm/mdadm.conf
```

Comprobamos el estado del RAID

```bash
mdadm --detail /dev/md0
```

A continuación formateamos el nuevo **RAID**:

```bash
mkfs.ext4 -v -L "NEWARRAYRAID1" /dev/md0
```

Obtenemos el UUID

```bash
blkid | grep /dev/md0
```

Configuramos el fichero **/etc/fstab:**

```bash
UUID=feeaa6fb-9c7b-4213-8a83-2f9c1ed77a68 /media/RAID1 ext4 defaults 0 1
```

Finalmente actualizamos la imagen de initramfs:

```bash
update-initramfs -u
```

## Eliminar un disco y añadir uno nuevo al RAID

No podemos eliminar un disco directamente del raid, a menos que esté en estado fallido, por lo tanto vamos a marcarlo como tal:

```bash
mdadm --fail /dev/md0 /dev/sdc1
```

Ahora ya podemos eliminarlo:

```bash
mdadm --remove /dev/md0 /dev/sdc1
```

Verificamos el estado del RAID:

```bash
cat /proc/mdstat
```

o

```bash
mdadm --detail /dev/md0
```

Añadimos el nuevo disco al RAID:

```bash
mdadm --add /dev/md0 /dev/sdc1
```

Verificamos el estado del RAID:

```bash
cat /proc/mdstat
```

o

```bash
mdadm --detail /dev/md0
```
