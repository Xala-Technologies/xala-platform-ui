# Environment Setup Guide

## Backend Environment Variables

Create a `.env` file in the `backend/` directory with:

```bash
# Server Configuration
PORT=8080
FRONTEND_URL=http://localhost:3000

# Anthropic OAuth Configuration
ANTHROPIC_CLIENT_ID=test_client_id
ANTHROPIC_CLIENT_SECRET=test_client_secret
ANTHROPIC_AUTH_URL=https://api.anthropic.com/oauth/authorize
ANTHROPIC_TOKEN_URL=https://api.anthropic.com/oauth/token
```

## Frontend Environment Variables

Create a `.env` file in the `apps/command-center/` directory with:

```bash
# OAuth Backend Configuration
VITE_ANTHROPIC_OAUTH_BACKEND_URL=http://localhost:8080
VITE_ANTHROPIC_OAUTH_CLIENT_ID=test_client_id
```

## Quick Setup

Run the setup script:

```bash
cd backend
chmod +x setup-env.sh
./setup-env.sh
```

Or manually create the files using the content above.
