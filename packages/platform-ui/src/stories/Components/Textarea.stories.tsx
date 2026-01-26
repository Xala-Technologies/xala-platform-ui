import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useT } from '@xala-technologies/i18n';
import { Textarea, Label, Field, ValidationMessage } from '../../index';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component: `
Textarea for multi-line text input.

## When to Use
- Long-form text input
- Comments or descriptions
- Messages
- Feedback forms

## Best Practices
- Always provide a label
- Use character counter for limits
- Set appropriate rows for context
- Provide helpful placeholder text

## Accessibility
- Label is required
- Error messages are announced
- Resize handle for user control
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Field>
        <Label>{t('platform.common.description')}</Label>
        <Textarea placeholder={t('storybook.demo.enterDescription')} />
      </Field>
    );
  },
};

export const WithDescription: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Field>
        <Label>{t('storybook.demo.additionalNotes')}</Label>
        <Field.Description>{t('storybook.demo.includeSpecialRequirements')}</Field.Description>
        <Textarea placeholder={t('storybook.demo.enterNotes')} />
      </Field>
    );
  },
};

export const WithCharacterCount: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Field>
        <Label>{t('storybook.demo.bio')}</Label>
        <Field.Description>{t('storybook.demo.tellUsAboutYourself')}</Field.Description>
        <Textarea placeholder={t('storybook.demo.writeShortBio')} maxLength={200} />
        <Field.Counter limit={200} />
      </Field>
    );
  },
};

export const WithError: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Field>
        <Label>{t('storybook.demo.message')}</Label>
        <Textarea placeholder={t('storybook.demo.enterYourMessage')} aria-invalid="true" />
        <ValidationMessage>{t('storybook.demo.messageIsRequired')}</ValidationMessage>
      </Field>
    );
  },
};

export const Disabled: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Field>
        <Label>{t('storybook.demo.lockedContent')}</Label>
        <Textarea defaultValue={t('storybook.demo.cannotBeEdited')} disabled />
      </Field>
    );
  },
};

export const ReadOnly: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Field>
        <Label>{t('storybook.demo.termsAndConditions')}</Label>
        <Textarea defaultValue={t('storybook.demo.loremIpsum')} readOnly />
      </Field>
    );
  },
};

export const Rows: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Field>
          <Label>{t('storybook.demo.small3Rows')}</Label>
          <Textarea rows={3} placeholder={t('storybook.demo.threeRows')} />
        </Field>
        <Field>
          <Label>{t('storybook.demo.medium5Rows')}</Label>
          <Textarea rows={5} placeholder={t('storybook.demo.fiveRows')} />
        </Field>
        <Field>
          <Label>{t('storybook.demo.large8Rows')}</Label>
          <Textarea rows={8} placeholder={t('storybook.demo.eightRows')} />
        </Field>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>
            {t('storybook.story.states')}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
            <Field>
              <Label>{t('storybook.story.default')}</Label>
              <Textarea placeholder={t('storybook.demo.enterText')} />
            </Field>
            <Field>
              <Label>{t('storybook.demo.withValue')}</Label>
              <Textarea defaultValue={t('storybook.demo.someExistingContent')} />
            </Field>
            <Field>
              <Label>{t('storybook.story.disabled')}</Label>
              <Textarea disabled defaultValue={t('storybook.demo.cannotEdit')} />
            </Field>
            <Field>
              <Label>{t('storybook.story.readOnly')}</Label>
              <Textarea readOnly defaultValue={t('storybook.demo.readOnlyContent')} />
            </Field>
          </div>
        </div>
      </div>
    );
  },
};
