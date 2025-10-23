import { TEXT_CONSTANTS } from "../constants/textConstants";

/**
 * Format date to a readable string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  if (!dateString) return TEXT_CONSTANTS.HELPERS.DATE.NA;

  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return TEXT_CONSTANTS.HELPERS.DATE.YESTERDAY;
  if (diffDays < 7)
    return `${diffDays} ${TEXT_CONSTANTS.HELPERS.DATE.DAYS_AGO}`;
  if (diffDays < 30)
    return `${Math.ceil(diffDays / 7)} ${
      TEXT_CONSTANTS.HELPERS.DATE.WEEKS_AGO
    }`;
  if (diffDays < 365)
    return `${Math.ceil(diffDays / 30)} ${
      TEXT_CONSTANTS.HELPERS.DATE.MONTHS_AGO
    }`;

  return `${Math.ceil(diffDays / 365)} ${
    TEXT_CONSTANTS.HELPERS.DATE.YEARS_AGO
  }`;
};

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (num) => {
  if (num === null || num === undefined)
    return TEXT_CONSTANTS.HELPERS.DEFAULT_NUMBER;
  return num.toLocaleString();
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

/**
 * Get language color for GitHub languages
 * @param {string} language - Programming language
 * @returns {string} Color hex code
 */
export const getLanguageColor = (language) => {
  const colors = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3776ab",
    Java: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
    "C#": "#239120",
    PHP: "#4f5d95",
    Ruby: "#701516",
    Go: "#00add8",
    Rust: "#dea584",
    Swift: "#fa7343",
    Kotlin: "#a97bff",
    Scala: "#c22d40",
    HTML: "#e34c26",
    CSS: "#1572b6",
    Shell: "#89e051",
    PowerShell: "#012456",
    Vue: "#4fc08d",
    React: "#61dafb",
    Angular: "#dd0031",
    "Jupyter Notebook": "#da5b0b",
    Dockerfile: "#384d54",
    R: "#198ce7",
    Lua: "#000080",
    Perl: "#39457e",
    Haskell: "#5e5086",
    Clojure: "#db5855",
    Elixir: "#6e4a7e",
    Erlang: "#a90533",
    OCaml: "#3be133",
    "F#": "#b845fc",
    Dart: "#00b4ab",
    Assembly: "#6e4c13",
    "Objective-C": "#438eff",
    MATLAB: "#e16737",
    "Vim script": "#199f4b",
    TeX: "#3d6117",
    "Vue.js": "#4fc08d",
    "React Native": "#61dafb",
    "Node.js": "#339933",
  };

  return colors[language] || "#586069";
};

/**
 * Sort array of objects by key
 * @param {Array} array - Array to sort
 * @param {string} key - Key to sort by
 * @param {string} direction - 'asc' or 'desc'
 * @returns {Array} Sorted array
 */
export const sortByKey = (array, key, direction = "asc") => {
  return [...array].sort((a, b) => {
    let aVal = a[key];
    let bVal = b[key];

    // Handle null/undefined values
    if (aVal === null || aVal === undefined) aVal = "";
    if (bVal === null || bVal === undefined) bVal = "";

    // Handle numbers
    if (typeof aVal === "number" && typeof bVal === "number") {
      return direction === "asc" ? aVal - bVal : bVal - aVal;
    }

    // Handle strings
    aVal = String(aVal).toLowerCase();
    bVal = String(bVal).toLowerCase();

    if (direction === "asc") {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    } else {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
    }
  });
};

/**
 * Filter array by search term
 * @param {Array} array - Array to filter
 * @param {string} searchTerm - Search term
 * @param {Array} searchKeys - Keys to search in (supports dot notation for nested properties)
 * @returns {Array} Filtered array
 */
export const filterBySearch = (array, searchTerm, searchKeys = []) => {
  if (!searchTerm) return array;

  const term = searchTerm.toLowerCase();

  return array.filter((item) => {
    return searchKeys.some((key) => {
      let value = item;

      // Handle nested properties (e.g., 'owner.login')
      const keyParts = key.split(".");
      for (const part of keyParts) {
        value = value?.[part];
        if (value === null || value === undefined) return false;
      }

      return String(value).toLowerCase().includes(term);
    });
  });
};
