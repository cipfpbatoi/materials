# Arrencada del sistema
- [Arrencada del sistema](#arrencada-del-sistema)
  - [Introducció](#introducció)
  - [Arrencada del sistema amb BIOS](#arrencada-del-sistema-amb-bios)
  - [Arrencada del sistema amb UEFI](#arrencada-del-sistema-amb-uefi)
  
## Introducció
Ja sabem que per a poder utilitzar un ordinador ha de tindre un sistema operatiu i que la CPU només pot executar programes que estiguen en memòria. Però la memòria RAM és volàtil, és a dir, sense electricitat (al apagar l'ordinador) s'esborra el seu contingut. Per al arrancar l'ordinador no hi ha cap programa en memòria i necessitem carregar el sistema operatiu. Quan volem executar un programa el sistema operatiu s'encarrega de buscar-lo en el disc i carregar-lo en la RAM per a que es puga executar, però ¿qui pot al arrancar carregar el sistema operatiu?

La solució és incloure en la placa base un xip amb memòria ROM (que no s'esborra a l'apagar l'ordinador) amb un programa que inicia els passos per a carregar el sistema operatiu en la RAM. Les plaques base per a PC tenen dos tipus de xip amb el firmware per a carregar el sistema:
* **BIOS**: és el mètode que s'ha utilitzat des dels primers PCs. Permet carregar el sistema des de un disc dur formatjat amb taula de particions **MsDOS** (o **MBR**), a més que des de dispositius extraïbles (CD, USB, etc) o des de la xarxa
* **UEFI**: és el nou mètode que s'inclou en tots els equips moderns. Pot funcionar com una BIOS (mode _Legacy BIOS_) o bé carregar el sistema operatiu des d'un disc dur amb taula de particions **GPT** (sistema de particionat més modern) a més que des de dispositius extraïbles o la xarxa.

El procés de carregar el S.O. tindrà vàries fases:
1. El firmware (i altres xicotets programes en el cas de la BIOS) carreguen en la RAM el programa carregador del S.O.
2. Aquest carregador del S.O. és un programa que carrega en la RAM el kernel i tot el que necessita el S.O. per a funcionar
3. Comença a executar-se el S.O. carregat en la RAM i l'ordinador ja està preparat per a funcionar normalment i rebre ordres de l'usuari

Aquest procés tarda alrededor d'un minut en els sistemes operatius moderns, encara que en els servidors pot tardar varis minuts.

Ara anem a vore en detall el procés d'[arrencada del sistema amb BIOS](./bios.md) (o amb UEFI funcionant en mode _Legacy BIOS_) i el procés d'[arrencada del sistema amb UEFI](./uefi.md#arrencada-amb-bios).

## [Arrencada del sistema amb BIOS](./bios.md)

## [Arrencada del sistema amb UEFI](./uefi.md)