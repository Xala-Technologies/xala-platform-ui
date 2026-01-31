# Testing CSP Headers in Storybook

This document provides instructions for verifying that Content Security Policy (CSP) headers are properly configured in the Storybook dev server.

## Automated Verification

Run the verification script:

```bash
# Start Storybook first
pnpm storybook

# In a separate terminal, run the verification script
./scripts/verify-csp.sh
```

The script will:
- ✅ Check if Storybook is running
- ✅ Verify CSP headers are present
- ✅ Validate required CSP directives
- ✅ Provide manual testing checklist

## Manual Browser Verification

### Prerequisites

1. Start Storybook dev server:
   ```bash
   pnpm storybook
   ```

2. Wait for Storybook to be ready (usually takes 10-20 seconds)

### Testing Steps

#### Step 1: Verify CSP Headers in Network Tab

1. Open http://localhost:6006 in your browser
2. Open DevTools (F12 or Cmd+Option+I on Mac)
3. Go to the **Network** tab
4. Refresh the page (Cmd+R or Ctrl+R)
5. Click on the first document request (usually "iframe.html" or the root document)
6. Go to the **Headers** tab in the request details
7. Look for `content-security-policy` in the **Response Headers** section

**Expected Result:**
```
content-security-policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data: blob:; connect-src 'self' ws: wss:; frame-src 'self'; object-src 'none'; base-uri 'self'
```

#### Step 2: Check for CSP Violations

1. Stay in DevTools
2. Go to the **Console** tab
3. Look for any CSP violation warnings/errors

**Expected Result:**
- ✅ No CSP violation errors
- ✅ No warnings about blocked resources
- ℹ️ If you see CSP violations, they indicate resources being blocked by the policy

Common CSP violation format:
```
Refused to load the script '<URL>' because it violates the following Content Security Policy directive: "..."
```

#### Step 3: Verify Storybook Functionality

1. Navigate through the story list in the left sidebar
2. Click on different stories
3. Verify each story renders correctly
4. Check that interactive components work
5. Try switching between different component variants

**Expected Result:**
- ✅ All stories load without errors
- ✅ Component interactions work (buttons, inputs, etc.)
- ✅ No broken layouts or missing styles
- ✅ Images and icons display correctly

#### Step 4: Test Hot Module Replacement (HMR)

1. Open a story file in your editor (e.g., `src/stories/Button.stories.tsx`)
2. Make a small change (e.g., change button text)
3. Save the file
4. Observe the browser

**Expected Result:**
- ✅ Story updates automatically without full page reload
- ✅ No CSP errors appear after HMR update
- ✅ Changes are reflected immediately

#### Step 5: Verify with cURL (Command Line)

In a terminal, run:

```bash
curl -I http://localhost:6006
```

**Expected Output:**
```
HTTP/1.1 200 OK
content-security-policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data: blob:; connect-src 'self' ws: wss:; frame-src 'self'; object-src 'none'; base-uri 'self'
... (other headers)
```

## Troubleshooting

### CSP Header Not Present

**Symptom:** No `content-security-policy` header in response

**Solution:**
1. Check that `.storybook/middleware.ts` exists
2. Verify `.storybook/main.ts` includes `cspPlugin()` in viteFinal
3. Restart Storybook server

### CSP Violations in Console

**Symptom:** Console shows CSP violation errors

**Common Causes:**

1. **Script blocked:** Storybook tries to load external script
   - Check if any stories import external scripts
   - Verify `script-src` includes necessary sources

2. **Style blocked:** External stylesheet or inline style blocked
   - Ensure `style-src 'self' 'unsafe-inline'` is present
   - Check for external CSS imports

3. **WebSocket blocked:** Hot reload not working
   - Verify `connect-src` includes `ws:` and `wss:`
   - Check if dev server WebSocket is on different port

4. **Image blocked:** Images not loading
   - Ensure `img-src` includes `data:` and `blob:`
   - Check if images are from external domains

### Stories Not Rendering

**Symptom:** Stories show errors or don't load

**Solution:**
1. Check Console for specific error messages
2. Verify CSP directives allow Storybook's requirements:
   - `'unsafe-inline'` for styles (required by Storybook)
   - `'unsafe-eval'` for scripts (required by Storybook dev)
3. Test without CSP by temporarily commenting out the plugin

### Hot Reload Not Working

**Symptom:** Changes don't appear without manual refresh

**Solution:**
1. Verify `connect-src` includes `ws:` and `wss:`
2. Check browser console for WebSocket errors
3. Verify CSP isn't blocking WebSocket connections

## CSP Directives Explained

The dev server CSP includes:

| Directive | Value | Reason |
|-----------|-------|--------|
| `default-src` | `'self'` | Default policy for unspecified directives |
| `script-src` | `'self' 'unsafe-inline' 'unsafe-eval'` | Required for Storybook dev features |
| `style-src` | `'self' 'unsafe-inline'` | Required for component styles |
| `font-src` | `'self' data:` | Allows web fonts and data URIs |
| `img-src` | `'self' data: blob:` | Allows images from various sources |
| `connect-src` | `'self' ws: wss:` | Allows WebSocket for HMR |
| `frame-src` | `'self'` | Allows Storybook iframe preview |
| `object-src` | `'none'` | Blocks plugins (security hardening) |
| `base-uri` | `'self'` | Restricts `<base>` tag (security) |

## Production CSP Configuration

**Important:** The CSP configuration in the dev server is permissive to support development features.

For **production static builds**, use stricter CSP policies. See:
- [docs/security/CSP_CONFIGURATION.md](./docs/security/CSP_CONFIGURATION.md) - Detailed production CSP guide
- [CLAUDE.md](./CLAUDE.md#content-security-policy-csp) - Consumer guidance

## Verification Checklist

Use this checklist to confirm CSP is working correctly:

- [ ] CSP header present in HTTP response headers
- [ ] No CSP violation errors in browser console
- [ ] Storybook UI loads completely
- [ ] All stories render correctly
- [ ] Component interactions work (clicks, inputs, etc.)
- [ ] Hot Module Replacement (HMR) works
- [ ] Images and icons display
- [ ] Fonts load correctly
- [ ] WebSocket connection established (for HMR)
- [ ] No broken layouts or missing styles

## Additional Resources

- [Content Security Policy (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/) - Analyze CSP policies
- [CSP Validator](https://cspvalidator.org/) - Test CSP headers
- [Storybook Security Docs](https://storybook.js.org/docs/react/configure/overview#security)

## Questions?

If you encounter issues not covered here:

1. Check [docs/security/CSP_CONFIGURATION.md](./docs/security/CSP_CONFIGURATION.md) for detailed CSP documentation
2. Review browser DevTools Console and Network tabs for specific errors
3. Verify the implementation in `.storybook/middleware.ts`
4. Check Storybook logs for startup errors

---

**Last Updated:** 2026-01-30
**Related:** CSP Implementation (Task 010)
