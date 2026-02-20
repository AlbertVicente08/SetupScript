// src/components/Header.tsx

import Link from "next/link";
import { Terminal, Github } from "lucide-react";
import AuthIndicator from "./AuthIndicator";

export default function Header() {
  return (
    <header className="w-full border-b border-red-900/30 bg-[#0a0a0a]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo + Tagline */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neon-red/10 border border-neon-red/30">
            <Terminal className="h-5 w-5 text-neon-red" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-neon-red tracking-tight">
              SetupScript<span className="text-neon-magenta">.io</span>
            </h1>
            <p className="text-xs text-gray-500 hidden sm:block">
              Your PC. Your Script. In seconds.
            </p>
          </div>
        </Link>

        {/* GitHub Link */}
        <div className="flex items-center gap-4">
          <AuthIndicator />
          <a
            href="https://github.com/AlbertVicente08/SetupScript"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-red-900/30 bg-[#111111] px-4 py-2 text-sm text-gray-400 transition-all duration-200 hover:border-neon-magenta hover:text-neon-magenta"
          >
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
