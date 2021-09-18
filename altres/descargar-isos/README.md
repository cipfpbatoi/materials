# Desplegar ISOs i OVAs en el aula
En el Centre tenim un servidor (`descargaiso.cipfpbatoi.lan`) on qualsevol pot deixar ISOs i OVAs per a que tots els pugam utilitzar.

Podem pujar o baixar fitxer mitjançant `scp` (des de la terminal) o des de l'explorador d'arxius amb el protocol `sftp` (entorn gràfic).

Per a fer-ho gràficament obrim l'_Explorador d'arxius_ i en la barra d'addresses posem `sftp://diso@descargaiso.cipfpbatoi.lan/home/diso/REPOSITORI` (si no podem escriure en la barra perquè només ens ixen les icones polsem `Ctrl+L`).

IMPORTANT: no volem que els alumnes es descarreguen els fitxers directament des d'allí per a no sobrecarregar la xarxa dels servidors de l'institut.

El que hem de fer per a pasar-li una ISO o OVA als alumnes es descarregar-la nosaltres des d'aquesta màquina al nostre ordinador del professor i que els alumnes accedeixen allí o, molt millor, li la passem per UDP _multicast_ que ens permetrà pasar-li-la a tots al mateix temps en molt pocs minuts.

Per a transferir arxius per UDP hem de tindre instal·lat el paquet