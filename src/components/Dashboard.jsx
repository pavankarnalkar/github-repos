import React, { useState, useEffect } from "react";
import { Github, RefreshCw, AlertCircle } from "lucide-react";
import SearchBar from "./SearchBar";
import DataTable from "./DataTable";
import ThemeToggle from "./ThemeToggle";
import {
  useRepositories,
  useSortingAndFiltering,
} from "../hooks/useRepositories";

const Dashboard = () => {
  const {
    repositories,
    loading,
    error,
    totalCount,
    hasMore,
    fetchRepositories,
    loadMore,
    refresh,
  } = useRepositories();

  const {
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    filterBy,
    setFilterBy,
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    filteredAndSortedData,
    availableLanguages,
  } = useSortingAndFiltering(repositories);

  // Fetch repositories when debounced search term changes (only if not empty)
  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      fetchRepositories(debouncedSearchTerm, sortBy, sortOrder, 1);
    }
  }, [debouncedSearchTerm, sortBy, sortOrder, fetchRepositories]);

  // Handle refresh
  const handleRefresh = () => {
    refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Github className="w-8 h-8 text-gray-800 dark:text-gray-200" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                GitHub Repositories Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors disabled:opacity-50"
                title="Refresh data"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Github className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Repositories
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {totalCount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <RefreshCw className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Displayed
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {repositories.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Languages
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {availableLanguages.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          filterBy={filterBy}
          onFilterChange={setFilterBy}
          availableLanguages={availableLanguages}
        />

        {/* Data Table */}
        <DataTable
          repositories={filteredAndSortedData}
          loading={loading}
          error={error}
          onLoadMore={loadMore}
          hasMore={hasMore}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              Data provided by{" "}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                GitHub API
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
