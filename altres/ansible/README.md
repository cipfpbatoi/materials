# Usar ansible para gestionar nuestras aulas
Vamos a usar _ansible_ para gestionar de forma sencilla todos los clientes de las aulas.

## Instalación
En el equipo desde el que queramos controlar los clientes tenemso que instalar _ansible_. Puede ser cada equipo de profesor o un equipo del departamento que usemos para esto, al que llamaremos _controller_.

Se instala com:
```bash
$ sudo apt-add-repository ppa:ansible/ansible 
$ sudo apt-get update 
$ sudo apt-get install ansible 
```

Para comprobar que se ha instalado correctamente y ver su versión haremos:ç
```bash
ansible --version
```

En los clientes sólo necesitamos que root pueda entrar por ssh, para lo que necesitamos copiar en ellos las claves SSH del _controller_ con:
```bash
ssh-copy-id root@192.168.33.11 
```

NOTA: en el _controller_ la clave ssh se crea con
```bash
ssh-keygen -t rsa 
```

## Inventarios
Para decirle a _ansible_ qué máquinas va a gestionar tenemos los inventarios. El inventario por defecto es **/etc/ansible/hosts** donde añadimos las IPs de los nodos a gestionar, ej.:
```ini
192.168.224.11  # pc11-t224
192.168.224.12  # pc12-t224
...
```

Podemos poner las IP o los nombres de los hosts, siempre que alguien los resuelva.

Podemos crear grupos de equipos en el inventario y un equipo puede pertenecer a varios grupos, ej.:
```ini
[aula-224]
192.168.224.11  # pc11-t224
192.168.224.12  # pc12-t224
...
[primera-fila]
192.168.224.11  # pc11-t224
192.168.224.12  # pc12-t224
...
[segunda-fila]
192.168.224.21  # pc21-t224
192.168.224.22  # pc22-t224
...
```

También se pueden usar patrones:
```ini
[aula-224]
192.168.224.[11-51]
...
[primera-fila]
192.168.224.[11-16]
...
[segunda-fila]
192.168.224.[21-26]
...
```

Un grupo puede contener otros grupos indicándolo con `:children`:
```ini
[primera-fila]
192.168.225.[11-16]
...
[segunda-fila]
192.168.225.[21-26]
...
[aula-224:children]
primera-fila
segunda-fila
...
```


Si para conectar con alguna máquina usamos un puerto distinto al 22 lo indicamos allí:
```bash
192.168.224.11:2222  # pc11-t224
192.168.224.12:2222  # pc12-t224
...
```

## Comandos
Podemos ejecutar cualquier comando en los todos con:
```bash
ansible all -a "hostname"
```

Los parámetros que le pasamos al comando `ansible` son:
- all: indica que se aplicará a todos los nodos del inventario. Si queremos sólo a uno o varios equipos o grupos pondremos su nombre o si IP, si son varios separados por coma
- -a: indica que lo que sigue es el comando a ejecutar en cada nodo

Si queremos que un comando se ejecute con privilegios podemos añadir el parámetro:
- `-s` que equivale a anteponerle un sudo
- `-u root` (o cualquier otro usuario) que hará que se ejecute como si lo hiciera el usuario indicado

Si la red se resiente por acceder a todos los nodos en paralelo podemos poner el parámetrp `-f num` siendo _num_ el número de nodos sobre los que se actuará a la vez (ej. `-f 1` hará que lso comandos se ejecuten en un nodo y cuando este acabe en el siguiente).

## Módulos
Lo normal no es ejecutar un comando _bash_ sino usar comandos de los módulos de ansible que hacen lo mismo pero:
- son idenpotentes: es igual ejecutarlos 1 vez o muchas (no hace lo que ya haya sido hecho)
- muestran el resultado resumido según el nivel de detalle que queramos

### apt
Se encarga de las tareas que tienen que ver con _apt_ como instalar, desinstalar o actualizar paquetes. Por ejemplo para instalar **ntp** en los nodos (para que ansible funcione deben tener la hora correctamente configurada):
```bash
ansible all -s -m apt -a "name=ntp state=installed" 
```

Los _state_ que podemos pasarle al módulo son:
- _installed_: instala el paquete, si no lo está
- _latest_: actualiza el paquete a la última versión disponible, si no lo está ya
- _absent_: desinstala el paquete, si está instalado

### service
Gestiona servicios. Por ejemplo, para arrancar el servicio _npt_ haremos:
```bash
ansible all -s -m service -a "name=ntp state=started enabled=yes" 
```

Los posibles valores de _state_ son:
- _started_: arraca el servicio (si no está ya arrancado)
- _status_: muestra el estado del servicio
- ...

El parámetro `enabled=yes` hace un `systemctl enable servicio`.

### group
Se encarga de la gestión de grupos. Por ejemplo, para crear el grupo _admin_ ejecutamos:
```bash
ansible all -s -m group -a "name=admin state=present" 
```

Los posibles valores de _state_ son:
- _present_: crea el grupo (si no existe)
- _absent_: elimina el grupo

Se le puede pasar el GID que queremos que tenga con `gid=[gid]` o podemos decir que es un grupo del sistema con `system=yes`.

### user
Se encarga de la gestión de usuarios. Por ejemplo, para crear el usuario _mario_ cuyo grupo principal sea _admin_ y que se cree su _home_ ejecutamos:
```bash
ansible all -s -m user -a "name=mario group=admin createhome=yes" 
```
Si queremos eliminarlo pondremos _state absent_:
```bash
ansible all -s -m user -a "name=mario state=absent" 
```

Podemos obtener más información sobre este módulo y ver todas sus opciones desde la [documentación oficial](http://docs.ansible.com/ansible/user_module.html).

### Archivos y directorios: stat, copy, fetch, file
Se encargan de la gestión de archivos y directorios. 

Para obtener las propiedades de un archivo usamos **stat**:
```bash
ansible all -m stat -a "path=/etc/hosts" 
```

Para copiar un archivo del _controller_ a los _nodos_ usamos **copy**:
```bash
ansible all -m copy -a "src=/etc/hosts dest=/tmp/hosts" 
```

El parámetro _src_ puede ser un archivo o un directorio completo.

Para copiar un archivo de los _nodos_ al _controller_ usamos **fetch**:
```bash
ansible all -m fetch -a "src=/etc/hosts dest=/tmp" 
```

Al nombre de cada archivo copiado se le añade al final el nodo desde el que se descargó y la fecha.

Para crear un archivo vacío (hacer _touch_) usamos **file**:
```bash
ansible all -m file -a "dest=/tmp/fichero mode=644 state=touch" 
```

Para crear un directorio usamos **file**:
```bash
ansible all -m file -a "dest=/tmp/test mode=644 state=directory" 
```

Para borrar un archivo o un directorio sólo hay que poner su _state_ a _absent_:
```bash
ansible all -m file -a "dest=/tmp/fichero state=absent" 
```

Podemos obtener más información sobre este módulo y ver todas sus opciones desde la [documentación oficial](http://docs.ansible.com/ansible/file_module.html).

### cron
Permite añadir comandos al _crontab_ de los _nodos_ para programar su ejecución:
```bash
ansible all -s -m cron -a "name='my-cron' hour=5 job='/script.sh'" 
```

Ejecuta el script _/script.sh_ todos los días a las 4 de la mañana.

### setup
Muestra la configuraciónd e cada nodo:
```bash
ansible all -m setup 
```

## Playbooks
Lo normal no és ejecutar un comando sino guardar en un _playbook_ (una especie de script) lo que queramos ejecutar. Podemos mantenerlos en _git_ para llevar el control de las distintas versiones.

Cada _playbook_ es un fichero YAML. Se recomienda que la primera línea sean guiones
```yaml
---
```

y la última puntos
```yaml
...
```

### Ficheros YAML
En YAML tenemos diccionarios (pares _clave: valor_) y istas (un elemento por línea precedido de -). Pueden combinarse, ej.:
```yaml
# Empleado 
mario:
  nombre: "Mario Pérez"
  twitter: @marioperest 
  trabajo: "Desarrollador Backend" 
  lenguajes: 
  - PHP 
  - NodeJS 
... 
```

También puede ponerse de forma abreviada:
```yaml
# Empleado 
mario: {nombre: "Mario Pérez", twitter: @marioperest, trabajo: "Desarrollador Backend", lenguajes: [‘PHP’, ‘NodeJS’]} 
... 
```

Podemos utilizar variables y su valor se muestra con `{{ variable }}`.

### Estructura de un playbook
Un playbook se compone de varios _plays_. Cada _play_ se aplica a un grupo de hosts sobre los que se ejecutan tareas (_tasks_), que son llamadas a un determinado módulo de Ansible.

Por ejemplo, para instalar y habilitar apache en todos los _nodos_ crearemos el playbook _apache.yaml_ qu contendrá:
```yaml
---  
- hosts: all 
  remote_user: root 
  tasks: 
  - name: Ensure Apache is at the latest version 
    apt: name=apache2 state=latest 
  - name: ensure apache is running 
    service: name=apache2 state=started enabled=yes 
... 
```

Para ejecutarlo haremos:
```bash
ansible-playbook apache.yaml 
```

Si queremos que use un fichero de inventario distinto de _/etc/ansible/hosts_ le añadimos `-i`:
```bash
ansible-playbook -i nombre_fichero apache.yaml 
```

Podemos cambiar lo que se muestra con la opción `--verbose`. Podemos poner `-v`, `-vv`, `-vvv` o `-vvvv`. También le podemos indicar el nº de _forks_ a usar con `-f` como ya vimos al ejecutar un comando. 

Hay también una opción útil que es `--check` que prueba todas las tareas pero sin llegar a ejecutarlas.

Cada play contiene una lista de tareas, las cuales se ejecutan en orden y solo una al mismo tiempo. Si falla una tarea, se puede volver a ejecutar, ya que los módulos deben ser idempotentes, es decir, que ejecutar un módulo varias veces debe tener el mismo resultado que si se ejecuta una vez.

Todas las tareas deben tener un name, el cual se incluye en la salida del comando al ejecutar el playbook. Su objetivo es que la persona que ejecute Ansible pueda leer con facilidad la ejecución del playbook.

Las tareas se declaran en el formato `module: options` (como antes: `apt: name=apache2 state=latest ` y `service: name=apache2 state=started enabled=yes`).

Los módulos command y shell son los únicos comandos que no utilizan el formato clave=valor, sino que directamente se le pasa como parámetro el comando que deseamos ejecutar:
```yaml
--- 
- hosts: all 
  remote_user: root 
  tasks: 
  - name: Run a command 
    shell: /usr/bin/command 
...
```

Un playbook puede contener varias tareas:
```yaml
---  
- hosts: all 
  remote_user: root 
  tasks: 
  - name: Ensure Apache is at the latest version 
    apt: name=apache2 state=latest 
- hosts: primera-fila 
  remote_user: root 
  tasks: 
  - name: Ensure MariaDB is at the latest version 
    apt: name=mariadb state=latest . 
...
```

Podemos hacer que una tarea se ejecute con un usuario diferente al que se conecta al ssh con _become_:
```yaml
---  
- hosts: primera-fila
  remote_user: yourname 
  become: yes 
  become_user: mati 
...
```

### Obtener un parámetro
En ocasiones nos interesará crear un playbook genérico (por ejemplo 'instala un paquete' o 'copia un fichero') que nos pregunte el paquete o fichero a instalar. Podemos hacer que se pida un dato por el prompt y que se guarde en una variable con _vars_prompt_:
```yaml
---  
- hosts: all
  vars_prompt:
    - name: fich
      prompt: "Escribe el nombre (con ruta) del fichero a copiar"
    - name: usuario
      prompt: "Escribe el nombre del usuario remoto al que copiar el fichero"
  tasks:
    - name: Copiar un fichero a los clientes
    - copy: src={{ name }} dest=/home/{{ usuario }}/Downloads
...
```

## Gestión de las aulas
Para no tener que cambiar cosas entre los distintos servidores de aula podríamos crear un inventario para cada aula en todos y al ejecutar un playbook le decimos que use el inventario del aula donde estamos.

Vamos a crear en cada inventario los grupos:
[primera-fila]

[aula:children]
192.168.

