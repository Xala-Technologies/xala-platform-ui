import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Alert, Heading, Paragraph, Link } from '../../index';

/**
 * Alert component from Digdir Designsystemet.
 *
 * Provides users with information that is especially important for them to see and understand.
 * The component is designed to capture users' attention.
 *
 * @see https://designsystemet.no/en/components/docs/alert/overview
 */
const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component: `
Alert provides users with information that is especially important for them to see and understand. The component is designed to capture users' attention. The text in the alert should be short and clear.

## Variants

- **Info** (data-color="info") - Neutral and useful information
- **Success** (data-color="success") - Confirm task completion
- **Warning** (data-color="warning") - Important actions or warnings
- **Danger** (data-color="danger") - Critical information or errors

## When to Use

- **Info**: Provide neutral and useful information
- **Success**: Confirm that the user has completed a task successfully
- **Warning**: User needs to take a specific action or be warned about something important
- **Danger**: Critical information that prevents the user from moving forward

## Best Practices

- Keep text short and clear
- Use headings for longer messages (more than one sentence)
- Only include links when absolutely necessary
- Choose correct heading level based on page structure

## Accessibility

- Screen readers: Alert role announced
- Color: Not sole indicator of meaning
- Semantic HTML with proper heading levels
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    'data-color': {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
      description: 'Color variant of the alert',
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Info alert - Use when you want to provide the user with neutral and useful information.
 */
export const Information: Story = {
  render: () => (
    <Alert data-color="info">
      <Heading level={2} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
        Have you remembered to book a passport appointment?
      </Heading>
      <Paragraph>
        There are long queues for booking a passport these days, so it may be wise to book well in
        advance of your trip.
      </Paragraph>
    </Alert>
  ),
};

/**
 * Success alert - Use when you want to confirm that the user has completed a task, that the action was successful.
 */
export const Success: Story = {
  render: () => (
    <Alert data-color="success">
      <Heading level={2} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
        Congratulations! You can now start your company
      </Heading>
      <Paragraph>
        It looks like the numbers add up, and that you have what it takes to start your company.
      </Paragraph>
    </Alert>
  ),
};

/**
 * Warning alert - Use when you want the user to take a specific action or to warn them about something important.
 */
export const Warning: Story = {
  render: () => (
    <Alert data-color="warning">
      <Heading level={2} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
        We are experiencing technical issues
      </Heading>
      <Paragraph>
        This means you may be interrupted while filling in the form. We are working to fix the
        issues.
      </Paragraph>
    </Alert>
  ),
};

/**
 * Danger alert - Use to inform about something that is critical or that prevents the user from moving forward.
 */
export const Danger: Story = {
  render: () => (
    <Alert data-color="danger">
      <Heading level={2} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
        An error has occurred
      </Heading>
      <Paragraph>
        We are unable to retrieve the information you are looking for right now. Please try again
        later. If we still cannot show the information you need, please contact customer service on
        telephone 85 44 32 66.
      </Paragraph>
    </Alert>
  ),
};

/**
 * Alert with heading - If the message is longer than a sentence, use a heading to highlight the most important thing.
 */
export const WithHeading: Story = {
  render: () => (
    <Alert>
      <Heading level={2} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
        Have you remembered to book a passport appointment?
      </Heading>
      <Paragraph>
        There are long queues for booking a passport these days, so it may be wise to book well in
        advance if you need a passport for the summer.
      </Paragraph>
    </Alert>
  ),
};

/**
 * Alert without heading - If the title and description repeat the same thing, use a simple sentence without a heading.
 */
export const WithoutHeading: Story = {
  render: () => (
    <Alert data-color="warning">
      <Paragraph>You have 7 days left to complete the application.</Paragraph>
    </Alert>
  ),
};

/**
 * Alert with link - You can have a link in the Alert if it helps the user solve the task.
 * Be aware that a link takes the user out of the service, so use links only when absolutely necessary.
 */
export const WithLink: Story = {
  render: () => (
    <Alert data-color="warning">
      <Heading level={2} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
        The application deadline is in 3 days
      </Heading>
      <Paragraph>
        The deadline for applying for admission to education is 15 April.{' '}
        <Link href="#">Apply now</Link>
      </Paragraph>
    </Alert>
  ),
};

/**
 * All color variants - Overview of all available alert colors
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
      <div>
        <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>
          Color Variants
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
          <Alert data-color="info">
            <Heading level={2} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
              Information
            </Heading>
            <Paragraph>This is neutral and useful information for the user.</Paragraph>
          </Alert>

          <Alert data-color="success">
            <Heading level={2} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
              Success
            </Heading>
            <Paragraph>The task has been completed successfully.</Paragraph>
          </Alert>

          <Alert data-color="warning">
            <Heading level={2} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
              Warning
            </Heading>
            <Paragraph>Important information that requires attention.</Paragraph>
          </Alert>

          <Alert data-color="danger">
            <Heading level={2} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
              Error
            </Heading>
            <Paragraph>Critical information that prevents moving forward.</Paragraph>
          </Alert>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>
          With and Without Heading
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
          <Alert data-color="info">
            <Heading level={2} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
              With heading (longer message)
            </Heading>
            <Paragraph>
              If the message is longer than a sentence, use a heading to highlight the most
              important thing.
            </Paragraph>
          </Alert>

          <Alert data-color="warning">
            <Paragraph>Without heading - simple sentence for short messages.</Paragraph>
          </Alert>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>
          With Link
        </h3>
        <Alert data-color="warning">
          <Heading level={2} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
            Action required
          </Heading>
          <Paragraph>
            Use links only when absolutely necessary. <Link href="#">Take action</Link>
          </Paragraph>
        </Alert>
      </div>
    </div>
  ),
};
