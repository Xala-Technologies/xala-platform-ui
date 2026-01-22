# Contributing to @xala-technologies/ui

Thank you for your interest in contributing to our UI component library!

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Xala-Technologies/xala-platform-ui.git
   cd xala-platform-ui
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start Storybook**
   ```bash
   pnpm storybook
   ```

## Project Structure

```
xala-platform-ui/
├── src/
│   ├── primitives/     # Basic Designsystemet wrappers
│   ├── composed/       # Multi-component compositions
│   ├── blocks/         # Feature blocks
│   ├── patterns/       # Reusable UI patterns
│   ├── shells/         # Layout shells
│   ├── pages/          # Page-level components
│   ├── themes/         # Theme configurations
│   └── tokens/         # Design tokens
├── .storybook/         # Storybook configuration
└── dist/               # Build output
```

## Guidelines

### Component Development

1. **Accessibility First** - All components must be WCAG 2.1 AA compliant
2. **TypeScript** - Full type safety required
3. **Designsystemet API** - Use `data-size`, `data-color` props
4. **No Business Logic** - Components are presentation-only
5. **Storybook Stories** - Every component needs stories

### Code Style

- Use TypeScript strict mode
- Follow existing naming conventions
- Add JSDoc comments for public APIs
- Keep components focused and single-purpose

### Testing

```bash
# Type check
pnpm typecheck

# Lint
pnpm lint

# Test Storybook
pnpm test:storybook:ci
```

### Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Add/update Storybook stories
4. Run tests and linting
5. Submit PR with clear description
6. Wait for review

## Questions?

Open an issue or discussion on GitHub!
