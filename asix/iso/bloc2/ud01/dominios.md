# Dominios. Active Directory
- [Dominios. Active Directory](#dominios-active-directory)
  - [Introducción](#introducción)
  - [Relaciones de confianza](#relaciones-de-confianza)
  - [Notación de los objetos del directorio](#notación-de-los-objetos-del-directorio)
  - [Active Directory](#active-directory)

## Introducción
Hoy en día, los ordenadores existentes en cualquier organización se encuentran formando parte de redes de ordenadores, de forma que pueden intercambiar información.

La correcta administración de la red es fundamental y centralizar esa administración permitirá simplificar mucho la función del administrador de la misma. Para ello necesitaremos utilizar un servidor que almacene toda la información sobre los diferentes elementos que encontramos en la red.

El elemento que representa toda la red a administrar con todos los recursos que contiene se llama **Dominio**. Un dominio es una red de ordenadores conectados entre sí donde se confía a uno de los equipos de dicha red (o a un grupo de ellos, los controladores de dominio), la administración de los distintos elementos de la red (equipos, usuarios, impresoras, privilegios y permisos de los usuarios sobre cada recurso, etc.

La información del dominio la almacena el controlador (o controladores) en una base de datos jerárquica llamada **directorio**, que almacena la información sobre cada objeto del dominio: servidores, equipos cliente, impresoras, usuarios, grupos, archivos compartidos, etc.

Para gestionar el directorio el servidor dispondrá de unas herramientas que siguen el estándar **LDAP** (_Lightweight Directory Access Protocol_, protocolo ligero de acceso al directorio). Este protocolo establece que cada dominio tiene un nombre único que sigue la notación de nombres de DNS (ejemplo _cipfpbatoi.lan_). 

Un dominio puede tener subdominios (como _www.cipfpbatoi.lan_ o _moodle.cipfpbatoi.lan_). Al conjunto del dominio y todos sus subdominios se le llama **árbol** de dominios y el dominio principal es el **dominio raíz** (en el ejemplo _cipfpbatoi.lan_).

En ocasiones podemos tener más de un dominio independiente (por ejemplo podríamos tener el dominio _aulas.lan_ para nuestras aulas con los subdominios _aula1.aulas.lan_, _aula2.aulas.lan_, etc., y el dominio _departamentos.lan_ para los distintos departamentos del centro). Al conjunto de todos los árboles de dominios se le llama **bosque**.

## Relaciones de confianza
Aunque tengamos organizada nuestra red en diferentes bosques en ocasiones usuarios de un dominio necesitan acceder a recursos que se encuentran en otro dominio. Para hacerlo posible se establecen relaciones de confianza entre los mismos.

Una relación de confianza es una relación establecida entre dos dominios de forma que los usuarios de un dominio son reconocidos por los controladores de otro dominio, lo que les permite acceder a los recursos del mismo. 

Los administradores podrán definir los permisos y derechos de usuario para los usuarios del otro dominio y también administrar desde un solo controlador de la red a todos los usuarios y recursos de la misma.

Todos los dominios de un mismo bosque tienen establecidas relaciones de confianza entre ellos por lo que no es necesario establecerlas manualmente. Sí deberemos definirlas entre dominios que pertenezcan a bosques diferentes.

Se pueden establecer relaciones de confianza entre los árboles de forma que usuarios de un árbol estén autorizados a acceder a recursos de otro. Podéis ampliar la información sobre las relaciones de confianza en Active Directory en la página de la Wikipedia:

https://es.wikipedia.org/wiki/Active_Directory#Intercambio_entre_dominios.5B2.5D

## Notación de los objetos del directorio
La función del dominio es representar los componentes, tanto físicos como lógicos, que forman el sistema informático de la empresa para centralizar su gestión. Cada elemento se representará como un objeto del dominio, siendo los más importantes:
- **Usuario**: representa a una persona que utiliza el sistema informático y nos permite identificarla en la red
- **Equipo/Servidor**: representa a un ordenador de la red
- **Impresora**
- **Grupo**: permite agrupar diferentes objetos, normalmente del mismo tipo, para asignarles permisos y privilegios a todos los miembros del grupo a la vez
- **Unidad organizativa** (OU, _Organizational Unit_): es un contenedor que nos permite organizar los diferentes objetos. Lo normal es que contenga distintos tipos de objetos. Por ejemplo podríamos crear una OU para cada departamento de la empresa donde colocaremos los usuarios, grupos, equipos, impresoras,... de ese departamento
- **Carpeta compartida**: representa una carpeta accesible a los distintos equipos de la red
- ...

Según el tipo de objeto que sea tendrá diferentes **atributos**, que representan una información sobre el mismo mismo. Por ejemplo algunos de los atributos de un usuario son _login_, _contraseña_, _nombre_, _email_, etc. mientras que atributos típicos de un equipo son _nombre_, _ubicación_, _sistema operativo_, ...

Cada objeto se identifica mediante su _**Distinguished Name**_ (**DN**). La forma de cada DN recuerda a la de un fichero con su ruta, aunque en vez de _descender_ desde la raíz al fichero _asciende_ desde el objeto a la raíz que siempre es el dominio que lo contiene. Por ejemplo
```bash
CN=Juan Segura,OU=Asix,OU=Informatica,DC=cipfpbatoi,DC=lan
```

representa a un usuario cuyo nombre (CN=_Common Name_) es '_Juan Segura_' que se encuentra en la unidad organizativa (OU=_Organizational Unit_) '_Asix_' que a su vez está dentro de la OU '_Informatica_' del dominio '_cipfpbatoi.lan_'.

A la parte inicial del _DN_ se le llama **RDN** (_Relative Distinguished Name_) que es el atributo del objeto que lo identifica: en el caso de usuarios es su _CN_ (o su _UID_ -User IDentifier-), en el de grupos su _CN_ o _GID_, en el de OUs es su _OU_ y en el de dominios su _DC_ (_domain component_). Fijaos que el dominio aparece dividido en sus distintos componentes.

## Active Directory
En el caso de redes Windows el servidor será un equipo con un sistema operativo Windows 2019 Server (o alguna de las versiones anteriores).

El nombre que da Microsoft al servicio de directorio es **Active Directory** y, al igual que los usados en GNU/Linux, sigue el estándar LDAP (_Lightweight Directory Access Protocolo_, protocolo ligero de acceso al directorio).

Cuando en un servidor Windows instalamos el rol de "Servicios de dominio de Active Directory" se convierte en **Controlador de dominio** (DC, _Domain Controller_). En cualquier red con arquitectura cliente/servidor habrá al menos un controlador de dominio, llamado controlador de dominio principal (PDC, _Primary Domain Controller_), pero pueden haber más controladores de dominio secundarios con copias del directorio, llamados BDC (_Backup Domain Controllers_).

Si en un sistema montamos un dominio _Active Directory_ se necesitará un servidor DNS que resuelva dicho dominio para los equipos de la red. Si no hay ninguno se instalará el servicio DNS automáticamente al instalar _Active Directory_ y se configurará para poder responder al nombre del servidor y del dominio).
