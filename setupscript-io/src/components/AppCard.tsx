"use client";

import { Check, Star, Lock } from "lucide-react";

interface AppCardProps {
  app: App;
  isSelected: boolean;
  isLocked?: boolean;
  onToggle: (id: string) => void;
}

export default function AppCard({ app, isSelected, isLocked = false, onToggle }: AppCardProps) {
  const isUrl = app.icon?.startsWith("http");

  return (
    <button
      onClick={() => !isLocked && onToggle(app.id)}
      disabled={isLocked}
      className={`group relative flex flex-col items-start gap-3 rounded-xl p-6 text-left transition-all duration-200 glass-card ${
        isLocked
          ? "opacity-40 cursor-not-allowed grayscale"
          : isSelected
          ? "glass-card selected"
          : "hover:bg-[rgba(255,255,255,0.05)]"
      }`}
    >
      {/* Selection indicator or Lock */}
      <div
        className={`absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-md border transition-all duration-200 ${
          isLocked
            ? "border-transparent bg-transparent"
            : isSelected
            ? "border-neon-red bg-neon-red"
            : "border-gray-600 bg-transparent group-hover:border-neon-magenta"
        }`}
      >
        {isLocked ? (
          <Lock className="h-4 w-4 text-gray-400" />
        ) : (
          isSelected && <Check className="h-3 w-3 text-white" />
        )}
      </div>

      {/* Icon + Name */}
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200 ${
            isSelected
              ? "bg-neon-red/20"
              : "bg-[#1a1a1a] group-hover:bg-[#222]"
          }`}
        >
          {isUrl ? (
            <img
              src={app.icon}
              alt={app.name}
              className="w-6 h-6 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <span className="text-xl">{app.icon || "📦"}</span>
          )}
        </div>
        <div>
          <h3
            className={`text-sm font-bold tracking-tight transition-colors duration-200 ${
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
