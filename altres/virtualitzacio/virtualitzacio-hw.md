# Virtualització de hardware
- [Virtualització de hardware](#virtualització-de-hardware)
  - [Introducció](#introducció)
  - [Virtualització de maquinari](#virtualització-de-maquinari)
  - [Hipervisors](#hipervisors)
  - [Avantatges i inconvenients de virtualitzar](#avantatges-i-inconvenients-de-virtualitzar)
  - [Tipus de virtualització](#tipus-de-virtualització)

## Introducció
En informàtica anomenem _virtualitzar_ a crear amb software una representació (versió virtual) d'algun recurs de manera que simula el seu funcionament. A aquesta versió virtual del recurs físic se li anomena recurs **virtualitzat** o **lògic** i s'ha de poder utilitzar igual que si fos un recurs físic.

Hi ha moltes coses que es poden virtualitzar: maquinari, programari, emmagatzemament, xarxa, ... Nosaltres así vorem la **virtualització de maquinari (_hardware_)** (també anomenada _virtualització de plataforma_).

## Virtualització de maquinari
Moltes vegades tenim la necessitat de provar un programa informàtic o fer proves d'un altre sistema operatiu diferent del que estem utilitzant en el nostre ordinador. Quina és la possible solució?:
- Formatar l'equip i instal·lar el nou sistema operatiu? 
- Crear una nova partició en l'equip i instal·lar-ho? 
- Buscar un altre equip en què estiga instal·lat?

La solució més senzilla és utilitzar un programa de virtualització de hardware que simula tot el hardware d'un equip de manera que s'administra el _hardware virtual_ creat com si fos real. Eixos equips virtualitzats que creem s'anomenen **màquines virtuals**.

Hi ha diferents tipus de tecnologies per a crear màquines virtuals:
- Maquines virtuals de procés
- Contenidors
- Hipervisors

Les maquines virtuals de procés ens permeten executar un programa dissenyat per a una arquitectura de maquinari o un sistema operatiu diferents dels que tenim en la màquina real. Ho fan creant un procés que _emula_ el sistema necessari. Un exemple és **JVM** (_Java Virtual Machine_) que permet executar un programa Java en qualsevol dispositiu que tinga una JVM instal·lada.

Els contenidors simulen una màquina però utilitzant el sistema operatiu de l'equip amfitrió. Es com si tingueren diferents equips virtuals però tots utilitzant el mateix sistema operatiu. Exemple: Docker, LXC, OpenVZ, ... Aquesta tecnologia també s'anomena **paravirtualització**-

Els **hipervisors** ens permeten simular tot el maquinari i en ells podem executar un sistema operatiu que potser diferent al de la màquina real i que tindrà la il·lusió d'executar-se sobre un equip real.

![Hipervisor vs contenidor](https://upload.wikimedia.org/wikipedia/commons/0/0a/Docker-containerized-and-vm-transparent-bg.png)

<a href="https://commons.wikimedia.org/wiki/File:Docker-containerized-and-vm-transparent-bg.png">docker.com</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons

<cite>Font: https://commons.wikimedia.org/wiki/File:Docker-containerized-and-vm-transparent-bg.png</cite>

## Hipervisors
Una màquina virtual és un programari que emula un ordinador. Per tant és com si dins del nostre ordinador crearem més ordenadors “virtuals”.

![Virtualització](http://upload.wikimedia.org/wikipedia/commons/6/6e/Virtualization.JPG)

Cadascun d'aqueixos ordinadors virtuals haurà de tindre el seu sistema operatiu i les seues aplicacions instal·lades, que en tot moment funcionen com si estigueren en un ordinador real. Per a l'ordinador real cada màquina virtual no és mes que un programa executant-se.

Els sistemes operatius instal·lats en les màquines virtuals s'anomenen sistemes convidats o _**guest**_. El sistema operatiu de la màquina real en la qual hem instal·lat el programari de virtualització s'anomena sistema amfitrió o _**host**_. El software que realitza la virtualització s'anomena _**hipervisor**_.

![Hardware_Virtualization](http://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Hardware_Virtualization_%28copy%29.svg/512px-Hardware_Virtualization_%28copy%29.svg.png)

Tant els processadors Intel (amb **Intel-VT**) com els AMD (amb **AMD-V**) des de fa molts anys han afegit als seus processadors una funcionalitat que permet incrementar el rendiment dels sistemes virtualitzats. 

_NOTA: abans de crear les nostres màquines virtuals s'assegurarem que tenim activada aquesta funcionalitat en la BIOS del nostre equip_.

La tendència actual és un creixement de la virtualització tant a nivell empresarial com domèstic ja que els actuals processadors són molt potents i permeten esta tecnologia. En l'àmbit s'utilitza normalment per a provar altres sistemes operatius o per a executar programes per a altres sistemes.

En l'àmbit empresarial és molt utilitzada per a _consolidar servidors_, és a dir, tindre varios servidors virtuals en un equip es que permet:
- aprofitar millor els recursos de l'equip (generalment màquines molt potents)
- distribuir millor els recursos d'emmagatzemament
- consumir menos energia i tindre menys màquines que refrigerar

## Avantatges i inconvenients de virtualitzar
Utilitzar sistemes virtualitzats té molts avantatges com són:

* Reducció de costos en equips: si en compte d'un servidor per ordinador instal·lem diversos servidors virtuals en el mateix equip físic necessitem menys equips i permet aprofitar millor el maquinari disponible.
* Reducció de costos en energia: per cada euro gastat en un servidor al llarg de la seua vida útil es gasta un altre euro en electricitat per a fer-lo funcionar. Això també implica una important reducció del CO2 emès a l'atmosfera.
* Millor recuperació de caigudes del sistema. Potser aquesta siga la raó més important per la qual virtualitzar ja que és molt més ràpid prevenir problemes i recuperar un sistema virtualitzat que uno executant-se en una màquina real:
  * abans de fer un canvi important en el servidor podem guardar una instantània del seu estat actual. Si alguna cosa va malament simplement tornem a l'estat anterior, guardat en la instantània, en qüestió de segons
  * en cas de caiguda total del sistema simplement s'ha de tornar a carregar la màquina virtual, que és un fitxer. Fins i tot podem fer-ho sobre un ordinador diferent amb diferent maquinari si es desbarata la màquina física
  * és possible la migració en calenta de màquines virtuals d'un servidor físic a un altre sense parar el servei per a fer tasques de manteniment així com balancejar les màquines entre els diferents servidors físics per a evitar que alguns servidors es saturen mentre uns altres tinguen poc treball
* Millor aprofitament de la CPU: els potents ordinadors actuals estan gran part del temps ociosos (la mitjana és d'un 15% d'utilització de la CPU). Al virtualitzar tindrem diversos servidors en una mateixa màquina i augmenta l'ús de la CPU.
* Estalvi d'espai: en tindre menys equips es necessita menys espai per a emmagatzemar-los i refrigerar-los (els servidors estan habitualment en habitacions especials climatitzades).
* Menors costos de manteniment: es calcula que per cada euro invertit en maquinari s'inverteixen 8 a mantindre-ho. En tindre menys ordenadors els costos de manteniment són molt inferiors.
* Fàcil creixement: és molt més fàcil crear una nova màquina virtual per a donar un nou servei que comprar, instal·lar i configurar un nou equip.
* Balanceig dinàmic de les màquines virtuals entre els diferents servidors físics.
* Compatibilitat: a vegades necessitem un programa específic que no té versió per al nostre sistema operatiu, per la qual cosa necessitem tindre un ordinador amb el sistema per al qual està feta l'aplicació... o virtualitzar-lo. També podem executar programes “heretats” del sistema informàtic antic sobre una màquina virtualitzada en el sistema nou.

D'altra banda, també té inconvenients com són:
* Fan el sistema més complex el que provoca cert retard del sistema, és a dir, el programari no s'executarà amb la mateixa velocitat que en una màquina real. Aquest problema es minimitza amb processadors amb suport per a la virtualització (VT-x o AMD-V).
* Una màquina virtual reservarà recursos de maquinari de la màquina amfitrió en el moment de la seua posada en funcionament (com a memòria RAM i espai de disc) que no estaran disponibles per al sistema operatiu amfitrió encara que no estiguen sent utilitzats en aquest moment pel sistema guest.

## Tipus de virtualització
Existeixen diferents tipus de virtualització, com podem veure en la [Wikipèdia](http://es.wikipedia.org/wiki/M%C3%A1quina_virtual#T.C3.A9cnicas).

La més comuna és la virtualització completa en la qual s'emula completament el maquinari de la màquina i el sistema operatiu s'executa com si estigues en una màquina real (també es diu execució nativa).

Ací la virtualització es realitza mitjançant un programa anomenat _**hipervisor**_ i pot ser de 2 tipus:
* **Hipervisor de tipus 2 o _hosted_**: és un programa que s'executa sobre el sistema operatiu de la màquina real (host) com qualsevol altre programa de la màquina. És el que utilitzarem nosaltres en aquest curs i els més coneguts són **Virtualbox, VMWare Player**, etc. Com s'explica en l'enllaç anterior no és la manera més eficient de virtualitzar màquines però ens permet utilitzar el nostre ordinador de classe per a fer altres tasques a part de virtualitzar.
![VMM-Type2](https://upload.wikimedia.org/wikipedia/commons/1/1a/VMM-Type2.JPG)
* **Hipervisor de tipus 1 o _bare metal_**: l'hipervisor s'executa directament sobre el maquinari de la màquina real (en realitat inclou un mínim SO per a accedir a aquest maquinari) pel que en aqueixa màquina real no es pot fer cap tasca a part de crear màquines virtuals. És la virtualització més eficient i és la que realitzen programes com **Proxmox, VMWare ESX/ESXi**, ...
![VMM-Type1](https://upload.wikimedia.org/wikipedia/commons/5/53/VMM-Type1.JPG)

També tenim altres opcions com:
- _emulació_: un programa anomenat emulador simula un ordinador que pot tindre un joc d'instruccions diferent al de l'ordinador real (cosa que no pot fer-se en la virtualització nativa). Aquest programa captura cada instrucció que es vol executar i la transforma en les instruccions necessàries de la màquina real. És un procés molt lent encara que es pot utilitzar per exemple per a emular ordinadors antics (com consoles dels anys 80) sense problema ja que el hardware actual és molt més potent. Un exemple és l'emulador _M.A.M.E._ (emula el maquinari utilitzat en les màquines recreatives per a l'execució dels jocs)
- _paravirtualització a nivell de sistema operatiu_: les màquines virtuals funcionen sobre el mateix sistema operatiu de la màquina real convenientment aïllades entre sí. El seu avantatge és que només s'executa una instància del sistema operatiu però el problema és que només es poden executar màquines virtuals amb el mateix sistema operatiu del de la màquina real (per exemple, en un ordinador GNU/Linux només podríem virtualitzar màquines GNU/Linux). Un exemple és OpenVZ
- _Cloud Computing_: podem tindre els nostres equips en el núvol utilitzant eines com AWS, Microsoft Azure, Google Apps Engine, Heroku, ...