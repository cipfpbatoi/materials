# Scripts en GNU/Linux
- [Scripts en GNU/Linux](#scripts-en-gnulinux)
  - [Introducció](#introducció)
  - [Variables](#variables)
  - [Pas de paràmetres](#pas-de-paràmetres)
  - [Estructura condicional "if"](#estructura-condicional-if)
    - [Anidació de sentències "if"](#anidació-de-sentències-if)
  - [Estructura condicional "case"](#estructura-condicional-case)
  - [Els bucles](#els-bucles)
    - [El bucle "for"](#el-bucle-for)
    - [El bucle "while"](#el-bucle-while)
    - [El bucle "until"](#el-bucle-until)
    - ["break" i "continue"](#break-i-continue)
  - [Llegir dades d'un fitxer](#llegir-dades-dun-fitxer)
  - [Funcions](#funcions)
  - [Altres sentències útils](#altres-sentències-útils)


## Introducció
Un script és un fitxer de text que conté un comando en cada línia. Executar un script equival a escriure en la consola els comandos que conté un darrere l'altre.

Per a crear un script en GNU/Linux simplement obrim un editor de text i escrivim el seu codi, per exemple:
```bash
#!/bin/bash
echo "Hola, Mundo!"
```

Aquest scrit simplement mostra per consola el text "Hola, Mundo!". La primera linia sempre indica el _shell_ o intèrpret de comandos que volem que execute aquest script.

Ara el guardem amb el nom que vulguem i extensió **.sh**.

Per a executar-lo tenim 2 opcions:
- li ho pasem com a paràmetre d'un _shell_, per exemple:
```bash
bash script1.sh
```
- li donem al fitxer permisos d'execució i l'executem directament, però incloent la seua ruta:
```bash
chmod a+x script1.sh
./script1.sh
```

## Variables
Podem definir variables asignant-les un valor:
```bash
nom="Juan"
edat=25
```

Per a accedir al seu contingut anteposem al seu nom el caràcter **$**:
```bash
echo "$nom te $edat anys"
```

Podem incloure comentaris anteposant el símbol **#**.

Per a demanar un valor a l'usuari utilitzem `read`:
```bash
echo "Escriu el teu nom"
read nom
# El que ha escrit l'usuari es guarda en la variable nom
echo "Hola $nom"
```

## Pas de paràmetres
Quan executem un scrip podem pasar-li paràmetres des de la línia de comandos. Aquest paràmetres es guardaran en unes variables anomenades `$1` per al primer, `$2` per al segon, etc.

En la variable `$*` tenim tots els paràmetres junts i en `$#` el compte dels paràmetres pasats. 

Per exemple, si execute `./lista_nombres.sh Juan Marta Eva Pep` sobre el següent script:
```bash
echo "El primer nom és $1"
echo "El tercer nom és $3"
echo "Has pasat $# paràmetres, que són $*"
```

el resultat serà:
```
El primer nom és Juan
El tercer nom és Eva
Has pasat 4 paràmetres, que són Juan Marta Eva Pep
```

## Estructura condicional "if"
L'estructura de control `if` s'utilitza per prendre decisions basades en una condició. Si la condició especificada és certa, s'executa un bloc de codi i si no, s'executa un altre bloc de codi o es salta completament. La forma bàsica d'una sentència `if` és la següent:
```bash
if [ condició ]
then
  # Codi a executar si la condició és certa
else
  # Codi a executar si la condició és falsa
fi
```

La `condició` en un "if" pot ser qualsevol expressió que retorni un valor cert o fals. Pots utilitzar operadors i comparadors per construir condicions. Alguns dels més comuns que pots utilitzar són:

1. **Operadors de comparació**:
   - `-eq`: Igual a
   - `-ne`: No igual a
   - `-lt`: Menor que
   - `-le`: Menor o igual que
   - `-gt`: Major que
   - `-ge`: Major o igual que

Exemple:

```bash
if [ $edat -ge 18 ]
then
  echo "Ets major d'edat."
else
  echo "Ets menor d'edat."
fi
```

2. **Operadors lògics**:
   - `-a`: "i" lògic (AND)
   - `-o`: "o" lògic (OR)
   - `!`: Negació lògica (NOT)

Exemple:

```bash
if [ $edat -ge 18 -a $te_carnet = "sí" ]
then
  echo "Pots conduir."
fi
```

3. **Comparació de cadenes**:
   - `=`: Igual a (per a cadenes)
   - `!=`: No igual a (per a cadenes)

Exemple:

```bash
if [ "$opció" = "sí" ]
then
  echo "Has triat sí."
fi
```

4. **Comprovació d'arxius**:
   - `-e`: Comprova si un arxiu o directori existeix.
   - `-f`: Comprova si existeix i és un arxiu.
   - `-d`: Comprova si existeix i -es un directori.
   - `-s`: Comprova si un arxiu existeix i no està buit.
   - `-r`: Comprova si tenim permisos de lectura sobre el fitxer o directori
   - `-w`: Comprova si tenim permisos d'escriptura sobre el fitxer o directori
   - `-x`: Comprova si tenim permisos d'execució sobre el fitxer o directori

Exemples:

```bash
if [ -d /ruta/a/la/carpeta ]
then
  echo "El directori existeix."
fi
```

```bash
if [ -s arxiu.txt ]
then
  echo "L'arxiu no està buit."
fi
```

### Anidació de sentències "if"

Pots anidar múltiples sentències "if" per gestionar condicions més complexes. Aquí tens un exemple d'anidació:

```bash
if [ $edat -ge 18 ]
then
  if [ "$té_licència" = "sí" ]
  then
    echo "Pots conduir."
  else
    echo "Ets major d'edat però no tens llicència."
  fi
else
  echo "Ets menor d'edat."
fi
```

Això permet gestionar casos en què hi ha múltiples condicions que s'han de complir o no.

## exit
El comando `exit` finalitza l'execució d'un script i no s'executarà cap codi despres del mateix. Normalment se li pasa un número que indique el resultat del script (`exit 0` sol significar que el script ha acabat correctament i `exit 1` o cualsevol número major que 0 indica que ha hagut un error).

Això ens permet poder fer comprovacions sense haver de anidar molts `if...else if`, per exemple:
```bash
if [ -e $1 ]
then
    echo "No existeix el fitxer $1"
    exit 1
fi
# resta del codi...
```

## Estructura condicional "case"
Si volem comparar una variable amb més de 2 valors podem anidar varios `if` o utilitzar una sentència `case` que compara una variable amb diversos patrons i executa el codi basat de la coincidència. Per exemple:

```bash
#!/bin/bash

echo "Escull una opció (A, B, o C):"
read opcio

case $opcio in
  A)
    echo "Has seleccionat l'opció A."
    # Afegiu aquí el codi per a l'opció A
    ;;
  B)
    echo "Has seleccionat l'opció B."
    # Afegiu aquí el codi per a l'opció B
    ;;
  C)
    echo "Has seleccionat l'opció C."
    # Afegiu aquí el codi per a l'opció C
    ;;
  *)
    echo "Opció no vàlida."
    ;;
esac
```

Al acabar cada bloc has de posar `;;` per a que no continue l'execució del codi del bloc següent. L'ús de `*)` proporciona una opció per qualsevol entrada que no coincidisca amb cap de les anteriors.

## Els bucles
Per a fer que un codi s'execute més d'una vegada (per exemple per a cada paràmetre o per a cada element d'un arxiu) tenim els bucles. El bash tenim 3 tipus de bucles: `for`, `while` i `until`:
- `for` s'utilitza per recórrer una llista d'elements i executar una seqüència d'instruccions per a cada element
- `while` s'executa mentre una condició siga certa
- `until` s'executa mentre una condició siga falsa

### El bucle "for"
L'estructura de control `for` es fa servir per recórrer una llista d'elements i executar una sèrie d'instruccions per a cada element de la llista.

La seua sintaxi bàsica és la següent:

```bash
for variable in llista
do
  # Codi a executar per a cada element de la llista
done
```

On:
- `variable` és una variable que prendrà el valor de cada element de la `llista` durant cada iteració.
- `llista` és una sèrie d'elements separats per espais que vols recórrer.

Exemple: volem recórrer una llista de noms i imprimir-los:

```bash
noms=("Ana" "Bob" "Carlos" "David")

for nom in "${noms[@]}"
do
  echo "Hola, $nom"
done
```

Aquest `for` recorre la llista de noms i imprimeix un missatge per a cada un d'ells.

Podem fer que la llista siga una sequència de números. Per exemple, aquest bucle `for` escriurà els números de l'1 al 5:

```bash
for numero in {1..5}
do
  echo "Número: $numero"
done
```

També pots utilitzar un `for` per recórrer tots els arxius i subdirectoris d'un directori. Per exemple, aquest `for` llistarà els arxius d'un directori:

```bash
directori="/ruta/al/directori"

for arxiu in "$directori"/*
do
  echo "Arxiu: $arxiu"
done
```

També podem utilitzar `for` amb una variable contadora que es pot incrementar o disminuir en cada iteració, igual que en la majoria de llenguatges de programació. Per exemple:

```bash
for ((i=1; i<=5; i++))
do
  echo "Iteració $i"
done
```

Aquest `for` comença amb `i=1`, incrementa `i` en cada iteració i s'atura quan `i` és major que 5.

### El bucle "while"
Aquest bucle continua executant el codi que conté mentre que la seua condició siga certa, per exemple:
```bash
#!/bin/bash
numero_secret=42

echo "Adivina el número secret (entre 1 i 100):"
read intent

while [ $intent -ne $numero_secret ]
do
  echo "No has encertat. Intenta-ho de nou."
  read intent
done

echo "Ho has encertat!!!"
```

### El bucle "until"
És igual que el "while" el codi s'executa mentre que la condició siga falsa. Per exemple:
```bash
#!/bin/bash

contrasenya_correcta="secret123"
intents=0

echo "Introdueix la contrasenya correcta:"

until [ "$intent" = "$contrasenya_correcta" ]
do
  read -s intent  # El modificador -s oculta la contrasenya mentre l'usuari l'escriu
  echo  # Afegeix un salt de línia després de l'entrada de la contrasenya

  if [ "$intent" = "$contrasenya_correcta" ]
  then
    echo "Contrasenya correcta. Accés concedit."
  else
    echo "Contrasenya incorrecta. Intenta-ho de nou."
  fi

  intents=$((intents + 1))
done

echo "Nombre d'intents: $intents"
```

Fixa't que `$((...))` calcula una expressió.

### "break" i "continue"
Dins d'un bucle les comandes `continue` i `break` fan que es deixe d'executar el codi:

1. **`continue`**:
   - La comanda `continue` s'utilitza per saltar l'iteració actual del bucle i passar a la següent iteració.
   - Quan s'executa `continue`, qualsevol codi que segueix a `continue` dins del bucle no s'executarà per aquesta iteració, i el bucle avançarà a l'iteració següent.
   - És útil quan vols evitar l'execució de determinades comandes dins del bucle en una condició específica, però encara vols continuar amb el bucle.

Exemple:

```bash
for numero in {1..5}
do
  if [ $numero -eq 3 ]
  then
    continue  # Salta la iteració actual si el número és 3
  fi
  echo "Número: $numero"
done
```

Aquest bucle imprimirà els números de l'1 al 5, però saltarà la iteració quan `numero` sigui igual a 3, és a dir, mostrarà els números 1, 2, 4 i 5.

2. **`break`**:
   - La comanda `break` s'utilitza per sortir immediatament del bucle.
   - Quan s'executa `break`, es finalitza el bucle actual i s'executa la comanda següent després del bucle.
   - És útil quan vols sortir del bucle en una situació particular i no continuar amb les iteracions restants.

Exemple:

```bash
for numero in {1..10}
do
  if [ $numero -eq 5 ]
  then
    break  # Surts del bucle quan el número és 5
  fi
  echo "Número: $numero"
done
```

Aquest bucle imprimirà els números de l'1 al 4 i, en arribar al 5, sortirà del bucle sense completar les iteracions restants.

En resum, `continue` s'utilitza per saltar a la següent iteració dins del bucle, mentre que `break` s'utilitza per sortir del bucle.

## Llegir dades d'un fitxer
Moltes vegades hem de fer un script per a treballar amb dades que es troben en fun fitxer de text. La forma més habitual d'accedir a les dades del fitxer és utilitzant un bucle `while` amb la següent sintaxis:
```bash
while IFS="delimitador" read -r camp1 camp2 camp3 ...
do
  # Ací el nostre codi
done < "nom_del_fitxer"
```

on `IFS` indica el caràcter utilitzat en el fitxer per a delimitar els diferents camps dins de cada línia.

Per exemple, tenim el fitxer `usuaris.txt` amb els noms i contrasenyes d'usuaris que hem de crear:
```txt
juan:1234
marta:5678
```

El script que crearia aquest usuaris podria ser alguna cosa com:
```bash
#!/bin/bash

fitxer_usuaris="usuaris.txt"

while IFS=":" read -r nom_usuari contrasenya
do
  # Comprova si l'usuari ja existeix
  if id "$nom_usuari" &>/dev/null
  then
    echo "L'usuari $nom_usuari ja existeix."
  else
    # Crea l'usuari amb la contrasenya
    useradd -m -p $(openssl passwd -1 "$contrasenya") "$nom_usuari"
    echo "L'usuari $nom_usuari ha estat creat."
  fi
done < "$fitxer_usuaris"
```

## Funcions
Quan el nostre codi és molt gran podem "dividir-ho" en funcions per a que siga més clar. Les funcions són blocs de codi que poden ser cridats i reutilitzades en diferents parts d'un script. Cada funció és com un xicotet script al qual podem cridar dins del nostre script.
```bash
saludar() {
  echo "Hola, $1."
}

saludar "Juan"
saludar "Marta"
```

`saludar` és una funció que mostra un salut amb el primer paràmetre que li pasem. La cridem posant el seu nom. La eixida serà:
```
Hola, Juan
Hola, Marta
```

Les funcions poden retornar un valor amb el comando `return`:
```bash
doble() {
  resultat=$((2 * $1))
  return $resultat
}

doble 5
echo "El doble de 5 és $?"
```

Fixa't que la variable especial `$?` emmagatzemma el resultat de l'ultim comando executat.

## Altres sentències útils
Podem executar un comando dins del nostre script tancant-lo entre `$(...)`, per exemple:
```bash
resultat=$(ls -l)

echo "$resultat" # Mostrarà el resultat del comando ls -l
```

El valor retornat per l'ultim comando executat (o la última funció cridada) es guarda en la variable especial `$?`. Si es tracta d'un comando del sistema que retorne 0 significa que s'ha executat correctament i si retorna altre número és que ha hagut un error:
```bash
ls /
echo "Valor retornat $?"  # Mostra 0
ls /qwert
echo "Valor retornat $?"  # Mostra 2
```

Per a calcular una expressió utilitzem `$((...))`:
```bash
comptador=1
comptador=$((comptador + 1))
echo "$comptador"   # Mostrarà 2
```

Per a depurar un script podem posar al principi el comando:
```bash
set -x
```

això farà que es mostre cada línia abans d'executar-se.
