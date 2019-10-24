# Bloc 1: Javascript. Ejercicio 7.2 - Validación de formularios

Haz una página con el formulario de registro siguiente:
```html
 <form  id="registro" method="POST" action="verForm.php"> 
	<label for="reg-nif">Nif:</label><input id="reg-nif" name="reg-nif" type="text"><span id="err-nif"></span><br> 
	<label for="reg-email">Email:</label><input id="reg-email" name="reg-email" type="text"><span id="err-email"></span><br> 
	<label id="reg-sexo">Sexo: 
		<input type="radio" name="reg-sexo" value="hombre"/>Hombre 
		<input type="radio" name="reg-sexo"  value="mujer" />Mujer</label><span id="err-sexo"></span><br /> 
	<label for="reg-coment">Comentarios: </label><textarea id="reg-coment" name="reg-coment"></textarea><br> 
	<input id="reg-acept" name="reg-acept" type="checkbox">
		<label for="reg-acept">Acepto las condiciones</label><span id="err-acept"></span><br> 
	<input value="Enviar" type="submit"> 
</form>
```

Debes validar el formulario para que **si no hay errores** se envíen todos los campos a la página _verForm.php_. Si hay errores se mostrará junto a cada campo erróneo un mensaje (en el _span_ que hay junto a él). Deben verse TODOS los errores que hay y se situará el cursor en el 1º elemento erróneo:

![Formulario erróneo](./img/form.png)

Lo que debemos validar es:
* todos los _inputs_ son obligatorios (no el _textarea_)
* el nif debe ser 8 números seguidos de 1 letra mayúscula, sin nada más
* el e-mail debe “parecer” un e-mail
* el sexo es obligatorio y no se puede marcar un sexo por defecto
* se deben aceptar las condiciones

También destacaremos en el CSS de alguna manera los campos erróneos.
