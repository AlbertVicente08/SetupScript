"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AVAILABLE_APPS } from "@/data/apps";
import { SYSTEM_TWEAKS } from "@/data/tweaks";
import { Play } from "lucide-react";
import DemoVideo from "@/components/DemoVideo";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

// ── Mini mock cards for hero dashboard preview ──
const mockCards = [
  { name: "Chrome", emoji: "🌐" },
  { name: "VS Code", emoji: "💻" },
  { name: "Steam", emoji: "🎮" },
  { name: "Discord", emoji: "💬" },
  { name: "Node.js", emoji: "🟢" },
  { name: "7-Zip", emoji: "📦" },
];

export default function LandingPage() {
  const appCount = AVAILABLE_APPS.length;
  const tweakCount = SYSTEM_TWEAKS.length;

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      {/* ═══════════════════════════════════════════════════════════════════
          NAVBAR
      ═══════════════════════════════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#080808]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-neon-red font-jetbrains font-bold text-lg">{">_"}</span>
            <span className="font-orbitron font-bold text-base tracking-wider">
              SetupScript<span className="text-neon-red">.io</span>
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block">
              Features
            </a>
            <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block">
              Pricing
            </a>
            <Link
              href="/dashboard"
              className="rounded-lg bg-neon-red px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-red-600 hover:shadow-neon-red"
            >
              Open Dashboard →
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-neon-red/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl text-center">
          {/* Badge */}
          <motion.div {...fadeUp} className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300">
            <span className="text-neon-red">⚡</span>
            Free · Open Source · No Registration
          </motion.div>

          {/* H1 */}
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-orbitron font-black text-5xl md:text-7xl leading-tight tracking-tight"
          >
            Your PC. Your{" "}
            <span className="text-neon-red" style={{ textShadow: "0 0 40px rgba(255,26,26,0.6)" }}>
              Script
            </span>
            .
            <br />
            In seconds.
          </motion.h1>

          {/* Sub */}
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl font-jetbrains text-sm md:text-base text-gray-400 leading-relaxed"
          >
            &quot;Generate a custom PowerShell script. Install apps, apply tweaks, optimize Windows.
            For Gamers, Devs, and Power Users.&quot;
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/dashboard"
              className="group relative flex items-center gap-2 rounded-full bg-neon-red px-8 py-4 text-lg font-bold text-white shadow-neon-red transition-all hover:bg-red-600 hover:scale-105"
            >
              Start Generating
              <span className="opacity-70 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
            
            <button
               onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
               className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-white/10 hover:border-white/20"
            >
              <Play className="fill-current h-4 w-4" />
              Watch Demo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500"
          >
            <div>
              <span className="font-bold text-white text-lg">{appCount}+</span>
              <p className="text-xs">Available Apps</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <span className="font-bold text-white text-lg">{tweakCount}</span>
              <p className="text-xs">System Tweaks</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <span className="font-bold text-white text-lg">0</span>
              <p className="text-xs">Registration Required</p>
            </div>
          </motion.div>

          {/* ── Dashboard Mockup ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="mx-auto max-w-3xl"
              style={{ perspective: "1200px" }}
            >
              <div
                className="rounded-2xl border border-neon-red/30 bg-[#111] p-6 shadow-[0_0_60px_rgba(255,26,26,0.15)]"
                style={{ transform: "rotateX(8deg) rotateY(-3deg)" }}
              >
                {/* Mini header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-3 w-3 rounded-full bg-neon-red/50" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/30" />
                  <div className="h-3 w-3 rounded-full bg-green-500/30" />
                  <span className="ml-3 text-[10px] text-gray-600 font-mono">SetupScript.io Dashboard</span>
                </div>
                {/* Mini cards grid */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {mockCards.map((card) => (
                    <div
                      key={card.name}
                      className="rounded-lg border border-white/5 bg-white/[0.02] p-3 text-center"
                    >
                      <span className="text-lg">{card.emoji}</span>
                      <p className="mt-1 text-[9px] text-gray-500 truncate">{card.name}</p>
                    </div>
                  ))}
                </div>
                {/* Mini action bar */}
                <div className="mt-4 flex items-center justify-between rounded-lg bg-[#0a0a0a] px-4 py-2">
                  <span className="text-[10px] text-gray-500">6 apps selected</span>
                  <div className="rounded bg-neon-red/80 px-3 py-1 text-[10px] font-medium text-white">
                    Download .ps1
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          THE PROBLEM
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="features" className="py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <motion.h2
            {...fadeUp}
            className="font-orbitron font-bold text-3xl md:text-4xl text-center mb-16"
          >
            How long does it take to get your PC{" "}
            <span className="text-neon-red">ready</span>?
          </motion.h2>

          <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
              <h3 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-6">Before</h3>
              <ul className="space-y-4">
                {[
                  "Downloading installers one by one",
                  "Forgetting which apps you had",
                  "Configuring everything manually",
                  "Telemetry enabled by default",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-400">
                    <span className="text-red-500 text-base mt-0.5">✕</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div className="rounded-2xl border border-neon-red/20 bg-neon-red/[0.03] p-8">
              <h3 className="text-sm font-bold text-neon-red uppercase tracking-widest mb-6">Now</h3>
              <ul className="space-y-4">
                {[
                  "One script. One execution.",
                  "Your setup is always reproducible",
                  "PC optimized automatically",
                  "Privacy tweaks included",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-200">
                    <span className="text-neon-red text-base mt-0.5">✓</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          DEMO VIDEO
      ═══════════════════════════════════════════════════════════════════ */}
      <DemoVideo />

      {/* ═══════════════════════════════════════════════════════════════════
          FEATURES GRID
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-[#0a0a0a]">
        <div className="mx-auto max-w-5xl">
          <motion.h2
            {...fadeUp}
            className="font-orbitron font-bold text-3xl md:text-4xl text-center mb-4"
          >
            All in one{" "}
            <span className="text-neon-red">script</span>
          </motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-center text-gray-500 mb-16 text-sm">
            Select, generate, and execute. Simple as that.
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { emoji: "⚡", title: `${appCount}+ Apps with real logos`, desc: "Choose from Browsers, IDEs, Gaming tools, and more" },
              { emoji: "🔧", title: `${tweakCount} System Tweaks`, desc: "Disable telemetry, enable dark mode, max performance" },
              { emoji: "📋", title: "Real-time Preview", desc: "Watch the PowerShell script generate as you select apps" },
              { emoji: "🎯", title: "No account, no limits", desc: "Download your script directly. The free plan is real" },
              { emoji: "☁️", title: "Cloud Presets", desc: "Save your configuration with Pro account and restore it anytime" },
              { emoji: "🔗", title: "Share your setup", desc: "Public URL to share your configuration with friends" },
            ].map((feat, i) => (
              <motion.div
                key={feat.title}
                {...fadeUp}
                transition={{ delay: 0.1 * i }}
                className="rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm p-6 transition-all hover:border-neon-red/30 hover:bg-white/[0.05]"
              >
                <span className="text-2xl">{feat.emoji}</span>
                <h3 className="mt-3 font-semibold text-white text-sm">{feat.title}</h3>
                <p className="mt-2 text-xs text-gray-500 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PRICING
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="pricing" className="py-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            {...fadeUp}
            className="font-orbitron font-bold text-3xl md:text-4xl"
          >
            No subscriptions.
          </motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="mt-2 text-gray-500 text-base">
            One payment. Forever.
          </motion.p>

          <div className="mt-16 grid md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
            {/* ── FREE ──────────────────────────────── */}
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="rounded-2xl border border-white/10 bg-[#111] p-8"
            >
              <h3 className="font-syne font-bold text-xl text-white">FREE</h3>
              <p className="mt-6">
                <span className="font-orbitron font-black text-5xl text-white">$0</span>
              </p>

              <ul className="mt-8 space-y-3">
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-neon-red">✓</span> 5 essential apps included:
                </li>
                <li className="pl-6 text-xs text-gray-500">
                  Chrome, VS Code, Steam, VLC, 7-Zip
                </li>
                {[
                  "15-second wait",
                  "SetupScript.io branded in script",
                  "No tweaks",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="text-gray-600">•</span> {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/dashboard"
                className="mt-8 block w-full rounded-xl border border-white/20 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-white/5"
              >
                Start for Free
              </Link>
            </motion.div>

            {/* ── GOD MODE ──────────────────────────── */}
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="relative overflow-hidden rounded-2xl border border-neon-red/30 bg-neon-red/5 p-8 shadow-[0_0_40px_rgba(255,26,26,0.1)]"
            >
              <div className="absolute -top-12 -right-12 h-24 w-24 bg-neon-red/20 blur-2xl rounded-full" />
              <div className="absolute top-0 right-0 rounded-bl-xl bg-neon-red px-3 py-1 text-xs font-bold text-white shadow-lg">
                LIFETIME DEAL
              </div>

              <h3 className="font-orbitron text-2xl font-bold text-white">
                GOD MODE
              </h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">$9</span>
                <span className="text-lg text-gray-500 line-through decoration-neon-red/50 decoration-2">$49</span>
                <span className="text-sm font-semibold text-neon-red/80 uppercase tracking-wider">/ one-time</span>
              </div>
              <p className="mt-1 text-xs text-gray-400">One-time payment · Yours forever</p>
              
              <p className="mt-4 text-sm text-gray-400">
                Unlock the full potential of your PC.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  "Unlimited App Installs",
                  "Access All 50+ Tweaks",
                  "Remove 15s Wait Timer",
                  "Remove 'Free Version' Branding",
                  "Support Future Development",
                  "Priority Support",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neon-red/20 text-neon-red">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="https://buy.stripe.com/5kA9BPcsk2O80Fy4gg"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block w-full rounded-lg bg-neon-red py-3 text-center text-sm font-bold text-white shadow-neon-red transition-all hover:bg-red-600 hover:scale-[1.02]"
              >
                Get God Mode — $9
              </a>
              <p className="mt-3 text-[10px] text-center text-gray-500 flex items-center justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500/50 inline-block" />
                Secure payment via Stripe · No surprises
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════════ */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-neon-red font-jetbrains font-bold">{">_"}</span>
            <div>
              <span className="font-orbitron font-bold text-sm">SetupScript<span className="text-neon-red">.io</span></span>
              <p className="text-[10px] text-gray-600">Your PC. Your Script. In seconds.</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-gray-500">
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <a href="https://github.com/AlbertVicente08/SetupScript" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
          </div>

          <p className="text-[10px] text-gray-700">
            © 2025 SetupScript.io · Made with ❤️ and lots of PowerShell
          </p>
        </div>
      </footer>
    </div>
  );
}
