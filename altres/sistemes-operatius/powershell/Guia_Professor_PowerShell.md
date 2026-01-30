# PowerShell per a SMR

## Guia del Professor

**Solucions i Consells Didàctics**

---

## Índex

1. [Introducció per al docent](#introducció-per-al-docent)
2. [Recomanacions generals](#recomanacions-generals)
3. [Temporalització suggerida](#temporalització-suggerida)
4. [Solucions als exercicis](#solucions-als-exercicis)
5. [Criteris d'avaluació](#criteris-davaluació)
6. [Recursos addicionals](#recursos-addicionals-per-al-professor)

---

## Introducció per al docent

Aquest document és una guia complementària per al professor que inclou solucions als exercicis, consells didàctics i suggeriments per a l'avaluació.

---

## Recomanacions generals

### Metodologia

- **Entorn de pràctica:** Crea una màquina virtual Windows perquè els alumnes practiquen sense por.
- **Progressió:** Assegura't que dominen cada secció abans d'avançar.
- **Errors com a aprenentatge:** Anima els alumnes a cometre errors i aprendre d'ells.
- **Treball col·laboratiu:** Els exercicis més difícils poden fer-se en parelles.
- **Documentació:** Incentiva l'ús de Get-Help i la documentació oficial.

### Claus per a l'èxit

1. **Demostració en directe:** Mostra cada comanda abans que la proven ells.
2. **Verificació constant:** Comprova que tots els alumnes segueixen el ritme.
3. **Resolució de dubtes:** Dedica temps a resoldre errors comuns.
4. **Contextualització:** Explica per a què serveix cada comanda en el món real.
5. **Motivació:** Mostra exemples d'automatització útils.

---

## Temporalització suggerida

**Total: 6 sessions de 2 hores (12h)**

| Sessió | Contingut | Exercicis |
|--------|-----------|-----------|
| 1 | Introducció i conceptes bàsics (caps. 1-2) | Proves inicials |
| 2 | Directoris i arxius (cap. 3) | Exercicis 1-4 |
| 3 | Contingut d'arxius (cap. 4) | Exercicis 5-7 |
| 4 | Processos i serveis (cap. 5) | Exercicis 8-10 |
| 5 | Usuaris, grups i xarxa (caps. 6-7) | Exercicis 11-15 |
| 6 | Exercicis integradors i avaluació | Exercicis 16-18 |

### Distribució de temps per sessió

- **15 min:** Repàs sessió anterior
- **45 min:** Explicació teòrica i demostració
- **10 min:** Descans
- **50 min:** Pràctica guiada i exercicis

---

## Solucions als exercicis

### 8.1. Exercicis de navegació i directoris

#### Exercici 1: Primers passos

```powershell
# a) Mostrar directori actual
Get-Location

# b) Navegar a Documents
Set-Location ~\Documents

# c) Crear directori
New-Item -Path "PractiquesPoweShell" -ItemType Directory

# d) Entrar i verificar
Set-Location PractiquesPoweShell
Get-Location

# e) Crear subdirectoris
New-Item "Exercici1" -ItemType Directory
New-Item "Exercici2" -ItemType Directory
New-Item "Exercici3" -ItemType Directory

# f) Llistar contingut
Get-ChildItem
```

**Errors comuns:**
- Oblidar les cometes si el nom té espais
- Confondre `-Path` amb `-Name`
- No verificar que s'ha creat correctament

---

#### Exercici 2: Gestió bàsica d'arxius

```powershell
# a) Crear arxiu buit
New-Item "info.txt" -ItemType File

# b) Crear un altre arxiu
New-Item "dades.txt" -ItemType File

# c) Llistar arxius .txt
Get-ChildItem *.txt

# d) Reanomenar
Rename-Item "info.txt" "informacio.txt"

# e) Copiar
Copy-Item "dades.txt" "Exercici1\"

# f) Moure
Move-Item "informacio.txt" "Exercici2\"
```

**Punts d'atenció:**
- Verificar que l'arxiu existeix abans de copiar/moure
- Recordar que Move-Item també pot reanomenar
- L'ús de wildcards (*)

---

#### Exercici 3: Cerca d'arxius

```powershell
# a) Arxius .exe a Windows (sense recursió)
Get-ChildItem C:\Windows -Filter *.exe

# b) Arxius .dll recursius a System32
Get-ChildItem C:\Windows\System32 -Filter *.dll -Recurse

# c) Arxius que comencen per "note"
Get-ChildItem C:\Windows -Filter note*

# d) Comptar arxius .log
(Get-ChildItem C:\Windows\Logs -Filter *.log -Recurse -ErrorAction SilentlyContinue).Count
# o també:
Get-ChildItem C:\Windows\Logs -Filter *.log -Recurse -ErrorAction SilentlyContinue | Measure-Object
```

**Consells didàctics:**
- Explicar `-ErrorAction SilentlyContinue` per evitar errors de permisos
- Mostrar la diferència entre `.Count` i `Measure-Object`
- Practicar amb diferents carpetes del sistema

---

#### Exercici 4: Neteja d'arxius temporals

```powershell
# Script complet amb verificació
Set-Location C:\Windows\Temp

# Llistar i analitzar abans d'eliminar
$arxius = Get-ChildItem -Filter *.tmp
$grandaria = ($arxius | Measure-Object -Property Length -Sum).Sum / 1MB

Write-Host "S'han trobat $($arxius.Count) arxius .tmp" -ForegroundColor Yellow
Write-Host "Grandària total: $([math]::Round($grandaria,2)) MB" -ForegroundColor Yellow

# Demanar confirmació
$resposta = Read-Host "Vols eliminar aquests arxius? (S/N)"
if ($resposta -eq "S") {
    $arxius | Remove-Item -Force
    Write-Host "Arxius eliminats correctament" -ForegroundColor Green
} else {
    Write-Host "Operació cancel·lada" -ForegroundColor Red
}
```

**Important:**
- ⚠️ Fer èmfasi en els perills d'eliminar arxius sense verificar
- Mostrar com fer una simulació amb `-WhatIf`
- Ensenyar bones pràctiques: comprovar abans d'esborrar

---

### 8.2. Exercicis de contingut d'arxius

#### Exercici 5: Crear i llegir arxius

```powershell
# a) Crear arxiu amb contingut
"Pa", "Llet", "Ous", "Arròs", "Pasta" | Out-File llista.txt

# b) Afegir productes
"Tomàquets" | Add-Content llista.txt
"Oli" | Add-Content llista.txt
"Sal" | Add-Content llista.txt

# c) Mostrar contingut complet
Get-Content llista.txt

# d) Primeres 5 línies
Get-Content llista.txt | Select-Object -First 5

# e) Crear còpia
Copy-Item llista.txt llista_backup.txt
```

**Alternatives a mostrar:**
```powershell
# Crear l'arxiu d'una altra manera
Set-Content llista.txt -Value "Pa","Llet","Ous","Arròs","Pasta"

# Mostrar amb numeració de línies
Get-Content llista.txt | ForEach-Object -Begin {$i=1} -Process {"Línia $i`: $_"; $i++}
```

---

#### Exercici 6: Treballar amb logs

```powershell
# Primer crear l'arxiu
@"
ERROR: Falla en la connexió
INFO: Usuari connectat
WARNING: Espai en disc baix
ERROR: Arxiu no trobat
INFO: Backup completat
"@ | Out-File esdeveniments.txt

# a) Només línies ERROR
Get-Content esdeveniments.txt | Where-Object {$_ -match "ERROR"}

# b) Comptar línies ERROR
(Get-Content esdeveniments.txt | Where-Object {$_ -match "ERROR"}).Count

# c) Línies sense INFO
Get-Content esdeveniments.txt | Where-Object {$_ -notmatch "INFO"}

# d) Guardar només ERROR
Get-Content esdeveniments.txt | Where-Object {$_ -match "ERROR"} | Out-File errors.txt
```

**Ampliacions possibles:**
```powershell
# Comptar per tipus d'esdeveniment
Get-Content esdeveniments.txt | Group-Object {
    if ($_ -match "^ERROR") { "ERROR" }
    elseif ($_ -match "^INFO") { "INFO" }
    elseif ($_ -match "^WARNING") { "WARNING" }
} | Select-Object Name, Count

# Afegir colors segons el tipus
Get-Content esdeveniments.txt | ForEach-Object {
    if ($_ -match "ERROR") { 
        Write-Host $_ -ForegroundColor Red 
    } elseif ($_ -match "WARNING") { 
        Write-Host $_ -ForegroundColor Yellow 
    } else { 
        Write-Host $_ -ForegroundColor Green 
    }
}
```

---

#### Exercici 7: CSV i dades estructurades

```powershell
# Crear el CSV
@"
Nom;Cognom;Nota
Joan;García;7.5
Maria;López;8.2
Pere;Martínez;5.1
Anna;Rodríguez;9.0
"@ | Out-File alumnes.csv

# a) Importar i mostrar
Import-Csv alumnes.csv -Delimiter ";" | Format-Table

# b) Filtrar nota > 7
Import-Csv alumnes.csv -Delimiter ";" | Where-Object {[double]$_.Nota -gt 7}

# c) Ordenar per nota descendent
Import-Csv alumnes.csv -Delimiter ";" | Sort-Object {[double]$_.Nota} -Descending

# d) Exportar resultat
Import-Csv alumnes.csv -Delimiter ";" | 
    Where-Object {[double]$_.Nota -gt 7} | 
    Sort-Object {[double]$_.Nota} -Descending | 
    Export-Csv aprovats.csv -Delimiter ";" -NoTypeInformation
```

**Punts importants:**
- Explicar la conversió a `[double]` per ordenar numèricament
- Mostrar l'ús de `-NoTypeInformation` per netejar l'exportació
- Practicar amb diferents delimitadors (coma, punt i coma, tabulador)

**Exercici extra:**
```powershell
# Calcular la nota mitjana
$alumnes = Import-Csv alumnes.csv -Delimiter ";"
$mitjana = ($alumnes | Measure-Object -Property Nota -Average).Average
Write-Host "Nota mitjana: $([math]::Round($mitjana,2))" -ForegroundColor Cyan
```

---

### 8.3. Exercicis de processos i serveis

#### Exercici 8: Gestió de processos

```powershell
# a) Tots els processos
Get-Process

# b) Processos amb més de 50 MB (WorkingSet en bytes)
Get-Process | Where-Object {$_.WorkingSet -gt 50MB}

# c) Ordenar per memòria
Get-Process | Sort-Object WorkingSet -Descending | Format-Table Name, WorkingSet, CPU

# d) Obrir Notepad
Start-Process notepad

# e) Cercar i tancar Notepad
Get-Process notepad | Stop-Process
# o directament:
Stop-Process -Name notepad
```

**Demostració avançada:**
```powershell
# Script de monitorització en temps real (Ctrl+C per aturar)
while ($true) {
    Clear-Host
    Write-Host "=== TOP 10 PROCESSOS PER MEMÒRIA ===" -ForegroundColor Cyan
    Write-Host "$(Get-Date)" -ForegroundColor Gray
    Get-Process | 
        Sort-Object WorkingSet -Descending | 
        Select-Object -First 10 Name, 
            @{N="Memòria(MB)";E={[math]::Round($_.WorkingSet/1MB,2)}},
            @{N="CPU";E={$_.CPU}} |
        Format-Table -AutoSize
    Start-Sleep -Seconds 2
}
```

---

#### Exercici 9: Monitorització del sistema

```powershell
# Solució bàsica
Get-Process | 
    Sort-Object CPU -Descending | 
    Select-Object -First 10 ProcessName, CPU |
    Out-File top_processos.txt

# Solució millorada amb format
Get-Process | 
    Sort-Object CPU -Descending | 
    Select-Object -First 10 ProcessName, 
        @{Name="Temps CPU";Expression={[math]::Round($_.CPU,2)}}, 
        @{Name="Memòria (MB)";Expression={[math]::Round($_.WorkingSet/1MB,2)}} |
    Format-Table -AutoSize |
    Out-File top_processos.txt

# Visualitzar l'arxiu
Get-Content top_processos.txt
```

**Millores opcionals:**
```powershell
# Exportar a CSV per poder obrir-lo amb Excel
Get-Process | 
    Sort-Object CPU -Descending | 
    Select-Object -First 10 ProcessName, CPU, WorkingSet |
    Export-Csv top_processos.csv -NoTypeInformation

# Crear un informe HTML
Get-Process | 
    Sort-Object CPU -Descending | 
    Select-Object -First 10 ProcessName, 
        @{N="CPU";E={[math]::Round($_.CPU,2)}}, 
        @{N="Memòria(MB)";E={[math]::Round($_.WorkingSet/1MB,2)}} |
    ConvertTo-Html -Title "Top 10 Processos" |
    Out-File top_processos.html
```

---

#### Exercici 10: Gestió de serveis

```powershell
# a) Serveis en execució
Get-Service | Where-Object {$_.Status -eq "Running"}

# b) Cercar Windows Update
Get-Service wuauserv

# c) Estat i tipus d'inici
Get-Service wuauserv | Select-Object Name, Status, StartType, DisplayName

# d) Aturar servei (requereix admin)
Stop-Service wuauserv

# e) Iniciar servei
Start-Service wuauserv

# Script complet amb gestió d'errors
try {
    $servei = Get-Service wuauserv
    Write-Host "`n=== INFORMACIÓ DEL SERVEI ===" -ForegroundColor Cyan
    Write-Host "Nom: $($servei.DisplayName)"
    Write-Host "Estat: $($servei.Status)" -ForegroundColor $(if($servei.Status -eq "Running"){"Green"}else{"Red"})
    Write-Host "Tipus d'inici: $($servei.StartType)"
    
    # Només si s'executa com a admin
    $esAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
    
    if ($esAdmin) {
        Write-Host "`nTens permisos d'administrador" -ForegroundColor Green
        # Ací podries aturar/iniciar el servei
    } else {
        Write-Host "`nNo tens permisos d'administrador" -ForegroundColor Yellow
    }
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
```

---

### 8.4. Exercicis de xarxa

#### Exercici 11: Informació de xarxa

```powershell
# a) Adaptadors de xarxa
Get-NetAdapter | Format-Table Name, Status, LinkSpeed, MacAddress

# b) Configuració IP de l'adaptador principal
Get-NetIPConfiguration

# c) Taula d'enrutament
Get-NetRoute | Format-Table -AutoSize

# d) Connexions TCP establertes
Get-NetTCPConnection -State Established | 
    Select-Object LocalAddress, LocalPort, RemoteAddress, RemotePort, State |
    Format-Table -AutoSize
```

**Script d'auditoria de xarxa:**
```powershell
Write-Host "=== AUDITORIA DE XARXA ===" -ForegroundColor Cyan
Write-Host "`nAdaptadors actius:" -ForegroundColor Yellow
Get-NetAdapter | Where-Object {$_.Status -eq "Up"} | Format-Table Name, InterfaceDescription

Write-Host "`nConfiguració IP:" -ForegroundColor Yellow
Get-NetIPAddress -AddressFamily IPv4 | 
    Where-Object {$_.IPAddress -notlike "127.*" -and $_.IPAddress -notlike "169.*"} |
    Format-Table InterfaceAlias, IPAddress, PrefixLength

Write-Host "`nServidors DNS:" -ForegroundColor Yellow
Get-DnsClientServerAddress -AddressFamily IPv4 | 
    Where-Object {$_.ServerAddresses.Count -gt 0} |
    Format-Table InterfaceAlias, ServerAddresses
```

---

#### Exercici 12: Diagnòstic de xarxa

```powershell
# a) Ping a google.com
Test-NetConnection google.com

# b) Traceroute
Test-NetConnection google.com -TraceRoute

# c) Resoldre IP
Resolve-DnsName www.microsoft.com

# d) Comprovar port 80
Test-NetConnection google.com -Port 80

# Script complet de diagnòstic
$destinacio = "google.com"

Write-Host "=== DIAGNÒSTIC DE XARXA ===" -ForegroundColor Cyan
Write-Host "Destinació: $destinacio`n" -ForegroundColor Gray

Write-Host "1. Ping:" -ForegroundColor Yellow
$ping = Test-NetConnection $destinacio
if ($ping.PingSucceeded) {
    Write-Host "   ✓ Connexió exitosa - Temps: $($ping.PingReplyDetails.RoundtripTime)ms" -ForegroundColor Green
} else {
    Write-Host "   ✗ No s'ha pogut connectar" -ForegroundColor Red
}

Write-Host "`n2. Resolució DNS:" -ForegroundColor Yellow
$dns = Resolve-DnsName $destinacio -Type A
Write-Host "   IP: $($dns[0].IPAddress)" -ForegroundColor Cyan

Write-Host "`n3. Port 80 (HTTP):" -ForegroundColor Yellow
$port80 = Test-NetConnection $destinacio -Port 80 -WarningAction SilentlyContinue
if ($port80.TcpTestSucceeded) {
    Write-Host "   ✓ Port obert" -ForegroundColor Green
} else {
    Write-Host "   ✗ Port tancat" -ForegroundColor Red
}

Write-Host "`n4. Port 443 (HTTPS):" -ForegroundColor Yellow
$port443 = Test-NetConnection $destinacio -Port 443 -WarningAction SilentlyContinue
if ($port443.TcpTestSucceeded) {
    Write-Host "   ✓ Port obert" -ForegroundColor Green
} else {
    Write-Host "   ✗ Port tancat" -ForegroundColor Red
}
```

---

#### Exercici 13: Configuració de xarxa (Avançat)

⚠️ **IMPORTANT:** Aquest exercici pot deixar l'equip sense connexió. Només fer en entorn de proves.

```powershell
# SCRIPT COMPLET AMB SEGURETAT
$adapter = "Ethernet"  # Canviar pel nom real

# Verificar que existeix l'adaptador
if (-not (Get-NetAdapter -Name $adapter -ErrorAction SilentlyContinue)) {
    Write-Host "Error: No s'ha trobat l'adaptador '$adapter'" -ForegroundColor Red
    Get-NetAdapter | Format-Table Name, Status
    exit
}

# a) Guardar configuració actual
Write-Host "Guardant configuració actual..." -ForegroundColor Yellow
$configOriginal = Get-NetIPConfiguration -InterfaceAlias $adapter
$configOriginal | Out-File "config_original_$(Get-Date -Format 'yyyyMMdd_HHmmss').txt"

# b) Desactivar i activar adaptador
Write-Host "Desactivant adaptador..." -ForegroundColor Yellow
Disable-NetAdapter -Name $adapter -Confirm:$false
Start-Sleep -Seconds 3
Write-Host "Activant adaptador..." -ForegroundColor Yellow
Enable-NetAdapter -Name $adapter
Start-Sleep -Seconds 3

# c) Configurar IP estàtica
Write-Host "Configurant IP estàtica de prova..." -ForegroundColor Yellow
try {
    # Eliminar configuració actual
    Remove-NetIPAddress -InterfaceAlias $adapter -Confirm:$false -ErrorAction SilentlyContinue
    Remove-NetRoute -InterfaceAlias $adapter -Confirm:$false -ErrorAction SilentlyContinue
    
    # Configurar nova IP
    New-NetIPAddress -InterfaceAlias $adapter `
        -IPAddress 192.168.100.50 `
        -PrefixLength 24 `
        -DefaultGateway 192.168.100.1
    
    Set-DnsClientServerAddress -InterfaceAlias $adapter `
        -ServerAddresses 8.8.8.8,8.8.4.4
    
    Write-Host "IP configurada correctament" -ForegroundColor Green
} catch {
    Write-Host "Error configurant la IP: $($_.Exception.Message)" -ForegroundColor Red
}

# d) Verificar
Write-Host "`nNova configuració:" -ForegroundColor Cyan
Get-NetIPConfiguration -InterfaceAlias $adapter | Format-List

# e) RESTAURAR DHCP
Write-Host "`nVols restaurar la configuració DHCP? (S/N)" -ForegroundColor Yellow
$resposta = Read-Host
if ($resposta -eq "S") {
    Write-Host "Restaurant DHCP..." -ForegroundColor Yellow
    
    # Eliminar IP estàtica
    Remove-NetIPAddress -InterfaceAlias $adapter -Confirm:$false -ErrorAction SilentlyContinue
    Remove-NetRoute -InterfaceAlias $adapter -Confirm:$false -ErrorAction SilentlyContinue
    
    # Activar DHCP
    Set-NetIPInterface -InterfaceAlias $adapter -Dhcp Enabled
    Set-DnsClientServerAddress -InterfaceAlias $adapter -ResetServerAddresses
    
    # Renovar IP
    ipconfig /renew
    
    Write-Host "Configuració DHCP restaurada" -ForegroundColor Green
    Get-NetIPConfiguration -InterfaceAlias $adapter
}
```

---

### 8.5. Exercicis d'usuaris i grups

#### Exercici 14: Gestió d'usuaris locals

```powershell
# Verificar permisos d'administrador
$esAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $esAdmin) {
    Write-Host "⚠️ Aquest script requereix privilegis d'administrador" -ForegroundColor Red
    Write-Host "Executa PowerShell com a Administrador" -ForegroundColor Yellow
    exit
}

# a) Llistar usuaris
Write-Host "Usuaris locals del sistema:" -ForegroundColor Cyan
Get-LocalUser | Format-Table Name, Enabled, Description

# b) Crear usuari amb contrasenya
Write-Host "`nCreant usuari 'alumne_prova'..." -ForegroundColor Yellow
$password = ConvertTo-SecureString "Test123!" -AsPlainText -Force
try {
    New-LocalUser "alumne_prova" -Password $password -Description "Usuari de prova"
    Write-Host "✓ Usuari creat correctament" -ForegroundColor Green
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# c) Crear usuari sense contrasenya
Write-Host "`nCreant usuari 'alumne_convidat'..." -ForegroundColor Yellow
try {
    New-LocalUser "alumne_convidat" -NoPassword -Description "Usuari convidat"
    Write-Host "✓ Usuari creat correctament" -ForegroundColor Green
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# d) Desactivar usuari
Write-Host "`nDesactivant 'alumne_convidat'..." -ForegroundColor Yellow
Disable-LocalUser "alumne_convidat"
Get-LocalUser "alumne_convidat" | Format-Table Name, Enabled

# e) Eliminar usuaris
Write-Host "`nVoleu eliminar els usuaris creats? (S/N)" -ForegroundColor Yellow
$resposta = Read-Host
if ($resposta -eq "S") {
    Remove-LocalUser "alumne_prova" -ErrorAction SilentlyContinue
    Remove-LocalUser "alumne_convidat" -ErrorAction SilentlyContinue
    Write-Host "✓ Usuaris eliminats" -ForegroundColor Green
}
```

---

#### Exercici 15: Gestió de grups

```powershell
# Verificar permisos
$esAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $esAdmin) {
    Write-Host "⚠️ Requereix privilegis d'administrador" -ForegroundColor Red
    exit
}

$nomGrup = "Estudiants"

# a) Llistar grups
Write-Host "Grups locals:" -ForegroundColor Cyan
Get-LocalGroup | Format-Table Name, Description

# b) Crear grup
Write-Host "`nCreant grup '$nomGrup'..." -ForegroundColor Yellow
try {
    New-LocalGroup -Name $nomGrup -Description "Grup d'estudiants de prova"
    Write-Host "✓ Grup creat" -ForegroundColor Green
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# c) Afegir usuari actual
Write-Host "`nAfegint $env:USERNAME al grup..." -ForegroundColor Yellow
try {
    Add-LocalGroupMember -Group $nomGrup -Member $env:USERNAME
    Write-Host "✓ Usuari afegit" -ForegroundColor Green
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# d) Verificar membres
Write-Host "`nMembres del grup '$nomGrup':" -ForegroundColor Cyan
Get-LocalGroupMember -Group $nomGrup | Format-Table Name, ObjectClass

# e) Eliminar usuari del grup
Write-Host "`nEliminant usuari del grup..." -ForegroundColor Yellow
Remove-LocalGroupMember -Group $nomGrup -Member $env:USERNAME

# f) Eliminar grup
Write-Host "Eliminant grup..." -ForegroundColor Yellow
Remove-LocalGroup -Name $nomGrup
Write-Host "✓ Neteja completada" -ForegroundColor Green
```

---

### 8.6. Exercicis integradors

#### Exercici 16: Script de backup

```powershell
# SCRIPT COMPLET DE BACKUP
$data = Get-Date -Format "yyyy-MM-dd"
$carpetaBackup = "Backup_$data"
$carpetaOrigen = "$env:USERPROFILE\Documents"

Write-Host "=== SCRIPT DE BACKUP ===" -ForegroundColor Cyan
Write-Host "Origen: $carpetaOrigen" -ForegroundColor Gray
Write-Host "Destinació: $carpetaBackup`n" -ForegroundColor Gray

# a) Crear carpeta amb data
if (-not (Test-Path $carpetaBackup)) {
    New-Item -Path $carpetaBackup -ItemType Directory | Out-Null
    Write-Host "✓ Carpeta creada: $carpetaBackup" -ForegroundColor Green
}

# b) Copiar arxius .txt
Write-Host "`nCopiant arxius .txt..." -ForegroundColor Yellow
$arxius = Get-ChildItem $carpetaOrigen -Filter *.txt -ErrorAction SilentlyContinue

if ($arxius.Count -eq 0) {
    Write-Host "⚠️ No s'han trobat arxius .txt" -ForegroundColor Yellow
} else {
    Copy-Item $arxius -Destination $carpetaBackup
    Write-Host "✓ $($arxius.Count) arxius copiats" -ForegroundColor Green
}

# c) Comptar arxius
$quantitat = $arxius.Count

# d) Crear resum
$grandariaTotalBytes = ($arxius | Measure-Object -Property Length -Sum).Sum
$grandariaTotalKB = [math]::Round($grandariaTotalBytes/1KB, 2)
$grandariaTotalMB = [math]::Round($grandariaTotalBytes/1MB, 2)

$resum = @"
=== RESUM DEL BACKUP ===
Data i hora: $(Get-Date)
Carpeta origen: $carpetaOrigen
Carpeta destinació: $carpetaBackup

Nombre d'arxius: $quantitat
Grandària total: $grandariaTotalKB KB ($grandariaTotalMB MB)

Llista d'arxius:
$($arxius | ForEach-Object { "  - $($_.Name) ($([math]::Round($_.Length/1KB,2)) KB)" } | Out-String)
"@

# Guardar resum
$resum | Out-File "$carpetaBackup\resum.txt"

# Mostrar resum
Write-Host "`n$resum" -ForegroundColor Cyan
Write-Host "`n✓ Backup completat exitosament" -ForegroundColor Green
Write-Host "Resum guardat a: $carpetaBackup\resum.txt" -ForegroundColor Gray
```

---

#### Exercici 17: Auditoria del sistema

```powershell
# SCRIPT D'AUDITORIA COMPLETA DEL SISTEMA
$data = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$arxiuInforme = "Auditoria_$data.html"

Write-Host "=== GENERANT AUDITORIA DEL SISTEMA ===" -ForegroundColor Cyan

# 1. Top 10 processos per memòria
Write-Host "Analitzant processos..." -ForegroundColor Yellow
$top10Processos = Get-Process | 
    Sort-Object WorkingSet -Descending | 
    Select-Object -First 10 Name, 
        @{N="Memòria(MB)";E={[math]::Round($_.WorkingSet/1MB,2)}},
        @{N="CPU(s)";E={[math]::Round($_.CPU,2)}},
        Id

# 2. Serveis crítics
Write-Host "Comprovant serveis..." -ForegroundColor Yellow
$serviciosCritics = @("wuauserv", "EventLog", "W32Time", "Dhcp", "Dnscache", "LanmanServer", "LanmanWorkstation")
$estatServeis = foreach ($servei in $serviciosCritics) {
    Get-Service $servei -ErrorAction SilentlyContinue |
        Select-Object DisplayName, Status, StartType
}

# 3. Espai en disc
Write-Host "Analitzant discs..." -ForegroundColor Yellow
$espaciDisc = Get-PSDrive -PSProvider FileSystem | 
    Where-Object {$_.Used -gt 0} |
    Select-Object @{N="Unitat";E={$_.Name}}, 
        @{N="Usat(GB)";E={[math]::Round($_.Used/1GB,2)}},
        @{N="Lliure(GB)";E={[math]::Round($_.Free/1GB,2)}},
        @{N="Total(GB)";E={[math]::Round(($_.Used+$_.Free)/1GB,2)}},
        @{N="% Usat";E={[math]::Round(($_.Used/($_.Used+$_.Free))*100,1)}}

# 4. Informació de xarxa
Write-Host "Recopilant info de xarxa..." -ForegroundColor Yellow
$xarxaInfo = Get-NetIPConfiguration | 
    Where-Object {$_.IPv4Address.IPAddress -notlike "169.*"} |
    Select-Object InterfaceAlias, 
        @{N="IPv4";E={$_.IPv4Address.IPAddress}},
        @{N="Gateway";E={$_.IPv4DefaultGateway.NextHop}},
        @{N="DNS";E={($_.DNSServer.ServerAddresses | Where-Object {$_ -like "*.*"}) -join ", "}}

# 5. Informació del sistema
$infoSistema = Get-ComputerInfo | Select-Object CsName, WindowsVersion, OsArchitecture, 
    @{N="RAM Total(GB)";E={[math]::Round($_.OsTotalVisibleMemorySize/1MB,2)}},
    @{N="RAM Lliure(GB)";E={[math]::Round($_.OsFreePhysicalMemory/1MB,2)}}

# Crear HTML
$html = @"
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Auditoria del Sistema</title>
    <style>
        body { 
            font-family: 'Segoe UI', Arial, sans-serif; 
            margin: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background-color: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 { 
            color: #2E86AB; 
            border-bottom: 3px solid #2E86AB;
            padding-bottom: 10px;
        }
        h2 { 
            color: #06AED5; 
            margin-top: 30px;
            border-left: 4px solid #06AED5;
            padding-left: 10px;
        }
        table { 
            border-collapse: collapse; 
            width: 100%; 
            margin: 15px 0;
            background-color: white;
        }
        th { 
            background-color: #2E86AB; 
            color: white; 
            padding: 12px; 
            text-align: left;
            font-weight: bold;
        }
        td { 
            border: 1px solid #ddd; 
            padding: 10px; 
        }
        tr:nth-child(even) { 
            background-color: #f9f9f9; 
        }
        tr:hover {
            background-color: #e8f4f8;
        }
        .data { 
            color: #666; 
            font-style: italic;
            margin-bottom: 20px;
        }
        .info-box {
            background-color: #e8f4f8;
            border-left: 4px solid #06AED5;
            padding: 15px;
            margin: 15px 0;
        }
        .warning {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
        }
        .success {
            background-color: #d4edda;
            border-left: 4px solid #28a745;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📊 Auditoria del Sistema</h1>
        <p class="data">Generat el: $(Get-Date -Format "dd/MM/yyyy HH:mm:ss")</p>
        
        <div class="info-box">
            <h3>Informació del Sistema</h3>
            $($infoSistema | ConvertTo-Html -Fragment -As List)
        </div>
        
        <h2>💻 Top 10 Processos per Ús de Memòria</h2>
        $($top10Processos | ConvertTo-Html -Fragment)
        
        <h2>⚙️ Estat de Serveis Crítics</h2>
        $($estatServeis | ConvertTo-Html -Fragment)
        
        <h2>💾 Espai en Disc</h2>
        $($espaciDisc | ConvertTo-Html -Fragment)
        
        <h2>🌐 Configuració de Xarxa</h2>
        $($xarxaInfo | ConvertTo-Html -Fragment)
        
        <div class="info-box success">
            <strong>✓ Auditoria completada exitosament</strong><br>
            Total de processos analitzats: $(Get-Process | Measure-Object | Select-Object -ExpandProperty Count)<br>
            Serveis actius: $(Get-Service | Where-Object {$_.Status -eq "Running"} | Measure-Object | Select-Object -ExpandProperty Count)
        </div>
    </div>
</body>
</html>
"@

# Guardar i obrir l'informe
$html | Out-File $arxiuInforme -Encoding UTF8
Write-Host "`n✓ Informe generat: $arxiuInforme" -ForegroundColor Green

# Obrir automàticament
Start-Process $arxiuInforme
Write-Host "Obrint informe al navegador..." -ForegroundColor Cyan
```

---

#### Exercici 18: Desafiament final - Organitzador automàtic

```powershell
# ORGANITZADOR AUTOMÀTIC D'ARXIUS
$carpetaOrigen = "C:\Temp\Descarregues_Prova"  # AJUSTAR RUTA

# Verificar que existeix la carpeta
if (-not (Test-Path $carpetaOrigen)) {
    Write-Host "⚠️ La carpeta $carpetaOrigen no existeix" -ForegroundColor Red
    Write-Host "Creant carpeta de prova..." -ForegroundColor Yellow
    New-Item -Path $carpetaOrigen -ItemType Directory | Out-Null
    
    # Crear arxius de prova
    "Contingut prova" | Out-File "$carpetaOrigen\document1.pdf"
    "Contingut prova" | Out-File "$carpetaOrigen\imatge1.jpg"
    "Contingut prova" | Out-File "$carpetaOrigen\video1.mp4"
    "Contingut prova" | Out-File "$carpetaOrigen\arxiu.txt"
    "Contingut prova" | Out-File "$carpetaOrigen\dades.xlsx"
    Write-Host "✓ Arxius de prova creats" -ForegroundColor Green
}

Write-Host "`n=== ORGANITZADOR AUTOMÀTIC D'ARXIUS ===" -ForegroundColor Cyan
Write-Host "Carpeta: $carpetaOrigen`n" -ForegroundColor Gray

# Definir categories i extensions
$categories = @{
    "Imatges" = @(".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg", ".webp")
    "Documents" = @(".pdf", ".docx", ".doc", ".txt", ".xlsx", ".xls", ".pptx", ".odt")
    "Videos" = @(".mp4", ".avi", ".mkv", ".mov", ".wmv", ".flv")
    "Audio" = @(".mp3", ".wav", ".flac", ".aac", ".ogg")
    "Comprimits" = @(".zip", ".rar", ".7z", ".tar", ".gz")
    "Executables" = @(".exe", ".msi", ".bat", ".cmd", ".ps1")
    "Altres" = @()
}

# Crear carpetes de destinació
Write-Host "Creant carpetes..." -ForegroundColor Yellow
foreach ($categoria in $categories.Keys) {
    $ruta = Join-Path $carpetaOrigen $categoria
    if (-not (Test-Path $ruta)) {
        New-Item -Path $ruta -ItemType Directory | Out-Null
        Write-Host "  ✓ $categoria" -ForegroundColor Green
    }
}

# Processar arxius
Write-Host "`nOrganitzant arxius..." -ForegroundColor Yellow
$informe = @()
$arxius = Get-ChildItem $carpetaOrigen -File

foreach ($arxiu in $arxius) {
    $extensio = $arxiu.Extension.ToLower()
    $desti = "Altres"  # Per defecte
    
    # Determinar categoria
    foreach ($categoria in $categories.Keys) {
        if ($categories[$categoria] -contains $extensio) {
            $desti = $categoria
            break
        }
    }
    
    # Moure arxiu
    $rutaDesti = Join-Path $carpetaOrigen $desti
    try {
        $rutaCompleta = Join-Path $rutaDesti $arxiu.Name
        
        # Si existeix, afegir número
        if (Test-Path $rutaCompleta) {
            $nomSenseExt = [System.IO.Path]::GetFileNameWithoutExtension($arxiu.Name)
            $i = 1
            do {
                $nouNom = "$nomSenseExt`_$i$extensio"
                $rutaCompleta = Join-Path $rutaDesti $nouNom
                $i++
            } while (Test-Path $rutaCompleta)
        }
        
        Move-Item $arxiu.FullName -Destination $rutaCompleta
        
        $informe += [PSCustomObject]@{
            Arxiu = $arxiu.Name
            Extensio = $extensio
            Categoria = $desti
            'Grandària(KB)' = [math]::Round($arxiu.Length/1KB, 2)
            Estat = "✓ OK"
        }
        
        Write-Host "  ✓ $($arxiu.Name) → $desti" -ForegroundColor Green
    }
    catch {
        $informe += [PSCustomObject]@{
            Arxiu = $arxiu.Name
            Extensio = $extensio
            Categoria = $desti
            'Grandària(KB)' = 0
            Estat = "✗ ERROR"
        }
        Write-Host "  ✗ Error amb $($arxiu.Name): $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Generar informe
Write-Host "`n=== INFORME D'ORGANITZACIÓ ===" -ForegroundColor Cyan
Write-Host "Data: $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')" -ForegroundColor Gray
Write-Host "Arxius processats: $($arxius.Count)`n" -ForegroundColor Gray

$informe | Format-Table -AutoSize

# Guardar informe CSV
$informe | Export-Csv "$carpetaOrigen\informe_organitzacio.csv" -NoTypeInformation -Delimiter ";"
Write-Host "Informe CSV guardat" -ForegroundColor Gray

# Resum per categoria
Write-Host "`n=== RESUM PER CATEGORIA ===" -ForegroundColor Cyan
$resum = $informe | Group-Object Categoria | 
    Select-Object @{N="Categoria";E={$_.Name}}, 
                  @{N="Quantitat";E={$_.Count}},
                  @{N="Grandària Total(KB)";E={[math]::Round(($_.Group | Measure-Object -Property 'Grandària(KB)' -Sum).Sum, 2)}}

$resum | Format-Table -AutoSize

# Crear informe HTML
$htmlInforme = @"
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Informe d'Organització d'Arxius</title>
    <style>
        body { font-family: Arial; margin: 20px; background-color: #f5f5f5; }
        .container { background-color: white; padding: 20px; border-radius: 8px; }
        h1 { color: #2E86AB; }
        h2 { color: #06AED5; }
        table { border-collapse: collapse; width: 100%; margin: 15px 0; }
        th { background-color: #2E86AB; color: white; padding: 10px; }
        td { border: 1px solid #ddd; padding: 8px; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .success { color: green; }
        .error { color: red; }
    </style>
</head>
<body>
    <div class="container">
        <h1>📁 Informe d'Organització d'Arxius</h1>
        <p>Data: $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')</p>
        <p>Carpeta: $carpetaOrigen</p>
        
        <h2>Resum per Categoria</h2>
        $($resum | ConvertTo-Html -Fragment)
        
        <h2>Detall d'Arxius</h2>
        $($informe | ConvertTo-Html -Fragment)
    </div>
</body>
</html>
"@

$htmlInforme | Out-File "$carpetaOrigen\informe_organitzacio.html" -Encoding UTF8

Write-Host "`n✓ Organització completada" -ForegroundColor Green
Write-Host "Informes guardats a la carpeta principal" -ForegroundColor Gray
```

---

## Criteris d'avaluació

### Distribució de la nota

| Bloc d'exercicis | Percentatge | Descripció |
|------------------|-------------|------------|
| Bàsics (1-5) | 20% | Navegació, arxius bàsics |
| Intermedis (6-12) | 40% | CSV, processos, xarxa |
| Avançats (13-15) | 20% | Configuració, usuaris |
| Integradors (16-18) | 20% | Scripts complets |

### Rúbrica d'avaluació

| Criteri | Insuficient (0-4) | Suficient (5-6) | Notable (7-8) | Excel·lent (9-10) |
|---------|-------------------|-----------------|---------------|-------------------|
| **Sintaxis** | Errors freqüents que impedeixen execució | Sintaxis correcta amb ajuda ocasional | Sintaxis correcta de forma autònoma | Sintaxis perfecta i elegant |
| **Eficiència** | Solucions funcionals però ineficients | Solucions funcionals adequades | Solucions eficients i optimitzades | Solucions òptimes i professionals |
| **Documentació** | Sense comentaris ni explicació | Comentaris bàsics | Documentació clara i completa | Excel·lent documentació amb exemples |
| **Autonomia** | Necessita molta ajuda constant | Necessita ajuda puntual | Molt autònom amb dubtes ocasionals | Totalment autònom i capaç d'ajudar altres |
| **Gestió d'errors** | No contempla errors | Gestió bàsica d'errors | Bona gestió d'errors previsibles | Gestió exhaustiva i missatges clars |

---

## Recursos addicionals per al professor

### Exercicis extra per alumnes avançats

1. **Monitorització en temps real:**
   - Crear un script que mostre l'estat del sistema cada X segons
   - Alertes quan algun valor supere un llindar

2. **Automatització amb Chocolatey:**
   - Instal·lar software des de PowerShell
   - Crear scripts d'instal·lació desatesos

3. **Inventari de hardware:**
   - Recopilar tota la informació del hardware
   - Exportar a diferents formats (CSV, HTML, JSON)

4. **Active Directory (si està disponible):**
   - Crear usuaris en massa des de CSV
   - Gestionar grups i OUs
   - Generar informes d'usuaris

### Enlaces útils

- **Microsoft Learn PowerShell:** https://learn.microsoft.com/powershell/
- **PowerShell Gallery:** https://www.powershellgallery.com/
- **GitHub PowerShell:** https://github.com/PowerShell/PowerShell
- **Reddit r/PowerShell:** https://www.reddit.com/r/PowerShell/
- **SS64 PowerShell:** https://ss64.com/ps/
- **PowerShell.org:** https://powershell.org/

### Comandos avanzats per demostracions

```powershell
# Monitoritzar canvis en un directori en temps real
Get-ChildItem C:\Temp -Recurse | 
    Where-Object {$_.LastWriteTime -gt (Get-Date).AddMinutes(-5)}

# Informació completa del sistema
Get-ComputerInfo | Select-Object CsName, WindowsVersion, OsTotalVisibleMemorySize

# Crear una tasca programada
$trigger = New-JobTrigger -AtStartup
Register-ScheduledJob -Name "ElMeuScript" -Trigger $trigger -FilePath "C:\Scripts\inici.ps1"

# Treballar amb APIs REST
Invoke-RestMethod -Uri "https://api.github.com/users/microsoft"

# Exportar esdeveniments del sistema
Get-EventLog -LogName System -Newest 100 | 
    Export-Csv esdeveniments_sistema.csv -NoTypeInformation

# Comparar arxius
Compare-Object (Get-Content fitxer1.txt) (Get-Content fitxer2.txt)

# Generar contrasenya aleatòria
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 12 | ForEach-Object {[char]$_})

# Comprimir arxius
Compress-Archive -Path C:\Dades\* -DestinationPath C:\Backup\dades.zip

# Descomprimir arxius
Expand-Archive -Path arxiu.zip -DestinationPath C:\Desti\
```

### Consells per a la pràctica

1. **Començar per la teoria:** 10-15 minuts d'explicació abans de practicar
2. **Demostració en directe:** Mostrar cada comanda abans que la proven
3. **Pràctica guiada:** Fer els primers exercicis junts pas a pas
4. **Pràctica autònoma:** Deixar que practiquen sols amb supervisió
5. **Posada en comú:** Revisar solucions i discutir alternatives

### Errors comuns i com abordar-los

| Error | Causa | Solució pedagògica |
|-------|-------|-------------------|
| "No se reconoce como comando" | Error de sintaxis o àlies incorrecte | Revisar Get-Alias i Get-Command |
| Permisos denegats | No és administrador | Explicar UAC i executar com admin |
| Ruta no trobada | Error en el path | Ensenyar paths absoluts vs relatius |
| Paràmetre obligatori falta | No han posat tots els paràmetres | Revisar Get-Help del cmdlet |
| L'objecte no té la propietat | Error en piping | Explicar Get-Member i objectes |

---

**Molta sort impartint PowerShell! 🎓**
