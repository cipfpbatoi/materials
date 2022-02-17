# Supervisión del sistema


## Introducción
Es imprescindible conocer lo que está sucediendo en el sistema tanto para resolver problemas como para mejorar el rendimiento del mismo. Para ello comprobaremos el rendimiento del sistema antes de ponerlo en producción y lo volveremos a comprobar si a lo largo de la vida del equipo hay problemas o si llega un momento en el que no responde con la suficiente rapidez a su carga de trabajo. Esto nos permitirá conocer qué elemento es el cuello de botella que debemos mejorar para mejorar el funcionamiento general del equipo.

Algunas definiciones de conceptos relacionados con el rendimiento del sistema son:
- **Evaluación del rendimiento de un sistema informático**: es una medida de la calidad en el uso del hardware respecto a un conjunto de programas denominado "carga del sistema" donde puede existir interacción con usuarios.
- **Carga del sistema**: conjunto de programas que se ejecutan en el sistema para satisfacer las necesidades de los usuarios. Suele ser un conjunto complejo y variable en el tiempo.
- **Benchmark** (en castellano, comparativa o análisis): programa informático o un conjunto de programas que tienen como objetivo estimar el rendimiento de un elemento concreto o la totalidad del sistema y ​​poder comparar los resultados con máquinas similares.
- **Cuello de botella**: situación que se da cuando un dispositivo del sistema informático recibe muchas peticiones y está muy saturado de trabajo, mientras que el resto de dispositivos están ociosos esperando su respuesta. Se trata de encontrar el dispositivo en el que se encuentra el cuello de botella porque mejorando su rendimiento mejorará el de todo el sistema.

¿Cuándo debemos realizar una evaluación del rendimiento? Las posibles respuestas son las siguientes:
- se fabrica una nueva máquina
- se desea diseñar un sistema informático nuevo
- se desea seleccionar un sistema informático entre varias alternativas
- se desea planificar la capacidad de un sistema informático
- se desea ajustar un sistema informático (operaciones de mantenimiento)

## Administrador de tareas
En sistemas Windows podemos obtener importante información del `Administrador de tareas de Windows`, que tiene pestañas con información sobre:
- **Aplicaciones**: podemos ver los programas que hemos abierto. También tenemos un botón para finalizar la tarea seleccionada y otro para ejecutar un nuevo programa

Administrador de tareas

- **Procesos**: encontramos todos los procesos en ejecución, tanto por parte del usuario como del sistema. Vemos el nombre del proceso, qué porcentaje de CPU está consumiendo ahora, la memoria que ocupa y una descripción del mismo. Desde ahí podemos finalizar cualquier proceso.