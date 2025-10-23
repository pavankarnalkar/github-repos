/**
 * Text constants for the GitHub Repositories Dashboard application
 * Centralized location for all text strings to improve maintainability and enable internationalization
 */

export const TEXT_CONSTANTS = {
  // Application Title
  APP_TITLE: "GitHub Repositories Dashboard",

  // Header Section
  HEADER: {
    TITLE: "GitHub Repositories Dashboard",
    REFRESH_BUTTON: "Refresh",
    REFRESH_TITLE: "Refresh data",
  },

  // Theme Toggle
  THEME: {
    SWITCH_TO_LIGHT: "Switch to light mode",
    SWITCH_TO_DARK: "Switch to dark mode",
  },

  // Dashboard Stats Section
  STATS: {
    TOTAL_REPOSITORIES: "Total Repositories",
    DISPLAYED: "Displayed",
    LANGUAGES: "Languages",
  },

  // Search Bar
  SEARCH: {
    PLACEHOLDER: "Search repositories...",
    ALL_LANGUAGES: "All Languages",
    SORT_ASCENDING: "Sort Ascending",
    SORT_DESCENDING: "Sort Descending",
    SORT_OPTIONS: {
      STARS: "Stars",
      FORKS: "Forks",
      UPDATED: "Updated",
      CREATED: "Created",
      NAME: "Name",
    },
  },

  // Repository Card
  REPOSITORY: {
    VIEW: "View",
    BY: "by",
    UPDATED: "Updated",
  },

  // Data Table States
  DATA_TABLE: {
    LOADING: "Loading repositories...",
    ERROR_TITLE: "Error Loading Data",
    NO_REPOS_TITLE: "No repositories found",
    NO_REPOS_MESSAGE: "Try adjusting your search criteria or filters.",
    LOAD_MORE: "Load More",
    LOADING_MORE: "Loading...",
  },

  // Footer
  FOOTER: {
    DATA_PROVIDED_BY: "Data provided by",
    GITHUB_API: "GitHub API",
  },

  // API Error Messages
  ERROR_MESSAGES: {
    RATE_LIMIT: "API rate limit exceeded. Please try again later.",
    NOT_FOUND: "No repositories found.",
    TIMEOUT: "Request timeout. Please check your connection.",
    GENERIC: "An error occurred while fetching data.",
  },

  // Helper Function Messages
  HELPERS: {
    DATE: {
      YESTERDAY: "Yesterday",
      DAYS_AGO: "days ago",
      WEEKS_AGO: "weeks ago",
      MONTHS_AGO: "months ago",
      YEARS_AGO: "years ago",
      NA: "N/A",
    },
    DEFAULT_NUMBER: "0",
  },

  // Test Strings (for test files)
  TEST: {
    REPOSITORY_CARD_ALT: "Repository card",
    SEARCH_INPUT_LABEL: "Search repositories",
    SORT_SELECT_LABEL: "Sort repositories",
    LANGUAGE_FILTER_LABEL: "Filter by language",
    THEME_TOGGLE_LABEL: "Toggle theme",
  },

  // Accessibility Labels
  ARIA: {
    MAIN_CONTENT: "Main content",
    NAVIGATION: "Navigation",
    SEARCH_FORM: "Search form",
    REPOSITORY_LIST: "Repository list",
    LOAD_MORE_BUTTON: "Load more repositories",
  },

  // Default Values
  DEFAULTS: {
    SEARCH_QUERY: "react",
    SORT_BY: "stars",
    SORT_ORDER: "desc",
    FILTER_BY: "all",
    PER_PAGE: 10,
  },

  // Storage Keys
  STORAGE: {
    THEME_KEY: "dashboard-theme",
  },

  // Theme Values
  THEME_VALUES: {
    LIGHT: "light",
    DARK: "dark",
  },

  // HTTP Status Messages
  HTTP: {
    STATUS_403: "API rate limit exceeded. Please try again later.",
    STATUS_404: "No repositories found.",
    TIMEOUT: "Request timeout. Please check your connection.",
  },

  // GitHub API
  GITHUB: {
    BASE_URL: "https://api.github.com",
    SEARCH_ENDPOINT: "/search/repositories",
    ACCEPT_HEADER: "application/vnd.github.v3+json",
  },

  // Sorting and Filtering
  SORT: {
    ASC: "asc",
    DESC: "desc",
    BY_STARS: "stars",
    BY_FORKS: "forks",
    BY_UPDATED: "updatedAt",
    BY_CREATED: "createdAt",
    BY_NAME: "name",
  },

  // Time Intervals
  TIME: {
    DEBOUNCE_DELAY: 500,
    API_TIMEOUT: 10000,
  },

  // Validation Messages
  VALIDATION: {
    REQUIRED_FIELD: "This field is required",
    INVALID_SEARCH: "Please enter valid search criteria",
    MIN_SEARCH_LENGTH: "Search term must be at least 3 characters",
  },

  // Success Messages
  SUCCESS: {
    DATA_LOADED: "Data loaded successfully",
    SEARCH_COMPLETED: "Search completed",
    THEME_CHANGED: "Theme changed successfully",
  },

  // Loading States
  LOADING: {
    INITIAL: "Loading...",
    SEARCHING: "Searching...",
    LOADING_MORE: "Loading more...",
    REFRESHING: "Refreshing...",
  },

  // Pagination
  PAGINATION: {
    LOAD_MORE: "Load More",
    NO_MORE_RESULTS: "No more results",
    SHOWING_RESULTS: "Showing results",
    OF: "of",
    RESULTS: "results",
  },

  // Form Elements
  FORM: {
    SEARCH: "Search",
    FILTER: "Filter",
    SORT: "Sort",
    CLEAR: "Clear",
    APPLY: "Apply",
    RESET: "Reset",
  },

  // Common Actions
  ACTIONS: {
    VIEW: "View",
    EDIT: "Edit",
    DELETE: "Delete",
    CANCEL: "Cancel",
    SAVE: "Save",
    CLOSE: "Close",
    OPEN: "Open",
    REFRESH: "Refresh",
    RETRY: "Retry",
  },

  // Status Indicators
  STATUS: {
    ONLINE: "Online",
    OFFLINE: "Offline",
    CONNECTED: "Connected",
    DISCONNECTED: "Disconnected",
    LOADING: "Loading",
    READY: "Ready",
    ERROR: "Error",
  },

  // File Operations
  FILE: {
    UPLOAD: "Upload",
    DOWNLOAD: "Download",
    DELETE: "Delete",
    RENAME: "Rename",
    MOVE: "Move",
    COPY: "Copy",
  },

  // Date Formatting
  DATE_FORMAT: {
    SHORT: "MMM dd, yyyy",
    LONG: "MMMM dd, yyyy",
    WITH_TIME: "MMM dd, yyyy hh:mm a",
    RELATIVE: "relative",
  },
};

export default TEXT_CONSTANTS;
