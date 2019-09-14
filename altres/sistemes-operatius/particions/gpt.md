## Taula de Particions GUID o GPT
La _GUID Partition Table_ (GPT) és un estàndard de particionament d'un disc dur que vol solucionar les limitacions de l'MBR. MBR només permet fer 4 particions primàries (per això posteriorment es van crear les particions lògiques) però GPT permet fins a 128 particions primàries en un disc. En MBR la mida màxima d'una unitat són 2,2 TB front als 9,4 ZB que permet direccionar GPT.

Altra diferència és que GPT usa la manera de direccionament lògic (LBA, logical block addressing) en lloc de l'antic model cilindre-cap-sector (CHS) usat amb el MBR (què és el primer sector del cilindre 0 del cap 0).

També es diferencien en que l'MBR comença amb el codi d'arrencada mestre (Master Boot Code), que conté un programa executable que identifica la partició activa i inicia el procés d'arrencada. La GPT no té res d'això perquè es el propi firmware, anomenat EFI (que subtitueix a la antiga BIOS) qui conté el codi del gestor d'arrencada de primer nivell.

### Estructura de GPT
Mentre que MBR ocupa el primer sector del disc la GPT ocupa els primers 34 sectors (encara que podrien ser més). A més està repetida en els últims sectors del disc per si s'estopejara la taula primària.



En el primer sector del disc, LBA 0, trobem l'MBR heretat. El seu propòsit és evitar que utilitats de disc basades en MBR no reconeguen o desbaraten discos basats en GPT. En l'MBR heretat s'especifica l'existència d'una única partició, que abasta tota la unitat GPT.

En el segon sector, LBA 1 i repetit en l'últim, trobem la capçalera GTP que defineix els blocs de disc que poden ser utilitzats per l'usuari. També conté el GUID del disc (Globally Unique Identifier, Identificador Global Únic).

En els sectors següents (a partir del LBA 2 fins al 33 -o més- i repetit al final) està la taula de particions. De cada partició indiquen el GUID per a la partició, el començament i final de la partició, el nom de la partició i altres atributs.

NOTA: en un disc dur formatjat amb GPT el comando fdisk no pot veure les particions. En el seu lloc utilitzarem el comando parted. Per exemple per a veure les particions del primer disc dur amb MBR farem:

    fdisk -l /dev/sda
però si el disc dur està formatjat amb GPT hem de fer:

    parted /dev/sda /print
