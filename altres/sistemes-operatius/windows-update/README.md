# Deshabilitar Windows Update
És molt important tindre sempre el nostre sistema actualitzat per a que no siga vulnerable a posibles atacs. Però en entorns de prova que es descarreguen e instal·len les actualitzacions del sistema pot ser una molèstia.

Des de Windows 10 i Windows Server 2016 ja no hi ha una opció en _Windows Update_ que ens permeta deshabilitar les actualitzacions automátiques. El servei que controla les actualitzacions s'anomena _**Windows Update**_ (_wuauserv_). Des de l'eina de **_Serveis_** podriem aturant-lo i obrint les seues propietats per a posar-lo en estat **_Deshabilitat_**. Però això no és suficient, ja que el servei _Windows Update Medic Service_ (_WaaSMedicSvc_) y el _Update Orchestrator_ estan dissenyats per a reparar i reactivar _Windows Update_ quan veuen que no funciona. Per tant torna a l'estat _Manual_ al pasar un temps.

La forma correcta i suportada per Microsoft de deshabilitar les actualitzacions automàtiques és mitjançant una directiva anomenada _**Configurar Actualitzacions Automàtiques**_. Aquesta directiva es troba dins de l'**_`Editor de directives de grup local`_** (programa `gpedit.msc`). Dins de `Directiva Equip Local` anem a `Configuració d'equip -> Plantilles administratives -> Components de Windows -> Windows Update`. Allí busquem la directiva anomenada `Configurar Actualitzacions Automàtiques` i configurem el seu valor a **_Deshabilitada_**. Si estem dins d'un domini això ho ferem en una directiva del domini, que es gestionen amb l'eina '**_`Administració de directives de grup`_**'.

Ara ja tenim deshabilitades les actualitzacions i no tornaran a activar-se. A més:
- El servei wuauserv segueix funcionant. La única cosa que canvia és que Windows deixa de buscar, descarregar i instal·lar pel seu compte.
- L'usuari o l'administrador pot buscar i instal·lar actualizaciones manualmente des de _Configuració_.
- Continuen funcionant les tasques que dependen de _Windows Update_: característiques opcionals i _Features on Demand_ (per exemple, RSAT o OpenSSH), aplicacions de la _Microsoft Store_ i signatures de Defender.
- Es el mètode soportat per Microsoft. Es guarda en el registre (HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU, NoAutoUpdate = 1) i es estable, perquè Windows ho respecta.
- En un domini s'aplica de forma centralizada per GPO i es pot revertir fácilment.

Podeu trobar més informació en pàgines com la de [SYSADMIT: Desactivar Windows Update](https://www.sysadmit.com/2020/01/windows-desactivar-windows-update.html), que també conté un [vídeo](https://www.youtube.com/watch?v=lFjVZzEwD7Y) on s'explica aquest procés.