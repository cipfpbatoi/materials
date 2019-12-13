# samba-tools
Samba inclou l'eina samba-tool per a gestionar objectes del domini. Pode obtenir ajuda d'aquest comando amb:

samba-tool -h

Els subcomandos que anem a usar ara són:

    group: per a gestionar grups
    user: per a gestionar usuaris

Encara que existeixen molts més per a gestionar molts altres elements (gpo, dns, ...)
Gestió de grups

Amb samba-tool group veen les opcion que podem utilitzar:

Per defecte els grups es crearan dins de la OU Users però podem indicar on volem que es creu. Per exemple si volem crear el grup gProfes dins de la OU Aula que està dins de la OU Grups farem:

samba-tool group add gProfes --groupou=OU=Aula,OU=Grups

També podem indicar què GID volem que tinga amb l'opció --gidnumber num_de_gid. És habitual donar als grups i usuaris del domini nombres alts (a partir del 5000 o el 10000) per a no interferir en els usuaris i grups locals que tenen GID i UID a partir del 1000.


Podem veure totes les opcions a l'hora de crear un grup amb:

samba-tool group add -h

Gestió d'usuaris

Ho farem amb el comando samba-tool user:

A l'hora de crear un nou usuari haurem d'especificar moltes opcions. Les podem veure totes amb:

samba-tool user create -h

Per exemple anem a crear l'usuari jsegura amb contrasenya Batoi@1234 el nom de la qual és Juan i cognom Segura, volem que tinga com UID la 10001 i que haja de canviar la contrasenya en el pròxim inici de sessió i ho volem crear dins de la OU smx que està en la OU Aula. EL comando serà el següent:

samba-tool user create jsegura Batoi@1234 --given-name=Juan --surname=Segura --must-change-at-next-login --userou=OU=smx,OU=Aula --uid-number=10001

Per a afegir-ho al grup creat abans farem:

samba-tool group addmembers gProfes jsegura

Per veure més comandes relacionades amb samba, es poden accedir a la seguent web:

https://www.sysadminsdecuba.com/2018/04/tips-comandos-utiles-de-samba/
