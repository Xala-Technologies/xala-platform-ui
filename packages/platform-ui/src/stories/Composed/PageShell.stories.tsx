import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
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

// List page shell
export const ListPage: Story = {
  render: () => (
    <ListPageShell
      title="Resources"
      subtitle="Manage your resources"
      actions={
        <Button onClick={fn()} data-color="accent" data-size="medium">
          Create Resource
        </Button>
      }
      filters={
        <div style={{ padding: 'var(--ds-spacing-2)', backgroundColor: 'var(--ds-color-neutral-surface-subtle)', borderRadius: 'var(--ds-border-radius-md)' }}>
          <Paragraph data-size="sm">Filter controls go here</Paragraph>
        </div>
      }
    >
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
          <Paragraph data-size="sm">Resource 1</Paragraph>
        </Card>
        <Card data-color="neutral" data-size="medium" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
          <Paragraph data-size="sm">Resource 2</Paragraph>
        </Card>
        <Card data-color="neutral" data-size="medium">
          <Paragraph data-size="sm">Resource 3</Paragraph>
        </Card>
      </div>
    </ListPageShell>
  ),
};

// Detail page shell
export const DetailPage: Story = {
  render: () => (
    <DetailPageShell
      title="Resource Details"
      subtitle={<Badge variant="success">Active</Badge>}
      backLink={{
        label: 'Back to Resources',
        href: '/resources',
        onClick: fn(),
      }}
      actions={
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
          <Button onClick={fn()} data-color="neutral" data-size="medium">
            Edit
          </Button>
          <Button onClick={fn()} data-color="accent" data-size="medium">
            Save
          </Button>
        </div>
      }
      badges={<Badge variant="info">Featured</Badge>}
      statusBanner={
        <div style={{ padding: 'var(--ds-spacing-3)', backgroundColor: 'var(--ds-color-success-surface-subtle)', borderRadius: 'var(--ds-border-radius-md)', marginBottom: 'var(--ds-spacing-4)' }}>
          <Paragraph data-size="sm">Status: Active</Paragraph>
        </div>
      }
      tabs={
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', marginBottom: 'var(--ds-spacing-4)' }}>
          <Button data-color="accent" data-size="sm">Overview</Button>
          <Button data-color="neutral" data-size="sm">Details</Button>
          <Button data-color="neutral" data-size="sm">History</Button>
        </div>
      }
    >
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Paragraph data-size="sm">Detail content goes here</Paragraph>
        </Card>
      </div>
    </DetailPageShell>
  ),
};

// Form page shell
export const FormPage: Story = {
  render: () => (
    <FormPageShell
      title="Create Resource"
      subtitle="Fill in the form below to create a new resource"
      backLink={{
        label: 'Back',
        href: '/resources',
        onClick: fn(),
      }}
      footer={
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', justifyContent: 'flex-end', padding: 'var(--ds-spacing-4)', borderTop: '1px solid var(--ds-color-neutral-border-subtle)' }}>
          <Button onClick={fn()} data-color="neutral" data-size="medium">
            Cancel
          </Button>
          <Button onClick={fn()} data-color="accent" data-size="medium">
            Create Resource
          </Button>
        </div>
      }
    >
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Paragraph data-size="sm">Form fields go here</Paragraph>
        </Card>
      </div>
    </FormPageShell>
  ),
};

// List page without filters
export const ListPageNoFilters: Story = {
  render: () => (
    <ListPageShell
      title="Simple List"
      actions={
        <Button onClick={fn()} data-color="accent" data-size="medium">
          Add Item
        </Button>
      }
    >
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Paragraph data-size="sm">List content</Paragraph>
        </Card>
      </div>
    </ListPageShell>
  ),
};

// Detail page minimal
export const DetailPageMinimal: Story = {
  render: () => (
    <DetailPageShell
      title="Simple Detail"
      backLink={{
        label: 'Back',
        href: '/',
      }}
    >
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Paragraph data-size="sm">Detail content</Paragraph>
        </Card>
      </div>
    </DetailPageShell>
  ),
};

// Form page without back link
export const FormPageNoBackLink: Story = {
  render: () => (
    <FormPageShell
      title="Edit Resource"
      footer={
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', justifyContent: 'flex-end', padding: 'var(--ds-spacing-4)' }}>
          <Button onClick={fn()} data-color="accent" data-size="medium">
            Save Changes
          </Button>
        </div>
      }
    >
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Paragraph data-size="sm">Form content</Paragraph>
        </Card>
      </div>
    </FormPageShell>
  ),
};
