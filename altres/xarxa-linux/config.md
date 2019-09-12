- [La xarxa en GNU/Linux](./README.md#la-xarxa-en-gnulinux)
  - [Nom de les targetes](./README.md#nom-de-les-targetes)
  - [Netplan vs ifupdown](./README.md#netplan-vs-ifupdown)
  - [Veure la configuració amb ifupdown](./README.md#veure-la-configuraci%C3%B3-amb-ifupdown)
  - [Veure la configuració amb netplan](./README.md#veure-la-configuraci%C3%B3-amb-netplan)
  - [Accions més comuns](./README.md#accions-m%C3%A9s-comuns)
  - [Configurar la xarxa](#configurar-la-xarxa)
    - [Configuració de la xarxa amb ifupdown](#configuraci%C3%B3-de-la-xarxa-amb-ifupdown)
    - [Configuració de la xarxa amb netplan](#configuraci%C3%B3-de-la-xarxa-amb-netplan)
    - [Configuració de la xarxa en CentOS](#configuraci%C3%B3-de-la-xarxa-en-centos)
    - [Detectar problemes](#detectar-problemes)
  - [Enrutament](./enrutament.md#enrutament)
    - [Habilitar l’enrutament](./enrutament.md#habilitar-lenrutament)
    - [Configurar NAT en sistemes amb ifupdown](./enrutament.md#configurar-nat-en-sistemes-amb-ifupdown)
    - [Configurar NAT en sistemes netplan](./enrutament.md#configurar-nat-en-sistemes-netplan)
    - [Configurar NAT en CentOS](./enrutament.md#configurar-nat-en-centos)

## Configurar la xarxa
Tots els canvis que fem amb el comando `ifconfig` o `ip` són temporals i es perden quan reiniciem la xarxa. El servei de xarxa (anomenat **networking** en ifupdown i **networkd** en netplan), quan s'inicia configura la xarxa amb el contingut del fitxer de configuració (`/etc/network/interfaces` en ifupdown i `/etc/netplan/ en netplan/`). Per tant, per a canviar la configuració permanentment hem de canviar-la en aquest fitxer.

Ací veurem com configurar la xarxa en:
* [sistemes amb ifupdown (Ubuntu fins 17.04 i altres distribucions)](#)
* [sistemes amb netplan (Ubuntu des de 17.10 i altres distribucions)](#)
* [CentOS](#)
* [Configuració prèvia de Virtualbox](#)

### Configuració de la xarxa amb ifupdown
El fitxer de configuració de la xarxa és `/etc/network/interfaces`:
```bash
network:
    version: 2
    ethernets:
        enp0s3:
            dhcp4: yes
```

![interfaces](./img/interfaces.png)

La informació que trobem és:
* auto: per a què la interfície s'active automàticament en arrancar l'equip sense haver de fer ifup.
* allow-hotplug: per a què la interfície s'active automàticament en detectar un esdeveniment en la interfície (com que es connecta el cable).
* inet dhcp: per a configurar aquesta interfície per DHCP
* inet static: per a configurar-la estàticament. Haurem d'indicar els seus paràmetres:
  * address: l'adreça IP
  * netmask: la màscara de xarxa
  * gateway: la porta d'enllaç
  * dns-nameservers: servidors DNS (separats per espai)

Un altre exemple amb 2 targetes de xarxa configurades estàticament:
```bash
network:
    version: 2
    ethernets:
        enp0s3:
            addresses: [10.0.2.10/24]
            gateway4: 10.0.2.2
            nameservers:
                addresses: [172.16.20.1]
            dhcp4: false
            optional: true
        enp0s8:
            addresses: [192.168.0.1/24]
            dhcp4: false
            optional: true
```

![interfaces](./img/interfaces2.png)

Podem configurar cada interfície de forma estàtica (iface ethX inet static) o per dhcp (iface ethX inet dhcp). Si ho fem estàticament hem d'indicar la IP (address), la màscara (netmask), la porta d'enllaç si fa falta (gateway) i els servidors DNS (dns-nameservers). També es pot indicar la xarxa (network) i l'adreça de broadcast però no és necessari perquè es pot calcular a partir de la IP i la màscara.

Després de modificar el fitxer de configuració hem de reiniciar el servei de xarxa (amb systemd):
```bash
systemctl restart networking
```

o (amb el sistema d'inici SysV)
```bash
service networking restart
```

o directament executant l'script:
```bash
/etc/init.d/networking restart
```

En ocasions cal reiniciar la targeta que hem canviat amb `ifdown ethX` i `ifup ethX`.

Els servidors DNS es poden configurar també en el fitxer `/etc/resolv.conf` encara que se sobreescriu el seu contingut amb el que indiquem en `/etc/network/interfícies` en l'apartat _dns-nameservers_ en reiniciar el servei de xarxa pel que s'ha de configurar allí. Un exemple de fitxer és:

![resolv.conf](./img/resolv2.png)

A més en el fitxer /etc/hosts podem posar els noms que el nostre propi ordinador ha de resoldre:

![hosts](./img/hosts.png)

Si la nostra màquina té una IP fixa hauríem d'afegir-la ací també al costat del nom del host.

### Configuració de la xarxa amb netplan
El nou fitxer de configuració és un fitxer que trobem dins de `/etc/netplan/`. Es tracta d'un fitxer _YAML_ el que significa que cada opció va en una línia i si una opció és una subopció de l'anterior ha d'anar indentada cap a dins amb espais (ATENCIÓ han de ser espais, no serveix tabulador).

Exemple de fitxer d'una màquina amb una única targeta configurada per DHCP:

![netplan](./img/netplan1.png)

Si volem configurar una altra targeta i que siguen ambdues estàtiques:

![netplan](./img/netplan2.png)

**ATENCIÓ**: ha d'haver-hi un espai entre els : i el valor de l'opció i no pot haver-hi espais al final d'una línia.

Perquè s'apliquen els canvis no és necessari reiniciar el servei de xarxa sinó que n'hi ha prou amb fer:
```bash
netplan apply
```

Si volem obtindre més informació de què fa o si hi ha errors li posem l'opció `--debug`:
```bash
netplan --debug apply
```

També podem utilitzar el paràmetre `try` en compte de `apply` per a que ens mostre que farà abans de decidir si volem que es canvie o no la configuració de la xarxa.

Si volem fer la configuració des de l'entorn gràfic amb **NetworkManager** ho indiquem en el fitxer que hi ha en `/etc/netplan/`, posant-ho com a renderer:

![netplan](./img/netplan3.png)

Aquesta és l'opció per defecte en distribucions amb entorn gràfic. Si volem tornar a utilitzar el fitxer canviarem el renderer a **systemd** (o eliminem la línia ja que systemd és l'opció per defecte):
```bash
network:
  renderer: systemd
  version: 2
  ethernets:
    ...
```

### Configuració de la xarxa en CentOS
La configuració es similar a la de netplan i utilitzem també el comando `ip`. Però en compte d'un fitxer on es configuren totes les targetes cadascuna té el seu propi fitxer de configuració en **`/etc/sysconfig/network-scripts/ifcfg-enp0sX`**.

Les principals opcions que hem de configurar són:
* ONBOOT=yes (perquè alce la targeta en reiniciar, com auto en Ubuntu)
* BOOTPROTO=dhcp

Si volem configurar la targeta estàticament posarem:
* BOOTPROTO=static
* IPADRR=10.0.2.15 (la IP, si es configura static)
* PREFIX=24 (la màscara)
* GATEWAY=10.0.2.2 (la porta d'enllaç predeterminada de la interfície)
* DNS1=8.8.8.8 (el primer DNS)
* DNS2=9.9.9.9 (el segon DNS, podem posar més)

Si no volem usar IPv6:
* IPV6INIT=no
* IPV6_AUTOCONF=no

Per a reiniciar el servei de xarxa executarem:
```bash
systemctl restart network.service
```

### Configuració en Virtualbox
Si volem configurar una màquina virtual que siga el servidor de una xarxa de màquines virtuals clients haurà de tindre 2 targetes de xarxa. La targeta interna la configurarem en VirtualBox com a 'Xarxa interna' i li assignarem un nom (és com si fóra el nom del switch al que es connecta el seu cable). Per a la interfície externa Virtualbox ens ofereix 2 opcions:
* **Adaptador pont**: la màquina serà una més de la xarxa real i es podrà accedir a ella des de qualsevol equip de la xarxa. Per tant la seua IP ha de ser una IP de la xarxa. El problema és que la xarxa en l'aula i a casa són diferents per la qual cosa la configuració que funciona a casa no ho fa en l'aula.
* **NAT**: en aquest cas formen part d'una xarxa virtual que crea VirtualBox en la qual només estem nosaltres i el gateway que ens dóna eixida a l'exterior (amb la IP 10.0.2.2). L'avantatge és que aquesta configuració funciona en qualsevol lloc (perquè el 10.0.2.2 ens dóna eixida a l'ordinador real que ens trau en Internet) però des de fora d'aqueixa xarxa no es pot accedir a la nostra màquina (fins i tot no es pot accedir des de la màquina amfitrió).

### Detectar problemes
Si la xarxa no funciona podem veure els missatges d'inici relacionats amb la xarxa amb:
```bash
dmesg | grep eth
```
o si el nom de les nostrres targetes és enpXsY
```bash
dmesg | grep enp
```

