Taula de particions Ms-DOS
Encara és el format de particionament més utilitzat en els PCs que tenen uns anys però els nous equips ja porten normalment el format GPT. Aquest format s'anomena normalment MBR o Ms-DOS.

El primer sector del disc dur és especial i no podem utilitzar-lo per a guardar informació. Es diu Master Boot Record (MBR). En la resta de sectors és on emmagatzemem informació després de fer les particions.

MBR
El Master Boot Record (MBR) és el primer sector d'un dispositiu d'emmagatzematge de dades, com un disc dur. Conté la taula de particions que indica quines particions hi ha en el dispositiu i normalment també s'empra per a l'arrencada del sistema operatiu. El seu contingut és 446 bytes que contenen al programa que iniciarà la càrrega del S.O. i 64 bytes amb la taula de particions.



La taula de particions conté 4 registres de 16 bytes, amb informació de les 4 particions primàries:partició: si és la partició activa, el seu format, la seua grandària, etc.

Tipus de particions
Hi ha 3 tipus diferents de particions:

Primària: com a màxim només poden haver 4 d'aquest tipus en un disc. Un disc físic sense dividir consisteix en realitat en una partició primària que ocupa tot l'espai del disc
Estesa: permet superar el límit de 4 particions primàries. Una de eixes 4 particions es pot convertir en partició estesa que és només un contenidor dins del qual es poden crear tantes particions lògiques com vulgam. Solament pot existir una partició d'aquest tipus per disc (si hi ha partició estesa només podira haver com a màxim 3 particions primàries)
Lògica: ocupa un tros de partició estesa o la totalitat de la mateixa i podem fer totes les que necessitem. Alguns sistemes operatius tenen certes restriccions amb aquestes particions (per exemple no es recomana el seu ús per a instal·lar els sistemes operatius Windows).
Particions

En la imatge anterior podem veure un disc dur de 233 GB particionat de la següent manera:

Una partició primària de 55 GB amb sistema d'arxius NTFS
Una partició estesa de 96 GB que te en el seu interior 2 particions lògiques:
Una de 46 GB amb sistema d'arxius NTFS
Altra de 50 GB també amb sistema NTFS
Una partició primària de 28 GB amb sistema d'arxius ext4
Altra partició primària de 54 GB també amb sistema d'arxius ext4
Noms de les particions
En Windows, a les particions o unitats se'ls assigna una lletra seguida pel signe de dos punts (per exemple C:). Peró només a les particions amb sistema d'arxius NTFS o FAT, la resta són ignorades.

En sistemes basats en Unix (com Gnu/Linux), cada disc té un nom de tipus sdX (el 1r disc es diu sda, el 2n disc sdb, etc). Cada partició rep el nom del disc seguit d'un número que indica quina partició és dins del disc. Per exemple la partició sda1 és la 1a partició del 1r disc, sda2 és la 2a partició del 1r disc i sdb1 és la 1a partició del 2n disc. Les particions primàries (i la estesa) tenen números de l'1 al 4 i les particons lògiques números a partir del 5 (la primera partició lògica del primer disc es diria sda5).

Veure les nostres particions
En Windows podem veure els diferents discos i particions que tenim al nostre equip des de l'Administrador de disc que trobem dins d'Adminstracío d'equips(en el següent bloc veurem com treballar amb aquesta eina)



Des de la terminal podem treballar amb els discos amb els comandos FDISK (per a discos MBR) o DISKPART (per a discos MBR o GPT)

En el cas de GNU/Linux cada distribució inclou la seua pròpia eina gràfica de gestió de discos i particions (Utilitat de discos en Ubuntu, Discos en Mint, ...).


Discos en Linux Mint (CC0)
Des de la terminal en tots els sistemes podem veure els discos i particions de l'equip amb els comandos fdisk -l (per a discos MBR) o parted (per a discos MBR o GPT). Cal se administrador per a poder executar aquestes ordres.

Còpia de seguretat del MBR
En UNIX es pot fer una còpia i restaurar el MBR des de la consola. Ho farem amb l'ordre dd que copia els bytes indicats del dispositiu d'entrada (especificat per if) en el dispositiu d'eixida (especificat per of).

Per a fer la còpia de seguretat, executarem:

dd if=/dev/sda of=mbr.backup bs=512 count=1
Estem dient-li que del dispositiu /dev/sda (és a dir el primer disc dur SATA, si volem altre canviarem això) copie al dispositiu d'eixida (el fitxer mbr.backup que després haurem de guardar en un USB o altre lloc) 1 bloc (count=1) de 512 bytes (bs=512).

Per a restaurar-lo:

dd if=mbr.backup of=/dev/sda
Si el nostre disc utilitza el sistema GPT en compte de l'MBR (ho veurem en el pròxim apartat) i volem fer una còpia de seguretat de l'arrencada del disc hem de copiar els primers 63 sectors del disc (que equivalen al primer cilindre del disc) i no només el primer sector. La instrucció seria:

dd if=/dev/sda of=mbr_63.backup count=63
Per a esborrar el contingut de l'MBR podem posar els bytes del MBC a zero (però no tot el MBR perquè perdríem també la taula de particions).

dd if=/dev/zero of=/dev/sda bs=446 count=1
En els sistemes operatius de Microsoft no podem accedir a l'MBR.
