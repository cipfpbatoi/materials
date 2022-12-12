Proyecto de clase
=================

- [Proyecto de clase](#proyecto-de-clase)
  - [Caso práctico](#caso-práctico)
- [Retroalimentación](#retroalimentación)
    - [Configurar el servidor](#configurar-el-servidor)
    - [Configurar el dominio](#configurar-el-dominio)
    - [Configurar el cliente](#configurar-el-cliente)
- [Actividades de ampliación](#actividades-de-ampliación)
  - [Actividad de ampliación 1](#actividad-de-ampliación-1)
- [Retroalimentación](#retroalimentación-1)
  - [Actividad de ampliación 2](#actividad-de-ampliación-2)
- [Retroalimentación](#retroalimentación-2)

Caso práctico 
-------------

Ya tenemos nuestro servidor (en realidad 3 servidores) instalado y configurado. Ahora es el momento de crear el dominio y los diferentes usuarios.

El primer paso será instalar y configurar el dominio. A continuación crearemos las OU, los grupos y los usuarios del mismo. Aún no serán usuarios móviles (esto lo dejaremos para la próxima Unidad).

Por último configuraremos el cliente del aula que ya tenemos hecho (en el sistema GNU/Linux) para que puedan iniciar sesión e el mismo los usuarios del dominio. Probaremos a iniciar sesión con un usuario del dominio tanto en una terminal como en el sistema gráfico.

Retroalimentación 
=================

### Configurar el servidor

Lo primero que haremos es seleccionar con qué servidor de los 3 que hemos instalado nos quedaremos. Vamos a elegir el servidor Ubuntu o el Debian (como prefiráis).

Ahora vamos a configurarlo como servidor LDAP. Recordad que el nombre del dominio será aulaESO-xx.lan, o si queremos diferenciarlo del de Windows le podemos llamar aulaESOubuntu-xx.lan o aulaESOdebian-xx.lan.

### Configurar el dominio

A continuación crearemos las OU para nuestros objetos. Yo voy a utilizar LDAP Account Manager por comodidad y sólo voy a usar 3 OUs: Alumnos donde crearé todos mis alumnos, Profes donde crearé los profesores y Grupos donde crearé los grupos. En LAM configuraré como OU por defecto para los grupos la de Grupos y como OU por defecto para los usuarios
Profes.

Ahora vamos a crear los grupos que usaremos: gAlum1Eso, gAlum2Eso, gAlum3Eso, gAlum4Eso, gProfesInfo, gProfesEso. Recordad que queremos utilizar gid mayores de 5000 (también con los uidNumber de los usuarios).

Por último crearemos los usuarios. Crearé todos los profesores y un par de alumnos por grupo.En el home de cada alumno en vez de algo como /home/usuario pondré algo como /home/movil/usuario de forma que tenga todos los usuarios móviles en un directorio aparte y así sea sencillo en la siguiente Unidad que sus homes se almacenen en el servidor y no e el
cliente.

Como actividad de ampliación se propone hacer un script para crear los 150 alumnos automáticamente.

### Configurar el cliente

Ahora configuraremos nuestros clientes para que validen los usuarios del dominio contra el servidor LDAP. Los pasos a realizar son:

-   instalar los paquetes para usar PAM y NSS con LDAP
-   configurar ldap-auth-config
-   configurar NSS. Una vez hecho comprobaremos que funciona correctamente con getent
-   ajustamos la configuración de /usr/share/pam-configs/ldap para que los usuarios puedan cambiar su contraseña y que se cree automáticamente su home. Podremos una máscara para que nadie más que el propietario tenga acceso a su carpeta personal

Una vez hecho todo esto abriremos una terminal en el cliente e intentaremos convertirnos en un usuario del dominio. Por ejemplo para ser jsegura ejecutaremos el comando:

    su jsegura

Comprobaremos que podemos iniciar sesión, que se crea su home y que podemos cambiar su contraseña.

Por último cerramos sesión en el cliente e intentamos iniciar sesión con un usuario del dominio. Algunos gestores de ventanas (como LightDM que usa Ubuntu) no permiten por defecto escribir el nombre del usuario sino simplemente elegirlo de la lista de usuarios locales.

En ese caso deberemos cambiar el fichero de configuración para que pida el nombre del usuario en vez de elegirlo de la lista, En caso de Ubuntu es el fichero /usr/share/lightdm/lightdm.conf.d/50-unity\_greeter.conf y en la sección [SeatDefaults] debemos poner la línea:
    
    greeter-show-manual-login=true

Actividades de ampliación 
=========================

Actividad de ampliación 1 
-------------------------

Instala y configura el dominio e el servidor CentOS además de hacerlo en el servidor Ubuntu o Debian.

Retroalimentación 
=================

Pon un nombre de dominio diferente al usado en Ubuntu o Debian, como aulaESOcentos-xx.lan.

Actividad de ampliación 2 
-------------------------

Como ya sabemos nuestros usuarios serán unos 150 alumnos de la ESO.

Realiza un script que permita automatizar la creación de dichos usuarios.

Retroalimentación 
=================

Como en el caso de Windows no vamos a proporcionaros el script sino unas indicaciones de cómo hacerlo.

Posiblemente lo más sencillo sea que el script construya en fichero LDIF con los datos de todos los alumnos y posteriormente nosotros añadiremos dicho fichero al dicrecorio con el comando ldapadd.

En este caso el bucle lo construiremos con un WHILE (en Windows usamosun bucle FOR). Un ejemplo es:

while IFS=:  read  dato1 dato2 dato3 dato4 \
do\
    echo "El primer dato es " \$dato1\
    echo "El segundo dato es " \$dato2\
    echo "El tercer dato es " \$dato3\
    echo "El cuarto dato es " \$dato4\
    echo\
done \< fichero.txt

Este script coge cada línea de un fichero llamado fichero.txt que se supone que tiene 4 campos separados por el carácter ":" (IFS=:) y guarda cada campo en las variables indicadas (dato1, ..., dato4).

A continuación muestra por pantalla cada dato en una línea y añade una línea en blanco tras el 4º dato.

Recordad que el fichero LDIF debe contener para cada usuario una línea con su DN y otra para cada atributo del mismo y luego una línea en blanco entre cada usuario.

Recordad también usar uidNumber mayores de 5000.

Obra publicada con [Licencia Creative Commons Reconocimiento No comercial Compartir igual 4.0](http://creativecommons.org/licenses/by-nc-sa/4.0/)
