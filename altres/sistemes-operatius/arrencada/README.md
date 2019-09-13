# Arrencada del sistema
## Introducció
Ja sabem que per a poder utilitzar un ordinador ha de tindre un sistema operatiu i que la CPU només pot executar programes que estiguen en memòria. Però la memòria RAM és volàtil, és a dir, sense electricitat (al apagar l'ordinador) s'esborra. Per tant tenim el problema de que al arrancar no hi ha cap programa en memòria i necesitem tindre el sistema operatiu. ¿Cóm fer-ho?

La solució és incloure en la placa base un xip amb memòria ROM (que no s'esborra a l'apagar l'ordinador) amb un programa que inicia els passos per a carregar el sistema operatiu en la RAM. Les plaques base per a PC tenen dos tipus de xip amb el firmware per a carregar el sistema:

BIOS: és el mètode que s'ha utilitzat des dels primers PCs. Permet carregar el sistema des de un disc dur formatjat amb taula de particions MsDOS (o MBR), a més que des de dispossitius extraïbles (CD, USB, etc) o des de la xarxa
UEFI: és el nou mètode que s'inclou en tots els equips moderns. Permet carregar el sistema operatiu des d'un disc dur amb taula de particions MsDOS (és compatible amb la BIOS) o amb GPT (sistema de particionat més modern) a més que des de dispossitius extraïbles o la xarxa
El procés de carregar el S.O. tindrà vàries fases:

El firmware (i altres xicotets programes en el cas de la BIOS) carreguen en la RAM el programa carregador del S.O.
Aquest carregador del S.O. és el programa que carrega en la RAM el kernel i tot el que necessita el S.O. per a funcionar
Comença a executar-se el S.O. carregat en la RAM i l'ordinador ja està preparat per a funcionar normalment i rebre ordres de l'usuari
Aquest procés tarda alrededor d'un minut en els sistemes operatius moderns, encara que en els servidors pot tardar varis minuts
