Caso práctico
-------------

Ahora que tenemos la red creada y configurada vamos a darle utilidad
para nuestros usuarios. En esta parte compartiremos recursos (carpetas e
impresoras) y estableceremos restricciones para mejorar la seguridad de
la red.
:::

::: {#taquesQuestion0b85 .section .block .iDevice_content}
**Compartición de carpetas**

Recordad que en el servidor habrá una carpeta llamada DatosESO dentro de
la cual tendremos las siguientes subcarpetas:

-   Normas: aquí los profesores de informática dejarán normas del aula y
    documentación para los alumnos
-   Apuntes: todos los profesores dejarán apuntes para los alumnos
-   Entregas4eso: aquí los alumnos de 4º de la ESO entregarán trabajos
    para los profesores. Los alumnos no han de poder ver los trabajos
    del resto de sus compañeros y los profesores los corregirán y
    después los eliminarán.

Además compartiremos de sólo lectura un directorio donde dejaremos las
ISOs que utilizarán los alumnos de Informática para realizar prácticas
de instalación de programas y sistemas operativos.

Estos 2 recursos los tienen que mantener los profesores de Informática
que tienen que poder crear o eliminar cualquier carpeta o documento y
cambiar sus permisos en caso necesario.

Los 2 recursos estarán dentro del volumen LVM que hemos creado para
datos.

Junto a estos recursos tendremos otro para almacenar los perfiles y las
carpetas personales de los usuarios con perfil móvil y que estará en el
volumen LVM creado para las carpetas personales.

**Impresoras**

Respecto a las impresoras recordad que tenemos 2 HP color Laserjet en el
aula informática que forman un grupo llamado HP\_Aula-XX.
:::

::: {.block .iDevice_buttons .feedback-button .js-required}
:::

::: {#feedback-quesFeedback0b85 .section .feedback .js-feedback .js-hidden}
Retroalimentación {#retroalimentación .js-sr-av}
=================

Usar permisos ACL para las DatosESO y sus subcarpetas
:::
:::
:::
:::

Actividades de ampliación 53_Actividadesdeampliacin 
=========================

::: {.iDevice .emphasis1}
Caso práctico {#caso-práctico-1 .iDeviceTitle}
-------------

::: {.iDevice_inner}
::: {.iDevice_content_wrapper}
::: {#ta135_248 .section .block .iDevice_content}
En la actividad de ampliación de la unidad anterior creamos el domino y
los distintos objetos en el servidor CentOS.
:::

::: {#taquesQuestion0b135 .section .block .iDevice_content}
Ahora vamos a compartir en él los directorios e impresoras indicados en
la práctica de clase y vamos a convertir a los alumnos en usuarios
móviles.
:::
:::
:::
:::

::: {.iDevice .emphasis1}
Reflexión {#reflexión .iDeviceTitle}
---------

::: {.iDevice_inner}
::: {.iDevice_content_wrapper}
::: {#ta134_246 .block .iDevice_content}
Investiga sobre las nuevas posibilidades que ofrece NFS v4 frente a la
versión 3.
:::
:::
:::
