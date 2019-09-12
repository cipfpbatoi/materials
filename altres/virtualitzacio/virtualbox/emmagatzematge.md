# [Virtualbox](./README.md)

## Emmagatzematge en VirtualBox

La part més important del nostre sistema és el disc dur virtual on el tenim instal·lat. Aquest disc portar és un fitxer que es guarda en la màquina real amb extensió **vdi** en la carpeta del nostre directori d'inici denominada **VirtualBox VMs**.

VirtualBox pot treballar amb discos de VMware (amb extensió **vmdk**) i fins i tot crear un nou disc dur amb aqueix format (ens pregunta el format a l'hora de crear un nou disc).

Un qüestió important en crear un nou disc dur és si ho volem d'expansió dinàmica o de mesura fixa. Nosaltres sempre triarem la primera opció que vol dir que el fitxer vdi que es crea no tindrà tota la mesura del disc portar creat sinó que tindrà només l'espai necessari per a funcionar, que anirà augmentant-se segons la màquina vaja necessitant més espai.

![Administrador de medis virtuals](./img/adm-med-virt.md)

En aquest cas des de l'Administrador de mitjans virtuals podem veure la mesura virtual del disc (la que es pensa que té la màquina virtual i el màxim que podria arribar a tindre) i la mesura real del disc que és la que ocupa el fitxer vdi en el disc dur real.

Hem de tindre sempre en compte que aquest disc va creixent segons la màquina virtual necessita més espai i per tant ha de tindre espai en el disc portar real on créixer perquè si s'omple el disc portar real pot desbaratar-se el disc dur virtual.

### Tipus del disc dur
Un altre aspecte que podem configurar és el tipus de disc dur que crearem. En la configuració de la nostra màquina virtual, dins de l'apartat d'emmagatzematge, apareixen les unitats de disc i CD que té la nostra màquina. Des d'ací podem en qualsevol moment afegir un nou disc portar a la nostra màquina igual o llevar-li algú dels quals té.

Igual que en un PC real, quan afegim un disc dur a la nostra màquina hem de triar entre un disc SATA, IDE, SCSI, ...

Si optem per un disc SATA no cal configurar res, igual que passa en la realitat, sinó simplement afegir el disc i indicar en quin port SATA es troba (del 0 al 29).

En el cas dels discos IDE hem d'indicar si serà el primari o el secundari i dins de cadascun si és el mestre o l'esclau (recordeu que normalment en un PC hi ha 2 connectors IDE, un anomenat primari i l'altre secundari, i que en cadascun podem connectar fins a 2 dispositius, el mestre i l'esclau).

![Disc SATA](./img/disco-sata.md)

Per a afegir un disc a un controlador existent (IDE o SATA) seleccionem el controlador i en les icones que apareixen a la dreta triem si volem afegir un dispositiu de CD/DVD o un nou disc portar al controlador.

També tenim en la part inferior de l'arbre d'emmagatzematge una icona per a afegir un nou controlador que pot ser SCSI, SAS o de disquette a més de IDE o SATA.

![SATA Controller](./img/control-sata.md)

NOTA: si en una màquina virtual hem instal·lat un sistema operatiu en un disc configurat com IDE (o SATA) i després l'arranquem en una màquina on està configurat com SATA (o IDE) el sistema podria no arrancar correctament.

### Clonar un disc dur
Des de l'administrador de mitjans virtuals podem veure tots els discos durs que estem utilitzant en les nostre màquines o que tenim preparats per a utilitzar-se.

A vegades volem fer una còpia d'un disc existent per a tindre una segona màquina virtual (per exemple si necessitem 2 clients Windows 7 no té sentit instal·lar i configurar el sistema en cada màquina sinó que ho fem una vegada i després “copiem” el disc dur ja creat).

Per a fer això no podem simplement copiar el fitxer vdi que constitueix el disc dur de la màquina perquè cada disc és únic i té un codi que l'identifica, el seu UUID. En intentar afegir el nou disc vdi a VirtualBox obtindrem un missatge d'error indicant que ja tenim un disc portar amb aqueix UUID. El que hem de fer és “clonar” el disc dur de manera que tenim una còpia igual del mateix però amb diferent identificador. Podem fer-ho des de l'_Administrador de mitjans virtuals_ amb la primera icona (_'Copiar'_) o des del `menú Medi -> Copiar`.

### Canviar el CD
En qualsevol moment podem canviar el CD que tenim en la unitat de CD sense necessitat d'apagar la màquina virtual, des del `menú Dispositius -> Unitats òptiques` de la màquina.

## [La Xarxa en Virtualbox](./xarxa.md)

## [Snapshots](./snapshots.md)
