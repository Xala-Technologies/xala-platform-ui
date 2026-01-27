import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { DataSubjectRequestForm, Stack, Paragraph, Card } from '../../index';

/**
 * DataSubjectRequestForm provides GDPR data subject request form.
 *
 * ## Note
 * This component is currently a placeholder and returns null.
 * It will be implemented when the GDPR request hooks are available.
 */
const meta: Meta<typeof DataSubjectRequestForm> = {
  title: 'Blocks/DataSubjectRequestForm',
  component: DataSubjectRequestForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataSubjectRequestForm>;

/**
 * Placeholder component
 */
export const Placeholder: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">
              {t('storybook.dataSubjectRequestForm.description')}
            </Paragraph>
            <Paragraph data-size="sm">
              {t('storybook.dataSubjectRequestForm.placeholderNote')}
            </Paragraph>
            <DataSubjectRequestForm />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
