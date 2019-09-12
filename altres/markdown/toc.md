{{ content }}

# Crear una Tabla de Contenidos (TOC) automáticamente
Tenemos utilidades para crear automáticamente una tabla de contenidos en nuestro documento Markdown que tenga una entrada en la tabla para cada título de la página.

## Crear ToC con DocToc 
Una de estas utilidades es [doctoc](https://github.com/thlorenz/doctoc). La instalamos con npm:
```[bash]
npm install -g doctoc
```

Ahora indicamos el fichero/s al que le queremos crear la ToC:
```[bash]
doctoc README.md introduccion.md
```

Si indicamos un directorio creará la ToC para todos los ficheros que haya allí y en sus subdirectorios. Es lo más sencillo:
```[bash]
doctoc .
```

Si un fichero ya tiene una ToC de doctoc al volver a ejecutar el comando no añade una nueva sino que actualiza la existente. Las ToC van entre los comentarios
```[md]
<!-- START doctoc -->
y
<!-- END doctoc -->
```

Por defecto creará la ToC al principio del fichero pero si la queremos en otro sitio sólo tenemos que poner allí estas etiquetas.

Algunas opciones útiles son:
* **--title**: para especificar el título de la ToC, en formato md. Ej.: `doctoc --title '**Índice**'`
* **--maxlevel**: para limitar el número de niveles a mostrar en la ToC. Ej.: `doctoc --maxlevel 3`
* podemos también indicar que la ToC generada sea compatible con los sitios más comunes:
  * *--gitgub*
  * *--gitlab*
  * *--nodejs*
  * *--ghost*
  * *--bitbucket*

## Creat ToC con Jekyll
Si estamos usando Jekyll es posible crear automáticamente nuestra ToC utitlizando alguno de los múltiples plugins que encontraremos, por ejemplo, en GitHub buscando **jekyll-toc**.
