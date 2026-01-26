import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { TableRowActions, Stack, Paragraph, Card } from '../../index';
import { EyeIcon, EditIcon, TrashIcon, CopyIcon } from '../../index';

/**
 * TableRowActions provides a dropdown menu for table row actions.
 *
 * ## Features
 * - View, edit, delete, and custom actions
 * - Icon support
 * - Variant support (default, danger, success, warning)
 * - Disabled and hidden states
 *
 * ## When to Use
 * - Table row action menus
 * - Bulk action menus
 * - Context menus
 */
const meta: Meta<typeof TableRowActions> = {
  title: 'Composed/TableRowActions',
  component: TableRowActions,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TableRowActions>;

/**
 * Default table row actions
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.tableRowActions.exampleRow')}</Paragraph>
            <TableRowActions
              actions={[
                {
                  id: 'view',
                  label: t('storybook.tableRowActions.view'),
                  icon: <EyeIcon />,
                  onClick: () => console.log('View clicked'),
                },
                {
                  id: 'edit',
                  label: t('storybook.tableRowActions.edit'),
                  icon: <EditIcon />,
                  onClick: () => console.log('Edit clicked'),
                },
                {
                  id: 'delete',
                  label: t('storybook.tableRowActions.delete'),
                  icon: <TrashIcon />,
                  variant: 'danger',
                  onClick: () => console.log('Delete clicked'),
                },
              ]}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Actions with all variants
 */
export const AllVariants: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.tableRowActions.exampleRow')}</Paragraph>
            <TableRowActions
              actions={[
                {
                  id: 'default',
                  label: t('storybook.tableRowActions.defaultAction'),
                  onClick: () => console.log('Default clicked'),
                },
                {
                  id: 'danger',
                  label: t('storybook.tableRowActions.dangerAction'),
                  variant: 'danger',
                  onClick: () => console.log('Danger clicked'),
                },
                {
                  id: 'success',
                  label: t('storybook.tableRowActions.successAction'),
                  variant: 'success',
                  onClick: () => console.log('Success clicked'),
                },
                {
                  id: 'warning',
                  label: t('storybook.tableRowActions.warningAction'),
                  variant: 'warning',
                  onClick: () => console.log('Warning clicked'),
                },
              ]}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Actions with disabled state
 */
export const WithDisabledActions: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.tableRowActions.exampleRow')}</Paragraph>
            <TableRowActions
              actions={[
                {
                  id: 'view',
                  label: t('storybook.tableRowActions.view'),
                  icon: <EyeIcon />,
                  onClick: () => console.log('View clicked'),
                },
                {
                  id: 'edit',
                  label: t('storybook.tableRowActions.edit'),
                  icon: <EditIcon />,
                  disabled: true,
                  onClick: () => console.log('Edit clicked'),
                },
                {
                  id: 'delete',
                  label: t('storybook.tableRowActions.delete'),
                  icon: <TrashIcon />,
                  variant: 'danger',
                  disabled: true,
                  onClick: () => console.log('Delete clicked'),
                },
              ]}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Actions with copy action
 */
export const WithCopyAction: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.tableRowActions.exampleRow')}</Paragraph>
            <TableRowActions
              actions={[
                {
                  id: 'view',
                  label: t('storybook.tableRowActions.view'),
                  icon: <EyeIcon />,
                  onClick: () => console.log('View clicked'),
                },
                {
                  id: 'edit',
                  label: t('storybook.tableRowActions.edit'),
                  icon: <EditIcon />,
                  onClick: () => console.log('Edit clicked'),
                },
                {
                  id: 'copy',
                  label: t('storybook.tableRowActions.copy'),
                  icon: <CopyIcon />,
                  onClick: () => console.log('Copy clicked'),
                },
                {
                  id: 'delete',
                  label: t('storybook.tableRowActions.delete'),
                  icon: <TrashIcon />,
                  variant: 'danger',
                  onClick: () => console.log('Delete clicked'),
                },
              ]}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
