# 📲 Bots

Telegram es una plataforma de mensajería y VOIP, desarrollada por los hermanos Nikolái y Pável Dúrov. La aplicación está enfocada en la mensajería instantánea, el envío de varios archivos y la comunicación en masa. Lo bueno de Telegram con respecto a otros sistemas de mensajería es que desde casi el principio nos ofrecía una API y un sistema de BOTS para podernos crear "miniapps" dentro de la misma. Ello nos permite enviarle y/o recibir mensajes vía Telegram en nuestros sistemas. La idea hoy será crearnos un BOT que nos lance notificaciones en un canal propio. De esta manera podremos añadir al canal a toda la gente que necesitamos que esté al tanto de estas notificaciones.



En primer lugar, vamos a crearnos nuestro bot, para ello debemos entablar conversación con el "padre de los bots" llamado <mark style="color:orange;">**@BotFather**</mark> en Telegram.&#x20;

<figure><img src="./media/image (8).png" alt=""><figcaption></figcaption></figure>

La cosa irá tal que así:&#x20;

**/start**&#x20;

**/newbot**&#x20;

**NOMBREDEBOT**&#x20;

**NOMBREUSUARIOBOT**



<figure><img src="./media/image (2).png" alt=""><figcaption></figcaption></figure>

Hecho esto, el <mark style="color:orange;">**Botfather**</mark> nos creará nuestro bot, nos dará una dirección tipo:

**http://t.me/NOMBREDEUSUARIOBOT**&#x20;

para comunicarnos con él y nos asignará un **ID:TOKEN** para la API. _**Nuestro pequeño BOT acaba de nacer…**_

Lo siguiente es crearnos un grupo donde el bot vuelque sus notificaciones, como he dicho antes, es una manera fácil de poder añadir a gente que necesite estar al tanto. Para añadir al bot tan solo debes buscarlo por **NOMBREUSUARIOBOT**. La cosa nos quedará tal que así:

<figure><img src="./media/image (3).png" alt=""><figcaption></figcaption></figure>



Ahora necesitamos obtener el **CHATID** de nuestro grupo. Para ello necesitamos añadir al grupo el bot <mark style="color:orange;">**@get\_id\_bot**</mark> que nos proporcionará la información necesaria. Una vez tenemos esta información podemos eliminarlo de nuestro grupo.

<figure><img src="./media/image (4).png" alt=""><figcaption></figcaption></figure>

Si no nos muestra la información del grupo podemos ejecutar el comando <mark style="color:orange;">**/get\_id**</mark>

<figure><img src="./media/image (5).png" alt=""><figcaption></figcaption></figure>

Bien, pues con todos estos datos ya podemos comenzar a mandar mensajes a nuestro bot y que él nos los escriba en el canal de Telegram.

Si queremos ver información sobre nuestro bot, utiliza tu **TOKEN** para ver la información sobre este:&#x20;

> **https://api.telegram.org/botTOKEN/getMe**

Vamos a hacer una prueba rápida de que tenemos todo en orden, para ello debes hacer lo siguiente. Vía **curl**, **wget** o **navegador**, escribe la siguiente URL los datos del TOKEN y el ID del grupo ya los tienes:

> [https://api.telegram.org/botTOKEN/sendMessage?chat\_id=ID\_GROUP\&text=HolaBatoi](https://api.telegram.org/botTOKEN/sendMessage?chat\_id=ID\_GROUP\&text=HolaBatoi)

<figure><img src="./media/image (6).png" alt=""><figcaption></figcaption></figure>

Nos escribe en el grupo:&#x20;

<figure><img src="./media/image (7).png" alt=""><figcaption></figcaption></figure>



Vamos a probar nuestro bot en un Router Mikrotik, para ello tan solo debemos crear un script con este contenido:&#x20;



```
:local botTelegramIDToken "XXXXXXXXXX:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
:local telegramChatID "-XXXXXXXXXX"; 
:local parseMode "html"; 
:local disablePreview True; 
:local textToSend "HOLA! SOY TU MIKROTIK! HAZME CASITO!"; 
:local telegramUrl "https://api.telegram.org/bot$botTelegramIDToken/sendMessage? chat_id=$telegramChatID&text=$textToSend&parse_mode=$parseMode&disable_web _page_preview=$disablePreview"; /tool fetch http-method=get url=$telegramUrl; 
:log info "Enviado Mensaje de Telegram"; 
```

El script solo requerirá permisos de lectura y una vez creado si lo ejecutas.&#x20;

¡Nuestro **Mikrotik** nos habla! Obtendrás algo así:



<figure><img src="./media/image (12).png" alt=""><figcaption></figcaption></figure>

Más info sobre esto:&#x20;

[https://mhelp.pro/mikrotik-scripts-sending-power-on-notification-to-telegram] (https://mhelp.pro/mikrotik-scripts-sending-power-on-notification-to-telegram)

Bibliografía: [https://twitter.com/weareDMNTRs/status/1519320814272843778](https://twitter.com/weareDMNTRs/status/1519320814272843778)

[..](README.md)