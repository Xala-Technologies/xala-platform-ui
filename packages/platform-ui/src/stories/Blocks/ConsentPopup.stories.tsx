import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { ConsentPopup, Stack, Paragraph, Card } from '../../index';

/**
 * ConsentPopup provides GDPR consent management popup dialog.
 *
 * ## Note
 * This component is currently a placeholder and returns null.
 * It will be implemented when the backend consent API is ready.
 */
const meta: Meta<typeof ConsentPopup> = {
  title: 'Blocks/ConsentPopup',
  component: ConsentPopup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ConsentPopup>;

/**
 * Placeholder component
 */
export const Placeholder: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.consentPopup.description')}</Paragraph>
            <Paragraph data-size="sm">{t('storybook.consentPopup.placeholderNote')}</Paragraph>
            <ConsentPopup />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
