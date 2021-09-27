# Desplegar ISOs i OVAs en el aula
En el Centre tenim un servidor (`descargaiso.cipfpbatoi.lan`) on qualsevol pot deixar ISOs i OVAs per a que tots els pugam utilitzar. La idea és que tots nosaltres deixem allí les ISOs que descarreguem per a que les puguem utilitzar tots.

Podem pujar o baixar fitxers mitjançant `scp` (des de la terminal) o des de l'explorador d'arxius amb el protocol `sftp` (entorn gràfic).

Per a fer-ho gràficament obrim l'_Explorador d'arxius_ i en la barra d'addresses posem `sftp://diso@descargaiso.cipfpbatoi.lan/home/diso/REPOSITORI` (si no podem escriure en la barra perquè només ens ixen les icones polsem `Ctrl+L`).

L'usuari és **`diso`** i la contrasenya **`diso-2021`**

**IMPORTANT**: no volem que els alumnes es descarreguen els fitxers directament des d'allí per a no sobrecarregar la xarxa dels servidors de l'institut.

El que hem de fer per a pasar-li una ISO o OVA als alumnes es descarregar-la nosaltres des d'aquesta màquina al nostre ordinador del professor i que els alumnes accedeixen allí o, molt millor, li la passem per UDP _multicast_ que ens permetrà pasar-li-la a tots al mateix temps en pocs minuts.

Per a transferir arxius per UDP hem de tindre instal·lat el paquet `udpcast`.

Els alumnes han d'obri una terminal i escriure

```bash
udp-receiver -f fichero-a-recibir
```

La terminal es queda a l'espera de rebre les dades. Quan ho han fet tots, per a enviar-ho escrivim:

```bash
udp-sender -i nom-de-la-interficie-com-enp0s2 -f fichero-a-recibir
```

## Resum
1. Descarreguen la ISO en l'equip del professor amb l'_Explorador d'arxius_ (`sftp://diso@descargaiso.cipfpbatoi.lan/home/diso/REPOSITORI`)
2. Li canviem el nom per a que siga més fàcil escriure-ho en la terminal (ex. canviem _Win10_20H2_v2_Spanish_x64.iso_ per _Win10.iso_)
3. Cada alumne escriu en una terminal `udp-receiver -f Win10.iso`
4. Obrim una terminal i ho enviem amb `udp-sender -i enp0s2 -f Win10.iso`
