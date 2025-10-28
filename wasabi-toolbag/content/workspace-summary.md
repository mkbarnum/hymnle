# Workspace Summary

## Project Overview
Hymnle is a React-based web application, likely inspired by Wordle, focused on hymn-related gameplay. The application is built with modern web technologies and follows contemporary development practices.

## Technology Stack

### Core Technologies
- **Frontend Framework**: React 17.0.2
- **Language**: TypeScript 4.5.4
- **Build System**: Create React App (react-scripts 5.0.0)
- **Package Manager**: Yarn 1.22.18
- **Styling**: TailwindCSS 3.0.12

### Key Dependencies
- **UI Components**:
  - @headlessui/react: Accessible UI components
  - @heroicons/react: Icon set
- **Testing**: Jest with React Testing Library
- **Development Tools**:
  - Prettier: Code formatting
  - Husky: Git hooks
  - lint-staged: Pre-commit linting

## Project Structure

```
/
├── src/                    # Main source code
│   ├── components/         # React components by feature
│   │   ├── alerts/        # Alert notifications
│   │   ├── grid/          # Game grid components
│   │   ├── modals/        # Modal dialogs
│   │   ├── music/         # Music playback controls
│   │   ├── navbar/        # Navigation
│   │   └── stats/         # Statistics display
│   ├── constants/         # Application constants
│   ├── context/          # React contexts
│   └── lib/              # Utility functions
├── public/               # Static assets
└── docker/              # Docker configuration
```

## Development Standards

### Code Style
- Prettier for code formatting
- TypeScript strict mode enabled
- ESLint with Create React App defaults
- Class-based dark mode strategy in Tailwind

### Testing Practices
- Jest as the test runner
- React Testing Library for component testing
- Focus on user interaction and behavior testing
- Mock implementations for browser APIs

### Build and Deployment
- Docker with nginx for production serving
- AWS S3 for static hosting
- CloudFront for content delivery
- Automated formatting via git hooks

### Metrics and Monitoring
- Web Vitals tracking implemented
- Local statistics tracking via localStorage
- Game statistics persistence

## Development Workflow
1. Local development via `yarn start`
2. Code formatting enforced by pre-commit hooks
3. Testing available via `yarn test`
4. Production builds via `yarn build`
5. Deployment to AWS using S3 sync

## Browser Support
- Production: >0.2% market share, excluding dead browsers and Opera Mini
- Development: Latest Chrome, Firefox, and Safari versions
