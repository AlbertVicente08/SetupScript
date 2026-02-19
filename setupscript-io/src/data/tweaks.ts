// src/data/tweaks.ts

export type TweakCategory = "privacy" | "performance" | "appearance" | "bloatware";

export type TweakRisk = "low" | "medium" | "high";

export type TweakTier = "free" | "pro";

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
  tier: TweakTier;
}

export const FREE_TWEAK_IDS = [
  "enable_dark_mode",
  "show_hidden_files",
] as const;

export const TWEAK_CATEGORY_LABELS: Record<TweakCategory, string> = {
  privacy: "Privacy",
  performance: "Performance",
  appearance: "Appearance",
  bloatware: "Bloatware",
};

export const TWEAK_CATEGORY_ICONS: Record<TweakCategory, string> = {
  privacy: "ShieldOff",
  performance: "Zap",
  appearance: "Palette",
  bloatware: "Trash2",
};

export const SYSTEM_TWEAKS: SystemTweak[] = [
  // ── PRIVACY (PRO) ─────────────────────────────────────────────────────────
  {
    id: "disable_telemetry",
    name: "Disable Windows Telemetry",
    description:
      "Prevents Windows from sending usage and diagnostic data to Microsoft.",
    category: "privacy",
    risk: "medium",
    icon: "EyeOff",
    tier: "pro",
    applyCommand: `# Disable Telemetry
reg add "HKLM\\\\SOFTWARE\\\\Policies\\\\Microsoft\\\\Windows\\\\DataCollection" /v AllowTelemetry /t REG_DWORD /d 0 /f
reg add "HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Policies\\\\DataCollection" /v AllowTelemetry /t REG_DWORD /d 0 /f
sc config DiagTrack start= disabled
sc stop DiagTrack`,
    revertCommand: `# Revert Telemetry
reg delete "HKLM\\\\SOFTWARE\\\\Policies\\\\Microsoft\\\\Windows\\\\DataCollection" /v AllowTelemetry /f
sc config DiagTrack start= auto
sc start DiagTrack`,
    requiresReboot: false,
    windowsVersion: "10/11",
  },
  {
    id: "disable_cortana",
    name: "Disable Cortana",
    description:
      "Disables Microsoft's voice assistant for better privacy and performance.",
    category: "privacy",
    risk: "low",
    icon: "MicOff",
    tier: "pro",
    applyCommand: `# Disable Cortana
reg add "HKLM\\\\SOFTWARE\\\\Policies\\\\Microsoft\\\\Windows\\\\Windows Search" /v AllowCortana /t REG_DWORD /d 0 /f
reg add "HKCU\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Search" /v CortanaEnabled /t REG_DWORD /d 0 /f`,
    revertCommand: `# Revert Cortana
reg delete "HKLM\\\\SOFTWARE\\\\Policies\\\\Microsoft\\\\Windows\\\\Windows Search" /v AllowCortana /f
reg add "HKCU\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Search" /v CortanaEnabled /t REG_DWORD /d 1 /f`,
    requiresReboot: false,
    windowsVersion: "10/11",
  },
  {
    id: "disable_advertising_id",
    name: "Disable Advertising ID",
    description:
      "Prevents apps from tracking your behavior for personalized ads.",
    category: "privacy",
    risk: "low",
    icon: "ShieldOff",
    tier: "pro",
    applyCommand: `# Disable Advertising ID
reg add "HKCU\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\AdvertisingInfo" /v Enabled /t REG_DWORD /d 0 /f`,
    revertCommand: `# Revert Advertising ID
reg add "HKCU\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\AdvertisingInfo" /v Enabled /t REG_DWORD /d 1 /f`,
    requiresReboot: false,
    windowsVersion: "10/11",
  },
  {
    id: "disable_activity_history",
    name: "Disable Activity History",
    description:
      "Removes activity tracking and the Windows Timeline feature.",
    category: "privacy",
    risk: "low",
    icon: "Clock",
    tier: "pro",
    applyCommand: `# Disable Activity History
reg add "HKLM\\\\SOFTWARE\\\\Policies\\\\Microsoft\\\\Windows\\\\System" /v EnableActivityFeed /t REG_DWORD /d 0 /f
reg add "HKLM\\\\SOFTWARE\\\\Policies\\\\Microsoft\\\\Windows\\\\System" /v PublishUserActivities /t REG_DWORD /d 0 /f`,
    revertCommand: `# Revert Activity History
reg delete "HKLM\\\\SOFTWARE\\\\Policies\\\\Microsoft\\\\Windows\\\\System" /v EnableActivityFeed /f
reg delete "HKLM\\\\SOFTWARE\\\\Policies\\\\Microsoft\\\\Windows\\\\System" /v PublishUserActivities /f`,
    requiresReboot: false,
    windowsVersion: "10/11",
  },

  // ── APPEARANCE (FREE) ──────────────────────────────────────────────────────
  {
    id: "enable_dark_mode",
    name: "Enable Dark Mode",
    description:
      "Enables system dark mode for apps and Windows Explorer.",
    category: "appearance",
    risk: "low",
    icon: "Moon",
    tier: "free",
    applyCommand: `# Enable System Dark Mode
reg add "HKCU\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Themes\\\\Personalize" /v AppsUseLightTheme /t REG_DWORD /d 0 /f
reg add "HKCU\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Themes\\\\Personalize" /v SystemUsesLightTheme /t REG_DWORD /d 0 /f`,
    revertCommand: `# Revert to Light Mode
reg add "HKCU\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Themes\\\\Personalize" /v AppsUseLightTheme /t REG_DWORD /d 1 /f
reg add "HKCU\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Themes\\\\Personalize" /v SystemUsesLightTheme /t REG_DWORD /d 1 /f`,
    requiresReboot: false,
    windowsVersion: "10/11",
  },
  {
    id: "show_file_extensions",
    name: "Show File Extensions",
    description:
      "Shows extensions for all files in Explorer (recommended for security).",
    category: "appearance",
    risk: "low",
    icon: "Eye",
    tier: "pro",
    applyCommand: `# Show File Extensions
reg add "HKCU\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Explorer\\\\Advanced" /v HideFileExt /t REG_DWORD /d 0 /f`,
    revertCommand: `# Hide File Extensions
reg add "HKCU\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Explorer\\\\Advanced" /v HideFileExt /t REG_DWORD /d 1 /f`,
    requiresReboot: false,
    windowsVersion: "10/11",
  },
  {
    id: "show_hidden_files",
    name: "Show Hidden Files",
    description:
      "Makes hidden system files and folders visible in Explorer.",
    category: "appearance",
    risk: "low",
    icon: "FolderOpen",
    tier: "free",
    applyCommand: `# Show Hidden Files
reg add "HKCU\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Explorer\\\\Advanced" /v Hidden /t REG_DWORD /d 1 /f`,
    revertCommand: `# Hide Hidden Files
reg add "HKCU\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Explorer\\\\Advanced" /v Hidden /t REG_DWORD /d 2 /f`,
    requiresReboot: false,
    windowsVersion: "10/11",
  },
  {
    id: "taskbar_left_windows11",
    name: "Align Taskbar to Left (Win 11)",
    description:
      "Moves Windows 11 taskbar icons to the classic style (left).",
    category: "appearance",
    risk: "low",
    icon: "AlignLeft",
    tier: "pro",
    applyCommand: `# Taskbar Left Windows 11
reg add "HKCU\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Explorer\\\\Advanced" /v TaskbarAl /t REG_DWORD /d 0 /f`,
    revertCommand: `# Taskbar Centered Windows 11
reg add "HKCU\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Explorer\\\\Advanced" /v TaskbarAl /t REG_DWORD /d 1 /f`,
    requiresReboot: false,
    windowsVersion: "11",
  },

  // ── PERFORMANCE (PRO) ──────────────────────────────────────────────────────
  {
    id: "disable_startup_delay",
    name: "Remove Startup Delay",
    description:
      "Removes the artificial delay when launching startup apps.",
    category: "performance",
    risk: "low",
    icon: "Zap",
    tier: "pro",
    applyCommand: `# Remove Startup Delay
reg add "HKCU\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Explorer\\\\Serialize" /v StartupDelayInMSec /t REG_DWORD /d 0 /f`,
    revertCommand: `# Restore Startup Delay
reg delete "HKCU\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Explorer\\\\Serialize" /v StartupDelayInMSec /f`,
    requiresReboot: false,
    windowsVersion: "10/11",
  },
  {
    id: "disable_xbox_game_dvr",
    name: "Disable Xbox Game DVR",
    description:
      "Disables Xbox background recording to gain gaming performance.",
    category: "performance",
    risk: "low",
    icon: "Gamepad2",
    tier: "pro",
    applyCommand: `# Disable Xbox Game DVR
reg add "HKCU\\\\System\\\\GameConfigStore" /v GameDVR_Enabled /t REG_DWORD /d 0 /f
reg add "HKLM\\\\SOFTWARE\\\\Policies\\\\Microsoft\\\\Windows\\\\GameDVR" /v AllowGameDVR /t REG_DWORD /d 0 /f`,
    revertCommand: `# Enable Xbox Game DVR
reg add "HKCU\\\\System\\\\GameConfigStore" /v GameDVR_Enabled /t REG_DWORD /d 1 /f
reg delete "HKLM\\\\SOFTWARE\\\\Policies\\\\Microsoft\\\\Windows\\\\GameDVR" /v AllowGameDVR /f`,
    requiresReboot: false,
    windowsVersion: "10/11",
  },
  {
    id: "enable_ultimate_performance",
    name: "Power Plan: Ultimate Performance",
    description:
      "Activates the hidden 'Ultimate Performance' power plan (best for desktops).",
    category: "performance",
    risk: "medium",
    icon: "Battery",
    tier: "pro",
    applyCommand: `# Enable Ultimate Performance Power Plan
powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61
powercfg /setactive e9a42b02-d5df-448d-aa00-03f14749eb61`,
    revertCommand: `# Revert to Balanced Plan
powercfg /setactive 381b4222-f694-41f0-9685-ff5bb260df2e`,
    requiresReboot: false,
    windowsVersion: "10/11",
  },

  // ── BLOATWARE (PRO) ────────────────────────────────────────────────────────
  {
    id: "remove_onedrive",
    name: "Remove OneDrive",
    description:
      "Uninstalls OneDrive and prevents it from reinstalling automatically.",
    category: "bloatware",
    risk: "medium",
    icon: "CloudOff",
    tier: "pro",
    applyCommand: `# Remove OneDrive
taskkill /f /im OneDrive.exe 2>$null
Start-Sleep -Seconds 2
if (Test-Path "$env:SYSTEMROOT\\\\System32\\\\OneDriveSetup.exe") {
  & "$env:SYSTEMROOT\\\\System32\\\\OneDriveSetup.exe" /uninstall
}
if (Test-Path "$env:SYSTEMROOT\\\\SysWOW64\\\\OneDriveSetup.exe") {
  & "$env:SYSTEMROOT\\\\SysWOW64\\\\OneDriveSetup.exe" /uninstall
}
reg add "HKLM\\\\SOFTWARE\\\\Policies\\\\Microsoft\\\\Windows\\\\OneDrive" /v DisableFileSyncNGSC /t REG_DWORD /d 1 /f`,
    revertCommand: `# Reinstall OneDrive (download from Microsoft)
reg delete "HKLM\\\\SOFTWARE\\\\Policies\\\\Microsoft\\\\Windows\\\\OneDrive" /v DisableFileSyncNGSC /f
Start-Process "winget" -ArgumentList "install Microsoft.OneDrive" -Wait`,
    requiresReboot: false,
    windowsVersion: "10/11",
  },
  {
    id: "remove_bloatware_apps",
    name: "Remove Preinstalled Apps",
    description:
      "Uninstalls preinstalled Windows apps that nobody uses (Xbox, Maps, News, etc.).",
    category: "bloatware",
    risk: "medium",
    icon: "Trash2",
    tier: "pro",
    applyCommand: `# Remove Windows Bloatware
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
  Write-Host "Removing: $app"
  Get-AppxPackage -Name $app -AllUsers | Remove-AppxPackage -AllUsers -ErrorAction SilentlyContinue
  Get-AppxProvisionedPackage -Online | Where-Object DisplayName -like $app | Remove-AppxProvisionedPackage -Online -ErrorAction SilentlyContinue
}`,
    revertCommand: `# Cannot automatically revert bloatware removal. Reinstall from Microsoft Store if needed.
Write-Host "To reinstall Windows apps, visit Microsoft Store."`,
    requiresReboot: false,
    windowsVersion: "10/11",
  },
];
