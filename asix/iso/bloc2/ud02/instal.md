# Instalación de Windows Server
- [Instalación de Windows Server](#instalación-de-windows-server)
  - [Planificación de la instalación](#planificación-de-la-instalación)
  - [Proceso de instalación](#proceso-de-instalación)
    - [Instalación Server Core](#instalación-server-core)
  - [Finalización de la instalación](#finalización-de-la-instalación)
    - [Proporcionar información del equipo](#proporcionar-información-del-equipo)
    - [Configurar la red](#configurar-la-red)
    - [Actualizar el servidor](#actualizar-el-servidor)
    - [Administrar el servidor desde la terminal](#administrar-el-servidor-desde-la-terminal)
    - [El Firewall](#el-firewall)
    - [Versión de evaluación](#versión-de-evaluación)
  - [Documentación de la instalación](#documentación-de-la-instalación)

## Planificación de la instalación
Instalar un sistema operativo nunca es un proceso trivial y mucho menos en el caso de un servidor. Si el sistema no se instala y configura correctamente podemos encontrarnos posteriormente con fallos que serán difíciles de corregir. Ya vimos en el bloque 1 las [tareas a planificar](../ud03/aplnif.md#introducción) antes de realizar la instalación de un sistema operativo.

En la fase de [análisis del sistema](./README.md#caso-práctico) debemos haber respondido a la pregunta de para qué vamos a utilizar este sistema informático, tanto en la actualidad como en el futuro (al menos a corto/medio plazo).

Una vez decidido que nuestro sistema informático es lo bastante complejo como para necesitar un servidor tenemos que planificar cuidadosamente su instalación:
- Habrá que elegir los sistemas operativos a instalar en el servidor y en los clientes
- También tenemos que elegir qué servicios son los que necesitamos y si para ofrecer esos servicios tendremos uno o varios servidores.
- Por último tenemos que decidir si queremos que los servidores estén o no virtualitzados (en nuestro caso lo estarán necesariamente pero en la empresa tiene ventajas el uso de servidores virtualizados como vimos en la UD 2 sobre virtualización).

Una vez analizadas todas las consideraciones indicadas tendremos que decidir sobre diferentes aspectos:
- Elección del hardware
  - Compatibilidad con el sistema operativo a instalar
  - Capacidad para hacer frente a las necesidades actuales y posibles crecimientos, al menos a corto plazo
  - En caso de decidir virtualitzar servidores el equipo tendría que tener soporte hardware para la virtualización
  - Soporte de _drivers_ para todo el hardware. En caso de no existir drivers habrá que cambiar el hardware o elegir otra opción de sistema operativo
  - Soporte para todo el software a instalar: sistema operativo, aplicaciones, seguridad (antivirus, backup, ...), etc
- Elección del sistema operativo
  - Compatibilidad con el hardware
  - Compatibilidad con los sistemas operativos del cliente
  - Funcionalidades para la correcta gestión de la red
- Aplicaciones
  - Compatibilidad de todas las aplicaciones a instalar con el sistema operativo y el hardware

En función de eso haremos la elección de los equipos a adquirir y los sistemas a instalar en cada equipo, eligiendo los que satisfagan todas nuestras necesidades (actuales y futuras).

En nuestra práctica no tenemos que preocuparnos de la parte del hardware porque ya lo tenemos y no lo podemos cambiar. Simplemente miraremos si es necesario mejorar algún elemento como aumentar la cantidad de RAM o adquirir algún disco duro adicional o alguna otra tarjeta de red.

Respecto al sistema operativo ya hemos elegido los sistemas para los clientes y debemos ahora elegir el sistema operativo para el servidor. Como aún no tenemos demasiados conocimientos de los sistemas GNU/Linux nos decantaremos por un Windows Server para el servidor que hemos visto que cumple con los requerimientos que nos plantean.

Lo razonable es instalar la última versión: _Windows Server 2022_. Dentro de cada versión de Windows hay diferentes ediciones y debemos elegir la más adecuada para nuestro sistema.

En la web de [Microsoft](https://www.microsoft.com/es-es/windows-server/pricing), Wikipedia y otras páginas podemos consultar las características de las diferentes ediciones.

## Proceso de instalación
Una vez finalizada la planificación procederemos a la instalación del sistema. Si ya tenemos las particiones hechas en la instalación elegiremos cuál será la del sistema. Si no las haremos al instalar (recordad que el instalador de Windows sólo permite crear particiones primarias y con sistema de ficheros NTFS).

El proceso de instalación es similar al de cualquier Windows cliente.

### Instalación Server Core
Esta instalación (que es la opción por defecto al instalar el sistema) instala el servidor pero sin entorno gráfico, con las ventajas e inconvenientes que ello comporta. En realidad sí que hay un sistema gráfico desde el que se pueden realizar algunas acciones pero no es tan potente ni pesado como el entorno gráfico normal.

## Finalización de la instalación
Una vez finalizada la instalación y antes de configurar el sistema es conveniente hacer una serie de comprobaciones:
- **estado de los dispositivos**: desde el _Administrador de dispositivos_ podemos comprobar que no haya hardware sin detectar o con problemas de controladores
- **comprobación de la red**: es fundamental que sea correcta. Podemos comprobarlo con comandos como `ping`, `tracert`, `nslookup`,... y también con las herramientas del _Centro de redes y recursos compartidos_
- **registros de eventos**: mediante el Visor de eventos podemos como probar que no haya errores o advertencias que indican que algo no funciona correctamente
- **particiones**: también es conveniente comprobar que el sistema detecta correctamente todos los discos y las particiones hechas

Una vez comprobado todo esto es conveniente reiniciar el equipo para comprobar que lo hace correctamente. Después acabaremos de configurarlo como veremos ahora y, una vez configurado, sería conveniente hacer una imagen del servidor limpio.

Lo primero es realizar una serie de tareas básicas de configuración desde el `Administrador del servidor->Servidor local`.

### Proporcionar información del equipo
Lo primero que tenemos que hacer es cambiar el **nombre del equipo**. Se recomienda que no tenga más de 15 caracteres y sólo use caracteres estándar (letras normales, números o guión). El nombre de cada equipo tiene que ser único en el dominio.

Respecto al dominio si este servidor hará de servidor en un dominio ya existente (donde ya hay otro servidor que hace de controlador de dominio) indicaremos el nombre del dominio. Si no trabajaremos con dominio o este es el servidor que hará de controlador lo dejamos como grupo de trabajo (posteriormente veremos como crear el nuevo dominio).

El _Firewall_ de Windows siempre debemos tenerlo activado y bien configurado.

Si es necesario podemos habilitar el _Escritorio remoto_ para que los usuarios puedan conectarse al servidor mediante _Terminal Server_ y trabajar desde su equipo como si estuvieron físicamente en la consola del servidor.

También es aconsejable comprobar la zona horaria (aparece a la derecha).

### Configurar la red
A continuación hay que configurar la red. Lo más normal es que el servidor tenga direcciones IP estáticas, no obtenidas por DHCP (seguramente será él quien asigne direcciones por DHCP). Desde aquí le podemos asignar la IP que corresponda a cada tarjeta de red.

Si nuestro servidor tiene que hacer de servidor de comunicaciones y ser la puerta de enlace por la cual los clientes de nuestra red accedan a Internet tendrá que tener al menos 2 tarjetas de red:
- la tarjeta externa que conectará nuestro servidor con la red externa (al router o equipo que le da salida a Internet). Configuraremos el protocolo TCP/IP (la IPv4, la IPv6 o las dos, según el protocolo que utilizamos en nuestra red): como _gateway_ pondremos la IP del dispositivo que nos proporciona acceso a Internet y como IP de nuestro equipo pondremos la IP estática con que se conecta a ese gateway (tendrá que estar en la misma subred para poder acceder al gateway). Si estamos creando un servidor virtual la IP será diferente según si elegimos _adaptador puente_ o _NAT_ cuando configuramos el adaptador en VirtualBox.
- la tarjeta interna conectará nuestro servidor a los clientes e irá al switch al que se conectan todos los clientes. En su configuración no pondremos ninguna gateway porque la salida de esta tarjeta será la tarjeta externa y como dirección IP de nuestro servidor pondremos una IP de la misma subred de nuestros clientes (normalmente suele ser la acabada en 1, por ejemplo 192.168.224.1, pero puede ser cualquiera).

Finalmente tendremos que enrutar el tráfico entre las dos tarjetas de forma que todo el tráfico de salida que llega por la tarjeta interna sea transferido a la externa desde donde irá hacia su destino. Sin este paso los clientes llegarán al servidor pero no podrán ir más allá. La forma más sencilla de hacer esto es instalando en nuestro servidor el **Servicio de Enrutamiento** (es uno de los servicios que encontramos dentro del servicio de _Acceso a red_). Esto se verá en el apartado de [roles](./roles.md).

### Actualizar el servidor
Es muy importante configurar las actualizaciones del servidor para asegurarnos que se encuentra siempre actualizado.

Si es importante que un cliente esté siempre actualizado para evitar vulnerabilidades esto es mucho más importante en el caso del servidor porque si un atacante consigue acceder a nuestro servidor tendrá a su alcance toda la información y los recursos de nuestra red. De todas formas tenemos que tener cuidado con esto porque algunas actualizaciones requieren reiniciar el equipo (y es un tema delicado en un servidor) y también podría pasar que alguna actualización nos de problemas con nuestro hardware o con alguna aplicación instalada, aunque es algo poco habitual. Por eso hay administradores que prefieren que las actualizaciones se descarguen automáticamente pero no se instalen sino que hacen ellos la instalación manualmente en algún momento en que no sea crítico el funcionamiento del servidor. Esta es la configuración por defecto en _Windows Server_.

No profundizaremos en cómo hacerlo ya que es igual que en cualquier cliente Windows.

**Recordad que nosotros deshabilitaremos las actualizaciones automáticas para no colapsar la red del instituto.**

### Administrar el servidor desde la terminal
Si hemos instalado el servidor sin entorno de escritorio debemos usar la terminal para configurarlo. Al arrancar el servidor automáticamente se abre la herramienta de texto **sconfig** nos permite configurar de forma sencilla e intuitiva muchas de las cosas más habituales:

![sconfig](media/sconfig.png)

Además podemos usar directament _PowerShell_. Algunos comandos que tendremos que usar son:
- Para cambiar el nombre del servidor:
```powershell
Rename-Computer -NewName MISERVIDOR
Restart-Computer -force
```

- Para configurar la red podemos usar Powershell o **netsh**:
```powershell
Get-NetAdapter –name $redInterna | Remove-NetIPAddress -Confirm:$false
Get-NetAdapter –name $redInterna | New-NetIPAddress –AddressFamily IPv4 –IpAddress 192.168.1.25 -PrefixLength 24
```

- Para ver el nombre de cada interfaz de red usamos el comando `Get-NetIPInterface`.

Podemos encontrar muchos comandos de configuración en la página de [Administración de un servidor Server Core](https://docs.microsoft.com/es-es/windows-server/administration/server-core/server-core-administer) de Microsoft.

### El Firewall
El Firewall de _Windows Server 2022_, a diferencia de las versiones anteriores, por defecto corta el tráfico ICMP (los _ping_) al servidor desde cualquier equipo que no pertenezca al dominio. Para comprobar nuestra red podemos desactivar temporalmente el firewall con el comando
```powershell
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled false
```

y volverlo a habilitar poniéndolo de nuevo a `true`. En este ejemplo lo hemos desactivado para los 3 perfiles existentes (_Dominio_, _Público_ y _Privado_).

Si vamos a necesitar hacer este tipo de _ping_ lo que deberíamos hacer es añadir una regla al firewall. 

Para crear esa regla con _PowerShell_ haremos:
```powershell
$ips = @("192.168.0.11-192.168.0.40", "192.168.100.10-192.168.100.200", "192.168.200.0/24")
New-NetFirewallRule -DisplayName "Allow inbound ICMPv4" -Direction Inbound -Protocol ICMPv4 -IcmpType 8 -RemoteAddress $ips -Action Allow
```

Podemos habilitar y deshabilitar una regla de firewall con `Enable-NetFirewallRule` y `Disable-NetFirewallRule`:
```powershell
Disable-NetFirewallRule –DisplayName "Allow inbound ICMPv4"
```

Y para eliminar una regla usaremos `Remove-NetFirewallRule`.

Además de usando Powershel podemos configurar el firewall con `netsh`. La regla anterior se añadiría con:
```powershell
netsh advfirewall firewall add rule name="Allow inbound ICMPv4" protocol=icmpv4:8,any dir=in action=allow
```

y se eliminaría con:
```powershell
netsh advfirewall firewall add rule name="Allow inbound ICMPv4" protocol=icmpv4:8,any dir=in action=block
```

Para mostrar todas las reglas usamos el _cmdlet_ `Get-NetFirewallRule`. Para mostrar las direcciones IP de una regla en concreto usamos `Get-NetFirewallAddressFilter` y para mostrar sus puertos `Get-NetFirewallPortFilter`:
```powershell
Get-NetFirewallRule -DisplayName Allow inbound ICMPv4

Get-NetFirewallRule -DisplayName Allow inbound ICMPv4 | Get-NetFirewallAddressFilter

Get-NetFirewallRule -DisplayName Allow inbound ICMPv4 | Get-NetFirewallPortFilter
```

Ejemplo para mostrar todas las reglas de entrada activas, mostrando además el protocolo, puerto, etc en formato tabla para verlas mejor:
```powershell
Get-NetFirewallRule -Action Allow -Enabled True -Direction Inbound |
Format-Table -Property Name,
@{Name="Protocol";Expression={($PSItem | Get-NetFirewallPortFilter).Protocol}},
@{Name="LocalPort";Expression={($PSItem | Get-NetFirewallPortFilter).LocalPort}},
@{Name="RemotePort";Expression={($PSItem | Get-NetFirewallPortFilter).RemotePort}},
@{Name="RemoteAddress";Expression={($PSItem | Get-NetFirewallAddressFilter).RemoteAddress}},
Enabled, Profile, Direction, Action
```

Podemos obtener más información de cómo configurar el _Firewall_ usando Powershell en páginas como [Reparar.info](https://reparar.info/configuracion-de-reglas-de-firewall-de-windows-con-powershell/) o usando `netsh advfirewall` en páginas como [esta](https://docs.microsoft.com/es-es/troubleshoot/windows-server/networking/netsh-advfirewall-firewall-control-firewall-behavior) de Microsoft con ejemplos para habilitar programas o abrir puertos.

### Versión de evaluación
La versión que hemos instalado es la versión  de evaluación y sólo podemos utilizarla durante un tiempo determinado antes de adquirir una licencia. Podemos ver el tiempo que nos queda con el comando:
```bash
slmgr.vbs -dli
```

![slmgr](media/slmgr.png)

Microsoft nos permite ampliar el periodo de prueba con el comando:
```bash
slmgr.vbs -rearm
```

Este comando tarda un tiempo en ejecutarse y después nos pide que reiniciemos el sistema.

## Documentación de la instalación
A lo largo de la instalación es conveniente anotar en un documento cuestiones cómo:
- Fecha y hora de la instalación
- Versión y número. de serie del sistema operativo, licencias de cliente instaladas, ...
- Especificaciones hardware del equipo (procesador, RAM, disco llevar, tarjeta gráfica, tarjetas de red, etc)
- Discos duros y particiones del equipo (nombre, medida, FS, utilización, ...)
- Identificación del equipo: nombre, contraseña del administrador, ubicación
- Software adicional instalado incluyendo con el nombre del programa la versión, descripción, utilidad y fecha de instalación
- Configuración de red: IP, máscara, puerta de enlace, servidores DNS, num. de roseta en el switch o el rack, nombre del dominio o grupo de trabajo
- Actualizaciones instaladas: nombre, utilidad y fecha de instalación
- Clientes conectados: IP, sistema operativo, nombre del equipo, tipo de equipo, ubicación, usuario habitual, observaciones
- Otras datos: antivirus, cortafuegos, gestor de base de datos, servidores a quienes está conectado, etc
- Configuraciones adicionales: configuración de elementos como cortafuegos, gestor de base de datos, antivirus, etc
- Impresoras conectadas: nombre, tipo, IP o puerto, ubicación

La documentación no es un documento estático sino que irá modificándose a medida que cambiemos la configuración del servidor.