# ADR-001: Use Custom Hooks Over State Management Libraries

## Status
Accepted

## Context
We need to decide on state management approach for the GitHub Repositories Dashboard application. The application needs to manage:
- Repository data fetching and caching
- Search and filtering state
- Theme preferences
- Loading and error states

## Decision
We will use custom React hooks instead of external state management libraries like Redux or Zustand.

## Rationale
1. **Simplicity**: For this application scale, custom hooks provide sufficient state management without additional complexity
2. **Performance**: No additional bundle size from state management libraries
3. **Developer Experience**: Hooks are more intuitive for React developers
4. **Maintainability**: Less boilerplate code and easier to understand

## Consequences
### Positive
- Simpler codebase
- Better performance
- Easier onboarding for new developers
- No external dependencies for state management

### Negative
- May need to refactor to Redux/Zustand as application grows
- Less standardized patterns compared to established state management libraries
- Manual implementation of features like time-travel debugging

## Alternatives Considered
1. **Redux Toolkit**: Too much boilerplate for current needs
2. **Zustand**: Good option but adds dependency
3. **Context API**: Performance concerns with frequent updates
4. **SWR/React Query**: Good for server state but overkill for client state

## Implementation Notes
- Custom hooks should follow single responsibility principle
- Consider extracting to Redux Toolkit when team grows beyond 3-5 developers
- Monitor bundle size and performance as application scales
