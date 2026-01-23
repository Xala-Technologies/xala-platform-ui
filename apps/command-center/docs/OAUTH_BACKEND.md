# OAuth Backend Requirements

This document describes the backend API endpoints required for OAuth authentication with Anthropic.

## Overview

The Command Center frontend supports both API key and OAuth authentication. OAuth requires a backend proxy server to securely exchange authorization codes for access tokens, as this process cannot be done securely in the browser.

## Required Backend Endpoints

### 1. Authorization Endpoint

**GET** `/api/auth/anthropic/authorize`

Initiates the OAuth flow by redirecting to Anthropic's authorization server.

**Query Parameters:**
- `client_id` (string, required) - OAuth client ID
- `redirect_uri` (string, required) - Callback URL after authorization
- `response_type` (string, required) - Always "code" for authorization code flow
- `scope` (string, optional) - Space-separated list of scopes
- `state` (string, optional) - CSRF protection token

**Response:**
- HTTP 302 redirect to Anthropic authorization URL

**Example:**
```
GET /api/auth/anthropic/authorize?client_id=xxx&redirect_uri=http://localhost:3000/oauth/callback&response_type=code&scope=read%20write
→ Redirects to: https://api.anthropic.com/oauth/authorize?...
```

### 2. Token Exchange Endpoint

**POST** `/api/auth/anthropic/token`

Exchanges an authorization code for an access token and refresh token.

**Request Body:**
```json
{
  "code": "authorization_code_from_callback",
  "redirect_uri": "http://localhost:3000/oauth/callback",
  "state": "optional_csrf_token"
}
```

**Response:**
```json
{
  "access_token": "access_token_string",
  "refresh_token": "refresh_token_string",
  "expires_in": 3600,
  "token_type": "Bearer"
}
```

**Error Response:**
```json
{
  "error": "invalid_grant",
  "error_description": "Authorization code expired or invalid"
}
```

### 3. Token Refresh Endpoint

**POST** `/api/auth/anthropic/refresh`

Refreshes an expired access token using a refresh token.

**Request Body:**
```json
{
  "refresh_token": "refresh_token_string"
}
```

**Response:**
```json
{
  "access_token": "new_access_token_string",
  "refresh_token": "new_refresh_token_string",
  "expires_in": 3600,
  "token_type": "Bearer"
}
```

**Error Response:**
```json
{
  "error": "invalid_grant",
  "error_description": "Refresh token expired or invalid"
}
```

## Environment Variables

The frontend expects the following environment variables:

```bash
VITE_ANTHROPIC_OAUTH_BACKEND_URL=https://your-backend-api.com
VITE_ANTHROPIC_OAUTH_CLIENT_ID=your_oauth_client_id
```

## Security Considerations

1. **HTTPS Only**: All endpoints must use HTTPS in production
2. **CORS**: Configure CORS to allow requests from your frontend domain
3. **Token Storage**: Never expose refresh tokens to the frontend
4. **CSRF Protection**: Use state parameter to prevent CSRF attacks
5. **Token Expiration**: Implement proper token expiration handling
6. **Rate Limiting**: Implement rate limiting on token endpoints

## Implementation Example (Node.js/Express)

```javascript
const express = require('express');
const axios = require('axios');
const router = express.Router();

// OAuth configuration
const ANTHROPIC_CLIENT_ID = process.env.ANTHROPIC_CLIENT_ID;
const ANTHROPIC_CLIENT_SECRET = process.env.ANTHROPIC_CLIENT_SECRET;
const ANTHROPIC_AUTH_URL = 'https://api.anthropic.com/oauth/authorize';
const ANTHROPIC_TOKEN_URL = 'https://api.anthropic.com/oauth/token';

// Authorization endpoint
router.get('/authorize', (req, res) => {
  const { client_id, redirect_uri, response_type, scope, state } = req.query;
  
  // Build Anthropic authorization URL
  const authUrl = new URL(ANTHROPIC_AUTH_URL);
  authUrl.searchParams.set('client_id', client_id);
  authUrl.searchParams.set('redirect_uri', redirect_uri);
  authUrl.searchParams.set('response_type', response_type);
  if (scope) authUrl.searchParams.set('scope', scope);
  if (state) authUrl.searchParams.set('state', state);
  
  res.redirect(authUrl.toString());
});

// Token exchange endpoint
router.post('/token', async (req, res) => {
  const { code, redirect_uri } = req.body;
  
  try {
    const response = await axios.post(ANTHROPIC_TOKEN_URL, {
      grant_type: 'authorization_code',
      code,
      redirect_uri,
      client_id: ANTHROPIC_CLIENT_ID,
      client_secret: ANTHROPIC_CLIENT_SECRET,
    });
    
    res.json({
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token,
      expires_in: response.data.expires_in,
      token_type: response.data.token_type || 'Bearer',
    });
  } catch (error) {
    res.status(400).json({
      error: error.response?.data?.error || 'invalid_grant',
      error_description: error.response?.data?.error_description || 'Token exchange failed',
    });
  }
});

// Token refresh endpoint
router.post('/refresh', async (req, res) => {
  const { refresh_token } = req.body;
  
  try {
    const response = await axios.post(ANTHROPIC_TOKEN_URL, {
      grant_type: 'refresh_token',
      refresh_token,
      client_id: ANTHROPIC_CLIENT_ID,
      client_secret: ANTHROPIC_CLIENT_SECRET,
    });
    
    res.json({
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token || refresh_token,
      expires_in: response.data.expires_in,
      token_type: response.data.token_type || 'Bearer',
    });
  } catch (error) {
    res.status(400).json({
      error: error.response?.data?.error || 'invalid_grant',
      error_description: error.response?.data?.error_description || 'Token refresh failed',
    });
  }
});

module.exports = router;
```

## Testing

1. Set environment variables in your frontend `.env` file:
   ```
   VITE_ANTHROPIC_OAUTH_BACKEND_URL=http://localhost:8080
   VITE_ANTHROPIC_OAUTH_CLIENT_ID=test_client_id
   ```

2. Start your backend server

3. In the Command Center, open the API Configuration modal

4. Click the "OAuth" tab

5. Click "Sign in with OAuth"

6. Complete the OAuth flow

## Notes

- **Anthropic OAuth**: As of the current implementation, Anthropic may not yet support OAuth. This implementation is prepared for when OAuth becomes available.
- **Fallback**: Users can always use API key authentication if OAuth is not configured or available.
- **Token Refresh**: The frontend automatically attempts to refresh tokens when they expire (if refresh token is available).
