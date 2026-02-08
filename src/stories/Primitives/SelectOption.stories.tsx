import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
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
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <Select
              label="Eksempel Tekst"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            >
              <SelectOption value="">"Eksempel Tekst"</SelectOption>
              <SelectOption value="option1">"Eksempel Tekst"</SelectOption>
              <SelectOption value="option2">"Eksempel Tekst"</SelectOption>
              <SelectOption value="option3" disabled>
                "Eksempel Tekst"
              </SelectOption>
            </Select>
          </Stack>
        </Card>
      </Stack>
    );
  },
};
