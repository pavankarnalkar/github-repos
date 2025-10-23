import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: GITHUB_API_BASE,
  timeout: 10000,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
});

// Add request interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    if (error.response?.status === 404) {
      throw new Error('No repositories found.');
    }
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.');
    }
    throw new Error(error.message || 'An error occurred while fetching data.');
  }
);

export const githubService = {
  /**
   * Search for repositories
   * @param {string} query - Search query
   * @param {number} page - Page number (default: 1)
   * @param {number} perPage - Items per page (default: 10)
   * @param {string} sort - Sort by: stars, forks, updated, created (default: stars)
   * @param {string} order - Order: asc, desc (default: desc)
   */
  async searchRepositories(query, page = 1, perPage = 10, sort = 'stars', order = 'desc') {
    try {
      const response = await apiClient.get('/search/repositories', {
        params: {
          q: query,
          page,
          per_page: perPage,
          sort,
          order,
        },
      });
      
      return {
        repositories: response.data.items.map(repo => ({
          id: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description,
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          openIssues: repo.open_issues_count,
          createdAt: repo.created_at,
          updatedAt: repo.updated_at,
          url: repo.html_url,
          owner: {
            login: repo.owner.login,
            avatarUrl: repo.owner.avatar_url,
            url: repo.owner.html_url,
          },
        })),
        totalCount: response.data.total_count,
        hasMore: response.data.items.length === perPage,
      };
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get trending repositories
   * @param {string} language - Programming language filter (optional)
   * @param {string} since - Time period: daily, weekly, monthly (default: weekly)
   */
  async getTrendingRepositories(language = '', since = 'weekly') {
    const query = language ? `language:${language}` : '';
    const date = this.getDateFilter(since);
    const fullQuery = `${query} created:>${date}`.trim();
    
    return this.searchRepositories(fullQuery, 1, 20, 'stars', 'desc');
  },

  /**
   * Get date filter for trending queries
   * @param {string} since - Time period
   */
  getDateFilter(since) {
    const now = new Date();
    const days = {
      daily: 1,
      weekly: 7,
      monthly: 30,
    };
    
    const daysAgo = days[since] || 7;
    const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    return date.toISOString().split('T')[0];
  },

  /**
   * Get repository details by full name
   * @param {string} fullName - Repository full name (owner/repo)
   */
  async getRepositoryDetails(fullName) {
    try {
      const response = await apiClient.get(`/repos/${fullName}`);
      const repo = response.data;
      
      return {
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        openIssues: repo.open_issues_count,
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        url: repo.html_url,
        cloneUrl: repo.clone_url,
        size: repo.size,
        license: repo.license?.name,
        topics: repo.topics || [],
        owner: {
          login: repo.owner.login,
          avatarUrl: repo.owner.avatar_url,
          url: repo.owner.html_url,
        },
      };
    } catch (error) {
      throw error;
    }
  },
};

export default githubService;
