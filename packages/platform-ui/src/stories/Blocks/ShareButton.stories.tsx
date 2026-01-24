import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
import { ShareButton } from '../../blocks/ShareButton';

const meta: Meta<typeof ShareButton> = {
  title: 'Blocks/ShareButton',
  component: ShareButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ShareButton

Button for sharing resources with support for native share API, clipboard copy, and social media sharing options.

### Features
- Native share API support
- Social media platforms (Facebook, Twitter, LinkedIn, WhatsApp)
- Email sharing
- Clipboard copy
- UTM parameter support
- Icon and button variants

### Usage
\`\`\`tsx
<ShareButton
  shareData={{
    url: 'https://example.com/resource',
    title: 'Resource Title',
    description: 'Check out this resource'
  }}
  variant="icon"
  size="md"
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onShare: fn(),
    shareData: {
      url: 'https://example.com/resource',
      title: 'Amazing Resource',
      description: 'Check out this amazing resource',
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['icon', 'button'],
      description: 'Visual variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
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

// Icon variant
export const IconVariant: Story = {
  args: {
    variant: 'icon',
    size: 'md',
    disabled: false,
  },
};

// Button variant
export const ButtonVariant: Story = {
  args: {
    variant: 'button',
    size: 'md',
    disabled: false,
  },
};

// Small size
export const SmallSize: Story = {
  args: {
    variant: 'icon',
    size: 'sm',
    disabled: false,
  },
};

// Large size
export const LargeSize: Story = {
  args: {
    variant: 'icon',
    size: 'lg',
    disabled: false,
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    variant: 'icon',
    size: 'md',
    disabled: true,
  },
};

// With UTM parameters
export const WithUTMParams: Story = {
  args: {
    variant: 'icon',
    size: 'md',
    disabled: false,
    utmParams: {
      source: 'storybook',
      medium: 'web',
      campaign: 'test',
      content: 'share-button',
    },
  },
};

// Custom platforms
export const CustomPlatforms: Story = {
  args: {
    variant: 'icon',
    size: 'md',
    disabled: false,
    platforms: ['copy', 'email', 'twitter'],
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: function Render() {
    const t = useT();
    const shareData = {
      url: 'https://example.com/resource',
      title: t('storybook.demo.cardTitle'),
      description: t('storybook.demo.cardDescription'),
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)', alignItems: 'center' }}>
          <ShareButton shareData={shareData} variant="icon" size="sm" onShare={fn()} />
          <ShareButton shareData={shareData} variant="icon" size="md" onShare={fn()} />
          <ShareButton shareData={shareData} variant="icon" size="lg" onShare={fn()} />
        </div>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)', alignItems: 'center' }}>
          <ShareButton shareData={shareData} variant="button" size="sm" onShare={fn()} />
          <ShareButton shareData={shareData} variant="button" size="md" onShare={fn()} />
          <ShareButton shareData={shareData} variant="button" size="lg" onShare={fn()} />
        </div>
      </div>
    );
  },
};
