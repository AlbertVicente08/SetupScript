"use client";

import { AppCategory, CATEGORY_LABELS, CATEGORY_ICONS } from "@/data/apps";
import {
  TweakCategory,
  TWEAK_CATEGORY_LABELS,
  TWEAK_CATEGORY_ICONS,
} from "@/data/tweaks";
import * as LucideIcons from "lucide-react";
import { LucideIcon, Layers, Settings } from "lucide-react";

interface SidebarProps {
  activeCategory: AppCategory | "all";
  activeTweakCategory: TweakCategory | "all";
  onCategoryChange: (category: AppCategory | "all") => void;
  onTweakCategoryChange: (category: TweakCategory | "all") => void;
  selectedCountByCategory: Record<string, number>;
  selectedTweakCountByCategory: Record<string, number>;
}

function getIcon(iconName: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[iconName] || LucideIcons.HelpCircle;
}

export default function Sidebar({
  activeCategory,
  activeTweakCategory,
  onCategoryChange,
  onTweakCategoryChange,
  selectedCountByCategory,
  selectedTweakCountByCategory,
}: SidebarProps) {
  const appCategories: (AppCategory | "all")[] = [
    "all",
    "browsers",
    "gaming",
    "dev_tools",
    "multimedia",
    "communication",
    "utilities",
  ];

  const tweakCategories: (TweakCategory | "all")[] = [
    "all",
    "privacy",
    "performance",
    "appearance",
    "bloatware",
  ];

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
          {appCategories.map((cat) => {
            const isActive = activeCategory === cat;
            const label = cat === "all" ? "Todas" : CATEGORY_LABELS[cat];
            const iconName = cat === "all" ? "LayoutGrid" : CATEGORY_ICONS[cat];
            const Icon = getIcon(iconName);
            const count = selectedCountByCategory[cat] || 0;

            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-neon-red/15 text-neon-red border-l-2 border-neon-red"
                    : "text-gray-400 hover:bg-[#111111] hover:text-gray-200"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4" />
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
          {tweakCategories.map((cat) => {
            const isActive = activeTweakCategory === cat;
            const label =
              cat === "all" ? "Todos" : TWEAK_CATEGORY_LABELS[cat];
            const iconName =
              cat === "all" ? "LayoutGrid" : TWEAK_CATEGORY_ICONS[cat];
            const Icon = getIcon(iconName);
            const count = selectedTweakCountByCategory[cat] || 0;

            return (
              <button
                key={cat}
                onClick={() => onTweakCategoryChange(cat)}
                className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-neon-magenta/15 text-neon-magenta border-l-2 border-neon-magenta"
                    : "text-gray-400 hover:bg-[#111111] hover:text-gray-200"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4" />
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
