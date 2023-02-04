# Administración de directivas avanzada
- [Administración de directivas avanzada](#administración-de-directivas-avanzada)
  - [Plantillas administrativas](#plantillas-administrativas)
  - [Líneas base de seguridad de Microsoft](#líneas-base-de-seguridad-de-microsoft)
  - [Configuración de seguridad avanzada](#configuración-de-seguridad-avanzada)


## Plantillas administrativas
Además de las miles de opciones que podemos configurar por defecto en una directiva podemos añadir nuevas plantillas con sus propias opciones para configurar, por ejemplo, otros programas del sistema. Esto lo conseguiremos añadiendo nuevas plantillas administrativas.

Las plantillas administrativas con las diferentes opciones de las directivas se almacenan en el directorio `C:\Windows\PolicyDefinitions` del DC. Allí encontramos ficheros `.admx` que contienen las diferentes opciones y, dentro de directorios del idioma, ficheros `.adml` con la ayuda y descripción de dichas opciones.

Para añadir nuevas plantillas administrativas sólo tenemos que descargarlas y copiarlas a ese directorio. Si nuestro dominio tiene varios DC deberíamos hacer esto para cada DC pero podemos copiar el directorio `PolicyDefinitions` al almacén de directivas del dominio, dentro de `C:\Windows\SYSVOL\sysvol\nuestro-dominio\Policies` de forma que se replique en cada DC. Lo recomendado es hacerlo así y tener un almacén central (_GPO Central Store_) con nuestras plantillas administrativas.

Una vez copiadas las plantillas al almacén (tanto las `.admx` como las `adml` de los idiomas de nuestro sistema) ya las tendremos disponibles en las GPO. 

Ejemplos de plantillas...:
- Chrome:
- [Mozilla Firefox](https://github.com/mozilla/policy-templates/releases)
- [LibreOffice](https://github.com/CollaboraOnline/ADMX)

En muchas ocasiones el fichero con la plantilla es un fichero `.msi` por lo que para instalarlas sólo necesitamos indicar la ruta del almacén de GPO.

## Líneas base de seguridad de Microsoft
Existen más de 3000 opciones de configuración de directiva de grupo, aparte de las que hay para programas específicos (por ejemplo Internet Explorer tiene más de 1800) lo que en ocasiones hace difícil y tedioso establecer una política adecuada para nuestra organización.

La seguridad es algo fundamental en todas las organizaciones y hay que tenerla muy presenta a la hora de decidir la política a aplicar a equipos y usuarios.

Para facilitar la creación de un entorno seguro Microsoft publica las líneas básicas de seguridad (_Security Baselines_) que son unas directivas ya configuradas con opciones recomendables para muchas organizaciones. En cualquier cada organización debería analizar las amenazas a que está expuesta para establecer la política más adecuada para protegerse frente a las mismas, pero esto puede ser un buen punto de partida.

Podemos encontrar más información en la [web de Microsoft](https://learn.microsoft.com/es-es/windows/security/threat-protection/windows-security-configuration-framework/windows-security-baselines) desde donde podemos [descargarnos](https://www.microsoft.com/en-us/download/details.aspx?id=55319) las diferentes _baselines_ que existen hasta el momento. Tenemos para Windows 10, Windows 11, Windows Server 2012 R2, Windows Server 2022, Microsoft 365 Apps, Microsoft Edge, ... Hay que tener en cuenta que hay versiones diferentes para las distintas versiones y compilaciones de Windows por lo que debemos asegurarnos de usar sólo la adecuada para nuestra compilación.

Cada una es un fichero comprimido que contiene diferentes carpetas:
- _Documentation_: archivos (en PDF y XLSX) con información sobre la configuración a aplicar en esta línea de seguridad
- _GP Reports_: informes (en HTML) donde ver la configuración que se aplicará (se ve como en la pestaña _Configuración_ de _Administración de directivas_)
- _GPOs_: las distintas GPO a aplicar. Para usarlas debemos importarlas a nuevas directivas y vincularlas (al dominio, a alguna OU, ...)
- _Scripts_: son scripts para importar automáticamente las GPOs o para importarlas y aplicarlas directamente
- _Templates_: son plantillas (ADMX o ADML) con GPOs adicionales

Para usarlas podemos o bien utilizar los scripts incluídos que lo harán todo automáticamente o, si queremos tener más control sobre el proceso, crear nosotros cada GPO vacía, importar su contenido de las directivas que se encuentran en la carpeta _GPOs_ y vincularlas al dominio o la OU correspondiente, según a quién deban aplicarse.

OJO: si tenemos equipos con distintas compilaciones podemos especificar que una GPO se aplique sólo a los equipos adecuados usando el _Filtrado WMI_. Por ejemplo, para Windows 10 20H2 usaremos el filtro WMI:
```sh
Select Version,ProductType from Win32_OperatingSystem WHERE Version LIKE "10.0.19042%" and ProductType = "1"
```

Podéis consultar cómo establecer filtros WMI en la [web de Microsoft](https://learn.microsoft.com/en-us/windows/security/threat-protection/windows-firewall/create-wmi-filters-for-the-gpo)

## Configuración de seguridad avanzada
Además de Microsoft otras organizaciones publican configuraciones predeterminadas para mejorar la seguridad en sistemas Windows.

En España el _Centro Criptográfico Nacional_ publica guías para mejorar la seguridad informática de instituciones y empresas en diferentes entornos. EN [este enlace](https://www.ccn-cert.cni.es/guias/guias-series-ccn-stic/500-guias-de-entornos-windows.html) podemos encontrar diferentes guías para entornos Windows.

