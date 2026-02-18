"use client";

import { App } from "@/data/apps";
import * as LucideIcons from "lucide-react";
import { LucideIcon, Check, Star } from "lucide-react";

interface AppCardProps {
  app: App;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

function getIcon(iconName: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[iconName] || LucideIcons.HelpCircle;
}

export default function AppCard({ app, isSelected, onToggle }: AppCardProps) {
  const Icon = getIcon(app.icon);

  return (
    <button
      onClick={() => onToggle(app.id)}
      className={`group relative flex flex-col items-start gap-3 rounded-xl p-4 text-left transition-all duration-200 border ${
        isSelected
          ? "border-neon-red bg-[rgba(255,26,26,0.08)] shadow-neon-red"
          : "border-red-900/30 bg-[#111111] hover:border-neon-magenta hover:bg-[#1a1a1a]"
      }`}
    >
      {/* Selection indicator */}
      <div
        className={`absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-md border transition-all duration-200 ${
          isSelected
            ? "border-neon-red bg-neon-red"
            : "border-gray-600 bg-transparent group-hover:border-neon-magenta"
        }`}
      >
        {isSelected && <Check className="h-3 w-3 text-white" />}
      </div>

      {/* Recommended badge */}
      {app.isRecommended && (
        <div className="flex items-center gap-1 rounded-full bg-neon-red/10 px-2 py-0.5 text-[10px] font-semibold text-neon-red uppercase tracking-wider">
          <Star className="h-3 w-3 fill-neon-red" />
          Recomendado
        </div>
      )}

      {/* Icon + Name */}
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200 ${
            isSelected
              ? "bg-neon-red/20 text-neon-red"
              : "bg-[#1a1a1a] text-gray-400 group-hover:text-neon-magenta"
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3
            className={`text-sm font-semibold transition-colors duration-200 ${
              isSelected ? "text-white" : "text-gray-200"
            }`}
          >
            {app.name}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
            {app.description}
          </p>
        </div>
      </div>

      {/* Winget ID */}
      <div className="mt-auto">
        <span className="inline-block rounded bg-[#0d0d0d] px-2 py-0.5 font-mono text-[10px] text-neon-magenta/60">
          {app.wingetId}
        </span>
      </div>
    </button>
  );
}
