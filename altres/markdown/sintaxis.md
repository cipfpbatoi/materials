{{ content }}

# Markdown
Es un lenguaje de marcas ligero. Su ventaja frente a otros lenguajes de marcado (como HTML) es que el fichero de texto con la información es mucho más legible.

## Sintaxis
Podemos ver las principales marcas a utilizar en innumerables páginas como:
- [Basic writing and formatting syntax](https://help.github.com/en/articles/basic-writing-and-formatting-syntax)
* [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
* [Sintaxis Markdown](https://markdown.es/sintaxis-markdown)
* ...

Un resumen muy básico de las mismas es:
* cabeceras: # (# = h1, ## = h2, ..., ###### = h6)

Ejemplo **escribes**:
```md
# Título 1  
## Título 2  
### Título 3
```

**Obtienes**:
> # Título 1
> ## Título 2
> ### Título 3

* nuevo párrafo: línea en blanco de separación (es decir, 2 intros)
* nueva línea: 2 espacios seguidos
* regla horizontal: 3 = o - o *

**Escribes**:
```md
***
```

**Obtienes**:
> ***

* cursiva: texto entre * o _ (sin espacios). Ej. `*cursiva*` -> _cursiva_
* negrita: igual pero entre 2 * o 2 _  Ej. `**negrita**` -> __negrita__
* negrita y cursiva: se ponen ambas. Ej. `**_negrita y cursiva_**`-> **_negrita y cursiva_**
* tachado: texto entre ~~ . Ej. `~~tachado~~` -> ~~tachado~~
* listas desordenadas: * o - seguidos de espacio al principio de la línea. Para hacer sublistas tabulamos con 4 espacios en blanco

**Escribes**:
```md
- Item 1  
    - Item 1.1  
    - Item 1.2  
- Item 2
```

**Obtienes**:
> * Item 1
>   * Item 1.1
>   * Item 1.2
> * Item 2

* listas ordenadas: nº, punto y espacio

**Escribes**:
```md
1. Item 1  
    1. Item 1.1  
    1. Item 1.2  
1. Item 2
```

**Obtienes**:
> 1. Item 1
>     1. Item 1.1
>     1. Item 1.2
> 1. Item 2

* checklists: al principio de cada línea pones \[ ] si quieres que aparezca desmarcada o \[\*] si la quieres marcada:

**Escribes**:
```md
- [ ] Item 1  
- [x] Item 2  
- [ ] Item 3  
```

**Obtienes**:
> - [ ] Item 1  
> - [x] Item 2  
> - [ ] Item 3  

* código: entre \` para mostrarlo en la línea o para un bloque de texto tres \` (acentros graves, seguidos opcionalmente del lenguaje) y al final del bloque 3 acentos más para cerrarlo. Ej.: ``código`` ->  `código`

**Escribes**:
```md
```html  
<h1>Hola</h1>  
``\`
```

**Obtienes**:
> ```html
> <h1>Hola</h1>
> ```

* enlaces: \[texto a mostrar](url). Ej: `[Wikipedia](http://wikipedia.org)` -> [Wikipedia](http://wikipedia.org)  
Opcionalmente podemos poner un título en los paréntesis: \[texto](url "titulo")
* imágenes: igual pero precedidas de !, !\[texto alternativo](url "título, opcional")
* citas: el párrafo debe comenzar por > (son todos los ejemplos de _Escribes_ ... _Obtienes_)
* tablas: se separan las columnas con \|

**Escribes**:
```md
Encab 1 | Encab 2  
--|--  
dato 1.1 | dato 1.2  
dato 2.1 | dato 2.2  
dato 3.1 | dato 3.2
```

**Obtienes**:
> Encab 1 | Encab 2
> --|--
> dato 1.1 | dato 1.2
> dato 2.1 | dato 2.2
> dato 3.1 | dato 3.2

Podemos incluir código HTML en nuestro documento y también lo interpretará el navegador

**Escribes**:
```md
<p align="center">Párrafo con <b>Negrita</b> y centrado</p>
```

**Obtienes**:
> <p align="center">Párrafo con <b>Negrita</b> y centrado</p>

## Añadir vídeos
En principio no se pueden incluir vídeos pero es sencillo hacerlo de varias formas. Una de las más 'limpias' es crear una página HTML (podemos llamarla youtubePlayes.html) dentro del directorio \_includes con el código:

```html
<iframe width="560" height="315" src="https://www.youtube.com/embed/{{ include.id }}" frameborder="0" allowfullscreen></iframe>
```

Donde queremos que se muestre el vídeo ponemos el código:
```html
{\% include youtubePlayer.html id=page.youtubeId %}
```
Si queremos mostrar vídeos de Vimeo podemos crear la página vimeoPlayer.html con el código:

```html
<iframe src="https://player.vimeo.com/video/{{ include.id }}" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
```

Fuente: [http://adam.garrett-harris.com/how-to-easily-embed-youtube-videos-in-jekyll-sites-without-a-plugin/](http://adam.garrett-harris.com/how-to-easily-embed-youtube-videos-in-jekyll-sites-without-a-plugin/)

## Usar emoticones
Se pone su 'nombre' entre caracteres :, fácil ¿no? : :blush:

Hay muchas [páginas](https://www.webfx.com/tools/emoji-cheat-sheet/) donde aparecen los nombres de los emoticonos.

## Editores
Es tan simple utilizar el lenguaje Markdown que posiblemente no usemos ningún editor pero si queremos existen uchos a nuestra disposición:
* en línea:
    * [Dillinger](https://dillinger.io/)
    * [Markable](https://markable.in/accounts/login/?next=/editor/) (hay que registrarse)
    * [Dingus](https://daringfireball.net/projects/markdown/dingus)
    * ...
* de escritorio
    * Haroopad
    * Mango
    * Focused (para Mac)
    * ...
    
## Leer más
[Wikipedia](https://es.wikipedia.org/wiki/Markdown)


