# Changelog

All notable changes to Story Explorer will be documented in this file.

## [1.0.0] - 2026-01-26

### Why This Exists

Story Explorer provides a custom web application that **replaces Storybook's manager UI** while **reusing the same CSF stories** via Storybook's iframe runtime. This approach offers:

1. **Custom UX** - Tailored interface for design review and approval workflows
2. **Design System Consistency** - Built entirely with Designsystemet components
3. **Internationalization** - Full nb/en support using `@xala-technologies/i18n`
4. **Accessibility** - WCAG AA compliant with keyboard navigation and ARIA labels
5. **Extensibility** - Foundation for curated demos, composition mode, and approvals

### How It Works

Story Explorer acts as a **thin shell** around Storybook:

1. **Index Fetch**: Reads `index.json` from Storybook build/dev server
2. **Catalog View**: Displays stories with search, category, and tag filtering
3. **Iframe Render**: Loads stories via `iframe.html?id={storyId}`
4. **Globals Sync**: Passes theme/locale to iframe via URL query params

This means:
- **No changes** to existing stories required
- Storybook must be running (dev) or built (prod)
- All Storybook addons continue to work in the iframe

### Integration

```bash
# Terminal 1: Start Storybook
pnpm storybook

# Terminal 2: Start Story Explorer
pnpm story-explorer
```

Story Explorer runs on `http://localhost:3100` by default.

### Extending (Future)

Planned extensions for v1.1+:

- **Docs Viewer**: Render MDX documentation alongside stories
- **Composition Mode**: Curate stories into guided demos
- **Approval Workflow**: Track design review status
- **Deep Linking**: Share specific story configurations
- **Favorites**: Bookmark frequently used stories

### Added

- Story catalog page with search and filtering
- Story viewer with iframe embedding
- Category filter (Components, Composed, Blocks, etc.)
- Type filter (Stories vs Docs)
- Tag display and filtering
- Theme toggle (light/dark)
- Locale toggle (nb/en)
- Brand theme toggle (Xala, Xaheen, Digdir)
- Skip to content link for accessibility
- Keyboard navigation support
- Copy link functionality
- Open in Storybook link
- Loading states and error handling
- Norwegian and English translations
