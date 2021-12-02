# samba-tool
Samba inclou l'eina samba-tool per a gestionar objectes del domini. Podem obtenir ajuda d'aquesta ordre amb:

```bash
samba-tool -h
```

Els subcomandos que anem a usar ara són:
- **ou**: per a gestionar unitats organitzatives
- **group**: per a gestionar grups
- **user**: per a gestionar usuaris

Encara que existeixen molts més per a gestionar molts altres elements (gpo, dns, ...)

## Gestió d'unitats organitzatives
Amb `samba-tool ou -h` podem vore les opcions que podem utilitzar.

Si volem crear l'ou Aula dins de l'ou **Batoi** que es troba en el domini **cipfpbatoi.lan** farem:

```bash
samba-tool ou create "OU=Aula,OU=Batoi,DC=cipfpbatoi,DC=lan" --description "Objectes de l'aula de formació"
```

Podem veure totes les opcions a l'hora de crear una ou amb:

```bash
samba-tool ou create -h
```

## Gestió de grups
Amb `samba-tool group -h` es mostren les opcions que podem utilitzar.

Per defecte els grups es crearan dins de la OU **Users** però podem indicar on volem que es creu. Per exemple si volem crear el grup gProfes dins de la OU **Aula** que està dins de la OU **Batoi** farem:

```bash
samba-tool group add gProfes --groupou=OU=Aula,OU=Batoi --description="Professors de l'aula"
```

Podem veure totes les opcions a l'hora de crear un grup amb:

```bash
samba-tool group add -h
```

Per exemple trobem l'opció `list` per a vore tots els grups creats o `listmembers` per a vore els membres del grup que l'indiquem.

```bash
samba-tool group listmembers gEmpresa
```

## Gestió d'usuaris
Ho farem amb el comando `samba-tool user`. A l'hora de crear un nou usuari haurem d'especificar moltes opcions. Les podem veure totes amb:

```bash
samba-tool user create -h
```

Per exemple anem a crear l'usuari _jsegura_ amb contrasenya _Batoi@1234_ el nom de la qual és _Juan_ i cognom _Segura_, volem que tinga que canviar la contrasenya en el pròxim inici de sessió i ho volem crear dins de la OU _smx_ que està en la OU _Aula_. El comando serà el següent:

```bash
samba-tool user create jsegura Batoi@1234 --given-name=Juan --surname=Segura --must-change-at-next-login --userou=OU=Aula,OU=Batoi
```

Per a afegir-lo al grup creat abans, farem:

```bash
samba-tool group addmembers gProfes jsegura
```
Si volem afegir més usuaris a un grup o grups dins d'altres, hem de separar per comes (sense espais):

```bash
samba-tool group addmembers g_empresa00 g_administratiu00,g_SAT00
```

Igual que en els grups podem vore totes les opcions amb els usuaris executant l'ordre:
```bash
samba-tool user -h
```

Per veure més comandes relacionades amb samba, es poden accedir a la seguent web:

https://www.sysadminsdecuba.com/2018/04/tips-comandos-utiles-de-samba/

## Gestió amb fitxers LDIF
Samba (al igual que OpenLDAP i la resta de directoris que segueixen l'estàndard LDAP) permet actuar directament amb **LDB** que és la base de dades del directori (normalment es guarda en `/var/lib/samba/private/sam.ldb`).

Per a això tenim les eines ldb (`ldbadd`, `ldbdel`, `ldbedit`, `ldbmodify`, `ldbrename`, `ldbsearch`) que podem instal·lar amb el paquet **ldb-tools** (aquests comandos s'instal·len en `/usr/bin`).

Si volem, per exemple, afegir una OU hem de crear un fitxer LDIF amb les seues dades i afegir-lo amb `ldbadd`. Per exemple volem crear l'OU _Aula_ dins de l'OU _Batoi_ (que ja està creada) en el domini _cipfpbatoi.lan_. Els que farem és:
1. Crearem un fitxer (per exemple ouAula.ldif) amb el contingut:
```bash
dn: OU=Aula,OU=Batoi,DC=cipfpbatoi,DC=lan
ou: Aula
objectClass: top
objectClass: organizationalunit 
```

2. Per a afegir-la al domini executem:
```bash
ldbadd -H /var/lib/samba/private/sam.ldb ouAula.ldif 
```

Podem veure objectes ja creats en el domini amb `ldbsearch`. Per exemple per a veure la informació de l'OU Aula creada abans farem:
```bash
ldbsearch -H /var/lib/samba/private/sam.ldb 'OU=Aula' 
```

Si volem el llistat de tots els objectes posarem l'opció `--all`:
```bash
ldbsearch -H /var/lib/samba/private/sam.ldb --all
```
