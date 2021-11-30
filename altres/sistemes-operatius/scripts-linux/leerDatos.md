# Llegir dades d'un fitxer
Hi ha vàries formes de fer un bucle que recorra un fitxer per a llegir les seues línies. Vorem com fer-ho amb `for` i amb `while`.

## Bucle for
Recorre una variable amb vàries línies i en cada iteracció guarda la línia en una nova variable. Exemple:
```bash
#!/bin/bash

dades=$(cat /etc/passwd) 
for linia in $dades
do
    echo $linia
done
echo "Procès finalitzat"
```

O podem estalviar-nos la variable _dades_ amb:
```bash
#!/bin/bash

for linia in $(cat /etc/passwd)
do
    echo $linia
done
echo "Procès finalitzat"
```

## Bucle while
Pot llegir directament d'un fitxer si redireccionem la seua entrada:
```bash
#!/bin/bash

while read linia
do
    echo $linia
done < /etc/passwd
echo "Procès finalitzat"
```

A més si es un arxiu amb camps delimitats podem obtindre directament el valor de cada camp indicant el seu del·limitador amb `IFS`:
```bash
#!/bin/bash

while IFS=: read user pass uid gid info home shell
do
    echo USUARI: $user
    echo home: $home
    echo ==========
done < /etc/passwd
echo "Procès finalitzat"
```
