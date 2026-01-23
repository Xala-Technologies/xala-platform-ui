# Model Troubleshooting Guide

If you're getting 404 errors with Anthropic models, follow these steps:

## Step 1: Verify Your API Key Has Access

Some models require specific API access levels. Check your Anthropic account:
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Check your API access level
3. Verify which models are available to your account

## Step 2: Try Different Model Names

Anthropic model names can vary. Try these in order:

### Claude 3.5 Sonnet
1. `claude-3-5-sonnet-20240620` (original release)
2. `claude-3-5-sonnet-20241022` (later version)
3. `claude-3-5-sonnet` (without date - may work for latest)

### Claude 3.5 Haiku
1. `claude-3-5-haiku-20241022`
2. `claude-3-5-haiku` (without date)

### Claude 3 Series (Older but Stable)
- `claude-3-opus-20240229`
- `claude-3-sonnet-20240229`
- `claude-3-haiku-20240307`

## Step 3: Check Anthropic Documentation

Model names can change. Check the official documentation:
- [Anthropic Models API](https://docs.anthropic.com/en/api/models)
- [Models Overview](https://docs.anthropic.com/en/docs/about-claude/models/all-models)

## Step 4: Use the Models List Endpoint

You can call Anthropic's `/v1/models` endpoint to see what models your API key has access to:

```bash
curl https://api.anthropic.com/v1/models \
  -H "x-api-key: YOUR_API_KEY" \
  -H "anthropic-version: 2023-06-01"
```

## Step 5: Common Solutions

### Error: "model: claude-3-5-sonnet-20241022 not found"
- **Solution 1**: Try `claude-3-5-sonnet-20240620` instead
- **Solution 2**: Try `claude-3-5-sonnet` (without date)
- **Solution 3**: Check if your API key has access to this model version
- **Solution 4**: Use an older Claude 3 model (e.g., `claude-3-sonnet-20240229`)

### Error: "Invalid API key"
- Verify your API key is correct
- Check that your API key hasn't expired
- Ensure you're using the correct key format (`sk-ant-...`)

### Error: "Rate limit exceeded"
- Wait a few minutes and try again
- Check your usage limits in the Anthropic console
- Consider upgrading your API plan

## Step 6: Test with a Simple Request

Try a minimal request to verify your setup:

```typescript
const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20240620', // Try different names
    max_tokens: 10,
    messages: [{ role: 'user', content: 'Hi' }],
});
```

## Model Name Format

Anthropic model names typically follow this pattern:
- `claude-{version}-{model}-{date}` (e.g., `claude-3-5-sonnet-20240620`)
- Sometimes without date suffix for "latest" version
- Dates are in `YYYYMMDD` format

## Still Having Issues?

1. **Check Anthropic Status**: [status.anthropic.com](https://status.anthropic.com)
2. **Contact Support**: If your API key should have access but models aren't working
3. **Try Alternative Models**: Use Claude 3 models which are more stable
4. **Check API Version**: Ensure you're using a compatible API version

## Quick Reference: Working Model Names

Based on common usage, these model names typically work:

✅ **Most Reliable**:
- `claude-3-5-sonnet-20240620`
- `claude-3-sonnet-20240229`
- `claude-3-haiku-20240307`

⚠️ **May Vary by Account**:
- `claude-3-5-sonnet-20241022`
- `claude-3-5-haiku-20241022`

🔍 **Try If Others Fail**:
- `claude-3-5-sonnet` (without date)
- `claude-3-5-haiku` (without date)
