# Planificación de la instalación
- [Planificación de la instalación](#planificación-de-la-instalación)
  - [Introducción](#introducción)
  - [Requisitos del sistema y licencia](#requisitos-del-sistema-y-licencia)
  - [Versiones](#versiones)
  - [Tipos de instalaciones](#tipos-de-instalaciones)
    - [Actualización](#actualización)
    - [Instalación limpia](#instalación-limpia)

## Introducción
La instalación del sistema operativo es una de las acciones más delicadas que hacemos en un ordenador y tenemos que planificar muy bien qué vamos a hacer para evitar sorpresas desagradables.

Tanto si queremos realizar una instalación nueva como si queremos actualizar el sistema operativo ya existente, se trata de un proceso muy importante y hay que llevar a cabo una buena planificación. Planificar consiste en enumerar las tareas que tenemos que realizar, estimar el tiempo necesario para llevarlas a cabo y asignar los recursos necesarios (humanos y materiales).

A continuación tenéis algunas de las cosas que se deberán hacer durante el proceso de instalación de un sistema operativo cualquiera. En función de qué sistema sea puede variar un poco, pero en general serán bastantes similares:
- Haced una copia de seguridad de cualquier información o documentos que tengáis en el disco duro donde queréis hacer la instalación.
- Recopilad información sobre vuestro ordenador y cualquier otra documentación necesaria antes de empezar la instalación.
- Consultad las diferentes versiones del sistema para elegir la que mejor se adapte a nuestras necesidades así como la licencia del programa para conocer las obligaciones que tendremos
- Consultad los requisitos del sistema operativo y comprobad que el hardware que tenemos es compatible con el sistema a instalar y que cumple **holgadamente** con dichos requisitos.
- **Diseñad las particiones** que haremos para nuestro sistema (tanto para el sistema operativo como para datos) y el sistema de archivos que elegiremos para cada una de ellas. Para ello tendremos en cuenta el tipo de sistema operativo a instalar, si algun otro sistema tiene que acceder también a esa partición, etc. Podemos hacer las particiones antes de empezar la instalación con alguna herramienta de particionamento (como _gparted_, _Partition Magic_, etc) o utilizar el asistente que incluirá el programa de instalación del sistema operativo para hacerlas.
- Localizad y/o descargad el software del instalador y los ficheros de cualquier driver que necesite nuestra máquina.
- Configurad los CDs/USBs de arranque, o poned donde corresponda los ficheros de arranque (también se pueden hacer instalaciones automatizadas desde la red).
- Configurad la secuencia de arranque de la BIOS para que arranque desde el dispositivo donde tenemos los ficheros de arranque de la instalación
- Arrancad el sistema de instalación.

A partir de ahora según el sistema a instalar empezará un proceso más o menos parecido, pero con diferencias en algunos aspectos. Una vez instalado el sistema tendremos que comprobar su correcto funcionamiento y a continuación **configurarlo** adecuadamente para adaptarlo a las necesidades del usuario.

Finalmente tenemos que **documentar** todo el proceso de instalación y configuración, incluyendo las incidencias que hemos tenido y su solución.

## Requisitos del sistema y licencia
Antes de elegir el sistema a instalar tenemos que revisar la documentación técnica oficial del sistema en cuestión para comprobar si nuestro equipo cumple los requerimientos que pide ese sistema operativo. Hay que tener en cuenta que generalmente los requisitos mínimos o típicos que nos piden son muy ajustados, y por lo tanto nuestro equipo no funcionará aceptablemente si los cumplimos demasiado justos.

Respecto a la licencias del sistema a instalar ya estudiamos en la UD 1 los diferentes tipos de licencias que podemos encontrar. Cuando instalamos programas, especialmente en el mundo empresarial, tenemos que ser muy cuidadosos y respetar los términos de las licencias. Si no lo hacemos podemos tener problemas a la hora de actualizar los programas (lo cual es importante como veremos más adelante) además de problemas legales.

Recordad que siempre tenemos la opción de elegir software libre!!!

## Versiones
Cuando elegimos el sistema operativo a instalar en un equipo, especialmente si hemos escogido uno de Microsoft, tenemos que elegir también qué versión o edición de ese sistema es la más adecuada para nuestras necesidades.

A continuación a modo de ejemplo podéis ver algunas de las principales ediciones de Windows 10:
- Windows 10 Home: es la versión estándar y está pensada para usuarios domésticos.
- Windows 10 Pro: incluye mejoras para profesionales y Pymes como la posibilidad de formar parte de un dominio, escritorio remoto, etc.
- Windows 10 Enterprise: pensada para grandes empresas, incluye mayores capacidades de protección de los equipos y los datos.
- Windows 10 Mobile: es la versión para smartphones y tablets. No ha tenido e éxito que se esperaba y Microsoft ha finalizado el soporte a partir de Diciembre de 2019
- Windows 10 IoT: para dispositivos como Raspberry
- y varias más (Windows 10 Enterprise LTSB, Windows 10 Education, Windows 10 Pro for Workstations, ...)

Hay que tener en cuenta que la mejor opción no es siempre la más completa sino la que más se adecúa a nuestras necesidades. No tiene sentido pagar por características que no vamos a usar.

## Tipos de instalaciones
Cuando instalamos un sistema operativo tenemos la opción de hacer una instalación limpia o bien de hacer una actualización sobre un sistema operativo ya presente.

### Actualización
Esta opción nos permite instalar el nuevo sistema operativo sobre otro ya existente en el ordenador. Puede ser una actualización si estamos instalando una versión más moderna del sistema operativo (por ejemplo si pasamos de Windows 10 a Windows 11 o de Ubuntu 20.04 a Ubuntu 22.04) o bien una reparación del sistema porque no arranca o no funciona bien.

En el caso de una reparación lo que hacemos es volver a copiar los ficheros del sistema operativo desde el medio de instalación (USB o CD) y se hace porque alguno de esos ficheros se puede haber estropeado haciendo que nuestro sistema no funcione correctamente.

La principal ventaja de una actualización es que se conservan todos los programas instalados así como las diferentes configuraciones de programas y usuarios.

El principal inconveniente es que se mantienen todos los problemas de configuración que tuviera nuestro sistema anterior. Esto es muy importante en Windows puesto que este sistema operativo, especialmente si instalamos y desinstalamos a menudo programas y utilidades, tiene tendencia a ir funcionando cada vez peor y más lento porque algunos programas al desinstalarse no lo hacen correctamente y dejan "restos" en el registro de Windows, etc.

### Instalación limpia
Se hace en un ordenador sin sistema operativo (o si lo tiene vamos a desecharlo, quizá porque el rendimiento de nuestro sistema ha ido degradándose con el tiempo).

Normalmente formatearemos la partición en la cual haremos la instalación por lo que se pierden todos los programas instalados y tenemos que volver a instalar todo nuestro software después del sistema operativo. Si estamos volviendo a instalar el sistema aunque no formateáramos la partición no tendremos los programas instalados puesto que el sistema operativo no tiene conocimiento de ellos (aunque sus ficheros sí los tendremos en el disco duro ocupando espacio).

Para evitar todo el esfuerzo de volver a instalar y configurar el sistema operativo y todos los programas que necesitamos es muy recomendable **hacer una imagen** del sistema una vez que hemos acabado de configurarlo. Así en cualquier momento podemos restaurar ese imagen y volver a tener el sistema como cuando la hicimos en pocos minutos.
