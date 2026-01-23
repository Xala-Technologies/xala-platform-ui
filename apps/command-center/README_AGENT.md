# Anthropic Agent Workflows - Quick Start

## Overview

The Command Center now includes browser-based Anthropic AI agent workflows that guide users through creating UI component specifications with interactive Q&A.

## Quick Start

### 1. Install SDK

```bash
cd apps/command-center
pnpm add @anthropic-ai/sdk
```

### 2. Set API Key

When you start the app, you'll be prompted to enter your Anthropic API key:
- Click "Settings" in the header, or
- The modal will appear automatically if no key is set

**Security:** The API key is stored in memory only and never persisted.

### 3. Start a Workflow

1. Navigate to **Workflows** page
2. Click on an agent-powered workflow:
   - **New Component Design** - Full component specification workflow
   - **UI Component** - Quick component creation workflow
3. The AI agent will guide you through questions step by step
4. Answer each question in the textarea
5. Artifacts are generated and validated automatically
6. Complete the workflow to finish

## How It Works

### Agent Interaction Flow

1. **User starts workflow** → Agent session created
2. **Agent asks question** → Question displayed in UI
3. **User answers** → Answer added to session
4. **Agent generates artifacts** → Artifacts displayed with validation
5. **Move to next step** → Process repeats
6. **Complete workflow** → All artifacts ready

### Generated Artifacts

The agent generates:
- `SECTION_*.md` - Section specifications
- `COMPOSE_*.json` - UI composition definitions  
- `TESTIDS_*.json` - Test ID mappings
- `E2E_*.md` - End-to-end test specifications

All artifacts are validated against schemas automatically.

## Workflow Definitions

### Component Design Workflow

**Steps:**
1. **Vision** - Define product vision and goals
2. **Data Model** - Define props and data structure
3. **UI Composition** - Define UI structure with platform-ui components
4. **Test IDs** - Generate test IDs for interactive elements
5. **E2E Tests** - Define end-to-end test scenarios

### UI Component Workflow

**Steps:**
1. **Basics** - Component name, category, purpose
2. **Composition** - Which platform-ui components to use
3. **States & Variants** - Interactive states and visual variants
4. **Test IDs** - Generate test IDs

## Features

### ✨ Real-time Streaming
AI responses stream in real-time for better UX.

### ✅ Automatic Validation
All artifacts validated against schemas with error reporting.

### 🔒 Secure
API key stored in memory only, never persisted.

### 🎨 Design System Compliant
Uses platform-ui components throughout.

## Architecture

- **Anthropic Client** - Browser SDK wrapper with streaming
- **Workflow Engine** - Manages session state and AI interactions
- **Platform UI Inventory** - Provides component list to AI
- **Agent Session UI** - Multi-step wizard interface
- **API Key Modal** - Secure key management

## Troubleshooting

### "Client not initialized"
- Set your API key via Settings button
- Ensure SDK is installed

### Artifacts not generating
- Check AI response contains code blocks
- Verify step has `outputArtifacts` defined
- Check browser console for errors

### TypeScript errors
- Install SDK: `pnpm add @anthropic-ai/sdk`
- Run `pnpm typecheck` to see errors

## Documentation

- `ANTHROPIC_AGENT_IMPLEMENTATION.md` - Detailed architecture
- `IMPLEMENTATION_SUMMARY.md` - Implementation details
- `INTEGRATION_COMPLETE.md` - Integration status

## Next Steps

1. Install SDK
2. Set API key
3. Start a workflow
4. Generate your first component spec!
