# Instalar roles y características
- [Instalar roles y características](#instalar-roles-y-características)
  - [Introducción](#introducción)
    - [Powershell](#powershell)
  - [Servicio de enrutamiento](#servicio-de-enrutamiento)
  - [Instalación del dominio](#instalación-del-dominio)
    - [Instalar el dominio desde la terminal](#instalar-el-dominio-desde-la-terminal)
    - [Degradar un controlador de dominio](#degradar-un-controlador-de-dominio)
    - [Añadir un cliente al dominio](#añadir-un-cliente-al-dominio)

## Introducción
Hemos comentado que los roles son los diferentes servicios que podemos instalar en el servidor.

Después de instalar Windows Server el sistema operativo funciona como cualquier otro Windows hasta que instalamos los componentes que le permitan funcionar como un servidor. A estos componentes Microsoft los denomina "roles".

Para agregar un rol al servidor se hace desde el **Administrador del servidor** en el `menú Administrar-> Agregar Roles y características`. 

![Roles y características](media/AdministrarRoles.png)

Algunos de ellos son:
- **Acceso remoto**: servicios que ofrecen la capacidad de conectar diferentes segmentos de red y las herramientas para administrar el acceso a la red. Incluye varios servicios como el servicio de enrutamiento, VPN o el servicio de acceso remoto.
- **Servicios de archivos y almacenamiento**: proporcionan administración de almacenamiento, replicación de archivos, acceso de los clientes a los archivos, etc
- **Servicios de dominio de Active Directory (AD)**: administra la información sobre usuarios, equipos y el resto de dispositivos y recursos. Permite a los administradores gestionar todos los elementos del dominio.
- **Servicios de impresión y documentos**: permite administrar impresoras y servidores de impresión.
- **Servidor DHCP**
- **Servidor DNS**
- **Servidor web (IIS)**: integra el servidor web IIS (Internet Information Server) y ASP.NET

El más importante es el servicio de dominio, que veremos en el siguiente apartado. Antes vamos a ver cómo se instalaría cualquier rol y en concreto instalaremos y configuraremos el servicio de enrutamiento para que los clientes de nuestra red interna tengan salida al exterior (y a Internet) a través de este servidor.

Puedes ver [este vídeo](./media/rolSrvImpresion.ogv) de cómo instalar un rol, en concreto el _Servicio de Impresión_.

### Powershell
El comando para instalar un rol es `Install-WindowsFeature`. A diferencia del entorno gráfico este comando no incluirá las herramientas de administración de ese rol a menos que incluyamos el parámetro `IncludeManagementTools`. El comando

```powershell
Install-WindowsFeature -Name <feature_name> -computerName <computer_name> -IncludeManagementTools -Restart
```

instala el rol identificado por _<feature_name>_ en el equipo _<computer_name>_ (si no se pone este parámetro se instala en la máquina en que se ejecuta el comando) incluyendo sus herramientas de administración y, si es necesario, reinicia el equipo tras finalizar la instalación.

Podemos obtener la lista de roles que podemos instalar en este equipo con el comando `Get-WindowsFeature`. Si queremos la lista para otro equipo pondremos `Get-WindowsFeature -computerName <computer_name>`.

Y para desinstalar un rol ejecutaremos `Uninstall-WindowsFeature -Name <feature_name> -computerName <computer_name> -Restart -IncludeManagementTools`.

## Servicio de enrutamiento
Deberemos instalar esta función si nuestro servidor va a permitir a los clientes de al red salir al exterior (para ello necesitará tener 2 tarjetas de red). Con las dos tarjetas configuradas tenemos 2 redes diferentes: una externa que nos comunica con el exterior y una interna que nos comunica con nuestros clientes. Pero ahora mismo las 2 redes no están comunicadas entre sí y un cliente de la red interna sólo puede llegar hasta el servidor pero no salir al exterior. Para que pueda hacerlo tenemos que enrutar las 2 tarjetas del servidor de forma que todo el tráfico que llega por la tarjeta interna hacia el exterior se enrute a la tarjeta externa que sabe hacia donde se tiene que dirigir.

En Windows Server 2008 este servicio se instala como cualquier otro rol. En Windows Server 2012 se encuentra dentro de Acceso remoto. Una vez instalado el servicio hay que configurarlo.

Para ello pregunta es qué tipo de servicio queremos crear. En nuestro caso sólo queremos conectar las 2 redes haciendo NAT para que los clientes puedan acceder a la red externa e Internet.

A continuación hemos de indicar cuál es la tarjeta externa por la cual salir a Internet. Por último nos dice que no hay ningún servidor de DNS ni DHCP instalado pero como los instalaremos más adelante elegimos no configurar ahora esto.

Puedes ver [este vídeo](./media/Enrutamiento.ogv) de cómo instalar y configurar este rol.

Si tenemos más de una red interna las otras tarjetas internas se enrutan desde _Enrutamiento y acceso remoto->nuestro servidor->IPv4->NAT_ i se añaden el resto de interfaces internas.

![Enrutar otra red](media/enrutarOtraRed.png)

Una vez configurada la red comprobaremos su correcto funcionamiento, con las órdenes `ping` y `tracert`. Ahora ya se debe poder navegar por Internet desde un cliente. El comando que nos muestra la configuración actual de la red es `ipconfig / all`.

## Instalación del dominio
Para que nuestro servidor sea un controlador de dominio (DC, Domain Controller) debemos instalar el rol de **Servicio de dominio de Active Directory**.

Como cualquier otro rol en primer lugar se instala y luego se configura. Podemos abrir el asistente de configuración desde la pantalla que indica el final de la instalación.

Puedes ver [este vídeo](./media/Dominio.ogv) de cómo instalar y configurar este rol.

Vamos a explicar las diferentes opciones que hemos escogido durante la configuración del dominio:
- en primer lugar hemos de seleccionar _Agregar un nuevo bosque_ ya que no hay ningún dominio en nuestra red al que vayamos a unirnos. El nombre del nuevo dominio raíz debería tener más de 1 nivel (por ejemplo _midominio.lan_ con 2 niveles). EN caso de tener ya un dominio en el bosque elegiremps entre crear un nuevo dominio en ese árbol o crear un árbol nuevo
- el nivel funcional del bosque y del dominio lo establecemos al máximo posible, Windows Server 2016. Así podemos aprovechar todas sus características. Si en este dominio tuviéramos un DC con una versión inferior deberíamos escoger dicha versión para que sean compatibles
- además se va a instalar el **servicio DNS** porque no hay ningún servidor DNS en el dominio así que esta máquina hará también de servidor DNS. Aparece un mensaje diciendo que si ya tenemos un DNS debemos agregar manualmente la zona para el dominio que estamos creando, pero si no hay ningún DNS no hay que nacer nada porque automáticamente se instalará uno con la zona para este dominio y con un _reenviador_ (a quien enviar otras peticiones) que será el DNS de la tarjeta externa de la máquina en este momento. Además en la configuración de dicha tarjeta se cambiará ese DNS por 127.0.0.1
- en cuanto a la ubicación de los diferentes componentes del dominio, si tenemos varios discos sería conveniente que estén en discos distintos por cuestión de rendimiento. Podéis obtener más información en la web de Microsoft. En nuestro caso lo dejaremos todo en C:

Tras configurar el dominio se reiniciará el servidor que, cuando vuelva a arrancar, ya será un DC.

### Instalar el dominio desde la terminal
El comando para crear el dominio ACME.LAN con PowerShell sería:
```powershell
$dominioFQDN = "ACME.LAN"
$dominioNETBIOS = "ACME"
$adminPass = "Batoi@1234."
Install-WindowsFeature AD-Domain-Services,DNS
Import-module addsdeployment
Install-ADDSForest `
    -DomainName $dominioFQDN `
    -DomainNetBiosName $dominioNETBIOS `
    -SafeModeAdministratorPassword (ConvertTo-SecureString -string $adminPass -AsPlainText -Force) `
    -DomainMode WinThreshold `
    -ForestMode WinThreshold `
    -InstallDNS -Confirm:$false `
    -DomainMode WinThreshold `
    -ForestMode WinThreshold `
    -InstallDNS -Confirm:$false
```

### Degradar un controlador de dominio
Si tenemos que eliminar un controlador de dominio y dejarlo como servidor miembro o independiente se hace desinstalando el rol de **Servicios de dominio de Active Directory**.

En la ventana de 'quitar las características' requeridas marcaremos debajo la casilla de 'Quitar herramientas de administración'. Posteriormente aparece una ventana informándonos que se debe 'Disminuir el nivel de este DC'. Pulsamos en ella y al final aparecerá una pantalla indicándonos todos los roles que hospeda este DC. Tras marcar la casilla 'COntinuar con la eliminación' se procederá a la misma.

Si estamos degradando el último controlador del dominio se eliminará el mismo, perdiéndose toda la información que contenía. El servidor pasará a ser un servidor independiente. Si por el contrario aún quedan otros controladores de dominio la única cosa que estamos haciendo es que este servidor pasará a ser un servidor miembro del dominio sin funciones de controlador (que las harán el resto de controladores que aún queden en el dominio).

### Añadir un cliente al dominio
En primer lugar hemos de asegurar la correcta conectividad de cliente y servidor, es decir:
- que sus IPs pertenezcan a la misma red
- que físicamente sus cables de red estén conectados al mismo switch (o a switches conectados entre sí)
- que el cliente puede resolver correctamente el nombre del dominio (para ello como DNS del cliente deberemos poner la IP del servidor que hará de servidor DNS en el dominio)

Una vez hecho esto (podemos comprobarlo desde la terminal con `ping` y `nslookup`) ya podemos añadir el cliente al dominio. Puedes ver [este vídeo](./media/Cliente.ogv) de cómo añadir un cliente al dominio.
