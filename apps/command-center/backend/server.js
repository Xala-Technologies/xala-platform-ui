/**
 * OAuth Proxy Server for Anthropic Authentication
 * 
 * This server acts as a secure proxy between the frontend and Anthropic's OAuth endpoints.
 * It handles the token exchange securely on the server side.
 */

import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// CORS configuration - allow frontend origin
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const allowedOrigins = [FRONTEND_URL, 'http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

// OAuth configuration
const ANTHROPIC_CLIENT_ID = process.env.ANTHROPIC_CLIENT_ID || 'test_client_id';
const ANTHROPIC_CLIENT_SECRET = process.env.ANTHROPIC_CLIENT_SECRET || 'test_client_secret';
// Note: Anthropic OAuth endpoints may not be available yet
// These are placeholder URLs that would be used when OAuth is available
const ANTHROPIC_AUTH_URL = process.env.ANTHROPIC_AUTH_URL || 'https://api.anthropic.com/oauth/authorize';
const ANTHROPIC_TOKEN_URL = process.env.ANTHROPIC_TOKEN_URL || 'https://api.anthropic.com/oauth/token';

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Authorization endpoint
app.get('/api/auth/anthropic/authorize', (req, res) => {
  const { client_id, redirect_uri, response_type, scope, state } = req.query;

  // Validate required parameters
  if (!client_id || !redirect_uri || !response_type) {
    return res.status(400).json({
      error: 'invalid_request',
      error_description: 'Missing required parameters: client_id, redirect_uri, or response_type',
    });
  }

  // Build Anthropic authorization URL
  try {
    const authUrl = new URL(ANTHROPIC_AUTH_URL);
    authUrl.searchParams.set('client_id', client_id);
    authUrl.searchParams.set('redirect_uri', redirect_uri);
    authUrl.searchParams.set('response_type', response_type);
    if (scope) authUrl.searchParams.set('scope', scope);
    if (state) authUrl.searchParams.set('state', state);

    console.log(`[OAuth] Redirecting to authorization URL: ${authUrl.toString()}`);
    res.redirect(authUrl.toString());
  } catch (error) {
    console.error('[OAuth] Error building authorization URL:', error);
    res.status(500).json({
      error: 'server_error',
      error_description: 'Failed to build authorization URL',
    });
  }
});

// Token exchange endpoint
app.post('/api/auth/anthropic/token', async (req, res) => {
  const { code, redirect_uri, state } = req.body;

  if (!code) {
    return res.status(400).json({
      error: 'invalid_request',
      error_description: 'Missing authorization code',
    });
  }

  try {
    // For testing/demo purposes, we'll simulate a token response
    // In production, this would call Anthropic's actual token endpoint
    console.log(`[OAuth] Exchanging code for token: ${code.substring(0, 10)}...`);

    // TODO: Replace with actual Anthropic API call when OAuth is available
    // const response = await axios.post(ANTHROPIC_TOKEN_URL, {
    //   grant_type: 'authorization_code',
    //   code,
    //   redirect_uri,
    //   client_id: ANTHROPIC_CLIENT_ID,
    //   client_secret: ANTHROPIC_CLIENT_SECRET,
    // }, {
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    // });

    // Mock response for testing (remove when Anthropic OAuth is available)
    const mockResponse = {
      access_token: `mock_access_token_${Date.now()}`,
      refresh_token: `mock_refresh_token_${Date.now()}`,
      expires_in: 3600,
      token_type: 'Bearer',
    };

    console.log('[OAuth] Token exchange successful (mock)');
    res.json({
      access_token: mockResponse.access_token,
      refresh_token: mockResponse.refresh_token,
      expires_in: mockResponse.expires_in,
      token_type: mockResponse.token_type,
    });
  } catch (error) {
    console.error('[OAuth] Token exchange error:', error);
    const errorResponse = error.response?.data || {
      error: 'invalid_grant',
      error_description: error.message || 'Token exchange failed',
    };
    res.status(400).json(errorResponse);
  }
});

// Token refresh endpoint
app.post('/api/auth/anthropic/refresh', async (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({
      error: 'invalid_request',
      error_description: 'Missing refresh token',
    });
  }

  try {
    console.log(`[OAuth] Refreshing token: ${refresh_token.substring(0, 10)}...`);

    // TODO: Replace with actual Anthropic API call when OAuth is available
    // const response = await axios.post(ANTHROPIC_TOKEN_URL, {
    //   grant_type: 'refresh_token',
    //   refresh_token,
    //   client_id: ANTHROPIC_CLIENT_ID,
    //   client_secret: ANTHROPIC_CLIENT_SECRET,
    // }, {
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    // });

    // Mock response for testing (remove when Anthropic OAuth is available)
    const mockResponse = {
      access_token: `mock_access_token_refreshed_${Date.now()}`,
      refresh_token: refresh_token, // Keep same refresh token
      expires_in: 3600,
      token_type: 'Bearer',
    };

    console.log('[OAuth] Token refresh successful (mock)');
    res.json({
      access_token: mockResponse.access_token,
      refresh_token: mockResponse.refresh_token,
      expires_in: mockResponse.expires_in,
      token_type: mockResponse.token_type,
    });
  } catch (error) {
    console.error('[OAuth] Token refresh error:', error);
    const errorResponse = error.response?.data || {
      error: 'invalid_grant',
      error_description: error.message || 'Token refresh failed',
    };
    res.status(400).json(errorResponse);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[Server] Error:', err);
  res.status(500).json({
    error: 'server_error',
    error_description: err.message || 'Internal server error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 OAuth Proxy Server running on http://localhost:${PORT}`);
  console.log(`📋 Frontend URL: ${FRONTEND_URL}`);
  console.log(`🔑 Client ID: ${ANTHROPIC_CLIENT_ID.substring(0, 10)}...`);
  console.log(`⚠️  Note: Using mock OAuth responses until Anthropic OAuth is available`);
});
