import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { DashboardContent } from '../../index';
import { Heading, Paragraph, Card } from '@digdir/designsystemet-react';

/**
 * DashboardContent provides a responsive content container for dashboard pages.
 *
 * ## Features
 * - Full-width fluid layout
 * - Responsive padding (mobile to desktop)
 * - Optional bottom padding for mobile navigation
 * - Consistent spacing across breakpoints
 *
 * ## When to Use
 * - Dashboard pages
 * - Admin panels
 * - Any page needing responsive content container
 */
const meta: Meta<typeof DashboardContent> = {
  title: 'Shells/DashboardContent',
  component: DashboardContent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
DashboardContent provides a responsive content container for dashboard pages.

## Features
- Full-width fluid layout
- Responsive padding that adapts to screen size
- Optional bottom padding for mobile navigation
- Consistent spacing across all breakpoints

## Responsive Padding
- Mobile (< 576px): var(--ds-spacing-4)
- Small tablets (576px+): var(--ds-spacing-5)
- Tablets (768px+): var(--ds-spacing-6)
- Desktop (992px+): var(--ds-spacing-6) var(--ds-spacing-8)
- Large desktop (1200px+): var(--ds-spacing-6) var(--ds-spacing-10)
- Ultra wide (1600px+): var(--ds-spacing-8) var(--ds-spacing-12)

## When to Use
- Dashboard pages
- Admin panels
- Any page needing responsive content container
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DashboardContent>;

/**
 * Default dashboard content
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <DashboardContent>
          <Heading level={1} data-size="lg">
            {t('storybook.dashboardContent.title')}
          </Heading>
          <Paragraph data-size="md">{t('storybook.dashboardContent.description')}</Paragraph>
          <Card
            data-color="neutral"
            data-size="medium"
            style={{ marginTop: 'var(--ds-spacing-4)' }}
          >
            <Card.Block>
              <Paragraph data-size="sm">{t('storybook.dashboardContent.cardContent')}</Paragraph>
            </Card.Block>
          </Card>
        </DashboardContent>
      </div>
    );
  },
};

/**
 * Dashboard content with bottom navigation padding
 */
export const WithBottomNav: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <DashboardContent hasBottomNav>
          <Heading level={1} data-size="lg">
            {t('storybook.dashboardContent.title')}
          </Heading>
          <Paragraph data-size="md">{t('storybook.dashboardContent.withBottomNav')}</Paragraph>
          <Card
            data-color="neutral"
            data-size="medium"
            style={{ marginTop: 'var(--ds-spacing-4)' }}
          >
            <Card.Block>
              <Paragraph data-size="sm">{t('storybook.dashboardContent.cardContent')}</Paragraph>
            </Card.Block>
          </Card>
        </DashboardContent>
      </div>
    );
  },
};

/**
 * Dashboard content with multiple cards
 */
export const WithMultipleCards: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <DashboardContent>
          <Heading level={1} data-size="lg">
            {t('storybook.dashboardContent.title')}
          </Heading>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--ds-spacing-4)',
              marginTop: 'var(--ds-spacing-4)',
            }}
          >
            <Card data-color="neutral" data-size="medium">
              <Card.Header>
                <Heading level={3} data-size="sm">
                  {t('storybook.dashboardContent.card1')}
                </Heading>
              </Card.Header>
              <Card.Block>
                <Paragraph data-size="sm">{t('storybook.dashboardContent.card1Content')}</Paragraph>
              </Card.Block>
            </Card>
            <Card data-color="neutral" data-size="medium">
              <Card.Header>
                <Heading level={3} data-size="sm">
                  {t('storybook.dashboardContent.card2')}
                </Heading>
              </Card.Header>
              <Card.Block>
                <Paragraph data-size="sm">{t('storybook.dashboardContent.card2Content')}</Paragraph>
              </Card.Block>
            </Card>
            <Card data-color="neutral" data-size="medium">
              <Card.Header>
                <Heading level={3} data-size="sm">
                  {t('storybook.dashboardContent.card3')}
                </Heading>
              </Card.Header>
              <Card.Block>
                <Paragraph data-size="sm">{t('storybook.dashboardContent.card3Content')}</Paragraph>
              </Card.Block>
            </Card>
          </div>
        </DashboardContent>
      </div>
    );
  },
};

/**
 * Dashboard content with long scrollable content
 */
export const ScrollableContent: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <DashboardContent>
          <Heading level={1} data-size="lg">
            {t('storybook.dashboardContent.title')}
          </Heading>
          {Array.from({ length: 20 }, (_, i) => (
            <Card
              key={i}
              data-color="neutral"
              data-size="medium"
              style={{ marginTop: 'var(--ds-spacing-4)' }}
            >
              <Card.Block>
                <Paragraph data-size="sm">
                  {t('storybook.dashboardContent.scrollableItem', { number: i + 1 })}
                </Paragraph>
              </Card.Block>
            </Card>
          ))}
        </DashboardContent>
      </div>
    );
  },
};
