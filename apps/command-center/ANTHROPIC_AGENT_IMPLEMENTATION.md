# Anthropic Browser Agent Implementation

## Overview

This document describes the browser-based Anthropic agent interaction system implemented in the Command Center. The agent runs entirely in the browser (no proxy server required) and guides users through workflow sessions with interactive Q&A.

## Architecture

### Components

1. **Anthropic Browser Client** (`src/lib/anthropic/client.ts`)
   - Wraps `@anthropic-ai/sdk` with browser support
   - Uses `dangerouslyAllowBrowser: true` flag
   - Provides streaming message API
   - API key stored in memory only (never persisted)

2. **Workflow Engine** (`src/services/workflow-engine.ts`)
   - Manages workflow session state
   - Coordinates AI interactions
   - Generates and validates artifacts
   - Handles step progression

3. **Platform UI Inventory** (`src/lib/anthropic/inventory.ts`)
   - Provides component inventory to AI agent
   - Ensures agent only uses available components
   - Formats inventory as context for prompts

4. **Agent Workflow Session UI** (`src/components/workflow/AgentWorkflowSession.tsx`)
   - Multi-step wizard using `MultiStepFormModal`
   - Displays AI questions and user answers
   - Shows generated artifacts with validation
   - Streams AI responses in real-time

5. **API Key Management** (`src/components/settings/ApiKeyModal.tsx`)
   - Secure API key input modal
   - Validates key before saving
   - Stores key in memory only

## Installation

```bash
# Install Anthropic SDK
cd apps/command-center
pnpm add @anthropic-ai/sdk
```

**Note:** If you encounter pnpm store issues, you may need to run `pnpm install` from the root first.

## Usage

### 1. Set API Key

When the Command Center loads, users must set their Anthropic API key:

```tsx
import { ApiKeyModal } from './components/settings/ApiKeyModal';

<ApiKeyModal
  isOpen={!anthropicClient.isInitialized()}
  onClose={() => {}}
  onKeySet={() => {
    // Key is now set, can start workflows
  }}
/>
```

### 2. Start Workflow Session

```tsx
import { AgentWorkflowSession } from './components/workflow/AgentWorkflowSession';

<AgentWorkflowSession
  workflowId="component-design"
  workflowSteps={workflowSteps}
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onComplete={(session) => {
    // Handle completed session
    console.log('Artifacts:', session.artifacts);
  }}
/>
```

### 3. Workflow Steps Definition

```typescript
const workflowSteps: WorkflowStepDefinition[] = [
  {
    id: 'vision',
    title: 'Product Vision',
    description: 'Define the high-level vision',
    promptTemplate: 'Ask about the product vision and goals',
    outputArtifacts: ['SECTION_vision.md'],
  },
  {
    id: 'compose',
    title: 'UI Composition',
    description: 'Define the UI structure',
    promptTemplate: 'Ask about component structure and layout',
    outputArtifacts: ['COMPOSE_component.json', 'TESTIDS_component.json'],
  },
];
```

## Features

### Streaming Responses

The agent streams responses in real-time:

```typescript
for await (const event of anthropicClient.createStreamedMessage({
  messages: [...],
  system: systemPrompt,
})) {
  if (event.type === 'content_block_delta') {
    // Update UI with streaming text
    setResponse(response + event.data.delta.text);
  }
}
```

### Artifact Generation

The agent generates spec artifacts:

- `SECTION_*.md` - Section specifications
- `COMPOSE_*.json` - UI composition definitions
- `TESTIDS_*.json` - Test ID mappings
- `E2E_*.md` - End-to-end test specifications

### Validation

All artifacts are validated against schemas:

```typescript
const validation = await workflowEngine.validateArtifact(artifact);
if (!validation.valid) {
  // Show errors and suggestions
}
```

### Platform UI Inventory

The agent receives a curated list of available components:

```typescript
const inventory = getPlatformUIInventory();
// Provides:
// - Component names and props
// - Available patterns
// - Design tokens
```

## Security

- **API Key**: Stored in memory only, never persisted
- **No localStorage**: Keys are not saved to browser storage
- **Validation**: Keys are validated before use
- **Clear Function**: Users can clear keys at any time

## Design System Compliance

All UI components use platform-ui patterns:

- `MultiStepFormModal` for wizard UI
- `WizardStepper` for step indicators
- `Card`, `Heading`, `Paragraph` for content
- `Alert` for errors and warnings
- Design tokens (`var(--ds-*)`) for styling

## Testing

Test IDs are provided for all interactive elements:

```typescript
data-testid={TESTIDS.common.apiKeyInput}
data-testid={TESTIDS.session.formField}
```

## Future Enhancements

1. **Tool Use**: Implement tool registry for agent tools
   - `validate_specs` - Validate artifacts
   - `list_platform_ui_inventory` - Get component list
   - `generate_compose_json` - Generate composition JSON

2. **File System Access**: Use File System Access API for direct file writing

3. **Export ZIP**: Package artifacts as downloadable ZIP

4. **Revision Management**: Track session revisions with diff view

5. **Approval Workflow**: Integrate with approval system

## Troubleshooting

### API Key Not Set

If workflows fail with "client not initialized":
1. Open API Key Modal
2. Enter valid Anthropic API key
3. Click "Save" to validate

### Streaming Not Working

Check browser console for CORS errors. The SDK should handle CORS automatically with `dangerouslyAllowBrowser: true`.

### Artifacts Not Generated

Ensure:
1. Step has `outputArtifacts` defined
2. AI response contains code blocks (```json or ```markdown)
3. Artifact pattern matches expected format

## References

- [Anthropic SDK Documentation](https://github.com/anthropics/anthropic-sdk-typescript)
- [Claude Messages API](https://docs.anthropic.com/claude/reference/messages_post)
- [Streaming Guide](https://platform.claude.com/docs/en/build-with-claude/streaming)
