- [La xarxa en GNU/Linux](./README.md#la-xarxa-en-gnulinux)
  - [Nom de les targetes](./README.md#nom-de-les-targetes)
  - [Netplan vs ifupdown](./README.md#netplan-vs-ifupdown)
  - [Veure la configuració amb ifupdown](./README.md#veure-la-configuraci%C3%B3-amb-ifupdown)
  - [Veure la configuració amb netplan (Ubuntu 17.10 i posteriors)](./README.md#veure-la-configuraci%C3%B3-amb-netplan)
  - [Accions més comuns](./README.md#accions-m%C3%A9s-comuns)
- [Configurar la xarxa](./config.md#configurar-la-xarxa)
  - [Configuració de la xarxa amb ifupdown](./config.md#configuraci%C3%B3-de-la-xarxa-amb-ifupdown)
  - [Configuració de la xarxa amb netplan](./config.md#configuraci%C3%B3-de-la-xarxa-amb-netplan)
  - [Configuració de la xarxa en CentOS](./config.md#configuraci%C3%B3-de-la-xarxa-en-centos)
  - [Detectar problemes](./config.md#detectar-problemes)
- [Enrutament](#enrutament)
  - [Habilitar l’enrutament](./enrutament.md#habilitar-lenrutament)
  - [Configurar NAT en sistemes netplan (Ubuntu 17.10 i posteriors)](#configurar-nat-en-sistemes-netplan)
  - [Configurar NAT en sistemes amb ifupdown i iptables](#configurar-nat-en-sistemes-amb-ifupdown)
    - [Configurar NAT en sistemes amb ifupdown i nftables (Debian 10 i posteriors)](#configurar-nat-en-sistemes-amb-ifupdown-i-nftables)
  - [Configurar NAT en CentOS](#configurar-nat-en-centos)


## Enrutament
Si estem configurant un servidor de comunicacions que proporcione eixida a l'exterior a una xarxa haurà de tindre al menys 2 targetes de xarxa:
* la externa que li comunica amb l'exterior (el router o altre equip que fa de porta d'enllaç)
* una o més targetes internes conectades als switches on estan els equips de la xarxa que han d'eixir per ell

Una vegada totes les targetes estiguen correctament configurades com hem vist en l'apartat anterior, perquè els clients tinguen accés a Internet haurem de configurar l'enrutamient en el servidor, la qual cosa permetrà als paquets que arriben per les targetes internes eixir a través de la targeta externa. 

Si es tracta d'una màquina virtual la targeta interna la configurarem en VirtualBox com a 'Xarxa interna' i li assignarem un nom (és com si fóra el nom del switch al que es connecta el seu cable). Per a la interfície externa Virtualbox ens ofereix 2 opcions:
* Adaptador pont: la màquina serà una més de la xarxa real i es podrà accedir a ella des de qualsevol equip de la xarxa. Per tant la seua IP ha de ser una IP de la xarxa. El problema és que la xarxa en l'aula i a casa són diferents per la qual cosa la configuració que funciona a casa no ho fa en l'aula.
* NAT: en aquest cas formen part d'una xarxa virtual que crea VirtualBox en la qual només estem nosaltres i el gateway que ens dóna eixida a l'exterior (amb la IP 10.0.2.2). L'avantatge és que aquesta configuració funciona en qualsevol lloc (perquè el 10.0.2.2 ens dóna eixida a l'ordinador real que ens trau en Internet) però des de fora d'aqueixa xarxa no es pot accedir a la nostra màquina (fins i tot no es pot accedir des de la màquina amfitrió).

Per a configurar l'enrutament hem de fer 2 accions:
1. [habilitar l'enrutament](#habilitar-lenrutament), que es fa igual tant en ifupdown com en netplan
2. configurar NAT (serà diferent si usem [netplan](#configurar-nat-en-sistemes-netplan) o [ifupdown](#configurar-nat-en-sistemes-amb-ifupdown-i-iptables))

### Habilitar l'enrutament
L'enrutament el que fa és redirigir a la targeta de xarxa externa el tràfic de la targeta interna amb destinació a altres xarxes (com Internet).

Per a habilitar l'enrutament editem el fitxer `/etc/sysctl.conf` i descomentem la línia:
```bash
net.ipv4.ip_forward=1
```

En sistemes amb netplan podem utilitzar el fitxer `/etc/ufw/sysctl.conf` que ho habilitarà quan iniciem el Firewal **ufw**. En CentOS ja està habilitat per defecte (si tinguerem que afegir opcions ho faríem en el fitxer `/etc/sysctl.d/99-sysctl.conf`)

Perquè faça efecte hem de recarregar la configuració amb:
```bash
sysctl -p
```

També podem habilitar-ho temporalment, fins que reiniciem la màquina, executant l'ordre
```bash
echo 1 > /proc/sys/net/ipv4/ip_forward
```

(si en comptes de echo 1 posem echo 0 ho deshabilitem).

Per a comprovar si està habilitat executem l'ordre
```bash
cat /proc/sys/net/ipv4/ip_forward
```

(si retorna 1 és que està habilitat i 0 és que està deshabilitat).

### Configurar NAT en sistemes netplan
Amb netplan s'utilitza el Firewal **ufw** (_uncomplicated firewall_) i és l'encarregat de gestional el NAT. Per defecte està desactivat i podem activar-ho o desactivar-ho amb els comandos `ufw enable` i `ufw disable`. Per a veure la configuració executem:

```bash
ufw status verbose
```

![ufw](./img/ufw.png)

Per a configurar NAT hem d'activar ufw i realitzar les següents accions:
* Editar el fitxer `/etc/default/ufw` i canviar la línia `DEFAULT_FORWARD_POLICY="DROP"` per

```bash
DEFAULT_FORWARD_POLICY="ACCEPT"
```

* Editar el titxer `/etc/ufw/before.rules` i afegir les següents línies al principi (abans de les regles de filtrat _\*filter_). Aquest exemple és per a enrutar la xarxa interna 192.168.226.0:

```bash
# NAT table rules
*nat
:POSTROUTING ACCEPT [0:0]

# Forward traffic through eth0 - Change to match you out-interface
-A POSTROUTING -s 192.168.226.0/24 -o enp0s3 -j MASQUERADE

# don't delete the 'COMMIT' line or these nat table rules won't be processed
COMMIT
```

Només queda reiniciar el Firewall (`ufw reload`). Per a comprovar les regles que estan aplicant-se executem el comando `iptables`:

```bash
iptables -t nat - L
```

![iptables](./img/iptables1.png)

Si volem eliminar totes les regles que tenim ara en iptables (per a tornar-las a posar o per si ens hem equivocat):

```bash
iptables  -t nat -F
```

**NOTA**: Si fem la configuració de l’enrutament des de **Webmin** tot funciona igual però s’enrutament l’activa en `/etc/sysctl.conf` (no en /etc/ufw/sysctl.conf) i les regles de nat les guarda en /etc/iptables.up.rules (en compte de en /etc/ufw/before.rules) i les carrega afegint la següent línia a /etc/network/interfaces:

```bash
post-up iptables restore < /etc/iptables.up.rules
```

### Configurar NAT en sistemes amb ifupdown i iptables
Amb versions de GNU/Linux que utilitzen _ifupdown_ hem d'afegir regles a _iptables_. Per exemple si la nostra targeta externa és la **enp0s3** amb IP **10.0.2.20** i la nostra xarxa interna és la **192.168.101.0** el comando per a activar NAT seria:

```bash
iptables -t nat -A POSTROUTING -s 192.168.101.0/24 -o enp0s3 -j MASQUERADE
```

El que indiquem és d'on provindrà el tràfic a enrutar (**-s** xarxa interna/màscara, és a dir, `-s 192.168.10.0/24`) a quina targeta s'enviarà (**-o** targeta externa, és a dir, `-o enp0s3`) i que enrute a la IP que tinga la targeta externa (`-j MASQUERADE`). Si nostra IP externa sempre serà la mateixa podem posar l'opció `-j SNAT --to 10.0.2.20` (on 10.0.2.20 seria la IP externa) en compte de _-j MASQUERADE_.

Si hem d'enrutar més d'una xarxa interna repetirem aquest comando per a cada xarxa a enrutar:

```bash
iptables -t nat -A POSTROUTING -s 192.168.102.0/24 -o enp0s3 -j MASQUERADE
```

Per a evitar haver d'executar aquest comando cada vegada que reiniciem el sistema instal·larem el paquet **iptables-persistent** que ens pregunta si emmagatzema la configuració actual de iptables (v4 i v6). Si li hem dit que sí cada vegada que reiniciem el sistema carregarà automàticament aquesta configuració. Si posteriorment fem modificacions en les iptables per a que ens torne a preguntar si guarda els canvis farem

```bash
dpkg-reconfigure iptables-persistent
```

Per a comprovar si el nostre sistema està fent NAT executem l'ordre:

```bash
iptables -t nat - L
```

![iptables](./img/iptables1.png)

Si volem eliminar totes les regles que tenim ara en iptables (per a tornar-las a posar o per si ens hem equivocat):

```bash
iptables  -t nat -F
```

#### Configurar NAT en sistemes amb ifupdown i nftables
Des de _Debian 10 (Buster)_  **[nftables](https://wiki.debian.org/nftables)** reemplaça a *iptables*. Podem continuar utilitzar els comandos _iptables_ ja que el nou framework és compatible però també podem utilitzar la sintaxis nova, amb el comando `nft`. Per a això hem d'instal·lar i activar _nftables_:

```bash
apt install nftables
systemctl enable nftables.service
```

Per a [crear les regles d'enrutament NAT](https://wiki.nftables.org/wiki-nftables/index.php/Performing_Network_Address_Translation_(NAT)) crearem una nova taula _nat_ on activem _prerouting_ i _postrouting_:

```bash
nft add table nat
```

Si volem borrar-la farem `nft add table nat`. Ara creem la cadena de postrouting:

```bash
nft add chain nat postrouting { type nat hook postrouting priority 100 \; }
```

I a continuació afegim les regles que vulgam:

```bash
nft add rule nat postrouting ip saddr 192.168.101.0/24 oif enp0s3 snat 10.0.2.20
nft add rule nat postrouting ip saddr 192.168.102.0/24 oif enp0s3 snat 10.0.2.20
```

Podem borrar totes les regles amb:

```bash
nft flush ruleset
```

Per a veure les regles que tenim establertes ara fem:

```bash
nft list ruleset
```

I per a tindre eixes regles actives al iniciar el servei hem de guardar-les en el fitxer de configuració de _nftables_ en **/etc/nftables.conf**. Podem fer-ho amb:

```bash
nft list ruleset > /etc/nftables.conf
```

### Configurar NAT en CentOS
En CentOS també s'utilitza un firewall per a gestionar els paquets de les diferents interfícies pel que hem de configurar-ho. Hi ha diferents zones ja creades (public, dmz, external, internal, ...) i hem de configurar les zones internal i external que són les que usarem.

Per a aquest exemple tenim les targetes:
* externa: enp0s3 amb IP 10.0.2.10
* interna: enp0s8 amb IP 192.168.100.1

En primer lloc assignem a la zona internal la seua targeta de xarxa:

```bash
firewall-cmd --change-interface=enp0s8 --zone=internal --permanent
```

Fem el mateix amb la zona external:

```bash
firewall-cmd --change-interface=enp0s3 --zone=external --permanent
```

Posem com a zona per defecte la internal (abans era public):

```bash
firewall-cmd --set-default-zone=internal
```

Ara configurem l'enrutament entre les targetes interna i externa:

```bash
firewall-cmd --permanent --direct --passthrough ipv4 -t nat -I POSTROUTING -s 192.168.100.0/24 -o enp0s3 -j SNAT --to 10.0.2.10
```
(com hem dit quan parlavem d'ifupdown, en compte de `-j SNAT --to ...` podem posar `-j MASQUERADE`)

Finalment només queda reiniciar el firewall:

```bash
firewall-cmd --reload
firewall-cmd --complete-reload
```

Podem veure les regles que estan aplicant-se igual que hem vist al parlar d'ifupdown.

# [<- La Xarxa en GNU/Linux](./#la-xarxa-en-gnulinux)
# [<- Configurar la xarxa](./config.html#configurar-la-xarxa)
