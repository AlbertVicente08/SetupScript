"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AVAILABLE_APPS } from "@/data/apps";
import { SYSTEM_TWEAKS } from "@/data/tweaks";

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
              Características
            </a>
            <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block">
              Precios
            </a>
            <Link
              href="/dashboard"
              className="rounded-lg bg-neon-red px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-red-600 hover:shadow-neon-red"
            >
              Abrir Dashboard →
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
            Gratis · Open Source · Sin Registro
          </motion.div>

          {/* H1 */}
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-orbitron font-black text-5xl md:text-7xl leading-tight tracking-tight"
          >
            Tu PC. Tu{" "}
            <span className="text-neon-red" style={{ textShadow: "0 0 40px rgba(255,26,26,0.6)" }}>
              Script
            </span>
            .
            <br />
            En segundos.
          </motion.h1>

          {/* Sub */}
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl font-jetbrains text-sm md:text-base text-gray-400 leading-relaxed"
          >
            &quot;Genera un PowerShell personalizado. Instala apps, activa tweaks, optimiza Windows.
            Para Gamers, Devs y power users.&quot;
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/dashboard"
              className="rounded-xl bg-neon-red px-8 py-3.5 font-syne font-bold text-white text-base transition-all hover:bg-red-600 hover:shadow-neon-red hover:scale-105"
            >
              ⚡ Crear mi Script — Es Gratis
            </Link>
            <a
              href="https://github.com/AlbertVicente08/SetupScript"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/20 px-8 py-3.5 font-syne font-semibold text-white text-base transition-all hover:bg-white/5 hover:border-white/40"
            >
              Ver en GitHub →
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500"
          >
            <div>
              <span className="font-bold text-white text-lg">{appCount}+</span>
              <p className="text-xs">Apps disponibles</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <span className="font-bold text-white text-lg">{tweakCount}</span>
              <p className="text-xs">Tweaks del sistema</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <span className="font-bold text-white text-lg">0</span>
              <p className="text-xs">Registro necesario</p>
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
                  <span className="text-[10px] text-gray-500">6 apps seleccionadas</span>
                  <div className="rounded bg-neon-red/80 px-3 py-1 text-[10px] font-medium text-white">
                    Descargar .ps1
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
            ¿Cuánto tardas en tener tu PC{" "}
            <span className="text-neon-red">lista</span>?
          </motion.h2>

          <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
              <h3 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-6">Antes</h3>
              <ul className="space-y-4">
                {[
                  "Descargar instaladores uno a uno",
                  "Olvidar qué apps tenías",
                  "Configurar todo manualmente",
                  "Telemetría activada por defecto",
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
              <h3 className="text-sm font-bold text-neon-red uppercase tracking-widest mb-6">Ahora</h3>
              <ul className="space-y-4">
                {[
                  "Un script. Una ejecución.",
                  "Tu setup reproducible siempre",
                  "PC optimizada automáticamente",
                  "Privacy tweaks incluidos",
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
          FEATURES GRID
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-[#0a0a0a]">
        <div className="mx-auto max-w-5xl">
          <motion.h2
            {...fadeUp}
            className="font-orbitron font-bold text-3xl md:text-4xl text-center mb-4"
          >
            Todo en un{" "}
            <span className="text-neon-red">script</span>
          </motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-center text-gray-500 mb-16 text-sm">
            Selecciona, genera y ejecuta. Así de simple.
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { emoji: "⚡", title: `${appCount}+ Apps con logo real`, desc: "Elige entre browsers, IDEs, herramientas gaming y más" },
              { emoji: "🔧", title: `${tweakCount} Tweaks del sistema`, desc: "Desactiva telemetría, activa modo oscuro, rendimiento máximo" },
              { emoji: "📋", title: "Preview en tiempo real", desc: "Ve el PowerShell generarse mientras seleccionas apps" },
              { emoji: "🎯", title: "Sin cuenta, sin límites", desc: "Descarga tu script directamente. El plan free es real" },
              { emoji: "☁️", title: "Presets en la nube", desc: "Guarda tu configuración con cuenta Pro y recupérala siempre" },
              { emoji: "🔗", title: "Comparte tu setup", desc: "URL pública para compartir tu configuración con amigos" },
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
            Sin suscripciones.
          </motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="mt-2 text-gray-500 text-base">
            Un pago. Para siempre.
          </motion.p>

          <div className="mt-16 grid md:grid-cols-2 gap-6 text-left">
            {/* ── NOOB / FREE ────────────────────────── */}
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="rounded-2xl border border-white/10 bg-[#111] p-8"
            >
              <h3 className="font-syne font-bold text-xl text-white">NOOB</h3>
              <p className="text-gray-500 text-xs mt-1">El punto de partida</p>
              <p className="mt-6">
                <span className="font-orbitron font-black text-5xl text-white">$0</span>
              </p>

              <ul className="mt-8 space-y-3">
                {[
                  `✅ Instalar ${appCount}+ Apps Ilimitadas`,
                  "✅ Tweaks Básicos (Solo Visuales)",
                  "✅ Descarga directa .ps1",
                  "✅ Sin cuenta requerida",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                    {item}
                  </li>
                ))}
                {[
                  "❌ Sin Optimizador de FPS (Bloatware/Telemetría bloqueado)",
                  "⚠️ Espera de 15s al ejecutar el script",
                  "❌ No permite guardar Presets",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/dashboard"
                className="mt-8 block w-full rounded-xl border border-white/20 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-white/5"
              >
                Empezar Gratis
              </Link>
            </motion.div>

            {/* ── GOD MODE / PRO ─────────────────────── */}
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="relative rounded-2xl border border-neon-red/50 bg-[#111] p-8"
              style={{ boxShadow: "0 0 30px rgba(255,26,26,0.3)" }}
            >
              {/* Badge */}
              <div className="absolute -top-3 left-6 rounded-full bg-neon-red px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                🔥 LIFETIME DEAL
              </div>

              <h3 className="font-syne font-bold text-xl text-white">GOD MODE</h3>
              <p className="text-gray-500 text-xs mt-1">Para los que van en serio</p>
              <p className="mt-6 flex items-baseline gap-2">
                <span className="font-orbitron font-black text-5xl text-neon-red">$9</span>
                <s className="text-gray-600 text-lg">$49</s>
              </p>
              <p className="text-xs text-gray-500 mt-1">Pago único · Tuyo para siempre</p>

              <ul className="mt-8 space-y-3">
                {[
                  "✅ FPS Booster Unlock: Elimina Bloatware, Telemetría y Espionaje",
                  "✅ Ejecución Instantánea (Sin publicidad/esperas)",
                  "✅ Cloud Save: Guarda tus configs para siempre",
                  "✅ Soporte Prioritario por Discord",
                  "✅ Acceso anticipado a nuevas features",
                  "✅ URL pública (setupscript.io/tu-setup)",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                    {item}
                  </li>
                ))}
              </ul>

              <button className="mt-8 block w-full rounded-xl bg-neon-red py-3 text-center text-sm font-bold text-white transition-all hover:bg-neon-magenta hover:shadow-neon-magenta">
                Obtener God Mode — $9
              </button>
              <p className="mt-3 text-center text-[10px] text-gray-600">
                Pago seguro via Stripe · Sin sorpresas
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
              <p className="text-[10px] text-gray-600">Tu PC. Tu Script. En segundos.</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-gray-500">
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <a href="https://github.com/AlbertVicente08/SetupScript" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
          </div>

          <p className="text-[10px] text-gray-700">
            © 2025 SetupScript.io · Hecho con ❤️ y mucho PowerShell
          </p>
        </div>
      </footer>
    </div>
  );
}
