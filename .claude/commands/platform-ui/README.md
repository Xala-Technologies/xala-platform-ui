# Platform UI Commands

## Design OS Pattern

Commands follow the **Spec → Create → QA → Deploy** workflow.

## Quick Reference

| Phase | Command | Purpose |
|-------|---------|---------|
| **SPEC** | `/spec-product` | Vision, roadmap, stories |
| | `/spec-data` | Data model, entities |
| | `/spec-design` | Design system, tokens |
| **CREATE** | `/create-app` | Scaffold Thin App |
| | `/create-page` | Generate page |
| | `/create-feature` | Generate feature |
| | `/create-component` | Generate component |
| | `/create-api` | Generate API |
| | `/create-data` | Generate sample data |
| **QA** | `/qa-verify` | Run all checks |
| | `/qa-audit` | Deep compliance audit |
| **DEPLOY** | `/deploy-build` | Build for release |
| | `/deploy-release` | Deploy/export |

## Workflow

```
/spec-product → /spec-data → /spec-design
                    ↓
         /create-app → /create-feature
                    ↓
              /qa-verify → /qa-audit
                    ↓
           /deploy-build → /deploy-release
```

## Foundation

All commands respect `FOUNDATION.md`:
- Thin App pattern
- Platform UI components only
- Gazetteer specs for behavior

## Archive

Old commands preserved in `_archive/` (33 files)
