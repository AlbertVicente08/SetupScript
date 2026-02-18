// src/lib/scriptGenerator.ts

import { App } from "@/data/apps";
import { SystemTweak } from "@/data/tweaks";

const SCRIPT_HEADER = `#Requires -RunAsAdministrator
<#
.SYNOPSIS
    Script generado por SetupScript.io
.DESCRIPTION
    Instala aplicaciones y aplica tweaks de sistema automáticamente.
    Generado el: {DATE}
    
    ⚠️  INSTRUCCIONES DE USO:
    1. Haz clic derecho en el archivo .ps1
    2. Selecciona "Ejecutar con PowerShell"
    3. Si aparece un aviso de seguridad, escribe: Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
    4. Acepta los permisos de administrador cuando se soliciten.
    
    Este script fue generado en SetupScript.io - https://setupscript.io
#>

# ─────────────────────────────────────────────────────────────────
# CONFIGURACIÓN INICIAL
# ─────────────────────────────────────────────────────────────────
$ErrorActionPreference = "Continue"
$ProgressPreference = "SilentlyContinue"
$errors = @()

Write-Host ""
Write-Host "  ╔═══════════════════════════════════════════════════╗" -ForegroundColor Red
Write-Host "  ║         SetupScript.io — Setup Automático        ║" -ForegroundColor Red
Write-Host "  ╚═══════════════════════════════════════════════════╝" -ForegroundColor Red
Write-Host "  Iniciando instalación automatizada..." -ForegroundColor White
Write-Host ""

# Verificar permisos de administrador
if (-NOT ([Security.Principal.WindowsPrincipal]
  [Security.Principal.WindowsIdentity]::GetCurrent()
).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
  Write-Error "Ejecuta este script como Administrador." -ErrorAction Stop
}
Write-Host "[OK] Permisos verificados." -ForegroundColor Green

# Verificar winget disponible
if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] winget no está disponible. Instala 'App Installer' desde Microsoft Store." -ForegroundColor Red
    exit 1
}

Write-Host "[OK] winget detectado. Procediendo con instalaciones..." -ForegroundColor Green
Write-Host ""
`;

const APPS_SECTION_HEADER = `
# ─────────────────────────────────────────────────────────────────
# SECCIÓN 1: INSTALACIÓN DE APLICACIONES
# ─────────────────────────────────────────────────────────────────
Write-Host "INSTALANDO APLICACIONES..." -ForegroundColor Magenta
`;

const TWEAKS_SECTION_HEADER = `
# ─────────────────────────────────────────────────────────────────
# SECCIÓN 2: TWEAKS DE SISTEMA
# ─────────────────────────────────────────────────────────────────
Write-Host "APLICANDO TWEAKS DE SISTEMA..." -ForegroundColor Red
`;

const SCRIPT_FOOTER = `
# ─────────────────────────────────────────────────────────────────
# FINALIZACIÓN
# ─────────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Red
if ($errors.Count -eq 0) {
    Write-Host "  [OK] Setup completado sin errores." -ForegroundColor Green
} else {
    Write-Host "  [!!] Errores en: $($errors -join ', ')" -ForegroundColor Yellow
}
Write-Host "  Generado por SetupScript.io" -ForegroundColor Magenta
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Red
Write-Host ""
Write-Host "Presiona cualquier tecla para cerrar..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
`;

export function generateInstallBlock(app: App): string {
  return `
Write-Host "  → Instalando ${app.name}..." -ForegroundColor White
winget install --id ${app.wingetId} --silent --accept-package-agreements --accept-source-agreements
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✅ ${app.name} instalado correctamente." -ForegroundColor Green
} else {
    $errors += "${app.name}"
    Write-Host "  ⚠️  ${app.name} - ya instalado o error (código: $LASTEXITCODE)" -ForegroundColor Yellow
}`;
}

export function generateTweakBlock(tweak: SystemTweak): string {
  let block = "";

  if (tweak.risk === "high") {
    block += `
Write-Warning "[ADVERTENCIA] Este tweak es difícil de revertir: ${tweak.name}"
$confirm = Read-Host "¿Continuar? (s/N)"
if ($confirm -ne 's') { Write-Host "Omitido." -ForegroundColor Gray }
else {
`;
  }

  block += `
Write-Host "  → Aplicando: ${tweak.name}..." -ForegroundColor White
# REVERTIR CON: ${tweak.revertCommand.split("\n")[0]}
${tweak.applyCommand}
Write-Host "  ✅ ${tweak.name} - aplicado." -ForegroundColor Green`;

  if (tweak.risk === "high") {
    block += `
}`;
  }

  if (tweak.requiresReboot) {
    block += `
Write-Host "  ⚠️  Requiere reinicio para surtir efecto." -ForegroundColor Yellow`;
  }

  return block;
}

export interface GeneratorInput {
  selectedApps: App[];
  selectedTweaks: SystemTweak[];
}

export function generateScript({
  selectedApps,
  selectedTweaks,
}: GeneratorInput): string {
  if (selectedApps.length === 0 && selectedTweaks.length === 0) {
    return "# Selecciona aplicaciones o tweaks para generar tu script.";
  }

  const date = new Date().toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  let script = SCRIPT_HEADER.replace("{DATE}", date);

  // Sección de Apps
  if (selectedApps.length > 0) {
    script += APPS_SECTION_HEADER;

    // Agrupar por categoría para mejor legibilidad
    const byCategory = selectedApps.reduce(
      (acc, app) => {
        if (!acc[app.category]) acc[app.category] = [];
        acc[app.category].push(app);
        return acc;
      },
      {} as Record<string, App[]>,
    );

    for (const [category, apps] of Object.entries(byCategory)) {
      script += `\n# ${category.toUpperCase().replace("_", " ")}\n`;
      for (const app of apps) {
        script += generateInstallBlock(app);
      }
    }
  }

  // Sección de Tweaks
  if (selectedTweaks.length > 0) {
    script += TWEAKS_SECTION_HEADER;
    for (const tweak of selectedTweaks) {
      script += generateTweakBlock(tweak);
    }
  }

  script += SCRIPT_FOOTER;
  return script;
}

// Función para descargar el script como archivo .ps1
export function downloadScript(
  scriptContent: string,
  filename = "setupscript.ps1",
): void {
  const blob = new Blob([scriptContent], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Función para copiar al portapapeles
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
