# La placa base

**Módulo:** Montaje y Mantenimiento de Equipos (MME) — 1º SMR

**RA1:** Selecciona los componentes de integración de un equipo microinformático estándar, describiendo sus funciones y comparando prestaciones de diferentes fabricantes.

**Índice**

---

## 1. ¿Qué es la placa base y por qué es tan importante?

La **placa base** (placa madre, motherboard) es el circuito impreso central del ordenador: a ella se conectan **todos** los demás componentes (procesador, memoria, almacenamiento, tarjetas de expansión, periféricos...).

Es la pieza que **condiciona todo lo demás**, porque determina tres cosas clave:

| Decisión que toma la placa base | Qué limita |
|---|---|
| **Socket** (zócalo del procesador) | Qué procesadores se pueden instalar |
| **Chipset** | Qué memoria, qué velocidad de PCIe, cuántos puertos USB/SATA, si se puede hacer overclock |
| **Factor de forma** | En qué torres/cajas cabe y cuántas ranuras de expansión tiene |

> 💡 **Idea clave:** antes de comprar cualquier otro componente, hay que decidir la placa base, porque ella "veta" o "permite" todo lo demás.

### ¿Cómo se elige una placa base? (checklist)

1. **Uso del equipo**: oficina, gaming, diseño/edición, servidor...
2. **Presupuesto**
3. **Compatibilidad**: socket del procesador elegido + tipo de RAM (DDR4/DDR5) que admite
4. **Factor de forma**: debe encajar en la caja disponible
5. **Ampliabilidad futura**: ¿el socket/chipset seguirá recibiendo generaciones nuevas de CPU?
6. **Conectividad necesaria**: ¿Wi-Fi/Bluetooth integrados? ¿cuántos USB? ¿necesita RAID?
7. **Overclock**: ¿se quiere exprimir el procesador? Entonces hace falta chipset y placa que lo permitan (ver apartado de chipset)

---

## 2. Factor de forma (form factor)

Determina el tamaño físico de la placa y, por tanto, en qué caja entra y cuántas ranuras de expansión/memoria caben.

| Factor de forma | Año / origen | Dimensiones aprox. | Uso típico |
|---|---|---|---|
| Standard-ATX | Intel, 1995 | 305 × 244 mm | Torres de sobremesa/estación de trabajo |
| Micro-ATX | Intel, 1997 | 244 × 244 mm | Equipos compactos |
| Mini-ITX | VIA, 2001 | 170 × 170 mm | Equipos muy compactos |
| Nano-ITX / Pico-ITX / Mobile-ITX | VIA, 2003–2009 | de 120×120 a 60×60 mm | Sistemas embebidos |

*(Estos formatos siguen siendo los estándar actuales; no ha habido cambios relevantes en esta parte.)*

---

## 3. Sockets: cómo se conecta la CPU a la placa

### 3.1 Tipos de contacto físico

| Tipo | Significado | Cómo funciona |
|---|---|---|
| **PGA** (Pin Grid Array) | Matriz de pines | Los **pines están en la CPU** y se insertan en los agujeros del zócalo. Históricamente usado por AMD (AM4 y anteriores). |
| **LGA** (Land Grid Array) | Matriz de contacto | Los **pines están en el zócalo de la placa**; la CPU solo tiene contactos planos. Usado por Intel desde hace años y ahora también por AMD (AM5 en adelante). |
| **BGA** (Ball Grid Array) | Matriz de bolas | La CPU se **suelda directamente** a la placa (sin zócalo). Más barato y compacto, pero sin posibilidad de cambiar el procesador. Habitual en portátiles y equipos de bajo coste. |

### 3.2 Evolución de sockets — Intel (resumen actualizado)

| Socket | Generación de CPU | Año | Notas |
|---|---|---|---|
| LGA 1156 / 1155 / 1150 | Nehalem → Haswell | 2009–2013 | Ya en desuso, útiles solo como contexto histórico |
| LGA 1151 (dos revisiones incompatibles entre sí) | 6ª–9ª gen (Skylake a Coffee Lake Refresh) | 2015–2019 | La revisión 1 (6ª/7ª gen) y la revisión 2 (8ª/9ª gen) **no son intercambiables** aunque el zócalo tenga el mismo nombre |
| LGA 1200 | 10ª y 11ª gen (Comet Lake / Rocket Lake) | 2020–2021 | Chipsets serie 400 y 500 |
| **LGA 1700** | 12ª, 13ª y 14ª gen (Alder Lake, Raptor Lake, Raptor Lake Refresh) | 2021–2023 | Chipsets serie 600 y 700 (Z690/Z790, B660/B760, H610/H710...). Soporta DDR4 **o** DDR5 según placa |
| **LGA 1851** | Core Ultra serie 200 "Arrow Lake" | desde octubre de 2024 | Chipsets **serie 800** (Z890, B860, H810). Solo DDR5. Incompatible físicamente con LGA 1700 (más pines) |

### 3.3 Evolución de sockets — AMD

| Socket | CPU compatibles | Año | Notas |
|---|---|---|---|
| AM4 (PGA) | Ryzen serie 1000 a 5000 | 2016–2022 | Socket muy longevo, gran punto a favor de AMD en su día |
| **AM5** (LGA) | Ryzen serie 7000, 8000 y **9000** | desde 2022 | AMD abandona PGA y pasa a LGA. Solo DDR5. Chipsets iniciales: X670E/X670/B650E/B650/A620 |
| Chipsets AM5 **más recientes** | Ryzen 9000 (y compatibles con 7000/8000) | desde 2024 | Se añaden **X870E, X870, B850 y B840**, con más ancho de banda PCIe 5.0 y soporte USB4 |

### ⭐ 3.4 Qué debes recordar

- El **socket** define compatibilidad física CPU–placa.
- El **chipset** (aunque use el mismo socket) puede limitar funciones: overclock, memoria RAM máxima, número de puertos, versión de PCIe...
- Un mismo nombre de socket **no garantiza compatibilidad entre generaciones** (ver caso LGA 1151 rev.1 vs rev.2).
- Estas tablas quedan obsoletas en 1–2 años: lo importante es que sepan **buscar la información actualizada** (web del fabricante), no memorizar modelos concretos.

---

## 4. El chipset

### 4.1 Qué es

Conjunto de chips de la placa base que gestionan el flujo de información entre CPU, memoria, almacenamiento y periféricos. Determina:

- Qué tipo y cantidad de memoria RAM se admite
- Cuántos puertos USB/SATA/M.2 hay disponibles
- Si se puede hacer overclock de CPU/RAM
- Cuántos carriles PCIe hay disponibles y de qué versión

### 4.2 Evolución de la arquitectura

- **Antes:** el chipset se dividía en dos chips: **Northbridge** (puente norte, conectaba CPU, RAM y gráfica de alta velocidad) y **Southbridge** (puente sur, conectaba USB, SATA, audio...).
- **Actualmente:** el puente norte ha desaparecido. Sus funciones (memoria y PCIe de la gráfica) se han integrado **directamente en el procesador**. Lo que queda del chipset es, en esencia, el antiguo puente sur, renombrado como:
  - **PCH** (Platform Controller Hub) en Intel
  - **FCH** (Fusion Controller Hub) en AMD

Esto reduce la distancia entre CPU y memoria/gráfica, mejorando el rendimiento.

### 4.3 Otros chips de la placa (xontenido de ampliación)

- **Super I/O**: chip "ayudante" subordinado al chipset, gestiona funciones de baja velocidad (teclado, ratón, puertos seriales/paralelos, disquetera en equipos antiguos).
- **LPC (Low Pin Count)**: bus mediante el cual el Super I/O y la BIOS se comunican con el chipset. Está siempre activo, incluso con el equipo apagado.
- **eSPI (Enhanced Serial Peripheral Interface)**: evolución moderna del bus LPC, usada en placas actuales.
- **BMC (Baseboard Management Controller)**: chip de gestión remota presente en placas de servidor, permite monitorizar y administrar el equipo aunque esté apagado. *(Contenido de ampliación, no imprescindible en 1º SMR.)*

### ⭐ 4.4 Qué debes recordar

- gestiona la transferencia de información entre CPU, RAM y periféricos
- determina los componentes que podemos tener en nuestra placa y su rendimiento
- antes _**northbridge/southbridge**_
- ahora NB integrado en procesador y al SB se llama **PCH** (Intel) o **FCH** (AMD)

---

## 5. Memoria RAM: ranuras y evolución

### 5.1 Formato físico de módulo

El formato físico de las placas de memoria RAM se llama DIMM y son unos pequeños circuitos con chips de RAM soldados en ellos. Existe una versión más estrecha usada en portátiles llamada SO-DIMM (_Small Outline DIMM_).

| Módulo | Uso |
|---|---|
| **DIMM** | Módulo estándar para sobremesa |
| **SO-DIMM** | Versión reducida para portátiles y mini-PCs |

### 5.2 Tecnología de la RAM: DDR

La tecnología usada para intercambiar información se llama **DDR** (_Double Data Rate_). Existen varias generaciones de memoria DDR:

| Generación | Voltaje aprox. | Contactos DIMM | Nota |
|---|---|---|---|
| DDR | 2,5 V | 184 | En desuso |
| DDR2 | 1,8 V | 240 | En desuso |
| DDR3 | 1,5 V | 240 | Todavía en equipos antiguos |
| DDR4 | 1,2 V | 288 | Muy extendida hasta hace poco (LGA1200/1700, AM4) |
| **DDR5** | 1,1 V | 288 | **Estándar actual** en las plataformas nuevas (LGA1700/1851, AM5) |

**Diferencias clave DDR4 → DDR5:**
- Duplica el tamaño de ráfaga de datos (de 8 a 16).
- Cada módulo tiene **2 canales internos** de 40 bits (antes 1 canal de 72 bits).
- El regulador de voltaje (**PMIC**) pasa de estar en la placa base a estar **dentro del propio módulo**, lo que facilita el overclock de memoria pero también hace los módulos algo más caros de fabricar.
- Velocidades muy superiores: mientras DDR4 se movía entre 1600–3200 MT/s, DDR5 arrancaba en 4800 MT/s y hoy en día (2026) existen módulos certificados muy por encima de esa cifra en placas de gama alta.

### 5.3 Dual/triple/cuádruple canal

Permite acceder simultáneamente a varios módulos de RAM, ampliando el ancho de banda (p. ej. de 64 a 128 bits en dual channel). Requisitos:

1. Controlador de memoria compatible (hoy integrado en la CPU, no en el chipset).
2. Módulos del mismo tipo, capacidad y velocidad.
3. Instalación en las ranuras correctas indicadas por el fabricante (normalmente pares alternos).

### 5.4 Memorias de propósito especial (contenido de ampliación)

- **LPDDR / DDR de bajo voltaje**: usadas en portátiles y dispositivos de bajo consumo, soldadas al SoC.
- **HBM2 / HBM2E**: memoria apilada en 3D usada en tarjetas gráficas (AMD/Hynix), no en la placa base del PC.

### ⭐ 5.5 Qué debes recordar

- EL formato físico de los módulos de RAM es DIMM o SO-DIMM
- El tipo de memoria es DDR y en la actualidad se usa la DDR5 (aunque aún se usa bastante la DDR4)
- Muchos controladores permiten usar la tecnología _Dual Channel_ (o triple o cuadruple) para poder acceder a varios DIMM de RAM simultáneamente

---

## 6. Ranuras de expansión

### 6.1 Evolución histórica (para dar contexto, no para memorizar)

ISA → MCA/EISA → VLB → **PCI** → AGP → **PCI Express (PCIe)**

- **PCI** (1992): bus compartido de 32/64 bits, muy extendido durante años.
- **AGP**: bus dedicado exclusivamente a la tarjeta gráfica, ya en desuso, sustituido por PCIe x16.
- **PCI Express (desde 2004)**: bus en serie, por "carriles" (x1, x4, x8, x16...). Ha sustituido a PCI y AGP en todo.

### 6.2 PCI Express: lo importante hoy

Cada nueva versión de PCIe **duplica** el ancho de banda por carril respecto a la anterior:

| Versión | Ancho de banda por carril (aprox.) | Año |
|---|---|---|
| PCIe 1.x | 250 MB/s | 2003 |
| PCIe 2.x | 500 MB/s | 2007 |
| PCIe 3.x | ~1 GB/s | 2010 |
| PCIe 4.0 | ~2 GB/s | 2017 |
| PCIe 5.0 | ~4 GB/s | 2019 (llega al mercado masivo desde 2021–2022) |
| **PCIe 6.0** | ~8 GB/s | especificación cerrada en 2022; empieza a verse en almacenamiento empresarial/servidores, aún no en placas de consumo en 2026 |

Las placas actuales usan casi exclusivamente ranuras **PCIe** (x16 para gráfica, x1/x4 para tarjetas de expansión y M.2 para SSD), y solo por motivos de compatibilidad puntual se sigue viendo algún PCI clásico en placas muy antiguas.

---

## 7. BIOS / UEFI

| | BIOS | UEFI |
|---|---|---|
| Qué es | Firmware básico de entrada/salida | Evolución moderna del firmware |
| Interfaz | Texto, muy limitada | Gráfica, con ratón, más funciones |
| Arranque | Solo discos MBR | Soporta discos **GPT**, arranque más rápido y seguro (Secure Boot) |
| Configuración guardada en | Memoria CMOS alimentada por pila | Memoria flash (más grande y rápida) |

> Hoy en día, **prácticamente todas** las placas base nuevas usan UEFI (aunque coloquialmente se le siga llamando "la BIOS").

---

## ⭐ 8. Resumen

Antes de elegir una placa base hay que mirar, en este orden:

1. **Socket** → ¿es compatible con el procesador que quiero?
2. **Chipset** → ¿permite lo que necesito (overclock, RAID, memoria máxima)?
3. **Tipo y velocidad de RAM soportada** (hoy, casi siempre DDR5)
4. **Factor de forma** → ¿cabe en mi caja?
5. **Ranuras de expansión y M.2** → ¿tengo suficientes para lo que quiero instalar?
6. **Conectividad** (USB, red, Wi-Fi/Bluetooth)
