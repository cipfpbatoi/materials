# Añadir un equipo Linux a AD
- [Añadir un equipo Linux a AD](#añadir-un-equipo-linux-a-ad)
  - [Introducción](#introducción)
  - [SSSD](#sssd)
    - [Instalación](#instalación)
    - [Configuración](#configuración)
      - [Kerberos](#kerberos)
      - [Añadir el equipo al dominio](#añadir-el-equipo-al-dominio)
      - [Configurando la creación automática de los home](#configurando-la-creación-automática-de-los-home)
      - [ntp](#ntp)
  - [pbis-open](#pbis-open)
    - [Configuraciones adicionales](#configuraciones-adicionales)
    - [Si no se puede escribir el usuario en el login](#si-no-se-puede-escribir-el-usuario-en-el-login)
      - [Ubuntu](#ubuntu)
      - [Linux Mint](#linux-mint)
      - [Lubuntu](#lubuntu)

## Introducción
Aunque no es lo más habitual en ocasiones debemos añadir clientes GNU/Linux al dominio. Hay diferentes formas de hacerlos:
- usando **winbind** que es un paquete que utiliza Samba
- usando alguna herramienta de terceros como [**pbis-open**](https://github.com/BeyondTrust/pbis-open/releases) que es un script que automáticamente descarga y configura todos los paquetes necesarios (lo veremos en el último apartado)
- usando el paquete _System Security Services Daemon_ (**SSSD**) que es lo que explicamos aquí

## SSSD
### Instalación
Debemos instalar los paquetes:
_realmd, sssd, sssd-tools, samba-common, krb5-user, packagekit, samba-common-bin, samba-libs, adcli, ntp_

Durante la instalación de Kerberos nos preguntará el nombre del reino predeterminado. Pondremos nuestro dominio en mayúsculas (MIDOMINIO.LAN).

Podemos comprobar que accede a la información del dominio con:
```bash
realm discover midominio.lan
```

### Configuración
Nos aseguraremos de la correcta configuración de la red en el cliente. Debe ser capaz de resolver el nombre del dominio y del DC. También es conveniente que en `/etc/hosts` tengamos el nombre completo del equipo (con el dominio).

#### Kerberos
Si queremos comprobar el correcto funcionamiento de Kerberos podemos obtener el ticket del Administrador con:
```bash
kinit Administrador@MIDOMINIO.LAN
```

Comprobamos que se ha obtenido correctamente el ticket con
```bash
klist
```

que muestra los tickets almacenados.

#### Añadir el equipo al dominio
Para añadir el equipo al dominio ejecutamos:
```bash
realm --verbose join midominio.lan -U Administrador
```

Con esto ya tenemos nuestro equipo añadido al dominio y debe aparecer en la OU _Computers_ de _Usuarios y equipos de AD_.

#### Configurando la creación automática de los home
Para que se cree el directorio _home_ de un usuario del dominio la primera vez que inicia sesión en el equipo editamos el fichero `/etc/pam.d/common-session` y añadimos al final la línea:
```bash
session required    pam_mkhomedir.so    skel=/etc/skel/  umask=0077
```

#### ntp
Como sabemos la hora debe ser igual en el DC y en los clientes para poder acceder al dominio. Podemos asegurarnos de ello configurando **ntp** para que obtenga la hora del DC. Para ello en el fichero `/etc/ntp.conf` comentaremos todas las líneas de **pool** y añadiremos:
```bash
server dc1.midominio.lan
pool dc1.midominio.lan
```

Después reiniciaremos el servicio **ntp**. Podemos comprobar la sincronización con `ntpq -p`.

Fuente: [EDUCATICA!](https://www.educatica.es/informatica/anadiendo-un-sistema-gnu-linux-al-dominio/)

## pbis-open
Se trata de un script que automáticamente descarga los paquetes necesarios y configura los ficheros necesarios por nosotros. Para que funcione debemos tener instalado el paquete _ssh_.

Nos descargamos desde la web de [BeyondTrust](https://github.com/BeyondTrust/pbis-open/releases) el script adecuado a nuestro sistema y lo ejecutamos:
```bash
sudo sh ./pbis-open-versio_descargada.deb.sh
```

Para añadir el equipo al dominio ejecutamos:
```bash
sudo domainjoin-cli join midominio.lan Administrador@midominio.lan
```

Ya lo tenemos añadido y debe aparecer en la OU _Computers_ de _Usuarios y equipos de AD_. También podemos comprobarlo con
```bash
sudo domainjoin-cli query
```

También podemos ver información sobre PBIS y el dominio con:
```bash
pbis status
```

Para sacar un equipo Linux del dominio ejecutaremos:
```bash
sudo domainjoin-cli leave
```

Podemos ver desde la terminal la lista de todos los usuarios que pueden iniciar sesión en el sistema con:
```bash
getent passwd
```

y la lista de grupos con:
```bash
getent group
```

También podemos ver la información de usuarios y grupos desde PBIS con:
```bash
/opt/pbis/bin/enum-users
/opt/pbis/bin/enum-groups
```

Ya podemos iniciar sesión con un usuario del dominio poniendo su nombre y el dominio, por ejemplo `ACME\Administrador` o `Administrador@acme.lan`.

### Configuraciones adicionales
Vamos a ejecutar unas órdenes que nos faciliten la tarea de loguearnos con un usuario del dominio. En estas órdenes, cuado se tenga que poner el nombre del dominio pondremos el nombre NETBIOS (el que va sin extensión):
- `sudo /opt/pbis/bin/config UserDomainPrefix midominio`: para no tener que escribir nom_dominio\nom_usuario (o nom_usuario@nom_dominio) para iniciar sesión sino que baste poner el nombre del usuario
- `sudo /opt/pbis/bin/config AssumeDefaultDomain true`: por defecto asume que el usuario introducido es un usuario del dominio
- `sudo /opt/pbis/bin/config LoginShellTemplate /bin/bash`: la terminal de los usuarios será bash
- `sudo /opt/pbis/bin/config HomeDirTemplate %H/%U`: donde estará el directorio personal del usuario, por defecto _/home/usuario_
- (OPCIONAL) `sudo /opt/pbis/bin/config RequireMembershipOf "midominio\nom_grup"`: esto es por si queremos que sólo los miembros de un grupo determinado puedan iniciar sesión en esta máquina. Asegúrate de poner el nombre del grupo tal y como se ve en el comando `getent group` (por ejemplo el grupo de _Usuarios del dominio_ aparece como _usuarios^del^dominio_). ATENCIÓN: el carácter "\" es para escapar el siguiente carácter por lo que puede que tengamos que ponerlo doble "\\"

Podemos comprobar si hemos configurado bien cualquier opción con la opción `--show`, por ejemplo, para saber qué grupo puede iniciar sesión en el cliente linux escribiremos:
```bash
/opt/pbis/bin/config --show RequireMembershipOf
```

### Si no se puede escribir el usuario en el login
Si estamos utilizando un gestor gráfico que no permita escribir el nombre del usuario al autenticarnos hay que ver la forma de habilitarlo. 

En primer lugar tenemos que identificar qué _display-manager_ se está usando con:
```bash
systemctl status display-manager
```

#### Ubuntu
En el caso de Ubuntu y otras distribuciones que usan _ligthdm_, tenemos que cambiar la configuración añadiendo al final del archivo de configuración `/usr/share/lightdm/lightdm.conf.d/`
```bash
50-unity-greeter.conf les línies:
allow-guest=false
greeter-show-manual-login=true
```

y reiniciamos el equipo.

#### Linux Mint
Si se trata de Linux Mint con escritorio _Mate_, en el entorno gráfico hay que habilitar la opción '_Permitir el inicio de sesión manual_' que esta en `Administración -> Pantalla de inicio de sesión`:



#### Lubuntu
Si es un Lubuntu anterior al 20.04 no hay que hacer nada porque automáticamente pide escribir el nombre del usuario.

Lubuntu 20.04 utiliza como _Display Manager_ _SDDM_ que no da opción para escribir el nombre del usuario. Lo que podemos hacer es que aparezcan los usuarios del dominio igual que aparecen los locales. Para ello en primer lugar tenemos que saber qué UID tienen los usuarios del dominio con
```bash
getent passwd
```

Aquí vemos que sus UID son 



Ahora entramos en el fichero `/etc/sddm.conf` para añadir una sección _[Users]_ donde indicar qué UID tienen que aparecer (por defecto sólo aparecen los locales a partir del UID 1000). Como los nuestros tienen UID muy grandes (1179124212 i més) ponemos en ese fichero:
```ini
[Autologin]
Session=Lubuntu
[Users]
MinimumUid=1000
MaximumUid=9999999999
RememberLastUser=true```

