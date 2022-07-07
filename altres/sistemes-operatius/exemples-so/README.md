# Principals sistemes operatius
- [Principals sistemes operatius](#principals-sistemes-operatius)
  - [Introducció](#introducció)
  - [Tipus de sistemes operatius](#tipus-de-sistemes-operatius)
    - [Sistemes operatius de telèfons mòbils](#sistemes-operatius-de-telèfons-mòbils)
    - [Sistemes operatius de consoles de jocs](#sistemes-operatius-de-consoles-de-jocs)
    - [Sistemes operatius per a equips encastats](#sistemes-operatius-per-a-equips-encastats)
    - [Sistemes operatius en el núvol](#sistemes-operatius-en-el-núvol)
  - [Quin Sistema operatiu per a PC triar](#quin-sistema-operatiu-per-a-pc-triar)
    - [Sistemes operatius privatius](#sistemes-operatius-privatius)
    - [Sistemes operatius lliures](#sistemes-operatius-lliures)
    - [Actividad](#actividad)

## Introducció
En aquesta unitat de treball coneixerem els sistemes operatius més utilitzats i les seues principals característiques i veurem què hem de tindre en compte abans d'instal·lar un sistema operatiu. Això ens permetrà triar la millor opció per a cada cas. 

![Principals sistemes oeratius](http://2.bp.blogspot.com/-RvsFmMCJlJQ/Tdh5ZxQ8nqI/AAAAAAAAAAM/Y9RUNBh26Pc/s1600/logotipos-sistema-operativo-historia-anecdotas.jpg)

## Tipus de sistemes operatius
El sistema operatiu és el programari responsable de gestionar els recursos d'un equip (ja sigui un ordinador personal, un telèfon mòbil, etc.). Una de les principals funcions és gestionar el maquinari, de manera que els diversos programes no se n'hagin d'ocupar d'això, alleugerint i fent més fàcil així el procés de programació d'aquestes aplicacions. Altra funció important és oferir diversos serveis als programes d'aplicació i als usuaris. Les aplicacions poden accedir a aquests serveis a través de l'**API** (_Application Programming Interface_ o interfície de programació d'aplicacions) o a través de cridades al sistema. Els usuaris interactuen amb el sistema per mitjà de la **GUI** (_Graphic User Interface_ o interfície gràfica d'usuari) o per mitjà de l'intèrpret de comandos (**CLI**, _Command Line Interface_).

La gran majoria d'ordinadors, des de telèfons mòbil, ordinadors personals, videoconsoles fins a supercomputadors, usen algun tipus de sistema operatiu. Però hui en dia molts altres equips electrònics tenen un processador i un maquinari prou complexe com per a justificar que tinguen el seu propi sistema operatiu. A més dels telèfons mòbils també ho tenen molts sistemes encastats. Un sistema encastat és un sistema de computació (té un processador) però que només fa unes determinades tasques. Exemples d'aquest sistemes són SmartTV, reproductors multimèdia, routers, navegadors per a cotxes, caixers automàtics i fins i tot microones, frigorífics o llavadores.

### Sistemes operatius de telèfons mòbils
Un sistema operatiu mòbil controla un dispositiu mòbil igual que un sistema operatiu per a PC controla un ordinador personal. Tanmateix, els sistemes operatius mòbils són prou més simples i estan més orientats a la connectivitat sense fils, els formats multimèdia i les diferents maneres d'introduir informació en ells.

Alguns dels sistemes operatius mòbils més utilitzats són:
- Android: és el S.O. que porta la majoria de Smartphones i tablets. Es va crear per a càmeres fotogràfiques però Google el va comprar i el va modificar per a ús en telèfons. Està basat en Linux i és programari lliure
- iOS: és el S.O. de Apple per als iPhone, iPad i iPod touch. Està basat en el Mac OS X
- Microsoft Phone: el seu aspecte és similar als Windows per a PC
- BlackBerry: dissenyat per Research in Motion (RIM) per als terminals BlackBerry
- Symbian: un sistema operatiu desenvolupat per moltes companyies (Nokia, Sony Ericsson, Samsung, Siemens, ...) que es va utilitzar el gran varietat de telèfons durant anys encara que avui ha estat substituït per Android en la majoria de terminals (o Ms Phone en els Nokia)
- Firefox OS: desenvolupat per Mozilla és programari lliure i està basat en Linux
- Ubuntu Touch: creat per Canonical i basat en Linux

### Sistemes operatius de consoles de jocs
Les consoles són ordinadors que han de portar el seu sistema operatiu. Alguns exemples són:
- Playstation 4: utilitza **Orbit OS** que és un fork de **FreeBSD** que veurem més endavant (la PS4 ja no utilitza processadors Cell sino AMD amb arquitectura PC en la part no gràfica)
- XBox: el seu sistema és el **XBox One** (també anomenat XBox OS) que està basat en **Windows 10**
- Nintendo Switch: igual que la PS4 su sistema está basado en **FreeBDS**

¿Por qué pensáis que se usa FreeBSD y no Linux?

### Sistemes operatius per a equips encastats
Ja hem dit que un sistema encastat és un dispositiu controlat per un processador però que, a diferència d'un ordinador que es pot utilitzar per a moltes tasques, s'utilitza per a realitzar només unes tasques determinades. Normalment són dispositius amb poca memòria per la qual cosa els seus sistemes operatius han de ser molt petits.

Molts d'aquest aparells tenen el seu propi sistema operatiu per a controlar-los desenvolupat específicament per a ells però altres utilitzen versions de altres sistemes com:
- diferents versions de Linux encastat: basat en el kernel de Linux només ocupen unes 2 MB i s'utilitzen en routers (ex. OpenWrt), telèfons i tot tipus de dispositius electrònics i industrials
- Windows IoT: la versió de Windows per a equips encastats que substitueix a Windows Embebed i Windows CE (utilitzats en caixers automàtics, sistemes de navegació de cotxes, etc)
- VxWorks: basat en Linux, podem trobar-lo en fotocopiadores, avions, routers, navegadors GPS o la sonda Mars Reconnaisance Orbiter
- FreeBSD: igual que trobem versions de Linux també hi ha versions de FreeBSD (que és un S.O. sencer) en equips com televisors, routers, etc
- Android: a més de en els mòbils podem trobar-lo en microones o llavadores

### Sistemes operatius en el núvol
El més habitual és que la nostra informació no la tenim en un únic equip ni en un USB sinó en el núvol de manera que podem accedir a ella des de qualsevol equip. Però a vegades en l'equip des del qual accedim no tenim instal·lat un programa per a veure un tipus concret de fitxer o simplement volem tindre el nostre entorn d'escriptori. La solució a això són els sistemes operatius en el núvol.

Els **Cloud Operating Systems** o sistemes operatius online funcionen com un sistema totalment funcional però des del navegador web. És a dir, que ofereixen les funcions de qualsevol sistema operatiu referents a la interacció entre l'usuari i la informació (però no entre l'usuari i l'ordinador com sí fan els sistemes operatius clàssics).

L'objectiu dels sistemes operatius online és reunir aplicacions online en un únic lloc perquè puguem treballar o realitzar qualsevol tasca amb independència de l'ordinador que utilitzem i també ens permet guardar arxius i personalitzar el nostre escriptori virtual.

Altre avantatge és que aquests sistemes són escalables, és a dir, que si en un moment donat necessitem més RAM o CPU podem contractar-la.

Alguns dels més utilitzats són:
- **Amazon Web Services (AWS)**. Amazon també ofereix S.O. com servei a més del seu conegut SaaS (Software as a Service). És gratuït els primers 12 mesos i després molts dels seus serveis continuen sent gratis. Per a empreses ofereix el Amazon AppStream  que permet virtualitzar màquines des del navegador. 
- **Microsoft Azure**. Ens permet tindre una màquina que simula ser un PC amb Windows o Linux. El primer mes és gratuït i després haurem de pagar pel ús.
- **Google App Engine**. Amb Google Cloud Platform  ens permet configurar les xarxes i equips remots encara que es de pagament i utilitza unes eines específiques que són complexes per a l'usuari bàsic però és una bona alternativa per a una empresa.
VMWare ha anunciat el seu VMWare Cloud on AWS
- **Chrome OS**, gratuït
- **Horbito**, gratuït i multiplataforma
- i molts altres. Fins i tot podem utilitzar Google Drive com SO en el núvol ja que a banda de espai d'emmagatzemament ofereix programes ofimàtics (documents, fulles de càlcul, presentacions, ...) i la possibilitat d'afegir més programes des de la Google Web Store.

## Quin Sistema operatiu per a PC triar
El Sistema operatiu és un element bàsic del nostre equip i tenir instal·lat un sistema o un altre tindrà moltes implicacions sobre el programari que podrem instal·lar, el bon aprofitament del maquinari i la funcionalitat del sistema per a l'usuari.

Instal·lar un sistema operatiu és un procés laboriós que hem de fer correctament per a evitar problemes posteriors. Canviar d'un sistema a un altre suposa molt treball, no solament d'instal·lar el nou sistema, sinó de configurar-ho i instal·lar la resta de programari. És per açò que hem de triar el sistema que millor s'adapte a les necessitats de l'usuari.

A més d'açò hem de tenir molt en compte la màquina sobre la qual anem a instal·lar el sistema. D'una banda hem d'assegurar-nos que el sistema operatiu triat és per a l'arquitectura del nostre processador. En el cas dels PCs a un equip amb arquitectura x64 li podem instal·lar un sistema operatiu x32 però no estarem aprofitant tota la seua capacitat i totes les aplicacions que instal·lem hauran de també ser de 32 bits com el sistema. D'altra banda cal tenir molt en compte que l'equip complix àmpliament els requisits de maquinari del sistema triat ja que d'altra forma no podrem instal·lar el sistema o, si els compleix massa justs, el seu funcionament serà excessivament lent.

En el cas de sistemes operatius per a un PC bàsicament hem de triar entre un sistema operatiu **privatiu** (**Windows** o **OS X**) o un sistema **lliure** (possiblement alguna distribució **GNU/Linux**).

### Sistemes operatius privatius
La majoria del mercat de sistemes operatius privatius està copat per la empresa Microsoft i els seus sistemes **Windows**, encara que també són molt utilitzats els ordinadors Mac de Apple amb el seu propi sistema operatiu, el **Mac OS X**, especialment en alguns àmbits com els relacionats amb disseny gràfic. 

Tant Microsoft com Apple han desenvolupat sistemes operatius diferents per a servidors i per a clients (també anomenats d'**escriptori**).

### Sistemes operatius lliures
Ací podem parlar de multitud de sistemes i/o distribucions. Per simplificar, veurem principalment Ubuntu, Debian i Fedora, encara que hi han altres molt també molt interessants (OpenSuse, Slax, LliureX, Gentoo, CentOS, RedHat, etc). També parlarem d'altres sistemes que no són GNU/Linux com FreeBSD i Andriod.

Com en altres temes veurem, el més important no és conèixer una distribució o altra, sinó tenir clar els conceptes principals de funcionament d'un sistema operatiu, en el nostre cas un sistema Gnu/Linux.

### Actividad

En grups de 2 o 3 persones anem a investigar les avantatges dels diferents sistemes operatius i en quins casos els recomanaríem. Cada grup s'encarregarà d'investigar i exposar en classe un sistema. Heu de parlar de les principals característiques i novetats del sistema, les seues diferents versions, els requisits de maquinari i en quins casos el recomanaries explicant per què és millor que els altres.

Els sistemes a triar són:

- Sistemes lliures o sistemes privatius (un grup defensarà els sistemes lliures i altre els privatius)
- Diferents sistemes Windows: Windows 11, Windows 10, Windows 8 / 8.1, Windows 7, Altres Windows
- Diferents sistemes lliures: Debian, Ubuntu, RedHat, CentOS, ...
- Sistemes OS X
- Altres sistemes operatius: BSD, ...
