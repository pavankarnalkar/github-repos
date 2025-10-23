import { useState, useEffect } from "react";
import { themeUtils } from "../utils/themeUtils";

/**
 * Custom hook for managing theme state
 */
export const useTheme = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Initialize theme on mount
    const initialTheme = themeUtils.getTheme();
    setTheme(initialTheme);
    themeUtils.setTheme(initialTheme);

    // Watch for system theme changes
    const cleanup = themeUtils.watchSystemTheme((newTheme) => {
      setTheme(newTheme);
    });

    return cleanup;
  }, []);

  const toggleTheme = () => {
    const newTheme = themeUtils.toggleTheme(theme);
    setTheme(newTheme);
    return newTheme;
  };

  return {
    theme,
    toggleTheme,
    isDark: theme === "dark",
  };
};
