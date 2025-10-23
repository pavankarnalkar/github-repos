import { useState, useEffect, useCallback } from 'react';
import { githubService } from '../services/githubService';

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

  const fetchRepositories = useCallback(async (query = 'react', sort = 'stars', order = 'desc', pageNum = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await githubService.searchRepositories(query, pageNum, 10, sort, order);
      
      if (pageNum === 1) {
        setRepositories(result.repositories);
      } else {
        setRepositories(prev => [...prev, ...result.repositories]);
      }
      
      setTotalCount(result.totalCount);
      setHasMore(result.hasMore);
      setPage(pageNum);
    } catch (err) {
      setError(err.message);
      setRepositories([]);
      setTotalCount(0);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchRepositories('react', 'stars', 'desc', page + 1);
    }
  }, [loading, hasMore, page, fetchRepositories]);

  const refresh = useCallback(() => {
    fetchRepositories('react', 'stars', 'desc', 1);
  }, [fetchRepositories]);

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
 * Custom hook for managing search functionality
 */
export const useSearch = (initialQuery = '') => {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return {
    query,
    debouncedQuery,
    setQuery,
  };
};

/**
 * Custom hook for managing sorting and filtering
 */
export const useSortingAndFiltering = (data = []) => {
  const [sortBy, setSortBy] = useState('stars');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterBy, setFilterBy] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAndSortedData = useCallback(() => {
    let filtered = data;

    // Apply language filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(item => item.language === filterBy);
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(term) ||
        item.description?.toLowerCase().includes(term) ||
        item.owner.login.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });

    return filtered;
  }, [data, sortBy, sortOrder, filterBy, searchTerm]);

  const availableLanguages = useCallback(() => {
    const languages = [...new Set(data.map(item => item.language).filter(Boolean))];
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
    filteredAndSortedData: filteredAndSortedData(),
    availableLanguages: availableLanguages(),
  };
};
