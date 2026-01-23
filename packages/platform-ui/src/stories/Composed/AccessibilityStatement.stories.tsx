import type { Meta, StoryObj } from '@storybook/react';
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

// Full conformance
export const FullConformance: Story = {
  args: {
    organizationName: 'Example Organization',
    websiteName: 'Example Website',
    websiteUrl: 'https://example.com',
    conformanceLevel: 'full',
    wcagLevel: 'AA',
    lastUpdated: '2024-01-15',
    lastTested: '2024-01-10',
    testingMethod: 'Automated testing with axe-core and manual testing',
    contact: {
      email: 'accessibility@example.com',
      phone: '+47 12 34 56 78',
      address: 'Storgata 1, 0155 Oslo',
    },
  },
};

// Partial conformance with issues
export const PartialConformance: Story = {
  args: {
    organizationName: 'Example Organization',
    websiteName: 'Example Website',
    websiteUrl: 'https://example.com',
    conformanceLevel: 'partial',
    wcagLevel: 'AA',
    lastUpdated: '2024-01-15',
    lastTested: '2024-01-10',
    testingMethod: 'Automated testing with axe-core and manual testing',
    knownIssues: [
      {
        description: 'Some images lack alternative text',
        wcagCriterion: '1.1.1',
        workaround: 'Screen reader users can request alternative text via contact form',
        expectedFix: 'Q2 2024',
      },
      {
        description: 'Color contrast ratio below 4.5:1 on some buttons',
        wcagCriterion: '1.4.3',
        workaround: 'Users can increase browser zoom for better contrast',
        expectedFix: 'Q1 2024',
      },
    ],
    contact: {
      email: 'accessibility@example.com',
      phone: '+47 12 34 56 78',
    },
  },
};

// Non-conformant
export const NonConformant: Story = {
  args: {
    organizationName: 'Example Organization',
    websiteName: 'Example Website',
    websiteUrl: 'https://example.com',
    conformanceLevel: 'non-conformant',
    wcagLevel: 'AA',
    lastUpdated: '2024-01-15',
    knownIssues: [
      {
        description: 'Multiple accessibility issues identified',
        wcagCriterion: 'Multiple',
        expectedFix: 'Under review',
      },
    ],
    contact: {
      email: 'accessibility@example.com',
    },
  },
};

// With additional info
export const WithAdditionalInfo: Story = {
  args: {
    organizationName: 'Example Organization',
    websiteName: 'Example Website',
    websiteUrl: 'https://example.com',
    conformanceLevel: 'full',
    wcagLevel: 'AA',
    lastUpdated: '2024-01-15',
    lastTested: '2024-01-10',
    testingMethod: 'Automated testing with axe-core and manual testing',
    contact: {
      email: 'accessibility@example.com',
      phone: '+47 12 34 56 78',
      address: 'Storgata 1, 0155 Oslo',
    },
    additionalInfo: 'We are committed to improving accessibility and welcome feedback from users.',
  },
};

// WCAG AAA level
export const WCAGAAA: Story = {
  args: {
    organizationName: 'Example Organization',
    websiteName: 'Example Website',
    websiteUrl: 'https://example.com',
    conformanceLevel: 'full',
    wcagLevel: 'AAA',
    lastUpdated: '2024-01-15',
    lastTested: '2024-01-10',
    testingMethod: 'Comprehensive automated and manual testing',
    contact: {
      email: 'accessibility@example.com',
    },
  },
};

// Minimal
export const Minimal: Story = {
  args: {
    organizationName: 'Example Organization',
    websiteName: 'Example Website',
    websiteUrl: 'https://example.com',
    conformanceLevel: 'full',
    wcagLevel: 'AA',
    lastUpdated: '2024-01-15',
    contact: {
      email: 'accessibility@example.com',
    },
  },
};
