# LDAP
El _Protocolo ligero de acceso a directorios (LDAP)_ permite centralizar en un directorio información sobre usuarios, recursos, etc. Se trata de un protocolo estándar abierto, del que se han hecho implementaciones privativas (como Microsoft Active Directory, Oracle Internet Directory, etc) y libres (como OpenLDAP, Apache DS, etc).

## Instalación
En Debian y derivados instalaremos los paquetes **slapd** y **ldap-utils**. En RedHat y derivasos instalaremos **openldap**,  **openldap-servers** y **openldap-clients**. A continuación habilitaremos el servicio **slapd** para que se ejecute al iniciar el sistema.

El primer paso es crear una contraseña para el usuario _Administrador_ con el comando `ldappassword`. Los ficheros de configuración se encuentran en **/etc/openldap/slapd.d** pero no debemos modificarlos directamente sino con el comando `ldapmodify`.



## Webografía
* [Instalar y configurar el servidor LDAP de Linux](https://likegeeks.com/es/servidor-ldap-de-linux/)
