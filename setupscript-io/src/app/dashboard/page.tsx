"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import AppCard from "@/components/AppCard";
import TweakCard from "@/components/TweakCard";
import ActionBar from "@/components/ActionBar";
import ScriptModal from "@/components/ScriptModal";
import { useScriptBuilder } from "@/hooks/useScriptBuilder";
import { AVAILABLE_APPS, AppCategory } from "@/data/apps";
import { Settings, Sparkles } from "lucide-react";

const categoryOrder: AppCategory[] = [
  "browsers",
  "devtools",
  "gaming",
  "creativity",
  "multimedia",
  "communication",
  "utilities",
];

const categoryLabels: Record<string, string> = {
  browsers: "🌐 Navegadores",
  devtools: "💻 Dev Tools",
  gaming: "🎮 Gaming",
  creativity: "🎨 Creatividad",
  multimedia: "🎵 Multimedia",
  communication: "💬 Comunicación",
  utilities: "🔧 Utilidades",
};

export default function DashboardPage() {
  const {
    selectedAppIds,
    selectedTweakIds,
    activeCategory,
    activeTweakCategory,
    setActiveCategory,
    setActiveTweakCategory,
    toggleApp,
    toggleTweak,
    clearAll,
    filteredApps,
    filteredTweaks,
    selectedApps,
    selectedTweaks,
    script,
    totalSelected,
    selectedCountByCategory,
    selectedTweakCountByCategory,
  } = useScriptBuilder();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Group apps by category when showing "all"
  const groupedApps = useMemo(() => {
    if (activeCategory !== "all") return null;
    const groups: Partial<Record<AppCategory, typeof AVAILABLE_APPS>> = {};
    for (const cat of categoryOrder) {
      const apps = AVAILABLE_APPS.filter((a) => a.category === cat);
      if (apps.length > 0) groups[cat] = apps;
    }
    return groups;
  }, [activeCategory]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden lg:block">
          <Sidebar
            activeCategory={activeCategory}
            activeTweakCategory={activeTweakCategory}
            onCategoryChange={setActiveCategory}
            onTweakCategoryChange={setActiveTweakCategory}
            selectedCountByCategory={selectedCountByCategory}
            selectedTweakCountByCategory={selectedTweakCountByCategory}
          />
        </div>

        <main className="flex-1 overflow-y-auto pb-20">
          <div className="mx-auto max-w-6xl px-6 py-6">
            {/* ── Stats ──────────────────────────────────── */}
            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-red-900/30 bg-[#111111] p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Apps Disponibles</p>
                <p className="mt-1 text-2xl font-bold text-neon-red">{AVAILABLE_APPS.length}</p>
              </div>
              <div className="rounded-xl border border-red-900/30 bg-[#111111] p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Tweaks del Sistema</p>
                <p className="mt-1 text-2xl font-bold text-neon-magenta">12</p>
              </div>
              <div className="rounded-xl border border-red-900/30 bg-[#111111] p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Apps Seleccionadas</p>
                <p className="mt-1 text-2xl font-bold text-white">{selectedAppIds.size}</p>
              </div>
              <div className="rounded-xl border border-red-900/30 bg-[#111111] p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Tweaks Activos</p>
                <p className="mt-1 text-2xl font-bold text-white">{selectedTweakIds.size}</p>
              </div>
            </div>

            {/* ── Mobile Category Selector ────────────── */}
            <div className="lg:hidden mb-6 flex gap-2 overflow-x-auto pb-2">
              {(["all", ...categoryOrder] as (AppCategory | "all")[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-neon-red/20 text-neon-red border border-neon-red/50"
                      : "bg-[#111111] text-gray-400 border border-red-900/30"
                  }`}
                >
                  {cat === "all" ? "⚡ Todas" : categoryLabels[cat]}
                </button>
              ))}
            </div>

            {/* ── Apps Section ────────────────────────── */}
            <section className="mb-10">
              {activeCategory === "all" && groupedApps ? (
                // Grouped view with separators
                categoryOrder.map((cat) => {
                  const apps = groupedApps[cat];
                  if (!apps || apps.length === 0) return null;
                  return (
                    <div key={cat}>
                      <div className="col-span-full mt-8 mb-3 flex items-center gap-3 first:mt-0">
                        <span className="text-sm font-bold uppercase tracking-widest text-red-500/70">
                          {categoryLabels[cat]}
                        </span>
                        <div className="flex-1 h-px bg-white/5" />
                        <span className="text-xs text-gray-600">{apps.length}</span>
                      </div>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {apps.map((app) => (
                          <AppCard
                            key={app.id}
                            app={app}
                            isSelected={selectedAppIds.has(app.id)}
                            onToggle={toggleApp}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                // Filtered view
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredApps.map((app) => (
                    <AppCard
                      key={app.id}
                      app={app}
                      isSelected={selectedAppIds.has(app.id)}
                      onToggle={toggleApp}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* ── Tweaks Section ──────────────────────── */}
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="h-5 w-5 text-neon-magenta" />
                <h2 className="text-lg font-bold text-white">Tweaks del Sistema</h2>
                <span className="ml-2 text-sm text-gray-500">({filteredTweaks.length})</span>
              </div>

              <div className="lg:hidden mb-4 flex gap-2 overflow-x-auto pb-2">
                {(["all", "privacy", "performance", "appearance", "bloatware"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveTweakCategory(cat)}
                    className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      activeTweakCategory === cat
                        ? "bg-neon-magenta/20 text-neon-magenta border border-neon-magenta/50"
                        : "bg-[#111111] text-gray-400 border border-red-900/30"
                    }`}
                  >
                    {cat === "all" ? "Todos" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                {filteredTweaks.map((tweak) => (
                  <TweakCard
                    key={tweak.id}
                    tweak={tweak}
                    isSelected={selectedTweakIds.has(tweak.id)}
                    onToggle={toggleTweak}
                  />
                ))}
              </div>
            </section>

            {totalSelected === 0 && (
              <div className="mt-8 flex flex-col items-center justify-center text-center py-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neon-red/10 border border-neon-red/20 mb-4">
                  <Sparkles className="h-8 w-8 text-neon-red/50" />
                </div>
                <h3 className="text-lg font-semibold text-gray-300">Selecciona apps y tweaks</h3>
                <p className="mt-2 max-w-sm text-sm text-gray-500">
                  Elige las aplicaciones que quieres instalar y los tweaks que deseas aplicar.
                  Tu script de PowerShell se generará automáticamente.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      <ActionBar
        totalSelected={totalSelected}
        appCount={selectedApps.length}
        tweakCount={selectedTweaks.length}
        script={script}
        onPreview={() => setIsModalOpen(true)}
        onClear={clearAll}
      />

      <ScriptModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        script={script}
        appCount={selectedApps.length}
        tweakCount={selectedTweaks.length}
      />
    </div>
  );
}
