# RA4 – Implantació de maquinari específic de Centres de Procés de Dades (CPD)
- [RA4 – Implantació de maquinari específic de Centres de Procés de Dades (CPD)](#ra4--implantació-de-maquinari-específic-de-centres-de-procés-de-dades-cpd)
  - [1. Concepte de Centre de Procés de Dades (CPD)](#1-concepte-de-centre-de-procés-de-dades-cpd)
  - [2. Tipus de CPD](#2-tipus-de-cpd)
    - [CPD local (on-premise)](#cpd-local-on-premise)
    - [CPD al núvol (cloud)](#cpd-al-núvol-cloud)
    - [CPD híbrid](#cpd-híbrid)
    - [Edge Data Center](#edge-data-center)
    - [Micro-CPD](#micro-cpd)
  - [3. Racks i formats de servidor](#3-racks-i-formats-de-servidor)
    - [Servidor torre](#servidor-torre)
    - [Servidor rack (1U, 2U, 4U)](#servidor-rack-1u-2u-4u)
    - [Servidors blade](#servidors-blade)
    - [Appliances hiperconvergents](#appliances-hiperconvergents)
  - [4. Maquinari específic de servidor](#4-maquinari-específic-de-servidor)
    - [Processadors](#processadors)
    - [Memòria RAM](#memòria-ram)
    - [Emmagatzematge](#emmagatzematge)
    - [Xarxa](#xarxa)
    - [Alimentació](#alimentació)
  - [5. Sistemes d’alimentació i SAI](#5-sistemes-dalimentació-i-sai)
    - [SAI (UPS)](#sai-ups)
    - [Redundància elèctrica](#redundància-elèctrica)
  - [6. Refrigeració i eficiència energètica](#6-refrigeració-i-eficiència-energètica)
  - [7. Cablejat estructurat](#7-cablejat-estructurat)
  - [8. Seguretat física en CPD](#8-seguretat-física-en-cpd)
  - [9. Gestió i monitoratge remot](#9-gestió-i-monitoratge-remot)
  - [10. Infraestructura Convergent i Hiperconvergent](#10-infraestructura-convergent-i-hiperconvergent)
    - [Infraestructura Convergent](#infraestructura-convergent)
    - [Infraestructura Hiperconvergent](#infraestructura-hiperconvergent)
  - [11. Automatització i tendències actuals](#11-automatització-i-tendències-actuals)
  - [12. Aplicacions pràctiques del CPD](#12-aplicacions-pràctiques-del-cpd)
  - [13. Documentació tècnica obligatòria](#13-documentació-tècnica-obligatòria)
  - [14. Conclusió](#14-conclusió)


## 1. Concepte de Centre de Procés de Dades (CPD)

Un **Centre de Procés de Dades (CPD)**, també anomenat *Data Center*, és una instal·lació especialment dissenyada per allotjar i operar tots els sistemes informàtics crítics d’una organització. En un CPD es concentren:

- Servidors
- Sistemes d’emmagatzematge
- Infraestructura de xarxa
- Sistemes d’alimentació elèctrica
- Sistemes de refrigeració
- Sistemes de seguretat física i lògica

L’objectiu principal d’un CPD és garantir que els serveis informàtics funcionen de manera **contínua (24/7), segura, escalable i fiable**. Qualsevol fallada en un CPD pot provocar aturades de servei, pèrdua de dades i greus pèrdues econòmiques.

---

## 2. Tipus de CPD

Actualment, els CPD poden classificar-se en diferents tipus segons la seua ubicació i model d’ús:

### CPD local (on-premise)
És el CPD que es troba dins de les instal·lacions de l’empresa. L’organització té un control total sobre el maquinari, la seguretat i les dades. Requereix una inversió inicial elevada i personal especialitzat.

### CPD al núvol (cloud)
Les empreses utilitzen CPD de proveïdors com **Amazon AWS, Microsoft Azure o Google Cloud**. No cal infraestructura pròpia, però es perd control directe sobre el maquinari.

### CPD híbrid
Combina infraestructura pròpia amb serveis al núvol. És el model més utilitzat actualment per la seua flexibilitat.

### Edge Data Center
Són petits CPD ubicats prop del lloc on es generen les dades (IoT, 5G, indústria 4.0). Redueixen latència i milloren rendiment.

### Micro-CPD
CPD compactes per a PIMEs o delegacions, amb un o dos racks, refrigeració integrada i seguretat bàsica.

---

## 3. Racks i formats de servidor

Els **racks** són armaris metàl·lics normalitzats que permeten allotjar tot el maquinari del CPD de manera ordenada. L’amplària estàndard és **19 polzades** i l’alçada es mesura en **unitats U**, on:

- 1U = 4,45 cm d’alçada
- Els racks habituals són de 42U a 48U

Els principals **formats de servidor** són:

### Servidor torre
Té un aspecte similar a un PC de grans dimensions. S’utilitza habitualment en oficines xicotetes.

### Servidor rack (1U, 2U, 4U)
Dissenyat per muntar-se dins del rack. És el format més comú als CPD. Com més petit és el format, major és la densitat de servers.

### Servidors blade
Funcionen dins d’un xassís que proporciona alimentació, refrigeració i xarxa comuna. Permeten una altíssima densitat de càlcul.

### Appliances hiperconvergents
Són servidors especials que integren càlcul, emmagatzematge i xarxa dins del mateix equip, pensats per a infraestructures modernes virtualitzades.

---

## 4. Maquinari específic de servidor

Els servidors utilitzen components molt diferents als d’un PC convencional.

### Processadors
Actualment s’utilitzen principalment:
- **Intel Xeon Scalable de quarta generació**
- **AMD EPYC Genoa i Bergamo**

Aquests processadors destaquen per:
- Gran nombre de nuclis (32, 64 o més)
- Execució massiva de fils
- Grans memòries cau
- Suport multi-socket

### Memòria RAM
La memòria utilitzada és **DDR5 ECC Registered**, que:
- Corregeix errors automàticament
- Millora l’estabilitat
- Evita bloquejos del sistema
- Pot arribar a capacitats de diversos terabytes

### Emmagatzematge
Els sistemes moderns utilitzen:
- **SSD NVMe PCIe 4.0 i 5.0**
- **Discs SAS de 12–24 Gb/s**
- **Cabines SAN All-Flash**
- Sistemes distribuïts com **Ceph o vSAN**

### Xarxa
Actualment és habitual trobar:
- 10, 25, 40 i 100 GbE
- Duplexitat total
- Bonding i redundància
- VLANs i QoS integrats

### Alimentació
Els servidors incorporen:
- Fonts d’alimentació redundants hot-swap
- PDU intel·ligents
- Alimentació trifàsica
- Integració amb SAI

---

## 5. Sistemes d’alimentació i SAI

Un CPD no pot dependre únicament de la xarxa elèctrica convencional. Per això s’utilitzen:

### SAI (UPS)
Són sistemes d’alimentació ininterrompuda que permeten:
- Mantindre els servidors actius durant un tall elèctric
- Apagar-los correctament si el tall és llarg

Els més utilitzats en CPD són els **SAI Online de doble conversió**, perquè ofereixen tensió totalment estable.

### Redundància elèctrica
Es treballa amb esquemes:
- **N+1**: un element de reserva (per exemple, 3 SAI si són necessaris 2)
- **2N**: duplicació total de tots els elements crítics
- Línies A i B d’alimentació

Per exemple, un hospital tindrà:
- Xarxa elèctrica normal
- Grup electrògen
- Dos SAI
- Servidors amb doble font

Se va la llum del barri:
- El generador entra
- El SAI cobreix el temps d'arrencada del generador
- Els servidors ni s'apaguen

---

## 6. Refrigeració i eficiència energètica

Els CPD generen una gran quantitat de calor. Per això es fan servir:

- Sistemes HVAC (_Heating, Ventilation, Air Conditioning_) intel·ligents
- Passadissos freds i calents
- Free cooling (aprofitar l’aire exterior quan fa fresc)
- Refrigeració líquida directa al xip (DLC) en servidors d’alt rendiment (AI, GPU)

La temperatura recomanada és:
- Entre **18 °C i 27 °C**
- Humitat entre **40 % i 60 %**

El HVAC inclou unitats de aire condicionat industrials, conductes d'aire, filtres d'aire, sensors de temperatura i humitat i sistemes de control automàtic.

---

## 7. Cablejat estructurat

El cablejat permet la interconnexió de tots els equips del CPD.

Es distingeix entre:
- **Coure (Cat6A, Cat7)**
- **Fibra òptica (OM4, OS2)**

Bones pràctiques:
- Etiquetatge
- Organització amb guies
- Separació de cables d’alimentació i dades

---

## 8. Seguretat física en CPD

La seguretat física és fonamental i inclou:

- Control d’accés amb targeta o biometria
- Videovigilància 24/7
- Detecció d’incendis
- Sistemes d’extinció amb gas inert (FM-200, Novec)
- Detecció d’inundacions

---

## 9. Gestió i monitoratge remot

Tots els servidors moderns incorporen un sistema BMC:

- iLO (HP)
- iDRAC (Dell)
- IPMI genèric

Permeten:
- Control remot encara que el servidor estiga apagat
- Accés a consola
- Actualització de BIOS
- Monitoratge de temperatures, fonts i ventiladors

---

## 10. Infraestructura Convergent i Hiperconvergent

### Infraestructura Convergent
Integra servidors, cabines SAN i xarxa en un sistema validat pel fabricant. Ofereix molt de rendiment, però té alt cost i complexitat.

### Infraestructura Hiperconvergent
Integra càlcul, emmagatzematge i xarxa en cada node. Tot es gestiona per software. És més escalable, flexible i econòmica.

Actualment, la hiperconvergència és el model més utilitzat en virtualització.

---

## 11. Automatització i tendències actuals

- Infraestructura com a codi (Ansible, Terraform)
- Virtualització massiva
- Núvol privat
- Kubernetes i contenidors
- Edge Computing
- Green IT i eficiència energètica

---

## 12. Aplicacions pràctiques del CPD

El maquinari de CPD s’utilitza per:
- Servidors de virtualització
- Sistemes de còpies de seguretat
- Servidors web i bases de dades
- Emmagatzematge corporatiu
- Telefonia IP
- Infraestructures de núvol privat

---

## 13. Documentació tècnica obligatòria

Tot CPD ha de disposar de:
- Inventari de maquinari
- Plànols de racks
- Diagrama de xarxa
- Esquema elèctric
- Procediments de recuperació

---

## 14. Conclusió

El maquinari de CPD és:
- Especialitzat
- Crític
- Costós
- Imprescindible per al funcionament de l’empresa

El tècnic ASIR ha de saber:
- Identificar-lo
- Instal·lar-lo correctament
- Mantindre’l
- Documentar-lo

---

