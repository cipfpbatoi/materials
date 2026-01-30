# PowerShell
- [PowerShell](#powershell)
  - [1. Introducció a PowerShell](#1-introducció-a-powershell)
    - [Què és PowerShell?](#què-és-powershell)
    - [Característiques principals](#característiques-principals)
    - [Com obrir PowerShell?](#com-obrir-powershell)
  - [2. Conceptes bàsics de PowerShell](#2-conceptes-bàsics-de-powershell)
    - [2.1. Què són els Cmdlets?](#21-què-són-els-cmdlets)
    - [Verbs comuns](#verbs-comuns)
    - [2.2. Àlies: Dreceres per a cmdlets](#22-àlies-dreceres-per-a-cmdlets)
      - [Exemples d'àlies comuns:](#exemples-dàlies-comuns)
    - [2.3. Obtenir ajuda](#23-obtenir-ajuda)
      - [Opcions útils de Get-Help:](#opcions-útils-de-get-help)
    - [2.4. L'operador pipe (|)](#24-loperador-pipe-)
  - [3. Comandes per a directoris i arxius](#3-comandes-per-a-directoris-i-arxius)
    - [3.1. Navegar per directoris](#31-navegar-per-directoris)
      - [Canviar de directori: Set-Location (àlies: cd)](#canviar-de-directori-set-location-àlies-cd)
      - [Veure el directori actual: Get-Location (àlies: pwd)](#veure-el-directori-actual-get-location-àlies-pwd)
    - [3.2. Llistar contingut](#32-llistar-contingut)
      - [Veure contingut del directori: Get-ChildItem (àlies: dir, ls)](#veure-contingut-del-directori-get-childitem-àlies-dir-ls)
      - [Filtrar arxius:](#filtrar-arxius)
    - [3.3. Crear elements](#33-crear-elements)
      - [Crear directori: New-Item (àlies: mkdir)](#crear-directori-new-item-àlies-mkdir)
      - [Crear arxiu buit:](#crear-arxiu-buit)
    - [3.4. Copiar, moure i eliminar](#34-copiar-moure-i-eliminar)
      - [Copiar: Copy-Item (àlies: copy, cp)](#copiar-copy-item-àlies-copy-cp)
      - [Moure: Move-Item (àlies: move, mv)](#moure-move-item-àlies-move-mv)
      - [Reanomenar: Rename-Item (àlies: ren)](#reanomenar-rename-item-àlies-ren)
      - [Eliminar: Remove-Item (àlies: del, rm)](#eliminar-remove-item-àlies-del-rm)
  - [4. Treballar amb el contingut d'arxius](#4-treballar-amb-el-contingut-darxius)
    - [Veure contingut: Get-Content (àlies: cat, type)](#veure-contingut-get-content-àlies-cat-type)
    - [Buscar en arxius de text:](#buscar-en-arxius-de-text)
    - [Crear arxiu amb contingut:](#crear-arxiu-amb-contingut)
    - [Treballar amb arxius CSV:](#treballar-amb-arxius-csv)
  - [5. Gestió de processos i serveis](#5-gestió-de-processos-i-serveis)
    - [5.1. Processos](#51-processos)
      - [Veure processos: Get-Process](#veure-processos-get-process)
      - [Iniciar procés: Start-Process](#iniciar-procés-start-process)
      - [Aturar procés: Stop-Process](#aturar-procés-stop-process)
    - [5.2. Serveis de Windows](#52-serveis-de-windows)
      - [Veure serveis: Get-Service](#veure-serveis-get-service)
      - [Gestionar serveis:](#gestionar-serveis)
  - [6. Gestió d'usuaris i grups](#6-gestió-dusuaris-i-grups)
    - [6.1. Usuaris locals](#61-usuaris-locals)
      - [Veure usuaris:](#veure-usuaris)
      - [Crear usuari:](#crear-usuari)
      - [Modificar usuari:](#modificar-usuari)
      - [Eliminar usuari:](#eliminar-usuari)
    - [6.2. Grups locals](#62-grups-locals)
      - [Veure grups:](#veure-grups)
      - [Crear grup:](#crear-grup)
      - [Gestionar membres:](#gestionar-membres)
  - [7. Gestió de xarxa](#7-gestió-de-xarxa)
    - [Veure configuració de xarxa:](#veure-configuració-de-xarxa)
    - [Gestionar adaptadors:](#gestionar-adaptadors)
    - [Configurar IP estàtica:](#configurar-ip-estàtica)
    - [Eines de diagnòstic:](#eines-de-diagnòstic)

---

## 1. Introducció a PowerShell

### Què és PowerShell?

PowerShell és una eina de línia de comandes avançada desenvolupada per Microsoft que substitueix l'antiga CMD (Command Prompt). A diferència d'altres intèrprets de comandes que treballen amb text, PowerShell treballa amb **objectes**, la qual cosa el fa molt més potent i flexible.

### Característiques principals

- És multiplataforma (Windows, Linux, macOS)
- Treballa amb objectes en lloc de text pla
- Permet automatitzar tasques administratives complexes
- S'integra perfectament amb Windows

### Com obrir PowerShell?

1. Prem **Win + X** i selecciona "Windows PowerShell"
2. Cerca "PowerShell" al menú inici
3. Per executar-lo com a Administrador, fes clic dret i selecciona "Executar com a administrador"

> 💡 **Nota important:** Algunes comandes requereixen privilegis d'administrador. Quan vegis un error de permisos, intenta executar PowerShell com a Administrador.

---

## 2. Conceptes bàsics de PowerShell

### 2.1. Què són els Cmdlets?

Les comandes en PowerShell s'anomenen **cmdlets** (es pronuncia "command-lets"). Tots els cmdlets segueixen una estructura molt clara:

```powershell
Verb-Nom
```

Per exemple:
- `Get-Location` (obtenir la ubicació actual)
- `Set-Location` (establir/canviar la ubicació)
- `Get-ChildItem` (obtenir els elements fills/contingut)
- `New-Item` (crear un nou element)

### Verbs comuns

| Verb | Significat |
|------|------------|
| Get | Obtenir/consultar informació |
| Set | Establir/modificar alguna cosa |
| New | Crear alguna cosa nova |
| Remove | Eliminar/esborrar |
| Start | Iniciar/arrencar |
| Stop | Aturar/parar |
| Enable | Activar/habilitar |
| Disable | Desactivar/deshabilitar |

### 2.2. Àlies: Dreceres per a cmdlets

PowerShell permet usar àlies (noms curts) per als cmdlets. Això és útil per a escriure més ràpid, especialment si vens de CMD o Linux.

#### Exemples d'àlies comuns:

| Cmdlet complet | Àlies | Equivalent a (CMD/Linux) |
|----------------|-------|--------------------------|
| Get-ChildItem | dir, ls, gci | dir (CMD), ls (Linux) |
| Set-Location | cd, sl | cd |
| Get-Location | pwd, gl | pwd |
| Copy-Item | copy, cp | copy, cp |
| Remove-Item | del, rm | del, rm |
| Move-Item | move, mv | move, mv |

**Veure tots els àlies d'un cmdlet:**
```powershell
Get-Alias -Definition Get-ChildItem
```

### 2.3. Obtenir ajuda

Un dels recursos més útils és el sistema d'ajuda integrat:

```powershell
Get-Help <nom-del-cmdlet>
```

Per exemple:
```powershell
Get-Help Get-ChildItem
```

#### Opcions útils de Get-Help:

- `Get-Help <cmdlet> -Examples` → Mostra exemples pràctics
- `Get-Help <cmdlet> -Full` → Mostra informació completa i detallada
- `Get-Help <cmdlet> -Online` → Obri l'ajuda al navegador

> 💡 **Consell:** La primera vegada que usis Get-Help, PowerShell et demanarà actualitzar l'ajuda. Executa `Update-Help` des d'una consola d'Administrador per descarregar tota la documentació.

### 2.4. L'operador pipe (|)

L'operador **pipe** (|) és un dels més potents de PowerShell. Permet connectar comandes de manera que l'eixida d'una es converteix en l'entrada de la següent:

```powershell
Comanda1 | Comanda2 | Comanda3
```

**Exemple pràctic:**
```powershell
Get-Process | Where-Object {$_.CPU -gt 10} | Sort-Object CPU -Descending
```

Aquest comando:
1. Obté tots els processos (`Get-Process`)
2. Filtra els que usen més del 10% de CPU (`Where-Object`)
3. Els ordena de major a menor ús de CPU (`Sort-Object`)

---

## 3. Comandes per a directoris i arxius

### 3.1. Navegar per directoris

#### Canviar de directori: Set-Location (àlies: cd)

```powershell
Set-Location C:\Windows
cd C:\Users
cd ..           # Pujar al directori pare
cd ~            # Anar al directori home de l'usuari
```

#### Veure el directori actual: Get-Location (àlies: pwd)

```powershell
Get-Location
```

### 3.2. Llistar contingut

#### Veure contingut del directori: Get-ChildItem (àlies: dir, ls)

```powershell
Get-ChildItem                    # Contingut del directori actual
Get-ChildItem C:\Windows         # Contingut de C:\Windows
Get-ChildItem -Force             # Inclou arxius ocults
Get-ChildItem -Recurse           # Inclou subdirectoris recursivament
```

#### Filtrar arxius:

```powershell
Get-ChildItem *.txt              # Només arxius .txt
Get-ChildItem -Filter *.pdf      # Alternativa per filtrar
Get-ChildItem -Include *.jpg,*.png  # Diversos tipus d'arxiu
```

### 3.3. Crear elements

#### Crear directori: New-Item (àlies: mkdir)

```powershell
New-Item -Path "ElsMeusDocuments" -ItemType Directory
mkdir Projectes
New-Item -Path "C:\Temp\Prova" -ItemType Directory
```

#### Crear arxiu buit:

```powershell
New-Item -Path "arxiu.txt" -ItemType File
New-Item "C:\Temp\notes.txt" -ItemType File
```

### 3.4. Copiar, moure i eliminar

#### Copiar: Copy-Item (àlies: copy, cp)

```powershell
Copy-Item arxiu.txt C:\Backup\
Copy-Item *.pdf D:\Documents\
Copy-Item Carpeta D:\Backup\ -Recurse  # Copiar carpeta amb contingut
```

#### Moure: Move-Item (àlies: move, mv)

```powershell
Move-Item arxiu.txt C:\Temp\
Move-Item *.log D:\Logs\
```

#### Reanomenar: Rename-Item (àlies: ren)

```powershell
Rename-Item arxiu.txt nou_nom.txt
Rename-Item Carpeta NovaCarpeta
```

#### Eliminar: Remove-Item (àlies: del, rm)

```powershell
Remove-Item arxiu.txt
Remove-Item *.tmp                        # Elimina tots els .tmp
Remove-Item Carpeta -Recurse             # Elimina carpeta i contingut
Remove-Item Carpeta -Recurse -Force      # Sense demanar confirmació
```

> ⚠️ **Precaució:** El paràmetre `-Force` elimina arxius sense demanar confirmació. Usa'l amb cura, especialment amb `-Recurse`.

---

## 4. Treballar amb el contingut d'arxius

### Veure contingut: Get-Content (àlies: cat, type)

```powershell
Get-Content arxiu.txt
Get-Content C:\Windows\System32\drivers\etc\hosts
cat log.txt | Select-Object -First 10   # Primeres 10 línies
```

### Buscar en arxius de text:

```powershell
Get-Content arxiu.txt | Where-Object {$_ -match "error"}
Get-Content log.txt | Select-String "WARNING"
```

### Crear arxiu amb contingut:

```powershell
"Hola món" | Out-File hola.txt
"Primera línia" | Set-Content arxiu.txt
"Segona línia" | Add-Content arxiu.txt  # Afegir al final
```

### Treballar amb arxius CSV:

```powershell
Import-Csv dades.csv -Delimiter ";"
Import-Csv alumnes.csv | Where-Object {$_.Nota -gt 5}
Import-Csv dades.csv | Sort-Object Cognom | Export-Csv ordenat.csv
```

---

## 5. Gestió de processos i serveis

### 5.1. Processos

#### Veure processos: Get-Process

```powershell
Get-Process
Get-Process -Name chrome*
Get-Process | Where-Object {$_.CPU -gt 100}  # Processos amb alta CPU
```

#### Iniciar procés: Start-Process

```powershell
Start-Process notepad
Start-Process chrome https://www.google.com
```

#### Aturar procés: Stop-Process

```powershell
Stop-Process -Name notepad
Stop-Process -Id 1234
Get-Process chrome | Stop-Process  # Tancar tots els Chrome
```

### 5.2. Serveis de Windows

#### Veure serveis: Get-Service

```powershell
Get-Service
Get-Service -Name wuauserv
Get-Service | Where-Object {$_.Status -eq "Running"}
```

#### Gestionar serveis:

```powershell
Start-Service -Name wuauserv
Stop-Service -Name wuauserv
Restart-Service -Name wuauserv
Set-Service -Name wuauserv -StartupType Disabled
```

> 💡 **Nota:** La gestió de serveis normalment requereix privilegis d'administrador.

---

## 6. Gestió d'usuaris i grups

PowerShell permet gestionar usuaris locals i d'Active Directory. Per a usuaris d'Active Directory necessites instal·lar el mòdul corresponent.

### 6.1. Usuaris locals

#### Veure usuaris:

```powershell
Get-LocalUser
Get-LocalUser -Name joan
```

#### Crear usuari:

```powershell
New-LocalUser "usuari1" -NoPassword
New-LocalUser "usuari2" -Password (ConvertTo-SecureString "Pass123!" -AsPlainText -Force)
```

#### Modificar usuari:

```powershell
Set-LocalUser -Name usuari1 -Description "Usuari de prova"
Disable-LocalUser -Name usuari1
Enable-LocalUser -Name usuari1
```

#### Eliminar usuari:

```powershell
Remove-LocalUser -Name usuari1
```

### 6.2. Grups locals

#### Veure grups:

```powershell
Get-LocalGroup
Get-LocalGroupMember -Group "Administradors"
```

#### Crear grup:

```powershell
New-LocalGroup -Name "Desenvolupadors" -Description "Equip de desenvolupament"
```

#### Gestionar membres:

```powershell
Add-LocalGroupMember -Group "Desenvolupadors" -Member "usuari1"
Remove-LocalGroupMember -Group "Desenvolupadors" -Member "usuari1"
```

---

## 7. Gestió de xarxa

### Veure configuració de xarxa:

```powershell
Get-NetAdapter
Get-NetIPAddress
Get-NetIPConfiguration
Get-NetRoute
```

### Gestionar adaptadors:

```powershell
Enable-NetAdapter -Name "Ethernet"
Disable-NetAdapter -Name "Ethernet"
Rename-NetAdapter -Name "Ethernet" -NewName "LAN"
```

### Configurar IP estàtica:

```powershell
Remove-NetIPAddress -InterfaceAlias "Ethernet"
Remove-NetRoute -InterfaceAlias "Ethernet"
New-NetIPAddress -InterfaceAlias "Ethernet" -IPAddress 192.168.1.50 `
    -PrefixLength 24 -DefaultGateway 192.168.1.1
Set-DnsClientServerAddress -InterfaceAlias "Ethernet" `
    -ServerAddresses 8.8.8.8,8.8.4.4
```

### Eines de diagnòstic:

```powershell
Test-NetConnection google.com
Test-NetConnection 192.168.1.1 -TraceRoute
Resolve-DnsName google.com
Get-NetTCPConnection -State Established
```

---

