import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {
  FormSection,
  FormActions,
  FormRow,
  FormField,
  FormDivider,
} from '../../composed/FormLayout';
import { Button, Textfield, Textarea, Select } from '@digdir/designsystemet-react';

const meta: Meta<typeof FormSection> = {
  title: 'Composed/FormLayout',
  component: FormSection,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## FormLayout Components

Form sections, actions, and layout helpers for consistent form structure.

### Features
- FormSection with collapsible support
- FormActions with alignment options
- FormRow with grid layout
- FormField with label and error handling
- FormDivider for visual separation

### Usage
\`\`\`tsx
<FormSection title="Personal Information" description="Enter your details">
  <FormRow columns={2}>
    <FormField label="First Name" required>
      <Textfield />
    </FormField>
  </FormRow>
</FormSection>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic form section
const BasicSectionExample = () => {
  return (
    <div style={{ width: '600px' }}>
      <FormSection
        title="Eksempel Tekst"
        description="Eksempel Tekst"
      >
        <FormField label="Eksempel Tekst" required>
          <Textfield placeholder="John Doe" />
        </FormField>
        <FormField label={t('platform.auth.email')} required>
          <Textfield type="email" placeholder="john@example.com" />
        </FormField>
      </FormSection>
    </div>
  );
};

export const BasicSection: Story = {
  render: function Render() {
    return <BasicSectionExample />;
  },
};

// Collapsible section
const CollapsibleSectionExample = () => {
  return (
    <div style={{ width: '600px' }}>
      <FormSection
        title="Eksempel Tekst"
        description="Eksempel Tekst"
        collapsible
        defaultCollapsed={true}
      >
        <FormField label="Eksempel Tekst">
          <Textfield placeholder="Eksempel Tekst" />
        </FormField>
        <FormField label="Eksempel Tekst">
          <Textfield placeholder="https://example.com/webhook" />
        </FormField>
      </FormSection>
    </div>
  );
};

export const CollapsibleSection: Story = {
  render: function Render() {
    return <CollapsibleSectionExample />;
  },
};

// Form row with multiple columns
const FormRowTwoColumnsExample = () => {
  return (
    <div style={{ width: '600px' }}>
      <FormSection title="Eksempel Tekst">
        <FormRow columns={2}>
          <FormField label="Eksempel Tekst" required>
            <Textfield placeholder="John" />
          </FormField>
          <FormField label="Eksempel Tekst" required>
            <Textfield placeholder="Doe" />
          </FormField>
        </FormRow>
        <FormRow columns={2}>
          <FormField label="Eksempel Tekst">
            <Textfield type="tel" placeholder="+47 12 34 56 78" />
          </FormField>
          <FormField label={t('platform.auth.email')} required>
            <Textfield type="email" placeholder="john@example.com" />
          </FormField>
        </FormRow>
      </FormSection>
    </div>
  );
};

export const FormRowTwoColumns: Story = {
  render: function Render() {
    return <FormRowTwoColumnsExample />;
  },
};

// Form row with three columns
const FormRowThreeColumnsExample = () => {
  return (
    <div style={{ width: '800px' }}>
      <FormSection title={t('platform.common.address')}>
        <FormRow columns={3}>
          <FormField label="Eksempel Tekst">
            <Textfield placeholder="Storgata 1" />
          </FormField>
          <FormField label="Eksempel Tekst">
            <Textfield placeholder="0155" />
          </FormField>
          <FormField label={t('platform.common.city')}>
            <Textfield placeholder="Oslo" />
          </FormField>
        </FormRow>
      </FormSection>
    </div>
  );
};

export const FormRowThreeColumns: Story = {
  render: function Render() {
    return <FormRowThreeColumnsExample />;
  },
};

// Form field with error
const FormFieldWithErrorExample = () => {
  return (
    <div style={{ width: '600px' }}>
      <FormSection title="Eksempel Tekst">
        <FormField
          label={t('platform.auth.email')}
          required
          error="Eksempel Tekst"
        >
          <Textfield type="email" placeholder="invalid-email" />
        </FormField>
        <FormField
          label={t('platform.auth.password')}
          required
          helperText="Eksempel Tekst"
        >
          <Textfield type="password" />
        </FormField>
      </FormSection>
    </div>
  );
};

export const FormFieldWithError: Story = {
  render: function Render() {
    return <FormFieldWithErrorExample />;
  },
};

// Form actions - right aligned
const FormActionsRightExample = () => {
  return (
    <div style={{ width: '600px' }}>
      <FormSection title="Eksempel Tekst">
        <FormField label={t('platform.common.name')}>
          <Textfield placeholder="Eksempel Tekst" />
        </FormField>
        <FormActions align="right">
          <Button onClick={fn()} data-color="neutral" data-size="medium">
            {t('platform.common.cancel')}
          </Button>
          <Button onClick={fn()} data-color="accent" data-size="medium">
            {t('platform.common.save')}
          </Button>
        </FormActions>
      </FormSection>
    </div>
  );
};

export const FormActionsRight: Story = {
  render: function Render() {
    return <FormActionsRightExample />;
  },
};

// Form actions - left aligned
const FormActionsLeftExample = () => {
  return (
    <div style={{ width: '600px' }}>
      <FormSection title="Eksempel Tekst">
        <FormField label={t('platform.common.name')}>
          <Textfield placeholder="Eksempel Tekst" />
        </FormField>
        <FormActions align="left">
          <Button onClick={fn()} data-color="accent" data-size="medium">
            {t('platform.common.save')}
          </Button>
          <Button onClick={fn()} data-color="neutral" data-size="medium">
            {t('platform.common.cancel')}
          </Button>
        </FormActions>
      </FormSection>
    </div>
  );
};

export const FormActionsLeft: Story = {
  render: function Render() {
    return <FormActionsLeftExample />;
  },
};

// Form actions - between
const FormActionsBetweenExample = () => {
  return (
    <div style={{ width: '600px' }}>
      <FormSection title="Eksempel Tekst">
        <FormField label={t('platform.common.name')}>
          <Textfield placeholder="Eksempel Tekst" />
        </FormField>
        <FormActions align="between">
          <Button onClick={fn()} data-color="neutral" data-size="medium">
            {t('platform.common.delete')}
          </Button>
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
            <Button onClick={fn()} data-color="neutral" data-size="medium">
              {t('platform.common.cancel')}
            </Button>
            <Button onClick={fn()} data-color="accent" data-size="medium">
              {t('platform.common.save')}
            </Button>
          </div>
        </FormActions>
      </FormSection>
    </div>
  );
};

export const FormActionsBetween: Story = {
  render: function Render() {
    return <FormActionsBetweenExample />;
  },
};

// Form actions - sticky
const FormActionsStickyExample = () => {
  return (
    <div
      style={{
        width: '600px',
        height: '400px',
        overflow: 'auto',
        border: '1px solid var(--ds-color-neutral-border-subtle)',
      }}
    >
      <FormSection title="Eksempel Tekst">
        {Array.from({ length: 10 }, (_, i) => (
          <FormField key={i} label={`$"Eksempel Tekst" ${i + 1}`}>
            <Textfield placeholder={`$"Eksempel Tekst" ${i + 1}`} />
          </FormField>
        ))}
        <FormActions align="right" sticky>
          <Button onClick={fn()} data-color="neutral" data-size="medium">
            {t('platform.common.cancel')}
          </Button>
          <Button onClick={fn()} data-color="accent" data-size="medium">
            {t('platform.common.save')}
          </Button>
        </FormActions>
      </FormSection>
    </div>
  );
};

export const FormActionsSticky: Story = {
  render: function Render() {
    return <FormActionsStickyExample />;
  },
};

// Form divider
const FormDividerExample = () => {
  return (
    <div style={{ width: '600px' }}>
      <FormSection title="Eksempel Tekst">
        <FormField label="Eksempel Tekst">
          <Textfield placeholder={t('storybook.demo.value', { number: 1 })} />
        </FormField>
        <FormDivider label="Eksempel Tekst" />
        <FormField label="Eksempel Tekst">
          <Textfield placeholder={t('storybook.demo.value', { number: 2 })} />
        </FormField>
      </FormSection>
    </div>
  );
};

export const FormDividerExampleStory: Story = {
  name: 'FormDividerExample',
  render: function Render() {
    return <FormDividerExample />;
  },
};

// Complete form example
const CompleteFormExample = () => {
  return (
    <div style={{ width: '600px' }}>
      <FormSection
        title="Eksempel Tekst"
        description="Eksempel Tekst"
      >
        <FormRow columns={2}>
          <FormField label="Eksempel Tekst" required>
            <Textfield placeholder="John" />
          </FormField>
          <FormField label="Eksempel Tekst" required>
            <Textfield placeholder="Doe" />
          </FormField>
        </FormRow>
        <FormField
          label={t('platform.auth.email')}
          required
          helperText="Eksempel Tekst"
        >
          <Textfield type="email" placeholder="john@example.com" />
        </FormField>
        <FormField label="Eksempel Tekst">
          <Textarea placeholder="Eksempel Tekst" rows={4} />
        </FormField>
      </FormSection>

      <FormDivider />

      <FormSection title="Eksempel Tekst" collapsible defaultCollapsed={true}>
        <FormField label="Eksempel Tekst">
          <Select>
            <option value="en">English</option>
            <option value="no">Norwegian</option>
          </Select>
        </FormField>
        <FormField label="Eksempel Tekst">
          <Select>
            <option value="light">"Eksempel Tekst"</option>
            <option value="dark">"Eksempel Tekst"</option>
            <option value="auto">"Eksempel Tekst"</option>
          </Select>
        </FormField>
      </FormSection>

      <FormActions align="right">
        <Button onClick={fn()} data-color="neutral" data-size="medium">
          {t('platform.common.cancel')}
        </Button>
        <Button onClick={fn()} data-color="accent" data-size="medium">
          "Eksempel Tekst"
        </Button>
      </FormActions>
    </div>
  );
};

export const CompleteForm: Story = {
  render: function Render() {
    return <CompleteFormExample />;
  },
};
