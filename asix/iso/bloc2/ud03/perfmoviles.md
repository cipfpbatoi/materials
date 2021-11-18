# Usuarios móviles


## Introducción
En ocasiones tenemos usuarios que no siempre utilizan el mismo equipo sino que pueden iniciar sesión en diferentes equipos del dominio. Es deseable que, sea cual sea el ordenador en el que inicien sesión, tengan su entorno de trabajo personalizado y puedan acceder a sus documentos.

A estos usuarios se les denomina **usuarios móviles** y las herramientas que tenemos para conseguir que tengan su entorno de trabajo en cualquier ordenador en que inicien sesión son:
- perfiles de red
- carpetas privadas
- redireccionamiento de carpetas

## Perfiles de usuario
Los perfiles de usuario son una herramienta muy potente para personalizar el entorno de trabajo de los usuarios. En el perfil de un usuario se almacena el aspecto de su escritorio, de la barra del tareas, el contenido del menú Inicio (incluyendo programas), su carpeta privada donde se guardan sus ficheros y a la que sólo él tiene acceso, etc..  Cuando un usuario cambia algo los cambios se almacenan en su perfil y se conservan la próxima vez que inicia sesión.

El perfil del usuario **se crea la primera vez que un usuario inicia sesión** en un equipo (por eso tarda más) y se almacena en ese equipo dentro de la carpeta que se crea para el usuario (`C:\Users\nombre_del_usuario`).

Si un usuario del dominio inicia sesión en varios equipos se creará un **perfil local** en cada uno (que son independientes y diferentes) y cualquier cosa que cambie de su perfil se cambiará sólo en el equipo en que lo ha cambiado.

La solución es guardar el perfil de estos usuarios en el servidor, de forma que se pueda acceder a él desde cualquier equipo desde el que inicien sesión en el dominio. A estos perfiles se los denomina **perfiles de red** (_roaming profile_) y tienen la ventaja de que el perfil es único por lo que será idéntico en cualquier equipo desde el que inicie sesión y los cambios que haga en él se reflejarán en todos los equipos.

Además del perfil local y el perfil de red están los **perfiles temporales** que son los que se crean en el equipo local si por alguna razón no se puede cargar el perfil de red del usuario cuando inicia sesión. El perfil temporal se elimina al finalizar la sesión por lo cual los cambios hechos en la sesión no se conservan.

### Perfiles locales
El perfil local se crea la primera vez que un usuario inicia sesión en un equipo. Se almacenan dentro de la carpeta que se crea para el usuario dentro de `C:\Users`.

Podemos ver y eliminar los perfiles locales de usuario desde el `botón Configuración -> Sistema -> Acerca de -> Configuración avanzada del sistema -> Configuración avanzada -> Perfiles de usuario`.

![Perfil local](media/t4-08perfil-local.png)

Desde aquí podemos eliminar cualquier perfil (se volverá a crear cuando el usuario inicié sesión con las opciones por defecto) o cambiar el tipo para convertirlo en perfil móvil si el usuario es un usuario del dominio y se ha creado su perfil en el servidor.

Si el usuario es local el nombre de usuario que aparece es Nombre_del equipo\Nombre_del usuario (ej. juan-pc\profesor). Si es un usuario del dominio aparecerá Nombre_del_dominio\Nombre_del usuario (INFO2\alumno) y el tipo indica si el perfil es local (se almacena en el equipo) o móvil (se almacena en el DC).

### Perfiles de red
Los perfiles de red pueden ser de 3 tipos diferentes:
- **Perfil móvil**: el administrador asigna un perfil de red al usuario pero este puede modificarlo y los cambios se conservarán para la siguiente sesión.
- **Perfil obligatorio**: es como el perfil móvil pero los cambios que hacen los usuarios no se guardan por lo cual el usuario siempre trabaja con el perfil que le asignó el administrador cuando inicia sesión.
- **Perfil superobligatorio**: es un perfil obligatorio pero si por alguna razón no se puede cargar el perfil cuando el usuario inicia sesión no se le permite conectarse.

Muchas veces utilizamos el término perfil móvil para referirnos a cualquiera de los 3 perfiles de red. Los perfiles de red están almacenados en el DC y son accesibles desde cualquier equipo del dominio. Cuando un usuario con perfil móvil inicia sesión en un equipo del dominio su perfil se copia del servidor al equipo local. Cuando finaliza la sesión su perfil vuelve a copiarse en el servidor para mantener los cambios que haya hecho. Esto puede suponer una carga importante para la red en el caso de muchos usuarios con perfiles muy grandes (ten en cuenta que el perfil incluye las carpetas personales del usuario).

El formato en que se guarda un perfil es diferente entre distintas sesiones de Windows. Un perfil de Windows XP no puede usarlo un equipo con Windows 10 y viceversa. Para saber de qué versión de Windows es un determinado perfil a la carpeta que lo contiene se le añade automáticamente una extensión:
- **sin extensión**: se trata de un perfil de Windows XP
- **.V2**: se trata de un perfil de Windows Vista o 7
- **.V6**: se trata de un perfil de Windows 8 o 10

Por tanto un usuario llamado 'fperez' con perfil móvil y que haya iniciado sesión en un cliente con Windows XP, otro con Windows 7 y otro con Windows 10 tendrá en la carpeta de Perfiles 3 carpetas suyas: `fperez` (con su perfil de XP). `fperez.V2` (con su perfil Windows 7) y `fperez.V6` (con su perfil Windows 10). Según el sistema operativo de la máquina en la que inicie sesión Windows cargará un perfil u otro al loguearse el usuario.

Por ejemplo, si tenemos un usuario móvil llamado opla que ha iniciado sesión en algún cliente Win8 y algún Win10, otro usuario jaracil que sólo usa Win8 y otro llamado msanchez que sólo ha usado clientes Win10 tendremos los siguientes perfiles creados:

![Perfiles Windows 8 y 10](media/t4-perf2y6.png)


#### Creación de perfiles móviles de usuario
En primer lugar crearemos en el servidor la carpeta donde almacenaremos todos los perfiles de los usuarios. La carpeta de perfiles tiene que estar compartida con permisos (tanto SMB como NTFS) al menos de **Modificar** para todos los usuarios que tengan perfil móvil.

Después tenemos que especificar en la cuenta de usuario la ubicación física de su perfil (dentro de la carpeta creada anteriormente). Por ejemplo, en el servidor `ServInfo2` hemos compartido la carpeta `Perfiles` y vamos a indicar que el usuario `alumno` tiene un perfil móvil, En su cuenta ponemos:

![Perfil móvil](media/t4-12perfMobil.png)

Podemos indicar el nombre de la carpeta (`\\ServInfo2\Perfiles\alumno`) o usar la variable de Windows **`%USERNAME%`** que se sustituye por el nombre de usuario de este usuario concreto (en este caso _alumno_).

**IMPORTANTE**: en la pestaña de configuración del perfil en la cuenta del usuario NUNCA pondremos la extensión (.V2, .V6, ...) para indicar el tipo de perfil porque eso lo hace Windows automáticamente en función del S.O. que tenga el equipo desde que inicia sesión el usuario.

#### Convertir en obligatorio el perfil de un usuario
**NOTA**: este caso es muy poco frecuente ya que lo normal es queramos que sea todo un grupo de usuarios los que tengan perfil obligatorio, no uno sólo. Este caso lo vemos en el siguiente apartado.

El perfil de un usuario consta de muchas carpetas y ficheros donde se almacena la configuración de ese usuario y se crea a partir del _perfil predeterminado_ de usuario que tiene Windows. Entre los ficheros que se crean está el fichero **NTUSER.DAT** (es un fichero oculto y del sistema) que contiene las principales configuraciones del perfil. Para convertir un perfil en obligatorio lo único que tenemos que hacer es cambiar el nombre del fichero _NTUSER.DAT_ por **NTUSER.MAN** (este cambio tiene que hacerse con la sesión del usuario cerrada).

A partir de ahora cuando el usuario inicie sesión y realice cambios en su perfil estos cambios no se guardarán al cerrar la sesión por lo cual cuando vuelva a iniciar sesión se encontrará su entorno como si no hubiera cambiado nada.

El problema que nos encontramos para hacer esto es que sólo el propio usuario tiene permisos para entrar en su carpeta del perfil, ni siquiera el Administrador puede entrar. Para que pueda entrar el Administrador tenemos que cambiar el propietario de la carpeta del perfil de ese usuario.

Se hace desde el `menú contextual de la carpeta -> Propiedades -> Seguridad -> Opciones avanzadas -> Propietario -> botón 'Cambiar'`:

![Perfil móvil

Pondremos como nuevo propietario el **grupo Administradores** y marcamos la casilla de **Reemplazar propietario en subcontenedores y objetos** para cambiar también el propietario en los ficheros de dentro de la carpeta.

**MUY IMPORTANTE**: el nuevo propietario debe ser el grupo Administradores, **NO** el usuario Administrador ya que así continúa perteneciendo también al usuario de este perfil. Si el usuario que usa un perfil no es su usuario propietario no puede usarlo.

Aquí podéis ver un pequeño [vídeo de cómo cambiar el propietario](media/cambiarPropietario.mkv) de una carpeta.

Ahora ya podemos entrar a la carpeta y cambiar el nombre del fichero NTUSER.DAT a **NTUSER.MAN** y ya hemos conseguido que el perfil sea obligatorio.

#### Utilizar un mismo perfil obligatorio para muchos usuarios
Normalmente es más de un usuario quienes tienen que tener perfil obligatorio y normalmente el perfil tiene que ser igual para todos. Como además ninguno de esos usuarios puede hacer cambios en el perfil (porque es obligatorio) no tiene sentido que cada usuario tenga su propio perfil sino que es mejor usar un mismo perfil para todos ellos.

La manera más sencilla de hacerlo es copiar el perfil desde un equipo cliente al servidor y usarlo para todo ellos.

Para ello debemos como Administrador del dominio copiaremos el Perfil predeterminado desde un equipo cliente a la carpeta del servidor donde queremos que esté el perfil obligatorio, cambiamos la extensión del fichero NTUSER a .MAN y configuramos las cuentas de los usuarios para usar dicha carpeta como perfil.

Veamos cómo hacerlo paso a paso:

1. Crear en el servidor la carpeta `PerfilObligatori` que alojará el perfil obligatorio del grupo de usuarios.

2. Compartir esa carpeta para que sea accessible desde la red (también puede estar como subcarpeta de una carpeta compartida). Suponemos que su ruta será `\\SRVSXBATOI00\PerfilObligatori`. Debemos asegurarnos de que los Administradores tengan permisos tanto NTFS como SMB para escribir en ella (les daremos Control total).

3. Si aún no lo hemos hecho crearemos el grupo que usará este perfil obligatorio.

4. Iniciar sesión en el cliente con la cuenta del Administrador del dominio.

5. Vamos a los perfiles de usuario del equipo desde el `botón Configuración -> Sistema -> Acerca de -> Configuración avanzada del sistema -> Configuración avanzada -> Perfiles de usuario`.

6. Desde aquí seleccionamos el _Perfil predeterminado_ y pulsamos el botón **Copiar a**.

![Copiar perfil](media/t4-copiarPerfil.png)

7. En **'Copiar perfil en'** ponemos la ruta de la carpeta del servidor donde se copiará el perfil (se creará dicha carpeta) **incluyendo su extensión**, por ejemplo `\\SRVSXBATOI00\PerfilObligatori\Obligatori.V6` (V6 para a Windows 10)


8. En **'Con permisos para usar'** pondremos el grupo al que pertenecen los usuarios que van a usar este perfil obligatorio. Sólo puede ponerse un grupo (si necesitamos más de 1 crearemos uin nuevo grupo que los englobe). Para que en la ventana de 'Seleccionar usuario o grupo' aparezcan los grupos debemos antes pulsar el botón de "Tipos de objetos" y marcar la casilla de Grupos que por defecto está desmarcada. Ahora ya escribimos el nombre del grupo que usará el perfil.

9. Cerramos sesión en el cliente y vamos a la carpeta que acaba de crearse en el servidor (y a la que sí podemos entrar) para cambiar el nombre del fichero _NTUSER.DAT_ por **NTUSER.MAN**.

10. Desde _usuario y equipos de Active Directory_, modificamos la cuanta de los usuarios con perfil obligatorio poniendo como ruta de su perfil esta carpeta. Tened en cuenta que la ruta **no acabarà en %USERNAME%** porque no queremos que se cree una carpeta de perfil para cada usuario sino que todos usen la indicada. Recordad tamién que NUNCA se pone en la ruta la extensión V6.

![Perfil obligatorio](media/t4-12perfOblig.png)

Si queremos crear perfil obligatorio para más de un sistema operatiu cliente tendremos que repetir este proceso con cada sistema diferente (por ejemplo desde un Windows 7 para crear el perfil _.V2_ y así el usuario tendrá su perfil obligatorio tanto en equipos Windows 7/Vista com en Windows8/10. 

### Script de inicio de sesión
Podemos hacer un script (normalmente un fichero de proceso por lotes .BAT) que se ejecutará automáticamente cada vez que el usuario inicie sesión. Este script se tiene que guardar obligatoriamente en la carpeta compartida **NETLOGON** (que se encuentra en `C:\Windows\SYSVOL\sysvol\nombre_del_dominio\scripts`). Al indicar en la ficha de perfil la ruta a la script NO tenemos que poner la extensión .BAT.

Sólo se utiliza en perfiles de red.
