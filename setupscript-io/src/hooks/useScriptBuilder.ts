"use client";

import { useState, useCallback, useMemo } from "react";
import { AVAILABLE_APPS, AppCategory } from "@/data/apps";
import { SYSTEM_TWEAKS, TweakCategory, FREE_TWEAK_IDS } from "@/data/tweaks";
import { generateScript } from "@/lib/scriptGenerator";

// Whitelist for free users
const FREE_APPS_WHITELIST = new Set([
  "google_chrome",
  "vscode",
  "steam",
  "vlc",
  "7zip",
]);

export function useScriptBuilder() {
  const [selectedAppIds, setSelectedAppIds] = useState<Set<string>>(new Set());
  const [selectedTweakIds, setSelectedTweakIds] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<AppCategory | "all">("all");
  const [activeTweakCategory, setActiveTweakCategory] = useState<TweakCategory | "all">("all");
  const [isGodMode, setIsGodMode] = useState(false); // Default to free tier

  const toggleApp = useCallback((id: string) => {
    setSelectedAppIds((prev) => {
      const next = new Set(prev);
      // Enforce whitelist for free users
      if (!isGodMode && !FREE_APPS_WHITELIST.has(id)) {
        return next; // Do nothing if locked
      }
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, [isGodMode]);

  const toggleTweak = useCallback((id: string) => {
    setSelectedTweakIds((prev) => {
      const next = new Set(prev);
      // Enforce whitelist for free users
      const isFree = (FREE_TWEAK_IDS as readonly string[]).includes(id);
      if (!isGodMode && !isFree) {
         return next; // Do nothing if locked
      }
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, [isGodMode]);

  const selectAllAppsInCategory = useCallback(
    (category: AppCategory | "all") => {
      let appsInCategory =
        category === "all"
          ? AVAILABLE_APPS
          : AVAILABLE_APPS.filter((app) => app.category === category);

      // Filter for free tier if not in God Mode
      if (!isGodMode) {
        appsInCategory = appsInCategory.filter(app => FREE_APPS_WHITELIST.has(app.id));
      }

      setSelectedAppIds((prev) => {
        const next = new Set(prev);
        const allSelected = appsInCategory.every((app) => next.has(app.id));
        if (allSelected) {
          appsInCategory.forEach((app) => next.delete(app.id));
        } else {
          appsInCategory.forEach((app) => next.add(app.id));
        }
        return next;
      });
    },
    [isGodMode],
  );

  const clearAll = useCallback(() => {
    setSelectedAppIds(new Set());
    setSelectedTweakIds(new Set());
  }, []);

  const selectedApps = useMemo(
    () => AVAILABLE_APPS.filter((app) => selectedAppIds.has(app.id)),
    [selectedAppIds],
  );

  const selectedTweaks = useMemo(
    () => SYSTEM_TWEAKS.filter((tweak) => selectedTweakIds.has(tweak.id)),
    [selectedTweakIds],
  );

  const filteredApps = useMemo(
    () =>
      activeCategory === "all"
        ? AVAILABLE_APPS
        : AVAILABLE_APPS.filter((app) => app.category === activeCategory),
    [activeCategory],
  );

  const filteredTweaks = useMemo(
    () =>
      activeTweakCategory === "all"
        ? SYSTEM_TWEAKS
        : SYSTEM_TWEAKS.filter(
            (tweak) => tweak.category === activeTweakCategory,
          ),
    [activeTweakCategory],
  );

  const script = useMemo(
    () => generateScript({ selectedApps, selectedTweaks }),
    [selectedApps, selectedTweaks],
  );

  const totalSelected = selectedAppIds.size + selectedTweakIds.size;

  const selectedCountByCategory = useMemo(() => {
    const counts: Record<string, number> = { all: selectedAppIds.size };
    AVAILABLE_APPS.forEach((app) => {
      if (selectedAppIds.has(app.id)) {
        counts[app.category] = (counts[app.category] || 0) + 1;
      }
    });
    return counts;
  }, [selectedAppIds]);

  const selectedTweakCountByCategory = useMemo(() => {
    const counts: Record<string, number> = { all: selectedTweakIds.size };
    SYSTEM_TWEAKS.forEach((tweak) => {
      if (selectedTweakIds.has(tweak.id)) {
        counts[tweak.category] = (counts[tweak.category] || 0) + 1;
      }
    });
    return counts;
  }, [selectedTweakIds]);

  const isAppLocked = useCallback((id: string) => {
    return !isGodMode && !FREE_APPS_WHITELIST.has(id);
  }, [isGodMode]);

  const isTweakLocked = useCallback((id: string) => {
    const isFree = (FREE_TWEAK_IDS as readonly string[]).includes(id);
    return !isGodMode && !isFree;
  }, [isGodMode]);

  return {
    selectedAppIds,
    selectedTweakIds,
    activeCategory,
    activeTweakCategory,
    setActiveCategory,
    setActiveTweakCategory,
    toggleApp,
    toggleTweak,
    selectAllAppsInCategory,
    clearAll,
    filteredApps,
    filteredTweaks,
    selectedApps,
    selectedTweaks,
    script,
    totalSelected,
    selectedCountByCategory,
    selectedTweakCountByCategory,
    isGodMode,
    setIsGodMode,
    isAppLocked,
    isTweakLocked,
  };
}
