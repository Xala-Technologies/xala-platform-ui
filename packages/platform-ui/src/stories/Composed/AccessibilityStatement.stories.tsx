import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { AccessibilityStatement } from '../../composed/AccessibilityStatement';

const meta: Meta<typeof AccessibilityStatement> = {
  title: 'Composed/AccessibilityStatement',
  component: AccessibilityStatement,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## AccessibilityStatement

Required accessibility statement page for Norwegian universal design compliance. Displays conformance status, known issues, and contact information.

### Features
- Conformance level display (full, partial, non-conformant)
- WCAG level indication
- Known issues listing
- Contact information
- Last updated date
- Testing method information

### Usage
\`\`\`tsx
<AccessibilityStatement
  organizationName="Organization Name"
  websiteName="Website Name"
  websiteUrl="https://example.com"
  conformanceLevel="full"
  wcagLevel="AA"
  lastUpdated="2024-01-01"
  contact={{ email: "accessibility@example.com" }}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper for full conformance story
const FullConformanceDemo = () => {
  const t = useT();
  return (
    <AccessibilityStatement
      organizationName={t('storybook.demo.exampleOrganization')}
      websiteName={t('storybook.demo.exampleWebsite')}
      websiteUrl="https://example.com"
      conformanceLevel="full"
      wcagLevel="AA"
      lastUpdated="2024-01-15"
      lastTested="2024-01-10"
      testingMethod={t('storybook.demo.automatedManualTesting')}
      contact={{
        email: 'accessibility@example.com',
        phone: '+47 12 34 56 78',
        address: 'Storgata 1, 0155 Oslo',
      }}
    />
  );
};

// Full conformance
export const FullConformance: Story = {
  render: function Render() {
    return <FullConformanceDemo />;
  },
};

// Wrapper for partial conformance story
const PartialConformanceDemo = () => {
  const t = useT();
  return (
    <AccessibilityStatement
      organizationName={t('storybook.demo.exampleOrganization')}
      websiteName={t('storybook.demo.exampleWebsite')}
      websiteUrl="https://example.com"
      conformanceLevel="partial"
      wcagLevel="AA"
      lastUpdated="2024-01-15"
      lastTested="2024-01-10"
      testingMethod={t('storybook.demo.automatedManualTesting')}
      knownIssues={[
        {
          description: t('storybook.demo.imagesLackAltText'),
          wcagCriterion: '1.1.1',
          workaround: t('storybook.demo.screenReaderWorkaround'),
          expectedFix: 'Q2 2024',
        },
        {
          description: t('storybook.demo.colorContrastIssue'),
          wcagCriterion: '1.4.3',
          workaround: t('storybook.demo.zoomWorkaround'),
          expectedFix: 'Q1 2024',
        },
      ]}
      contact={{
        email: 'accessibility@example.com',
        phone: '+47 12 34 56 78',
      }}
    />
  );
};

// Partial conformance with issues
export const PartialConformance: Story = {
  render: function Render() {
    return <PartialConformanceDemo />;
  },
};

// Wrapper for non-conformant story
const NonConformantDemo = () => {
  const t = useT();
  return (
    <AccessibilityStatement
      organizationName={t('storybook.demo.exampleOrganization')}
      websiteName={t('storybook.demo.exampleWebsite')}
      websiteUrl="https://example.com"
      conformanceLevel="non-conformant"
      wcagLevel="AA"
      lastUpdated="2024-01-15"
      knownIssues={[
        {
          description: t('storybook.demo.multipleAccessibilityIssues'),
          wcagCriterion: 'Multiple',
          expectedFix: t('storybook.demo.underReview'),
        },
      ]}
      contact={{
        email: 'accessibility@example.com',
      }}
    />
  );
};

// Non-conformant
export const NonConformant: Story = {
  render: function Render() {
    return <NonConformantDemo />;
  },
};

// Wrapper for with additional info story
const WithAdditionalInfoDemo = () => {
  const t = useT();
  return (
    <AccessibilityStatement
      organizationName={t('storybook.demo.exampleOrganization')}
      websiteName={t('storybook.demo.exampleWebsite')}
      websiteUrl="https://example.com"
      conformanceLevel="full"
      wcagLevel="AA"
      lastUpdated="2024-01-15"
      lastTested="2024-01-10"
      testingMethod={t('storybook.demo.automatedManualTesting')}
      contact={{
        email: 'accessibility@example.com',
        phone: '+47 12 34 56 78',
        address: 'Storgata 1, 0155 Oslo',
      }}
      additionalInfo={t('storybook.demo.commitmentToAccessibility')}
    />
  );
};

// With additional info
export const WithAdditionalInfo: Story = {
  render: function Render() {
    return <WithAdditionalInfoDemo />;
  },
};

// Wrapper for WCAG AAA story
const WCAGAAADemo = () => {
  const t = useT();
  return (
    <AccessibilityStatement
      organizationName={t('storybook.demo.exampleOrganization')}
      websiteName={t('storybook.demo.exampleWebsite')}
      websiteUrl="https://example.com"
      conformanceLevel="full"
      wcagLevel="AAA"
      lastUpdated="2024-01-15"
      lastTested="2024-01-10"
      testingMethod={t('storybook.demo.comprehensiveTesting')}
      contact={{
        email: 'accessibility@example.com',
      }}
    />
  );
};

// WCAG AAA level
export const WCAGAAA: Story = {
  render: function Render() {
    return <WCAGAAADemo />;
  },
};

// Wrapper for minimal story
const MinimalDemo = () => {
  const t = useT();
  return (
    <AccessibilityStatement
      organizationName={t('storybook.demo.exampleOrganization')}
      websiteName={t('storybook.demo.exampleWebsite')}
      websiteUrl="https://example.com"
      conformanceLevel="full"
      wcagLevel="AA"
      lastUpdated="2024-01-15"
      contact={{
        email: 'accessibility@example.com',
      }}
    />
  );
};

// Minimal
export const Minimal: Story = {
  render: function Render() {
    return <MinimalDemo />;
  },
};
