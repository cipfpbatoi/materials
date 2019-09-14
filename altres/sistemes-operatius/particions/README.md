# Particionament de discos
Encara que podem instal·lar el sistema operatiu en un medi extraïble com una memòria USB el més normal és fer-ho en el disc dur de l'ordinador. En l'unitat de treball 2 del bloc 1 vam veure que un disc dur està format per plats, cilindres, pistes i sectors però en realitat el sistema operatiu el veu com si fos una sèrie de clústers consecutius.

Per a utilitzar un disc prèviament l'hem de particionar, és a dir, hem de fer particions (al menys una) en ell. Una partició de disc és cada part en que es divideix un disc. Quan particionem un disc, els sistemes operatius reconeixen l'únic disc físic com un conjunt de discos lògics, a tots els efectes, independents. Per tant cada partició tindrà el seu propi sistema d'arxius que gestiona com es guarden els fitxers en eixa partició. El particionament del nostre disc podem fer-lo a priori amb alguna eina de particionat, o durant el procés d'instal·lació del sistema operatiu. Però abans de fer la instal·lació és molt recomanable tindre clar quines particions haurem de fer en el nostre disc.

Des del naixement del PC en els anys 80 el mètode de particionatment utilitzat per a particionar el disc era l'anomenada Taula de particions Ms-DOS o MBR. Però des de fa uns anys un nou mètode que millora l'anterior va substituint-lo: la Taula de particions GUID o GPT (GUID Partition Table).



Per què utilitzar particions
Hi ha moltes raons per a tindre més d'una partició al nostre disc dur:

Dos sistemes operatius no poden coexistir en la mateixa partició. Per tant si volem tindre instal·lat més d'un S.O. (per exemple un Windows i un Gnu/Linux) hem de fer al menys una partició per a cadascun d'ells.
També és molt recomanable tindre el programari i les dades en particions diferents per seguretat. Així si hem de formatjar i reinstal·lar el sistema operatiu les dades no es veuran afectades.
Alguns sistemes d'arxius (p.e. versions antigues de sistemes FAT) tenen grandàries màximes menors que la grandària real del nostre un disc, per la qual cosa hem de particionar el disc en particions amb mida igual o inferior a la mida màxima permesa pel sistema d'arxius per a poder-lo utilitzar.
Es pot fer una imatge de la partició que utilitzem per al sistema operatiu i el programari i guardar-la en altra partició del disc dur. Així si el nostre ordinador deixa de funcionar o no ho fa correctament podem fàcilment restaurar la imatge guardada i tornem a tindre'l com el primer dia. Això és molt freqüent en els portàtils i en equips amb Windows 8 o posterior en un disc GPT.
Es pot guardar una còpia de seguretat de les dades de l'usuari en altra partició del mateix disc, per a evitar la pèrdua d'informació important. Aquesta opció no es molt recomanable perquè si s'estropeja el disc sencer es perdria també la còpia.
En alguns sistemes operatius aconsellen més d'una partició per a funcionar, com per exemple, la partició d'intercanvi (swap) en els sistemes operatius basats en Linux, o recomanen distribuir la instal·lació del sistema operatiu i/o programari addicional en particions diferents.
