import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
import { ListPageShell, DetailPageShell, FormPageShell } from '../../composed/PageShell';
import { Button, Card, Paragraph } from '@digdir/designsystemet-react';
import { Badge } from '../../composed/Badge';

const meta: Meta<typeof ListPageShell> = {
  title: 'Composed/PageShell',
  component: ListPageShell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## PageShell Components

Reusable page layout shells for consistent page structure. Includes ListPageShell, DetailPageShell, and FormPageShell.

### Features
- ListPageShell for list pages
- DetailPageShell for detail pages
- FormPageShell for form pages
- Consistent header structure
- Back links and actions

### Usage
\`\`\`tsx
<ListPageShell title="Resources" actions={<Button>Create</Button>}>
  <ResourceList />
</ListPageShell>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper for list page story
const ListPageDemo = () => {
  const t = useT();
  return (
    <ListPageShell
      title={t('storybook.demo.resources')}
      subtitle={t('storybook.demo.manageYourResources')}
      actions={
        <Button onClick={fn()} data-color="accent" data-size="medium">
          {t('storybook.demo.createResource')}
        </Button>
      }
      filters={
        <div
          style={{
            padding: 'var(--ds-spacing-2)',
            backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          <Paragraph data-size="sm">{t('storybook.demo.filterControlsHere')}</Paragraph>
        </div>
      }
    >
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <Card
          data-color="neutral"
          data-size="medium"
          style={{ marginBottom: 'var(--ds-spacing-2)' }}
        >
          <Paragraph data-size="sm">{t('storybook.demo.resource')} 1</Paragraph>
        </Card>
        <Card
          data-color="neutral"
          data-size="medium"
          style={{ marginBottom: 'var(--ds-spacing-2)' }}
        >
          <Paragraph data-size="sm">{t('storybook.demo.resource')} 2</Paragraph>
        </Card>
        <Card data-color="neutral" data-size="medium">
          <Paragraph data-size="sm">{t('storybook.demo.resource')} 3</Paragraph>
        </Card>
      </div>
    </ListPageShell>
  );
};

// List page shell
export const ListPage: Story = {
  render: () => <ListPageDemo />,
};

// Wrapper for detail page story
const DetailPageDemo = () => {
  const t = useT();
  return (
    <DetailPageShell
      title={t('storybook.demo.resourceDetails')}
      subtitle={<Badge variant="success">{t('platform.status.active')}</Badge>}
      backLink={{
        label: t('storybook.demo.backToResources'),
        href: '/resources',
        onClick: fn(),
      }}
      actions={
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
          <Button onClick={fn()} data-color="neutral" data-size="medium">
            {t('platform.common.edit')}
          </Button>
          <Button onClick={fn()} data-color="accent" data-size="medium">
            {t('platform.common.save')}
          </Button>
        </div>
      }
      badges={<Badge variant="info">{t('storybook.demo.featured')}</Badge>}
      statusBanner={
        <div
          style={{
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-success-surface-subtle)',
            borderRadius: 'var(--ds-border-radius-md)',
            marginBottom: 'var(--ds-spacing-4)',
          }}
        >
          <Paragraph data-size="sm">
            {t('platform.status.label')}: {t('platform.status.active')}
          </Paragraph>
        </div>
      }
      tabs={
        <div
          style={{
            display: 'flex',
            gap: 'var(--ds-spacing-2)',
            marginBottom: 'var(--ds-spacing-4)',
          }}
        >
          <Button data-color="accent" data-size="sm">
            {t('storybook.demo.overview')}
          </Button>
          <Button data-color="neutral" data-size="sm">
            {t('storybook.demo.details')}
          </Button>
          <Button data-color="neutral" data-size="sm">
            {t('storybook.demo.history')}
          </Button>
        </div>
      }
    >
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Paragraph data-size="sm">{t('storybook.demo.detailContentHere')}</Paragraph>
        </Card>
      </div>
    </DetailPageShell>
  );
};

// Detail page shell
export const DetailPage: Story = {
  render: () => <DetailPageDemo />,
};

// Wrapper for form page story
const FormPageDemo = () => {
  const t = useT();
  return (
    <FormPageShell
      title={t('storybook.demo.createResource')}
      subtitle={t('storybook.demo.fillFormToCreate')}
      backLink={{
        label: t('platform.common.back'),
        href: '/resources',
        onClick: fn(),
      }}
      footer={
        <div
          style={{
            display: 'flex',
            gap: 'var(--ds-spacing-2)',
            justifyContent: 'flex-end',
            padding: 'var(--ds-spacing-4)',
            borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <Button onClick={fn()} data-color="neutral" data-size="medium">
            {t('platform.common.cancel')}
          </Button>
          <Button onClick={fn()} data-color="accent" data-size="medium">
            {t('storybook.demo.createResource')}
          </Button>
        </div>
      }
    >
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Paragraph data-size="sm">{t('storybook.demo.formFieldsHere')}</Paragraph>
        </Card>
      </div>
    </FormPageShell>
  );
};

// Form page shell
export const FormPage: Story = {
  render: () => <FormPageDemo />,
};

// Wrapper for list page no filters story
const ListPageNoFiltersDemo = () => {
  const t = useT();
  return (
    <ListPageShell
      title={t('storybook.demo.simpleList')}
      actions={
        <Button onClick={fn()} data-color="accent" data-size="medium">
          {t('storybook.demo.addItem')}
        </Button>
      }
    >
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Paragraph data-size="sm">{t('storybook.demo.listContent')}</Paragraph>
        </Card>
      </div>
    </ListPageShell>
  );
};

// List page without filters
export const ListPageNoFilters: Story = {
  render: () => <ListPageNoFiltersDemo />,
};

// Wrapper for detail page minimal story
const DetailPageMinimalDemo = () => {
  const t = useT();
  return (
    <DetailPageShell
      title={t('storybook.demo.simpleDetail')}
      backLink={{
        label: t('platform.common.back'),
        href: '/',
      }}
    >
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Paragraph data-size="sm">{t('storybook.demo.detailContent')}</Paragraph>
        </Card>
      </div>
    </DetailPageShell>
  );
};

// Detail page minimal
export const DetailPageMinimal: Story = {
  render: () => <DetailPageMinimalDemo />,
};

// Wrapper for form page no back link story
const FormPageNoBackLinkDemo = () => {
  const t = useT();
  return (
    <FormPageShell
      title={t('storybook.demo.editResource')}
      footer={
        <div
          style={{
            display: 'flex',
            gap: 'var(--ds-spacing-2)',
            justifyContent: 'flex-end',
            padding: 'var(--ds-spacing-4)',
          }}
        >
          <Button onClick={fn()} data-color="accent" data-size="medium">
            {t('platform.common.saveChanges')}
          </Button>
        </div>
      }
    >
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Paragraph data-size="sm">{t('storybook.demo.formContent')}</Paragraph>
        </Card>
      </div>
    </FormPageShell>
  );
};

// Form page without back link
export const FormPageNoBackLink: Story = {
  render: () => <FormPageNoBackLinkDemo />,
};
