# GitHub Repositories Dashboard

A modern, responsive React dashboard application that fetches and displays GitHub repository data with advanced search, filtering, and sorting capabilities. Features a beautiful dark/light theme toggle and comprehensive error handling.

## 🎯 Project Overview

This project demonstrates modern React development practices, clean architecture, and scalable frontend engineering principles.

## 🤖 AI Usage Disclosure

This project was developed with AI assistance for:

- **Code Generation**: Initial component structure and boilerplate code
- **Documentation**: README content and code comments
- **Testing**: Test case generation and implementation
- **Architecture Decisions**: Technical trade-off analysis and best practices

All code has been reviewed, refined, and customized to meet specific requirements. The final implementation reflects human engineering judgment and domain expertise.

## 🚀 Features

### Core Features

- **Data Fetching**: Fetches repository data from GitHub's public API
- **Dashboard Display**: Clean, card-based layout showing repository information
- **Search & Filtering**: Real-time search with language filtering
- **Sorting**: Sort by stars, forks, updated date, created date, or name
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### User Interactions

- **Search Bar**: Search repositories by name, description, or owner
- **Sort Controls**: Sort data in ascending or descending order
- **Language Filter**: Filter repositories by programming language
- **Theme Toggle**: Switch between light and dark modes
- **Load More**: Pagination support for loading additional repositories

### Quality & Reliability

- **Loading States**: Smooth loading indicators during API calls
- **Error Handling**: Graceful error messages for API failures
- **Unit Tests**: Comprehensive test coverage for key components
- **Accessibility**: ARIA labels and keyboard navigation support

## 🛠️ Tech Stack

- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS with custom dark mode support
- **Testing**: Vitest with React Testing Library
- **HTTP Client**: Axios for API requests
- **Icons**: Lucide React for beautiful icons
- **Build Tool**: Vite for fast development and building

## 🧠 Technical Decisions & Trade-offs

### **Architecture Choices**

#### **1. Custom Hooks Over State Management Libraries**

- **Decision**: Built custom hooks (`useRepositories`, `useTheme`) instead of using Redux/Zustand
- **Rationale**: For this scale, custom hooks provide better developer experience with less boilerplate
- **Trade-off**: Would need Redux Toolkit for larger applications with complex state interactions

#### **2. Component Composition Over Inheritance**

- **Decision**: Small, focused components with clear responsibilities
- **Rationale**: Easier testing, maintenance, and reusability
- **Trade-off**: Slightly more components to manage, but better separation of concerns

#### **3. Tailwind CSS Over CSS Modules/Styled Components**

- **Decision**: Tailwind for utility-first styling
- **Rationale**: Faster development, consistent design system, smaller bundle size
- **Trade-off**: Learning curve for team, but better long-term maintainability

#### **4. Axios Over Fetch API**

- **Decision**: Axios for HTTP requests
- **Rationale**: Better error handling, request/response interceptors, automatic JSON parsing
- **Trade-off**: Additional dependency, but better developer experience

#### **5. Vitest Over Jest**

- **Decision**: Vitest for testing framework
- **Rationale**: Faster execution, better Vite integration, modern ES modules support
- **Trade-off**: Newer ecosystem, but aligns with Vite toolchain

### **Performance Optimizations**

#### **1. Debounced Search**

- **Implementation**: 500ms delay on search input
- **Benefit**: Reduces API calls and improves performance
- **Trade-off**: Slight delay in user feedback

#### **2. Pagination Strategy**

- **Implementation**: Load more button instead of infinite scroll
- **Benefit**: Better control over data loading, easier error handling
- **Trade-off**: Requires user interaction to load more data

#### **3. Theme Persistence**

- **Implementation**: localStorage with system preference fallback
- **Benefit**: Better user experience, respects system settings
- **Trade-off**: Additional complexity in theme management

### **Error Handling Strategy**

#### **1. Centralized Error Handling**

- **Implementation**: Axios interceptors for API errors
- **Benefit**: Consistent error messages across the application
- **Trade-off**: Less granular control per component

#### **2. Graceful Degradation**

- **Implementation**: Fallback UI states for loading and errors
- **Benefit**: Better user experience during failures
- **Trade-off**: Additional UI states to maintain

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd github-repos
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure GitHub API (Optional)**

   ```bash
   # Copy the environment template
   cp .env.example .env

   # Add your GitHub personal access token (optional, but recommended)
   # Edit .env and add: VITE_GITHUB_TOKEN=your_github_token_here
   ```

   **Why add a GitHub token?**

   - **Higher Rate Limits**: 5,000 requests/hour vs 60 requests/hour without token
   - **Better Performance**: Avoid rate limiting errors during development
   - **Access Private Repos**: If you want to search your private repositories

   **How to get a GitHub token:**

   1. Go to GitHub Settings → Developer settings → Personal access tokens
   2. Generate a new token (classic)
   3. Select scopes: `public_repo` (minimum required)
   4. Copy the token and add it to your `.env` file

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui
```

### Test Coverage

- **Components**: ThemeToggle, SearchBar, DataTable
- **Utilities**: Helper functions for formatting, sorting, and filtering
- **Hooks**: Custom hooks for state management
- **Total**: 36 tests covering all major functionality

## 🏗️ Project Structure

```
github-repos/
├── src/
│   ├── components/           # React components
│   │   ├── __tests__/       # Component tests
│   │   ├── Dashboard.jsx    # Main dashboard component
│   │   ├── DataTable.jsx    # Repository data display
│   │   ├── SearchBar.jsx    # Search and filter controls
│   │   └── ThemeToggle.jsx  # Theme switcher
│   ├── hooks/               # Custom React hooks
│   │   ├── useRepositories.js # Repository data management
│   │   └── useTheme.js      # Theme state management
│   ├── services/            # API services
│   │   └── githubService.js # GitHub API integration
│   ├── utils/               # Utility functions
│   │   ├── __tests__/      # Utility tests
│   │   ├── helpers.js      # Data formatting helpers
│   │   └── themeUtils.js   # Theme management utilities
│   ├── test/               # Test configuration
│   │   └── setup.js        # Test setup file
│   ├── App.jsx             # Main app component
│   ├── App.css             # App-specific styles
│   ├── index.css           # Global styles with Tailwind
│   └── main.jsx            # App entry point
├── .github/                # GitHub workflows and templates
├── docs/                   # Documentation
├── public/                 # Static assets
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## 🎨 Styling

The application uses Tailwind CSS with a custom design system:

- **Colors**: Carefully chosen color palette for both light and dark themes
- **Typography**: Inter font family for clean, readable text
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Components**: Reusable component classes for buttons, cards, and forms
- **Responsive**: Mobile-first responsive design with breakpoints

### Dark Mode

- Automatic system preference detection
- Manual toggle with localStorage persistence
- Smooth transitions between themes
- Consistent color scheme across all components

## 🔌 API Integration

### GitHub API

The application integrates with GitHub's REST API v3:

- **Endpoint**: `https://api.github.com/search/repositories`
- **Authentication**: Public API (no authentication required)
- **Rate Limiting**: Handles rate limit errors gracefully
- **Error Handling**: Comprehensive error messages for different failure scenarios

### Data Structure

Each repository includes:

- Basic info (name, description, language)
- Statistics (stars, forks, open issues)
- Timestamps (created, updated)
- Owner information (username, avatar)
- External links (repository URL)

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run test suite
- `npm run test:ui` - Run tests with UI
- `npm run lint` - Run ESLint

## 🌟 Key Features Explained

### Search Functionality

- **Debounced Search**: 500ms delay to prevent excessive API calls
- **Multi-field Search**: Searches across repository name, description, and owner
- **Case Insensitive**: Search works regardless of case
- **Real-time Results**: Updates results as you type

### Sorting & Filtering

- **Multiple Sort Options**: Stars, forks, updated date, created date, name
- **Sort Direction**: Ascending or descending order
- **Language Filter**: Filter by programming language
- **Combined Filters**: Search, sort, and filter work together

### Theme Management

- **System Detection**: Automatically detects user's system preference
- **Manual Override**: Users can manually toggle themes
- **Persistence**: Theme preference is saved in localStorage
- **Smooth Transitions**: CSS transitions for theme changes

## 🐛 Error Handling

The application handles various error scenarios:

- **Network Errors**: Connection timeouts and network failures
- **API Errors**: Rate limiting, 404 errors, and server errors
- **Data Errors**: Missing or malformed data from API
- **User Feedback**: Clear error messages with suggested actions

## 📱 Responsive Design

- **Mobile First**: Designed for mobile devices first
- **Breakpoints**: Tailwind's responsive breakpoints
- **Touch Friendly**: Large touch targets for mobile users
- **Flexible Layout**: Adapts to different screen sizes

## 🔧 Customization

### Adding New Features

1. Create components in `src/components/`
2. Add tests in `src/components/__tests__/`
3. Update the main Dashboard component
4. Add any new utilities to `src/utils/`

### Styling Changes

1. Modify Tailwind classes in components
2. Update color scheme in `tailwind.config.js`
3. Add custom CSS in `src/index.css`

### API Changes

1. Update `src/services/githubService.js`
2. Modify data transformation in components
3. Update tests to reflect new data structure

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or issues, please open an issue on GitHub.

## 🏗️ Scaling for Team Growth (3-5 Engineers)

### **Project Structure Evolution**

#### **Current Structure** (Solo Developer)

```
github-repos/
├── src/
│   ├── components/          # All components in one folder
│   ├── hooks/              # Custom hooks
│   ├── services/           # API services
│   ├── utils/              # Utility functions
│   └── test/               # Test configuration
├── .github/                # CI/CD and templates
├── docs/                   # Documentation
└── package.json           # Dependencies
```

#### **Scaled Structure** (3-5 Engineers)

```
github-repos/
├── src/
│   ├── features/                    # Feature-based organization
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── tests/
│   │   ├── search/
│   │   ├── theme/
│   │   └── shared/                  # Shared components
│   ├── core/                       # Core application logic
│   │   ├── api/
│   │   ├── config/
│   │   ├── types/
│   │   └── constants/
│   ├── design-system/              # Design system components
│   │   ├── components/
│   │   ├── tokens/
│   │   └── stories/
│   └── __tests__/                  # Integration tests
├── .github/                        # CI/CD and templates
├── docs/                           # Documentation
└── package.json                   # Dependencies
```

### **Team Organization Strategy**

#### **Feature Teams Approach**

- **Dashboard Team**: Main dashboard functionality, data visualization
- **Search Team**: Search, filtering, and sorting capabilities
- **Design System Team**: Shared components, theming, accessibility
- **Platform Team**: Build tools, CI/CD, infrastructure

#### **Code Ownership Model**

- **Feature Ownership**: Each team owns specific features end-to-end
- **Shared Responsibility**: Design system and core utilities
- **Cross-team Reviews**: Mandatory reviews for shared components

### **Technical Scaling Considerations**

#### **1. State Management Evolution**

```javascript
// Current: Custom hooks
const useRepositories = () => {
  /* ... */
};

// Scaled: Redux Toolkit + RTK Query
const repositoriesApi = createApi({
  reducerPath: "repositoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getRepositories: builder.query({
      query: (params) => `repositories?${new URLSearchParams(params)}`,
    }),
  }),
});
```

#### **2. Component Library Structure**

```javascript
// Design System Components
export { Button } from "./Button";
export { Input } from "./Input";
export { Card } from "./Card";

// Feature Components
export { RepositoryCard } from "./RepositoryCard";
export { SearchBar } from "./SearchBar";
```

#### **3. API Layer Abstraction**

```javascript
// Service Layer
class ApiService {
  constructor(baseURL, interceptors) {
    this.client = axios.create({ baseURL });
    this.setupInterceptors(interceptors);
  }
}

// Repository Pattern
class RepositoryService extends ApiService {
  async searchRepositories(params) {
    return this.client.get("/search/repositories", { params });
  }
}
```

## 👥 Team Practices & Processes

### **Code Review Process**

#### **Review Checklist**

- [ ] **Functionality**: Does the code work as intended?
- [ ] **Performance**: Any performance implications?
- [ ] **Accessibility**: WCAG compliance maintained?
- [ ] **Testing**: Adequate test coverage?
- [ ] **Documentation**: Code is self-documenting?
- [ ] **Security**: No security vulnerabilities?

#### **Review Guidelines**

- **Small PRs**: Maximum 400 lines of code
- **Clear Descriptions**: What, why, and how
- **Screenshots**: For UI changes
- **Testing Instructions**: How to test the changes

### **CI/CD Pipeline**

#### **Automated Checks**

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build
      - run: npm run test:e2e
```

#### **Quality Gates**

- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript (future migration)
- **Testing**: Unit tests + Integration tests
- **Performance**: Bundle size monitoring
- **Accessibility**: axe-core automated testing

### **Code Quality Standards**

#### **1. Testing Strategy**

- **Unit Tests**: 80%+ coverage for business logic
- **Integration Tests**: API integration and user flows
- **E2E Tests**: Critical user journeys
- **Visual Regression**: Component visual testing

#### **2. Performance Monitoring**

```javascript
// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.entryType === "measure") {
      analytics.track("performance", {
        metric: entry.name,
        duration: entry.duration,
      });
    }
  });
});
```

#### **3. Error Tracking**

```javascript
// Error boundary with logging
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    logger.error("React Error Boundary", {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });
  }
}
```

### **Development Workflow**

#### **Git Workflow**

- **Main Branch**: `main` (production-ready)
- **Feature Branches**: `feature/description`
- **Hotfix Branches**: `hotfix/description`
- **Conventional Commits**: `feat:`, `fix:`, `docs:`, etc.

#### **Release Process**

1. **Feature Complete**: All features merged to `main`
2. **QA Testing**: Manual testing and bug fixes
3. **Performance Check**: Bundle size and performance metrics
4. **Security Scan**: Dependency vulnerability check
5. **Deployment**: Automated deployment to staging/production

### **Team Communication**

#### **Daily Practices**

- **Standup**: Progress, blockers, plans
- **Pair Programming**: Complex features and knowledge sharing
- **Tech Talks**: Weekly technical discussions
- **Retrospectives**: Process improvement discussions

#### **Documentation Standards**

- **API Documentation**: OpenAPI/Swagger specs
- **Component Documentation**: Storybook stories
- **Architecture Decisions**: ADR (Architecture Decision Records)
- **Runbooks**: Deployment and troubleshooting guides

---

Built with ❤️ using React, Tailwind CSS, and modern web technologies.

**Technical Leadership**: This project demonstrates scalable architecture, team collaboration practices, and engineering excellence suitable for enterprise-level frontend development.
