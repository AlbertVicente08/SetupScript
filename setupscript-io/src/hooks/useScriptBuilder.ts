"use client";

import { useState, useCallback, useMemo } from "react";
import { AVAILABLE_APPS, AppCategory } from "@/data/apps";
import { SYSTEM_TWEAKS, TweakCategory } from "@/data/tweaks";
import { generateScript } from "@/lib/scriptGenerator";

export function useScriptBuilder() {
  const [selectedAppIds, setSelectedAppIds] = useState<Set<string>>(new Set());
  const [selectedTweakIds, setSelectedTweakIds] = useState<Set<string>>(
    new Set(),
  );
  const [activeCategory, setActiveCategory] = useState<AppCategory | "all">(
    "all",
  );
  const [activeTweakCategory, setActiveTweakCategory] = useState<
    TweakCategory | "all"
  >("all");

  const toggleApp = useCallback((id: string) => {
    setSelectedAppIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const toggleTweak = useCallback((id: string) => {
    setSelectedTweakIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const selectAllAppsInCategory = useCallback(
    (category: AppCategory | "all") => {
      const appsInCategory =
        category === "all"
          ? AVAILABLE_APPS
          : AVAILABLE_APPS.filter((app) => app.category === category);
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
    [],
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

  // Count selected apps per category
  const selectedCountByCategory = useMemo(() => {
    const counts: Record<string, number> = { all: selectedAppIds.size };
    AVAILABLE_APPS.forEach((app) => {
      if (selectedAppIds.has(app.id)) {
        counts[app.category] = (counts[app.category] || 0) + 1;
      }
    });
    return counts;
  }, [selectedAppIds]);

  // Count selected tweaks per category
  const selectedTweakCountByCategory = useMemo(() => {
    const counts: Record<string, number> = { all: selectedTweakIds.size };
    SYSTEM_TWEAKS.forEach((tweak) => {
      if (selectedTweakIds.has(tweak.id)) {
        counts[tweak.category] = (counts[tweak.category] || 0) + 1;
      }
    });
    return counts;
  }, [selectedTweakIds]);

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
  };
}
