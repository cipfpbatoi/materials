# Virtualització
Moltes vegades tenim la necessitat de provar un programa informàtic o fer proves d'un altre sistema operatiu diferent del que estem utilitzant en el nostre ordinador. Quina és la possible solució? Formatar l'equip i instal·lar el nou sistema operatiu? Crear una partició i instal·lar-ho? Buscar un altre equip en què estiga instal·lat?

La solució és més senzilla que tot això: l'única cosa que s'ha de fer és instal·lar un programa que ens permet crear màquines virtuals dins del nostre ordinador.

![Virtualització](http://upload.wikimedia.org/wikipedia/commons/6/6e/Virtualization.JPG)

Una màquina virtual és un programari que emula un ordinador. Per tant és com si dins del nostre ordinador crearem més ordenadors “virtuals”.

Cadascun d'aqueixos ordinadors haurà de tindre el seu sistema operatiu i les seues aplicacions instal·lades, que en cap moment saben que estan dins d'una màquina virtual sinó que pensen que estan en un ordinador real. Per a l'ordinador real cada màquina virtual no és mes que un programa executant-se.

Els sistemes operatius instal·lats en les màquines virtuals es denominen sistemes convidats o _**guest**_. El sistema operatiu de la màquina real en la qual hem instal·lat el programari de virtualització es denomina sistema amfitrió o _**host**_. 

La virtualització podem definir-la com la capacitat d'executar en un únic equip físic, anomenat amfitrió o host, múltiples sistemes operatius que es diuen convidats o guests. Cada sistema operatiu guest instal·lat en una màquina virtual treballa com si estiguera instal·lat en una màquina real. Per al sistema amfitrió les màquines virtuals són simples aplicacions instal·lades en aquest.

![Hardware_Virtualization](http://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Hardware_Virtualization_%28copy%29.svg/512px-Hardware_Virtualization_%28copy%29.svg.png)

La tendència actual és un creixement de la virtualització tant a nivell empresarial com domèstic lloc que els actuals processadors són bastant potents com per a permetre aquesta tecnologia.

Tant Intel (amb **VT-x**) com AMD (amb **AMD-V**) han afegit als seus processadors una funcionalitat que permet incrementar el rendiment dels sistemes virtualitzats. _NOTA: abans de crear les nostres màquines virtuals s'asegurarem que tenim activada aquesta funcionaitat en la BIOS del nostre equip_.

## Avantatges i inconvenients de virtualitzar
Utilitzar sistemes virtualitzats té molts avantatges com són:

*  Reducció de costos en equips: si en compte d'un servidor per ordinador instal·lem diversos servidors virtuals en el mateix equip físic necessitem menys equips. Això es denomina “consolidació de servidors” i permet aprofitar millor el maquinari disponible.
* Reducció de costos en energia: per cada euro gastat en un servidor al llarg de la seua vida útil es gasta un altre euro en electricitat per a fer-lo funcionar. Això també implica una important reducció del CO2 emés a l'atmosfera.
* Millor recuperació de caigudes del sistema:
  * abans de fer un canvi important en el servidor podem guardar una instantània del seu estat actual. SI alguna cosa va malament simplement tornem a l'estat anterior, guardat en la instantània
  * és més fàcil recuperar un sistema virtualitzat que un sistema real lloc que simplement s'ha de tornar a carregar la màquina virtual, que és un fitxer. Fins i tot podem fer-ho sobre un ordinador diferent amb diferent maquinari si es desbarata la màquina física
  * és possible la migració en calenta de màquines virtuals d'un servidor físic a un altre sense parar el servei per a fer tasques de manteniment així com balancejar les màquines entre els diferents servidors físics per a evitar que alguns servidors se saturen mentre uns altres tinguen poc treball.
* Millor aprofitament de la CPU: els potents ordinadors actuals estan gran part del temps ociosos (la mitjana és d'un 15% d'utilització de la CPU). En virtualitzar tindrem diversos servidors en una mateixa màquina i augmenta l'ús de la CPU.
* Estalvi d'espai: en tindre menys equips es necessita menys espai per a emmagatzemar-los i refrigerar-los (els servidors estan habitualment en habitacions especials climatitzades).
* Menors costos de manteniment: es calcula que per cada euro invertit en maquinari s'inverteixen 8 a mantindre-ho. En tindre menys ordenadors els costos de manteniment són molt inferiors.
* Fàcil creixement: és molt més fàcil crear una nova màquina virtual per a donar un nou servei que comprar, instal·lar i configurar un nou equip.
* Balanceig dinàmic de les màquines virtuals entre els diferents servidor físics.
* Compatibilitat: a vegades necessitem un programa específic que no té versió per al nostre sistema operatiu, per la qual cosa necessitem tindre un ordinador amb el sistema per al qual està feta l'aplicació... o virtualitzar-lo. També podem executar programes “heretats” del sistema informàtic antic sobre una màquina virtualitzada en el sistema nou.

D'altra banda, també té inconvenients com són:
* Fan el sistema més complex el que provoca cert retard del sistema, és a dir, el programari no s'executarà amb la mateixa velocitat que en una màquina real, especialment en processadors sense suport per a la virtualització (VT o AMD-V).
* Una màquina virtual reservarà recursos de maquinari de la màquina amfitrió en el moment de la seua posada en funcionament (com a memòria RAM i espai de disc) que no estaran disponibles per al sistema operatiu amfitrió encara que no estiguen sent utilitzats en aquest moment pel sistema guest..

## Tipus de virtualització
Existeixen diferents tipus de virtualització, com podem veure en la [Wikipèdia](http://es.wikipedia.org/wiki/M%C3%A1quina_virtual#T.C3.A9cnicas).

La més comuna és la virtualització completa en la qual s'emula completament el maquinari de la màquina i el sistema operatiu s'executa com si ho fera sobre una màquina real (també es diu execució nativa).

Ací la virtualització es realitza mitjançant un programa anomenat _**hypervisor**_ i pot ser de 2 tipus:
* **Hypervisor de tipus 2**: és un programa que s'executa sobre el sistema operatiu de la màquina real (host) com qualsevol altre programa de la màquina. És el que utilitzarem nosaltres en aquest curs i els més coneguts són **Virtualbox, VMWare Player**, etc. Com s'explica en l'enllaç anterior no és la manera més eficient de virtualitzar màquines però ens permet utilitzar el nostre ordinador de classe per a fer altres tasques a part de virtualitzar.

![VMM-Type2](https://es.wikipedia.org/wiki/M%C3%A1quina_virtual#/media/Archivo:VMM-Type2.JPG)

* **Hypervisor de tipus 1**: s'executa directament sobre el maquinari de la màquina real (en realitat inclou un mínim SO per a accedir a aquest maquinari) pel que en aqueixa màquina real no es pot fer cap tasca a part de crear màquines virtuals. És la virtualització més eficient i és la que realitzen programes com **Proxmox, VMWare ESX/ESXi**, ...
![VMM-Type1](https://es.wikipedia.org/wiki/M%C3%A1quina_virtual#/media/Archivo:VMM-Type1.JPG)
