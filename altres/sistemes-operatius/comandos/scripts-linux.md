# Scripts en GNU/Linux

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