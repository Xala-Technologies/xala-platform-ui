#!/bin/bash

# Script to verify CSP headers in Storybook dev server
# Usage: ./scripts/verify-csp.sh

set -e

echo "==================================="
echo "CSP Headers Verification Script"
echo "==================================="
echo ""

# Check if Storybook is running
if ! curl -s http://localhost:6006 > /dev/null 2>&1; then
  echo "❌ Storybook is not running on port 6006"
  echo ""
  echo "Please start Storybook first:"
  echo "  pnpm storybook"
  echo ""
  exit 1
fi

echo "✅ Storybook is running on port 6006"
echo ""

# Test CSP headers
echo "Testing CSP headers..."
echo "-----------------------------------"

HEADERS=$(curl -sI http://localhost:6006 2>&1)

if echo "$HEADERS" | grep -iq "content-security-policy"; then
  echo "✅ Content-Security-Policy header found"
  echo ""
  echo "CSP Header:"
  echo "$HEADERS" | grep -i "content-security-policy"
  echo ""
else
  echo "❌ Content-Security-Policy header NOT found"
  echo ""
  echo "Full headers:"
  echo "$HEADERS"
  echo ""
  exit 1
fi

# Parse and validate CSP directives
CSP_VALUE=$(echo "$HEADERS" | grep -i "content-security-policy" | cut -d: -f2-)

echo "Checking CSP directives..."
echo "-----------------------------------"

REQUIRED_DIRECTIVES=(
  "default-src"
  "script-src"
  "style-src"
  "font-src"
  "img-src"
  "connect-src"
)

for directive in "${REQUIRED_DIRECTIVES[@]}"; do
  if echo "$CSP_VALUE" | grep -iq "$directive"; then
    echo "✅ $directive directive present"
  else
    echo "⚠️  $directive directive missing"
  fi
done

echo ""
echo "==================================="
echo "Manual Browser Verification Steps"
echo "==================================="
echo ""
echo "1. Open http://localhost:6006 in your browser"
echo "2. Open DevTools (F12)"
echo "3. Go to Console tab"
echo "4. Check for CSP violation errors"
echo "5. Go to Network tab"
echo "6. Refresh the page"
echo "7. Click on the main document request"
echo "8. Go to Headers tab"
echo "9. Verify 'content-security-policy' is present in Response Headers"
echo "10. Navigate through different stories"
echo "11. Verify stories render correctly"
echo "12. Verify no CSP errors appear in Console"
echo ""
echo "Expected Results:"
echo "  ✅ Storybook UI loads completely"
echo "  ✅ No CSP violation errors in Console"
echo "  ✅ Stories render correctly"
echo "  ✅ CSP header present in Response Headers"
echo "  ✅ Hot reload works (try editing a story)"
echo ""
