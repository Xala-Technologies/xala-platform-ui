#!/bin/bash

# Setup script for OAuth Proxy Server environment variables

echo "Setting up OAuth Proxy Server environment..."

# Backend .env
cat > .env << 'EOF'
# OAuth Proxy Server Configuration

# Server Configuration
PORT=8080
FRONTEND_URL=http://localhost:3000

# Anthropic OAuth Configuration
# Note: Using test values for development
# Replace with actual values when Anthropic OAuth is available
ANTHROPIC_CLIENT_ID=test_client_id
ANTHROPIC_CLIENT_SECRET=test_client_secret
ANTHROPIC_AUTH_URL=https://api.anthropic.com/oauth/authorize
ANTHROPIC_TOKEN_URL=https://api.anthropic.com/oauth/token
EOF

echo "✅ Backend .env file created"

# Frontend .env (in parent directory)
cat > ../.env << 'EOF'
# Frontend Environment Variables

# OAuth Backend Configuration
VITE_ANTHROPIC_OAUTH_BACKEND_URL=http://localhost:8080
VITE_ANTHROPIC_OAUTH_CLIENT_ID=test_client_id
EOF

echo "✅ Frontend .env file created"
echo ""
echo "📝 Environment files created. Edit them if needed before starting the servers."
