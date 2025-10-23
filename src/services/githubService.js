import axios from "axios";
import { TEXT_CONSTANTS } from "../constants/textConstants";

const GITHUB_API_BASE = TEXT_CONSTANTS.GITHUB.BASE_URL;
// Optional GitHub token for higher rate limits (set in .env file)
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: GITHUB_API_BASE,
  timeout: 10000,
  headers: {
    Accept: TEXT_CONSTANTS.GITHUB.ACCEPT_HEADER,
    ...(GITHUB_TOKEN && { Authorization: `token ${GITHUB_TOKEN}` }),
  },
});

// Add request interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      throw new Error(TEXT_CONSTANTS.ERROR_MESSAGES.RATE_LIMIT);
    }
    if (error.response?.status === 404) {
      throw new Error(TEXT_CONSTANTS.ERROR_MESSAGES.NOT_FOUND);
    }
    if (error.code === "ECONNABORTED") {
      throw new Error(TEXT_CONSTANTS.ERROR_MESSAGES.TIMEOUT);
    }
    throw new Error(error.message || TEXT_CONSTANTS.ERROR_MESSAGES.GENERIC);
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
  async searchRepositories(
    query,
    page = 1,
    perPage = 10,
    sort = "stars",
    order = "desc"
  ) {
    try {
      const response = await apiClient.get(
        TEXT_CONSTANTS.GITHUB.SEARCH_ENDPOINT,
        {
          params: {
            q: query,
            page,
            per_page: perPage,
            sort,
            order,
          },
        }
      );

      return {
        repositories: response.data.items.map((repo) => ({
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
};

export default githubService;
