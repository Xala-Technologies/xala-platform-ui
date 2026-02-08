import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { AlertDialog, Stack, Paragraph, Card, Button } from '../../index';

/**
 * AlertDialog provides an alert dialog for informational messages.
 *
 * ## Features
 * - Multiple variants (info, success, warning, danger)
 * - Simple close action
 * - Customizable text
 *
 * ## When to Use
 * - Information messages
 * - Success notifications
 * - Warning alerts
 * - Error messages
 */
const meta: Meta<typeof AlertDialog> = {
  title: 'Composed/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

/**
 * Default alert dialog
 */
export const Default: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <Button onClick={() => setOpen(true)}>"Eksempel Tekst"</Button>
            <AlertDialog
              open={open}
              onClose={() => setOpen(false)}
              title="Eksempel Tekst"
              description="Eksempel Tekst"
              closeText="Eksempel Tekst"
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Info variant
 */
export const Info: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <Button onClick={() => setOpen(true)}>"Eksempel Tekst"</Button>
            <AlertDialog
              open={open}
              onClose={() => setOpen(false)}
              title="Eksempel Tekst"
              description="Eksempel Tekst"
              closeText="Eksempel Tekst"
              variant="info"
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Success variant
 */
export const Success: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <Button onClick={() => setOpen(true)}>"Eksempel Tekst"</Button>
            <AlertDialog
              open={open}
              onClose={() => setOpen(false)}
              title="Eksempel Tekst"
              description="Eksempel Tekst"
              closeText="Eksempel Tekst"
              variant="success"
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Warning variant
 */
export const Warning: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <Button onClick={() => setOpen(true)}>"Eksempel Tekst"</Button>
            <AlertDialog
              open={open}
              onClose={() => setOpen(false)}
              title="Eksempel Tekst"
              description="Eksempel Tekst"
              closeText="Eksempel Tekst"
              variant="warning"
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Danger variant
 */
export const Danger: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <Button onClick={() => setOpen(true)}>"Eksempel Tekst"</Button>
            <AlertDialog
              open={open}
              onClose={() => setOpen(false)}
              title="Eksempel Tekst"
              description="Eksempel Tekst"
              closeText="Eksempel Tekst"
              variant="danger"
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
