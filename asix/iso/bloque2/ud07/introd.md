# Supervisión y monitorización del sistema
- [Supervisión y monitorización del sistema](#supervisión-y-monitorización-del-sistema)
  - [Introducción](#introducción)
    - [Monitorización](#monitorización)
    - [Auditoría](#auditoría)
  - [Buenas Prácticas en Monitorización y Auditoría](#buenas-prácticas-en-monitorización-y-auditoría)


## Introducción
La monitorización y la auditoría en sistemas Windows son fundamentales para la administración y seguridad de los equipos. Estas técnicas permiten supervisar el estado del sistema, detectar incidentes de seguridad y garantizar el cumplimiento de normativas.

### Monitorización

La monitorización es el proceso de recopilación y análisis continuo de datos sobre el rendimiento, la disponibilidad y la seguridad de un sistema informático.

En Windows, la monitorización permite:
- Detectar problemas de rendimiento.
- Supervisar el estado del hardware y software.
- Identificar amenazas y actividades sospechosas.
- Prevenir fallos críticos.

Algunas de las herramientas clave en Windows son:

- Administrador de tareas (taskmgr)
- Monitor de rendimiento (perfmon)
- Visor de eventos (eventvwr)
- Windows Performance Recorder (WPR)

### Auditoría

La auditoría es el proceso de registrar y analizar eventos relevantes en un sistema para evaluar su seguridad y cumplimiento.

En Windows, la auditoría permite:
- Registrar intentos de acceso exitosos y fallidos.
- Detectar cambios en la configuración del sistema.
- Controlar el uso de archivos y carpetas.
- Investigar incidentes de seguridad.

Herramientas clave en Windows:

- Políticas de auditoría (secpol.msc)
- Visor de eventos (eventvwr)
- Windows Defender Event Logging
- Windows Event Forwarding (WEF)

##  Buenas Prácticas en Monitorización y Auditoría

Buenas prácticas en Monitorización:
- Definir métricas clave a supervisar.
- Automatizar la recopilación de datos con scripts o herramientas.
- Usar herramientas como Windows Performance Monitor y Task Scheduler.

Buenas prácticas en Auditoría
- Habilitar solo los eventos necesarios para evitar sobrecarga de registros.
- Implementar alertas para eventos críticos.
- Revisar los registros regularmente y hacer copias de seguridad.

Herramientas avanzadas:
- **Sysmon**: Permite un monitoreo detallado de procesos y cambios en el sistema.
- **Windows Event Forwarding (WEF)**: Centraliza logs de eventos en servidores.
- **Microsoft Defender for Endpoint**: Permite detectar ataques y responder automáticamente.

