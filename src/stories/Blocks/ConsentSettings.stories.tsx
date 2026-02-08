import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { ConsentSettings, Stack, Paragraph, Card } from '../../index';

/**
 * ConsentSettings provides GDPR consent management settings.
 *
 * ## Note
 * This component is currently a placeholder and returns null.
 * It will be implemented when the GDPR consent management API is ready.
 */
const meta: Meta<typeof ConsentSettings> = {
  title: 'Blocks/ConsentSettings',
  component: ConsentSettings,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ConsentSettings>;

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
            <Paragraph data-size="md">{t('storybook.consentSettings.description')}</Paragraph>
            <Paragraph data-size="sm">{t('storybook.consentSettings.placeholderNote')}</Paragraph>
            <ConsentSettings />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
