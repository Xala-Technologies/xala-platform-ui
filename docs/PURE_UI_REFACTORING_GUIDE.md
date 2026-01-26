# Pure UI Refactoring Guide

This guide provides comprehensive patterns for converting smart components to pure presentational components in `@xala-technologies/platform-ui`.

## Table of Contents

1. [Refactoring Principles](#refactoring-principles)
2. [Pattern Examples](#pattern-examples)
3. [Connected Wrapper Pattern](#connected-wrapper-pattern)
4. [Common Patterns to Refactor](#common-patterns-to-refactor)
5. [Refactoring Checklist](#refactoring-checklist)
6. [Testing Pure Components](#testing-pure-components)

---

## Refactoring Principles

### Core Rules

**Forbidden Imports:**
- ❌ NO imports from `@digilist/client-sdk`
- ❌ NO imports from `@xala-technologies/platform/i18n`
- ❌ NO imports from `@xala-technologies/platform/runtime`
- ❌ NO imports from `@xala-technologies/platform-schema`
- ❌ NO imports from `@xala-technologies/governance`

**Required Patterns:**
- ✅ Components receive ALL data via props
- ✅ Components emit ALL events via callback props
- ✅ Use ViewModels (VM types) for prop types when available
- ✅ Accept primitive types (string, number, boolean) for labels and UI state
- ✅ Components are fully controllable from parent

### Why Pure UI?

1. **Reusability**: Components work in any React app, not just Xala platform
2. **Testability**: No mocking of SDK hooks or i18n
3. **Predictability**: All inputs explicit via props
4. **Tree-shakeable**: No hidden dependencies
5. **Storybook-friendly**: Easy to demonstrate all states

---

## Pattern Examples

### 1. Removing SDK Query Hooks

#### Before (Smart Component):
```typescript
import { useUsers } from '@digilist/client-sdk';
import { Spinner } from '@digdir/designsystemet-react';

export function UserList() {
  const { users, isLoading, error } = useUsers();

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {isLoading && <Spinner />}
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

#### After (Pure Component):
```typescript
import type { UserVM } from '@digilist/client-sdk';
import { Spinner, Card, Paragraph } from '@digdir/designsystemet-react';

interface UserListProps {
  users: UserVM[];
  isLoading?: boolean;
  error?: string;
  emptyMessage?: string;
}

export function UserList({
  users,
  isLoading = false,
  error,
  emptyMessage = 'No users found'
}: UserListProps) {
  if (error) {
    return (
      <Card data-color="danger">
        <Paragraph>{error}</Paragraph>
      </Card>
    );
  }

  if (isLoading) {
    return <Spinner data-title="Loading users..." />;
  }

  if (users.length === 0) {
    return <Paragraph>{emptyMessage}</Paragraph>;
  }

  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

---

### 2. Removing i18n Translations

#### Before (Smart Component):
```typescript
import { useT } from '@xala-technologies/platform/i18n';
import { Button } from '@digdir/designsystemet-react';

export function SaveButton({ onSave }: { onSave: () => void }) {
  const t = useT();

  return (
    <Button onClick={onSave}>
      {t('action.save')}
    </Button>
  );
}
```

#### After (Pure Component):
```typescript
import { Button } from '@digdir/designsystemet-react';

interface SaveButtonProps {
  label: string;
  onSave: () => void;
  disabled?: boolean;
}

export function SaveButton({ label, onSave, disabled }: SaveButtonProps) {
  return (
    <Button onClick={onSave} disabled={disabled}>
      {label}
    </Button>
  );
}
```

---

### 3. Removing SDK Mutation Hooks

#### Before (Smart Component):
```typescript
import { useUpdateUser } from '@digilist/client-sdk';
import { useToast } from '@xala-technologies/platform/runtime';
import { useT } from '@xala-technologies/platform/i18n';

export function UserForm({ user }) {
  const updateMutation = useUpdateUser();
  const toast = useToast();
  const t = useT();

  const handleSubmit = async (data) => {
    try {
      await updateMutation.mutateAsync({ id: user.id, ...data });
      toast.success(t('users.updateSuccess'));
    } catch (error) {
      toast.error(t('users.updateError'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input name="name" defaultValue={user.name} />
      <Input name="email" defaultValue={user.email} />
      <Button type="submit" disabled={updateMutation.isPending}>
        {updateMutation.isPending ? t('action.saving') : t('action.save')}
      </Button>
    </Form>
  );
}
```

#### After (Pure Component):
```typescript
import type { UserVM } from '@digilist/client-sdk';
import { Button } from '@digdir/designsystemet-react';

export interface UserFormData {
  name: string;
  email: string;
}

interface UserFormProps {
  user: UserVM;
  onSubmit: (data: UserFormData) => void | Promise<void>;
  isSubmitting?: boolean;
  submitLabel?: string;
  submittingLabel?: string;
}

export function UserForm({
  user,
  onSubmit,
  isSubmitting = false,
  submitLabel = 'Save',
  submittingLabel = 'Saving...'
}: UserFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input name="name" defaultValue={user.name} />
      <Input name="email" defaultValue={user.email} />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? submittingLabel : submitLabel}
      </Button>
    </form>
  );
}
```

---

### 4. Removing Route Navigation

#### Before (Smart Component):
```typescript
import { useNavigate } from 'react-router-dom';
import { Button } from '@digdir/designsystemet-react';

export function BackButton() {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(-1)}>
      Back
    </Button>
  );
}
```

#### After (Pure Component):
```typescript
import { Button } from '@digdir/designsystemet-react';

interface BackButtonProps {
  label: string;
  onBack: () => void;
}

export function BackButton({ label, onBack }: BackButtonProps) {
  return <Button onClick={onBack}>{label}</Button>;
}
```

---

### 5. Removing Toast Notifications

#### Before (Smart Component):
```typescript
import { useToast } from '@xala-technologies/platform/runtime';
import { useT } from '@xala-technologies/platform/i18n';
import { Button } from '@digdir/designsystemet-react';

export function DeleteButton({ itemId, onDelete }) {
  const toast = useToast();
  const t = useT();

  const handleDelete = async () => {
    try {
      await onDelete(itemId);
      toast.success(t('action.deleteSuccess'));
    } catch (error) {
      toast.error(t('action.deleteError'));
    }
  };

  return (
    <Button onClick={handleDelete} data-color="danger">
      {t('action.delete')}
    </Button>
  );
}
```

#### After (Pure Component):
```typescript
import { Button } from '@digdir/designsystemet-react';

interface DeleteButtonProps {
  label: string;
  onDelete: () => void;
  disabled?: boolean;
}

export function DeleteButton({ label, onDelete, disabled }: DeleteButtonProps) {
  return (
    <Button onClick={onDelete} data-color="danger" disabled={disabled}>
      {label}
    </Button>
  );
}
```

**Note**: Error handling and toast notifications are now the responsibility of the parent component.

---

### 6. Removing Form State Management

#### Before (Smart Component):
```typescript
import { useState } from 'react';
import { Input, Button } from '@digdir/designsystemet-react';

export function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
```

#### After (Pure Component - Controlled):
```typescript
import { Input, Button } from '@digdir/designsystemet-react';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  searchLabel?: string;
}

export function SearchBar({
  query,
  onQueryChange,
  onSearch,
  placeholder = 'Search...',
  searchLabel = 'Search'
}: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder={placeholder}
      />
      <Button type="submit">{searchLabel}</Button>
    </form>
  );
}
```

**Alternative (Uncontrolled - simpler for search):**
```typescript
interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  searchLabel?: string;
  defaultValue?: string;
}

export function SearchBar({
  onSearch,
  placeholder = 'Search...',
  searchLabel = 'Search',
  defaultValue = ''
}: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSearch(formData.get('query') as string);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="query"
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
      <Button type="submit">{searchLabel}</Button>
    </form>
  );
}
```

---

## Connected Wrapper Pattern

Pure UI components need to be connected to data sources in the consuming application. Use the **Connected Wrapper Pattern** for this.

### Structure

```
app/
  features/
    users/
      ConnectedUserList.tsx    # App-specific wrapper with SDK hooks
      ConnectedUserDetail.tsx  # App-specific wrapper
      index.ts                 # Exports connected components
```

### Example: Connected User List

```typescript
// app/features/users/ConnectedUserList.tsx
import { UserList } from '@xala-technologies/platform-ui/blocks';
import { useUsersVM } from '@digilist/client-sdk';
import { useT } from '@xala-technologies/platform/runtime';
import { useNavigate } from 'react-router-dom';

export function ConnectedUserList() {
  const { users, isLoading, error } = useUsersVM();
  const t = useT();
  const navigate = useNavigate();

  return (
    <UserList
      users={users}
      isLoading={isLoading}
      error={error?.message}
      emptyMessage={t('users.empty')}
      onUserClick={(userId) => navigate(`/users/${userId}`)}
      createLabel={t('users.create')}
      onCreate={() => navigate('/users/create')}
    />
  );
}
```

### Example: Connected User Form

```typescript
// app/features/users/ConnectedUserForm.tsx
import { UserForm } from '@xala-technologies/platform-ui/blocks';
import type { UserFormData } from '@xala-technologies/platform-ui/blocks';
import { useUpdateUserVM, useUserVM } from '@digilist/client-sdk';
import { useToast } from '@xala-technologies/platform/runtime';
import { useT } from '@xala-technologies/platform/i18n';
import { useNavigate, useParams } from 'react-router-dom';

export function ConnectedUserForm() {
  const { userId } = useParams<{ userId: string }>();
  const { user, isLoading } = useUserVM(userId!);
  const updateMutation = useUpdateUserVM();
  const toast = useToast();
  const t = useT();
  const navigate = useNavigate();

  const handleSubmit = async (data: UserFormData) => {
    try {
      await updateMutation.mutateAsync({ id: userId!, ...data });
      toast.success(t('users.updateSuccess'));
      navigate('/users');
    } catch (error) {
      toast.error(t('users.updateError'));
    }
  };

  if (isLoading) return <Spinner />;
  if (!user) return <div>User not found</div>;

  return (
    <UserForm
      user={user}
      onSubmit={handleSubmit}
      isSubmitting={updateMutation.isPending}
      submitLabel={t('action.save')}
      submittingLabel={t('action.saving')}
      cancelLabel={t('action.cancel')}
      onCancel={() => navigate('/users')}
    />
  );
}
```

### Benefits of Connected Wrappers

1. **Separation of Concerns**: UI logic in library, data logic in app
2. **Testability**: Test pure components with mock props, test wrappers with MSW
3. **Flexibility**: Different apps can wire up components differently
4. **Tree-shaking**: Apps only bundle what they use
5. **Storybook**: Pure components work perfectly in Storybook

---

## Common Patterns to Refactor

### 1. Translation Strings

**Pattern**: Replace `useT()` calls with string props

```typescript
// ❌ Before
const t = useT();
<Button>{t('action.save')}</Button>

// ✅ After
interface Props { saveLabel: string }
<Button>{saveLabel}</Button>
```

**Multiple translations**: Group related strings in an interface

```typescript
interface UserListLabels {
  title: string;
  emptyMessage: string;
  createButton: string;
  searchPlaceholder: string;
}

interface UserListProps {
  users: UserVM[];
  labels: UserListLabels;
}
```

---

### 2. SDK Query Hooks

**Pattern**: Replace data hooks with props

```typescript
// ❌ Before
const { users, isLoading, error } = useUsers();

// ✅ After
interface Props {
  users: UserVM[];
  isLoading?: boolean;
  error?: string;
}
```

**With pagination**:

```typescript
interface Props {
  users: UserVM[];
  totalCount: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}
```

---

### 3. SDK Mutation Hooks

**Pattern**: Replace mutation hooks with callback props

```typescript
// ❌ Before
const updateMutation = useUpdateUser();
const handleSubmit = (data) => updateMutation.mutateAsync({ id, ...data });

// ✅ After
interface Props {
  onSubmit: (data: FormData) => void | Promise<void>;
  isSubmitting?: boolean;
}
```

**Multiple actions**:

```typescript
interface Props {
  onSave: (data: FormData) => void;
  onDelete: () => void;
  onCancel: () => void;
  isSaving?: boolean;
  isDeleting?: boolean;
}
```

---

### 4. Route Navigation

**Pattern**: Replace `useNavigate()` with callback props

```typescript
// ❌ Before
const navigate = useNavigate();
<Button onClick={() => navigate('/users')}>View Users</Button>

// ✅ After
interface Props {
  onViewUsers: () => void;
}
<Button onClick={onViewUsers}>View Users</Button>
```

**For links**: Accept `href` prop and render as link

```typescript
interface Props {
  href?: string;
  onClick?: () => void;
}

// In parent:
<Component href="/users" /> // Renders as <Link>
<Component onClick={handleClick} /> // Renders as <Button>
```

---

### 5. Toast Notifications

**Pattern**: Move toast logic to parent/wrapper

```typescript
// ❌ Before
const toast = useToast();
try {
  await mutation.mutateAsync(data);
  toast.success('Saved!');
} catch (error) {
  toast.error('Failed!');
}

// ✅ After (in parent)
const handleSubmit = async (data: FormData) => {
  try {
    await mutation.mutateAsync(data);
    toast.success(t('success'));
  } catch (error) {
    toast.error(t('error'));
  }
};

<Component onSubmit={handleSubmit} />
```

**Show error state in UI**: Pass error messages as props

```typescript
interface Props {
  error?: string;
  onDismissError?: () => void;
}

{error && (
  <Alert variant="error" onDismiss={onDismissError}>
    {error}
  </Alert>
)}
```

---

### 6. Modal/Dialog State

**Pattern**: Lift modal state to parent

```typescript
// ❌ Before
const [isOpen, setIsOpen] = useState(false);

export function DeleteButton() {
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Delete</Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <ConfirmDelete onConfirm={handleDelete} />
      </Modal>
    </>
  );
}

// ✅ After
interface Props {
  isDeleteModalOpen: boolean;
  onOpenDeleteModal: () => void;
  onCloseDeleteModal: () => void;
  onConfirmDelete: () => void;
}

export function DeleteButton({
  isDeleteModalOpen,
  onOpenDeleteModal,
  onCloseDeleteModal,
  onConfirmDelete
}: Props) {
  return (
    <>
      <Button onClick={onOpenDeleteModal}>Delete</Button>
      <Modal open={isDeleteModalOpen} onClose={onCloseDeleteModal}>
        <ConfirmDelete onConfirm={onConfirmDelete} />
      </Modal>
    </>
  );
}
```

**Alternative**: Separate components

```typescript
// Pure UI components
export function DeleteButton({ onClick }: { onClick: () => void }) {
  return <Button onClick={onClick}>Delete</Button>;
}

export function DeleteConfirmModal({
  open,
  onClose,
  onConfirm
}: ModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      {/* ... */}
      <Button onClick={onConfirm}>Confirm</Button>
    </Modal>
  );
}

// Parent manages state
function Parent() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <DeleteButton onClick={() => setIsOpen(true)} />
      <DeleteConfirmModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
```

---

### 7. Authentication/Authorization

**Pattern**: Pass authorization state as props

```typescript
// ❌ Before
const { user } = useAuth();
const canEdit = user?.permissions.includes('users.edit');

{canEdit && <EditButton />}

// ✅ After
interface Props {
  canEdit: boolean;
}

{canEdit && <EditButton />}
```

**Show different UI based on permissions**:

```typescript
interface Props {
  userRole: 'admin' | 'editor' | 'viewer';
  showAdminActions?: boolean;
  showEditorActions?: boolean;
}
```

---

### 8. Date/Time Formatting

**Pattern**: Accept formatted strings as props

```typescript
// ❌ Before
import { formatDate } from '@xala-technologies/platform/utils';
const formattedDate = formatDate(user.createdAt);

// ✅ After
interface Props {
  createdAt: string; // Already formatted by parent
}
```

**Alternative**: Accept formatter function

```typescript
interface Props {
  createdAt: Date;
  formatDate: (date: Date) => string;
}

// In component:
<span>{formatDate(createdAt)}</span>
```

---

## Refactoring Checklist

Use this checklist for each component you refactor:

### 1. Audit Phase
- [ ] Identify all external dependencies (SDK, i18n, router, etc.)
- [ ] List all data fetching points (query hooks)
- [ ] List all mutations (mutation hooks)
- [ ] List all side effects (toasts, navigation, etc.)
- [ ] List all translations (useT calls)
- [ ] Document current component behavior

### 2. Interface Design
- [ ] Define prop interface with all required data
- [ ] Add callback props for all actions
- [ ] Add optional props for loading/error states
- [ ] Add string props for all labels/messages
- [ ] Use ViewModel types for data props
- [ ] Document prop types with JSDoc

### 3. Refactoring
- [ ] Remove all forbidden imports
- [ ] Replace SDK hooks with props
- [ ] Replace useT() with string props
- [ ] Replace useNavigate() with callback props
- [ ] Replace useToast() with parent-handled errors
- [ ] Lift modal/dialog state to props
- [ ] Remove direct API calls
- [ ] Remove authentication checks

### 4. Testing
- [ ] Component compiles without errors
- [ ] Create/update Storybook stories
- [ ] Test all visual states in Storybook
- [ ] Write unit tests with mock props
- [ ] Verify no forbidden imports in build
- [ ] Run `pnpm verify:boundaries`
- [ ] Run `pnpm verify:design-tokens`

### 5. Documentation
- [ ] Add JSDoc to component
- [ ] Document all props
- [ ] Add usage examples in comments
- [ ] Update or create Storybook stories
- [ ] Document connected wrapper pattern

### 6. Migration
- [ ] Create connected wrapper in consuming app
- [ ] Update import paths
- [ ] Test in real application context
- [ ] Update tests in consuming app

---

## Testing Pure Components

### Unit Tests

Pure components are easier to test because they have no hidden dependencies:

```typescript
import { render, screen } from '@testing-library/react';
import { UserList } from './UserList';

describe('UserList', () => {
  const mockUsers = [
    { id: '1', name: 'Alice', email: 'alice@example.com' },
    { id: '2', name: 'Bob', email: 'bob@example.com' },
  ];

  it('renders users', () => {
    render(<UserList users={mockUsers} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<UserList users={[]} isLoading />);
    expect(screen.getByTitle('Loading users...')).toBeInTheDocument();
  });

  it('shows empty state', () => {
    render(<UserList users={[]} emptyMessage="No users yet" />);
    expect(screen.getByText('No users yet')).toBeInTheDocument();
  });

  it('shows error state', () => {
    render(<UserList users={[]} error="Failed to load" />);
    expect(screen.getByText('Failed to load')).toBeInTheDocument();
  });
});
```

### Storybook Stories

Pure components work perfectly in Storybook:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { UserList } from './UserList';

const meta: Meta<typeof UserList> = {
  title: 'Blocks/UserList',
  component: UserList,
};
export default meta;

type Story = StoryObj<typeof UserList>;

const mockUsers = [
  { id: '1', name: 'Alice Smith', email: 'alice@example.com' },
  { id: '2', name: 'Bob Jones', email: 'bob@example.com' },
];

export const Default: Story = {
  args: {
    users: mockUsers,
  },
};

export const Loading: Story = {
  args: {
    users: [],
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    users: [],
    emptyMessage: 'No users found',
  },
};

export const Error: Story = {
  args: {
    users: [],
    error: 'Failed to load users',
  },
};

export const ManyUsers: Story = {
  args: {
    users: Array.from({ length: 50 }, (_, i) => ({
      id: String(i),
      name: `User ${i}`,
      email: `user${i}@example.com`,
    })),
  },
};
```

---

## Summary

**Key Takeaways:**

1. **Pure UI = Reusable UI**: Components work in any React app
2. **Props In, Events Out**: All data via props, all actions via callbacks
3. **Connected Wrappers**: Connect pure components to data in consuming apps
4. **No Hidden Dependencies**: No SDK, i18n, router, or runtime imports
5. **Testable & Storybook-Friendly**: Easy to test and demonstrate

**Before you refactor, ask:**
- What data does this component need? → Add as props
- What actions can users take? → Add as callback props
- What text is displayed? → Add as string props
- What loading/error states exist? → Add as optional boolean/string props

**The Golden Rule:**
> If you can't create a Storybook story without mocking imports, your component isn't pure enough.

---

## Additional Resources

- [CLAUDE.md](/CLAUDE.md) - Project architecture and rules
- [Architecture Decision Records](/docs/adr/) - Design decisions
- [Designsystemet Documentation](https://designsystemet.no/) - Component library docs
- [Storybook Best Practices](https://storybook.js.org/docs/react/writing-stories/introduction)
