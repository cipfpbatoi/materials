# Dominios. Active Directory

## Introducción
Hoy en día, los ordenadores existentes en cualquier organización se encuentran formando parte de redes de ordenadores, de forma que pueden intercambiar información.

La correcta administración de la red es fundamental y centralizar esa administración permitirá simplificar mucho la función del administrador de la misma. Para ello necesitaremos utilizar un servidor que almacene toda la información sobre los diferentes elementos que encontramos en la red.

El elemento que representa toda la red a administrar con todos los recursos que contiene se llama **Dominio**. Un dominio es una red de ordenadores conectados entre sí donde se confía a uno de los equipos de dicha red (o a un grupo de ellos, los controladores de dominio), la administración de los distintos elementos de la red (equipos, usuarios, impresoras, privilegios y permisos de los usuarios sobre cada recurso, etc.

La información del dominio la almacena el controlador (o contraladores) en una base de datos jerárquica llamada **directorio**, que almacena la información sobre cada objeto del dominio: servidores, equipos cliente, impresoras, usuarios, grupos, archivos compartidos, etc.

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

## Active Directory

En el caso de redes Windows el servidor será un equipo con un sistema operativo Windows 2012 Server (o alguna de las versiones anteriores como Windows Server 2008 R2, Windows Server 2008, etc).

El nombre que da Microsoft al servicio de directorio es Active Directory y, al igual que los usados en GNU/Linux, sigue el estándar LDAP (Lightweight Directory Access Protocolo, protocolo ligero de acceso al directorio).

Cuando en un servidor Windows instalamos la función de "Servicios de dominio de Active Directory" se convierte en controlador de dominio (DC, Domain Controller). En cualquier red con arquitectura cliente/servidor habrá al menos un controlador de dominio que se llama controlador de dominio principal pero pueden haber más controladores de dominio secundarios con copias del directorio.

Por eso en un dominio se necesita un servidor DNS (si no lo tenemos se instala el servicio DNS automáticamente al instalar Active Directory y se configura para poder responder al nombre del servidor y del dominio).
