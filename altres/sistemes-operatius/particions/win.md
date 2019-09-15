
## Particions en Windows
### Instal·lar Windows amb BIOS+MBR
Al instal·lar Windows es creen per defecte 2 particions, amb sistema de fitxers NTFS:
* Una partició de 500 MB on estaran els fitxers d'arrencada de Windows (BootMGR, BDC, ...) que no es muntarà per a que l'usuari no els puga esborrar
* La partició del sistema, amb la resta d'espai del disc, on estarà el sistema operatius i també es guardaran les dades

Si no hem fet particions prèviament amb _GParted_ o altra eina, al començament de la instal·lació de Windows ens pregunta on volem instal·lar el sistema:

![](./img/.png)

Si simplement pulsem el botó 'Següent' Windows crearà les dos particions comentades abans. Totes dos seran primàries.

![](./img/.png)

Per a crear nosaltres les particions que vulguem (per exemple per a separar sistema i dades) utilitzem el botó de 'Nova' i especifiquem la mida de la partició a crear (en MB). Si volem eliminar una partició creada la seleccionem i premem el botó de 'Eliminar'. Al crear la partició apareix un missatge que ens diu que es crearà automàticament la xicoteta partició d'arrencada (per tant no hem de crear-la nosaltres). Les particions creades son totes primàries (des d'ací Windows només ens deixa crear aquest tipus de partició):

![](./img/.png)


Si volem poder crear més particions (primàries, amb sistema de fitxers NTFS) per a dades. Quan tinguem fetes les particions seleccionarem la partició en la qual instal·lar el sistema operatiu i premem el botó Següent.

Instal·lació amb UEFI en disc GPT
Per a particionar el disc amb GPT en la finestra de particionat premem la tecla Shift+F10 per a obrir una terminal i executem el programa diskpart per a crear les particions que vulguem (altra opció més senzilla és crear prèviement les particions amb alguna eina com GParted). Els comandos a executar són:

diskpart
select disk 0
clean
convert gpt
exit
El que hem fet és executar doskpart, seleccionar el primer disc, eliminar la taula de particions, crear una taula de particions GPT i eixir de diskpart. Ara des de la finestra gràfica crearem les particions on instal·lar Windows.

En el cas de instal·lar Windows 8/10 en un disc GPT Microsoft recomana fer les següents particions:

Particions Windows en disc GPT
Fuente: Microsoft
La partició de imatge de recuperació és opcional però recomanada. L'us de cada partició és el següent:

Windows RE Tools partition (> 300 MB, NTFS): conté eines de recuperació i la imatge winre.wim
EFI System Parttion, ESP (>100 MB, FAT32): és la partició EFI
Microsoft Reserved Partition, MSR (128 MB, cap): per a gestionar el disc
Partició de Windows (> 20 GB, NTFS): la partició on s'instal·la el sistema operatiu i, si no hi ha partició de dades, on estan les dades de l'usuari. És la partició que veu i utilitza l'usuari
OPCIONAL: Altres particions de dades
Partición de Recuperación (>2G , NTFS): partició de recuperació que inclou la imatge install.wim
Per defecte les particions que crea el programa instal·lador de Windows 10 Pro en un disc GPT de 150 GB són les següents:


Particions Windows 10 (CC0)
