---
description: Build application for production release
---

# /deploy-build

Builds the application for production deployment.

## Usage

```
/deploy-build <app-name> [--mode production|staging]
```

## Build Steps

1. **Typecheck** - Validate TypeScript
2. **Lint** - Check code quality
3. **Test** - Run all tests
4. **Build** - Create production bundle
5. **Optimize** - Minify and tree-shake

## Commands

```bash
# Full build
cd apps/<app> && pnpm build

# With verification
cd apps/<app> && pnpm typecheck && pnpm lint && pnpm test && pnpm build
```

## Output

Creates `dist/` folder:
```
apps/<app>/dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
└── gazetteer/
    └── *.spec.json
```

## Environment Variables

Set in `.env.production`:
```env
VITE_APP_ID=<app-name>
VITE_API_URL=https://api.production.com
VITE_TENANT_ID=default
```

## Build Verification

```bash
# Preview production build
pnpm preview

# Analyze bundle size
pnpm build --analyze
```

## Next Steps
After build passes, run:
- `/deploy-release` to deploy to production
