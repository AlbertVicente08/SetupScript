// src/lib/scriptGenerator.ts

import { App } from "@/data/apps";
import { SystemTweak } from "@/data/tweaks";

const FREE_NAGWARE = `
Write-Host ""
Write-Host "  ╔════════════════════════════════════════════════════╗" -ForegroundColor Red
Write-Host "  ║       VERSIÓN GRATUITA — SetupScript.io            ║" -ForegroundColor Red
Write-Host "  ║   ¿Quieres eliminar esta espera y ganar FPS?       ║" -ForegroundColor Red
Write-Host "  ║       Compra el GOD MODE por solo $9               ║" -ForegroundColor Red
Write-Host "  ║            setupscript.io/pricing                  ║" -ForegroundColor Red
Write-Host "  ╚════════════════════════════════════════════════════╝" -ForegroundColor Red
Write-Host ""
Write-Host "  Esperando 15 segundos..." -ForegroundColor Yellow
Start-Sleep -Seconds 15
Write-Host ""
`;

const SCRIPT_HEADER = `<#
.SYNOPSIS
    Script generado por SetupScript.io
.DESCRIPTION
    Instala aplicaciones y aplica tweaks de sistema automáticamente.
    Generado el: {DATE}
    
    ⚠️  INSTRUCCIONES DE USO:
    1. Haz clic derecho en el archivo .ps1 y selecciona "Ejecutar con PowerShell"
    2. O simplemente ejecuta el archivo setup.bat incluido.
    
    Este script fue generado en SetupScript.io - https://setupscript.io
#>

# ─────────────────────────────────────────────────────────────────
# AUTO-ELEVACIÓN A ADMINISTRADOR
# ─────────────────────────────────────────────────────────────────
if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    $arguments = "& '" + $myinvocation.mycommand.definition + "'"
    Start-Process powershell -Verb runAs -ArgumentList $arguments
    Break
}

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
Read-Host "Presiona Enter para cerrar"
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
  isProUser?: boolean;
}

// IDs de tweaks permitidos en free tier
const FREE_ALLOWED_TWEAKS = [
  "enable_dark_mode",
  "show_file_extensions",
  "show_hidden_files",
  "taskbar_left_windows11",
];

export function generateScript({
  selectedApps,
  selectedTweaks,
  isProUser = false,
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

  // ── NAGWARE para Free Users ──
  if (!isProUser) {
    script += FREE_NAGWARE;
  }

  // Filtrar tweaks según tier
  let tweaksToApply = selectedTweaks;
  if (!isProUser) {
    tweaksToApply = selectedTweaks.filter((t) =>
      FREE_ALLOWED_TWEAKS.includes(t.id),
    );
  }

  // Sección de Apps
  if (selectedApps.length > 0) {
    script += APPS_SECTION_HEADER;

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
  if (tweaksToApply.length > 0) {
    script += TWEAKS_SECTION_HEADER;
    for (const tweak of tweaksToApply) {
      script += generateTweakBlock(tweak);
    }
  }

  // Mostrar tweaks omitidos si es free
  if (!isProUser) {
    const skippedTweaks = selectedTweaks.filter(
      (t) => !FREE_ALLOWED_TWEAKS.includes(t.id),
    );
    if (skippedTweaks.length > 0) {
      script += `\n
# ─────────────────────────────────────────────────────────────────
# ⚠️  TWEAKS OMITIDOS (Requieren GOD MODE)
# ─────────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "  ⚠️  Se omitieron ${skippedTweaks.length} tweak(s) que requieren GOD MODE:" -ForegroundColor Yellow`;
      for (const t of skippedTweaks) {
        script += `\nWrite-Host "     🔒 ${t.name}" -ForegroundColor DarkGray`;
      }
      script += `\nWrite-Host "  👉 Compra GOD MODE en setupscript.io/pricing" -ForegroundColor Red\nWrite-Host ""`;
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
  const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
  const encoder = new TextEncoder();
  const encoded = encoder.encode(scriptContent);
  const withBom = new Uint8Array(bom.length + encoded.length);
  withBom.set(bom, 0);
  withBom.set(encoded, bom.length);

  const blob = new Blob([withBom], { type: "application/octet-stream" });
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

// Función para generar el contenido del archivo batch launcher

