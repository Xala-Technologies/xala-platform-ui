# Platform UI Knowledge Index

> Quick reference for all knowledge sources, organized by topic.

## Foundation & Rules

| Resource | Path | Purpose |
|----------|------|---------|
| Foundation Rules | `packages/gazetteer/catalogs/FOUNDATION.md` | Provider order, style imports, Thin App pattern |
| Agent README | `.claude/README.md` | Full agent onboarding |
| Platform Hardlines | `.claude/commands/platform-ui/_agent-framework.md` | (archived) |

## Component Knowledge

| Resource | Path | Purpose |
|----------|------|---------|
| Component Registry | `packages/gazetteer/src/registry/component-registry.ts` | All available components |
| HTML Translation | `packages/gazetteer/catalogs/html-to-platform.dictionary.json` | HTML → Platform UI |
| Examples | `packages/gazetteer/catalogs/examples/platform-ui.examples.catalog.json` | Code examples |

## Widget Catalogs

| Catalog | Path | Use For |
|---------|------|---------|
| Dashboard | `catalogs/widgets.dashboard.catalog.json` | Stats, charts, activity |
| Tables | `catalogs/widgets.tables.catalog.json` | Lists, data tables |
| CRUD | `catalogs/widgets.crud.catalog.json` | Forms, entity management |
| Public Shells | `catalogs/shells.public.catalog.json` | Marketing pages |
| Auth Shells | `catalogs/shells.authenticated.catalog.json` | Dashboard layouts |

## Agents

| Agent | Path | Specialization |
|-------|------|----------------|
| Platform UI | `.claude/agents/platform-ui-specialist.md` | Patterns, catalogs |
| Audit | `.claude/agents/gazetteer-audit-agent.md` | Compliance |
| Designsystemet | `.claude/agents/designsystemet-frontend-design.md` | Design system |
| Digdir | `.claude/agents/digdir-designsystem-specialist.md` | Digdir components |

## Skills

| Skill | Path | For |
|-------|------|-----|
| Scaffolding | `.claude/skills/app-scaffolding/SKILL.md` | Create apps |
| Patterns | `.claude/skills/component-patterns/SKILL.md` | Use components |
| Audit | `.claude/skills/compliance-audit/SKILL.md` | Verify compliance |

## Commands

| Phase | Commands | Documentation |
|-------|----------|---------------|
| SPEC | `/spec-product`, `/spec-data`, `/spec-design` | `.claude/commands/platform-ui/spec-*.md` |
| CREATE | `/create-app`, `/create-page`, etc. | `.claude/commands/platform-ui/create-*.md` |
| QA | `/qa-verify`, `/qa-audit` | `.claude/commands/platform-ui/qa-*.md` |
| DEPLOY | `/deploy-build`, `/deploy-release` | `.claude/commands/platform-ui/deploy-*.md` |

## CLI Tools

| Tool | Path | Command |
|------|------|---------|
| Scaffold App | `packages/gazetteer/src/cli/scaffold-app.ts` | `node scaffold-app.ts <name>` |
| Validate | `packages/gazetteer/scripts/validate-foundation.mjs` | `node validate-foundation.mjs <app>` |

## Workflow

```
Read README → Use Commands → Run Validation
     ↓              ↓              ↓
.claude/README.md  /create-app   validate-foundation.mjs
```
