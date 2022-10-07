# Mirrors

Aquesta és una xicoteta mini-guia per a fer funcionar els mirrors dins la xarxa del centre. Abans de modifcar els fitxers sources.list, es recomana realitzar una copia de seguretat d'aquest. 

```bash
cp /etc/apt/sources.list /etc/apt/sources.list.bk
```

## Mirror Debian 11

[http://mirrord.cipfpbatoi.lan](http://mirrord.cipfpbatoi.lan)

El mirror de Debian conté les següents seccions:

* main
* contrib
* non-free

```bash

deb http://mirrord.cipfpbatoi.lan/debian bullseye main contrib non-free

```
A més a més també disposem un mirror de les debian-security.

Si ja tens en marxa un sistema Debian 11 i vols fer servir el mirror del centre pots fer servir el [sources.list](./debian11/sources.list).


Si vols fer una instal·lació des de 0 al centre, et recomane fer servir el **Mode Expert** i llevar les actualitzacions de **"security.debian.org"**. En el pas on et demana si volem fer servir una "replica" li hem de dir que volem introduir manualment l'adreça del mirror [http://mirrord.cipfpbatoi.lan](http://mirrord.cipfpbatoi.lan) i a funcionar :P. Una vegada finalitzada la instal·lació afegim al sources.list la següent linea: 

``` bash
deb http://mirrord.cipfpbatoi.lan/debian-security bullseye-security main contrib non-free
```


## Mirror Ubuntu 22.04

[http://mirroru.cipfpbatoi.lan](http://mirroru.cipfpbatoi.lan)

El mirror d'Ubuntu conté les seccions:

 * main
 * multiverse
 * restricted
 * universe
  
A més a més, també disposem dels *repositoris*:

  * jammy-backports
  * jammy-security
  * jammy-updates

Si volem fer una instal·lació d'Ubuntu Server, podem modificar des de l'instalador el mirror i no cal modificar res més.

Si anem a fer la instal·lació d'un Ubuntu amb entorn gràfic farem el següent.

* Desactivar la xarxa de la màquina virtual.
* Realitzar la instal·lació
* Cal eliminar l'arquitectura i386 i per això:
  * dpkg --print-foreign-architectures
  * dpkg --remove-architecture i386
  * dpkg --print-foreign-architectures
* Una vegada finalitzada podem modificar el [sources.list](./ubuntu22.04/sources.list).

