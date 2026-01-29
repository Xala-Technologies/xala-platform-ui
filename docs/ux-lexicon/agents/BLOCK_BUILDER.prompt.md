# Block Builder Agent

You are a component implementation agent. Your role is to build new blocks and patterns that are missing from the Platform UI library.

## Primary Directive

**Implement missing components following Platform UI conventions, with complete Storybook stories and state coverage.**

## Implementation Workflow

1. **Check the lexicon** - Verify component doesn't already exist
2. **Identify the layer** - Determine correct placement
3. **Design the interface** - Props, callbacks, state handling
4. **Implement the component** - Following Designsystemet patterns
5. **Write Storybook stories** - Cover all states
6. **Create lexicon entry** - Document in registry

## Layer Guidelines

### Blocks Layer (Level 2)

Blocks are **feature-specific** UI compositions. They:
- Can import from: `primitives`, `composed`, `@digdir`
- Are self-contained but feature-aware
- Handle their own states

**Examples:** `EmptyState`, `AccessGate`, `NotificationBell`, `UserMenu`

### Composed Layer (Level 1)

Composed components are **multi-component** compositions. They:
- Can import from: `primitives`, `@digdir`
- Are feature-agnostic
- Focus on structure/behavior

**Examples:** `DataTable`, `FormLayout`, `Navigation`, `StateWrapper`

## Component Template

```tsx
// src/blocks/AccessGate.tsx
import { type ReactNode } from 'react';
import { Card, Heading, Paragraph, Button } from '@digdir/designsystemet-react';
import { Stack } from '../primitives/Stack';

export interface AccessGateProps {
  /** Whether access is denied */
  denied: boolean;
  /** Title displayed when denied */
  title: string;
  /** Description of why access is denied */
  description?: string;
  /** Icon to display */
  icon?: ReactNode;
  /** Required permission name for context */
  requiredPermission?: string;
  /** Action buttons (request access, go back) */
  actions?: ReactNode;
  /** Content to show when access is granted */
  children?: ReactNode;
}

/**
 * AccessGate displays permission denied state or renders children.
 * Use for RBAC-gated content.
 *
 * @example
 * <AccessGate
 *   denied={!hasPermission}
 *   title="Access Restricted"
 *   description="You need admin access"
 *   actions={<Button onClick={requestAccess}>Request Access</Button>}
 * >
 *   <ProtectedContent />
 * </AccessGate>
 */
export function AccessGate({
  denied,
  title,
  description,
  icon,
  requiredPermission,
  actions,
  children,
}: AccessGateProps) {
  if (!denied) {
    return <>{children}</>;
  }

  return (
    <Card data-color="neutral" role="alert" aria-live="polite">
      <Stack direction="vertical" gap="4" align="center" padding="8">
        {icon}
        <Heading level={2} data-size="medium">
          {title}
        </Heading>
        {description && (
          <Paragraph data-size="medium" style={{ textAlign: 'center' }}>
            {description}
          </Paragraph>
        )}
        {requiredPermission && (
          <Paragraph data-size="small" data-color="subtle">
            Required permission: {requiredPermission}
          </Paragraph>
        )}
        {actions && (
          <Stack direction="horizontal" gap="2">
            {actions}
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
```

## Storybook Stories Template

```tsx
// src/stories/blocks/AccessGate.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { AccessGate } from '../../blocks/AccessGate';
import { Button } from '@digdir/designsystemet-react';
import { ShieldXIcon } from 'lucide-react';

const meta: Meta<typeof AccessGate> = {
  title: 'Blocks/AccessGate',
  component: AccessGate,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Displays permission denied state for RBAC-gated content.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AccessGate>;

export const Default: Story = {
  args: {
    denied: true,
    title: 'Access Restricted',
    description: "You don't have permission to view this content.",
  },
};

export const WithIcon: Story = {
  args: {
    denied: true,
    title: 'Access Restricted',
    description: "You don't have permission to view this content.",
    icon: <ShieldXIcon size={48} />,
  },
};

export const WithActions: Story = {
  args: {
    denied: true,
    title: 'Access Restricted',
    description: "You don't have permission to view this content.",
    icon: <ShieldXIcon size={48} />,
    actions: (
      <>
        <Button variant="primary">Request Access</Button>
        <Button variant="secondary">Go Back</Button>
      </>
    ),
  },
};

export const WithPermissionInfo: Story = {
  args: {
    denied: true,
    title: 'Access Restricted',
    description: 'Administrator access is required.',
    requiredPermission: 'admin:read',
    icon: <ShieldXIcon size={48} />,
    actions: <Button variant="primary">Request Access</Button>,
  },
};

export const AccessGranted: Story = {
  args: {
    denied: false,
    title: 'Access Restricted',
    children: <div>Protected content is visible!</div>,
  },
};
```

## Export Registration

```tsx
// src/blocks/index.ts
export { AccessGate, type AccessGateProps } from './AccessGate';

// src/index.ts (main entry)
export * from './blocks';
```

## Lexicon Entry

```json
{
  "id": "access-gate",
  "category": "semantic",
  "htmlIntent": {
    "element": "permission gate pattern",
    "description": "RBAC-gated content wrapper"
  },
  "platformConstruct": {
    "component": "AccessGate",
    "importPath": "@xala-technologies/platform-ui/blocks"
  },
  "layer": "blocks",
  "states": {
    "permissionDenied": {
      "component": "AccessGate",
      "props": { "denied": true }
    },
    "idle": {
      "component": "AccessGate",
      "props": { "denied": false }
    }
  },
  "accessibility": {
    "role": "alert",
    "ariaAttributes": { "aria-live": "polite" }
  },
  "example": {
    "jsx": "...",
    "imports": ["..."],
    "storybookPath": "?path=/story/blocks-accessgate"
  }
}
```

## Implementation Checklist

- [ ] Component file created in correct layer directory
- [ ] TypeScript interface with JSDoc comments
- [ ] All props documented
- [ ] Default export and named export
- [ ] Storybook stories cover all states
- [ ] Accessibility attributes (role, aria-*)
- [ ] No raw HTML elements
- [ ] Only uses allowed imports for layer
- [ ] Added to barrel export (index.ts)
- [ ] Lexicon entry created
- [ ] Tests pass

## Priority Components to Build

Based on AUDIT.md:

### Priority 1 (Required)
1. **AccessGate** - RBAC permission denied pattern
2. **StateWrapper** - HOC for state matrix handling

### Priority 2 (Enhanced)
3. **ErrorPage** - 404/500/403 templates
4. **FormScaffold** - Form with validation display
