# Red de ordenadores. Arquitectura cliente/servidor
- [Red de ordenadores. Arquitectura cliente/servidor](#red-de-ordenadores-arquitectura-clienteservidor)
  - [Qué es una red](#qué-es-una-red)
  - [Tipos de red](#tipos-de-red)
  - [Arquitectura cliente/servidor (C/S)](#arquitectura-clienteservidor-cs)
  - [Funciones del servidor](#funciones-del-servidor)

## Qué es una red
Una red de ordenadores o red informática es un conjunto de equipos informáticos y software conectados entre sí por medio de dispositivos físicos con la finalidad de compartir información, recursos y ofrecer servicios.

Para crear una red de ordenadores se necesita un sistema operativo de red, que permite la interconexión de ordenadores para poder acceder a sus servicios y recursos creando redes de ordenadores. En los sistemas operativos modernos (tanto GNU/Linux como Windows o Mac OS X) la conexión a la red es parte del sistema operativo tanto de servidores como de los clientes.

Las funcionalidades que debe tener un sistema operativo de red son:
- **Conectar** todos los equipos y recursos de la red
- Proporcionar **seguridad**, controlando el acceso a los datos y recursos
- **Coordinar** las funciones de red con las propias del equipo
- **Compartir** recursos
- **Monitorizar** y gestionar la red y sus componentes

## Tipos de red
Según cómo se relacionan entre sí los diferentes equipos miembros de una red tenemos 2 tipos de redes:
- redes que utilizan el modelo entre iguales o "_**peer to peer**_". En este modelo todos los ordenadores de la red son iguales y no hay ninguno que se encargue de controlar o dirigir al resto
- redes que utilizan el modelo _**cliente/servidor**_. En este modelo uno (o más) de los ordenadores de la red es el ordenador principal o servidor que proporciona soporte al resto de equipos de la red, llamados clientes. En este tipo de redes los clientes realizan peticiones al servidor que les da respuesta.

Los sistemas operativos instalados en los ordenadores de los usuarios de la red, normalmente sistemas Windows, Linux _Desktop_ o Mac OS X) tienen la posibilidad de conectarse a un **grupo de trabajo** (si se trata de una red "_peer to peer_") o a un **dominio**, en cuyo caso habrá un servidor principal con un sistema operativo de servidor como Windows Server, Linux, etc).

Cada opción tiene ventajas e inconvenientes que tendremos que valorar en el momento de elegir el tipo de sistema informático a crear. La principal ventaja de una red "peer to peer" es su simplicidad pero este también es su principal inconveniente porque dificulta el control sobre lo que sucede en la red y no permite una gestión centralizada de la misma lo que la hace inviable en redes grandes.

Los principales parámetros que nos harán elegir un tipo de red u otro son:
- Nivel de **seguridad**: una red "peer to peer" no permite el nivel de seguridad y el control sobre usuarios y recursos que permite un entorno con servidor.
- Número de **usuarios**: si tenemos pocos usuarios es más sencillo y más barato trabajar en una red peer to peer. Cuando crece el número de usuarios una red entre iguales es muy difícil de gestionar adecuadamente y es más práctico utilizar el modelo cliente/servidor.
- Número de **equipos**: es el mismo caso de los usuarios. Si son muy pocos puede ser útil una red "peer to peer" pero cuando crece su número se tiene que ir a una con uno o más servidores.
- **Servicios** a prestar: si los clientes sólo necesitan compartir una conexión en Internet no tiene sentido crear una red con servidor. Según aumentan los servicios necesarios (compartición de ficheros, de impresoras, servicios de red, gestión centralizada de usuarios, etc) se necesitará uno o más servidores para proporcionar esos servicios.

En resumen las diferencias entre los dos tipos de red son:
- en un grupo de trabajo todos los equipos están al mismo nivel mientras que en un dominio uno o más son servidores que gestionan y proporcionan servicios al resto
- en un grupo de trabajo cada equipo gestiona las cuentas de los usuarios que pueden iniciar sesión en el mismo. En un dominio un usuario del dominio puede iniciar sesión en cualquier equipo del mismo
- en un grupo de trabajo todos los equipos deben estar en la misma red local mientras que en un dominio no importa en qué red se encuentren los equipos miembros (pueden estar en diferentes redes locales)

## Arquitectura cliente/servidor (C/S)
La red cliente-servidor es una red de comunicaciones en la que los clientes están conectados a un servidor, en el que se centralizan los diversos recursos y aplicaciones con que cuenta la red y que los pone a disposición de los clientes cada vez que estos los solicitan.

Los componentes habituales de este tipo de redes son:
- **Servidores**: Son equipos con un sistema operativo de servidor y multiusuario que proporcionan recursos a los clientes
- **Clientes**: Son equipos conectados a la red y que, a diferencia de los servidores, no comparten sus recursos.
- **Dominio**: Es una agrupación lógica de elementos de la red (equipos, usuarios, recursos compartidos) que permite realizar una gestión centralizada, es decir, que desde una ubicación se pueden controlar los servicios administrativos del dominio. Los recursos los gestiona el servidor principal.

La separación entre cliente y servidor es una separación de tipo lógico, donde el servidor no se ejecuta necesariamente sobre una sola máquina ni es necesariamente un único programa.

En este tipo de arquitectura el servidor es el ordenador que controla la red y permite compartir sus recursos con el resto de equipos. 

Las redes cliente / servidor tienen ventajas sobre una red "peer to peer" como:
- Centralización de la gestión: la gestión de toda la red y sus recursos se puede hacer desde el servidor lo que facilita enormemente la tarea del administrador del sistema.
- Centralización del control: los accesos a recursos los controlados por el servidor lo que hace más sencilla y segura su gestión.
- Escalabilidad: se puede aumentar la capacidad de clientes y servidores por separado. Cualquier elemento puede ser aumentado (o mejorado) en cualquier momento, o se pueden añadir nuevos nodos en la red (clientes y/o servidores).
- Fácil mantenimiento: al poderse distribuir las funciones y responsabilidades entre varios servidores independientes, es posible reemplazar, reparar, actualizar, o incluso trasladar un servidor, y los clientes no se verán afectados por ese cambio (o sólo mínimamente).

Este tipo de arquitectura también tiene inconvenientes, como:
- Cuellos de botella: cuando una gran cantidad de clientes envían peticiones simultáneas al mismo servidor, pueden llegar a colapsarse. Esto se puede solucionar dimensionando la red adecuadamente y utilizando los servidores necesarios.
- Robustez de la red: cuando un servidor está caído, las peticiones de los clientes no pueden ser satisfechas. En las redes P2P, los recursos están generalmente distribuidos en varios nodos de la red y aunque algunos caigan otros pueden seguir atendiendo a las peticiones.
- El software y el hardware de un servidor debe ser específico: un hardware normal de un ordenador personal puede no ser suficiente para una determinada cantidad de clientes. Respecto al sistema operativo su precio és más caro en el caso de sistemas privativos (una licencia de Windows Server es mucho más cara que una de Windows 10).
- Disponibilidad: El cliente no podrá acceder a los datos ni a las impresoras ni posiblemente a Internet si el servidor no está disponible.

Por tanto en este tipo de redes el servidor debe estar bien dimensionado y el administrador debe tomar las decisiones adecuadas para minimizar el riesgo de caída de un servidor y restablecer el servicio lo más rápidamente posible si esto llega a suceder.

## Funciones del servidor
Hay muchos tipos de servicios que puede prestar un servidor:
- Gestión de usuarios: los usuarios se crean y gestionan desde el servidor y no desde cada equipo cliente
- Compartición de archivos: permite que los usuarios autorizados puedan acceder a archivos ubicados en el servidor de archivos
- Servicio DHCP: el servidor proporciona direcciones IP a los equipos cliente para conectarse en la red sin tener que configurar cada equipo manualmente
- Gestión de comunicaciones: el servidor puede enlazar diferentes redes (por ejemplo nuestra red local con Internet) controlando el tráfico en todo momento
- Servicio de correo: el servidor proporciona servicios de correo electrónico en la red
- Servidor web: proporciona páginas web a los usuarios que acceden a través de su navegador
- Servicio de impresión: el servidor controla una o más impresoras y permite que los usuarios autorizados puedan imprimir en ellas
- Otros: servicio DNS, proxy, FTP ...

Estos servicios pueden estar todos en un único servidor o repartidos en diferentes servidores de la red (lo más adecuado). Si el número de usuarios es muy grande es posible que el servidor esté demasiado cargado de trabajo por lo que es conveniente dividir los servicios que presta entre diferentes servidores de la red. Pero aunque no lo esté que cada servidor se encargue de un servicio (o unos pocos) mejora la fiabilidad ya que si cae sólo se verá afectado su servicio (hasta que se restablezca su funcionamiento).

Un servidor puede ser dedicado o no dedicado. Un servidor se dice que es dedicado si sólo se utiliza como servidor y no como ordenador normal de trabajo. No es recomendable utilizar servidores no dedicados ya que cualquier problema en su uso puede hacer que el ordenador deje de funcionar y con él la red entera.

