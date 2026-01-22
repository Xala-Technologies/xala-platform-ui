# Documentation

Complete documentation for `@xala-technologies/platform-ui`

## Quick Links

### For Developers
- [Getting Started](../README.md#installation)
- [Design Tokens Guide](./guides/DESIGN_TOKENS.md)
- [Contributing Guide](../CONTRIBUTING.md)
- [Changelog](../CHANGELOG.md)

### For AI Agents
- [AI Agents Guide](./governance/AGENTS.md)
- [Governance Rules](./governance/GOVERNANCE.md)

### Architecture
- [Package Architecture](./architecture/ARCHITECTURE.md)
- [Component Structure](./architecture/COMPONENTS.md)

## Documentation Structure

```
docs/
├── README.md                    # This file
├── governance/                  # Rules and standards
│   ├── AGENTS.md               # AI agent guidelines
│   └── GOVERNANCE.md           # Governance rules
├── guides/                      # How-to guides
│   ├── DESIGN_TOKENS.md        # Design token usage
│   ├── STORYBOOK.md            # Storybook documentation
│   └── TESTING.md              # Testing guidelines
└── architecture/                # Technical architecture
    ├── ARCHITECTURE.md         # Package architecture
    └── COMPONENTS.md           # Component structure
```

## Key Principles

### 1. UI Components Only
This package contains **only** UI components. No business logic, API calls, or authentication.

### 2. Designsystemet Design Tokens
All components must use Designsystemet design tokens. No raw HTML, inline styles, or custom CSS.

### 3. Accessibility First
All components are WCAG 2.1 AA compliant with keyboard navigation and screen reader support.

### 4. TypeScript Strict Mode
Full type safety with strict TypeScript configuration.

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines.

## Support

- **Issues**: [GitHub Issues](https://github.com/Xala-Technologies/xala-platform-ui/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Xala-Technologies/xala-platform-ui/discussions)
