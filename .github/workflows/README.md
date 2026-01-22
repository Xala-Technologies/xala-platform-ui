# GitHub Actions Workflows

This directory contains CI/CD workflows for the UI package.

## Workflows

### CI (`ci.yml`)
Runs on every push and pull request:
- Type checking (`pnpm typecheck`)
- Linting (`pnpm lint`)
- Format checking (`pnpm format:check`)
- Build verification (`pnpm build`)
- Storybook build (`pnpm storybook:build`)

### Publish (`publish.yml`)
Runs when a version tag is pushed:
- All quality checks
- Publishes to GitHub Packages

## Setup

These workflows are committed locally. To push them to GitHub, you need a token with `workflow` scope.

Alternatively, you can:
1. Create the workflows directly in GitHub UI
2. Use a GitHub App token
3. Update your PAT to include `workflow` scope

The workflows are ready to use once pushed to the repository.
