import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
import { FavoriteButton } from '../../blocks/FavoriteButton';

const meta: Meta<typeof FavoriteButton> = {
  title: 'Blocks/FavoriteButton',
  component: FavoriteButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## FavoriteButton

Interactive button for favoriting/unfavoriting resources. Supports auth gating with callback for unauthenticated users.

### Features
- Three variants: icon, button, compact
- Size variants (sm, md, lg)
- Loading state
- Favorite count display
- Authentication gating
- Disabled state

### Usage
\`\`\`tsx
<FavoriteButton
  isFavorited={false}
  isAuthenticated={true}
  onToggle={handleToggle}
  variant="icon"
  size="md"
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onToggle: fn(),
    onAuthRequired: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['icon', 'button', 'compact'],
      description: 'Visual variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    isFavorited: {
      control: 'boolean',
      description: 'Whether item is favorited',
    },
    isAuthenticated: {
      control: 'boolean',
      description: 'Whether user is authenticated',
    },
    showCount: {
      control: 'boolean',
      description: 'Show favorite count',
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Icon variant - not favorited
export const IconNotFavorited: Story = {
  args: {
    isFavorited: false,
    isAuthenticated: true,
    variant: 'icon',
    size: 'md',
    isLoading: false,
    disabled: false,
  },
};

// Icon variant - favorited
export const IconFavorited: Story = {
  args: {
    isFavorited: true,
    isAuthenticated: true,
    variant: 'icon',
    size: 'md',
    isLoading: false,
    disabled: false,
  },
};

// Icon variant - loading
export const IconLoading: Story = {
  args: {
    isFavorited: false,
    isAuthenticated: true,
    variant: 'icon',
    size: 'md',
    isLoading: true,
    disabled: false,
  },
};

// Icon variant - unauthenticated
export const IconUnauthenticated: Story = {
  args: {
    isFavorited: false,
    isAuthenticated: false,
    variant: 'icon',
    size: 'md',
    isLoading: false,
    disabled: false,
    onAuthRequired: fn(),
  },
};

// Button variant
export const ButtonVariant: Story = {
  args: {
    isFavorited: false,
    isAuthenticated: true,
    variant: 'button',
    size: 'md',
    isLoading: false,
    disabled: false,
  },
};

// Button variant - favorited
export const ButtonFavorited: Story = {
  args: {
    isFavorited: true,
    isAuthenticated: true,
    variant: 'button',
    size: 'md',
    isLoading: false,
    disabled: false,
  },
};

// Compact variant
export const Compact: Story = {
  args: {
    isFavorited: false,
    isAuthenticated: true,
    variant: 'compact',
    size: 'sm',
    isLoading: false,
    disabled: false,
  },
};

// Compact with count
export const CompactWithCount: Story = {
  args: {
    isFavorited: false,
    isAuthenticated: true,
    variant: 'compact',
    size: 'sm',
    favoriteCount: 42,
    showCount: true,
    isLoading: false,
    disabled: false,
  },
};

// Button with count
export const ButtonWithCount: Story = {
  args: {
    isFavorited: true,
    isAuthenticated: true,
    variant: 'button',
    size: 'md',
    favoriteCount: 128,
    showCount: true,
    isLoading: false,
    disabled: false,
  },
};

// Size variants
export const SmallSize: Story = {
  args: {
    isFavorited: false,
    isAuthenticated: true,
    variant: 'icon',
    size: 'sm',
    isLoading: false,
    disabled: false,
  },
};

export const MediumSize: Story = {
  args: {
    isFavorited: false,
    isAuthenticated: true,
    variant: 'icon',
    size: 'md',
    isLoading: false,
    disabled: false,
  },
};

export const LargeSize: Story = {
  args: {
    isFavorited: false,
    isAuthenticated: true,
    variant: 'icon',
    size: 'lg',
    isLoading: false,
    disabled: false,
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    isFavorited: false,
    isAuthenticated: true,
    variant: 'icon',
    size: 'md',
    isLoading: false,
    disabled: true,
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)', alignItems: 'center' }}>
          <FavoriteButton variant="icon" size="md" isFavorited={false} onToggle={fn()} />
          <FavoriteButton variant="icon" size="md" isFavorited={true} onToggle={fn()} />
        </div>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)', alignItems: 'center' }}>
          <FavoriteButton variant="compact" size="sm" isFavorited={false} onToggle={fn()} />
          <FavoriteButton
            variant="compact"
            size="sm"
            isFavorited={true}
            favoriteCount={42}
            showCount
            onToggle={fn()}
          />
        </div>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)', alignItems: 'center' }}>
          <FavoriteButton variant="button" size="md" isFavorited={false} onToggle={fn()} />
          <FavoriteButton
            variant="button"
            size="md"
            isFavorited={true}
            favoriteCount={128}
            showCount
            onToggle={fn()}
          />
        </div>
      </div>
    );
  },
};
