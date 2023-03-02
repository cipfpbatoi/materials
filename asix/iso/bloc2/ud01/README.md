# Bl2. UD 1 - Introducción a los dominios
- [Bl2. UD 1 - Introducción a los dominios](#bl2-ud-1---introducción-a-los-dominios)
  - [Contenidos](#contenidos)
  - [Objetivos de la unidad](#objetivos-de-la-unidad)
  - [Conceptos clave](#conceptos-clave)
  - [Conocimientos previos](#conocimientos-previos)
  - [Caso práctico](#caso-práctico)
    - [Fases en la implantación de un sistema informático](#fases-en-la-implantación-de-un-sistema-informático)
    - [Análisis del sistema](#análisis-del-sistema)
    - [Diseño del sistema](#diseño-del-sistema)


## Contenidos
Los contenidos de esta unidad son los siguientes:
1. [Red de ordenadores. Arquitectura cliente/servidor](arq-cs.md)
2. [Principales S.O. de servidor](so-srv.md)
3. [Dominios](dominios.md)
4. [Active Directory](ad.md)
 
## Objetivos de la unidad
Los objetivos a alcanzar en esta unidad de trabajo son los siguientes:
- Implementar dominios.
- Administrar cuentas de usuario y cuentas de equipo.
- Organizar los objetos del dominio para facilitar su administración.
- Utilizar máquinas virtuales para administrar dominios y verificar su funcionamiento.
- Incorporar equipos al dominio.
- Bloquear accesos no autorizados al dominio.
- Hacer cumplir los requerimientos de seguridad.
- Documentar la estructura del dominio, las tareas realizadas y las incidencias producidas.

## Conceptos clave
- La red informática
- Arquitectura cliente/servidor
- Principales sistemas operativos de servidor

## Conocimientos previos
Antes de comenzar esta unidad de trabajo el alumno debería saber:
- cuáles son los sistemas operativos más utilizados en la arquitectura PC
- cómo utilizar software de virtualización para crear máquinas virtuales
- gestionar unidades de almacenamiento y sus particiones
- cuáles son los sistemas de archivo utilizados por los sistemas Microsoft y sus ventajas e inconvenientes
- cómo asignar permisos a ficheros y carpetas en sistemas de archivo NTFS
- cómo utilizar la terminal para realizar tareas básicas en una máquina

## Caso práctico
En el centro donde estudiamos la ESO van a ofrecer el año próximo como opcional la asignatura de Informática y como el director sabe que somos un poco "manitas" en esto de la informática y que estamos estudiando el ciclo de _Administración de Sistemas Informáticos y Redes_ nos ha pedido que le echemos una mano para montar en el centro un aula informática y configurarla con todo lo necesario.

Nuestro trabajo va a consistir en instalar y configurar todo el software del aula informática, tanto a nivel de sistema de base como programas de aplicación para que el aula sea totalmente funcional y el mantenimiento de la misma sea lo más sencillo posible.

Esta será la actividad que iremos realizando en clase y que nos servirá para exponer los diferentes contenidos del módulo así como para saber cómo ir realizando el proyecto general del módulo.

### Fases en la implantación de un sistema informático
Para llevar a cabo esta tarea deberemos ejecutar las siguientes fases:
- **análisis**: consiste en identificar qué se necesita. Algunas de las tareas a realizar son:
  - identificar los problemas del sistema actual
  - determinar los objetivos del nuevo sistema
  - fijar los recursos disponibles, tanto materiales como humanos
  - encontrar diferentes soluciones posibles e identificar ventajas e inconvenientes de cada una
- **diseño**: se deberán buscar las soluciones concretas para satisfacer las necesidades descritas en la fase de análisis. Esta fase finalizará con la redacción del proyecto donde se recogen las soluciones a implantar, el coste del mismo, cómo se realizará la implantación, necesidades de formación del personal, etc
- **implementación**: una vez aceptado el proyecto por parte del cliente se llevará a cabo su implantación así como la formación a los usuarios en caso necesario

Existe una última fase que es la de **mantenimiento** donde se solucionarán las incidencias producidas y, en muchos casos, se implantarán mejoras.

### Análisis del sistema
El primer paso será realizar el **análisis** de todo lo necesario para montar el sistema informático para cubrir las necesidades del cliente. Para conocer dichas necesidades deberemos hablar con jefatura de estudios y con el profesorado encargado de impartir clases en dicha aula.

Se supone que ya está montada el aula a nivel de hardware y de red, con lo que no necesitamos ocuparnos ni de conocer la legislación vigente para dichas aulas ni de buscar el hardware más adecuado: hay el que hay.

Por tanto los primeros pasos a realizar serán:
- Tener una reunión o entrevista con dirección para conocer el espacio de que se dispone y las instalaciones y equipamiento hardware con que contamos para montar el aula
- Reunirse con el profesorado encargado de impartir clase en la nueva aula para conocer sus necesidades y saber para qué y cómo van a utilizar dichos equipos (para poder determinar el sistema operativo que mejor cubrirá sus necesidades, los programas a instalar, los usuarios a crear, etc)

Con toda esta información se supone que tendremos los diferentes requisitos y necesidades para montar el sistema informático del aula.

Tened en cuenta que también es importante que aportemos nuevas opciones que consideremos de interés para nuestros clientes para poder tener un plus respecto a posibles competidores.

Veamos un ejemplo de cómo podrían haber ido las reuniones.
- Reunión con dirección. Las principales conclusiones que extraemos de dicha reunión son:
  - Espacio físico. El aula de que disponemos es suficientemente amplia y en ella hay colocadas 20 mesas dispuestas en 5 filas (4 mesas por fila) con las conexiones necesarias para conectar los equipos: cada mesa tiene 2 rosetas de red y 4 enchufes eléctricos.
  - Red. Todo el cableado de las mesas (40 tomas) más 2 tomas que hay en la pared frontal del aula bajo la pizarra se recoge en un rack en el que tenemos 2 switches de 24 + 2 bocas (24 bocas Fast ethernet + 2 bocas Gigabit). A dicho rack llega la conexión con la red del centro (a velocidad gigabit)
  - Hardware. En cada fila hay colocados 7 equipos (2 por mesa menos la última de cada fila que sólo tiene 1 equipo) con procesador Intel i3, 8 GB de RAM, 1 TB de disco duro y tarjeta de red Fast Ethernet. En la mesa del profesor hay otro equipo de iguales características. Por tanto disponemos de 36 PCs
  - Software. Cada ordenador viene con el sistema operativo Windows 10 Pro
  - Usuarios. El aula la utilizarán alumnos de 4 grupos de la ESO (en total unos 150 alumnos)
- Reunión con los profesores. Las conclusiones que extraemos de la reunión con los profesores que utilizarán el aula el año próximo son:
  - Utilizarán el aula para enseñar a los alumnos el uso de los sistemas operativos Windows y GNU/Linux
  - Les gustaría poder hacer alguna práctica también con otras versiones de Windows (como Windows 8 y Windows 11) para que los alumnos sepan manejarse en dichos sistemas operativos
  - Los alumnos deberán hacer prácticas de ofimática con las suites Office y LibreOffice
  - Los alumnos deberán trabajar con algún software de retoque fotográfico
  - En cada equipo habrán varios navegadores web instalados
  - Se desea, por parte de los profesores, que desde el equipo del profesor, se pueda controlar el acceso a Internet y a los recursos del centro por parte de los equipos de los alumnos
  - También desean poder saber qué están haciendo los alumnos en sus equipos y tomar el control de los mismos si lo desean
  - Los alumnos no siempre trabajarán en el mismo equipo
  - El alumno que se sienta en un ordenador no debería poder modificar cosas esenciales del sistema
  - Desearían disponer de un espacio de almacenamiento en el servidor donde dejar documentación y programas para los alumnos
  - Respecto al mantenimiento desearían poder centralizar la gestión de software de los alumnos, tanto en lo referido a actualizaciones como a la instalación de nuevos programas

Tras realizar las diferentes reuniones, y con todos los datos recogidos, es momento de transformarlos en información y extraer las conclusiones que necesitemos para seguir avanzando en nuestro proceso de construcción del sistema.

Del análisis realizado en el punto anterior extraemos, entre muchas otras, las siguientes conclusiones:
- para poder controlar desde el ordenador del profesor el acceso a internet por parte de los alumnos y centralizar la gestión de los usuarios (ya que cambiarán de equipo que utilizan) deberemos montar una arquitectura cliente/servidor utilizando el ordenador del profesor como servidor del aula
- el servidor enrutará los clientes a Internet de forma que podemos activar o desactivar dicho enrutamiento de forma sencilla permitiéndoles o denegándoles así el acceso a Internet
- ya que los equipos cuentan con licencias Windows y también se quiere utilizar sistemas GNU/Linux en cada equipo cliente instalaremos 2 sistemas operativos: el Windows 10 que ya tienen más una distribución GNU/Linux. Deberás elegir tú la distribución a instalar
- en este punto de diseño del sistema deberás tomar, además de las anteriores, decisiones sobre:
  - qué sistema operativo instalaremos en el servidor
  - qué distribución GNU/Linux instalar en los clientes
  - cómo permitir el uso a los alumnos de otros sistemas operativos para poderlos probar como Windows 8, Windows 11, otros GNU/Linux, etc
  - qué software distribuir en los clientes
  - cómo realizar la gestión de usuarios desde el servidor
  - cómo cumplir el resto de requerimientos planteados por los profesores

### Diseño del sistema
Una vez identificados los problemas y posibles soluciones llega el momento de redactar el proyecto para el cliente.

Entre los documentos a crear en este punto se incluye un esquema de la red del sistema informático realizado con alguna herramienta de diseño como Dia o similar.
