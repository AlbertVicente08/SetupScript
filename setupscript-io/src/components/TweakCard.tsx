"use client";

import { SystemTweak, TweakRisk } from "@/data/tweaks";
import {
  Shield,
  Zap,
  Palette,
  Trash2,
  AlertTriangle,
  Monitor,
  Lock,
  Check,
  LucideIcon,
  Mic,
  MicOff,
  Eye,
  EyeOff,
  Clock,
  Moon,
  FolderOpen,
  AlignLeft,
  Gamepad2,
  Battery,
  CloudOff,
} from "lucide-react";
import { motion } from "framer-motion";

interface TweakCardProps {
  tweak: SystemTweak;
  isSelected: boolean;
  onToggle: (id: string) => void;
  isLocked?: boolean;
}

const ICONS: Record<string, LucideIcon> = {
  ShieldOff: Shield,
  Zap: Zap,
  Palette: Palette,
  Trash2: Trash2,
  MicOff: MicOff,
  EyeOff: EyeOff,
  Clock: Clock,
  Moon: Moon,
  Eye: Eye,
  FolderOpen: FolderOpen,
  AlignLeft: AlignLeft,
  Gamepad2: Gamepad2,
  Battery: Battery,
  CloudOff: CloudOff,
  // Fallbacks or extras just in case
  Shield: Shield,
  Mic: Mic,
};

const riskConfig: Record<
  TweakRisk,
  { label: string; color: string; bg: string }
> = {
  low: { label: "Low", color: "text-green-400", bg: "bg-green-400/10" },
  medium: {
    label: "Medium",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  high: { label: "High", color: "text-neon-red", bg: "bg-neon-red/10" },
};

export default function TweakCard({
  tweak,
  isSelected,
  onToggle,
  isLocked = false,
}: TweakCardProps) {
  const Icon = ICONS[tweak.icon] || Zap;
  const risk = riskConfig[tweak.risk];
  const isPro = tweak.tier === "pro";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`group relative flex flex-col justify-between rounded-xl border p-4 transition-all duration-300 ${
        isLocked
          ? "cursor-not-allowed border-white/5 bg-white/[0.02] opacity-50 grayscale"
          : isSelected
          ? "border-neon-red/50 bg-neon-red/10 shadow-[0_0_20px_rgba(255,26,26,0.1)]"
          : "hover:border-white/20 hover:bg-white/5 border-white/10 bg-[#111]"
      }`}
      onClick={() => !isLocked && onToggle(tweak.id)}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`rounded-lg p-2 transition-colors ${
              isLocked
                ? "bg-white/5 text-gray-500"
                : isSelected
                ? "bg-neon-red/20 text-neon-red"
                : "bg-white/5 text-gray-400 group-hover:text-white"
            }`}
          >
            <Icon size={20} />
          </div>
          <div>
            <h3
              className={`font-bold text-sm ${
                isLocked ? "text-gray-500" : "text-white"
              }`}
            >
              {tweak.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              {/* Risk Badge */}
              <span
                className={`text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded ${risk.bg} ${risk.color}`}
              >
                {tweak.risk === "high"
                  ? "High Risk"
                  : tweak.risk === "medium"
                  ? "Med Risk"
                  : "Safe"}
              </span>

              {/* Pro Badge - Show even if locked to indicate why */}
              {isPro && (
                <span className="text-[10px] font-bold text-neon-red px-1.5 py-0.5 bg-neon-red/10 rounded border border-neon-red/20">
                  GOD MODE
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Checkbox / Lock */}
        <div
          className={`h-6 w-6 rounded-full border flex items-center justify-center transition-all ${
            isLocked
              ? "border-white/10 bg-white/5 text-gray-500"
              : isSelected
              ? "border-neon-red bg-neon-red text-white"
              : "border-white/20 bg-transparent group-hover:border-white/40"
          }`}
        >
          {isLocked ? (
            <Lock size={12} />
          ) : isSelected ? (
            <Check size={14} />
          ) : null}
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 text-xs text-gray-400 leading-relaxed line-clamp-2">
        {tweak.description}
      </p>

      {/* Footer Info */}
      <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
        <div className="flex items-center gap-2 text-[10px] text-gray-500">
          {tweak.requiresReboot && (
            <span className="flex items-center gap-1 text-yellow-500/80">
              <AlertTriangle size={10} />
              Reboot required
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
