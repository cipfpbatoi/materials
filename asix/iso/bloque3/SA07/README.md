# Centralización de la información con OpenLDAP

<figure><img src="./media/LDAPworm.gif" alt="OpenLDAP"><figcaption>OpenLDAP</figcaption></figure>

- [Centralización de la información con OpenLDAP](#centralización-de-la-información-con-openldap)
  - [Objetivos](#objetivos)
  - [Conceptos clave](#conceptos-clave)
  - [Introducción a LDAP](#introducción-a-ldap)
  - [Situaciones Aprendizaje](#situaciones-aprendizaje)

## Objetivos

Los objetivos a alcanzar en estas situaciones de aprendizaje son los siguientes:

* Implementar dominios.
* Administrar cuentas de usuario y cuentas de equipo.
* Centralizar la información personal de los usuarios del dominio mediante el uso de perfiles móviles y carpetas personales.
* Crear y administrar grupos.
* Organizar los objetos del dominio para facilitar su administración.
* Utilizar máquinas virtuales para administrar dominios y verificar su funcionamiento.
* Incorporar equipos al dominio.
* Bloquear accesos no autorizados al dominio.

## Conceptos clave

Los conceptos más importantes de esta unidad son:

* LDAP
* Configuración de un servidor LDAP
* Administración del directorio
* Configuración de un cliente LDAP

## Introducción a LDAP

LDAP son las siglas de _Lightweight Directory Access Protocol_ (Protocolo Ligero de Acceso a Directorios) y es un protocolo cliente-servidor que permite el acceso a un servicio de directorio ordenado y distribuido para buscar información en la red.

Un directorio es una base de datos especial donde las consultas son frecuentes pero las actualizaciones no tanto. Sus datos son objetos que tienen atributos y están organizados de forma jerárquica. Un ejemplo sería el directorio telefónico, que consiste en una serie de nombres (de personas y empresas) que están ordenados alfabéticamente por poblaciones, y cada nombre tiene como atributos una dirección y un número de teléfono.

El directorio se organiza como un árbol y tiene una entrada para cada objeto que almacena. Cada entrada consta de un conjunto de atributos y un atributo tiene un nombre (el tipo de atributo) y uno o más valores.

LDAP puede usarse para muchas cosas. Nosotros lo usaremos para realizar la autentificació centralizada de los usuarios de nuestra red (entre otras cosas almacenaremos la información de autenticación: usuario y contraseña) pero podría usarse para gestionar libretas o calendarios compartidos, gestionar una infraestructura de clave pública (PKI), ...

Hay muchas implementaciones del protocolo LDAP, tanto libres como privativas. Algunas de las más usadas son:

* **Active Directory**: es la implementación que utiliza Microsoft para sus dominios
* **openLDAP**: es una implementación libre y es la más usada en sistemas GNU/Linux
* Otras: Apache DS, Oracle Internet Directory, Novell Directory Services, etc.

## Situaciones Aprendizaje

* **SA5**: [OpenLDAP 1 Linux](https://1-asix.gitbook.io/iso/v/openldap) 
* **SA7**: OpenLDAP 2 Linux 


Obra publicada con [Licencia Creative Commons Reconocimiento No comercial Compartir igual 4.0](http://creativecommons.org/licenses/by-nc-sa/4.0/)