La xarxa en Virtualbox
La nostra màquina virtual, igual que la real, necessita una targeta de xarxa per a connectar-se amb la resta d'ordinadors (reals o virtuals).

VirtualBox ens permet posar fins a 4 targetes de xarxa en cada màquina virtual i podem triar entre diferents models (AMD PC-Net, Intel PRO, etc.). La majoria de sistemes operatius inclouen drivers per a aquestes targetes però si no sempre podem triar un model diferent. També ens assigna una MAC per defecte que nosaltres podem canviar si volem.



Però el més important que hem de configurar és com es connectarà la targeta i tenim diverses opcions:

No connectat: la nostra targeta no té en cable connectat
NAT: és la manera per defecte en el qual no és necessari configurar res. La màquina virtual té accés a Internet i a la xarxa externa però ningú pot accedir a ella.
Xarxa NAT: virtualbox crea un encaminador virtual al qual es connecten totes les màquines virtuals connectades a aqueixa xarxa interna, que poden veure's entre si.
Adaptador pont: la nostra màquina virtual serà una més en la xarxa real. És el que hem d'utilitzar per a virtualizar servidors accessibles des de la xarxa real.
Xarxa interna: per a crear una xarxa entre màquines virtuals, que haurem de configurar nosaltres.
Adaptador sols amfitrió: crea una xarxa únicament entre el host i diferents màquines virtuals, que no tenen accés a Internet
Altres tipus de xarxa avançats com a Túnel UDP (per a més informació consulteu l'ajuda de Virtualbox)
NAT
Aquest és la manera per defecte de la targeta de xarxa quan creguem una nova màquina virtual.

Quan triem aquesta manera la màquina virtual es connecta en una xarxa creada per VirtualBox que fa de porta d'enllaç i s'encarrega de donar eixida a l'exterior. La porta d'enllaç és la 10.0.2.2 qui disposa d'un servidor DHCP que dóna al client l'adreça 10.0.2.15.


L'avantatge d'aquesta manera és que no hem de configurar res perquè la xarxa funcione en la màquina virtual però l'inconvenient és que la màquina no és accessible des de cap un altre equip (ni des de la màquina real ni des de la resta d'equips de la xarxa real ni des de les altres màquines virtuals) posat que és com si la màquina virtual estiguera més enllà d'un firewall. Per a fer-la visible hauríem de redirigir ports des de la màquina real a la virtual (VirtualBox permet fer-ho).

En definitiva és la millor opció per a una màquina virtual que només necessita tindre accés a l'exterior però no que cap altra màquina accedisca a ella.
Xarxa NAT
Aquest mètode imita el que seria una xarxa domèstica amb un encaminador al qual es connecten els equips. Per a usar-ho hem de crear l'encaminador virtual des del menú Arxiu -> Preferències -> Xarxa:



Li donem un nom a la xarxa i configurem l'encaminador virtual (xarxa, màscara, si tindrà DHCP, reexpedició de ports, etc).

Una vegada fet ja podem triar aquest mètode en les nostres màquines virtuals. En fer-ho estaran totes en la mateixa xarxa (per defecte la 10.0.2.0/24) pel que seran visibles entre si i la seua porta d'enllaç serà la 10.0.2.1.


Si volem que una màquina virtual siga visible des de l'exterior hauríem de redirigir ports des de l'encaminador virtual.

Adaptador pont
En aquest cas la màquina virtual es connecta directament a la targeta de xarxa de la màquina real (ens pregunta quin si tenim més d'una): és com si en la nostra targeta de xarxa de la màquina real ara tinguérem 2 connectades: la pròpia màquina real més la màquina virtual.



La configuració que haurem de fer és igual que la de la màquina real: la mateixa porta d'enllaç i màscara de xarxa (però òbviament amb diferent IP). La nostra màquina virtual serà un equip més de la xarxa real i per tant visible des de qualsevol màquina de la xarxa. Si en la nostra xarxa tenim un servidor DHCP li donarà IP automàticament a la nostra màquina virtual igual que fa en les màquines reals.

És la millor opció per a crear màquines virtuals que es comporten com si foren màquines reals en la nostra xarxa (per exemple per a virtualitzar un servidor).
Xarxa interna
Aquesta manera permet crear una xarxa interna entre màquines virtuals dins de la màquina real. És com instal·lar un switch virtual (amb el nom que li donem en la xarxa interna) al qual podem connectar totes les màquines virtuals que vulguem (similar a l'opció Xarxa NAT però sense eixida a l'exterior).

Les màquines virtuals que estiguen dins de la mateixa xarxa interna seran visibles entre elles però no des de l'exterior (ni des de la màquina host).

Com és una nova xarxa nosaltres elegirem els seus paràmetres (direcció de xarxa, màscara, etc) i haurem de configurar adequadament cada màquina virtual connectada a ella.

Podem crear diferents xarxes internes (donant-li a cadascuna d'elles diferent nom) i és com si vam tindre diferents switches en la nostra xarxa. 
És l'opció adequada per a crear una xarxa virtual on es veuen les màquines virtuals creades però que no són accessibles des de fora.

Normalment s'utilitza al costat d'una altra màquina virtual que faça de servidor de la xarxa. Aquesta màquina tindria 2 targetes de xarxa: una interna en la mateixa xarxa que els clients virtuals i una altra externa configurada com NAT o Adaptador pont que li proporcione eixida a l'exterior.


Adaptador sols amfitrió
En aquest cas totes les màquines virtuals configurades així es poden veure entre elles i també amb el host però no són accessibles des de fora ni poden eixir fora del host.

Per a utilitzar aquesta manera des del menú Arxiu -> Configuració -> Xarxa creem un (o més) adaptador que funciona com si fóra una targeta de xarxa afegida al host però incomunicada de les altres. A aquest nou adaptador li donarem una IP (per defecte 192.168.56.1) i li podem configurar un servei DHCP per a donar IP a les màquines virtuals (per defecte les dóna en el rang 192.168.56.101-254).
Canviar el tipus de la xarxa
Per a afegir o llevar targetes de xarxa hem de parar la màquina virtual però no cal fer-ho per a canviar la manera d'una targeta. Podem fer-ho amb la màquina funcionant des del menú Dispositivos -> Adaptadores de red

## [Snapshots](./snapshots.md)
