import { TEXT_CONSTANTS } from "../constants/textConstants";

/**
 * Theme management utilities
 */

const THEME_KEY = TEXT_CONSTANTS.STORAGE.THEME_KEY;

export const themeUtils = {
  /**
   * Get current theme from localStorage or system preference
   * @returns {string} 'light' or 'dark'
   */
  getTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      return savedTheme;
    }

    // Check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? TEXT_CONSTANTS.THEME_VALUES.DARK
      : TEXT_CONSTANTS.THEME_VALUES.LIGHT;
  },

  /**
   * Set theme in localStorage and apply to document
   * @param {string} theme - 'light' or 'dark'
   */
  setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  },

  /**
   * Toggle between light and dark theme
   * @param {string} currentTheme - Optional current theme, will get from storage if not provided
   * @returns {string} New theme
   */
  toggleTheme(currentTheme = null) {
    const theme = currentTheme || this.getTheme();
    const newTheme =
      theme === TEXT_CONSTANTS.THEME_VALUES.LIGHT
        ? TEXT_CONSTANTS.THEME_VALUES.DARK
        : TEXT_CONSTANTS.THEME_VALUES.LIGHT;
    this.setTheme(newTheme);
    return newTheme;
  },

  /**
   * Initialize theme on app load
   */
  initializeTheme() {
    const theme = this.getTheme();
    this.setTheme(theme);
  },

  /**
   * Listen for system theme changes
   * @param {Function} callback - Callback function to execute on theme change
   */
  watchSystemTheme(callback) {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      // Only update if no theme is saved in localStorage
      if (!localStorage.getItem(THEME_KEY)) {
        const theme = e.matches
          ? TEXT_CONSTANTS.THEME_VALUES.DARK
          : TEXT_CONSTANTS.THEME_VALUES.LIGHT;
        this.setTheme(theme);
        callback(theme);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    // Return cleanup function
    return () => mediaQuery.removeEventListener("change", handleChange);
  },
};
