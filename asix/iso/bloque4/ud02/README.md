# Bl4. UD2: Auditoría de seguridad en sistemas Windows
- [Bl4. UD2: Auditoría de seguridad en sistemas Windows](#bl4-ud2-auditoría-de-seguridad-en-sistemas-windows)
  - [1. Introducción a la auditoría de sistemas](#1-introducción-a-la-auditoría-de-sistemas)
    - [Principio de mínima auditoría necesaria](#principio-de-mínima-auditoría-necesaria)
  - [2. Directivas de auditoría en Windows Server](#2-directivas-de-auditoría-en-windows-server)
    - [2.1 Directivas de auditoría básicas](#21-directivas-de-auditoría-básicas)
    - [2.2 Directivas de auditoría avanzadas](#22-directivas-de-auditoría-avanzadas)
    - [2.3 Configuración mediante GPO en un dominio](#23-configuración-mediante-gpo-en-un-dominio)
  - [3. Auditoría de acceso a objetos (ficheros y carpetas)](#3-auditoría-de-acceso-a-objetos-ficheros-y-carpetas)
    - [Paso 1: Activar la directiva de auditoría](#paso-1-activar-la-directiva-de-auditoría)
    - [Paso 2: Configurar la SACL del objeto](#paso-2-configurar-la-sacl-del-objeto)
  - [4. Auditoría de inicios de sesión](#4-auditoría-de-inicios-de-sesión)
  - [5. Auditoría de administración de cuentas](#5-auditoría-de-administración-de-cuentas)
  - [6. Visor de eventos: análisis de registros de auditoría](#6-visor-de-eventos-análisis-de-registros-de-auditoría)
    - [Filtrar por ID de evento](#filtrar-por-id-de-evento)
    - [Filtrar por fecha y hora](#filtrar-por-fecha-y-hora)
    - [Buscar por usuario o equipo](#buscar-por-usuario-o-equipo)
    - [Guardar y exportar registros](#guardar-y-exportar-registros)
    - [Gestión del tamaño del registro](#gestión-del-tamaño-del-registro)
  - [7. Comandos útiles para auditoría](#7-comandos-útiles-para-auditoría)
    - [`auditpol`](#auditpol)
    - [PowerShell con el Visor de Eventos](#powershell-con-el-visor-de-eventos)
  - [8. Buenas prácticas de auditoría](#8-buenas-prácticas-de-auditoría)
  - [9. Práctica propuesta — RA7](#9-práctica-propuesta--ra7)
    - [Práctica 7.1: Configuración y análisis de directivas de auditoría en Windows Server](#práctica-71-configuración-y-análisis-de-directivas-de-auditoría-en-windows-server)
  - [10. Práctica propuesta — RA7 (ampliación)](#10-práctica-propuesta--ra7-ampliación)
    - [Práctica 7.2: Auditoría de administración de cuentas y uso de PowerShell](#práctica-72-auditoría-de-administración-de-cuentas-y-uso-de-powershell)


## 1. Introducción a la auditoría de sistemas

La **auditoría de sistemas** consiste en registrar y analizar los eventos relevantes que ocurren en un sistema informático, con el objetivo de garantizar la seguridad, detectar accesos no autorizados, cumplir con normativas y contar con evidencias en caso de incidente.

Una auditoría bien configurada responde a preguntas como:

- ¿Quién inició sesión en el servidor y cuándo?
- ¿Qué usuario intentó acceder a una carpeta sin tener permiso?
- ¿Se han modificado archivos críticos de configuración?
- ¿Se han creado o eliminado cuentas de usuario?
- ¿Ha habido intentos reiterados de inicio de sesión fallidos (posible ataque de fuerza bruta)?

La auditoría en Windows genera eventos en el **Registro de Seguridad** del Visor de Eventos. Para que se generen esos eventos, antes hay que configurar las **directivas de auditoría**.

### Principio de mínima auditoría necesaria

Auditar todo indiscriminadamente genera un volumen de eventos tan grande que resulta imposible de analizar y puede degradar el rendimiento del servidor. Lo correcto es auditar solo lo relevante: los recursos críticos, los accesos de usuarios con privilegios elevados y los intentos de acceso fallido.

---

## 2. Directivas de auditoría en Windows Server

Existen dos tipos de directivas de auditoría en Windows Server: la auditoría **básica** (9 categorías) y la auditoría **avanzada** (más de 50 subcategorías). En entornos profesionales se recomienda usar la auditoría avanzada, ya que permite una configuración mucho más precisa.

### 2.1 Directivas de auditoría básicas

Se configuran en: `Configuración del equipo → Configuración de Windows → Configuración de seguridad → Directivas locales → Directiva de auditoría`

Las nueve categorías son:

| Categoría | Qué audita |
|-----------|------------|
| Auditar eventos de inicio de sesión de cuenta | Validación de credenciales (p.ej., en un controlador de dominio) |
| Auditar la administración de cuentas | Creación, modificación o eliminación de cuentas y grupos |
| Auditar el acceso del servicio de directorio | Accesos a objetos de Active Directory |
| Auditar eventos de inicio de sesión | Inicios y cierres de sesión locales e interactivos |
| Auditar el acceso a objetos | Accesos a ficheros, carpetas, impresoras y claves de registro |
| Auditar el cambio de directivas | Cambios en directivas de seguridad o auditoría |
| Auditar el uso de privilegios | Uso de derechos de usuario especiales |
| Auditar el seguimiento de procesos | Creación y finalización de procesos |
| Auditar eventos del sistema | Cambios en la hora del sistema, arranque, apagado |

Cada categoría puede configurarse para registrar eventos de **Correcto** (operación realizada con éxito), de **Error** (operación denegada o fallida) o ambos.

Por defecto todas las auditorías están desactivadas pero podemos activar cualquiera de ellas creando una nueva GPO y configurando la auditoría que queramos en el `Editor de administración de directivas de grupo -> Configuración de equipo -> Directivas -> Configuración de Windows -> Configuración de seguridad -> Directivas locales -> Directiva de auditoría`.

Si queremos activarlas para un equipo lo haremos desde `Inicio -> Herramientas administrativas -> Directivas de seguridad local -> _Configuración de seguridad_ -> _Directivas locales_ -> Directiva de auditoría`.

![Directiva de auditoría](./media/directiva-auditoria.png)

Los eventos generados por las auditorías podremos verlos en el Visor de eventos de Windows, dentro de `Registros de Windows->Seguridad`.

### 2.2 Directivas de auditoría avanzadas

Se configuran en: `Configuración del equipo → Directivas → Configuración de Windows → Configuración de seguridad → Configuración de directiva de auditoría avanzada`

Amplían las categorías básicas en subcategorías mucho más específicas. Por ejemplo, la categoría "Inicio de sesión/Cierre de sesión" se divide en: Inicio de sesión, Cierre de sesión, Bloqueo de cuenta, Modo especial de inicio de sesión, etc.

> **Importante:** no se deben combinar ambos tipos de directiva. Si se va a usar la auditoría avanzada, hay que activar la opción `Auditar: forzar la configuración de la subcategoría de directiva de auditoría (Windows Vista o posterior) para invalidar la configuración de la categoría de directiva de auditoría`, que se encuentra en `Directivas locales → Opciones de seguridad`.

### 2.3 Configuración mediante GPO en un dominio

En entornos con Active Directory, las directivas de auditoría se aplican a través de **Objetos de Directiva de Grupo (GPO)** para que afecten a todos los equipos del dominio o a las unidades organizativas deseadas.

El proceso es:

1. Abrir la **Consola de administración de directivas de grupo** (`gpmc.msc`).
2. Crear una nueva GPO o editar una existente.
3. Navegar hasta `Configuración del equipo → Directivas → Configuración de Windows → Configuración de seguridad → Directiva de auditoría` (o "Configuración de directiva de auditoría avanzada").
4. Configurar las categorías deseadas.
5. Vincular la GPO a la unidad organizativa correspondiente.
6. Forzar la actualización en los equipos cliente con `gpupdate /force`.

---

## 3. Auditoría de acceso a objetos (ficheros y carpetas)

La auditoría del acceso a objetos es uno de los aspectos más importantes en la práctica. Permite saber qué usuario ha accedido, modificado o intentado acceder sin permiso a un fichero o carpeta concreta.

La configuración requiere **dos pasos** independientes que ambos deben completarse:

### Paso 1: Activar la directiva de auditoría

En la directiva de auditoría (local o por GPO), activar **"Auditar el acceso a objetos"** para Correcto, Error o ambos según el caso de uso:

- **Correcto:** útil para registrar quién accede a documentos sensibles (p.ej., nóminas, contratos).
- **Error:** útil para detectar intentos de acceso no autorizado.

### Paso 2: Configurar la SACL del objeto

La directiva activa la auditoría a nivel de sistema, pero no especifica qué carpetas o ficheros concretos se van a auditar. Eso se configura en la **Lista de Control de Acceso del Sistema (SACL)** de cada objeto:

1. Hacer clic derecho sobre la carpeta → **Propiedades**.
2. Pestaña **Seguridad** → botón **Opciones avanzadas**.
3. Pestaña **Auditoría** → botón **Agregar**.
4. Seleccionar la entidad a auditar (un usuario, un grupo, o "Todos").
5. Elegir los tipos de acceso a registrar: Leer, Escribir, Eliminar, Cambiar permisos, etc.
6. Indicar si se audita el éxito, el error, o ambos.
7. Aceptar.

Una vez configurado, los eventos de acceso aparecerán en el Visor de Eventos → Registros de Windows → **Seguridad**.

---

## 4. Auditoría de inicios de sesión

La auditoría de inicios de sesión registra quién accede al sistema, desde dónde y con qué resultado. Es fundamental para detectar ataques de fuerza bruta y accesos fuera de horario.

Se activa habilitando **"Auditar eventos de inicio de sesión"** en la directiva de auditoría.

Los eventos más relevantes en el registro de Seguridad son:

| ID de evento | Descripción |
|--------------|-------------|
| 4624 | Inicio de sesión correcto |
| 4625 | Inicio de sesión fallido |
| 4634 | Cierre de sesión |
| 4648 | Inicio de sesión con credenciales explícitas (runas) |
| 4740 | Cuenta de usuario bloqueada |
| 4767 | Cuenta de usuario desbloqueada |
| 4771 | Error de preauthenticación Kerberos (inicio de sesión fallido en dominio) |

El evento **4625** es especialmente importante. Su campo "Motivo del error" indica la causa del fallo: contraseña incorrecta, cuenta desactivada, cuenta expirada, inicio de sesión fuera de horario permitido, etc.

Detectar muchos eventos 4625 seguidos desde la misma cuenta o desde la misma dirección IP es una señal de un posible ataque de fuerza bruta.

---

## 5. Auditoría de administración de cuentas

Al habilitar **"Auditar la administración de cuentas"**, se generan eventos cuando se crean, modifican o eliminan cuentas de usuario y grupos. Esto es fundamental para detectar creaciones de cuentas no autorizadas (táctica habitual de persistencia tras un compromiso del sistema).

| ID de evento | Descripción |
|--------------|-------------|
| 4720 | Se creó una cuenta de usuario |
| 4722 | Se habilitó una cuenta de usuario |
| 4723 | Se intentó cambiar la contraseña de una cuenta |
| 4724 | Se restableció la contraseña de una cuenta |
| 4725 | Se deshabilitó una cuenta de usuario |
| 4726 | Se eliminó una cuenta de usuario |
| 4727 | Se creó un grupo de seguridad global |
| 4732 | Se agregó un miembro a un grupo de seguridad local |
| 4756 | Se agregó un miembro a un grupo de seguridad universal |

---

## 6. Visor de eventos: análisis de registros de auditoría

Toda la información de auditoría se vuelca en el **Registro de Seguridad** del Visor de Eventos (`eventvwr.msc`). En un servidor activo este registro puede acumular miles de entradas diarias, por lo que saber filtrarlo es imprescindible.

### Filtrar por ID de evento

En el panel derecho → **Filtrar registro actual** → introducir el ID del evento que interesa. Por ejemplo, filtrar por `4625` para ver solo los inicios de sesión fallidos.

### Filtrar por fecha y hora

Permite acotar la búsqueda a un periodo concreto, por ejemplo, para analizar lo ocurrido durante un incidente.

### Buscar por usuario o equipo

Con el botón **Buscar** se puede localizar todas las entradas que contienen el nombre de un usuario concreto.

### Guardar y exportar registros

Los registros pueden exportarse en formato `.evtx` (nativo de Windows), `.xml` o `.csv` para su análisis externo o para conservarlos como evidencia. Esto se hace desde el menú contextual del registro → "Guardar todos los eventos como...".

### Gestión del tamaño del registro

De forma predeterminada el registro de Seguridad tiene un tamaño máximo de 20 MB. En servidores con mucha actividad esto puede llenarse rápidamente y sobreescribir eventos antiguos. Se recomienda aumentar el tamaño máximo (al menos 128 MB) y configurar la acción cuando se llena:

- **Sobrescribir eventos según sea necesario:** opción por defecto, puede perder evidencias.
- **Archivar el registro cuando esté lleno:** guarda automáticamente el fichero antes de sobrescribir.
- **No sobrescribir eventos:** el sistema detiene la generación de nuevos eventos cuando el registro está lleno (opción más segura pero que puede afectar al sistema).

Esta configuración se realiza haciendo clic derecho sobre el registro en el Visor de Eventos → **Propiedades**.

---

## 7. Comandos útiles para auditoría

### `auditpol`

`auditpol` es la herramienta de línea de comandos para gestionar la directiva de auditoría. Es muy útil para automatizar configuraciones y verificar el estado actual:

```
# Ver la configuración actual de todas las categorías
auditpol /get /category:*

# Activar la auditoría de inicio de sesión (éxito y error)
auditpol /set /subcategory:"Logon" /success:enable /failure:enable

# Activar la auditoría de acceso a ficheros (éxito y error)
auditpol /set /subcategory:"File System" /success:enable /failure:enable
```

### PowerShell con el Visor de Eventos

PowerShell permite consultar el registro de seguridad de forma programática, lo que facilita la creación de informes automáticos:

```powershell
# Obtener los últimos 20 intentos de inicio de sesión fallidos
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625} -MaxEvents 20 |
  Select-Object TimeCreated, Message | Format-List

# Obtener todos los eventos del día de hoy en el registro de Seguridad
Get-WinEvent -FilterHashtable @{
  LogName='Security';
  StartTime=(Get-Date).Date
} | Select-Object TimeCreated, Id, Message
```

---

## 8. Buenas prácticas de auditoría

- **Centralizar los registros:** en entornos con múltiples servidores, recopilar todos los eventos en un servidor central (mediante suscripciones de eventos de Windows o soluciones SIEM) para facilitar el análisis.
- **Establecer una política de retención:** definir durante cuánto tiempo se conservan los registros. La legislación puede imponer plazos mínimos en ciertos sectores.
- **Revisar los registros periódicamente:** la auditoría solo es útil si alguien la analiza. Establecer una rutina de revisión semanal o configurar alertas automáticas.
- **No auditar en exceso:** auditar todo genera ruido y dificulta la detección de lo importante. Centrarse en los recursos críticos y en los eventos de error.
- **Proteger los propios registros:** los registros de auditoría son evidencias. Deben estar protegidos contra modificación o borrado. Solo los administradores deben tener acceso.
- **Documentar cada cambio en la directiva de auditoría:** cualquier modificación de la configuración debe quedar registrada con fecha, responsable y motivo.

---

## 9. Práctica propuesta — RA7

### Práctica 7.1: Configuración y análisis de directivas de auditoría en Windows Server

**Objetivo:** configurar directivas de auditoría mediante GPO, provocar eventos auditables y analizarlos en el Visor de Eventos.

**Desarrollo:**

**Parte A — Auditoría de inicios de sesión:**

1. En el controlador de dominio, abrir `gpmc.msc` y crear una GPO llamada "Auditoria_ISO".
2. Configurar la directiva para auditar "Eventos de inicio de sesión" para Correcto y Error.
3. Vincular la GPO al dominio y ejecutar `gpupdate /force` en los equipos clientes.
4. Desde un equipo cliente, intentar iniciar sesión con una contraseña incorrecta 5 veces y luego iniciar sesión correctamente.
5. En el controlador de dominio, abrir el Visor de Eventos → Registros de Windows → Seguridad.
6. Filtrar por los eventos 4624 y 4625. Identificar los intentos fallidos y el inicio exitoso.
7. Analizar el campo "Motivo del error" de los eventos 4625.

**Parte B — Auditoría de acceso a objetos:**

1. En la misma GPO, activar "Auditar el acceso a objetos" para Correcto y Error.
2. Crear una carpeta compartida en el servidor llamada `Documentos_RR.HH`.
3. En las propiedades de la carpeta → Seguridad → Opciones avanzadas → Auditoría, agregar auditoría para el grupo "Usuarios del dominio" sobre las acciones Leer, Escribir y Eliminar (tanto correcto como error).
4. Acceder a la carpeta desde un equipo cliente con un usuario que sí tiene permiso y con otro que no lo tiene.
5. Crear y eliminar un fichero de prueba dentro de la carpeta.
6. Analizar los eventos generados en el Visor de Eventos. Identificar el ID del evento, el usuario que realizó la acción y el objeto accedido.

**Parte C — Informe de auditoría:**

Con los eventos obtenidos en las partes A y B, elaborar un informe de auditoría que incluya:

- Configuración de directivas aplicada.
- Tabla de eventos detectados (fecha/hora, ID, usuario, descripción).
- Identificación de cualquier acceso sospechoso o no autorizado.
- Conclusiones y recomendaciones.

**Entrega:** capturas de pantalla de la configuración GPO, del Visor de Eventos con los filtros aplicados y del informe de auditoría en formato documento.

---

## 10. Práctica propuesta — RA7 (ampliación)

### Práctica 7.2: Auditoría de administración de cuentas y uso de PowerShell

**Objetivo:** auditar cambios en cuentas de usuario y automatizar la extracción de eventos con PowerShell.

**Desarrollo:**

1. Configurar la directiva "Auditar la administración de cuentas" (Correcto y Error) en la GPO existente.
2. Realizar las siguientes acciones desde el Panel de usuarios y equipos de AD:
   - Crear un nuevo usuario de prueba.
   - Cambiar su contraseña.
   - Deshabilitar la cuenta.
   - Agregar el usuario a un grupo de seguridad.
   - Eliminar el usuario.
3. Verificar en el Visor de Eventos que se han generado los eventos correspondientes (4720, 4722, 4724, 4725, 4726, 4732).
4. Usar PowerShell para extraer todos los eventos de administración de cuentas de las últimas 24 horas y exportarlos a un fichero CSV:

```powershell
$eventos = Get-WinEvent -FilterHashtable @{
    LogName='Security';
    Id=@(4720,4722,4724,4725,4726,4732,4756);
    StartTime=(Get-Date).AddDays(-1)
}
$eventos | Select-Object TimeCreated, Id, Message |
    Export-Csv -Path "C:\Auditoria\informe_cuentas.csv" -NoTypeInformation -Encoding UTF8
```

5. Abrir el CSV con Excel y filtrar por tipo de evento. Identificar qué usuario realizó cada acción y a qué hora.

**Entrega:** el fichero CSV generado + un breve análisis de los eventos encontrados.

---

