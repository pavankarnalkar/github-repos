import React from "react";
import { Search, Filter, SortAsc, SortDesc } from "lucide-react";
import {
  cardStyles,
  inputStyles,
  selectStyles,
  buttonStyles,
  textStyles,
} from "../styles/shared";
import { TEXT_CONSTANTS } from "../constants/textConstants";

const SearchBar = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderChange,
  filterBy,
  onFilterChange,
  availableLanguages,
}) => {
  return (
    <div className={`${cardStyles} p-4 mb-6`}>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={TEXT_CONSTANTS.SEARCH.PLACEHOLDER}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 ${inputStyles} ${textStyles.primary} placeholder-gray-500 dark:placeholder-gray-400`}
            />
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex gap-2">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className={`${selectStyles} px-4 py-2 pr-8`}
            >
              <option value="stars">
                {TEXT_CONSTANTS.SEARCH.SORT_OPTIONS.STARS}
              </option>
              <option value="forks">
                {TEXT_CONSTANTS.SEARCH.SORT_OPTIONS.FORKS}
              </option>
              <option value="updatedAt">
                {TEXT_CONSTANTS.SEARCH.SORT_OPTIONS.UPDATED}
              </option>
              <option value="createdAt">
                {TEXT_CONSTANTS.SEARCH.SORT_OPTIONS.CREATED}
              </option>
              <option value="name">
                {TEXT_CONSTANTS.SEARCH.SORT_OPTIONS.NAME}
              </option>
            </select>
            <SortAsc className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>

          {/* Sort Order Toggle */}
          <button
            onClick={() =>
              onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")
            }
            className={buttonStyles.iconButton}
            title={`Sort ${
              sortOrder === "asc"
                ? TEXT_CONSTANTS.SEARCH.SORT_DESCENDING
                : TEXT_CONSTANTS.SEARCH.SORT_ASCENDING
            }`}
          >
            {sortOrder === "asc" ? (
              <SortAsc className={`w-5 h-5 ${textStyles.secondary}`} />
            ) : (
              <SortDesc className={`w-5 h-5 ${textStyles.secondary}`} />
            )}
          </button>
        </div>

        {/* Language Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            value={filterBy}
            onChange={(e) => onFilterChange(e.target.value)}
            className={`${selectStyles} pl-10 pr-8 py-2`}
          >
            <option value="all">{TEXT_CONSTANTS.SEARCH.ALL_LANGUAGES}</option>
            {availableLanguages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
