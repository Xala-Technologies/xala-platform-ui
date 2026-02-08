# Platform UI Documentation

Welcome to the **Xala Platform UI** documentation.

## Quick Start

- **For AI Coding Agents:** Start with [Getting Started for AI](./GETTING_STARTED_AI.md)
- **For Developers:** See the main [README.md](../README.md)

## Documentation

### For AI Agents
- **[Getting Started for AI](./GETTING_STARTED_AI.md)** - Quick rules and examples
- **[AI Agent Playbook](./AI_AGENT_PLAYBOOK.md)** - Complete HTML→Designsystemet translation dictionary

### For Developers
- **[Pure UI Refactoring Guide](./PURE_UI_REFACTORING_GUIDE.md)** - Legacy refactoring documentation
- **[Storybook Documentation](./storybook/)** - Storybook-specific guides

## Architecture

The package uses a simplified 3-layer architecture:

| Layer | Description |
|-------|-------------|
| **primitives/** | Direct Designsystemet wrappers (Button, Card, Textfield) |
| **components/** | Composed components (DataTable, Modal, Forms) |
| **layouts/** | Application shells (AppLayout, DashboardLayout) |

See [CLAUDE.md](../CLAUDE.md) for complete architecture details.

## Key Principles

1. **No raw HTML elements** - Use Designsystemet components only
2. **No custom CSS** - Style with data attributes
3. **UI-only** - No business logic, API calls, or i18n
4. **Layer hierarchy** - Lower layers cannot import from higher layers

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines.
