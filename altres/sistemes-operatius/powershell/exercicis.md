# Exercicis de PowerShell
- [Exercicis de PowerShell](#exercicis-de-powershell)
  - [1. Exercicis de navegació i directoris](#1-exercicis-de-navegació-i-directoris)
    - [Exercici 1: Primers passos](#exercici-1-primers-passos)
    - [Exercici 2: Gestió bàsica d'arxius](#exercici-2-gestió-bàsica-darxius)
    - [Exercici 3: Cerca d'arxius](#exercici-3-cerca-darxius)
    - [Exercici 4: Neteja d'arxius temporals](#exercici-4-neteja-darxius-temporals)
  - [2. Exercicis de contingut d'arxius](#2-exercicis-de-contingut-darxius)
    - [Exercici 5: Crear i llegir arxius](#exercici-5-crear-i-llegir-arxius)
    - [Exercici 6: Treballar amb logs](#exercici-6-treballar-amb-logs)
    - [Exercici 7: CSV i dades estructurades](#exercici-7-csv-i-dades-estructurades)
  - [3. Exercicis de processos i serveis](#3-exercicis-de-processos-i-serveis)
    - [Exercici 8: Gestió de processos](#exercici-8-gestió-de-processos)
    - [Exercici 9: Monitorització del sistema](#exercici-9-monitorització-del-sistema)
    - [Exercici 10: Gestió de serveis](#exercici-10-gestió-de-serveis)
  - [4. Exercicis de xarxa](#4-exercicis-de-xarxa)
    - [Exercici 11: Informació de xarxa](#exercici-11-informació-de-xarxa)
    - [Exercici 12: Diagnòstic de xarxa](#exercici-12-diagnòstic-de-xarxa)
    - [Exercici 13: Configuració de xarxa (Avançat)](#exercici-13-configuració-de-xarxa-avançat)
  - [5. Exercicis d'usuaris i grups](#5-exercicis-dusuaris-i-grups)
    - [Exercici 14: Gestió d'usuaris locals](#exercici-14-gestió-dusuaris-locals)
    - [Exercici 15: Gestió de grups](#exercici-15-gestió-de-grups)
  - [6. Exercicis integradors](#6-exercicis-integradors)
    - [Exercici 16: Script de backup](#exercici-16-script-de-backup)
    - [Exercici 17: Auditoria del sistema](#exercici-17-auditoria-del-sistema)
    - [Exercici 18: Desafiament final - Organitzador automàtic](#exercici-18-desafiament-final---organitzador-automàtic)
  - [Consells finals per continuar aprenent](#consells-finals-per-continuar-aprenent)
  - [Recursos recomanats:](#recursos-recomanats)

---

## 1. Exercicis de navegació i directoris

### Exercici 1: Primers passos
**🎯 Dificultat:** Fàcil

Realitza les següents tasques:
- a) Obri PowerShell i mostra el directori actual
- b) Navega fins a la teua carpeta de Documents
- c) Crea un directori anomenat "PractiquesPoweShell"
- d) Entra en aquest directori i verifica que hi estàs dins
- e) Crea tres subdirectoris: "Exercici1", "Exercici2" i "Exercici3"
- f) Llista el contingut per verificar que es van crear correctament

### Exercici 2: Gestió bàsica d'arxius
**🎯 Dificultat:** Fàcil

Al directori "PractiquesPoweShell" que vas crear:
- a) Crea un arxiu buit anomenat "info.txt"
- b) Crea un altre arxiu anomenat "dades.txt"
- c) Llista tots els arxius .txt del directori
- d) Reanomena "info.txt" a "informacio.txt"
- e) Copia "dades.txt" a la carpeta "Exercici1"
- f) Mou "informacio.txt" a la carpeta "Exercici2"

### Exercici 3: Cerca d'arxius
**🎯 Dificultat:** Mitjana

Usant el directori `C:\Windows` com a base:
- a) Llista tots els arxius amb extensió .exe (sense cercar en subdirectoris)
- b) Cerca tots els arxius .dll de forma recursiva a `C:\Windows\System32`
- c) Troba tots els arxius que comencen per "note" a `C:\Windows`
- d) Quants arxius .log hi ha a `C:\Windows\Logs`? (pista: usa `Measure-Object`)

### Exercici 4: Neteja d'arxius temporals
**🎯 Dificultat:** Mitjana

Crea un script que:
- a) Navegue a la carpeta `C:\Windows\Temp`
- b) Lliste tots els arxius .tmp
- c) Mostre la grandària total d'aquests arxius
- d) Elimine tots els arxius .tmp (⚠️ compte amb aquest pas)

*Pista:* `Get-ChildItem | Measure-Object -Property Length -Sum`

## 2. Exercicis de contingut d'arxius

### Exercici 5: Crear i llegir arxius
**🎯 Dificultat:** Fàcil

- a) Crea un arxiu "llista.txt" amb la teua llista de la compra (una línia per producte)
- b) Usa comandes de PowerShell per afegir 3 productes més al final
- c) Mostra el contingut complet de l'arxiu
- d) Mostra només les primeres 5 línies
- e) Crea una còpia de l'arxiu anomenada "llista_backup.txt"

### Exercici 6: Treballar amb logs
**🎯 Dificultat:** Mitjana

Crea un arxiu "esdeveniments.txt" que continga:
```
ERROR: Falla en la connexió
INFO: Usuari connectat
WARNING: Espai en disc baix
ERROR: Arxiu no trobat
INFO: Backup completat
```

Després:
- a) Mostra només les línies que contenen "ERROR"
- b) Compta quantes línies de tipus ERROR hi ha
- c) Mostra les línies que NO contenen "INFO"
- d) Guarda només les línies ERROR en un nou arxiu "errors.txt"

### Exercici 7: CSV i dades estructurades
**🎯 Dificultat:** Difícil

Crea un arxiu CSV anomenat "alumnes.csv" amb aquestes dades:
```csv
Nom;Cognom;Nota
Joan;García;7.5
Maria;López;8.2
Pere;Martínez;5.1
Anna;Rodríguez;9.0
```

Després usant PowerShell:
- a) Importa el CSV i mostra'l com a taula
- b) Filtra els alumnes amb nota superior a 7
- c) Ordena'ls per nota de major a menor
- d) Exporta el resultat a un nou CSV "aprovats.csv"

## 3. Exercicis de processos i serveis

### Exercici 8: Gestió de processos
**🎯 Dificultat:** Mitjana

- a) Mostra tots els processos en execució
- b) Filtra només els processos que usen més de 50 MB de memòria
- c) Ordena els processos per ús de memòria de major a menor
- d) Obri el Bloc de notes (notepad)
- e) Cerca el procés del Bloc de notes i tanca'l usant PowerShell

### Exercici 9: Monitorització del sistema
**🎯 Dificultat:** Mitjana

Crea una comanda que:
- a) Obtinga els 10 processos que més CPU estan usant
- b) Mostre només el nom del procés i el seu percentatge de CPU
- c) Exporta el resultat a un arxiu "top_processos.txt"

*Pista:* usa `Select-Object` per triar propietats específiques

### Exercici 10: Gestió de serveis
**🎯 Dificultat:** Difícil

- a) Llista tots els serveis que estan en execució (Status = Running)
- b) Cerca el servei de Windows Update (wuauserv)
- c) Mostra el seu estat actual i tipus d'inici
- d) Si tens permisos d'administrador, atura el servei temporalment
- e) Torna a iniciar-lo

⚠️ *Només ho fes si tens permisos i saps el que fas*

## 4. Exercicis de xarxa

### Exercici 11: Informació de xarxa
**🎯 Dificultat:** Fàcil

- a) Mostra tots els adaptadors de xarxa del teu equip
- b) Mostra la configuració IP del teu adaptador principal
- c) Mostra la taula d'enrutament
- d) Mostra les connexions TCP establertes

### Exercici 12: Diagnòstic de xarxa
**🎯 Dificultat:** Mitjana

- a) Realitza un ping a google.com usant `Test-NetConnection`
- b) Fes un traceroute a google.com
- c) Resol l'adreça IP de www.microsoft.com
- d) Comprova si el port 80 de google.com està obert

*Pista:* `Test-NetConnection` té un paràmetre `-Port`

### Exercici 13: Configuració de xarxa (Avançat)
**🎯 Dificultat:** Difícil

Només en un entorn de proves:
- a) Desactiva i torna a activar el teu adaptador de xarxa
- b) Guarda la teua configuració IP actual en un arxiu de text
- c) Configura una IP estàtica de prova (exemple: 192.168.100.50)
- d) Verifica la nova configuració
- e) Restaura la configuració original (DHCP)

⚠️ *Aquest exercici pot deixar-te sense connexió si alguna cosa ix malament*

## 5. Exercicis d'usuaris i grups

### Exercici 14: Gestió d'usuaris locals
**🎯 Dificultat:** Mitjana

⚠️ Requereix privilegis d'administrador

- a) Llista tots els usuaris locals del sistema
- b) Crea un usuari anomenat "alumne_prova" amb contrasenya "Test123!"
- c) Crea un altre usuari "alumne_convidat" sense contrasenya
- d) Desactiva l'usuari "alumne_convidat"
- e) Elimina tots dos usuaris en acabar

### Exercici 15: Gestió de grups
**🎯 Dificultat:** Mitjana

⚠️ Requereix privilegis d'administrador

- a) Llista tots els grups locals
- b) Crea un grup anomenat "Estudiants"
- c) Afig l'usuari actual a aquest grup
- d) Verifica els membres del grup
- e) Elimina l'usuari del grup
- f) Elimina el grup

## 6. Exercicis integradors

### Exercici 16: Script de backup
**🎯 Dificultat:** Difícil

Crea un script que:
- a) Cree una carpeta "Backup" amb la data actual (format AAAA-MM-DD)
- b) Copie tots els arxius .txt de la teua carpeta Documents al backup
- c) Compte quants arxius es van copiar
- d) Cree un arxiu "resum.txt" amb:
  - Data i hora del backup
  - Nombre d'arxius copiats
  - Grandària total dels arxius

### Exercici 17: Auditoria del sistema
**🎯 Dificultat:** Difícil

Crea un informe del sistema que incloga:
- a) Els 10 processos que més memòria consumeixen
- b) Els 5 serveis crítics i el seu estat (tria serveis importants)
- c) L'espai lliure en disc
- d) La configuració IP de l'adaptador principal
- e) Tot guardat en un arxiu HTML amb format bonic

*Pista:* `ConvertTo-Html` pot ajudar

### Exercici 18: Desafiament final - Organitzador automàtic
**🎯 Dificultat:** Difícil

Crea un script que:
- a) En una carpeta de "Descàrregues" de prova amb arxius mesclats
- b) Cree subcarpetes: Imatges, Documents, Vídeos, Altres
- c) Moga automàticament cada arxiu a la seua carpeta segons l'extensió:
  - .jpg, .png, .gif → Imatges
  - .pdf, .docx, .txt → Documents
  - .mp4, .avi, .mkv → Vídeos
  - Tot la resta → Altres
- d) Genere un informe del que es va moure

---

## Consells finals per continuar aprenent

1. **Pràctica constant:** La millor forma d'aprendre PowerShell és usar-lo regularment.
2. **Usa Get-Help:** Sempre que tingues dubtes sobre una comanda, consulta la seua ajuda.
3. **Experimenta:** PowerShell permet desfer la majoria d'accions. No tingues por de provar.
4. **Aprèn dels errors:** Els missatges d'error solen explicar què va eixir malament.
5. **Documenta't:** La documentació oficial de Microsoft és molt completa.

## Recursos recomanats:

- Documentació oficial de Microsoft: [docs.microsoft.com/powershell](https://docs.microsoft.com/powershell)
- PowerShell Gallery: repositori de scripts i mòduls
- Fòrums de la comunitat: Stack Overflow, Reddit r/PowerShell

---

**Molta sort amb el teu aprenentatge de PowerShell! 🚀**