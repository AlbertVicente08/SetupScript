"use client";

import { AppCategory, CATEGORY_LABELS, CATEGORY_ICONS } from "@/data/apps";
import {
  TweakCategory,
  TWEAK_CATEGORY_LABELS,
} from "@/data/tweaks";
import { Layers, Settings } from "lucide-react";

interface SidebarProps {
  activeCategory: AppCategory | "all";
  activeTweakCategory: TweakCategory | "all";
  onCategoryChange: (category: AppCategory | "all") => void;
  onTweakCategoryChange: (category: TweakCategory | "all") => void;
  selectedCountByCategory: Record<string, number>;
  selectedTweakCountByCategory: Record<string, number>;
}

const appCategories: { id: AppCategory | "all"; label: string; emoji: string }[] = [
  { id: "all", label: "Todas", emoji: "⚡" },
  { id: "browsers", label: "Navegadores", emoji: "🌐" },
  { id: "devtools", label: "Dev Tools", emoji: "💻" },
  { id: "gaming", label: "Gaming", emoji: "🎮" },
  { id: "creativity", label: "Creatividad", emoji: "🎨" },
  { id: "multimedia", label: "Multimedia", emoji: "🎵" },
  { id: "communication", label: "Comunicación", emoji: "💬" },
  { id: "utilities", label: "Utilidades", emoji: "🔧" },
];

const tweakCategories: { id: TweakCategory | "all"; label: string; emoji: string }[] = [
  { id: "all", label: "Todos", emoji: "⚙️" },
  { id: "privacy", label: "Privacidad", emoji: "🔒" },
  { id: "performance", label: "Rendimiento", emoji: "⚡" },
  { id: "appearance", label: "Apariencia", emoji: "🎨" },
  { id: "bloatware", label: "Bloatware", emoji: "🗑️" },
];

export default function Sidebar({
  activeCategory,
  activeTweakCategory,
  onCategoryChange,
  onTweakCategoryChange,
  selectedCountByCategory,
  selectedTweakCountByCategory,
}: SidebarProps) {
  return (
    <aside className="w-60 shrink-0 border-r border-red-900/30 bg-[#0a0a0a] overflow-y-auto">
      <div className="p-4">
        {/* ── Apps Section ──────────────────────────────── */}
        <div className="flex items-center gap-2 mb-3">
          <Layers className="h-4 w-4 text-neon-red" />
          <h2 className="text-sm font-semibold text-neon-red uppercase tracking-wider">
            Aplicaciones
          </h2>
        </div>

        <nav className="space-y-1 mb-6">
          {appCategories.map(({ id, label, emoji }) => {
            const isActive = activeCategory === id;
            const count = selectedCountByCategory[id] || 0;

            return (
              <button
                key={id}
                onClick={() => onCategoryChange(id)}
                className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-neon-red/15 text-neon-red border-l-2 border-neon-red"
                    : "text-gray-400 hover:bg-[#111111] hover:text-gray-200"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{emoji}</span>
                  <span>{label}</span>
                </div>
                {count > 0 && (
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-neon-magenta/20 px-1.5 text-xs font-medium text-neon-magenta">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* ── Divider ──────────────────────────────────── */}
        <div className="border-t border-red-900/30 my-4" />

        {/* ── Tweaks Section ────────────────────────────── */}
        <div className="flex items-center gap-2 mb-3">
          <Settings className="h-4 w-4 text-neon-magenta" />
          <h2 className="text-sm font-semibold text-neon-magenta uppercase tracking-wider">
            Tweaks
          </h2>
        </div>

        <nav className="space-y-1">
          {tweakCategories.map(({ id, label, emoji }) => {
            const isActive = activeTweakCategory === id;
            const count = selectedTweakCountByCategory[id] || 0;

            return (
              <button
                key={id}
                onClick={() => onTweakCategoryChange(id)}
                className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-neon-magenta/15 text-neon-magenta border-l-2 border-neon-magenta"
                    : "text-gray-400 hover:bg-[#111111] hover:text-gray-200"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{emoji}</span>
                  <span>{label}</span>
                </div>
                {count > 0 && (
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-neon-red/20 px-1.5 text-xs font-medium text-neon-red">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
