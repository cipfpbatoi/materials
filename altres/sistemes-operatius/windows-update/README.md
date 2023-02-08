# Deshabilitar Windows Update
És molt important tindre sempre el nostre sistema actualitzat per a que no siga vulnerable a posibles atacs. Però en entorns de prova que es descarreguen e instal·len les actualitzacions del sistema pot ser una molèstia.

Des de Windows 10 i Windows Server 2016 ja no hi ha una opció en _Windows Update_ que ens permeta deshabilitar les actualitzacions automátiques i per a deshabilitar-les hem d'aturar i deshabilitar el servei que les controla. Ho fem obrint l'eina de **_Serveis_**, buscant el servei que s'anomena `Windows Update` aturant-lo i obrint les seues propietats per a posar-lo en estat **_Deshabilitat_**.

Així i tot de tant en tant veiem que torna a estar habilitat. Això és per que hi ha altre servei que l'activa.

La manera definitiva d'aturar les actualitzacions automàtiques és crear una nova directiva on configurem el funcionament de _Windows Update_ però això només ho podem fer en un sistema operatiu _Pro_ (_Windows 10 Pro_, _Windows 11 Pro_, ...) o _Server_, no en _Windows Home_.

Si el nostre equip no forma part d'un domini ho configurarem en una directiva local. En primer lloc obrim el **_`Editor de directives de grup local`_** (progama `gpedit.msc`). Dins de `Dierctiva Equip Local` anem a `Configuració d'equip -> Plantilles administratives -> Components de Windows -> Windows Update`. Allí busquem la directiva anomenada `Configurar Actualitzacions Automàtiques` i configurem el seu valor a **_Deshabilitada_**.

Si la nostra màquina està afegida a un domini configurarem això mateix però en una directiva del domini, que es gestionen des de l'eina '**_`Administració de directives de grup`_**'.

Ara ja tenim deshabilitades les actualitzacions i no tornaran a activar-se.

Podeu trobar més informació en pàgines com la de [SYSADMIT: Desactivar Windows Update](https://www.sysadmit.com/2020/01/windows-desactivar-windows-update.html), que també conté un [vídeo](https://www.youtube.com/watch?v=lFjVZzEwD7Y) on s'explica aquest procés.