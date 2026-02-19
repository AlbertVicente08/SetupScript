import { useState } from "react";
import {
  Download,
  Copy,
  Eye,
  Check,
  Trash2,
  FileCode,
} from "lucide-react";
import {
  generateAndDownloadZip,
  copyToClipboard,
} from "@/lib/scriptGenerator";

interface ActionBarProps {
  totalSelected: number;
  appCount: number;
  tweakCount: number;
  script: string;
  onPreview: () => void;
  onClear: () => void;
}

export default function ActionBar({
  totalSelected,
  appCount,
  tweakCount,
  script,
  onPreview,
  onClear,
}: ActionBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(script);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadZip = () => {
    generateAndDownloadZip(script);
  };

  if (totalSelected === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-red-900/50 bg-[#0a0a0a]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Selection counter */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">
              <span className="font-bold text-neon-red">{appCount}</span> apps
            </span>
            <span className="text-gray-600">+</span>
            <span className="text-sm text-gray-400">
              <span className="font-bold text-neon-magenta">{tweakCount}</span>{" "}
              tweaks
            </span>
          </div>
          <div className="h-4 w-px bg-red-900/30" />
          <span className="text-sm font-semibold text-white">
            {totalSelected} selected
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Clear Button */}
          <button
            onClick={onClear}
            className="flex items-center gap-2 rounded-lg border border-red-900/30 bg-[#111111] px-3 py-2 text-sm text-gray-400 transition-all duration-200 hover:border-neon-red hover:text-neon-red"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Clear</span>
          </button>

          {/* Preview Button */}
          <button
            onClick={onPreview}
            className="flex items-center gap-2 rounded-lg border border-red-900/30 bg-[#111111] px-3 py-2 text-sm text-gray-400 transition-all duration-200 hover:border-neon-magenta hover:text-neon-magenta"
          >
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">View Script</span>
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all duration-200 ${copied
              ? "border-green-500 bg-green-500/10 text-green-400"
              : "border-red-900/30 bg-[#111111] text-gray-400 hover:border-neon-magenta hover:text-neon-magenta"
              }`}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span className="hidden sm:inline">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>

          <div className="h-6 w-px bg-white/10 mx-2" />

          {/* Download Buttons Group */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadZip}
              title="Download .zip package"
              className="flex items-center gap-2 rounded-lg bg-neon-red px-4 py-2 text-sm font-semibold text-white shadow-neon-red transition-all duration-200 hover:bg-red-600 hover:scale-105"
            >
              <FileCode className="h-4 w-4" />
              <span>Download ZIP</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

