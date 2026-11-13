# SA2 – Componentes básicos de un equipo informático: el almacenamiento

**Módulo:** Montaje y Mantenimiento de Equipos (MME) · **Ciclo:** CFGM Sistemas Microinformáticos y Redes (SMR)

> Estos apuntes acompañan a la presentación de clase. Cada apartado amplía una o varias diapositivas. Si algo de la presentación no te queda claro, búscalo aquí por su título. Al final tienes un **glosario**, **preguntas frecuentes** y **actividades**.

**Qué deberías saber hacer al terminar esta SA**

- Explicar cómo guardan los datos un disco duro (HDD) y una unidad de estado sólido (SSD), y sus ventajas e inconvenientes.
- Interpretar la ficha técnica de un disco: capacidad, interfaz, velocidad, caché, tipo de memoria flash y durabilidad.
- Distinguir las interfaces SATA, SAS y PCIe/NVMe, y reconocer a simple vista un SSD M.2 SATA de uno NVMe.
- Comprobar si un disco es compatible con una placa base y elegir el adecuado para cada uso.
- Instalar un disco de 3,5", uno de 2,5" y un SSD M.2, y prepararlo para usarlo (inicializar, particionar y formatear).
- Explicar la diferencia entre MBR y GPT, y elegir el sistema de archivos adecuado.
- Reconocer los tipos de almacenamiento extraíble: discos externos, memorias USB, tarjetas de memoria y discos ópticos.
- Diagnosticar el estado de un disco con SMART y medir su rendimiento.
- Mantener un disco en buen estado y borrar sus datos de forma segura.

---

**Índice**
- [SA2 – Componentes básicos de un equipo informático: el almacenamiento](#sa2--componentes-básicos-de-un-equipo-informático-el-almacenamiento)
  - [1. El almacenamiento en el ordenador](#1-el-almacenamiento-en-el-ordenador)
    - [1.1 Primario, secundario y terciario](#11-primario-secundario-y-terciario)
    - [1.2 Tecnologías de almacenamiento](#12-tecnologías-de-almacenamiento)
    - [1.3 Interno, externo y extraíble](#13-interno-externo-y-extraíble)
    - [1.4 Unidades de capacidad: por qué "falta" espacio](#14-unidades-de-capacidad-por-qué-falta-espacio)
  - [2. El disco duro (HDD): cómo funciona](#2-el-disco-duro-hdd-cómo-funciona)
    - [2.1 Componentes](#21-componentes)
    - [2.2 Cómo se organiza la superficie: pistas, sectores y cilindros](#22-cómo-se-organiza-la-superficie-pistas-sectores-y-cilindros)
    - [2.3 De CHS a LBA](#23-de-chs-a-lba)
    - [2.4 Sectores de 512 bytes y de 4K](#24-sectores-de-512-bytes-y-de-4k)
    - [2.5 Tecnologías de grabación: CMR, SMR y HAMR](#25-tecnologías-de-grabación-cmr-smr-y-hamr)
  - [3. Parámetros de un disco duro](#3-parámetros-de-un-disco-duro)
    - [3.1 Capacidad](#31-capacidad)
    - [3.2 Velocidad de rotación](#32-velocidad-de-rotación)
    - [3.3 Tiempos de acceso y latencia](#33-tiempos-de-acceso-y-latencia)
    - [3.4 Tasa de transferencia](#34-tasa-de-transferencia)
    - [3.5 Caché (búfer)](#35-caché-búfer)
    - [3.6 Tamaño (factor de forma)](#36-tamaño-factor-de-forma)
    - [3.7 Fiabilidad, consumo y ruido](#37-fiabilidad-consumo-y-ruido)
    - [3.8 Gamas de discos duros](#38-gamas-de-discos-duros)
  - [4. Unidades de estado sólido (SSD)](#4-unidades-de-estado-sólido-ssd)
    - [4.1 La celda de memoria flash](#41-la-celda-de-memoria-flash)
    - [4.2 Cómo se lee, escribe y borra](#42-cómo-se-lee-escribe-y-borra)
    - [4.3 3D NAND](#43-3d-nand)
    - [4.4 Componentes de un SSD](#44-componentes-de-un-ssd)
    - [4.5 La caché SLC](#45-la-caché-slc)
    - [4.6 Cómo cuida el SSD su memoria](#46-cómo-cuida-el-ssd-su-memoria)
    - [4.7 Durabilidad: TBW y DWPD](#47-durabilidad-tbw-y-dwpd)
    - [4.8 Retención de datos](#48-retención-de-datos)
  - [5. Interfaces y protocolos](#5-interfaces-y-protocolos)
    - [5.1 IDE / PATA (historia)](#51-ide--pata-historia)
    - [5.2 SATA](#52-sata)
    - [5.3 SCSI y SAS (servidores)](#53-scsi-y-sas-servidores)
    - [5.4 PCI Express y NVMe](#54-pci-express-y-nvme)
    - [5.5 Comparativa de interfaces](#55-comparativa-de-interfaces)
    - [5.6 Formatos de servidor: U.2, U.3 y EDSFF](#56-formatos-de-servidor-u2-u3-y-edsff)
  - [6. Formatos de SSD y la ranura M.2](#6-formatos-de-ssd-y-la-ranura-m2)
    - [6.1 Formatos de SSD](#61-formatos-de-ssd)
    - [6.2 M.2: un formato, no una interfaz](#62-m2-un-formato-no-una-interfaz)
    - [6.3 Las llaves (muescas) de M.2](#63-las-llaves-muescas-de-m2)
    - [6.4 Las ranuras M.2 de la placa base](#64-las-ranuras-m2-de-la-placa-base)
    - [6.5 Adaptadores](#65-adaptadores)
  - [7. HDD frente a SSD](#7-hdd-frente-a-ssd)
  - [8. Estructura lógica: particiones, MBR y GPT](#8-estructura-lógica-particiones-mbr-y-gpt)
    - [8.1 Particiones](#81-particiones)
    - [8.2 MBR (Master Boot Record)](#82-mbr-master-boot-record)
    - [8.3 GPT (GUID Partition Table)](#83-gpt-guid-partition-table)
    - [8.4 Comparativa](#84-comparativa)
    - [8.5 Las particiones de una instalación de Windows](#85-las-particiones-de-una-instalación-de-windows)
    - [8.6 Convertir entre MBR y GPT](#86-convertir-entre-mbr-y-gpt)
  - [9. Sistemas de archivos y formateo](#9-sistemas-de-archivos-y-formateo)
    - [9.1 Qué es un sistema de archivos](#91-qué-es-un-sistema-de-archivos)
    - [9.2 Sistemas de archivos habituales](#92-sistemas-de-archivos-habituales)
    - [9.3 Formatear](#93-formatear)
    - [9.4 Volúmenes dinámicos y Espacios de almacenamiento](#94-volúmenes-dinámicos-y-espacios-de-almacenamiento)
  - [10. Almacenamiento externo y extraíble](#10-almacenamiento-externo-y-extraíble)
    - [10.1 La conexión: USB y Thunderbolt](#101-la-conexión-usb-y-thunderbolt)
    - [10.2 Discos externos](#102-discos-externos)
    - [10.3 Memorias USB (pendrives)](#103-memorias-usb-pendrives)
    - [10.4 Tarjetas de memoria](#104-tarjetas-de-memoria)
    - [10.5 Almacenamiento soldado: eMMC y UFS](#105-almacenamiento-soldado-emmc-y-ufs)
  - [11. Almacenamiento óptico: CD, DVD y Blu-ray](#11-almacenamiento-óptico-cd-dvd-y-blu-ray)
    - [11.1 Cómo funciona](#111-cómo-funciona)
    - [11.2 CD (Compact Disc)](#112-cd-compact-disc)
    - [11.3 DVD (Digital Versatile Disc)](#113-dvd-digital-versatile-disc)
    - [11.4 Blu-ray (BD)](#114-blu-ray-bd)
    - [11.5 Comparativa](#115-comparativa)
    - [11.6 La unidad lectora/grabadora](#116-la-unidad-lectoragrabadora)
    - [11.7 Situación actual](#117-situación-actual)
  - [12. Almacenamiento en red, en la nube y copias de seguridad](#12-almacenamiento-en-red-en-la-nube-y-copias-de-seguridad)
    - [12.1 NAS](#121-nas)
    - [12.2 SAN](#122-san)
    - [12.3 RAID (introducción)](#123-raid-introducción)
    - [12.4 Almacenamiento en la nube](#124-almacenamiento-en-la-nube)
    - [12.5 Cintas magnéticas](#125-cintas-magnéticas)
    - [12.6 La regla 3-2-1](#126-la-regla-3-2-1)
  - [13. La BIOS/UEFI y los discos](#13-la-biosuefi-y-los-discos)
    - [13.1 Comprobar que se detecta el disco](#131-comprobar-que-se-detecta-el-disco)
    - [13.2 Modo de la controladora SATA: AHCI, RAID y VMD](#132-modo-de-la-controladora-sata-ahci-raid-y-vmd)
    - [13.3 Orden de arranque](#133-orden-de-arranque)
    - [13.4 CSM y Secure Boot](#134-csm-y-secure-boot)
    - [13.5 Otras opciones](#135-otras-opciones)
  - [14. Compatibilidad y elección del almacenamiento](#14-compatibilidad-y-elección-del-almacenamiento)
    - [14.1 Lista de comprobación](#141-lista-de-comprobación)
    - [14.2 Qué elegir en 2026](#142-qué-elegir-en-2026)
    - [14.3 El mercado del almacenamiento en 2026](#143-el-mercado-del-almacenamiento-en-2026)
  - [15. Instalación paso a paso](#15-instalación-paso-a-paso)
    - [15.1 Disco de 3,5" o 2,5" SATA](#151-disco-de-35-o-25-sata)
    - [15.2 SSD M.2](#152-ssd-m2)
    - [15.3 Después de montarlo](#153-después-de-montarlo)
    - [15.4 Clonar el disco antiguo](#154-clonar-el-disco-antiguo)
  - [16. Herramientas de información, diagnóstico y rendimiento](#16-herramientas-de-información-diagnóstico-y-rendimiento)
    - [16.1 Ver los discos instalados](#161-ver-los-discos-instalados)
    - [16.2 SMART: la salud del disco](#162-smart-la-salud-del-disco)
    - [16.3 Comprobar el sistema de archivos y la superficie](#163-comprobar-el-sistema-de-archivos-y-la-superficie)
    - [16.4 Medir el rendimiento](#164-medir-el-rendimiento)
  - [17. Mantenimiento y optimización](#17-mantenimiento-y-optimización)
    - [17.1 Discos duros: desfragmentar](#171-discos-duros-desfragmentar)
    - [17.2 SSD: TRIM, no desfragmentar](#172-ssd-trim-no-desfragmentar)
    - [17.3 Buenas prácticas](#173-buenas-prácticas)
    - [17.4 Mitos sobre los SSD](#174-mitos-sobre-los-ssd)
  - [18. Síntomas y averías habituales](#18-síntomas-y-averías-habituales)
  - [19. Borrado seguro y recuperación de datos](#19-borrado-seguro-y-recuperación-de-datos)
    - [19.1 Borrar no es eliminar](#191-borrar-no-es-eliminar)
    - [19.2 Borrado seguro](#192-borrado-seguro)
    - [19.3 Recuperación profesional](#193-recuperación-profesional)
  - [20. Tecnologías del pasado y del futuro](#20-tecnologías-del-pasado-y-del-futuro)
    - [20.1 Tecnologías que ya no se usan](#201-tecnologías-que-ya-no-se-usan)
    - [20.2 Lo que viene](#202-lo-que-viene)
  - [21. Glosario](#21-glosario)
  - [22. Preguntas frecuentes](#22-preguntas-frecuentes)
  - [23. Actividades](#23-actividades)
  - [24. Recursos](#24-recursos)


1. [El almacenamiento en el ordenador](#1-el-almacenamiento-en-el-ordenador)
2. [El disco duro (HDD): cómo funciona](#2-el-disco-duro-hdd-cómo-funciona)
3. [Parámetros de un disco duro](#3-parámetros-de-un-disco-duro)
4. [Unidades de estado sólido (SSD)](#4-unidades-de-estado-sólido-ssd)
5. [Interfaces y protocolos](#5-interfaces-y-protocolos)
6. [Formatos de SSD y la ranura M.2](#6-formatos-de-ssd-y-la-ranura-m2)
7. [HDD frente a SSD](#7-hdd-frente-a-ssd)
8. [Estructura lógica: particiones, MBR y GPT](#8-estructura-lógica-particiones-mbr-y-gpt)
9. [Sistemas de archivos y formateo](#9-sistemas-de-archivos-y-formateo)
10. [Almacenamiento externo y extraíble](#10-almacenamiento-externo-y-extraíble)
11. [Almacenamiento óptico: CD, DVD y Blu-ray](#11-almacenamiento-óptico-cd-dvd-y-blu-ray)
12. [Almacenamiento en red, en la nube y copias de seguridad](#12-almacenamiento-en-red-en-la-nube-y-copias-de-seguridad)
13. [La BIOS/UEFI y los discos](#13-la-biosuefi-y-los-discos)
14. [Compatibilidad y elección del almacenamiento](#14-compatibilidad-y-elección-del-almacenamiento)
15. [Instalación paso a paso](#15-instalación-paso-a-paso)
16. [Herramientas de información, diagnóstico y rendimiento](#16-herramientas-de-información-diagnóstico-y-rendimiento)
17. [Mantenimiento y optimización](#17-mantenimiento-y-optimización)
18. [Síntomas y averías habituales](#18-síntomas-y-averías-habituales)
19. [Borrado seguro y recuperación de datos](#19-borrado-seguro-y-recuperación-de-datos)
20. [Tecnologías del pasado y del futuro](#20-tecnologías-del-pasado-y-del-futuro)
21. [Glosario](#21-glosario)
22. [Preguntas frecuentes](#22-preguntas-frecuentes)
23. [Actividades](#23-actividades)
24. [Recursos](#24-recursos)

---

## 1. El almacenamiento en el ordenador

En los apuntes de memoria vimos la **jerarquía de memoria**: registros, caché, RAM y, en la base, el almacenamiento. La RAM es rápida, pero **volátil**: al apagar el equipo se pierde todo. Por eso necesitamos un sitio donde los datos se conserven sin corriente: el **almacenamiento**.

### 1.1 Primario, secundario y terciario

| Tipo | Qué es | Ejemplos | Volátil |
|---|---|---|---|
| **Primario** (memoria principal) | Memoria con la que trabaja directamente la CPU | RAM, caché | Sí |
| **Secundario** (almacenamiento masivo) | Guarda el sistema operativo, los programas y los datos de forma permanente | HDD, SSD, memorias USB, tarjetas | No |
| **Terciario** (almacenamiento externo, de archivo o en red) | Grandes volúmenes, copias de seguridad, datos compartidos | NAS, nube, cintas, discos ópticos | No |

El almacenamiento secundario es **mucho más lento** que la RAM (ver la tabla de la jerarquía en los apuntes de memoria), pero ofrece **mucha más capacidad** a un **precio por GB mucho menor** y **no pierde los datos** al apagar.

> La ROM de la placa base (donde está el firmware UEFI) también es no volátil, pero no la contamos como almacenamiento: solo guarda el firmware. Se vio en los apuntes de memoria.

### 1.2 Tecnologías de almacenamiento

Según **cómo** se guarda cada bit, hay tres grandes familias:

| Tecnología | Cómo guarda un bit | Ejemplos |
|---|---|---|
| **Magnética** | Orientación magnética de una pequeña zona de una superficie | Disco duro (HDD), cinta, disquete |
| **Óptica** | Zonas que reflejan la luz de un láser de forma diferente | CD, DVD, Blu-ray |
| **Electrónica (flash)** | Carga eléctrica atrapada en una celda de un chip | SSD, memorias USB, tarjetas SD, eMMC, UFS |

### 1.3 Interno, externo y extraíble

- **Interno:** dentro de la caja, conectado a la placa base (mediante conector M.2, SATA).
- **Externo:** fuera de la caja, normalmente por USB o Thunderbolt (disco externo, SSD portátil).
- **Extraíble:** el soporte se puede sacar del lector (tarjeta SD, disco óptico, memoria USB).

### 1.4 Unidades de capacidad: por qué "falta" espacio

Los fabricantes de discos usan **unidades decimales** (potencias de 1000), y Windows muestra **unidades binarias** (potencias de 1024) aunque las llame "GB" y "TB".

| Unidad decimal (fabricante) | Valor | Unidad binaria (sistema) | Valor |
|---|---|---|---|
| 1 KB (kilobyte) | 1000 bytes | 1 KiB (kibibyte) | 1024 bytes |
| 1 MB | 1000² bytes | 1 MiB | 1024² bytes |
| 1 GB | 1000³ bytes | 1 GiB | 1024³ bytes |
| 1 TB | 1000⁴ bytes | 1 TiB | 1024⁴ bytes |

**Ejemplo:** un disco de 1 TB tiene 1 000 000 000 000 bytes. Windows lo divide entre 1024³ y muestra **931 GB**. No falta nada: es el mismo número de bytes expresado en otra unidad. Cuanto mayor es el disco, mayor es la diferencia (un disco de 4 TB aparece como 3,63 TB).

> Además, el sistema operativo ocupa espacio con las particiones de arranque y de recuperación, y algunos fabricantes de portátiles añaden la suya. Por eso el espacio libre real es todavía menor.

---

## 2. El disco duro (HDD): cómo funciona

El **disco duro** o **HDD** (*Hard Disk Drive*) guarda los datos de forma **magnética** sobre unos discos que giran. Es una tecnología de 1956, pero sigue siendo la más barata por TB y la base del almacenamiento de los centros de datos.

### 2.1 Componentes

```
 ┌──────────────────────────────────────────────┐
 │  Carcasa hermética (aire filtrado o helio)   │
 │                                              │
 │      ╭───────────────╮        brazo ┐        │
 │    ╭─┤   PLATOS      ├─╮  ╭────────●──┐      │
 │    │ │      ●        │ │  │ actuador  │      │
 │    ╰─┤  (eje+motor)  ├─╯  ╰───────────┘      │
 │      ╰───────────────╯   cabezal en la punta │
 │                                              │
 └───────────────── PCB (controladora, caché) ──┘
```

| Componente | Función |
|---|---|
| **Platos** | Discos de aluminio o vidrio cubiertos de material magnético. Se usan las dos caras. Un disco de sobremesa lleva de 1 a 5; los de gran capacidad, hasta 10 u 11. |
| **Motor del eje** (*spindle*) | Hace girar todos los platos a la vez, a velocidad constante (5400, 7200 rpm…). |
| **Cabezales de lectura/escritura** | Uno por cada cara de cada plato. **Flotan** a unos pocos nanómetros de la superficie sobre un colchón de aire: nunca tocan el plato mientras funciona. |
| **Brazo y actuador** | El brazo lleva los cabezales; el actuador (una bobina de voz, *voice coil*) los mueve todos juntos hacia dentro o hacia fuera. |
| **Zona de aparcamiento** | Al apagar, los cabezales se retiran a una rampa fuera de los platos. |
| **Placa electrónica (PCB)** | Lleva la **controladora**, la **caché** (memoria DRAM) y los conectores. |
| **Carcasa** | Cerrada y filtrada: una mota de polvo es más grande que el hueco entre cabezal y plato. Los discos de gran capacidad se rellenan de **helio**, que ofrece menos rozamiento y permite meter más platos. |

> **Nunca abras un disco duro que quieras volver a usar.** Fuera de una sala limpia, el polvo lo estropea. Tampoco lo muevas ni lo golpees mientras funciona: si un cabezal toca el plato (*head crash*), raya la superficie y se pierden datos.

### 2.2 Cómo se organiza la superficie: pistas, sectores y cilindros

| Elemento | Qué es |
|---|---|
| **Cara** | Cada una de las dos superficies de un plato. Cada cara tiene su cabezal. |
| **Pista** (*track*) | Cada uno de los círculos concéntricos en que se divide una cara. Hay cientos de miles por cara. |
| **Sector** | Cada trozo en que se divide una pista. Es la **unidad mínima** que el disco lee o escribe. Tradicionalmente de **512 bytes**; los discos actuales usan **4096 bytes (4K)**. |
| **Cilindro** | El conjunto de pistas que están **en la misma posición** en todas las caras. Como todos los cabezales se mueven juntos, se pueden leer todas las pistas de un cilindro sin mover el brazo. |

```
   Vista de una cara                      Cilindro (vista lateral)

      ╭──────────────╮                  cabezal ─► ═══════ cara 0
    ╭─┤ ╭──────────╮ ├─╮  ◄ pista               ─► ═══════ cara 1
    │ │ │  ╭────╮  │ │ │                         ─► ═══════ cara 2
    │ │ │  │ ●  │  │ │ │                         ─► ═══════ cara 3
    │ │ │  ╰────╯  │ │ │                  └─ la misma pista en todas
    ╰─┤ ╰──────────╯ ├─╯                     las caras = un cilindro
      ╰──────╱───────╯
           sector
```

Las pistas exteriores son más largas que las interiores, así que tienen **más sectores**. Esta técnica se llama **grabación por zonas** (*zoned bit recording*). Como el disco gira a velocidad constante, **en las pistas exteriores se leen más datos por vuelta**: el principio del disco (la parte exterior, donde se graba primero) es más rápido que el final.

### 2.3 De CHS a LBA

Los primeros PC localizaban un sector por su **cilindro, cabeza y sector** (**CHS**). Este sistema tenía límites muy bajos y no encaja con la grabación por zonas.

Hoy se usa **LBA** (*Logical Block Addressing*): los sectores se numeran **del 0 en adelante**, como si el disco fuera una lista. La controladora del disco traduce cada número a su posición física real. El sistema operativo no sabe ni le importa cuántos platos o cabezales tiene el disco.

### 2.4 Sectores de 512 bytes y de 4K

Desde 2011 los discos usan internamente sectores de 4096 bytes (formato **Advanced Format**), porque así se pierde menos espacio en separaciones y códigos de corrección. Para mantener la compatibilidad:

- **512e** (*512 emulation*): el sector físico es de 4K, pero el disco se presenta como si tuviera sectores de 512 bytes.
- **4Kn** (*4K native*): el disco se presenta con sectores de 4K. Necesita un sistema operativo y una UEFI que lo admitan.

**Consecuencia práctica:** las particiones deben empezar en una posición múltiplo de 4K (**alineación**). Las herramientas actuales lo hacen solas (alinean a 1 MiB). Si se clona un disco con herramientas antiguas, una partición desalineada puede bajar mucho el rendimiento.

### 2.5 Tecnologías de grabación: CMR, SMR y HAMR

| Tecnología | Cómo es | Dónde se usa |
|---|---|---|
| **CMR** (o PMR) | *Conventional Magnetic Recording*. Pistas independientes que no se solapan. | La mayoría de discos de NAS, vigilancia y empresa. Rendimiento estable. |
| **SMR** | *Shingled Magnetic Recording*. Las pistas se **solapan** como las tejas de un tejado. Cabe más en cada plato, pero para reescribir una pista hay que reescribir las de al lado. | Discos baratos de sobremesa y externos, discos de archivo. **Muy lentos escribiendo de forma continua**: no se recomiendan para NAS ni RAID. |
| **HAMR** | *Heat-Assisted Magnetic Recording*. Un láser calienta un punto diminuto del plato justo antes de escribir, lo que permite bits mucho más pequeños. | Discos de centro de datos de más de 30 TB. |

> Antes de comprar un disco para un NAS, comprueba en la ficha técnica que sea **CMR**. Algunos fabricantes vendieron discos SMR sin indicarlo y causaron problemas en NAS y RAID.

---

## 3. Parámetros de un disco duro

### 3.1 Capacidad

Se mide en TB (decimales, ver apartado 1.4). Valores habituales en 2026:

| Uso | Capacidades habituales |
|---|---|
| Portátil (2,5") | 1–2 TB (casi desaparecido: los portátiles usan SSD) |
| Sobremesa (3,5") | 2–8 TB |
| NAS y vigilancia | 4–24 TB |
| Centro de datos | 20–44 TB |

Los discos de mayor capacidad ya se fabrican con HAMR: a principios de 2026 Seagate empezó a entregar discos de hasta 44 TB a grandes proveedores de nube, y los fabricantes tienen como objetivo llegar a 100 TB a finales de la década.

### 3.2 Velocidad de rotación

Se mide en **revoluciones por minuto (rpm)**.

| Velocidad | Uso habitual |
|---|---|
| 5400 / 5900 rpm | Portátiles, discos externos, NAS domésticos (más silenciosos y fríos) |
| 7200 rpm | Sobremesa, NAS profesionales, centro de datos |
| 10 000 / 15 000 rpm | Servidores antiguos (SAS). Los ha sustituido el SSD. |

### 3.3 Tiempos de acceso y latencia

Para leer un sector, el disco tiene que hacer dos cosas mecánicas:

1. **Mover el brazo** hasta la pista correcta → **tiempo de búsqueda** (*seek time*). Un disco de sobremesa tarda de media **8–10 ms**.
2. **Esperar a que el sector pase por debajo del cabezal** → **latencia rotacional**. De media, hay que esperar **media vuelta**.

**Latencia rotacional media:**

```
latencia (ms) = (60 / rpm) / 2 × 1000
```

| rpm | Una vuelta | Latencia media |
|---|---|---|
| 5400 | 11,1 ms | **5,6 ms** |
| 7200 | 8,3 ms | **4,2 ms** |
| 15 000 | 4 ms | **2 ms** |

**Tiempo de acceso medio = tiempo de búsqueda + latencia rotacional.** Para un disco de 7200 rpm: unos 9 + 4,2 ≈ **13 ms**.

> Compara con la RAM (unos 80 ns) o con un SSD NVMe (unos 0,05 ms): un disco duro es **cientos de veces más lento** que un SSD en accesos aleatorios. Por eso un ordenador con el sistema operativo en un HDD "va lento" aunque tenga un buen procesador.

### 3.4 Tasa de transferencia

Es la cantidad de datos por segundo que el disco puede leer o escribir de forma **continua** (secuencial). Depende de la densidad de los platos y de la velocidad de giro, **no de la interfaz**.

- Disco de sobremesa de 7200 rpm: **150–270 MB/s** (más al principio del disco que al final).
- Disco de gran capacidad: hasta unos **300 MB/s**.

Aunque SATA III admite 600 MB/s, **ningún disco duro llega a llenarla**. En accesos aleatorios a archivos pequeños la cifra cae a **1 MB/s o menos**.

Otra forma de medir el rendimiento son las **IOPS** (operaciones de entrada/salida por segundo): un HDD hace unas **100–200 IOPS**; un SSD NVMe, **cientos de miles**.

### 3.5 Caché (búfer)

Memoria DRAM de la placa del disco. Guarda los datos que acaban de leerse o que esperan para escribirse, y suaviza la diferencia entre el ritmo de los platos y el de la interfaz. Valores actuales: **64–512 MB**.

> No tiene nada que ver con la caché del procesador: son memorias distintas, en sitios distintos.

### 3.6 Tamaño (factor de forma)

| Formato | Dimensiones | Altura | Uso |
|---|---|---|---|
| **3,5"** | 101,6 × 147 mm | 26,1 mm | Sobremesa, NAS, servidores. Necesita 12 V y 5 V. |
| **2,5"** | 69,85 × 100 mm | 7 o 9,5 mm (hasta 15 mm en servidores) | Portátiles, consolas, discos externos. Solo necesita 5 V. |

El tamaño indica el **diámetro aproximado de los platos**, no el ancho de la carcasa.

### 3.7 Fiabilidad, consumo y ruido

- **MTBF** (*Mean Time Between Failures*): tiempo medio entre fallos, calculado estadísticamente. Los discos de empresa indican hasta **2,5 millones de horas**. No significa que un disco vaya a durar 285 años: es una media sobre miles de unidades.
- **AFR** (*Annualized Failure Rate*): porcentaje de discos que fallan al año. Es más fácil de entender: un AFR del 1 % significa que, de 100 discos, falla uno al año.
- **Carga de trabajo** (*workload rating*): TB que se pueden leer y escribir al año sin perder la garantía. Unos 55 TB/año en discos de sobremesa y 550 TB/año en los de empresa.
- **Horas de funcionamiento:** los discos de sobremesa están pensados para 8 horas al día; los de NAS y vigilancia, para 24/7.
- **Consumo:** 5–10 W un 3,5" de sobremesa; 1,5–3 W un 2,5".
- **Ruido:** el giro produce un zumbido y el movimiento del brazo, un "rascado" rápido al leer. Los discos de 7200 rpm son más ruidosos.
- **Golpes:** se indica en **G**. Un disco aguanta mucho más golpe **apagado** (300–1000 G) que **funcionando** (30–70 G).

### 3.8 Gamas de discos duros

Los fabricantes (en 2026 solo quedan **tres**: Seagate, Western Digital y Toshiba) venden la misma tecnología en gamas distintas:

| Gama | Ejemplos | Características |
|---|---|---|
| Sobremesa | Seagate BarraCuda, Toshiba P300 | Baratos. Uso de 8 h/día. Algunos son SMR. |
| NAS | WD Red Plus/Pro, Seagate IronWolf, Toshiba N300 | CMR, 24/7, sensores de vibración para trabajar junto a otros discos. |
| Vigilancia | WD Purple, Seagate SkyHawk | 24/7, firmware optimizado para escribir vídeo continuamente. |
| Empresa | Seagate Exos, WD Ultrastar, Toshiba MG | Máxima capacidad, 7200 rpm, helio, 5 años de garantía. |

---

## 4. Unidades de estado sólido (SSD)

Un **SSD** (*Solid State Drive*, unidad de estado sólido) guarda los datos en **chips de memoria flash NAND**. No tiene piezas móviles: no hay platos, ni motor, ni brazo. Por eso:

- Tiene una **latencia muchísimo menor**: no hay que esperar a que nada se mueva.
- Es **silencioso** y **resiste mucho mejor los golpes**.
- **Consume menos**, sobre todo en reposo, lo que alarga la batería de los portátiles.
- Es más pequeño y ligero.

> **Ojo con un error muy repetido: los SSD sí se calientan.** Un SSD SATA apenas se calienta, pero un SSD NVMe PCIe 4.0 o 5.0 puede superar los 70–80 °C con cargas largas y bajar su velocidad para protegerse (*thermal throttling*). Por eso muchos llevan disipador.

### 4.1 La celda de memoria flash

La memoria flash es una evolución de la memoria **EEPROM** (ROM programable y borrable eléctricamente) que vimos en los apuntes de memoria. Cada **celda** es un transistor especial que puede **atrapar electrones** en una capa aislada (puerta flotante o *charge trap*). Los electrones se quedan ahí sin necesidad de corriente: por eso **no es volátil**.

La cantidad de carga atrapada cambia la tensión a la que conduce el transistor, y eso se interpreta como bits. Si se distinguen más niveles de carga, **cada celda guarda más bits**:

| Tipo | Bits por celda | Niveles de carga | Velocidad | Durabilidad (ciclos de borrado aprox.) | Uso actual |
|---|---|---|---|---|---|
| **SLC** | 1 | 2 | Máxima | ~100 000 | Industria. En los SSD de consumo, solo como caché. |
| **MLC** | 2 | 4 | Alta | ~3000–10 000 | Casi desaparecida |
| **TLC** | 3 | 8 | Buena | ~1000–3000 | **La más habitual** en SSD de gama media y alta |
| **QLC** | 4 | 16 | Menor (sobre todo al escribir mucho) | ~500–1000 | SSD baratos y de gran capacidad |
| **PLC** | 5 | 32 | — | — | En desarrollo |

Más bits por celda = **más capacidad y precio más bajo**, pero **menos velocidad de escritura y menos durabilidad**, porque hay que distinguir niveles de carga cada vez más parecidos.

### 4.2 Cómo se lee, escribe y borra

La flash tiene una peculiaridad que explica casi todo el funcionamiento de un SSD:

- Se **lee** y se **escribe** por **páginas** (unos 16 KB).
- Pero solo se puede **borrar** por **bloques** enteros (cientos de páginas, varios MB).
- **No se puede sobrescribir** una página: primero hay que borrar el bloque completo.

Por eso, cuando modificas un archivo, el SSD **no reescribe** la página antigua: escribe los datos nuevos en una página libre y marca la antigua como "no válida". Más adelante, la controladora limpia los bloques llenos de páginas no válidas.

Además, cada celda solo aguanta un **número limitado de ciclos de borrado**: con el uso, el aislante se desgasta.

### 4.3 3D NAND

Al principio, las celdas se colocaban en una sola capa (**NAND planar**). Para seguir aumentando la capacidad sin hacer las celdas más pequeñas (y menos fiables), desde 2013 se **apilan en vertical**: es la **3D NAND** (Samsung la llamó V-NAND). En 2026 los chips tienen **más de 200 capas**, y los fabricantes ya superan las 300.

### 4.4 Componentes de un SSD

| Componente | Función |
|---|---|
| **Controladora** | Un procesador que gestiona todo: reparte los datos entre los chips, corrige errores, gestiona el desgaste y habla con el ordenador. **Es lo que más influye en el rendimiento.** Fabricantes: Phison, Silicon Motion, Samsung, WD/Sandisk, Marvell… |
| **Chips NAND** | Donde se guardan los datos. La controladora trabaja con varios a la vez (canales) para sumar velocidad, como un RAID interno. |
| **Caché DRAM** | Guarda la **tabla de traducción** que indica en qué página física está cada dato. Los SSD **sin DRAM** (*DRAM-less*) son más baratos y pueden usar un trozo de la RAM del ordenador (**HMB**, *Host Memory Buffer*). Para un uso normal funcionan bien; con cargas pesadas, peor. |
| **Firmware** | El programa de la controladora. Se puede actualizar con la herramienta del fabricante. |

### 4.5 La caché SLC

Casi todos los SSD TLC y QLC usan una parte de su memoria **como si fuera SLC** (un bit por celda) para escribir muy rápido. Después, en segundo plano, pasan esos datos a TLC/QLC.

Consecuencia: al copiar un archivo muy grande, el SSD va muy rápido **hasta que llena la caché SLC**, y entonces la velocidad **cae de golpe**. En un SSD QLC barato puede bajar por debajo de la de un disco duro. Las fichas técnicas solo indican la velocidad máxima, así que hay que mirar análisis independientes.

### 4.6 Cómo cuida el SSD su memoria

| Técnica | Qué hace |
|---|---|
| **Nivelación de desgaste** (*wear leveling*) | Reparte las escrituras entre todos los bloques para que no se gasten siempre los mismos. |
| **Recolección de basura** (*garbage collection*) | Agrupa las páginas válidas de varios bloques en uno nuevo y borra los bloques viejos para dejarlos listos. |
| **TRIM** | Orden con la que el sistema operativo **avisa al SSD de qué datos se han borrado**. Sin TRIM, el SSD no sabe que esas páginas ya no sirven y las sigue copiando. Windows, Linux y macOS lo activan solos. |
| **Sobreaprovisionamiento** (*over-provisioning*) | Espacio reservado que el usuario no ve. Por eso hay SSD de 480 o 500 GB en lugar de 512 GB. |
| **ECC** | Códigos de corrección de errores (LDPC) que corrigen los bits que fallan al leer. |

### 4.7 Durabilidad: TBW y DWPD

La durabilidad de un SSD se indica de dos formas:

- **TBW** (*Terabytes Written*): total de TB que se pueden escribir durante la garantía. Un SSD de 1 TB suele indicar **600 TBW** (TLC) o **200–400 TBW** (QLC).
- **DWPD** (*Drive Writes Per Day*): cuántas veces se puede escribir el disco completo cada día durante la garantía. Se usa en SSD de empresa.

**¿Es suficiente?** Un usuario normal escribe 10–30 GB al día. Con 600 TBW, a 30 GB/día:

```
600 000 GB / 30 GB al día = 20 000 días ≈ 55 años
```

> Para un uso doméstico, el desgaste de un SSD **no es un problema real**. Es mucho más probable que falle la controladora o que el equipo se quede obsoleto. Pero hay que vigilar los SSD de los servidores, de las cámaras de vigilancia o de los equipos que escriben datos todo el día.

### 4.8 Retención de datos

Un SSD guarda los datos sin corriente, pero **no para siempre**: con los años, las celdas pierden carga poco a poco, y más rápido si hace calor o la memoria está muy gastada. **Un SSD no es un buen soporte para guardar datos en un cajón durante años.** Para eso, mejor un disco duro o varias copias (apartado 12).

---

## 5. Interfaces y protocolos

La **interfaz** es la conexión física y eléctrica entre el disco y la placa base. El **protocolo** es el "idioma" con el que se comunican. En los SSD es importante distinguirlos, porque la misma ranura M.2 puede usar dos protocolos distintos.

### 5.1 IDE / PATA (historia)

**IDE** (*Integrated Drive Electronics*), también llamado **ATA** o **PATA** (*Parallel ATA*), fue la interfaz de los discos y lectores de CD/DVD desde finales de los 80 hasta mediados de los 2000.

- Cable plano **de 40 contactos** (con 40 u 80 hilos en las versiones rápidas), y conector de alimentación **Molex** de 4 pines.
- Transferencia **en paralelo**, hasta **133 MB/s** (UDMA/133).
- **Dos dispositivos por cable**, que había que configurar con *jumpers* como **maestro** (*master*) y **esclavo** (*slave*).

Ya no se usa. Si te llega un equipo antiguo con IDE, la forma más fácil de recuperar sus datos es un **adaptador IDE a USB**.

### 5.2 SATA

**SATA** (*Serial ATA*) sustituyó a IDE en 2003. Sigue siendo la interfaz de los discos duros y de los SSD de 2,5".

- Transmisión **en serie**: menos hilos, más velocidad y cables más finos.
- **Un dispositivo por cable** y por puerto: no hay maestro ni esclavo.
- **Conector de datos de 7 contactos**, cable de hasta 1 m.
- **Conector de alimentación de 15 contactos** (3,3 V, 5 V y 12 V), más ancho que el de datos.
- Admite **conexión en caliente** (*hot-plug*) si el modo de la controladora es AHCI.
- Usa el protocolo **AHCI**, pensado para discos duros: **una única cola de 32 órdenes**.

| Versión | Año | Velocidad de la línea | Velocidad útil máxima |
|---|---|---|---|
| SATA I (1.0) | 2003 | 1,5 Gb/s | 150 MB/s |
| SATA II (2.0) | 2004 | 3 Gb/s | 300 MB/s |
| **SATA III (3.x)** | 2009 | **6 Gb/s** | **600 MB/s** (≈ 550 MB/s reales) |

> **¿Por qué 6 Gb/s son solo 600 MB/s?** SATA usa la codificación **8b/10b**: para enviar 8 bits de datos transmite 10. Así que 6 Gb/s ÷ 10 = 600 MB/s.

Todas las versiones son **compatibles entre sí**: un disco SATA III funciona en un puerto SATA II, pero a la velocidad de SATA II. No hubo SATA IV: para ir más rápido se pasó a PCIe.

Las placas actuales tienen entre **4 y 6 puertos SATA**, y algunas de gama baja, solo 2. Además del conector interno existió **eSATA** (SATA externo), que ha desaparecido en favor de USB.

### 5.3 SCSI y SAS (servidores)

- **SCSI** (*Small Computer System Interface*): interfaz paralela de servidores y estaciones de trabajo de los años 80 y 90. Permitía muchos dispositivos en el mismo bus y necesitaba una tarjeta controladora. Hoy es historia.
- **SAS** (*Serial Attached SCSI*): su sucesora en serie. Es la interfaz de los discos de **servidor**.
  - Más rápida y fiable que SATA, con **doble puerto** (el disco se puede conectar a dos controladoras a la vez por redundancia).
  - Conexión en caliente.
  - Velocidades: **SAS-3 12 Gb/s** y **SAS-4 24 Gb/s** ("24G").
  - **Una controladora SAS admite discos SATA**, pero **un disco SAS no funciona en un puerto SATA**. El conector SAS tiene un puente que lo impide.

### 5.4 PCI Express y NVMe

Los SSD son tan rápidos que SATA se les quedó pequeña. La solución fue conectarlos **directamente al bus PCI Express**, el mismo de las tarjetas gráficas.

**NVMe** (*Non-Volatile Memory Express*) es el **protocolo** diseñado para SSD sobre PCIe:

| | AHCI (SATA) | NVMe (PCIe) |
|---|---|---|
| Pensado para | Discos duros | Memoria flash |
| Colas de órdenes | 1 cola de 32 órdenes | Hasta 65 535 colas de 65 536 órdenes |
| Latencia | Mayor | Mucho menor |
| Conexión | Controladora SATA del chipset | Carriles PCIe, a menudo directos al procesador |

Un SSD NVMe usa normalmente **4 carriles PCIe** (**x4**). Su velocidad máxima depende de la **generación de PCIe**:

| Generación PCIe | Por carril | x4 (teórico) | SSD reales (lectura secuencial) |
|---|---|---|---|
| PCIe 3.0 | ≈ 1 GB/s | ≈ 3,9 GB/s | hasta ≈ 3500 MB/s |
| PCIe 4.0 | ≈ 2 GB/s | ≈ 7,9 GB/s | hasta ≈ 7400 MB/s |
| **PCIe 5.0** | ≈ 4 GB/s | ≈ 15,8 GB/s | hasta ≈ **14 900 MB/s** |
| PCIe 6.0 | ≈ 8 GB/s | ≈ 31,5 GB/s | De momento, solo en servidores |

En 2026, los SSD PCIe 5.0 más rápidos (WD_BLACK SN8100, Samsung 9100 Pro, Crucial T705…) rozan los **15 GB/s** de lectura, lo que prácticamente llena la interfaz.

Las generaciones son **compatibles**: un SSD PCIe 5.0 funciona en una ranura PCIe 4.0 o 3.0, pero a la velocidad de la ranura.

### 5.5 Comparativa de interfaces

| Interfaz | Velocidad máxima útil | Dónde se usa hoy |
|---|---|---|
| IDE/PATA | 133 MB/s | Equipos muy antiguos |
| SATA III | 600 MB/s | HDD, SSD de 2,5", lectores ópticos |
| SAS-4 | ≈ 2,4 GB/s | Discos de servidor |
| PCIe 3.0 x4 (NVMe) | ≈ 3,9 GB/s | SSD M.2 de gama baja y equipos de 2016–2020 |
| PCIe 4.0 x4 (NVMe) | ≈ 7,9 GB/s | SSD M.2 más vendidos en 2026 |
| PCIe 5.0 x4 (NVMe) | ≈ 15,8 GB/s | SSD M.2 de gama alta |

> **Velocidad de la interfaz ≠ velocidad del disco.** Un disco duro SATA III no pasa de 270 MB/s aunque la interfaz admita 600 MB/s. La velocidad real es siempre **la menor** de las dos.

### 5.6 Formatos de servidor: U.2, U.3 y EDSFF

En servidores, los SSD NVMe no suelen ser M.2 (se calientan y no se pueden cambiar en caliente). Se usan:

- **U.2 / U.3:** SSD NVMe con forma de disco de 2,5" y conexión en caliente desde el frontal del servidor.
- **EDSFF** (E1.S, E3.S…): formatos alargados, pensados para meter muchos SSD en poco espacio y refrigerarlos bien. Ya hay SSD de empresa de más de 120 TB.

---

## 6. Formatos de SSD y la ranura M.2

### 6.1 Formatos de SSD

| Formato | Interfaz | Comentario |
|---|---|---|
| **2,5"** | SATA | Mismo tamaño que un disco de portátil (7 mm de alto). Ideal para **actualizar equipos antiguos**. |
| **M.2** | SATA o PCIe/NVMe | El formato estándar actual en sobremesa y portátiles. |
| **mSATA** | SATA | Tarjeta pequeña de portátiles de 2010–2015. Obsoleta. |
| **Tarjeta PCIe** (AIC) | PCIe/NVMe | Se pincha en una ranura PCIe como una tarjeta de expansión. Poco habitual fuera de servidores. |
| **Soldado a la placa** | PCIe/NVMe | Algunos portátiles ultrafinos (como los Mac). **No se puede ampliar ni cambiar.** |

### 6.2 M.2: un formato, no una interfaz

**M.2** es un **formato físico** de tarjeta, no una interfaz. Una ranura M.2 puede llevar señales **SATA**, **PCIe** o las dos. Por eso **no basta con que el SSD "quepa"**: hay que comprobar qué admite la ranura.

**Tamaños.** El nombre indica el ancho y el largo en milímetros:

| Tamaño | Ancho × largo | Uso |
|---|---|---|
| 2230 | 22 × 30 mm | Consolas portátiles (Steam Deck, ROG Ally), algunos ultraportátiles |
| 2242 | 22 × 42 mm | Portátiles compactos |
| 2260 | 22 × 60 mm | Poco habitual |
| **2280** | 22 × 80 mm | **El estándar** en sobremesa y portátiles |
| 22110 | 22 × 110 mm | Servidores |

Las placas base tienen varios **tornillos o pestañas de sujeción** en distintas posiciones para admitir varios largos.

### 6.3 Las llaves (muescas) de M.2

El conector de la tarjeta tiene uno o dos cortes, llamados **llaves** (*keys*), que deben coincidir con la ranura:

```
  Llave M (PCIe x4)      Llave B+M (casi siempre SATA)
 ┌────────────────────┐  ┌────────────────────┐
 │                    │  │                    │
 │       SSD          │  │       SSD          │
 │                    │  │                    │
 └┬┬┬┬┬┬┬┬┬┬┬┬┬┬┬ ┬┬┬┬┘  └┬┬┬┬┬ ┬┬┬┬┬┬┬┬┬ ┬┬┬┬┘
                ▲               ▲         ▲
             1 muesca        muesca B   muesca M
```

| Llave | Señales | Ejemplo |
|---|---|---|
| **M** (una muesca, a la derecha) | PCIe x4 (y SATA en algunas ranuras) | SSD NVMe |
| **B+M** (dos muescas) | SATA o PCIe x2 | **La mayoría de SSD M.2 SATA** |
| **B** (una muesca, a la izquierda) | SATA, PCIe x2, USB | Módems 4G/5G |
| **A / E** | PCIe x1, USB | Tarjetas wifi y Bluetooth |

**Regla práctica:**

- **Una sola muesca (llave M)** → casi seguro un SSD **NVMe**.
- **Dos muescas (llave B+M)** → casi siempre un SSD **SATA**. Cabe en una ranura M, pero **solo funcionará si esa ranura admite SATA**.

> **Error típico:** comprar un SSD M.2 SATA para una ranura M.2 que solo admite PCIe (pasa en muchas placas AMD actuales y en portátiles). El SSD encaja pero **no aparece**. Mira siempre el manual de la placa: indicará "M.2 (PCIe 4.0 x4)" o "M.2 (SATA/PCIe)".

### 6.4 Las ranuras M.2 de la placa base

- Las placas actuales tienen de **1 a 5 ranuras M.2**.
- La primera suele estar conectada **directamente al procesador** (más rápida, a menudo PCIe 5.0); las demás, al **chipset**.
- **Carriles compartidos:** en muchas placas, usar una ranura M.2 **desactiva** algunos puertos SATA o reduce la velocidad de una ranura PCIe. El manual lo indica en una tabla. Si "desaparece" un disco SATA al montar un SSD M.2, este suele ser el motivo.
- Muchas placas traen **disipadores** para las ranuras M.2. Si el disipador lleva una almohadilla térmica, hay que **quitarle el plástico protector** antes de montarlo.

### 6.5 Adaptadores

- **Adaptador M.2 a PCIe:** permite instalar un SSD NVMe en una ranura PCIe x4 o x16 si la placa no tiene ranura M.2 (o no tiene más libres). En placas muy antiguas, puede que la BIOS no permita arrancar desde él.
- **Tarjetas con varias ranuras M.2:** solo funcionan si la placa admite **bifurcación** de la ranura x16 (dividirla en 4 × x4).
- **Carcasa M.2 a USB:** convierte un SSD M.2 en un SSD externo. Muy útil para reutilizar el SSD antiguo al ampliar un portátil.

---

## 7. HDD frente a SSD

| | HDD | SSD SATA | SSD NVMe PCIe 4.0 |
|---|---|---|---|
| Tecnología | Magnética, mecánica | Flash NAND | Flash NAND |
| Lectura secuencial | 150–280 MB/s | ≈ 550 MB/s | ≈ 5000–7400 MB/s |
| Acceso aleatorio (latencia) | ≈ 10–15 ms | ≈ 0,1 ms | ≈ 0,05 ms |
| IOPS (aleatorio 4K) | 100–200 | ≈ 90 000 | 500 000–1 000 000+ |
| Capacidad habitual | 2–24 TB | 500 GB–4 TB | 500 GB–4 TB (hasta 8 TB) |
| Precio por TB | **El más bajo** | Medio | Medio-alto |
| Ruido | Sí | No | No |
| Golpes | Muy sensible funcionando | Muy resistente | Muy resistente |
| Consumo | 5–10 W (3,5") | 2–4 W | 3–8 W (más en PCIe 5.0) |
| Formatos | 3,5" y 2,5" | 2,5" y M.2 | M.2 |
| Desgaste | Mecánico | Ciclos de escritura | Ciclos de escritura |
| Recuperación de datos tras un fallo | A veces posible (en laboratorio) | Muy difícil | Muy difícil |

**¿Cuándo usar cada uno?**

- **Sistema operativo y programas → siempre SSD**, preferiblemente NVMe. Es la mejora que **más se nota** en un equipo: arranque en segundos y programas que se abren al instante.
- **Datos que se usan a menudo y juegos → SSD.**
- **Mucha capacidad a bajo precio** (fotos, vídeos, copias de seguridad, NAS, vigilancia) → **HDD**.
- **Equipo antiguo lento** → cambiar el disco duro por un **SSD SATA de 2,5"**. Es la reparación más agradecida del taller.

> ¿Notarás la diferencia entre un SSD SATA y uno NVMe? En arranque y uso normal, poca. Entre un HDD y cualquier SSD, **muchísima**. Entre un NVMe PCIe 4.0 y uno 5.0, en un uso normal, casi ninguna: solo se nota al copiar archivos muy grandes.

---

## 8. Estructura lógica: particiones, MBR y GPT

Un disco nuevo es solo una lista de sectores vacíos. Para que el sistema operativo pueda guardar archivos hay que:

1. **Inicializarlo** con un **esquema de particiones** (MBR o GPT).
2. Crear una o varias **particiones**.
3. **Formatear** cada partición con un **sistema de archivos** (apartado 9).

### 8.1 Particiones

Una **partición** es una parte del disco que el sistema operativo trata como una unidad independiente. En Windows, cada partición con sistema de archivos recibe una **letra** (C:, D:…); en Linux, se **monta** en una carpeta.

Usos habituales:

- Separar el **sistema** de los **datos**, para poder reinstalar el sistema sin perder los documentos.
- Tener **varios sistemas operativos** (*dual boot*): cada uno necesita su partición.
- Las particiones **técnicas** que crea el propio sistema: arranque (EFI), recuperación, etc.
- Espacio de intercambio (*swap*) en Linux. Hoy las distribuciones suelen usar un **archivo** de intercambio en lugar de una partición.

El espacio que no pertenece a ninguna partición se llama **espacio sin asignar**.

### 8.2 MBR (Master Boot Record)

Esquema de particiones de los PC desde 1983.

- Ocupa el **primer sector del disco** (LBA 0, que en CHS era cilindro 0, cabeza 0, sector 1).
- Contiene un pequeño **programa de arranque** y la **tabla de particiones**, con sitio solo para **4 entradas**.
- Por eso admite como máximo **4 particiones primarias**, o **3 primarias y 1 extendida**. Dentro de la extendida se pueden crear varias **unidades lógicas**.
- Usa números de 32 bits para los sectores: con sectores de 512 bytes, solo puede gestionar **2 TiB**. El espacio que pase de ahí queda inutilizable.
- Si el primer sector se daña, se pierde la tabla de particiones: **no hay copia**.

### 8.3 GPT (GUID Partition Table)

Esquema moderno, parte de la especificación **UEFI**.

- Admite hasta **128 particiones** en Windows (todas "primarias": no hay extendidas ni lógicas).
- Usa números de 64 bits: el límite teórico es de unos **9,4 ZB** (miles de millones de TB). En la práctica, ilimitado.
- Guarda una **copia de la tabla al final del disco** y comprueba su integridad con un código CRC. Si la principal se daña, se recupera de la copia.
- Cada partición tiene un identificador único (**GUID**) y un nombre.
- En el primer sector guarda un **MBR protector**, para que las herramientas antiguas vean el disco "ocupado" y no lo borren por error.

### 8.4 Comparativa

| | MBR | GPT |
|---|---|---|
| Año | 1983 | Finales de los 90 (con EFI) |
| Particiones | 4 primarias (o 3 + extendida con lógicas) | 128 en Windows |
| Tamaño máximo de disco | 2 TiB | ≈ 9,4 ZB |
| Copia de seguridad de la tabla | No | Sí, al final del disco |
| Arranque | BIOS heredada (y UEFI en modo CSM) | **UEFI** |
| Windows 11 | Solo como disco de datos | **Obligatorio para arrancar** (Windows 11 exige UEFI) |

**Hoy:** todos los discos nuevos se inicializan como **GPT**. MBR solo tiene sentido en memorias USB y tarjetas pequeñas (por compatibilidad con cámaras, televisores, etc.) o en equipos muy antiguos.

### 8.5 Las particiones de una instalación de Windows

Al instalar Windows 11 en un disco vacío, el instalador crea:

| Partición | Tamaño aprox. | Sistema de archivos | Función |
|---|---|---|---|
| **Sistema EFI (ESP)** | 100–260 MB | FAT32 | Cargadores de arranque. La lee la UEFI. |
| **Reservada de Microsoft (MSR)** | 16 MB | — | Uso interno de Windows. No se ve. |
| **Windows (C:)** | El resto | NTFS | Sistema, programas y datos. |
| **Recuperación** | 600 MB–1 GB | NTFS | Entorno de recuperación de Windows (WinRE). |

En Linux suele haber una partición **EFI** (que se puede compartir con Windows) y una partición **raíz** (`/`) con ext4 o Btrfs.

### 8.6 Convertir entre MBR y GPT

- **Disco de datos:** se puede convertir con la Administración de discos o `diskpart`, pero **hay que borrar todas las particiones antes** (se pierden los datos).
- **Disco del sistema Windows:** la herramienta **`mbr2gpt`** lo convierte **sin borrar los datos**. Después hay que cambiar la UEFI de modo heredado (CSM) a modo UEFI.

```
mbr2gpt /validate /allowFullOS
mbr2gpt /convert /allowFullOS
```

> Haz siempre una copia de seguridad antes de tocar las particiones de un disco con datos.

---

## 9. Sistemas de archivos y formateo

### 9.1 Qué es un sistema de archivos

El **sistema de archivos** organiza los datos dentro de una partición: dónde empieza y acaba cada archivo, cómo se llaman, en qué carpeta están, sus permisos, fechas, etc.

Divide la partición en **clústeres** (unidades de asignación), normalmente de **4 KB**. Un archivo ocupa siempre un número entero de clústeres: un archivo de 1 byte ocupa 4 KB en disco. Por eso Windows muestra "Tamaño" y "Tamaño en disco".

### 9.2 Sistemas de archivos habituales

| Sistema | Sistema operativo | Tamaño máximo de archivo | Uso típico |
|---|---|---|---|
| **FAT32** | Todos | **4 GB** | Partición EFI, memorias USB pequeñas, dispositivos antiguos |
| **exFAT** | Windows, macOS, Linux | Prácticamente ilimitado | **Memorias USB, tarjetas SD de más de 32 GB, discos externos para varios sistemas** |
| **NTFS** | Windows (Linux lee y escribe; macOS solo lee) | Prácticamente ilimitado | **Discos internos de Windows**. Permisos, registro de cambios (*journaling*), compresión, cifrado (BitLocker). |
| **ReFS** | Windows Server y Windows Pro para estaciones de trabajo | Prácticamente ilimitado | Servidores y grandes volúmenes de datos |
| **ext4** | Linux | 16 TB | Sistema por defecto de muchas distribuciones |
| **Btrfs / XFS** | Linux | Muy grande | Btrfs: instantáneas y compresión. XFS: grandes volúmenes. |
| **APFS** | macOS, iOS | Muy grande | Discos de Mac |

> **El caso típico del taller:** "No puedo copiar una película de 6 GB al pendrive aunque tiene 32 GB libres". El pendrive está en **FAT32**, que no admite archivos de más de 4 GB. Solución: formatearlo en **exFAT** (o NTFS si solo se usa en Windows).

### 9.3 Formatear

**Formatear** es crear un sistema de archivos vacío en una partición. Hay dos tipos en Windows:

- **Formato rápido:** solo crea la estructura vacía. Tarda segundos. Los datos antiguos siguen físicamente en el disco hasta que se sobrescriben (en un HDD; en un SSD, TRIM los borra enseguida).
- **Formato completo:** además, **escribe ceros** en toda la partición y comprueba si hay sectores defectuosos. En un HDD grande puede tardar horas. **No tiene sentido en un SSD**: lo desgasta sin aportar nada.

El **formato de bajo nivel** (crear las pistas y sectores físicos) solo lo hace el fabricante. Los programas que dicen hacer "formato de bajo nivel" en realidad escriben ceros en todo el disco.

### 9.4 Volúmenes dinámicos y Espacios de almacenamiento

Windows permite unir varios discos en un solo volumen (**Espacios de almacenamiento**, *Storage Spaces*), con o sin redundancia, de forma parecida a un RAID. Los antiguos **discos dinámicos** de la Administración de discos están obsoletos.

---

## 10. Almacenamiento externo y extraíble

### 10.1 La conexión: USB y Thunderbolt

La velocidad de un dispositivo externo depende tanto del dispositivo como del **puerto y el cable**.

| Versión | Nombre comercial actual | Velocidad de la línea | Velocidad real aprox. |
|---|---|---|---|
| USB 2.0 | USB Hi-Speed | 480 Mb/s | ≈ 35–40 MB/s |
| USB 3.2 Gen 1 (antes USB 3.0) | **USB 5 Gbps** | 5 Gb/s | ≈ 400–450 MB/s |
| USB 3.2 Gen 2 | **USB 10 Gbps** | 10 Gb/s | ≈ 900–1000 MB/s |
| USB 3.2 Gen 2x2 | USB 20 Gbps | 20 Gb/s | ≈ 2000 MB/s |
| USB4 / Thunderbolt 3–4 | USB 40 Gbps | 40 Gb/s | ≈ 3000–3800 MB/s |
| USB4 v2 / Thunderbolt 5 | USB 80 Gbps | 80 Gb/s | ≈ 6000+ MB/s |

> Un SSD externo de 2000 MB/s conectado a un puerto USB 2.0 irá a 40 MB/s. Comprueba siempre el puerto (los USB 2.0 suelen ser **negros**; los 5 Gbps, **azules**) y usa el cable que trae el dispositivo.

Para desconectar un dispositivo USB, usa **Quitar hardware de forma segura** (o expúlsalo desde el explorador). Si se desconecta mientras escribe, se pueden corromper los datos, sobre todo en FAT32 y exFAT.

### 10.2 Discos externos

- **HDD externo de 2,5":** se alimenta por el propio USB. Barato y con mucha capacidad (1–5 TB). Ideal para copias de seguridad. Muchos son SMR.
- **HDD externo de 3,5"** (de sobremesa): necesita **alimentador propio**. Hasta 20–24 TB.
- **SSD externo (portátil):** pequeño, resistente y rápido (500–2000 MB/s según el USB).
- **Carcasas (cajas externas):** convierten un disco interno en externo. Las hay para 2,5", 3,5" y M.2 (SATA, NVMe o ambos). Tienen un chip **puente** que traduce de SATA o NVMe a USB.
- **Docks:** bases donde se inserta un disco sin carcasa. Muy útiles en el taller para leer discos de equipos averiados o clonarlos.

### 10.3 Memorias USB (pendrives)

Memoria flash con una controladora y un conector USB. Son baratas y cómodas, pero:

- Las baratas usan memoria de **baja calidad** y controladoras simples: **escriben muy despacio** (a veces 10–20 MB/s aunque sean USB 3).
- No están pensadas para guardar datos importantes durante años ni para usarse como único soporte.
- **Cuidado con las falsificaciones:** memorias que dicen tener 1 o 2 TB pero tienen 8 o 16 GB. Al llenarse, los datos se corrompen. Se pueden comprobar con **H2testw** (Windows) o **f3** (Linux).

### 10.4 Tarjetas de memoria

Las tarjetas flash se usan en cámaras, drones, móviles, consolas portátiles y equipos pequeños (Raspberry Pi).

**La familia SD** (*Secure Digital*) es el estándar actual. Hay tres tamaños: **SD**, **miniSD** (obsoleta) y **microSD**. Una microSD se puede usar en una ranura SD con un adaptador.

Según la capacidad:

| Tipo | Capacidad | Sistema de archivos |
|---|---|---|
| SD | Hasta 2 GB | FAT16 |
| **SDHC** (*High Capacity*) | 4–32 GB | FAT32 |
| **SDXC** (*eXtended Capacity*) | 64 GB–2 TB | exFAT |
| SDUC (*Ultra Capacity*) | Hasta 128 TB | exFAT |

> Un dispositivo antiguo que solo admite SDHC **no lee** una tarjeta SDXC, aunque quepa físicamente.

**Velocidad.** En la tarjeta aparecen varios símbolos:

| Símbolo | Qué indica | Valores |
|---|---|---|
| **Clase** (C dentro de un círculo) | Escritura mínima continua | Class 2, 4, 6, **10** (= 10 MB/s) |
| **Clase UHS** (U dentro de una U) | Escritura mínima continua | **U1** (10 MB/s), **U3** (30 MB/s) |
| **Clase de vídeo** (V) | Escritura mínima continua para grabar vídeo | V6, V10, V30, V60, **V90** (= 90 MB/s) |
| **Clase de aplicación** (A) | Rendimiento al ejecutar aplicaciones (IOPS) | **A1**, **A2**. Importante en móviles y Raspberry Pi. |
| **Bus** (números romanos) | Velocidad máxima de la interfaz | **UHS-I** (104 MB/s), **UHS-II** (312 MB/s), UHS-III (624 MB/s), **SD Express** (985 MB/s o más, usa PCIe/NVMe) |

**¿Qué tarjeta elegir?**

- Fotos y vídeo Full HD: **U3 / V30**.
- Vídeo 4K/8K a alta calidad o ráfagas de fotos: **V60 / V90 con UHS-II**.
- Móvil, Raspberry Pi, Steam Deck: **A2**.
- Nintendo Switch 2: exige **microSD Express**.

Las cámaras profesionales usan **CFexpress** (tipo A o tipo B), que también funciona sobre PCIe/NVMe y supera los 1500 MB/s.

**Formatos antiguos** que puedes encontrar en el taller: **CompactFlash** (cámaras réflex hasta 2015, aún en algunas profesionales), **Memory Stick** (Sony), **SmartMedia** y **xD-Picture Card** (Olympus, Fujifilm). Todos están obsoletos.

### 10.5 Almacenamiento soldado: eMMC y UFS

Los móviles, las tabletas, las consolas y los portátiles muy baratos no llevan un SSD, sino un **chip de memoria flash soldado** a la placa:

- **eMMC:** lento (hasta ≈ 300 MB/s) y barato. Típico de portátiles y Chromebooks de gama baja con 64–128 GB.
- **UFS:** mucho más rápido (UFS 4.0 supera los 4000 MB/s). Es el de los móviles de gama media y alta.

No se puede ampliar ni sustituir. Si un portátil tiene eMMC, **no se puede cambiar por un SSD**: hay que añadir almacenamiento por USB o tarjeta.

---

## 11. Almacenamiento óptico: CD, DVD y Blu-ray

Hoy casi ningún ordenador nuevo lleva lector óptico, pero en el taller seguirás encontrando discos y unidades, y los formatos siguen vivos en consolas, cine en casa y archivo.

### 11.1 Cómo funciona

- El disco es de **policarbonato**, de **12 cm de diámetro y 1,2 mm de grosor**.
- Los datos se graban en una **espiral** que empieza en el centro y va hacia fuera (al revés que en un disco de vinilo).
- En los discos fabricados (prensados), la espiral está formada por **hoyos** (*pits*) y **llanos** (*lands*). Una capa de **aluminio** refleja la luz.
- Un **láser** ilumina la espiral y un **fotodetector** mide la luz reflejada. Los **cambios** entre hoyo y llano se interpretan como unos; la ausencia de cambio, como ceros.
- Cuanto **más corta es la longitud de onda del láser**, más pequeño es el punto de luz, más pequeños pueden ser los hoyos y **más datos caben**.

**Fabricación de un disco prensado:**

1. Se graba un **disco maestro** de cristal con un láser de alta potencia.
2. Se hace un **molde metálico** (negativo) a partir del maestro.
3. Se **inyecta policarbonato** fundido en el molde: los hoyos quedan marcados.
4. Se aplica la capa **reflectante** de aluminio, una **laca protectora** y se serigrafía la etiqueta.

**Discos grabables:** en lugar de hoyos llevan una capa de **tinte orgánico** (en los R) o de una **aleación de cambio de fase** (en los RW), que el láser de la grabadora modifica para que refleje distinto.

### 11.2 CD (Compact Disc)

- Apareció en **1982** para música (CD-DA) y en **1985** para datos (CD-ROM).
- Láser **infrarrojo** de **780 nm**.
- Capacidad: **650 o 700 MB** (74 u 80 minutos de audio).
- Velocidad: **1x = 150 KB/s** (la de un CD de audio). Un lector de **52x** llega a unos 7800 KB/s en el borde exterior del disco.

| Formato | Qué es |
|---|---|
| CD-DA | Audio |
| CD-ROM | Datos, solo lectura (prensado) |
| CD-R | Grabable una vez. Admite **multisesión** (añadir datos en varias grabaciones). |
| CD-RW | Regrabable, unas 1000 veces |

### 11.3 DVD (Digital Versatile Disc)

- Apareció en **1996–1997**. Se llamó *Digital Video Disc*, pero pasó a *Versatile* al usarse también para datos.
- Láser **rojo** de **650 nm**: hoyos más pequeños y pistas más juntas que el CD.
- Puede tener **dos capas** por cara (una semitransparente) y **dos caras**.

| Tipo | Caras/capas | Capacidad |
|---|---|---|
| DVD-5 | 1 cara, 1 capa | **4,7 GB** |
| DVD-9 | 1 cara, 2 capas (DL) | **8,5 GB** |
| DVD-10 | 2 caras, 1 capa | 9,4 GB |
| DVD-18 | 2 caras, 2 capas | 17 GB |

- Velocidad: **1x = 1385 KB/s** (unas 9 veces la del CD). Las unidades llegan a **16x–24x**.
- Formatos: DVD-ROM, DVD-Vídeo, **DVD-R / DVD+R** (grabables una vez; dos estándares rivales que hoy cualquier grabadora admite, por eso se escribe **DVD±R**), **DVD±R DL** (doble capa), **DVD±RW** (regrabables), DVD-RAM (regrabable, con acceso como un disco).

### 11.4 Blu-ray (BD)

- Apareció en **2006** y ganó la "guerra de formatos" al HD DVD de Toshiba, en parte gracias a que la **PlayStation 3** lo incluía.
- Láser **azul-violeta** de **405 nm**, y la capa de datos está a solo 0,1 mm de la superficie: por eso caben muchos más datos.
- Lleva una capa dura para protegerlo de arañazos.

| Tipo | Capas | Capacidad |
|---|---|---|
| BD | 1 | **25 GB** |
| BD DL | 2 | **50 GB** |
| BDXL | 3 o 4 | 100 o 128 GB |
| Ultra HD Blu-ray (películas 4K) | 2 o 3 | 50, 66 o 100 GB |

- Velocidad: **1x = 36 Mb/s (4,5 MB/s)**. Las grabadoras llegan a **16x**.
- Formatos: **BD-ROM** (películas, juegos), **BD-R** (grabable una vez), **BD-RE** (regrabable).
- Las unidades Blu-ray **leen también DVD y CD** (llevan los tres láseres).

### 11.5 Comparativa

| | CD | DVD | Blu-ray |
|---|---|---|---|
| Año | 1982 | 1996 | 2006 |
| Láser | Infrarrojo, 780 nm | Rojo, 650 nm | Azul-violeta, 405 nm |
| Capacidad por capa | 700 MB | 4,7 GB | 25 GB |
| Capacidad máxima habitual | 700 MB | 8,5 GB (1 cara) | 50 GB (100–128 GB BDXL) |
| Velocidad 1x | 150 KB/s | 1385 KB/s | 4,5 MB/s |

### 11.6 La unidad lectora/grabadora

**Partes:** el **cabezal** (láser, lente y fotodetector), el **actuador** que lo mueve a lo largo del radio del disco, el **motor de giro** y el **mecanismo de carga** (bandeja o ranura).

**Frontal:** bandeja, botón de expulsión, indicador de actividad y un **orificio de expulsión de emergencia** (se introduce un clip para abrir la bandeja con el equipo apagado).

**Trasera:** conector de alimentación y de datos **SATA** (en las antiguas, IDE, *jumpers* maestro/esclavo y salida de audio analógica).

**Formatos:** 5,25" para sobremesa, *slim* (12,7 o 9,5 mm) para portátiles, y **externas por USB**, que es como se compran hoy casi siempre.

### 11.7 Situación actual

- Los ordenadores, portátiles e incluso algunas consolas ya **no llevan unidad óptica**: el software se descarga y las películas se ven en *streaming*.
- **Sony dejó de fabricar discos Blu-ray grabables en febrero de 2025**, sin sucesor. Otros fabricantes, como Panasonic y Verbatim, siguen haciéndolo.
- Sigue usándose para **películas en 4K** (máxima calidad), **juegos de consola**, distribución de música y **archivo a largo plazo**: un disco bien guardado dura décadas, y existen discos de archivo especiales (como M-DISC) pensados para durar mucho más.
- En el taller, una **grabadora externa USB** sirve para cualquier equipo que la necesite.

---

## 12. Almacenamiento en red, en la nube y copias de seguridad

### 12.1 NAS

Un **NAS** (*Network Attached Storage*) es un pequeño ordenador con varios discos que comparte carpetas en la red local (por SMB/CIFS en Windows, NFS en Linux). Además puede hacer copias de seguridad automáticas, servir multimedia, alojar fotos, etc.

- Marcas conocidas: Synology, QNAP, UGREEN, Asustor. También se puede montar uno con un PC y software libre (TrueNAS, OpenMediaVault, Unraid).
- Usa discos de gama **NAS** (CMR, 24/7) y, normalmente, **RAID**.

### 12.2 SAN

Una **SAN** (*Storage Area Network*) es una red dedicada que ofrece a los servidores **discos virtuales** (por iSCSI o Fibre Channel) como si fueran discos locales. Se usa en centros de datos y empresas grandes.

### 12.3 RAID (introducción)

**RAID** combina varios discos para ganar velocidad, seguridad o las dos cosas.

| Nivel | Discos mínimos | Cómo funciona | Si falla un disco |
|---|---|---|---|
| **RAID 0** | 2 | Reparte los datos entre los discos (*striping*). Más velocidad y capacidad. | **Se pierde todo.** |
| **RAID 1** | 2 | Copia idéntica en los dos discos (espejo). | Sigue funcionando. |
| **RAID 5** | 3 | Reparte datos y paridad. Se pierde la capacidad de un disco. | Sigue funcionando. |
| **RAID 10** | 4 | Espejo + reparto. | Sigue funcionando (según qué discos fallen, aguanta hasta dos). |

> **RAID no es una copia de seguridad.** Protege contra el fallo de un disco, pero no contra un borrado accidental, un virus, un ransomware o un incendio: todo eso afecta a todos los discos a la vez.

### 12.4 Almacenamiento en la nube

Los datos se guardan en los servidores de un proveedor y se accede a ellos por Internet: Google Drive, OneDrive, iCloud, Dropbox… y, para empresas, servicios como Amazon S3 o Azure.

- **Ventajas:** acceso desde cualquier sitio, copia fuera de casa, sincronización entre dispositivos.
- **Inconvenientes:** depende de Internet, tiene coste mensual, y hay que tener en cuenta la **privacidad** y dónde se guardan los datos (RGPD).
- **Sincronizar no es hacer una copia de seguridad:** si borras un archivo en el ordenador, se borra también en la nube (aunque suele haber una papelera durante unos días).

### 12.5 Cintas magnéticas

Las cintas **LTO** siguen siendo el soporte **más barato por TB** para archivo a largo plazo en empresas: cada cartucho guarda decenas de TB, dura décadas y, al guardarse desconectado, está a salvo del ransomware.

### 12.6 La regla 3-2-1

La regla básica de las copias de seguridad:

- **3** copias de los datos (el original y dos copias).
- En **2** soportes distintos (por ejemplo, SSD del equipo y disco externo o NAS).
- **1** copia **fuera** del lugar (en la nube o en otro edificio).

Muchos añaden: al menos una copia **desconectada o inmutable** (que no se pueda modificar), para protegerse del ransomware.

---

## 13. La BIOS/UEFI y los discos

### 13.1 Comprobar que se detecta el disco

Después de instalar un disco, lo primero es **entrar en la UEFI** (Supr o F2 al encender) y comprobar que aparece:

- En la pantalla principal o en un apartado **Storage**, **SATA Configuration** o **NVMe Configuration**.
- Debe aparecer el **modelo** y la **capacidad**.

Si no aparece en la UEFI, el problema es físico (conexión, alimentación, ranura no compatible) o de configuración de la placa: el sistema operativo tampoco lo verá.

### 13.2 Modo de la controladora SATA: AHCI, RAID y VMD

- **AHCI:** el modo normal. Es el recomendado.
- **IDE / Compatible:** modo antiguo para sistemas que no tienen controlador AHCI. No se debe usar hoy.
- **RAID / Intel RST / Intel VMD:** permite crear RAID desde la placa. Muchos **portátiles Intel** vienen de fábrica con **VMD** activado.

> **Caso típico:** al instalar Windows en un portátil Intel, el instalador **no muestra ningún disco**. El motivo es que está activo **Intel VMD/RST** y el instalador no tiene su controlador. Solución: cargar el controlador **Intel RST** desde un USB durante la instalación ("Cargar controlador") o desactivar VMD en la UEFI.

> **Cambiar de modo con Windows ya instalado** (por ejemplo, de RAID a AHCI) provoca una **pantalla azul** al arrancar (INACCESSIBLE_BOOT_DEVICE). Hay que preparar Windows antes (arrancando una vez en modo seguro).

### 13.3 Orden de arranque

En el apartado **Boot** se indica en qué orden busca la UEFI un sistema operativo: *Boot Option Priorities* o *Boot Sequence*. En UEFI no aparecen solo los discos, sino las **entradas de arranque** ("Windows Boot Manager", "ubuntu"…).

Para arrancar una sola vez desde otro dispositivo (por ejemplo, un USB de instalación) sin cambiar el orden, se usa el **menú de arranque**: F8, F11 o F12 según el fabricante.

### 13.4 CSM y Secure Boot

- **CSM** (*Compatibility Support Module*): permite arrancar sistemas antiguos en modo BIOS heredado (desde discos MBR). Para Windows 11 debe estar **desactivado** (arranque UEFI puro desde disco GPT).
- **Secure Boot:** solo deja arrancar cargadores firmados. Windows 11 lo exige; la mayoría de distribuciones Linux también funcionan con él.

### 13.5 Otras opciones

- **Hot Plug:** activa la conexión en caliente en cada puerto SATA (útil con bahías extraíbles).
- **Velocidad de las ranuras M.2 / PCIe:** se puede forzar una generación (por ejemplo, Gen4) si un SSD da problemas.
- **Configuración de carriles:** en algunas placas se elige si una ranura M.2 funciona en modo SATA o PCIe, o qué puertos SATA se desactivan.

---

## 14. Compatibilidad y elección del almacenamiento

### 14.1 Lista de comprobación

1. **Formato físico:** ¿hay sitio? Bahía de 3,5", de 2,5" o ranura M.2 del largo adecuado (2280, 2242, 2230…).
2. **Interfaz de la ranura M.2:** ¿admite PCIe/NVMe, SATA o las dos? Lo dice el manual.
3. **Generación PCIe** de la ranura: un SSD PCIe 5.0 en una ranura 4.0 irá a velocidad de 4.0. No tiene sentido pagar de más.
4. **Carriles compartidos:** ¿se desactiva algún puerto SATA o ranura al usar esa M.2?
5. **Puertos SATA y cables:** ¿quedan puertos libres? ¿Hay cable de datos y conector de alimentación SATA en la fuente?
6. **Arranque:** la placa debe poder arrancar desde ese disco (con NVMe, placas anteriores a 2015 a veces no pueden).
7. **Altura y disipador:** en portátiles y consolas, algunos SSD con disipador no caben. En la PS5, el SSD debe tener disipador.
8. **Portátiles:** ¿tiene ranura libre, o el almacenamiento es eMMC o está soldado?

### 14.2 Qué elegir en 2026

| Uso | Recomendación |
|---|---|
| Equipo de oficina o de clase | SSD NVMe PCIe 4.0 de **500 GB–1 TB** |
| Equipo de juegos | SSD NVMe PCIe 4.0 de **1–2 TB** (los juegos ocupan 100–200 GB) |
| Edición de vídeo / estación de trabajo | SSD NVMe de **2–4 TB** para trabajo + HDD o NAS para archivo |
| Ampliar un equipo antiguo sin M.2 | SSD SATA de 2,5" |
| Copias de seguridad domésticas | HDD externo o NAS con discos CMR |
| Servidor de archivos / NAS | Discos de gama NAS (CMR) en RAID + copia externa |

**Qué mirar en la ficha de un SSD**, además de la capacidad y el precio:

- **Interfaz:** PCIe 3.0, 4.0 o 5.0.
- **Tipo de memoria:** TLC mejor que QLC para un disco de sistema.
- **DRAM:** con DRAM, mejor para cargas pesadas; sin DRAM (HMB), suficiente para uso normal.
- **TBW** y años de **garantía** (3 o 5).
- **Análisis independientes:** las velocidades máximas de la ficha no dicen qué pasa cuando se llena la caché SLC.

### 14.3 El mercado del almacenamiento en 2026

Igual que la RAM (lo vimos en los apuntes de memoria), **los SSD han subido mucho de precio** desde finales de 2025. Los fabricantes de memoria flash han dado prioridad a los grandes clientes de **inteligencia artificial** y han limitado la producción para consumo. Algunos SSD de 1 TB que costaban menos de 60 € han llegado a costar unos 150 €, y las previsiones apuntan a que los precios no se normalizarán del todo hasta 2027.

Con los discos duros pasa algo parecido: los fabricantes tienen vendida casi toda la producción de discos de gran capacidad a los centros de datos.

Consecuencias prácticas:

- Hay que **ajustar la capacidad** al uso real y comparar precios en varias tiendas.
- Un SSD **PCIe 4.0** sigue siendo la mejor relación precio/rendimiento: el 5.0 rara vez compensa.
- **Reutilizar** el SSD antiguo en una carcasa USB, o como segundo disco, vuelve a tener sentido.
- **Desconfía de las gangas**: abundan los SSD y pendrives falsificados o con capacidad falsa.

---

## 15. Instalación paso a paso

**Material:** destornillador de estrella, pulsera antiestática (o tocar el chasis), manual de la placa base, cables SATA si hacen falta.

**Antes de empezar:** apaga el equipo, **desenchúfalo**, pulsa el botón de encendido unos segundos y descárgate de electricidad estática. Coge los discos y SSD por los bordes, sin tocar los contactos.

### 15.1 Disco de 3,5" o 2,5" SATA

1. Coloca el disco en una **bahía** de la caja. Sujétalo con sus tornillos o con el sistema sin herramientas de la caja (raíles, bandejas). Un disco de 2,5" en una bahía de 3,5" necesita un **adaptador**.
2. Los discos duros deben quedar **bien fijados**: las vibraciones producen ruido y desgaste.
3. Conecta el **cable de datos SATA** al disco y a un puerto SATA de la placa. Conviene usar los primeros (SATA 0/1) y mirar en el manual si alguno se desactiva con las ranuras M.2. Los conectores SATA tienen forma de "L": solo entran en una posición.
4. Conecta el **cable de alimentación SATA** desde la fuente.
5. Ordena los cables para que no estorben el flujo de aire.

### 15.2 SSD M.2

1. Localiza la ranura en el manual. Para el disco del sistema, usa la **ranura conectada al procesador** (suele ser la más cercana a él, M.2_1).
2. Si la ranura tiene **disipador**, quítalo. Comprueba si su almohadilla térmica tiene **plástico protector** y retíralo.
3. Coloca el **separador** (*standoff*) en la posición del largo del SSD (2280 en casi todos los casos), si no está ya.
4. Inserta el SSD en la ranura **inclinado unos 20–30°**, con la etiqueta hacia arriba, hasta el fondo.
5. **Bájalo** hasta el separador y sujétalo con el **tornillo** o el **cierre rápido**. No aprietes demasiado: la placa del SSD es delicada.
6. Vuelve a colocar el disipador.

> Si el SSD trae una pegatina disipadora de grafeno o cobre, **no la quites**: es parte de la refrigeración y la garantía puede depender de ella.

**En portátiles:** se quita la tapa inferior (hay que buscar tornillos ocultos bajo las gomas y tener cuidado con las pestañas de plástico). Antes de tocar nada, **desconecta la batería** si es interna. Después, el procedimiento es igual que en sobremesa.

### 15.3 Después de montarlo

1. Enciende y entra en la **UEFI**: comprueba que aparece el disco (apartado 13).
2. Si es para instalar un sistema operativo, el instalador se encarga del resto.
3. Si es un **disco de datos**, en Windows abre **Administración de discos** (clic derecho en Inicio o `diskmgmt.msc`):
   1. Aparecerá un aviso para **inicializar el disco**: elige **GPT**.
   2. Clic derecho en el espacio **sin asignar** → **Nuevo volumen simple**.
   3. Elige el tamaño, la **letra** y el **sistema de archivos** (NTFS), y marca **formato rápido**.

> **"He instalado un disco y no aparece en el Explorador"** suele significar que el disco **no está inicializado** o **no tiene particiones**. Ábrelo en Administración de discos.

### 15.4 Clonar el disco antiguo

Para cambiar un HDD por un SSD sin reinstalar, se puede **clonar** el disco: copiar todas las particiones del disco antiguo al nuevo. Herramientas: **Clonezilla** (libre), **Macrium Reflect**, o las del fabricante del SSD (Samsung Data Migration, Acronis True Image para WD/Crucial…). El disco nuevo debe tener **capacidad suficiente para los datos usados**, no necesariamente para el disco completo.

---

## 16. Herramientas de información, diagnóstico y rendimiento

### 16.1 Ver los discos instalados

**Windows:**

| Herramienta | Qué muestra |
|---|---|
| **Administración de discos** (`diskmgmt.msc`) | Discos, particiones, sistemas de archivos, MBR o GPT (en Propiedades → Volúmenes) |
| **Administrador de dispositivos** | Discos y controladoras, y si les falta el controlador |
| **Configuración → Sistema → Almacenamiento → Discos y volúmenes** | Discos, estado, temperatura y vida útil estimada de los SSD |
| **Administrador de tareas → Rendimiento** | Uso del disco en tiempo real, tipo (HDD/SSD) y velocidad |

**`diskpart`** (en una consola como administrador):

```
diskpart
list disk            ← discos, tamaño y si son GPT (*)
select disk 1
detail disk          ← modelo, tipo de bus, particiones
list partition
list volume
```

> `diskpart` también puede **borrar un disco entero** con `clean`. Comprueba **dos veces** qué disco has seleccionado antes de hacerlo.

**PowerShell** (sustituye al antiguo comando `wmic`, que Microsoft ha declarado obsoleto y está retirando de Windows 11):

```powershell
Get-PhysicalDisk | Select FriendlyName, MediaType, BusType, Size, HealthStatus
Get-Disk                           # discos, estilo de partición (MBR/GPT)
Get-Partition
Get-Volume                         # letras, sistema de archivos, espacio libre
Get-PhysicalDisk | Get-StorageReliabilityCounter | Select Temperature, Wear, PowerOnHours
```

**Linux:**

```bash
lsblk -o NAME,SIZE,TYPE,FSTYPE,MOUNTPOINT,MODEL,ROTA   # ROTA=1: HDD; 0: SSD
sudo fdisk -l               # discos y particiones
sudo parted -l              # incluye si es MBR (msdos) o GPT
df -h                       # espacio usado y libre de cada sistema de archivos
```

En Linux, los discos SATA y USB aparecen como `/dev/sda`, `/dev/sdb`… (particiones `sda1`, `sda2`); los NVMe, como `/dev/nvme0n1` (particiones `nvme0n1p1`…); las tarjetas SD y eMMC, como `/dev/mmcblk0`.

Herramientas gráficas: **GParted** y **Discos** (GNOME), que también muestra el estado SMART.

### 16.2 SMART: la salud del disco

**SMART** (*Self-Monitoring, Analysis and Reporting Technology*) es un sistema de autodiagnóstico que llevan todos los HDD y SSD. Registra contadores sobre su estado, y permite **anticipar muchos fallos**.

**Herramientas:**

- **CrystalDiskInfo** (Windows): muestra el estado como **Bueno**, **Precaución** o **Malo**, la temperatura y todos los atributos.
- **smartctl** (Linux y Windows, paquete `smartmontools`): `sudo smartctl -a /dev/sda`.
- **nvme-cli** (Linux): `sudo nvme smart-log /dev/nvme0`.
- Herramientas del fabricante: Samsung Magician, WD Dashboard, Crucial Storage Executive, Seagate SeaTools…

**Atributos más importantes:**

| Atributo | Disco | Qué significa | Cuándo preocuparse |
|---|---|---|---|
| **05 Reallocated Sectors Count** | HDD | Sectores defectuosos sustituidos por otros de reserva | **Si es mayor que 0 y sigue subiendo** |
| **C5 Current Pending Sector** | HDD | Sectores que no se han podido leer y esperan a ser reasignados | **Cualquier valor mayor que 0** |
| **C6 Offline Uncorrectable** | HDD | Sectores que no se pueden corregir | Cualquier valor mayor que 0 |
| **C7 UDMA CRC Error Count** | HDD/SSD SATA | Errores de transmisión por el cable | Si sube: **cambia el cable SATA** (el disco suele estar bien) |
| **09 Power-On Hours** | Todos | Horas de funcionamiento | Informativo |
| **Temperatura** | Todos | Temperatura actual | HDD > 50 °C; SSD NVMe > 70 °C de forma continuada |
| **Percentage Used** / **Wear Leveling Count** | SSD | Desgaste de la memoria flash | Cerca del 100 % (vida útil estimada agotada) |
| **Available Spare** | SSD NVMe | Bloques de reserva que quedan | Por debajo del umbral indicado |
| **Media and Data Integrity Errors** | SSD NVMe | Errores de datos no corregidos | Cualquier valor mayor que 0 |

> SMART **no avisa de todos los fallos**: un disco puede morir de repente por un fallo de la electrónica o de la controladora con todo en "Bueno". Pero si SMART avisa, **hay que hacer una copia de seguridad ya** y cambiar el disco.

### 16.3 Comprobar el sistema de archivos y la superficie

- **`chkdsk`** (Windows): comprueba y repara el sistema de archivos. `chkdsk C: /f` corrige errores; `/r` además busca sectores defectuosos (en un HDD puede tardar horas).
- **`fsck`** (Linux): equivalente, sobre una partición **desmontada**.
- **Pruebas largas del fabricante** (SeaTools, WD Dashboard) o `smartctl -t long /dev/sda`: leen toda la superficie del disco.
- **Victoria** o **HD Tune** (Windows): mapa de la superficie con los tiempos de acceso de cada zona; los bloques lentos o rojos indican problemas.

### 16.4 Medir el rendimiento

- **CrystalDiskMark** (Windows) y **KDiskMark** (Linux, misma interfaz): miden lectura y escritura secuencial (SEQ1M) y aleatoria (RND4K). La fila **RND4K Q1T1** es la que más se parece al uso diario.
- **`fio`** (Linux): herramienta profesional, muy configurable.
- **`hdparm -t /dev/sda`** (Linux): prueba rápida de lectura secuencial.

**Valores de referencia (lectura secuencial):**

| Disco | Resultado esperado |
|---|---|
| HDD 7200 rpm | 150–270 MB/s |
| SSD SATA | 500–560 MB/s |
| SSD NVMe PCIe 3.0 | 2000–3500 MB/s |
| SSD NVMe PCIe 4.0 | 5000–7400 MB/s |
| SSD NVMe PCIe 5.0 | 10 000–14 900 MB/s |

Si un SSD NVMe da mucho menos de lo esperado, comprueba: si está en una ranura de menor generación o con menos carriles, si se está calentando (*throttling*), si está casi lleno, y si el modo de la controladora es el correcto.

---

## 17. Mantenimiento y optimización

### 17.1 Discos duros: desfragmentar

Con el uso, los archivos de un HDD se guardan **fragmentados** en trozos repartidos por el disco, y el cabezal tiene que saltar de un sitio a otro para leerlos. **Desfragmentar** reordena los archivos para que cada uno esté seguido.

Windows lo hace solo una vez a la semana con **Desfragmentar y optimizar unidades** (`dfrgui`). Se puede lanzar a mano:

```
defrag C: /U /V
```

### 17.2 SSD: TRIM, no desfragmentar

**En un SSD no se desfragmenta**: no tiene cabezales, así que da igual dónde estén los datos, y desfragmentar solo lo desgastaría. En los SSD, la misma herramienta de Windows hace otra cosa: **envía TRIM** ("Recortar") para que el SSD sepa qué bloques están libres.

Comprobar que TRIM está activo:

```
fsutil behavior query DisableDeleteNotify
```

Si responde **`DisableDeleteNotify = 0`**, TRIM está **activado** (el 0 significa "no desactivado"). Si respondiera 1, se activaría con `fsutil behavior set DisableDeleteNotify 0`.

En PowerShell, se puede forzar un TRIM manual:

```powershell
Optimize-Volume -DriveLetter C -ReTrim -Verbose
```

En Linux, lo hace el servicio `fstrim.timer` una vez a la semana (`systemctl status fstrim.timer`), o a mano con `sudo fstrim -av`.

### 17.3 Buenas prácticas

- **Deja espacio libre:** al menos un **10–20 %**. Un SSD muy lleno escribe más despacio (tiene menos bloques libres y menos caché SLC), y un HDD lleno se fragmenta más.
- **Actualiza el firmware** de los SSD con la herramienta del fabricante: a veces corrige fallos graves.
- **Vigila la temperatura** de los SSD NVMe: usa el disipador de la placa y cuida el flujo de aire.
- **Revisa SMART** de vez en cuando, sobre todo en equipos y servidores con datos importantes.
- **Haz copias de seguridad.** Ningún mantenimiento sustituye a una copia.

### 17.4 Mitos sobre los SSD

Por internet circulan "trucos" de la época de los primeros SSD (2009–2012) que hoy **no hay que aplicar**:

| Mito | Realidad |
|---|---|
| "Desactiva el servicio Windows Search" | No alarga la vida del SSD de forma apreciable y hace que las búsquedas sean lentísimas. |
| "Desactiva el archivo de paginación" | Puede provocar errores y cierres de programas cuando falta memoria. Déjalo en automático. |
| "Desactiva la hibernación y los puntos de restauración para ahorrar escrituras" | El ahorro es insignificante frente a la durabilidad actual (apartado 4.7). Solo tiene sentido si falta espacio. |
| "Activa TRIM a mano" | Windows lo activa solo desde Windows 7. Basta con comprobarlo. |
| "No llenes nunca un SSD por encima del 50 %" | Basta con dejar un 10–20 % libre. |

---

## 18. Síntomas y averías habituales

| Síntoma | Causas probables | Qué hacer |
|---|---|---|
| El disco **no aparece en la UEFI** | Cable de datos o de alimentación suelto o roto; SSD M.2 SATA en ranura solo PCIe; ranura desactivada por carriles compartidos; SSD mal insertado; disco averiado | Revisar conexiones y cambiar cable/puerto; comprobar el manual de la placa; probar el disco en otro equipo o en un dock USB |
| Aparece en la UEFI, pero **no en el Explorador** | Disco sin inicializar o sin particiones; partición sin letra | Administración de discos: inicializar (GPT), crear volumen, asignar letra |
| El **instalador de Windows no ve el disco** | Intel VMD/RST activado; modo RAID | Cargar el controlador Intel RST o desactivar VMD en la UEFI |
| **"No se encontró ningún sistema operativo"** | Orden de arranque incorrecto; CSM/UEFI cambiado; partición EFI dañada; disco averiado | Revisar el orden de arranque y el modo; reparar el arranque desde el entorno de recuperación (`bootrec`, `bcdboot`) |
| **Ruidos de "clic" repetidos** (*click of death*) o pitidos | Cabezales o motor del HDD averiados | **Apagar enseguida.** Cada intento lo empeora. Si los datos son importantes, laboratorio de recuperación. |
| Equipo **muy lento**, disco al **100 %** en el Administrador de tareas | Sistema en un HDD; disco con sectores defectuosos; SSD QLC casi lleno | Revisar SMART; pasar a SSD; liberar espacio |
| Errores **CRC** en SMART, desconexiones aleatorias | Cable SATA defectuoso o mal conectado | Cambiar el cable |
| SSD NVMe **va bien y de pronto baja mucho de velocidad** | *Thermal throttling*; caché SLC llena en copias largas | Poner disipador, mejorar ventilación; es normal en copias muy grandes con QLC |
| Un SSD se ha vuelto **de solo lectura** | El SSD ha agotado su vida útil o ha detectado un fallo grave, y se protege | **Copiar los datos** inmediatamente y sustituirlo |
| El disco **"tiene menos capacidad"** de la indicada | Diferencia TB/TiB (apartado 1.4); particiones de recuperación; disco MBR de más de 2 TB | Explicar la diferencia; convertir a GPT si es MBR |
| Pendrive o tarjeta: **"Debe formatear el disco"** | Extraído sin expulsar; sistema de archivos dañado; falsificación | Intentar recuperar los datos antes de formatear; comprobar la capacidad real con H2testw |
| No se puede copiar un archivo de **más de 4 GB** a un USB | El USB está en FAT32 | Formatearlo en exFAT |
| Disco externo **no aparece o se desconecta** | Puerto USB con poca corriente; cable defectuoso; disco de 3,5" sin alimentador | Usar otro puerto (trasero), otro cable o un concentrador alimentado |

---

## 19. Borrado seguro y recuperación de datos

### 19.1 Borrar no es eliminar

Al **borrar** un archivo o hacer un **formato rápido**, el sistema solo marca el espacio como libre: los datos siguen en el disco hasta que se sobrescriben.

- En un **HDD**, se pueden recuperar con programas como **PhotoRec**, **TestDisk** (recupera particiones perdidas) o **Recuva**.
- En un **SSD** con TRIM, la controladora borra esos bloques muy pronto: **la recuperación casi nunca es posible**. Por eso las copias de seguridad son aún más importantes con SSD.

> Si has borrado algo por error, **deja de usar el disco** inmediatamente: cada escritura puede sobrescribir lo que quieres recuperar. Recupera los datos **a otro disco**, nunca al mismo.

### 19.2 Borrado seguro

Antes de **vender, donar o reciclar** un equipo hay que borrar los datos de forma que no se puedan recuperar (y así lo exige el RGPD en empresas):

| Disco | Método |
|---|---|
| **HDD** | Sobrescribir todo el disco una vez (con ceros o datos aleatorios). Herramientas: `diskpart` → `clean all`, **DBAN**, `shred` o `dd` en Linux. Una pasada es suficiente en discos modernos. |
| **SSD** | Sobrescribir **no es fiable**: por el sobreaprovisionamiento y la nivelación de desgaste, quedan bloques que el sistema no ve. Hay que usar el **borrado seguro del propio SSD**: *Secure Erase* (SATA) o *Format/Sanitize* (NVMe), desde la herramienta del fabricante o desde la UEFI de muchas placas. |
| **Disco cifrado** (BitLocker) | Borrar la clave hace que los datos sean ilegibles. Es la forma más rápida. |
| **Disco averiado** | Destrucción física (trituradora o empresa de destrucción certificada). |

### 19.3 Recuperación profesional

Si un disco con datos importantes tiene una **avería física** (ruidos, no gira, no se detecta), no se debe abrir ni hacer pruebas: se envía a un **laboratorio de recuperación**. Trabajan en salas limpias y pueden cambiar cabezales o leer los platos. Es caro (cientos o miles de euros), y con SSD averiados las posibilidades son mucho menores.

---

## 20. Tecnologías del pasado y del futuro

### 20.1 Tecnologías que ya no se usan

| Tecnología | Época | Comentario |
|---|---|---|
| **Disquete** de 3,5" | 1982–2010 | **1,44 MB**, magnético. Su icono sigue siendo el botón "Guardar". También hubo de 5,25" (360 KB–1,2 MB). |
| **Zip / Jaz** (Iomega) | 1994–2003 | Discos magnéticos extraíbles de 100 MB–2 GB |
| **IDE/PATA** | 1986–2010 | Cable plano, maestro/esclavo (apartado 5.1) |
| **SCSI** paralelo | 1986–2005 | Servidores (apartado 5.3) |
| **mSATA** | 2010–2015 | Sustituido por M.2 |
| **SmartMedia, xD, Memory Stick** | 1995–2015 | Tarjetas de memoria sustituidas por SD |
| **HD DVD** | 2006–2008 | Perdió frente al Blu-ray |
| **Intel Optane** | 2017–2022 | Memoria 3D XPoint, muy rápida y duradera. Intel la abandonó en 2022. |
| **SSHD** (disco híbrido) | 2011–2020 | HDD con unos GB de flash como caché. Superado por los SSD baratos. |

### 20.2 Lo que viene

- **Discos duros más grandes:** HAMR ya está en producción; se esperan discos de **50–60 TB** en pocos años y de **100 TB** hacia el final de la década.
- **SSD PCIe 6.0** en equipos de consumo, aunque de momento las velocidades de PCIe 5.0 ya superan lo que aprovecha la mayoría de programas.
- **Más capas y más bits por celda:** NAND de 400 capas o más, QLC cada vez más habitual y la llegada de PLC (5 bits por celda).
- **SSD gigantes para IA:** SSD de empresa de más de 100 TB, y los fabricantes ya hablan de llegar a 1 PB.
- **SD Express** y **microSD Express**, que llevan NVMe a las tarjetas de memoria.
- **CXL:** conexión que permite compartir memoria y almacenamiento entre servidores.
- **Almacenamiento en vidrio y en ADN:** investigaciones (por ejemplo, el *Project Silica* de Microsoft) para guardar datos durante miles de años. Aún no están a la venta.

---

## 21. Glosario

| Término | Definición |
|---|---|
| **AHCI** | Protocolo de comunicación de los discos SATA. Una sola cola de 32 órdenes. |
| **Alineación** | Hacer que las particiones empiecen en múltiplos del tamaño de sector físico (4K). |
| **Bloque** (flash) | Grupo de páginas; la unidad mínima que se puede borrar en una memoria flash. |
| **Caché SLC** | Parte de un SSD TLC/QLC que trabaja como SLC para escribir más rápido. |
| **Cilindro** | Conjunto de pistas en la misma posición en todas las caras de un HDD. |
| **Clúster** | Unidad mínima de espacio que asigna un sistema de archivos (normalmente 4 KB). |
| **CMR** | Grabación magnética convencional, con pistas que no se solapan. |
| **Controladora** (SSD) | Procesador del SSD que gestiona la memoria flash; determina su rendimiento. |
| **DWPD** | Escrituras completas del disco al día que admite un SSD durante su garantía. |
| **eMMC** | Memoria flash soldada, lenta, de dispositivos baratos. |
| **ESP** | Partición del sistema EFI, en FAT32, con los cargadores de arranque UEFI. |
| **exFAT** | Sistema de archivos para memorias USB y tarjetas, compatible con todos los sistemas y sin límite de 4 GB por archivo. |
| **FAT32** | Sistema de archivos antiguo y muy compatible; no admite archivos de más de 4 GB. |
| **Flash NAND** | Memoria no volátil, borrable eléctricamente, usada en SSD, USB y tarjetas. |
| **GPT** | Esquema de particiones moderno: 128 particiones, discos enormes, copia de la tabla. Necesario con UEFI. |
| **HAMR** | Grabación magnética asistida por calor (láser). Permite discos de más de 30 TB. |
| **HDD** | Disco duro: almacenamiento magnético con platos giratorios. |
| **HMB** | Uso de una parte de la RAM del ordenador como caché por un SSD sin DRAM. |
| **IOPS** | Operaciones de entrada/salida por segundo; mide el rendimiento en accesos aleatorios. |
| **Latencia rotacional** | Tiempo que se espera a que el sector pase bajo el cabezal; de media, media vuelta. |
| **LBA** | Direccionamiento de los sectores por número consecutivo. |
| **Llave** (M.2) | Muesca del conector M.2 que indica sus señales (B, M, B+M…). |
| **M.2** | Formato físico de tarjeta para SSD (y wifi); puede ser SATA o PCIe. |
| **MBR** | Esquema de particiones antiguo: 4 primarias, discos de hasta 2 TiB. |
| **MTBF** | Tiempo medio entre fallos; indicador estadístico de fiabilidad. |
| **NAS** | Dispositivo de almacenamiento conectado a la red que comparte carpetas. |
| **NTFS** | Sistema de archivos de Windows, con permisos y registro de cambios. |
| **NVMe** | Protocolo para SSD sobre PCI Express; muchas colas y baja latencia. |
| **Página** (flash) | Unidad mínima de lectura y escritura en una memoria flash. |
| **Partición** | División lógica de un disco que se trata como una unidad independiente. |
| **Pista** | Cada círculo concéntrico de la superficie de un plato. |
| **Plato** | Disco magnético giratorio de un HDD. |
| **QLC / TLC / MLC / SLC** | Memoria flash de 4, 3, 2 o 1 bits por celda. |
| **RAID** | Combinación de varios discos para ganar velocidad, redundancia o ambas. |
| **SAS** | Interfaz serie de discos de servidor; admite también discos SATA. |
| **SATA** | Interfaz serie de discos más extendida; hasta 600 MB/s (SATA III). |
| **Sector** | Unidad mínima de lectura y escritura de un disco: 512 bytes o 4 KB. |
| **Secure Erase** | Orden que borra de forma segura todas las celdas de un SSD. |
| **SMART** | Sistema de autodiagnóstico de los discos. |
| **SMR** | Grabación magnética con pistas solapadas; más capacidad, pero escritura lenta. |
| **SSD** | Unidad de estado sólido: almacenamiento en memoria flash, sin piezas móviles. |
| **TBW** | Total de terabytes que se pueden escribir en un SSD durante su garantía. |
| ***Thermal throttling*** | Reducción automática de velocidad de un componente para no sobrecalentarse. |
| **TRIM** | Orden con la que el sistema avisa al SSD de qué bloques ya no tienen datos útiles. |
| **UFS** | Memoria flash soldada, rápida, de móviles y tabletas. |
| **UHS** | Bus de las tarjetas SD (UHS-I, UHS-II, UHS-III). |
| **VMD / RST** | Tecnología de Intel para gestionar SSD NVMe y RAID; exige un controlador específico al instalar Windows. |
| ***Wear leveling*** | Nivelación de desgaste: reparto de las escrituras entre todas las celdas de un SSD. |

---

## 22. Preguntas frecuentes

**He comprado un disco de 2 TB y Windows dice que tiene 1,81 TB. ¿Me han engañado?**
No. El fabricante cuenta 1 TB = 10¹² bytes y Windows divide entre 1024⁴. Son los mismos bytes en dos unidades distintas (apartado 1.4).

**¿Merece la pena un SSD PCIe 5.0?**
Para la mayoría, no. En el uso normal y en juegos, la diferencia con un PCIe 4.0 apenas se nota, y los 5.0 son más caros y se calientan más. Solo compensa si mueves archivos muy grandes a menudo.

**Mi SSD M.2 encaja en la ranura pero no aparece. ¿Está roto?**
Probablemente no. Lo más habitual es que sea un **SSD M.2 SATA** (con dos muescas) en una ranura que **solo admite PCIe**, o que esa ranura comparta carriles con otro dispositivo. Consulta el manual de la placa.

**¿Puedo poner un SSD NVMe en un portátil antiguo?**
Solo si tiene una ranura M.2 con soporte PCIe (llave M). Si solo tiene una bahía de 2,5", usa un SSD SATA de 2,5": la mejora sobre el disco duro será enorme igualmente.

**¿Un SSD se estropea si escribo mucho?**
Tiene un límite de escrituras (TBW), pero para un uso normal tardarías décadas en alcanzarlo. Lo que sí debes vigilar es el atributo de desgaste en CrystalDiskInfo.

**¿Hay que desfragmentar un SSD?**
No. Windows lo sabe y, en lugar de desfragmentarlo, le envía órdenes TRIM. No uses programas de desfragmentación antiguos.

**¿Por qué no puedo copiar un archivo de 5 GB a mi pendrive si tiene 30 GB libres?**
Porque está formateado en **FAT32**, que no admite archivos de más de 4 GB. Formatéalo en **exFAT** (perderás lo que tenga: copia antes los datos).

**¿MBR o GPT?**
**GPT** para cualquier disco interno actual. Es obligatorio para discos de más de 2 TB y para arrancar Windows 11. MBR solo para pendrives o tarjetas que deban funcionar en aparatos antiguos.

**¿Es mejor un HDD de 7200 rpm o uno de 5400 rpm?**
El de 7200 rpm es más rápido; el de 5400, más silencioso, frío y barato. Para copias de seguridad o almacenamiento de archivos da igual. Para el sistema operativo, ninguno de los dos: usa un SSD.

**¿Qué es mejor para guardar fotos durante muchos años?**
Ningún soporte por sí solo. Lo seguro es seguir la **regla 3-2-1**: varias copias en soportes distintos, una de ellas fuera de casa, y comprobarlas de vez en cuando.

**He borrado una carpeta de un SSD. ¿Puedo recuperarla?**
Probablemente no: con TRIM, el SSD borra esos bloques enseguida. Mira en la Papelera, en el historial de versiones de la nube o en tu copia de seguridad.

**¿Por qué mi disco externo se desconecta solo?**
Suele ser falta de corriente en el puerto USB (sobre todo en discos de 2,5" en puertos delanteros o concentradores sin alimentación) o un cable defectuoso. Prueba en un puerto trasero y con otro cable.

---

## 23. Actividades

1. **Identifica los discos.** Tu profesor te dará varios dispositivos de almacenamiento (HDD de 3,5" y 2,5", SSD SATA, SSD M.2 SATA y NVMe, tarjetas, pendrives). Para cada uno indica: tecnología, formato, interfaz, capacidad y cómo lo has sabido. En los M.2, indica el tamaño (2280, 2242…) y el tipo de llave.

2. **Lee la ficha técnica.** Busca la ficha oficial de un SSD NVMe y de un HDD actuales. Anota: capacidad, interfaz y protocolo, velocidad de lectura y escritura, tipo de memoria (TLC/QLC) o tecnología de grabación (CMR/SMR), caché, TBW o MTBF, consumo y garantía.

3. **Calcula.**
   a. ¿Qué capacidad mostrará Windows para un disco de 4 TB? ¿Y para uno de 500 GB?
   b. ¿Cuál es la latencia rotacional media de un disco de 5400 rpm? ¿Y su tiempo de acceso medio si el tiempo de búsqueda es de 12 ms?
   c. Un SSD de 1 TB tiene una garantía de 600 TBW. Si escribes 50 GB al día, ¿cuántos años tardarías en alcanzarla?
   d. ¿Cuál es la velocidad máxima de un SSD PCIe 4.0 x4 conectado a una ranura PCIe 3.0 x4? ¿Y de un SSD SATA en un puerto SATA II?

4. **Manual de la placa.** Con el manual de una placa base del aula, responde: ¿cuántas ranuras M.2 tiene? ¿Qué interfaz y generación admite cada una? ¿Cuántos puertos SATA? ¿Qué se desactiva al usar cada ranura M.2?

5. **Instalación.** Instala en un equipo del aula un disco SATA y un SSD M.2. Comprueba que los detecta la UEFI, cambia el orden de arranque y, desde Windows, inicializa el disco como GPT, crea dos particiones (una NTFS y otra exFAT) y asígnales letra. Repite la creación de particiones con `diskpart`.

6. **Inventario y salud.** En un equipo Windows y en uno Linux, obtén con los comandos del apartado 16 la lista de discos, su tipo (HDD/SSD), su bus, su esquema de particiones y sus particiones. Después, con CrystalDiskInfo o `smartctl`, anota el estado, la temperatura, las horas de uso y el desgaste, y explica si el disco está sano.

7. **Rendimiento.** Mide con CrystalDiskMark (o KDiskMark) un HDD, un SSD SATA y un SSD NVMe. Compara los resultados de SEQ1M y RND4K Q1T1 en una tabla y explica las diferencias. ¿Qué disco elegirías para el sistema operativo y por qué?

8. **Sistemas de archivos.** Formatea un pendrive en FAT32 e intenta copiar un archivo de más de 4 GB. Explica qué pasa. Formatéalo en exFAT, repite la prueba y comprueba que se puede leer en Windows y en Linux.

9. **Avería simulada.** Tu profesor preparará un equipo con un problema de almacenamiento (cable desconectado, disco sin inicializar, orden de arranque incorrecto, SSD SATA en ranura PCIe, modo VMD…). Descríbelo, diagnostica la causa con la tabla del apartado 18 y soluciónalo.

10. **Presupuesto.** Elige el almacenamiento para tres equipos: un PC de oficina, un PC de juegos y un NAS doméstico para copias de seguridad de una familia. Justifica tipo, interfaz, capacidad y número de discos, e incluye precios actuales de dos tiendas.

---

## 24. Recursos

- **Apuntes de memoria** de esta misma SA, para repasar la jerarquía de memoria y las memorias ROM/flash.
- **CrystalDiskInfo y CrystalDiskMark** – Salud y rendimiento de los discos en Windows: <https://crystalmark.info>
- **KDiskMark** – Medición del rendimiento en Linux: <https://github.com/JonMagon/KDiskMark>
- **smartmontools** (`smartctl`) – Lectura de SMART en Linux y Windows: <https://www.smartmontools.org>
- **GParted** – Editor de particiones libre (también en USB autoarrancable): <https://gparted.org>
- **Clonezilla** – Clonado de discos libre: <https://clonezilla.org>
- **TestDisk y PhotoRec** – Recuperación de particiones y archivos: <https://www.cgsecurity.org>
- **SD Association** – Explicación oficial de capacidades y clases de velocidad de las tarjetas SD: <https://www.sdcard.org>
- **Microsoft Learn** – Documentación de `diskpart`, `mbr2gpt` y la Administración de discos: <https://learn.microsoft.com>

---

*Material actualizado a noviembre de 2026. Las capacidades, velocidades y precios cambian con frecuencia; consulta siempre la información oficial del fabricante del disco y de la placa base.*
