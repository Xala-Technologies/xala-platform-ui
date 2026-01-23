# Simple SDK Setup - No Over-Engineering

## The Simple Approach

Instead of complex retry logic and fallbacks, we:
1. Fetch models from `/v1/models` API
2. Use the first available model
3. Done.

## How It Works

```typescript
// 1. Initialize with API key
await provider.initialize({ 
    provider: 'anthropic', 
    apiKey: 'sk-ant-...' 
});

// 2. System fetches models automatically
// 3. Uses first available model
// 4. Ready to go
```

## What Changed

### Before (Over-Engineered)
- Complex retry logic
- Hardcoded fallbacks
- Model preference algorithms
- Cache management
- 300+ lines of code

### After (Simple)
- Fetch models from API
- Use first available
- 120 lines of code
- It just works

## The Code

`src/lib/ai/providers/anthropic/anthropic.ts`:
- Fetches models from `https://api.anthropic.com/v1/models`
- Uses first model returned
- No hardcoded model IDs
- No complex retry logic

## Usage

### Configure Provider
1. Open Settings → API Configuration
2. Select "Anthropic (Claude)"
3. Enter API key
4. Models load automatically (as radio buttons)
5. First available model is auto-selected
6. Click Save

### Models Display
- Shows as radio buttons (2-7 models)
- Shows actual model IDs (e.g., `claude-sonnet-4-5-20250929`)
- First available is pre-selected

## Wizard Component

Uses `MultiStepFormModal` from platform-ui:
- Proper stepper UI
- Modal dialog
- Form steps
- Navigation buttons
- Follows Storybook patterns

See `AgentWorkflowSession.tsx` for implementation.

## No More 404 Errors

- ✅ Fetches models from API
- ✅ Uses what's actually available
- ✅ No hardcoded model IDs
- ✅ Works with Claude 3.5, Claude 4.5, and future versions

## Testing

1. Enter your API key
2. System fetches available models
3. Shows them as radio buttons
4. Auto-selects first one
5. Works immediately

Simple. No over-engineering.
