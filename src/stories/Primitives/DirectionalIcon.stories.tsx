import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import {
  DirectionalIcon,
  ChevronForwardIcon,
  ChevronBackIcon,
  ArrowForwardIcon,
  ArrowBackIcon,
  Stack,
  Paragraph,
  Card,
  Button,
} from '../../index';

/**
 * DirectionalIcon provides icons that automatically flip based on text direction.
 *
 * ## Components
 * - DirectionalIcon: Base wrapper component
 * - ChevronForwardIcon: Forward chevron
 * - ChevronBackIcon: Back chevron
 * - ArrowForwardIcon: Forward arrow
 * - ArrowBackIcon: Back arrow
 *
 * ## When to Use
 * - Navigation icons
 * - RTL layouts
 * - Directional indicators
 */
const meta: Meta<typeof DirectionalIcon> = {
  title: 'Primitives/DirectionalIcon',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DirectionalIcon>;

/**
 * ChevronForwardIcon
 */
export const ChevronForward: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.directionalIcon.chevronForward')}</Paragraph>
            <Button>
              {t('storybook.directionalIcon.next')} <ChevronForwardIcon />
            </Button>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * ChevronBackIcon
 */
export const ChevronBack: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.directionalIcon.chevronBack')}</Paragraph>
            <Button>
              <ChevronBackIcon /> {t('storybook.directionalIcon.back')}
            </Button>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * ArrowForwardIcon
 */
export const ArrowForward: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.directionalIcon.arrowForward')}</Paragraph>
            <Button>
              {t('storybook.directionalIcon.next')} <ArrowForwardIcon />
            </Button>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * ArrowBackIcon
 */
export const ArrowBack: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.directionalIcon.arrowBack')}</Paragraph>
            <Button>
              <ArrowBackIcon /> {t('storybook.directionalIcon.back')}
            </Button>
          </Stack>
        </Card>
      </Stack>
    );
  },
};
