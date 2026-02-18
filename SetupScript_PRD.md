# PRD: SetupScript.io

> **Versión:** 1.0.0 | **Fecha:** 2025 | **Estado:** Ready for Development

---

## 1. Resumen Ejecutivo

**SetupScript.io** es una aplicación web gratuita que elimina la fricción de configurar un PC con Windows desde cero. El usuario selecciona, mediante una interfaz visual tipo "app store", el software que necesita y los tweaks de sistema que desea aplicar. La aplicación genera en tiempo real un script de PowerShell (`.ps1`) listo para ejecutar, que utiliza `winget` (Windows Package Manager) para instalar aplicaciones y comandos de registro (`reg add`) para aplicar configuraciones del sistema.

**Problema que resuelve:** Cada vez que alguien formatea su PC o configura una máquina nueva, repite manualmente el mismo proceso de instalaciones durante horas. Los scripts que existen son opacos, no editables visualmente y no se adaptan a las necesidades individuales.

**Propuesta de valor:**

- Sin registro, sin fricción: entra, selecciona, descarga.
- Script transparente: el usuario ve exactamente qué va a ejecutarse antes de descargarlo.
- Extensible: arquitectura de datos basada en JSON que permite añadir apps/tweaks sin tocar lógica de negocio.
- Cyberpunk aesthetic: diferenciador visual en un nicho dominado por herramientas CLI feas.

**Monetización futura (v2):** Presets guardados (requiere auth + MongoDB), scripts compartibles por URL, marketplace de tweaks de la comunidad.

---

## 2. Arquitectura de Datos (JSON Logic)

Esta es la parte más crítica del sistema. Toda la lógica del generador depende de estas estructuras.

### 2.1 `AVAILABLE_APPS` — Array de Aplicaciones

Ubicación en el proyecto: `src/data/apps.ts`

```typescript
// src/data/apps.ts

export type AppCategory =
  | "browsers"
  | "gaming"
  | "dev_tools"
  | "multimedia"
  | "communication"
  | "utilities";

export interface App {
  id: string; // Identificador único snake_case. Usado como key en el estado.
  name: string; // Nombre para mostrar en la UI.
  category: AppCategory; // Determina en qué sección del sidebar aparece.
  wingetId: string; // ID exacto de winget. Ejecutar `winget search <app>` para verificar.
  description: string; // Texto corto para el tooltip/card (max 80 chars).
  icon: string; // Nombre del componente de Lucide React (e.g., "Chrome" → "Globe").
  isRecommended?: boolean; // Si aparece con badge "Recomendado".
  isFree: boolean; // Indica si la app es gratuita.
}

export const AVAILABLE_APPS: App[] = [
  // ── BROWSERS ──────────────────────────────────────────────────────────────
  {
    id: "google_chrome",
    name: "Google Chrome",
    category: "browsers",
    wingetId: "Google.Chrome",
    description: "El navegador más popular del mundo.",
    icon: "Globe",
    isRecommended: true,
    isFree: true,
  },
  {
    id: "firefox",
    name: "Mozilla Firefox",
    category: "browsers",
    wingetId: "Mozilla.Firefox",
    description: "Navegador open-source centrado en privacidad.",
    icon: "Globe",
    isFree: true,
  },
  {
    id: "brave",
    name: "Brave Browser",
    category: "browsers",
    wingetId: "Brave.Brave",
    description: "Bloqueador de anuncios integrado, ultra rápido.",
    icon: "Shield",
    isFree: true,
  },
  {
    id: "edge",
    name: "Microsoft Edge",
    category: "browsers",
    wingetId: "Microsoft.Edge",
    description: "Navegador de Microsoft basado en Chromium.",
    icon: "Globe",
    isFree: true,
  },
  {
    id: "opera_gx",
    name: "Opera GX",
    category: "browsers",
    wingetId: "Opera.OperaGX",
    description: "Navegador gaming con control de RAM y CPU.",
    icon: "Gamepad2",
    isFree: true,
  },

  // ── GAMING ────────────────────────────────────────────────────────────────
  {
    id: "steam",
    name: "Steam",
    category: "gaming",
    wingetId: "Valve.Steam",
    description: "La plataforma de juegos de PC más grande.",
    icon: "Gamepad2",
    isRecommended: true,
    isFree: true,
  },
  {
    id: "epic_games",
    name: "Epic Games Launcher",
    category: "gaming",
    wingetId: "EpicGames.EpicGamesLauncher",
    description: "Launcher de Epic con juegos gratuitos semanales.",
    icon: "Gamepad2",
    isFree: true,
  },
  {
    id: "discord",
    name: "Discord",
    category: "gaming",
    wingetId: "Discord.Discord",
    description: "Voz, video y chat para gamers y comunidades.",
    icon: "MessageSquare",
    isRecommended: true,
    isFree: true,
  },
  {
    id: "goggalaxy",
    name: "GOG Galaxy",
    category: "gaming",
    wingetId: "GOG.Galaxy",
    description: "Launcher unificado para todas tus plataformas.",
    icon: "Gamepad2",
    isFree: true,
  },
  {
    id: "msi_afterburner",
    name: "MSI Afterburner",
    category: "gaming",
    wingetId: "Guru3D.Afterburner",
    description: "OC y monitoreo de GPU en tiempo real.",
    icon: "Cpu",
    isFree: true,
  },

  // ── DEV TOOLS ─────────────────────────────────────────────────────────────
  {
    id: "vscode",
    name: "Visual Studio Code",
    category: "dev_tools",
    wingetId: "Microsoft.VisualStudioCode",
    description: "El editor de código más popular del mundo.",
    icon: "Code2",
    isRecommended: true,
    isFree: true,
  },
  {
    id: "git",
    name: "Git",
    category: "dev_tools",
    wingetId: "Git.Git",
    description: "Sistema de control de versiones distribuido.",
    icon: "GitBranch",
    isRecommended: true,
    isFree: true,
  },
  {
    id: "nodejs",
    name: "Node.js (LTS)",
    category: "dev_tools",
    wingetId: "OpenJS.NodeJS.LTS",
    description: "Runtime de JavaScript para el servidor.",
    icon: "Terminal",
    isFree: true,
  },
  {
    id: "python",
    name: "Python 3",
    category: "dev_tools",
    wingetId: "Python.Python.3.12",
    description: "Lenguaje de programación versátil y popular.",
    icon: "Terminal",
    isFree: true,
  },
  {
    id: "windows_terminal",
    name: "Windows Terminal",
    category: "dev_tools",
    wingetId: "Microsoft.WindowsTerminal",
    description: "Terminal moderna con soporte para tabs y perfiles.",
    icon: "Terminal",
    isRecommended: true,
    isFree: true,
  },
  {
    id: "docker_desktop",
    name: "Docker Desktop",
    category: "dev_tools",
    wingetId: "Docker.DockerDesktop",
    description: "Contenerización para desarrollo local.",
    icon: "Box",
    isFree: true,
  },
  {
    id: "postman",
    name: "Postman",
    category: "dev_tools",
    wingetId: "Postman.Postman",
    description: "Plataforma para desarrollo y testing de APIs.",
    icon: "Send",
    isFree: true,
  },
  {
    id: "dbeaver",
    name: "DBeaver",
    category: "dev_tools",
    wingetId: "dbeaver.dbeaver",
    description: "Cliente universal de base de datos.",
    icon: "Database",
    isFree: true,
  },
  {
    id: "oh_my_posh",
    name: "Oh My Posh",
    category: "dev_tools",
    wingetId: "JanDeDobbeleer.OhMyPosh",
    description: "Motor de temas para cualquier shell.",
    icon: "Terminal",
    isFree: true,
  },

  // ── MULTIMEDIA ────────────────────────────────────────────────────────────
  {
    id: "vlc",
    name: "VLC Media Player",
    category: "multimedia",
    wingetId: "VideoLAN.VLC",
    description: "Reproductor multimedia que soporta cualquier formato.",
    icon: "Play",
    isRecommended: true,
    isFree: true,
  },
  {
    id: "obs_studio",
    name: "OBS Studio",
    category: "multimedia",
    wingetId: "OBSProject.OBSStudio",
    description: "Streaming y grabación de pantalla profesional.",
    icon: "Video",
    isFree: true,
  },
  {
    id: "spotify",
    name: "Spotify",
    category: "multimedia",
    wingetId: "Spotify.Spotify",
    description: "Streaming de música con millones de canciones.",
    icon: "Music",
    isFree: true,
  },
  {
    id: "handbrake",
    name: "HandBrake",
    category: "multimedia",
    wingetId: "HandBrake.HandBrake",
    description: "Transcodificador de video open-source.",
    icon: "Film",
    isFree: true,
  },
  {
    id: "gimp",
    name: "GIMP",
    category: "multimedia",
    wingetId: "GIMP.GIMP",
    description: "Editor de imágenes profesional open-source.",
    icon: "Image",
    isFree: true,
  },

  // ── COMMUNICATION ─────────────────────────────────────────────────────────
  {
    id: "slack",
    name: "Slack",
    category: "communication",
    wingetId: "SlackTechnologies.Slack",
    description: "Mensajería para equipos de trabajo.",
    icon: "MessageSquare",
    isFree: true,
  },
  {
    id: "zoom",
    name: "Zoom",
    category: "communication",
    wingetId: "Zoom.Zoom",
    description: "Videollamadas y conferencias online.",
    icon: "Video",
    isFree: true,
  },
  {
    id: "telegram",
    name: "Telegram Desktop",
    category: "communication",
    wingetId: "Telegram.TelegramDesktop",
    description: "Mensajería rápida y segura.",
    icon: "Send",
    isFree: true,
  },

  // ── UTILITIES ─────────────────────────────────────────────────────────────
  {
    id: "7zip",
    name: "7-Zip",
    category: "utilities",
    wingetId: "7zip.7zip",
    description: "Compresor/descompresor de archivos open-source.",
    icon: "Archive",
    isRecommended: true,
    isFree: true,
  },
  {
    id: "everything",
    name: "Everything",
    category: "utilities",
    wingetId: "voidtools.Everything",
    description: "Búsqueda de archivos instantánea en Windows.",
    icon: "Search",
    isRecommended: true,
    isFree: true,
  },
  {
    id: "powertoys",
    name: "Microsoft PowerToys",
    category: "utilities",
    wingetId: "Microsoft.PowerToys",
    description: "Suite de utilidades para power users de Windows.",
    icon: "Zap",
    isRecommended: true,
    isFree: true,
  },
  {
    id: "notepadplusplus",
    name: "Notepad++",
    category: "utilities",
    wingetId: "Notepad++.Notepad++",
    description: "Editor de texto y código ligero y potente.",
    icon: "FileText",
    isFree: true,
  },
  {
    id: "cpu_z",
    name: "CPU-Z",
    category: "utilities",
    wingetId: "CPUID.CPU-Z",
    description: "Monitor de hardware del sistema.",
    icon: "Cpu",
    isFree: true,
  },
];
```

### 2.2 `SYSTEM_TWEAKS` — Array de Tweaks del Sistema

Ubicación en el proyecto: `src/data/tweaks.ts`

> **Importante:** Cada tweak incluye tanto el comando de aplicación como el de reversión. El script generado DEBE incluir comentarios explicativos. Los comandos de registro usan rutas verificadas en Windows 10/11.

```typescript
// src/data/tweaks.ts

export type TweakCategory =
  | "privacy"
  | "performance"
  | "appearance"
  | "bloatware";

export type TweakRisk = "low" | "medium" | "high";

export interface SystemTweak {
  id: string;
  name: string;
  description: string; // Explicación para el usuario final (no técnica).
  category: TweakCategory;
  risk: TweakRisk; // Nivel de riesgo para mostrar badge de advertencia.
  icon: string; // Lucide React icon name.
  applyCommand: string; // Bloque de PowerShell para APLICAR el tweak. Puede ser multilinea.
  revertCommand: string; // Bloque de PowerShell para REVERTIR el tweak.
  requiresReboot: boolean; // Si el cambio requiere reinicio para surtir efecto.
  windowsVersion: "10" | "11" | "10/11"; // Compatibilidad.
}

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
```

### 2.3 Estado de la Aplicación (React State Schema)

```typescript
// src/types/index.ts

export interface AppState {
  selectedApps: Set<string>; // Set de App.id seleccionados
  selectedTweaks: Set<string>; // Set de SystemTweak.id seleccionados
  activeCategory: AppCategory | "all";
  scriptPreview: string; // Script generado en tiempo real
  includeRevertScript: boolean; // Si generar también el script de reversión
}
```

---

## 3. Requerimientos Funcionales (Core Features)

### 3.1 Frontend — Componentes Requeridos

#### Layout Principal (`src/app/page.tsx`)

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER: Logo + Tagline + GitHub Link                           │
├──────────────────┬──────────────────────────────────────────────┤
│                  │                                              │
│  SIDEBAR         │  MAIN CONTENT AREA                           │
│  (categorías)    │  (grid de tarjetas)                          │
│                  │                                              │
│  • Todos         │  ┌────┐ ┌────┐ ┌────┐ ┌────┐               │
│  • Navegadores   │  │App │ │App │ │App │ │App │               │
│  • Gaming        │  │Card│ │Card│ │Card│ │Card│               │
│  • Dev Tools     │  └────┘ └────┘ └────┘ └────┘               │
│  • Multimedia    │                                              │
│  • Utilidades    │  [SYSTEM TWEAKS SECTION]                     │
│                  │  ┌──────────────┐ ┌──────────────┐          │
│  ─────────────── │  │   Tweak      │ │   Tweak      │          │
│  TWEAKS:         │  │   Toggle     │ │   Toggle     │          │
│  • Privacidad    │  └──────────────┘ └──────────────┘          │
│  • Rendimiento   │                                              │
│  • Apariencia    │                                              │
│  • Bloatware     │                                              │
│                  │                                              │
├──────────────────┴──────────────────────────────────────────────┤
│  FOOTER BAR: X items seleccionados | [Preview] [Descargar .ps1] │
└─────────────────────────────────────────────────────────────────┘
```

#### Componentes a implementar:

**`AppCard` (`src/components/AppCard.tsx`)**

- Props: `app: App`, `isSelected: boolean`, `onToggle: (id: string) => void`
- Estado visual: borde neón cuando `isSelected === true`
- Badge "Recomendado" si `app.isRecommended`
- Icono Lucide dinámico basado en `app.icon`

**`TweakCard` (`src/components/TweakCard.tsx`)**

- Props: `tweak: SystemTweak`, `isSelected: boolean`, `onToggle: (id: string) => void`
- Badge de riesgo coloreado: low=verde, medium=amarillo, high=rojo
- Tooltip con `tweak.description`

**`Sidebar` (`src/components/Sidebar.tsx`)**

- Lista de categorías de apps con conteo de items seleccionados por categoría
- Sección separada para tweaks por categoría
- Indicador visual de categoría activa

**`ScriptPreview` (`src/components/ScriptPreview.tsx`)**

- Muestra el script generado con syntax highlighting básico (colores para comentarios, comandos, strings)
- Altura fija con scroll interno
- Se actualiza en tiempo real con cada selección/deselección

**`ActionBar` (`src/components/ActionBar.tsx`)**

- Fijo en la parte inferior de la pantalla
- Muestra conteo: "X apps + Y tweaks seleccionados"
- Botón "Ver Script" → abre modal con `ScriptPreview`
- Botón "Descargar .ps1" → dispara descarga del archivo
- Botón "Copiar" → copia al portapapeles

### 3.2 Lógica del Generador de Scripts

Ubicación: `src/lib/scriptGenerator.ts`

```typescript
// src/lib/scriptGenerator.ts

import { App, SystemTweak } from "@/data/apps";
import { SYSTEM_TWEAKS } from "@/data/tweaks";

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

Write-Host ""
Write-Host "  ███████╗███████╗████████╗██╗   ██╗██████╗ ███████╗ ██████╗██████╗ ██╗██████╗ ████████╗" -ForegroundColor Magenta
Write-Host "  Bienvenido a tu script de SetupScript.io" -ForegroundColor Cyan
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
Write-Host "INSTALANDO APLICACIONES..." -ForegroundColor Cyan
`;

const TWEAKS_SECTION_HEADER = `
# ─────────────────────────────────────────────────────────────────
# SECCIÓN 2: TWEAKS DE SISTEMA
# ─────────────────────────────────────────────────────────────────
Write-Host "APLICANDO TWEAKS DE SISTEMA..." -ForegroundColor Cyan
`;

const SCRIPT_FOOTER = `
# ─────────────────────────────────────────────────────────────────
# FINALIZACIÓN
# ─────────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Magenta
Write-Host "  ✅ Script completado exitosamente!" -ForegroundColor Green
Write-Host "  Generado por SetupScript.io" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Magenta
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
    Write-Host "  ⚠️  ${app.name} - ya instalado o error (código: $LASTEXITCODE)" -ForegroundColor Yellow
}`;
}

export function generateTweakBlock(tweak: SystemTweak): string {
  return `
Write-Host "  → Aplicando: ${tweak.name}..." -ForegroundColor White
${tweak.applyCommand}
Write-Host "  ✅ ${tweak.name} - aplicado." -ForegroundColor Green`;
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
```

---

## 4. Diseño de Interfaz (UI/UX)

### 4.1 Paleta de Colores

| Token              | Color          | Hex       | Uso                            |
| ------------------ | -------------- | --------- | ------------------------------ |
| `background`       | Negro profundo | `#0a0a0a` | Fondo principal                |
| `surface`          | Gris oscuro    | `#111111` | Cards, panels                  |
| `surface-hover`    | Gris medio     | `#1a1a1a` | Hover states                   |
| `border`           | Gris sutil     | `#222222` | Bordes default                 |
| `accent-primary`   | Cian neón      | `#00f5ff` | Seleccionado, CTA principal    |
| `accent-secondary` | Magenta neón   | `#ff00ff` | Badges, highlights secundarios |
| `accent-purple`    | Púrpura        | `#7c3aed` | Categoría activa, gradients    |
| `text-primary`     | Blanco         | `#ffffff` | Texto principal                |
| `text-muted`       | Gris claro     | `#888888` | Texto secundario               |
| `success`          | Verde neón     | `#00ff88` | Confirmaciones                 |
| `warning`          | Amarillo       | `#fbbf24` | Tweaks riesgo medio            |
| `danger`           | Rojo           | `#ff3b3b` | Tweaks riesgo alto             |

### 4.2 Configuración de DaisyUI (`tailwind.config.ts`)

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: "#00f5ff",
          magenta: "#ff00ff",
          purple: "#7c3aed",
          green: "#00ff88",
        },
      },
      boxShadow: {
        "neon-cyan": "0 0 10px #00f5ff, 0 0 20px #00f5ff40",
        "neon-magenta": "0 0 10px #ff00ff, 0 0 20px #ff00ff40",
        "neon-card": "0 0 0 1px #00f5ff, 0 0 15px #00f5ff20",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        setupscript: {
          primary: "#00f5ff",
          "primary-content": "#0a0a0a",
          secondary: "#ff00ff",
          "secondary-content": "#ffffff",
          accent: "#7c3aed",
          "accent-content": "#ffffff",
          neutral: "#111111",
          "neutral-content": "#888888",
          "base-100": "#0a0a0a",
          "base-200": "#111111",
          "base-300": "#1a1a1a",
          "base-content": "#ffffff",
          info: "#0070f3",
          success: "#00ff88",
          warning: "#fbbf24",
          error: "#ff3b3b",
        },
      },
    ],
  },
};

export default config;
```

### 4.3 Comportamiento de las App Cards

**Estado normal:**

- Fondo: `base-200` (`#111111`)
- Borde: 1px `#222222`
- Transición suave al hover

**Estado hover:**

- Fondo: `base-300` (`#1a1a1a`)
- Borde: 1px `#333333`

**Estado seleccionado:**

- Fondo: `rgba(0, 245, 255, 0.05)`
- Borde: 1px `#00f5ff`
- Box shadow: `shadow-neon-cyan`
- Ícono coloreado en cian

### 4.4 Layout Responsivo

```
Desktop (≥1024px): Sidebar fijo izquierda 240px + Grid principal 4 columnas
Tablet (≥768px):   Sidebar colapsable + Grid 3 columnas
Mobile (<768px):   Sidebar como drawer + Grid 2 columnas + ActionBar fijo abajo
```

### 4.5 Modal de Preview del Script

- Overlay oscuro con blur
- Panel de ancho máximo `max-w-4xl`
- Header con nombre del archivo y botones de acción
- Área de código con fondo `#0d0d0d`, fuente monospace
- Syntax highlighting manual con `<span>` coloreados:
  - Comentarios (`#`): `text-muted` (`#888`)
  - Comandos (`Write-Host`): `accent-primary` cian
  - Strings (`"..."`): `accent-secondary` magenta
  - Variables (`$...`): `accent-purple`
  - Texto normal: `text-primary` blanco

---

## 5. Estructura del Proyecto

```
setupscript-io/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout con metadatos y fuentes
│   │   ├── page.tsx            # Página principal (Home)
│   │   └── globals.css         # Variables CSS globales + imports Tailwind
│   ├── components/
│   │   ├── AppCard.tsx
│   │   ├── TweakCard.tsx
│   │   ├── Sidebar.tsx
│   │   ├── ScriptPreview.tsx
│   │   ├── ActionBar.tsx
│   │   ├── ScriptModal.tsx     # Modal que contiene ScriptPreview
│   │   ├── CategoryBadge.tsx
│   │   └── Header.tsx
│   ├── data/
│   │   ├── apps.ts             # AVAILABLE_APPS + tipos
│   │   └── tweaks.ts           # SYSTEM_TWEAKS + tipos
│   ├── lib/
│   │   └── scriptGenerator.ts  # Toda la lógica de generación
│   ├── hooks/
│   │   └── useScriptBuilder.ts # Hook con el estado y lógica principal
│   └── types/
│       └── index.ts            # Tipos TypeScript compartidos
├── public/
│   └── favicon.ico
├── tailwind.config.ts
├── next.config.mjs
├── package.json
└── tsconfig.json
```

### Custom Hook (`src/hooks/useScriptBuilder.ts`)

```typescript
// src/hooks/useScriptBuilder.ts
import { useState, useCallback, useMemo } from "react";
import { AVAILABLE_APPS, App, AppCategory } from "@/data/apps";
import { SYSTEM_TWEAKS, SystemTweak } from "@/data/tweaks";
import { generateScript } from "@/lib/scriptGenerator";

export function useScriptBuilder() {
  const [selectedAppIds, setSelectedAppIds] = useState<Set<string>>(new Set());
  const [selectedTweakIds, setSelectedTweakIds] = useState<Set<string>>(
    new Set(),
  );
  const [activeCategory, setActiveCategory] = useState<AppCategory | "all">(
    "all",
  );

  const toggleApp = useCallback((id: string) => {
    setSelectedAppIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const toggleTweak = useCallback((id: string) => {
    setSelectedTweakIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const selectedApps = useMemo(
    () => AVAILABLE_APPS.filter((app) => selectedAppIds.has(app.id)),
    [selectedAppIds],
  );

  const selectedTweaks = useMemo(
    () => SYSTEM_TWEAKS.filter((tweak) => selectedTweakIds.has(tweak.id)),
    [selectedTweakIds],
  );

  const filteredApps = useMemo(
    () =>
      activeCategory === "all"
        ? AVAILABLE_APPS
        : AVAILABLE_APPS.filter((app) => app.category === activeCategory),
    [activeCategory],
  );

  const script = useMemo(
    () => generateScript({ selectedApps, selectedTweaks }),
    [selectedApps, selectedTweaks],
  );

  const totalSelected = selectedAppIds.size + selectedTweakIds.size;

  return {
    selectedAppIds,
    selectedTweakIds,
    activeCategory,
    setActiveCategory,
    toggleApp,
    toggleTweak,
    filteredApps,
    selectedApps,
    selectedTweaks,
    script,
    totalSelected,
  };
}
```

---

## 6. Prompt de Inicio para Cursor (Composer)

> Copia y pega el siguiente prompt completo en Cursor Composer (Ctrl+Shift+P → "Open Composer") para iniciar el desarrollo.

---

````
Eres un desarrollador senior especializado en Next.js 14 y TypeScript.
Vamos a construir "SetupScript.io", una web app que genera scripts de PowerShell para configurar PCs con Windows.

## STACK OBLIGATORIO
- Next.js 14 con App Router
- TypeScript (strict mode)
- Tailwind CSS + DaisyUI
- Lucide React para iconos
- Sin backend por ahora (todo client-side)

## TAREA 1: SETUP INICIAL
Ejecuta estos comandos para crear el proyecto:

```bash
npx create-next-app@latest setupscript-io --typescript --tailwind --app --no-src-dir --import-alias "@/*"
cd setupscript-io
npm install daisyui lucide-react
````

## TAREA 2: ARCHIVOS DE DATOS

Crea estos archivos EXACTAMENTE con la estructura definida a continuación:

### `src/data/apps.ts`

Crea el archivo con el type `AppCategory`, el interface `App`, y el array `AVAILABLE_APPS` con TODAS estas apps (con sus wingetId exactos verificados):

Browsers: Google.Chrome, Mozilla.Firefox, Brave.Brave, Microsoft.Edge, Opera.OperaGX
Gaming: Valve.Steam, EpicGames.EpicGamesLauncher, Discord.Discord, GOG.Galaxy, Guru3D.Afterburner
Dev Tools: Microsoft.VisualStudioCode, Git.Git, OpenJS.NodeJS.LTS, Python.Python.3.12, Microsoft.WindowsTerminal, Docker.DockerDesktop, Postman.Postman, dbeaver.dbeaver, JanDeDobbeleer.OhMyPosh
Multimedia: VideoLAN.VLC, OBSProject.OBSStudio, Spotify.Spotify, HandBrake.HandBrake, GIMP.GIMP
Communication: SlackTechnologies.Slack, Zoom.Zoom, Telegram.TelegramDesktop
Utilities: 7zip.7zip, voidtools.Everything, Microsoft.PowerToys, Notepad++.Notepad++, CPUID.CPU-Z

Cada objeto App tiene: { id: string, name: string, category: AppCategory, wingetId: string, description: string, icon: string, isRecommended?: boolean, isFree: boolean }

### `src/data/tweaks.ts`

Crea el archivo con el type `TweakCategory`, type `TweakRisk`, interface `SystemTweak`, y el array `SYSTEM_TWEAKS` con estos tweaks y sus comandos PowerShell reales:

Privacy: disable_telemetry (reg DataCollection + DiagTrack), disable_cortana, disable_advertising_id, disable_activity_history
Appearance: enable_dark_mode (reg Themes\Personalize), show_file_extensions, show_hidden_files, taskbar_left_windows11
Performance: disable_startup_delay, disable_xbox_game_dvr, enable_ultimate_performance (powercfg)
Bloatware: remove_onedrive (taskkill + OneDriveSetup.exe /uninstall), remove_bloatware_apps (Get-AppxPackage loop)

Cada SystemTweak tiene: { id, name, description, category, risk: "low"|"medium"|"high", icon, applyCommand: string, revertCommand: string, requiresReboot: boolean, windowsVersion: "10"|"11"|"10/11" }

## TAREA 3: GENERADOR DE SCRIPTS

Crea `src/lib/scriptGenerator.ts` con:

- Función `generateInstallBlock(app: App): string` → retorna bloque winget con feedback visual
- Función `generateTweakBlock(tweak: SystemTweak): string` → retorna bloque de tweak con comentario
- Función `generateScript({ selectedApps, selectedTweaks }): string` → genera el .ps1 completo con header ASCII, secciones separadas y footer
- Función `downloadScript(content: string, filename: string): void` → descarga como .ps1
- Función `copyToClipboard(text: string): Promise<boolean>`

El script generado debe incluir: #Requires -RunAsAdministrator, verificación de winget, agrupación por categoría, mensajes de progreso con Write-Host coloreado, y un footer de éxito.

## TAREA 4: CUSTOM HOOK

Crea `src/hooks/useScriptBuilder.ts` con:

- Estado: selectedAppIds (Set<string>), selectedTweakIds (Set<string>), activeCategory
- Funciones: toggleApp, toggleTweak, setActiveCategory
- Derivados con useMemo: selectedApps, selectedTweaks, filteredApps, script, totalSelected

## TAREA 5: CONFIGURACIÓN TAILWIND/DAISYUI

Actualiza `tailwind.config.ts` con:

- Tema DaisyUI personalizado llamado "setupscript" con colores: primary=#00f5ff, secondary=#ff00ff, base-100=#0a0a0a, base-200=#111111
- Colores custom: neon.cyan, neon.magenta, neon.purple, neon.green
- BoxShadow custom: neon-cyan, neon-magenta, neon-card

## TAREA 6: COMPONENTES UI

Crea estos componentes en `src/components/`:

**AppCard.tsx**: Card clickeable con checkbox visual. Borde neon-cyan y fondo rgba(0,245,255,0.05) cuando selected. Muestra icon de Lucide dinámicamente, badge "Recomendado" si aplica.

**TweakCard.tsx**: Toggle card para tweaks. Badge de riesgo colorizado (low=verde, medium=amarillo, high=rojo). Mostrar icono de compatibilidad de Windows version.

**Sidebar.tsx**: Lista de categorías (Todos + cada AppCategory). Sección separada para TweakCategory. Indicador activo con color neon. Contador de seleccionados por categoría como badge.

**ScriptPreview.tsx**: Área de código con fondo #0d0d0d, font monospace, height fija con scroll. Aplicar coloreado básico: comentarios (gris), $variables (purple), "strings" (magenta), Write-Host (cyan).

**ActionBar.tsx**: Barra fija en bottom. Texto "X apps + Y tweaks". Botones: "Ver Script" (abre modal), "Copiar" (con feedback de ✓), "Descargar .ps1" (primary CTA).

**Header.tsx**: Logo + tagline "Tu PC. Tu Script. En segundos." + link a GitHub.

## TAREA 7: PÁGINA PRINCIPAL

En `src/app/page.tsx`:

- Importa `useScriptBuilder`
- Layout: Header + div con flex (Sidebar 240px fijo + área principal flex-1)
- Sección de Apps: filteredApps en grid responsive (2 cols mobile, 3 tablet, 4 desktop)
- Sección de Tweaks: SYSTEM_TWEAKS filtrados por categoría activa en grid 2 cols
- ActionBar siempre visible
- Modal de preview condicionalmente renderizado

## TAREA 8: METADATA Y SEO

En `src/app/layout.tsx`:

```typescript
export const metadata = {
  title: "SetupScript.io - Configura tu PC con Windows en segundos",
  description:
    "Genera scripts de PowerShell personalizados para instalar apps y optimizar Windows automáticamente. Gratis, sin registro.",
  keywords:
    "windows setup script, powershell, winget, windows tweaks, pc setup automation",
};
```

## CRITERIOS DE ACEPTACIÓN

- [ ] El script generado es sintaxis PowerShell válida
- [ ] winget install commands usan --silent --accept-package-agreements --accept-source-agreements
- [ ] Las cards se seleccionan/deseleccionan correctamente
- [ ] El script se actualiza en tiempo real con cada cambio
- [ ] El botón de descarga genera un archivo .ps1 descargable
- [ ] El diseño es completamente oscuro con acentos de neón
- [ ] La app es funcional sin internet (todo generado client-side)
- [ ] TypeScript sin errores (strict mode)

Empieza por las TAREAS 1-4 (datos + lógica) antes de tocar la UI. Una vez que el generador funcione correctamente, pasa a los componentes.

```

---

## 7. Consideraciones Técnicas Adicionales

**Seguridad del script generado:**
- Incluir siempre `#Requires -RunAsAdministrator` para que Windows pida elevación automáticamente.
- Usar `--accept-package-agreements` y `--accept-source-agreements` en winget para instalaciones desatendidas.
- Los tweaks de registro deben ser reversibles. Documentar el `revertCommand` en los comentarios del script.

**Rendimiento de la app:**
- Los arrays `AVAILABLE_APPS` y `SYSTEM_TWEAKS` son constantes. No necesitan estado externo.
- El script se genera con `useMemo` → solo recalcula cuando cambia la selección.
- No hacer ninguna llamada a API en la versión inicial.

**Roadmap v2 (MongoDB):**
- Guardar presets de usuario: `{ userId, name, appIds[], tweakIds[], createdAt }`
- Compartir preset por URL: `setupscript.io/preset/[id]`
- Historial de scripts generados

**Métricas a trackear (v2):**
- Apps más seleccionadas (para ordenar por popularidad)
- Tweaks más aplicados
- Número de scripts descargados (Analytics)
```
