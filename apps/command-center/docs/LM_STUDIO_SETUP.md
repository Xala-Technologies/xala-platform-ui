# LM Studio Setup Guide

LM Studio is a local LLM server with a user-friendly GUI. It provides an OpenAI-compatible API for running models locally on your machine.

## What is LM Studio?

LM Studio is a desktop application that:
- Provides a GUI for downloading and managing LLM models
- Runs models locally on your machine
- Exposes an OpenAI-compatible API server
- Supports many popular models (Llama, Mistral, Phi, etc.)
- **100% free** - No API costs
- **100% local** - No data leaves your machine

## Prerequisites

1. **Install LM Studio**: Download from [lmstudio.ai](https://lmstudio.ai)
2. **Download a Model**: Use LM Studio GUI to download a model
3. **Start Local Server**: Enable the local server in LM Studio (usually runs on port 1234)

## Setup in Command Center

### 1. Start LM Studio Server

1. Open LM Studio
2. Load a model (download if needed)
3. Go to the "Local Server" tab
4. Click "Start Server"
5. Note the server URL (default: `http://localhost:1234`)

### 2. Configure in Command Center

1. Open Settings → API Configuration
2. Select **"LM Studio (Local)"** provider
3. **API Key**: Leave empty (or enter placeholder)
4. **Model**: Enter the exact model name as shown in LM Studio
   - Example: `llama-3.1-8b-instruct-q4_K_M`
   - Or: `mistral-7b-instruct-v0.2`
   - Check LM Studio's "Chat" tab to see the exact model name
5. **Max Tokens**: Set as needed (default: 4096)
6. **Save**: Test connection

### 3. Finding Your Model Name

The model name must match exactly what LM Studio shows:

1. Open LM Studio
2. Go to "Chat" tab
3. Look at the model selector dropdown
4. Copy the exact model name (e.g., `llama-3.1-8b-instruct-q4_K_M`)
5. Paste it into the Command Center model field

## Custom Server URL

If LM Studio is running on a different port or host:

1. Set environment variable:
   ```bash
   # .env
   VITE_LMSTUDIO_BASE_URL=http://localhost:1234/v1
   ```

2. Or use a different machine:
   ```bash
   VITE_LMSTUDIO_BASE_URL=http://192.168.1.100:1234/v1
   ```

## Common Models in LM Studio

Popular models you can download in LM Studio:

- **Llama 3.1**: `llama-3.1-8b-instruct`, `llama-3.1-70b-instruct`
- **Mistral**: `mistral-7b-instruct-v0.2`, `mixtral-8x7b-instruct-v0.1`
- **Phi**: `phi-3-mini-4k-instruct`, `phi-3-medium-4k-instruct`
- **CodeLlama**: `codellama-7b-instruct`, `codellama-13b-instruct`
- **Qwen**: `qwen2-7b-instruct`, `qwen2-72b-instruct`

**Note**: Model names may include quantization suffixes like `-q4_K_M`, `-q8_0`, etc.

## Troubleshooting

### "Model not set" Error
- Ensure you've entered the exact model name from LM Studio
- Check that the model is loaded in LM Studio
- Verify the model name matches exactly (case-sensitive)

### Connection Failed
- Ensure LM Studio server is running
- Check server URL (default: `http://localhost:1234/v1`)
- Verify CORS is enabled in LM Studio settings
- Try accessing `http://localhost:1234/v1/models` in your browser

### CORS Errors
- LM Studio may need CORS enabled
- Check LM Studio settings → Server → CORS
- Or use a browser extension to bypass CORS (development only)

### Model Not Found
- Verify the model is loaded in LM Studio
- Check the exact model name (including quantization suffix)
- Try reloading the model in LM Studio

## Advantages of LM Studio

1. **User-Friendly**: GUI makes it easy to download and manage models
2. **No CLI Required**: Unlike Ollama, everything is GUI-based
3. **Model Browser**: Browse and download models directly in the app
4. **Free**: No API costs
5. **Private**: 100% local, no data leaves your machine
6. **Flexible**: Supports many model formats (GGUF, etc.)

## Comparison: LM Studio vs Ollama

| Feature | LM Studio | Ollama |
|---------|-----------|--------|
| GUI | ✅ Yes | ❌ CLI only |
| Model Browser | ✅ Built-in | ❌ Manual |
| Server Port | 1234 | 11434 |
| Model Management | GUI | CLI (`ollama pull`) |
| Ease of Use | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

## Next Steps

1. **Install LM Studio**: [lmstudio.ai](https://lmstudio.ai)
2. **Download a Model**: Use the GUI to browse and download
3. **Start Server**: Enable local server in LM Studio
4. **Configure**: Set up in Command Center
5. **Test**: Try a workflow with your local model

## Example Configuration

```typescript
{
    provider: 'lmstudio',
    apiKey: '', // Optional
    model: 'llama-3.1-8b-instruct-q4_K_M', // Exact name from LM Studio
    maxTokens: 4096,
}
```

## Tips

- **Model Selection**: Smaller quantized models (q4_K_M) are faster but less capable
- **Server Settings**: Adjust context window and other settings in LM Studio
- **Multiple Models**: You can switch models in LM Studio and update the model name in Command Center
- **Performance**: Larger models require more RAM/VRAM

Enjoy using your local LLMs with LM Studio! 🚀
