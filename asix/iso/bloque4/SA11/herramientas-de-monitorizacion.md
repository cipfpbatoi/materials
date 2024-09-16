# 🔦 Herramientas de monitorización

## Monitorización del sistema:

**top**: Muestra una lista de los procesos en ejecución y su uso de recursos en tiempo real. Puedes presionar "q" para salir.

```bash
top
```

**htop**: Una versión mejorada de top con una interfaz más amigable e interactiva.

```bash
htop
```

**free**: Muestra la cantidad de memoria libre y utilizada en el sistema.

```bash
free -h
```

**vmstat**: Muestra estadísticas de virtual memory, disk, traps, y otros. Puedes especificar el intervalo de actualización en segundos (por ejemplo, 1 para actualizar cada segundo).

```bash
vmstat 1
```

**iostat**: Proporciona estadísticas de uso de CPU, memoria, dispositivos de E/S, etc.

```bash
iostat
```

**sar**: Recolecta, reporta y guarda datos de actividad del sistema como CPU, memoria, E/S de disco, etc.

```bash
sar
```

## Monitorización de red:

**iftop**: Muestra el tráfico de red en tiempo real.

```bash
iftop
```

**nload**: Muestra el tráfico de red y la carga de la interfaz en tiempo real.

```bash
nload
```

**netstat**: Muestra conexiones de red, tablas de enrutamiento, estadísticas de interfaces, etc.

```bash
netstat -antup
```

**iptraf**: Herramienta de monitorización de red interactiva que muestra información detallada sobre el tráfico de red.

```bash
iptraf
```

#### Monitorización de logs:

**tail**: Muestra las últimas líneas de un archivo (útil para ver logs en tiempo real).

```bash
tail -f /var/log/syslog
```

**journalctl**: Muestra los logs del sistema y de servicios usando el sistema de registro "systemd".

```bash
journalctl -xe
```

#### Monitorización de hardware:

**lscpu**: Muestra información detallada sobre la CPU.

```bash
lscpu
```

**lsblk**: Muestra información sobre los dispositivos de bloques (discos).

```bash
lsblk
```

**lshw**: Muestra información detallada sobre el hardware del sistema.

```bash
lshw
```

[Atras](README.md)