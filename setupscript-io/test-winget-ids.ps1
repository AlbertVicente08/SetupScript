# Script para validar IDs de Winget definidos en src/data/apps.ts
$ErrorActionPreference = "Continue"

# Configurar codificación para salida correcta
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$appsFile = "src/data/apps.ts"

if (-not (Test-Path $appsFile)) {
    Write-Error "No se encontro el archivo $appsFile. Asegurate de ejecutar este script desde la raiz del proyecto."
    Read-Host "`nPresiona Enter para cerrar"
    exit 1
}

Write-Host "Leyendo $appsFile..." -ForegroundColor Cyan

$content = Get-Content $appsFile -Raw
# Extraer IDs usando Regex
$matches = [Regex]::Matches($content, 'wingetId:\s*"([^"]+)"')
$ids = $matches | ForEach-Object { $_.Groups[1].Value }

if ($ids.Count -eq 0) {
    Write-Warning "No se encontraron IDs en $appsFile."
    Read-Host "`nPresiona Enter para cerrar"
    exit
}

Write-Host "Se encontraron $($ids.Count) IDs para validar." -ForegroundColor Cyan
Write-Host "Esto puede tardar unos minutos...`n" -ForegroundColor Gray

$validIds = @()
$invalidIds = @()

foreach ($id in $ids) {
    Write-Host "Validando: $id ... " -NoNewline
    
    # Ejecutar winget show
    $null = winget show --id $id --accept-source-agreements 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK]" -ForegroundColor Green
        $validIds += $id
    }
    else {
        Write-Host "[ERROR]" -ForegroundColor Red
        $invalidIds += $id
    }
}

Write-Host ""
Write-Host "======================================================" -ForegroundColor White
Write-Host "|                 RESUMEN DE VALIDACION              |" -ForegroundColor White
Write-Host "======================================================" -ForegroundColor White
Write-Host ""
Write-Host "Total IDs: $($ids.Count)"
Write-Host "Validos:   $($validIds.Count)" -ForegroundColor Green
Write-Host "Invalidos: $($invalidIds.Count)" -ForegroundColor Red

if ($invalidIds.Count -gt 0) {
    Write-Host ""
    Write-Host "LISTA DE IDS CON ERROR:" -ForegroundColor Red
    foreach ($badId in $invalidIds) {
        Write-Host "  [X] $badId" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "Sugerencia: Revisa los IDs en 'src/data/apps.ts' o verificalos manualmente con 'winget search'." -ForegroundColor Gray
}
else {
    Write-Host ""
    Write-Host "¡Perfecto! Todos los IDs son validos." -ForegroundColor Green
}

Write-Host "`n======================================================" -ForegroundColor White
Read-Host "Presiona Enter para cerrar"
exit ($invalidIds.Count)
