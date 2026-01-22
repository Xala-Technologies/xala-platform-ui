# Component Structure

## Component Anatomy

Every component in this package follows a consistent structure for maintainability and clarity.

## File Structure

```typescript
// src/primitives/Button.tsx

// 1. Imports
import React from 'react';
import { Button as DSButton } from '@digdir/designsystemet-react';

// 2. Type Definitions
export interface ButtonProps {
  /** Button content */
  children: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Visual variant */
  variant?: 'primary' | 'secondary';
  /** Disabled state */
  disabled?: boolean;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
}

// 3. Component Implementation
export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  size = 'medium',
}: ButtonProps) {
  return (
    <DSButton
      data-color={variant === 'primary' ? 'accent' : 'neutral'}
      data-size={size}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </DSButton>
  );
}

// 4. Display Name (for debugging)
Button.displayName = 'Button';
```

## Component Categories

### Primitives
**Purpose**: Thin wrappers around Designsystemet components

**Characteristics**:
- Single Designsystemet component
- Minimal logic
- Props mapping
- Design token application

**Example**:
```typescript
export function Card({ children, color = 'neutral' }: CardProps) {
  return (
    <DSCard data-color={color}>
      {children}
    </DSCard>
  );
}
```

### Composed
**Purpose**: Multi-component compositions

**Characteristics**:
- Multiple primitives combined
- Coordinated state
- Complex interactions
- Reusable patterns

**Example**:
```typescript
export function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Dialog.Header>
        <Heading level={2}>Title</Heading>
        <Button onClick={onClose}>Close</Button>
      </Dialog.Header>
      <Dialog.Content>
        {children}
      </Dialog.Content>
    </Dialog>
  );
}
```

### Blocks
**Purpose**: Feature-specific UI blocks

**Characteristics**:
- Self-contained features
- May include state
- Event handlers
- Specific use cases

**Example**:
```typescript
export function NotificationBell({ notifications }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <Button>
        <BellIcon />
        <Badge>{notifications.length}</Badge>
      </Button>
      <NotificationList items={notifications} />
    </Popover>
  );
}
```

### Patterns
**Purpose**: Reusable UI patterns

**Characteristics**:
- Domain-agnostic
- Flexible configuration
- Common use cases
- Best practices embedded

**Example**:
```typescript
export function ResourceCard({
  title,
  description,
  image,
  actions,
  metadata,
}: ResourceCardProps) {
  return (
    <Card>
      {image && <Card.Media src={image} />}
      <Card.Header>
        <Heading level={3}>{title}</Heading>
      </Card.Header>
      <Card.Content>
        <Paragraph>{description}</Paragraph>
        {metadata && <MetadataRow items={metadata} />}
      </Card.Content>
      <Card.Footer>
        {actions}
      </Card.Footer>
    </Card>
  );
}
```

### Shells
**Purpose**: Layout components

**Characteristics**:
- Page-level structure
- Navigation integration
- Responsive design
- Consistent layouts

**Example**:
```typescript
export function AppLayout({ children, sidebar }: AppLayoutProps) {
  return (
    <div className="ds-layout">
      <aside className="ds-sidebar">
        {sidebar}
      </aside>
      <main className="ds-main">
        {children}
      </main>
    </div>
  );
}
```

## Prop Patterns

### Required vs Optional
```typescript
interface ComponentProps {
  // Required props (no default)
  children: React.ReactNode;
  title: string;
  
  // Optional props (with defaults)
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}
```

### Event Handlers
```typescript
interface ComponentProps {
  // Event handlers (optional, void return)
  onClick?: () => void;
  onChange?: (value: string) => void;
  onSubmit?: (data: FormData) => void;
}
```

### Render Props
```typescript
interface ComponentProps {
  // Render prop pattern
  renderHeader?: () => React.ReactNode;
  renderFooter?: (data: Data) => React.ReactNode;
}
```

### Children Patterns
```typescript
// Simple children
children: React.ReactNode;

// Typed children
children: React.ReactElement<ButtonProps>;

// Multiple children types
children: React.ReactNode | ((data: Data) => React.ReactNode);
```

## State Management

### Local State
```typescript
export function Component() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Input value={value} onChange={setValue} />
    </Dialog>
  );
}
```

### Controlled vs Uncontrolled
```typescript
// Controlled (parent manages state)
interface ControlledProps {
  value: string;
  onChange: (value: string) => void;
}

// Uncontrolled (component manages state)
interface UncontrolledProps {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}
```

## Styling Patterns

### Data Attributes (Preferred)
```typescript
<Button 
  data-color="accent"
  data-size="medium"
  data-variant="primary"
>
  Click me
</Button>
```

### Design Token Variables
```typescript
<Card 
  style={{
    padding: 'var(--ds-spacing-4)',
    gap: 'var(--ds-spacing-2)',
  }}
>
  Content
</Card>
```

### Conditional Styling
```typescript
<Button 
  data-color={isPrimary ? 'accent' : 'neutral'}
  data-size={isLarge ? 'large' : 'medium'}
>
  Click me
</Button>
```

## Accessibility

### ARIA Attributes
```typescript
<Button
  aria-label="Close dialog"
  aria-pressed={isPressed}
  aria-expanded={isExpanded}
>
  <CloseIcon />
</Button>
```

### Keyboard Navigation
```typescript
function Component() {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  };
  
  return (
    <div 
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      Content
    </div>
  );
}
```

### Focus Management
```typescript
function Modal({ isOpen }: Props) {
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    if (isOpen) {
      firstFocusableRef.current?.focus();
    }
  }, [isOpen]);
  
  return (
    <Dialog open={isOpen}>
      <Button ref={firstFocusableRef}>First Action</Button>
    </Dialog>
  );
}
```

## Testing Patterns

### Component Tests
```typescript
describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalled();
  });
  
  it('is accessible', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## Documentation

### JSDoc Comments
```typescript
/**
 * Button component for user actions
 * 
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
export function Button(props: ButtonProps) {
  // ...
}
```

### Storybook Stories
```typescript
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
  },
};

export default meta;

export const Primary: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
  },
};
```

## Best Practices

### Do's
- ✅ Use Designsystemet components
- ✅ Use data attributes for styling
- ✅ Provide TypeScript types
- ✅ Add JSDoc comments
- ✅ Write Storybook stories
- ✅ Test accessibility
- ✅ Keep components pure

### Don'ts
- ❌ Use raw HTML elements
- ❌ Use inline styles
- ❌ Add business logic
- ❌ Make API calls
- ❌ Use custom CSS classes
- ❌ Import from platform packages
- ❌ Manage global state
