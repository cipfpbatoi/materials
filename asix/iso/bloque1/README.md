# Bloque 1: Instalación de sistemas operativos libres y propietarios
En este primer bloque del curso vamos a aprender los conceptos básicos sobre sistemas operativos y vamos a instalar sistemas de escritorio para ser usados en equipos clientes de una red de ordenadores.

Así mismo veremos qué es la virtualización y como utilizar el programa Virtualbox para crear las máquinas virtuales que utilizaremos a lo largo del curso.

## Introducción
Actualmente cualquier empresa maneja enormes cantidades de información. El **sistema informático** de la empresa es el encargado de tratar toda esa información y está formado por el _hardware_ (todos los elementos físicos del sistema), el _software_ (todos los programas que hacen que funcionen y realicen las tareas que se necesitan) y también los recursos humanos que hacen que el sistema funcione correctamente.

En la parte del **_hardware_**, además de los equipos informáticos y sus periféricos tenemos la **red informática** que permite la interconexión de los diferentes equipos para intercambiar datos o compartir recursos entre ellos. Respecto a los **periféricos** permiten a un ordenador comunicarse con el entorno y con quien lo maneja y habitualmente se clasifican en periféricos de entrada (para introducir datos en el equipo) de salida (para mostrar resultados) y de entrada-salida, como son los periféricos de almacenamiento y de comunicaciones.

Respecto al **_software_** tenemos el **software base** (cuyo núcleo principal es el sistema operativo) que permite al equipo hacer las funciones básicas y sin el que el ordenador no puede funcionar y el **software de aplicación** que permite realizar tareas específicas (como un procesador de textos para escribir o un navegador web).

Cada programa tiene una licencia que indica qué podemos y qué no podemos hacer con el mismo. Existen 2 grandes tipos de software en función de su licencia:
- **software libre**: el usuario tiene libertad para usar el programa para lo que desee. También tiene acceso al código fuente del mismo por lo que puede saber cómo funciona dicho programa e incluso mejorarlo y compartir con otros usuarios dichas mejoras. Existen muchas licencias de software libre como GPL, MIT, MPL, ...
- **software privativo**: existen limitaciones a lo que el usuario puede hacer con un programa y normalmente no tiene acceso a su código fuente por lo que no sabe cómo funciona exactamente (o si su código incluye algún _troyano_ u otro tipo de software malicioso). Tampoco puede modificar el programa ni distribuirlo a otros usuarios. Cada programa suele tener su propia licencia donde se indican las restricciones del mismo, llamada **EULA** (End User License Agreement). 

## Contenidos del bloque
El bloque está compuesto por 3 Situaciones de Aprendizaje (_S.A._):
- **S.A. 1 Instalación de sistemas operativos**: en esta S.A. veremos los conceptos básicos de qué es un sistema operativo y los diferentes tipos que hay e instalaremos sistemas operativos en máquinas virtuales. Tiene varios apartados:
  - [SA01-1 Introducción a los sistemas operativos](SA01-1): esta es la unidad más teórica de todo el curso y en ella veremos los conceptos básicos de qué es un sistema operativo y los diferentes tipos que hay.
  - [SA01-2 Virtualización](../../../altres/virtualitzacio/): aquí veremos todo lo relacionado con la virtualización para poder trabajar con máquinas virtuales.
  - [SA01-3 Arranque e instalación del sistema](SA01-3-instal): en esta unidad instalaremos diferentes sistemas operativos y veremos las cosas básicas a configurar durante el proceso de instalación.
  - [SA01-4 Comandos](SA01-4-comandos): en esta unidad conoceremos los principales comandos para Windows y GNU/Linux que necesitaremos durante la configuración y uso de los sistemas.
- **S.A. 2: Gestión de usuarios y grupos. Gestión de la red**: los apartados que tiene son:
  - [SA02-1: Configuración de la red](SA02-1-red): veremos cómo configurar la red del sistema, tanto en Windows como en GNU/Linux. 
  - [SA02-2: Usuarios y grupos](SA02-2-users): veremos cómo gestionar los usuarios y grupos de un sistema operativo.
- **S.A. 3: Gestión de sistemas de archivos. RAID, LVM y cuotas**: en esta S.A. veremos cosas relacionadas con el almacenamiento de datos en el sistema. Tiene varios apartados:
  - [SA03-1: Sistemas de archivos](SA03-1): en esta unidad veremos cómo se gestionan los sistemas de archivos en Windows y GNU/Linux.
  - [SA03-2: RAID](SA03-2-raid): en esta unidad veremos qué es el sistema RAID y cómo se configura.
  - [SA03-3: LVM](../../../altres/sistemes-operatius/lvm/): aquí veremos qué es el sistema LVM y cómo se configura.
  - [SA03-4: Cuotas de disco](SA03-4-cuotas): en esta unidad veremos cómo se pueden configurar cuotas de disco en Windows y GNU/Linux.