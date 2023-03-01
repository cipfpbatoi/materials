# Configuración de switches Cisco


## Acceder por consola
Por defecto el acceso por _ssh_ y _telnet_ está deshabilitado por lo que sólo puede accederse mediante la consola mediante el protocolo RS-232. Para ellos los switches cuentan con una boca RJ-45 etiquetada como CON a la que conectar el cable.

Como los equipos modernos no cuentan con puerto COM se necesita un adaptador USB->DB-9 que conectar al ordenador. Tras hacerlo lo detcta como **_ttyUSB0_**.

Ahora necesitamos un programa para establecer la conexión como _Putty_. En el apartado _serie_ configuramos la conexión según los requisitos del switch: establecemos el puerto (_ttyUSB0_) y normalmente el resto de opciones son las configuradas por defecto (velocidad 9600bps, 8 bts por carácter, 1 bit de parada, sin bits de paridad, ...). Una vez hecho vamos a _session -> serial_ y seleccionamos el puerto _ttyUSB0_. Con ello ya estamos dentro.

NOTA: para poder usar el puerto serie hay que agregar el usuario al grupo correspondiente o ejecutar _Putty_ como _root_.

## Modos del switch
Hay varios modos:
- _user exec_: es el básico y sólo permite ejecutar comandos de testeo. Su prompt es `$`
- privilegiado: permite ejecutar comandos de configuración. Su prompt es `#` y desde aquí eccedemos al resto de modos. Se entra a este módulo con el comando `enable`

Para ver los comandos disponibles en cada modo ejecutamos `?`. El comando básico es `show running config` que muestra la configuración que se está ejecutando. Al arrancar el switch se cargará la configuración definida en `startup config` por lo que conviene guardar la configuración actual en _startup config_ cuando hagamos cambios en ella:

```bash
copy runnungconfig startupconfig
```

NOTA: si escribimos mal un comando intentará resolver lo que hemos escrito con su DNS lo que dejará la terminal "colgada" hasta que se produczca el _timeout_. Podemos interrumpirlo con _Ctrl+Mysc+6_ o mejor ejecutar `no ipdomain-lookup` para que no lo intente.

Podemos tener diferentes imágenes de configuración en la carpeta `/bootflash/` que pueden descargarse o subirse mediante FTP. Para saber qué fichero ha arrancado ejecutamos `show version`.

Si queremos restaurar los valores de fábrica hemos de eliminar `nvram/startupconfig` y `cat4000flash/vlan.dat`.

## Configuraciones globales
Se accede con `configure terminal` y podemos usar comandos como:
- `hostname`: nombre del switch, importante darle un nombre adecuado
- `banner`: mensaje que se ve al acceder al switch
- `lun console 0` y luego `password` para poner una contraseña y `login` para activarla y que la pida al acceder al switch por consola
- `enable secret` para que pida la contreseña para acceder al switch (la guarda cifrada)
- `enable password` igual pero la guarda en claro (nunca usar los 2 comandos)
- `line vty 0` y luego `password` para poner una contraseña y `login` para activarla y que la pida al acceder por telnet (la guarda en claro)
- `username` y luego `password` para crear diferentes usuarios para acceder por ssh o telnet. Luego se ejecuta `transport` para habilitarlos
- `service password encryption` revisa el _running config_ y encripta todas las contraseñas que estén en claro

## Configurar VLANs
NOTA: las interfaces que no se usan se deben asignar a la VLAN _blackhole_ y deshabilitarlas, pero no se le debe llamar así a la interfaz (mejor _srv_ o similar para despistar a intrusos)

Comandos útiles:
- `show interfaces switchport`: muestra todas las interfaces, incluyendo las troncales
- `interfaz fastethernet 5/1` -> `shutdown`: desactiva la interfaz FastEthernet 5/1. Para activarla `no shutdown`
- `show interface fastethernet 5/1`: indica su estado (UP/DOWN)
- `switchport trunk native vlan XX`: pone la etiqueta de la vlan indicada a todos los PDU que vengan sin etiqueta (sólo si tenemos en esa interfaz un switch antiguo que no etiqueta)

### Configurar el router
Hay que crear una subinterfaz para cada VLAN:
- `interface gigabyteEthernet 0/0/2.10`
- `encapsulation dot 1Q 10`: indicas que la subinterfaz se ha creado para la VLAN 10
- `ip address 10.10.0.254 255.255.255.0`

Y lo mismo para cada VLAN