# Añadir un equipo Linux a AD
- [Añadir un equipo Linux a AD](#añadir-un-equipo-linux-a-ad)
  - [Introducción](#introducción)
  - [Instalación](#instalación)
  - [Configuración](#configuración)
    - [Kerberos](#kerberos)
    - [Añadir el equipo al dominio](#añadir-el-equipo-al-dominio)
    - [Configurando la creación automática de los home](#configurando-la-creación-automática-de-los-home)
    - [ntp](#ntp)

## Introducción
Aunque no es lo más habitual en ocasiones debemos añadir clientes GNU/Linux al dominio. Hay diferentes formas de hacerlos:
- usando **winbind** que es un paquete que utiliza Samba
- usando alguna herramienta de terceros como [**pbis-open**](https://github.com/BeyondTrust/pbis-open/releases) que es un script que automáticamente descarga y configura todos los paquetes necesarios
- usando el paquete _System Security Services Daemon_ (**SSSD**) que es lo que explicamos aquí

## Instalación
Debemos instalar los paquetes:
_realmd, sssd, sssd-tools, samba-common, krb5-user, packagekit, samba-common-bin, samba-libs, adcli, ntp_

Durante la instalación de Kerberos nos preguntará el nombre del reino predeterminado. Pondremos nuestro dominio en mayúsculas (MIDOMINIO.LAN).

Podemos comprobar que accede a la información del dominio con:
```bash
realm discover midominio.lan
```

## Configuración
Nos aseguraremos de la correcta configuración de la red en el cliente. Debe ser capaz de resolver el nombre del dominio y del DC. También es conveniente que en `/etc/hosts` tengamos el nombre completo del equipo (con el dominio).

### Kerberos
Si queremos comprobar el correcto funcionamiento de Kerberos podemos obtener el ticket del Administrador con:
```bash
kinit Administrador@MIDOMINIO.LAN
```

Comprobamos que se ha obtenido correctamente el ticket con
```bash
klist
```

que muestra los tickets almacenados.

### Añadir el equipo al dominio
Para añadir el equipo al dominio ejecutamos:
```bash
realm --verbose join midominio.lan -U Administrador
```

Con esto ya tenemos nuestro equipo añadido al dominio y debe aparecer en la OU _Computers_ de _Usuarios y equipos de AD_.

### Configurando la creación automática de los home
Para que se cree el directorio _home_ de un usuario del dominio la primera vez que inicia sesión en el equipo editamos el fichero `/etc/pam.d/common-session` y añadimos al final la línea:
```bash
session required    pam_mkhomedir.so    skel=/etc/skel/  umask=0077
```

### ntp
Como sabemos la hora debe ser igual en el DC y en los clientes para poder acceder al dominio. Podemos asegurarnos de ello configurando **ntp** para que obtenga la hora del DC. Para ello en el fichero `/etc/ntp.conf` comentaremos todas las líneas de **pool** y añadiremos:
```bash
server dc1.midominio.lan
pool dc1.midominio.lan
```

Después reiniciaremos el servicio **ntp**. Podemos comprobar la sincronización con `ntpq -p`.

Fuente: [EDUCATICA!](https://www.educatica.es/informatica/anadiendo-un-sistema-gnu-linux-al-dominio/)

realm join -v -U Administrador midominio.lan

recuerda el /etc/login.defs

