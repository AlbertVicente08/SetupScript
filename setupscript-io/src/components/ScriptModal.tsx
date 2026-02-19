"use client";

import { X, Download, Copy, Check } from "lucide-react";
import { useState } from "react";
import ScriptPreview from "./ScriptPreview";
import { downloadScript, copyToClipboard } from "@/lib/scriptGenerator";

interface ScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  script: string;
  appCount: number;
  tweakCount: number;
}

export default function ScriptModal({
  isOpen,
  onClose,
  script,
  appCount,
  tweakCount,
}: ScriptModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    const success = await copyToClipboard(script);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    downloadScript(script);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-4xl rounded-2xl border border-red-900/50 bg-[#0a0a0a] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-red-900/30 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-white">
              Script Preview
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {appCount} apps · {tweakCount} tweaks ·{" "}
              <span className="text-neon-magenta font-mono">
                setupscript.ps1
              </span>
            </p>
            <p className="mt-2 text-xs font-semibold text-neon-red bg-red-900/10 border border-red-900/30 px-2 py-1 rounded inline-block">
              Right-click the .ps1 file → Run with PowerShell. Windows will ask for
              admin permission automatically.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Copy */}
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-all duration-200 ${
                copied
                  ? "border-green-500 bg-green-500/10 text-green-400"
                  : "border-red-900/30 text-gray-400 hover:border-neon-magenta hover:text-neon-magenta"
              }`}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "Copied!" : "Copy"}
            </button>

            {/* Download */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 rounded-lg bg-neon-red px-3 py-1.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-red-600"
            >
              <Download className="h-4 w-4" />
              Download
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="ml-2 flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-all duration-200 hover:bg-[#111111] hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <ScriptPreview script={script} />
        </div>
      </div>
    </div>
  );
}
