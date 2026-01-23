# Anthropic Claude Model Names

## Current Model Identifiers

The following model identifiers are currently supported:

### Claude 3.5 Series
- `claude-3-5-sonnet-20240620` - Claude 3.5 Sonnet (original release, most reliable)
- `claude-3-5-sonnet-20241022` - Claude 3.5 Sonnet (later version, may require specific access)
- `claude-3-5-haiku-20241022` - Claude 3.5 Haiku (faster, cost-effective)

### Claude 3 Series
- `claude-3-opus-20240229` - Claude 3 Opus (most capable of Claude 3)
- `claude-3-sonnet-20240229` - Claude 3 Sonnet (balanced, very stable)
- `claude-3-haiku-20240307` - Claude 3 Haiku (fastest, most cost-effective)

## Default Model

The default model is `claude-3-5-sonnet-20240620` (Claude 3.5 Sonnet - original release).

**Note**: If you get a 404 error, try `claude-3-5-sonnet-20241022` or `claude-3-sonnet-20240229` as alternatives.

## Troubleshooting Model Errors

If you encounter a 404 error with a model name:

1. **Check the model name** - Ensure you're using the exact identifier from the list above
2. **Verify API access** - Some models may require specific API access levels
3. **Try an alternative** - If one model doesn't work, try another from the list
4. **Check Anthropic documentation** - Model names may change, check https://docs.anthropic.com/en/api/models

## Common Issues

### Error: "model: claude-3-5-sonnet-20240620 not found"
- **Solution**: Use `claude-3-5-sonnet-20241022` instead (the correct identifier)

### Error: "Invalid model"
- **Solution**: Verify your API key has access to the requested model
- **Solution**: Try a different model from the list above

## Updating Model Names

To update model names in the codebase:

1. **Client default** (`src/lib/anthropic/client.ts`):
   ```typescript
   private defaultModel: string = 'claude-3-5-sonnet-20241022';
   ```

2. **Provider default** (`src/lib/ai/providers/anthropic.ts`):
   ```typescript
   private defaultModel: string = 'claude-3-5-sonnet-20241022';
   ```

3. **Select options** - Update the `<Select.Option>` values in `ApiKeyModal.tsx`
