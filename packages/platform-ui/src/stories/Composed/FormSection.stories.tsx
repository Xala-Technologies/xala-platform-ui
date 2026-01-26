import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { FormSection, Textfield, Label, Stack } from '../../index';

/**
 * FormSection provides standardized section headers for forms.
 *
 * ## Features
 * - Section title
 * - Optional description
 * - Consistent styling
 *
 * ## When to Use
 * - Form grouping
 * - Sectioned forms
 * - Multi-step forms
 */
const meta: Meta<typeof FormSection> = {
  title: 'Composed/FormSection',
  component: FormSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
FormSection provides standardized section headers for forms.

## Features
- Section title
- Optional description
- Consistent styling

## When to Use
- Form grouping
- Sectioned forms
- Multi-step forms
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormSection>;

/**
 * Default form section
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <FormSection title={t('storybook.formSection.personalInfo')}>
          <Stack spacing="var(--ds-spacing-3)" direction="vertical">
            <Stack spacing="var(--ds-spacing-2)" direction="vertical">
              <Label htmlFor="name">{t('storybook.formSection.name')}</Label>
              <Textfield id="name" placeholder={t('storybook.formSection.enterName')} />
            </Stack>
            <Stack spacing="var(--ds-spacing-2)" direction="vertical">
              <Label htmlFor="email">{t('storybook.formSection.email')}</Label>
              <Textfield id="email" type="email" placeholder={t('storybook.formSection.enterEmail')} />
            </Stack>
          </Stack>
        </FormSection>
      </Stack>
    );
  },
};

/**
 * Form section with description
 */
export const WithDescription: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <FormSection
          title={t('storybook.formSection.personalInfo')}
          description={t('storybook.formSection.personalInfoDescription')}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
            <div>
              <Label htmlFor="name">{t('storybook.formSection.name')}</Label>
              <Textfield id="name" placeholder={t('storybook.formSection.enterName')} />
            </div>
            <div>
              <Label htmlFor="email">{t('storybook.formSection.email')}</Label>
              <Textfield id="email" type="email" placeholder={t('storybook.formSection.enterEmail')} />
            </div>
          </div>
        </FormSection>
      </div>
    );
  },
};

/**
 * Multiple form sections
 */
export const Multiple: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <FormSection title={t('storybook.formSection.personalInfo')}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
            <div>
              <Label htmlFor="name">{t('storybook.formSection.name')}</Label>
              <Textfield id="name" placeholder={t('storybook.formSection.enterName')} />
            </div>
            <div>
              <Label htmlFor="email">{t('storybook.formSection.email')}</Label>
              <Textfield id="email" type="email" placeholder={t('storybook.formSection.enterEmail')} />
            </div>
          </div>
        </FormSection>
        <Stack spacing="var(--ds-spacing-6)" style={{ marginTop: 'var(--ds-spacing-6)' }}>
          <FormSection title={t('storybook.formSection.address')}>
            <Stack spacing="var(--ds-spacing-3)" direction="vertical">
              <Stack spacing="var(--ds-spacing-2)" direction="vertical">
                <Label htmlFor="street">{t('storybook.formSection.street')}</Label>
                <Textfield id="street" placeholder={t('storybook.formSection.enterStreet')} />
              </Stack>
              <Stack spacing="var(--ds-spacing-2)" direction="vertical">
                <Label htmlFor="city">{t('storybook.formSection.city')}</Label>
                <Textfield id="city" placeholder={t('storybook.formSection.enterCity')} />
              </Stack>
            </Stack>
          </FormSection>
        </Stack>
      </div>
    );
  },
};
