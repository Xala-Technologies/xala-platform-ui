# Dynamic Model Resolution Implementation

## Problem Solved

Previously, the Command Center was hardcoding Anthropic model IDs (e.g., `claude-3-5-sonnet-20241022`), which caused 404 errors when:
- Models were deprecated/retired
- Models were renamed
- API keys didn't have access to specific model versions

## Solution

Implemented **dynamic model discovery** that:
1. Fetches available models from Anthropic's `/v1/models` API
2. Automatically selects the best available model based on preferences
3. Handles 404 errors by automatically retrying with alternative models
4. Caches model lists for performance

## Implementation

### 1. Models Service (`src/lib/ai/providers/anthropic/models.ts`)

```typescript
// Fetches models from Anthropic API
const models = await anthropicModelsService.getAvailableModels(apiKey);

// Selects best model (prefers "sonnet", falls back to newest)
const bestModel = anthropicModelsService.getBestAvailableModel(models, {
    preferenceOrder: ['sonnet', 'opus', 'haiku'],
    fallbackToNewest: true,
});
```

**Features**:
- Caches results for 5 minutes
- Falls back to cached data if API fails
- Provides model selection logic

### 2. Updated Anthropic Provider

**Key Changes**:
- `initialize()` is now async and resolves models dynamically
- `createStreamedMessage()` and `createMessage()` automatically retry on 404 errors
- `listModels()` fetches from API instead of hardcoded list

**Error Handling**:
```typescript
// Automatic retry on model not found
catch (error) {
    if (error?.status === 404 || error?.error?.type === 'not_found_error') {
        // Resolve new model and retry
        modelToUse = await this.handleModelNotFound(error, retryCount);
        retryCount++;
        continue;
    }
}
```

### 3. Updated Provider Registry

- `setCurrentProvider()` is now async to support async initialization
- Handles both sync and async provider initialization

### 4. Updated UI

- `ApiKeyModal` now awaits provider initialization
- Model dropdown shows dynamically fetched models
- Prefers "sonnet" models when available
- Shows helpful error messages

## Usage

### Automatic (Recommended)

When you configure Anthropic:
1. Enter your API key
2. System automatically fetches available models
3. Selects best model (prefers Sonnet)
4. If model fails, automatically tries alternatives

### Manual Model Selection

You can still manually select a model:
1. Models are fetched and shown in dropdown
2. Select any available model
3. System will use your selection

## API Flow

```
1. User enters API key
   ↓
2. Provider.initialize() called
   ↓
3. Fetch /v1/models from Anthropic
   ↓
4. Select best model (prefer "sonnet")
   ↓
5. Use selected model for requests
   ↓
6. If 404 error:
   - Clear cache
   - Re-fetch models
   - Select alternative
   - Retry request
```

## Benefits

✅ **No More 404 Errors**: Models are always current  
✅ **Automatic Fallback**: Tries alternatives if model unavailable  
✅ **Future-Proof**: Works with new models automatically  
✅ **Better UX**: Users see only models they can actually use  
✅ **Performance**: Caching reduces API calls  

## Testing

To test the implementation:

1. **Normal Flow**:
   ```typescript
   await provider.initialize({ provider: 'anthropic', apiKey: 'sk-ant-...' });
   // Model automatically resolved
   ```

2. **Model Not Found Handling**:
   ```typescript
   // If model fails, system automatically:
   // 1. Fetches new model list
   // 2. Selects alternative
   // 3. Retries request
   ```

3. **Manual Model Selection**:
   ```typescript
   await provider.initialize({ 
       provider: 'anthropic', 
       apiKey: 'sk-ant-...',
       model: 'claude-3-sonnet-20240229' // Explicit model
   });
   ```

## Configuration

### Model Selection Preferences

You can customize model selection:

```typescript
const bestModel = anthropicModelsService.getBestAvailableModel(models, {
    preferenceOrder: ['sonnet', 'opus', 'haiku'], // Order matters
    fallbackToNewest: true, // Use newest if no preference matches
});
```

### Cache TTL

Models are cached for 5 minutes. To change:

```typescript
anthropicModelsService.cacheTTL = 10 * 60 * 1000; // 10 minutes
```

## Troubleshooting

### Models Not Loading

- Check API key is valid
- Verify network connectivity
- Check browser console for errors
- System falls back to hardcoded list if API fails

### Wrong Model Selected

- Manually select model from dropdown
- Or specify model in config: `{ model: 'claude-3-sonnet-20240229' }`

### Still Getting 404

- System should auto-retry with alternative models
- Check that API key has access to any models
- Verify Anthropic API status

## Files Changed

- ✅ `src/lib/ai/providers/anthropic/models.ts` - New models service
- ✅ `src/lib/ai/providers/anthropic/anthropic.ts` - Updated provider with dynamic resolution
- ✅ `src/lib/ai/provider-registry.ts` - Async provider initialization
- ✅ `src/lib/ai/types.ts` - Updated interface for async initialize
- ✅ `src/components/settings/ApiKeyModal.tsx` - Updated UI to handle async init

## Next Steps

The system now:
- ✅ Fetches models dynamically
- ✅ Selects best available model
- ✅ Handles 404 errors automatically
- ✅ Shows available models in UI

No more hardcoded model IDs! 🎉
