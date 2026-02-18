"use client";

import { useMemo } from "react";

interface ScriptPreviewProps {
  script: string;
}

function highlightPowerShell(code: string): string {
  return code
    .split("\n")
    .map((line) => {
      // Escape HTML
      let escaped = line
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      // Comments (# ...) — gray
      if (/^\s*#/.test(escaped)) {
        return `<span class="text-gray-500">${escaped}</span>`;
      }

      // Multi-line comment block markers
      if (/^\s*<#/.test(escaped) || /^\s*#>/.test(escaped)) {
        return `<span class="text-gray-500">${escaped}</span>`;
      }

      // Write-Host — red
      escaped = escaped.replace(
        /(Write-Host|Write-Warning|Write-Error)/g,
        '<span class="text-neon-red font-semibold">$1</span>',
      );

      // Variables ($...) — magenta
      escaped = escaped.replace(
        /(\$\w+)/g,
        '<span class="text-neon-magenta">$1</span>',
      );

      // Strings ("...") — light red
      escaped = escaped.replace(
        /(&quot;[^&]*&quot;|"[^"]*")/g,
        '<span class="text-red-300">$1</span>',
      );

      // Commands (winget, reg, sc, powercfg, etc.)
      escaped = escaped.replace(
        /\b(winget|reg|sc|powercfg|taskkill|Start-Process|Get-AppxPackage|Remove-AppxPackage|Get-AppxProvisionedPackage|Remove-AppxProvisionedPackage|Set-ExecutionPolicy|Get-Command|Test-Path|Start-Sleep|Read-Host)\b/g,
        '<span class="text-neon-red/80">$1</span>',
      );

      // Flags (--something, -something)
      escaped = escaped.replace(
        /(\s)(--?\w[\w-]*)/g,
        '$1<span class="text-gray-400">$2</span>',
      );

      return escaped;
    })
    .join("\n");
}

export default function ScriptPreview({ script }: ScriptPreviewProps) {
  const highlightedScript = useMemo(() => highlightPowerShell(script), [script]);

  return (
    <div className="relative rounded-lg bg-[#0d0d0d] border border-red-900/20 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-red-900/20 px-4 py-2.5 bg-[#0a0a0a]">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-neon-red/40" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/40" />
          <div className="h-3 w-3 rounded-full bg-green-500/40" />
        </div>
        <span className="ml-2 text-xs text-gray-500 font-mono">
          setupscript.ps1
        </span>
      </div>

      {/* Code */}
      <pre className="overflow-auto p-4 text-sm leading-relaxed max-h-[60vh]">
        <code
          className="font-mono text-gray-300"
          dangerouslySetInnerHTML={{ __html: highlightedScript }}
        />
      </pre>
    </div>
  );
}
