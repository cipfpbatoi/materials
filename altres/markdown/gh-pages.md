{{ content }}

# Publicar en gh-pages
GitHub Pages es un servicio de alojamiento web estático de GitHub que permite publicar documentación. Al ser contenido estático podemos usar HTML, CSS y Javascript y podemos usarlo para publicar apuntes, portfolio, información sobre los repositorios, etc. Las _gh-pages_ están accesible en el dominio github.io. Y podemos poner las páginas en formato MD y GitHun las sirve automáticamente como HTML.

Podemos publicar 2 tipos de documentación:
1. documentación sobre un repositorio concreto
2. documentación no asociada a ningún repositorio

Podemos encontrar información de cómo realizar La configuración de las _gh_pages_ en [GitHub Pages](https://pages.github.com/). 

## Publicar documentación sobre un repositorio
Tenemos 3 opciones para guardar las páginas:
* en la rama master
* en una rama llamada gh-pages
* en un directorio llamado /docs dentro de la rama master

La página principal que se abrirá automáticamente se debe llamar README.md, index.md o index.html.

Una vez creadas las paginas hay que activar las GitHub Pages para ese repositorio yendo a **Settings** y escogiendo dónde se encuentran.

[Settings](img/01-settings.png)

También podemos aplicar a nuestra documentación un tema de Jekyll.

La documentación estará accesible en la URL \<usuario>.github.io/\<repositorio>, donde \<usuario> se cambia por nuestro nombre de usuario de GitHub y \<repositorio> por el nombre de nuestro repositorio.

## Publicar documentación no ligada a ningún repositorio
En este caso lo que tenemos que hacer es crear en GitHub un nuevo repositorio que se debe llamar obligatoriamente \<usuario>.github.io. Allí podemos la documentación que ya aparecerá automáticamente publicada en dicha URL.

Sólo podemos tener un repositorio personal con \<usuario>.github.io pero podemos tener uno más por cada organización que tengamos en la url \<organizacion>.github.io.

## Usar plantillas
Podemos usar los temas de Jekyll para aplicar a nuestras páginas configurándolo en el repositorio ('Settings'). También podemos instalarnos Jekyll en local y crear nuestras propias plantillas que subiremos psoteriormente a _gh-pages_ (o al servidor web que queramos) como se ve en la [siguiente página](./jekyll.md) de los apuntes.

## Leer más
* [What is GitHub Pages?](https://help.github.com/categories/github-pages-basics/)
* [JONATHAN MCGLONE: Creating and Hosting a Personal Site on GitHub](http://jmcglone.com/guides/github-pages/)
