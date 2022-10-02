# Introducción a los Sistemas Operativos

- [Introducción a los Sistemas Operativos](#introducción-a-los-sistemas-operativos)
  - [Objetivos de la unidad](#objetivos-de-la-unidad)
  - [Conceptos clave](#conceptos-clave)
  - [Estructura de un sistema informático](#estructura-de-un-sistema-informático)
    - [Hardware](#hardware)
    - [Software](#software)
  - [Arquitectura de un sistema Operativo.](#arquitectura-de-un-sistema-operativo)
    - [Elementos y estructura de un Sistema Operativo (SO)](#elementos-y-estructura-de-un-sistema-operativo-so)
  - [Funciones del Sistema Operativo.](#funciones-del-sistema-operativo)
    - [Administrar recursos Hardware](#administrar-recursos-hardware)
  - [Proporcionar una interfaz](#proporcionar-una-interfaz)
  - [Tipos de Sistemas Operativos.](#tipos-de-sistemas-operativos)
  - [Licencias](#licencias)
    - [Licencias no-libres o privativas](#licencias-no-libres-o-privativas)
    - [Licencias de software de código abierto](#licencias-de-software-de-código-abierto)
    - [Licencias permisivas o académicas](#licencias-permisivas-o-académicas)
    - [Licencias con copyleft fuerte](#licencias-con-copyleft-fuerte)
    - [Llicències mixtes o amb copyleft suau.](#llicències-mixtes-o-amb-copyleft-suau)
    - [Creative Commons](#creative-commons)

## Objetivos de la unidad

Los objetivos a alcanzar en esta unidad de trabajo son los siguientes:

* Identificar los elementos funcionales de un sistema informático
* Identificar las características, funciones y arquitectura de un sistema operativo
* Comparar diferentes sistemas operativos, sus versiones y licencias de uso

## Conceptos clave

Los conceptos más importantes de esta unidad son:

* Hardware y software. Software de base y de aplicación
* Componentes físicos. Arquitectura von Newmann
* Principales arquitecturas de procesadores
* Funciones de un sistema operativo
* Clasificación de sistemas operativos
* Tipos de aplicaciones y licencias
* S.O. Windows: versiones cliente y servidor; ediciones
* S.O. Debian: ramas de desarrollo
* S.O. Ubuntu: versiones; soporte; versiones no oficiales

## Estructura de un sistema informático

* El ordenador és la herramienta que nos permite el procesamiento automático de la información.
* Un ordenador no és más que una máquina formada per elementos mecánicos y electrónicos.
* El que diferencia un ordenador de otras máquinas es que el ordenador és programable, és decir, que puede recibir instrucciones que le indican como tiene que funcionar.
* El ordenador se una máquina compuesta por elementos físicos (electrónicos y eléctricos).
* Esto se denomina comúnmente **Hardware**.
* Este hardware necesita de órdenes o instrucciones que hacen funcionar el **hardware** de una manera determinada. 
* Podemos denominar programa a un conjunto de instrucciones que la denominamos programa a un conjunto de instrucciones que le permiten al ordenador hacer una tarea. Al conjunto de todos los elementos no físicos, es decir, de todos los programas del ordenador se lo denomina **Software**.
* Dentro del **software** hay un especial, llamado **software de base**, que hace posible que el ordenador funcione: el *Sistema Operativo*.
* Entre el **software** y el **hardware** hay otro tipo de elemento: el **Firmware**.

### Hardware
  
![Arquitectura](media/Arquitecturaneumann.jpg)

Vamos a ver a grandes rasgos algunos de los componentes más importantes de un ordenador. 
 
* ***Unidad Central de Proceso*** (CPU): es el elemento encargado del control y ejecución de las operaciones que se realizan dentro del ordenador. La CPU esta formado por las *siguientes partes:
 * **Unidad de Control**: es la parte que piensa del ordenador. Su función es recibir cada instrucción de un programa interpretarla y enviar a cada dispositivo las señal de control necesarias para ejecutarla.
 * **Unidad Aritmética-*Lógica**: es la encargada de realizar operaciones aritméticas y lógicas sobre los datos.
 * **Registros**: almacenan temporalmente la información con la cual está trabajando la CPU (la instrucción que está ejecutándose y los datos sobre los cuales opera esa instrucción).
 
* ***La Memoria***: es donde se almacena la información, tanto instrucciones como datos. Se puede dividir en:
 * Memoria de almacenamiento masivo o secundaria.
 * Memoria interna o principal o RAM.
 * Memoria Cache
 * Memoria ROM.
 
* ***Unidades de entrada/salida y buses***: Sirve para comunicar el procesador y el resto de los componentes internos del ordenador, con los periféricos de entrada/salida y las memorias de almacenamiento externo o auxiliares.externo o auxiliares
 
* Los ***buses*** son las líneas por las cuales viaja la información entre los diferentes componentes del ordenador.
 
* ***Periféricos***: son dispositivos hardware con los cuales el usuario puede interactuar con el ordenador.
 * Los periféricos se conectan al ordenador mediante los llamados puertos.
 * Los periféricos necesitan de un programa especial que tenemos que instalar en el ordenador para poder usarlos. 

Arquitecturas de CPU. El elemento más importante para ejecutar una instrucción es el procesador. Los pasos para ejecutar una instrucción:

1. Se lee la instrucción de memoria.
2. Se decodifica la instrucción (qué se tiene que hacer).
3. Se encuentran los datos necesarios para procesar la instrucción.
4. Se procesa la instrucción.
5. Se escriben los resultados en memoria.

No todos los procesadores funcionan igual. Cada uno las realiza de una forma diferente. Tiene conjunto de instrucciones que puede ejecutar. La arquitectura más común se la PC. Las que han salido posteriormente, normalmente son compatibles con en esta. Un Sistema Operativo. Solamente se puede ejecutar sobre una máquina con la arquitectura por el que se ha diseñado. 


### Software

Existen 2 tipos de software principalmente:

* Software de base o sistema
* Software de aplicación

El software de aplicaciones es el conjunto de programas y paquetes informáticos instalados por el usuario para realizar tareas concretas como editar textos, retocar fotografías, realizar cálculos, etc.realizar cálculos, etc. Software de sistema o de base son aquellos programas que hacen posible que el ordenador funciono y se pueda comunicar con el usuario.El software de base lo constituyen el sistema operativo con el cual trabaja el ordenador, los drivers que permiten el funcionamiento de los distintos periféricos (que son específicos para ese sistema operativo) y otros programas de utilidad.

El sistema operativo es también el cual proporciona la interfaz de usuario mediante la cual el usuario se comunica con el ordenador y le indica el que desea hacer en cada momento.

![prog](./media/ud1-01.png)

## Arquitectura de un sistema Operativo.

El sistema operativo es el software básico del ordenador sin el cual este no funciona. Gestiona todos los recursos hardware del sistema y proporciona la base sobre la cual se ejecuta el software de aplicación. Además proporciona al usuario la forma de comunicarse. Además proporciona al usuario la forma de comunicarse con el ordenador mediante una interfaz de texto o gráfica.

Por ejemplo, cuando un usuario quiere guardar un fichero en el disco duro simplemente le indica el sistema operativo el nombre del fichero y en qué carpeta lo desea guardar, siendo el S.O. el cual se preocupará de buscar sectores vacíos en el disco
duro.

No todos los sistemas operativos se pueden instalar en cualquier sistema informático, ni todos los equipos pueden soportar cualquier sistema operativo.

### Elementos y estructura de un Sistema Operativo (SO)

Como podemos imaginar, un sistema operativo es un programa muy complejo que debe estar muy bien organizado y estructurado internamente para llevar a cabo su trabajo de una forma muy eficiente. En este sentido, los sistemas operativos se subdividen en diferentes componentes que se encuentran especializados en aspectos muy concretos del mismo.

Los elementos que constituyen la mayoría de los sistemas operativos son lo siguientes:

* Gestor de procesos.
* Gestor de memoria virtual.
* Gestor de almacenamiento secundario.
* Gestor de entrada y salida.
* Sistema de archivos.
* Sistemas de protección.
* Sistema de comunicaciones.
* Programas de sistema.
* Gestor de recursos.

Ahora que ya sabemos que el sistema operativo se divide en distintos elementos, podemos plantearnos el modo en el que dichos elementos se organizan dentro del sistema operativo para llevar a cabo su cometido. También será importante para el diseño del sistema establecer qué componentes del mismo se ejecutan en modo núcleo y cuáles en modo usuario.

El núcleo de un sistema operativo también suele recibir el nombre de kernel.

En este sentido, los planteamientos que se aplican en los sistemas operativos más conocidos son los siguientes:

* Monolítico. En este tipo de sistemas, el núcleo concentra la mayor parte de la funcionalidad del sistema operativo (sistema de archivos, gestión de memoria, etc), de modo que todos sus componentes principales se ejecutarán en modo núcleo. Aunque estos componentes se programen de forma separada se unen durante el proceso de compilación mediante un enlazador (linker).
* Micronúcleo. n este tipo de sistemas, el núcleo sólo contiene la implementación de servicios básicos como el soporte de acceso a memoria de bajo nivel, la administración de tareas y la comunicación entre procesos (también conocida como IPC, del inglés, Inter-Process Communication).
* Núcleo híbrido. Este tipo de arquitectura consiste básicamente en un esquema de micronúcleo que incluye algo de código complementario para hacerlo más rápido, aunque buena parte de las funciones del sistema operativo siguen ejecutándose en modo usuario.

## Funciones del Sistema Operativo.

### Administrar recursos Hardware

El S.O no es más que un programa que dirige al procesador en la ocupación de los recursos del sistema. 
* El **kernel** (núcleo) se una parte del S.O que siempre esta en la memoria principal.
* Para realizar las funciones de administración del hardware los sistemas operativos tienen que proporcionar determinados servicios:
 * Gestión de ejecución de programas.
 * Gestión de memoria.
 * Administración de periféricos.
 * Gestión de sistema de archivos
 * Otros funciones, como gestión de red o de usuarios...

## Proporcionar una interfaz

El sistema operativo hace de intermediario entre estos elementos y el hardware del equipo. Respecto a los programas de aplicación los proporciona una serie de funciones porque utilizan el hardware sin tener que utilizan el hardware sin tener que preocuparse de la complejidad del mismo.

Al usuario le proporciona una interfaz, que puede ser:

* De texto.
* Gráfica.


## Tipos de Sistemas Operativos.

Los sistemas operativos se pueden clasificar según varios parámetros:

* Según la **forma de explotación**:
  * Proceso por lotes.
  * Proceso en tiempo compartido o real.
* Según el **número de usuarios**:
  * Monousuario: son aquellos que únicamente soportan un usuario a la vez y todos los dispositivos de hardware están a disposición de ese usuario y no pueden
ser utilizados por otros hasta que éste no finalice su uso. Ejemplos: DOS, Windows 3.x/98/ME/XP.
  * Multiusuario: dan servicio a más de un usuario a la vez. Los usuarios pueden compartir dispositivos externos de almacenamiento, periféricos de salida,
acceso a una misma base de datos instalada en el ordenador principal, etc. Los usuarios pueden utilizar el ordenador principal de la siguiente forma: mediante
terminales (teclado y monitor) o bien mediante ordenadores clientes conectados al servidor. Ejemplos: UNIX, Windows NT Server, Windows 2000 Server, etc.
* Según el **número de tareas o procesos**:
  * Monotarea: son aquellos que sólo permiten una tarea a la vez por usuario. Puede darse el caso de un sistema multiusuario y monotarea, en el cual se admiten
varios usuarios al mismo tiempo, pero cada uno de ellos puede estar haciendo sólo una tarea a la vez. Ejemplos: DOS, Windows 9x.
  * Multitarea: es aquel en el que se permite al usuario estar realizando varios trabajos al mismo tiempo. Para ello, la CPU comparte el tiempo de uso del procesador entre los deferentes programas que se desean ejecutar. Ejemplos: Windows NT4.0, Windows 200, Windows XP Professional, Windows 2003 Server, UNIX, etc.
* Según el **número de procesadores**.
  * Monoprocessador: En este tipo de SO, el ordenador sólo tiene un procesador y por lo tanto, únicamente se ejecuta un proceso a la vez. Sin embargo, permiten la
multitarea haciendo que el sistema realice una tarea rotatoria con intercambio muy rápido. Algunos ejemplos de SSOO monoproceso son: DOS y todos los que se puedan instalar en este tipo de sistemas informáticos. El resto, aunque potencialmente puedan ser multitarea (Windows NT, Unix, Linux, Novell) o pseudo
multitarea (Windows 9x, ME), si funcionan con un solo procesador se catalogan como monotarea.
  * Multiprocesador: Cuentan con más de un procesador y permiten realizar varios procesos simultáneamente y por lo tanto, varias tareas. Ejemplos de este tipo de SO son: Windows NT 4.0, Windows 2000/2003, Windows XP, Linux, Unix, etc.
* Según **cómo ofrece los servicios**.
  * Sistemas operativos de escritorio.
  * Sistemas Operativos en red.
  * Sistema centralizado.
  * Sistemas distribuidos.
* Según **la licencia**.
  * Privativos
  * Libres.

## Licencias 


La licencia de software es, según el Derecho español, el contrato por el cual el titular de un programa autoriza al usuario a utilizarlo, cediéndole los derechos necesarios para este uso. 

La licencia de software cumple una doble función:

* Asegurar los derechos del usuario (las autorizaciones)
* Reservar y proteger los derechos del titular (los derechos no cedidos y las condiciones que tiene que cumplir el usuario).

Por lo tanto la licencia establece determinados derechos y obligaciones entre las partes. Y es en este punto donde se diferencian las licencias del software de código abierto (**Open Source Software**) y las licencias no libres o privativas:

* Software de código abierto conceden amplios derechos al usuario (incluidos los de modificar el software y volver a distribuirlo)
* Las licencias no libres suelen limitar o imponer condiciones drásticas.

Cómo vemos en el diagrama, cada conjunto (software libre, no libre) incluye determinados subtipo de licencias subtipos de licencias (permisivas, copyleft, etc.), que se diferencian entre sí por las condiciones que se establecen en ellas.

![Soft](./media/ud1-02.png)

### Licencias no-libres o privativas

Se puede decir que hay tantas licencias no-libres como software propietario. 

* Software estándar de distribución masiva: Ms Windows o MacOS.
* Software empresarial por parametrización, como SAP.
* Software desarrollado a medida por un cliente particular.

Las condiciones especificas dependerán de aspectos como:

* Tipo de software
* Posición de las partes que negocian el contrato
* Jurisdicción del lugar donde se vende

Para ejercer los derechos de estas licencias, el usuario deberá de cumplir una serio de obligaciones

* Pago de derechos de licencia.
* Prohibición de la copia, modificación y redistribución
* Y otras limitaciones que interponga el fabricante.

![privativa](./media/ud1-03.png)

Dentro de les licencias privativas nos encontramos las de tipo *Freeware*, *Shareware* y *Adware*.

**Freeware**:

* Su nombre indica *Software gratuito*.
* No tiene ningún coste.
* Su utilización se por tiempo ilimitado.
* No suele incluir el código fuente (aunque lo podría).
* Suele incluir una licencia de uso en la que se puede redistribuir.

![freeware](./media/ud1-04.png)

**Shareware**:

* El programa se distribuye en limitaciones.
* Puede ser versión demo o de evaluación.
* Tiene funciones o características mínima o con uso restringido a un tiempo establecido.
* Para conseguir el uso del software de manera completa, se requiere un pago.

![shareware](./media/ud1-05.png)

**Adware**:

* Programa totalmente gratuito.
* Incluye publicidad en el programa, durante su instalación o durante su uso.
* Hay programas que pueden ser shareware a la misma vez que Adware.

### Licencias de software de código abierto

Las licencias de código abierto, permiten entre otras cosas:

* Descargar, instalar y ejecutar el software sin limitaciones.
* Descargar el código fuente y estudiarlo.
* Analizar las interfaces para hacer un software interoperable.
* Modificar el software por adaptarlo a sus necesidades, recompilarlo y ejecutarlo.
* Utilizar parte del código por otro software.
* Ampliar el Software original.
* Integrarlo en otro software para mejorar sus funcionalidades.
* Redistribuir o comunicar públicamente el software original.
* Del mismo modo, redistribuir el software modificado y las extensiones (respetando siempre las condiciones de la licencia
* Crear documentación sobre el software y meterla en la venta.

Tipo de licencia.

* No todas las licencias de código abierto son iguales,
* Hay casi 70 licencias **OpenSource** certificadas por *OSI*.
* Es importante conocer las licencias siempre que utilizamos un software de código abierto.
* La mayor diferencia radica en las condiciones aplicables a la redistribución, en particular en en cuanto al grado de copyleft.
  
![opensource](./media/ud1-06.png)

Aparte del copyleft, las licencias se caracterizan para aplicar condiciones adicionales sobre temas que sus autores han creído importante:

* Prohibir lo os del nombre del titular para promover el software. (Apache Software License)
* El alcance de la licencia de patentes (MPL, CPL, GPLv3)
* El derecho aplicable y la jurisdicción competente para resolver conflictos (MPL,CPL)
* Acceso a código fuente medios sistemas remotos(OSL, CDDL y Affero GPL)


### Licencias permisivas o académicas

Se denominan de esta forma puesto que no imponen ninguna condición particular en en cuanto a la redistribución del software excepto mantener los avisos legales y las limitaciones de garantía y responsabilidad.

Este tipo de licencia es el resultado del deseo de sus autores de compartir el software con cualquier finalidad sin imponer obligaciones que
suben restringir los usos tanto personales como comerciales, libros o privativos.

Las más conocidas son:

* **BSD**. (Berkeley Software Distribution). Es una licencia que para sus detractores es prácticamente una licencia de software libe, más que libre. Si creas un programa X y otro lo quiere utilizar, lo podrá tomar libremente, solo respetando tu autoría pero sin liberar los cambios que hayan hecho.

* **ASL**. (Apache Software License)

### Licencias con copyleft fuerte

Son las que exigen el uso de la misma licencia para cualquier redistribución del programa y de las modificaciones que se realicen del mismo, así como a programas que lo utilicen o incorporan.

Su objetivo básico es asegurar que cualquier usuario (directo o indirecto) del software siempre tenga acceso al código fuente, bajo los términos de esta
misma licencia.

Como consecuencia, se impide la distribución del software con copyleft en aplicaciones privativas. 

Esto no significa que no se puedan crear y vender aplicaciones comerciales con software copyleft. Pero sí será una violación de la licencia redistribuir este software bajo otra licencia.

***GPL*** (General Public License) 

* Licencia con código copyleft más conocida.
* Software se utiliza en la mayoría de programas de GNU.
* Su finalidad es proteger los derechos de los usuarios finales (usar, compartir, estudiar y modificar) finales (usar, compartir, estudiar y modificar)
* Los trabajos derivados solo pueden ser distribuidos bajo los términos de la misma licencia.

![gpl](./media/ud1-07.png)

### Llicències mixtes o amb copyleft suau.

Inclouen clausules de copyleft sols pel codi original, sense que afecte a altres programes que l’integren o l’utilitzen.

Permetent l'ús del programari per programes que es distribueixin sota una llicència diferent (la Lesser GPL o LGPL).

Permetent la seva incorporació en una obra més àmplia (o "obra major") la llicència de la qual, igualment, pot ser diferent (MPL i CDDL28, entre altres).

**Llicència MPL (Mozilla Public License)**

Compleix completament amb la definició de Programari de codi Obert de la Open Source Initiative (OSI) i amb les llibertats del software lliure enunciades per la Free Software Foundation (FSF) 

Però deixa ja obert el camí a una possible reutilització no lliure del software, si el usuari així ho desitja.

Té els seus orígens en la empresa Netscape Communications per al seu navegador.

Serveix com a llicencia de control per el navegador Firefox i el seu client de correu Thunderbird.

També es àmpliament utilitzat per desenvolupadors i programadors que volen alliberar el seu codi.

![netscape](./media/netscape.jpg)

### Creative Commons

Llicencia que s’aplica a la documentació. Permet elegir al autor quin tipus de dret vol cedir.

- **Reconeixement**: el us de l’obra deu reconèixer l’autoria original.
- **No comercial**: l’utilització de l’obra queda limitada a un us no comercial.
- **Sense Obres derivades**: no es pot permetre modificar l’obra per crear-ne un altra.
- **Compartir igual**: Es permet crear obres derivades sempre que es mantinguen la llicència.

<img src="./media/ud1-08.png" title="CC" width="60%">

<img src="./media/ud1-09.png" title="CC" width="25%">
