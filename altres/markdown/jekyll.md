{{ content }}

# Crear nuestra documentació con Jekyll
Una opción si queremos hacer una "web" de documentación más compleja es utlizar alguna herramienta como Jekyll que es como están hechas las GH Pages.

Jekyll es un gestor de contenidos estáticos que soporta MarkDown y está recomendado para hacer _gh-pages_.

A partir de los ficheros fuentes se generan la páginas compiladas en HTML. Como _gh-pages_ integraa _Jekyll_ esta compilación se hace automáticamente.

## Instalación
Funciona con **Ruby** así que necesitamos tener ese entorno instalado.
```bash 
$ sudo apt install ruby     # (se necesita versión >= 2.2.5)
```
Comprobamos si están instalados gcc, g++ y make
```bash 
$ gcc -v
$ g++ -v
$ make -v
```
Si falta alguno lo instalaremos.

Comprobamos si están instalados los headers de Ruby
```bash 
$ apt list --installed ruby-dev
$ ruby-dev/version... [instalado]
```
Si no lo instalaremos con:
```bash 
$ sudo install ruby-dev
```

Instalamos Jekyll y su bundler:
```bash 
$ sudo gem install jekyll
$ sudo gem install jekyll bundler
```

Podemos ver si está instalado con:
```bash 
$ jekyll -v
```


## Uso básico
Creamos nuestro sitio con:
```bash 
$ sudo jekyll new mipagina
```

Vemos que ha creado un blog con una serie de ficheros y un post (dentro de la careta _\_posts_). Cada página tiene al principio unas marcas de Jekyll entre dos líneas con **---** (tres guiones) donde se indica el título de la página el layout (la plantilla) que utilizará y su fecha de creación. También le podemos poner un atributo **permalink** que será el enlace al que hacer referencia desde otras páginas para cargarla y que aparecerá automáticamente en el menú del layout. Ej.:
```jekyll
---
layout: page
title: Acerca de
permalink: /about/
---
# Acerca de
Contenido de la página
```

En la documentación de _Jekyll_ podemos ver cómo crear tanto posts como páginas (son parecidas pero usan por defecto el layout _page_ en vez del _post_, pero todo esto se puede configurar).

Para ponerlo en marcha entramos al sitio creado y ejecutamos:
```bash 
$ bundler exec jekyll serve
```

Esto nos crea un servidor web en el puerto 4000 que recoge este directorio (y lo usamos para testear nuestras páginas antes de subirlas), lo compila y genera el sitio web dentro de la carpeta _\_site_ que es la usa para el servidor local (pero no se sube a github ya que está en el fichero _.gitignore_).

## Configurar nuestro sitio
Se hace en el fichero **\_config.yml** y allí se indica el título y descripción del sitio, nuestro correo y 2 cosas fundamentales:
- **baseurl**: si es un sitio de repositorio hay que poner el repositorio y si es de organización o de usuario ponemos "/"
- **url**: aquí ponemos la ruta del usuario u organización

Si modificamos este archivo hay que parar el servidor y volverlos a arrancar.

Ya sólo queda inicializar git en esta carpeta y subirla a GitHub.

Podemos ver cómo crear nuestras página con Jekyll en su [documentación oficial](https://jekyllrb.com/docs/).

## Plantillas
En el fichero **\_config.yml** está configurado por defecto el tema "mínimo" (`theme: minima`). Podemos poner cualquiera de la [lista de temas soportados en _gh-pages_](https://pages.github.com/themes/). Si queremos que también se vea en el servidor local hay que instalar el tema añadiendo una línea al fichero de configuración **Gemfile** con el nombre del tema (por ejemplo para cargar el tema 'architect' añadimos la línea `gem "architect"`). Una vez modificado el fchero lanzamos el comando `bundle install`para que se instale (OJO no todos los temas tienen todos los layouts y sólo podemos usar en las páginas los que tenga el tema a usar).

### Variables
Si consultamos la documentación, en Layouts encontramos una información muy útil: Variables. Nos miestra variables que tenemos disponibles para usar en nuestras páginas. Algunas son:
- site: información del sitio
- page: informaciónde la página
- content: contenido
- site.pages: array con todas las páginas
- site.posts: array con todos los posts
- site.html_pages: array con todas las páginas con extensión _.html_ (las que está en MD también las compila a HTML)
- page.title: título
- page.excerpt: comienzo de una página
- page.content: su contenido
- page.url: url de la página
- page.next: enlace al siguiente post
- page.prev: enlace al post anterior

En cualquier página podemos mostrar el valor de una variable con **{{ }}**, por ejemplo `{{ page.title }}`.

### Includes
Son ficheros con trozos de código que se guardan en la carpeta **\_includes** y que podemos importar en otros sitios poniendo `{ % include nom_fichero %}`.

### Layouts
Se encuentra en la carpeta **\_layouts** y deba haber al menos uno llamado **default.html** en cada plantilla.

### Crear nuestra propia plantilla
En la carpeta **\_layouts** (hay que crearla si no la tenemos) creamos un fichero con nuestra plantilla con una estructura similar a:
```html
<!DOCTYPE html>
<html lang="{{ site.lang | default: "en-US" }}">
  <head>
    <meta charset='utf-8'>
    <title>{{ page.title }}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  </head>

  <body>
     <header>{ % include header.html %}</header>
     <nav>{ % include nav.html %}</nav>
     <section>{ { content }}</section>
     <footer>{ % include footer.html %}</footer>
  </body>
</html>
```
El fichero **nav.html** será algo similar a:
```html
<ul>
   { % for page in site.html_pages %}
   { % if page.title %}
   <li>
      <a href="{ { site.baseurl }}{ { page.url }}">{ { page.title }}</a>
   </li>
   { % endif %}
   { % endfor %}
</ul>
```
Lo del IF lo hacemos para que no aparezcan en el menú las páginas que no tienen títutlo (como la 404.html).


## Leer más
* [What is GitHub Pages?](https://help.github.com/categories/github-pages-basics/)

* [Using Jekyll as a static site generator with GitHub Pages](https://help.github.com/articles/using-jekyll-as-a-static-site-generator-with-github-pages/)

* [JONATHAN MCGLONE: Creating and Hosting a Personal Site on GitHub](http://jmcglone.com/guides/github-pages/)

