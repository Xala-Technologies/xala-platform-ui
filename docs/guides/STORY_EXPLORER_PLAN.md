# Story Explorer - Implementation Plan

**Option A: Storybook-as-Headless + Custom UI Shell**

Build a custom, branded Story Explorer that uses Storybook's proven runtime while providing a superior UX for stakeholders and municipality demos.

---

## 🎯 Goals

### Primary
1. **Branded Experience** - Full Xaheen/Digdir theme control, not Storybook's UI
2. **Demo Portal** - Stakeholders can explore components in municipality context
3. **Design System Compliance** - 100% design tokens, no custom CSS
4. **Multi-Tenant** - Theme/locale switching for different municipalities

### Secondary
1. **Better Navigation** - Categorization by use case, not component type
2. **Compliance View** - Show WCAG notes, i18n coverage, tokens used
3. **Curated Flows** - Pre-built user journeys for demos
4. **Visual Regression** - Screenshot comparison for design reviews

---

## 🏗️ Architecture

### High-Level Flow

```
Custom React App (Story Explorer)
    ↓
Fetches Storybook's index.json
    ↓
Shows custom navigation/search UI
    ↓
Renders stories in iframe: iframe.html?id=story-id
    ↓
Applies DesignsystemetProvider to app shell
    ↓
Storybook runtime handles story rendering
```

### Tech Stack

| Layer | Technology | Reason |
|-------|-----------|---------|
| **Framework** | Vite + React 18 | Consistency with current setup |
| **Routing** | React Router v6 | Client-side navigation |
| **Styling** | DesignsystemetProvider | Design tokens only |
| **Components** | @xala-technologies/platform-ui | Your own UI library! |
| **i18n** | @xala-technologies/i18n | Existing i18n setup |
| **State** | React Context + URL params | Simple, no external state lib |
| **Build** | Vite | Fast, modern |
| **Deployment** | Static export | Can host anywhere |

---

## 📁 Project Structure

```
apps/story-explorer/                    # New app in monorepo
├── src/
│   ├── main.tsx                        # Entry point
│   ├── App.tsx                         # Root with DesignsystemetProvider
│   ├── routes/
│   │   ├── index.tsx                   # Home/catalog view
│   │   ├── story.tsx                   # Story detail view
│   │   ├── demo.tsx                    # Curated demo flows
│   │   └── compliance.tsx              # WCAG/token compliance view
│   ├── components/
│   │   ├── Navigation.tsx              # Sidebar (using platform-ui)
│   │   ├── StoryIframe.tsx             # Wrapper for Storybook iframe
│   │   ├── StoryControls.tsx           # Args controls panel
│   │   ├── ThemeSwitcher.tsx           # Brand theme selector
│   │   ├── LocaleSwitcher.tsx          # Language selector
│   │   └── ColorSchemeSwitcher.tsx     # Light/dark toggle
│   ├── lib/
│   │   ├── storybook-api.ts            # Fetch index.json, parse stories
│   │   ├── story-renderer.ts           # Build iframe URLs
│   │   └── compliance-checker.ts       # Extract token/a11y data
│   ├── types/
│   │   └── storybook.ts                # Storybook index types
│   └── data/
│       ├── demo-flows.ts               # Curated journeys
│       └── categories.ts               # Custom categorization
├── public/
│   └── storybook-iframe/               # Static Storybook build
│       └── iframe.html                 # Story runtime
├── index.html
├── vite.config.ts
└── package.json

packages/platform-ui/                    # Existing
└── .storybook/                          # Keep for development
    └── (current setup)                  # Devs still use pnpm storybook
```

---

## 🔄 Data Flow

### 1. Story Index Ingestion

```typescript
// src/lib/storybook-api.ts
export interface StorybookIndex {
  v: number;
  entries: Record<string, StoryEntry>;
}

export interface StoryEntry {
  id: string;
  title: string;
  name: string;
  importPath: string;
  type: 'story' | 'docs';
  tags: string[];
}

// Fetch from built Storybook
export async function fetchStorybookIndex(): Promise<StorybookIndex> {
  const res = await fetch('/storybook-iframe/index.json');
  return res.json();
}

// Parse into categories
export function categorizeStories(index: StorybookIndex) {
  const stories = Object.values(index.entries);
  
  return {
    byLayer: groupBy(stories, s => s.title.split('/')[0]), // Primitives, Composed, etc.
    byUseCase: groupBy(stories, s => s.tags.find(t => t.startsWith('useCase:'))),
    byComplexity: groupBy(stories, s => s.tags.find(t => t.startsWith('complexity:'))),
  };
}
```

### 2. Story Rendering

```typescript
// src/components/StoryIframe.tsx
import { useEffect, useRef } from 'react';
import { Card } from '@xala-technologies/platform-ui';

interface StoryIframeProps {
  storyId: string;
  viewMode: 'story' | 'docs';
  args?: Record<string, unknown>;
  globals?: {
    brandTheme?: string;
    colorScheme?: string;
    locale?: string;
  };
}

export function StoryIframe({ storyId, viewMode, args, globals }: StoryIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Build iframe URL
  const iframeUrl = buildStoryUrl({
    baseUrl: '/storybook-iframe',
    storyId,
    viewMode,
    args,
    globals,
  });
  
  return (
    <Card data-color="neutral" data-size="lg" style={{ padding: 0 }}>
      <iframe
        ref={iframeRef}
        src={iframeUrl}
        style={{
          width: '100%',
          height: '600px',
          border: 'none',
          borderRadius: 'var(--ds-border-radius-md)',
        }}
        title={`Story: ${storyId}`}
      />
    </Card>
  );
}

function buildStoryUrl(opts: { 
  baseUrl: string;
  storyId: string; 
  viewMode: string;
  args?: Record<string, unknown>;
  globals?: Record<string, string>;
}): string {
  const params = new URLSearchParams();
  params.set('id', opts.storyId);
  params.set('viewMode', opts.viewMode);
  
  if (opts.args) {
    params.set('args', encodeArgs(opts.args));
  }
  
  if (opts.globals) {
    const globalsStr = Object.entries(opts.globals)
      .map(([k, v]) => `${k}:${v}`)
      .join(';');
    params.set('globals', globalsStr);
  }
  
  return `${opts.baseUrl}/iframe.html?${params.toString()}`;
}
```

### 3. Custom Navigation

```typescript
// src/components/Navigation.tsx
import { Card, Heading, List, Button } from '@xala-technologies/platform-ui';
import { useT } from '@xala-technologies/i18n';

interface NavigationProps {
  stories: StoryEntry[];
  currentId?: string;
  onSelect: (id: string) => void;
}

export function Navigation({ stories, currentId, onSelect }: NavigationProps) {
  const t = useT();
  
  const layers = categorizeByLayer(stories);
  
  return (
    <Card data-color="neutral" data-size="md">
      <Card.Header>
        <Heading level={2} data-size="sm">
          {t('explorer.components')}
        </Heading>
      </Card.Header>
      
      <Card.Content>
        {layers.map(layer => (
          <div key={layer.name}>
            <Heading level={3} data-size="xs">
              {t(`explorer.layer.${layer.name}`)}
            </Heading>
            
            <List data-size="sm">
              {layer.stories.map(story => (
                <List.Item 
                  key={story.id}
                  onClick={() => onSelect(story.id)}
                  data-selected={story.id === currentId}
                >
                  <Button 
                    variant="tertiary"
                    data-color={story.id === currentId ? 'accent' : 'neutral'}
                  >
                    {story.name}
                  </Button>
                </List.Item>
              ))}
            </List>
          </div>
        ))}
      </Card.Content>
    </Card>
  );
}
```

---

## 🎨 App Shell (Proper Design System Usage)

```typescript
// src/App.tsx
import { RuntimeProvider } from '@xala-technologies/platform/runtime';
import { DesignsystemetProvider } from '@xala-technologies/platform-ui';
import { I18nProvider } from '@xala-technologies/i18n';
import { BrowserRouter } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';

export function App() {
  const [theme, setTheme] = useState<ThemeId>('xaheen');
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');
  const [locale, setLocale] = useState<'nb' | 'en' | 'ar'>('nb');
  
  return (
    <I18nProvider locale={locale}>
      <DesignsystemetProvider 
        theme={theme} 
        colorScheme={colorScheme}
        locale={locale}
      >
        <BrowserRouter>
          <AppLayout
            theme={theme}
            colorScheme={colorScheme}
            locale={locale}
            onThemeChange={setTheme}
            onColorSchemeChange={setColorScheme}
            onLocaleChange={setLocale}
          />
        </BrowserRouter>
      </DesignsystemetProvider>
    </I18nProvider>
  );
}
```

```typescript
// src/layouts/AppLayout.tsx
import { Card, Heading } from '@xala-technologies/platform-ui';
import { Navigation } from '../components/Navigation';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { Outlet } from 'react-router-dom';

export function AppLayout({ theme, colorScheme, locale, ... }: AppLayoutProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '300px 1fr',
      gridTemplateRows: '60px 1fr',
      height: '100vh',
      backgroundColor: 'var(--ds-color-neutral-background-default)',
      color: 'var(--ds-color-neutral-text-default)',
    }}>
      {/* Header */}
      <Card data-color="neutral" style={{ gridColumn: '1 / -1' }}>
        <Heading level={1} data-size="lg">
          Xala Design System Explorer
        </Heading>
        <ThemeSwitcher value={theme} onChange={onThemeChange} />
        <ColorSchemeSwitcher value={colorScheme} onChange={onColorSchemeChange} />
        <LocaleSwitcher value={locale} onChange={onLocaleChange} />
      </Card>
      
      {/* Sidebar Navigation */}
      <Navigation stories={stories} currentId={currentStoryId} onSelect={handleSelect} />
      
      {/* Main Content */}
      <div style={{ padding: 'var(--ds-spacing-6)' }}>
        <Outlet />
      </div>
    </div>
  );
}
```

---

## 📋 Implementation Phases

### Phase 1: Foundation (Week 1)
**Goal**: Basic app that can display stories from existing Storybook

- [ ] Create `apps/story-explorer` package
- [ ] Set up Vite + React + TypeScript
- [ ] Configure pnpm workspace
- [ ] Add routing (React Router)
- [ ] Integrate DesignsystemetProvider
- [ ] Integrate I18nProvider

**Deliverable**: Empty app shell with proper theming/i18n

### Phase 2: Storybook Integration (Week 1-2)
**Goal**: Read Storybook index and render stories

- [ ] Build static Storybook to `public/storybook-iframe/`
- [ ] Fetch and parse `index.json`
- [ ] Build iframe URLs with args/globals
- [ ] Create `StoryIframe` component
- [ ] Test story rendering

**Deliverable**: Can view any story in custom UI

### Phase 3: Navigation & Search (Week 2)
**Goal**: Easy story discovery

- [ ] Category-based navigation (layers, use cases)
- [ ] Search by component name/tags
- [ ] Filter by layer/complexity
- [ ] Favorites/recents
- [ ] URL-based navigation (`/story/components-button--primary`)

**Deliverable**: Full story catalog with search

### Phase 4: Controls & Interaction (Week 2-3)
**Goal**: Interactive story manipulation

- [ ] Parse argTypes from story metadata
- [ ] Build controls panel (using platform-ui Form components!)
- [ ] Update iframe args on control changes
- [ ] Sync controls with URL
- [ ] Reset/randomize controls

**Deliverable**: Interactive story playground

### Phase 5: Compliance & Demo Mode (Week 3-4)
**Goal**: Stakeholder-friendly features

- [ ] Extract design tokens used in each component
- [ ] Show WCAG compliance notes
- [ ] i18n coverage indicators
- [ ] Curated demo flows (e.g., "Citizen Portal Flow")
- [ ] Demo mode (hide dev controls)
- [ ] Screenshot/export features

**Deliverable**: Production-ready demo portal

---

## 🚀 Quick Start Implementation

### Step 1: Create Package

```bash
# In monorepo root
mkdir -p apps/story-explorer
cd apps/story-explorer
```

```json
// apps/story-explorer/package.json
{
  "name": "@xala-technologies/story-explorer",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "build:storybook-iframe": "cd ../../ && pnpm storybook:build --output-dir apps/story-explorer/public/storybook-iframe"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.22.0",
    "@xala-technologies/platform-ui": "workspace:*",
    "@xala-technologies/i18n": "workspace:*",
    "@xala-technologies/i18n-platform": "workspace:*"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.3.3",
    "vite": "^5.1.0"
  }
}
```

### Step 2: Vite Config

```typescript
// apps/story-explorer/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      // Proxy to Storybook dev server during development
      '/storybook-iframe': {
        target: 'http://localhost:6006',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/storybook-iframe/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
  },
});
```

### Step 3: Main Entry

```typescript
// apps/story-explorer/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

// Import design system styles (just like Storybook does)
import '@xala-technologies/platform-ui/dist/styles.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Step 4: App Root

```typescript
// apps/story-explorer/src/App.tsx
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DesignsystemetProvider } from '@xala-technologies/platform-ui';
import { I18nProvider } from '@xala-technologies/i18n';
import { translations } from '@xala-technologies/i18n-platform';
import { AppShell } from './layouts/AppShell';
import { CatalogView } from './routes/CatalogView';
import { StoryView } from './routes/StoryView';
import { DemoView } from './routes/DemoView';

export function App() {
  const [theme, setTheme] = useState<'custom' | 'xaheen' | 'digdir'>('xaheen');
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');
  const [locale, setLocale] = useState<'nb' | 'en' | 'ar'>('nb');
  
  return (
    <I18nProvider translations={translations} initialLocale={locale}>
      <DesignsystemetProvider 
        theme={theme} 
        colorScheme={colorScheme}
        locale={locale}
      >
        <BrowserRouter>
          <AppShell
            theme={theme}
            colorScheme={colorScheme}
            locale={locale}
            onThemeChange={setTheme}
            onColorSchemeChange={setColorScheme}
            onLocaleChange={setLocale}
          >
            <Routes>
              <Route path="/" element={<CatalogView />} />
              <Route path="/story/:storyId" element={<StoryView />} />
              <Route path="/demo/:flowId" element={<DemoView />} />
            </Routes>
          </AppShell>
        </BrowserRouter>
      </DesignsystemetProvider>
    </I18nProvider>
  );
}
```

### Step 5: App Shell Layout

```typescript
// src/layouts/AppShell.tsx
import { ReactNode } from 'react';
import { Card, Heading } from '@xala-technologies/platform-ui';
import { ThemeSwitcher } from '../components/ThemeSwitcher';

interface AppShellProps {
  children: ReactNode;
  theme: string;
  colorScheme: string;
  locale: string;
  onThemeChange: (theme: any) => void;
  onColorSchemeChange: (scheme: any) => void;
  onLocaleChange: (locale: any) => void;
}

export function AppShell({ 
  children, 
  theme, 
  colorScheme, 
  locale,
  onThemeChange,
  onColorSchemeChange,
  onLocaleChange 
}: AppShellProps) {
  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gridTemplateRows: 'auto 1fr',
        gap: 'var(--ds-spacing-4)',
        minHeight: '100vh',
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-neutral-background-default)',
      }}
    >
      {/* Header - spans both columns */}
      <Card 
        data-color="neutral" 
        data-size="md"
        style={{ gridColumn: '1 / -1' }}
      >
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          padding: 'var(--ds-spacing-4)',
        }}>
          <Heading level={1} data-size="lg">
            Xala Design System
          </Heading>
          
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)' }}>
            <ThemeSwitcher value={theme} onChange={onThemeChange} />
            <ColorSchemeSwitcher value={colorScheme} onChange={onColorSchemeChange} />
            <LocaleSwitcher value={locale} onChange={onLocaleChange} />
          </div>
        </div>
      </Card>
      
      {/* Sidebar Navigation */}
      <aside>
        <StorySidebar />
      </aside>
      
      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  );
}
```

---

## 🎮 Key Features

### Theme Switcher Component

```typescript
// src/components/ThemeSwitcher.tsx
import { Select } from '@xala-technologies/platform-ui';
import { useT } from '@xala-technologies/i18n';

interface ThemeSwitcherProps {
  value: 'custom' | 'xaheen' | 'digdir';
  onChange: (theme: string) => void;
}

export function ThemeSwitcher({ value, onChange }: ThemeSwitcherProps) {
  const t = useT();
  
  return (
    <Select
      data-size="sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={t('explorer.selectTheme')}
    >
      <option value="custom">🔵 {t('theme.xala')}</option>
      <option value="xaheen">🟡 {t('theme.xaheen')}</option>
      <option value="digdir">⚪ {t('theme.digdir')}</option>
    </Select>
  );
}
```

### Compliance View

```typescript
// src/routes/ComplianceView.tsx
import { Card, Heading, Paragraph, Badge } from '@xala-technologies/platform-ui';

export function ComplianceView({ storyId }: { storyId: string }) {
  const compliance = analyzeStoryCompliance(storyId);
  
  return (
    <Card data-color="neutral" data-size="lg">
      <Card.Header>
        <Heading level={2} data-size="md">
          Design Compliance
        </Heading>
      </Card.Header>
      
      <Card.Content>
        <section>
          <Heading level={3} data-size="sm">WCAG Compliance</Heading>
          <Badge data-color={compliance.wcag.level === 'AAA' ? 'success' : 'warning'}>
            {compliance.wcag.level}
          </Badge>
          <Paragraph data-size="sm">
            {compliance.wcag.notes}
          </Paragraph>
        </section>
        
        <section>
          <Heading level={3} data-size="sm">Design Tokens Used</Heading>
          <ul>
            {compliance.tokens.map(token => (
              <li key={token}>
                <code>{token}</code>
              </li>
            ))}
          </ul>
        </section>
        
        <section>
          <Heading level={3} data-size="sm">i18n Coverage</Heading>
          <Badge data-color={compliance.i18n.complete ? 'success' : 'warning'}>
            {compliance.i18n.coverage}% translated
          </Badge>
        </section>
      </Card.Content>
    </Card>
  );
}
```

---

## 🎬 Demo Mode Features

### Curated Demo Flows

```typescript
// src/data/demo-flows.ts
export const DEMO_FLOWS = {
  'citizen-portal': {
    name: 'Citizen Self-Service Portal',
    description: 'Complete flow for citizens accessing municipal services',
    stories: [
      'blocks-loginform--default',
      'shells-applayout--citizen',
      'patterns-resourcecard--service',
      'blocks-notificationbell--active',
    ],
    theme: 'digdir',
    locale: 'nb',
  },
  'backoffice-workflow': {
    name: 'Case Worker Workflow',
    description: 'Municipality employee processing applications',
    stories: [
      'shells-dashboardlayout--default',
      'blocks-taskcard--assigned',
      'composed-datatable--filterable',
      'blocks-approvalgate--pending',
    ],
    theme: 'xaheen',
    locale: 'nb',
  },
};
```

### Demo Flow Player

```typescript
// src/routes/DemoView.tsx
export function DemoView() {
  const { flowId } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const flow = DEMO_FLOWS[flowId];
  
  if (!flow) return <NotFound />;
  
  const story = flow.stories[currentStep];
  
  return (
    <div>
      <Card data-color="accent" data-size="md">
        <Heading level={2}>{flow.name}</Heading>
        <Paragraph>{flow.description}</Paragraph>
        <div>
          Step {currentStep + 1} of {flow.stories.length}
        </div>
      </Card>
      
      <StoryIframe 
        storyId={story}
        viewMode="story"
        globals={{
          brandTheme: flow.theme,
          locale: flow.locale,
        }}
      />
      
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
        <Button onClick={() => setCurrentStep(s => s - 1)} disabled={currentStep === 0}>
          Previous
        </Button>
        <Button onClick={() => setCurrentStep(s => s + 1)} disabled={currentStep === flow.stories.length - 1}>
          Next
        </Button>
      </div>
    </div>
  );
}
```

---

## 📦 Build Process

### Development

```bash
# Terminal 1: Run Storybook (for iframe runtime)
pnpm storybook

# Terminal 2: Run Story Explorer
cd apps/story-explorer
pnpm dev
```

Access at `http://localhost:3000` (Story Explorer) which proxies to `http://localhost:6006` (Storybook iframe)

### Production

```bash
# 1. Build Storybook iframe
pnpm --filter @xala-technologies/platform-ui storybook:build --output-dir ../../apps/story-explorer/public/storybook-iframe

# 2. Build Story Explorer
pnpm --filter @xala-technologies/story-explorer build

# 3. Deploy
# Output: apps/story-explorer/dist/ (static files)
# Includes: /index.html + /storybook-iframe/*
```

---

## 🎨 Design System Compliance

### Zero Custom CSS

All styling uses platform-ui components + design tokens:

```typescript
// ✅ CORRECT - Uses design tokens
<Card data-color="neutral" style={{
  padding: 'var(--ds-spacing-4)',
  backgroundColor: 'var(--ds-color-neutral-surface-default)',
}}>

// ❌ WRONG - Custom CSS
<div className="custom-card" style={{
  padding: '16px',
  backgroundColor: '#FFFFFF',
}}>
```

### Component Usage

All UI built with platform-ui components:

| Need | Use Component |
|------|---------------|
| Layout | `Card`, `Grid` patterns |
| Navigation | `List`, `Button` |
| Forms | `Select`, `Switch`, `Textfield` |
| Text | `Heading`, `Paragraph` |
| Interactive | `Button`, `Link`, `Tabs` |
| Feedback | `Badge`, `Chip`, `Alert` |

**No raw HTML elements!** Everything through design system.

---

## 🌍 Multi-Tenant Support

### URL Structure

```
/story/{id}?theme=xaheen&colorScheme=dark&locale=nb
/demo/citizen-portal?theme=digdir&locale=en
/compliance/{id}?theme=custom
```

### State Management

```typescript
// src/hooks/useThemeState.ts
export function useThemeState() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const theme = searchParams.get('theme') as ThemeId || 'xaheen';
  const colorScheme = searchParams.get('colorScheme') as ColorScheme || 'light';
  const locale = searchParams.get('locale') || 'nb';
  
  const setTheme = (t: ThemeId) => {
    setSearchParams(prev => {
      prev.set('theme', t);
      return prev;
    });
  };
  
  return { theme, colorScheme, locale, setTheme, setColorScheme, setLocale };
}
```

---

## 🧪 Testing Strategy

### Unit Tests
- Story index parsing
- URL building logic
- Control value encoding/decoding

### Integration Tests
- Story iframe communication
- Theme switching
- i18n switching

### E2E Tests (Playwright)
- Navigate to story
- Change args via controls
- Switch themes
- Verify accessibility

---

## 📊 Success Metrics

### Developer Experience
- [ ] Devs still use `pnpm storybook` for development
- [ ] Story Explorer auto-syncs with Storybook changes
- [ ] No duplicate maintenance

### Stakeholder Experience
- [ ] Non-technical users can explore components
- [ ] Municipality demos are impressive
- [ ] Theme/locale switching is obvious
- [ ] Compliance data builds trust

### Technical Excellence
- [ ] 100% design token compliance
- [ ] No custom CSS
- [ ] No raw HTML
- [ ] WCAG AAA
- [ ] Fast (<2s initial load)

---

## 🚀 Next Steps

### Immediate (This Session)
1. Create `apps/story-explorer` package structure
2. Set up Vite + basic React app
3. Integrate DesignsystemetProvider
4. Fetch Storybook index.json
5. Render first story in iframe

### This Week
1. Build navigation sidebar (using platform-ui List)
2. Implement story detail view
3. Add theme/locale switchers
4. Test with all existing stories

### Next Week
1. Add controls panel
2. Build compliance view
3. Create demo flows
4. Polish UX

---

## 💡 Key Decisions

### Why This Approach Wins

1. **Reuses Everything** - Stories, decorators, docs, play functions
2. **Low Risk** - Storybook handles the hard parts
3. **Design System Native** - Pure platform-ui components
4. **Dual Purpose** - Dev tool + demo portal
5. **Future-Proof** - Easy to migrate to Option B later if needed

### What You Get

- ✅ Branded, beautiful UI (100% Xaheen/Digdir compliant)
- ✅ Same stories work in both Storybook (dev) and Explorer (stakeholders)
- ✅ Municipality demo mode
- ✅ Compliance reporting
- ✅ i18n showcase
- ✅ Zero maintenance duplication

---

## 🎯 Ready to Start?

I can now:

**A)** Generate the complete `apps/story-explorer` package with all files  
**B)** Start with Phase 1 (foundation) and build incrementally  
**C)** Create the master implementation prompt for future sessions  

Which would you like?
