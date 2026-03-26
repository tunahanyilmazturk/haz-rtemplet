"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

export type FontSize = "small" | "medium" | "large";
export type PrimaryColor = "violet" | "blue" | "green" | "red" | "orange" | "yellow" | "pink" | "slate";
export type SidebarPosition = "left" | "right";

interface AppearanceSettings {
  fontSize: FontSize;
  primaryColor: PrimaryColor;
  sidebarPosition: SidebarPosition;
  animations: boolean;
  compactMode: boolean;
}

interface AppearanceContextType extends AppearanceSettings {
  setFontSize: (size: FontSize) => void;
  setPrimaryColor: (color: PrimaryColor) => void;
  setSidebarPosition: (position: SidebarPosition) => void;
  setAnimations: (enabled: boolean) => void;
  setCompactMode: (enabled: boolean) => void;
  resetAppearance: () => void;
  isLoaded: boolean;
}

const STORAGE_KEY = "saas-appearance-settings";

const defaultSettings: AppearanceSettings = {
  fontSize: "medium",
  primaryColor: "violet",
  sidebarPosition: "left",
  animations: true,
  compactMode: false,
};

const colorValues: Record<PrimaryColor, { primary: string; foreground: string; ring: string; sidebarPrimary: string }> = {
  violet: {
    primary: "hsl(262.1 83.3% 57.8%)",
    foreground: "hsl(0 0% 100%)",
    ring: "hsl(262.1 83.3% 57.8%)",
    sidebarPrimary: "hsl(262.1 83.3% 57.8%)",
  },
  blue: {
    primary: "hsl(221.2 83.2% 53.3%)",
    foreground: "hsl(0 0% 100%)",
    ring: "hsl(221.2 83.2% 53.3%)",
    sidebarPrimary: "hsl(221.2 83.2% 53.3%)",
  },
  green: {
    primary: "hsl(142.1 76.2% 36.3%)",
    foreground: "hsl(0 0% 100%)",
    ring: "hsl(142.1 76.2% 36.3%)",
    sidebarPrimary: "hsl(142.1 76.2% 36.3%)",
  },
  red: {
    primary: "hsl(0 84.2% 60.2%)",
    foreground: "hsl(0 0% 100%)",
    ring: "hsl(0 84.2% 60.2%)",
    sidebarPrimary: "hsl(0 84.2% 60.2%)",
  },
  orange: {
    primary: "hsl(24.6 95% 53.1%)",
    foreground: "hsl(0 0% 100%)",
    ring: "hsl(24.6 95% 53.1%)",
    sidebarPrimary: "hsl(24.6 95% 53.1%)",
  },
  yellow: {
    primary: "hsl(47.9 95.8% 53.1%)",
    foreground: "hsl(0 0% 0%)",
    ring: "hsl(47.9 95.8% 53.1%)",
    sidebarPrimary: "hsl(47.9 95.8% 53.1%)",
  },
  pink: {
    primary: "hsl(330 81.2% 60.4%)",
    foreground: "hsl(0 0% 100%)",
    ring: "hsl(330 81.2% 60.4%)",
    sidebarPrimary: "hsl(330 81.2% 60.4%)",
  },
  slate: {
    primary: "hsl(215.3 19.3% 34.5%)",
    foreground: "hsl(0 0% 100%)",
    ring: "hsl(215.3 19.3% 34.5%)",
    sidebarPrimary: "hsl(215.3 19.3% 34.5%)",
  },
};

const AppearanceContext = createContext<AppearanceContextType | undefined>(undefined);

function loadSettings(): AppearanceSettings {
  if (typeof window === "undefined") return defaultSettings;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultSettings, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error("Failed to load appearance settings:", e);
  }

  return defaultSettings;
}

function saveSettings(settings: AppearanceSettings) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error("Failed to save appearance settings:", e);
  }
}

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppearanceSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const loaded = loadSettings();
    setSettings(loaded);
    setIsLoaded(true);
  }, []);

  const applySettings = useCallback((newSettings: AppearanceSettings) => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    const colors = colorValues[newSettings.primaryColor];

    // Apply font size
    const fontSizes: Record<FontSize, string> = {
      small: "14px",
      medium: "16px",
      large: "18px",
    };
    root.style.setProperty("--base-font-size", fontSizes[newSettings.fontSize]);

    // Apply primary color - all related variables
    root.style.setProperty("--primary", colors.primary);
    root.style.setProperty("--primary-foreground", colors.foreground);
    root.style.setProperty("--ring", colors.ring);
    root.style.setProperty("--sidebar-primary", colors.sidebarPrimary);
    root.style.setProperty("--sidebar-primary-foreground", colors.foreground);

    // Apply animations
    if (!newSettings.animations) {
      root.classList.add("reduce-motion");
      root.style.setProperty("--transition-duration", "0ms");
    } else {
      root.classList.remove("reduce-motion");
      root.style.setProperty("--transition-duration", "150ms");
    }

    // Apply compact mode
    if (newSettings.compactMode) {
      root.classList.add("compact-mode");
    } else {
      root.classList.remove("compact-mode");
    }

    // Apply sidebar position
    root.setAttribute("data-sidebar-position", newSettings.sidebarPosition);

    // Save to localStorage
    saveSettings(newSettings);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      applySettings(settings);
    }
  }, [settings, isLoaded, applySettings]);

  const setFontSize = useCallback((fontSize: FontSize) => {
    setSettings((prev) => ({ ...prev, fontSize }));
  }, []);

  const setPrimaryColor = useCallback((primaryColor: PrimaryColor) => {
    setSettings((prev) => ({ ...prev, primaryColor }));
  }, []);

  const setSidebarPosition = useCallback((sidebarPosition: SidebarPosition) => {
    setSettings((prev) => ({ ...prev, sidebarPosition }));
  }, []);

  const setAnimations = useCallback((animations: boolean) => {
    setSettings((prev) => ({ ...prev, animations }));
  }, []);

  const setCompactMode = useCallback((compactMode: boolean) => {
    setSettings((prev) => ({ ...prev, compactMode }));
  }, []);

  const resetAppearance = useCallback(() => {
    setSettings(defaultSettings);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AppearanceContext.Provider
      value={{
        ...settings,
        setFontSize,
        setPrimaryColor,
        setSidebarPosition,
        setAnimations,
        setCompactMode,
        resetAppearance,
        isLoaded,
      }}
    >
      {children}
    </AppearanceContext.Provider>
  );
}

export function useAppearance() {
  const context = useContext(AppearanceContext);
  if (context === undefined) {
    throw new Error("useAppearance must be used within an AppearanceProvider");
  }
  return context;
}
