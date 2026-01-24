import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
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
const DefaultLoadingFallback = () => {
  const t = useT();
  return <LoadingFallback message={t('platform.common.loading')} />;
};

export const Default: Story = {
  render: function Render() {
    return <DefaultLoadingFallback />;
  },
};

// Custom message
const CustomMessageLoadingFallback = () => {
  const t = useT();
  return <LoadingFallback message={t('storybook.demo.loadingContent')} />;
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
