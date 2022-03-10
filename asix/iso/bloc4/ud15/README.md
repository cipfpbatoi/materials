Módulo: Implantación de sistemas operativos
===========================================

![Samba](./media/samba_logo.png)

UD 15 - Samba
-------------

* [UD 15 - Samba](#ud-15---samba)
* [Introducció](#introducció)
  * [Gestionar Samba des de la consola](#gestionar-samba-des-de-la-consola)
  * [Arxius de registre de Samba](#arxius-de-registre-de-samba)
  * [Referències](#referències)
* [Instal·lació del servei Samba](#installació-del-servei-samba)
  * [Instal·lar paquets necessaris pel servei Samba](#installar-paquets-necessaris-pel-servei-samba)
  * [Arxiu de configuració de Samba](#arxiu-de-configuració-de-samba)
  * [Actualitzar la informació del servei Samba](#actualitzar-la-informació-del-servei-samba)
* [Gestió de Samba (comandes i arxius)](#gestió-de-samba-comandes-i-arxius)
  * [Configuració general](#configuració-general)
  * [Altres seccions](#altres-seccions)
* [Gestió d'usuaris Samba (mode consola)](#gestió-dusuaris-samba-mode-consola)
  * [Configuració general d'usuaris](#configuració-general-dusuaris)
  * [Comandes per gestionar usuaris](#comandes-per-gestionar-usuaris)
  * [Transformar usuaris Samba en usuaris Linux](#transformar-usuaris-samba-en-usuaris-linux)
  * [Comprovar els usuaris Samba](#comprovar-els-usuaris-samba)
* [Compartició de carpetes amb Samba (mode consola)](#compartició-de-carpetes-amb-samba-mode-consola)
  * [Compartició d'arxius i carpetes](#compartició-darxius-i-carpetes)
  * [Configuració de recursos compartits](#configuració-de-recursos-compartits)
  * [Combinar propietaris i permisos locals amb usuaris i permisos Samba](#combinar-propietaris-i-permisos-locals-amb-usuaris-i-permisos-samba)
  * [Determinar els permisos efectius](#determinar-els-permisos-efectius)
* [Accedir des de Windows a carpetes compartides amb Linux (Samba)](#accedir-des-de-windows-a-carpetes-compartides-amb-linux-samba)
  * [Accedir a una carpeta compartida amb Samba](#accedir-a-una-carpeta-compartida-amb-samba)
  * [Connectar una unitat de xarxa a una carpeta compartida amb Samba](#connectar-una-unitat-de-xarxa-a-una-carpeta-compartida-amb-samba)

## Introducció

Samba és un servei que permet compartir recursos d'un sistema Linux (arxius, carpetes i impressores) utilitzant un protocol equivalent al que utilitza Windows (SMB/CIFS).

Això fa possible que es pugui accedir a aquests recursos des de clients Windows.

També es podrà accedir a aquests recursos des de Linux si es té instal·lat el client samba **smbclient**.

### Gestionar Samba des de la consola

Amb la comanda **smbpasswd** es poden gestionar els usuaris i màquines **Samba**.

També es poden editar directament els següents arxius de configuració de **Samba**:

* **/etc/samba/smb.conf**: arxiu de configuració global i dels recursos compartits.
* **/etc/samba/smbusers**: arxiu per transformar usuaris Samba en usuaris Linux.

### Arxius de registre de Samba

Els arxius de registre (logs) de **Samba** es troben per defecte a la carpeta **/var/log/samba/**, però es pot canviar amb el paràmetre log file de la secció [global] de l'arxiu **/etc/samba/smb.conf**.

### Referències

[Samba Wiki](https://wiki.samba.org/index.php/Main_Page)

## Instal·lació del servei Samba

### Instal·lar paquets necessaris pel servei Samba

Primer de tot cal instal·lar el paquet samba que és el servei equivalent a SMB/CIFS.

```bash
apt update
apt install samba
```

També cal tenir instal·lats els paquets attr i acl. Aquests paquests serveixen per gestionar els permisos que utilitza Windows en les carpetes.

Per comprovar si estan instal·lats i que les particions els estan utilitzant:

```bash
tune2fs -l /dev/sda1 | grep acl
Default mount options:    user_xattr acl
```
Si no és així, cal instal·lar-los...

```bash
apt install attr acl
```

...i afegir els paràmetres **user_xattr** i **acl** al muntar les carpetes, sigui manualment o en l'arxiu */etc/fstab*:

```bash
UUID=01764068-1aa6-4a00-9b22-aeb801061962   /       ext4   errors=remount-ro,user_xattr,acl   0   1
UUID=ca736112-8647-4a7d-8b12-5e80dc78915f   /home   ext4   defaults,user_xattr,acl            0   2
```

### Arxiu de configuració de Samba

Abans de començar a fer canvis en la configuració de qualsevol servei, és recomanable fer una còpia de l'arxiu original:

```bash
cp /etc/samba/smb.conf /etc/samba/smb.conf.bak
```

Quan es facin canvis en aquest arxiu, és molt recomanable utilitzar la comanda **testparm** per comprovar que l'arxiu de configuració de Samba és correcte (en cas contrari, pot ser que el servei no s'engegui):

FALTACAPTURA

### Actualitzar la informació del servei Samba

Com passa amb tots els serveis de Linux, sempre que es facin canvis en els arxius de configuració, cal reiniciar el servei o tornar a carregar la configuració.

En el cas de **Samba**, després de fer qualsevol modificació que afecti als usuaris o als recursos compartits, és molt convenient reiniciar **Samba**.

Algunes de les accions que poden afectar al servei són:

* Editar els arxius *smb.conf* o **smbusers**.
* Afegir, modificar (canvi de grup, contrasenya...) o eliminar usuaris **Samba** i usuaris Linux.

El servei que cal reiniciar és **smbd**:

```bash
systemctl restart smbd
```

Si només s'ha modificat la configuració es pot tornar a carregar amb la següent comanda:

```bash
smbcontrol all reload-config
```

## Gestió de Samba (comandes i arxius)

### Configuració general

L'arxiu principal de configuració (*/etc/samba/smb.conf*) està dividit en diferents seccions. Cada secció comença amb una etiqueta amb el seu nom (**[secció]**).

La secció **[global]** és la de configuració general, i els paràmetres més importants que conté són:
```bash

[global]
    workgroup = WORKGROUP
    server string = %h server (Samba, Ubuntu)
    server role = standalone server
    security = user
```

- **workgroup**: nom del grup de treball.
- **server string**: nom del servidor Samba (%h equival al nom de la màquina).
- **server role**: mode en què funciona el servidor (servidor de recursos compartits, servidor de domini...)
- **security**: mode d'autenticació (el valor per defecte user, indica que cal autenticar-se amb el nom d'usuari i contrasenya).

Les línies que comencen amb **#** o amb **;** és com si no hi fossin. Són línies de comentaris o de paràmetres amb valors per defecte.

### Altres seccions

La resta de seccions són de recursos compartits:

- **[printers]**: conté la configuració general sobre el sistema d'impressió.
- **[print$]**: és una carpeta compartida on es poden guardar drivers de Windows per impressores.

```bash
[printers]
    comment = All Printers
    path = /var/spool/samba
    browseable = no
    printable = yes
;   read only = yes
...

[print$]
    comment = Printer Drivers
    path = /var/lib/samba/printers
;   browseable = yes
;   read only = yes
...
```

També hi ha altres resursos compartits que estan comentats perquè només s'utilitzen en altres modes de funcionament, per exemple com a servidor de domini.

## Gestió d'usuaris Samba (mode consola)

### Configuració general d'usuaris

Dins l'arxiu */etc/samba/smb.conf*, en la secció **[global]**, hi ha alguns paràmetres generals relacionats amb els usuaris.
Els principals són els següents:

* **username map**: arxiu on es guarda la relació entre usuaris Samba i usuaris Linux.
* **guest ok**: s'accepta l'usuari anònim (Invitado) de Windows.
* **guest account**: l'usuari anònim es converteix en l'usuari nobody de Linux.

```bash
username map = /etc/samba/smbusers
guest ok = yes
guest account = nobody
```

### Comandes per gestionar usuaris

- **smbpasswd -a usuariSMB**: crea un usuari Samba i la seva contrasenya. Ha d'existir un usuari Linux amb el mateix nom de l'usuari Samba.
- **smbpasswd -x usuariSMB**: elimina un usuari Samba.

### Transformar usuaris Samba en usuaris Linux

Per poder transformar usuaris cal afegir el paràmetre 

```bash
username map = /etc/samba/smbusers 
```

dins la secció **[global]** de l'arxiu */etc/samba/smb.conf*.

Per defecte, **Samba** utilitza el mateix nom d'usuari Windows per accedir als recursos compartits en Linux. Si es vol transformar un usuari Windows en un usuari Linux concret cal editar l'arxiu */etc/samba/smbusers*.

A continuació hi ha un exemple amb el què es podria posar en aquest arxiu (els usuaris de Linux es posen a l'esquerra del símbol **=**, i els de **Samba** a la dreta):

```bash
root = Administrador director    # es pot relacionar un usuari Linux amb més d'un usuari Samba
profe = profe director    # ERROR: usuari Samba (director) duplicat
alumne = alumne1    # el usuari Samba no té perquè tenir el mateix nom que l'usuari Linux
profes = @profes    # el grup profes de Samba es transformarà en el grup profes de Linux
nobody = *    # qualsevol usuari Samba que no estigui en la llista es transformarà en l'usuari nobody de Linux
```

Un usuari Linux pot estar associat a més d'un usuari **Samba**, però no al revés. Els grups de **Samba** s'han de posar amb una **@** al davant.

L'usuari Linux (a l'esquerra de *=*) també ha d'estar a la base de dades de **Samba**; en cas contrari, l'usuari **Samba** es transformarà en usuari anònim *(nobody/nogroup*).

No és necessari posar en aquest arxiu els usuaris que tenen el mateix nom **Samba** i Linux (per exemple, no és necessari posar profe = profe).

### Comprovar els usuaris Samba

Les comandes a utilitzar són:

* **pdbedit -L**: per veure els usuaris Samba.
* **cat /etc/samba/smbusers**: per veure les transformacions d'usuaris.

## Compartició de carpetes amb Samba (mode consola)

### Compartició d'arxius i carpetes

Les principals opcions que s'han de configurar són:

* Nom del recurs compartit: el nom que s'ha d'utilitzar quan s'hi accedeix de forma remota.
* Ruta local: on es troba l'arxiu o carpeta que es vol compartir.
* Visibilitat: si serà visible de forma remota.
* Permisos: només lectura o lectura i escriptura.
* Accessibilitat: si serà accessible per a tothom o només a una llista d'usuaris i/o grups.
  * Permetre o no l'accés a un usuari anònim.
  * Limitar l'accés a determinades màquines.
  * Excepcions: si el recurs és només de lectura, afegir usuaris que també podran escriure-hi (i viceversa).

### Configuració de recursos compartits

Normalment, els recursos compartits es posen al final de l'arxiu */etc/samba/smb.conf*.

La configuració de cada recurs es posa dins d'una secció. El nom de la secció serà el nom del recurs compartit, i els paràmetres de compartició s'escriuran en les línies següents.

Els paràmetres més importants són la ruta local de la carpeta que es vol compartir (paràmetre path) i el mode de compartició (writeable o read only). Només es pot posar un d'aquests dos últims paràmetres: tots dos serveixen per indicar el mode de compartició però amb l'efecte contrari un de l'altre (writable = no seria el mateix que read only = yes).

```bash
[compartida]
    path = /srv/samba/compartida
    read only = yes
```

Algunes configuracions avançades no es poden fer amb el programa Samba i s'han de fer amb altres programes o editant l'arxiu de configuració:

```bash
[compartida]
    path = /srv/samba/compartida
    writeable = no
    valid users = @profes, alumne, root
    write list = root
```

En aquest exemple es veuen un parell de dades que no es poden configurar amb el programa Samba:

* En el paràmetre valid users s'ha afegit el grup profes.
* Per indicar que és un grup se li ha afegit el símbol @ al davant.
* Si no es posa aquest paràmetre, vol dir que tots els usuaris podran accedir al recurs compartit.
* S'ha afegit el paràmetre write list = root. Això indica que, tot i que el recurs només és de lectura (writeable = no), qualsevol usuari o grup que afegim en aquest paràmetre tindrà permís d'escriptura (en aquest cas només el root).

També es pot fer que el permís per defecte sigui d'escriptura (writeable = yes) i posar en el paràmetre read list els usuaris que només han de tenir permís de lectura:

```bash
[compartida]
    path = /srv/samba/compartida
    writeable = yes
    valid users = @profes, alumne, root
    read list = alumne
```

Els usuaris i grups que es posen en aquests paràmetres, han de ser usuaris i grups de Linux, no de Samba.

Si es configuren els paràmetres write list o read list, els usuaris que hi posem també han d'estar a valid users (o no posar aquest paràmetre).

### Combinar propietaris i permisos locals amb usuaris i permisos Samba

Una forma senzilla de configurar els permisos desitjats és:

* En els permisos locals, posar tots els permisos a tothom.
* En els permisos de compartició de Samba, indicar els usuaris que hi tenen accés i amb quins permisos.

Això és el contrari del què es feia al compartir carpetes en Windows (**SMB/CIFS**) i en Linux (**NFS**).
Encara que pugui semblar perillós, es fa així perquè els permisos Samba són més detallats que els permisos Linux i perquè, en principi, en el servidor no han d'entrar usuaris que no siguin administradors.

### Determinar els permisos efectius

Quan s'accedix a un recurs compartit amb Samba, cal utilitzar l'identificador i la contrasenya configurats en la base de dades d'usuaris de Samba, no amb usuaris Linux.

Per determinar els permisos que tindrà l'usuari, Samba realitza les següents comprovacions:

* Comprova si l'usuari es troba a la llista d'usuaris Samba.
* Comprova si l'usuari té permís per accedir al recurs compartit i quin tipus de permís (només lectura o lectura i escriptura).
* Converteix l'usuari Samba en l'usuari Linux relacionat.
* Determina els permisos triant els més restrictius entre els permisos que té l'usuari Samba sobre el recurs compartit i els permisos que té l'usuari Linux sobre la carpeta local.
* Si l'usuari final és el root i en els permisos de compartició pot llegir i escriure, tindrà tots els permisos independentment dels permisos locals.

## Accedir des de Windows a carpetes compartides amb Linux (Samba)

### Accedir a una carpeta compartida amb Samba

Es fa de la mateixa forma que per accedir a una carpeta compartida en un altre Windows:
Com accedir a una carpeta compartida

Si l'usuari actual de Windows no té permisos, demanarà que introduïm el nom i la contrasenya d'un usuari que sí en tingui (s'ha d'haver creat l'usuari en Samba, preferiblement amb la mateixa contrasenya que té en Windows!).

Encara que Windows demani l'usuari i contrasenya, és possible que no el pugui validar. En aquests casos, el millor és tancar la sessió i entrar amb l'usuari que tingui permís per accedir a la carpeta compartida.

Quan es creen arxius o carpetes des del client, en el servidor es crearan amb l'usuari Linux relacionat amb l'usuari Samba. Per exemple, si l'usuari Administrador d'un client Windows (relacionat amb l'usuari root de Linux) ha creat un arxiu en el servidor Linux, el propietari serà el root, però des del client es veurà que el propietari és \\USXXX\root.

També es pot accedir a aquests recursos compartits des d'un client Linux, sempre que tingui smbclient instal·lat.

### Connectar una unitat de xarxa a una carpeta compartida amb Samba

Es fa de la mateixa forma que per connectar una carpeta compartida en un altre Windows:
[Com connectar una unitat de xarxa a una carpeta compartida](https://www.sapalomera.cat/moodlecf/apunts/smx/sox/uf3/nf1/3332-WSAccedirUnitatXarxa.html)

Obra publicada con [Licencia Creative Commons Reconocimiento No comercial Compartir igual 4.0](http://creativecommons.org)
Autor: Pere Sánchez