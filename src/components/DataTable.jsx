import React from 'react';
import { Star, GitFork, AlertCircle, Calendar, ExternalLink, Github } from 'lucide-react';
import { formatDate, formatNumber, truncateText, getLanguageColor } from '../utils/helpers';

const RepositoryCard = ({ repository }) => {
  const {
    name,
    fullName,
    description,
    language,
    stars,
    forks,
    openIssues,
    updatedAt,
    url,
    owner
  } = repository;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Github className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
              {name}
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            by <span className="font-medium">{owner.login}</span>
          </p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          View
        </a>
      </div>

      {/* Description */}
      {description && (
        <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
          {truncateText(description, 120)}
        </p>
      )}

      {/* Language */}
      {language && (
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: getLanguageColor(language) }}
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">{language}</span>
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4" />
          <span>{formatNumber(stars)}</span>
        </div>
        <div className="flex items-center gap-1">
          <GitFork className="w-4 h-4" />
          <span>{formatNumber(forks)}</span>
        </div>
        <div className="flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          <span>{formatNumber(openIssues)}</span>
        </div>
      </div>

      {/* Updated Date */}
      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
        <Calendar className="w-3 h-3" />
        <span>Updated {formatDate(updatedAt)}</span>
      </div>
    </div>
  );
};

const DataTable = ({ repositories, loading, error, onLoadMore, hasMore }) => {
  if (loading && repositories.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading repositories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
          Error Loading Data
        </h3>
        <p className="text-red-600 dark:text-red-300">{error}</p>
      </div>
    );
  }

  if (repositories.length === 0) {
    return (
      <div className="text-center py-12">
        <Github className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          No repositories found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your search criteria or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Repository Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repositories.map((repository) => (
          <RepositoryCard key={repository.id} repository={repository} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center pt-6">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Loading...
              </div>
            ) : (
              'Load More'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
