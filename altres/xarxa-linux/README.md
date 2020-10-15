- [La xarxa en GNU/Linux](#la-xarxa-en-gnulinux)
  - [Nom de les targetes](#nom-de-les-targetes)
  - [Netplan vs ifupdown](#netplan-vs-ifupdown)
  - [Veure la configuració amb ifupdown](#veure-la-configuraci%C3%B3-amb-ifupdown)
  - [Veure la configuració amb netplan (Ubuntu 17.10 i posteriors)](#veure-la-configuraci%C3%B3-amb-netplan)
  - [Accions més comuns](#accions-m%C3%A9s-comuns)
  - [Configurar la xarxa](./config.md#configurar-la-xarxa)
    - [Configuració de la xarxa amb ifupdown](./config.md#configuraci%C3%B3-de-la-xarxa-amb-ifupdown)
    - [Configuració de la xarxa amb netplan (Ubuntu 17.10 i posteriors)](./config.md#configuraci%C3%B3-de-la-xarxa-amb-netplan)
    - [Configuració de la xarxa en CentOS](./config.md#configuraci%C3%B3-de-la-xarxa-en-centos)
    - [Detectar problemes](./config.md#detectar-problemes)
  - [Enrutament](./enrutament.md#enrutament)
    - [Habilitar l’enrutament](./enrutament.md#habilitar-lenrutament)
    - [Configurar NAT en sistemes amb ifupdown](./enrutament.md#configurar-nat-en-sistemes-amb-ifupdown)
      - [Configurar NAT en sistemes amb ifupdown i nftables (Debian 10 i posteriors)](./enrutament.md#configurar-nat-en-sistemes-amb-ifupdown-i-nftables)
    - [Configurar NAT en sistemes netplan (Ubuntu 17.10 i posteriors)](./enrutament.md#configurar-nat-en-sistemes-netplan)
    - [Configurar NAT en CentOS](./enrutament.md#configurar-nat-en-centos)

# La xarxa en GNU/Linux
La majoria de sistemes GNU/Linux amb entorn gràfic utilitzen el servei **NetworkManager** per a gestionar la xarxa. A més totes tenen un servei per a gestionar-la si la volem configurar-la directament des de la terminal amb els fitxers de configuració, sense utilitzar l'entorn gràfic.

Totes les distribucions GNU/Linux basades en Debian han configurat sempre la xarxa des de la terminal amb el paquet **ifupdown**. Aquest paquet permet configurar-la amb el servei **networking** que guarda la configuració de la xarxa en el fitxer `/etc/network/interfaces` (encara que també es pot configurar des de l'entorn gràfic amb el servei **NetworkManager**).

A partir de Ubuntu 17.10 Canonical ha introduit una nova forma de configurar la xarxa: **netplan**. Ara el servei és **systemd-networkd** i el fitxer de configuració està dins de `/etc/netplan/` i es tracta d'un fitxer en format _YAML_ (on cada subsecció ha d'estar indentada de la secció pare amb uns ESPAIS en blanc). El motiu segons explique és per a superar certes limitacions de _ifupdown_.
La configuració gràfica continua igual amb el **NetworkManager**.

## Nom de les targetes
En GNU/Linux les targetes de xarxa s'identifiquen com ethX (eth0, eth1, ...) si són targetes ethernet cablejades o wlanX si són targetes WiFi (en ocasions es diuen athX si són wifis Atheros o amb altres noms depenent del fabricant).

El problema és que el nom que se li assigna depèn de quan es configura la targeta en arrancar (la primera serà la eth0, la segona la eth1) el que podria canviar entre un reinicie i un altre. A més algunes distribucions, com Ubuntu, assignen sempre el mateix nom d'interfície a cada MAC pel que si es desbarata una targeta i la canviem la nova ja no seria eth0 sinó el següent nom no usat. Açò també passa en màquines virtuals on podem canviar les MAC de les nostres targetes.

Moltes configuracions (firewall, etc) depenen del nom que tinguen les targetes pel que si aquest canvia deixaran de funcionar correctament. Per a evitar el problema de no saber com es dirà cada interfície de xarxa, les distribucions GNU/Linux utilitzen **Predictable Network Interface Names** que assigna identificadors estables a les interfícies de xarxa basant-se en el tipus (local Ethernet, WLAN, WWAN, etc).

El nom que reben les targetes depen del tipus (**en...** per a les ethernet amb cable, **wl...** per a les _wireless_ o **lo** per a la interfície _loopback_). La resta del nom depen de on està instal·lada (en placa **enoX**, en un port PCI, USB, ... **enpXsY**, etc). En màquines de VirtualBox la primera sol ser la **emp0s3** i la resta a partir de la **enp0s8**, ...

## Netplan vs ifupdown
Les principals diferències entre els dos sistemes són, entre uns altres:
* el fitxer de configuració que en _ifupdown_ era com tots de text pla (`/etc/network/interfícies`) ara és un fitxer _YAML_ que es troba dins de **`/etc/netplan/`**
* el servei que gestiona la xarxa ara no és `networking` sino **`systemd-networkd`**
* per a activar o desactivar una interficie ja no tenim els comandos `ifup` i `ifdown` sinó:
```bash
    ip link set $targeta up
    ip link set $targeta down
```
* tampoc tenim el comando `ifconfig` que s'ha substituit per **`ip`**
* hi ha una nova comanda, networkctl, per a veure què dispositius tenim. Amb el paràmetre `status` ens dóna la configuració de cadascun:

![Configuració de xarxa](./img/Ubuntu18-xarxa-04.png)

Si li posem el nom d'una targeta ens dona la informació de la mateixa:

![Configuració de xarxa](./img/Ubuntu18-xarxa-05.png)

## Veure la configuració amb ifupdown
El comando per a veure la configuració de la xarxa és `ifconfig` (en Debian si no som _root_ hem de posar la ruta sencera del comando `/sbin/ifconfig`):

![ifconfig](./img/ifconfig3.png)

Per a veure les rutes configurades i la porta d'enllaç tenim el comando `route`:

![route](./img/route3.png)

Ens indica que:
* tots els paquets amb destinació la xarxa 192.168.101.0/24 eixiran per la targeta **enp0s8**
* tots els paquets amb destinació la xarxa 192.168.102.0/24 eixiran per la targeta **enp0s9**
* tots els paquets amb destinació la xarxa 10.0.2.0/24 eixiran per la targeta **enp0s3**
* la resta de paquets aniran a la porta d'enllaç (10.0.2.2) per a targeta **enp0s3**

I per a veure el DNS mostrem el contingut del fitxer `/etc/resolv.conf`:

![resolv.conf](./img/resolv.png)

En aquest cas tenim com a DNS principal 127.0.0.1 (és a dir aquesta màquina) i com a secondari 8.8.8.8. No és convenient modificar ací els DNS perquè aquest fitxer és sobreescrit pels serveis que configuren la xarxa.

## Veure la configuració amb netplan
El comando `ifconfig` es troba en el paquet **net-tools** junt a `route` i altres. Netplan en compte d'aquest paquet inclou el paquet **iproute2util** que sustitueix aquest comando pel comando `ip` que és més potent. Per a veure la configuració escrivim:
```bash
ip addr show
```
(o simplement ip a). 

![ifconfig](./img/ifconfig.png)
![ip a](./img/ip-addr.png)

Es tracta de la xarxa d'un equip amb la interfície local (_localhost_ o _lo_), una targeta ethernet cablejada (_enp4s0f0_) i una inalàmbrica (_wlp3s0_). Podem veure només un resum d'aquesta informació amb `ip -br a`.

![ip -br a](./img/ip-br.png)

Per a veure la porta d'enllaç el comando és:
```bash
ip route show
```
(o simplement `ip r`)

![ip r](./img/ip-route.png)

## Accions més comuns
Tant els comandos `ifconfig` com `ip` ens permeten canviar al nostra configuració temporalment (per a canviar-la definitivament hem de fer-ho en els fitxers de configuració):
* desactivar una interfície de xarxa:
  * ifconfig: `ifconfig enp0s3 down`
  * ip: `ip link set enp0s3 down`
* volver-la a activar:
  * ifconfig: `ifconfig enp0s3 up`
  * ip: `ip link set enp0s3 up`
* afegir una nova IP a una interfície:
  * ifconfig: `ifconfig enp0s3 add 192.168.100.5/24`
  * ip: `ip addr add 192.168.100.5/24 dev enp0s3`
* eliminar-la IP:
  * ifconfig: `ifconfig enp0s3 del 192.168.100.5/24`
  * ip: `ip addr del 192.168.100.5/24 dev enp0s3`
* canviar la porta d'enllaç (per exemple que siga la 192.168.1.1):
  * ifconfig: `route add default gateway 192.168.1.1`
  * ip: `ip route add default via 192.168.1.1`

Podeu consultar més comandos en [aquesta pàgina](https://www.tecmint.com/ifconfig-vs-ip-command-comparing-network-configuration/).

# [-> Configurar la xarxa](./config.html#configurar-la-xarxa)
# [-> Enrutament](./enrutament.html#enrutament)
