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
import { LoadingFallback } from '..';

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
const DefaultLoadingFallback = () => {
  return <LoadingFallback message="Eksempel Tekst" />;
};

export const Default: Story = {
  render: function Render() {
    return <DefaultLoadingFallback />;
  },
};

// Custom message
const CustomMessageLoadingFallback = () => {
  return <LoadingFallback message="Eksempel Tekst" />;
};

export const CustomMessage: Story = {
  render: function Render() {
    return <CustomMessageLoadingFallback />;
  },
};

// English message
export const EnglishMessage: Story = {
  args: {
    message: 'Loading...',
  },
};
