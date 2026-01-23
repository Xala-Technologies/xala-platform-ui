# All Supported AI Providers

Complete list of all 6 supported AI providers in the Command Center.

## Quick Reference

| Provider | Type | Cost | Privacy | Best For |
|----------|------|------|---------|----------|
| **Anthropic** | Commercial | Medium | API | Best overall quality, OAuth support |
| **OpenAI** | Commercial | High | API | GPT models, function calling |
| **Google Gemini** | Commercial | Low | API | Cost-effective, multimodal |
| **Deep Seek** | Open-source friendly | Very Low | API | Budget-conscious, code generation |
| **OpenRouter** | Unified API | Variable | API | Access to 100+ models |
| **Ollama** | Local | Free | **100% Local** | Privacy, offline, CLI-based |
| **LM Studio** | Local | Free | **100% Local** | Privacy, offline, GUI-based |

## Detailed Provider Information

### 1. Anthropic (Claude) 🏆

**Best for**: Highest quality responses, complex reasoning

- **Models**: Claude 3.5 Sonnet, Claude 3.5 Haiku, Claude 3 Opus, Claude 3 Sonnet, Claude 3 Haiku
- **API Key**: `sk-ant-...`
- **Get Key**: [console.anthropic.com](https://console.anthropic.com)
- **Features**: ✅ Streaming, ✅ Tool use, ✅ OAuth
- **Cost**: Medium
- **Privacy**: Data sent to Anthropic servers

### 2. OpenAI (GPT)

**Best for**: GPT models, function calling, wide adoption

- **Models**: GPT-4o, GPT-4o Mini, GPT-4 Turbo, GPT-4, GPT-3.5 Turbo
- **API Key**: `sk-...`
- **Get Key**: [platform.openai.com](https://platform.openai.com)
- **Features**: ✅ Streaming, ✅ Function calling
- **Cost**: High
- **Privacy**: Data sent to OpenAI servers

### 3. Google Gemini

**Best for**: Cost-effective, multimodal capabilities

- **Models**: Gemini 1.5 Pro, Gemini 1.5 Flash, Gemini Pro
- **API Key**: `AIza...`
- **Get Key**: [aistudio.google.com](https://aistudio.google.com)
- **Features**: ✅ Streaming, ⚠️ Limited tool use
- **Cost**: Low
- **Privacy**: Data sent to Google servers

### 4. Deep Seek 💰

**Best for**: Budget-conscious users, code generation

- **Models**: DeepSeek Chat, DeepSeek Coder
- **API Key**: `sk-...`
- **Get Key**: [platform.deepseek.com](https://platform.deepseek.com)
- **Features**: ✅ Streaming, ✅ Function calling
- **Cost**: Very Low
- **Privacy**: Data sent to Deep Seek servers
- **Note**: Open-source friendly pricing

### 5. OpenRouter 🌐

**Best for**: Access to many models, model comparison

- **Models**: 100+ models (Claude, GPT, Gemini, Llama, Mistral, etc.)
- **API Key**: `sk-or-...`
- **Get Key**: [openrouter.ai](https://openrouter.ai)
- **Features**: ✅ Streaming, ⚠️ Tool use (model-dependent)
- **Cost**: Variable (pay-per-use, model-dependent)
- **Privacy**: Data sent to OpenRouter (then to model provider)
- **Popular Models**:
  - `anthropic/claude-3.5-sonnet`
  - `openai/gpt-4o`
  - `google/gemini-pro-1.5`
  - `deepseek/deepseek-chat`
  - `meta-llama/llama-3.1-70b-instruct`
  - `mistralai/mixtral-8x7b-instruct`

### 6. Ollama (Local) 🔒

**Best for**: Privacy, offline work, zero API costs, CLI users

- **Models**: Llama 3.1, Mistral, CodeLlama, Phi-3, and more
- **API Key**: Optional (leave empty)
- **Setup**: [ollama.ai](https://ollama.ai)
- **Features**: ✅ Streaming, ❌ Tool use
- **Cost**: **Free** (runs on your machine)
- **Privacy**: **100% Local** - No data leaves your machine
- **Requirements**: 
  - Install Ollama locally
  - Pull models: `ollama pull llama3.1`
  - Server runs on `http://localhost:11434/v1` (default)

### 7. LM Studio (Local) 🖥️

**Best for**: Privacy, offline work, GUI-based model management

- **Models**: Llama, Mistral, Phi, CodeLlama, Qwen, and more
- **API Key**: Optional (leave empty)
- **Setup**: [lmstudio.ai](https://lmstudio.ai)
- **Features**: ✅ Streaming, ❌ Tool use
- **Cost**: **Free** (runs on your machine)
- **Privacy**: **100% Local** - No data leaves your machine
- **Requirements**: 
  - Install LM Studio desktop app
  - Download models via GUI
  - Start local server (runs on `http://localhost:1234/v1` by default)
  - Enter exact model name from LM Studio

## Choosing a Provider

### By Use Case

**Highest Quality**: Anthropic Claude 3.5 Sonnet
**Best Value**: Deep Seek or Google Gemini
**Most Models**: OpenRouter
**Privacy-Critical**: Ollama or LM Studio (local)
**Code Generation**: Deep Seek Coder or CodeLlama (via Ollama/LM Studio)
**Offline Work**: Ollama or LM Studio
**GUI-Based Local**: LM Studio
**CLI-Based Local**: Ollama

### By Cost

1. **Free**: Ollama (local)
2. **Very Low**: Deep Seek
3. **Low**: Google Gemini
4. **Medium**: Anthropic
5. **High**: OpenAI
6. **Variable**: OpenRouter (depends on model)

### By Privacy

- **100% Local**: Ollama and LM Studio
- **API-Based**: All others (data sent to provider servers)

## Setup Instructions

### Quick Start

1. **Choose Provider**: Based on your needs
2. **Get API Key**: (if required)
3. **Configure**: Settings → API Configuration
4. **Select Model**: Choose from available models
5. **Start**: Begin workflows

### Detailed Setup

See individual provider documentation:
- [Multi-Provider Setup](./MULTI_PROVIDER_SETUP.md)
- [Open Source Providers](./OPEN_SOURCE_PROVIDERS.md)

## Switching Providers

You can switch providers anytime:

1. Open Settings → API Configuration
2. Select new provider
3. Enter API key (if needed)
4. Choose model
5. Save

Previous provider configuration is cleared when switching.

## Provider-Specific Notes

### Anthropic
- Only provider with OAuth support
- Best for complex reasoning tasks
- Higher token limits

### OpenAI
- Most widely adopted
- Excellent function calling support
- Higher costs

### Google Gemini
- Good balance of cost and quality
- Multimodal capabilities
- Limited tool use

### Deep Seek
- Very cost-effective
- Specialized code models
- OpenAI-compatible API

### OpenRouter
- Access to 100+ models
- Unified API for multiple providers
- Pay-per-use pricing
- Model availability may vary

### Ollama
- Completely free
- 100% local (no data leaves machine)
- Requires local installation
- Model must be pulled first
- Customizable server URL via `VITE_OLLAMA_BASE_URL`

## Troubleshooting

### Common Issues

**Provider not connecting**:
- Verify API key format
- Check network connectivity
- Ensure model is available

**Ollama connection failed**:
- Ensure Ollama is running: `ollama serve`
- Check server URL (default: `http://localhost:11434/v1`)
- Verify model is pulled: `ollama list`

**LM Studio connection failed**:
- Ensure LM Studio server is running (check "Local Server" tab)
- Check server URL (default: `http://localhost:1234/v1`)
- Verify model is loaded in LM Studio
- Enter exact model name (check LM Studio's model selector)
- Enable CORS in LM Studio settings if needed

**OpenRouter model not found**:
- Check model ID format: `provider/model-name`
- Verify model availability at [openrouter.ai/models](https://openrouter.ai/models)
- Some models require credits

## Next Steps

1. Review provider options
2. Choose based on your needs
3. Get API key (if needed)
4. Configure in Settings
5. Test with a workflow

For detailed setup instructions, see:
- [Multi-Provider Setup Guide](./MULTI_PROVIDER_SETUP.md)
- [Open Source Providers Guide](./OPEN_SOURCE_PROVIDERS.md)
