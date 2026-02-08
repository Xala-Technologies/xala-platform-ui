import type { Meta, StoryObj } from '@storybook/react';
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
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <Button>
              "Eksempel Tekst" <ChevronForwardIcon />
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
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <Button>
              <ChevronBackIcon /> "Eksempel Tekst"
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
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <Button>
              "Eksempel Tekst" <ArrowForwardIcon />
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
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <Button>
              <ArrowBackIcon /> "Eksempel Tekst"
            </Button>
          </Stack>
        </Card>
      </Stack>
    );
  },
};
