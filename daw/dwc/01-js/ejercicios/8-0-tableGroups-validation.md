# Bloc 1: Javascript. Práctica 8.0 - Validación (grupos)
Siguiendo con la práctica '6.0 de grupos' vamos a validar el formulario de añadir nuevos grupos. Usaremos la API de validación de formularios de Javascript y las restricciones que tendrán los distintos campos son:
- código: campo obligatorio, entre 3 y 5 caracteres de longitud
- nombre: campo obligatorio de al menos 5 caracteres
- grado: radiobuttons, también obligatorio
- familia: obligatorio y sólo aceptará los valores 'Informática', 'Sanitaria', 'Hostelería' y 'Peluquería', tanto si se introducen en mayúsculas como en minúsculas

OJO: repasad las restricciones que hay ahora en los input porque habrá que cambiar alguna y añadir otras.

Los mensajes que deberá mostrar en caso de error son:
- obligatorio: Debe introducir algo en el campo XXX (en lugar de XXX debe aparecer el name del campo)
- longitud mínima: En el campo XXX debe introducir al menos XX caracteres (XX es el mínimo)
- longitud máxima: En el campo XXX debe contener como mucho XX caracteres (XX es el mínimo)
- no en esos valores: El campo XXX sólo acepta ciertos valores

No se puede enviar el formulario si hay algún error.

Si hay algún error se mostrará en un span debajo del input (esos span los crearemos en el index.html, tendrán la clase error y estarán vacíos). Si un campo NO contiene ningún error su span debe estar vacío.

También añadiréis una regla al fichero CSS para que el texto de clase error sea de color rojo.
