# LDAP
El _Protocolo ligero de acceso a directorios (LDAP)_ es un protocolo de tipo cliente-servidor para acceder a un servicio de directorio, donde centralizar en un directorio información sobre usuarios, recursos, etc. Un directorio es como una base de datos, pero que contiene información más descriptiva y basada en atributos.

LDAP es un protocolo estándar abierto, del que se han hecho implementaciones privativas (como Microsoft Active Directory, Oracle Internet Directory, etc) y libres (como OpenLDAP, Apache DS, etc).

## Cómo funciona
Uno o más servidores LDAP contienen los datos que conforman el árbol del directorio LDAP. El cliente ldap se conecta con el servidor y le hace una consulta, y el servidor le da la respuesta correspondiente.

## Instalación
En Debian y derivados instalaremos los paquetes **slapd** y **ldap-utils**. En RedHat y derivasos instalaremos **openldap**,  **openldap-servers** y **openldap-clients**. A continuación habilitaremos el servicio **slapd** para que se ejecute al iniciar el sistema.

El primer paso es crear una contraseña para el usuario _Administrador_ con el comando `ldappassword`. Los ficheros de configuración se encuentran en **/etc/openldap/slapd.d** pero no debemos modificarlos directamente sino con el comando `ldapmodify`.



## Webografía
* [LDAP-Linux-Como: Introducción - TLDP-ES](http://es.tldp.org/COMO-INSFLUG/COMOs/LDAP-Linux-Como/LDAP-Linux-Como-1.html)
* [Instalar y configurar el servidor LDAP de Linux](https://likegeeks.com/es/servidor-ldap-de-linux/)
