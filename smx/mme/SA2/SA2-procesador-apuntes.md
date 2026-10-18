# SA2 – Componentes básicos de un equipo informático: el procesador

**Módulo:** Montaje y Mantenimiento de Equipos (MME) · **Ciclo:** CFGM Sistemas Microinformáticos y Redes (SMR)

> Estos apuntes acompañan a la presentación de clase. Cada apartado amplía una o varias diapositivas. Si algo de la presentación no te queda claro, búscalo aquí por su título. Al final tienes un **glosario**, **preguntas frecuentes** y **actividades**.

**Qué deberías saber hacer al terminar esta SA**

- Explicar qué hace un procesador y qué partes tiene por dentro.
- Interpretar una ficha técnica: núcleos, hilos, frecuencias, caché, consumo, socket.
- Descifrar el nombre comercial de un procesador Intel o AMD.
- Comprobar la compatibilidad entre procesador, placa base (socket + chipset + BIOS) y sistema operativo.
- Elegir y montar correctamente el sistema de refrigeración.
- Montar, comprobar y mantener un procesador en un equipo real.

---

## Índice

1. ¿Qué es el microprocesador?
2. Un poco de historia y la Ley de Moore
3. Estructura interna
4. Núcleos e hilos
5. La memoria caché
6. Frecuencia de trabajo y rendimiento
7. Conjuntos de instrucciones
8. Arquitectura: 32 bits, 64 bits, x86 y ARM
9. Alimentación, consumo y temperatura
10. Overclocking, undervolting y turbo
11. Fabricantes, gamas y nomenclatura
12. Sockets, chipsets y compatibilidad
13. Refrigeración
14. Montaje del procesador paso a paso
15. Diagnóstico y mantenimiento
16. Cómo elegir un procesador
17. Glosario
18. Preguntas frecuentes
19. Actividades propuestas
20. Enlaces y recursos

---

## 1. ¿Qué es el microprocesador?

El **microprocesador** o **CPU** (*Central Processing Unit*) es el componente que ejecuta los programas. Todo lo que hace un ordenador (abrir un documento, reproducir un vídeo, responder a un ping) acaba convertido en **instrucciones** que la CPU lee de la memoria RAM, interpreta y ejecuta una tras otra a enorme velocidad.

Sus funciones principales son:

- **Ejecutar instrucciones**: las busca en memoria, las descodifica (averigua qué tiene que hacer) y las ejecuta.
- **Hacer cálculos**: operaciones aritméticas (sumar, multiplicar…) y lógicas (comparar, AND, OR…).
- **Coordinar el resto del sistema**: decide qué datos se leen o escriben en memoria y se comunica con la placa base, la tarjeta gráfica o el almacenamiento.

Físicamente es un **circuito integrado** (chip) de silicio con **miles de millones de transistores**, encapsulado y montado sobre un sustrato con contactos que encaja en el **socket** de la placa base. Encima lleva una tapa metálica, el **IHS** (*Integrated Heat Spreader*), que protege el chip y reparte el calor hacia el disipador.

Hay procesadores en casi todo: ordenadores, servidores, móviles, consolas, televisores, coches o electrodomésticos. En móviles, tabletas y muchos portátiles la CPU va integrada en un **SoC** (*System on a Chip*), un único chip que incluye también la gráfica, el controlador de memoria, la NPU, el módem, etc.

Hoy no basta con que un procesador sea rápido: también tiene que ser **eficiente** (rendimiento por vatio). Un procesador eficiente consume menos, se calienta menos, necesita menos refrigeración, hace menos ruido y alarga la batería de un portátil.

---

## 2. Un poco de historia y la Ley de Moore

### Los inicios

- **1971 – Intel 4004.** Primer microprocesador comercial, diseñado para una calculadora de la empresa japonesa Busicom. Tenía unos **2.300 transistores**, trabajaba a **740 kHz** (0,74 MHz) y procesaba datos de **4 bits**.
- **1978 – Intel 8086.** Procesador de 16 bits. De él viene el nombre **x86**, la familia de instrucciones que siguen usando hoy los PC.
- **1985 – Intel 80386.** Primer x86 de **32 bits**.
- **2003 – AMD64.** AMD amplía x86 a **64 bits** (Athlon 64 / Opteron). Intel adopta la misma extensión. Es la base de todos los PC actuales.
- **2005-2006 – Primeros procesadores de doble núcleo** de consumo (Athlon 64 X2, Pentium D, Core 2 Duo).
- **2008-2011 – El controlador de memoria entra en la CPU** (AMD ya lo hizo en 2003; Intel con Nehalem en 2008) y luego también la gráfica (Sandy Bridge, 2011). Desaparece el antiguo **FSB**.
- **2017 – AMD Ryzen.** Nueva arquitectura Zen; vuelve la competencia fuerte en núcleos.
- **2021 – Intel Alder Lake (12.ª gen).** Arquitectura **híbrida** con núcleos de rendimiento y de eficiencia en el PC de sobremesa.
- **2023-2026 – Chiplets, IA y NPU.** Los procesadores se fabrican a trozos (*tiles* o *chiplets*), incorporan unidades para inteligencia artificial y Intel estrena la marca **Core Ultra**.

Además de Intel y AMD, han fabricado o fabrican procesadores Motorola, IBM, Zilog, Cyrix, VIA, Texas Instruments, Qualcomm, Apple, MediaTek o Samsung, entre otros. En el PC de escritorio clásico (x86) solo quedan Intel y AMD.

### La Ley de Moore

En 1965 Gordon Moore (cofundador de Intel) observó que el número de transistores que caben en un chip se **duplicaba aproximadamente cada dos años**. No es una ley física, sino una tendencia que la industria ha ido cumpliendo durante más de 50 años: del 4004 con 2.300 transistores a chips actuales con decenas de miles de millones.

Hoy se dice que la Ley de Moore **se está ralentizando**: reducir el tamaño de los transistores es cada vez más difícil y caro. La industria responde con otras técnicas:

- **Chiplets / tiles**: en vez de un único chip gigante, varios chips pequeños unidos dentro del mismo encapsulado (más baratos de fabricar y combinar).
- **Apilado 3D**: poner capas de chip unas encima de otras (por ejemplo, la 3D V-Cache de AMD).
- **Unidades especializadas**: GPU, NPU, codificadores de vídeo… que hacen ciertas tareas mucho mejor que un núcleo genérico.

### ¿Qué significan los "nanómetros"?

Se habla de procesos de fabricación de 14 nm, 7 nm, 3 nm… Antiguamente la cifra correspondía a un tamaño físico del transistor; **hoy es sobre todo un nombre comercial** de cada generación de fabricación. Lo importante es la idea: un proceso más moderno permite más transistores en el mismo espacio y, en general, **menos consumo con más rendimiento**.

Los grandes fabricantes de chips (*foundries*) son **TSMC** (Taiwán), **Samsung** e **Intel Foundry**. AMD y Apple no tienen fábricas propias: diseñan y encargan la fabricación a TSMC. Intel fabrica parte de sus procesadores y encarga otra parte a TSMC.

---

## 3. Estructura interna

Los primeros procesadores tenían solo tres bloques. Los actuales integran muchos más.

### Bloques clásicos

| Bloque | Qué hace |
|---|---|
| **Unidad de Control (UC)** | Busca las instrucciones, las descodifica y dirige al resto de bloques. |
| **Unidad Aritmético-Lógica (ALU)** | Hace las operaciones con números enteros y las operaciones lógicas. |
| **Registros** | Pequeñísimas memorias internas, las más rápidas que existen, donde la CPU guarda los datos con los que está operando en ese instante. |

### Bloques de un procesador moderno

| Bloque | Qué hace |
|---|---|
| **FPU (unidad de coma flotante)** | Operaciones con números decimales. Antes era un chip aparte (el "coprocesador matemático"); hoy va dentro de cada núcleo. |
| **Unidades SIMD/vectoriales** | Hacen la misma operación sobre muchos datos a la vez (ver apartado 7). |
| **Memoria caché L1, L2, L3** | Memoria rápida intermedia entre los núcleos y la RAM (ver apartado 5). |
| **Varios núcleos** | Cada uno es, en la práctica, un procesador completo (ver apartado 4). |
| **Controlador de memoria integrado (IMC)** | Gestiona la RAM directamente. Determina qué memoria admite el procesador (DDR4, DDR5) y a qué velocidad. |
| **Controlador PCI Express** | Conecta directamente con la tarjeta gráfica y los SSD NVMe. El número de **líneas PCIe** de la CPU limita cuántos dispositivos rápidos se pueden conectar a la vez. |
| **Gráfica integrada (iGPU)** | Permite tener imagen sin tarjeta gráfica dedicada. |
| **NPU (unidad de procesamiento neuronal)** | Acelera tareas de inteligencia artificial (desenfoque de fondo en videollamadas, transcripción, asistentes) gastando muy poca energía. |
| **Interconexión interna** | El "bus" que une todos estos bloques entre sí (*ring bus*, *mesh*, *Infinity Fabric*…). |

### ¿Qué fue del FSB?

En los procesadores antiguos (hasta ~2008) el controlador de memoria estaba en un chip de la placa base (el *northbridge*), y la CPU se comunicaba con él a través del **FSB** (*Front Side Bus*). Hoy ese bus **ya no existe**: la memoria se conecta directamente a la CPU y la comunicación con el chipset se hace mediante enlaces como **DMI** (Intel) o enlaces PCIe (AMD). Si en algún documento antiguo ves "FSB", "BSB" o *northbridge*, ahora sabes que es historia.

### Chiplets y tiles

Muchos procesadores actuales no son un único trozo de silicio. Por ejemplo:

- Un **Ryzen 9** de sobremesa tiene dos chiplets de núcleos (**CCD**, 8 núcleos cada uno) y un chiplet de entrada/salida (**IOD**) con el controlador de memoria, el PCIe y la gráfica integrada.
- Un **Intel Core Ultra** se compone de varias *tiles*: núcleos, gráfica, entrada/salida, etc.

Para el técnico esto apenas cambia nada al montar, pero ayuda a entender por qué un procesador puede tener, por ejemplo, la caché L3 "partida" entre grupos de núcleos.

---

## 4. Núcleos e hilos

### Monoprocesador, multinúcleo y multiprocesador

- **Un solo núcleo (*single core*)**: lo que tenían todos los procesadores de PC hasta mediados de los 2000. Solo puede ejecutar un flujo de instrucciones a la vez (aunque cambia de tarea tan deprisa que parece que hace varias).
- **Multinúcleo (*multicore*)**: un único procesador (un solo encapsulado, un solo socket) con **varios núcleos reales**. Cada núcleo es una unidad de proceso completa con sus propios registros y caché L1/L2. **No es una emulación**: un procesador de 8 núcleos tiene 8 "cerebros" de verdad.
- **Multiprocesador**: una placa base con **varios sockets** y un procesador en cada uno. Es típico de **servidores** (2, 4 u 8 sockets). Requiere placas, procesadores y sistemas operativos preparados.

| | Multinúcleo | Multiprocesador |
|---|---|---|
| Dónde se usa | Prácticamente todos los equipos actuales | Servidores y estaciones de trabajo grandes |
| Número de sockets | 1 | 2 o más |
| Coste | Menor | Mucho mayor (placa especial + varias CPU) |
| Comunicación entre núcleos | Muy rápida (dentro del mismo chip) | Más lenta (entre chips, por la placa) |
| Capacidad máxima | Limitada por un solo chip | Suma la de todos los procesadores |

### Hilos y SMT / Hyper-Threading

Un **hilo** (*thread*) es un flujo de instrucciones que el sistema operativo puede asignar a un núcleo.

La tecnología **SMT** (*Simultaneous Multi-Threading*), que Intel llama **Hyper-Threading**, permite que un núcleo físico atienda **dos hilos a la vez**. El núcleo aprovecha los huecos en los que una de las tareas está esperando (por ejemplo, un dato de memoria) para avanzar con la otra. El sistema operativo ve **dos procesadores lógicos** por cada núcleo.

Importante:

- Un núcleo con SMT **no rinde como dos núcleos**. La mejora típica está entre un 10 % y un 30 % en tareas que usan muchos hilos, y en algunas tareas no mejora nada.
- Por eso en las fichas aparece **"8 núcleos / 16 hilos"**: 8 núcleos físicos, 16 procesadores lógicos.
- No todos los procesadores tienen SMT. Por ejemplo, los Intel **Core Ultra 200S** lo eliminaron (24 núcleos / 24 hilos) para ganar eficiencia. Es un buen ejemplo de que "más hilos" no siempre significa "mejor".

### Arquitectura híbrida: núcleos P y núcleos E

Desde la 12.ª generación (2021), Intel combina en el mismo procesador dos tipos de núcleo:

- **P-cores (*Performance*)**: grandes, rápidos, consumen más. Para juegos, aplicaciones exigentes y tareas que dependen de un solo hilo.
- **E-cores (*Efficient*)**: pequeños, más lentos individualmente, pero consumen mucho menos y caben muchos en poco espacio. Para tareas en segundo plano y para sumar potencia en tareas muy paralelas.
- Algunos portátiles añaden **LP E-cores** (*Low Power*), todavía más austeros, para cuando el equipo casi no hace nada.

Por eso verás fichas como **"24 núcleos (8P + 16E)"**. Un componente del procesador (el *Thread Director* en Intel) ayuda al sistema operativo a decidir qué tarea va a qué tipo de núcleo. Para que funcione bien es recomendable **Windows 11** (o un Linux reciente).

La idea viene de los móviles (ARM la llama *big.LITTLE*). AMD usa una variante: núcleos **Zen "c"** (compactos), que tienen las mismas capacidades que los normales pero ocupan menos y alcanzan menos frecuencia.

### ¿Cuántos núcleos hay hoy?

| Segmento | Rango habitual (2026) |
|---|---|
| Portátil / sobremesa básico | 4 – 8 núcleos |
| Sobremesa gama media | 6 – 14 núcleos |
| Sobremesa gama alta | 16 – 24 núcleos |
| Estación de trabajo (Threadripper, Xeon W) | hasta 96 núcleos |
| Servidor (EPYC, Xeon 6) | más de 100: AMD EPYC 9005 llega a 192 núcleos e Intel Xeon 6 a 288 núcleos de eficiencia |

### ¿Más núcleos es siempre mejor?

No. Depende del programa:

- **Ofimática, navegación, la mayoría de juegos**: dependen mucho del rendimiento de cada núcleo; a partir de 6-8 núcleos se gana poco.
- **Renderizado 3D, edición y codificación de vídeo, compilación, virtualización, servidores**: aprovechan todos los núcleos que les des.

---

## 5. La memoria caché

### Por qué existe

La CPU trabaja muchísimo más rápido que la memoria RAM. Si tuviera que esperar a la RAM para cada dato, pasaría la mayor parte del tiempo parada. La **caché** es una memoria pequeña, muy rápida y muy cara, situada dentro del procesador, que guarda **copias de los datos e instrucciones usados más recientemente o con más frecuencia**. Si el dato está en caché (*acierto* o *hit*), se obtiene enseguida; si no (*fallo* o *miss*), hay que ir a buscarlo a la RAM.

Funciona porque los programas suelen volver a usar los mismos datos y los datos cercanos a los que acaban de usar (principio de **localidad**).

### Niveles

| Nivel | Tamaño típico | Velocidad | De quién es |
|---|---|---|---|
| **L1** | 32–64 KB **por núcleo**, dividida en **L1 de instrucciones** y **L1 de datos** | La más rápida | De cada núcleo |
| **L2** | 512 KB – 3 MB por núcleo | Algo más lenta | Normalmente de cada núcleo (en los E-cores de Intel, compartida por grupos de 4) |
| **L3** | 8 – 96 MB (o más) | Más lenta que L2, pero mucho más rápida que la RAM | **Compartida** por todos los núcleos (o por un grupo de núcleos) |

Cuanto más cerca del núcleo, más rápida y más pequeña.

### Cómo leer la caché en una ficha o en CPU-Z

En CPU-Z (pestaña *CPU* o *Caches*) aparece algo así para un procesador de 6 núcleos:

```
L1 Data    6 x 32 KBytes    8-way
L1 Inst.   6 x 32 KBytes    8-way
Level 2    6 x 256 KBytes   4-way
Level 3    12 MBytes        16-way
```

Se lee así:

- **"6 x 32 KB"** = hay 6 bloques de 32 KB, **uno por núcleo**. Total L1 de datos: 192 KB.
- L1 aparece **dos veces**: una para datos y otra para instrucciones.
- **L3 sin multiplicador** ("12 MB") = una sola caché **compartida** por todos los núcleos.
- El "**8-way**" (asociatividad) indica cómo se organiza internamente la caché; no hace falta para elegir un procesador.

Los fabricantes a veces anuncian la caché **sumada** ("caché total 40 MB" = L2 + L3). Fíjate siempre en qué están sumando.

### Ejemplos actuales

- **AMD Ryzen 7 9800X3D** (8 núcleos): L1 de 80 KB por núcleo (32 KB instrucciones + 48 KB datos), L2 de 1 MB por núcleo y **96 MB de L3**.
- **Intel Core Ultra 9 285K** (8P + 16E): L2 de 3 MB por P-core, 4 MB por cada grupo de 4 E-cores y 36 MB de L3 compartida.

### 3D V-Cache

AMD apila una capa extra de caché L3 **encima** del chiplet de núcleos. Los modelos con esta tecnología llevan el sufijo **X3D** y destacan especialmente en **juegos**, que se benefician mucho de tener más datos cerca. A cambio suelen tener frecuencias algo más bajas y son más caros.

---

## 6. Frecuencia de trabajo y rendimiento

### El reloj

El procesador funciona al ritmo de una señal de reloj. Cada "tic" es un **ciclo**. La **frecuencia** es el número de ciclos por segundo y se mide en **hercios**:

- 1 MHz (megahercio) = un millón de ciclos por segundo.
- 1 GHz (gigahercio) = 1.000 MHz = mil millones de ciclos por segundo.

Un procesador actual trabaja típicamente entre **3 y 6 GHz**.

### Reloj base × multiplicador

La placa base genera una frecuencia de referencia llamada **reloj base** o **BCLK**, que en los procesadores actuales es de **100 MHz**. El procesador la multiplica internamente:

> **Frecuencia del núcleo = BCLK × multiplicador**

Ejemplo: un procesador con BCLK de 100 MHz y multiplicador ×37 trabaja a 3.700 MHz = **3,7 GHz**. Si sube a ×50 (en turbo), trabaja a 5,0 GHz.

El multiplicador no es fijo: el procesador lo **cambia cientos de veces por segundo** según la carga. Cuando no hace nada baja a 800 MHz – 1 GHz para ahorrar energía, y cuando hay trabajo sube.

> **Nota histórica.** En los equipos con FSB se usaba la misma idea con la frecuencia del bus. Cuidado con las cifras antiguas: un Pentium D a 3,6 GHz con "FSB de 800 MHz" en realidad tenía un bus de 200 MHz que transfería 4 veces por ciclo (800 "efectivos"), así que su multiplicador real era **×18**, no ×4,5.

### Frecuencia base y frecuencia turbo

- **Frecuencia base**: la que el fabricante garantiza con todos los núcleos trabajando dentro del consumo nominal.
- **Frecuencia turbo / boost máxima**: la que puede alcanzar **uno o pocos núcleos** durante un tiempo si hay margen de temperatura y consumo. Intel lo llama **Turbo Boost**; AMD, **Precision Boost**.

El turbo depende del número de núcleos activos, del tipo de tarea, de la temperatura y de los límites de consumo configurados en la BIOS. Por eso **la refrigeración influye en el rendimiento**: con mejor refrigeración el procesador aguanta más tiempo en turbo.

### La frecuencia no lo es todo: el IPC

Dos procesadores a la misma frecuencia pueden rendir muy distinto. Lo que importa es:

> **Rendimiento ≈ frecuencia × IPC × número de núcleos aprovechados**

El **IPC** (*Instructions Per Cycle*, instrucciones por ciclo) mide cuánto trabajo hace un núcleo en cada ciclo. Cada nueva arquitectura suele mejorar el IPC. Un procesador moderno a 4 GHz puede ser mucho más rápido que uno antiguo a 4 GHz.

Por eso **no se pueden comparar procesadores solo por los GHz**, y menos aún entre marcas o generaciones distintas. Para comparar se usan **pruebas de rendimiento** (*benchmarks*): Cinebench, Geekbench, PassMark, o pruebas con juegos y aplicaciones reales.

### Otras unidades que verás

| Unidad | Qué mide | Dónde se usa |
|---|---|---|
| **MHz / GHz** | Ciclos de reloj por segundo | Frecuencia de la CPU, GPU, buses |
| **MT/s** (megatransferencias por segundo) | Transferencias de datos por segundo | Memoria RAM (DDR5-6000 = 6.000 MT/s). La DDR hace 2 transferencias por ciclo, por eso no coincide con los MHz reales |
| **MIPS** | Millones de instrucciones por segundo | Medida histórica, poco útil para comparar arquitecturas distintas |
| **FLOPS** | Operaciones de coma flotante por segundo (GFLOPS, TFLOPS, PFLOPS…) | GPU y supercomputadores |
| **TOPS** | Billones de operaciones por segundo (normalmente con enteros de 8 bits) | NPU e inteligencia artificial |

---

## 7. Conjuntos de instrucciones

Cada procesador entiende una lista concreta de instrucciones, su **juego de instrucciones** (*ISA*). Sobre la base x86, Intel y AMD han ido añadiendo **extensiones** para acelerar tareas concretas. Un programa que use una extensión que el procesador no tiene, sencillamente no funciona (o usa un camino más lento).

### SIMD: una instrucción, muchos datos

Muchas extensiones son de tipo **SIMD** (*Single Instruction, Multiple Data*): una sola instrucción opera sobre varios datos a la vez. Por ejemplo, sumar de una vez 8 parejas de números en lugar de hacer 8 sumas. Es ideal para multimedia, imagen, vídeo, cifrado, ciencia e IA.

| Extensión | Año aprox. | Qué aportó |
|---|---|---|
| **MMX** | 1997 (Pentium MMX) | Primeras instrucciones SIMD con enteros, pensadas para multimedia |
| **3DNow!** | 1998 (AMD K6-2) | Respuesta de AMD, con coma flotante. Ya en desuso |
| **SSE** | 1999 (Pentium III) | 70 instrucciones SIMD de coma flotante con registros de 128 bits |
| **SSE2** | 2000 (Pentium 4) | 144 instrucciones, operaciones de doble precisión. Obligatoria en x86-64 |
| **SSE3 / SSSE3** | 2004 / 2006 | Más instrucciones matemáticas y para multimedia |
| **SSE4.1 / SSE4.2** | 2007-2008 | Más instrucciones, incluidas para texto y CRC |
| **AVX / AVX2** | 2011 / 2013 | Registros de **256 bits**; AVX2 es hoy casi imprescindible en software moderno |
| **FMA** | 2012-2013 | Multiplicar y sumar en una sola instrucción |
| **AVX-512** | 2017 (Intel servidor), 2022 (AMD Zen 4) | Registros de **512 bits**; muy útil en ciencia e IA. Presente en AMD Zen 4/5, pero no en los Intel de consumo actuales |
| **AMX** | 2023 (Xeon) | Unidades para operaciones con matrices, orientadas a IA |

### Otras extensiones importantes para un técnico

| Extensión | Para qué sirve |
|---|---|
| **x86-64 / EM64T / AMD64** | Ejecutar sistemas y programas de 64 bits |
| **VT-x (Intel) / AMD-V (AMD)** | **Virtualización por hardware**. Imprescindible para VirtualBox, VMware, Hyper-V, WSL2. Muchas veces viene **desactivada en la BIOS** y hay que activarla |
| **VT-d / AMD-Vi (IOMMU)** | Pasar dispositivos físicos a máquinas virtuales |
| **AES-NI** | Cifrado y descifrado AES acelerado (BitLocker, VPN, HTTPS) |
| **NX / XD / DEP** | Bit de protección que impide ejecutar código en zonas de datos. Necesario para Windows modernos |
| **SHA, RDRAND** | Cálculo de *hashes* y generación de números aleatorios por hardware |

### Cómo ver qué instrucciones tiene un procesador

- **CPU-Z** → pestaña *CPU* → campo *Instructions*.
- **HWiNFO** → resumen del sistema → recuadro *Características* (las admitidas aparecen en verde).
- **Windows**: el Administrador de tareas → *Rendimiento* → *CPU* muestra si la virtualización está habilitada.
- **Linux**: `lscpu` o `cat /proc/cpuinfo` (campo `flags`).
- La ficha oficial del fabricante (ver apartado 20).

---

## 8. Arquitectura: 32 bits, 64 bits, x86 y ARM

### 32 bits frente a 64 bits

Cuando se dice que un procesador es de 32 o 64 bits se habla principalmente del tamaño de sus **registros de propósito general** y de las **direcciones de memoria** que puede manejar.

| | 32 bits | 64 bits |
|---|---|---|
| Rango de un número entero sin signo | 0 a 4.294.967.295 (2³²) | 0 a 18.446.744.073.709.551.615 (2⁶⁴) |
| Memoria direccionable | **4 GB** como máximo (en la práctica, unos 3,2-3,5 GB útiles en Windows) | En teoría 16 exabytes; en la práctica, lo que permita la placa y el sistema (128 GB, 256 GB, varios TB en servidores) |
| Situación actual | Obsoleto en PC. Windows 11 ya no existe en versión de 32 bits | Estándar desde hace años |

Si una operación da un resultado mayor que el máximo representable se produce un **desbordamiento** (*overflow*); si es menor que el mínimo, un **subdesbordamiento** (*underflow*).

Un procesador de 64 bits puede ejecutar programas de 32 bits (Windows lo hace mediante una capa llamada WOW64), pero no al revés.

> **¿Existen procesadores de 128 bits?** No como procesadores de propósito general. Lo que sí hay son **registros vectoriales** de 128, 256 y 512 bits (SSE, AVX, AVX-512), que guardan varios números a la vez para las instrucciones SIMD.

### x86 frente a ARM (y RISC-V)

- **x86-64**: la arquitectura de los PC con Intel y AMD. Enorme compatibilidad con software de décadas.
- **ARM**: la arquitectura de casi todos los **móviles y tabletas**, de los **Mac con chips Apple M** y de portátiles Windows con **Qualcomm Snapdragon X**. También crece en servidores (AWS Graviton, NVIDIA Grace…). Destaca por su eficiencia energética.
- **RISC-V**: arquitectura **abierta y libre de licencias**. Muy usada en microcontroladores y dispositivos integrados; empieza a aparecer en equipos más grandes.

Un programa compilado para x86 no funciona directamente en ARM. Windows en ARM y macOS incluyen **emuladores** (Prism en Windows, Rosetta 2 en Mac) que traducen los programas x86, aunque algunos (por ejemplo ciertos controladores o sistemas antitrampas de juegos) pueden no funcionar.

---

## 9. Alimentación, consumo y temperatura

### Voltajes

El procesador funciona con tensiones muy bajas, del orden de **0,7 a 1,4 V** según la carga. La placa base recibe 12 V de la fuente (conector **EPS de 8 pines** cerca del socket) y su **VRM** (*Voltage Regulator Module*, los reguladores con bobinas y disipadores alrededor del socket) la convierte en la tensión exacta que pide la CPU.

- El procesador solicita en cada momento el voltaje que necesita (**VID**). Sube cuando aumenta la frecuencia y baja en reposo.
- Todo es **automático**. En equipos muy antiguos los voltajes y frecuencias se configuraban con **jumpers** (pequeños puentes en la placa); hoy los jumpers solo se usan para cosas como borrar la CMOS.
- Un VRM de calidad es importante en procesadores de gama alta: si se calienta demasiado, la placa reduce la potencia del procesador.

Bajar el voltaje reduce mucho el consumo y la temperatura, porque la potencia crece aproximadamente con el **cuadrado del voltaje**. Por eso la tensión de los procesadores ha ido bajando generación tras generación.

### TDP y límites de potencia

El **TDP** (*Thermal Design Power*) es la cantidad de calor, en vatios, que el sistema de refrigeración debe ser capaz de **disipar** para que el procesador funcione dentro de especificación. Por ejemplo, una CPU de portátil con 15-28 W de TDP necesita una refrigeración capaz de evacuar ese calor de forma continua.

Cuidado: **el TDP no es exactamente el consumo eléctrico máximo**. Los procesadores actuales pueden superarlo bastante durante el turbo. Por eso los fabricantes usan hoy otras cifras más precisas:

| Fabricante | Término | Significado |
|---|---|---|
| Intel | **Processor Base Power** (PL1) | Potencia sostenida a largo plazo |
| Intel | **Maximum Turbo Power** (PL2) | Potencia máxima en turbo |
| AMD | **TDP** | Referencia térmica para elegir disipador |
| AMD | **PPT** (*Package Power Tracking*) | Potencia máxima real que puede consumir el procesador por el socket |

Ejemplo: un Intel Core Ultra 7 270K Plus tiene una potencia base de 125 W y una potencia turbo máxima de 250 W. Para elegir disipador conviene fijarse en el valor **alto**.

### Temperatura y *thermal throttling*

Cada procesador tiene una **temperatura máxima de funcionamiento** (**Tjmax**), normalmente alrededor de **95-105 °C**. Si la alcanza, se protege a sí mismo **bajando frecuencia y voltaje**: es el ***thermal throttling***. El equipo no se rompe, pero rinde menos. Si aun así la temperatura sigue subiendo, el equipo **se apaga** de golpe para protegerse.

Además, con más temperatura los transistores tienen más fugas de corriente, por lo que el procesador **consume algo más** para hacer el mismo trabajo. Una buena refrigeración mejora rendimiento, consumo y duración.

Valores orientativos de un sobremesa bien refrigerado:

| Situación | Temperatura habitual |
|---|---|
| Reposo | 30 – 50 °C |
| Uso normal / juegos | 55 – 80 °C |
| Prueba de estrés intensa | 75 – 95 °C (algunos procesadores de gama alta están diseñados para llegar a su límite y mantenerse ahí) |

### Un caso real: la inestabilidad de los Intel Raptor Lake

En 2024 se descubrió que muchos procesadores Intel de **13.ª y 14.ª generación** (sobre todo i7 e i9) se degradaban con el tiempo y acababan dando errores y cuelgues. La causa principal: el procesador pedía **voltajes demasiado altos** en ciertas situaciones. Intel lo corrigió con actualizaciones de **microcódigo** distribuidas mediante **actualizaciones de BIOS** y amplió la garantía de los modelos afectados.

Lecciones para un técnico:

1. El voltaje importa: más voltaje = más desgaste.
2. **Mantener la BIOS actualizada** también es mantenimiento.
3. Los perfiles de la placa que suben límites "para rendir más" no siempre son seguros.

---

## 10. Overclocking, undervolting y turbo

### Overclocking

**Hacer overclocking** es hacer funcionar un componente por encima de su especificación de fábrica, normalmente subiendo el **multiplicador** (y a veces el voltaje). También se aplica a la memoria y a la gráfica.

- **Ventaja**: más rendimiento por el mismo dinero.
- **Riesgos**: más consumo, más temperatura, posible **inestabilidad** (pantallazos azules, errores), **desgaste acelerado** y, si se sube mucho el voltaje, daño permanente. Puede **anular la garantía**.
- **Requisito básico**: **mejorar la refrigeración**.

Pasos generales: entrar en la BIOS/UEFI, subir el multiplicador poco a poco, comprobar estabilidad y temperaturas con una prueba de estrés, y solo si hace falta subir el voltaje con mucho cuidado.

### ¿Qué procesadores se pueden overclockear?

| | Procesador | Placa base |
|---|---|---|
| **Intel** | Solo los que tienen **K** en el nombre (K, KF, KS): multiplicador desbloqueado | Solo con chipset de la serie **Z** (Z790, Z890…) |
| **AMD Ryzen** | **Todos** los Ryzen de sobremesa están desbloqueados (la X **no** significa "desbloqueado") | Chipsets **B** y **X** (B650, X870…). Los de la serie **A** (A620) no permiten overclocking del procesador |

En los modelos X3D de AMD el overclocking manual está limitado o solo se permite mediante PBO, para proteger la caché apilada.

### Undervolting y PBO: lo que se hace hoy

En la práctica, con procesadores actuales que ya vienen muy ajustados de fábrica, se usa más:

- **Undervolting**: **bajar el voltaje** manteniendo la frecuencia. Se consigue menos temperatura, menos consumo y menos ruido, y a menudo el procesador aguanta más tiempo en turbo, así que puede rendir **igual o más**. Si se baja demasiado, el equipo se vuelve inestable (no se rompe).
- **PBO** (*Precision Boost Overdrive*, AMD): deja que el procesador supere sus límites de potencia de fábrica si la refrigeración lo permite.
- **Curve Optimizer** (AMD): ajusta el voltaje de cada núcleo (undervolting por núcleo).
- **Perfiles de la placa** (por ejemplo, Intel 200S Boost): ajustes predefinidos y validados por el fabricante.

### Turbo frente a overclocking

| | Turbo Boost / Precision Boost | Overclocking |
|---|---|---|
| Quién lo controla | El propio procesador, automáticamente | El usuario, manualmente |
| Dentro de especificación | Sí | No |
| Afecta a la garantía | No | Puede anularla |
| Necesita configurar algo | No | Sí (BIOS) |

---

## 11. Fabricantes, gamas y nomenclatura

### Intel: de "Core i" a "Core Ultra"

Hasta 2023 Intel usaba **Core i3, i5, i7, i9** seguidos de la generación (por ejemplo, i7-13700K = 13.ª generación). Desde finales de 2023 (portátiles) y 2024 (sobremesa) la marca principal es **Intel Core Ultra**:

```
Intel  Core Ultra  7   2   65   K
       ─────────── ─   ─   ──   ─
         marca    gama serie SKU sufijo
```

- **Gama**: 3, 5, 7 o 9 (equivalente a los antiguos i3, i5, i7, i9).
- **Serie / generación**: "2" = Core Ultra Series 2 (2024), "3" = Series 3 (2026)…
- **SKU**: posición dentro de la gama. Más alto = mejor.
- **Sufijo**: tipo de producto (ver tabla).

También existe la marca **Intel Core** sin "Ultra" (Core 3, 5, 7) para modelos más económicos, a menudo basados en arquitecturas anteriores. Los Pentium y Celeron desaparecieron como marca en 2023 y fueron sustituidos por "Intel Processor".

**Sufijos de Intel**

| Sufijo | Significado |
|---|---|
| **K** | Multiplicador **desbloqueado** (overclocking) |
| **F** | **Sin gráfica integrada**: necesita tarjeta gráfica dedicada |
| **KF** | Desbloqueado y sin gráfica integrada |
| **KS** | Edición especial: modelos seleccionados con más frecuencia |
| **T** | Sobremesa de **bajo consumo** (equipos compactos) |
| *(sin sufijo)* | Sobremesa estándar, bloqueado |
| **U** | Portátil de **bajo consumo** (ultraligeros) |
| **H** | Portátil de **alto rendimiento** |
| **HX** | Portátil de **máximo rendimiento** (equipos *gaming* y estaciones móviles) |
| **V** | Portátil Core Ultra 200V (memoria integrada en el encapsulado, muy eficiente) |
| **Plus** | Revisión mejorada de un modelo dentro de la misma serie (p. ej. Core Ultra 7 270K Plus) |

> En generaciones antiguas aparecían otros sufijos como **G** (indicaba el nivel de gráfica integrada en portátiles de 10.ª gen), **HQ** (portátil de alto rendimiento con 4 núcleos), **HK** (portátil de alto rendimiento desbloqueado) o **M** (portátil). Si encuentras uno en un equipo antiguo, búscalo en la ficha oficial.

**Gamas de Intel de sobremesa (orientativo, 2026)**

| Gama | Uso | Núcleos típicos |
|---|---|---|
| Core Ultra 5 | Gama media, juegos, uso general | 14 – 18 |
| Core Ultra 7 | Gama alta, juegos y creación | 20 – 24 |
| Core Ultra 9 | Máximo rendimiento de consumo | 24 |
| Xeon W | Estaciones de trabajo | hasta 60 |
| Xeon 6 | Servidores (sustituye a la antigua división Bronze/Silver/Gold/Platinum) | hasta 288 |

**Generaciones de Intel de sobremesa recientes**

| Generación | Nombre en clave | Año | Socket |
|---|---|---|---|
| 12.ª (Core i) | Alder Lake | 2021 | LGA 1700 |
| 13.ª (Core i) | Raptor Lake | 2022 | LGA 1700 |
| 14.ª (Core i) | Raptor Lake Refresh | 2023 | LGA 1700 |
| Core Ultra 200S | Arrow Lake | 2024 | LGA 1851 |
| Core Ultra 200S Plus | Arrow Lake Refresh | 2026 | LGA 1851 |
| Core Ultra 400 (previsto) | Nova Lake | 2027 | LGA 1954 |

### AMD Ryzen

```
AMD  Ryzen  7   9   7   00   X3D
            ─   ─   ─   ──   ───
           gama gen nivel modelo sufijo
```

- **Gama**: 3, 5, 7, 9.
- **Generación**: primer dígito (1 = 2017 … 9 = Ryzen 9000, 2024).
- **Nivel de rendimiento**: segundo dígito, dentro de la gama.
- **Modelo**: "00", "50"… pequeñas variaciones.
- **Sufijo**: tipo de producto.

**Sufijos de AMD (sobremesa)**

| Sufijo | Significado |
|---|---|
| **X** | Frecuencias más altas (todos los Ryzen están desbloqueados, con o sin X) |
| *(sin sufijo)* | Frecuencias algo menores y menor consumo; a menudo incluyen disipador en la caja |
| **X3D** | Con **3D V-Cache**: mucha más caché L3, especialmente buenos para juegos |
| **XT** | Revisión con algo más de frecuencia |
| **G** | **APU**: con gráfica integrada potente |
| **F** | Sin gráfica integrada |

Ojo con la gráfica integrada en AMD: los Ryzen 7000 y 9000 (AM5) llevan una **gráfica integrada básica** (suficiente para dar imagen y ofimática). En los Ryzen de AM4, en cambio, **solo los modelos G tienen gráfica**: un Ryzen 5 5600X sin tarjeta gráfica **no da imagen**.

En **portátiles**, AMD usa desde 2024 nombres como **Ryzen AI 9 HX 370**: "AI" indica que tiene NPU, y sufijos como **HX** (máximo rendimiento), **HS** o **U** (bajo consumo).

**Gamas de AMD (orientativo, Ryzen 9000)**

| Gama | Núcleos / hilos | Uso |
|---|---|---|
| Ryzen 5 | 6 / 12 | Gama media, juegos |
| Ryzen 7 | 8 / 16 | Gama alta, juegos (los X3D son de lo mejor para jugar) |
| Ryzen 9 | 12 / 24 – 16 / 32 | Creación de contenido, tareas muy paralelas |
| Threadripper 9000 | 24 – 96 núcleos | Estaciones de trabajo y HEDT |
| EPYC 9005 | hasta 192 núcleos | Servidores |

**Generaciones de AMD de sobremesa**

| Serie | Arquitectura | Año | Socket |
|---|---|---|---|
| Ryzen 1000 | Zen | 2017 | AM4 |
| Ryzen 2000 | Zen+ | 2018 | AM4 |
| Ryzen 3000 | Zen 2 | 2019 | AM4 |
| Ryzen 5000 | Zen 3 | 2020 | AM4 |
| Ryzen 7000 | Zen 4 | 2022 | AM5 |
| Ryzen 8000G | Zen 4 (APU) | 2024 | AM5 |
| Ryzen 9000 | Zen 5 | 2024 | AM5 |
| Zen 6 (previsto) | Zen 6 | 2027 | AM5 |

> **Truco**: los números de serie de AMD en portátiles y sobremesa no siempre siguen la misma lógica (por ejemplo, un Ryzen 7000 de portátil puede ser de arquitectura Zen 2, 3 o 4). Ante la duda, **mira la ficha oficial**.

### Estaciones de trabajo y servidores

- **AMD Ryzen Threadripper 9000** (Zen 5): hasta **96 núcleos / 192 hilos**. Socket **sTR5**, con placas **TRX50** (4 canales de memoria) o **WRX90** (versión Pro, 8 canales).
- **AMD EPYC 9005**: hasta **192 núcleos** por procesador, placas de 1 o 2 sockets.
- **Intel Xeon W**: estaciones de trabajo.
- **Intel Xeon 6**: servidores, en versiones con núcleos P (hasta 128) o con núcleos E (hasta 288).

Los procesadores de servidor añaden funciones que un equipo doméstico no necesita: más canales de memoria, memoria **ECC** (corrige errores), muchas más líneas PCIe, soporte para varios sockets y gestión remota.

---

## 12. Sockets, chipsets y compatibilidad

### Socket

El **socket** (zócalo) es el conector de la placa base donde se instala el procesador. Cada familia de procesadores usa un socket concreto, y **un procesador solo encaja en su socket**.

| Tipo | Dónde están los pines | Ejemplos | Precauciones |
|---|---|---|---|
| **LGA** (*Land Grid Array*) | En el **socket** de la placa. El procesador tiene contactos planos | Todos los Intel actuales, AMD AM5, Threadripper, EPYC | **No tocar ni golpear el socket**: un pin doblado puede inutilizar la placa. Mantener la **tapa protectora** hasta instalar la CPU |
| **PGA** (*Pin Grid Array*) | En el **procesador** | AMD AM4 y anteriores | Cuidado al manipular la CPU: los pines se doblan con facilidad. Se pueden enderezar con paciencia |
| **BGA** (*Ball Grid Array*) | El procesador va **soldado** a la placa | Casi todos los portátiles, miniPC, móviles | No se puede cambiar el procesador |

El número del socket suele indicar la cantidad de contactos: LGA 1700 = 1.700 contactos.

### Chipset

El **chipset** es un chip de la placa base que añade conexiones extra (más USB, SATA, líneas PCIe adicionales) y **habilita o limita funciones** como el overclocking. Dentro del mismo socket hay varias gamas de chipset.

| Gama | Intel | AMD |
|---|---|---|
| Básica | H (H610, H810) | A (A620) |
| Media | B (B760, B860) | B (B650, B850, B840) |
| Alta / overclocking | Z (Z790, Z890) | X (X670E, X870E) |
| Empresa | Q, W | PRO |

### Sockets de Intel

| Socket | Años | Procesadores | Chipsets | Memoria |
|---|---|---|---|---|
| **LGA 1151 v1** | 2015-2017 | 6.ª y 7.ª gen (Skylake, Kaby Lake) | Serie 100 y 200 (H110, B150, Z170, B250, Z270…) | DDR4 (y DDR3L) |
| **LGA 1151 v2** | 2017-2019 | 8.ª y 9.ª gen (Coffee Lake) | Serie 300 (H310, B360, H370, Z370, Z390) | DDR4 |
| **LGA 1200** | 2020-2021 | 10.ª y 11.ª gen (Comet Lake, Rocket Lake) | Serie 400 (H410, B460, H470, Z490) y 500 (H510, B560, H570, Z590) | DDR4 |
| **LGA 1700** | 2021-2023 | 12.ª, 13.ª y 14.ª gen | Serie 600 (H610, B660, H670, Z690) y 700 (B760, H770, Z790) | **DDR4 o DDR5 según la placa** |
| **LGA 1851** | 2024-2026 | Core Ultra 200S y 200S Plus | Serie 800 (H810, B860, Z890) | Solo DDR5 |
| **LGA 1954** | 2027 (previsto) | Core Ultra 400 (Nova Lake) | Serie 900 | DDR5 |

**¡Atención al LGA 1151!** Los procesadores de 8.ª/9.ª generación y las placas de 6.ª/7.ª generación tienen **el mismo socket físico pero son incompatibles** eléctricamente. Es el ejemplo perfecto de que **"encaja" no significa "funciona"**.

Tampoco todas las combinaciones dentro de un mismo socket funcionan: por ejemplo, los procesadores de 11.ª generación no son compatibles con las placas H410 y B460.

Históricamente Intel cambia de socket cada **2-3 generaciones**, así que actualizar un Intel suele implicar cambiar también la placa.

### Sockets de AMD

| Socket | Años | Procesadores | Chipsets | Memoria |
|---|---|---|---|---|
| **AM4** (PGA) | 2016-hoy (aún a la venta) | Ryzen 1000, 2000, 3000, 4000G, 5000 | Serie 300 (A320, B350, X370), 400 (B450, X470), 500 (A520, B550, X570) | DDR4 |
| **AM5** (LGA) | 2022-hoy | Ryzen 7000, 8000G, 9000 y futuros Zen 6 | Serie 600 (A620, B650, B650E, X670, X670E) y 800 (B840, B850, X870, X870E) | Solo DDR5 |
| **sTR5** | 2023-hoy | Threadripper 7000 y 9000 | TRX50, WRX90 | DDR5 (4 u 8 canales) |

AMD mantiene sus sockets durante **muchas generaciones**: AM4 ha durado casi diez años y AM5 está previsto que reciba también la siguiente generación. Eso permite **actualizar solo el procesador** conservando placa y memoria.

### La BIOS también cuenta

Aunque procesador, socket y chipset sean compatibles, la placa necesita una **BIOS/UEFI que reconozca el procesador**. Si la placa es anterior al procesador, puede que **haya que actualizar la BIOS antes de instalarlo**. Ejemplos típicos: instalar un Ryzen 5000 en una placa B450, o un Ryzen 9000 en una placa B650 de primera hornada.

Problema: para actualizar la BIOS normalmente hay que arrancar el equipo… con un procesador compatible. Soluciones:

- Muchas placas tienen **BIOS Flashback** (o *Q-Flash Plus*, *Flash BIOS Button*…): se actualiza la BIOS desde un pendrive **sin procesador ni memoria instalados**.
- Usar temporalmente un procesador antiguo compatible.
- Pedir a la tienda que actualice la placa.

### Cómo comprobar la compatibilidad (procedimiento)

1. Mira el **socket** del procesador y de la placa: deben coincidir.
2. Busca la placa en la web del fabricante → apartado **"CPU Support"** (lista de procesadores compatibles). Comprueba que aparece tu procesador y **desde qué versión de BIOS**.
3. Comprueba el **tipo de memoria** (DDR4 o DDR5) que admite la placa.
4. Si quieres overclocking, comprueba el **chipset** (Z en Intel; B o X en AMD).
5. Comprueba que el **disipador** es compatible con el socket (y que cabe en la caja).
6. Si el procesador es **F** o un Ryzen AM4 sin G, asegúrate de que hay **tarjeta gráfica**.
7. Comprueba que el procesador cumple los requisitos del **sistema operativo** (apartado 16).

---

## 13. Refrigeración

Todo el consumo eléctrico del procesador se convierte en **calor**, y hay que sacarlo fuera del chip y fuera de la caja. El camino del calor es:

> **Chip → IHS → pasta térmica → base del disipador → aletas o radiador → aire → fuera de la caja**

### Pasta térmica

Las superficies del IHS y del disipador parecen lisas, pero tienen irregularidades microscópicas que dejan **huecos de aire**, y el aire es muy mal conductor del calor. La **pasta térmica** rellena esos huecos. No es "pegamento" y **no hay que poner mucha**: su función es solo rellenar, no hacer de capa gruesa.

La capacidad de conducir el calor se mide en **W/mK** (vatios por metro y kelvin). Más es mejor, aunque las cifras de los fabricantes suelen ser optimistas y en la práctica las diferencias entre pastas de calidad son de pocos grados.

| Tipo | Cómo es | Conductividad orientativa | Notas |
|---|---|---|---|
| **Cerámica / silicona** | Blanca o gris, base de silicona con polvo cerámico | 1 – 8 W/mK | Barata, segura, **no conduce la electricidad**. Válida para uso normal |
| **Con partículas metálicas o de carbono** | Gris, con óxido de zinc, aluminio, plata, carbono… | 5 – 13 W/mK | Mejor rendimiento. Algunas basadas en plata pueden conducir algo la electricidad |
| **Metal líquido** | Aleación de **galio** (con indio y estaño), líquida a temperatura ambiente | 70 – 80 W/mK | La mejor, pero **conduce la electricidad** (una gota fuera puede provocar un cortocircuito) y **corroe el aluminio**. Solo para expertos |
| **Pad térmico** | Lámina de silicona flexible, de 0,5 a 3 mm | 1 – 15 W/mK (típico 3 – 6) | Para rellenar huecos grandes: memorias de la gráfica, VRM, SSD. No se usa normalmente en la CPU de sobremesa |
| **Material de cambio de fase** (p. ej. PTM7950) | Lámina sólida que se ablanda al calentarse | ≈ 8 W/mK | Muy duradera; cada vez más usada en **portátiles** y consolas |

**Cómo aplicar la pasta**: una gota del tamaño de un **guisante** en el centro (o una línea o una X en procesadores grandes y rectangulares) y la presión del disipador la reparte. Si sobra y rebosa por los lados, has puesto demasiada.

**Cuándo cambiarla**: siempre que se desmonte el disipador (hay que limpiar la vieja con **alcohol isopropílico** y un paño que no deje pelusa) y cuando, con los años, se seca y las temperaturas suben. Muchos disipadores nuevos traen la pasta ya aplicada: si es así, no añadas más.

### Refrigeración por aire

Es la más habitual. Se compone de:

- **Base** de cobre o aluminio en contacto con el procesador.
- **Heat pipes** (tubos de calor): tubos de cobre sellados con un poco de líquido dentro que se **evapora** con el calor de la base, sube hasta las aletas, se **condensa** al enfriarse y vuelve a la base. Transportan el calor mucho mejor que el cobre macizo.
- **Aletas** de aluminio: mucha superficie para ceder el calor al aire.
- **Ventilador** (uno o dos): hace pasar aire entre las aletas.

Tipos:

- **De perfil bajo / "de caja"**: pequeños, los que vienen con algunos procesadores. Suficientes para procesadores de bajo consumo.
- **De torre**: grandes, con varios heat pipes. Los de doble torre de gama alta pueden disipar **más de 250 W** y rivalizar con muchas refrigeraciones líquidas. Ejemplos: Noctua NH-D15, Thermalright Peerless Assassin, DeepCool AK620, Arctic Freezer.

| Ventajas | Inconvenientes |
|---|---|
| Baratos y fiables: lo único que puede fallar es el ventilador, que se cambia fácilmente | Los grandes pueden pesar más de 1 kg y medir más de 16 cm de alto: hay que comprobar que **caben en la caja** y que no tapan los módulos de RAM |
| Fáciles de instalar | Pueden dificultar el acceso a la placa |
| Sin riesgo de fugas | Calientan algo más el interior de la caja |
| Prácticamente sin mantenimiento (limpiar el polvo) | |

Un disipador pesado se sujeta con un **backplate** (placa trasera de refuerzo) detrás de la placa base. No hace falta una placa base especial, pero sí montarlo según las instrucciones y no transportar el equipo con disipadores muy pesados sin sujeción.

### Flujo de aire en la caja (*airflow*)

De poco sirve un gran disipador si el aire caliente se queda dentro de la caja. La regla general:

- **Entrada de aire frío** por el **frontal** (y a veces por abajo).
- **Salida de aire caliente** por la **parte trasera** y el **techo** (el aire caliente sube).
- Procurar que entre algo más de aire del que sale (**presión positiva**): así el aire sale por las rendijas y entra menos polvo.
- Ordenar los cables para no obstaculizar el paso del aire y limpiar los **filtros de polvo** periódicamente.

### Refrigeración líquida AIO (*All In One*)

Es un circuito **cerrado y sellado de fábrica**, listo para montar. Componentes:

- **Bloque con bomba**: se coloca sobre el procesador. Tiene una base de cobre que transfiere el calor al líquido y una bomba que lo hace circular.
- **Tubos**: llevan el líquido caliente al radiador y lo devuelven frío.
- **Radiador** con ventiladores: enfría el líquido. Tamaños habituales: 120, 240, 280 y 360 mm.

**Montaje (resumen)**:

1. Fijar el **radiador y sus ventiladores** a la caja (techo o frontal).
2. Fijar el **bloque-bomba** sobre el procesador (con pasta térmica).
3. Conectar la **bomba** a la cabecera de la placa base para bombas (**AIO_PUMP** o **CPU_FAN**, según el manual) y los **ventiladores** a **CPU_FAN / CPU_OPT** o a un divisor.
4. En la BIOS, comprobar que la bomba funciona a velocidad constante y alta.

**Dónde colocar el radiador**:

- Lo mejor: en el **techo**, expulsando aire.
- En el frontal, mejor con los **tubos abajo**: el aire que pueda haber dentro del circuito se acumula en la parte alta del radiador, lejos de la bomba.
- Lo que hay que evitar: que la **bomba sea el punto más alto** del circuito, porque las burbujas se acumularían en ella y harían ruido y reducirían su vida.

| Ventajas | Inconvenientes |
|---|---|
| Gran capacidad de disipación (las de 280-360 mm son ideales para procesadores de 200-300 W) | Más caras que un disipador por aire equivalente |
| Liberan espacio alrededor del socket y dejan la placa más despejada | La **bomba** puede fallar (es una pieza mecánica) y su vida útil típica es de 5-7 años |
| Estética | Riesgo, pequeño pero real, de **fugas** |
| | Si se estropea la bomba hay que cambiar el conjunto entero |

Las AIO **no necesitan rellenarse**, pero con los años pierden algo de líquido por difusión a través de los tubos. El mantenimiento consiste en limpiar el polvo del radiador y vigilar ruidos de la bomba y temperaturas.

### Refrigeración líquida personalizada (*custom loop*)

Circuito montado a medida, pieza a pieza: **depósito**, **bomba**, **bloque de CPU** (y opcionalmente **bloque de la gráfica**), **radiadores**, **racores** y **tubos** rígidos o flexibles, con un líquido refrigerante específico.

- Es la que **más calor disipa** y permite refrigerar CPU y gráfica en el mismo circuito.
- Es **cara**, compleja de montar, requiere **probar fugas** antes de encender el equipo (prueba de estanqueidad) y necesita **mantenimiento**: cambiar el líquido cada uno o dos años, limpiar bloques, vigilar la evaporación.
- Se usa sobre todo en equipos de entusiastas y *modding*.

Las especificaciones de una bomba incluyen la **altura máxima** que puede elevar el líquido, el **caudal** (litros por hora), la **presión** y las temperaturas de trabajo admitidas.

### Portátiles

En un portátil no hay espacio para disipadores grandes. Se usan **heat pipes o cámaras de vapor** de cobre que llevan el calor de la CPU y la GPU hasta uno o dos pequeños **ventiladores** tipo turbina que expulsan el aire por los laterales o la parte trasera.

- Es muy importante **no tapar las rejillas** (no usarlo sobre la cama o el sofá).
- El polvo acumulado en los ventiladores es la causa más frecuente de sobrecalentamiento.
- Las **bases refrigeradoras** con ventiladores pueden ayudar algo, sobre todo si el portátil toma el aire por debajo.
- En mantenimiento: limpiar ventiladores y cambiar la pasta (o el material de cambio de fase) cada pocos años.

### Refrigeración por inmersión

Se sumergen los servidores completos en un **líquido dieléctrico** (que no conduce la electricidad) dentro de un tanque. El líquido absorbe el calor directamente de los componentes y luego se enfría con un intercambiador.

- Es **muy eficiente** y permite concentrar mucha potencia en poco espacio: se usa en **centros de datos** y en computación de alto rendimiento e inteligencia artificial.
- Es cara de instalar y mantener y requiere fluidos y procedimientos especiales.
- Los fluidos más conocidos eran los **3M Novec**, pero 3M dejó de fabricarlos (a finales de 2025) por los problemas medioambientales de los compuestos PFAS. Hoy se usan otros **fluidos dieléctricos**, como aceites sintéticos y otros fluidos especializados.

### Refrigeración extrema

En competiciones de overclocking se usa **nitrógeno líquido** (−196 °C) vertido en un recipiente metálico sobre el procesador. Solo sirve para batir récords durante minutos: no es un sistema de refrigeración para uso real.

### ¿Qué refrigeración elijo?

| Procesador | Refrigeración recomendada |
|---|---|
| Bajo consumo (≤ 65 W): ofimática, aula | Disipador de serie o torre pequeña |
| Gama media (65 – 150 W) | Torre de un ventilador de calidad |
| Gama alta (150 – 250 W) | Torre de doble ventilador/doble torre o AIO de 240-280 mm |
| Muy alta (> 250 W) o overclocking | AIO de 360 mm o líquida personalizada |

---

## 14. Montaje del procesador paso a paso

> Antes de empezar: trabaja sobre una superficie limpia y despejada, con la placa sobre su caja o su bolsa antiestática, y **descárgate de electricidad estática** (pulsera antiestática conectada a tierra o tocar una superficie metálica conectada a tierra). Monta el procesador, la memoria y el disipador **antes** de meter la placa en la caja: es mucho más cómodo.

### Procesador LGA (Intel y AMD AM5)

1. **Levanta la palanca** del socket y abre el marco de retención. **No retires todavía la tapa de plástico** protectora (en muchas placas sale sola al cerrar el marco).
2. Coge el procesador **por los bordes**, sin tocar los contactos dorados ni el socket.
3. **Oriéntalo**: busca el **triángulo dorado** en una esquina del procesador y la marca correspondiente en el socket, y haz coincidir también las **muescas laterales**.
4. **Déjalo caer** en vertical, sin arrastrarlo ni presionar. Debe asentarse solo.
5. Cierra el marco y **baja la palanca** hasta engancharla. Es normal que haga falta algo de fuerza; si haces muchísima fuerza, algo está mal colocado.
6. **Guarda la tapa protectora**: si algún día hay que devolver la placa, el fabricante la exigirá.

### Procesador PGA (AMD AM4)

1. Levanta la palanca del socket hasta la posición vertical.
2. Haz coincidir el **triángulo** del procesador con el del socket.
3. Deja que el procesador caiga en los agujeros **sin presionar**. Si no entra solo, revisa la orientación y que no haya pines doblados.
4. Baja la palanca.

### Disipador

1. Instala, si hace falta, el **backplate** y los soportes específicos de tu socket (sigue el manual del disipador).
2. Aplica la **pasta térmica** (si el disipador no la trae aplicada) y **retira el plástico protector** de la base del disipador. Es un olvido muy frecuente.
3. Coloca el disipador recto y aprieta los tornillos **en cruz y poco a poco**, para repartir la presión.
4. Conecta el ventilador a la cabecera **CPU_FAN** de la placa. Si no hay nada conectado a CPU_FAN, muchas placas muestran un aviso o no arrancan.
5. Comprueba que el disipador no tapa los slots de memoria ni roza otros componentes.

### Alimentación

Conecta a la placa el cable **EPS de 8 pines (CPU)** de la fuente (en algunas placas hay dos). No lo confundas con el cable **PCIe** de la gráfica: parecen similares pero no son intercambiables.

### Primer arranque

1. Entra en la **BIOS/UEFI** y comprueba que reconoce el **modelo de procesador**, la **memoria** y que la **temperatura** de la CPU es razonable (30-50 °C).
2. Verifica que el ventilador de la CPU (o la bomba) gira y que la placa lee sus revoluciones.
3. Activa, si se necesita, la **virtualización** (VT-x/AMD-V, a veces llamada *SVM Mode*) y el perfil de memoria (**XMP/EXPO**).
4. Si la BIOS es antigua, **actualízala**.
5. Una vez instalado el sistema, haz una **prueba de estrés** corta vigilando las temperaturas.

### Errores típicos

- No quitar el **plástico** de la base del disipador.
- Poner **demasiada pasta** o ninguna.
- **Pines doblados** por manipular la CPU o el socket sin cuidado.
- Olvidar el cable **EPS** de la CPU.
- Ventilador conectado en otra cabecera (por ejemplo, SYS_FAN) → aviso de "CPU Fan Error".
- Procesador sin gráfica integrada y monitor conectado a la salida de vídeo de la placa.
- Placa con BIOS antigua que no reconoce el procesador → el equipo enciende pero **no da imagen**.

---

## 15. Diagnóstico y mantenimiento

### Herramientas de software

| Herramienta | Para qué |
|---|---|
| **CPU-Z** | Identificar el procesador: modelo, socket, núcleos, hilos, caché, frecuencia, multiplicador, instrucciones. También placa y memoria |
| **HWiNFO** | Información completa del sistema y **sensores**: temperaturas, voltajes, consumo, velocidad de ventiladores |
| **Administrador de tareas** (Windows) | Uso de CPU por núcleo, frecuencia actual, virtualización habilitada |
| **Cinebench** | Prueba de rendimiento (multinúcleo y un núcleo) y de estrés corta |
| **OCCT / Prime95** | Pruebas de estrés intensas para comprobar **estabilidad** y temperatura máxima |
| **Core Temp** | Temperaturas de cada núcleo, de forma sencilla |
| **`lscpu`, `sensors`** (Linux) | Información del procesador y de los sensores |
| **Herramientas del fabricante** | Intel Processor Diagnostic Tool, AMD Ryzen Master |

### Síntomas habituales y posibles causas

| Síntoma | Posibles causas relacionadas con la CPU |
|---|---|
| El equipo se apaga de golpe al hacer algo exigente | Sobrecalentamiento (disipador mal montado, sin pasta, ventilador parado, polvo) o fuente insuficiente |
| Va lento cuando lleva un rato trabajando | *Thermal throttling* por mala refrigeración |
| Pantallazos azules o cuelgues aleatorios | Overclocking o undervolting inestable, BIOS desactualizada, voltajes incorrectos, procesador degradado |
| Enciende, los ventiladores giran, pero no hay imagen | BIOS no compatible con el procesador, CPU sin gráfica integrada, procesador mal asentado, pines doblados, memoria |
| Aviso "CPU Fan Error" al arrancar | Ventilador desconectado o en otra cabecera, o placa que no lee las revoluciones de la bomba |
| Ruido alto y constante | Ventilador sucio o desgastado, curva de ventiladores mal ajustada, bomba AIO con aire |

Muchas placas tienen **LEDs de diagnóstico** (CPU, DRAM, VGA, BOOT) o un **display de códigos POST** que indican en qué fase se detiene el arranque. Consulta el manual de la placa para interpretarlos.

### Mantenimiento preventivo

- **Limpiar el polvo** de disipadores, radiadores, ventiladores y filtros de la caja (aire comprimido o pera de aire, sujetando los ventiladores para que no giren).
- **Revisar temperaturas** de vez en cuando, por ejemplo con HWiNFO.
- **Cambiar la pasta térmica** cuando se desmonte el disipador o cuando las temperaturas suban sin otra causa (cada pocos años en equipos muy usados).
- **Actualizar la BIOS/UEFI** cuando haya correcciones de estabilidad o seguridad (con el equipo conectado a un SAI si es posible: un corte durante la actualización puede inutilizar la placa).
- En AIO, vigilar el **ruido de la bomba**; en líquida personalizada, cambiar el líquido según el fabricante.

---

## 16. Cómo elegir un procesador

### Según el uso

| Perfil | Qué buscar | Ejemplo de enfoque |
|---|---|---|
| **Ofimática, aula, navegación** | 4-6 núcleos, gráfica integrada, bajo consumo | Core Ultra 5 o Ryzen 5 de gama de entrada, o incluso un APU (Ryzen G) |
| **Juegos** | Buen rendimiento por núcleo, 6-8 núcleos, mucha caché | Ryzen 7 X3D, Core Ultra 5/7 K; invertir más en la gráfica que en la CPU |
| **Edición de vídeo, 3D, programación** | Muchos núcleos e hilos | Ryzen 9, Core Ultra 7/9 |
| **Virtualización / laboratorio** | Muchos núcleos, VT-x/AMD-V, soporte de mucha RAM | Ryzen 9, Core Ultra 9; para varios usuarios, Threadripper o servidor |
| **Servidor de empresa** | Fiabilidad, memoria ECC, gestión remota, varios sockets | Xeon, EPYC |
| **Portátil** | Eficiencia, autonomía, NPU si se usará IA | Sufijo U/V para autonomía; H/HX para potencia |

### Más allá del procesador

- **Plataforma**: la CPU decide el socket, y con él la placa y el tipo de memoria. Valora el coste **total**.
- **Vida de la plataforma**: AM5 permite actualizar el procesador sin cambiar la placa durante varias generaciones; en Intel suele ser necesario cambiar la placa antes.
- **Gráfica integrada**: si no vas a poner tarjeta gráfica, evita los modelos F (Intel) y los Ryzen AM4 sin G.
- **Disipador incluido**: muchos procesadores de gama alta **no lo traen**.
- **Consumo**: un procesador más eficiente necesita menos refrigeración y una fuente menor.
- **Precio/rendimiento**: consulta comparativas y rankings **actualizados**, porque los precios cambian cada pocos meses (ver apartado 20).

### Requisitos de Windows 11

Windows 10 dejó de recibir soporte gratuito el 14 de octubre de 2025, así que muchas empresas e institutos están migrando. Windows 11 exige, entre otros:

- Procesador de **64 bits** compatible: en la práctica, Intel de **8.ª generación** o posterior y AMD **Ryzen 2000** o posterior (hay una lista oficial de procesadores compatibles).
- **TPM 2.0** (en los procesadores modernos va integrado: se activa en la BIOS como *Intel PTT* o *AMD fTPM*).
- **Arranque seguro (*Secure Boot*)** y UEFI.
- 4 GB de RAM y 64 GB de almacenamiento como mínimo.

Para un técnico es fundamental saber **comprobar si un equipo es compatible** (herramienta *Comprobación de estado del PC* de Microsoft) y qué activar en la BIOS.

### Los "PC con IA"

Microsoft llama **Copilot+ PC** a los equipos con una **NPU de al menos 40 TOPS**, que permiten funciones de IA de Windows ejecutadas en local. Cumplen este requisito, por ejemplo, los Intel Core Ultra 200V y Series 3, los AMD Ryzen AI 300 y los Qualcomm Snapdragon X. Para la mayoría de usuarios actuales no es imprescindible, pero es un criterio cada vez más presente en los catálogos.

---

## 17. Glosario

| Término | Definición |
|---|---|
| **ALU** | Unidad aritmético-lógica. Realiza operaciones con enteros y lógicas |
| **AIO** | Refrigeración líquida "todo en uno", cerrada y sellada |
| **APU** | Procesador de AMD con gráfica integrada potente (sufijo G) |
| **BCLK** | Reloj base de la placa (100 MHz). Frecuencia de la CPU = BCLK × multiplicador |
| **BGA** | Procesador soldado a la placa |
| **BIOS / UEFI** | Firmware de la placa base que inicializa el hardware y arranca el sistema |
| **Caché** | Memoria rápida dentro de la CPU que guarda copias de los datos más usados |
| **CCD / IOD** | En AMD, chiplet de núcleos / chiplet de entrada-salida |
| **Chipset** | Chip de la placa base que añade conexiones y determina funciones |
| **Chiplet / tile** | Cada uno de los chips que forman un procesador "a trozos" |
| **E-core / P-core** | Núcleo de eficiencia / de rendimiento en arquitecturas híbridas |
| **EPS** | Conector de alimentación de 8 pines de la CPU |
| **FPU** | Unidad de coma flotante (números decimales) |
| **FSB** | Antiguo bus entre CPU y placa base. Obsoleto |
| **Heat pipe** | Tubo de cobre con líquido que transporta calor por evaporación y condensación |
| **Hilo (*thread*)** | Flujo de instrucciones que el sistema puede asignar a un núcleo |
| **iGPU** | Gráfica integrada en el procesador |
| **IHS** | Tapa metálica del procesador que reparte el calor |
| **IMC** | Controlador de memoria integrado en la CPU |
| **IPC** | Instrucciones por ciclo: trabajo que hace un núcleo en cada ciclo |
| **ISA** | Juego de instrucciones de una arquitectura (x86-64, ARM…) |
| **LGA / PGA** | Socket con pines en la placa / pines en el procesador |
| **Microcódigo** | Pequeño programa interno de la CPU que se puede actualizar con la BIOS |
| **Multiplicador** | Factor por el que se multiplica el BCLK para obtener la frecuencia |
| **NPU** | Unidad de procesamiento neuronal para tareas de IA |
| **Núcleo (*core*)** | Unidad de proceso completa dentro de la CPU |
| **Overclocking** | Hacer funcionar un componente por encima de su especificación |
| **PBO** | *Precision Boost Overdrive*: ajuste automático de límites en AMD |
| **PL1 / PL2** | Límites de potencia sostenida y turbo en Intel |
| **PPT** | Límite de potencia real del procesador en AMD |
| **SIMD** | Una instrucción que opera con muchos datos a la vez |
| **SMT / Hyper-Threading** | Tecnología que permite a un núcleo atender dos hilos |
| **SoC** | Chip que integra CPU, GPU, memoria y más (móviles, portátiles) |
| **Socket** | Zócalo de la placa donde se instala el procesador |
| **TDP** | Calor que debe disipar la refrigeración (no es exactamente el consumo máximo) |
| **Thermal throttling** | Bajada automática de frecuencia por exceso de temperatura |
| **Tjmax** | Temperatura máxima de funcionamiento del procesador |
| **TOPS** | Billones de operaciones por segundo; mide la potencia de una NPU |
| **Turbo / Boost** | Subida automática de frecuencia cuando hay margen térmico y de consumo |
| **Undervolting** | Bajar el voltaje manteniendo la frecuencia |
| **VRM** | Reguladores de la placa que alimentan a la CPU |
| **X3D / 3D V-Cache** | Procesadores AMD con caché L3 apilada |

---

## 18. Preguntas frecuentes

**¿Un procesador de 8 núcleos es el doble de rápido que uno de 4?**
Solo en programas que aprovechan bien todos los núcleos (renderizado, compresión de vídeo…), y ni siquiera exactamente el doble. En muchos juegos y en ofimática la diferencia es pequeña.

**¿Qué es mejor, más GHz o más núcleos?**
Depende del uso. Para tareas de un solo hilo importan la frecuencia y el IPC; para tareas paralelas, los núcleos. Y recuerda que los GHz solo se pueden comparar dentro de la misma arquitectura.

**Mi procesador marca 0,8 GHz en el Administrador de tareas, ¿está estropeado?**
No: cuando no hay trabajo baja la frecuencia para ahorrar energía. Al abrir algo exigente subirá enseguida.

**¿Por qué mi Core Ultra tiene 24 núcleos y 24 hilos, si el i9 anterior tenía 24 núcleos y 32 hilos?**
Porque Intel eliminó el Hyper-Threading en los Core Ultra 200S. Cada núcleo atiende un solo hilo, y los núcleos son más eficientes.

**¿Puedo poner un procesador Intel en una placa AMD o al revés?**
No. Usan sockets y chipsets totalmente distintos.

**¿Si el procesador encaja en el socket, funcionará?**
No necesariamente. Puede no ser compatible con el chipset (caso LGA 1151) o necesitar una BIOS más nueva. Mira siempre la lista de compatibilidad de la placa.

**¿Hace falta mucha pasta térmica para que enfríe mejor?**
No. Con una cantidad del tamaño de un guisante basta. Demasiada pasta empeora la transferencia y puede ensuciar el socket.

**¿Es peligroso que el procesador llegue a 90 °C?**
Algunos procesadores modernos están diseñados para trabajar cerca de su límite en cargas intensas. No es peligroso porque se protegen solos, pero sí indica que rendirían más con mejor refrigeración. Si llega a esa temperatura en reposo o con tareas ligeras, hay un problema.

**¿La refrigeración líquida es siempre mejor que la de aire?**
No. Un buen disipador de doble torre rinde como muchas AIO de 240 mm, es más barato y más fiable. La líquida compensa en procesadores muy potentes, en cajas donde no cabe una torre grande o por estética.

**¿Hacer overclocking estropea el procesador?**
Subir solo el multiplicador con buena refrigeración suele ser seguro, pero subir mucho el voltaje acelera el desgaste. Además puede anular la garantía. El undervolting es mucho más seguro.

**¿Qué pasa si arranco el ordenador sin disipador?**
El procesador se calentará en segundos y se apagará para protegerse. No lo hagas: con algunos modelos antiguos podía llegar a dañarse.

**¿Qué diferencia hay entre un Ryzen 7 9700X y un 9800X3D?**
Ambos tienen 8 núcleos, pero el X3D tiene mucha más caché L3 gracias a la 3D V-Cache, lo que lo hace notablemente mejor en juegos. Es más caro.

**¿Necesito una NPU?**
Hoy, para la mayoría de usuarios, no es imprescindible. Sirve para funciones de IA en local con poco consumo (efectos de videollamada, transcripción, búsqueda inteligente).

---

## 19. Actividades propuestas

1. **Identifica tu procesador.** En un equipo del aula, usa CPU-Z y HWiNFO y anota: modelo, socket, núcleos, hilos, frecuencia base y actual, multiplicador, BCLK, cachés L1/L2/L3, instrucciones (¿tiene AVX2? ¿VT-x?) y temperatura en reposo.
2. **Descifra el nombre.** Explica qué significa cada parte de: Intel Core Ultra 7 265KF, AMD Ryzen 7 9800X3D, Intel Core i5-12400F, AMD Ryzen 5 5600G, AMD Ryzen AI 9 HX 370.
3. **Compara dos fichas.** Elige dos procesadores (uno Intel y uno AMD de precio similar) y compáralos con sus fichas oficiales: núcleos/hilos, frecuencias, caché, consumo, socket, memoria admitida y gráfica integrada.
4. **Configura tres equipos.** Con una tienda online, elige procesador, placa y disipador compatibles para: (a) un equipo de aula de ofimática, (b) un equipo para juegos y (c) un pequeño servidor de virtualización. Justifica la elección y comprueba la compatibilidad en la web del fabricante de la placa.
5. **¿Es compatible?** Para cada caso, indica si funcionaría y por qué: Core i7-9700K en una placa Z270; Ryzen 5 5600X en una B450 con BIOS de 2018; Core Ultra 5 245K en una B760; Ryzen 7 9700X en una B650; Core i5-12400F sin tarjeta gráfica.
6. **Prueba de temperaturas.** Ejecuta Cinebench durante 10 minutos y registra con HWiNFO la temperatura, la frecuencia y el consumo. ¿Hay *thermal throttling*?
7. **Montaje y cambio de pasta.** Desmonta el disipador de un equipo de prácticas, limpia la pasta vieja, aplica pasta nueva, vuelve a montar y compara las temperaturas antes y después.
8. **Windows 11.** Comprueba si los equipos del aula cumplen los requisitos de Windows 11. Si no, ¿qué se podría activar en la BIOS y qué no tiene solución?

---

## 20. Enlaces y recursos

**Fichas técnicas oficiales**

- Intel – especificaciones de procesadores (ARK): https://www.intel.com/content/www/us/en/ark.html
- Intel – significado de los números de procesador: https://www.intel.com/content/www/us/en/processors/processor-numbers.html
- AMD – especificaciones de procesadores: https://www.amd.com/es/products/specifications/processors.html
- Microsoft – procesadores compatibles con Windows 11: https://learn.microsoft.com/es-es/windows-hardware/design/minimum/windows-processor-requirements

**Comparativas y rankings (siempre actualizados)**

- PassMark CPU Benchmarks: https://www.cpubenchmark.net/
- Tom's Hardware – CPU Benchmarks Hierarchy: https://www.tomshardware.com/reviews/cpu-hierarchy,4312.html

**Herramientas**

- CPU-Z: https://www.cpuid.com/softwares/cpu-z.html
- HWiNFO: https://www.hwinfo.com/
- Cinebench: https://www.maxon.net/es/cinebench
- OCCT: https://www.ocbase.com/

**Listas de procesadores**

- Lista de procesadores Intel (Wikipedia): https://en.wikipedia.org/wiki/List_of_Intel_processors
- Lista de procesadores AMD Ryzen (Wikipedia): https://en.wikipedia.org/wiki/List_of_AMD_Ryzen_processors

**Vídeos de clase**

- Pasta térmica: https://youtu.be/Gsm02mt30vU
- Refrigeración por aire: https://youtu.be/OjHbL1Oa0aM?t=366 y https://youtu.be/DaW03ZP_7U8?t=80
- Refrigeración líquida: https://www.youtube.com/watch?v=yiCtC-1hvD8 y guía de montaje de Arctic: https://support.arctic.de/lf2-360r4
- Refrigeración por inmersión: https://www.youtube.com/watch?v=U6LQeFmY-IU

> *Los datos de mercado (modelos, sockets y fechas) están actualizados a octubre de 2026. Los productos "previstos" pueden cambiar: consulta siempre la información oficial del fabricante.*
