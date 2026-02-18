"use client";

import { SystemTweak, TweakRisk } from "@/data/tweaks";
import * as LucideIcons from "lucide-react";
import { LucideIcon, Check, AlertTriangle, Monitor } from "lucide-react";

interface TweakCardProps {
  tweak: SystemTweak;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

function getIcon(iconName: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[iconName] || LucideIcons.HelpCircle;
}

const riskConfig: Record<
  TweakRisk,
  { label: string; color: string; bg: string }
> = {
  low: { label: "Bajo", color: "text-green-400", bg: "bg-green-400/10" },
  medium: {
    label: "Medio",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  high: { label: "Alto", color: "text-neon-red", bg: "bg-neon-red/10" },
};

export default function TweakCard({
  tweak,
  isSelected,
  onToggle,
}: TweakCardProps) {
  const Icon = getIcon(tweak.icon);
  const risk = riskConfig[tweak.risk];

  return (
    <button
      onClick={() => onToggle(tweak.id)}
      className={`group relative flex items-start gap-4 rounded-xl p-4 text-left transition-all duration-200 border ${
        isSelected
          ? "border-neon-magenta bg-[rgba(204,0,255,0.06)] shadow-neon-magenta"
          : "border-red-900/30 bg-[#111111] hover:border-neon-red hover:bg-[#1a1a1a]"
      }`}
    >
      {/* Toggle indicator */}
      <div
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200 ${
          isSelected
            ? "border-neon-magenta bg-neon-magenta"
            : "border-gray-600 bg-transparent group-hover:border-neon-red"
        }`}
      >
        {isSelected && <Check className="h-3 w-3 text-white" />}
      </div>

      {/* Icon */}
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
          isSelected
            ? "bg-neon-magenta/20 text-neon-magenta"
            : "bg-[#1a1a1a] text-gray-400 group-hover:text-neon-red"
        }`}
      >
        <Icon className="h-4 w-4" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3
            className={`text-sm font-semibold transition-colors duration-200 ${
              isSelected ? "text-white" : "text-gray-200"
            }`}
          >
            {tweak.name}
          </h3>

          {/* Risk badge */}
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${risk.bg} ${risk.color}`}
          >
            {tweak.risk !== "low" && <AlertTriangle className="h-2.5 w-2.5" />}
            {risk.label}
          </span>

          {/* Windows version badge */}
          <span className="inline-flex items-center gap-1 rounded-full bg-[#1a1a1a] px-2 py-0.5 text-[10px] text-gray-500">
            <Monitor className="h-2.5 w-2.5" />
            Win {tweak.windowsVersion}
          </span>
        </div>

        <p className="mt-1 text-xs text-gray-500 line-clamp-2">
          {tweak.description}
        </p>

        {tweak.requiresReboot && (
          <p className="mt-1 text-[10px] text-yellow-500 flex items-center gap-1">
            <AlertTriangle className="h-2.5 w-2.5" />
            Requiere reinicio
          </p>
        )}
      </div>
    </button>
  );
}
