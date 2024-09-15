# Supervisión y monitorización del sistema
- [Supervisión y monitorización del sistema](#supervisión-y-monitorización-del-sistema)
  - [Introducción](#introducción)
  - [Tareas del administrador del sistema](#tareas-del-administrador-del-sistema)
  - [Conceptos relacionados con la supervisión](#conceptos-relacionados-con-la-supervisión)


## Introducción
Es imprescindible conocer lo que está sucediendo en el sistema tanto para resolver problemas como para mejorar el rendimiento del mismo. Para ello comprobaremos el rendimiento del sistema antes de ponerlo en producción y lo volveremos a comprobar si a lo largo de la vida del equipo hay problemas o si llega un momento en el que no responde con la suficiente rapidez a su carga de trabajo. Esto nos permitirá conocer qué elemento es el cuello de botella que debemos mejorar para mejorar el funcionamiento general del equipo.

## Tareas del administrador del sistema
Las tareas del administrador de un sistema informático incluyen:
- Es el responsable de la instalación del equipamiento necesario, tanto de hardware como de software: estudia las necesidades de la empresa y decide en cada caso el equipamiento a adquirir y cómo hacerlo
- Instala y configura el equipamiento: prepara los equipos, instala y configura el sistema operativo, los distintos drivers necesarios y los diferentes programas que necesita el usuario
- Instala (y/o configura para que se instalen) las actualizaciones del sistema, de drivers y de firmwares: siempre deben instalarse las actualizaciones de seguridad; las otras si aportan alguna mejora
- Gestiona el sistema: cuentas de usuarios, recursos del sistema, ...
- Es el responsable del correcto funcionamiento del sistema y de su buen rendimiento: realiza mantenimientos preventivos, monitoriza el funcionamiento del sistema, actualiza equipos y/o programas cuando es necesario, ...
- Resuelve las incidencias que se produzcan, tanto de hardware como de software
- Diseña e implementa la política de copias de seguridad de los datos
- Diseña e implementa la política de respuesta ante fallos en cualquier elemento del sistema: imágenes de discos, equipos de respaldo, ...
- Es el responsable de la seguridad del sistema: impide accesos no autorizados (tanto externos como internos), evita las fugas de información, ...
- Gestiona la documentación técnica, manuales y políticas de TI

Dependiendo del tamaño de la empresa tendrá un equipo que le ayude a la realización de estas tareas pero él es el responsable de que todo funcione correctamente.

Para realizar este trabajo es necesario que conozca qué está pasando en el sistema en cada momento, así como que recoja información del mismo para poder consultarla cuando se detecte algún problema. Por tanto debe monitorizar:
- el funcionamiento de los distintos equipos y su rendimiento
- el estado de la red
- el estado de los diferentes servicios y procesos
- el almacenamiento
- etc

Por tanto la rutina diaria del administrador de sistemas incluye el monitoreo del sistema y la solución de problemas.

## Conceptos relacionados con la supervisión
Algunas definiciones de conceptos relacionados con el rendimiento del sistema son:
- **Evaluación del rendimiento de un sistema informático**: es una medida de la calidad en el uso del hardware respecto a un conjunto de programas denominado "carga del sistema" donde puede existir interacción con usuarios.
- **Carga del sistema**: conjunto de programas que se ejecutan en el sistema para satisfacer las necesidades de los usuarios. Suele ser un conjunto complejo y variable en el tiempo.
- **Benchmark** (en castellano, comparativa o análisis): programa informático o un conjunto de programas que tienen como objetivo estimar el rendimiento de un elemento concreto o la totalidad del sistema y ​​poder comparar los resultados con máquinas similares.
- **Cuello de botella**: situación que se da cuando un dispositivo del sistema informático recibe muchas peticiones y está muy saturado de trabajo, mientras que el resto de dispositivos están ociosos esperando su respuesta. Se trata de encontrar el dispositivo en el que se encuentra el cuello de botella porque mejorando su rendimiento mejorará el de todo el sistema.

¿Cuándo debemos realizar una evaluación del rendimiento? Puede ser útil evaluar el rendimiento de un equipo cuando:
- se desea diseñar un sistema informático nuevo
- se desea seleccionar un sistema informático entre varias alternativas
- se desea planificar la capacidad de un sistema informático
- se desea ajustar un sistema informático (operaciones de mantenimiento)
- se va a poner en producción un nuevo equipo
- hay problemas con un equipo o no ofrece un buen rendimiento