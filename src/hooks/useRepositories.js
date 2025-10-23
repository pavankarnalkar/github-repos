import { useState, useEffect, useCallback } from "react";
import { githubService } from "../services/githubService";
import { sortByKey, filterBySearch } from "../utils/helpers";
import { TEXT_CONSTANTS } from "../constants/textConstants";

/**
 * Custom hook for managing repository data and API calls
 */
export const useRepositories = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [currentQuery, setCurrentQuery] = useState(
    TEXT_CONSTANTS.DEFAULTS.SEARCH_QUERY
  );
  const [currentSort, setCurrentSort] = useState(
    TEXT_CONSTANTS.DEFAULTS.SORT_BY
  );
  const [currentOrder, setCurrentOrder] = useState(
    TEXT_CONSTANTS.DEFAULTS.SORT_ORDER
  );

  const fetchRepositories = useCallback(
    async (
      query = TEXT_CONSTANTS.DEFAULTS.SEARCH_QUERY,
      sort = TEXT_CONSTANTS.DEFAULTS.SORT_BY,
      order = TEXT_CONSTANTS.DEFAULTS.SORT_ORDER,
      pageNum = 1
    ) => {
      setLoading(true);
      setError(null);

      try {
        console.log(
          `Fetching repositories: query="${query}", sort=${sort}, order=${order}, page=${pageNum}`
        );
        const result = await githubService.searchRepositories(
          query,
          pageNum,
          10,
          sort,
          order
        );
        console.log(
          `API Response: ${result.repositories.length} repositories, total: ${result.totalCount}`
        );

        if (pageNum === 1) {
          setRepositories(result.repositories);
        } else {
          setRepositories((prev) => [...prev, ...result.repositories]);
        }

        setTotalCount(result.totalCount);
        setHasMore(result.hasMore);
        setPage(pageNum);
        setCurrentQuery(query);
        setCurrentSort(sort);
        setCurrentOrder(order);
      } catch (err) {
        console.error("API Error:", err);
        setError(err.message);
        setRepositories([]);
        setTotalCount(0);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Load initial data on mount
  useEffect(() => {
    fetchRepositories();
  }, [fetchRepositories]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchRepositories(currentQuery, currentSort, currentOrder, page + 1);
    }
  }, [
    loading,
    hasMore,
    page,
    fetchRepositories,
    currentQuery,
    currentSort,
    currentOrder,
  ]);

  const refresh = useCallback(() => {
    fetchRepositories(currentQuery, currentSort, currentOrder, 1);
  }, [fetchRepositories, currentQuery, currentSort, currentOrder]);

  return {
    repositories,
    loading,
    error,
    totalCount,
    hasMore,
    fetchRepositories,
    loadMore,
    refresh,
  };
};

/**
 * Custom hook for managing sorting and filtering with debounced search
 */
export const useSortingAndFiltering = (data = []) => {
  const [sortBy, setSortBy] = useState(TEXT_CONSTANTS.DEFAULTS.SORT_BY);
  const [sortOrder, setSortOrder] = useState(
    TEXT_CONSTANTS.DEFAULTS.SORT_ORDER
  );
  const [filterBy, setFilterBy] = useState(TEXT_CONSTANTS.DEFAULTS.FILTER_BY);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredAndSortedData = useCallback(() => {
    let filtered = data;

    // Apply language filter
    if (filterBy !== TEXT_CONSTANTS.DEFAULTS.FILTER_BY) {
      filtered = filtered.filter((item) => item.language === filterBy);
    }

    // Apply search filter using debounced term
    if (debouncedSearchTerm) {
      filtered = filterBySearch(filtered, debouncedSearchTerm, [
        "name",
        "description",
        "owner.login",
      ]);
    }

    // Apply sorting using helper function
    filtered = sortByKey(filtered, sortBy, sortOrder);

    return filtered;
  }, [data, sortBy, sortOrder, filterBy, debouncedSearchTerm]);

  const availableLanguages = useCallback(() => {
    const languages = [
      ...new Set(data.map((item) => item.language).filter(Boolean)),
    ];
    return languages.sort();
  }, [data]);

  return {
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    filterBy,
    setFilterBy,
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    filteredAndSortedData: filteredAndSortedData(),
    availableLanguages: availableLanguages(),
  };
};
