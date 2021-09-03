# Principals sistemes operatius
En aquesta unitat de treball coneixerem els sistemes operatius més utilitzats i les seues principals característiques i veurem què hem de trindre en compte abans d'instal·lar un sistema operatiu. Això ens permetrà triar la millor opció per a cada cas. 

![Principals sistemes oeratius](http://2.bp.blogspot.com/-RvsFmMCJlJQ/Tdh5ZxQ8nqI/AAAAAAAAAAM/Y9RUNBh26Pc/s1600/logotipos-sistema-operativo-historia-anecdotas.jpg)

## Tipus de sistemes operatius
El sistema operatiu és el programari responsable de gestionar els recursos d'un equip (ja sigui un ordinador personal, un telèfon mòbil, etc.). Una de les principals funcions és gestionar el maquinari, de manera que els diversos programes no se n'hagin d'ocupar d'això, alleugerint i fent més fàcil així el procés de programació d'aquestes aplicacions. Altra funció important és oferir diversos serveis als programes d'aplicació i als usuaris. Les aplicacions poden accedir a aquests serveis a través de l'**API** (_Application Programming Interface_ o interfície de programació d'aplicacions) o a través de cridaes al sistema. Els usuaris ineractuen amb el sistema per mitjà de la **GUI** (_Graphic User Interface_ o interfície gràfica d'usuari) o per mitjà de l'intèrpret de comandos (**CLI**, _Command Line Interface_).

La gran majoria d'ordinadors, des de telèfons mòbil, ordinadors personals, videoconsoles fins a supercomputadors, usen algun tipus de sistema operatiu. Però hui en dia molts altres equips electrónics tenen un processador i un maquinari prou complexe com per a justificar que tinguen el seu propi sistema operatiu. A més dels telefons mòbils també ho tenen molts sistemes encastats. Un sistema encastat és un sistema de computació (té un processador) però que només fa unes determinades tasques. Exemples d'aquest sistemes són SmartTV, reproductors multimèdia, routers, navegadors per a cotxes, caixers automàtics i fins i tot microones, frigorífics o llavadores.

### Sistemes operatius de telèfons mòbils
Un sistema operatiu mòbil controla un dispositiu mòbil igual que un sistema operatiu per a PC controla un ordinador personal. Tanmateix, els sistemes operatius mòbils són prou més simples i estan més orientats a la connectivitat sense fils, els formats multimèdia i les diferents maneres d'introduir informació en ells.

Alguns dels sistemes operatius mòbils més utilitzats són:
- Android: és el S.O. que porta la majoria de Smartphones i tablets. Es va crear per a càmeres fotogràfiques però Google el va comprar i el va modificar per a ús en telèfons. Està basat en Linux i és programari lliure
- iOS: és el S.O. de Apple per als iPhone, iPad i iPod touch. Està basat en el Mac OS X
- Microsoft Phone: el seu aspecte és similar als Windows per a PC
- BlackBerry: dissenyat per Research in Motion (RIM) per als terminals BalckBerry
- Symbian: un sistema operatiu desenvolupat per moltes companyies (Nokia, Sony Ericsson, Samsung, SIemenes, ...) que es va utilitzar el gran varietat de telèfons durant anys encara que avui ha estat substituit per Android en la majoria de terminals (o Ms Phone en els Nokia)
- Firefox OS: desenvolupat per Mozilla és programari lliure i està basat en Linux
- Ubuntu Touch: creat per Canonical i basat en Linux

### Sistemes operatius de consoles de jocs
Les consoles són ordinadors que han de portar el seu sistema operatiu. Alguns exemples són:
- Playstation 4: utilitza **Orbit OS** que és un fork de **FreeBSD** que veurem més endavant (la PS4 ja no utilitza processadors Cell sino AMD amb arquitectura PC en la part no gràfica)
- XBox: el seu sistema és el **XBox One** (també anomenat XBox OS) que està basat en **Windows 10**
- Nintendo Switch: igual que la PS4 su sistema está basado en **FreeBDS**

¿Por qué pensáis que se usa FreeBSD y no Linux?

### Sistemes operatius per a equips encastats
Ja hem dit que un sistema encastat és un dispossitiu controlat per un processador però que, a diferència d'un ordinador que es pot utilitzar per a moltes tasques, s'utilitza per a realitzar només unes tasques determinades. Normalment són dispossitius amb poca memòria per la qual cosa els seus sistemes operatius han de ser molt petits.

Molts d'aquest aparells tenen el seu propi sistema operatiu per a controlar-los desenvolupat específicament per a ells però altres utilitzen versions de altres sistemes com:
- diferents versions de Linux encastat: basat en el kernel de Linux només ocupen unes 2 MB i s'utilitzen en routers (ex. OpenWrt), telèfons i tot tipus de dispossitius electrònics i industrials
- Windows IoT: la versió de Windows per a equips encastats que substitueix a Windows Embebed i Windows CE (utilitzats en caixers automàtics, sistemes de navegació de cotxes, etc)
- VxWorks: basat en Linux, podem trobar-lo en fotocopiadores, avions, routers, navegadors GPS o la sonda Mars Reconnaisance Orbiter
- FreeBSD: igual que trobem versions de Linux també hi ha versions de FreeBSD (que és un S.O. sencer) en equips com televisors, routers, etc
- Android: a més de en els mòbils podem trobar-lo en microones o llavadores

### Sistemes operatius en el núvol
El més habitual és que la nostra informació no la tenim en un únic equip ni en un USB sinó en el núvol de manera que podem accedir a ella des de qualsevol equip. Però a vegades en l'equip des del qual accedim no tenim instal·lat un programa per a veure un tipus concret de fitxer o simplement volem tindre el nostre entorn d'escriptori. La solució a això són els sistemes operatius en el núvol.

Els **Cloud Operating Systems** o sistemes operatius online funcionen com un sistema totalment funcional però des del navegador web. És a dir, que ofereixen les funcions de qualsevol sistema operatiu referents a la interacció entre l'usuari i la informació (però no entre l'usuari i l'ordinador com sí fan els sistemes operatius clàssics).

L'objectiu dels sistemes operatius online és reunir aplicacions online en un únic lloc perquè puguem treballar o realitzar qualsevol tasca amb independència de l'ordinador que utilitzem i també ens permet guardar arxius i personalitzar el nostre escriptori virtual.

Altre advantatge és que aquets sistemes són escalables, és a dir, que si en un moment donat necessitem més RAM o CPU podem contractar-la.

Alguns dels més utilitzats són:
- **Amazon Web Services (AWS)**. Amazon també ofereix S.O. com servei a més del seu conegut SaaS (Sotfware as a Service). És gratuit els primers 12 mesos i després molts dels seus serveis continuen sent gratis. Per a empreses ofereix el Amazon AppStream  que permet virtualitzar màquines des del navegador. 
- **Microsoft Azure**. Ens permet tindre una màquina que simula ser un PC amb Windows o Linux. El primer mes és gratuït i després haurem de pagar pel ús.
- **Google App Engine**. Amb Google Cloud Platform  ens permet configurar les xarxes i equips remots encara que es de pagament i utilitza unes eines específiques que són complexes per a l'usuari bàsic però és una bona alternativa per a una empresa.
VMWare ha anunciat el seu VMWare Cloud on AWS
- **Chrome OS**, gratuït
- **Horbito**, gratuït imultiplataforma
- i molts altres. Fins i tot podem utilitzar Google Drive com SO en el núvol ja que a banda de espai d'emmagatzemament ofereix programes ofimàtics (documents, fulles de càlcul, presentacions, ...) i la posibilitat d'afegir més programes des de la Google Web Store.
