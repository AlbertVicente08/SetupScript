// src/data/apps.ts

export type AppCategory =
  | "browsers"
  | "gaming"
  | "dev_tools"
  | "multimedia"
  | "communication"
  | "utilities";

export interface App {
  id: string;
  name: string;
  category: AppCategory;
  wingetId: string;
  description: string;
  icon: string;
  isRecommended?: boolean;
  isFree: boolean;
}

export const CATEGORY_LABELS: Record<AppCategory, string> = {
  browsers: "Navegadores",
  gaming: "Gaming",
  dev_tools: "Dev Tools",
  multimedia: "Multimedia",
  communication: "Comunicación",
  utilities: "Utilidades",
};

export const CATEGORY_ICONS: Record<AppCategory, string> = {
  browsers: "Globe",
  gaming: "Gamepad2",
  dev_tools: "Code2",
  multimedia: "Play",
  communication: "MessageSquare",
  utilities: "Wrench",
};

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
