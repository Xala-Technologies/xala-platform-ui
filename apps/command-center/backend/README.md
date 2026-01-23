# OAuth Proxy Server

Backend proxy server for Anthropic OAuth authentication.

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start the server:
```bash
npm run dev
# or
npm start
```

The server will run on `http://localhost:8080` by default.

## Endpoints

- `GET /health` - Health check
- `GET /api/auth/anthropic/authorize` - Initiate OAuth flow
- `POST /api/auth/anthropic/token` - Exchange authorization code for token
- `POST /api/auth/anthropic/refresh` - Refresh access token

## Testing

The server includes mock OAuth responses for testing until Anthropic OAuth is available.

## Production

When deploying to production:
1. Set `FRONTEND_URL` to your production frontend URL
2. Configure CORS to allow only your production domain
3. Use HTTPS for all endpoints
4. Set actual Anthropic OAuth credentials
5. Remove mock responses and use actual Anthropic API calls
