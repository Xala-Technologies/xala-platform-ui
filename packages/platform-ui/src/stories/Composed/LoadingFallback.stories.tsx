import type { Meta, StoryObj } from '@storybook/react';
import { LoadingFallback } from '../../composed/LoadingFallback';

const meta: Meta<typeof LoadingFallback> = {
  title: 'Composed/LoadingFallback',
  component: LoadingFallback,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## LoadingFallback

Full-page loading state for lazy-loaded components. Used with React.Suspense.

### Features
- Centered spinner
- Optional loading message
- Full viewport height
- SSR-safe

### Usage
\`\`\`tsx
import { Suspense } from 'react';
import { LoadingFallback } from '@xala-technologies/platform-ui';

<Suspense fallback={<LoadingFallback />}>
  <LazyComponent />
</Suspense>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    message: {
      control: 'text',
      description: 'Loading message',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default loading fallback
export const Default: Story = {
  args: {
    message: 'Laster...',
  },
};

// Custom message
export const CustomMessage: Story = {
  args: {
    message: 'Loading content...',
  },
};

// English message
export const EnglishMessage: Story = {
  args: {
    message: 'Loading...',
  },
};
