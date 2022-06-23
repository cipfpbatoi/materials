# Bloque 1: Instalación de sistemas operativos libres i propietarios
En este primer bloque del curso vamos a aprender los conceptos básicos sobre sistemas operativos y vamos a instalar sistemas de escritorio para ser usados en equipos clientes de una red de ordenadores.

Así mismo veremos qué es la virtualización y como utilizar el programa Virtualbox para crear las máquinas virtuales que utilizaremos a lo largo del curso.

El bloque está compuesto por 5 unidades de trabajo:

- [UD 1 Introducción a los sistemas operativos](ud01): esta es la unidad más teórica de todo el curso y en ella veremos los conceptos básicos de qué es un sistema operativo y los diferentes tipos que hay.
- [UD 2 Virtualización](../../../altres/virtualitzacio/): aquí veremos todo lo relacionado con la virtualización para poder trabajar con máquinas virtuales.
- [UD 3 Instalación](ud03): en esta unidad instalaremos diferentes sistemas operativos y veremos las cosas básicas a configurar durante el proceso de instalación.
- [UD 4 Sistemas de archivos](ud04): en esta unidad conoceremos diferentes sistemas de archivos, la gestión de permisos y la estructura de estos.
- [UD 5 Comandos](ud05): en esta unidad conoceremos los principales comandos para Windows y GNU/Linux.

## Introducción

Actualmente cualquier empresa maneja enormes cantidades de información. El **sistema informático** de la empresa es el encargado de tratar toda esa información y está formado por el _hardware_ (todos los elementos físicos del sistema), el _software_ (todos los programas que hacen que funcionen y realicen las tareas que se necesitan) y también los recursos humanos que hacen que el sistema funcione correctamente.

En la parte del **_hardware_**, además de los equipos informáticos y sus periféricos tenemos la **red informática** que permite la interconexión de los diferentes equipos para intercambiar datos o compartir recursos entre ellos. Respecto a los **periféricos** permiten a un ordenador comunicarse con el entorno y con quien lo maneja y habitualmente se clasifican en periféricos de entrada (para introducir datos en el equipo) de salida (para mostrar resultados) y de entrada-salida, como son los periféricos de almacenamiento y de comunicaciones.

Respecto al **_software_** tenemos el **software base** (cuyo núcleo principal es el sistema operativo) que permite al equipo hacer las funciones básicas y sin el que el ordenador no puede funcionar y el **software de aplicación** que permite realizar tareas específicas (como un procesador de textos para escribir o un navegador web).

Cada programa tiene una licencia que indica qué podemos y qué no podemos hacer con el mismo. Existen 2 grandes tipos de software en función de su licencia:
- software libre: el usuario tiene libertad para usar el programa para lo que desee. También tiene acceso al código fuente del mismo por lo que puede saber cómo funciona dicho programa e incluso mejorarlo y compartir con otros usuarios dichas mejoras. Existen muchas licencias de software libre como GPL, MIT, MPL, ...
- software privativo: existen limitaciones a lo que el usuario puede hacer con un programa y normalmente no tiene acceso a su código fuente por lo que no sabe cómo funciona exactamente (o si su código incluye algún _troyano_ u otro tipo de software malicioso). Tampoco puede modificar el programa ni distribuirlo a otros usuarios. Cada programa suele tener su propia licencia donde se indican las restricciones del mismo, llamada EULA (End User License Agreement). 

