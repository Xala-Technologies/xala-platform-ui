# Multi-Provider AI Support

The Command Center now supports multiple AI providers: Anthropic (Claude), OpenAI (GPT), and Google (Gemini).

## Supported Providers

### Commercial Providers

#### 1. Anthropic (Claude)
- **SDK**: `@anthropic-ai/sdk`
- **Models**: Claude 3.5 Sonnet, Claude 3.5 Haiku, Claude 3 Opus, Claude 3 Sonnet, Claude 3 Haiku
- **Features**: Streaming, Tool use, OAuth support

#### 2. OpenAI (GPT)
- **SDK**: `openai`
- **Models**: GPT-4o, GPT-4o Mini, GPT-4 Turbo, GPT-4, GPT-3.5 Turbo
- **Features**: Streaming, Function calling

#### 3. Google Gemini
- **SDK**: `@google/generative-ai`
- **Models**: Gemini 1.5 Pro, Gemini 1.5 Flash, Gemini Pro
- **Features**: Streaming, Function calling (limited)

### Open Source & Alternative Providers

#### 4. Deep Seek
- **SDK**: `openai` (OpenAI-compatible API)
- **Models**: DeepSeek Chat, DeepSeek Coder
- **Features**: Streaming, Function calling
- **Cost**: Very low, open-source friendly

#### 5. OpenRouter
- **SDK**: `openai` (OpenAI-compatible API)
- **Models**: 100+ models (Claude, GPT, Gemini, Llama, Mistral, etc.)
- **Features**: Streaming, Function calling (model-dependent)
- **Cost**: Pay-per-use, model-dependent

#### 6. Ollama (Local)
- **SDK**: `openai` (OpenAI-compatible local server)
- **Models**: Llama, Mistral, CodeLlama, Phi-3, and more
- **Features**: Streaming, No API costs, 100% local
- **Cost**: Free (runs on your machine)

## Installation

Install the required SDKs:

```bash
cd apps/command-center
pnpm add @anthropic-ai/sdk openai @google/generative-ai
```

**Note**: Deep Seek, OpenRouter, and Ollama use the `openai` SDK (already installed) with different base URLs.

## Usage

### 1. Configure Provider

Open the API Configuration modal (Settings icon or on app load):

1. **Select Provider**: Choose from Anthropic, OpenAI, or Google Gemini
2. **Enter API Key**: Provider-specific API key format
3. **Select Model**: Choose from available models for the selected provider
4. **Set Max Tokens**: Configure token limit
5. **Save**: Test connection and save configuration

### 2. Provider-Specific API Keys

- **Anthropic**: `sk-ant-...` (starts with `sk-ant-`)
- **OpenAI**: `sk-...` (starts with `sk-`)
- **Google Gemini**: `AIza...` (starts with `AIza`)
- **Deep Seek**: `sk-...` (starts with `sk-`)
- **OpenRouter**: `sk-or-...` (starts with `sk-or-`)
- **Ollama**: Optional (leave empty for local server)

### 3. Model Selection

Models are automatically loaded when you select a provider. Each provider shows its available models with descriptions.

## Architecture

### Provider Abstraction

All providers implement the `AIProviderClient` interface:

```typescript
interface AIProviderClient {
    readonly provider: AIProvider;
    initialize(config: ProviderConfig): void;
    isInitialized(): boolean;
    createStreamedMessage(options: StreamMessageOptions): AsyncGenerator<StreamEvent>;
    createMessage(options: StreamMessageOptions): Promise<string>;
    listModels(): Promise<ProviderModel[]>;
    getDefaultModel(): string;
}
```

### Provider Registry

The `providerRegistry` manages multiple providers:

```typescript
import { providerRegistry, setProvider, getCurrentProvider } from '../lib/ai';

// Set provider
setProvider('openai', {
    provider: 'openai',
    apiKey: 'sk-...',
    model: 'gpt-4o',
});

// Get current provider
const provider = getCurrentProvider();
await provider.createMessage({ messages: [...] });
```

## Adding New Providers

To add a new provider:

1. **Create Provider Class** (`src/lib/ai/providers/new-provider.ts`):
   ```typescript
   export class NewProvider implements AIProviderClient {
       readonly provider = 'new-provider' as const;
       // Implement interface methods
   }
   ```

2. **Register Provider** (`src/lib/ai/provider-registry.ts`):
   ```typescript
   import { NewProvider } from './providers/new-provider';
   this.register('new-provider', new NewProvider());
   ```

3. **Add to UI** (`src/components/settings/ApiKeyModal.tsx`):
   ```typescript
   <Select.Option value="new-provider">New Provider</Select.Option>
   ```

## Provider Comparison

| Feature | Anthropic | OpenAI | Google Gemini | Deep Seek | OpenRouter | Ollama |
|---------|----------|--------|---------------|-----------|------------|--------|
| Streaming | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Tool Use | ✅ | ✅ | ⚠️ Limited | ✅ | ⚠️ Model-dependent | ❌ |
| OAuth | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Browser Support | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Cost | Medium | High | Low | Very Low | Variable | Free |
| Privacy | API | API | API | API | API | **100% Local** |
| Models | 5 | 5 | 3 | 2 | 100+ | Many |

## Notes

- **API Keys**: Stored in memory only, never persisted
- **Model Switching**: Change provider/model anytime via Settings
- **Backward Compatibility**: Existing Anthropic workflows continue to work
- **Error Handling**: Provider-specific errors are handled gracefully
