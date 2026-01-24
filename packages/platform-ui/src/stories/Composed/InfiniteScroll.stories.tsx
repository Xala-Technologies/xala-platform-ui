import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { InfiniteScroll, VirtualList } from '../../composed/InfiniteScroll';
import { Card, Paragraph } from '@digdir/designsystemet-react';

const meta: Meta<typeof InfiniteScroll> = {
  title: 'Composed/InfiniteScroll',
  component: InfiniteScroll,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## InfiniteScroll & VirtualList

Efficient rendering for large lists with scroll loading and virtualization.

### Features
- Infinite scroll with intersection observer
- Custom loader and end messages
- Error handling with retry
- VirtualList for performance with large datasets
- useInfiniteScroll hook

### Usage
\`\`\`tsx
<InfiniteScroll
  loadMore={handleLoadMore}
  hasMore={hasMore}
  isLoading={isLoading}
>
  {items.map(item => <Item key={item.id} {...item} />)}
</InfiniteScroll>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    threshold: {
      control: 'number',
      description: 'Distance from bottom to trigger load (px)',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper components for stories that need translations
const DefaultDemo = () => {
  const t = useT();
  const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => i + 1));
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newItems = Array.from({ length: 10 }, (_, i) => items.length + i + 1);
    setItems([...items, ...newItems]);
    setHasMore(newItems.length === 10 && items.length < 50);
    setIsLoading(false);
  };

  return (
    <div
      style={{
        width: '400px',
        height: '400px',
        overflow: 'auto',
        border: '1px solid var(--ds-color-neutral-border-subtle)',
      }}
    >
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} isLoading={isLoading}>
        {items.map((item) => (
          <Card
            key={item}
            data-color="neutral"
            data-size="medium"
            style={{ marginBottom: 'var(--ds-spacing-2)' }}
          >
            <Paragraph data-size="sm">
              {t('storybook.demo.item')} {item}
            </Paragraph>
          </Card>
        ))}
      </InfiniteScroll>
    </div>
  );
};

const CustomLoaderDemo = () => {
  const t = useT();
  const [items, setItems] = useState(Array.from({ length: 5 }, (_, i) => i + 1));
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newItems = Array.from({ length: 5 }, (_, i) => items.length + i + 1);
    setItems([...items, ...newItems]);
    setHasMore(items.length < 20);
  };

  return (
    <div
      style={{
        width: '400px',
        height: '400px',
        overflow: 'auto',
        border: '1px solid var(--ds-color-neutral-border-subtle)',
      }}
    >
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={hasMore}
        loader={
          <div
            style={{
              padding: 'var(--ds-spacing-4)',
              textAlign: 'center',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            {t('storybook.demo.loadingMoreItems')}
          </div>
        }
      >
        {items.map((item) => (
          <Card
            key={item}
            data-color="neutral"
            data-size="medium"
            style={{ marginBottom: 'var(--ds-spacing-2)' }}
          >
            <Paragraph data-size="sm">
              {t('storybook.demo.item')} {item}
            </Paragraph>
          </Card>
        ))}
      </InfiniteScroll>
    </div>
  );
};

const WithEndMessageDemo = () => {
  const t = useT();
  const [items] = useState(Array.from({ length: 5 }, (_, i) => i + 1));

  return (
    <div
      style={{
        width: '400px',
        height: '400px',
        overflow: 'auto',
        border: '1px solid var(--ds-color-neutral-border-subtle)',
      }}
    >
      <InfiniteScroll
        loadMore={fn()}
        hasMore={false}
        endMessage={
          <div
            style={{
              padding: 'var(--ds-spacing-4)',
              textAlign: 'center',
              color: 'var(--ds-color-success-text-default)',
            }}
          >
            {t('storybook.demo.allItemsLoaded')}
          </div>
        }
      >
        {items.map((item) => (
          <Card
            key={item}
            data-color="neutral"
            data-size="medium"
            style={{ marginBottom: 'var(--ds-spacing-2)' }}
          >
            <Paragraph data-size="sm">
              {t('storybook.demo.item')} {item}
            </Paragraph>
          </Card>
        ))}
      </InfiniteScroll>
    </div>
  );
};

const WithErrorDemo = () => {
  const t = useT();
  const [items] = useState(Array.from({ length: 5 }, (_, i) => i + 1));
  const [error, setError] = useState(true);

  return (
    <div
      style={{
        width: '400px',
        height: '400px',
        overflow: 'auto',
        border: '1px solid var(--ds-color-neutral-border-subtle)',
      }}
    >
      <InfiniteScroll loadMore={fn()} hasMore={true} error={error} onRetry={() => setError(false)}>
        {items.map((item) => (
          <Card
            key={item}
            data-color="neutral"
            data-size="medium"
            style={{ marginBottom: 'var(--ds-spacing-2)' }}
          >
            <Paragraph data-size="sm">
              {t('storybook.demo.item')} {item}
            </Paragraph>
          </Card>
        ))}
      </InfiniteScroll>
    </div>
  );
};

const VirtualListDemo = () => {
  const t = useT();
  const items = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    name: `${t('storybook.demo.item')} ${i + 1}`,
  }));

  return (
    <div
      style={{
        width: '400px',
        height: '400px',
        border: '1px solid var(--ds-color-neutral-border-subtle)',
      }}
    >
      <VirtualList
        items={items}
        itemHeight={60}
        renderItem={(item) => (
          <Card
            data-color="neutral"
            data-size="medium"
            style={{
              margin: 'var(--ds-spacing-2)',
              padding: 'var(--ds-spacing-3)',
              height: '52px',
            }}
          >
            <Paragraph data-size="sm">{item.name}</Paragraph>
          </Card>
        )}
      />
    </div>
  );
};

// Basic infinite scroll
export const Default: Story = {
  render: function Render() {
    return <DefaultDemo />;
  },
};

// With custom loader
export const CustomLoader: Story = {
  render: function Render() {
    return <CustomLoaderDemo />;
  },
};

// With end message
export const WithEndMessage: Story = {
  render: function Render() {
    return <WithEndMessageDemo />;
  },
};

// With error state
export const WithError: Story = {
  render: function Render() {
    return <WithErrorDemo />;
  },
};

// VirtualList
export const VirtualListExample: Story = {
  render: function Render() {
    return <VirtualListDemo />;
  },
};
