# Model Resolution Fix

## Problem

The system was failing with:
```
Model resolution failed after 2 attempts: 404 {"type":"error","error":{"type":"not_found_error","message":"model: claude-3-5-sonnet-20240620"}}
```

The issue was that:
1. Hardcoded fallback models (`claude-3-5-sonnet-20240620`) were not available for the user's API key
2. Retry logic was trying the same unavailable model multiple times
3. No fresh model fetching during retries

## Solution

### 1. Removed Hardcoded Fallbacks

**Before:**
```typescript
// Fallback to hardcoded model if API fails
this.defaultModel = 'claude-3-5-sonnet-20240620';
```

**After:**
```typescript
// Don't set hardcoded fallback - fetch fresh models instead
throw new Error(`Failed to fetch available models: ${errorMessage}`);
```

### 2. Improved Retry Logic

**Before:**
- Retry logic called `resolveModel()` which could use the same unavailable model

**After:**
- On 404 error, fetch **fresh models** from API
- Find an **alternative model** (different from the one that failed)
- Use the alternative model for retry

```typescript
private async handleModelNotFound(error: any, retryCount: number = 0): Promise<string> {
    // Clear cache and fetch fresh models
    anthropicModelsService.clearCache();
    this.availableModels = await anthropicModelsService.getAvailableModels(this.apiKey);
    
    // Find alternative model (not the one that failed)
    const failedModelId = this.defaultModel;
    const alternativeModel = this.availableModels.find(m => m.id !== failedModelId) || 
                           anthropicModelsService.getBestAvailableModel(this.availableModels);
    
    this.defaultModel = alternativeModel.id;
    return this.defaultModel;
}
```

### 3. Better Error Messages

**Before:**
```
Model resolution failed after 2 attempts: 404...
```

**After:**
```
Model resolution failed after 3 attempts. Available models: claude-sonnet-4-5-20250929, claude-haiku-4-5-20251001. Original error: 404...
```

## How It Works Now

1. **Initial Resolution**:
   - Fetches models from `/v1/models` API
   - Selects best available model (prefers sonnet)
   - Uses that model

2. **On 404 Error**:
   - Clears cache
   - Fetches **fresh** models from API
   - Finds **alternative** model (different from failed one)
   - Retries with alternative

3. **After 2 Retries**:
   - Shows helpful error with list of available models
   - User can manually select a working model

## Testing

To test the fix:

1. **Use an API key** that doesn't have access to `claude-3-5-sonnet-20240620`
2. **System should**:
   - Fetch available models
   - Select one that's actually available
   - If that fails, try alternatives automatically

3. **If all models fail**:
   - Error message shows available models
   - User can manually select from the list

## Key Changes

- ✅ Removed all hardcoded model fallbacks
- ✅ Retry logic fetches fresh models from API
- ✅ Finds alternative models instead of retrying same one
- ✅ Better error messages with available models list
- ✅ Both streaming and non-streaming methods have retry logic

The system now **never** uses hardcoded model IDs that might not exist. It always fetches fresh models from the API and uses what's actually available.
