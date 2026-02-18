// src/data/tweaks.ts

export type TweakCategory = "privacy" | "performance" | "appearance" | "bloatware";

export type TweakRisk = "low" | "medium" | "high";

export interface SystemTweak {
  id: string;
  name: string;
  description: string;
  category: TweakCategory;
  risk: TweakRisk;
  icon: string;
  applyCommand: string;
  revertCommand: string;
  requiresReboot: boolean;
  windowsVersion: "10" | "11" | "10/11";
}

export const TWEAK_CATEGORY_LABELS: Record<TweakCategory, string> = {
  privacy: "Privacidad",
  performance: "Rendimiento",
  appearance: "Apariencia",
  bloatware: "Bloatware",
};

export const TWEAK_CATEGORY_ICONS: Record<TweakCategory, string> = {
  privacy: "ShieldOff",
  performance: "Zap",
  appearance: "Palette",
  bloatware: "Trash2",
};

export const SYSTEM_TWEAKS: SystemTweak[] = [
  // ── PRIVACY ───────────────────────────────────────────────────────────────
  {
    id: "disable_telemetry",
    name: "Desactivar Telemetría de Windows",
    description:
      "Evita que Windows envíe datos de uso y diagnóstico a Microsoft.",
    category: "privacy",
    risk: "medium",
    icon: "EyeOff",
    applyCommand: `# Desactivar Telemetría
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection" /v AllowTelemetry /t REG_DWORD /d 0 /f
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\DataCollection" /v AllowTelemetry /t REG_DWORD /d 0 /f
sc config DiagTrack start= disabled
sc stop DiagTrack`,
    revertCommand: `# Revertir Telemetría
reg delete "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection" /v AllowTelemetry /f
sc config DiagTrack start= auto
sc start DiagTrack`,
    requiresReboot: false,
    windowsVersion: "10/11",
  },
  {
    id: "disable_cortana",
    name: "Desactivar Cortana",
    description:
      "Deshabilita el asistente de voz de Microsoft para mejorar privacidad y rendimiento.",
    category: "privacy",
    risk: "low",
    icon: "MicOff",
    applyCommand: `# Desactivar Cortana
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search" /v AllowCortana /t REG_DWORD /d 0 /f
reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Search" /v CortanaEnabled /t REG_DWORD /d 0 /f`,
    revertCommand: `# Revertir Cortana
reg delete "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search" /v AllowCortana /f
reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Search" /v CortanaEnabled /t REG_DWORD /d 1 /f`,
    requiresReboot: false,
    windowsVersion: "10/11",
  },
  {
    id: "disable_advertising_id",
    name: "Desactivar ID Publicitario",
    description:
      "Impide que las apps rastreen tu comportamiento para anuncios personalizados.",
    category: "privacy",
    risk: "low",
    icon: "ShieldOff",
    applyCommand: `# Desactivar ID Publicitario
reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\AdvertisingInfo" /v Enabled /t REG_DWORD /d 0 /f`,
    revertCommand: `# Revertir ID Publicitario
reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\AdvertisingInfo" /v Enabled /t REG_DWORD /d 1 /f`,
    requiresReboot: false,
    windowsVersion: "10/11",
  },
  {
    id: "disable_activity_history",
    name: "Desactivar Historial de Actividad",
    description:
      "Elimina el seguimiento de actividades y la línea de tiempo de Windows.",
    category: "privacy",
    risk: "low",
    icon: "Clock",
    applyCommand: `# Desactivar Historial de Actividad
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System" /v EnableActivityFeed /t REG_DWORD /d 0 /f
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System" /v PublishUserActivities /t REG_DWORD /d 0 /f`,
    revertCommand: `# Revertir Historial de Actividad
reg delete "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System" /v EnableActivityFeed /f
reg delete "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System" /v PublishUserActivities /f`,
    requiresReboot: false,
    windowsVersion: "10/11",
  },

  // ── APPEARANCE ────────────────────────────────────────────────────────────
  {
    id: "enable_dark_mode",
    name: "Activar Modo Oscuro",
    description:
      "Habilita el tema oscuro del sistema para apps y el explorador de Windows.",
    category: "appearance",
    risk: "low",
    icon: "Moon",
    applyCommand: `# Activar Modo Oscuro del Sistema
reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v AppsUseLightTheme /t REG_DWORD /d 0 /f
reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v SystemUsesLightTheme /t REG_DWORD /d 0 /f`,
    revertCommand: `# Revertir a Modo Claro
reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v AppsUseLightTheme /t REG_DWORD /d 1 /f
reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v SystemUsesLightTheme /t REG_DWORD /d 1 /f`,
    requiresReboot: false,
    windowsVersion: "10/11",
  },
  {
    id: "show_file_extensions",
    name: "Mostrar Extensiones de Archivo",
    description:
      "Muestra las extensiones de todos los archivos en el Explorador (recomendado para seguridad).",
    category: "appearance",
    risk: "low",
    icon: "Eye",
    applyCommand: `# Mostrar Extensiones de Archivo
reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v HideFileExt /t REG_DWORD /d 0 /f`,
    revertCommand: `# Ocultar Extensiones de Archivo
reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v HideFileExt /t REG_DWORD /d 1 /f`,
    requiresReboot: false,
    windowsVersion: "10/11",
  },
  {
    id: "show_hidden_files",
    name: "Mostrar Archivos Ocultos",
    description:
      "Hace visibles los archivos y carpetas ocultos del sistema en el Explorador.",
    category: "appearance",
    risk: "low",
    icon: "FolderOpen",
    applyCommand: `# Mostrar Archivos Ocultos
reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v Hidden /t REG_DWORD /d 1 /f`,
    revertCommand: `# Ocultar Archivos Ocultos
reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v Hidden /t REG_DWORD /d 2 /f`,
    requiresReboot: false,
    windowsVersion: "10/11",
  },
  {
    id: "taskbar_left_windows11",
    name: "Alinear Taskbar a la Izquierda (Win 11)",
    description:
      "Mueve los iconos de la barra de tareas de Windows 11 al estilo clásico (izquierda).",
    category: "appearance",
    risk: "low",
    icon: "AlignLeft",
    applyCommand: `# Taskbar a la izquierda en Windows 11
reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v TaskbarAl /t REG_DWORD /d 0 /f`,
    revertCommand: `# Taskbar centrada en Windows 11
reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v TaskbarAl /t REG_DWORD /d 1 /f`,
    requiresReboot: false,
    windowsVersion: "11",
  },

  // ── PERFORMANCE ───────────────────────────────────────────────────────────
  {
    id: "disable_startup_delay",
    name: "Eliminar Delay de Inicio",
    description:
      "Elimina el retraso artificial al iniciar apps del startup de Windows.",
    category: "performance",
    risk: "low",
    icon: "Zap",
    applyCommand: `# Eliminar Delay de Inicio de Windows
reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Serialize" /v StartupDelayInMSec /t REG_DWORD /d 0 /f`,
    revertCommand: `# Restaurar Delay de Inicio
reg delete "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Serialize" /v StartupDelayInMSec /f`,
    requiresReboot: false,
    windowsVersion: "10/11",
  },
  {
    id: "disable_xbox_game_dvr",
    name: "Desactivar Xbox Game DVR",
    description:
      "Deshabilita la grabación en background de Xbox para ganar rendimiento en juegos.",
    category: "performance",
    risk: "low",
    icon: "Gamepad2",
    applyCommand: `# Desactivar Xbox Game DVR
reg add "HKCU\\System\\GameConfigStore" /v GameDVR_Enabled /t REG_DWORD /d 0 /f
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\GameDVR" /v AllowGameDVR /t REG_DWORD /d 0 /f`,
    revertCommand: `# Reactivar Xbox Game DVR
reg add "HKCU\\System\\GameConfigStore" /v GameDVR_Enabled /t REG_DWORD /d 1 /f
reg delete "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\GameDVR" /v AllowGameDVR /f`,
    requiresReboot: false,
    windowsVersion: "10/11",
  },
  {
    id: "enable_ultimate_performance",
    name: "Plan de Energía: Máximo Rendimiento",
    description:
      "Activa el plan de energía oculto 'Máximo Rendimiento' de Windows (ideal para sobremesa).",
    category: "performance",
    risk: "medium",
    icon: "Battery",
    applyCommand: `# Activar Plan de Energía de Máximo Rendimiento
powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61
powercfg /setactive e9a42b02-d5df-448d-aa00-03f14749eb61`,
    revertCommand: `# Volver al plan Equilibrado
powercfg /setactive 381b4222-f694-41f0-9685-ff5bb260df2e`,
    requiresReboot: false,
    windowsVersion: "10/11",
  },

  // ── BLOATWARE ─────────────────────────────────────────────────────────────
  {
    id: "remove_onedrive",
    name: "Eliminar OneDrive",
    description:
      "Desinstala OneDrive y evita que se reinstale automáticamente.",
    category: "bloatware",
    risk: "medium",
    icon: "CloudOff",
    applyCommand: `# Eliminar OneDrive
taskkill /f /im OneDrive.exe 2>$null
Start-Sleep -Seconds 2
if (Test-Path "$env:SYSTEMROOT\\System32\\OneDriveSetup.exe") {
  & "$env:SYSTEMROOT\\System32\\OneDriveSetup.exe" /uninstall
}
if (Test-Path "$env:SYSTEMROOT\\SysWOW64\\OneDriveSetup.exe") {
  & "$env:SYSTEMROOT\\SysWOW64\\OneDriveSetup.exe" /uninstall
}
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\OneDrive" /v DisableFileSyncNGSC /t REG_DWORD /d 1 /f`,
    revertCommand: `# Reinstalar OneDrive (descargar desde Microsoft)
reg delete "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\OneDrive" /v DisableFileSyncNGSC /f
Start-Process "winget" -ArgumentList "install Microsoft.OneDrive" -Wait`,
    requiresReboot: false,
    windowsVersion: "10/11",
  },
  {
    id: "remove_bloatware_apps",
    name: "Eliminar Apps Preinstaladas",
    description:
      "Desinstala apps de Windows que vienen preinstaladas y nadie usa (Xbox, Maps, News, etc.).",
    category: "bloatware",
    risk: "medium",
    icon: "Trash2",
    applyCommand: `# Eliminar Bloatware de Windows
$bloatwareApps = @(
  "Microsoft.BingNews",
  "Microsoft.BingWeather",
  "Microsoft.GamingApp",
  "Microsoft.GetHelp",
  "Microsoft.Getstarted",
  "Microsoft.MicrosoftOfficeHub",
  "Microsoft.MicrosoftSolitaireCollection",
  "Microsoft.People",
  "Microsoft.Todos",
  "Microsoft.WindowsFeedbackHub",
  "Microsoft.WindowsMaps",
  "Microsoft.YourPhone",
  "Microsoft.ZuneMusic",
  "Microsoft.ZuneVideo",
  "MicrosoftTeams"
)
foreach ($app in $bloatwareApps) {
  Write-Host "Removiendo: $app"
  Get-AppxPackage -Name $app -AllUsers | Remove-AppxPackage -AllUsers -ErrorAction SilentlyContinue
  Get-AppxProvisionedPackage -Online | Where-Object DisplayName -like $app | Remove-AppxProvisionedPackage -Online -ErrorAction SilentlyContinue
}`,
    revertCommand: `# No es posible revertir automáticamente la eliminación de bloatware. Reinstalar desde Microsoft Store si es necesario.
Write-Host "Para reinstalar apps de Windows, visita Microsoft Store."`,
    requiresReboot: false,
    windowsVersion: "10/11",
  },
];
