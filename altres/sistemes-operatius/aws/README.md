# Cloud Computing
Es la prestación de servicios informáticos a través de Internet.

Ventajas:
- Escalabilidad, anivel de potencia de procesamiento, de volumen de datos, ...
- Pagas sólo por lo que usas: sinecesitas más amplias y si no necesitas tanto reduces
- El mantenimiento, actualizaciones, etc lo realizan otros
- También se encargan de las copias de seguridad y de que todo funcione ininterrumpidamente
- Permite crecer muy rápidamente

## Responsabilidad compartida
Si tenemos nuestro sistema en local en nuestro CPD nuestro departamento de TI debe encargarse de mantener:
- el espacio físico
- la seguridad
- el hardware y software necesario para que el sistema funcione correctamente
- los sistemas actualizados y con la versión correcta
- ...

Con el _cloud computing_ las responsabilidades se reparten entre el proveedor de servicios y nuestro equipo de TI. El proveedor se ocupa siempre de la seguridad física, la alimentación, la refrigeración y la conectividad. Nosotros nos ocupamos siempre de los datos almacenados en la nube (no queremos que el proveedor los vea), los dispositivos con los que nos conectamos a ella y las cuentas de los usuarios y dispositivos de nuestra organización.

El resto depende de lo que contrate, por ejemplo:
- si usamos una BBDD en la nube el proveedor es el responsable de su mantenimiento
- si usamos una máquina virtual en la que instalamos una BBDD nosotros somos responsables del mantenimiento de la misma

Por tanto las responsabilidades cambian según los servicios que contratemos:
- IaaS (Infraestructura como Servicio): nosotros somos responsables de la mayor parte de cosas
- PaaS (Plataforma como Servicio): nivel intermedio
- SaaS (Software como Servicio): la mayoría de responsabilidades recaen en el proveedor

## Modelos en la nube
Definen el tipo de implementación de los recursos en la nube. Pueden ser:
- Nube privada: es una nube que utiliza una única entidad. Es la evolución natural de un CPD local y permite mayor control por parte de la empresa pero mayores costes
- Nube pública: un proveedor de servicios en la nube crea y mantiene una nube pública en la que cualquiera puede comprar servicios y usarlos
- Nube híbrida: es un entorno que usa nubes públicas y privadas interconectadas. Puede usarse por ejemplo para ampliar temporalmente nuestra nube privada ante un pico de demanda
- Nubes múltiples: se usan varias nubes públicas de varios proveedores

## Ventajas
- Alta disponibilidad
- Escalabilidad tanto vertical (más potencia de procesamiento, más RAM, ...) como horizontal (más servidores, más contenedores, ...)
- Confiabilidad y recuperación ante errores
- Previsibilidad de costos


## IaaS
Básicamente consiste en alquilar el hardware. El proveedor sólo es el responsable de mantener el hardware, la conectividad y la seguridad física. Todo lo demás es nuestra responsabilidad.

### PaaS
Además del hw el proveedor mantiene los S.O, middleware, herramientas, bases de datos, etc. No debemos preocuparnos de licencias, actualizaciones, etc. Un ejemplo de uso es para crear entornos de desarrollo.

### SaaS
Lo que alquilamos es un servicio o una aplicación. Nuestra responsabilidad son sólo los datos, los usuarios que se ecoenctan y los dispositivos con los que se coenctan.