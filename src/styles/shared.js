/**
 * Shared Tailwind CSS class combinations to avoid duplication
 */

export const cardStyles =
  "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700";

export const buttonStyles = {
  primary: "flex items-center justify-center w-10 h-10 rounded-lg",
  secondary: "flex items-center gap-2 px-3 py-2 text-sm transition-colors",
  iconButton:
    "flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-200",
};

export const inputStyles =
  "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent";

export const selectStyles =
  "appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent";

export const textStyles = {
  primary: "text-gray-900 dark:text-gray-100",
  secondary: "text-gray-600 dark:text-gray-400",
  muted: "text-gray-500 dark:text-gray-500",
  link: "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors",
};

export const layoutStyles = {
  flexCenter: "flex items-center justify-center",
  flexBetween: "flex items-center justify-between",
  flexStart: "flex items-center",
  flexCol: "flex flex-col",
};
