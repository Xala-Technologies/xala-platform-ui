import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { AccessibilityDashboard } from '../../blocks/AccessibilityDashboard';
import type { AccessibilityReport } from '../../blocks/AccessibilityDashboard';

const meta: Meta<typeof AccessibilityDashboard> = {
  title: 'Blocks/AccessibilityDashboard',
  component: AccessibilityDashboard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## AccessibilityDashboard

Real-time accessibility metrics visualization. Displays accessibility monitoring data in a user-friendly dashboard with WCAG AAA compliant design.

### Features
- Compliance score visualization
- Keyboard navigation metrics
- Screen reader usage statistics
- Focus issues tracking
- ARIA announcements success rate
- Recommendations

### Usage
\`\`\`tsx
<AccessibilityDashboard
  report={accessibilityReport}
  isLoading={false}
  onRefresh={handleRefresh}
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onRefresh: fn(),
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample report with excellent compliance
const excellentReport: AccessibilityReport = {
  period: {
    start: new Date('2024-01-01'),
    end: new Date('2024-01-31'),
  },
  tenantId: 'tenant-1',
  metrics: {
    keyboardNavigation: {
      total: 1250,
      byAction: {
        'tab': 450,
        'enter': 320,
        'arrow-keys': 280,
        'escape': 200,
      },
      byPage: {
        '/dashboard': 400,
        '/bookings': 350,
        '/resources': 300,
        '/settings': 200,
      },
    },
    skipLinkUsage: {
      total: 890,
      byTarget: {
        'main-content': 450,
        'navigation': 280,
        'footer': 160,
      },
    },
    screenReaderUsers: {
      total: 45,
      percentage: 3.2,
      byType: {
        'NVDA': 20,
        'JAWS': 15,
        'VoiceOver': 10,
      },
    },
    focusIssues: {
      total: 5,
      byType: {
        'missing-focus-indicator': 2,
        'focus-trap': 1,
        'focus-order': 2,
      },
    },
    ariaAnnouncements: {
      total: 1200,
      successRate: 98.5,
    },
  },
  complianceScore: 95,
  recommendations: [
    'Improve focus indicators on custom components',
    'Add skip links to all major sections',
  ],
};

// Good compliance report
const goodReport: AccessibilityReport = {
  ...excellentReport,
  complianceScore: 75,
  metrics: {
    ...excellentReport.metrics,
    focusIssues: {
      total: 25,
      byType: {
        'missing-focus-indicator': 10,
        'focus-trap': 8,
        'focus-order': 7,
      },
    },
    ariaAnnouncements: {
      total: 1200,
      successRate: 85.0,
    },
  },
  recommendations: [
    'Fix missing focus indicators on 10 components',
    'Improve ARIA announcement success rate',
    'Add more skip links',
  ],
};

// Needs improvement report
const needsImprovementReport: AccessibilityReport = {
  ...excellentReport,
  complianceScore: 60,
  metrics: {
    ...excellentReport.metrics,
    focusIssues: {
      total: 50,
      byType: {
        'missing-focus-indicator': 25,
        'focus-trap': 15,
        'focus-order': 10,
      },
    },
    ariaAnnouncements: {
      total: 1200,
      successRate: 70.0,
    },
  },
  recommendations: [
    'Critical: Fix 25 missing focus indicators',
    'Critical: Improve ARIA announcement success rate',
    'Add keyboard navigation support to all interactive elements',
    'Implement skip links throughout the application',
  ],
};

// Excellent compliance
export const ExcellentCompliance: Story = {
  args: {
    report: excellentReport,
    isLoading: false,
  },
  render: (args) => (
    <div style={{ width: '900px' }}>
      <AccessibilityDashboard {...args} />
    </div>
  ),
};

// Good compliance
export const GoodCompliance: Story = {
  args: {
    report: goodReport,
    isLoading: false,
  },
  render: (args) => (
    <div style={{ width: '900px' }}>
      <AccessibilityDashboard {...args} />
    </div>
  ),
};

// Needs improvement
export const NeedsImprovement: Story = {
  args: {
    report: needsImprovementReport,
    isLoading: false,
  },
  render: (args) => (
    <div style={{ width: '900px' }}>
      <AccessibilityDashboard {...args} />
    </div>
  ),
};

// Loading state
export const Loading: Story = {
  args: {
    report: excellentReport,
    isLoading: true,
  },
  render: (args) => (
    <div style={{ width: '900px' }}>
      <AccessibilityDashboard {...args} />
    </div>
  ),
};

// Without refresh button
export const WithoutRefresh: Story = {
  args: {
    report: excellentReport,
    isLoading: false,
    onRefresh: undefined,
  },
  render: (args) => (
    <div style={{ width: '900px' }}>
      <AccessibilityDashboard {...args} />
    </div>
  ),
};
