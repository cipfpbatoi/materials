# Bl2. UD 4 - Compartición de recursos en el dominio

## Contenidos
Los contenidos de esta unidad son los siguientes:
1. [Permisos y derechos](permisos.md)
2. [Servicios de archivo y almacenamiento](servarch.md)
3. [Administrador de recursos del servidor de archivos (FSRM)](fsrm.md)
4. [iSCSI y otros servicios de archivo](iscsi.md)
5. [Compartir impresoras](impr.md)

## Objetivos de la unidad
Los objetivos a alcanzar en esta unidad de trabajo son los siguientes:
- Centralizar la información personal de los usuarios del dominio mediante el uso de perfiles móviles y carpetas personales.
- Utilizar máquinas virtuales para administrar dominios y verificar su funcionamiento.
- Incorporar equipos al dominio.
- Bloquear accesos no autorizados al dominio.
- Administrar el acceso a recursos locales y recursos de red.
- Hacer cumplir los requerimientos de seguridad.

## Conceptos clave
Los conceptos más importantes de esta unidad son:
- Permisos NTFS y SMB
- Compartir carpetas
- Compartir impresoras

## Conocimiento previo
Antes de comenzar esta unidad de trabajo el alumno debería saber:
- qué es un dominio
- cómo se gestionan los dominios en Windows: Active Directory
- crear y administrar usuarios, grupos y OUs
- cómo utilizar software de virtualización para crear máquinas virtuales
- gestionar unidades de almacenamiento y sus particiones
- cuáles son los sistemas de archivo utilizados por los sistemas Microsoft y sus ventajas e inconvenientes
- cómo asignar permisos a ficheros y carpetas en sistemas de archivo NTFS
- cómo utilizar la terminal para realizar tareas básicas en una máquina

## Caso práctico
Compartiremos 2 carpetas en el servidor:
- AdminRed: carpeta OCULTA para gestionar la red. Dentro tendrá las subcarpetas:
  - Personales: carpetas personales de alumnos y profes. A cada una sólo podrá entrar su propietario y los Administradores. Estableceremos para ellas una cuota de 200 MB
  - PerfProfes: aquí se guardarán los perfiles móviles de los profesores
  - PerfAlumnos: para el perfil obligatorio de todos los alumnos
- Aula: es donde se almacenan los ficheros que se usan en las clases. Contiene las subcarpetas:
  - Info: informaciones generales para todos los grupos. Los profes dejan documentos para los alumnos
  - 1rESO, 2nESO, 3rESO, 4tESO: a cada una de estas carpetas podrán entrar todos los profesores pero sólo los alumnos de ese grupo. Dentro de cada una hay 2 subcarpetas:
    - Apuntes: los profes de ese grupo dejan ficheros para los alumnos del grupo. El resto de profes los pueden ver
    - Entregas: los alumnos del grupo dejan sus trabajos pero SIN VER los de los demás. Los profes del grupo los corrigen y luego eliminan. El resto de profes no tiene acceso a menos que algún profesor del grupo le de permisos

Además se ha adquirido una impresora HP (elige el modelo) donde pueden imprimir tanto alumnos como profesores pero los trabajos enviados por los profes tienen prioridad sobre los de los alumnos. Los profesores serán administradores de esta impresora.