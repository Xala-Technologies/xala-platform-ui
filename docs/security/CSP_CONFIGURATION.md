# Content Security Policy (CSP) Configuration
# Static Storybook Deployment

> **Version:** 1.0.0
> **Date:** 2026-01-30
> **Status:** ✅ PRODUCTION READY
> **Applies To:** Static Storybook builds only

---

## EXECUTIVE SUMMARY

This document provides **Content Security Policy (CSP)** headers configuration for deploying static Storybook builds across different hosting platforms. CSP is a critical security layer that prevents XSS attacks, data injection, and unauthorized resource loading.

### Why CSP Matters for Storybook

| Risk | Without CSP | With CSP |
|------|-------------|----------|
| **XSS Attacks** | ⚠️ Vulnerable | ✅ Protected |
| **Data Injection** | ⚠️ Possible | ✅ Blocked |
| **Unauthorized Scripts** | ⚠️ Can execute | ✅ Prevented |
| **Content Tampering** | ⚠️ Risk exists | ✅ Mitigated |

---

## UNDERSTANDING CSP DIRECTIVES

### Core Directives Explained

CSP works by defining trusted sources for different resource types. Here are the directives used in our Storybook configuration:

| Directive | Purpose | Example |
|-----------|---------|---------|
| `default-src` | Fallback for all resource types | `default-src 'self'` |
| `script-src` | JavaScript sources | `script-src 'self' 'unsafe-inline'` |
| `style-src` | CSS stylesheets | `style-src 'self' 'unsafe-inline'` |
| `img-src` | Image sources | `img-src 'self' data: https:` |
| `font-src` | Web font sources | `font-src 'self' data:` |
| `connect-src` | Fetch/XHR/WebSocket connections | `connect-src 'self'` |
| `frame-ancestors` | Embedding restrictions | `frame-ancestors 'none'` |
| `base-uri` | Restricts `<base>` tag URLs | `base-uri 'self'` |
| `form-action` | Form submission targets | `form-action 'self'` |

### Special Keywords

| Keyword | Meaning | Use Case |
|---------|---------|----------|
| `'self'` | Same origin as document | Default for most resources |
| `'unsafe-inline'` | Allow inline scripts/styles | Required for Storybook |
| `'unsafe-eval'` | Allow eval() functions | ⚠️ Not recommended |
| `data:` | Allow data: URIs | Images, fonts (base64) |
| `https:` | Allow any HTTPS source | External images |
| `'none'` | Block all sources | Embedding prevention |

---

## WHY STORYBOOK NEEDS 'UNSAFE-INLINE'

### The Trade-off

Storybook's architecture requires `'unsafe-inline'` for both scripts and styles due to:

1. **Dynamic Story Rendering** - Stories inject inline scripts for interactivity
2. **Hot Module Replacement (HMR)** - Development mode injects inline code
3. **Addon System** - Many addons use inline styles and scripts
4. **Design Token Injection** - CSS variables injected inline

### Mitigation Strategy

While `'unsafe-inline'` reduces CSP effectiveness, we mitigate risks by:

- ✅ **Static builds only** - No server-side rendering of user input
- ✅ **Read-only environment** - Storybook is documentation, not an app
- ✅ **Trusted sources** - All content from build process
- ✅ **No user input** - Stories are pre-defined, not user-generated

```typescript
// ✅ SAFE - Pre-defined story
export const Default: Story = {
  args: { title: 'Example', children: 'Content' },
};

// ❌ UNSAFE (Not possible in Storybook static builds)
// User cannot inject: <script>malicious()</script>
```

---

## CONFIGURATION BY PLATFORM

### 🔧 Nginx

Add this to your `nginx.conf` or site configuration:

```nginx
server {
    listen 80;
    server_name storybook.example.com;

    root /var/www/storybook-static;
    index index.html;

    # Content Security Policy
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" always;

    # Additional Security Headers
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Verify configuration:**
```bash
# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx

# Check headers
curl -I https://storybook.example.com
```

---

### 🔧 Apache

Add this to your `.htaccess` or virtual host configuration:

```apache
# .htaccess or <VirtualHost> block

# Content Security Policy
<IfModule mod_headers.c>
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"

    # Additional Security Headers
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-Frame-Options "DENY"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Enable mod_rewrite for SPA routing
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>
```

**Enable required modules:**
```bash
# Enable headers module
sudo a2enmod headers

# Enable rewrite module
sudo a2enmod rewrite

# Enable expires module
sudo a2enmod expires

# Restart Apache
sudo systemctl restart apache2

# Check headers
curl -I https://storybook.example.com
```

---

### 🔧 Netlify

Create a `netlify.toml` file in your project root:

```toml
# netlify.toml

[build]
  publish = "storybook-static"
  command = "pnpm storybook:build"

[[headers]]
  for = "/*"
  [headers.values]
    # Content Security Policy
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"

    # Additional Security Headers
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"

# Cache static assets
[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.woff2"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Redirects (if needed)
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  force = false
```

**Alternative: `_headers` file**

Create `storybook-static/_headers`:

```
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable
```

**Deploy:**
```bash
# Manual deploy
netlify deploy --prod

# Or push to connected Git repo
git push origin main
```

---

### 🔧 Vercel

Create a `vercel.json` file in your project root:

```json
{
  "version": 2,
  "buildCommand": "pnpm storybook:build",
  "outputDirectory": "storybook-static",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    },
    {
      "source": "/(.*\\.(js|css|woff|woff2))",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Deploy:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Or push to connected Git repo
git push origin main
```

---

## TESTING YOUR CSP CONFIGURATION

### 1. Browser Developer Tools

**Chrome/Edge:**
```
1. Open DevTools (F12)
2. Navigate to Console tab
3. Look for CSP violation warnings (yellow/red)
4. Verify no blocked resources
```

**Firefox:**
```
1. Open Web Console (Ctrl+Shift+K)
2. Check for CSP errors
3. Use Network tab to verify headers
```

### 2. Command-Line Testing

```bash
# Check headers with curl
curl -I https://storybook.example.com | grep -i "content-security-policy"

# Expected output:
# content-security-policy: default-src 'self'; script-src 'self' 'unsafe-inline'; ...

# Full header inspection
curl -I https://storybook.example.com
```

### 3. Online Tools

| Tool | URL | Purpose |
|------|-----|---------|
| **Security Headers** | securityheaders.com | Grade your headers |
| **CSP Evaluator** | csp-evaluator.withgoogle.com | Analyze CSP policy |
| **Mozilla Observatory** | observatory.mozilla.org | Full security audit |

### 4. Expected Test Results

```bash
# ✅ All resources load successfully
# ✅ No console errors related to CSP
# ✅ Storybook functions normally
# ✅ Stories render correctly
# ✅ Addons work as expected
```

---

## TROUBLESHOOTING

### Common Issues

| Issue | Symptom | Solution |
|-------|---------|----------|
| **Blank page** | Storybook won't load | Add `'unsafe-inline'` to `script-src` |
| **No styles** | Page loads but unstyled | Add `'unsafe-inline'` to `style-src` |
| **Images broken** | Images fail to load | Add `data: https:` to `img-src` |
| **Fonts missing** | Text uses fallback fonts | Add `data:` to `font-src` |
| **Iframe blocked** | Stories won't render | Check `frame-ancestors` |
| **API calls fail** | XHR/fetch blocked | Add origins to `connect-src` |

### Debug Mode

Temporarily use **report-only** mode to test without breaking functionality:

```nginx
# Nginx - Report violations without blocking
add_header Content-Security-Policy-Report-Only "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; report-uri /csp-violation-report" always;
```

```apache
# Apache - Report-only mode
Header always set Content-Security-Policy-Report-Only "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
```

```toml
# Netlify - Report-only
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy-Report-Only = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
```

### Validation Checklist

Before going live, verify:

- [ ] All Storybook pages load correctly
- [ ] Stories render with proper styling
- [ ] Interactive components work (buttons, forms, etc.)
- [ ] Images and fonts display correctly
- [ ] No CSP errors in browser console
- [ ] Security headers present in response
- [ ] External images load (if needed)
- [ ] Addons function properly

---

## ADVANCED CONFIGURATION

### Adding External Sources

If your Storybook needs to load resources from external domains:

```nginx
# Example: Allow Google Fonts and CDN images
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: https://cdn.example.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" always;
```

### Strict CSP (Experimental)

For maximum security, consider using nonces or hashes instead of `'unsafe-inline'`:

```typescript
// .storybook/main.ts (requires custom Webpack config)
export default {
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    // Generate nonce for each script
    config.plugins.push(new CspHtmlWebpackPlugin({
      'script-src': ["'self'"],
      'style-src': ["'self'"],
    }));
    return config;
  },
};
```

⚠️ **Note:** Strict CSP with Storybook is complex and may break functionality. Test thoroughly.

---

## SECURITY BEST PRACTICES

### Do's ✅

1. **Always use HTTPS** - CSP is ineffective over HTTP
2. **Test thoroughly** - Verify all Storybook features work
3. **Monitor violations** - Set up CSP reporting if possible
4. **Keep it simple** - Only allow necessary sources
5. **Document changes** - Note any CSP modifications

### Don'ts ❌

1. **Don't use `'unsafe-eval'`** - Not needed for Storybook
2. **Don't allow all sources** - Avoid wildcard `*`
3. **Don't skip testing** - CSP can break functionality
4. **Don't override on client** - CSP is server-side only
5. **Don't mix report-only and enforcing** - Use one mode

### Compliance

| Standard | Requirement | Status |
|----------|-------------|--------|
| **OWASP Top 10** | XSS prevention | ✅ Met |
| **GDPR** | Data protection | ✅ Met |
| **PCI DSS** | Secure transmission | ✅ Met (with HTTPS) |
| **WCAG 2.1** | Accessibility | ✅ Compatible |

---

## MAINTENANCE

### Regular Reviews

Schedule quarterly reviews to:

1. **Verify headers** - Ensure CSP is active
2. **Check violations** - Review console for new issues
3. **Update sources** - Add/remove external domains as needed
4. **Test new versions** - Verify after Storybook updates

### Version Control

Track CSP changes in Git:

```bash
# nginx.conf, netlify.toml, vercel.json, etc.
git add nginx.conf
git commit -m "security: update CSP to allow new CDN domain"
```

### Documentation

Keep this document updated when:
- Adding new external sources
- Changing security requirements
- Upgrading Storybook versions
- Discovering new CSP violations

---

## QUICK REFERENCE

### Minimal CSP for Storybook

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
```

### Platform-Specific Files

| Platform | Configuration File | Location |
|----------|-------------------|----------|
| **Nginx** | `nginx.conf` | `/etc/nginx/sites-available/` |
| **Apache** | `.htaccess` | Project root or `/var/www/html/` |
| **Netlify** | `netlify.toml` | Project root |
| **Vercel** | `vercel.json` | Project root |

### Useful Commands

```bash
# Test headers
curl -I <your-storybook-url>

# Check CSP syntax
# (Use online validator: csp-evaluator.withgoogle.com)

# View browser console
# Open DevTools > Console tab

# Verify HTTPS
openssl s_client -connect storybook.example.com:443
```

---

## SUPPORT

### Resources

- **CSP Specification:** [w3.org/TR/CSP/](https://www.w3.org/TR/CSP/)
- **MDN Documentation:** [developer.mozilla.org/docs/Web/HTTP/CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- **Storybook Docs:** [storybook.js.org/docs](https://storybook.js.org/docs)

### Getting Help

If CSP issues persist:

1. Check browser console for specific violations
2. Review this document's troubleshooting section
3. Test in report-only mode first
4. Consult platform-specific documentation
5. Open an issue with detailed error logs

---

**Last Updated:** 2026-01-30
**Maintained By:** Xala Platform Team
**Review Schedule:** Quarterly
