# Open Source & Alternative AI Providers

The Command Center now supports open-source and alternative AI providers including Deep Seek, OpenRouter, and Ollama.

## Supported Open Source Providers

### 1. Deep Seek
- **Type**: Open-source friendly, cost-effective
- **API**: OpenAI-compatible
- **Models**: DeepSeek Chat, DeepSeek Coder
- **Features**: Streaming, Function calling
- **API Key**: Get from [deepseek.com](https://platform.deepseek.com)
- **Base URL**: `https://api.deepseek.com`

### 2. OpenRouter
- **Type**: Unified API for multiple models
- **API**: OpenAI-compatible
- **Models**: Access to 100+ models including Claude, GPT, Gemini, Llama, Mistral, etc.
- **Features**: Streaming, Function calling (model-dependent)
- **API Key**: Get from [openrouter.ai](https://openrouter.ai)
- **Base URL**: `https://openrouter.ai/api/v1`

**Popular Models via OpenRouter**:
- `anthropic/claude-3.5-sonnet` - Claude 3.5 Sonnet
- `openai/gpt-4o` - GPT-4o
- `google/gemini-pro-1.5` - Gemini Pro 1.5
- `deepseek/deepseek-chat` - DeepSeek Chat
- `meta-llama/llama-3.1-70b-instruct` - Llama 3.1 70B
- `mistralai/mixtral-8x7b-instruct` - Mixtral 8x7B

### 3. Ollama (Local)
- **Type**: Local models running on your machine
- **API**: OpenAI-compatible local server
- **Models**: Llama, Mistral, CodeLlama, Phi-3, and more
- **Features**: Streaming, No API costs, Privacy-focused
- **API Key**: Not required (optional)
- **Base URL**: `http://localhost:11434/v1` (default)

**Setup Ollama**:
1. Install Ollama: [ollama.ai](https://ollama.ai)
2. Pull a model: `ollama pull llama3.1`
3. Start Ollama server (runs automatically)
4. Configure in Command Center (API key optional)

**Custom Ollama URL**: Set `VITE_OLLAMA_BASE_URL` environment variable to use a different server.

## Configuration

### Deep Seek
```typescript
{
    provider: 'deepseek',
    apiKey: 'sk-...',
    model: 'deepseek-chat',
    maxTokens: 4096,
}
```

### OpenRouter
```typescript
{
    provider: 'openrouter',
    apiKey: 'sk-or-...',
    model: 'anthropic/claude-3.5-sonnet', // Any OpenRouter model ID
    maxTokens: 4096,
}
```

### Ollama
```typescript
{
    provider: 'ollama',
    apiKey: '', // Optional, can be empty
    model: 'llama3.1',
    maxTokens: 4096,
}
```

## Environment Variables

### Ollama Custom URL
```bash
# .env
VITE_OLLAMA_BASE_URL=http://localhost:11434/v1
```

## Usage Examples

### Using Deep Seek
1. Get API key from [deepseek.com](https://platform.deepseek.com)
2. Select "Deep Seek" provider
3. Enter API key
4. Choose model (DeepSeek Chat or DeepSeek Coder)
5. Start workflows

### Using OpenRouter
1. Get API key from [openrouter.ai](https://openrouter.ai)
2. Select "OpenRouter (Unified)" provider
3. Enter API key
4. Choose from 100+ available models
5. Start workflows

### Using Ollama (Local)
1. Install Ollama: `brew install ollama` (macOS) or download from [ollama.ai](https://ollama.ai)
2. Pull a model: `ollama pull llama3.1`
3. Select "Ollama (Local)" provider
4. Leave API key empty (or enter placeholder)
5. Choose model (must be pulled locally first)
6. Start workflows

## Model Availability

### Deep Seek
- ✅ DeepSeek Chat (general purpose)
- ✅ DeepSeek Coder (code generation)

### OpenRouter
- ✅ 100+ models from multiple providers
- ✅ Claude, GPT, Gemini, Llama, Mistral, etc.
- ✅ Check [openrouter.ai/models](https://openrouter.ai/models) for full list

### Ollama
- ✅ Llama 3.1, Llama 3.1 70B
- ✅ Mistral, Mixtral
- ✅ CodeLlama
- ✅ Phi-3
- ✅ Any model available in Ollama registry

## Cost Comparison

| Provider | Cost | Notes |
|----------|------|-------|
| Deep Seek | Very Low | Open-source friendly pricing |
| OpenRouter | Variable | Pay-per-use, model-dependent |
| Ollama | Free | Local, no API costs |

## Privacy & Security

- **Deep Seek**: API-based, data sent to Deep Seek servers
- **OpenRouter**: API-based, data sent to OpenRouter (then to model provider)
- **Ollama**: **100% Local** - No data leaves your machine

## Troubleshooting

### Ollama Connection Issues
- Ensure Ollama is running: `ollama serve`
- Check default URL: `http://localhost:11434/v1`
- Set custom URL via `VITE_OLLAMA_BASE_URL` if needed
- Verify model is pulled: `ollama list`

### OpenRouter Model Not Found
- Check model ID format: `provider/model-name`
- Verify model is available: [openrouter.ai/models](https://openrouter.ai/models)
- Some models may require credits or subscription

### Deep Seek API Errors
- Verify API key format: `sk-...`
- Check API key permissions
- Ensure model name is correct

## Benefits of Open Source Providers

1. **Cost Savings**: Deep Seek and Ollama offer lower/no costs
2. **Privacy**: Ollama runs completely locally
3. **Flexibility**: OpenRouter provides access to many models
4. **No Vendor Lock-in**: Switch providers easily
5. **Local Development**: Ollama perfect for offline work

## Next Steps

1. **Choose Provider**: Based on your needs (cost, privacy, features)
2. **Get API Key**: For Deep Seek or OpenRouter (if needed)
3. **Install Ollama**: For local models (optional)
4. **Configure**: Set up provider in Settings
5. **Test**: Try workflows with your chosen provider
