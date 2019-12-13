# samba-tool
Samba inclou l'eina samba-tool per a gestionar objectes del domini. Pode obtenir ajuda d'aquest comando amb:

```bash
samba-tool -h
```

Els subcomandos que anem a usar ara són:
- **group**: per a gestionar grups
- **user**: per a gestionar usuaris

Encara que existeixen molts més per a gestionar molts altres elements (gpo, dns, ...)

## Gestió de grups
Amb `samba-tool group` veen les opcion que podem utilitzar:

Per defecte els grups es crearan dins de la OU **Users** però podem indicar on volem que es creu. Per exemple si volem crear el grup gProfes dins de la OU **Aula** que està dins de la OU **Grups** farem:

```bash
samba-tool group add gProfes --groupou=OU=Aula,OU=Grups
```

També podem indicar què GID volem que tinga amb l'opció `--gidnumber num_de_gid`. És habitual donar als grups i usuaris del domini nombres alts (a partir del 5000 o el 10000) per a no interferir en els usuaris i grups locals que tenen GID i UID a partir del 1000.

Podem veure totes les opcions a l'hora de crear un grup amb:

```bash
samba-tool group add -h
```

## Gestió d'usuaris
Ho farem amb el comando `samba-tool user`. A l'hora de crear un nou usuari haurem d'especificar moltes opcions. Les podem veure totes amb:

```bash
samba-tool user create -h
```

Per exemple anem a crear l'usuari _jsegura_ amb contrasenya _Batoi@1234_ el nom de la qual és _Juan_ i cognom _Segura_, volem que tinga com UID la _10001_ i que haja de canviar la contrasenya en el pròxim inici de sessió i ho volem crear dins de la OU _smx_ que està en la OU _Aula_. EL comando serà el següent:

```bash
samba-tool user create jsegura Batoi@1234 --given-name=Juan --surname=Segura --must-change-at-next-login --userou=OU=smx,OU=Aula --uid-number=10001
```

Per a afegir-ho al grup creat abans farem:

```bash
samba-tool group addmembers gProfes jsegura
```

Per veure més comandes relacionades amb samba, es poden accedir a la seguent web:

https://www.sysadminsdecuba.com/2018/04/tips-comandos-utiles-de-samba/

## Gestió d'OU
Amb samba-tool podem gestionar fàcilment usuaris i grups però no permet crear unitats organitzatives. Per a fer-ho hem d'actuar directament amb LDB que és la base de dades de Samba (normalment es guarda en `/var/lib/samba/private/sam.ldb`).

Per a això tenim les eines ldb (ldbadd, ldbdel, ldbedit, ldbmodify, ldbrename, ldbsearch) que instal·lem amb el paquet **ldb-tools** (aquests comandos s'instal·len en `/usr/bin`).

Per a afegir una OU hem de crear un fitxer LDIF amb les seues dades i afegir-lo amb `ldbadd`. Per exemple volem crear l'OU _Aula_ dins de l'OU _Grups_ (que ja està creada) en el domini _cipfpbatoi.lan_. Crearem un fitxer (per exemple ouAula.ldif) amb el contingut:
```bash
dn: OU=Aula,OU=Grups,DC=cipfpbatoi,DC=lan
ou: Aula
objectClass: top
objectClass: organizationalunit 
```

Per a afegir-la al domini executem:
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
