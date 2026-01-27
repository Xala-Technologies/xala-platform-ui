import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { SelectOption, Select, Stack, Paragraph, Card } from '../../index';

/**
 * SelectOption provides a typed interface for select options.
 *
 * ## Features
 * - Typed option values
 * - Disabled state
 * - Native option element wrapper
 *
 * ## When to Use
 * - Select dropdowns
 * - Option lists
 * - Form selects
 */
const meta: Meta<typeof SelectOption> = {
  title: 'Primitives/SelectOption',
  component: SelectOption,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SelectOption>;

/**
 * Default select with options
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState('');
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.selectOption.description')}</Paragraph>
            <Select
              label={t('storybook.selectOption.label')}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            >
              <SelectOption value="">{t('storybook.selectOption.select')}</SelectOption>
              <SelectOption value="option1">{t('storybook.selectOption.option1')}</SelectOption>
              <SelectOption value="option2">{t('storybook.selectOption.option2')}</SelectOption>
              <SelectOption value="option3" disabled>
                {t('storybook.selectOption.option3')}
              </SelectOption>
            </Select>
          </Stack>
        </Card>
      </Stack>
    );
  },
};
