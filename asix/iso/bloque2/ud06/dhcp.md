# Servicio DHCP
- [Servicio DHCP](#servicio-dhcp)
  - [Introducción](#introducción)
  - [Instalación y configuración](#instalación-y-configuración)
  - [Powershell](#powershell)

## Introducción
DHCP permite simplificar la configuración IP de los equipos ya que permite usar un servidor DHCP para asignar dinámicamente una dirección IP a un equipo u otro dispositivo (impresora, ...) de la red en lugar de configurar manualmente todos los dispositivos con una dirección IP estática. Cada equipo recibirá una IP diferente además de su máscara, puerta de enlace y DNS.

Normalmente contaremos con un servidor DHCP en nuestra red para no tener que configurar manualmente la red en cada equipo del dominio. Los mensajes DHCP son mensajes de difusión por lo que los enrutadores no los reenvían entre subredes. Si tenemos varias subredes podemos hacer:
- Instalar un servidor DHCP en cada subred
- Configurar los enrutadores para reenviar los mensajes de difusión DHCP entre subredes y configurar en el servidor DHCP un ámbito por subred

Cada subred debe tener su propio intervalo de direcciones IP únicas y cada intervalo se representa con un ámbito donde definiremos:
- un nombre de ámbito para identificarlo
- el intervalo de direcciones que puede dar a los clientes (por ejemplo de la 192.168.1.10 a la 192.168.1.99)
- la máscara (p.e. 255.255.255.0)
- dirección IP de la puerta de enlace
- dirección IP del servidor DNS
- duración de la concesión
- opcionalmente podemos establecer intervalos de exclusión
- opcionalmente podemos establecer reservas de IP

Los intervalos de exclusión son rangos de IPs que están dentro del intervalo del ámbito pero que no queremos que se asignen. Por ejemplo si tengo 3 impresoras con IP 192.168.1.20, .21 y .22 crearemos un intervalo de exclusión en el ámbito anterior para que no se asignen esas IP a ningún equipo.

Las reservas me sirven para asegurarme de que siempre asigno a misma IP al mismo equipo. Las IP de los servidores no deberían cambiar por lo que puedo configurarlas manualmente o poner en el DHCP una reserva para que cada vez que se solicite IP por parte de determinada MAC (la de la tarjeta de ese servidor) se le asigne siempre la IP reservada.

## Instalación y configuración
Debemos instalar el rol **Servidor DHCP** y configurar en él el/los ámbitos. Si va a asignar IPs en un dominio hay que autorizar el servicio en Active Directory.

Es un proceso muy sencillo y tenéis multitud de tutoriales en internet.

## Powershell
Para instalar el servicio ejecutamos
```powershell
Install-WindowsFeature DHCP -IncludeManagementTools
```

Si queremos que se creen los grupos de seguridad _Administradores dhcp_ y _Usuarios DHCP_ (no es necesario) ejecutamos:
```powershell
netsh dhcp add securitygroups
```

Si estamos instalando el servicio en un dominio debemos autorizar a DHCP a operar en el dominio (para evitar que algún DHCP no autorizado pudiera dar IPs a los clientes). Para autorizar el DHCP del servidor DHCP1.acme.lan con IP 192.168.1.1 usamos el comando:
```powershell
Add-DhcpServerInDC -DnsName DHCP1.acme.lan -IPAddress 192.168.1.1
```

Podemos comprobar los DHCP autorizados en el dominio con:
```powershell
Get-DhcpServerInDC
```

Vamos ahora a crear y configurar un ámbito que llamaremos 'Aula' cuyo rango será 192.168.100.10-192.168.100.200, su puerta de enlace el equipo comm.acme.lan con IP 192.168.100.1 y su DNS el 192.168.1.1. Además excluiremos del ámbito las IP de la 20 a la 25
```powershell
Add-DhcpServerv4Scope -name "Aula" -StartRange 192.168.100.10 -EndRange 192.168.100.200 -SubnetMask 255.255.255.0 -State Active
Add-DhcpServerv4ExclusionRange -ScopeID 192.168.100.0 -StartRange 192.168.100.20 -EndRange 192.168.100.25
Set-DhcpServerv4OptionValue -OptionID 3 -Value 192.168.100.1 -ScopeID 192.168.100.0 -ComputerName comm.acme.lan
Set-DhcpServerv4OptionValue -DnsDomain acme.lan -DnsServer 192.168.1.1
```

Para reiniciar el servicio DHCP ejecutamos
```powershell
Restart-Service dhcpserver
```

Más información en la web de [Micorsoft](https://docs.microsoft.com/es-es/windows-server/networking/technologies/dhcp/dhcp-deploy-wps)
