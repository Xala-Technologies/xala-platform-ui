---
description: Deploy or export application to target environment
---

# /deploy-release

Deploys the application to the target environment or exports for handoff.

## Usage

```
/deploy-release <app-name> [--target domain|vercel|static]
```

## Deployment Targets

### Domain (Xala Platform)
Deploy to a Xala domain:
```bash
# Initialize domain
./scripts/init-domain.sh <domain-name>

# Deploy
./scripts/deploy-domain.sh <domain-name>
```

### Vercel
```bash
vercel --prod
```

### Static Export
```bash
pnpm build
# Upload dist/ to CDN
```

## Domain Deployment

Creates/updates domain structure:
```
domains/<domain>/
├── apps/
│   └── <app>/
├── config/
│   └── tenant.json
└── .env.production
```

## Export Package

Creates handoff package:
```
exports/<app>-<version>/
├── dist/                # Production build
├── specs/               # All Gazetteer specs
├── docs/                # Documentation
└── README.md            # Deployment instructions
```

## Release Checklist

- [ ] All tests pass
- [ ] Audit clean
- [ ] Version bumped
- [ ] Changelog updated
- [ ] Build successful
- [ ] Deployed to staging
- [ ] Smoke tests pass
- [ ] Production deploy

## Rollback

```bash
# Rollback to previous version
./scripts/rollback-domain.sh <domain-name> <version>
```

## Post-Release
- Monitor error rates
- Check performance metrics
- Verify all routes work
