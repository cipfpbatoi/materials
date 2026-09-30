# Guía de comandos Linux para diagnóstico y gestión de hardware

Referencia rápida de los comandos de hardware más usados: qué hacen, sus opciones más comunes y ejemplos de uso. Organizada por categoría, siguiendo el mismo orden que la práctica guiada de diagnóstico.

- [Guía de comandos Linux para diagnóstico y gestión de hardware](#guía-de-comandos-linux-para-diagnóstico-y-gestión-de-hardware)
  - [1. Identificación general del sistema](#1-identificación-general-del-sistema)
    - [`dmidecode`](#dmidecode)
    - [`lshw`](#lshw)
    - [`uname`](#uname)
    - [`hwinfo`](#hwinfo)
  - [2. Procesador](#2-procesador)
    - [`lscpu`](#lscpu)
  - [3. Memoria RAM y recursos](#3-memoria-ram-y-recursos)
    - [`free`](#free)
    - [`vmstat`](#vmstat)
    - [`top` / `htop`](#top--htop)
  - [4. Almacenamiento](#4-almacenamiento)
    - [`lsblk`](#lsblk)
    - [`df`](#df)
    - [`du`](#du)
    - [`smartctl`](#smartctl)
    - [`blkid`](#blkid)
    - [`fdisk` / `parted`](#fdisk--parted)
    - [`mount` / `umount`](#mount--umount)
  - [5. Buses y periféricos](#5-buses-y-periféricos)
    - [`lspci`](#lspci)
    - [`lsusb`](#lsusb)
  - [6. Kernel y diagnóstico de eventos](#6-kernel-y-diagnóstico-de-eventos)
    - [`lsmod`](#lsmod)
    - [`dmesg`](#dmesg)
  - [Tabla resumen: ¿qué comando uso para...?](#tabla-resumen-qué-comando-uso-para)

---

## 1. Identificación general del sistema

### `dmidecode`

Lee la tabla **DMI/SMBIOS** que la BIOS/UEFI escribió en la ROM de la placa base en fábrica, y la muestra en formato legible. No sondea el hardware directamente: solo decodifica lo que el fabricante declaró.

Requiere privilegios de root (lee `/dev/mem`).

| Opción | Qué hace |
|---|---|
| (sin opciones) | Vuelca toda la tabla DMI (salida muy larga) |
| `-t <tipo>` | Filtra por tipo de estructura: `bios`, `system`, `baseboard`, `processor`, `memory`, `chassis`, `cache`, `connector`, `slot` |
| `-s <palabra clave>` | Muestra un único valor puntual (p. ej. `system-serial-number`) |
| `-q` | Salida "silenciosa", sin cabeceras ni comentarios |
| `--type <n>` | Filtra por código numérico de tipo DMI (avanzado) |

**Ejemplos:**
```bash
sudo dmidecode -t bios              # Fabricante, versión y fecha de la BIOS
sudo dmidecode -t baseboard         # Fabricante y modelo de la placa base
sudo dmidecode -t memory            # Slots de RAM, ocupados/libres, tipo y velocidad
sudo dmidecode -s system-serial-number   # Solo el número de serie del equipo
```

---

### `lshw`

Genera un inventario de hardware combinando la tabla DMI con información sondeada directamente del kernel (`/proc`, `/sys`) y de los buses PCI/USB. A diferencia de `dmidecode`, sí refleja lo que el sistema detecta en ese momento, y lo presenta en forma de **árbol jerárquico** (bus → controlador → dispositivo).

| Opción | Qué hace |
|---|---|
| (sin opciones) | Inventario completo en árbol (requiere `sudo` para el detalle completo) |
| `-short` | Resumen en una línea por dispositivo, muy legible |
| `-class <clase>` | Filtra por tipo: `memory`, `processor`, `disk`, `network`, `display`, `storage` |
| `-html` / `-xml` / `-json` | Exporta el informe a ese formato, útil para generar informes automatizados |
| `-sanitize` | Oculta números de serie (útil al compartir el informe) |

**Ejemplos:**
```bash
sudo lshw -short                    # Resumen rápido de todo el hardware
sudo lshw -class disk                # Solo los discos
sudo lshw -class network             # Solo las tarjetas de red
sudo lshw -html > informe.html       # Genera un informe en HTML
```

---

### `uname`

Muestra información básica del kernel y del sistema. No requiere privilegios especiales.

| Opción | Qué hace |
|---|---|
| `-a` | Toda la información disponible (kernel, hostname, arquitectura...) |
| `-r` | Solo la versión del kernel |
| `-m` | Arquitectura de la máquina (`x86_64`, `aarch64`...) |
| `-s` | Nombre del sistema operativo (`Linux`) |

**Ejemplos:**
```bash
uname -a          # Ej: Linux equipo1 6.8.0-45-generic #45-Ubuntu x86_64
uname -r           # Ej: 6.8.0-45-generic
```

---

### `hwinfo`

Alternativa a `lshw`, con un desglose muy detallado por categorías. No suele venir instalado por defecto (`sudo apt install hwinfo`).

| Opción | Qué hace |
|---|---|
| `--short` | Resumen compacto de todo el hardware |
| `--cpu` | Solo información de CPU |
| `--memory` | Solo memoria RAM |
| `--disk` | Solo discos |
| `--network` | Solo tarjetas de red |

**Ejemplos:**
```bash
hwinfo --short              # Vista general rápida
hwinfo --cpu                # Detalle del procesador
```

---

## 2. Procesador

### `lscpu`

Muestra la información de CPU que el **kernel** detecta realmente (a diferencia de `dmidecode`, que muestra lo que declara la BIOS). Es la referencia más fiable para saber qué ve el sistema operativo.

| Opción | Qué hace |
|---|---|
| (sin opciones) | Resumen completo: modelo, núcleos, hilos, caché, frecuencia |
| `-e` | Salida en formato tabla (por CPU lógica) |
| `-p` | Salida en formato CSV, fácil de parsear en scripts |
| `--all` | Incluye también las CPUs offline |

**Ejemplos:**
```bash
lscpu                       # Modelo, nº de núcleos/hilos, arquitectura, caché
lscpu | grep -i "model name"   # Solo el modelo exacto del procesador
```

---

## 3. Memoria RAM y recursos

### `free`

Muestra el uso actual de memoria RAM y memoria de intercambio (swap).

| Opción | Qué hace |
|---|---|
| `-h` | Formato legible (KB/MB/GB) en vez de bytes |
| `-m` | Fuerza el formato en megabytes |
| `-s <segundos>` | Refresca la salida cada N segundos (modo continuo) |
| `-t` | Añade una fila con el total de RAM+swap |

**Ejemplos:**
```bash
free -h                     # RAM total, usada, libre y disponible, en formato legible
free -h -s 2                # Actualiza cada 2 segundos
```

---

### `vmstat`

Estadísticas de memoria, procesos, E/S y CPU de un vistazo. Útil para detectar cuellos de botella (p. ej. uso excesivo de swap).

| Opción | Qué hace |
|---|---|
| `<segundos>` | Repite la muestra cada N segundos |
| `<segundos> <veces>` | Repite N veces cada ese intervalo |
| `-s` | Muestra un resumen de estadísticas de memoria desde el arranque |
| `-d` | Estadísticas de actividad de disco |

**Ejemplos:**
```bash
vmstat 2 5                  # 5 muestras, una cada 2 segundos
vmstat -s                   # Resumen de memoria desde el arranque
```

---

### `top` / `htop`

Muestran los procesos en ejecución en tiempo real junto con su consumo de CPU y RAM. `htop` es una versión interactiva y más visual (no viene instalada por defecto: `sudo apt install htop`).

| Opción (`top`) | Qué hace |
|---|---|
| (sin opciones) | Vista en tiempo real, refresco cada 3 s por defecto |
| `-d <segundos>` | Cambia el intervalo de refresco |
| `-u <usuario>` | Filtra procesos de un usuario concreto |
| `-o %MEM` | Ordena por uso de memoria en vez de CPU |

Dentro de `top`, teclas útiles: `M` (ordenar por memoria), `P` (ordenar por CPU), `k` (matar un proceso), `q` (salir).

**Ejemplos:**
```bash
top                          # Monitor interactivo clásico
top -u juan                  # Solo procesos del usuario "juan"
htop                         # Versión visual con barras de colores
```

---

## 4. Almacenamiento

### `lsblk`

Lista los discos y particiones del sistema en forma de árbol, con tamaño y punto de montaje. No requiere privilegios especiales.

| Opción | Qué hace |
|---|---|
| (sin opciones) | Árbol de discos/particiones con tamaño y punto de montaje |
| `-f` | Añade el tipo de sistema de archivos y la etiqueta |
| `-o <columnas>` | Elige qué columnas mostrar (p. ej. `NAME,SIZE,MODEL`) |
| `-d` | Solo discos, sin desglosar particiones |

**Ejemplos:**
```bash
lsblk                        # Árbol de discos y particiones
lsblk -f                     # Igual, pero con sistema de archivos y etiqueta
lsblk -o NAME,SIZE,MODEL     # Solo nombre, tamaño y modelo del disco
```

---

### `df`

Muestra el espacio usado y libre de cada sistema de archivos montado.

| Opción | Qué hace |
|---|---|
| `-h` | Formato legible (GB/MB) |
| `-T` | Añade el tipo de sistema de archivos (ext4, ntfs...) |
| `-i` | Muestra inodos usados/libres en vez de espacio |

**Ejemplos:**
```bash
df -h                        # Espacio usado/libre por partición montada
df -hT                       # Igual, mostrando también el tipo de sistema de archivos
```

---

### `du`

Calcula el espacio ocupado por archivos y carpetas (a diferencia de `df`, que mide particiones enteras).

| Opción | Qué hace |
|---|---|
| `-s` | Muestra solo el total (resumen), no cada subcarpeta |
| `-h` | Formato legible |
| `-a` | Incluye también archivos individuales, no solo carpetas |
| `--max-depth=<n>` | Limita la profundidad del desglose |

**Ejemplos:**
```bash
du -sh /home/juan             # Tamaño total de esa carpeta
du -h --max-depth=1 /var      # Tamaño de cada subcarpeta directa de /var
```

---

### `smartctl`

Consulta el estado de salud **S.M.A.R.T.** de un disco (HDD o SSD): temperatura, horas de uso, sectores reasignados, etc. Parte del paquete `smartmontools`. Fundamental para mantenimiento preventivo.

| Opción | Qué hace |
|---|---|
| `-a <disco>` | Informe completo: salud general + todos los atributos SMART |
| `-H <disco>` | Solo el resultado global (`PASSED`/`FAILED`) |
| `-i <disco>` | Información de identificación del disco (modelo, nº de serie, firmware) |
| `-t short` / `-t long` | Lanza un autotest SMART corto o largo |

**Ejemplos:**
```bash
sudo smartctl -H /dev/sda       # ¿El disco está en buen estado general?
sudo smartctl -a /dev/sda       # Informe completo de atributos SMART
sudo smartctl -t short /dev/sda # Lanza un test corto (los resultados se consultan después con -a)
```

---

### `blkid`

Muestra el UUID, la etiqueta y el tipo de sistema de archivos de cada partición. Muy usado para identificar discos en `/etc/fstab`.

| Opción | Qué hace |
|---|---|
| (sin opciones) | Lista todas las particiones con su UUID y tipo |
| `<dispositivo>` | Filtra solo esa partición (p. ej. `/dev/sda1`) |
| `-s <campo>` | Muestra solo un campo concreto (`UUID`, `TYPE`, `LABEL`) |

**Ejemplos:**
```bash
sudo blkid                       # UUID y tipo de fs de todas las particiones
sudo blkid /dev/sda1             # Solo esa partición
sudo blkid -s UUID /dev/sda1     # Solo el UUID
```

---

### `fdisk` / `parted`

Herramientas para listar y gestionar la tabla de particiones de un disco. `fdisk` es más sencillo (particiones MBR y GPT básico); `parted` es más completo, especialmente para discos GPT grandes.

| Opción | Qué hace |
|---|---|
| `fdisk -l` | Lista las particiones de todos los discos (o de uno con `-l /dev/sda`) |
| `fdisk /dev/sda` | Modo interactivo para crear/borrar/modificar particiones de ese disco |
| `parted -l` | Lista particiones con más detalle (tipo de tabla, alineación) |
| `parted /dev/sda print` | Muestra la tabla de particiones de ese disco |

**Ejemplos:**
```bash
sudo fdisk -l                   # Listado rápido de todas las particiones
sudo parted -l                  # Listado más detallado
sudo fdisk /dev/sdb              # Entra en modo interactivo para editar ese disco
```
> ⚠️ Modificar particiones es una operación destructiva si se hace mal: usar siempre con cuidado y sobre el disco correcto.

---

### `mount` / `umount`

Montan y desmontan un sistema de archivos en un punto del árbol de directorios.

| Opción | Qué hace |
|---|---|
| `mount` (sin opciones) | Lista todo lo que está montado actualmente |
| `mount /dev/sdb1 /mnt` | Monta esa partición en `/mnt` |
| `mount -t <tipo>` | Fuerza un tipo de sistema de archivos concreto |
| `mount -o ro` | Monta en modo solo lectura |
| `umount /mnt` | Desmonta lo que esté montado en `/mnt` |

**Ejemplos:**
```bash
sudo mount /dev/sdb1 /mnt        # Monta la partición en /mnt
sudo mount -o ro /dev/sdb1 /mnt  # Igual, pero en solo lectura
sudo umount /mnt                 # Desmonta
```

---

## 5. Buses y periféricos

### `lspci`

Lista los dispositivos conectados al bus **PCI/PCIe**: gráfica, controladoras SATA/USB, tarjeta de red, chipset...

| Opción | Qué hace |
|---|---|
| (sin opciones) | Listado breve de todos los dispositivos PCI |
| `-v` | Detalle medio (más líneas por dispositivo) |
| `-vv` | Detalle máximo |
| `-k` | Muestra también qué módulo/driver del kernel usa cada dispositivo |
| `-nn` | Añade los códigos numéricos de fabricante/dispositivo (útil para buscar drivers) |

**Ejemplos:**
```bash
lspci                           # Listado de todos los dispositivos PCI
lspci -k                        # Igual, mostrando el driver que usa cada uno
lspci -v | grep -A1 VGA         # Detalle de la tarjeta gráfica
```

---

### `lsusb`

Lista los dispositivos conectados al bus **USB**.

| Opción | Qué hace |
|---|---|
| (sin opciones) | Listado breve de dispositivos USB conectados |
| `-v` | Detalle completo de cada dispositivo |
| `-t` | Muestra la topología en árbol (qué hub/puerto usa cada dispositivo) |

**Ejemplos:**
```bash
lsusb                           # Listado de dispositivos USB conectados
lsusb -t                        # Árbol de hubs/puertos
lsusb -v -d 0781:5567           # Detalle de un dispositivo concreto (por ID fabricante:producto)
```

---

## 6. Kernel y diagnóstico de eventos

### `lsmod`

Lista los módulos (controladores) que el kernel tiene cargados actualmente.

| Opción | Qué hace |
|---|---|
| (sin opciones) | Lista de módulos cargados, con su tamaño y qué otros módulos dependen de él |

**Ejemplos:**
```bash
lsmod                           # Todos los módulos cargados
lsmod | grep usb                # Solo los relacionados con USB
```

---

### `dmesg`

Muestra los mensajes del **buffer del kernel**: lo primero que se consulta cuando un dispositivo recién conectado "no se detecta" o falla. Incluye desde el arranque hasta el último evento de hardware.

| Opción | Qué hace |
|---|---|
| (sin opciones) | Todo el buffer de mensajes del kernel |
| `-T` | Muestra las marcas de tiempo en formato legible (fecha/hora) en vez de segundos desde el arranque |
| `-w` | Modo continuo: espera y muestra nuevos mensajes según van llegando |
| `--level=err,warn` | Filtra solo mensajes de error/aviso |
| `\| tail -20` | (combinado con pipe) Muestra solo los últimos 20 mensajes |

**Ejemplos:**
```bash
dmesg -T | tail -20             # Últimos 20 mensajes, con fecha/hora legible
dmesg -w                        # Deja la terminal esperando nuevos eventos (útil al conectar un USB)
dmesg --level=err,warn           # Solo errores y avisos
```

---

## Tabla resumen: ¿qué comando uso para...?

| Necesito saber... | Comando |
|---|---|
| Fabricante/modelo/nº de serie del equipo | `dmidecode -t system` |
| Versión de la BIOS | `dmidecode -t bios` |
| Modelo de placa base | `dmidecode -t baseboard` |
| Modelo y núcleos de la CPU (lo que ve el kernel) | `lscpu` |
| Slots de RAM libres/ocupados | `dmidecode -t memory` |
| RAM en uso ahora mismo | `free -h` |
| Discos y particiones | `lsblk` |
| Espacio libre en disco | `df -h` |
| Estado de salud de un disco | `smartctl -a /dev/sda` |
| Tarjeta gráfica / dispositivos PCI | `lspci` |
| Dispositivos USB conectados | `lsusb` |
| Por qué un dispositivo no se detecta | `dmesg` |
| Inventario completo de hardware en árbol | `lshw` |
| Procesos que más CPU/RAM consumen | `top` / `htop` |
