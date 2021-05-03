# Vue - UT 02 - Práctica 01: Grupos
Vamos a usar Vue para crear una página que gestione los grupos que tenemos en el centro. Cada grupo será un objeto con las siguientes propiedades:
- cod: una cadena con el código del grupo
- nombre: cadena con el nombre del grupo
- grado: sólo admite 2 valores, 'M' si es de grado medio y 'S' si es de grado superior
- familia: cadena con la familia profesional a que pertenece el grupo

La página está dividida en 3 zonas:
- Un div donde mostrar mensajes al usuario y poder prescindir de console.log o alert. Cada mensaje a mostrar será un P dentro de este DIV
- Una tabla donde se mostrarán los grupos. Cada fila mostrará todos los datos de un grupo más una celda final con un enlace que ponga Eliminar y al pulsarlo se eliminará el grupo tras pedir confirmación al usuario. Debajo de la misma mostraremos el número total de grupos de la tabla
- Un formularios para añadir nuevos grupos. Para escoger el grado usaremos radiobuttons
