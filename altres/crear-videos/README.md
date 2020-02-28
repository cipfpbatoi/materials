# Creació de vídeos amb OBS Studio
Aquest tutorial ens mostrarà com fer vídeos per als alumnes utilitzant l'eina [OBS Studio](https://obsproject.com/es).

## Instal·lació
En primer lloc instal·Lem la llibreria FFmpeg si no està ja instal·lada:
```bash
sudo apt-get install ffmpeg
```

A continuació afegim el repositori del programa i l'instal·lem:
```bash
sudo add-apt-repository ppa:obsproject/obs-studio
sudo apt-get update
sudo apt-get install obs-studio
```

Això ens crea un npu enllaç dins de 'Só i vídeo' anomenat **OBS Studio**.

## Configuració
La primera vegada que obrim el programa ens pregunta si executar l'Assistent de configuració automàtica' i li diguem que sí (podem tornar-ho a executar des del menú 'Eines').
