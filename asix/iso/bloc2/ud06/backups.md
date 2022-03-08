# Copias de seguridad
- [Copias de seguridad](#copias-de-seguridad)
  - [Introducción](#introducción)
  - [Windows Server Backup (WSB)](#windows-server-backup-wsb)

## Introducción
Es fundamental una buena política de copias de seguridad para nuestra empresa a que nuestros datos son uno de los principales activos que tenemos.

A la hora de diseñar la política de backups tendremos en cuenta:
- Qué información debemos copiar
- Tipos de copias a realizar (completas, incrementales, diferenciales)
- Periodicidad de las copias
- Dónde guardar las copias
- Protección de las copias
- Comprobación de las mismas (realizaremos restauraciones aleatorias para comprobar el buen funcionamiento de nuestro sistema de backups)
- Borrado seguro y gestión de soportes (sin tener que usar el martillo ;-)

Podéis obtener información de todo esto en la [Guía de Copias de seguridad](https://www.incibe.es/sites/default/files/contenidos/guias/guia-copias-de-seguridad.pdf) del INCIBE (_Instituto Nacional de Ciberseguridad_) o en muchas otras páginas.

## Windows Server Backup (WSB)
Se trata de una herramienta que incluye Windows Server para realizar copias de seguridad tanto del sistema como de los datos. No es tan flexible como otras soluciones (no permite por ejemplo realizar copias incrementales ni diferenciales).

A la hora de instalarlo tened en cuenta que NO se trata de un rol sino de una CARACTERÍSTICA por lo que deberemos instalarlo desde allí.

En internet podéis encontrar gran cantidad de tutoriales sobre esta herramienta, como:
- [Vembu: Windows Server Backup: Installation, Features and Limitations](https://www.vembu.com/blog/)windows-server-backup-installation-features-limitations/
- [MiniTool: Windows Server Backup](https://www.minitool.com/backup-tips/windows-server-backup.html)