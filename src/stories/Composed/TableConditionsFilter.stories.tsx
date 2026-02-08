import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { TableConditionsFilter, Stack, Paragraph, Card, Button } from '../../index';

/**
 * TableConditionsFilter provides an advanced filter builder for tables.
 *
 * ## Features
 * - Multiple conditions with AND/OR logic
 * - Field selection
 * - Operators (equals, contains, greater than, etc.)
 * - Dynamic value inputs
 *
 * ## When to Use
 * - Advanced table filtering
 * - Data query builders
 * - Search filters
 */
const meta: Meta<typeof TableConditionsFilter> = {
  title: 'Composed/TableConditionsFilter',
  component: TableConditionsFilter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TableConditionsFilter>;

/**
 * Default filter with basic fields
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [conditions, setConditions] = useState([]);
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.tableConditions.description')}</Paragraph>
            <TableConditionsFilter
              fields={[
                { id: 'name', label: t('storybook.tableConditions.name'), type: 'text' },
                { id: 'email', label: t('storybook.tableConditions.email'), type: 'text' },
                { id: 'age', label: t('storybook.tableConditions.age'), type: 'number' },
                {
                  id: 'status',
                  label: t('storybook.tableConditions.status'),
                  type: 'select',
                  options: [
                    { value: 'active', label: t('storybook.tableConditions.active') },
                    { value: 'inactive', label: t('storybook.tableConditions.inactive') },
                  ],
                },
              ]}
              conditions={conditions}
              onChange={setConditions}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Filter with initial conditions
 */
export const WithInitialConditions: Story = {
  render: function Render() {
    const t = useT();
    const [conditions, setConditions] = useState([
      {
        id: '1',
        field: 'name',
        operator: 'contains',
        value: 'John',
        logic: 'and',
      },
      {
        id: '2',
        field: 'status',
        operator: 'equals',
        value: 'active',
        logic: 'and',
      },
    ]);
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.tableConditions.withInitial')}</Paragraph>
            <TableConditionsFilter
              fields={[
                { id: 'name', label: t('storybook.tableConditions.name'), type: 'text' },
                { id: 'email', label: t('storybook.tableConditions.email'), type: 'text' },
                { id: 'age', label: t('storybook.tableConditions.age'), type: 'number' },
                {
                  id: 'status',
                  label: t('storybook.tableConditions.status'),
                  type: 'select',
                  options: [
                    { value: 'active', label: t('storybook.tableConditions.active') },
                    { value: 'inactive', label: t('storybook.tableConditions.inactive') },
                  ],
                },
              ]}
              conditions={conditions}
              onChange={setConditions}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Filter with date fields
 */
export const WithDateFields: Story = {
  render: function Render() {
    const t = useT();
    const [conditions, setConditions] = useState([]);
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.tableConditions.withDates')}</Paragraph>
            <TableConditionsFilter
              fields={[
                { id: 'created', label: t('storybook.tableConditions.created'), type: 'date' },
                { id: 'updated', label: t('storybook.tableConditions.updated'), type: 'date' },
                { id: 'name', label: t('storybook.tableConditions.name'), type: 'text' },
              ]}
              conditions={conditions}
              onChange={setConditions}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Filter with boolean fields
 */
export const WithBooleanFields: Story = {
  render: function Render() {
    const t = useT();
    const [conditions, setConditions] = useState([]);
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.tableConditions.withBooleans')}</Paragraph>
            <TableConditionsFilter
              fields={[
                { id: 'isActive', label: t('storybook.tableConditions.isActive'), type: 'boolean' },
                {
                  id: 'isVerified',
                  label: t('storybook.tableConditions.isVerified'),
                  type: 'boolean',
                },
                { id: 'name', label: t('storybook.tableConditions.name'), type: 'text' },
              ]}
              conditions={conditions}
              onChange={setConditions}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
